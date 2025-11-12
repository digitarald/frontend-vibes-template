'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import type { Agent } from '@/data/kanban-mock';

interface AgentAvatarProps {
  agent: Agent;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'h-6 w-6 text-xs',
  md: 'h-8 w-8 text-sm',
  lg: 'h-10 w-10 text-base',
};

const statusColors = {
  idle: 'bg-muted',
  working: 'bg-chart-2',
  blocked: 'bg-destructive',
  offline: 'bg-muted-foreground/30',
};

export function AgentAvatar({ agent, size = 'md' }: AgentAvatarProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="relative inline-block">
            <Avatar className={cn(sizeClasses[size])}>
              <AvatarFallback className={cn(statusColors[agent.status])}>
                {agent.avatar}
              </AvatarFallback>
            </Avatar>
            {agent.status === 'working' && (
              <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-chart-2 animate-pulse ring-2 ring-background" />
            )}
            {agent.status === 'blocked' && (
              <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-destructive ring-2 ring-background" />
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <div className="text-sm">
            <div className="font-medium">{agent.name}</div>
            <div className="text-muted-foreground capitalize">{agent.status}</div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
