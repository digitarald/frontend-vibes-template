'use client';

import { useState, useCallback } from 'react';
import { ChecklistItem } from '@/types/kanban';
import { SSEEvent, ProgressUpdate } from '@/types/kanban';
import { useSSE } from '@/hooks/use-sse';
import { Checkbox } from '@/components/ui/checkbox';
import { toggleChecklistItem } from '@/app/actions/tasks';

interface ProgressChecklistLiveProps {
  taskId: string;
  initialChecklist: ChecklistItem[];
}

export function ProgressChecklistLive({ taskId, initialChecklist }: ProgressChecklistLiveProps) {
  const [checklist, setChecklist] = useState<ChecklistItem[]>(initialChecklist);

  const handleSSEEvent = useCallback((event: SSEEvent) => {
    if (event.type === 'progress-tick') {
      const data = event.data as ProgressUpdate;
      if (data.taskId === taskId && data.checklistItemId && data.completed !== undefined) {
        setChecklist(prev =>
          prev.map(item =>
            item.id === data.checklistItemId
              ? { ...item, completed: data.completed! }
              : item
          )
        );
      }
    }
  }, [taskId]);

  useSSE({ onEvent: handleSSEEvent });

  const handleToggle = async (itemId: string, completed: boolean) => {
    // Optimistic update
    setChecklist(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, completed } : item
      )
    );

    // Server update
    const result = await toggleChecklistItem(taskId, itemId, completed);
    if (!result.success) {
      // Revert on error
      setChecklist(prev =>
        prev.map(item =>
          item.id === itemId ? { ...item, completed: !completed } : item
        )
      );
    }
  };

  if (checklist.length === 0) return null;

  const completedCount = checklist.filter(item => item.completed).length;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Checklist</span>
        <span className="text-xs text-muted-foreground">
          {completedCount}/{checklist.length}
        </span>
      </div>
      <div className="space-y-2">
        {checklist.map((item) => (
          <div key={item.id} className="flex items-center space-x-2">
            <Checkbox
              id={`${taskId}-${item.id}`}
              checked={item.completed}
              onCheckedChange={(checked) => handleToggle(item.id, checked as boolean)}
            />
            <label
              htmlFor={`${taskId}-${item.id}`}
              className={`text-sm flex-1 cursor-pointer ${
                item.completed ? 'line-through text-muted-foreground' : ''
              }`}
            >
              {item.text}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
