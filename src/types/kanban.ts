export type TaskStatus = 'todo' | 'in-progress' | 'completed';

export type AgentStatus = 'idle' | 'running' | 'paused' | 'error';

export interface Agent {
  id: string;
  name: string;
  avatar: string;
  status: AgentStatus;
  color: string;
}

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface Activity {
  id: string;
  timestamp: number;
  type: 'created' | 'moved' | 'completed' | 'comment' | 'blocked';
  agentId: string;
  message: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  agentId: string;
  progress: number;
  checklist: ChecklistItem[];
  activities: Activity[];
  createdAt: number;
  updatedAt: number;
  isBlocked?: boolean;
  blockMessage?: string;
}

export interface KanbanData {
  tasks: Task[];
  agents: Agent[];
  lastUpdated: number;
}
