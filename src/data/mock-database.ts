// Mock database for AI Agent Kanban Board
import { Task, Agent, TaskStatus, AgentStatus } from '@/types/kanban';

// In-memory data store
const tasks: Task[] = [
  {
    id: 'task-1',
    title: 'Implement User Authentication',
    description: 'Add OAuth2 login flow with social providers',
    status: 'in-progress',
    assignedAgent: 'agent-1',
    priority: 'high',
    progress: 45,
    checklist: [
      { id: 'c1-1', text: 'Setup OAuth provider', completed: true },
      { id: 'c1-2', text: 'Create login UI', completed: true },
      { id: 'c1-3', text: 'Implement callback handling', completed: false },
      { id: 'c1-4', text: 'Add session management', completed: false },
    ],
    createdAt: new Date('2025-11-10T10:00:00Z'),
    updatedAt: new Date('2025-11-12T06:00:00Z'),
  },
  {
    id: 'task-2',
    title: 'Build API Gateway',
    description: 'Create centralized API gateway with rate limiting',
    status: 'in-progress',
    assignedAgent: 'agent-2',
    priority: 'high',
    progress: 65,
    checklist: [
      { id: 'c2-1', text: 'Design gateway architecture', completed: true },
      { id: 'c2-2', text: 'Implement rate limiting', completed: true },
      { id: 'c2-3', text: 'Add request validation', completed: true },
      { id: 'c2-4', text: 'Setup monitoring', completed: false },
    ],
    createdAt: new Date('2025-11-10T11:00:00Z'),
    updatedAt: new Date('2025-11-12T05:30:00Z'),
  },
  {
    id: 'task-3',
    title: 'Database Migration Tool',
    description: 'Create automated database migration system',
    status: 'blocked',
    assignedAgent: 'agent-3',
    priority: 'medium',
    progress: 30,
    blockReason: 'Waiting for schema approval from DBA team',
    checklist: [
      { id: 'c3-1', text: 'Research migration tools', completed: true },
      { id: 'c3-2', text: 'Draft migration schema', completed: true },
      { id: 'c3-3', text: 'Get DBA approval', completed: false },
      { id: 'c3-4', text: 'Implement migration scripts', completed: false },
    ],
    createdAt: new Date('2025-11-11T09:00:00Z'),
    updatedAt: new Date('2025-11-12T04:00:00Z'),
  },
  {
    id: 'task-4',
    title: 'Setup CI/CD Pipeline',
    description: 'Configure GitHub Actions for automated deployments',
    status: 'backlog',
    priority: 'medium',
    progress: 0,
    checklist: [
      { id: 'c4-1', text: 'Define deployment stages', completed: false },
      { id: 'c4-2', text: 'Create workflow files', completed: false },
      { id: 'c4-3', text: 'Setup test automation', completed: false },
    ],
    createdAt: new Date('2025-11-11T14:00:00Z'),
    updatedAt: new Date('2025-11-11T14:00:00Z'),
  },
  {
    id: 'task-5',
    title: 'Implement Caching Layer',
    description: 'Add Redis caching for frequently accessed data',
    status: 'backlog',
    priority: 'low',
    progress: 0,
    checklist: [
      { id: 'c5-1', text: 'Setup Redis instance', completed: false },
      { id: 'c5-2', text: 'Implement cache middleware', completed: false },
      { id: 'c5-3', text: 'Add cache invalidation logic', completed: false },
    ],
    createdAt: new Date('2025-11-11T15:00:00Z'),
    updatedAt: new Date('2025-11-11T15:00:00Z'),
  },
  {
    id: 'task-6',
    title: 'Design System Documentation',
    description: 'Create comprehensive component documentation',
    status: 'completed',
    assignedAgent: 'agent-1',
    priority: 'low',
    progress: 100,
    checklist: [
      { id: 'c6-1', text: 'Document all components', completed: true },
      { id: 'c6-2', text: 'Add usage examples', completed: true },
      { id: 'c6-3', text: 'Create style guide', completed: true },
    ],
    createdAt: new Date('2025-11-09T10:00:00Z'),
    updatedAt: new Date('2025-11-10T16:00:00Z'),
  },
];

const agents: Agent[] = [
  {
    id: 'agent-1',
    name: 'CodeCraft AI',
    status: 'working',
    currentTask: 'task-1',
    capabilities: ['frontend', 'ui/ux', 'documentation'],
    tasksCompleted: 3,
  },
  {
    id: 'agent-2',
    name: 'BackendBot',
    status: 'working',
    currentTask: 'task-2',
    capabilities: ['backend', 'api', 'databases'],
    tasksCompleted: 5,
  },
  {
    id: 'agent-3',
    name: 'DevOps Drone',
    status: 'blocked',
    currentTask: 'task-3',
    capabilities: ['devops', 'infrastructure', 'databases'],
    tasksCompleted: 2,
  },
];

// Database-like methods
export const db = {
  // Tasks
  getTasks: (): Task[] => {
    return tasks;
  },

  getTaskById: (id: string): Task | undefined => {
    return tasks.find(t => t.id === id);
  },

  getTasksByStatus: (status: TaskStatus): Task[] => {
    return tasks.filter(t => t.status === status);
  },

  updateTask: (id: string, updates: Partial<Task>): Task | undefined => {
    const taskIndex = tasks.findIndex(t => t.id === id);
    if (taskIndex === -1) return undefined;

    tasks[taskIndex] = {
      ...tasks[taskIndex],
      ...updates,
      updatedAt: new Date(),
    };

    return tasks[taskIndex];
  },

  updateTaskProgress: (id: string, progress: number): Task | undefined => {
    return db.updateTask(id, { progress });
  },

  updateChecklistItem: (taskId: string, itemId: string, completed: boolean): Task | undefined => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return undefined;

    const checklist = task.checklist.map(item =>
      item.id === itemId ? { ...item, completed } : item
    );

    return db.updateTask(taskId, { checklist });
  },

  moveTask: (id: string, newStatus: TaskStatus): Task | undefined => {
    return db.updateTask(id, { status: newStatus });
  },

  // Agents
  getAgents: (): Agent[] => {
    return agents;
  },

  getAgentById: (id: string): Agent | undefined => {
    return agents.find(a => a.id === id);
  },

  updateAgent: (id: string, updates: Partial<Agent>): Agent | undefined => {
    const agentIndex = agents.findIndex(a => a.id === id);
    if (agentIndex === -1) return undefined;

    agents[agentIndex] = {
      ...agents[agentIndex],
      ...updates,
    };

    return agents[agentIndex];
  },

  updateAgentStatus: (id: string, status: AgentStatus, currentTask?: string): Agent | undefined => {
    return db.updateAgent(id, { status, currentTask });
  },
};

// Simulation helpers for SSE
export function simulateProgress(taskId: string): void {
  const task = db.getTaskById(taskId);
  if (!task || task.status !== 'in-progress') return;

  const newProgress = Math.min(task.progress + Math.floor(Math.random() * 15), 100);
  db.updateTaskProgress(taskId, newProgress);

  // Randomly complete checklist items
  const incompletedItems = task.checklist.filter(item => !item.completed);
  if (incompletedItems.length > 0 && Math.random() > 0.6) {
    const randomItem = incompletedItems[Math.floor(Math.random() * incompletedItems.length)];
    db.updateChecklistItem(taskId, randomItem.id, true);
  }

  // Auto-complete task when progress reaches 100
  if (newProgress === 100) {
    db.moveTask(taskId, 'completed');
    const task = db.getTaskById(taskId);
    if (task?.assignedAgent) {
      const agent = db.getAgentById(task.assignedAgent);
      if (agent) {
        db.updateAgent(agent.id, {
          status: 'idle',
          currentTask: undefined,
          tasksCompleted: agent.tasksCompleted + 1,
        });
      }
    }
  }
}

export function simulateAgentActivity(): void {
  const idleAgents = agents.filter(a => a.status === 'idle');
  const backlogTasks = tasks.filter(t => t.status === 'backlog');

  // Assign tasks to idle agents
  idleAgents.forEach(agent => {
    if (backlogTasks.length > 0) {
      const task = backlogTasks.shift()!;
      db.moveTask(task.id, 'in-progress');
      db.updateTask(task.id, { assignedAgent: agent.id });
      db.updateAgentStatus(agent.id, 'working', task.id);
    }
  });
}
