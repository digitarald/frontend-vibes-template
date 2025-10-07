import { Wave, BurndownDataPoint, DashboardMetrics } from './types';

// Generate dates relative to today
const today = new Date();
const daysAgo = (days: number) => {
  const date = new Date(today);
  date.setDate(date.getDate() - days);
  return date;
};
const daysAhead = (days: number) => {
  const date = new Date(today);
  date.setDate(date.getDate() + days);
  return date;
};

export const mockWaves: Wave[] = [
  {
    id: 'wave-1',
    name: 'Wave 1: Core Infrastructure',
    status: 'completed',
    startDate: daysAgo(60),
    targetEndDate: daysAgo(30),
    actualEndDate: daysAgo(28),
    progress: 100,
    modules: [
      {
        id: 'm1-1',
        name: 'Authentication Service',
        status: 'completed',
        prUrl: 'https://github.com/example/repo/pull/101',
        assignee: 'Sarah Chen',
        completedDate: daysAgo(55),
      },
      {
        id: 'm1-2',
        name: 'Database Layer',
        status: 'completed',
        prUrl: 'https://github.com/example/repo/pull/102',
        assignee: 'Mike Johnson',
        completedDate: daysAgo(50),
      },
      {
        id: 'm1-3',
        name: 'API Gateway',
        status: 'completed',
        prUrl: 'https://github.com/example/repo/pull/103',
        assignee: 'Alex Kim',
        completedDate: daysAgo(45),
      },
      {
        id: 'm1-4',
        name: 'Logging Framework',
        status: 'completed',
        prUrl: 'https://github.com/example/repo/pull/104',
        assignee: 'Sarah Chen',
        completedDate: daysAgo(40),
      },
      {
        id: 'm1-5',
        name: 'Configuration Manager',
        status: 'completed',
        prUrl: 'https://github.com/example/repo/pull/105',
        assignee: 'Mike Johnson',
        completedDate: daysAgo(35),
      },
    ],
  },
  {
    id: 'wave-2',
    name: 'Wave 2: User Management',
    status: 'completed',
    startDate: daysAgo(30),
    targetEndDate: daysAgo(5),
    actualEndDate: daysAgo(3),
    progress: 100,
    modules: [
      {
        id: 'm2-1',
        name: 'User Service',
        status: 'completed',
        prUrl: 'https://github.com/example/repo/pull/201',
        assignee: 'Emma Davis',
        completedDate: daysAgo(25),
      },
      {
        id: 'm2-2',
        name: 'Profile Management',
        status: 'completed',
        prUrl: 'https://github.com/example/repo/pull/202',
        assignee: 'Chris Lee',
        completedDate: daysAgo(20),
      },
      {
        id: 'm2-3',
        name: 'Permissions System',
        status: 'completed',
        prUrl: 'https://github.com/example/repo/pull/203',
        assignee: 'Emma Davis',
        completedDate: daysAgo(15),
      },
      {
        id: 'm2-4',
        name: 'Session Manager',
        status: 'completed',
        prUrl: 'https://github.com/example/repo/pull/204',
        assignee: 'Alex Kim',
        completedDate: daysAgo(10),
      },
    ],
  },
  {
    id: 'wave-3',
    name: 'Wave 3: Business Logic',
    status: 'in-progress',
    startDate: daysAgo(10),
    targetEndDate: daysAhead(20),
    progress: 57,
    modules: [
      {
        id: 'm3-1',
        name: 'Order Service',
        status: 'completed',
        prUrl: 'https://github.com/example/repo/pull/301',
        assignee: 'Sarah Chen',
        completedDate: daysAgo(5),
      },
      {
        id: 'm3-2',
        name: 'Payment Gateway',
        status: 'completed',
        prUrl: 'https://github.com/example/repo/pull/302',
        assignee: 'Mike Johnson',
        completedDate: daysAgo(3),
      },
      {
        id: 'm3-3',
        name: 'Inventory Manager',
        status: 'in-progress',
        prUrl: 'https://github.com/example/repo/pull/303',
        assignee: 'Chris Lee',
      },
      {
        id: 'm3-4',
        name: 'Notification Service',
        status: 'in-progress',
        prUrl: 'https://github.com/example/repo/pull/304',
        assignee: 'Emma Davis',
      },
      {
        id: 'm3-5',
        name: 'Analytics Engine',
        status: 'pending',
        assignee: 'Alex Kim',
      },
      {
        id: 'm3-6',
        name: 'Reporting Module',
        status: 'pending',
        assignee: 'Sarah Chen',
      },
      {
        id: 'm3-7',
        name: 'Search Service',
        status: 'pending',
        assignee: 'Mike Johnson',
      },
    ],
  },
  {
    id: 'wave-4',
    name: 'Wave 4: Integration Layer',
    status: 'blocked',
    startDate: daysAhead(15),
    targetEndDate: daysAhead(45),
    progress: 0,
    modules: [
      {
        id: 'm4-1',
        name: 'Third-party API Integration',
        status: 'blocked',
        assignee: 'Chris Lee',
      },
      {
        id: 'm4-2',
        name: 'Webhook Manager',
        status: 'pending',
        assignee: 'Emma Davis',
      },
      {
        id: 'm4-3',
        name: 'Event Bus',
        status: 'pending',
        assignee: 'Alex Kim',
      },
      {
        id: 'm4-4',
        name: 'Data Sync Service',
        status: 'pending',
        assignee: 'Sarah Chen',
      },
      {
        id: 'm4-5',
        name: 'External Storage',
        status: 'pending',
        assignee: 'Mike Johnson',
      },
    ],
  },
  {
    id: 'wave-5',
    name: 'Wave 5: Performance & Optimization',
    status: 'planned',
    startDate: daysAhead(45),
    targetEndDate: daysAhead(75),
    progress: 0,
    modules: [
      {
        id: 'm5-1',
        name: 'Caching Layer',
        status: 'pending',
        assignee: 'Alex Kim',
      },
      {
        id: 'm5-2',
        name: 'Load Balancer',
        status: 'pending',
        assignee: 'Mike Johnson',
      },
      {
        id: 'm5-3',
        name: 'CDN Integration',
        status: 'pending',
        assignee: 'Sarah Chen',
      },
      {
        id: 'm5-4',
        name: 'Query Optimizer',
        status: 'pending',
        assignee: 'Chris Lee',
      },
    ],
  },
];

// Generate burndown chart data
export const mockBurndownData: BurndownDataPoint[] = (() => {
  const startDate = daysAgo(60);
  const endDate = daysAhead(75);
  const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const totalModules = mockWaves.reduce((sum, wave) => sum + wave.modules.length, 0);
  
  const data: BurndownDataPoint[] = [];
  
  // Calculate actual remaining work based on completion dates
  for (let i = 0; i <= totalDays; i += 7) {
    const currentDate = new Date(startDate);
    currentDate.setDate(currentDate.getDate() + i);
    
    let completedModules = 0;
    mockWaves.forEach(wave => {
      wave.modules.forEach(module => {
        if (module.completedDate && module.completedDate <= currentDate) {
          completedModules++;
        }
      });
    });
    
    const remaining = totalModules - completedModules;
    const ideal = Math.max(0, totalModules - (totalModules / totalDays) * i);
    
    data.push({
      date: currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      remaining: remaining,
      ideal: Math.round(ideal),
    });
  }
  
  return data;
})();

// Calculate dashboard metrics
export const mockMetrics: DashboardMetrics = (() => {
  const totalWaves = mockWaves.length;
  const completedWaves = mockWaves.filter(w => w.status === 'completed').length;
  const totalModules = mockWaves.reduce((sum, wave) => sum + wave.modules.length, 0);
  const completedModules = mockWaves.reduce(
    (sum, wave) => sum + wave.modules.filter(m => m.status === 'completed').length,
    0
  );
  const blockers = mockWaves.reduce(
    (sum, wave) => sum + wave.modules.filter(m => m.status === 'blocked').length,
    0
  ) + mockWaves.filter(w => w.status === 'blocked').length;
  
  // Calculate velocity (modules completed per week) based on completed modules
  const completedWithDates = mockWaves
    .flatMap(w => w.modules)
    .filter(m => m.completedDate)
    .sort((a, b) => (a.completedDate!.getTime() - b.completedDate!.getTime()));
  
  let velocity = 0;
  if (completedWithDates.length > 1) {
    const firstDate = completedWithDates[0].completedDate!;
    const lastDate = completedWithDates[completedWithDates.length - 1].completedDate!;
    const weeks = (lastDate.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24 * 7);
    velocity = weeks > 0 ? Math.round((completedWithDates.length / weeks) * 10) / 10 : 0;
  }
  
  // Average time per module (in days)
  const avgTimePerModule = velocity > 0 ? Math.round((7 / velocity) * 10) / 10 : 0;
  
  // Success rate (assuming completed modules passed CI/CD)
  const successRate = totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;
  
  // Estimated completion date based on velocity
  const remainingModules = totalModules - completedModules;
  const weeksRemaining = velocity > 0 ? remainingModules / velocity : 0;
  const estimatedCompletion = new Date(today);
  estimatedCompletion.setDate(estimatedCompletion.getDate() + Math.ceil(weeksRemaining * 7));
  
  return {
    totalWaves,
    completedWaves,
    totalModules,
    completedModules,
    velocity,
    avgTimePerModule,
    blockers,
    successRate,
    estimatedCompletion,
  };
})();
