import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import { useGlitch } from "react-powerglitch";
import Header from "@comp/Meta/Title";
import { AdvancedUser, SessionUser } from "@lib/types";
import InventoryPanel from "@ui/Profile/Inventory/InventoryPanel";
import ChallengesPanel from "@ui/Profile/Challenges/CompletedChallenges";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    if (params && params.id) {
      const id = params.id;

      try {
        const apiUrl = `${process.env.API_URL}/users/${id}/all`;
        const response = await axios.get<AdvancedUser>(apiUrl);

        if (response.status === 302 || response.status === 200) {
          const user = response.data;
          return {
            props: {
              user,
              notFound: false,
            },
          };
        }
      } catch (error) {
        if (error) {
          throw new Error("User not found");
        }
      }
    }

    return {
      props: {
        user: null,
        notFound: true,
      },
    };
  } catch (error) {
    return {
      props: {
        user: null,
        notFound: true,
      },
    };
  }
};

export default function Profile({
  session,
  user,
  notFound,
  setSession,
  setMessage,
  setType,
  setShow,
}: {
  session: SessionUser | null;
  user: AdvancedUser | null;
  notFound: boolean;
  setSession: (session: SessionUser) => void;
  setMessage: (message: string) => void;
  setType: (type: string) => void;
  setShow: (show: boolean) => void;
}) {
  const router = useRouter();
  const [userData, setUser] = useState<AdvancedUser | null>(user);

  useEffect(() => {
    if (!session || !session.user || !user) return;
    if (session.user.info.id === user.info.id) {
      setUser(session.user);
    }
  }, [user, session]);

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

  if (router.isFallback) {
    return (
      <>
        <div className="flex flex-col pt-[5rem] flex-wrap justify-center items-center">
          <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-black dark:border-white drop-shadow-[0_0_1px_rgba(0,0,0,0.50)] mt-[1rem]"></div>
        </div>
      </>
    );
  }
  if (notFound && !user) {
    return (
      <>
        <Header
          title={`User not found`}
          link={`${process.env.PUBLIC_URL}`}
          contents={`User was not found, please provide a valid user id.`}
          image={`${process.env.PUBLIC_URL}/assets/images/Logo.png`}
        />
        <div className="flex flex-col pt-[5rem] flex-wrap justify-center items-center">
          <h1 className="text-4xl font-bold">User not found</h1>
        </div>
      </>
    );
  } else if (userData) {
    return (
      <>
        <Header
          title={`${userData.info.username}'s Profile`}
          link={`${process.env.PUBLIC_URL}/profile/${userData.info.id}`}
          contents={`Rank: #${userData.stats.rank}
          Challenges Completed: ${userData.stats.challengesCompleted}
          QP: ${userData.stats.qp}
          Account Value: ${userData.stats.value}
          Items: ${userData.inventory.length}`}
          image={`${process.env.API_URL}/assets/${userData.info.id}/avatar`}
        />
        <div className="allDiv mt-32 mb-10 flex justify-center content-center drop-shadow-navBarShadow select-none w-full smoothTran">
          <>
            <div className="userDiv transition-all opacity-1 duration-500 flex flex-col w-fit md:flex-row gap-5">
              <div
                className={`userInfoVer px-2 h-fit pb-10 xl:mb-0 xl:h-[820px] xl:min-w-[400px] rounded-lg`}
                style={{
                  backgroundImage: !userData.info.images.banners.vertical
                    ? `url(/assets/images/users/banners/ver/default.png)`
                    : `url(/api/${userData.info.id}/ver)`,
                  backgroundSize: "cover",
                }}
              >
                <div className="infoDiv relative overflow-visible flex justify-center mt-[-70px]">
                  <Image
                    priority={true}
                    loading="eager"
                    ref={
                      userData.info.images.border?.includes("glitch_border.gif")
                        ? glitch.ref
                        : null
                    }
                    src={
                      !userData.info.images.avatar
                        ? "/assets/images/PFPPlaceholder.png"
                        : `${process.env.API_URL}/assets/${userData.info.id}/avatar`
                    }
                    alt="Profile Picture"
                    width={150}
                    height={150}
                    unoptimized={true}
                    className="rounded-full relative drop-shadow-PFPShadow"
                  />
                  {userData.info.images.border && (
                    <Image
                      priority={true}
                      loading="eager"
                      src={`/assets/images/users/borders/${userData.info.images.border}`}
                      alt="Border Image"
                      className="absolute top-[-35px] z-10"
                      width={220}
                      height={220}
                      unoptimized={true}
                    />
                  )}
                </div>
                <div
                  className={`rounded-lg flex flex-col items-center font-medium`}
                >
                  <p className="profileNameHeader max-w-[inherit] mt-8 p-5 text-center drop-shadow-textShadow">{`${userData.info.username}`}</p>
                  <div className="h-[5px] w-[305px] rounded-full bg-gradient-to-r from-sqyellow mb-5" />
                  <div className="flex flex-col items-center gap-[16px] drop-shadow-textShadow text-[18px] lg:text-[24px]">
                    <p>
                      Rank:{" "}
                      <span
                        className={`${
                          userData.stats.rank === 1 ? "text-sqyellow" : ""
                        }`}
                      >
                        #{userData.stats.rank}
                      </span>
                    </p>
                    <p>
                      Challenges Completed: {userData.stats.challengesCompleted}
                    </p>
                    <p>QP: {userData.stats.qp}</p>
                    <p>Account Value: {userData.stats.value}</p>
                  </div>
                </div>
              </div>
              <div className="profileRightContainer max-w-[800px] xl:min-w-[800px]">
                <div
                  className="userInfoHor min-h-[150px] max-h-[200px] px-4 py-4 sm:px-6 rounded-lg w-full"
                  style={{
                    backgroundImage: !userData.info.images.banners.horizontal
                      ? `url(/assets/images/users/banners/hor/default.png)`
                      : `url(/api/${userData.info.id}/hor)`,
                    backgroundSize: "inherit",
                  }}
                >
                  <div className="flex flex-col items-center">
                    <p className="text-[18px] lg:text-[24px] font-medium text-center drop-shadow-textShadow">
                      About
                    </p>
                    <div className="h-[5px] w-full rounded-full bg-gradient-to-r from-sqyellow my-[10px]" />
                    <span className="text-[12px] lg:text-[14px] text-center max-w-[360px] lg:max-w-[700px] xl:max-w-[900px] drop-shadow-textShadow whitespace-break-spaces break-words smoothTran">
                      {userData.info.about ? (
                        <ReactMarkdown>{userData.info.about}</ReactMarkdown>
                      ) : (
                        "This user has yet to write something!"
                      )}
                    </span>
                  </div>
                </div>
                <div className="flex justify-center mt-[17px] w-full md:max-w-none py-2 px-4 rounded-lg bg-[#161616]">
                  <Tab.Group>
                    <div className="divide-y-[2px] divide-sqyellow max-w-[360px] md:max-w-none">
                      <Tab.List className="flex justify-center">
                        <Tab
                          className={({ selected }: { selected: boolean }) =>
                            `${
                              selected
                                ? "border-sqyellow text-sqyellow drop-shadow-navBarShadow"
                                : "border-transparent"
                            } py-2 px-3 text-[12px] md:text-[16px] hover:text-sqyellow border-b focus:outline-none`
                          }
                        >
                          Inventory
                        </Tab>
                        <Tab
                          className={({ selected }: { selected: boolean }) =>
                            `${
                              selected
                                ? "border-sqyellow text-sqyellow drop-shadow-navBarShadow"
                                : "border-transparent"
                            } py-2 px-3 text-[12px] md:text-[16px] hover:text-sqyellow border-b focus:outline-none`
                          }
                        >
                          Completed Challenges
                        </Tab>
                      </Tab.List>
                      <Tab.Panels className="my-4 focus:outline-none">
                        {/* Inventory */}
                        <InventoryPanel id={userData.info.id} />
                        {/* Completed Challenges */}
                        <Tab.Panel className="my-4">
                          <ChallengesPanel
                            id={userData.info.id}
                            completed={userData.stats.challengesCompleted}
                          />
                        </Tab.Panel>
                      </Tab.Panels>
                    </div>
                  </Tab.Group>
                </div>
              </div>
            </div>
          </>
        </div>
      </>
    );
  }
}
