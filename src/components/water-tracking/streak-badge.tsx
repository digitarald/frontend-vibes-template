/**
 * Streak badge component
 * Shows current hydration streak and longest streak
 */

import { StreakData } from '@/types/water-tracking';
import { Card } from '@/components/ui/card';
import { Flame } from 'lucide-react';

interface StreakBadgeProps {
  streak: StreakData;
}

export function StreakBadge({ streak }: StreakBadgeProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Card className="p-4 text-center bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 border-orange-200 dark:border-orange-800">
        <div className="flex items-center justify-center mb-2">
          <Flame className="w-5 h-5 text-orange-500" />
        </div>
        <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
          {streak.current}
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400">Current Streak</p>
      </Card>

      <Card className="p-4 text-center bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-purple-200 dark:border-purple-800">
        <div className="flex items-center justify-center mb-2">
          <Flame className="w-5 h-5 text-purple-500" />
        </div>
        <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
          {streak.longest}
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400">Longest Streak</p>
      </Card>
    </div>
  );
}
