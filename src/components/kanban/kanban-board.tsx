'use client';

import { useKanbanData } from '@/hooks/use-kanban-data';
import { KanbanColumn } from './kanban-column';
import { RefreshIndicator } from './refresh-indicator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { TaskStatus } from '@/types/kanban';

export function KanbanBoard() {
  const {
    data,
    error,
    isLoading,
    isTabVisible,
    refreshInterval,
    updateTaskStatus,
    updateChecklistItem,
  } = useKanbanData();

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <Alert variant="destructive">
          <AlertDescription>
            Failed to load kanban board. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (isLoading || !data) {
    return (
      <div className="container mx-auto p-4">
        <div className="mb-6">
          <Skeleton className="h-10 w-64 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-96 w-full" />
          ))}
        </div>
      </div>
    );
  }

  const columns: { status: TaskStatus; title: string; description: string }[] = [
    {
      status: 'todo',
      title: 'To Do',
      description: 'Tasks waiting to be started',
    },
    {
      status: 'in-progress',
      title: 'In Progress',
      description: 'Tasks currently being worked on',
    },
    {
      status: 'completed',
      title: 'Completed',
      description: 'Finished tasks',
    },
  ];

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">AI Agent Kanban Board</h1>
            <p className="text-muted-foreground mt-1">
              Track agent tasks with real-time updates
            </p>
          </div>
          <RefreshIndicator
            isVisible={isTabVisible}
            interval={refreshInterval}
            lastUpdated={data.lastUpdated}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {columns.map((column) => {
          const columnTasks = data.tasks.filter(
            (task) => task.status === column.status
          );
          const columnAgents = data.agents.filter((agent) =>
            columnTasks.some((task) => task.agentId === agent.id)
          );

          return (
            <KanbanColumn
              key={column.status}
              status={column.status}
              title={column.title}
              description={column.description}
              tasks={columnTasks}
              agents={columnAgents}
              onUpdateTaskStatus={updateTaskStatus}
              onUpdateChecklistItem={updateChecklistItem}
            />
          );
        })}
      </div>
    </div>
  );
}
