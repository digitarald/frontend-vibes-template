export interface ScenarioQuestion {
  id: string;
  question: string;
  options: ScenarioOption[];
  correctAnswer: string;
  explanation: string;
  consequences?: {
    correct: string;
    incorrect: string;
  };
}

export interface ScenarioOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface DivingScenario {
  id: string;
  title: string;
  type: ScenarioType;
  description: string;
  context: string;
  imageUrl?: string;
  difficulty: 'basic' | 'intermediate' | 'advanced';
  environment: EnvironmentType;
  questions: ScenarioQuestion[];
  visualElements?: VisualElement[];
}

export interface VisualElement {
  type: 'diagram' | 'photo' | 'gauge' | 'map' | 'handsignal';
  url: string;
  caption: string;
  interactive?: boolean;
}

export interface QuizState {
  currentScenarioIndex: number;
  currentQuestionIndex: number;
  answers: Record<string, string>;
  score: number;
  completed: boolean;
  startTime: Date;
  endTime?: Date;
}

export interface QuizProgress {
  totalScenarios: number;
  completedScenarios: number;
  totalQuestions: number;
  answeredQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
}

export type ScenarioType = 
  | 'emergency'
  | 'equipment'
  | 'buoyancy'
  | 'navigation'
  | 'environment'
  | 'planning';

export type EnvironmentType = 
  | 'open_water'
  | 'reef'
  | 'wreck'
  | 'night'
  | 'drift'
  | 'shore'
  | 'boat';