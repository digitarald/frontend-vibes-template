'use client';

import { useState } from 'react';
import { Task, Stage } from './types';
import { TaskEventCard } from './task-event-card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

interface CompactKanbanProps {
  tasks: Task[];
  selectedTaskId?: string;
  onTaskSelect?: (task: Task) => void;
}

const stages: Stage[] = ['backlog', 'planning', 'in-progress', 'review', 'blocked', 'completed', 'failed'];

const stageColors = {
  backlog: 'bg-gray-500/10 text-gray-600 border-gray-500/20',
  planning: 'bg-indigo-500/10 text-indigo-600 border-indigo-500/20',
  'in-progress': 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  review: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
  blocked: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
  completed: 'bg-green-500/10 text-green-600 border-green-500/20',
  failed: 'bg-red-500/10 text-red-600 border-red-500/20',
};

export function CompactKanban({ tasks, selectedTaskId, onTaskSelect }: CompactKanbanProps) {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const maxVisibleTasks = 3;

  const tasksByStage = stages.reduce((acc, stage) => {
    acc[stage] = tasks.filter(task => task.stage === stage);
    return acc;
  }, {} as Record<Stage, Task[]>);

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    onTaskSelect?.(task);
  };

  return (
    <>
      <div className="flex flex-col h-full">
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Kanban Board</h2>
        </div>

        <ScrollArea className="flex-1">
          <div className="grid grid-cols-7 gap-3 min-w-max pb-4">
            {stages.map((stage) => {
              const stageTasks = tasksByStage[stage];
              const visibleTasks = stageTasks.slice(0, maxVisibleTasks);
              const remainingCount = stageTasks.length - maxVisibleTasks;

              return (
                <div key={stage} className="flex flex-col min-w-[200px]">
                  <div className="mb-3 pb-2 border-b">
                    <Badge 
                      variant="outline" 
                      className={cn('capitalize mb-1', stageColors[stage])}
                    >
                      {stage.replace('-', ' ')}
                    </Badge>
                    <div className="text-xs text-muted-foreground">
                      {stageTasks.length} {stageTasks.length === 1 ? 'task' : 'tasks'}
                    </div>
                  </div>

                  <div className="space-y-2 flex-1">
                    {visibleTasks.map((task) => (
                      <div
                        key={task.id}
                        className={cn(
                          'transition-all duration-200',
                          selectedTaskId === task.id && 'scale-105'
                        )}
                      >
                        <TaskEventCard
                          task={task}
                          isHighlighted={selectedTaskId === task.id}
                          onClick={() => handleTaskClick(task)}
                        />
                      </div>
                    ))}

                    {remainingCount > 0 && (
                      <div className="flex items-center justify-center p-2 border border-dashed rounded-md text-xs text-muted-foreground">
                        +{remainingCount} more
                      </div>
                    )}

                    {stageTasks.length === 0 && (
                      <div className="flex items-center justify-center h-20 text-xs text-muted-foreground border border-dashed rounded-md">
                        No tasks
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </div>

      {/* Task detail dialog */}
      <Dialog open={!!selectedTask} onOpenChange={(open) => !open && setSelectedTask(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedTask?.title}</DialogTitle>
          </DialogHeader>
          {selectedTask && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">{selectedTask.description}</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Stage</div>
                  <Badge variant="outline" className={stageColors[selectedTask.stage]}>
                    {selectedTask.stage}
                  </Badge>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Priority</div>
                  <Badge variant="outline">{selectedTask.priority}</Badge>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Agent</div>
                  <div className="flex items-center gap-2">
                    {selectedTask.agent && (
                      <>
                        <span className="text-lg">{selectedTask.agent.avatar}</span>
                        <span className="text-sm">{selectedTask.agent.name}</span>
                      </>
                    )}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Progress</div>
                  <div className="text-sm">
                    {selectedTask.progress.completed}/{selectedTask.progress.total} completed
                  </div>
                </div>
              </div>

              {selectedTask.tags && selectedTask.tags.length > 0 && (
                <div>
                  <div className="text-xs text-muted-foreground mb-2">Tags</div>
                  <div className="flex gap-1 flex-wrap">
                    {selectedTask.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
