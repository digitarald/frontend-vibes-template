import { PADITopic, QuizQuestion, Achievement, LeaderboardEntry, UserProgress } from '@/types/quiz';

export const padiTopics: PADITopic[] = [
  {
    id: 'physics-physiology',
    name: 'Physics & Physiology',
    description: 'Pressure effects, buoyancy, and air consumption',
    icon: '🌊',
    color: 'hsl(220, 70%, 50%)'
  },
  {
    id: 'equipment',
    name: 'Equipment',
    description: 'Diving gear use and maintenance',
    icon: '🤿',
    color: 'hsl(160, 70%, 50%)'
  },
  {
    id: 'safety',
    name: 'Safety Procedures',
    description: 'Emergency responses and safety protocols',
    icon: '🛟',
    color: 'hsl(0, 70%, 50%)'
  },
  {
    id: 'buoyancy',
    name: 'Buoyancy Control',
    description: 'Mastering neutral buoyancy techniques',
    icon: '⚖️',
    color: 'hsl(280, 70%, 50%)'
  },
  {
    id: 'skills',
    name: 'Essential Skills',
    description: 'Mask clearing and regulator recovery',
    icon: '🏊',
    color: 'hsl(200, 70%, 50%)'
  },
  {
    id: 'planning',
    name: 'Dive Planning',
    description: 'Planning procedures and dive tables',
    icon: '📋',
    color: 'hsl(40, 70%, 50%)'
  },
  {
    id: 'environment',
    name: 'Environment',
    description: 'Underwater hazards and conservation',
    icon: '🐠',
    color: 'hsl(120, 70%, 50%)'
  }
];

export const mockQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    topic: padiTopics[0], // Physics & Physiology
    question: 'At what depth does the pressure become 2 atmospheres (ATA)?',
    options: ['10 meters/33 feet', '20 meters/66 feet', '30 meters/99 feet', '40 meters/132 feet'],
    correctAnswer: 0,
    explanation: 'Pressure increases by 1 atmosphere for every 10 meters (33 feet) of depth. At 10m/33ft, pressure is 2 ATA (1 atmosphere of air pressure + 1 atmosphere of water pressure).',
    difficulty: 'easy'
  },
  {
    id: 'q2',
    topic: padiTopics[0],
    question: 'What happens to air spaces in your body as you descend?',
    options: ['They expand', 'They compress', 'They stay the same', 'They fill with water'],
    correctAnswer: 1,
    explanation: 'According to Boyle\'s Law, as pressure increases with depth, air spaces in your body (ears, sinuses, lungs) compress.',
    difficulty: 'easy'
  },
  {
    id: 'q3',
    topic: padiTopics[1], // Equipment
    question: 'How often should you inspect your BCD?',
    options: ['Once a year', 'Before every dive', 'Once a month', 'Only when problems occur'],
    correctAnswer: 1,
    explanation: 'Your BCD should be inspected before every dive to ensure proper inflation, deflation, and check for any damage.',
    difficulty: 'easy'
  },
  {
    id: 'q4',
    topic: padiTopics[2], // Safety
    question: 'What is the most important rule in scuba diving?',
    options: ['Never dive alone', 'Never hold your breath', 'Check your air regularly', 'Stay with your buddy'],
    correctAnswer: 1,
    explanation: 'Never hold your breath while scuba diving. Expanding air in your lungs during ascent can cause serious lung injuries.',
    difficulty: 'medium'
  },
  {
    id: 'q5',
    topic: padiTopics[3], // Buoyancy
    question: 'What is the goal of proper buoyancy control?',
    options: ['To swim faster', 'To conserve air and protect the environment', 'To dive deeper', 'To surface quickly'],
    correctAnswer: 1,
    explanation: 'Proper buoyancy control helps you conserve air, protects marine life and coral reefs, and makes diving more enjoyable.',
    difficulty: 'medium'
  },
  {
    id: 'q6',
    topic: padiTopics[4], // Skills
    question: 'If your mask floods underwater, what should you do first?',
    options: ['Surface immediately', 'Signal your buddy', 'Tilt your head back and exhale through your nose', 'Remove the mask completely'],
    correctAnswer: 2,
    explanation: 'To clear a flooded mask, tilt your head back slightly, press the top of the mask against your forehead, and exhale through your nose.',
    difficulty: 'medium'
  },
  {
    id: 'q7',
    topic: padiTopics[5], // Planning
    question: 'What is a safety stop?',
    options: ['A mandatory stop at 15 feet for 3 minutes', 'A recommended stop at 15 feet for 3 minutes', 'A stop to check equipment', 'A stop to take photos'],
    correctAnswer: 1,
    explanation: 'A safety stop is a recommended 3-minute stop at 15 feet/5 meters at the end of any dive to help eliminate excess nitrogen.',
    difficulty: 'easy'
  },
  {
    id: 'q8',
    topic: padiTopics[6], // Environment
    question: 'What should you do if you encounter marine life while diving?',
    options: ['Touch it gently', 'Take it to the surface', 'Observe without disturbing', 'Feed it'],
    correctAnswer: 2,
    explanation: 'Always observe marine life without disturbing it. Do not touch, feed, or harass underwater creatures.',
    difficulty: 'easy'
  }
];

export const achievements: Achievement[] = [
  {
    id: 'first-dive',
    name: 'First Steps',
    description: 'Complete your first daily quiz',
    icon: '🎯',
    criteria: { type: 'total_points', target: 1 },
    points: 50
  },
  {
    id: 'streak-3',
    name: 'Getting Started',
    description: 'Maintain a 3-day streak',
    icon: '🔥',
    criteria: { type: 'streak', target: 3 },
    points: 100
  },
  {
    id: 'streak-7',
    name: 'Week Warrior',
    description: 'Maintain a 7-day streak',
    icon: '⚡',
    criteria: { type: 'streak', target: 7 },
    points: 200
  },
  {
    id: 'streak-30',
    name: 'Month Master',
    description: 'Maintain a 30-day streak',
    icon: '🏆',
    criteria: { type: 'streak', target: 30 },
    points: 500
  },
  {
    id: 'physics-master',
    name: 'Physics Pro',
    description: 'Master Physics & Physiology (80% accuracy)',
    icon: '🌊',
    criteria: { type: 'topic_mastery', target: 80, topicId: 'physics-physiology' },
    points: 150
  },
  {
    id: 'equipment-master',
    name: 'Gear Guru',
    description: 'Master Equipment knowledge (80% accuracy)',
    icon: '🤿',
    criteria: { type: 'topic_mastery', target: 80, topicId: 'equipment' },
    points: 150
  },
  {
    id: 'safety-master',
    name: 'Safety Expert',
    description: 'Master Safety Procedures (80% accuracy)',
    icon: '🛟',
    criteria: { type: 'topic_mastery', target: 80, topicId: 'safety' },
    points: 150
  },
  {
    id: 'perfect-quiz',
    name: 'Perfectionist',
    description: 'Score 100% on a daily quiz',
    icon: '💯',
    criteria: { type: 'perfect_quiz', target: 1 },
    points: 100
  },
  {
    id: 'points-1000',
    name: 'Point Collector',
    description: 'Earn 1000 total points',
    icon: '💎',
    criteria: { type: 'total_points', target: 1000 },
    points: 250
  }
];

export const mockLeaderboard: LeaderboardEntry[] = [
  {
    id: 'user1',
    name: 'Sarah Ocean',
    totalPoints: 2450,
    currentStreak: 15,
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    badgeCount: 8
  },
  {
    id: 'user2',
    name: 'Mike Deep',
    totalPoints: 2100,
    currentStreak: 12,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    badgeCount: 6
  },
  {
    id: 'user3',
    name: 'Emma Reef',
    totalPoints: 1850,
    currentStreak: 8,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    badgeCount: 5
  },
  {
    id: 'current-user',
    name: 'You',
    totalPoints: 1200,
    currentStreak: 5,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    badgeCount: 4
  },
  {
    id: 'user4',
    name: 'Alex Current',
    totalPoints: 950,
    currentStreak: 3,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    badgeCount: 3
  }
];

// Initial user progress for demo
export const initialUserProgress: UserProgress = {
  currentStreak: 5,
  longestStreak: 7,
  totalPoints: 1200,
  lastQuizDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Yesterday
  topicProgress: {
    'physics-physiology': {
      topicId: 'physics-physiology',
      questionsAnswered: 12,
      questionsCorrect: 9,
      masteryLevel: 75
    },
    'equipment': {
      topicId: 'equipment',
      questionsAnswered: 8,
      questionsCorrect: 7,
      masteryLevel: 87
    },
    'safety': {
      topicId: 'safety',
      questionsAnswered: 10,
      questionsCorrect: 8,
      masteryLevel: 80
    },
    'buoyancy': {
      topicId: 'buoyancy',
      questionsAnswered: 6,
      questionsCorrect: 4,
      masteryLevel: 67
    },
    'skills': {
      topicId: 'skills',
      questionsAnswered: 5,
      questionsCorrect: 4,
      masteryLevel: 80
    },
    'planning': {
      topicId: 'planning',
      questionsAnswered: 4,
      questionsCorrect: 3,
      masteryLevel: 75
    },
    'environment': {
      topicId: 'environment',
      questionsAnswered: 7,
      questionsCorrect: 6,
      masteryLevel: 86
    }
  },
  completedQuizzes: ['quiz-1', 'quiz-2', 'quiz-3', 'quiz-4', 'quiz-5'],
  earnedBadges: ['first-dive', 'streak-3', 'safety-master', 'equipment-master']
};