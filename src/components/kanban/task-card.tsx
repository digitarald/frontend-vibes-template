'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import type { Task } from '@/data/kanban-mock';
import { AgentAvatar } from './agent-avatar';
import { TodoChecklist } from './todo-checklist';
import { AlertCircle, CheckCircle2, XCircle, Loader2, Clock, MoreVertical } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface TaskCardProps {
  task: Task;
}

const priorityColors = {
  low: 'bg-muted text-muted-foreground',
  medium: 'bg-chart-4 text-white',
  high: 'bg-destructive text-destructive-foreground',
};

const stageColors = {
  planning: 'border-l-muted',
  running: 'border-l-chart-2',
  blocked: 'border-l-destructive',
  cicd: 'border-l-chart-4',
  review: 'border-l-chart-1',
  completed: 'border-l-chart-3',
};

export function TaskCard({ task }: TaskCardProps) {
  const isMobile = useIsMobile();

  const cardContent = (
    <Card className={cn('cursor-pointer hover:shadow-md transition-shadow border-l-4', stageColors[task.stage])}>
      <CardHeader className="p-4 pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-sm truncate">{task.title}</h3>
          </div>
          <Badge className={cn('shrink-0 text-xs', priorityColors[task.priority])}>
            {task.priority}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-3">
        <p className="text-xs text-muted-foreground line-clamp-2">{task.description}</p>

        {task.agent && (
          <div className="flex items-center gap-2">
            <AgentAvatar agent={task.agent} size="sm" />
            <span className="text-xs text-muted-foreground">{task.agent.name}</span>
          </div>
        )}

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span>{task.createdAt.toLocaleDateString()}</span>
        </div>
      </CardContent>
    </Card>
  );

  const expandedContent = (
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold text-lg mb-2">{task.title}</h3>
        <p className="text-sm text-muted-foreground">{task.description}</p>
      </div>

      <div className="flex items-center gap-4">
        <Badge className={cn(priorityColors[task.priority])}>{task.priority} priority</Badge>
        {task.agent && (
          <div className="flex items-center gap-2">
            <AgentAvatar agent={task.agent} size="md" />
            <span className="text-sm">{task.agent.name}</span>
          </div>
        )}
      </div>

      {task.stage === 'running' && task.todos && (
        <div className="border-t pt-4">
          <h4 className="font-medium text-sm mb-3">Task Progress</h4>
          <TodoChecklist todos={task.todos} />
        </div>
      )}

      {task.stage === 'blocked' && task.blockReason && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{task.blockReason}</AlertDescription>
        </Alert>
      )}

      {task.stage === 'cicd' && task.cicdStatus && (
        <div className="border-t pt-4 space-y-2">
          <h4 className="font-medium text-sm">CI/CD Status</h4>
          {task.cicdStatus === 'running' && (
            <div className="flex items-center gap-2 text-sm">
              <Loader2 className="h-4 w-4 animate-spin text-chart-4" />
              <span>Pipeline running...</span>
            </div>
          )}
          {task.cicdStatus === 'passed' && (
            <div className="flex items-center gap-2 text-sm text-chart-3">
              <CheckCircle2 className="h-4 w-4" />
              <span>All checks passed</span>
            </div>
          )}
          {task.cicdStatus === 'failed' && (
            <div className="flex items-center gap-2 text-sm text-destructive">
              <XCircle className="h-4 w-4" />
              <span>Build failed</span>
            </div>
          )}
        </div>
      )}

      {task.stage === 'review' && task.cicdStatus && (
        <div className="border-t pt-4 space-y-2">
          <h4 className="font-medium text-sm">Review Status</h4>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="text-chart-3">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              Code quality
            </Badge>
            <Badge variant="outline" className="text-chart-3">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              Tests
            </Badge>
            {task.cicdStatus === 'passed' && (
              <Badge variant="outline" className="text-chart-3">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                CI/CD
              </Badge>
            )}
          </div>
        </div>
      )}

      {task.completedAt && (
        <div className="text-xs text-muted-foreground border-t pt-4">
          Completed on {task.completedAt.toLocaleDateString()}
        </div>
      )}

      <div className="flex gap-2 pt-2">
        <Button size="sm" variant="outline" className="flex-1">
          View Details
        </Button>
        <Button size="sm" variant="ghost">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>{cardContent}</SheetTrigger>
        <SheetContent side="bottom" className="max-h-[85vh] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Task Details</SheetTitle>
          </SheetHeader>
          <div className="mt-4">{expandedContent}</div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{cardContent}</DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Task Details</DialogTitle>
        </DialogHeader>
        {expandedContent}
      </DialogContent>
    </Dialog>
  );
}
