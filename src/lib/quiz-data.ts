export interface QuizQuestion {
  id: string;
  category: 'safety' | 'equipment' | 'skills' | 'emergency' | 'buddy' | 'mental';
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  encouragement: string;
  anxietyTip?: string;
  confidenceBoost: number; // Points added to confidence on correct answer
}

export interface ConfidenceMetric {
  category: string;
  current: number;
  max: number;
  color: string;
}

export interface BreathingExercise {
  id: string;
  name: string;
  description: string;
  pattern: number[]; // [inhale, hold, exhale, hold] in seconds
  cycles: number;
  guidance: string[];
}

export interface MindfulnessMoment {
  id: string;
  title: string;
  content: string;
  duration: number; // seconds
  oceanSound?: boolean;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'safety-01',
    category: 'safety',
    difficulty: 'easy',
    question: 'What is the most important safety rule in scuba diving?',
    options: [
      'Always dive with a buddy',
      'Never hold your breath while ascending',
      'Check your air supply regularly',
      'Stay within your certification limits'
    ],
    correctAnswer: 1,
    explanation: 'Never holding your breath while ascending prevents lung over-expansion injuries. Your lungs naturally expand as pressure decreases.',
    encouragement: '🌊 Excellent! You understand the fundamental breathing principle. This knowledge will keep you safe underwater!',
    confidenceBoost: 10,
    anxietyTip: 'Remember: Breathing underwater feels different but becomes natural with practice. Trust your training!'
  },
  {
    id: 'mental-01',
    category: 'mental',
    difficulty: 'easy',
    question: 'If you feel anxious underwater, what should you do first?',
    options: [
      'Surface immediately',
      'Stop, breathe slowly, and think',
      'Signal your buddy for help',
      'Continue with the dive'
    ],
    correctAnswer: 1,
    explanation: 'Stopping and focusing on slow, controlled breathing helps calm your mind and regain control in stressful situations.',
    encouragement: '🧘‍♀️ Perfect! You know how to manage stress underwater. Slow breathing is your superpower!',
    confidenceBoost: 15,
    anxietyTip: 'Anxiety is normal for new divers. Even experienced divers sometimes feel nervous. You\'re in good company!'
  },
  {
    id: 'equipment-01',
    category: 'equipment',
    difficulty: 'easy',
    question: 'What should you do if your mask fogs up during a dive?',
    options: [
      'Surface to clean it',
      'Remove and clear it underwater',
      'Continue diving with limited visibility',
      'Ask your buddy to help'
    ],
    correctAnswer: 1,
    explanation: 'You can safely remove and clear your mask underwater using the mask clearing technique you learned in training.',
    encouragement: '🤿 Great job! You remember your mask skills. These techniques become second nature with practice!',
    confidenceBoost: 8
  },
  {
    id: 'buddy-01',
    category: 'buddy',
    difficulty: 'medium',
    question: 'How often should you check on your dive buddy?',
    options: [
      'Every 30 seconds',
      'Continuously throughout the dive',
      'Only when signaled',
      'Every 5 minutes'
    ],
    correctAnswer: 1,
    explanation: 'Buddy awareness should be constant. Regular visual contact ensures safety and enhances the diving experience.',
    encouragement: '👥 Wonderful! You understand the buddy system. Good communication underwater builds confidence for both divers!',
    confidenceBoost: 12,
    anxietyTip: 'Your buddy is there to support you. Don\'t hesitate to communicate your comfort level - they want you to feel safe!'
  },
  {
    id: 'emergency-01',
    category: 'emergency',
    difficulty: 'medium',
    question: 'If you run low on air, what is the recommended action sequence?',
    options: [
      'Signal buddy, share air, ascend slowly',
      'Make a rapid ascent to the surface',
      'Continue diving and worry later',
      'Signal the boat for help'
    ],
    correctAnswer: 0,
    explanation: 'Proper air management includes early communication with your buddy and controlled ascent procedures.',
    encouragement: '⚡ Excellent emergency planning! Knowing these steps ahead of time reduces anxiety and builds confidence!',
    confidenceBoost: 18,
    anxietyTip: 'Air monitoring becomes automatic with experience. Trust your training and your buddy - you\'re prepared!'
  },
  {
    id: 'skills-01',
    category: 'skills',
    difficulty: 'medium',
    question: 'What\'s the best way to achieve neutral buoyancy?',
    options: [
      'Use your BCD only',
      'Combine breath control and BCD adjustments',
      'Stay at the bottom',
      'Use weights to sink'
    ],
    correctAnswer: 1,
    explanation: 'Perfect buoyancy combines proper weighting, BCD use, and breath control. Small breath changes fine-tune your position.',
    encouragement: '🎈 Amazing! Buoyancy control is like underwater meditation. You\'ll feel weightless and peaceful!',
    confidenceBoost: 14
  },
  {
    id: 'mental-02',
    category: 'mental',
    difficulty: 'hard',
    question: 'How can you build confidence before challenging dives?',
    options: [
      'Skip the dive if feeling nervous',
      'Practice skills, visualize success, communicate with buddy',
      'Just jump in and hope for the best',
      'Take medication to calm nerves'
    ],
    correctAnswer: 1,
    explanation: 'Mental preparation through practice, visualization, and open communication builds genuine confidence and readiness.',
    encouragement: '🎯 Outstanding! You understand that confidence comes from preparation and self-awareness. You\'re developing a diver\'s mindset!',
    confidenceBoost: 20,
    anxietyTip: 'Every diver continues learning. Acknowledging your feelings and preparing mentally shows wisdom, not weakness!'
  }
];

export const confidenceMetrics: ConfidenceMetric[] = [
  { category: 'Safety Knowledge', current: 70, max: 100, color: 'oklch(0.7 0.15 200)' },
  { category: 'Equipment Comfort', current: 60, max: 100, color: 'oklch(0.65 0.15 180)' },
  { category: 'Underwater Skills', current: 50, max: 100, color: 'oklch(0.6 0.15 160)' },
  { category: 'Emergency Readiness', current: 40, max: 100, color: 'oklch(0.55 0.15 140)' },
  { category: 'Buddy Communication', current: 65, max: 100, color: 'oklch(0.75 0.15 220)' },
  { category: 'Mental Preparation', current: 45, max: 100, color: 'oklch(0.8 0.15 240)' }
];

export const breathingExercises: BreathingExercise[] = [
  {
    id: 'calm-ocean',
    name: 'Calm Ocean Breathing',
    description: 'Like gentle waves, this breathing pattern calms your mind and prepares you for diving.',
    pattern: [4, 2, 6, 2], // 4-2-6-2 pattern
    cycles: 5,
    guidance: [
      'Breathe in slowly like filling your lungs with fresh ocean air...',
      'Hold gently, feeling the calm...',
      'Exhale slowly, releasing all tension like a gentle wave...',
      'Pause and feel the peace...'
    ]
  },
  {
    id: 'pre-dive-confidence',
    name: 'Pre-Dive Confidence Builder',
    description: 'Build confidence and reduce pre-dive jitters with this centering technique.',
    pattern: [3, 1, 3, 1], // Simple 3-1-3-1 pattern
    cycles: 8,
    guidance: [
      'Inhale confidence and readiness...',
      'Hold your intention...',
      'Exhale any worries or doubt...',
      'Rest in your capabilities...'
    ]
  }
];

export const mindfulnessMoments: MindfulnessMoment[] = [
  {
    id: 'ocean-visualization',
    title: 'Ocean Connection',
    content: 'Close your eyes and imagine yourself floating peacefully in clear, warm water. Feel the gentle support of the ocean beneath you. You are safe, capable, and ready for this adventure.',
    duration: 30,
    oceanSound: true
  },
  {
    id: 'confidence-affirmation',
    title: 'Diving Confidence',
    content: 'You have trained for this. Your instructor believes in you. Your buddy supports you. You have the knowledge and skills to dive safely. Trust yourself.',
    duration: 20,
    oceanSound: false
  },
  {
    id: 'progress-celebration',
    title: 'Celebrating Growth',
    content: 'Take a moment to appreciate how far you\'ve come. Every question you answer, every skill you practice, builds your confidence. You are becoming a confident diver.',
    duration: 25,
    oceanSound: true
  }
];

export const encouragementMessages = [
  '🌊 You\'re making waves with your progress!',
  '🐠 Swimming through knowledge like a natural!',
  '⭐ Your confidence is growing deeper than the ocean!',
  '🤿 You\'re developing the mind of a skilled diver!',
  '💙 Calm, confident, and capable - that\'s you!',
  '🎯 Every answer builds your underwater confidence!',
  '🌅 You\'re rising to every challenge beautifully!',
  '🧘‍♀️ Your mental preparation is as important as your physical skills!',
  '🏆 You\'re not just learning - you\'re building lifelong confidence!',
  '🌊 Like the ocean, your potential is limitless!'
];

export const anxietyTips = [
  'It\'s normal to feel nervous about diving. Even experienced divers had the same feelings when starting.',
  'Your instructor wouldn\'t let you dive if they didn\'t believe you were ready.',
  'Focus on your breathing - it\'s the foundation of safe and confident diving.',
  'Remember: you can always ascend slowly if you feel uncomfortable.',
  'Your buddy is there to support you. Communicate openly about how you feel.',
  'Visualization helps: imagine yourself diving calmly and successfully.',
  'Every small step builds your confidence. Celebrate each achievement.',
  'Trust your training. Your body knows what to do even when your mind feels uncertain.',
  'The underwater world is peaceful and magical. Let yourself enjoy the experience.',
  'Confidence comes with experience. Be patient and kind with yourself.'
];