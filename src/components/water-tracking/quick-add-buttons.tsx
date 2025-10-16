/**
 * Quick add water buttons component
 * Allows fast logging of common water container sizes
 */

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Droplet, Plus } from 'lucide-react';
import { QuickAddOption } from '@/types/water-tracking';

interface QuickAddButtonsProps {
  options: QuickAddOption[];
  onAdd: (amount: number) => void;
}

export function QuickAddButtons({ options, onAdd }: QuickAddButtonsProps) {
  const [lastAdded, setLastAdded] = useState<string | null>(null);

  const handleAdd = (option: QuickAddOption) => {
    onAdd(option.amount);
    setLastAdded(option.id);
    setTimeout(() => setLastAdded(null), 500);
  };

  return (
    <Card className="p-4">
      <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
        Quick Add Water
      </h3>
      <div className="grid grid-cols-3 gap-2 mb-3">
        {options.map((option) => (
          <Button
            key={option.id}
            variant={lastAdded === option.id ? 'default' : 'outline'}
            onClick={() => handleAdd(option)}
            className="flex flex-col items-center gap-1 h-auto py-3"
          >
            <Droplet className="w-4 h-4" />
            <span className="text-xs font-medium">{option.label}</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {option.amount} ml
            </span>
          </Button>
        ))}
      </div>

      <Button variant="secondary" className="w-full" size="sm">
        <Plus className="w-4 h-4 mr-2" />
        Custom Amount
      </Button>
    </Card>
  );
}
