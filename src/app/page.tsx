'use client';

import { useEffect, useState } from 'react';
import { PullRequest, mockPullRequests } from '@/data/pulls';
import { createSimulator } from '@/lib/pr-simulator';
import { KanbanColumnAnimated } from '@/components/layout/kanban-column-animated';

export default function Home() {
  const [pulls, setPulls] = useState<PullRequest[]>(mockPullRequests);
  const [movingPRIds, setMovingPRIds] = useState<Set<string>>(new Set());
  const [celebratingPRIds, setCelebratingPRIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const simulator = createSimulator(
      mockPullRequests,
      (state, changes) => {
        // Mark PRs as moving
        const movingIds = new Set(changes.map(c => c.pr.id));
        setMovingPRIds(movingIds);

        // Check for celebrations (PRs moving to completed)
        const celebratingIds = new Set(
          changes
            .filter(c => c.newStatus === 'completed')
            .map(c => c.pr.id)
        );
        setCelebratingPRIds(celebratingIds);

        // Update pulls after a brief delay for animation
        setTimeout(() => {
          setPulls(state.pulls);
          
          // Clear moving state after animation
          setTimeout(() => {
            setMovingPRIds(new Set());
          }, 700);

          // Clear celebration state after animation
          if (celebratingIds.size > 0) {
            setTimeout(() => {
              setCelebratingPRIds(new Set());
            }, 800);
          }
        }, 100);
      },
      15000 // Update every 15 seconds
    );

    simulator.start();

    return () => {
      simulator.stop();
    };
  }, []);

  return (
    <div className="min-h-screen py-8 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold tracking-tight mb-2 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
            🚀 Pull Request TV
          </h1>
          <p className="text-muted-foreground text-lg">
            Watch your PRs flow through the pipeline in real-time
          </p>
        </div>

        {/* Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-250px)]">
          <KanbanColumnAnimated
            title="📝 Draft"
            status="draft"
            pulls={pulls}
            gradientClass="bg-gradient-to-br from-slate-500 via-slate-600 to-slate-700"
            movingPRIds={movingPRIds}
          />
          
          <KanbanColumnAnimated
            title="👀 In Review"
            status="in_review"
            pulls={pulls}
            gradientClass="bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700"
            movingPRIds={movingPRIds}
          />
          
          <KanbanColumnAnimated
            title="✅ Completed"
            status="completed"
            pulls={pulls}
            gradientClass="bg-gradient-to-br from-emerald-500 via-green-600 to-teal-700"
            movingPRIds={movingPRIds}
            celebratingPRIds={celebratingPRIds}
          />
        </div>
      </div>
    </div>
  );
}

