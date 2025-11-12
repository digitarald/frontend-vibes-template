'use client';

import { Task, Agent, TaskStatus } from '@/types/kanban';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TaskCard } from './task-card';
import { Badge } from '@/components/ui/badge';

interface KanbanColumnProps {
  status: TaskStatus;
  title: string;
  description: string;
  tasks: Task[];
  agents: Agent[];
  onUpdateTaskStatus: (taskId: string, status: TaskStatus) => Promise<void>;
  onUpdateChecklistItem: (taskId: string, itemId: string, completed: boolean) => Promise<void>;
}

export function KanbanColumn({
  status,
  title,
  description,
  tasks,
  agents,
  onUpdateTaskStatus,
  onUpdateChecklistItem,
}: KanbanColumnProps) {
  const getColumnColor = () => {
    switch (status) {
      case 'todo':
        return 'border-muted-foreground/20';
      case 'in-progress':
        return 'border-primary/50';
      case 'completed':
        return 'border-chart-2/50';
      default:
        return 'border-border';
    }
  };

  return (
    <Card className={`flex flex-col h-[calc(100vh-12rem)] ${getColumnColor()}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{title}</CardTitle>
          <Badge variant="secondary" className="ml-2">
            {tasks.length}
          </Badge>
        </div>
        <CardDescription className="text-sm">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden p-0">
        <ScrollArea className="h-full px-4 pb-4">
          <div className="space-y-3">
            {tasks.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground text-sm">
                No tasks in this column
              </div>
            ) : (
              tasks.map((task) => {
                const agent = agents.find((a) => a.id === task.agentId);
                return (
                  <TaskCard
                    key={task.id}
                    task={task}
                    agent={agent}
                    onUpdateTaskStatus={onUpdateTaskStatus}
                    onUpdateChecklistItem={onUpdateChecklistItem}
                  />
                );
              })
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
