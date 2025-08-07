import { DivingScenario } from './types';

export const mockScenarios: DivingScenario[] = [
  {
    id: 'emergency-out-of-air',
    title: 'Emergency: Buddy Out of Air',
    type: 'emergency',
    description: 'Your buddy signals they are out of air while diving at 15 meters depth',
    context: 'You are enjoying a reef dive at 15 meters when your buddy suddenly swims up to you making the "out of air" hand signal - drawing their hand across their throat. You check your gauge and see you still have 80 bar remaining.',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=400&fit=crop',
    difficulty: 'basic',
    environment: 'reef',
    questions: [
      {
        id: 'q1',
        question: 'What is your immediate response when your buddy signals they are out of air?',
        options: [
          {
            id: 'a',
            text: 'Share your regulator immediately and begin a controlled ascent',
            isCorrect: true
          },
          {
            id: 'b', 
            text: 'Signal them to swim to the surface quickly',
            isCorrect: false
          },
          {
            id: 'c',
            text: 'Look around for another diver to help',
            isCorrect: false
          },
          {
            id: 'd',
            text: 'Point toward the surface and swim up fast',
            isCorrect: false
          }
        ],
        correctAnswer: 'a',
        explanation: 'When a buddy is out of air, immediately share your regulator (alternate air source or primary) and establish buddy breathing. Maintain close contact and begin a slow, controlled ascent at 9-18 meters per minute.',
        consequences: {
          correct: 'You successfully share air and both ascend safely to the surface with proper decompression.',
          incorrect: 'A rapid ascent without air sharing could lead to decompression sickness, lung expansion injuries, or drowning.'
        }
      }
    ],
    visualElements: [
      {
        type: 'handsignal',
        url: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=300&h=200&fit=crop',
        caption: 'Out of Air Hand Signal - drawing hand across throat'
      }
    ]
  },
  {
    id: 'equipment-mask-strap',
    title: 'Equipment Failure: Broken Mask Strap',
    type: 'equipment',
    description: 'Your mask strap breaks during a dive at 12 meters depth',
    context: 'You are swimming through a coral garden at 12 meters when you feel your mask starting to slip. You reach up and discover the strap has completely broken. Water is beginning to enter your mask.',
    imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=400&fit=crop',
    difficulty: 'intermediate',
    environment: 'reef',
    questions: [
      {
        id: 'q1',
        question: 'What should you do immediately when your mask strap breaks underwater?',
        options: [
          {
            id: 'a',
            text: 'Hold the mask against your face and clear it, then signal your buddy',
            isCorrect: true
          },
          {
            id: 'b',
            text: 'Remove the mask completely and ascend immediately',
            isCorrect: false
          },
          {
            id: 'c',
            text: 'Try to tie the broken strap back together',
            isCorrect: false
          },
          {
            id: 'd',
            text: 'Continue diving without the mask',
            isCorrect: false
          }
        ],
        correctAnswer: 'a',
        explanation: 'Hold the mask firmly against your face with one hand, clear any water, and signal your buddy for assistance. You can continue the dive by holding the mask or ask your buddy to help you surface safely.',
        consequences: {
          correct: 'You maintain visibility and control, allowing for a safe continuation or termination of the dive.',
          incorrect: 'Losing your mask underwater can cause panic, disorientation, and make it difficult to surface safely.'
        }
      }
    ],
    visualElements: [
      {
        type: 'diagram',
        url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=200&fit=crop',
        caption: 'Proper mask clearing technique'
      }
    ]
  },
  {
    id: 'buoyancy-rapid-descent',
    title: 'Buoyancy Control: Rapid Descent Near Reef',
    type: 'buoyancy',
    description: 'You are descending too quickly and approaching a fragile coral reef',
    context: 'During your descent, you realize you are sinking faster than the recommended rate and heading directly toward a beautiful but fragile coral formation. Your depth gauge shows 8 meters and increasing rapidly.',
    imageUrl: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&h=400&fit=crop',
    difficulty: 'basic',
    environment: 'reef',
    questions: [
      {
        id: 'q1',
        question: 'How should you control your rapid descent to avoid damaging the coral reef?',
        options: [
          {
            id: 'a',
            text: 'Add air to your BCD and fin gently upward to slow descent',
            isCorrect: true
          },
          {
            id: 'b',
            text: 'Use your hands to push off the coral to stop',
            isCorrect: false
          },
          {
            id: 'c',
            text: 'Kick hard with your fins downward to slow down',
            isCorrect: false
          },
          {
            id: 'd',
            text: 'Grab onto the coral to stop your descent',
            isCorrect: false
          }
        ],
        correctAnswer: 'a',
        explanation: 'Add small amounts of air to your BCD to slow your descent and use gentle fin movements to control your position. Never touch coral as it damages the reef and can injure you.',
        consequences: {
          correct: 'You achieve neutral buoyancy and protect the coral reef ecosystem while maintaining safe diving practices.',
          incorrect: 'Touching or damaging coral can destroy years of growth and may result in cuts or stings to your hands.'
        }
      }
    ],
    visualElements: [
      {
        type: 'photo',
        url: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=300&h=200&fit=crop',
        caption: 'Fragile coral reef requiring careful buoyancy control'
      }
    ]
  },
  {
    id: 'navigation-lost-boat',
    title: 'Navigation: Lost Dive Boat',
    type: 'navigation',
    description: 'You have lost sight of the dive boat during your dive',
    context: 'After exploring a wreck site for 25 minutes, you and your buddy surface only to discover the dive boat is nowhere in sight. The current has carried you away from the planned dive site. You have a safety whistle and inflatable signal tube.',
    imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=400&fit=crop',
    difficulty: 'intermediate',
    environment: 'wreck',
    questions: [
      {
        id: 'q1',
        question: 'What is the proper procedure when you cannot locate the dive boat after surfacing?',
        options: [
          {
            id: 'a',
            text: 'Deploy signal tube, blow whistle, stay together and conserve energy',
            isCorrect: true
          },
          {
            id: 'b',
            text: 'Swim in the direction you think the boat went',
            isCorrect: false
          },
          {
            id: 'c',
            text: 'Dive back down to look for the boat underwater',
            isCorrect: false
          },
          {
            id: 'd',
            text: 'Remove your gear to swim faster toward shore',
            isCorrect: false
          }
        ],
        correctAnswer: 'a',
        explanation: 'Stay calm, deploy all available signaling devices, maintain your position together as a team, and conserve energy. The boat crew will be looking for you and your signals will help them locate you.',
        consequences: {
          correct: 'Your visible signals and teamwork greatly increase the chances of quick rescue by the dive boat crew.',
          incorrect: 'Swimming away from your last known position makes rescue much more difficult and wastes valuable energy.'
        }
      }
    ],
    visualElements: [
      {
        type: 'photo',
        url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=300&h=200&fit=crop',
        caption: 'Open water emergency signaling situation'
      }
    ]
  },
  {
    id: 'environment-strong-current',
    title: 'Environmental Challenge: Strong Current',
    type: 'environment',
    description: 'You encounter an unexpected strong current during a drift dive',
    context: 'During what was planned as a gentle drift dive along a reef wall, the current suddenly increases significantly. You find yourself being swept along much faster than comfortable, and your buddy is struggling to keep up.',
    imageUrl: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&h=400&fit=crop',
    difficulty: 'advanced',
    environment: 'drift',
    questions: [
      {
        id: 'q1',
        question: 'How should you respond to unexpectedly strong current during a drift dive?',
        options: [
          {
            id: 'a',
            text: 'Stay close to buddy, signal boat, use reef for shelter if needed',
            isCorrect: true
          },
          {
            id: 'b',
            text: 'Fight against the current to return to the start point',
            isCorrect: false
          },
          {
            id: 'c',
            text: 'Ascend immediately to escape the current',
            isCorrect: false
          },
          {
            id: 'd',
            text: 'Descend deeper where current may be weaker',
            isCorrect: false
          }
        ],
        correctAnswer: 'a',
        explanation: 'In strong current, maintain buddy contact, signal the boat with your location, and use the reef structure for shelter when possible. Conserve energy and let the boat track your movement.',
        consequences: {
          correct: 'You manage the situation safely while conserving energy and maintaining team cohesion.',
          incorrect: 'Fighting current wastes air and energy, while uncontrolled depth changes can cause additional problems.'
        }
      }
    ],
    visualElements: [
      {
        type: 'photo',
        url: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=300&h=200&fit=crop',
        caption: 'Divers managing strong current along reef wall'
      }
    ]
  },
  {
    id: 'planning-dive-tables',
    title: 'Dive Planning: Using Dive Tables',
    type: 'planning',
    description: 'Plan a dive to 18 meters with a 45-minute bottom time',
    context: 'You are planning a morning dive to a reef site with a maximum depth of 18 meters. Your group wants to spend 45 minutes exploring the reef. You need to use dive tables to determine if this is within safe limits.',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=400&fit=crop',
    difficulty: 'intermediate',
    environment: 'reef',
    questions: [
      {
        id: 'q1',
        question: 'According to PADI dive tables, what is the maximum bottom time for a first dive to 18 meters?',
        options: [
          {
            id: 'a',
            text: '56 minutes',
            isCorrect: true
          },
          {
            id: 'b',
            text: '45 minutes',
            isCorrect: false
          },
          {
            id: 'c',
            text: '40 minutes',
            isCorrect: false
          },
          {
            id: 'd',
            text: '60 minutes',
            isCorrect: false
          }
        ],
        correctAnswer: 'a',
        explanation: 'For a first dive to 18 meters (60 feet), PADI dive tables allow a maximum bottom time of 56 minutes before requiring decompression stops. Your planned 45-minute dive is well within safe limits.',
        consequences: {
          correct: 'Your dive plan is conservative and safe, allowing adequate time for exploration while staying within no-decompression limits.',
          incorrect: 'Exceeding table limits could require emergency decompression stops or risk decompression sickness.'
        }
      }
    ],
    visualElements: [
      {
        type: 'diagram',
        url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=200&fit=crop',
        caption: 'PADI dive table reference for depth and time calculations'
      }
    ]
  }
];