'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  ExternalLink,
  XCircle,
  Loader2,
  MoreHorizontal,
} from 'lucide-react';
import type { Module } from './types';

interface ModuleCardProps {
  module: Module;
  onViewDetails: (module: Module) => void;
}

const priorityColors = {
  high: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-950 dark:text-red-300',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-300',
  low: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950 dark:text-blue-300',
};

const ciStatusIcons = {
  passing: <CheckCircle2 className="size-3 text-green-600" />,
  failing: <XCircle className="size-3 text-red-600" />,
  pending: <Loader2 className="size-3 text-yellow-600 animate-spin" />,
};

export function ModuleCard({ module, onViewDetails }: ModuleCardProps) {
  const completedSubTasks = module.subTasks?.filter((t) => t.completed).length || 0;
  const totalSubTasks = module.subTasks?.length || 0;
  const progress = totalSubTasks > 0 ? (completedSubTasks / totalSubTasks) * 100 : 0;

  const daysSinceUpdate = Math.floor(
    (Date.now() - module.lastUpdated.getTime()) / (1000 * 60 * 60 * 24)
  );
  const isStale = daysSinceUpdate > 7;

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => onViewDetails(module)}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base leading-tight">{module.name}</CardTitle>
          <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0" onClick={(e) => {
            e.stopPropagation();
          }}>
            <MoreHorizontal className="size-4" />
          </Button>
        </div>
        <CardDescription className="text-xs line-clamp-2">{module.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Priority and Blockers */}
        <div className="flex items-center gap-2 flex-wrap">
          <Badge className={priorityColors[module.priority]}>
            {module.priority}
          </Badge>
          {module.blockers.length > 0 && (
            <Tooltip>
              <TooltipTrigger>
                <Badge variant="destructive" className="gap-1">
                  <AlertCircle className="size-3" />
                  Blocked
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <div className="text-xs">
                  {module.blockers.map((blocker, idx) => (
                    <div key={idx}>• {blocker}</div>
                  ))}
                </div>
              </TooltipContent>
            </Tooltip>
          )}
          {isStale && (
            <Tooltip>
              <TooltipTrigger>
                <Badge variant="outline" className="gap-1 text-orange-600">
                  <Clock className="size-3" />
                  {daysSinceUpdate}d
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                Last updated {daysSinceUpdate} days ago
              </TooltipContent>
            </Tooltip>
          )}
        </div>

        {/* Assignee */}
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={module.assignee.avatar} alt={module.assignee.name} />
            <AvatarFallback className="text-xs">{getInitials(module.assignee.name)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium truncate">{module.assignee.name}</p>
            <p className="text-xs text-muted-foreground truncate">{module.assignee.team}</p>
          </div>
        </div>

        {/* Sub-tasks Progress */}
        {totalSubTasks > 0 && (
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">
                {completedSubTasks}/{totalSubTasks}
              </span>
            </div>
            <Progress value={progress} className="h-1.5" />
          </div>
        )}

        {/* Tags */}
        {module.tags.length > 0 && (
          <div className="flex items-center gap-1 flex-wrap">
            {module.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs px-1.5 py-0">
                {tag}
              </Badge>
            ))}
            {module.tags.length > 3 && (
              <Badge variant="outline" className="text-xs px-1.5 py-0">
                +{module.tags.length - 3}
              </Badge>
            )}
          </div>
        )}

        {/* Footer with PR and CI Status */}
        <div className="flex items-center justify-between pt-1 border-t">
          {module.prUrl ? (
            <a
              href={module.prUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-blue-600 hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="size-3" />
              PR #{module.prUrl.split('/').pop()}
            </a>
          ) : (
            <span className="text-xs text-muted-foreground">No PR</span>
          )}
          {module.ciStatus && (
            <Tooltip>
              <TooltipTrigger className="flex items-center gap-1">
                {ciStatusIcons[module.ciStatus]}
                <span className="text-xs capitalize">{module.ciStatus}</span>
              </TooltipTrigger>
              <TooltipContent>
                CI Status: {module.ciStatus}
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
