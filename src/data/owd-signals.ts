export interface Signal {
  id: string;
  name: string;
  description: string;
  icon?: string;
  aliases?: string[];
}

export interface SignalQuestion {
  id: string;
  prompt: string;
  choices: string[];
  answerIndex: number;
  rationale: string;
  tags: string[];
}

// Common PADI Open Water Diver signals
export const owdSignals: Signal[] = [
  {
    id: "ok",
    name: "OK",
    description: "Everything is fine, I'm ready to proceed",
    icon: "CheckCircle",
    aliases: ["okay", "good", "ready"]
  },
  {
    id: "problem",
    name: "Problem",
    description: "I have a problem but it's not an emergency",
    icon: "AlertTriangle",
    aliases: ["issue", "not ok"]
  },
  {
    id: "up",
    name: "Up",
    description: "I want to go up / ascend",
    icon: "ArrowUp",
    aliases: ["ascend", "surface"]
  },
  {
    id: "down",
    name: "Down",
    description: "I want to go down / descend",
    icon: "ArrowDown",
    aliases: ["descend", "deeper"]
  },
  {
    id: "stop",
    name: "Stop",
    description: "Stop what you're doing immediately",
    icon: "Hand",
    aliases: ["halt", "wait"]
  },
  {
    id: "come-here",
    name: "Come Here",
    description: "Come to me / follow me",
    icon: "UserCheck",
    aliases: ["follow", "this way"]
  },
  {
    id: "low-air",
    name: "Low on Air",
    description: "I'm getting low on air supply",
    icon: "Wind",
    aliases: ["air low", "pressure low"]
  },
  {
    id: "out-of-air",
    name: "Out of Air",
    description: "I'm out of air - emergency!",
    icon: "AlertCircle",
    aliases: ["no air", "emergency air"]
  },
  {
    id: "share-air",
    name: "Share Air/Alternate",
    description: "Share your alternate air source with me",
    icon: "Users",
    aliases: ["alternate", "buddy breathing", "octopus"]
  },
  {
    id: "level-off",
    name: "Level Off",
    description: "Maintain current depth, stop ascending/descending",
    icon: "Minus",
    aliases: ["stay level", "maintain depth"]
  },
  {
    id: "buddy-up",
    name: "Buddy Up",
    description: "Stay close to your buddy",
    icon: "UserPlus",
    aliases: ["stay together", "buddy system"]
  },
  {
    id: "something-wrong",
    name: "Something Wrong",
    description: "Something is wrong but I don't know what",
    icon: "HelpCircle",
    aliases: ["confused", "uncertain"]
  },
  {
    id: "look-point",
    name: "Look/Point",
    description: "Look in this direction, I see something",
    icon: "Eye",
    aliases: ["see", "look there", "direction"]
  },
  {
    id: "danger",
    name: "Danger/Hazard",
    description: "There is danger or a hazard nearby",
    icon: "Zap",
    aliases: ["hazard", "warning", "avoid"]
  },
  {
    id: "boat-surface",
    name: "Boat/Surface",
    description: "Time to return to the boat or surface",
    icon: "Ship",
    aliases: ["boat", "return", "end dive"]
  }
];

// Quiz questions based on the signals
export const signalQuestions: SignalQuestion[] = [
  {
    id: "q1",
    prompt: "What does the 'OK' signal mean?",
    choices: [
      "Everything is fine, I'm ready to proceed",
      "I have a problem",
      "I want to surface",
      "I'm out of air"
    ],
    answerIndex: 0,
    rationale: "The OK signal indicates that everything is fine and you're ready to proceed with the dive.",
    tags: ["basic", "safety"]
  },
  {
    id: "q2",
    prompt: "If your buddy shows the 'Problem' signal, what should you do?",
    choices: [
      "Continue diving normally",
      "Surface immediately",
      "Stop and assess the situation",
      "Signal OK back"
    ],
    answerIndex: 2,
    rationale: "When your buddy signals a problem, you should stop what you're doing and assess the situation to understand what help they need.",
    tags: ["emergency", "buddy"]
  },
  {
    id: "q3",
    prompt: "What does pointing upward with your thumb mean?",
    choices: [
      "Everything is OK",
      "I want to go up/ascend",
      "Look up there",
      "Good job"
    ],
    answerIndex: 1,
    rationale: "Pointing upward with your thumb means you want to ascend or go up in the water.",
    tags: ["basic", "direction"]
  },
  {
    id: "q4",
    prompt: "The 'Low on Air' signal is important because:",
    choices: [
      "It's just informational",
      "It means the dive should end soon",
      "It indicates an emergency",
      "It means you need to ascend immediately"
    ],
    answerIndex: 1,
    rationale: "The 'Low on Air' signal indicates that the dive should end soon and you should begin your ascent and safety stop procedures.",
    tags: ["air management", "safety"]
  },
  {
    id: "q5",
    prompt: "What's the difference between 'Out of Air' and 'Low on Air' signals?",
    choices: [
      "There is no difference",
      "Out of Air is immediate emergency, Low on Air is a warning",
      "Low on Air is more serious",
      "They mean the same thing"
    ],
    answerIndex: 1,
    rationale: "'Out of Air' is an immediate emergency requiring your alternate air source, while 'Low on Air' is advance warning to begin ending the dive.",
    tags: ["emergency", "air management"]
  },
  {
    id: "q6",
    prompt: "When should you use the 'Stop' signal?",
    choices: [
      "When you want to rest",
      "When there's immediate danger or need to halt activity",
      "When you're bored",
      "When you see fish"
    ],
    answerIndex: 1,
    rationale: "The 'Stop' signal should be used when there's immediate danger or urgent need to halt all activity.",
    tags: ["emergency", "safety"]
  },
  {
    id: "q7",
    prompt: "What does the 'Level Off' signal indicate?",
    choices: [
      "Go to the surface",
      "Maintain current depth",
      "Go deeper",
      "There's a problem"
    ],
    answerIndex: 1,
    rationale: "The 'Level Off' signal means to maintain your current depth and stop ascending or descending.",
    tags: ["buoyancy", "depth"]
  },
  {
    id: "q8",
    prompt: "The 'Buddy Up' signal means:",
    choices: [
      "Your buddy is leaving",
      "Stay close to your buddy",
      "Find a new buddy",
      "Your buddy has a problem"
    ],
    answerIndex: 1,
    rationale: "The 'Buddy Up' signal reminds divers to stay close together and maintain proper buddy team procedures.",
    tags: ["buddy", "safety"]
  },
  {
    id: "q9",
    prompt: "How should you respond to a 'Danger/Hazard' signal?",
    choices: [
      "Investigate the danger",
      "Move away from the indicated area",
      "Signal OK",
      "Continue normally"
    ],
    answerIndex: 1,
    rationale: "When someone signals danger or hazard, you should move away from the indicated area and avoid the potential threat.",
    tags: ["emergency", "safety"]
  },
  {
    id: "q10",
    prompt: "What does the 'Share Air/Alternate' signal indicate?",
    choices: [
      "Let's buddy breathe for fun",
      "I need your alternate air source",
      "Check your air pressure",
      "I want to switch tanks"
    ],
    answerIndex: 1,
    rationale: "The 'Share Air/Alternate' signal means the diver needs to use your alternate air source, typically due to an out-of-air emergency.",
    tags: ["emergency", "air management"]
  },
  {
    id: "q11",
    prompt: "The 'Look/Point' signal is used to:",
    choices: [
      "Point out interesting marine life or features",
      "Indicate danger",
      "Signal OK",
      "Show the exit"
    ],
    answerIndex: 0,
    rationale: "The 'Look/Point' signal is used to direct your buddy's attention to something interesting like marine life or underwater features.",
    tags: ["communication", "observation"]
  },
  {
    id: "q12",
    prompt: "What should you do if you don't understand a signal?",
    choices: [
      "Ignore it",
      "Signal OK",
      "Signal that you don't understand and ask for clarification",
      "Surface immediately"
    ],
    answerIndex: 2,
    rationale: "If you don't understand a signal, you should indicate that you don't understand and ask for clarification to ensure safe communication.",
    tags: ["communication", "safety"]
  }
];