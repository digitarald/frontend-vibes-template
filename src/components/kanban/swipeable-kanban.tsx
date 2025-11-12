'use client';

import { useState, useMemo } from 'react';
import { Stage, Task } from '@/lib/kanban/types';
import { mockAgents, mockTasks, getTasksByStage } from '@/lib/kanban/mock-data';
import { CardStack } from './card-stack';
import { StageNavigation } from './stage-navigation';
import { AgentStatusBar } from './agent-status-bar';
import { CardDetailSheet } from './card-detail-sheet';
import { GestureTutorial, useGestureTutorial } from './gesture-tutorial';
import { Button } from '@/components/ui/button';
import { HelpCircle } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

export function SwipeableKanban() {
  const isMobile = useIsMobile();
  const [currentStage, setCurrentStage] = useState<Stage>('todo');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [selectedAgent, setSelectedAgent] = useState<string | undefined>();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const { isOpen: isTutorialOpen, onClose: closeTutorial, showTutorial } = useGestureTutorial();

  // Filter tasks by stage and selected agent
  const filteredTasks = useMemo(() => {
    const stageTasks = getTasksByStage(currentStage);
    if (selectedAgent) {
      return stageTasks.filter(task => task.assignedTo === selectedAgent);
    }
    return stageTasks;
  }, [currentStage, selectedAgent]);

  // Calculate task counts per stage
  const taskCounts = useMemo(() => {
    const counts: Record<Stage, number> = {
      backlog: 0,
      todo: 0,
      'in-progress': 0,
      'in-review': 0,
      blocked: 0,
      done: 0,
    };

    const tasks = selectedAgent
      ? mockTasks.filter(t => t.assignedTo === selectedAgent)
      : mockTasks;

    tasks.forEach(task => {
      counts[task.stage]++;
    });

    return counts;
  }, [selectedAgent]);

  const handleSwipeLeft = () => {
    if (currentCardIndex < filteredTasks.length - 1) {
      setCurrentCardIndex(prev => prev + 1);
    }
  };

  const handleSwipeRight = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(prev => prev - 1);
    }
  };

  const handleSwipeUp = () => {
    if (filteredTasks[currentCardIndex]) {
      setSelectedTask(filteredTasks[currentCardIndex]);
      setIsDetailOpen(true);
    }
  };

  const handleCardClick = () => {
    if (filteredTasks[currentCardIndex]) {
      setSelectedTask(filteredTasks[currentCardIndex]);
      setIsDetailOpen(true);
    }
  };

  const handleStageChange = (stage: Stage) => {
    setCurrentStage(stage);
    setCurrentCardIndex(0); // Reset to first card in new stage
  };

  const handleAgentSelect = (agentId: string | undefined) => {
    setSelectedAgent(agentId);
    setCurrentCardIndex(0); // Reset to first card
  };

  const handleMoveToNextStage = () => {
    // This would update the task in a real application
    console.log('Move to next stage');
    setIsDetailOpen(false);
  };

  const handleBlock = () => {
    // This would update the task in a real application
    console.log('Block task');
    setIsDetailOpen(false);
  };

  const handleComplete = () => {
    // This would update the task in a real application
    console.log('Complete task');
    setIsDetailOpen(false);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Agent Status Bar */}
      <AgentStatusBar
        agents={mockAgents}
        selectedAgent={selectedAgent}
        onAgentSelect={handleAgentSelect}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col px-4 py-6 pb-32">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Task Board</h1>
            <p className="text-sm text-muted-foreground">
              {filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'} in this stage
            </p>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={showTutorial}
            title="Show gesture guide"
          >
            <HelpCircle className="h-5 w-5" />
          </Button>
        </div>

        {/* Desktop Grid View */}
        {!isMobile && filteredTasks.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {filteredTasks.slice(0, 6).map(task => (
              <div
                key={task.id}
                onClick={() => {
                  setSelectedTask(task);
                  setIsDetailOpen(true);
                }}
                className="cursor-pointer transition-transform hover:scale-105"
              >
                {/* Simple card preview for desktop */}
                <div className="p-4 border rounded-lg bg-card shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-semibold mb-2">{task.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {task.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Mobile Card Stack View */}
        {isMobile && (
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-md">
              <CardStack
                tasks={filteredTasks}
                currentIndex={currentCardIndex}
                onSwipeLeft={handleSwipeLeft}
                onSwipeRight={handleSwipeRight}
                onSwipeUp={handleSwipeUp}
                onCardClick={handleCardClick}
              />
            </div>
          </div>
        )}

        {/* Card Counter */}
        {filteredTasks.length > 0 && (
          <div className="text-center mt-6 text-sm text-muted-foreground">
            {isMobile ? (
              <>
                Card {Math.min(currentCardIndex + 1, filteredTasks.length)} of {filteredTasks.length}
              </>
            ) : (
              <>
                Showing {Math.min(6, filteredTasks.length)} of {filteredTasks.length} tasks
              </>
            )}
          </div>
        )}
      </div>

      {/* Stage Navigation */}
      <StageNavigation
        currentStage={currentStage}
        onStageChange={handleStageChange}
        taskCounts={taskCounts}
      />

      {/* Card Detail Sheet */}
      <CardDetailSheet
        task={selectedTask}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onMoveToNextStage={handleMoveToNextStage}
        onBlock={handleBlock}
        onComplete={handleComplete}
      />

      {/* Gesture Tutorial */}
      <GestureTutorial isOpen={isTutorialOpen} onClose={closeTutorial} />
    </div>
  );
}
