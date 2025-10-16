/**
 * Water tracking app types
 */

export type ContainerType = 'small-glass' | 'medium-glass' | 'large-bottle' | 'custom';

export interface QuickAddOption {
  id: ContainerType;
  label: string;
  amount: number; // in ml
  icon: string;
}

export interface WaterLog {
  id: string;
  timestamp: Date;
  amount: number; // in ml
  containerType: ContainerType;
  notes?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  dailyGoal: number; // in ml
  weight?: number; // in kg
  preferredUnit: 'ml' | 'oz';
  createdAt: Date;
  updatedAt: Date;
}

export interface DailyStats {
  date: Date;
  totalIntake: number; // in ml
  goal: number; // in ml
  logs: WaterLog[];
  goalMet: boolean;
}

export interface StreakData {
  current: number; // consecutive days
  longest: number; // all time longest
  lastCompletedDate: Date | null;
}

export interface WeeklyStats {
  weekStart: Date;
  days: DailyStats[];
  averageIntake: number;
  daysGoalMet: number;
}
