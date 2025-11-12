'use client';

import { useEffect, useRef, useState } from 'react';

export interface SwipeHandlers {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onSwipeMove?: (deltaX: number, deltaY: number) => void;
  onSwipeEnd?: () => void;
}

export interface SwipeConfig {
  threshold?: number; // minimum distance for swipe (px)
  velocityThreshold?: number; // minimum velocity (px/s)
  preventDefaultTouchmoveEvent?: boolean;
}

export interface SwipeState {
  isSwiping: boolean;
  direction: 'left' | 'right' | 'up' | 'down' | null;
  deltaX: number;
  deltaY: number;
  velocity: number;
}

export function useSwipe(
  handlers: SwipeHandlers,
  config: SwipeConfig = {}
) {
  const {
    threshold = 50,
    velocityThreshold = 0.3,
    preventDefaultTouchmoveEvent = false,
  } = config;

  const [swipeState, setSwipeState] = useState<SwipeState>({
    isSwiping: false,
    direction: null,
    deltaX: 0,
    deltaY: 0,
    velocity: 0,
  });

  const startX = useRef(0);
  const startY = useRef(0);
  const startTime = useRef(0);
  const currentX = useRef(0);
  const currentY = useRef(0);

  const handleTouchStart = (e: TouchEvent) => {
    const touch = e.touches[0];
    startX.current = touch.clientX;
    startY.current = touch.clientY;
    startTime.current = Date.now();
    currentX.current = touch.clientX;
    currentY.current = touch.clientY;

    setSwipeState({
      isSwiping: true,
      direction: null,
      deltaX: 0,
      deltaY: 0,
      velocity: 0,
    });
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (preventDefaultTouchmoveEvent) {
      e.preventDefault();
    }

    const touch = e.touches[0];
    currentX.current = touch.clientX;
    currentY.current = touch.clientY;

    const deltaX = touch.clientX - startX.current;
    const deltaY = touch.clientY - startY.current;

    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);

    let direction: 'left' | 'right' | 'up' | 'down' | null = null;

    if (absDeltaX > absDeltaY && absDeltaX > 10) {
      direction = deltaX > 0 ? 'right' : 'left';
    } else if (absDeltaY > absDeltaX && absDeltaY > 10) {
      direction = deltaY > 0 ? 'down' : 'up';
    }

    setSwipeState({
      isSwiping: true,
      direction,
      deltaX,
      deltaY,
      velocity: 0,
    });

    handlers.onSwipeMove?.(deltaX, deltaY);
  };

  const handleTouchEnd = () => {
    const deltaX = currentX.current - startX.current;
    const deltaY = currentY.current - startY.current;
    const deltaTime = Date.now() - startTime.current;
    const velocity = Math.sqrt(deltaX ** 2 + deltaY ** 2) / deltaTime;

    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);

    setSwipeState(prev => ({
      ...prev,
      isSwiping: false,
      velocity,
    }));

    // Determine if swipe threshold was met
    const isValidSwipe = 
      (absDeltaX > threshold || absDeltaY > threshold) ||
      velocity > velocityThreshold;

    if (isValidSwipe) {
      // Determine direction
      if (absDeltaX > absDeltaY) {
        // Horizontal swipe
        if (deltaX > 0) {
          handlers.onSwipeRight?.();
        } else {
          handlers.onSwipeLeft?.();
        }
      } else {
        // Vertical swipe
        if (deltaY > 0) {
          handlers.onSwipeDown?.();
        } else {
          handlers.onSwipeUp?.();
        }
      }
    }

    handlers.onSwipeEnd?.();

    // Reset state after a delay
    setTimeout(() => {
      setSwipeState({
        isSwiping: false,
        direction: null,
        deltaX: 0,
        deltaY: 0,
        velocity: 0,
      });
    }, 300);
  };

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const touchStartHandler = (e: TouchEvent) => handleTouchStart(e);
    const touchMoveHandler = (e: TouchEvent) => handleTouchMove(e);
    const touchEndHandler = () => handleTouchEnd();

    element.addEventListener('touchstart', touchStartHandler, { passive: true });
    element.addEventListener('touchmove', touchMoveHandler, { 
      passive: !preventDefaultTouchmoveEvent 
    });
    element.addEventListener('touchend', touchEndHandler, { passive: true });

    return () => {
      element.removeEventListener('touchstart', touchStartHandler);
      element.removeEventListener('touchmove', touchMoveHandler);
      element.removeEventListener('touchend', touchEndHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preventDefaultTouchmoveEvent]);

  return { ref, swipeState };
}
