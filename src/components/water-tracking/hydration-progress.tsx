/**
 * Hydration progress display component
 * Shows current intake vs daily goal with visual progress bar
 */

import { DailyStats } from '@/types/water-tracking';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';

interface HydrationProgressProps {
  stats: DailyStats;
}

export function HydrationProgress({ stats }: HydrationProgressProps) {
  const percentage = Math.min((stats.totalIntake / stats.goal) * 100, 100);

  return (
    <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border-blue-200 dark:border-blue-800">
      <div className="space-y-4">
        <div className="flex items-baseline justify-between">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
            Today&apos;s Hydration
          </h2>
          <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
            Goal: {stats.goal.toLocaleString()} ml
          </span>
        </div>

        <div className="space-y-2">
          <Progress value={percentage} className="h-3" />
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {stats.totalIntake.toLocaleString()}
            </span>
            <span className="text-lg font-semibold text-slate-600 dark:text-slate-400">
              {percentage.toFixed(0)}%
            </span>
          </div>
        </div>

        <div className="pt-2">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {stats.totalIntake >= stats.goal
              ? "🎉 Goal reached! Great hydration today!"
              : `${stats.goal - stats.totalIntake} ml to go`}
          </p>
        </div>
      </div>
    </Card>
  );
}
