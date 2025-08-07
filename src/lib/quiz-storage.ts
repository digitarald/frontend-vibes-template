import { UserProgress, QuizSession, TopicProgress, Achievement } from '@/types/quiz';

const STORAGE_KEYS = {
  USER_PROGRESS: 'padi-quiz-progress',
  QUIZ_SESSIONS: 'padi-quiz-sessions',
  CURRENT_SESSION: 'padi-current-session'
} as const;

// Default user progress
const defaultUserProgress: UserProgress = {
  currentStreak: 0,
  longestStreak: 0,
  totalPoints: 0,
  level: 1,
  completedQuizzes: 0,
  lastQuizDate: null,
  topicProgress: {
    'buoyancy-control': { topic: 'buoyancy-control', totalQuestions: 0, correctAnswers: 0, masteryLevel: 'beginner', lastPracticed: null },
    'mask-clearing': { topic: 'mask-clearing', totalQuestions: 0, correctAnswers: 0, masteryLevel: 'beginner', lastPracticed: null },
    'emergency-procedures': { topic: 'emergency-procedures', totalQuestions: 0, correctAnswers: 0, masteryLevel: 'beginner', lastPracticed: null },
    'dive-planning': { topic: 'dive-planning', totalQuestions: 0, correctAnswers: 0, masteryLevel: 'beginner', lastPracticed: null },
    'equipment': { topic: 'equipment', totalQuestions: 0, correctAnswers: 0, masteryLevel: 'beginner', lastPracticed: null },
    'communication': { topic: 'communication', totalQuestions: 0, correctAnswers: 0, masteryLevel: 'beginner', lastPracticed: null },
    'decompression-theory': { topic: 'decompression-theory', totalQuestions: 0, correctAnswers: 0, masteryLevel: 'beginner', lastPracticed: null },
    'marine-life': { topic: 'marine-life', totalQuestions: 0, correctAnswers: 0, masteryLevel: 'beginner', lastPracticed: null }
  },
  achievements: []
};

// Local storage utilities
export const storage = {
  // Get user progress from localStorage
  getUserProgress(): UserProgress {
    if (typeof window === 'undefined') return defaultUserProgress;
    
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.USER_PROGRESS);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Merge with defaults to handle new fields
        return { ...defaultUserProgress, ...parsed };
      }
    } catch (error) {
      console.error('Error loading user progress:', error);
    }
    
    return defaultUserProgress;
  },

  // Save user progress to localStorage
  saveUserProgress(progress: UserProgress): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(STORAGE_KEYS.USER_PROGRESS, JSON.stringify(progress));
    } catch (error) {
      console.error('Error saving user progress:', error);
    }
  },

  // Get all quiz sessions
  getQuizSessions(): QuizSession[] {
    if (typeof window === 'undefined') return [];
    
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.QUIZ_SESSIONS);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading quiz sessions:', error);
      return [];
    }
  },

  // Save quiz session
  saveQuizSession(session: QuizSession): void {
    if (typeof window === 'undefined') return;
    
    try {
      const sessions = this.getQuizSessions();
      const existingIndex = sessions.findIndex(s => s.id === session.id);
      
      if (existingIndex >= 0) {
        sessions[existingIndex] = session;
      } else {
        sessions.push(session);
      }
      
      localStorage.setItem(STORAGE_KEYS.QUIZ_SESSIONS, JSON.stringify(sessions));
    } catch (error) {
      console.error('Error saving quiz session:', error);
    }
  },

  // Get current session (in-progress quiz)
  getCurrentSession(): QuizSession | null {
    if (typeof window === 'undefined') return null;
    
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CURRENT_SESSION);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error('Error loading current session:', error);
      return null;
    }
  },

  // Save current session
  saveCurrentSession(session: QuizSession | null): void {
    if (typeof window === 'undefined') return;
    
    try {
      if (session) {
        localStorage.setItem(STORAGE_KEYS.CURRENT_SESSION, JSON.stringify(session));
      } else {
        localStorage.removeItem(STORAGE_KEYS.CURRENT_SESSION);
      }
    } catch (error) {
      console.error('Error saving current session:', error);
    }
  },

  // Clear all data (for development/testing)
  clearAllData(): void {
    if (typeof window === 'undefined') return;
    
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  }
};

// Progress calculation utilities
export const progressUtils = {
  // Calculate points for a quiz session
  calculateSessionPoints(session: QuizSession): number {
    const basePoints = session.answers.reduce((total, answer, index) => {
      if (answer === session.questions[index].correctAnswer) {
        return total + 10; // 10 points per correct answer
      }
      return total;
    }, 0);

    // Bonus points for perfect score
    const perfectBonus = session.score === 100 ? 50 : 0;
    
    // Time bonus (faster completion = more points)
    const timeBonus = session.timeSpent < 300 ? 20 : 0; // 5 minutes or less
    
    return basePoints + perfectBonus + timeBonus;
  },

  // Update streak based on last quiz date
  updateStreak(progress: UserProgress, currentDate: string): UserProgress {
    const lastDate = progress.lastQuizDate;
    
    if (!lastDate) {
      // First quiz ever
      return {
        ...progress,
        currentStreak: 1,
        longestStreak: Math.max(1, progress.longestStreak),
        lastQuizDate: currentDate
      };
    }
    
    const lastDateObj = new Date(lastDate);
    const currentDateObj = new Date(currentDate);
    const daysDiff = Math.floor((currentDateObj.getTime() - lastDateObj.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysDiff === 1) {
      // Consecutive day
      const newStreak = progress.currentStreak + 1;
      return {
        ...progress,
        currentStreak: newStreak,
        longestStreak: Math.max(newStreak, progress.longestStreak),
        lastQuizDate: currentDate
      };
    } else if (daysDiff === 0) {
      // Same day (don't update streak)
      return progress;
    } else {
      // Streak broken
      return {
        ...progress,
        currentStreak: 1,
        lastQuizDate: currentDate
      };
    }
  },

  // Update topic progress
  updateTopicProgress(progress: UserProgress, session: QuizSession): UserProgress {
    const updatedTopicProgress = { ...progress.topicProgress };
    
    session.questions.forEach((question, index) => {
      const topic = question.topic;
      const isCorrect = session.answers[index] === question.correctAnswer;
      
      const currentProgress = updatedTopicProgress[topic];
      updatedTopicProgress[topic] = {
        ...currentProgress,
        totalQuestions: currentProgress.totalQuestions + 1,
        correctAnswers: currentProgress.correctAnswers + (isCorrect ? 1 : 0),
        lastPracticed: session.date,
        masteryLevel: this.calculateMasteryLevel(
          currentProgress.correctAnswers + (isCorrect ? 1 : 0),
          currentProgress.totalQuestions + 1
        )
      };
    });
    
    return {
      ...progress,
      topicProgress: updatedTopicProgress
    };
  },

  // Calculate mastery level based on correct answers ratio
  calculateMasteryLevel(correctAnswers: number, totalQuestions: number): TopicProgress['masteryLevel'] {
    if (totalQuestions === 0) return 'beginner';
    
    const ratio = correctAnswers / totalQuestions;
    
    if (ratio >= 0.9 && totalQuestions >= 20) return 'expert';
    if (ratio >= 0.8 && totalQuestions >= 15) return 'advanced';
    if (ratio >= 0.7 && totalQuestions >= 10) return 'intermediate';
    return 'beginner';
  },

  // Calculate level based on total points
  calculateLevel(totalPoints: number): number {
    return Math.floor(totalPoints / 500) + 1; // Level up every 500 points
  },

  // Check for new achievements
  checkAchievements(progress: UserProgress): Achievement[] {
    const newAchievements: Achievement[] = [];
    const currentDate = new Date().toISOString();
    
    // Check streak achievements
    if (progress.currentStreak === 1 && !progress.achievements.find(a => a.id === 'first-dive')) {
      newAchievements.push({
        id: 'first-dive',
        name: 'First Dive',
        description: 'Complete your first daily quiz',
        icon: '🤿',
        unlockedAt: currentDate,
        category: 'streak'
      });
    }
    
    if (progress.currentStreak >= 3 && !progress.achievements.find(a => a.id === 'streak-3')) {
      newAchievements.push({
        id: 'streak-3',
        name: 'Consistent Diver',
        description: 'Maintain a 3-day streak',
        icon: '🔥',
        unlockedAt: currentDate,
        category: 'streak'
      });
    }
    
    // Check points achievements
    if (progress.totalPoints >= 1000 && !progress.achievements.find(a => a.id === 'point-collector')) {
      newAchievements.push({
        id: 'point-collector',
        name: 'Point Collector',
        description: 'Earn 1000 total points',
        icon: '💎',
        unlockedAt: currentDate,
        category: 'points'
      });
    }
    
    // Check topic mastery achievements
    const buoyancyProgress = progress.topicProgress['buoyancy-control'];
    if (buoyancyProgress.correctAnswers >= 10 && !progress.achievements.find(a => a.id === 'buoyancy-master')) {
      newAchievements.push({
        id: 'buoyancy-master',
        name: 'Buoyancy Master',
        description: 'Answer 10 buoyancy questions correctly',
        icon: '⚖️',
        unlockedAt: currentDate,
        category: 'topic'
      });
    }
    
    return newAchievements;
  }
};