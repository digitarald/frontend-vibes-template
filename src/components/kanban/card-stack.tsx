'use client';

import { Task } from '@/lib/kanban/types';
import { SwipeableCard } from './swipeable-card';

interface CardStackProps {
  tasks: Task[];
  currentIndex: number;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onCardClick?: () => void;
}

export function CardStack({
  tasks,
  currentIndex,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  onCardClick,
}: CardStackProps) {
  if (tasks.length === 0) {
    return (
      <div className="flex items-center justify-center h-[400px] text-center px-6">
        <div className="space-y-2">
          <p className="text-lg font-medium text-muted-foreground">No tasks in this stage</p>
          <p className="text-sm text-muted-foreground">
            Swipe between stages or add new tasks to get started
          </p>
        </div>
      </div>
    );
  }

  // Show current card and up to 2 cards behind it
  const visibleCards = tasks.slice(currentIndex, currentIndex + 3);

  return (
    <div className="relative h-[400px] w-full">
      {visibleCards.map((task, index) => {
        const isActive = index === 0;
        const stackPosition = index;

        return (
          <SwipeableCard
            key={task.id}
            task={task}
            isActive={isActive}
            stackPosition={stackPosition}
            onSwipeLeft={isActive ? onSwipeLeft : undefined}
            onSwipeRight={isActive ? onSwipeRight : undefined}
            onSwipeUp={isActive ? onSwipeUp : undefined}
            onSwipeDown={isActive ? onSwipeDown : undefined}
            onClick={isActive ? onCardClick : undefined}
          />
        );
      })}
    </div>
  );
}
