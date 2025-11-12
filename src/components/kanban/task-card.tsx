'use client';

import { useState } from 'react';
import { Task, Agent, TaskStatus } from '@/types/kanban';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AgentAvatar } from './agent-avatar';
import { ProgressChecklist } from './progress-checklist';
import { ActivityTimeline } from './activity-timeline';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  agent?: Agent;
  onUpdateTaskStatus: (taskId: string, status: TaskStatus) => Promise<void>;
  onUpdateChecklistItem: (taskId: string, itemId: string, completed: boolean) => Promise<void>;
}

export function TaskCard({ task, agent, onUpdateTaskStatus, onUpdateChecklistItem }: TaskCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleMoveTask = async () => {
    setIsUpdating(true);
    try {
      const nextStatus: TaskStatus =
        task.status === 'todo'
          ? 'in-progress'
          : task.status === 'in-progress'
          ? 'completed'
          : 'todo';

      await onUpdateTaskStatus(task.id, nextStatus);
    } finally {
      setIsUpdating(false);
    }
  };

  const getNextStatusLabel = () => {
    switch (task.status) {
      case 'todo':
        return 'Start Task';
      case 'in-progress':
        return 'Complete';
      default:
        return 'Reset';
    }
  };

  return (
    <Card className={`transition-opacity ${isUpdating ? 'opacity-60' : 'opacity-100'}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-base line-clamp-2">{task.title}</CardTitle>
            <CardDescription className="text-sm mt-1 line-clamp-2">
              {task.description}
            </CardDescription>
          </div>
          {agent && <AgentAvatar agent={agent} size="sm" />}
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {task.status === 'in-progress' && (
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Progress</span>
              <span className="font-medium">{task.progress}%</span>
            </div>
            <Progress value={task.progress} className="h-2" />
          </div>
        )}

        {task.isBlocked && (
          <Badge variant="destructive" className="w-full justify-center">
            Blocked: {task.blockMessage}
          </Badge>
        )}

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleMoveTask}
            disabled={isUpdating}
            className="flex-1"
          >
            {getNextStatusLabel()}
            <ArrowRight className="ml-2 h-3 w-3" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>

        {isExpanded && (
          <div className="space-y-4 pt-2 border-t">
            <ProgressChecklist
              checklist={task.checklist}
              taskId={task.id}
              onUpdateItem={onUpdateChecklistItem}
            />

            <ActivityTimeline
              activities={task.activities.slice(-5)}
              agents={agent ? [agent] : []}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
