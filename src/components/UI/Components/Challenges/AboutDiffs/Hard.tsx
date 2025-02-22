import { ChallengeData } from "@lib/types";
import { ChallengeType as cT } from "@lib/enums/Challenge";

export default function HardDiff({
  challengeDatas,
  desc,
  type,
}: {
  challengeDatas: ChallengeData["difficulties"][1];
  desc: ChallengeData["description"];
  type: ChallengeData["type"];
}) {
  return (
    <div className="chChallenges mainDiffDiv">
      <div className={`allHovers HardHover`}>
        <h1 className={`chTextHeader text-hardreq`}>Hard</h1>
        <div className={`chHardDivider chDivider w-full`} />
        <div className="challengeDesc">{desc}</div>
        <div className="challengeDescGoalDiv">
          {(type === cT.Map && (
            <>
              <span>
                <b className="challengeDescGoal">{challengeDatas.scoresaber}</b>{" "}
                maps
              </span>
            </>
          )) ||
            (type === cT.FCN && (
              <>
                <span>
                  <b className="challengeDescGoal">
                    {challengeDatas.scoresaber}
                  </b>{" "}
                  notes
                </span>
              </>
            )) ||
            (type === cT.PN && (
              <>
                <span>
                  <b className="challengeDescGoal">
                    {challengeDatas.scoresaber}
                  </b>{" "}
                  notes
                </span>
              </>
            )) ||
            (type === cT.PP && (
              <>
                <div className="flexCol">
                  <div>
                    ScoreSaber:{" "}
                    <b className="challengeDescGoal">
                      {challengeDatas.scoresaber}
                    </b>
                    pp
                  </div>
                  <div>
                    BeatLeader:{" "}
                    <b className="challengeDescGoal">
                      {challengeDatas.beatleader}
                    </b>
                    pp
                  </div>
                </div>
              </>
            )) ||
            (type === cT.FCS && (
              <>
                <div className="flexCol">
                  <div>
                    ScoreSaber:{" "}
                    <b className="challengeDescGoal">
                      {challengeDatas.scoresaber}
                    </b>
                    *
                  </div>
                  <div>
                    BeatLeader:{" "}
                    <b className="challengeDescGoal">
                      {challengeDatas.beatleader}
                    </b>
                    *
                  </div>
                </div>
              </>
            )) ||
            (type === cT.XAS && (
              <>
                <div className="flexCol">
                  <div>
                    ScoreSaber:{" "}
                    <b className="challengeDescGoal">
                      {challengeDatas.scoresaber}
                    </b>
                    *
                  </div>
                  <div>
                    BeatLeader:{" "}
                    <b className="challengeDescGoal">
                      {challengeDatas.beatleader}
                    </b>
                    *
                  </div>
                  <div>
                    Acc:{" "}
                    <b className="challengeDescGoal">
                      {challengeDatas.additional}
                    </b>
                    %
                  </div>
                </div>
              </>
            )) ||
            (type === cT.XAPP && (
              <>
                <div className="flexCol">
                  <div>
                    ScoreSaber:{" "}
                    <b className="challengeDescGoal">
                      {challengeDatas.scoresaber}
                    </b>
                    pp
                  </div>
                  <div>
                    BeatLeader:{" "}
                    <b className="challengeDescGoal">
                      {challengeDatas.beatleader}
                    </b>
                    pp
                  </div>
                  <div>
                    Acc:{" "}
                    <b className="challengeDescGoal">
                      {challengeDatas.additional}
                    </b>
                    %
                  </div>
                </div>
              </>
            )) ||
            (type === cT.XAN && (
              <>
                <div className="flexCol">
                  <div>
                    Notes:{" "}
                    <b className="challengeDescGoal">
                      {challengeDatas.scoresaber}
                    </b>
                  </div>
                  <div>
                    Acc:{" "}
                    <b className="challengeDescGoal">
                      {challengeDatas.beatleader}
                    </b>
                    %
                  </div>
                </div>
              </>
            ))}
        </div>
      </div>
    </div>
  );
}
