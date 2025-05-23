import { DailyChallenge } from "@lib/types/Challenges";
import { ChallengeType as cT } from "@lib/enums/Challenge";

export default function ExpertDiff({
  challengeDatas,
  desc,
  type,
  selDiff,
  showSel,
  finished,
  onSelectDiff,
}: {
  challengeDatas: DailyChallenge["difficulties"][1];
  desc: DailyChallenge["challengeSet"]["description"];
  type: DailyChallenge["challengeSet"]["type"];
  selDiff: number;
  showSel: boolean;
  finished: boolean;
  onSelectDiff: (diff: number) => void;
}) {
  return (
    <div className="chChallenges mainDiffDiv">
      <div
        className={`${
          showSel ? "hover:cursor-pointer" : ""
        } allHovers ExpertHover`}
        onClick={() => onSelectDiff(3)}
      >
        <h1 className={`chTextHeader text-expertreq`}>Expert</h1>
        <div className={`chExpertDivider chDivider w-full`} />
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
        {selDiff == 3 && showSel && (
          <div className="flexCol challengeSelFin">
            {finished ? "Finished" : "Selected"}
          </div>
        )}
      </div>
    </div>
  );
}
