'use client';

import { formatDistanceToNow } from 'date-fns';
import { Activity } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import type { ActivityItem } from '@/types/kanban';
import { AgentAvatar } from './agent-avatar';
import { getAgentById } from '@/data/mock-agents';

interface ActivityTimelineProps {
  activities: ActivityItem[];
  className?: string;
}

const actionColors: Record<string, string> = {
  created: 'bg-blue-500',
  started: 'bg-green-500',
  progress: 'bg-yellow-500',
  blocked: 'bg-red-500',
  completed: 'bg-green-600',
  'stage-change': 'bg-purple-500',
};

export function ActivityTimeline({ activities, className }: ActivityTimelineProps) {
  return (
    <div className={cn('', className)}>
      <div className="flex items-center gap-2 mb-3 text-sm font-medium">
        <Activity className="h-4 w-4" />
        <span>Activity</span>
      </div>
      <ScrollArea className="h-[200px]">
        <div className="space-y-3">
          {activities.map((activity, index) => {
            const agent = activity.agentId ? getAgentById(activity.agentId) : null;
            const isLast = index === activities.length - 1;

            return (
              <div key={activity.id} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      'h-2 w-2 rounded-full',
                      actionColors[activity.action] || 'bg-muted-foreground'
                    )}
                  />
                  {!isLast && <div className="w-px h-full bg-border mt-1" />}
                </div>
                <div className="flex-1 pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
                      </p>
                    </div>
                    {agent && (
                      <AgentAvatar agent={agent} size="sm" showStatus={false} />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
