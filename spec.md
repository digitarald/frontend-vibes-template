# GitHub Community Metrics Dashboard

## Overview

This document outlines the functional specifications for a single-page dashboard that displays GitHub community metrics for a repository. The dashboard will provide stakeholders with key repository performance indicators, contribution trends, and community engagement metrics in an intuitive, visually appealing interface.

## Goals

- Provide a comprehensive overview of repository health and community engagement
- Visualize trends and patterns in repository activity over time
- Identify top contributors and active community members
- Monitor issue and pull request activity and resolution times
- Present data in a clean, modern UI with responsive design

## Tech Stack

- **Frontend**: Next.js with App Router, TypeScript, React
- **UI Components**: Shadcn UI
- **Styling**: Tailwind CSS
- **Error Tracking**: Sentry
- **Icons**: Lucide icons

## User Stories

1. As a repository maintainer, I want to view key repository metrics at a glance so I can quickly assess repository health.
2. As a community manager, I want to identify active contributors so I can acknowledge their contributions.
3. As a product manager, I want to track issue resolution times so I can gauge team responsiveness.
4. As a technical lead, I want to monitor PR review statistics so I can optimize the review process.
5. As a stakeholder, I want to see activity trends over time so I can correlate them with project milestones.

## Features and Components

### 1. Header Section

- Repository selector or display of current repository
- Time range selector (7 days, 30 days, 90 days, 1 year, custom)
- Last updated timestamp
- Export options (PDF, CSV, PNG)

### 2. Key Metrics Cards

A row of cards showing:
- Total stars and growth rate
- Total forks and growth rate
- Active contributors (last 30 days)
- Open issues count
- Open PRs count
- Average time to close issues
- Average time to merge PRs

### 3. Activity Timeline

- Interactive line graph showing multiple metrics over time
- Toggleable metrics: commits, PRs, issues, stars, forks
- Hover tooltips with detailed data
- Ability to zoom in on specific time periods

### 4. Contributors Section

- Table of top contributors with:
  - Avatar and username
  - Commit count
  - PR count
  - Issue count
  - Lines added/removed
- Sorting options for each column
- Pagination or infinite scroll

### 5. Issues and PRs Analysis

- Distribution of issues by labels (pie chart)
- Issues created vs closed over time (area chart)
- PR merge rate and average review time
- Table of recent issues/PRs with status indicators

### 6. Repository Health Score

- Aggregate score based on multiple factors
- Visual indicator (gauge chart)
- Tooltip explaining score components
- Historical score trend

## Data Structure

### Mock Data Format

```typescript
interface RepositoryMetrics {
  name: string;
  owner: string;
  metrics: {
    stars: number;
    starGrowthRate: number;
    forks: number;
    forkGrowthRate: number;
    activeContributors: number;
    openIssues: number;
    openPRs: number;
    avgIssueCloseTime: number; // in hours
    avgPRMergeTime: number; // in hours
    healthScore: number; // 0-100
  };
  timelineData: Array<{
    date: string; // ISO format
    commits: number;
    prs: number;
    issues: number;
    stars: number;
    forks: number;
  }>;
  contributors: Array<{
    username: string;
    avatarUrl: string;
    commits: number;
    prs: number;
    issues: number;
    linesAdded: number;
    linesRemoved: number;
  }>;
  issuesByLabel: Array<{
    label: string;
    count: number;
    color: string;
  }>;
  recentActivity: Array<{
    id: number;
    type: 'issue' | 'pr';
    title: string;
    author: string;
    createdAt: string;
    status: 'open' | 'closed' | 'merged';
    url: string;
  }>;
}
```

## UI/UX Specifications

### Layout

- Responsive design with mobile-first approach
- Grid-based layout with appropriate spacing
- Collapsible sections for mobile view
- Dark/light mode toggle

### Design Elements

- Clean, modern aesthetics using Shadcn UI components
- Consistent color scheme with GitHub-inspired palette
- Interactive elements with appropriate hover states
- Skeleton loaders during data fetching
- Clear section headings and subheadings

### Interactions

- Tooltips for data points and metrics with explanations
- Interactive charts with zoom and pan capabilities
- Filtering options for most data views
- Responsive tables with sort functionality
- Dropdown menus for repository selection and time range

## Technical Implementation Notes

### Data Fetching

- Use React Server Components for initial data loading
- Implement staggered loading with Suspense boundaries
- Cache responses appropriately
- Implement error boundaries with Sentry tracking

### State Management

- Use URL search parameters (nuqs) for filter states
- Server-side state for initial data loading
- Client-side state for interactive elements

### Performance Considerations

- Optimize chart rendering with throttling
- Use dynamic imports for non-critical components
- Implement virtualization for long tables
- Cache complex calculations

### Accessibility

- Ensure proper contrast ratios
- Implement keyboard navigation
- Add appropriate ARIA labels
- Provide text alternatives for charts

## Future Enhancements

- Integration with actual GitHub API
- User authentication for private repositories
- Custom dashboard configurations
- Email/Slack notifications for specific metrics
- Comparative analysis between repositories
- Export of insights as reports

## Implementation Phases

### Phase 1: Core Dashboard (Current Scope)

- Implement the basic UI with mock data
- Create all visual components and charts
- Establish responsive layout

### Phase 2: Data Integration

- Connect to GitHub API
- Implement data transformation layers
- Add real-time updates

### Phase 3: Advanced Features

- Add user preferences and configurations
- Implement comparative analysis
- Add notification systems

## Conclusion

This GitHub Community Metrics Dashboard will provide a comprehensive view of repository activity and community engagement. By presenting data in an intuitive, visually appealing manner, it will help repository maintainers, community managers, and stakeholders make informed decisions based on community metrics.