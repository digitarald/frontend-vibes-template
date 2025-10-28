"use client";

import { useEffect, useState } from "react";
import { PRCardMinimal } from "./pr-card-minimal";
import { PullRequest } from "@/data/pulls";

interface KanbanColumnProps {
  title: string;
  prs: PullRequest[];
}

export function KanbanColumn({ title, prs }: KanbanColumnProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 4;

  useEffect(() => {
    if (prs.length <= itemsPerView) return; // No need to scroll if all items fit

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = prev + 1;
        // Loop back to start when reaching the end
        return next >= prs.length ? 0 : next;
      });
    }, 8000); // Auto-scroll every 8 seconds

    return () => clearInterval(interval);
  }, [prs.length]);

  // Calculate visible PRs using modulo arithmetic for efficient circular access
  const visiblePRs = prs.length <= itemsPerView
    ? prs
    : Array.from({ length: itemsPerView }, (_, i) => 
        prs[(currentIndex + i) % prs.length]
      );

  return (
    <div className="flex flex-col h-full border-r border-border/20 last:border-r-0">
      <div className="px-8 py-10 border-b border-border/20">
        <h2 className="text-4xl font-bold text-center tracking-tight">
          {title}
        </h2>
        <p className="text-center text-xl text-muted-foreground mt-3">
          {prs.length} {prs.length === 1 ? 'PR' : 'PRs'}
        </p>
      </div>
      
      <div className="flex-1 overflow-hidden px-8 py-8">
        <div className="space-y-6 transition-opacity duration-500">
          {visiblePRs.map((pr, idx) => (
            <PRCardMinimal key={`${pr.id}-${currentIndex}-${idx}`} pr={pr} />
          ))}
        </div>
      </div>
    </div>
  );
}
