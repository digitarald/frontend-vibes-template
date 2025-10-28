export interface PullRequest {
  id: number;
  number: number;
  title: string;
  author: {
    login: string;
    avatar: string;
  };
  state: 'draft' | 'review' | 'completed';
  labels: string[];
  createdAt: Date;
  reviewCount: number;
}

export const mockPullRequests: PullRequest[] = [
  {
    id: 1,
    number: 245,
    title: "Add dark mode support to navigation component",
    author: {
      login: "sarah-dev",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop"
    },
    state: 'draft',
    labels: ['ui', 'enhancement'],
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    reviewCount: 0
  },
  {
    id: 2,
    number: 243,
    title: "Fix TypeScript strict mode errors in utils module",
    author: {
      login: "alex-eng",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=80&h=80&fit=crop"
    },
    state: 'draft',
    labels: ['bug', 'typescript'],
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    reviewCount: 0
  },
  {
    id: 3,
    number: 240,
    title: "Implement infinite scroll for activity feed",
    author: {
      login: "maria-code",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop"
    },
    state: 'draft',
    labels: ['feature', 'frontend'],
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
    reviewCount: 0
  },
  {
    id: 4,
    number: 238,
    title: "Update API documentation for v2 endpoints",
    author: {
      login: "james-docs",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop"
    },
    state: 'draft',
    labels: ['documentation'],
    createdAt: new Date(Date.now() - 18 * 60 * 60 * 1000), // 18 hours ago
    reviewCount: 0
  },
  {
    id: 5,
    number: 235,
    title: "Optimize database queries for user dashboard",
    author: {
      login: "emma-db",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=80&h=80&fit=crop"
    },
    state: 'draft',
    labels: ['performance', 'backend'],
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    reviewCount: 0
  },
  {
    id: 6,
    number: 244,
    title: "Add unit tests for authentication service",
    author: {
      login: "ryan-test",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop"
    },
    state: 'review',
    labels: ['testing', 'backend'],
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    reviewCount: 2
  },
  {
    id: 7,
    number: 242,
    title: "Refactor component library structure",
    author: {
      login: "lisa-ui",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop"
    },
    state: 'review',
    labels: ['refactor', 'ui'],
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    reviewCount: 1
  },
  {
    id: 8,
    number: 241,
    title: "Implement webhook support for external integrations",
    author: {
      login: "mike-api",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop"
    },
    state: 'review',
    labels: ['feature', 'api'],
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
    reviewCount: 3
  },
  {
    id: 9,
    number: 239,
    title: "Fix memory leak in real-time notification system",
    author: {
      login: "anna-perf",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop"
    },
    state: 'review',
    labels: ['bug', 'critical'],
    createdAt: new Date(Date.now() - 10 * 60 * 60 * 1000), // 10 hours ago
    reviewCount: 2
  },
  {
    id: 10,
    number: 237,
    title: "Add accessibility improvements to form components",
    author: {
      login: "david-a11y",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop"
    },
    state: 'review',
    labels: ['accessibility', 'ui'],
    createdAt: new Date(Date.now() - 14 * 60 * 60 * 1000), // 14 hours ago
    reviewCount: 1
  },
  {
    id: 11,
    number: 236,
    title: "Implement CSV export functionality",
    author: {
      login: "sophie-export",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&h=80&fit=crop"
    },
    state: 'review',
    labels: ['feature', 'data'],
    createdAt: new Date(Date.now() - 20 * 60 * 60 * 1000), // 20 hours ago
    reviewCount: 2
  },
  {
    id: 12,
    number: 234,
    title: "Upgrade React to latest version",
    author: {
      login: "chris-deps",
      avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=80&h=80&fit=crop"
    },
    state: 'review',
    labels: ['dependencies', 'upgrade'],
    createdAt: new Date(Date.now() - 26 * 60 * 60 * 1000), // 26 hours ago
    reviewCount: 4
  },
  {
    id: 13,
    number: 233,
    title: "Add rate limiting to public API endpoints",
    author: {
      login: "tom-security",
      avatar: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=80&h=80&fit=crop"
    },
    state: 'completed',
    labels: ['security', 'api'],
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000), // 2 days ago
    reviewCount: 3
  },
  {
    id: 14,
    number: 232,
    title: "Redesign user profile page with new branding",
    author: {
      login: "nina-design",
      avatar: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=80&h=80&fit=crop"
    },
    state: 'completed',
    labels: ['ui', 'design'],
    createdAt: new Date(Date.now() - 72 * 60 * 60 * 1000), // 3 days ago
    reviewCount: 5
  },
  {
    id: 15,
    number: 230,
    title: "Fix CORS issues with external API calls",
    author: {
      login: "kevin-fix",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&h=80&fit=crop"
    },
    state: 'completed',
    labels: ['bug', 'api'],
    createdAt: new Date(Date.now() - 96 * 60 * 60 * 1000), // 4 days ago
    reviewCount: 2
  },
  {
    id: 16,
    number: 228,
    title: "Implement email notification preferences",
    author: {
      login: "julia-notif",
      avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=80&h=80&fit=crop"
    },
    state: 'completed',
    labels: ['feature', 'notifications'],
    createdAt: new Date(Date.now() - 120 * 60 * 60 * 1000), // 5 days ago
    reviewCount: 3
  },
  {
    id: 17,
    number: 226,
    title: "Add search filters to admin dashboard",
    author: {
      login: "peter-admin",
      avatar: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=80&h=80&fit=crop"
    },
    state: 'completed',
    labels: ['feature', 'admin'],
    createdAt: new Date(Date.now() - 144 * 60 * 60 * 1000), // 6 days ago
    reviewCount: 2
  },
  {
    id: 18,
    number: 224,
    title: "Optimize image loading and caching",
    author: {
      login: "rachel-perf",
      avatar: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=80&h=80&fit=crop"
    },
    state: 'completed',
    labels: ['performance', 'frontend'],
    createdAt: new Date(Date.now() - 168 * 60 * 60 * 1000), // 7 days ago
    reviewCount: 4
  },
  {
    id: 19,
    number: 222,
    title: "Update CI/CD pipeline configuration",
    author: {
      login: "daniel-devops",
      avatar: "https://images.unsplash.com/photo-1542178243-bc20204b769f?w=80&h=80&fit=crop"
    },
    state: 'completed',
    labels: ['devops', 'infrastructure'],
    createdAt: new Date(Date.now() - 192 * 60 * 60 * 1000), // 8 days ago
    reviewCount: 2
  },
  {
    id: 20,
    number: 220,
    title: "Implement two-factor authentication",
    author: {
      login: "olivia-sec",
      avatar: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=80&h=80&fit=crop"
    },
    state: 'completed',
    labels: ['security', 'feature'],
    createdAt: new Date(Date.now() - 216 * 60 * 60 * 1000), // 9 days ago
    reviewCount: 6
  }
];
