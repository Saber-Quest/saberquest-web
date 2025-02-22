import { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import axios from "axios";
import Image from "next/image";
import { ItemRarity } from "@lib/enums/ItemRarity";
import { InventoryItem } from "@lib/types";

export default function InventoryPanel({ id }: { id: string }) {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const rarityOrder = [1, 2, 3, 4, 5];

  const newInventory = inventory.filter((item) => item.amount > 0);
  const sortedInventory = newInventory.sort((a, b) => {
    if (rarityOrder.indexOf(a.rarity) < rarityOrder.indexOf(b.rarity)) {
      return -1;
    }
    if (rarityOrder.indexOf(a.rarity) > rarityOrder.indexOf(b.rarity)) {
      return 1;
    }
    return 0;
  });

  const itemsPerPage = 8;
  const [numberOfPages, setNumberOfPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const startItemsIndex = (currentPage - 1) * itemsPerPage;
  const endItemsIndex = startItemsIndex + itemsPerPage;
  const itemsToShow = sortedInventory.slice(startItemsIndex, endItemsIndex);

  useEffect(() => {
    GetInventory(id);
  }, [id]);

  const GetInventory = async (id: string) => {
    await axios
      .get(`${process.env.API_URL}/users/${id}/items`)
      .then((response) => {
        if (response.status === 302 || response.status === 200) {
          setInventory(response.data);
        }
      })
      .catch((error) => {});
  };

  useEffect(() => {
    const calculatedNumberOfPages = Math.ceil(
      sortedInventory.length / itemsPerPage,
    );
    setNumberOfPages(calculatedNumberOfPages);
  }, [sortedInventory]);

  return (
    <>
      <Tab.Panel className="mt-4 focus:outline-none">
        <div className="flex flex-col items-center min-w-[368px] max-w-[368px] md:min-w-[464px] md:max-w-[464px] lg:min-w-[560px] lg:max-w-[560px] xl:min-w-[710px] xl:max-w-[710px] smoothTran">
          <div className="flex flex-wrap justify-center gap-5">
            {itemsToShow.length > 0 ? (
              itemsToShow.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={`bg-[#00000000] min-w-[156px] max-w-[156px] ${
                      item.rarity === 1
                        ? "border-commonItem hover:bg-commonItemfaint"
                        : item.rarity === 2
                        ? "border-uncommonItem hover:bg-uncommonItemfaint"
                        : item.rarity === 3
                        ? "border-rareItem hover:bg-rareItemfaint"
                        : item.rarity === 3
                        ? "border-epicItem hover:bg-epicItemfaint"
                        : item.rarity === 4
                        ? "border-legendaryItem hover:bg-legendaryItemfaint"
                        : "border-sqyellow hover:bg-sqyellowfaint"
                    } flex flex-col items-center rounded-3xl p-2 border-2 border-opacity-30 drop-shadow-PFPShadow hover:border-opacity-70 transition-all duration-150 ease-in-out`}
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={136}
                      height={136}
                      className="rounded-full relative"
                    />
                    <p className="text-center drop-shadow-textShadow whitespace-pre-line">
                      {`${item.name}\n(${ItemRarity[item.rarity]})`}
                    </p>
                    <p>x{item.amount}</p>
                  </div>
                );
              })
            ) : (
              <p>Inventory Empty</p>
            )}
          </div>
          {numberOfPages > 1 && (
            <div className="ccNavigation">
              <button
                className={`Backward ${
                  currentPage > 1 ? "" : "cursor-not-allowed"
                }`}
                onClick={() => {
                  if (currentPage > 1) {
                    const previousPage = currentPage - 1;
                    setCurrentPage(previousPage);
                  }
                }}
              >
                Back
              </button>

              <div className="PageNumber">{currentPage}</div>

              <button
                className={`Forward ${
                  currentPage < numberOfPages ? "" : "cursor-not-allowed"
                }`}
                onClick={() => {
                  if (currentPage < numberOfPages) {
                    const nextPage = currentPage + 1;
                    setCurrentPage(nextPage);
                  }
                }}
              >
                Forward
              </button>
            </div>
          )}
        </div>
      </Tab.Panel>
    </>
  );
}
