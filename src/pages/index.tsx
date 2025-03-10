import React from "react";
import { Animate, AnimateGroup } from "react-simple-animate";
import Header from "@comp/Meta/Title";

export default function Home() {
  return (
    <>
      <Header
        title={`Frontpage`}
        link={`${process.env.PUBLIC_URL}/`}
        contents={`${process.env.PUBLIC_NAME} is a website focused on making your Beat Saber experience more enjoyable by giving you fun and interactive challenges every day.`}
        image={`${process.env.PUBLIC_URL}/assets/images/Logo.png`}
      />
      <div className="fpBody">
        <div className="fpleftSide">
          <div className="fpBodyText">
            <h1 className="fpTextHeader">
              Welcome to Saber<span className="fpHeaderHighlight">Quest</span>!
            </h1>
            <p className="fpBodyText">
              Saber<span className="fpBodyHighlight">Quest</span> is a website
              focused on making your Beat Saber experience more enjoyable by
              giving you fun and{" "}
              <span className="fpBodyHighlight">interactive challenges</span>{" "}
              every day.
            </p>
            <p className="fpBodyText">
              When you complete these challenges you get{" "}
              <span className="fpBodyHighlight">items</span> in your inventory
              that you can <span className="fpBodyHighlight">craft</span> to
              create new items and get higher on the{" "}
              <span className="fpBodyHighlight">leaderboards</span>.
            </p>
          </div>
          <div className="fpCompletionText">
            <p className="fpBodyText">
              You can complete challenges in{" "}
              <span className="fpBodyHighlight">2 ways</span>.
            </p>
          </div>
          <div className="fpCompletionMethods">
            <div className="fpMods">
              <h1 className="fpModsHeader">
                Beat Saber <span className="fpBodyHighlight">Mods</span>
              </h1>
              <p className="fpModsText">
                Coming <span className="fpBodyHighlight">Soon</span>!
              </p>
            </div>
            <div className="fpManual">
              <h1 className="fpManualHeader">
                <span className="fpBodyHighlight">Manual</span> Submission
              </h1>
              <p className="fpManualText">
                As to not over-request score-services, when you{" "}
                <span className="fpBodyHighlight">complete a challenge</span>,
                you need to go the “Challenges“-page and click on the “
                <span className="fpBodyHighlight">Complete Challenge</span>
                ”-button.
              </p>
            </div>
          </div>
        </div>
        <div className="rightSide">
          <div className="fpChallengeText mb-2">
            <h1 className="fpTextHeader whitespace-nowrap">
              Example <span className="fpHeaderHighlight">Challenges</span>!
            </h1>
            <h2 className="fpTextSubheader">Get a play worth, minimum:</h2>
          </div>
          <div className="fpExampleChallenges flex flex-col gap-5">
            <AnimateGroup play>
              <Animate
                start={{ opacity: 0, transform: "translateX(-100px)" }}
                end={{ opacity: 1, transform: "translateX(0px)" }}
                easeType="ease-in-out"
                sequenceIndex={0}
                duration={0.75}
              >
                <div className={`fpExampleNormal`}>
                  <p className="fpReqHeader">Normal</p>
                  <div className="fpNormalDivider fpDivider" />
                  <div className="fpReqs">
                    <p className="fpReq">
                      <span className="fpChallengeHighlight">180</span>pp on
                      ScoreSaber
                    </p>
                    <p className="fpReq">
                      <span className="fpChallengeHighlight">260</span>pp on
                      BeatLeader
                    </p>
                  </div>
                </div>
              </Animate>
              <Animate
                start={{ opacity: 0, transform: "translateX(-100px)" }}
                end={{ opacity: 1, transform: "translateX(0px)" }}
                easeType="ease-in-out"
                sequenceIndex={1}
                duration={0.75}
              >
                <div className={`fpExampleHard`}>
                  <p className="fpReqHeader">Hard</p>
                  <div className="fpHardDivider fpDivider" />
                  <div className="fpReqs">
                    <p className="fpReq">
                      <span className="fpChallengeHighlight">300</span>pp on
                      ScoreSaber
                    </p>
                    <p className="fpReq">
                      <span className="fpChallengeHighlight">400</span>pp on
                      BeatLeader
                    </p>
                  </div>
                </div>
              </Animate>
              <Animate
                start={{ opacity: 0, transform: "translateX(-100px)" }}
                end={{ opacity: 1, transform: "translateX(0px)" }}
                easeType="ease-in-out"
                sequenceIndex={2}
                duration={0.75}
              >
                <div className={`fpExampleExpert`}>
                  <p className="fpReqHeader">Expert</p>
                  <div className="fpExpertDivider fpDivider" />
                  <div className="fpReqs">
                    <p className="fpReq">
                      <span className="fpChallengeHighlight">430</span>pp on
                      ScoreSaber
                    </p>
                    <p className="fpReq">
                      <span className="fpChallengeHighlight">500</span>pp on
                      BeatLeader
                    </p>
                  </div>
                </div>
              </Animate>
            </AnimateGroup>
          </div>
        </div>
      </div>
    </>
  );
}
