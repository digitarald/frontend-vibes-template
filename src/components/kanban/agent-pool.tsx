'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { Agent, AgentStatus } from '@/types/kanban';
import { AgentAvatar } from './agent-avatar';

interface AgentPoolProps {
  agents: Agent[];
  className?: string;
}

const statusCounts = (agents: Agent[]) => {
  return agents.reduce((acc, agent) => {
    acc[agent.status] = (acc[agent.status] || 0) + 1;
    return acc;
  }, {} as Record<AgentStatus, number>);
};

export function AgentPool({ agents, className }: AgentPoolProps) {
  const counts = statusCounts(agents);

  return (
    <Card className={cn('h-full', className)}>
      <CardHeader>
        <CardTitle className="text-lg">Agents</CardTitle>
        <div className="flex gap-2 flex-wrap mt-2">
          <Badge variant="outline" className="text-xs">
            <span className="h-2 w-2 rounded-full bg-green-500 mr-1.5" />
            Active: {counts.active || 0}
          </Badge>
          <Badge variant="outline" className="text-xs">
            <span className="h-2 w-2 rounded-full bg-yellow-500 mr-1.5" />
            Idle: {counts.idle || 0}
          </Badge>
          <Badge variant="outline" className="text-xs">
            <span className="h-2 w-2 rounded-full bg-red-500 mr-1.5" />
            Blocked: {counts.blocked || 0}
          </Badge>
          <Badge variant="outline" className="text-xs">
            <span className="h-2 w-2 rounded-full bg-gray-500 mr-1.5" />
            Offline: {counts.offline || 0}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[calc(100vh-280px)] px-4 pb-4">
          <div className="space-y-2">
            {agents.map((agent) => (
              <div
                key={agent.id}
                className="p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                <AgentAvatar agent={agent} size="md" showName showStatus />
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
