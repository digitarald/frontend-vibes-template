'use client';

import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { type ConfidenceMetric } from '@/lib/quiz-data';

interface ConfidenceMeterProps {
  metrics: ConfidenceMetric[];
  overallScore: number;
  className?: string;
}

export function ConfidenceMeter({ metrics, overallScore, className }: ConfidenceMeterProps) {
  return (
    <div className={`space-y-6 ${className || ''}`}>
      {/* Overall Confidence Score */}
      <div className="text-center space-y-4">
        <div className="relative">
          <div 
            className="mx-auto w-32 h-32 rounded-full border-8 flex items-center justify-center"
            style={{
              borderColor: `oklch(${0.6 + (overallScore * 0.3 / 100)} 0.15 ${180 + (overallScore * 0.6)})`,
              background: `conic-gradient(from 0deg, oklch(${0.6 + (overallScore * 0.3 / 100)} 0.15 ${180 + (overallScore * 0.6)}) ${overallScore * 3.6}deg, oklch(0.9 0.05 200) ${overallScore * 3.6}deg)`
            }}
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">{overallScore}%</div>
              <div className="text-sm text-muted-foreground">Confidence</div>
            </div>
          </div>
          
          {/* Floating confidence indicators */}
          <div className="absolute -top-2 -right-2">
            {overallScore >= 70 ? (
              <Badge variant="default" className="bg-green-500/20 text-green-700 border-green-300">
                🌊 Ready to Dive
              </Badge>
            ) : overallScore >= 50 ? (
              <Badge variant="secondary" className="bg-blue-500/20 text-blue-700 border-blue-300">
                🐠 Building Confidence
              </Badge>
            ) : (
              <Badge variant="outline" className="bg-yellow-500/20 text-yellow-700 border-yellow-300">
                🌅 Getting Started
              </Badge>
            )}
          </div>
        </div>
        
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">Your Diving Confidence</h3>
          <p className="text-sm text-muted-foreground">
            {overallScore >= 70 
              ? "You're developing strong confidence! Keep building on this foundation."
              : overallScore >= 50
              ? "Great progress! Your confidence is growing with each step."
              : "Every journey begins with a single step. You're on your way!"
            }
          </p>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="space-y-4">
        <h4 className="font-medium text-center">Confidence Areas</h4>
        <div className="grid gap-4">
          {metrics.map((metric) => (
            <div key={metric.category} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{metric.category}</span>
                <span className="text-sm text-muted-foreground">{metric.current}%</span>
              </div>
              <Progress 
                value={metric.current} 
                className="h-2"
                style={{
                  '--progress-bg': 'oklch(0.95 0.05 200)',
                  '--progress-indicator': metric.color
                } as React.CSSProperties}
              />
              
              {/* Confidence level description */}
              <div className="text-xs text-muted-foreground">
                {metric.current >= 80 ? '🏆 Excellent confidence' :
                 metric.current >= 60 ? '⭐ Good progress' :
                 metric.current >= 40 ? '🌱 Growing steadily' :
                 '🌅 Building foundation'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Encouraging message */}
      <div className="text-center p-4 rounded-lg bg-blue-50/50 border border-blue-200/50">
        <p className="text-sm text-blue-800">
          🌊 <strong>Remember:</strong> Confidence grows with practice and experience. 
          You&apos;re exactly where you need to be in your diving journey!
        </p>
      </div>
    </div>
  );
}