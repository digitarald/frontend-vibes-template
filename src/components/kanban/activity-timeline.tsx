'use client';

import { useState, useEffect, useRef } from 'react';
import { TimelineEvent, TimeFilterType } from './types';
import { TimelineItem } from './timeline-item';
import { TimeRangeSelector } from './time-range-selector';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { isToday, isThisWeek, isThisMonth } from 'date-fns';

interface ActivityTimelineProps {
  events: TimelineEvent[];
  selectedEventId?: string;
  onEventSelect?: (event: TimelineEvent) => void;
  autoScroll?: boolean;
}

export function ActivityTimeline({ 
  events, 
  selectedEventId, 
  onEventSelect,
  autoScroll = false 
}: ActivityTimelineProps) {
  const [timeFilter, setTimeFilter] = useState<TimeFilterType>('live');
  const [hasNewActivity, setHasNewActivity] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Filter events based on time range
  const filteredEvents = events.filter(event => {
    const eventDate = event.timestamp;
    switch (timeFilter) {
      case 'today':
        return isToday(eventDate);
      case 'week':
        return isThisWeek(eventDate);
      case 'month':
        return isThisMonth(eventDate);
      case 'live':
      default:
        return true;
    }
  });

  // Calculate event counts for each time range
  const eventCounts = {
    live: events.length,
    today: events.filter(e => isToday(e.timestamp)).length,
    week: events.filter(e => isThisWeek(e.timestamp)).length,
    month: events.filter(e => isThisMonth(e.timestamp)).length,
  };

  // Auto-scroll to bottom in live mode
  useEffect(() => {
    if (autoScroll && timeFilter === 'live' && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
      setHasNewActivity(false);
    }
  }, [events.length, autoScroll, timeFilter]);

  // Detect new activity
  useEffect(() => {
    if (timeFilter === 'live' && events.length > 0) {
      setHasNewActivity(true);
    }
  }, [events.length, timeFilter]);

  return (
    <div className="flex flex-col h-full">
      {/* Header with time filter */}
      <div className="flex items-center justify-between mb-4 pb-4 border-b">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">Activity Timeline</h2>
          {hasNewActivity && timeFilter === 'live' && (
            <Badge variant="default" className="animate-pulse">
              New Activity
            </Badge>
          )}
        </div>
        <TimeRangeSelector 
          value={timeFilter} 
          onChange={setTimeFilter}
          eventCounts={eventCounts}
        />
      </div>

      {/* Timeline events */}
      <ScrollArea className="flex-1 pr-4" ref={scrollRef}>
        <div className="space-y-0">
          {filteredEvents.length === 0 ? (
            <div className="flex items-center justify-center h-32 text-muted-foreground">
              No events in this time range
            </div>
          ) : (
            filteredEvents.map((event) => (
              <TimelineItem
                key={event.id}
                event={event}
                isSelected={event.id === selectedEventId}
                onClick={() => onEventSelect?.(event)}
              />
            ))
          )}
          <div ref={bottomRef} />
        </div>
      </ScrollArea>

      {/* Event count */}
      <div className="mt-4 pt-4 border-t text-sm text-muted-foreground">
        Showing {filteredEvents.length} of {events.length} events
      </div>
    </div>
  );
}
