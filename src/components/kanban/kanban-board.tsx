'use client';

import { useEffect, useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Wifi, WifiOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useWebSocket } from '@/hooks/use-websocket';
import type { Task, TaskStage, WebSocketMessage } from '@/types/kanban';
import { mockTasks, mockAgents } from '@/data/mock-agents';
import { KanbanColumn } from './kanban-column';
import { AgentPool } from './agent-pool';

const STAGES: { id: TaskStage; title: string }[] = [
  { id: 'planning', title: 'Planning' },
  { id: 'running', title: 'Running' },
  { id: 'blocked', title: 'Blocked' },
  { id: 'cicd', title: 'CI/CD' },
  { id: 'review', title: 'Review' },
  { id: 'completed', title: 'Completed' },
];

export function KanbanBoard() {
  const isMobile = useIsMobile();
  const [tasks, setTasks] = useState<Task[]>(mockTasks);

  const { connectionState } = useWebSocket({
    url: 'ws://localhost:3001', // Mock URL
    autoConnect: true,
    onMessage: (message: WebSocketMessage) => {
      // Handle incoming WebSocket messages
      console.log('Received message:', message);
      
      // Update tasks based on message type
      if (message.type === 'task:updated' || message.type === 'task:stage-changed') {
        setTasks(prevTasks => {
          const updatedTasks = [...prevTasks];
          const taskIndex = updatedTasks.findIndex(t => t.id === message.payload.taskId);
          if (taskIndex !== -1) {
            updatedTasks[taskIndex] = {
              ...updatedTasks[taskIndex],
              ...(message.payload.data as Partial<Task>),
            };
          }
          return updatedTasks;
        });
      }
    },
  });

  // Simulate real-time updates for demo
  useEffect(() => {
    const isSimulating = true;
    if (!isSimulating) return;

    const interval = setInterval(() => {
      setTasks(prevTasks => {
        const updatedTasks = [...prevTasks];
        const randomIndex = Math.floor(Math.random() * updatedTasks.length);
        const task = updatedTasks[randomIndex];

        // Randomly update a todo status
        if (task.todos.length > 0) {
          const incompleteTodos = task.todos.filter(t => t.status !== 'completed');
          if (incompleteTodos.length > 0) {
            const randomTodoIndex = Math.floor(Math.random() * incompleteTodos.length);
            const todoToUpdate = incompleteTodos[randomTodoIndex];
            const taskTodoIndex = task.todos.findIndex(t => t.id === todoToUpdate.id);
            
            if (taskTodoIndex !== -1) {
              const newStatus = todoToUpdate.status === 'pending' ? 'in-progress' : 'completed';
              task.todos[taskTodoIndex] = {
                ...todoToUpdate,
                status: newStatus,
                completedAt: newStatus === 'completed' ? new Date() : undefined,
              };

              // Add activity
              task.activities.push({
                id: `activity-${Date.now()}`,
                timestamp: new Date(),
                action: 'progress',
                description: `Updated: ${todoToUpdate.text}`,
                agentId: task.agentId,
              });

              task.updatedAt = new Date();
            }
          }
        }

        return updatedTasks;
      });
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const getTasksByStage = (stage: TaskStage) => {
    return tasks.filter(task => task.stage === stage);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 h-[calc(100vh-120px)]">
      {/* Agent Pool - Hidden on mobile, shown on desktop */}
      {!isMobile && (
        <aside className="w-64 flex-shrink-0">
          <AgentPool agents={mockAgents} />
        </aside>
      )}

      {/* Main Board */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header with connection status */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold">AI Agent Kanban</h1>
            <p className="text-sm text-muted-foreground">Real-time task management</p>
          </div>
          <Badge
            variant={connectionState.status === 'connected' ? 'default' : 'secondary'}
            className="gap-1.5"
          >
            {connectionState.status === 'connected' ? (
              <>
                <Wifi className="h-3 w-3" />
                Connected
              </>
            ) : (
              <>
                <WifiOff className="h-3 w-3" />
                {connectionState.status}
              </>
            )}
          </Badge>
        </div>

        {/* Kanban Columns */}
        <ScrollArea className="flex-1" orientation="horizontal">
          <div className={cn(
            'flex gap-4 pb-4',
            isMobile ? 'px-2' : ''
          )}>
            {STAGES.map((stage) => (
              <KanbanColumn
                key={stage.id}
                title={stage.title}
                stage={stage.id}
                tasks={getTasksByStage(stage.id)}
              />
            ))}
          </div>
        </ScrollArea>

        {/* Mobile Agent Pool - Bottom sheet style */}
        {isMobile && (
          <div className="mt-4 border-t pt-4">
            <AgentPool agents={mockAgents} />
          </div>
        )}
      </div>
    </div>
  );
}
