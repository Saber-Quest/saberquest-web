import { useState, useEffect } from "react";
import { Switch } from "@headlessui/react";
import axios from "axios";
import { SessionUser } from "@lib/types";

export default function Username({
  session,
  setSession,
  setMessage,
  setType,
  setShow,
}: {
  session: SessionUser;
  setSession: (session: SessionUser) => void;
  setMessage: (message: string) => void;
  setType: (type: string) => void;
  setShow: (show: boolean) => void;
}) {
  const [placeholder, setPlaceholder] = useState<string>("");
  const [disable, setDisable] = useState<boolean>(true);

  useEffect(() => {
    if (!session || !session.user?.info) return;
    if (session.user.info.username) {
      setPlaceholder(session.user.info.username);
    }
    if (session.user?.info.patreon) {
      setDisable(false);
    }
  }, [session]);

  const saveUsername = async () => {
    if (!session.user?.info.patreon) {
      setMessage(
        `You're not allowed to change your username!\n Subscribe to the ${process.env.PUBLIC_NAME} Patreon to unlock it!`,
      );
      setType("error");
      setShow(true);
      return;
    }
    const username = document.getElementById("username") as HTMLInputElement;
    if (username.value.length < 3 || username.value.length > 20) {
      setMessage("Username must be between 3 and 20 characters!");
      setType("error");
      setShow(true);
      return;
    }

    if (!username.value.match(/^[A-Za-z0-9_-]*$/)) {
      setMessage(
        "Username must only contain letters, numbers, underscores, and dashes!",
      );
      setType("error");
      setShow(true);
      return;
    }

    await axios
      .put(`${process.env.PUBLIC_URL}/api/profile/settings/username`, {
        u: username.value,
        t: session.jwt,
      })
      .then((response) => {
        if (response.status === 302 || response.status === 200) {
          setMessage("Username updated!");
          setType("success");
          setShow(true);
          if (!session.user) return;
          const updatedSession: SessionUser = {
            ...session,
            user: {
              ...session.user,
              info: {
                ...session.user.info,
                username: username.value,
              },
            },
          };
          setSession(updatedSession);
        }
      })
      .catch((error) => {
        setMessage(error.response.data.error);
        setType("error");
        setShow(true);
      });
  };

  return (
    <Switch.Group
      as="div"
      className={`${
        disable ? "opacity-50" : "opacity-100"
      } flex items-center justify-between p-5`}
    >
      <div className="font-medium text-white" title="Patreon Feature">
        Username <span className="text-sm text-sqyellow mt-2">*</span>
      </div>
      <div className="flex flex-row items-center">
        <div>
          <div className="flex rounded-md shadow-sm">
            <div className="relative flex flex-grow items-stretch focus-within:z-10">
              <input
                type="text"
                name="username"
                id="username"
                autocomplete="off"
                maxLength={20}
                minLength={3}
                className={`${
                  disable ? "cursor-not-allowed" : ""
                } block w-full rounded-none rounded-l-md border-0 py-1.5 pl-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-0 sm:text-sm sm:leading-6`}
                placeholder={placeholder}
                disabled={disable}
              />
            </div>
            <button
              type="button"
              onClick={saveUsername}
              className={`${
                disable
                  ? "cursor-not-allowed"
                  : "hover:bg-sqyellowfaint hover:text-white"
              } relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-[#131313e5] ring-0 bg-sqyellow smoothTran`}
              disabled={disable}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </Switch.Group>
  );
}
