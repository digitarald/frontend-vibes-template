import { QuizQuestion, PADITopic, Achievement, LeaderboardEntry } from '@/types/quiz';

// Mock PADI Open Water Quiz Questions
export const mockQuizQuestions: QuizQuestion[] = [
  // Buoyancy Control
  {
    id: 'buoy-001',
    question: 'What is the primary goal of achieving neutral buoyancy?',
    options: [
      'To swim faster underwater',
      'To float effortlessly at any depth without ascending or descending',
      'To conserve air by staying near the surface',
      'To avoid marine life'
    ],
    correctAnswer: 1,
    explanation: 'Neutral buoyancy allows you to hover motionless in the water column, conserving energy and protecting the underwater environment.',
    topic: 'buoyancy-control',
    difficulty: 'easy'
  },
  {
    id: 'buoy-002',
    question: 'When should you make buoyancy adjustments during a dive?',
    options: [
      'Only at the surface before descending',
      'Continuously throughout the dive as needed',
      'Only when ascending to safety stop',
      'Never during the dive'
    ],
    correctAnswer: 1,
    explanation: 'Buoyancy changes with depth due to wetsuit compression and air consumption, requiring continuous small adjustments.',
    topic: 'buoyancy-control',
    difficulty: 'medium'
  },

  // Mask Clearing
  {
    id: 'mask-001',
    question: 'What is the correct technique for clearing water from your mask underwater?',
    options: [
      'Surface immediately and empty mask',
      'Press top of mask and exhale through nose',
      'Remove mask completely and put it back on',
      'Shake your head vigorously'
    ],
    correctAnswer: 1,
    explanation: 'Press the top of the mask against your forehead and exhale gently through your nose to push water out the bottom.',
    topic: 'mask-clearing',
    difficulty: 'easy'
  },

  // Emergency Procedures
  {
    id: 'emerg-001',
    question: 'What is a Controlled Emergency Swimming Ascent (CESA)?',
    options: [
      'Swimming to shore during an emergency',
      'A rapid ascent to the surface while exhaling',
      'A swimming technique for rough water',
      'An emergency descent procedure'
    ],
    correctAnswer: 1,
    explanation: 'CESA is an emergency ascent technique where you swim to the surface while continuously exhaling to prevent lung overexpansion.',
    topic: 'emergency-procedures',
    difficulty: 'hard'
  },
  {
    id: 'emerg-002',
    question: 'If your buddy is out of air, what should you do first?',
    options: [
      'Signal them to surface immediately',
      'Share your alternate air source',
      'Look for another buddy team',
      'Continue the dive alone'
    ],
    correctAnswer: 1,
    explanation: 'Immediately provide your alternate air source (octopus) to your out-of-air buddy, then begin a controlled ascent together.',
    topic: 'emergency-procedures',
    difficulty: 'medium'
  },

  // Dive Planning
  {
    id: 'plan-001',
    question: 'What factors should be considered when planning a dive?',
    options: [
      'Only the maximum depth',
      'Depth, time, air supply, and environmental conditions',
      'Just the underwater visibility',
      'Only the water temperature'
    ],
    correctAnswer: 1,
    explanation: 'Comprehensive dive planning includes depth limits, bottom time, air consumption, weather, currents, and emergency procedures.',
    topic: 'dive-planning',
    difficulty: 'easy'
  },
  {
    id: 'plan-002',
    question: 'What is the purpose of a safety stop?',
    options: [
      'To check equipment one final time',
      'To allow dissolved nitrogen to safely eliminate from the body',
      'To rest before surfacing',
      'To observe marine life'
    ],
    correctAnswer: 1,
    explanation: 'A 3-5 minute safety stop at 15 feet allows time for nitrogen elimination, reducing decompression sickness risk.',
    topic: 'dive-planning',
    difficulty: 'medium'
  },

  // Equipment
  {
    id: 'equip-001',
    question: 'What should you do if your regulator free-flows underwater?',
    options: [
      'Surface immediately',
      'Turn off the tank valve',
      'Breathe from the side of your mouth and ascend slowly',
      'Remove the regulator completely'
    ],
    correctAnswer: 2,
    explanation: 'With a free-flowing regulator, position it to one side of your mouth, breathe the flowing air, and make a controlled ascent.',
    topic: 'equipment',
    difficulty: 'hard'
  },

  // Communication
  {
    id: 'comm-001',
    question: 'What does the hand signal of a flat hand moving side to side mean?',
    options: [
      'OK/All good',
      'Problem/Something wrong',
      'Stop',
      'Go up/Ascend'
    ],
    correctAnswer: 1,
    explanation: 'A flat hand waving side to side indicates a problem or that something is wrong and needs attention.',
    topic: 'communication',
    difficulty: 'easy'
  },

  // Decompression Theory
  {
    id: 'decomp-001',
    question: 'What happens to nitrogen in your body as you descend?',
    options: [
      'It is eliminated from your lungs',
      'It dissolves into your blood and tissues',
      'It remains unchanged',
      'It converts to oxygen'
    ],
    correctAnswer: 1,
    explanation: 'Increased pressure causes nitrogen to dissolve into blood and tissues. This must be eliminated slowly during ascent.',
    topic: 'decompression-theory',
    difficulty: 'medium'
  },

  // Marine Life
  {
    id: 'marine-001',
    question: 'What is the best practice when encountering marine life while diving?',
    options: [
      'Try to touch and interact with animals',
      'Observe from a respectful distance without disturbing',
      'Feed fish to attract them closer',
      'Make noise to get their attention'
    ],
    correctAnswer: 1,
    explanation: 'Observe marine life respectfully from a distance. Do not touch, chase, or feed marine animals as this can harm them and their ecosystem.',
    topic: 'marine-life',
    difficulty: 'easy'
  }
];

// Topic metadata
export const topicMetadata = {
  'buoyancy-control': {
    name: 'Buoyancy Control',
    description: 'Master neutral buoyancy for effortless diving',
    icon: '⚖️',
    color: 'from-blue-500 to-cyan-500'
  },
  'mask-clearing': {
    name: 'Mask Clearing',
    description: 'Essential skills for mask problems underwater',
    icon: '🤿',
    color: 'from-teal-500 to-blue-500'
  },
  'emergency-procedures': {
    name: 'Emergency Procedures',
    description: 'Critical safety and rescue techniques',
    icon: '🚨',
    color: 'from-red-500 to-orange-500'
  },
  'dive-planning': {
    name: 'Dive Planning',
    description: 'Plan safe and enjoyable dives',
    icon: '📋',
    color: 'from-purple-500 to-blue-500'
  },
  'equipment': {
    name: 'Equipment',
    description: 'Diving gear knowledge and maintenance',
    icon: '🔧',
    color: 'from-gray-500 to-blue-500'
  },
  'communication': {
    name: 'Communication',
    description: 'Hand signals and underwater communication',
    icon: '👋',
    color: 'from-yellow-500 to-orange-500'
  },
  'decompression-theory': {
    name: 'Decompression Theory',
    description: 'Understanding nitrogen and dive physiology',
    icon: '🧬',
    color: 'from-green-500 to-teal-500'
  },
  'marine-life': {
    name: 'Marine Life',
    description: 'Environmental awareness and protection',
    icon: '🐠',
    color: 'from-cyan-500 to-blue-500'
  }
} as const;

// Mock achievements
export const mockAchievements: Achievement[] = [
  {
    id: 'first-dive',
    name: 'First Dive',
    description: 'Complete your first daily quiz',
    icon: '🤿',
    unlockedAt: '',
    category: 'streak'
  },
  {
    id: 'streak-3',
    name: 'Consistent Diver',
    description: 'Maintain a 3-day streak',
    icon: '🔥',
    unlockedAt: '',
    category: 'streak'
  },
  {
    id: 'buoyancy-master',
    name: 'Buoyancy Master',
    description: 'Answer 10 buoyancy questions correctly',
    icon: '⚖️',
    unlockedAt: '',
    category: 'topic'
  },
  {
    id: 'safety-expert',
    name: 'Safety Expert',
    description: 'Master emergency procedures',
    icon: '🚨',
    unlockedAt: '',
    category: 'topic'
  },
  {
    id: 'point-collector',
    name: 'Point Collector',
    description: 'Earn 1000 total points',
    icon: '💎',
    unlockedAt: '',
    category: 'points'
  }
];

// Mock leaderboard
export const mockLeaderboard: LeaderboardEntry[] = [
  {
    id: '1',
    name: 'Marina Explorer',
    points: 2450,
    currentStreak: 12,
    level: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '2', 
    name: 'Deep Diver',
    points: 2200,
    currentStreak: 8,
    level: 4,
    avatarUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b742?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '3',
    name: 'Reef Guardian',
    points: 1980,
    currentStreak: 15,
    level: 4,
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '4',
    name: 'Current Rider',
    points: 1750,
    currentStreak: 5,
    level: 3,
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '5',
    name: 'You',
    points: 1340,
    currentStreak: 3,
    level: 3,
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face'
  }
];

// Function to get random questions for daily quiz
export function getDailyQuizQuestions(count: number = 6): QuizQuestion[] {
  const shuffled = [...mockQuizQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Function to get questions by topic
export function getQuestionsByTopic(topic: PADITopic): QuizQuestion[] {
  return mockQuizQuestions.filter(q => q.topic === topic);
}