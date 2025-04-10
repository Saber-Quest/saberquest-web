import { useEffect, useState } from "react";
import axios from "axios";
import { SessionUser } from "@lib/types";
import { useGlitch } from "react-powerglitch";
import { User } from "@lib/types";
import Reveal from "react-awesome-reveal";
import { keyframes } from "@emotion/react";
import Link from "next/link";
import Image from "next/image";
import { MapChallengeLeaderboard } from "@lib/types/Challenges";

const customAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateX(-100px);
    ease-in-out: cubic-bezier(0.075, 0.82, 0.165, 1);
  }

  to {
    opacity: 1;
    transform: translateX(0px);
    ease-in-out: cubic-bezier(0.075, 0.82, 0.165, 1);
  }
`;

export default function MapChallengeLeaderboardComp({
  leaderboardType,
  session,
  setSession,
  setMessage,
  setType,
  setShow,
}: {
  leaderboardType: 1 | 2 | 3;
  session: SessionUser;
  setSession: (session: SessionUser) => void;
  setMessage: (message: string) => void;
  setType: (type: string) => void;
  setShow: (show: boolean) => void;
}) {
  const dummy = new Array(10).fill(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [leaderboard, setLeaderboard] = useState<MapChallengeLeaderboard[]>();

  const glitch = useGlitch({
    playMode: "always",
    createContainers: true,
    hideOverflow: false,
    timing: {
      duration: 4000,
      easing: "ease-in-out",
    },
    glitchTimeSpan: {
      start: 0.5,
      end: 0.7,
    },
    shake: {
      velocity: 15,
      amplitudeX: 0.05,
      amplitudeY: 0.05,
    },
    slice: {
      count: 6,
      velocity: 15,
      minHeight: 0.02,
      maxHeight: 0.15,
      hueRotate: true,
    },
    pulse: false,
  });

  // Moved API request into useEffect with leaderboardType dependency
  useEffect(() => {
    setLoading(true);
    setError(false);

    axios
      .get(
        `${process.env.API_URL}/challenges/map/leaderboard/${leaderboardType}`,
      )
      .then((response) => {
        if (response.status === 302 || response.status === 200) {
          if (response.data.length > 0) {
            setLeaderboard(response.data);
          } else {
            setError(true);
          }
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("An error occurred, contact a developer!");
        console.error(error);
        setError(true);
        setLoading(false);
      });
  }, [leaderboardType]); // This dependency ensures the effect runs when leaderboardType changes

  return (
    <div className="flex flex-col items-center justify-center px-0 xl:px-16 py-10 drop-shadow-navBarShadow select-none transition-all duration-300 ease-in-out">
      <div className="LeaderboardContainer">
        <div className="LeaderboardHeader">
          <div className="LBHeaderText LBR">Rank</div>
          <div className="LBHeaderText LBU">User</div>
          <div className="LBHeaderText LBS">Score</div>
        </div>
        <div className="border-y-[1px] border-sqyellowfaint overflow-hidden">
          {loading ? (
            <>
              {dummy.map((dummy, index) => (
                <div
                  key={index}
                  className={`opacity-25 LeaderboardEntry border-b border-[#0000003d] animate-[pulse_1s_ease-in-out_infinite]`}
                >
                  <div className="LBEntryText LBR">
                    <span className="w-5 h-2.5 bg-gray-200 rounded-full me-3" />
                  </div>
                  <div className="LBEntryText LBU">
                    <div className="relative overflow-visible mr-5">
                      <div className="w-8 h-8 bg-gray-200 rounded-full me-3" />
                    </div>
                    <span className="w-[120px] h-2.5 bg-gray-200 rounded-full"></span>
                  </div>
                  <div className="LBEntryText LBS">
                    <span className="w-5 h-2.5 bg-gray-200 rounded-full me-3" />
                  </div>
                </div>
              ))}
            </>
          ) : error ? (
            <div className="flex flex-col items-center justify-center w-full h-full">
              <div className="w-16 h-16 my-2">No data found.</div>
            </div>
          ) : (
            <>
              <Reveal keyframes={customAnimation} duration={225} cascade>
                {Array.isArray(leaderboard) &&
                  leaderboard.map(
                    (entry: MapChallengeLeaderboard, index: number) => (
                      <Link key={index} href={`/profile/${entry.user.id}`}>
                        <div
                          className={`LeaderboardEntry ${
                            (index + 1) % 2 === 0 ? undefined : "bg-[#0000003d]"
                          } border-b border-[#0000003d]`}
                          style={{
                            backgroundImage: !entry.user.images.banners
                              .horizontal
                              ? ``
                              : `url(/api/${entry.user.id}/hor)`,
                            backgroundSize: "cover",
                          }}
                        >
                          <div className="LBEntryText LBR">
                            {entry.rank === 1 ? (
                              <span className="text-sqyellow drop-shadow-rank1Shadow">
                                #{entry.rank}
                              </span>
                            ) : entry.rank === 2 ? (
                              <span className="text-sqsilver drop-shadow-rank2Shadow">
                                #{entry.rank}
                              </span>
                            ) : entry.rank === 3 ? (
                              <span className="text-sqbronze drop-shadow-rank3Shadow">
                                #{entry.rank}
                              </span>
                            ) : (
                              `#${entry.rank}`
                            )}
                          </div>
                          <div className="LBEntryText LBU">
                            <div className="relative overflow-visible mr-5">
                              <Image
                                priority={true}
                                loading="eager"
                                ref={
                                  !entry.user.images.border?.includes(
                                    "glitch_border.gif",
                                  )
                                    ? undefined
                                    : glitch.ref
                                }
                                src={
                                  !entry.user.images.avatar
                                    ? "/assets/images/PFPPlaceholder.png"
                                    : `${process.env.API_URL}/assets/${entry.user.id}/avatar`
                                }
                                alt="Profile Picture"
                                width={32}
                                height={32}
                                key={index}
                                className="LBPFP"
                              />
                              {entry.user.images.border && (
                                <Image
                                  loading="eager"
                                  priority={true}
                                  src={`/assets/images/users/borders/${entry.user.images.border}`}
                                  alt="Border Image"
                                  className="LBBorder"
                                  width={220}
                                  height={220}
                                  unoptimized={true}
                                />
                              )}
                            </div>
                            <span className="max-w-[135px] lg:max-w-[300px] truncate">
                              {entry.user.username}
                            </span>
                          </div>
                          <div className="LBEntryText LBS">{entry.score}</div>
                        </div>
                      </Link>
                    ),
                  )}
              </Reveal>
            </>
          )}
        </div>
        <div className="w-full flex flex-row justify-evenly rounded-none xl:rounded-b-2xl overflow-hidden">
          <div className="bg-[#00000033] w-full flex items-center justify-center h-12">
            <h1>The leaderboard only shows the top 10 players</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
