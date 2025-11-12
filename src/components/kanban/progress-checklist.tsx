'use client';

import { useState } from 'react';
import { ChecklistItem } from '@/types/kanban';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface ProgressChecklistProps {
  checklist: ChecklistItem[];
  taskId: string;
  onUpdateItem: (taskId: string, itemId: string, completed: boolean) => Promise<void>;
}

export function ProgressChecklist({ checklist, taskId, onUpdateItem }: ProgressChecklistProps) {
  const [updatingItems, setUpdatingItems] = useState<Set<string>>(new Set());

  const handleCheckboxChange = async (itemId: string, completed: boolean) => {
    setUpdatingItems((prev) => new Set(prev).add(itemId));
    try {
      await onUpdateItem(taskId, itemId, completed);
    } finally {
      setUpdatingItems((prev) => {
        const next = new Set(prev);
        next.delete(itemId);
        return next;
      });
    }
  };

  const completedCount = checklist.filter((item) => item.completed).length;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium">Checklist</h4>
        <span className="text-xs text-muted-foreground">
          {completedCount} / {checklist.length}
        </span>
      </div>
      <div className="space-y-2">
        {checklist.map((item) => {
          const isUpdating = updatingItems.has(item.id);
          return (
            <div
              key={item.id}
              className={`flex items-center space-x-2 transition-opacity ${
                isUpdating ? 'opacity-50' : 'opacity-100'
              }`}
            >
              <Checkbox
                id={item.id}
                checked={item.completed}
                onCheckedChange={(checked) =>
                  handleCheckboxChange(item.id, checked as boolean)
                }
                disabled={isUpdating}
              />
              <Label
                htmlFor={item.id}
                className={`text-sm flex-1 cursor-pointer ${
                  item.completed ? 'line-through text-muted-foreground' : ''
                }`}
              >
                {item.text}
              </Label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
