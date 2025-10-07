import type { Module, KanbanColumn } from './types';

export const mockModules: Module[] = [
  {
    id: '1',
    name: 'User Authentication Module',
    description: 'Migrate user authentication from legacy system to new OAuth2 implementation',
    status: 'in-progress',
    priority: 'high',
    assignee: {
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      team: 'Security Team',
    },
    prUrl: 'https://github.com/example/repo/pull/123',
    ciStatus: 'passing',
    blockers: [],
    tags: ['authentication', 'security', 'backend'],
    subTasks: [
      { name: 'OAuth2 integration', completed: true },
      { name: 'Database migration', completed: true },
      { name: 'API endpoints', completed: false },
      { name: 'Unit tests', completed: false },
    ],
    lastUpdated: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    estimatedEffort: 40,
    actualEffort: 28,
  },
  {
    id: '2',
    name: 'Payment Gateway Integration',
    description: 'Integrate Stripe payment gateway for subscription management',
    status: 'in-review',
    priority: 'high',
    assignee: {
      name: 'Marcus Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      team: 'Backend Team',
    },
    prUrl: 'https://github.com/example/repo/pull/145',
    ciStatus: 'passing',
    blockers: [],
    tags: ['payment', 'integration', 'backend'],
    subTasks: [
      { name: 'Stripe API setup', completed: true },
      { name: 'Webhook handlers', completed: true },
      { name: 'Error handling', completed: true },
      { name: 'Documentation', completed: true },
    ],
    lastUpdated: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
    estimatedEffort: 32,
    actualEffort: 35,
  },
  {
    id: '3',
    name: 'Dashboard Analytics',
    description: 'Create real-time analytics dashboard with charts and metrics',
    status: 'testing',
    priority: 'medium',
    assignee: {
      name: 'Emily Johnson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      team: 'Frontend Team',
    },
    prUrl: 'https://github.com/example/repo/pull/156',
    ciStatus: 'failing',
    blockers: ['Waiting for API fixes'],
    tags: ['dashboard', 'analytics', 'frontend'],
    subTasks: [
      { name: 'Chart components', completed: true },
      { name: 'Data fetching', completed: true },
      { name: 'Performance optimization', completed: true },
      { name: 'E2E tests', completed: false },
    ],
    lastUpdated: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    estimatedEffort: 24,
    actualEffort: 26,
  },
  {
    id: '4',
    name: 'Email Notification System',
    description: 'Build automated email notification system with templates',
    status: 'not-started',
    priority: 'low',
    assignee: {
      name: 'David Kim',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
      team: 'Backend Team',
    },
    blockers: [],
    tags: ['email', 'notifications', 'backend'],
    lastUpdated: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    estimatedEffort: 16,
  },
  {
    id: '5',
    name: 'Mobile Responsive Layout',
    description: 'Make entire application responsive for mobile and tablet devices',
    status: 'in-progress',
    priority: 'high',
    assignee: {
      name: 'Lisa Park',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop',
      team: 'Frontend Team',
    },
    prUrl: 'https://github.com/example/repo/pull/167',
    ciStatus: 'pending',
    blockers: [],
    tags: ['responsive', 'mobile', 'css'],
    subTasks: [
      { name: 'Breakpoint setup', completed: true },
      { name: 'Navigation refactor', completed: true },
      { name: 'Forms optimization', completed: false },
      { name: 'Testing on devices', completed: false },
    ],
    lastUpdated: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    estimatedEffort: 20,
    actualEffort: 12,
  },
  {
    id: '6',
    name: 'Search Functionality',
    description: 'Implement full-text search with filters and pagination',
    status: 'completed',
    priority: 'medium',
    assignee: {
      name: 'Alex Turner',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      team: 'Backend Team',
    },
    prUrl: 'https://github.com/example/repo/pull/178',
    ciStatus: 'passing',
    blockers: [],
    tags: ['search', 'backend', 'database'],
    subTasks: [
      { name: 'Database indexing', completed: true },
      { name: 'Search API', completed: true },
      { name: 'Frontend integration', completed: true },
      { name: 'Performance testing', completed: true },
    ],
    lastUpdated: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    estimatedEffort: 28,
    actualEffort: 30,
  },
  {
    id: '7',
    name: 'User Profile Management',
    description: 'Create user profile pages with settings and preferences',
    status: 'in-review',
    priority: 'medium',
    assignee: {
      name: 'Rachel Green',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
      team: 'Frontend Team',
    },
    prUrl: 'https://github.com/example/repo/pull/189',
    ciStatus: 'passing',
    blockers: [],
    tags: ['profile', 'user', 'frontend'],
    subTasks: [
      { name: 'Profile UI', completed: true },
      { name: 'Settings page', completed: true },
      { name: 'Avatar upload', completed: true },
      { name: 'Form validation', completed: true },
    ],
    lastUpdated: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
    estimatedEffort: 18,
    actualEffort: 19,
  },
  {
    id: '8',
    name: 'API Rate Limiting',
    description: 'Implement rate limiting and throttling for API endpoints',
    status: 'not-started',
    priority: 'high',
    assignee: {
      name: 'James Wilson',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop',
      team: 'Security Team',
    },
    blockers: ['Waiting for infrastructure approval'],
    tags: ['api', 'security', 'backend'],
    lastUpdated: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000), // 8 days ago
    estimatedEffort: 12,
  },
  {
    id: '9',
    name: 'Data Export Module',
    description: 'Allow users to export their data in CSV and JSON formats',
    status: 'testing',
    priority: 'low',
    assignee: {
      name: 'Nina Patel',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop',
      team: 'Backend Team',
    },
    prUrl: 'https://github.com/example/repo/pull/201',
    ciStatus: 'passing',
    blockers: [],
    tags: ['export', 'data', 'backend'],
    subTasks: [
      { name: 'CSV export', completed: true },
      { name: 'JSON export', completed: true },
      { name: 'UI integration', completed: true },
      { name: 'Load testing', completed: false },
    ],
    lastUpdated: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), // 6 days ago
    estimatedEffort: 14,
    actualEffort: 15,
  },
  {
    id: '10',
    name: 'Dark Mode Support',
    description: 'Add dark mode theme with persistent user preference',
    status: 'completed',
    priority: 'medium',
    assignee: {
      name: 'Tom Harris',
      avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&h=100&fit=crop',
      team: 'Frontend Team',
    },
    prUrl: 'https://github.com/example/repo/pull/212',
    ciStatus: 'passing',
    blockers: [],
    tags: ['theme', 'ui', 'frontend'],
    subTasks: [
      { name: 'Theme provider', completed: true },
      { name: 'Color palette', completed: true },
      { name: 'Component updates', completed: true },
      { name: 'Testing', completed: true },
    ],
    lastUpdated: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 14 days ago
    estimatedEffort: 22,
    actualEffort: 20,
  },
];

export const getKanbanColumns = (modules: Module[]): KanbanColumn[] => {
  const columns: KanbanColumn[] = [
    { id: 'not-started', title: 'Not Started', modules: [] },
    { id: 'in-progress', title: 'In Progress', modules: [] },
    { id: 'in-review', title: 'In Review', modules: [] },
    { id: 'testing', title: 'Testing', modules: [] },
    { id: 'completed', title: 'Completed', modules: [] },
  ];

  modules.forEach((module) => {
    const column = columns.find((col) => col.id === module.status);
    if (column) {
      column.modules.push(module);
    }
  });

  return columns;
};

export const getAllTeams = (modules: Module[]): string[] => {
  const teams = new Set(modules.map((m) => m.assignee.team));
  return Array.from(teams).sort();
};

export const getAllAssignees = (modules: Module[]): string[] => {
  const assignees = new Set(modules.map((m) => m.assignee.name));
  return Array.from(assignees).sort();
};
