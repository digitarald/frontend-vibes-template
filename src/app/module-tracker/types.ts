export type ModuleStatus = 'not-started' | 'in-progress' | 'in-review' | 'testing' | 'completed';
export type Priority = 'high' | 'medium' | 'low';
export type CiStatus = 'passing' | 'failing' | 'pending';

export interface SubTask {
  name: string;
  completed: boolean;
}

export interface Assignee {
  name: string;
  avatar: string;
  team: string;
}

export interface Module {
  id: string;
  name: string;
  description: string;
  status: ModuleStatus;
  priority: Priority;
  assignee: Assignee;
  prUrl?: string;
  ciStatus?: CiStatus;
  blockers: string[];
  tags: string[];
  subTasks?: SubTask[];
  lastUpdated: Date;
  estimatedEffort: number;
  actualEffort?: number;
}

export interface KanbanColumn {
  id: ModuleStatus;
  title: string;
  modules: Module[];
}

export interface FilterOptions {
  status: ModuleStatus[];
  teams: string[];
  priorities: Priority[];
  assignees: string[];
  search: string;
}
