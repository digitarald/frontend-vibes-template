export interface Agent {
  id: string;
  name: string;
  avatar: string;
  status: 'idle' | 'working' | 'blocked' | 'offline';
  capabilities: string[];
}

export interface TodoItem {
  id: string;
  title: string;
  status: 'completed' | 'in-progress' | 'pending';
  progress?: number; // 0-100 for current item
}

export interface Task {
  id: string;
  title: string;
  description: string;
  stage: 'planning' | 'running' | 'blocked' | 'cicd' | 'review' | 'completed';
  agent?: Agent;
  priority: 'low' | 'medium' | 'high';
  todos?: TodoItem[];
  blockReason?: string;
  cicdStatus?: 'running' | 'passed' | 'failed';
  createdAt: Date;
  completedAt?: Date;
}

export const mockAgents: Agent[] = [
  {
    id: 'agent-1',
    name: 'Code Agent',
    avatar: 'CA',
    status: 'working',
    capabilities: ['typescript', 'react', 'testing'],
  },
  {
    id: 'agent-2',
    name: 'Review Agent',
    avatar: 'RA',
    status: 'idle',
    capabilities: ['code-review', 'security', 'best-practices'],
  },
  {
    id: 'agent-3',
    name: 'Deploy Agent',
    avatar: 'DA',
    status: 'working',
    capabilities: ['ci-cd', 'deployment', 'infrastructure'],
  },
  {
    id: 'agent-4',
    name: 'Test Agent',
    avatar: 'TA',
    status: 'blocked',
    capabilities: ['testing', 'qa', 'automation'],
  },
];

export const mockTasks: Task[] = [
  {
    id: 'task-1',
    title: 'Implement user authentication',
    description: 'Add OAuth integration with Google and GitHub providers',
    stage: 'planning',
    priority: 'high',
    createdAt: new Date('2025-01-10T10:00:00'),
  },
  {
    id: 'task-2',
    title: 'Refactor dashboard components',
    description: 'Break down monolithic dashboard into smaller, reusable components',
    stage: 'running',
    agent: mockAgents[0],
    priority: 'medium',
    createdAt: new Date('2025-01-11T09:00:00'),
    todos: [
      {
        id: 'todo-1',
        title: 'Extract header component',
        status: 'completed',
      },
      {
        id: 'todo-2',
        title: 'Create widget grid layout',
        status: 'in-progress',
        progress: 65,
      },
      {
        id: 'todo-3',
        title: 'Implement data fetching hooks',
        status: 'pending',
      },
      {
        id: 'todo-4',
        title: 'Add loading states',
        status: 'pending',
      },
    ],
  },
  {
    id: 'task-3',
    title: 'Fix mobile navigation',
    description: 'Navigation menu is not responsive on mobile devices',
    stage: 'blocked',
    agent: mockAgents[3],
    priority: 'high',
    blockReason: 'Waiting for design approval on mobile menu layout',
    createdAt: new Date('2025-01-11T11:30:00'),
  },
  {
    id: 'task-4',
    title: 'Update dependencies',
    description: 'Upgrade React to v19 and Next.js to v15',
    stage: 'cicd',
    agent: mockAgents[2],
    priority: 'medium',
    cicdStatus: 'running',
    createdAt: new Date('2025-01-11T14:00:00'),
  },
  {
    id: 'task-5',
    title: 'Add dark mode toggle',
    description: 'Implement theme switching functionality',
    stage: 'review',
    agent: mockAgents[0],
    priority: 'low',
    cicdStatus: 'passed',
    createdAt: new Date('2025-01-10T15:00:00'),
  },
  {
    id: 'task-6',
    title: 'Setup CI/CD pipeline',
    description: 'Configure GitHub Actions for automated testing and deployment',
    stage: 'completed',
    agent: mockAgents[2],
    priority: 'high',
    cicdStatus: 'passed',
    createdAt: new Date('2025-01-09T10:00:00'),
    completedAt: new Date('2025-01-10T16:00:00'),
  },
  {
    id: 'task-7',
    title: 'Optimize image loading',
    description: 'Implement lazy loading and WebP format for all images',
    stage: 'planning',
    priority: 'low',
    createdAt: new Date('2025-01-11T16:00:00'),
  },
  {
    id: 'task-8',
    title: 'Write API documentation',
    description: 'Document all REST endpoints with OpenAPI spec',
    stage: 'running',
    agent: mockAgents[1],
    priority: 'medium',
    createdAt: new Date('2025-01-11T08:00:00'),
    todos: [
      {
        id: 'todo-5',
        title: 'Document authentication endpoints',
        status: 'completed',
      },
      {
        id: 'todo-6',
        title: 'Document user management endpoints',
        status: 'completed',
      },
      {
        id: 'todo-7',
        title: 'Document analytics endpoints',
        status: 'in-progress',
        progress: 40,
      },
    ],
  },
  {
    id: 'task-9',
    title: 'Add form validation',
    description: 'Implement client-side validation for all forms',
    stage: 'cicd',
    agent: mockAgents[2],
    priority: 'medium',
    cicdStatus: 'failed',
    createdAt: new Date('2025-01-11T12:00:00'),
  },
  {
    id: 'task-10',
    title: 'Implement search functionality',
    description: 'Add global search with autocomplete',
    stage: 'review',
    agent: mockAgents[0],
    priority: 'high',
    cicdStatus: 'passed',
    createdAt: new Date('2025-01-10T14:00:00'),
  },
  {
    id: 'task-11',
    title: 'Database migration',
    description: 'Migrate from MySQL to PostgreSQL',
    stage: 'blocked',
    agent: mockAgents[3],
    priority: 'high',
    blockReason: 'Need to finalize data migration strategy and get approval from infrastructure team',
    createdAt: new Date('2025-01-11T13:00:00'),
  },
  {
    id: 'task-12',
    title: 'Accessibility improvements',
    description: 'Ensure WCAG 2.1 AA compliance',
    stage: 'completed',
    agent: mockAgents[1],
    priority: 'high',
    cicdStatus: 'passed',
    createdAt: new Date('2025-01-08T09:00:00'),
    completedAt: new Date('2025-01-09T17:00:00'),
  },
];
