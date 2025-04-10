import { useEffect, useState } from "react";
import axios from "axios";
import { SessionUser } from "@lib/types";
import { MapChallenge } from "@lib/types/Challenges";
import { useGlitch } from "react-powerglitch";
import { User } from "@lib/types";
import { keyframes } from "@emotion/react";
import MapChallengeLeaderboardComp from "./MapChallengeLeaderboard";

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

export default function MapChallengeComp({
  challengeData,
  session,
  setSession,
  setMessage,
  setType,
  setShow,
}: {
  challengeData: MapChallenge;
  session: SessionUser;
  setSession: (session: SessionUser) => void;
  setMessage: (message: string) => void;
  setType: (type: string) => void;
  setShow: (show: boolean) => void;
}) {
  const dummy = new Array(10).fill(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [leaderboard, setLeaderboard] = useState<User[]>();
  const [leaderboardType, setLeaderboardType] = useState<1 | 2 | 3>(1);

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

  useEffect(() => {
    if (!session) return;
    if (!session.user) return;
  }, [session]);

  const handleSubmit = async () => {
    if (!session || !session.user) return;

    await axios
      .post(`${process.env.PUBLIC_URL}/api/profile/submitChallenge`, {
        t: session.jwt,
        id: session.id,
      })
      .then((response) => {
        if (response.status === 302 || response.status === 200) {
          setMessage(`Challenge submitted`);
          setType("success");
          setShow(true);
          window.location.reload();
        }
      })
      .catch((error) => {
        setMessage(error.response.data.error);
        setType("error");
        setShow(true);
      });
  };

  const handleDownload = (url: string) => {
    window.open(url, "_blank")?.focus();
  };

  const handleOneClick = (id: string) => {
    window.open(`beatsaver://${id}`, "_blank")?.focus();
  };

  const handleBeatSaver = (id: string) => {
    window.open(`https://beatsaver.com/maps/${id}`, "_blank")?.focus();
  };

  return (
    <>
      <div className="mainOuterChalDiv">
        <div className="flex rounded-lg overflow-hidden shadow-md border border-gray-200 hover:border-[#FFD073] transition-colors duration-300 max-w-2xl">
          <div className="w-1/3">
            <img
              src={challengeData.image}
              alt="Map Challenge"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-2/3 p-4 flex flex-col">
            <div className="flex-grow">
              <h2 className="text-xl font-bold mb-1">{challengeData.name}</h2>
              <p className="text-gray-500 text-sm mb-4">
                {challengeData.mappers}
              </p>
            </div>
            <div className="flex gap-2 mt-auto">
              <button
                className="px-4 py-2 bg-[#c99328] text-white rounded-md hover:bg-[#9c6f17] transition-colors duration-200 text-sm font-medium flex items-center"
                onClick={() => handleDownload(challengeData.downloadURL)}
              >
                <svg
                  className="w-4 h-4 mr-2"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 16l-5-5h3V4h4v7h3l-5 5z" />
                  <path d="M4 19h16v2H4z" />
                </svg>
                Download
              </button>
              <button
                className="px-4 py-2 bg-[#c99328] text-white rounded-md hover:bg-[#9c6f17] transition-colors duration-200 text-sm font-medium flex items-center"
                onClick={() => handleOneClick(challengeData.mapId)}
              >
                <img
                  src="/assets/images/Pointer.svg"
                  className="w-4 h-4 mr-2 invert brightness-0 invert"
                />
                OneClick
              </button>
              <button
                className="px-4 py-2 bg-[#c9128c] text-white rounded-md hover:bg-[#ab0e76] transition-colors duration-200 text-sm font-medium"
                onClick={() => handleBeatSaver(challengeData.mapId)}
              >
                BeatSaver
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center my-4 gap-3">
        <button
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
            leaderboardType === 1
              ? "bg-[#c99328] text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => setLeaderboardType(1)}
        >
          Beginner
        </button>
        <button
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
            leaderboardType === 2
              ? "bg-[#c99328] text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => setLeaderboardType(2)}
        >
          Intermediate
        </button>
        <button
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
            leaderboardType === 3
              ? "bg-[#c99328] text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => setLeaderboardType(3)}
        >
          Advanced
        </button>
      </div>

      <MapChallengeLeaderboardComp
        leaderboardType={leaderboardType}
        session={session}
        setSession={setSession}
        setMessage={setMessage}
        setType={setType}
        setShow={setShow}
      />
    </>
  );
}
