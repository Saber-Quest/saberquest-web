import { useEffect, useState } from "react";
import { UsersIcon } from "@heroicons/react/24/outline";
import { Combobox } from "@headlessui/react";
import axios from "axios";
import Link from "next/link";

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(" ");
}

function useDebounceValue(value: string, time: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, time);
    return () => {
      clearTimeout(handler);
    };
  }, [value, time]);
  return debouncedValue;
}

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any>([]);
  const debouncedQuery = useDebounceValue(query, 500);

  const filteredSuggestions =
    query === ""
      ? []
      : suggestions.filter((suggestion: { username: string }) => {
          if (typeof suggestion !== "object") {
            return false;
          }
          return suggestion.username
            .toLowerCase()
            .includes(query.toLowerCase());
        });

  useEffect(() => {
    (async () => {
      setSuggestions([]);
      if (debouncedQuery.length > 0 && debouncedQuery !== ".") {
        axios
          .get(`${process.env.PUBLIC_URL}/api/admin/${debouncedQuery}`)
          .then((response) => {
            if (response.status === 302 || response.status === 200) {
              if (response.data !== null) {
                if (response.data.list === false) {
                  setSuggestions([]);
                } else {
                  setSuggestions(response.data.list);
                }
              }
            } else {
            }
          })
          .catch((error) => {
            console.error("An error occurred, contact a developer!");
            console.error(error);
          });
      } else {
        setSuggestions([]);
      }
    })();
  }, [debouncedQuery]);

  return (
    <>
      <Combobox
        as="div"
        className="fixed w-[33.5rem] mx-auto max-w-xl transform rounded-xl bg-[#323232] p-2 ring-1 ring-black ring-opacity-5 transition-all z-[1000]"
      >
        <Combobox.Input
          className="w-full rounded-md border-0 bg-white px-4 py-2.5 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
          placeholder="Search..."
          onChange={(event) => setQuery(event.target.value)}
        />

        {filteredSuggestions.length > 0 && (
          <Combobox.Options
            static
            className="-mb-2 max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800 scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-blue-300 scrollbar- scrollbar-thumb-rounded-full scrollbar-track-rounded-full"
          >
            {suggestions.map((suggestions: any) => (
              <Link key={suggestions.id} href={`/admin/user/${suggestions.id}`}>
                <Combobox.Option
                  key={suggestions.id}
                  value={suggestions}
                  className={({ active }) =>
                    classNames(
                      "mr-4 cursor-default select-none rounded-md px-4 py-2",
                      active && "bg-indigo-600 text-white",
                    )
                  }
                >
                  {suggestions.username}
                </Combobox.Option>
              </Link>
            ))}
          </Combobox.Options>
        )}

        {query !== "" && filteredSuggestions.length === 0 && (
          <div className="py-14 px-4 text-center sm:px-14">
            <UsersIcon
              className="mx-auto h-6 w-6 text-gray-400"
              aria-hidden="true"
            />
            <p className="mt-4 text-sm text-gray-900">
              No people found using that search term.
            </p>
          </div>
        )}
      </Combobox>
    </>
  );
}
