// Kanban board types for AI Agent task tracking

export type TaskStatus = 'backlog' | 'in-progress' | 'blocked' | 'completed';

export type AgentStatus = 'idle' | 'working' | 'blocked' | 'paused';

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  assignedAgent?: string;
  priority: 'low' | 'medium' | 'high';
  progress: number; // 0-100
  checklist: ChecklistItem[];
  blockReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Agent {
  id: string;
  name: string;
  status: AgentStatus;
  currentTask?: string;
  capabilities: string[];
  tasksCompleted: number;
}

export interface SSEEvent {
  type: 'task-update' | 'agent-status' | 'progress-tick' | 'stage-transition';
  data: TaskUpdate | AgentStatusUpdate | ProgressUpdate | StageTransitionUpdate;
  timestamp: number;
}

export interface TaskUpdate {
  taskId: string;
  updates: Partial<Task>;
}

export interface AgentStatusUpdate {
  agentId: string;
  status: AgentStatus;
  currentTask?: string;
}

export interface ProgressUpdate {
  taskId: string;
  progress: number;
  checklistItemId?: string;
  completed?: boolean;
}

export interface StageTransitionUpdate {
  taskId: string;
  fromStatus: TaskStatus;
  toStatus: TaskStatus;
}
