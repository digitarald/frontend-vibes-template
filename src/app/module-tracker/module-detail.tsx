'use client';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { CheckCircle2, Circle, ExternalLink, Clock, AlertCircle } from 'lucide-react';
import type { Module } from './types';
import { formatDistanceToNow } from 'date-fns';

interface ModuleDetailProps {
  module: Module | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const priorityColors = {
  high: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-950 dark:text-red-300',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-300',
  low: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950 dark:text-blue-300',
};

const statusColors = {
  'not-started': 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-950 dark:text-gray-300',
  'in-progress': 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950 dark:text-blue-300',
  'in-review': 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-950 dark:text-purple-300',
  'testing': 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-950 dark:text-orange-300',
  'completed': 'bg-green-100 text-green-800 border-green-200 dark:bg-green-950 dark:text-green-300',
};

export function ModuleDetail({ module, open, onOpenChange }: ModuleDetailProps) {
  if (!module) return null;

  const completedSubTasks = module.subTasks?.filter((t) => t.completed).length || 0;
  const totalSubTasks = module.subTasks?.length || 0;
  const progress = totalSubTasks > 0 ? (completedSubTasks / totalSubTasks) * 100 : 0;

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-xl">{module.name}</SheetTitle>
          <SheetDescription>{module.description}</SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Status and Priority */}
          <div>
            <h3 className="text-sm font-medium mb-2">Status</h3>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge className={statusColors[module.status]}>
                {module.status.replace('-', ' ')}
              </Badge>
              <Badge className={priorityColors[module.priority]}>
                {module.priority} priority
              </Badge>
              {module.blockers.length > 0 && (
                <Badge variant="destructive" className="gap-1">
                  <AlertCircle className="size-3" />
                  Blocked
                </Badge>
              )}
            </div>
          </div>

          <Separator />

          {/* Assignee */}
          <div>
            <h3 className="text-sm font-medium mb-2">Assignee</h3>
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={module.assignee.avatar} alt={module.assignee.name} />
                <AvatarFallback>{getInitials(module.assignee.name)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{module.assignee.name}</p>
                <p className="text-xs text-muted-foreground">{module.assignee.team}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Blockers */}
          {module.blockers.length > 0 && (
            <>
              <div>
                <h3 className="text-sm font-medium mb-2 flex items-center gap-2 text-red-600">
                  <AlertCircle className="size-4" />
                  Blockers
                </h3>
                <ul className="space-y-1">
                  {module.blockers.map((blocker, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-red-600 mt-1">•</span>
                      <span>{blocker}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Separator />
            </>
          )}

          {/* Sub-tasks Checklist */}
          {totalSubTasks > 0 && (
            <>
              <div>
                <h3 className="text-sm font-medium mb-2">Migration Checklist</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">
                      {completedSubTasks}/{totalSubTasks} completed
                    </span>
                  </div>
                  <Progress value={progress} className="h-2" />
                  <ul className="space-y-2 mt-3">
                    {module.subTasks?.map((task, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        {task.completed ? (
                          <CheckCircle2 className="size-4 text-green-600 shrink-0" />
                        ) : (
                          <Circle className="size-4 text-muted-foreground shrink-0" />
                        )}
                        <span
                          className={`text-sm ${
                            task.completed ? 'line-through text-muted-foreground' : ''
                          }`}
                        >
                          {task.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <Separator />
            </>
          )}

          {/* Tags */}
          {module.tags.length > 0 && (
            <>
              <div>
                <h3 className="text-sm font-medium mb-2">Tags</h3>
                <div className="flex items-center gap-2 flex-wrap">
                  {module.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <Separator />
            </>
          )}

          {/* Effort */}
          <div>
            <h3 className="text-sm font-medium mb-2">Effort (hours)</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Estimated</p>
                <p className="font-medium">{module.estimatedEffort}h</p>
              </div>
              {module.actualEffort && (
                <div>
                  <p className="text-muted-foreground">Actual</p>
                  <p className="font-medium">{module.actualEffort}h</p>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* PR and CI Status */}
          <div>
            <h3 className="text-sm font-medium mb-2">Links & Status</h3>
            <div className="space-y-2">
              {module.prUrl ? (
                <a
                  href={module.prUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
                >
                  <ExternalLink className="size-4" />
                  Pull Request #{module.prUrl.split('/').pop()}
                </a>
              ) : (
                <p className="text-sm text-muted-foreground">No pull request yet</p>
              )}
              {module.ciStatus && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">CI Status:</span>
                  <Badge
                    variant="outline"
                    className={
                      module.ciStatus === 'passing'
                        ? 'text-green-600'
                        : module.ciStatus === 'failing'
                        ? 'text-red-600'
                        : 'text-yellow-600'
                    }
                  >
                    {module.ciStatus}
                  </Badge>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Last Updated */}
          <div>
            <h3 className="text-sm font-medium mb-2">Last Updated</h3>
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <Clock className="size-4" />
              {formatDistanceToNow(module.lastUpdated, { addSuffix: true })}
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
