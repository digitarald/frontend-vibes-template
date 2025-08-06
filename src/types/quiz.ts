// PADI Open Water topic areas
export const PADI_TOPICS = {
  PHYSICS_PHYSIOLOGY: 'physics_physiology',
  EQUIPMENT: 'equipment',
  SAFETY_EMERGENCY: 'safety_emergency',
  BUOYANCY: 'buoyancy',
  SKILLS: 'skills',
  DIVE_PLANNING: 'dive_planning',
  ENVIRONMENT: 'environment',
} as const;

export type PadiTopic = typeof PADI_TOPICS[keyof typeof PADI_TOPICS];

export const TOPIC_LABELS: Record<PadiTopic, string> = {
  [PADI_TOPICS.PHYSICS_PHYSIOLOGY]: 'Diving Physics & Physiology',
  [PADI_TOPICS.EQUIPMENT]: 'Equipment Knowledge & Maintenance',
  [PADI_TOPICS.SAFETY_EMERGENCY]: 'Safety Procedures & Emergency Responses',
  [PADI_TOPICS.BUOYANCY]: 'Buoyancy Control Techniques',
  [PADI_TOPICS.SKILLS]: 'Mask Clearing & Regulator Skills',
  [PADI_TOPICS.DIVE_PLANNING]: 'Dive Planning & Procedures',
  [PADI_TOPICS.ENVIRONMENT]: 'Environmental Awareness',
};

export interface QuizQuestion {
  id: string;
  topic: PadiTopic;
  difficulty: 1 | 2 | 3; // 1 = easy, 2 = medium, 3 = hard
  question: string;
  options: string[];
  correctAnswer: number; // index of correct option
  explanation: string;
  tags: string[];
  estimatedTime: number; // seconds
}

export interface UserAnswer {
  questionId: string;
  selectedAnswer: number;
  isCorrect: boolean;
  timeSpent: number; // seconds
  timestamp: Date;
  confidenceLevel?: 1 | 2 | 3 | 4 | 5; // user's confidence rating
}

export interface TopicPerformance {
  topic: PadiTopic;
  totalQuestions: number;
  correctAnswers: number;
  averageTime: number;
  difficulty1Accuracy: number; // accuracy for difficulty 1 questions
  difficulty2Accuracy: number;
  difficulty3Accuracy: number;
  lastAttempt: Date;
  masteryLevel: number; // 0-100 percentage
  needsReview: boolean;
  recommendedFocus: boolean;
}

export interface LearningSession {
  id: string;
  startTime: Date;
  endTime?: Date;
  questionsAnswered: UserAnswer[];
  topics: PadiTopic[];
  sessionType: 'practice' | 'review' | 'assessment';
  performance: {
    accuracy: number;
    averageTime: number;
    topicsImproved: PadiTopic[];
    topicsNeedingWork: PadiTopic[];
  };
}

export interface SpacedRepetitionItem {
  questionId: string;
  topic: PadiTopic;
  nextReviewDate: Date;
  repetitionCount: number;
  easinessFactor: number; // SM-2 algorithm factor
  interval: number; // days until next review
  lastReviewed: Date;
}

export interface UserProfile {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  preferences: {
    dailyQuestionTarget: number;
    preferredSessionLength: number; // minutes
    difficultyPreference: 'adaptive' | 'progressive' | 'mixed';
    focusAreas: PadiTopic[];
  };
  analytics: {
    totalQuestionsAnswered: number;
    overallAccuracy: number;
    studyStreak: number; // consecutive days
    timeSpent: number; // total minutes
    topicPerformance: TopicPerformance[];
    learningVelocity: number; // questions per hour
    retentionRate: number; // percentage
  };
}

export interface RecommendationItem {
  id: string;
  type: 'focus_topic' | 'review_session' | 'difficulty_adjustment' | 'study_break';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  actionText: string;
  relatedTopic?: PadiTopic;
  estimatedTime?: number; // minutes
  reasoning: string;
  createdAt: Date;
}

export interface AdaptiveQuizState {
  currentQuestion?: QuizQuestion;
  questionsRemaining: number;
  sessionProgress: number; // 0-100 percentage
  currentStreak: number;
  sessionAccuracy: number;
  adaptiveParams: {
    currentDifficulty: number; // 1-3, can be decimal
    focusTopics: PadiTopic[];
    avoidTopics: PadiTopic[];
    reviewMode: boolean;
  };
}