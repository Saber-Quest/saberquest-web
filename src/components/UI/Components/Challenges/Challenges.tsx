import { useEffect, useState } from "react";
import axios from "axios";
import { ChallengeData, SessionUser } from "@lib/types";
import { NormalDiff, HardDiff, ExpertDiff } from "./Diffs";
import { DailyChallenge } from "@lib/types/Challenges";

export default function ChallengeComp({
  challengeDatas,
  session,
  setSession,
  setMessage,
  setType,
  setShow,
}: {
  challengeDatas: DailyChallenge;
  session: SessionUser;
  setSession: (session: SessionUser) => void;
  setMessage: (message: string) => void;
  setType: (type: string) => void;
  setShow: (show: boolean) => void;
}) {
  const [selectedDiff, setSelectedDiff] = useState<number>(0);
  const [showSel, setShowSel] = useState<boolean>(false);
  const [finished, setFinished] = useState<boolean>(false);

  useEffect(() => {
    if (!session) return;
    if (!session.user) return;
    setSelectedDiff(session.user.today.difficulty);
    setFinished(session.user.today.completed);
    setShowSel(true);
  }, [session]);

  const handleSelectDiff = async (diff: number) => {
    if (!session) return;
    if (session.user?.today.completed) {
      setMessage(
        `You already completed a challenge today!\nYou can't change your difficulty anymore.`,
      );
      setType("info");
      setShow(true);
      return;
    }

    await axios
      .put(`${process.env.PUBLIC_URL}/api/profile/setChallenge`, {
        id: diff,
        t: session.jwt,
      })
      .then((response) => {
        if (response.status === 302 || response.status === 200) {
          setSelectedDiff(diff);
          setMessage(`You selected a difficulty!`);
          setType("success");
          setShow(true);
          if (!session.user) return;
          const updatedSession: SessionUser = {
            ...session,
            user: {
              ...session.user,
              today: {
                ...session.user.today,
                difficulty: diff,
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

  const handleFinish = async () => {
    if (!session || !session.user) return;
    if (session.user.today.completed) {
      setMessage(`You already completed a challenge today!`);
      setType("info");
      setShow(true);
      return;
    }
    if (session.user.today.difficulty === 0) {
      setMessage(`You have not selected a challenge!`);
      setType("info");
      setShow(true);
      return;
    }

    await axios
      .post(`${process.env.PUBLIC_URL}/api/profile/finishChallenge`, {
        t: session.jwt,
        id: session.id,
      })
      .then((response) => {
        if (response.status === 302 || response.status === 200) {
          setMessage(`Challenge completed\nGood job!`);
          setType("success");
          setShow(true);
          updateUserSession();
        }
      })
      .catch((error) => {
        setMessage(error.response.data.error);
        setType("error");
        setShow(true);
      });
  };

  const updateUserSession = async () => {
    await axios
      .get(`${process.env.PUBLIC_URL}/api/profile/${session.id}`)
      .then((response) => {
        if (response.status === 302 || response.status === 200) {
          if (!session.user) {
            setMessage(
              "An error occured while updating your profile on the frontend.\n\nPlease reload website to reflect changes.",
            );
            setType("error");
            setShow(true);
            return;
          }
          const updatedSession: SessionUser = {
            ...session,
            user: {
              ...session.user,
              stats: response.data.stats,
              today: response.data.today,
              inventory: response.data.inventory,
              challengeHistory: response.data.challengeHistory,
            },
          };
          setSession(updatedSession);
        }
      });
  };

  return (
    <div className="mainOuterChalDiv">
      <div className="chChallenges flexCol lg:flex-row gap-12 px-5">
        <NormalDiff
          challengeDatas={challengeDatas.difficulties[0]}
          desc={challengeDatas.challengeSet.description}
          type={challengeDatas.challengeSet.type}
          selDiff={selectedDiff}
          showSel={showSel}
          finished={finished}
          onSelectDiff={handleSelectDiff}
        />
        <HardDiff
          challengeDatas={challengeDatas.difficulties[1]}
          desc={challengeDatas.challengeSet.description}
          type={challengeDatas.challengeSet.type}
          selDiff={selectedDiff}
          showSel={showSel}
          finished={finished}
          onSelectDiff={handleSelectDiff}
        />
        <ExpertDiff
          challengeDatas={challengeDatas.difficulties[2]}
          desc={challengeDatas.challengeSet.description}
          type={challengeDatas.challengeSet.type}
          selDiff={selectedDiff}
          showSel={showSel}
          finished={finished}
          onSelectDiff={handleSelectDiff}
        />
      </div>
      {showSel && (
        <div className="chalFinishBtn" onClick={handleFinish}>
          Complete Challenge
        </div>
      )}
    </div>
  );
}
