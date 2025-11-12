'use client';

import { Activity, Agent } from '@/types/kanban';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatDistanceToNow } from 'date-fns';

interface ActivityTimelineProps {
  activities: Activity[];
  agents: Agent[];
}

export function ActivityTimeline({ activities, agents }: ActivityTimelineProps) {
  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'created':
        return '✨';
      case 'moved':
        return '➡️';
      case 'completed':
        return '✅';
      case 'comment':
        return '💬';
      case 'blocked':
        return '🚫';
      default:
        return '📝';
    }
  };

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium">Recent Activity</h4>
      <ScrollArea className="h-32">
        <div className="space-y-2">
          {activities.length === 0 ? (
            <p className="text-xs text-muted-foreground">No recent activity</p>
          ) : (
            activities.map((activity) => {
              const agent = agents.find((a) => a.id === activity.agentId);
              return (
                <div
                  key={activity.id}
                  className="flex items-start gap-2 text-xs pb-2 border-b border-border last:border-0"
                >
                  <span className="text-base leading-none">{getActivityIcon(activity.type)}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-foreground">{activity.message}</p>
                    <p className="text-muted-foreground mt-0.5">
                      {agent?.name} • {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
