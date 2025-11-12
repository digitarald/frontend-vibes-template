'use client';

import { Agent } from '@/lib/kanban/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface AgentStatusBarProps {
  agents: Agent[];
  selectedAgent?: string;
  onAgentSelect?: (agentId: string) => void;
}

export function AgentStatusBar({
  agents,
  selectedAgent,
  onAgentSelect,
}: AgentStatusBarProps) {
  const getStatusColor = (status: Agent['status']) => {
    switch (status) {
      case 'available':
        return 'bg-green-500';
      case 'busy':
        return 'bg-yellow-500';
      case 'offline':
        return 'bg-gray-500';
    }
  };

  return (
    <div className="sticky top-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-b p-4 shadow-sm z-40">
      <div className="flex items-center gap-2 overflow-x-auto">
        <span className="text-sm font-medium text-muted-foreground whitespace-nowrap mr-2">
          Team:
        </span>
        {agents.map((agent) => (
          <button
            key={agent.id}
            onClick={() => onAgentSelect?.(agent.id)}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-lg transition-all hover:bg-accent",
              selectedAgent === agent.id && "bg-accent ring-2 ring-primary"
            )}
          >
            <div className="relative">
              <Avatar className="h-8 w-8">
                <AvatarImage src={agent.avatar} alt={agent.name} />
                <AvatarFallback className="text-xs">
                  {agent.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div
                className={cn(
                  'absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background',
                  getStatusColor(agent.status)
                )}
              />
            </div>
            <span className="text-sm font-medium hidden sm:inline whitespace-nowrap">
              {agent.name}
            </span>
          </button>
        ))}
        {selectedAgent && (
          <button
            onClick={() => onAgentSelect?.(undefined!)}
            className="ml-2 px-3 py-1 text-xs bg-muted hover:bg-muted/80 rounded-md transition-colors"
          >
            Clear filter
          </button>
        )}
      </div>
    </div>
  );
}
