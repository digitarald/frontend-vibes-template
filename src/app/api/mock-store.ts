import { Task, Agent, KanbanData, Activity, ChecklistItem } from '@/types/kanban';

// Mock agents with different progress rates
const agents: Agent[] = [
  {
    id: 'agent-1',
    name: 'Code Reviewer',
    avatar: 'CR',
    status: 'running',
    color: 'oklch(0.68 0.28 320)', // chart-1
  },
  {
    id: 'agent-2',
    name: 'Test Writer',
    avatar: 'TW',
    status: 'running',
    color: 'oklch(0.72 0.25 180)', // chart-2
  },
  {
    id: 'agent-3',
    name: 'Doc Generator',
    avatar: 'DG',
    status: 'idle',
    color: 'oklch(0.58 0.30 90)', // chart-3
  },
];

// Helper to generate checklist items
function generateChecklist(taskId: string, count: number): ChecklistItem[] {
  const items: ChecklistItem[] = [];
  const tasks = [
    'Analyze requirements',
    'Design solution',
    'Implement core logic',
    'Write unit tests',
    'Integration testing',
    'Code review',
    'Documentation',
    'Deploy to staging',
  ];
  
  for (let i = 0; i < count; i++) {
    items.push({
      id: `${taskId}-item-${i}`,
      text: tasks[i % tasks.length],
      completed: false,
    });
  }
  
  return items;
}

// Helper to generate activity
function generateActivity(taskId: string, agentId: string, type: Activity['type'], message: string): Activity {
  return {
    id: `activity-${Date.now()}-${Math.random()}`,
    timestamp: Date.now(),
    type,
    agentId,
    message,
  };
}

// Initialize mock tasks
const initialTasks: Task[] = [
  {
    id: 'task-1',
    title: 'Implement user authentication',
    description: 'Add JWT-based authentication with refresh tokens',
    status: 'in-progress',
    agentId: 'agent-1',
    progress: 0,
    checklist: generateChecklist('task-1', 5),
    activities: [
      generateActivity('task-1', 'agent-1', 'created', 'Task created'),
      generateActivity('task-1', 'agent-1', 'moved', 'Moved to in-progress'),
    ],
    createdAt: Date.now() - 3600000,
    updatedAt: Date.now(),
  },
  {
    id: 'task-2',
    title: 'Create API documentation',
    description: 'Generate OpenAPI specs and developer guides',
    status: 'in-progress',
    agentId: 'agent-2',
    progress: 0,
    checklist: generateChecklist('task-2', 6),
    activities: [
      generateActivity('task-2', 'agent-2', 'created', 'Task created'),
      generateActivity('task-2', 'agent-2', 'moved', 'Moved to in-progress'),
    ],
    createdAt: Date.now() - 7200000,
    updatedAt: Date.now(),
  },
  {
    id: 'task-3',
    title: 'Setup CI/CD pipeline',
    description: 'Configure GitHub Actions for automated testing and deployment',
    status: 'todo',
    agentId: 'agent-3',
    progress: 0,
    checklist: generateChecklist('task-3', 4),
    activities: [
      generateActivity('task-3', 'agent-3', 'created', 'Task created'),
    ],
    createdAt: Date.now() - 1800000,
    updatedAt: Date.now(),
  },
];

// In-memory store
class MockStore {
  private tasks: Task[] = JSON.parse(JSON.stringify(initialTasks));
  private agents: Agent[] = JSON.parse(JSON.stringify(agents));
  private progressIntervals: Map<string, number> = new Map();

  constructor() {
    this.startProgressSimulation();
  }

  // Simulate progressive task updates
  private startProgressSimulation() {
    // Agent 1: faster progress (updates every 2 seconds)
    setInterval(() => {
      this.updateTaskProgress('task-1', 3); // 3% per update
    }, 2000);

    // Agent 2: medium progress (updates every 3 seconds)
    setInterval(() => {
      this.updateTaskProgress('task-2', 2); // 2% per update
    }, 3000);
  }

  private updateTaskProgress(taskId: string, increment: number) {
    const task = this.tasks.find(t => t.id === taskId);
    if (!task || task.status !== 'in-progress') return;

    task.progress = Math.min(100, task.progress + increment);
    task.updatedAt = Date.now();

    // Update checklist items based on progress
    const completedCount = Math.floor((task.progress / 100) * task.checklist.length);
    task.checklist.forEach((item, index) => {
      item.completed = index < completedCount;
    });

    // Add activity when progress milestones are reached
    if (task.progress === 25 || task.progress === 50 || task.progress === 75) {
      task.activities.push(
        generateActivity(taskId, task.agentId, 'comment', `Progress: ${task.progress}%`)
      );
    }

    // Complete task when it reaches 100%
    if (task.progress >= 100 && task.status === 'in-progress') {
      task.status = 'completed';
      task.activities.push(
        generateActivity(taskId, task.agentId, 'completed', 'Task completed!')
      );
      const agent = this.agents.find(a => a.id === task.agentId);
      if (agent) {
        agent.status = 'idle';
      }
    }
  }

  getData(): KanbanData {
    return {
      tasks: JSON.parse(JSON.stringify(this.tasks)),
      agents: JSON.parse(JSON.stringify(this.agents)),
      lastUpdated: Date.now(),
    };
  }

  getTask(id: string): Task | undefined {
    const task = this.tasks.find(t => t.id === id);
    return task ? JSON.parse(JSON.stringify(task)) : undefined;
  }

  updateTaskStatus(id: string, status: Task['status']): Task | null {
    const task = this.tasks.find(t => t.id === id);
    if (!task) return null;

    const oldStatus = task.status;
    task.status = status;
    task.updatedAt = Date.now();

    task.activities.push(
      generateActivity(id, task.agentId, 'moved', `Moved from ${oldStatus} to ${status}`)
    );

    // Update agent status
    const agent = this.agents.find(a => a.id === task.agentId);
    if (agent) {
      if (status === 'in-progress') {
        agent.status = 'running';
      } else if (status === 'completed') {
        agent.status = 'idle';
      }
    }

    return JSON.parse(JSON.stringify(task));
  }

  updateChecklistItem(taskId: string, itemId: string, completed: boolean): Task | null {
    const task = this.tasks.find(t => t.id === taskId);
    if (!task) return null;

    const item = task.checklist.find(i => i.id === itemId);
    if (!item) return null;

    item.completed = completed;
    task.updatedAt = Date.now();

    // Update progress based on checklist
    const completedCount = task.checklist.filter(i => i.completed).length;
    task.progress = Math.round((completedCount / task.checklist.length) * 100);

    return JSON.parse(JSON.stringify(task));
  }

  reset() {
    this.tasks = JSON.parse(JSON.stringify(initialTasks));
    this.agents = JSON.parse(JSON.stringify(agents));
  }
}

// Singleton instance
const mockStore = new MockStore();

export { mockStore };
