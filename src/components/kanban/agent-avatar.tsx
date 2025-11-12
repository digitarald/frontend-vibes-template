'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { Agent, AgentStatus } from '@/types/kanban';

interface AgentAvatarProps {
  agent: Agent;
  size?: 'sm' | 'md' | 'lg';
  showStatus?: boolean;
  showName?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-12 w-12',
};

const statusColors: Record<AgentStatus, string> = {
  active: 'bg-green-500',
  idle: 'bg-yellow-500',
  blocked: 'bg-red-500',
  offline: 'bg-gray-500',
};

export function AgentAvatar({ 
  agent, 
  size = 'md', 
  showStatus = true,
  showName = false,
  className 
}: AgentAvatarProps) {
  const initials = agent.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="relative">
        <Avatar className={cn(sizeClasses[size])}>
          <AvatarImage src={agent.avatar} alt={agent.name} />
          <AvatarFallback style={{ backgroundColor: agent.color }}>
            {initials}
          </AvatarFallback>
        </Avatar>
        {showStatus && (
          <span
            className={cn(
              'absolute bottom-0 right-0 block h-3 w-3 rounded-full ring-2 ring-background',
              statusColors[agent.status],
              agent.status === 'active' && 'animate-pulse'
            )}
          />
        )}
      </div>
      {showName && (
        <div className="flex flex-col">
          <span className="text-sm font-medium">{agent.name}</span>
          <Badge variant="outline" className="text-xs w-fit">
            {agent.type}
          </Badge>
        </div>
      )}
    </div>
  );
}
