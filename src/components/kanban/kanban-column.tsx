'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import type { Task, TaskStage } from '@/types/kanban';
import { TaskCard } from './task-card';

interface KanbanColumnProps {
  title: string;
  stage: TaskStage;
  tasks: Task[];
  className?: string;
}

const stageColors: Record<TaskStage, string> = {
  planning: 'border-blue-500/50 bg-blue-500/5',
  running: 'border-green-500/50 bg-green-500/5',
  blocked: 'border-red-500/50 bg-red-500/5',
  cicd: 'border-purple-500/50 bg-purple-500/5',
  review: 'border-yellow-500/50 bg-yellow-500/5',
  completed: 'border-gray-500/50 bg-gray-500/5',
};

const stageBadgeColors: Record<TaskStage, string> = {
  planning: 'bg-blue-500',
  running: 'bg-green-500',
  blocked: 'bg-red-500',
  cicd: 'bg-purple-500',
  review: 'bg-yellow-500',
  completed: 'bg-gray-500',
};

export function KanbanColumn({ title, stage, tasks, className }: KanbanColumnProps) {
  return (
    <div className={cn('flex flex-col h-full min-w-[320px] md:min-w-[350px]', className)}>
      <Card className={cn('flex flex-col h-full', stageColors[stage])}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-lg">{title}</h2>
            <Badge variant="secondary" className="ml-2">
              <span className={cn('h-2 w-2 rounded-full mr-2', stageBadgeColors[stage])} />
              {tasks.length}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden p-0">
          <ScrollArea className="h-full px-4 pb-4">
            <div className="space-y-3">
              {tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
              {tasks.length === 0 && (
                <div className="text-center py-8 text-muted-foreground text-sm">
                  No tasks in this stage
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
