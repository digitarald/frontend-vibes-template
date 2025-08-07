import { QuizQuestion, PADI_TOPICS, PadiTopic } from '@/types/quiz';

export const MOCK_QUESTIONS: QuizQuestion[] = [
  // Physics & Physiology
  {
    id: 'phys_001',
    topic: PADI_TOPICS.PHYSICS_PHYSIOLOGY,
    difficulty: 1,
    question: 'What happens to air spaces in your body as you descend during a dive?',
    options: [
      'They expand due to increased pressure',
      'They compress due to increased pressure',
      'They remain the same size',
      'They fill with water automatically'
    ],
    correctAnswer: 1,
    explanation: 'As you descend, water pressure increases, causing air spaces in your body (like your lungs, ears, and mask) to compress according to Boyle\'s Law.',
    tags: ['pressure', 'boyles-law', 'physiology'],
    estimatedTime: 30
  },
  {
    id: 'phys_002',
    topic: PADI_TOPICS.PHYSICS_PHYSIOLOGY,
    difficulty: 2,
    question: 'At what depth does the pressure become 2 atmospheres absolute (ATA)?',
    options: ['10 meters/33 feet', '20 meters/66 feet', '30 meters/99 feet', '40 meters/132 feet'],
    correctAnswer: 0,
    explanation: 'Pressure increases by 1 atmosphere for every 10 meters (33 feet) of depth. At 10m/33ft, you have 1 atmosphere from the air above plus 1 atmosphere from the water, totaling 2 ATA.',
    tags: ['pressure', 'depth', 'atmosphere'],
    estimatedTime: 45
  },
  {
    id: 'phys_003',
    topic: PADI_TOPICS.PHYSICS_PHYSIOLOGY,
    difficulty: 3,
    question: 'Which gas law explains why you must never hold your breath while ascending?',
    options: ['Henry\'s Law', 'Boyle\'s Law', 'Dalton\'s Law', 'Gay-Lussac\'s Law'],
    correctAnswer: 1,
    explanation: 'Boyle\'s Law states that as pressure decreases (during ascent), gas volume increases. Holding your breath while ascending can cause lung over-expansion injuries.',
    tags: ['gas-laws', 'ascent', 'safety', 'boyles-law'],
    estimatedTime: 60
  },

  // Equipment
  {
    id: 'equip_001',
    topic: PADI_TOPICS.EQUIPMENT,
    difficulty: 1,
    question: 'What is the primary purpose of a regulator?',
    options: [
      'To measure air consumption',
      'To reduce high-pressure air to ambient pressure',
      'To filter impurities from the air',
      'To warm the air you breathe'
    ],
    correctAnswer: 1,
    explanation: 'A regulator reduces the high pressure in your tank (around 200 bar/3000 psi) to ambient water pressure so you can breathe normally underwater.',
    tags: ['regulator', 'breathing', 'pressure'],
    estimatedTime: 25
  },
  {
    id: 'equip_002',
    topic: PADI_TOPICS.EQUIPMENT,
    difficulty: 2,
    question: 'How often should diving equipment be professionally serviced?',
    options: ['Every 6 months', 'Annually', 'Every 2 years', 'Only when problems occur'],
    correctAnswer: 1,
    explanation: 'Most diving equipment manufacturers recommend annual professional servicing to ensure safety and optimal performance, regardless of usage frequency.',
    tags: ['maintenance', 'service', 'safety'],
    estimatedTime: 35
  },
  {
    id: 'equip_003',
    topic: PADI_TOPICS.EQUIPMENT,
    difficulty: 3,
    question: 'What is the recommended maximum working pressure for most recreational diving cylinders?',
    options: ['200 bar/3000 psi', '232 bar/3300 psi', '300 bar/4500 psi', '207 bar/3000 psi'],
    correctAnswer: 0,
    explanation: 'Most recreational aluminum cylinders have a working pressure of 207 bar (3000 psi), while steel cylinders often operate at 232 bar (3300+ psi). The most common standard is 200 bar/3000 psi.',
    tags: ['cylinder', 'pressure', 'specifications'],
    estimatedTime: 50
  },

  // Safety & Emergency
  {
    id: 'safety_001',
    topic: PADI_TOPICS.SAFETY_EMERGENCY,
    difficulty: 1,
    question: 'What should you do if you lose your buddy underwater?',
    options: [
      'Continue the dive alone',
      'Look for one minute, then surface',
      'Signal with your tank banger loudly',
      'Descend deeper to look for them'
    ],
    correctAnswer: 1,
    explanation: 'The standard procedure is to look around for no more than one minute, then make a safe ascent to the surface where you can reunite with your buddy.',
    tags: ['buddy-system', 'separation', 'emergency'],
    estimatedTime: 30
  },
  {
    id: 'safety_002',
    topic: PADI_TOPICS.SAFETY_EMERGENCY,
    difficulty: 2,
    question: 'What is the universal distress signal at the surface?',
    options: [
      'Waving one hand overhead',
      'Shouting loudly',
      'Splashing water vigorously',
      'Raising both arms and waving'
    ],
    correctAnswer: 0,
    explanation: 'Waving one hand overhead is the universal distress signal at the surface. This clearly indicates you need immediate assistance.',
    tags: ['surface-signals', 'distress', 'emergency'],
    estimatedTime: 25
  },
  {
    id: 'safety_003',
    topic: PADI_TOPICS.SAFETY_EMERGENCY,
    difficulty: 3,
    question: 'What is the recommended ascent rate for recreational diving?',
    options: ['9 meters/30 feet per minute', '18 meters/60 feet per minute', '27 meters/90 feet per minute', '6 meters/20 feet per minute'],
    correctAnswer: 0,
    explanation: 'The maximum recommended ascent rate is 9 meters (30 feet) per minute, with slower ascents being even safer. This helps prevent decompression injuries.',
    tags: ['ascent-rate', 'decompression', 'safety'],
    estimatedTime: 45
  },

  // Buoyancy Control
  {
    id: 'buoy_001',
    topic: PADI_TOPICS.BUOYANCY,
    difficulty: 1,
    question: 'What is neutral buoyancy?',
    options: [
      'Floating at the surface',
      'Sinking to the bottom',
      'Neither rising nor sinking in the water column',
      'Ascending slowly toward the surface'
    ],
    correctAnswer: 2,
    explanation: 'Neutral buoyancy means you neither sink nor float, allowing you to hover effortlessly at any depth without using your fins to maintain position.',
    tags: ['buoyancy', 'neutral', 'hovering'],
    estimatedTime: 20
  },
  {
    id: 'buoy_002',
    topic: PADI_TOPICS.BUOYANCY,
    difficulty: 2,
    question: 'How does your buoyancy change as you descend?',
    options: [
      'You become more buoyant',
      'Your buoyancy stays the same',
      'You become less buoyant',
      'It depends on the water temperature'
    ],
    correctAnswer: 2,
    explanation: 'As you descend, increasing pressure compresses your wetsuit and BCD air, making you less buoyant. You may need to add air to your BCD to maintain neutral buoyancy.',
    tags: ['descent', 'pressure', 'buoyancy-changes'],
    estimatedTime: 40
  },
  {
    id: 'buoy_003',
    topic: PADI_TOPICS.BUOYANCY,
    difficulty: 3,
    question: 'What is the most efficient way to achieve fine buoyancy adjustments?',
    options: [
      'Using large BCD inflations/deflations',
      'Controlled breathing techniques',
      'Swimming up or down with fins',
      'Adjusting weight belt position'
    ],
    correctAnswer: 1,
    explanation: 'Controlled breathing is the most efficient method for fine buoyancy control. Inhaling makes you slightly more buoyant, exhaling makes you less buoyant.',
    tags: ['breathing', 'fine-control', 'technique'],
    estimatedTime: 55
  },

  // Skills
  {
    id: 'skills_001',
    topic: PADI_TOPICS.SKILLS,
    difficulty: 1,
    question: 'What should you do if water enters your mask?',
    options: [
      'Surface immediately',
      'Remove the mask completely',
      'Look up, press top of mask, and exhale through nose',
      'Shake your head vigorously'
    ],
    correctAnswer: 2,
    explanation: 'To clear water from your mask, look slightly upward, press the top of the mask to your forehead, and exhale through your nose to push the water out the bottom.',
    tags: ['mask-clearing', 'skills', 'technique'],
    estimatedTime: 25
  },
  {
    id: 'skills_002',
    topic: PADI_TOPICS.SKILLS,
    difficulty: 2,
    question: 'What is the first step in regulator recovery?',
    options: [
      'Feel around behind your right shoulder',
      'Look down and to the right',
      'Signal your buddy for help',
      'Reach over your right shoulder and sweep forward'
    ],
    correctAnswer: 3,
    explanation: 'The arm sweep method is most effective: reach over your right shoulder and sweep your arm forward and down to catch the regulator hose.',
    tags: ['regulator-recovery', 'skills', 'technique'],
    estimatedTime: 35
  },
  {
    id: 'skills_003',
    topic: PADI_TOPICS.SKILLS,
    difficulty: 3,
    question: 'When practicing controlled emergency swimming ascent (CESA), what is the most important safety consideration?',
    options: [
      'Swimming as fast as possible',
      'Holding your breath throughout',
      'Continuously exhaling to prevent lung overexpansion',
      'Stopping at safety stops'
    ],
    correctAnswer: 2,
    explanation: 'During CESA, you must continuously exhale (saying "ahhhh") to prevent lung overexpansion injury as you ascend and pressure decreases.',
    tags: ['CESA', 'emergency-ascent', 'safety', 'exhaling'],
    estimatedTime: 60
  },

  // Dive Planning
  {
    id: 'plan_001',
    topic: PADI_TOPICS.DIVE_PLANNING,
    difficulty: 1,
    question: 'What information is essential for dive planning?',
    options: [
      'Maximum depth and bottom time only',
      'Maximum depth, bottom time, and surface interval',
      'Only the dive site location',
      'Water temperature only'
    ],
    correctAnswer: 1,
    explanation: 'Essential dive planning information includes maximum depth, planned bottom time, surface interval since last dive, and environmental conditions.',
    tags: ['planning', 'depth', 'time', 'surface-interval'],
    estimatedTime: 30
  },
  {
    id: 'plan_002',
    topic: PADI_TOPICS.DIVE_PLANNING,
    difficulty: 2,
    question: 'What is a safety stop and when should you perform one?',
    options: [
      'A 1-minute stop at 10 meters after any dive',
      'A 3-minute stop at 5 meters/15 feet after dives deeper than 18 meters/60 feet',
      'A 5-minute stop at 3 meters after decompression dives',
      'Only required for technical diving'
    ],
    correctAnswer: 1,
    explanation: 'A safety stop is a 3-minute pause at 5 meters (15 feet) recommended after dives deeper than 18 meters (60 feet) to reduce decompression stress.',
    tags: ['safety-stop', 'decompression', 'depth'],
    estimatedTime: 45
  },
  {
    id: 'plan_003',
    topic: PADI_TOPICS.DIVE_PLANNING,
    difficulty: 3,
    question: 'According to the RDP, what is the no-decompression limit for 25 meters/82 feet on a first dive?',
    options: ['20 minutes', '29 minutes', '35 minutes', '40 minutes'],
    correctAnswer: 1,
    explanation: 'Using the Recreational Dive Planner (RDP), the no-decompression limit for 25 meters/82 feet on a first dive is 29 minutes.',
    tags: ['RDP', 'no-decompression-limit', 'tables'],
    estimatedTime: 50
  },

  // Environmental Awareness
  {
    id: 'env_001',
    topic: PADI_TOPICS.ENVIRONMENT,
    difficulty: 1,
    question: 'What is the best way to minimize your impact on marine life?',
    options: [
      'Touch everything gently',
      'Maintain good buoyancy and avoid contact',
      'Feed fish to attract them',
      'Collect shells and coral as souvenirs'
    ],
    correctAnswer: 1,
    explanation: 'The best way to protect marine life is to maintain excellent buoyancy control and avoid touching or disturbing any marine organisms or coral.',
    tags: ['marine-life', 'buoyancy', 'conservation'],
    estimatedTime: 25
  },
  {
    id: 'env_002',
    topic: PADI_TOPICS.ENVIRONMENT,
    difficulty: 2,
    question: 'Why should you never chase marine animals?',
    options: [
      'It wastes your air supply',
      'It stresses the animals and disrupts their natural behavior',
      'You might get lost',
      'It\'s against diving etiquette only'
    ],
    correctAnswer: 1,
    explanation: 'Chasing marine animals causes stress, disrupts their natural behavior, and can interfere with feeding, reproduction, and other essential activities.',
    tags: ['marine-behavior', 'conservation', 'ethics'],
    estimatedTime: 35
  },
  {
    id: 'env_003',
    topic: PADI_TOPICS.ENVIRONMENT,
    difficulty: 3,
    question: 'What percentage of the ocean\'s coral reefs are currently threatened by human activities?',
    options: ['About 25%', 'About 50%', 'About 75%', 'Over 90%'],
    correctAnswer: 2,
    explanation: 'Scientists estimate that approximately 75% of the world\'s coral reefs are threatened by local human activities, climate change, and ocean acidification.',
    tags: ['coral-reefs', 'conservation', 'threats'],
    estimatedTime: 40
  }
];

// Helper function to get questions by topic
export function getQuestionsByTopic(topic: PadiTopic): QuizQuestion[] {
  return MOCK_QUESTIONS.filter(q => q.topic === topic);
}

// Helper function to get questions by difficulty
export function getQuestionsByDifficulty(difficulty: 1 | 2 | 3): QuizQuestion[] {
  return MOCK_QUESTIONS.filter(q => q.difficulty === difficulty);
}

// Helper function to get questions by topic and difficulty
export function getQuestionsByTopicAndDifficulty(topic: PadiTopic, difficulty: 1 | 2 | 3): QuizQuestion[] {
  return MOCK_QUESTIONS.filter(q => q.topic === topic && q.difficulty === difficulty);
}

// Get random question from filtered set
export function getRandomQuestion(questions: QuizQuestion[]): QuizQuestion | null {
  if (questions.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * questions.length);
  return questions[randomIndex];
}