'use client';

import { useState, useCallback } from 'react';
import { Task } from '@/types/kanban';
import { SSEEvent, ProgressUpdate, TaskUpdate } from '@/types/kanban';
import { useSSE } from '@/hooks/use-sse';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertCircle, Clock } from 'lucide-react';
import { ProgressChecklistLive } from './progress-checklist-live.client';
import { TaskActions } from './task-actions.client';

interface TaskCardLiveProps {
  initialTask: Task;
}

export function TaskCardLive({ initialTask }: TaskCardLiveProps) {
  const [task, setTask] = useState<Task>(initialTask);

  const handleSSEEvent = useCallback((event: SSEEvent) => {
    if (event.type === 'progress-tick') {
      const data = event.data as ProgressUpdate;
      if (data.taskId === task.id) {
        setTask(prev => ({
          ...prev,
          progress: data.progress,
        }));
      }
    } else if (event.type === 'task-update') {
      const data = event.data as TaskUpdate;
      if (data.taskId === task.id) {
        setTask(prev => ({
          ...prev,
          ...data.updates,
        }));
      }
    }
  }, [task.id]);

  useSSE({ onEvent: handleSSEEvent });

  const priorityColors = {
    low: 'bg-blue-500/10 text-blue-700 dark:text-blue-400',
    medium: 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400',
    high: 'bg-red-500/10 text-red-700 dark:text-red-400',
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-base line-clamp-2">{task.title}</CardTitle>
            <CardDescription className="text-sm line-clamp-2 mt-1">
              {task.description}
            </CardDescription>
          </div>
          <Badge variant="outline" className={priorityColors[task.priority]}>
            {task.priority}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {task.blockReason && (
          <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 p-2 rounded-md">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            <span className="text-xs">{task.blockReason}</span>
          </div>
        )}

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{task.progress}%</span>
          </div>
          <Progress value={task.progress} className="h-2" />
        </div>

        {task.assignedAgent && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            <span className="text-xs">{task.assignedAgent}</span>
          </div>
        )}

        <ProgressChecklistLive taskId={task.id} initialChecklist={task.checklist} />

        <TaskActions task={task} />
      </CardContent>
    </Card>
  );
}
