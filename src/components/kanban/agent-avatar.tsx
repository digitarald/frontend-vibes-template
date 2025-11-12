'use client';

import { Agent } from '@/types/kanban';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface AgentAvatarProps {
  agent: Agent;
  size?: 'sm' | 'md' | 'lg';
  showStatus?: boolean;
}

export function AgentAvatar({ agent, size = 'md', showStatus = true }: AgentAvatarProps) {
  const sizeClasses = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
  };

  const statusColors = {
    idle: 'bg-muted',
    running: 'bg-chart-2',
    paused: 'bg-chart-4',
    error: 'bg-destructive',
  };

  const statusIndicatorSize = {
    sm: 'h-2 w-2',
    md: 'h-2.5 w-2.5',
    lg: 'h-3 w-3',
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="relative inline-block">
            <Avatar
              className={cn(sizeClasses[size])}
              style={{
                backgroundColor: agent.color,
              }}
            >
              <AvatarFallback
                className="text-white font-semibold"
                style={{
                  backgroundColor: agent.color,
                }}
              >
                {agent.avatar}
              </AvatarFallback>
            </Avatar>
            {showStatus && (
              <span
                className={cn(
                  'absolute bottom-0 right-0 rounded-full border-2 border-background',
                  statusIndicatorSize[size],
                  statusColors[agent.status],
                  agent.status === 'running' && 'animate-pulse'
                )}
              />
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="font-medium">{agent.name}</p>
          <p className="text-xs text-muted-foreground capitalize">{agent.status}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
