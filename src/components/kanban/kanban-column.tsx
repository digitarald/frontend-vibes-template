'use client';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { Task } from '@/data/kanban-mock';
import { TaskCard } from './task-card';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

interface KanbanColumnProps {
  stage: Task['stage'];
  title: string;
  tasks: Task[];
}

const stageColors = {
  planning: 'bg-muted',
  running: 'bg-chart-2/10',
  blocked: 'bg-destructive/10',
  cicd: 'bg-chart-4/10',
  review: 'bg-chart-1/10',
  completed: 'bg-chart-3/10',
};

export function KanbanColumn({ stage, title, tasks }: KanbanColumnProps) {
  const { setNodeRef } = useDroppable({
    id: stage,
  });

  return (
    <div className="flex flex-col h-full min-w-[320px] w-full md:w-auto">
      <div className={cn('p-4 border-b sticky top-0 bg-background z-10', stageColors[stage])}>
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-sm">{title}</h2>
          <Badge variant="secondary" className="ml-2">
            {tasks.length}
          </Badge>
        </div>
      </div>

      <div
        ref={setNodeRef}
        className="flex-1 p-3 space-y-3 overflow-y-auto min-h-[200px]"
      >
        <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
          {tasks.length === 0 ? (
            <div className="flex items-center justify-center h-32 text-sm text-muted-foreground">
              No tasks
            </div>
          ) : (
            tasks.map((task) => <TaskCard key={task.id} task={task} />)
          )}
        </SortableContext>
      </div>
    </div>
  );
}
