export type Stage = 
  | 'backlog'
  | 'todo'
  | 'in-progress'
  | 'in-review'
  | 'blocked'
  | 'done';

export type AgentStatus = 'available' | 'busy' | 'offline';

export interface Agent {
  id: string;
  name: string;
  avatar: string;
  status: AgentStatus;
  currentTask?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  stage: Stage;
  assignedTo: string; // Agent ID
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  updatedAt: Date;
  blockedReason?: string;
  tags: string[];
}

export interface SwipeState {
  currentCardIndex: number;
  currentStage: Stage;
  swipeDirection: 'left' | 'right' | 'up' | 'down' | null;
  swipeProgress: number; // 0-1
}

export interface GestureConfig {
  swipeThreshold: number; // px to trigger action
  velocityThreshold: number; // px/s for quick swipes
  stageTransitionEnabled: boolean;
}

export const STAGES: { value: Stage; label: string; color: string }[] = [
  { value: 'backlog', label: 'Backlog', color: 'oklch(0.7 0.05 240)' },
  { value: 'todo', label: 'To Do', color: 'oklch(0.7 0.1 280)' },
  { value: 'in-progress', label: 'In Progress', color: 'oklch(0.65 0.15 220)' },
  { value: 'in-review', label: 'In Review', color: 'oklch(0.6 0.15 260)' },
  { value: 'blocked', label: 'Blocked', color: 'oklch(0.6 0.2 30)' },
  { value: 'done', label: 'Done', color: 'oklch(0.65 0.15 145)' },
];
