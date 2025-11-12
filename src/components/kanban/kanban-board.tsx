import { db } from '@/data/mock-database';
import { KanbanColumnServer } from './kanban-column.server';
import { AgentStatusStream } from './agent-status-stream.client';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export function KanbanBoard() {
  const tasks = db.getTasks();
  const agents = db.getAgents();

  const backlogTasks = tasks.filter(t => t.status === 'backlog');
  const inProgressTasks = tasks.filter(t => t.status === 'in-progress');
  const blockedTasks = tasks.filter(t => t.status === 'blocked');
  const completedTasks = tasks.filter(t => t.status === 'completed');

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">AI Agent Kanban Board</h1>
        <p className="text-muted-foreground">
          Real-time task tracking with Server-Sent Events
        </p>
      </div>

      <Suspense fallback={<Skeleton className="h-48 w-full" />}>
        <AgentStatusStream initialAgents={agents} />
      </Suspense>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KanbanColumnServer
          title="Backlog"
          status="backlog"
          tasks={backlogTasks}
          description="Tasks waiting to be started"
        />
        <KanbanColumnServer
          title="In Progress"
          status="in-progress"
          tasks={inProgressTasks}
          description="Currently being worked on"
        />
        <KanbanColumnServer
          title="Blocked"
          status="blocked"
          tasks={blockedTasks}
          description="Tasks waiting for resolution"
        />
        <KanbanColumnServer
          title="Completed"
          status="completed"
          tasks={completedTasks}
          description="Finished tasks"
        />
      </div>
    </div>
  );
}
