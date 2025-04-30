// filepath: /Users/digitarald/Developer/frontend-vibes/src/lib/types.ts
export interface UserProfile {
  wizardAnswers: Record<string, string>;
  chronoType?: string;
  barriers?: string[];
  motivationProfile?: Record<string, number>;
  createdAt: string;
}

export interface DailyPlan {
  day: number;
  bedtime: string;
  waketime: string;
  goal: string;
  completed: boolean;
}

export interface SleepLog {
  start: string;
  end?: string;
  duration?: number;
}

export interface JournalEntry {
  date: string;
  text: string;
  moodTag: string;
}

export interface StreakData {
  current: number;
  longest: number;
  lastUpdated: string;
}

export interface SleepMiniState {
  userProfile?: UserProfile;
  plan?: DailyPlan[];
  sleepLogs?: SleepLog[];
  journalEntries?: JournalEntry[];
  streak?: StreakData;
}

// Wizard question types
export interface WizardQuestion {
  id: string;
  text: string;
  options: WizardOption[];
}

export interface WizardOption {
  id: string;
  text: string;
}

// Types of sleep concerns
export const SleepConcernTypes = {
  DURATION: 'duration',
  AWAKENINGS: 'awakenings',
  ENERGY: 'energy',
  OTHER: 'other',
} as const;

export type SleepConcernType = typeof SleepConcernTypes[keyof typeof SleepConcernTypes];
