export type PRStatus = 'draft' | 'in_review' | 'completed';

export interface Reviewer {
  name: string;
  avatar: string;
  initials: string;
}

export interface PullRequest {
  id: string;
  number: number;
  title: string;
  author: {
    name: string;
    avatar: string;
    initials: string;
  };
  status: PRStatus;
  labels: string[];
  reviewers: Reviewer[];
  createdAt: Date;
}

// Mock data with 18 PRs for visual variety
export const mockPullRequests: PullRequest[] = [
  // Draft PRs (6)
  {
    id: '1',
    number: 1234,
    title: 'Add dark mode support to dashboard',
    author: {
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
      initials: 'SC',
    },
    status: 'draft',
    labels: ['feature', 'ui'],
    reviewers: [],
    createdAt: new Date('2025-10-28T10:00:00'),
  },
  {
    id: '2',
    number: 1235,
    title: 'Refactor authentication flow',
    author: {
      name: 'Marcus Johnson',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      initials: 'MJ',
    },
    status: 'draft',
    labels: ['refactor', 'auth'],
    reviewers: [],
    createdAt: new Date('2025-10-28T09:30:00'),
  },
  {
    id: '3',
    number: 1236,
    title: 'Implement lazy loading for images',
    author: {
      name: 'Emily Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
      initials: 'ER',
    },
    status: 'draft',
    labels: ['performance'],
    reviewers: [],
    createdAt: new Date('2025-10-28T11:15:00'),
  },
  {
    id: '4',
    number: 1237,
    title: 'Add TypeScript strict mode',
    author: {
      name: 'David Kim',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
      initials: 'DK',
    },
    status: 'draft',
    labels: ['dx', 'typescript'],
    reviewers: [],
    createdAt: new Date('2025-10-28T08:45:00'),
  },
  {
    id: '5',
    number: 1238,
    title: 'Create reusable form components',
    author: {
      name: 'Lisa Wang',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100',
      initials: 'LW',
    },
    status: 'draft',
    labels: ['component', 'ui'],
    reviewers: [],
    createdAt: new Date('2025-10-28T12:00:00'),
  },
  {
    id: '6',
    number: 1239,
    title: 'Update API documentation',
    author: {
      name: 'James Wilson',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100',
      initials: 'JW',
    },
    status: 'draft',
    labels: ['docs'],
    reviewers: [],
    createdAt: new Date('2025-10-28T13:20:00'),
  },

  // In Review PRs (7)
  {
    id: '7',
    number: 1230,
    title: 'Fix memory leak in data fetching',
    author: {
      name: 'Alex Turner',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
      initials: 'AT',
    },
    status: 'in_review',
    labels: ['bug', 'critical'],
    reviewers: [
      {
        name: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
        initials: 'SC',
      },
      {
        name: 'Marcus Johnson',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
        initials: 'MJ',
      },
    ],
    createdAt: new Date('2025-10-27T14:00:00'),
  },
  {
    id: '8',
    number: 1231,
    title: 'Add search functionality to user list',
    author: {
      name: 'Rachel Green',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
      initials: 'RG',
    },
    status: 'in_review',
    labels: ['feature'],
    reviewers: [
      {
        name: 'Emily Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
        initials: 'ER',
      },
    ],
    createdAt: new Date('2025-10-27T15:30:00'),
  },
  {
    id: '9',
    number: 1232,
    title: 'Optimize database queries',
    author: {
      name: 'Tom Anderson',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100',
      initials: 'TA',
    },
    status: 'in_review',
    labels: ['performance', 'backend'],
    reviewers: [
      {
        name: 'David Kim',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
        initials: 'DK',
      },
      {
        name: 'Lisa Wang',
        avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100',
        initials: 'LW',
      },
      {
        name: 'James Wilson',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100',
        initials: 'JW',
      },
    ],
    createdAt: new Date('2025-10-27T16:00:00'),
  },
  {
    id: '10',
    number: 1233,
    title: 'Improve accessibility for modal dialogs',
    author: {
      name: 'Nina Patel',
      avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100',
      initials: 'NP',
    },
    status: 'in_review',
    labels: ['a11y', 'ui'],
    reviewers: [
      {
        name: 'Alex Turner',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
        initials: 'AT',
      },
    ],
    createdAt: new Date('2025-10-27T17:15:00'),
  },
  {
    id: '11',
    number: 1228,
    title: 'Migrate to new payment provider',
    author: {
      name: 'Chris Martinez',
      avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=100',
      initials: 'CM',
    },
    status: 'in_review',
    labels: ['integration', 'payment'],
    reviewers: [
      {
        name: 'Rachel Green',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
        initials: 'RG',
      },
      {
        name: 'Tom Anderson',
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100',
        initials: 'TA',
      },
    ],
    createdAt: new Date('2025-10-26T10:00:00'),
  },
  {
    id: '12',
    number: 1229,
    title: 'Add unit tests for auth module',
    author: {
      name: 'Olivia Brown',
      avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100',
      initials: 'OB',
    },
    status: 'in_review',
    labels: ['test'],
    reviewers: [
      {
        name: 'Nina Patel',
        avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100',
        initials: 'NP',
      },
    ],
    createdAt: new Date('2025-10-26T11:30:00'),
  },
  {
    id: '13',
    number: 1227,
    title: 'Redesign notification system',
    author: {
      name: 'Michael Lee',
      avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100',
      initials: 'ML',
    },
    status: 'in_review',
    labels: ['feature', 'ui'],
    reviewers: [
      {
        name: 'Chris Martinez',
        avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=100',
        initials: 'CM',
      },
      {
        name: 'Olivia Brown',
        avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100',
        initials: 'OB',
      },
    ],
    createdAt: new Date('2025-10-25T14:00:00'),
  },

  // Completed PRs (5)
  {
    id: '14',
    number: 1226,
    title: 'Implement real-time chat feature',
    author: {
      name: 'Sophia Davis',
      avatar: 'https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?w=100',
      initials: 'SD',
    },
    status: 'completed',
    labels: ['feature', 'realtime'],
    reviewers: [
      {
        name: 'Michael Lee',
        avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100',
        initials: 'ML',
      },
      {
        name: 'Sophia Davis',
        avatar: 'https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?w=100',
        initials: 'SD',
      },
    ],
    createdAt: new Date('2025-10-24T09:00:00'),
  },
  {
    id: '15',
    number: 1225,
    title: 'Fix responsive layout on mobile',
    author: {
      name: 'Daniel Park',
      avatar: 'https://images.unsplash.com/photo-1557862921-37829c790f19?w=100',
      initials: 'DP',
    },
    status: 'completed',
    labels: ['bug', 'mobile'],
    reviewers: [
      {
        name: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
        initials: 'SC',
      },
    ],
    createdAt: new Date('2025-10-24T10:30:00'),
  },
  {
    id: '16',
    number: 1224,
    title: 'Add export to CSV functionality',
    author: {
      name: 'Hannah Moore',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100',
      initials: 'HM',
    },
    status: 'completed',
    labels: ['feature'],
    reviewers: [
      {
        name: 'Alex Turner',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
        initials: 'AT',
      },
      {
        name: 'Rachel Green',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
        initials: 'RG',
      },
    ],
    createdAt: new Date('2025-10-23T13:00:00'),
  },
  {
    id: '17',
    number: 1223,
    title: 'Upgrade to React 19',
    author: {
      name: 'Kevin Zhang',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100',
      initials: 'KZ',
    },
    status: 'completed',
    labels: ['upgrade', 'dx'],
    reviewers: [
      {
        name: 'Tom Anderson',
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100',
        initials: 'TA',
      },
      {
        name: 'Nina Patel',
        avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100',
        initials: 'NP',
      },
      {
        name: 'Chris Martinez',
        avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=100',
        initials: 'CM',
      },
    ],
    createdAt: new Date('2025-10-23T15:00:00'),
  },
  {
    id: '18',
    number: 1222,
    title: 'Setup CI/CD pipeline',
    author: {
      name: 'Isabella Garcia',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100',
      initials: 'IG',
    },
    status: 'completed',
    labels: ['devops', 'dx'],
    reviewers: [
      {
        name: 'Daniel Park',
        avatar: 'https://images.unsplash.com/photo-1557862921-37829c790f19?w=100',
        initials: 'DP',
      },
    ],
    createdAt: new Date('2025-10-22T16:00:00'),
  },
];
