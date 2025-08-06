import { UserProgress, QuizQuestion, Achievement, DailyQuiz } from '@/types/quiz';
import { achievements } from '@/data/mockData';

// Local storage keys
export const STORAGE_KEYS = {
  USER_PROGRESS: 'padi-quiz-user-progress',
  DAILY_QUIZ_HISTORY: 'padi-quiz-daily-history'
};

// Calculate points based on difficulty and correctness
export function calculateQuestionPoints(question: QuizQuestion, isCorrect: boolean): number {
  if (!isCorrect) return 0;
  
  const basePoints = {
    easy: 10,
    medium: 15,
    hard: 20
  };
  
  return basePoints[question.difficulty];
}

// Generate today's daily quiz
export function generateDailyQuiz(questions: QuizQuestion[], date: string): DailyQuiz {
  // Simple algorithm: select 5 random questions from different topics when possible
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  const selectedQuestions = shuffled.slice(0, 5);
  
  return {
    id: `daily-${date}`,
    date,
    questions: selectedQuestions,
    completed: false
  };
}

// Check if user can take today's quiz
export function canTakeQuiz(progress: UserProgress): boolean {
  const today = new Date().toISOString().split('T')[0];
  return progress.lastQuizDate !== today;
}

// Update user progress after completing a quiz
export function updateProgressAfterQuiz(
  currentProgress: UserProgress,
  quiz: DailyQuiz,
  answers: number[]
): UserProgress {
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  
  let totalPoints = 0;
  
  // Calculate score and points
  quiz.questions.forEach((question, index) => {
    const isCorrect = answers[index] === question.correctAnswer;
    if (isCorrect) {
      totalPoints += calculateQuestionPoints(question, true);
    }
  });
  
  // Update streak
  let newStreak = currentProgress.currentStreak;
  if (currentProgress.lastQuizDate === yesterday) {
    newStreak += 1;
  } else if (currentProgress.lastQuizDate !== today) {
    newStreak = 1;
  }
  
  // Update topic progress
  const updatedTopicProgress = { ...currentProgress.topicProgress };
  quiz.questions.forEach((question, index) => {
    const topicId = question.topic.id;
    const isCorrect = answers[index] === question.correctAnswer;
    
    if (!updatedTopicProgress[topicId]) {
      updatedTopicProgress[topicId] = {
        topicId,
        questionsAnswered: 0,
        questionsCorrect: 0,
        masteryLevel: 0
      };
    }
    
    const topicProgress = updatedTopicProgress[topicId];
    topicProgress.questionsAnswered += 1;
    if (isCorrect) {
      topicProgress.questionsCorrect += 1;
    }
    topicProgress.masteryLevel = Math.round((topicProgress.questionsCorrect / topicProgress.questionsAnswered) * 100);
  });
  
  return {
    ...currentProgress,
    currentStreak: newStreak,
    longestStreak: Math.max(currentProgress.longestStreak, newStreak),
    totalPoints: currentProgress.totalPoints + totalPoints,
    lastQuizDate: today,
    topicProgress: updatedTopicProgress,
    completedQuizzes: [...currentProgress.completedQuizzes, quiz.id]
  };
}

// Check for new achievements
export function checkNewAchievements(
  oldProgress: UserProgress,
  newProgress: UserProgress
): Achievement[] {
  const newAchievements: Achievement[] = [];
  
  achievements.forEach(achievement => {
    // Skip if already earned
    if (newProgress.earnedBadges.includes(achievement.id)) {
      return;
    }
    
    let isEarned = false;
    
    switch (achievement.criteria.type) {
      case 'streak':
        isEarned = newProgress.currentStreak >= achievement.criteria.target;
        break;
      case 'total_points':
        isEarned = newProgress.totalPoints >= achievement.criteria.target;
        break;
      case 'topic_mastery':
        if (achievement.criteria.topicId) {
          const topicProgress = newProgress.topicProgress[achievement.criteria.topicId];
          isEarned = topicProgress && topicProgress.masteryLevel >= achievement.criteria.target;
        }
        break;
      case 'perfect_quiz':
        // This would be checked in quiz completion logic
        // For now, we'll handle it in the quiz component
        break;
    }
    
    if (isEarned) {
      newAchievements.push(achievement);
    }
  });
  
  return newAchievements;
}

// Load user progress from localStorage
export function loadUserProgress(): UserProgress | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.USER_PROGRESS);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

// Save user progress to localStorage
export function saveUserProgress(progress: UserProgress): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEYS.USER_PROGRESS, JSON.stringify(progress));
  } catch (error) {
    console.error('Failed to save user progress:', error);
  }
}

// Get streak emoji based on streak count
export function getStreakEmoji(streak: number): string {
  if (streak >= 30) return '🏆';
  if (streak >= 14) return '🔥';
  if (streak >= 7) return '⚡';
  if (streak >= 3) return '💪';
  return '🎯';
}

// Format time taken for display
export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}