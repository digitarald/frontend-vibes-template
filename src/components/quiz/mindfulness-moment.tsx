'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { type MindfulnessMoment } from '@/lib/quiz-data';

interface MindfulnessMomentProps {
  moment: MindfulnessMoment;
  onComplete: () => void;
  className?: string;
}

export function MindfulnessMomentComponent({ moment, onComplete, className }: MindfulnessMomentProps) {
  const [isActive, setIsActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(moment.duration);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!isActive || isComplete) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          setIsComplete(true);
          setIsActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, isComplete]);

  const startMoment = () => {
    setIsActive(true);
    setTimeRemaining(moment.duration);
    setIsComplete(false);
  };

  const skipMoment = () => {
    setIsActive(false);
    setIsComplete(true);
  };

  const getWaveAnimation = (delay: number = 0) => ({
    animation: `wave 3s ease-in-out infinite ${delay}s`,
    opacity: isActive ? 0.6 : 0.2
  });

  return (
    <div className={`relative flex flex-col items-center justify-center min-h-[400px] p-8 overflow-hidden ${className || ''}`}>
      {/* Animated background waves */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-blue-100/40 to-transparent"
          style={getWaveAnimation(0)}
        />
        <div 
          className="absolute bottom-4 left-0 w-full h-24 bg-gradient-to-t from-teal-100/30 to-transparent"
          style={getWaveAnimation(1)}
        />
        <div 
          className="absolute bottom-8 left-0 w-full h-16 bg-gradient-to-t from-blue-50/40 to-transparent"
          style={getWaveAnimation(2)}
        />
      </div>

      <style jsx>{`
        @keyframes wave {
          0%, 100% {
            transform: translateX(-10px) scaleY(1);
          }
          50% {
            transform: translateX(10px) scaleY(1.1);
          }
        }
      `}</style>

      <div className="relative z-10 text-center space-y-6 max-w-md">
        {/* Header */}
        <div className="space-y-2">
          <div className="text-2xl">🧘‍♀️</div>
          <h3 className="text-xl font-semibold text-foreground">{moment.title}</h3>
          {!isActive && !isComplete && (
            <p className="text-sm text-muted-foreground">
              Take a mindful moment to center yourself
            </p>
          )}
        </div>

        {/* Content */}
        {isActive && (
          <div className="space-y-4">
            <div className="relative">
              {/* Gentle pulsing circle during active mindfulness */}
              <div 
                className="mx-auto w-16 h-16 rounded-full bg-gradient-to-r from-blue-300/50 to-teal-300/50 flex items-center justify-center"
                style={{
                  animation: 'pulse 4s ease-in-out infinite',
                  boxShadow: '0 0 20px oklch(0.7 0.15 200 / 30%)'
                }}
              >
                <div className="text-lg font-medium text-blue-800">{timeRemaining}</div>
              </div>
            </div>
            
            <div className="space-y-3">
              <p className="text-base text-foreground leading-relaxed">
                {moment.content}
              </p>
              
              {moment.oceanSound && (
                <div className="text-xs text-blue-600 flex items-center justify-center gap-1">
                  <span>🌊</span>
                  <span>Imagine gentle ocean sounds...</span>
                </div>
              )}
            </div>
          </div>
        )}

        {isComplete && (
          <div className="space-y-4">
            <div className="text-green-600 font-medium flex items-center justify-center gap-2">
              <span>✨</span>
              <span>Mindful moment complete</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Take this sense of calm with you as you continue your diving journey.
            </p>
          </div>
        )}

        {/* Controls */}
        <div className="flex gap-3 justify-center">
          {!isActive && !isComplete && (
            <div className="flex gap-2">
              <Button 
                onClick={startMoment} 
                className="bg-blue-600 hover:bg-blue-700"
              >
                Begin Mindful Moment
              </Button>
              <Button 
                onClick={skipMoment} 
                variant="outline"
                className="text-muted-foreground"
              >
                Skip for Now
              </Button>
            </div>
          )}
          
          {isActive && (
            <Button 
              onClick={skipMoment} 
              variant="outline"
              className="text-muted-foreground"
            >
              I&apos;m Ready to Continue
            </Button>
          )}
          
          {isComplete && (
            <Button 
              onClick={onComplete} 
              className="bg-green-600 hover:bg-green-700"
            >
              Continue with Renewed Focus
            </Button>
          )}
        </div>

        {/* Progress bar during active moment */}
        {isActive && (
          <div className="w-full max-w-xs mx-auto">
            <div className="h-1 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-teal-500 transition-all duration-1000 ease-linear"
                style={{ 
                  width: `${((moment.duration - timeRemaining) / moment.duration) * 100}%` 
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Subtle ocean texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-gradient-to-br from-blue-500 via-teal-500 to-blue-600" />
    </div>
  );
}