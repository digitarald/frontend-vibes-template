import { UserAnswer, PADI_TOPICS } from '@/types/quiz';

// Create mock user data for demonstration purposes
export function createMockUserData(): UserAnswer[] {
  const mockAnswers: UserAnswer[] = [];
  const baseDate = new Date();
  
  // Simulate user performance over the last few weeks
  const questionIds = [
    'phys_001', 'phys_002', 'phys_003',
    'equip_001', 'equip_002', 'equip_003',
    'safety_001', 'safety_002', 'safety_003',
    'buoy_001', 'buoy_002', 'buoy_003',
    'skills_001', 'skills_002', 'skills_003',
    'plan_001', 'plan_002', 'plan_003',
    'env_001', 'env_002', 'env_003'
  ];

  // Simulate learning progression - user gets better over time
  for (let day = 14; day >= 0; day--) {
    const sessionDate = new Date(baseDate.getTime() - day * 24 * 60 * 60 * 1000);
    const questionsPerDay = Math.floor(Math.random() * 8) + 3; // 3-10 questions per day
    
    for (let q = 0; q < questionsPerDay; q++) {
      const questionId = questionIds[Math.floor(Math.random() * questionIds.length)];
      
      // Progressive improvement - newer answers more likely to be correct
      const improvementFactor = 1 - (day / 20); // 0 to 0.7
      const baseAccuracy = 0.5 + improvementFactor * 0.3; // 50% to 80% accuracy
      
      // Add some topic-specific variation
      const topicBonus = getTopicDifficultyBonus(questionId);
      const finalAccuracy = Math.min(0.95, baseAccuracy + topicBonus);
      
      const isCorrect = Math.random() < finalAccuracy;
      const timeSpent = Math.floor(Math.random() * 60) + 20; // 20-80 seconds
      
      // Add some time to the session date for each question
      const questionTimestamp = new Date(sessionDate.getTime() + q * 2 * 60 * 1000);
      
      mockAnswers.push({
        questionId,
        selectedAnswer: isCorrect ? getCorrectAnswer(questionId) : getWrongAnswer(questionId),
        isCorrect,
        timeSpent,
        timestamp: questionTimestamp,
      });
    }
  }

  return mockAnswers.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
}

function getTopicDifficultyBonus(questionId: string): number {
  // Simulate user having different strengths
  const topicBonuses: Record<string, number> = {
    'buoy': 0.15,      // User is good at buoyancy
    'env': 0.1,        // Good at environmental awareness
    'safety': 0.05,    // Average at safety
    'equip': 0,        // Average at equipment
    'skills': -0.05,   // Struggles with skills
    'plan': -0.1,      // Struggles with planning
    'phys': -0.15,     // Struggles most with physics
  };

  const topicKey = questionId.split('_')[0];
  return topicBonuses[topicKey] || 0;
}

function getCorrectAnswer(questionId: string): number {
  // Mock correct answers - in real app this would come from question data
  const correctAnswers: Record<string, number> = {
    'phys_001': 1,
    'phys_002': 0,
    'phys_003': 1,
    'equip_001': 1,
    'equip_002': 1,
    'equip_003': 0,
    'safety_001': 1,
    'safety_002': 0,
    'safety_003': 0,
    'buoy_001': 2,
    'buoy_002': 2,
    'buoy_003': 1,
    'skills_001': 2,
    'skills_002': 3,
    'skills_003': 2,
    'plan_001': 1,
    'plan_002': 1,
    'plan_003': 1,
    'env_001': 1,
    'env_002': 1,
    'env_003': 2,
  };

  return correctAnswers[questionId] || 0;
}

function getWrongAnswer(questionId: string): number {
  const correctAnswer = getCorrectAnswer(questionId);
  const options = [0, 1, 2, 3];
  const wrongOptions = options.filter(o => o !== correctAnswer);
  return wrongOptions[Math.floor(Math.random() * wrongOptions.length)];
}

// Load mock data into localStorage for demo
export function loadMockUserDataIntoStorage(): void {
  if (typeof window === 'undefined') return;
  
  try {
    // Check if there's already data
    const existingAnswers = localStorage.getItem('quiz_user_answers');
    if (existingAnswers) {
      console.log('User data already exists, skipping mock data load');
      return;
    }

    const mockAnswers = createMockUserData();
    localStorage.setItem('quiz_user_answers', JSON.stringify(mockAnswers));
    
    console.log(`Loaded ${mockAnswers.length} mock answers for demo`);
  } catch (error) {
    console.error('Error loading mock data:', error);
  }
}

// Clear all user data (for demo reset)
export function clearUserData(): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem('quiz_user_answers');
    localStorage.removeItem('quiz_topic_performance');
    localStorage.removeItem('quiz_spaced_repetition');
    console.log('User data cleared');
  } catch (error) {
    console.error('Error clearing user data:', error);
  }
}

// Get demo user stats for display
export function getDemoUserStats() {
  return {
    questionsAnswered: 127,
    overallAccuracy: 78,
    studyStreak: 5,
    masteryLevel: 68,
    timeSpent: 245, // minutes
    totalSessions: 18,
    averageSessionLength: 13.6, // minutes
    favoriteTopics: [PADI_TOPICS.BUOYANCY, PADI_TOPICS.ENVIRONMENT],
    challengingTopics: [PADI_TOPICS.PHYSICS_PHYSIOLOGY, PADI_TOPICS.DIVE_PLANNING],
  };
}