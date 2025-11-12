'use client';

import { Task } from './types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface TaskEventCardProps {
  task: Task;
  isHighlighted?: boolean;
  onClick?: () => void;
}

export function TaskEventCard({ task, isHighlighted, onClick }: TaskEventCardProps) {
  const progressPercentage = (task.progress.completed / task.progress.total) * 100;

  return (
    <Card 
      className={cn(
        'p-3 cursor-pointer transition-all hover:shadow-md',
        isHighlighted && 'ring-2 ring-primary animate-pulse'
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="text-sm font-medium truncate flex-1">{task.title}</h3>
        {task.agent && (
          <span className="text-lg shrink-0" title={task.agent.name}>
            {task.agent.avatar}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2 mb-2">
        <Badge 
          variant="outline"
          className={cn(
            'text-xs',
            task.stage === 'completed' && 'bg-green-500/10 text-green-600 border-green-500/20',
            task.stage === 'in-progress' && 'bg-blue-500/10 text-blue-600 border-blue-500/20',
            task.stage === 'blocked' && 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
            task.stage === 'failed' && 'bg-red-500/10 text-red-600 border-red-500/20',
            task.stage === 'review' && 'bg-purple-500/10 text-purple-600 border-purple-500/20',
            task.stage === 'planning' && 'bg-indigo-500/10 text-indigo-600 border-indigo-500/20',
            task.stage === 'backlog' && 'bg-gray-500/10 text-gray-600 border-gray-500/20'
          )}
        >
          {task.stage}
        </Badge>
        <Badge variant="outline" className="text-xs">
          {task.priority}
        </Badge>
      </div>

      <div className="space-y-1">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Progress</span>
          <span>{task.progress.completed}/{task.progress.total}</span>
        </div>
        <Progress value={progressPercentage} className="h-1.5" />
      </div>

      {task.tags && task.tags.length > 0 && (
        <div className="flex gap-1 mt-2">
          {task.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {task.tags.length > 2 && (
            <Badge variant="secondary" className="text-xs">
              +{task.tags.length - 2}
            </Badge>
          )}
        </div>
      )}
    </Card>
  );
}
