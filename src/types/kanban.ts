export type AgentType = 'CodeReviewer' | 'TestBuilder' | 'DocWriter';

export type AgentStatus = 'idle' | 'active' | 'blocked' | 'offline';

export type TaskStage = 'planning' | 'running' | 'blocked' | 'cicd' | 'review' | 'completed';

export type TodoStatus = 'pending' | 'in-progress' | 'completed';

export interface Agent {
  id: string;
  name: string;
  type: AgentType;
  status: AgentStatus;
  avatar: string;
  color: string;
}

export interface TodoItem {
  id: string;
  text: string;
  status: TodoStatus;
  completedAt?: Date;
}

export interface ActivityItem {
  id: string;
  timestamp: Date;
  action: string;
  description: string;
  agentId?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  stage: TaskStage;
  agentId: string;
  todos: TodoItem[];
  activities: ActivityItem[];
  createdAt: Date;
  updatedAt: Date;
  priority: 'low' | 'medium' | 'high';
}

export type WebSocketMessageType = 
  | 'task:created'
  | 'task:updated'
  | 'task:stage-changed'
  | 'todo:updated'
  | 'agent:status-changed'
  | 'activity:added';

export interface WebSocketMessage {
  type: WebSocketMessageType;
  payload: {
    taskId?: string;
    agentId?: string;
    data: unknown;
  };
  timestamp: Date;
}

export interface ConnectionState {
  status: 'connecting' | 'connected' | 'disconnected' | 'error';
  error?: Error;
  reconnectAttempts: number;
}
