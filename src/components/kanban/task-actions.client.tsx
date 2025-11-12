'use client';

import { Task, TaskStatus } from '@/types/kanban';
import { Button } from '@/components/ui/button';
import { moveTask } from '@/app/actions/tasks';
import { resolveBlock } from '@/app/actions/agents';
import { ArrowRight, PlayCircle } from 'lucide-react';
import { useState } from 'react';

interface TaskActionsProps {
  task: Task;
}

export function TaskActions({ task }: TaskActionsProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleMove = async (newStatus: TaskStatus) => {
    setIsLoading(true);
    try {
      await moveTask(task.id, newStatus);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResolveBlock = async () => {
    setIsLoading(true);
    try {
      await resolveBlock(task.id);
    } finally {
      setIsLoading(false);
    }
  };

  const getNextStatus = (): TaskStatus | null => {
    switch (task.status) {
      case 'backlog':
        return 'in-progress';
      case 'in-progress':
        return 'completed';
      default:
        return null;
    }
  };

  const nextStatus = getNextStatus();

  return (
    <div className="flex gap-2 pt-2">
      {task.status === 'blocked' && (
        <Button
          size="sm"
          variant="outline"
          onClick={handleResolveBlock}
          disabled={isLoading}
          className="w-full"
        >
          <PlayCircle className="h-4 w-4 mr-2" />
          Resolve Block
        </Button>
      )}
      
      {nextStatus && task.status !== 'blocked' && (
        <Button
          size="sm"
          variant="outline"
          onClick={() => handleMove(nextStatus)}
          disabled={isLoading}
          className="w-full"
        >
          <ArrowRight className="h-4 w-4 mr-2" />
          Move to {nextStatus === 'in-progress' ? 'In Progress' : 'Completed'}
        </Button>
      )}
    </div>
  );
}
