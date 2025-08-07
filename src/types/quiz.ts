export interface QuizQuestion {
  id: string;
  topic: PADITopic;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface PADITopic {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export interface UserProgress {
  currentStreak: number;
  longestStreak: number;
  totalPoints: number;
  lastQuizDate: string | null;
  topicProgress: Record<string, TopicProgress>;
  completedQuizzes: string[];
  earnedBadges: string[];
}

export interface TopicProgress {
  topicId: string;
  questionsAnswered: number;
  questionsCorrect: number;
  masteryLevel: number; // 0-100 percentage
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  criteria: {
    type: 'streak' | 'topic_mastery' | 'total_points' | 'perfect_quiz';
    target: number;
    topicId?: string;
  };
  points: number;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  totalPoints: number;
  currentStreak: number;
  avatar: string;
  badgeCount: number;
}

export interface DailyQuiz {
  id: string;
  date: string;
  questions: QuizQuestion[];
  completed: boolean;
  score?: number;
  timeTaken?: number;
}