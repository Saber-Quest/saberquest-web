import { ChallengeData } from "@lib/types";
import { NormalDiff, HardDiff, ExpertDiff } from "./AboutDiffs";

export default function AboutChallenges({
  challengeDatas,
}: {
  challengeDatas: ChallengeData;
}) {
  return (
    <div className="mainOuterChalDiv">
      <div className="chChallenges flexCol lg:flex-row gap-12 px-5">
        <NormalDiff
          challengeDatas={challengeDatas.difficulties[0]}
          desc={challengeDatas.description}
          type={challengeDatas.type}
        />
        <HardDiff
          challengeDatas={challengeDatas.difficulties[1]}
          desc={challengeDatas.description}
          type={challengeDatas.type}
        />
        <ExpertDiff
          challengeDatas={challengeDatas.difficulties[2]}
          desc={challengeDatas.description}
          type={challengeDatas.type}
        />
      </div>
    </div>
  );
}
