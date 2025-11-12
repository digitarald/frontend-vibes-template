export type Stage = 'backlog' | 'planning' | 'in-progress' | 'review' | 'blocked' | 'completed' | 'failed';

export type EventType = 
  | 'task_created' 
  | 'task_started' 
  | 'step_completed' 
  | 'stage_changed' 
  | 'blocked' 
  | 'task_completed' 
  | 'agent_assigned'
  | 'agent_comment'
  | 'ci_started'
  | 'ci_passed'
  | 'ci_failed'
  | 'human_intervention';

export interface Agent {
  id: string;
  name: string;
  avatar: string;
  color: string;
  status: 'active' | 'idle' | 'offline';
}

export interface Task {
  id: string;
  title: string;
  description: string;
  stage: Stage;
  agent?: Agent;
  createdAt: Date;
  updatedAt: Date;
  progress: {
    completed: number;
    total: number;
  };
  priority: 'low' | 'medium' | 'high' | 'critical';
  tags: string[];
}

export interface TimelineEvent {
  id: string;
  timestamp: Date;
  type: EventType;
  agent?: Agent;
  task: Task;
  description: string;
  metadata?: {
    fromStage?: Stage;
    toStage?: Stage;
    stepCompleted?: string;
    blockReason?: string;
    ciStatus?: 'pending' | 'passed' | 'failed';
  };
}

export type ViewModeType = 'kanban' | 'timeline' | 'split';
export type TimeFilterType = 'live' | 'today' | 'week' | 'month' | 'custom';

export interface ViewMode {
  mode: ViewModeType;
  splitRatio?: number; // 0-1, kanban to timeline ratio
  timelineFilter: TimeFilterType;
  customRange?: { start: Date; end: Date };
}
