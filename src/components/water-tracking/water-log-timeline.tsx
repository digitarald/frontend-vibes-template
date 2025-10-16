/**
 * Water log timeline component
 * Displays chronological list of water intake entries for the day
 */

import { WaterLog } from '@/types/water-tracking';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Droplet } from 'lucide-react';

interface WaterLogTimelineProps {
  logs: WaterLog[];
}

export function WaterLogTimeline({ logs }: WaterLogTimelineProps) {
  if (logs.length === 0) {
    return (
      <Card className="p-6 text-center">
        <Droplet className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-600 mb-2" />
        <p className="text-slate-600 dark:text-slate-400">
          No water logged yet. Start hydrating!
        </p>
      </Card>
    );
  }

  const sortedLogs = [...logs].sort(
    (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
  );

  return (
    <Card className="p-4">
      <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">
        Today&apos;s Logs
      </h3>

      <div className="space-y-3">
        {sortedLogs.map((log) => (
          <div
            key={log.id}
            className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-700 last:border-0"
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-950">
                <Droplet className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-slate-50">
                  {log.amount} ml
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {log.timestamp.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>

            <Badge variant="secondary" className="text-xs">
              {formatContainerType(log.containerType)}
            </Badge>
          </div>
        ))}
      </div>
    </Card>
  );
}

function formatContainerType(type: string): string {
  return type
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
