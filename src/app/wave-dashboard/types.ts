export interface Module {
  id: string;
  name: string;
  status: 'completed' | 'in-progress' | 'pending' | 'blocked';
  prUrl?: string;
  assignee: string;
  completedDate?: Date;
}

export interface Wave {
  id: string;
  name: string;
  status: 'planned' | 'in-progress' | 'completed' | 'blocked';
  startDate: Date;
  targetEndDate: Date;
  actualEndDate?: Date;
  modules: Module[];
  progress: number; // 0-100
}

export interface BurndownDataPoint {
  date: string;
  remaining: number;
  ideal: number;
}

export interface DashboardMetrics {
  totalWaves: number;
  completedWaves: number;
  totalModules: number;
  completedModules: number;
  velocity: number; // modules per week
  avgTimePerModule: number; // days
  blockers: number;
  successRate: number; // percentage
  estimatedCompletion: Date;
}
