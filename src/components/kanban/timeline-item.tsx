'use client';

import { TimelineEvent } from './types';
import { cn } from '@/lib/utils';
import { 
  Circle, 
  CircleCheck, 
  CircleDot, 
  CircleX, 
  AlertCircle, 
  GitCommit,
  MessageSquare,
  Play,
  CheckCircle2,
  XCircle,
  User
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface TimelineItemProps {
  event: TimelineEvent;
  isSelected?: boolean;
  onClick?: () => void;
}

const eventTypeConfig = {
  task_created: { icon: Circle, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  task_started: { icon: Play, color: 'text-green-500', bg: 'bg-green-500/10' },
  step_completed: { icon: CircleCheck, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  stage_changed: { icon: GitCommit, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  blocked: { icon: AlertCircle, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
  task_completed: { icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-500/10' },
  agent_assigned: { icon: User, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
  agent_comment: { icon: MessageSquare, color: 'text-gray-500', bg: 'bg-gray-500/10' },
  ci_started: { icon: CircleDot, color: 'text-orange-500', bg: 'bg-orange-500/10' },
  ci_passed: { icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-500/10' },
  ci_failed: { icon: XCircle, color: 'text-red-500', bg: 'bg-red-500/10' },
  human_intervention: { icon: CircleX, color: 'text-red-500', bg: 'bg-red-500/10' },
};

export function TimelineItem({ event, isSelected, onClick }: TimelineItemProps) {
  const config = eventTypeConfig[event.type];
  const Icon = config.icon;
  
  const relativeTime = formatDistanceToNow(event.timestamp, { addSuffix: true });
  const absoluteTime = event.timestamp.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div 
      className={cn(
        'relative flex gap-3 pb-6 cursor-pointer transition-all duration-200',
        isSelected && 'scale-[1.02]'
      )}
      onClick={onClick}
    >
      {/* Vertical line connector */}
      <div className="relative flex flex-col items-center">
        <div className={cn(
          'flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all',
          config.bg,
          config.color,
          isSelected ? 'border-primary scale-110' : 'border-border'
        )}>
          <Icon className="h-4 w-4" />
        </div>
        <div className="absolute top-8 bottom-0 w-px bg-border" />
      </div>

      {/* Event content */}
      <div className={cn(
        'flex-1 rounded-lg border bg-card p-4 transition-all',
        isSelected ? 'border-primary shadow-md' : 'border-border hover:border-primary/50'
      )}>
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            {event.agent && (
              <span className="text-lg" title={event.agent.name}>
                {event.agent.avatar}
              </span>
            )}
            <div>
              <p className="text-sm font-medium text-foreground">
                {event.description}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <time className="text-xs text-muted-foreground" title={absoluteTime}>
                  {relativeTime}
                </time>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground">
                  {absoluteTime}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Task preview */}
        <div className="mt-3 rounded-md bg-muted/50 p-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-medium truncate">{event.task.title}</span>
            <span className={cn(
              'px-2 py-0.5 rounded text-xs font-medium',
              event.task.stage === 'completed' && 'bg-green-500/10 text-green-600',
              event.task.stage === 'in-progress' && 'bg-blue-500/10 text-blue-600',
              event.task.stage === 'blocked' && 'bg-yellow-500/10 text-yellow-600',
              event.task.stage === 'failed' && 'bg-red-500/10 text-red-600',
              event.task.stage === 'review' && 'bg-purple-500/10 text-purple-600',
              event.task.stage === 'planning' && 'bg-indigo-500/10 text-indigo-600',
              event.task.stage === 'backlog' && 'bg-gray-500/10 text-gray-600'
            )}>
              {event.task.stage}
            </span>
          </div>
          {event.task.progress && (
            <div className="mt-1 text-muted-foreground">
              Progress: {event.task.progress.completed}/{event.task.progress.total}
            </div>
          )}
        </div>

        {/* Stage transition indicator */}
        {event.metadata?.fromStage && event.metadata?.toStage && (
          <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
            <span className="capitalize">{event.metadata.fromStage}</span>
            <span>→</span>
            <span className="capitalize">{event.metadata.toStage}</span>
          </div>
        )}
      </div>
    </div>
  );
}
