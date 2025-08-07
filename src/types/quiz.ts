// PADI Quiz TypeScript Interfaces

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  topic: PADITopic;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface QuizSession {
  id: string;
  date: string;
  questions: QuizQuestion[];
  answers: (number | null)[];
  score: number;
  completed: boolean;
  timeSpent: number; // in seconds
  challengeType: ChallengeType;
}

export interface UserProgress {
  currentStreak: number;
  longestStreak: number;
  totalPoints: number;
  level: number;
  completedQuizzes: number;
  lastQuizDate: string | null;
  topicProgress: Record<PADITopic, TopicProgress>;
  achievements: Achievement[];
}

export interface TopicProgress {
  topic: PADITopic;
  totalQuestions: number;
  correctAnswers: number;
  masteryLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  lastPracticed: string | null;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: string;
  category: 'streak' | 'topic' | 'points' | 'consistency';
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  points: number;
  currentStreak: number;
  level: number;
  avatarUrl?: string;
}

export type PADITopic = 
  | 'buoyancy-control'
  | 'mask-clearing'
  | 'emergency-procedures'
  | 'dive-planning'
  | 'equipment'
  | 'communication'
  | 'decompression-theory'
  | 'marine-life';

export type ChallengeType = 
  | 'quick-review'
  | 'topic-deep-dive'
  | 'mixed-practice';

export interface QuizSettings {
  questionsPerSession: number;
  timeLimit?: number; // in seconds, null for unlimited
  showExplanations: boolean;
  difficultyMix: {
    easy: number;
    medium: number;
    hard: number;
  };
}

export interface DailyChallenge {
  date: string;
  type: ChallengeType;
  topic?: PADITopic;
  bonusPoints: number;
  description: string;
}