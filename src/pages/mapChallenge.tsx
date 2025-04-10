import React, { useState, useEffect } from "react";
import { SessionUser } from "@lib/types";
import axios from "axios";
import Header from "@comp/Meta/Title";
import { MapChallenge } from "@lib/types/Challenges";
import MapChallengeComp from "@comp/UI/Components/Challenges/MapChallenges";

export default function Challenges({
  session,
  sessionCheck,
  setSession,
  setMessage,
  setType,
  setShow,
}: {
  session: SessionUser;
  sessionCheck: boolean;
  setSession: (session: SessionUser) => void;
  setMessage: (message: string) => void;
  setType: (type: string) => void;
  setShow: (show: boolean) => void;
}) {
  const [mapChallenge, setMapChallenge] = useState<MapChallenge | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [countdownTime, setCountdownTime] = useState(0);

  useEffect(() => {
    if (countdownTime === 0) {
      axios
        .get(`${process.env.API_URL}/challenges/map`)
        .then((response) => {
          if (response.status === 302 || response.status === 200) {
            setError(false);
            if (response.data !== null) {
              setMapChallenge(response.data);
              setCountdownTime(response.data.willEnd - new Date().getTime());
            }
          } else {
            setError(true);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("An error occurred, contact a developer!");
          console.error(error);
          setError(true);
        });
    }
  }, [mapChallenge, countdownTime]);

  useEffect(() => {
    if (mapChallenge == null) return;

    const interval = setInterval(() => {
      let newCountdownTime = countdownTime - 1000;
      if (newCountdownTime < 0) {
        newCountdownTime = 0;
      }

      setCountdownTime(newCountdownTime);

      if (newCountdownTime === 0) {
        axios.get(`${process.env.API_URL}/challenges/map`).then((response) => {
          if (response.status === 302 || response.status === 200) {
            (newCountdownTime = response.data.willEnd - new Date().getTime()),
              setCountdownTime(newCountdownTime);
          }
        });
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [countdownTime]);

  const formatCountdownTime = (timeRemaining: any) => {
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor(
      (timeRemaining % (1000 * 60 * 60)) / (1000 * 60),
    );
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    return `${days.toString()}:${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };
  return (
    <>
      <Header
        title={`Weekly Map Challenge`}
        link={`${process.env.PUBLIC_URL}/mapChallenge`}
        contents={`The current weekly challenge on ${process.env.PUBLIC_NAME}.`}
        image={`${process.env.PUBLIC_URL}/assets/images/Logo.png`}
      />
      <div className="mx-auto mt-5 mb-12 max-w-[90rem]">
        <div className="chpInnerDiv p-4">
          {mapChallenge != null && !loading && (
            <>
              <h1 className="chpH1Text lg:chTextHeader">
                <span>
                  Map <span className="text-sqyellow">Challenge</span>
                </span>{" "}
                {formatCountdownTime(countdownTime)}
              </h1>
              <div className="chpCCompOuterDiv">
                <div className="mt-8 flexCol">
                  <div className="chpCCompChildDiv">
                    <MapChallengeComp
                      challengeData={mapChallenge}
                      session={session}
                      setSession={setSession}
                      setMessage={setMessage}
                      setType={setType}
                      setShow={setShow}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
