'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, ArrowUp, ArrowDown, Hand } from 'lucide-react';

interface GestureTutorialProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GestureTutorial({ isOpen, onClose }: GestureTutorialProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Hand className="h-5 w-5" />
            Gesture Guide
          </DialogTitle>
          <DialogDescription>
            Master these swipe gestures to navigate your kanban board efficiently
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
            <div className="p-2 bg-background rounded-md">
              <ArrowLeft className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm">Swipe Left</p>
              <p className="text-xs text-muted-foreground">
                Navigate to previous task in current stage
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
            <div className="p-2 bg-background rounded-md">
              <ArrowRight className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm">Swipe Right</p>
              <p className="text-xs text-muted-foreground">
                Navigate to next task in current stage
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
            <div className="p-2 bg-background rounded-md">
              <ArrowUp className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm">Swipe Up / Tap</p>
              <p className="text-xs text-muted-foreground">
                Open full task details with all information
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
            <div className="p-2 bg-background rounded-md">
              <ArrowDown className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm">Swipe Down</p>
              <p className="text-xs text-muted-foreground">
                Move task to next stage (in detail view)
              </p>
            </div>
          </div>

          <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
            <p className="text-xs text-muted-foreground">
              💡 <strong>Tip:</strong> Use the tabs at the bottom to switch between stages quickly
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={onClose} className="w-full">
            Got it!
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function useGestureTutorial() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user has seen the tutorial before
    const hasSeenTutorial = localStorage.getItem('kanban-tutorial-seen');
    if (!hasSeenTutorial) {
      // Show tutorial after a brief delay
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('kanban-tutorial-seen', 'true');
  };

  return { isOpen, onClose: handleClose, showTutorial: () => setIsOpen(true) };
}
