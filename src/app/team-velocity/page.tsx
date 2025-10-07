import { Metadata } from 'next';
import {
  Award,
  TrendingUp,
  Clock,
  CheckCircle,
  Users,
  GitPullRequest,
  GitMerge,
  AlertCircle,
  Zap,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export const metadata: Metadata = {
  title: 'Team Velocity - Migration Dashboard',
  description: 'Track team performance, code review metrics, and collaboration patterns during migration',
};

// Type definitions
interface Team {
  id: string;
  name: string;
  members: string[];
  metrics: {
    prsThisWeek: number;
    avgTimeToMerge: number; // hours
    openPRs: number;
    reviewResponseTime: number; // hours
  };
  sprintVelocity: number[]; // items completed per sprint
}

interface PRMetrics {
  totalOpen: number;
  inReview: number;
  approved: number;
  merged: number;
  avgCycleTime: number;
  avgReviewWaitTime: number;
}

interface Contributor {
  name: string;
  avatar: string;
  prsMerged: number;
  reviewCount: number;
  avgReviewTime: number;
}

// Mock Data
const teams: Team[] = [
  {
    id: 'team-1',
    name: 'Frontend Core',
    members: ['Alice', 'Bob', 'Charlie'],
    metrics: {
      prsThisWeek: 12,
      avgTimeToMerge: 18,
      openPRs: 5,
      reviewResponseTime: 4,
    },
    sprintVelocity: [8, 10, 12, 15, 14],
  },
  {
    id: 'team-2',
    name: 'Backend Services',
    members: ['David', 'Eve', 'Frank'],
    metrics: {
      prsThisWeek: 15,
      avgTimeToMerge: 24,
      openPRs: 8,
      reviewResponseTime: 6,
    },
    sprintVelocity: [10, 12, 15, 14, 16],
  },
  {
    id: 'team-3',
    name: 'Platform Team',
    members: ['Grace', 'Henry'],
    metrics: {
      prsThisWeek: 8,
      avgTimeToMerge: 16,
      openPRs: 3,
      reviewResponseTime: 3,
    },
    sprintVelocity: [6, 7, 8, 9, 10],
  },
  {
    id: 'team-4',
    name: 'Data Engineering',
    members: ['Ivy', 'Jack', 'Kate', 'Liam'],
    metrics: {
      prsThisWeek: 10,
      avgTimeToMerge: 36,
      openPRs: 12,
      reviewResponseTime: 8,
    },
    sprintVelocity: [5, 8, 10, 9, 8],
  },
];

const prMetrics: PRMetrics = {
  totalOpen: 28,
  inReview: 12,
  approved: 8,
  merged: 45,
  avgCycleTime: 22.5,
  avgReviewWaitTime: 5.2,
};

const contributors: Contributor[] = [
  { name: 'Alice Chen', avatar: 'AC', prsMerged: 18, reviewCount: 32, avgReviewTime: 2.5 },
  { name: 'Bob Smith', avatar: 'BS', prsMerged: 15, reviewCount: 28, avgReviewTime: 3.1 },
  { name: 'Charlie Brown', avatar: 'CB', prsMerged: 14, reviewCount: 25, avgReviewTime: 4.2 },
  { name: 'David Lee', avatar: 'DL', prsMerged: 16, reviewCount: 22, avgReviewTime: 3.8 },
  { name: 'Eve Martinez', avatar: 'EM', prsMerged: 13, reviewCount: 30, avgReviewTime: 2.8 },
  { name: 'Frank Wilson', avatar: 'FW', prsMerged: 12, reviewCount: 20, avgReviewTime: 5.5 },
  { name: 'Grace Taylor', avatar: 'GT', prsMerged: 11, reviewCount: 18, avgReviewTime: 3.5 },
  { name: 'Henry Davis', avatar: 'HD', prsMerged: 10, reviewCount: 15, avgReviewTime: 4.0 },
];

// Helper functions
function getMetricColor(metric: string, value: number): string {
  const thresholds: Record<string, { good: number; warning: number }> = {
    avgTimeToMerge: { good: 24, warning: 48 },
    reviewResponseTime: { good: 4, warning: 8 },
    avgReviewTime: { good: 3, warning: 6 },
  };

  const threshold = thresholds[metric];
  if (!threshold) return 'text-foreground';

  if (value <= threshold.good) return 'text-green-600 dark:text-green-500';
  if (value <= threshold.warning) return 'text-yellow-600 dark:text-yellow-500';
  return 'text-red-600 dark:text-red-500';
}

function getMetricBadgeVariant(metric: string, value: number): 'default' | 'secondary' | 'destructive' {
  const thresholds: Record<string, { good: number; warning: number }> = {
    avgTimeToMerge: { good: 24, warning: 48 },
    reviewResponseTime: { good: 4, warning: 8 },
  };

  const threshold = thresholds[metric];
  if (!threshold) return 'default';

  if (value <= threshold.good) return 'default';
  if (value <= threshold.warning) return 'secondary';
  return 'destructive';
}

export default function TeamVelocityPage() {
  const totalPRsThisWeek = teams.reduce((sum, team) => sum + team.metrics.prsThisWeek, 0);
  const avgTimeToMerge = teams.reduce((sum, team) => sum + team.metrics.avgTimeToMerge, 0) / teams.length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Team Velocity Dashboard</h1>
        <p className="text-muted-foreground">
          Track team performance, code review metrics, and collaboration patterns during migration
        </p>
      </div>

      {/* Time Filter Tabs */}
      <Tabs defaultValue="week" className="w-full">
        <TabsList>
          <TabsTrigger value="week">This Week</TabsTrigger>
          <TabsTrigger value="sprint">This Sprint</TabsTrigger>
          <TabsTrigger value="month">Last 30 Days</TabsTrigger>
        </TabsList>

        <TabsContent value="week" className="space-y-6">
          {/* Overview Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total PRs This Week</CardTitle>
                <GitPullRequest className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalPRsThisWeek}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600 dark:text-green-500">+12%</span> from last week
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Time to Merge</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${getMetricColor('avgTimeToMerge', avgTimeToMerge)}`}>
                  {avgTimeToMerge.toFixed(1)}h
                </div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600 dark:text-green-500">-8%</span> improvement
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">PRs Merged</CardTitle>
                <GitMerge className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{prMetrics.merged}</div>
                <p className="text-xs text-muted-foreground">This week</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Review Wait Time</CardTitle>
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${getMetricColor('reviewResponseTime', prMetrics.avgReviewWaitTime)}`}>
                  {prMetrics.avgReviewWaitTime}h
                </div>
                <p className="text-xs text-muted-foreground">Time waiting on review</p>
              </CardContent>
            </Card>
          </div>

          {/* PR Flow Visualization */}
          <Card>
            <CardHeader>
              <CardTitle>PR Flow Pipeline</CardTitle>
              <CardDescription>Current status of pull requests in the migration</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-4 gap-4">
                  <div className="flex flex-col items-center space-y-2">
                    <div className="flex h-20 w-full items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-950">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{prMetrics.totalOpen}</div>
                        <div className="text-xs text-blue-600 dark:text-blue-400">Open</div>
                      </div>
                    </div>
                    <div className="text-xs text-center text-muted-foreground">New PRs</div>
                  </div>

                  <div className="flex flex-col items-center space-y-2">
                    <div className="flex h-20 w-full items-center justify-center rounded-lg bg-yellow-100 dark:bg-yellow-950">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{prMetrics.inReview}</div>
                        <div className="text-xs text-yellow-600 dark:text-yellow-400">In Review</div>
                      </div>
                    </div>
                    <div className="text-xs text-center text-muted-foreground">Under Review</div>
                  </div>

                  <div className="flex flex-col items-center space-y-2">
                    <div className="flex h-20 w-full items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-950">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">{prMetrics.approved}</div>
                        <div className="text-xs text-purple-600 dark:text-purple-400">Approved</div>
                      </div>
                    </div>
                    <div className="text-xs text-center text-muted-foreground">Ready to Merge</div>
                  </div>

                  <div className="flex flex-col items-center space-y-2">
                    <div className="flex h-20 w-full items-center justify-center rounded-lg bg-green-100 dark:bg-green-950">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-600 dark:text-green-400">{prMetrics.merged}</div>
                        <div className="text-xs text-green-600 dark:text-green-400">Merged</div>
                      </div>
                    </div>
                    <div className="text-xs text-center text-muted-foreground">Completed</div>
                  </div>
                </div>

                {prMetrics.inReview > 10 && (
                  <div className="flex items-center gap-2 rounded-lg border border-yellow-200 bg-yellow-50 p-3 dark:border-yellow-800 dark:bg-yellow-950/30">
                    <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-500" />
                    <span className="text-sm text-yellow-700 dark:text-yellow-400">
                      Bottleneck detected: {prMetrics.inReview} PRs stuck in review
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Team Performance Cards */}
          <div>
            <h2 className="text-2xl font-bold tracking-tight mb-4">Team Performance</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
              {teams.map((team) => (
                <Card key={team.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          <Users className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{team.name}</CardTitle>
                          <CardDescription>{team.members.length} members</CardDescription>
                        </div>
                      </div>
                      {team.metrics.prsThisWeek >= 12 && (
                        <Badge variant="default" className="gap-1">
                          <Award className="h-3 w-3" />
                          Top Performer
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground">PRs This Week</div>
                        <div className="text-2xl font-bold">{team.metrics.prsThisWeek}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Open PRs</div>
                        <div className="text-2xl font-bold">{team.metrics.openPRs}</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Avg Time to Merge</span>
                        <Badge variant={getMetricBadgeVariant('avgTimeToMerge', team.metrics.avgTimeToMerge)}>
                          {team.metrics.avgTimeToMerge}h
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Review Response Time</span>
                        <Badge variant={getMetricBadgeVariant('reviewResponseTime', team.metrics.reviewResponseTime)}>
                          {team.metrics.reviewResponseTime}h
                        </Badge>
                      </div>
                    </div>

                    <div>
                      <div className="text-sm text-muted-foreground mb-2">Sprint Velocity Trend</div>
                      <div className="flex items-end justify-between h-16 gap-1">
                        {team.sprintVelocity.map((value, index) => {
                          const maxValue = Math.max(...team.sprintVelocity);
                          const height = (value / maxValue) * 100;
                          return (
                            <div
                              key={index}
                              className="flex-1 bg-primary rounded-t relative group"
                              style={{ height: `${height}%` }}
                            >
                              <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-medium">
                                {value}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Individual Contributors */}
          <Card>
            <CardHeader>
              <CardTitle>Top Contributors</CardTitle>
              <CardDescription>Individual performance metrics for this week</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="merged">
                <TabsList className="mb-4">
                  <TabsTrigger value="merged">Most PRs Merged</TabsTrigger>
                  <TabsTrigger value="reviews">Most Responsive Reviewers</TabsTrigger>
                </TabsList>

                <TabsContent value="merged">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Rank</TableHead>
                        <TableHead>Contributor</TableHead>
                        <TableHead className="text-right">PRs Merged</TableHead>
                        <TableHead className="text-right">Reviews Given</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {contributors
                        .sort((a, b) => b.prsMerged - a.prsMerged)
                        .slice(0, 5)
                        .map((contributor, index) => (
                          <TableRow key={contributor.name}>
                            <TableCell>
                              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary font-bold text-sm">
                                {index + 1}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary text-xs font-semibold">
                                  {contributor.avatar}
                                </div>
                                <span className="font-medium">{contributor.name}</span>
                                {index === 0 && (
                                  <Badge variant="default" className="gap-1">
                                    <Award className="h-3 w-3" />
                                    #1
                                  </Badge>
                                )}
                              </div>
                            </TableCell>
                            <TableCell className="text-right font-semibold">{contributor.prsMerged}</TableCell>
                            <TableCell className="text-right text-muted-foreground">{contributor.reviewCount}</TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TabsContent>

                <TabsContent value="reviews">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Rank</TableHead>
                        <TableHead>Reviewer</TableHead>
                        <TableHead className="text-right">Reviews Given</TableHead>
                        <TableHead className="text-right">Avg Response Time</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {contributors
                        .sort((a, b) => a.avgReviewTime - b.avgReviewTime)
                        .slice(0, 5)
                        .map((contributor, index) => (
                          <TableRow key={contributor.name}>
                            <TableCell>
                              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary font-bold text-sm">
                                {index + 1}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary text-xs font-semibold">
                                  {contributor.avatar}
                                </div>
                                <span className="font-medium">{contributor.name}</span>
                                {index === 0 && (
                                  <Badge variant="default" className="gap-1">
                                    <Zap className="h-3 w-3" />
                                    Fastest
                                  </Badge>
                                )}
                              </div>
                            </TableCell>
                            <TableCell className="text-right font-semibold">{contributor.reviewCount}</TableCell>
                            <TableCell className="text-right">
                              <span className={getMetricColor('avgReviewTime', contributor.avgReviewTime)}>
                                {contributor.avgReviewTime}h
                              </span>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Key Metrics Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Migration Health Metrics</CardTitle>
              <CardDescription>Overall migration progress indicators</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">PR Cycle Time</span>
                    <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-500" />
                  </div>
                  <div className="text-2xl font-bold">{prMetrics.avgCycleTime}h</div>
                  <div className="text-xs text-muted-foreground">Average end-to-end time</div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Review Participation</span>
                    <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-500" />
                  </div>
                  <div className="text-2xl font-bold">87%</div>
                  <div className="text-xs text-muted-foreground">Team members active in reviews</div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Merge Success Rate</span>
                    <GitMerge className="h-4 w-4 text-green-600 dark:text-green-500" />
                  </div>
                  <div className="text-2xl font-bold">94%</div>
                  <div className="text-xs text-muted-foreground">PRs merged without reverts</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sprint" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center text-muted-foreground">
                Sprint view with historical sprint data would be displayed here
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="month" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center text-muted-foreground">
                30-day trend analysis would be displayed here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
