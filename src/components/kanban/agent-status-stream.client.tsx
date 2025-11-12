'use client';

import { useState, useCallback } from 'react';
import { Agent, AgentStatus } from '@/types/kanban';
import { SSEEvent, AgentStatusUpdate } from '@/types/kanban';
import { useSSE } from '@/hooks/use-sse';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, Pause, AlertCircle, CheckCircle } from 'lucide-react';

interface AgentStatusStreamProps {
  initialAgents: Agent[];
}

export function AgentStatusStream({ initialAgents }: AgentStatusStreamProps) {
  const [agents, setAgents] = useState<Agent[]>(initialAgents);
  const { isConnected } = useSSE({
    onEvent: useCallback((event: SSEEvent) => {
      if (event.type === 'agent-status') {
        const data = event.data as AgentStatusUpdate;
        setAgents(prev =>
          prev.map(agent =>
            agent.id === data.agentId
              ? { ...agent, status: data.status, currentTask: data.currentTask }
              : agent
          )
        );
      }
    }, []),
  });

  const getStatusIcon = (status: AgentStatus) => {
    switch (status) {
      case 'working':
        return <Activity className="h-4 w-4 text-green-500" />;
      case 'idle':
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
      case 'blocked':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'paused':
        return <Pause className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: AgentStatus) => {
    switch (status) {
      case 'working':
        return 'bg-green-500/10 text-green-700 dark:text-green-400';
      case 'idle':
        return 'bg-blue-500/10 text-blue-700 dark:text-blue-400';
      case 'blocked':
        return 'bg-red-500/10 text-red-700 dark:text-red-400';
      case 'paused':
        return 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">AI Agent Pool</CardTitle>
          <div className="flex items-center gap-2">
            <div className={`h-2 w-2 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
            <span className="text-xs text-muted-foreground">
              {isConnected ? 'Live' : 'Disconnected'}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {agents.map((agent) => (
            <div key={agent.id} className="flex items-center justify-between p-3 rounded-lg border bg-card">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                {getStatusIcon(agent.status)}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{agent.name}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {agent.currentTask || 'No active task'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Badge variant="outline" className={getStatusColor(agent.status)}>
                  {agent.status}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {agent.tasksCompleted} done
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
