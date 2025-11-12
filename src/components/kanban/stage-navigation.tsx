'use client';

import { Stage, STAGES } from '@/lib/kanban/types';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface StageNavigationProps {
  currentStage: Stage;
  onStageChange: (stage: Stage) => void;
  taskCounts: Record<Stage, number>;
}

export function StageNavigation({
  currentStage,
  onStageChange,
  taskCounts,
}: StageNavigationProps) {
  return (
    <div className="sticky bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t p-4 shadow-lg">
      <Tabs value={currentStage} onValueChange={(value) => onStageChange(value as Stage)}>
        <TabsList className="w-full h-auto p-1 grid grid-cols-3 sm:grid-cols-6 gap-1">
          {STAGES.map((stage) => (
            <TabsTrigger
              key={stage.value}
              value={stage.value}
              className={cn(
                "flex flex-col items-center gap-1 px-2 py-2 data-[state=active]:shadow-md min-h-[60px]",
                "text-xs sm:text-sm"
              )}
              style={{
                ...(currentStage === stage.value && {
                  backgroundColor: stage.color,
                  opacity: 0.2,
                }),
              }}
            >
              <span className="font-medium truncate w-full text-center">
                {stage.label}
              </span>
              <Badge 
                variant={currentStage === stage.value ? "default" : "secondary"}
                className="text-xs h-5 min-w-[20px] px-1"
              >
                {taskCounts[stage.value] || 0}
              </Badge>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}
