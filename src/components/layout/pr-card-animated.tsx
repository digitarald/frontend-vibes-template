'use client';

import { PullRequest } from '@/data/pulls';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

interface PRCardAnimatedProps {
  pr: PullRequest;
  index: number;
  isMoving?: boolean;
  isCelebrating?: boolean;
}

export function PRCardAnimated({ pr, index, isMoving = false, isCelebrating = false }: PRCardAnimatedProps) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    // Staggered entry animation
    const timer = setTimeout(() => setMounted(true), index * 100);
    return () => clearTimeout(timer);
  }, [index]);
  
  return (
    <Card
      className={cn(
        'px-5 py-4 cursor-pointer transition-all duration-700 ease-out',
        'hover:scale-105 hover:shadow-2xl hover:shadow-primary/20',
        'border-2',
        mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
        isMoving && 'animate-pulse scale-105 shadow-2xl shadow-primary/30',
        isCelebrating && 'animate-celebration'
      )}
    >
      {/* Avatar and Status */}
      <div className="flex items-start gap-3 mb-3">
        <div className="relative">
          <Avatar className="size-10 border-2 border-background shadow-md">
            <AvatarImage src={pr.author.avatar} alt={pr.author.name} />
            <AvatarFallback className="bg-gradient-to-br from-primary/20 to-accent/20 text-sm font-semibold">
              {pr.author.initials}
            </AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full bg-green-500 border-2 border-background animate-pulse-slow" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-medium text-muted-foreground">
              #{pr.number}
            </span>
          </div>
          <h3 className="font-semibold text-sm leading-tight line-clamp-2 mb-1">
            {pr.title}
          </h3>
          <p className="text-xs text-primary font-medium">
            by {pr.author.name}
          </p>
        </div>
      </div>
      
      {/* Labels */}
      {pr.labels.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {pr.labels.map((label, idx) => (
            <Badge
              key={label}
              variant="secondary"
              className={cn(
                'text-xs px-2 py-0.5 animate-shimmer',
                'bg-gradient-to-r from-secondary via-secondary/80 to-secondary',
                'bg-[length:200%_100%]'
              )}
              style={{
                animationDelay: `${idx * 0.1}s`,
              }}
            >
              {label}
            </Badge>
          ))}
        </div>
      )}
      
      {/* Reviewers */}
      {pr.reviewers.length > 0 && (
        <div className="flex items-center gap-2 pt-3 border-t border-border/50">
          <span className="text-xs text-muted-foreground">Reviewers:</span>
          <div className="flex -space-x-2">
            {pr.reviewers.slice(0, 3).map((reviewer, idx) => (
              <Avatar
                key={reviewer.name}
                className="size-6 border-2 border-background shadow-sm transition-transform hover:scale-110 hover:z-10"
                style={{
                  zIndex: pr.reviewers.length - idx,
                }}
              >
                <AvatarImage src={reviewer.avatar} alt={reviewer.name} />
                <AvatarFallback className="bg-gradient-to-br from-accent/20 to-primary/20 text-[10px] font-semibold">
                  {reviewer.initials}
                </AvatarFallback>
              </Avatar>
            ))}
            {pr.reviewers.length > 3 && (
              <div className="size-6 rounded-full bg-muted border-2 border-background flex items-center justify-center shadow-sm">
                <span className="text-[10px] font-semibold text-muted-foreground">
                  +{pr.reviewers.length - 3}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </Card>
  );
}
