import { Task, TaskStatus } from '@/types/kanban';
import { TaskCardLive } from './task-card-live.client';

interface KanbanColumnServerProps {
  title: string;
  status: TaskStatus;
  tasks: Task[];
  description?: string;
}

const statusColors = {
  'backlog': 'bg-slate-500/10 text-slate-700 dark:text-slate-400',
  'in-progress': 'bg-blue-500/10 text-blue-700 dark:text-blue-400',
  'blocked': 'bg-red-500/10 text-red-700 dark:text-red-400',
  'completed': 'bg-green-500/10 text-green-700 dark:text-green-400',
};

export function KanbanColumnServer({ title, status, tasks, description }: KanbanColumnServerProps) {
  return (
    <div className="flex flex-col gap-4 min-h-[400px]">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        <div className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}>
          {tasks.length}
        </div>
      </div>
      
      <div className="flex-1 space-y-3">
        {tasks.length === 0 ? (
          <div className="flex items-center justify-center h-32 border-2 border-dashed rounded-lg text-muted-foreground text-sm">
            No tasks
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCardLive key={task.id} initialTask={task} />
          ))
        )}
      </div>
    </div>
  );
}
