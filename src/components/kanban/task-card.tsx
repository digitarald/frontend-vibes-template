'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Task } from '@/types/kanban';
import { AgentAvatar } from './agent-avatar';
import { ProgressChecklist } from './progress-checklist';
import { ActivityTimeline } from './activity-timeline';
import { getAgentById } from '@/data/mock-agents';
import { formatDistanceToNow } from 'date-fns';

interface TaskCardProps {
  task: Task;
  className?: string;
}

const priorityColors = {
  low: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20',
  medium: 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20',
  high: 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20',
};

export function TaskCard({ task, className }: TaskCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const agent = getAgentById(task.agentId);

  if (!agent) return null;

  const completedTodos = task.todos.filter(t => t.status === 'completed').length;
  const totalTodos = task.todos.length;

  return (
    <Card className={cn('group hover:shadow-md transition-all cursor-pointer', className)}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <h3 className="font-semibold text-sm leading-tight mb-2">{task.title}</h3>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline" className={cn('text-xs', priorityColors[task.priority])}>
                {task.priority}
              </Badge>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {formatDistanceToNow(task.updatedAt, { addSuffix: true })}
              </div>
            </div>
          </div>
          <AgentAvatar agent={agent} size="sm" />
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-2">{task.description}</p>
        
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">
            {completedTodos}/{totalTodos} tasks completed
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="h-6 px-2"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="h-3 w-3 mr-1" />
                Less
              </>
            ) : (
              <>
                <ChevronDown className="h-3 w-3 mr-1" />
                More
              </>
            )}
          </Button>
        </div>

        {isExpanded && (
          <div className="space-y-4 pt-2 border-t">
            <ProgressChecklist todos={task.todos} />
            <ActivityTimeline activities={task.activities} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
