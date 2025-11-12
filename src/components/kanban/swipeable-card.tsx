'use client';

import { useState } from 'react';
import { Task } from '@/lib/kanban/types';
import { getAgentById } from '@/lib/kanban/mock-data';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSwipe } from '@/hooks/kanban/use-swipe';

interface SwipeableCardProps {
  task: Task;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onClick?: () => void;
  isActive?: boolean;
  stackPosition?: number; // 0 = front, 1 = second, 2 = third, etc.
}

export function SwipeableCard({
  task,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  onClick,
  isActive = true,
  stackPosition = 0,
}: SwipeableCardProps) {
  const [transform, setTransform] = useState({ x: 0, y: 0 });
  const agent = getAgentById(task.assignedTo);

  const { ref, swipeState } = useSwipe(
    {
      onSwipeLeft,
      onSwipeRight,
      onSwipeUp,
      onSwipeDown,
      onSwipeMove: (deltaX, deltaY) => {
        if (isActive) {
          setTransform({ x: deltaX, y: deltaY });
        }
      },
      onSwipeEnd: () => {
        setTransform({ x: 0, y: 0 });
      },
    },
    {
      threshold: 50,
      velocityThreshold: 0.3,
    }
  );

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500/10 text-red-700 dark:text-red-400';
      case 'medium':
        return 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400';
      case 'low':
        return 'bg-blue-500/10 text-blue-700 dark:text-blue-400';
    }
  };

  const scale = 1 - stackPosition * 0.05;
  const yOffset = stackPosition * 8;
  const opacity = stackPosition === 0 ? 1 : 0.6;

  // Calculate rotation and opacity based on swipe
  const swipeRotation = swipeState.isSwiping ? transform.x * 0.05 : 0;
  const swipeOpacity = swipeState.isSwiping 
    ? Math.max(0.7, 1 - Math.abs(transform.x) / 400)
    : 1;

  return (
    <div
      ref={ref}
      className={cn(
        'absolute w-full transition-all duration-300 ease-out touch-none select-none',
        isActive ? 'cursor-grab active:cursor-grabbing' : 'pointer-events-none'
      )}
      style={{
        transform: isActive
          ? `translate(${transform.x}px, ${transform.y + yOffset}px) scale(${scale}) rotate(${swipeRotation}deg)`
          : `translateY(${yOffset}px) scale(${scale})`,
        opacity: opacity * swipeOpacity,
        zIndex: 10 - stackPosition,
      }}
      onClick={() => isActive && onClick?.()}
    >
      <Card className="min-h-[400px] shadow-2xl">
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={getPriorityColor(task.priority)}>
                  {task.priority}
                </Badge>
                {task.blockedReason && (
                  <Badge variant="destructive" className="gap-1">
                    <AlertCircle className="h-3 w-3" />
                    Blocked
                  </Badge>
                )}
              </div>
              <CardTitle className="text-xl">{task.title}</CardTitle>
            </div>
            {agent && (
              <Avatar className="h-10 w-10">
                <AvatarImage src={agent.avatar} alt={agent.name} />
                <AvatarFallback>{agent.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
            )}
          </div>
          <CardDescription className="mt-2">{task.description}</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {task.tags.map(tag => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          {agent && (
            <div className="pt-2 text-sm text-muted-foreground">
              Assigned to {agent.name}
            </div>
          )}

          {task.blockedReason && (
            <div className="p-3 bg-destructive/10 rounded-lg border border-destructive/20">
              <p className="text-sm text-destructive font-medium mb-1">Blocked</p>
              <p className="text-sm text-muted-foreground">{task.blockedReason}</p>
            </div>
          )}
        </CardContent>

        {/* Swipe Indicators */}
        {isActive && swipeState.isSwiping && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            {swipeState.direction === 'left' && (
              <div className="absolute left-4 bg-background/90 p-4 rounded-full shadow-lg">
                <ArrowLeft className="h-8 w-8 text-primary" />
              </div>
            )}
            {swipeState.direction === 'right' && (
              <div className="absolute right-4 bg-background/90 p-4 rounded-full shadow-lg">
                <ArrowRight className="h-8 w-8 text-primary" />
              </div>
            )}
            {swipeState.direction === 'up' && (
              <div className="absolute top-4 bg-background/90 p-4 rounded-full shadow-lg">
                <ArrowUp className="h-8 w-8 text-primary" />
              </div>
            )}
            {swipeState.direction === 'down' && (
              <div className="absolute bottom-4 bg-background/90 p-4 rounded-full shadow-lg">
                <ArrowDown className="h-8 w-8 text-primary" />
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  );
}
