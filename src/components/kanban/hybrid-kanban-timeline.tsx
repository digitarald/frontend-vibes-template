'use client';

import { useState, useEffect } from 'react';
import { ViewModeType, Task, TimelineEvent } from './types';
import { CompactKanban } from './compact-kanban';
import { ActivityTimeline } from './activity-timeline';
import { mockTasks, mockTimelineEvents } from './mock-data';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useIsMobile } from '@/hooks/use-mobile';
import { LayoutGrid, Clock, SplitSquareHorizontal } from 'lucide-react';

export function HybridKanbanTimeline() {
  const isMobile = useIsMobile();
  const [viewMode, setViewMode] = useState<ViewModeType>('split');
  const [selectedTaskId, setSelectedTaskId] = useState<string | undefined>();
  const [selectedEventId, setSelectedEventId] = useState<string | undefined>();
  const [tasks] = useState<Task[]>(mockTasks);
  const [events] = useState<TimelineEvent[]>(mockTimelineEvents);

  // Synchronize selection between views
  const handleTaskSelect = (task: Task) => {
    setSelectedTaskId(task.id);
    
    // Find most recent event for this task
    const taskEvents = events
      .filter(e => e.task.id === task.id)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    
    if (taskEvents.length > 0) {
      setSelectedEventId(taskEvents[0].id);
    }
  };

  const handleEventSelect = (event: TimelineEvent) => {
    setSelectedEventId(event.id);
    setSelectedTaskId(event.task.id);
  };

  // Clear selection when view mode changes
  useEffect(() => {
    setSelectedTaskId(undefined);
    setSelectedEventId(undefined);
  }, [viewMode]);

  // Mobile view - use tabs
  if (isMobile) {
    return (
      <div className="h-[calc(100vh-8rem)]">
        <Tabs defaultValue="kanban" className="h-full flex flex-col">
          <div className="mb-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="kanban">
                <LayoutGrid className="mr-2 h-4 w-4" />
                Kanban
              </TabsTrigger>
              <TabsTrigger value="timeline">
                <Clock className="mr-2 h-4 w-4" />
                Timeline
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="kanban" className="flex-1 mt-0">
            <CompactKanban
              tasks={tasks}
              selectedTaskId={selectedTaskId}
              onTaskSelect={handleTaskSelect}
            />
          </TabsContent>

          <TabsContent value="timeline" className="flex-1 mt-0">
            <ActivityTimeline
              events={events}
              selectedEventId={selectedEventId}
              onEventSelect={handleEventSelect}
              autoScroll={true}
            />
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  // Desktop view - use view mode toggle and resizable panels
  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      {/* View mode selector */}
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Hybrid Kanban-Timeline View</h1>
        <ToggleGroup type="single" value={viewMode} onValueChange={(v) => v && setViewMode(v as ViewModeType)}>
          <ToggleGroupItem value="kanban" aria-label="Kanban only">
            <LayoutGrid className="h-4 w-4 mr-2" />
            Kanban
          </ToggleGroupItem>
          <ToggleGroupItem value="timeline" aria-label="Timeline only">
            <Clock className="h-4 w-4 mr-2" />
            Timeline
          </ToggleGroupItem>
          <ToggleGroupItem value="split" aria-label="Split view">
            <SplitSquareHorizontal className="h-4 w-4 mr-2" />
            Split
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      {/* Content area */}
      <div className="flex-1 border rounded-lg overflow-hidden">
        {viewMode === 'kanban' && (
          <div className="h-full p-4">
            <CompactKanban
              tasks={tasks}
              selectedTaskId={selectedTaskId}
              onTaskSelect={handleTaskSelect}
            />
          </div>
        )}

        {viewMode === 'timeline' && (
          <div className="h-full p-4">
            <ActivityTimeline
              events={events}
              selectedEventId={selectedEventId}
              onEventSelect={handleEventSelect}
              autoScroll={true}
            />
          </div>
        )}

        {viewMode === 'split' && (
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={40} minSize={20}>
              <div className="h-full p-4">
                <CompactKanban
                  tasks={tasks}
                  selectedTaskId={selectedTaskId}
                  onTaskSelect={handleTaskSelect}
                />
              </div>
            </ResizablePanel>
            
            <ResizableHandle withHandle />
            
            <ResizablePanel defaultSize={60} minSize={30}>
              <div className="h-full p-4">
                <ActivityTimeline
                  events={events}
                  selectedEventId={selectedEventId}
                  onEventSelect={handleEventSelect}
                  autoScroll={true}
                />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        )}
      </div>
    </div>
  );
}
