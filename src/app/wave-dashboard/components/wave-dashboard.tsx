'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  BarChart3,
  Target,
  Calendar,
  ExternalLink,
} from 'lucide-react';
import { mockWaves, mockBurndownData, mockMetrics } from '../mock-data';
import { Wave, Module } from '../types';

const chartConfig = {
  remaining: {
    label: 'Remaining',
    color: 'hsl(var(--primary))',
  },
  ideal: {
    label: 'Ideal',
    color: 'hsl(var(--muted-foreground))',
  },
};

function getStatusColor(status: Wave['status'] | Module['status']) {
  switch (status) {
    case 'completed':
      return 'bg-green-500';
    case 'in-progress':
      return 'bg-blue-500';
    case 'planned':
    case 'pending':
      return 'bg-gray-500';
    case 'blocked':
      return 'bg-red-500';
    default:
      return 'bg-gray-500';
  }
}

function getStatusBadgeVariant(status: Wave['status']) {
  switch (status) {
    case 'completed':
      return 'default';
    case 'in-progress':
      return 'default';
    case 'blocked':
      return 'destructive';
    case 'planned':
      return 'secondary';
    default:
      return 'outline';
  }
}

function formatDate(date: Date) {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function WaveCard({ wave }: { wave: Wave }) {
  const completedCount = wave.modules.filter(m => m.status === 'completed').length;
  const inProgressCount = wave.modules.filter(m => m.status === 'in-progress').length;
  const blockedCount = wave.modules.filter(m => m.status === 'blocked').length;

  return (
    <AccordionItem value={wave.id}>
      <AccordionTrigger>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full pr-4">
          <div className="flex items-center gap-3 flex-1">
            <div className={`w-3 h-3 rounded-full ${getStatusColor(wave.status)}`} />
            <div className="text-left">
              <div className="font-semibold">{wave.name}</div>
              <div className="text-sm text-muted-foreground">
                {formatDate(wave.startDate)} → {formatDate(wave.targetEndDate)}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant={getStatusBadgeVariant(wave.status)}>
              {wave.status.replace('-', ' ')}
            </Badge>
            <div className="text-right min-w-[60px]">
              <div className="font-semibold">{wave.progress}%</div>
              <div className="text-xs text-muted-foreground">
                {completedCount}/{wave.modules.length}
              </div>
            </div>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div className="space-y-4 pt-2">
          <Progress value={wave.progress} className="h-2" />
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span className="text-muted-foreground">Completed:</span>
              <span className="font-semibold">{completedCount}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-500" />
              <span className="text-muted-foreground">In Progress:</span>
              <span className="font-semibold">{inProgressCount}</span>
            </div>
            {blockedCount > 0 && (
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-red-500" />
                <span className="text-muted-foreground">Blocked:</span>
                <span className="font-semibold">{blockedCount}</span>
              </div>
            )}
          </div>

          <div className="border-t pt-4">
            <h4 className="text-sm font-semibold mb-3">Modules</h4>
            <div className="space-y-2">
              {wave.modules.map(module => (
                <div
                  key={module.id}
                  className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(module.status)}`} />
                    <div className="flex-1">
                      <div className="font-medium">{module.name}</div>
                      <div className="text-xs text-muted-foreground">
                        Assigned to {module.assignee}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {module.prUrl && (
                      <a
                        href={module.prUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline flex items-center gap-1 text-sm"
                      >
                        PR <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                    <Badge variant="outline" className="text-xs">
                      {module.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

export function WaveDashboard() {
  const metrics = mockMetrics;
  const overallProgress = Math.round(
    (metrics.completedModules / metrics.totalModules) * 100
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Wave Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Track migration progress organized in waves and phases
        </p>
      </div>

      {/* Overall Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Overall Migration Progress</CardTitle>
          <CardDescription>
            {metrics.completedModules} of {metrics.totalModules} modules completed
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">{overallProgress}%</span>
              <span className="text-sm text-muted-foreground">
                {metrics.completedWaves}/{metrics.totalWaves} waves completed
              </span>
            </div>
            <Progress value={overallProgress} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Velocity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.velocity}</div>
            <p className="text-xs text-muted-foreground mt-1">modules per week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Avg Time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.avgTimePerModule}</div>
            <p className="text-xs text-muted-foreground mt-1">days per module</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              Blockers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">{metrics.blockers}</div>
            <p className="text-xs text-muted-foreground mt-1">active blockers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Success Rate
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.successRate}%</div>
            <p className="text-xs text-muted-foreground mt-1">CI/CD pass rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Burndown Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Burndown Chart</CardTitle>
          <CardDescription>
            Remaining work items over time vs. ideal trajectory
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockBurndownData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="date"
                  className="text-xs"
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                />
                <YAxis
                  className="text-xs"
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="remaining"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="ideal"
                  stroke="hsl(var(--muted-foreground))"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Estimated Completion */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Estimated Completion
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatDate(metrics.estimatedCompletion)}</div>
          <p className="text-sm text-muted-foreground mt-1">
            Based on current velocity of {metrics.velocity} modules/week
          </p>
        </CardContent>
      </Card>

      {/* Wave List */}
      <Card>
        <CardHeader>
          <CardTitle>Migration Waves</CardTitle>
          <CardDescription>
            Click on a wave to view detailed progress and module information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {mockWaves.map(wave => (
              <WaveCard key={wave.id} wave={wave} />
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
