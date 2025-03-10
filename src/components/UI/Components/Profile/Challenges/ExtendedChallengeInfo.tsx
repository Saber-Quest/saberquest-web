import { ChallengeType as cT } from "@lib/enums/Challenge";
import { ItemRarity as iR } from "@lib/enums/ItemRarity";
import { ChallengeHistoryItem } from "@lib/types";
import Image from "next/image";

export default function ExtendedChallengeInfo({
  item,
}: {
  item: ChallengeHistoryItem;
}) {
  return (
    <>
      <div className="ccExInfoDev">
        <p>Description: {item.challenge.description}</p>
        Requirement:{" "}
        {(item.challenge.type === cT.Map && (
          <>
            <b className="text-sqyellow">
              {item.challenge.difficulty.challenge[0]}
            </b>{" "}
            maps
          </>
        )) ||
          (item.challenge.type === cT.FCN && (
            <>
              <b className="text-sqyellow">
                {item.challenge.difficulty.challenge[0]}
              </b>{" "}
              notes
            </>
          )) ||
          (item.challenge.type === cT.PN && (
            <>
              <b className="text-sqyellow">
                {item.challenge.difficulty.challenge[0]}
              </b>{" "}
              notes
            </>
          )) ||
          (item.challenge.type === cT.PP && (
            <>
              <b className="text-sqyellow">
                {item.challenge.completedOn === 2
                  ? item.challenge.difficulty.challenge[0]
                  : item.challenge.difficulty.challenge[1]}
              </b>
              pp
            </>
          )) ||
          (item.challenge.type === cT.FCS && (
            <>
              <b className="text-sqyellow">
                {item.challenge.completedOn === 1
                  ? item.challenge.difficulty.challenge[0]
                  : item.challenge.difficulty.challenge[1]}
              </b>
              *
            </>
          )) ||
          (item.challenge.type === cT.XAS && (
            <>
              <b className="text-sqyellow">
                {item.challenge.completedOn === 2
                  ? item.challenge.difficulty.challenge[0]
                  : item.challenge.difficulty.challenge[1]}
              </b>{" "}
              *,{" "}
              <b className="text-sqyellow">
                {item.challenge.difficulty.challenge[2]}
              </b>
              % acc
            </>
          )) ||
          (item.challenge.type === cT.XAPP && (
            <>
              <b className="text-sqyellow">
                {item.challenge.completedOn === 1
                  ? item.challenge.difficulty.challenge[0]
                  : item.challenge.difficulty.challenge[1]}
              </b>
              pp,{" "}
              <b className="text-sqyellow">
                {item.challenge.difficulty.challenge[2]}
              </b>
              % acc
            </>
          )) ||
          (item.challenge.type === cT.XAN && (
            <>
              <b className="text-sqyellow">
                {item.challenge.difficulty.challenge[0]}
              </b>
              notes,{" "}
              <b className="text-sqyellow">
                {item.challenge.difficulty.challenge[1]}
              </b>
              % acc
            </>
          ))}
      </div>
      <div className="ccExInfoDev Items">
        <p>
          QP awarded: <b className="text-sqyellow">{item.qp}</b> QP
        </p>
        <p>Items received:</p>
        <div className="ccExItemDiv">
          {item.items.map((cItems: any, cIndex: number) => (
            <div
              key={`IndexDiv-${cIndex}`} // Add a unique key to the outer div
              className={`ccExItem text-[12px] ${
                cItems.rarity === 1
                  ? "ring-commonItem bg-commonItemfaint"
                  : cItems.rarity === 2
                  ? "ring-uncommonItem bg-uncommonItemfaint"
                  : cItems.rarity === 3
                  ? "ring-rareItem bg-rareItemfaint"
                  : cItems.rarity === 4
                  ? "ring-epicItem bg-epicItemfaint"
                  : cItems.rarity === 5
                  ? "ring-legendaryItem bg-legendaryItemfaint"
                  : "ring-sqyellow bg-sqyellowfaint"
              }`}
            >
              <Image
                key={`Index-${cIndex}`} // Add a unique key to the Image component
                src={cItems.image}
                alt={cItems.name}
                width={32}
                height={32}
              />
              {cItems.name}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
