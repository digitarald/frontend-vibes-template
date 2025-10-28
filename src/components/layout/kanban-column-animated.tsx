'use client';

import { PullRequest, PRStatus } from '@/data/pulls';
import { PRCardAnimated } from './pr-card-animated';
import { cn } from '@/lib/utils';

interface KanbanColumnAnimatedProps {
  title: string;
  status: PRStatus;
  pulls: PullRequest[];
  gradientClass: string;
  movingPRIds?: Set<string>;
  celebratingPRIds?: Set<string>;
}

export function KanbanColumnAnimated({
  title,
  status,
  pulls,
  gradientClass,
  movingPRIds = new Set(),
  celebratingPRIds = new Set(),
}: KanbanColumnAnimatedProps) {
  const columnPulls = pulls.filter(pr => pr.status === status);
  
  return (
    <div className="flex flex-col h-full">
      {/* Column Header */}
      <div className={cn(
        'rounded-t-2xl p-6 relative overflow-hidden',
        'animate-gradient-pulse',
        gradientClass
      )}>
        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-white drop-shadow-lg tracking-tight">
            {title}
          </h2>
          <p className="text-white/90 text-sm font-medium mt-1">
            {columnPulls.length} {columnPulls.length === 1 ? 'PR' : 'PRs'}
          </p>
        </div>
        
        {/* Animated background overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent animate-pulse-slow" />
      </div>
      
      {/* Column Content */}
      <div className={cn(
        'flex-1 p-4 space-y-3 rounded-b-2xl',
        'bg-card/50 backdrop-blur-sm border-x-2 border-b-2 border-border/50',
        'overflow-y-auto'
      )}>
        {columnPulls.length === 0 ? (
          <div className="flex items-center justify-center h-32 text-muted-foreground text-sm">
            No pull requests
          </div>
        ) : (
          columnPulls.map((pr, index) => (
            <div
              key={pr.id}
              className={cn(
                'transition-all duration-700 ease-out',
                movingPRIds.has(pr.id) && 'scale-110 z-10'
              )}
            >
              <PRCardAnimated
                pr={pr}
                index={index}
                isMoving={movingPRIds.has(pr.id)}
                isCelebrating={celebratingPRIds.has(pr.id)}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
