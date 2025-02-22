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
