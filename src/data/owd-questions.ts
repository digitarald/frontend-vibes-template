// TypeScript types for quiz items
export type QuizKind = 'mcq' | 'truefalse' | 'signal';

export interface QuizItemBase {
  id: string;
  kind: QuizKind;
  question: string;
  rationale: string;
  tags: string[];
}

export interface McqItem extends QuizItemBase {
  kind: 'mcq';
  choices: string[];
  answerIndex: number;
}

export interface TrueFalseItem extends QuizItemBase {
  kind: 'truefalse';
  answer: boolean;
}

export interface SignalItem extends QuizItemBase {
  kind: 'signal';
  description: string;
  correct: string;
}

export type QuizItem = McqItem | TrueFalseItem | SignalItem;

// PADI Open Water Diver quiz questions - 50+ educational items
export const owdQuestions: QuizItem[] = [
  // Safety Questions
  {
    id: 'safety-001',
    kind: 'mcq',
    question: 'What does BWRAF stand for in the buddy check sequence?',
    choices: [
      'Breathe, Watch, Review, Air, Final',
      'BCD, Weights, Releases, Air, Final',
      'Buoyancy, Weights, Regulator, Air, Final',
      'Begin, Watch, Relax, Ascend, Finish'
    ],
    answerIndex: 1,
    rationale: 'BWRAF stands for BCD, Weights, Releases, Air, and Final check - the standard buddy check procedure.',
    tags: ['safety', 'buddy-check', 'pre-dive']
  },
  {
    id: 'safety-002',
    kind: 'mcq',
    question: 'What is the maximum recommended ascent rate for recreational diving?',
    choices: [
      '30 feet (9 meters) per minute',
      '60 feet (18 meters) per minute',
      '90 feet (27 meters) per minute',
      '120 feet (36 meters) per minute'
    ],
    answerIndex: 1,
    rationale: 'The maximum ascent rate is 60 feet (18 meters) per minute to prevent decompression injuries.',
    tags: ['safety', 'ascent', 'decompression']
  },
  {
    id: 'safety-003',
    kind: 'truefalse',
    question: 'A safety stop at 15 feet (5 meters) for 3 minutes is mandatory on all dives.',
    answer: false,
    rationale: 'Safety stops are recommended but not always mandatory. They are required when approaching no-decompression limits.',
    tags: ['safety', 'safety-stop', 'decompression']
  },
  {
    id: 'safety-004',
    kind: 'truefalse',
    question: 'You should never hold your breath while scuba diving.',
    answer: true,
    rationale: 'Never hold your breath - breathe continuously to prevent lung overexpansion injuries.',
    tags: ['safety', 'breathing', 'physiology']
  },

  // Physics Questions
  {
    id: 'physics-001',
    kind: 'mcq',
    question: 'According to Boyle\'s Law, what happens to air volume as you descend?',
    choices: [
      'Air volume increases',
      'Air volume decreases',
      'Air volume stays the same',
      'Air volume doubles'
    ],
    answerIndex: 1,
    rationale: 'As pressure increases with depth, air volume decreases proportionally according to Boyle\'s Law.',
    tags: ['physics', 'boyles-law', 'pressure']
  },
  {
    id: 'physics-002',
    kind: 'mcq',
    question: 'At 33 feet (10 meters) of depth, the pressure is approximately:',
    choices: [
      '1 atmosphere (1 bar)',
      '2 atmospheres (2 bar)',
      '3 atmospheres (3 bar)',
      '4 atmospheres (4 bar)'
    ],
    answerIndex: 1,
    rationale: 'Pressure increases by 1 atmosphere for every 33 feet (10 meters) of seawater depth.',
    tags: ['physics', 'pressure', 'depth']
  },
  {
    id: 'physics-003',
    kind: 'truefalse',
    question: 'Water conducts heat 25 times faster than air.',
    answer: true,
    rationale: 'Water conducts heat much faster than air, which is why thermal protection is essential.',
    tags: ['physics', 'thermal', 'heat-loss']
  },

  // Physiology Questions
  {
    id: 'physiology-001',
    kind: 'mcq',
    question: 'What causes decompression sickness (DCS)?',
    choices: [
      'Too much oxygen in the blood',
      'Nitrogen bubbles forming in tissues',
      'Carbon dioxide buildup',
      'Water in the lungs'
    ],
    answerIndex: 1,
    rationale: 'DCS is caused by nitrogen bubbles forming in tissues when ascending too quickly.',
    tags: ['physiology', 'dcs', 'nitrogen']
  },
  {
    id: 'physiology-002',
    kind: 'truefalse',
    question: 'Equalizing your ears should be done gently and early during descent.',
    answer: true,
    rationale: 'Equalize early and often during descent to prevent barotrauma. Never force equalization.',
    tags: ['physiology', 'equalization', 'barotrauma']
  },
  {
    id: 'physiology-003',
    kind: 'mcq',
    question: 'Which technique helps with ear equalization?',
    choices: [
      'Valsalva maneuver',
      'Frenzel maneuver',
      'Toynbee maneuver',
      'All of the above'
    ],
    answerIndex: 3,
    rationale: 'Multiple techniques exist for equalization - find what works best for you.',
    tags: ['physiology', 'equalization', 'techniques']
  },

  // Equipment Questions
  {
    id: 'equipment-001',
    kind: 'mcq',
    question: 'What is the primary purpose of a BCD?',
    choices: [
      'To store air for breathing',
      'To control buoyancy',
      'To keep you warm',
      'To hold your weight belt'
    ],
    answerIndex: 1,
    rationale: 'The BCD (Buoyancy Control Device) is used to achieve neutral buoyancy underwater.',
    tags: ['equipment', 'bcd', 'buoyancy']
  },
  {
    id: 'equipment-002',
    kind: 'truefalse',
    question: 'You should always test your regulator before diving.',
    answer: true,
    rationale: 'Always test your regulator and octopus before entering the water to ensure proper function.',
    tags: ['equipment', 'regulator', 'pre-dive-check']
  },
  {
    id: 'equipment-003',
    kind: 'mcq',
    question: 'How do you clear water from your mask?',
    choices: [
      'Surface immediately',
      'Look up and exhale through your nose',
      'Look down and exhale through your nose',
      'Remove the mask completely'
    ],
    answerIndex: 1,
    rationale: 'Look up slightly, press the top of the mask, and exhale through your nose to clear water.',
    tags: ['equipment', 'mask', 'clearing']
  },
  {
    id: 'equipment-004',
    kind: 'truefalse',
    question: 'Weight belts should have a quick-release mechanism.',
    answer: true,
    rationale: 'Weight systems must be easily releasable in case of emergency for buoyancy control.',
    tags: ['equipment', 'weights', 'safety', 'emergency']
  },

  // Planning Questions
  {
    id: 'planning-001',
    kind: 'mcq',
    question: 'What is the minimum surface interval before flying after diving?',
    choices: [
      '6 hours',
      '12 hours',
      '18 hours',
      '24 hours'
    ],
    answerIndex: 2,
    rationale: 'Wait at least 18 hours before flying after multiple dives to prevent DCS.',
    tags: ['planning', 'flying', 'surface-interval']
  },
  {
    id: 'planning-002',
    kind: 'truefalse',
    question: 'Dive computers eliminate the need for dive planning.',
    answer: false,
    rationale: 'Dive computers are tools to assist with planning, but proper dive planning is always essential.',
    tags: ['planning', 'computers', 'safety']
  },
  {
    id: 'planning-003',
    kind: 'mcq',
    question: 'What does NDL stand for on a dive computer?',
    choices: [
      'No Dive Limit',
      'No Decompression Limit',
      'Normal Descent Level',
      'Nitrogen Depletion Level'
    ],
    answerIndex: 1,
    rationale: 'NDL is No Decompression Limit - the time you can stay at depth without required decompression stops.',
    tags: ['planning', 'ndl', 'decompression', 'computers']
  },

  // Environment Questions
  {
    id: 'environment-001',
    kind: 'truefalse',
    question: 'You should never touch or harass marine life.',
    answer: true,
    rationale: 'Respect marine life by observing without touching. This protects both you and the marine ecosystem.',
    tags: ['environment', 'marine-life', 'conservation']
  },
  {
    id: 'environment-002',
    kind: 'mcq',
    question: 'What should you do if caught in a current?',
    choices: [
      'Swim directly against it',
      'Surface immediately',
      'Swim perpendicular to the current',
      'Drop to the bottom'
    ],
    answerIndex: 2,
    rationale: 'Swim perpendicular to the current to escape it, then swim back to your desired location.',
    tags: ['environment', 'currents', 'safety']
  },
  {
    id: 'environment-003',
    kind: 'truefalse',
    question: 'Poor visibility is always a reason to cancel a dive.',
    answer: false,
    rationale: 'Poor visibility requires extra caution and may limit the dive, but experienced divers can dive safely in reduced visibility.',
    tags: ['environment', 'visibility', 'conditions']
  },

  // Hand Signals
  {
    id: 'signal-001',
    kind: 'signal',
    question: 'What does this signal mean?',
    description: 'Make a circle with thumb and forefinger (OK gesture)',
    correct: 'OK/Everything is fine',
    rationale: 'The OK signal uses thumb and forefinger in a circle to indicate everything is fine.',
    tags: ['signals', 'communication', 'ok']
  },
  {
    id: 'signal-002',
    kind: 'signal',
    question: 'What does this signal mean?',
    description: 'Point thumb upward',
    correct: 'Going up/Ascend',
    rationale: 'Thumb up means going up or ascending. Never use this signal unless you intend to ascend.',
    tags: ['signals', 'communication', 'ascent']
  },
  {
    id: 'signal-003',
    kind: 'signal',
    question: 'What does this signal mean?',
    description: 'Point thumb downward',
    correct: 'Going down/Descend',
    rationale: 'Thumb down means going down or descending.',
    tags: ['signals', 'communication', 'descent']
  },
  {
    id: 'signal-004',
    kind: 'signal',
    question: 'What does this signal mean?',
    description: 'Flat hand moving side to side (like waving no)',
    correct: 'Problem/Something is wrong',
    rationale: 'A flat hand waved side to side indicates a problem or that something is wrong.',
    tags: ['signals', 'communication', 'problem']
  },
  {
    id: 'signal-005',
    kind: 'signal',
    question: 'What does this signal mean?',
    description: 'Point to pressure gauge then make a fist',
    correct: 'Low on air',
    rationale: 'Pointing to gauge and making a fist indicates low air supply.',
    tags: ['signals', 'communication', 'air', 'low-air']
  },
  {
    id: 'signal-006',
    kind: 'signal',
    question: 'What does this signal mean?',
    description: 'Draw finger across throat',
    correct: 'Out of air/Emergency',
    rationale: 'Drawing finger across throat indicates out of air emergency.',
    tags: ['signals', 'communication', 'emergency', 'out-of-air']
  },
  {
    id: 'signal-007',
    kind: 'signal',
    question: 'What does this signal mean?',
    description: 'Hand on top of head',
    correct: 'OK on surface',
    rationale: 'Hand on top of head at the surface indicates you are OK (visible from distance).',
    tags: ['signals', 'communication', 'surface', 'ok']
  },

  // Additional Safety and Emergency Questions
  {
    id: 'emergency-001',
    kind: 'mcq',
    question: 'If your buddy is out of air, what should you do?',
    choices: [
      'Give them your primary regulator',
      'Share air using your octopus',
      'Make an emergency ascent together',
      'All of the above are possible responses'
    ],
    answerIndex: 3,
    rationale: 'Multiple air-sharing techniques exist. The method depends on training and situation.',
    tags: ['emergency', 'air-sharing', 'buddy', 'safety']
  },
  {
    id: 'emergency-002',
    kind: 'truefalse',
    question: 'If you become separated from your buddy, you should search for exactly 1 minute before surfacing.',
    answer: true,
    rationale: 'The standard procedure is to search for 1 minute, then make a safe ascent to the surface.',
    tags: ['emergency', 'separation', 'buddy', 'procedures']
  },

  // Additional Equipment Questions
  {
    id: 'equipment-005',
    kind: 'mcq',
    question: 'What should you do if your regulator free flows?',
    choices: [
      'Panic and surface immediately',
      'Turn off the air supply',
      'Switch to your octopus',
      'Continue diving normally'
    ],
    answerIndex: 2,
    rationale: 'Switch to your octopus (alternate air source) and end the dive safely if regulator free flows.',
    tags: ['equipment', 'regulator', 'free-flow', 'emergency']
  },

  // More Physiology
  {
    id: 'physiology-004',
    kind: 'mcq',
    question: 'What is nitrogen narcosis?',
    choices: [
      'A type of decompression sickness',
      'An impairment of mental faculties due to nitrogen at depth',
      'A breathing technique',
      'An equipment malfunction'
    ],
    answerIndex: 1,
    rationale: 'Nitrogen narcosis is an impairment similar to alcohol intoxication that occurs at depth.',
    tags: ['physiology', 'narcosis', 'nitrogen', 'depth']
  },

  // More Planning
  {
    id: 'planning-004',
    kind: 'truefalse',
    question: 'The deepest diver should always lead the dive.',
    answer: false,
    rationale: 'The most experienced or certified diver, or designated dive leader should lead, regardless of depth capability.',
    tags: ['planning', 'leadership', 'buddy', 'procedures']
  },

  // Additional Environment
  {
    id: 'environment-004',
    kind: 'mcq',
    question: 'What should you do if you see a marine animal behaving aggressively?',
    choices: [
      'Try to pet it to calm it down',
      'Take photos as close as possible',
      'Back away slowly and give it space',
      'Make noise to scare it away'
    ],
    answerIndex: 2,
    rationale: 'Always give marine life space and back away slowly if animals show signs of stress or aggression.',
    tags: ['environment', 'marine-life', 'safety', 'behavior']
  },

  // Advanced Safety
  {
    id: 'safety-005',
    kind: 'truefalse',
    question: 'Diving within recreational limits eliminates all risks.',
    answer: false,
    rationale: 'While following limits reduces risk significantly, diving always carries inherent risks that cannot be completely eliminated.',
    tags: ['safety', 'risk', 'limits', 'awareness']
  },

  // Equipment Care
  {
    id: 'equipment-006',
    kind: 'mcq',
    question: 'How should you care for your equipment after a saltwater dive?',
    choices: [
      'Air dry immediately',
      'Rinse thoroughly with fresh water',
      'Store in a sealed container',
      'No special care needed'
    ],
    answerIndex: 1,
    rationale: 'Always rinse equipment thoroughly with fresh water after saltwater diving to prevent corrosion.',
    tags: ['equipment', 'maintenance', 'saltwater', 'care']
  }
];