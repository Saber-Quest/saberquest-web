import { useState, useEffect } from "react";
import TimeAgo from "react-timeago";
import axios from "axios";
import { ChallengeHistoryItem } from "@lib/types";
import {
  ChallengeDiff as cD,
  ChallengePlatforms as cP,
} from "@lib/enums/Challenge";
import Image from "next/image";
import {
  CalendarIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@heroicons/react/20/solid";
import ExtendedChallengeInfo from "@comp/UI/Components/Profile/Challenges/ExtendedChallengeInfo";
import { dateConvert } from "@lib/utils/dateConvert";

export default function ChallengesPanel({
  id,
  completed,
}: {
  id: string;
  completed: number | 0;
}) {
  const [challenges, setChallenges] = useState<ChallengeHistoryItem[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [expandedIndex, setExpandedIndex] = useState(-1);

  const challengesPerPage = 5;
  const [numberOfPages, setPages] = useState<number>(
    Math.ceil(completed / challengesPerPage),
  );

  useEffect(() => {
    axios
      .get(`/api/profile/${id}/challenges/${currentPage}`)
      .then((response) => {
        if (response.status === 302 || response.status === 200) {
          if (response.data !== null) {
            setChallenges(response.data);
          }
        }
      })
      .catch((error) => {
        console.error("An error occurred, contact a developer!");
        console.error(error);
      });
  }, [id, currentPage]);

  const toggleAccordion = (index: number) => {
    if (expandedIndex === index) {
      setExpandedIndex(-1);
    } else {
      setExpandedIndex(index);
    }
  };

  return (
    <>
      <div className="ccMainDiv min-w-[368px] max-w-[368px] md:min-w-[464px] md:max-w-[464px] lg:min-w-[560px] lg:max-w-[560px] xl:min-w-[710px] xl:max-w-[710px] smoothTran">
        <ul role="list" className="ccListDivider">
          {challenges.length > 0 ? (
            challenges.map((item, index) => (
              <li key={index} onClick={() => toggleAccordion(index)}>
                <div className="ccChallengeFullInfo">
                  <div className="ccChallengeMiniInfo">
                    <div className="ccChallengeMiniInfoFull">
                      <div className="ccChallengeMiniInfoLeft">
                        <div className="ccMiniCard">
                          <p className="ccMiniChalName">
                            {item.challenge.name}
                          </p>
                          {(item.challenge.difficulty.name === cD.N && (
                            <span className="ccNChalDiff">
                              {item.challenge.difficulty.name}
                            </span>
                          )) ||
                            (item.challenge.difficulty.name === cD.H && (
                              <span className="ccHChalDiff">
                                {item.challenge.difficulty.name}
                              </span>
                            )) ||
                            (item.challenge.difficulty.name === cD.Ex && (
                              <span className="ccExChalDiff">
                                {item.challenge.difficulty.name}
                              </span>
                            ))}
                          {(item.challenge.completedOn === 2 && (
                            <span className="ccSSColor md:min-w-[116px]">
                              <Image
                                src="/assets/images/ScoreSaberLogo.svg"
                                alt="BeatLeader"
                                className="mr-[4px] hidden md:block"
                                width={16}
                                height={16}
                              />{" "}
                              <span className="hidden md:block">
                                ScoreSaber
                              </span>
                              <span className="md:hidden">SS</span>
                            </span>
                          )) ||
                            (item.challenge.completedOn === 1 && (
                              <span className="ccBLColor md:min-w-[115px]">
                                <Image
                                  src="/assets/images/BeatLeaderLogo.png"
                                  alt="BeatLeader"
                                  className="mr-[4px] hidden md:block"
                                  width={16}
                                  height={16}
                                />{" "}
                                <span className="hidden md:block">
                                  BeatLeader
                                </span>
                                <span className="md:hidden">BL</span>
                              </span>
                            ))}
                        </div>
                        <div className="ccMiniCalDiv">
                          <div className="ccMiniCalInfo">
                            <CalendarIcon
                              className="ccCalIcon"
                              aria-hidden="true"
                            />
                            {expandedIndex === index ? (
                              dateConvert({ isoDate: item.date, type: 1 })
                            ) : (
                              <TimeAgo date={item.date} />
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="ccMiniItemsDiv">
                        <div className="ccMiniItemsRow">
                          {item.items.map((cItems, cIndex) => (
                            <Image
                              key={index - cIndex}
                              className={`ccMiniItemsRing ${
                                cItems.rarity === 1
                                  ? "ring-commonItem"
                                  : cItems.rarity === 2
                                  ? "ring-uncommonItem"
                                  : cItems.rarity === 3
                                  ? "ring-rareItem"
                                  : cItems.rarity === 4
                                  ? "ring-epicItem"
                                  : cItems.rarity === 5
                                  ? "ring-legendaryItem"
                                  : "ring-sqyellow"
                              }`}
                              src={cItems.image}
                              alt={cItems.name}
                              width={24}
                              height={24}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="ccChevronDiv">
                      <button className="ccChevronButton" aria-hidden="true">
                        {expandedIndex === index ? (
                          <ChevronDownIcon />
                        ) : (
                          <ChevronRightIcon />
                        )}
                      </button>
                    </div>
                  </div>
                  {expandedIndex === index && (
                    <>
                      <ExtendedChallengeInfo item={item} />
                    </>
                  )}
                </div>
              </li>
            ))
          ) : (
            <p className="text-center">No completed challenges</p>
          )}
        </ul>
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
    </>
  );
}
