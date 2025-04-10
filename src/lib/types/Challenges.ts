interface Difficulties {
  difficulty: string;
  color: string;
  beatleader: number;
  scoresaber: number;
  additional: number | null;
}

export interface ChallengeData {
  id: number;
  name: string;
  description: string;
  type: string;
  image: string | null;
  difficulties: Difficulties[];
}

export interface DailyChallenge {
  challengeSet: ChallengeData;
  difficulties: Difficulties[];
}

export interface MapChallenge {
  mapId: string;
  mapHash: string;
  name: string;
  mappers: string;
  image: string;
  downloadURL: string;
  startedOn: Number;
  willEnd: Number;
}

export interface MapChallengeUser {
  id: string;
  username: string;
  images: {
    avatar: string;
    banners: {
      vertical: string | null;
      horizontal: string | null;
    };
    border: string | null;
  };
  patreon: boolean;
}

export interface MapChallengeLeaderboard {
  user: MapChallengeUser;
  rank: number;
  score: number;
}
