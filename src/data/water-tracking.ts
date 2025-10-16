/**
 * Mock data for water tracking app
 */

import { UserProfile, QuickAddOption, WaterLog, DailyStats, StreakData, WeeklyStats } from '@/types/water-tracking';

export const mockUserProfile: UserProfile = {
  id: 'user-1',
  name: 'Alex Johnson',
  dailyGoal: 2000, // 2L per day
  weight: 70, // kg
  preferredUnit: 'ml',
  createdAt: new Date('2025-01-01'),
  updatedAt: new Date('2025-10-16'),
};

export const quickAddOptions: QuickAddOption[] = [
  {
    id: 'small-glass',
    label: 'Small Glass',
    amount: 250,
    icon: 'Droplet',
  },
  {
    id: 'medium-glass',
    label: 'Medium Glass',
    amount: 350,
    icon: 'Droplet',
  },
  {
    id: 'large-bottle',
    label: 'Large Bottle',
    amount: 500,
    icon: 'Droplet',
  },
];

// Today's water logs
const now = new Date();
export const mockTodaysLogs: WaterLog[] = [
  {
    id: 'log-1',
    timestamp: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 7, 30),
    amount: 250,
    containerType: 'small-glass',
  },
  {
    id: 'log-2',
    timestamp: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 15),
    amount: 350,
    containerType: 'medium-glass',
  },
  {
    id: 'log-3',
    timestamp: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 45),
    amount: 500,
    containerType: 'large-bottle',
  },
  {
    id: 'log-4',
    timestamp: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 15, 20),
    amount: 350,
    containerType: 'medium-glass',
  },
  {
    id: 'log-5',
    timestamp: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 18, 0),
    amount: 250,
    containerType: 'small-glass',
  },
];

// Today's stats
export const mockTodayStats: DailyStats = {
  date: new Date(),
  totalIntake: mockTodaysLogs.reduce((sum, log) => sum + log.amount, 0),
  goal: mockUserProfile.dailyGoal,
  logs: mockTodaysLogs,
  goalMet: false, // 1700/2000 = 85%
};

// Streak data
export const mockStreakData: StreakData = {
  current: 3,
  longest: 15,
  lastCompletedDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1),
};

// Weekly stats
const generateWeeklyStats = (): WeeklyStats => {
  const weekStart = new Date(now);
  weekStart.setDate(weekStart.getDate() - weekStart.getDay());

  const days: DailyStats[] = [];
  let totalIntake = 0;
  let daysGoalMet = 0;

  for (let i = 0; i < 7; i++) {
    const date = new Date(weekStart);
    date.setDate(date.getDate() + i);

    // Generate realistic daily intake
    const intakes = [
      1800, // Monday
      2100, // Tuesday (met goal)
      2050, // Wednesday (met goal)
      1600, // Thursday
      2200, // Friday (met goal)
      1900, // Saturday
      1700, // Sunday (today)
    ];

    const intake = intakes[i];
    const goalMet = intake >= mockUserProfile.dailyGoal;

    days.push({
      date,
      totalIntake: intake,
      goal: mockUserProfile.dailyGoal,
      logs: [], // Not needed for weekly view
      goalMet,
    });

    totalIntake += intake;
    if (goalMet) daysGoalMet += 1;
  }

  return {
    weekStart,
    days,
    averageIntake: Math.round(totalIntake / 7),
    daysGoalMet,
  };
};

export const mockWeeklyStats = generateWeeklyStats();
