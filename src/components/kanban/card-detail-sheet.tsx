'use client';

import { Task, STAGES } from '@/lib/kanban/types';
import { getAgentById } from '@/lib/kanban/mock-data';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { 
  Clock, 
  User, 
  Tag, 
  AlertCircle, 
  CheckCircle, 
  Ban,
  ArrowRight 
} from 'lucide-react';
import { format } from 'date-fns';

interface CardDetailSheetProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onMoveToNextStage?: () => void;
  onBlock?: () => void;
  onComplete?: () => void;
}

export function CardDetailSheet({
  task,
  isOpen,
  onClose,
  onMoveToNextStage,
  onBlock,
  onComplete,
}: CardDetailSheetProps) {
  if (!task) return null;

  const agent = getAgentById(task.assignedTo);
  const currentStageIndex = STAGES.findIndex(s => s.value === task.stage);
  const nextStage = STAGES[currentStageIndex + 1];

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500/10 text-red-700 dark:text-red-400';
      case 'medium':
        return 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400';
      case 'low':
        return 'bg-blue-500/10 text-blue-700 dark:text-blue-400';
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-[85vh] p-0">
        <div className="flex flex-col h-full">
          <SheetHeader className="p-6 pb-4">
            <div className="flex items-start gap-4">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={getPriorityColor(task.priority)}>
                    {task.priority} priority
                  </Badge>
                  {task.blockedReason && (
                    <Badge variant="destructive" className="gap-1">
                      <AlertCircle className="h-3 w-3" />
                      Blocked
                    </Badge>
                  )}
                </div>
                <SheetTitle className="text-2xl">{task.title}</SheetTitle>
                <SheetDescription>{task.description}</SheetDescription>
              </div>
              {agent && (
                <Avatar className="h-12 w-12">
                  <AvatarImage src={agent.avatar} alt={agent.name} />
                  <AvatarFallback>
                    {agent.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          </SheetHeader>

          <Separator />

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Assignee */}
            {agent && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <User className="h-4 w-4" />
                  Assigned To
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={agent.avatar} alt={agent.name} />
                    <AvatarFallback>
                      {agent.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{agent.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">
                      {agent.status}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Tags */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Tag className="h-4 w-4" />
                Tags
              </div>
              <div className="flex flex-wrap gap-2">
                {task.tags.map(tag => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Timestamps */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Clock className="h-4 w-4" />
                Timeline
              </div>
              <div className="space-y-1 text-sm">
                <p className="text-muted-foreground">
                  Created: {format(task.createdAt, 'PPP')}
                </p>
                <p className="text-muted-foreground">
                  Updated: {format(task.updatedAt, 'PPP')}
                </p>
              </div>
            </div>

            {/* Blocked Reason */}
            {task.blockedReason && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-destructive">
                  <AlertCircle className="h-4 w-4" />
                  Blocked
                </div>
                <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                  <p className="text-sm">{task.blockedReason}</p>
                </div>
              </div>
            )}

            {/* Current Stage */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium">
                Current Stage
              </div>
              <Badge variant="outline" className="text-sm">
                {STAGES.find(s => s.value === task.stage)?.label}
              </Badge>
            </div>
          </div>

          <Separator />

          <SheetFooter className="p-6 pt-4 gap-2">
            {nextStage && (
              <Button
                onClick={onMoveToNextStage}
                className="flex-1 gap-2"
              >
                Move to {nextStage.label}
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}
            {task.stage !== 'blocked' && (
              <Button
                onClick={onBlock}
                variant="outline"
                className="gap-2"
              >
                <Ban className="h-4 w-4" />
                Block
              </Button>
            )}
            {task.stage !== 'done' && (
              <Button
                onClick={onComplete}
                variant="outline"
                className="gap-2"
              >
                <CheckCircle className="h-4 w-4" />
                Complete
              </Button>
            )}
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
}
