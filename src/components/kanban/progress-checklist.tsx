'use client';

import { CheckCircle2, Circle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { TodoItem, TodoStatus } from '@/types/kanban';

interface ProgressChecklistProps {
  todos: TodoItem[];
  className?: string;
}

const statusIcons: Record<TodoStatus, React.ComponentType<{ className?: string }>> = {
  completed: CheckCircle2,
  'in-progress': Loader2,
  pending: Circle,
};

const statusColors: Record<TodoStatus, string> = {
  completed: 'text-green-600 dark:text-green-400',
  'in-progress': 'text-blue-600 dark:text-blue-400 animate-spin',
  pending: 'text-muted-foreground',
};

export function ProgressChecklist({ todos, className }: ProgressChecklistProps) {
  const completedCount = todos.filter(t => t.status === 'completed').length;
  const totalCount = todos.length;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Progress</span>
        <span className="font-medium">
          {completedCount}/{totalCount}
        </span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <ul className="space-y-1.5 mt-3">
        {todos.map((todo) => {
          const Icon = statusIcons[todo.status];
          return (
            <li key={todo.id} className="flex items-start gap-2 text-sm">
              <Icon className={cn('h-4 w-4 mt-0.5 flex-shrink-0', statusColors[todo.status])} />
              <span
                className={cn(
                  'flex-1',
                  todo.status === 'completed' && 'line-through text-muted-foreground'
                )}
              >
                {todo.text}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
