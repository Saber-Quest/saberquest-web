import { ChallengeType, ChallengeDiff } from "@enums/Challenge";
import { UserInfo, Stats, Today } from "./";

export interface InventoryItem {
  id: string;
  image: string;
  name: string;
  amount: number;
  rarity: number;
}

export interface ChallengeItem {
  name: string;
  image: string;
  rarity: number;
}

interface Challenge {
  name: string;
  description: string;
  type: ChallengeType;
  difficulty: {
    name: ChallengeDiff;
    challenge: number[];
  };
  completedOn: number;
}

export interface ChallengeHistoryItem {
  date: string;
  items: ChallengeItem[];
  qp: number;
  challenge: Challenge;
}

export interface AdvancedUser {
  info: UserInfo;
  stats: Stats;
  today: Today;
  inventory: InventoryItem[];
  challengeHistory: ChallengeHistoryItem[];
}
