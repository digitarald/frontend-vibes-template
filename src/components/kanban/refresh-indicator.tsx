'use client';

import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { RefreshCw } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface RefreshIndicatorProps {
  isVisible: boolean;
  interval: number;
  lastUpdated: number;
}

export function RefreshIndicator({ isVisible, interval, lastUpdated }: RefreshIndicatorProps) {
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    const updateTimeAgo = () => {
      setTimeAgo(formatDistanceToNow(lastUpdated, { addSuffix: true }));
    };

    updateTimeAgo();
    const timer = setInterval(updateTimeAgo, 1000);

    return () => clearInterval(timer);
  }, [lastUpdated]);

  const getStatusColor = () => {
    if (!isVisible) return 'bg-muted';
    if (interval <= 2000) return 'bg-chart-2';
    return 'bg-chart-4';
  };

  const getStatusText = () => {
    if (!isVisible) return 'Paused (tab hidden)';
    if (interval <= 2000) return 'Active polling';
    return 'Idle polling';
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge variant="outline" className="gap-2 cursor-help">
            <div className="relative">
              <RefreshCw
                className={`h-3 w-3 ${isVisible ? 'animate-spin-slow' : ''}`}
              />
              <span
                className={`absolute -top-1 -right-1 h-2 w-2 rounded-full ${getStatusColor()} ${
                  isVisible ? 'animate-pulse' : ''
                }`}
              />
            </div>
            <span className="text-xs">{timeAgo}</span>
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <div className="text-xs space-y-1">
            <p className="font-medium">{getStatusText()}</p>
            <p className="text-muted-foreground">
              {isVisible ? `Refreshing every ${interval / 1000}s` : 'Polling paused'}
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
