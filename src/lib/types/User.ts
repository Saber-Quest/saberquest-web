export interface UserInfo {
  id: string;
  username: string;
  about: string;
  images: {
    avatar: string;
    banners: {
      vertical: string | null;
      horizontal: string | null;
    };
    border: string | null;
  };
  preference: number;
  patreon: boolean;
  autoComplete: boolean;
  admin: boolean;
  banned: boolean;
}

export interface Stats {
  challengesCompleted: number;
  rank: number;
  qp: number;
  value: number;
}

export interface Today {
  difficulty: number;
  completed: boolean;
}

export interface User {
  info: UserInfo;
  stats: Stats;
  today: Today;
}
