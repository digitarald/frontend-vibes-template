'use client';

import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import type { TodoItem } from '@/data/kanban-mock';
import { CheckCircle2, Circle, Loader2 } from 'lucide-react';

interface TodoChecklistProps {
  todos: TodoItem[];
}

export function TodoChecklist({ todos }: TodoChecklistProps) {
  const completedCount = todos.filter((t) => t.status === 'completed').length;
  const progressPercent = (completedCount / todos.length) * 100;

  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>
            Progress: {completedCount}/{todos.length}
          </span>
          <span>{Math.round(progressPercent)}%</span>
        </div>
        <Progress value={progressPercent} className="h-1.5" />
      </div>

      <div className="space-y-2">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className={cn(
              'flex items-start gap-2 rounded-md p-2 transition-colors',
              todo.status === 'in-progress' &&
                'bg-accent/50 border border-accent-foreground/10'
            )}
          >
            <div className="mt-0.5">
              {todo.status === 'completed' && (
                <CheckCircle2 className="h-4 w-4 text-chart-2" />
              )}
              {todo.status === 'in-progress' && (
                <Loader2 className="h-4 w-4 text-primary animate-spin" />
              )}
              {todo.status === 'pending' && (
                <Circle className="h-4 w-4 text-muted-foreground" />
              )}
            </div>
            <div className="flex-1 space-y-1">
              <div
                className={cn(
                  'text-sm',
                  todo.status === 'completed' && 'line-through text-muted-foreground',
                  todo.status === 'in-progress' && 'font-medium'
                )}
              >
                {todo.title}
              </div>
              {todo.status === 'in-progress' && todo.progress !== undefined && (
                <Progress value={todo.progress} className="h-1" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
