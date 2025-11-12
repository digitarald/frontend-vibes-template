'use client';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TimeFilterType } from './types';

interface TimeRangeSelectorProps {
  value: TimeFilterType;
  onChange: (value: TimeFilterType) => void;
  eventCounts?: {
    live: number;
    today: number;
    week: number;
    month: number;
  };
}

export function TimeRangeSelector({ value, onChange, eventCounts }: TimeRangeSelectorProps) {
  return (
    <Tabs value={value} onValueChange={(v) => onChange(v as TimeFilterType)}>
      <TabsList>
        <TabsTrigger value="live">
          Live {eventCounts?.live ? `(${eventCounts.live})` : ''}
        </TabsTrigger>
        <TabsTrigger value="today">
          Today {eventCounts?.today ? `(${eventCounts.today})` : ''}
        </TabsTrigger>
        <TabsTrigger value="week">
          This Week {eventCounts?.week ? `(${eventCounts.week})` : ''}
        </TabsTrigger>
        <TabsTrigger value="month">
          All Time {eventCounts?.month ? `(${eventCounts.month})` : ''}
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
