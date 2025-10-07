// Type definitions for dependency dashboard
export interface Module {
  id: string;
  name: string;
  status: 'migrated' | 'in-progress' | 'blocked' | 'not-started';
  dependencies: string[]; // IDs of modules this depends on
  dependents: string[]; // IDs of modules that depend on this
  team: string;
  priority: 'high' | 'medium' | 'low';
  estimatedEffort: number; // story points or hours
  description?: string;
}

export interface DependencyGraph {
  modules: Module[];
  criticalPath: string[]; // Module IDs in critical path
}

export interface ReadinessGroup {
  ready: Module[];
  waiting: Module[];
  blocked: Module[];
}

// Mock data for the dependency dashboard
export const mockModules: Module[] = [
  // Core infrastructure modules (high priority blockers)
  {
    id: 'auth-service',
    name: 'Authentication Service',
    status: 'migrated',
    dependencies: [],
    dependents: ['user-profile', 'api-gateway', 'admin-panel', 'dashboard'],
    team: 'Platform',
    priority: 'high',
    estimatedEffort: 21,
    description: 'Core authentication and authorization service'
  },
  {
    id: 'database-layer',
    name: 'Database Layer',
    status: 'migrated',
    dependencies: [],
    dependents: ['auth-service', 'user-profile', 'orders', 'inventory'],
    team: 'Platform',
    priority: 'high',
    estimatedEffort: 34,
    description: 'Data access layer and ORM configuration'
  },
  {
    id: 'api-gateway',
    name: 'API Gateway',
    status: 'in-progress',
    dependencies: ['auth-service'],
    dependents: ['frontend-app', 'mobile-app', 'admin-panel'],
    team: 'Platform',
    priority: 'high',
    estimatedEffort: 13,
    description: 'Central API gateway and routing'
  },
  
  // User-facing modules
  {
    id: 'user-profile',
    name: 'User Profile Service',
    status: 'not-started',
    dependencies: ['auth-service', 'database-layer'],
    dependents: ['dashboard', 'settings-page'],
    team: 'User Experience',
    priority: 'high',
    estimatedEffort: 8,
    description: 'User profile management and preferences'
  },
  {
    id: 'dashboard',
    name: 'Dashboard UI',
    status: 'blocked',
    dependencies: ['auth-service', 'user-profile', 'analytics-service'],
    dependents: ['frontend-app'],
    team: 'Frontend',
    priority: 'high',
    estimatedEffort: 13,
    description: 'Main dashboard interface'
  },
  {
    id: 'frontend-app',
    name: 'Frontend Application',
    status: 'blocked',
    dependencies: ['api-gateway', 'dashboard', 'checkout'],
    dependents: [],
    team: 'Frontend',
    priority: 'high',
    estimatedEffort: 21,
    description: 'Main customer-facing application'
  },
  
  // Business logic modules
  {
    id: 'orders',
    name: 'Orders Service',
    status: 'not-started',
    dependencies: ['database-layer', 'payment-processor'],
    dependents: ['checkout', 'admin-panel'],
    team: 'Commerce',
    priority: 'high',
    estimatedEffort: 13,
    description: 'Order processing and management'
  },
  {
    id: 'inventory',
    name: 'Inventory Management',
    status: 'not-started',
    dependencies: ['database-layer'],
    dependents: ['orders', 'checkout'],
    team: 'Commerce',
    priority: 'medium',
    estimatedEffort: 8,
    description: 'Product inventory tracking'
  },
  {
    id: 'checkout',
    name: 'Checkout Flow',
    status: 'blocked',
    dependencies: ['orders', 'inventory', 'payment-processor'],
    dependents: ['frontend-app'],
    team: 'Commerce',
    priority: 'high',
    estimatedEffort: 13,
    description: 'Customer checkout process'
  },
  
  // Supporting services
  {
    id: 'payment-processor',
    name: 'Payment Processor',
    status: 'not-started',
    dependencies: [],
    dependents: ['orders', 'checkout'],
    team: 'Payments',
    priority: 'high',
    estimatedEffort: 21,
    description: 'Payment processing integration'
  },
  {
    id: 'analytics-service',
    name: 'Analytics Service',
    status: 'not-started',
    dependencies: [],
    dependents: ['dashboard', 'admin-panel'],
    team: 'Data',
    priority: 'medium',
    estimatedEffort: 8,
    description: 'Analytics and metrics collection'
  },
  {
    id: 'notification-service',
    name: 'Notification Service',
    status: 'not-started',
    dependencies: [],
    dependents: ['orders', 'admin-panel'],
    team: 'Platform',
    priority: 'low',
    estimatedEffort: 5,
    description: 'Email and push notifications'
  },
  
  // Admin modules
  {
    id: 'admin-panel',
    name: 'Admin Panel',
    status: 'blocked',
    dependencies: ['api-gateway', 'auth-service', 'orders', 'analytics-service'],
    dependents: [],
    team: 'Admin',
    priority: 'medium',
    estimatedEffort: 13,
    description: 'Administrative interface'
  },
  {
    id: 'settings-page',
    name: 'Settings Page',
    status: 'blocked',
    dependencies: ['user-profile'],
    dependents: ['frontend-app'],
    team: 'Frontend',
    priority: 'low',
    estimatedEffort: 5,
    description: 'User settings interface'
  },
  
  // Mobile
  {
    id: 'mobile-app',
    name: 'Mobile Application',
    status: 'blocked',
    dependencies: ['api-gateway'],
    dependents: [],
    team: 'Mobile',
    priority: 'medium',
    estimatedEffort: 21,
    description: 'Native mobile application'
  }
];

// Calculate critical path (modules with most dependents)
export const criticalPath = mockModules
  .filter(m => m.dependents.length >= 3)
  .map(m => m.id);

export const mockDependencyGraph: DependencyGraph = {
  modules: mockModules,
  criticalPath
};

// Helper function to get module by ID
export function getModuleById(id: string): Module | undefined {
  return mockModules.find(m => m.id === id);
}

// Helper function to calculate readiness groups
export function calculateReadinessGroups(modules: Module[]): ReadinessGroup {
  const ready: Module[] = [];
  const waiting: Module[] = [];
  const blocked: Module[] = [];

  modules.forEach(module => {
    if (module.status === 'migrated') {
      return; // Skip migrated modules
    }

    const unmigrated = module.dependencies.filter(depId => {
      const dep = getModuleById(depId);
      return dep && dep.status !== 'migrated';
    });

    if (unmigrated.length === 0) {
      ready.push(module);
    } else if (unmigrated.length <= 2) {
      waiting.push(module);
    } else {
      blocked.push(module);
    }
  });

  return { ready, waiting, blocked };
}

// Calculate dependency health metrics
export interface HealthMetrics {
  averageDependencyDepth: number;
  unblockedCount: number;
  totalModules: number;
  migratedCount: number;
  progressPercentage: number;
  circularDependencies: string[][];
}

export function calculateHealthMetrics(modules: Module[]): HealthMetrics {
  const totalModules = modules.length;
  const migratedCount = modules.filter(m => m.status === 'migrated').length;
  const progressPercentage = Math.round((migratedCount / totalModules) * 100);

  // Calculate average dependency depth
  const depths = modules.map(m => calculateDepth(m.id, modules, new Set()));
  const averageDependencyDepth = depths.reduce((a, b) => a + b, 0) / depths.length;

  // Count unblocked modules (ready to migrate)
  const readiness = calculateReadinessGroups(modules);
  const unblockedCount = readiness.ready.length;

  // Detect circular dependencies (simplified check)
  const circularDependencies: string[][] = [];
  modules.forEach(module => {
    const visited = new Set<string>();
    const path: string[] = [];
    if (hasCircularDependency(module.id, modules, visited, path)) {
      // Only add unique cycles
      if (!circularDependencies.some(cycle => 
        cycle.length === path.length && cycle.every((id, i) => id === path[i])
      )) {
        circularDependencies.push([...path]);
      }
    }
  });

  return {
    averageDependencyDepth: Math.round(averageDependencyDepth * 10) / 10,
    unblockedCount,
    totalModules,
    migratedCount,
    progressPercentage,
    circularDependencies
  };
}

function calculateDepth(
  moduleId: string, 
  modules: Module[], 
  visited: Set<string>
): number {
  if (visited.has(moduleId)) return 0;
  visited.add(moduleId);

  const module = modules.find(m => m.id === moduleId);
  if (!module || module.dependencies.length === 0) return 1;

  const depths = module.dependencies.map(depId => 
    calculateDepth(depId, modules, new Set(visited))
  );
  return 1 + Math.max(...depths);
}

function hasCircularDependency(
  moduleId: string,
  modules: Module[],
  visited: Set<string>,
  path: string[]
): boolean {
  if (path.includes(moduleId)) return true;
  if (visited.has(moduleId)) return false;

  visited.add(moduleId);
  path.push(moduleId);

  const module = modules.find(m => m.id === moduleId);
  if (!module) return false;

  for (const depId of module.dependencies) {
    if (hasCircularDependency(depId, modules, visited, [...path])) {
      return true;
    }
  }

  return false;
}
