import type { Agent, Task, AgentType } from '@/types/kanban';

export const mockAgents: Agent[] = [
  {
    id: 'agent-1',
    name: 'CodeReviewer Alpha',
    type: 'CodeReviewer',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
    color: 'oklch(0.68 0.28 320)',
  },
  {
    id: 'agent-2',
    name: 'TestBuilder Beta',
    type: 'TestBuilder',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
    color: 'oklch(0.72 0.25 180)',
  },
  {
    id: 'agent-3',
    name: 'DocWriter Gamma',
    type: 'DocWriter',
    status: 'idle',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop',
    color: 'oklch(0.58 0.30 90)',
  },
  {
    id: 'agent-4',
    name: 'CodeReviewer Delta',
    type: 'CodeReviewer',
    status: 'blocked',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    color: 'oklch(0.75 0.22 240)',
  },
  {
    id: 'agent-5',
    name: 'TestBuilder Epsilon',
    type: 'TestBuilder',
    status: 'offline',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    color: 'oklch(0.65 0.25 45)',
  },
];

export const mockTasks: Task[] = [
  {
    id: 'task-1',
    title: 'Review authentication module',
    description: 'Code review for the new OAuth2 implementation',
    stage: 'running',
    agentId: 'agent-1',
    priority: 'high',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    updatedAt: new Date(Date.now() - 1000 * 60 * 10),
    todos: [
      { id: 't1-1', text: 'Review security best practices', status: 'completed', completedAt: new Date(Date.now() - 1000 * 60 * 30) },
      { id: 't1-2', text: 'Check error handling', status: 'in-progress' },
      { id: 't1-3', text: 'Verify test coverage', status: 'pending' },
      { id: 't1-4', text: 'Review documentation', status: 'pending' },
    ],
    activities: [
      { id: 'a1-1', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), action: 'created', description: 'Task created', agentId: 'agent-1' },
      { id: 'a1-2', timestamp: new Date(Date.now() - 1000 * 60 * 60), action: 'started', description: 'Code review started', agentId: 'agent-1' },
      { id: 'a1-3', timestamp: new Date(Date.now() - 1000 * 60 * 30), action: 'progress', description: 'Completed security review', agentId: 'agent-1' },
    ],
  },
  {
    id: 'task-2',
    title: 'Build integration tests',
    description: 'Create comprehensive test suite for API endpoints',
    stage: 'cicd',
    agentId: 'agent-2',
    priority: 'high',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4),
    updatedAt: new Date(Date.now() - 1000 * 60 * 5),
    todos: [
      { id: 't2-1', text: 'Set up test environment', status: 'completed', completedAt: new Date(Date.now() - 1000 * 60 * 120) },
      { id: 't2-2', text: 'Write endpoint tests', status: 'completed', completedAt: new Date(Date.now() - 1000 * 60 * 60) },
      { id: 't2-3', text: 'Run CI pipeline', status: 'in-progress' },
    ],
    activities: [
      { id: 'a2-1', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), action: 'created', description: 'Task created', agentId: 'agent-2' },
      { id: 'a2-2', timestamp: new Date(Date.now() - 1000 * 60 * 120), action: 'progress', description: 'Test environment ready', agentId: 'agent-2' },
      { id: 'a2-3', timestamp: new Date(Date.now() - 1000 * 60 * 5), action: 'stage-change', description: 'Moved to CI/CD', agentId: 'agent-2' },
    ],
  },
  {
    id: 'task-3',
    title: 'Update API documentation',
    description: 'Document new REST endpoints and WebSocket protocol',
    stage: 'planning',
    agentId: 'agent-3',
    priority: 'medium',
    createdAt: new Date(Date.now() - 1000 * 60 * 30),
    updatedAt: new Date(Date.now() - 1000 * 60 * 30),
    todos: [
      { id: 't3-1', text: 'Review API changes', status: 'pending' },
      { id: 't3-2', text: 'Write endpoint docs', status: 'pending' },
      { id: 't3-3', text: 'Document WebSocket events', status: 'pending' },
      { id: 't3-4', text: 'Add code examples', status: 'pending' },
    ],
    activities: [
      { id: 'a3-1', timestamp: new Date(Date.now() - 1000 * 60 * 30), action: 'created', description: 'Task created', agentId: 'agent-3' },
    ],
  },
  {
    id: 'task-4',
    title: 'Review database migration',
    description: 'Code review for schema changes and data migration scripts',
    stage: 'blocked',
    agentId: 'agent-4',
    priority: 'high',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3),
    updatedAt: new Date(Date.now() - 1000 * 60 * 15),
    todos: [
      { id: 't4-1', text: 'Review migration scripts', status: 'completed', completedAt: new Date(Date.now() - 1000 * 60 * 60) },
      { id: 't4-2', text: 'Check rollback procedures', status: 'completed', completedAt: new Date(Date.now() - 1000 * 60 * 30) },
      { id: 't4-3', text: 'Wait for DBA approval', status: 'in-progress' },
    ],
    activities: [
      { id: 'a4-1', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), action: 'created', description: 'Task created', agentId: 'agent-4' },
      { id: 'a4-2', timestamp: new Date(Date.now() - 1000 * 60 * 60), action: 'progress', description: 'Migration review completed', agentId: 'agent-4' },
      { id: 'a4-3', timestamp: new Date(Date.now() - 1000 * 60 * 15), action: 'blocked', description: 'Waiting for DBA approval', agentId: 'agent-4' },
    ],
  },
  {
    id: 'task-5',
    title: 'Refactor user service',
    description: 'Code review for service layer improvements',
    stage: 'review',
    agentId: 'agent-1',
    priority: 'medium',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6),
    updatedAt: new Date(Date.now() - 1000 * 60 * 20),
    todos: [
      { id: 't5-1', text: 'Review code structure', status: 'completed', completedAt: new Date(Date.now() - 1000 * 60 * 60 * 2) },
      { id: 't5-2', text: 'Check performance', status: 'completed', completedAt: new Date(Date.now() - 1000 * 60 * 60) },
      { id: 't5-3', text: 'Final approval', status: 'in-progress' },
    ],
    activities: [
      { id: 'a5-1', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), action: 'created', description: 'Task created', agentId: 'agent-1' },
      { id: 'a5-2', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), action: 'progress', description: 'Code structure review done', agentId: 'agent-1' },
      { id: 'a5-3', timestamp: new Date(Date.now() - 1000 * 60 * 20), action: 'stage-change', description: 'Moved to review', agentId: 'agent-1' },
    ],
  },
  {
    id: 'task-6',
    title: 'Payment gateway integration',
    description: 'Complete integration testing for Stripe payment flow',
    stage: 'completed',
    agentId: 'agent-2',
    priority: 'high',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60),
    todos: [
      { id: 't6-1', text: 'Test payment flow', status: 'completed', completedAt: new Date(Date.now() - 1000 * 60 * 60 * 6) },
      { id: 't6-2', text: 'Test refund process', status: 'completed', completedAt: new Date(Date.now() - 1000 * 60 * 60 * 4) },
      { id: 't6-3', text: 'Verify webhooks', status: 'completed', completedAt: new Date(Date.now() - 1000 * 60 * 60 * 2) },
    ],
    activities: [
      { id: 'a6-1', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), action: 'created', description: 'Task created', agentId: 'agent-2' },
      { id: 'a6-2', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), action: 'progress', description: 'Payment tests passed', agentId: 'agent-2' },
      { id: 'a6-3', timestamp: new Date(Date.now() - 1000 * 60 * 60), action: 'completed', description: 'All tests completed', agentId: 'agent-2' },
    ],
  },
];

export function getAgentById(agentId: string): Agent | undefined {
  return mockAgents.find(agent => agent.id === agentId);
}

export function getTasksByStage(stage: string): Task[] {
  return mockTasks.filter(task => task.stage === stage);
}

export function getTasksByAgent(agentId: string): Task[] {
  return mockTasks.filter(task => task.agentId === agentId);
}

export function getAgentTypeColor(type: AgentType): string {
  const agent = mockAgents.find(a => a.type === type);
  return agent?.color || 'oklch(0.65 0.25 45)';
}
