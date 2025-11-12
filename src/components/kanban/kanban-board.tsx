'use client';

import { useState } from 'react';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { KanbanColumn } from './kanban-column';
import { AgentAvatar } from './agent-avatar';
import { mockTasks, mockAgents, type Task } from '@/data/kanban-mock';
import { useIsMobile } from '@/hooks/use-mobile';
import { Users } from 'lucide-react';

const stages = [
  { id: 'planning' as const, title: 'Planning' },
  { id: 'running' as const, title: 'Running' },
  { id: 'blocked' as const, title: 'Blocked' },
  { id: 'cicd' as const, title: 'CI/CD' },
  { id: 'review' as const, title: 'Review Needed' },
  { id: 'completed' as const, title: 'Completed' },
];

export function KanbanBoard() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [agentPoolOpen, setAgentPoolOpen] = useState(true);
  const isMobile = useIsMobile();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const taskId = active.id as string;
    const newStage = over.id as Task['stage'];

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, stage: newStage } : task
      )
    );
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  const getTasksByStage = (stage: Task['stage']) => {
    return tasks.filter((task) => task.stage === stage);
  };

  // Placeholder for real-time updates
  // useEffect(() => {
  //   const eventSource = new EventSource('/api/tasks/updates');
  //   eventSource.onmessage = (event) => {
  //     const updatedTask = JSON.parse(event.data);
  //     setTasks((prev) => prev.map((t) => t.id === updatedTask.id ? updatedTask : t));
  //   };
  //   return () => eventSource.close();
  // }, []);

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] gap-4">
      <div className="flex items-center justify-between px-2">
        <div>
          <h1 className="text-2xl font-bold">Task Board</h1>
          <p className="text-sm text-muted-foreground">
            Manage your development workflow
          </p>
        </div>
        {!isMobile && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setAgentPoolOpen(!agentPoolOpen)}
          >
            <Users className="h-4 w-4 mr-2" />
            {agentPoolOpen ? 'Hide' : 'Show'} Agents
          </Button>
        )}
      </div>

      <div className="flex gap-4 flex-1 overflow-hidden">
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
        >
          <ScrollArea className="flex-1">
            <div className="flex gap-4 p-1 pb-4">
              {stages.map((stage) => (
                <KanbanColumn
                  key={stage.id}
                  stage={stage.id}
                  title={stage.title}
                  tasks={getTasksByStage(stage.id)}
                />
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>

          <DragOverlay>
            {activeId ? (
              <div className="opacity-50">
                {/* Drag preview placeholder */}
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>

        {/* Agent Pool Sidebar */}
        {!isMobile && agentPoolOpen && (
          <Card className="w-64 shrink-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Users className="h-4 w-4" />
                Agent Pool
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockAgents.map((agent) => (
                <div
                  key={agent.id}
                  className="flex items-center gap-3 p-2 rounded-md hover:bg-accent transition-colors"
                >
                  <AgentAvatar agent={agent} size="md" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">{agent.name}</div>
                    <div className="text-xs text-muted-foreground capitalize">
                      {agent.status}
                    </div>
                  </div>
                </div>
              ))}
              <div className="pt-2 border-t">
                <div className="text-xs text-muted-foreground space-y-1">
                  <div className="flex items-center justify-between">
                    <span>Active:</span>
                    <span>{mockAgents.filter((a) => a.status === 'working').length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Idle:</span>
                    <span>{mockAgents.filter((a) => a.status === 'idle').length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Blocked:</span>
                    <span>{mockAgents.filter((a) => a.status === 'blocked').length}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Mobile Agent Pool */}
        {isMobile && (
          <div className="fixed bottom-4 right-4 z-50">
            <Collapsible open={agentPoolOpen} onOpenChange={setAgentPoolOpen}>
              <CollapsibleTrigger asChild>
                <Button
                  size="icon"
                  className="h-12 w-12 rounded-full shadow-lg"
                >
                  <Users className="h-5 w-5" />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="absolute bottom-14 right-0 w-64">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Agent Pool</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {mockAgents.map((agent) => (
                      <div
                        key={agent.id}
                        className="flex items-center gap-2 p-2 rounded-md"
                      >
                        <AgentAvatar agent={agent} size="sm" />
                        <div className="flex-1">
                          <div className="font-medium text-xs">{agent.name}</div>
                          <div className="text-xs text-muted-foreground capitalize">
                            {agent.status}
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </CollapsibleContent>
            </Collapsible>
          </div>
        )}
      </div>
    </div>
  );
}
