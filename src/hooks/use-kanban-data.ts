import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { KanbanData } from '@/types/kanban';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface UseKanbanDataOptions {
  enablePolling?: boolean;
}

export function useKanbanData(options: UseKanbanDataOptions = {}) {
  const { enablePolling = true } = options;
  const [isTabVisible, setIsTabVisible] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(2000);

  // Handle tab visibility changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabVisible(!document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Fetch kanban data with SWR
  const { data, error, isLoading, mutate } = useSWR<KanbanData>(
    '/api/kanban',
    fetcher,
    {
      refreshInterval: enablePolling && isTabVisible ? refreshInterval : 0,
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      dedupingInterval: 1000,
    }
  );

  // Smart polling: adjust interval based on task states
  useEffect(() => {
    if (!data) return;

    const hasRunningTasks = data.tasks.some(
      (task) => task.status === 'in-progress'
    );

    // Faster polling when tasks are running, slower when idle
    setRefreshInterval(hasRunningTasks ? 2000 : 10000);
  }, [data]);

  // Optimistic update for task status
  const updateTaskStatus = async (
    taskId: string,
    newStatus: 'todo' | 'in-progress' | 'completed'
  ) => {
    if (!data) return;

    // Optimistic update
    const optimisticData: KanbanData = {
      ...data,
      tasks: data.tasks.map((task) =>
        task.id === taskId
          ? { ...task, status: newStatus, updatedAt: Date.now() }
          : task
      ),
      lastUpdated: Date.now(),
    };

    // Update UI immediately with rollback on error
    await mutate(
      async () => {
        const response = await fetch('/api/kanban', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ taskId, status: newStatus }),
        });

        if (!response.ok) {
          throw new Error('Failed to update task status');
        }

        const result = await response.json();
        
        // Return updated full data
        return {
          ...data,
          tasks: data.tasks.map((task) =>
            task.id === taskId ? result.task : task
          ),
          lastUpdated: result.lastUpdated,
        };
      },
      {
        optimisticData,
        rollbackOnError: true,
        revalidate: false,
      }
    );
  };

  // Optimistic update for checklist item
  const updateChecklistItem = async (
    taskId: string,
    itemId: string,
    completed: boolean
  ) => {
    if (!data) return;

    // Optimistic update
    const optimisticData: KanbanData = {
      ...data,
      tasks: data.tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              checklist: task.checklist.map((item) =>
                item.id === itemId ? { ...item, completed } : item
              ),
              updatedAt: Date.now(),
            }
          : task
      ),
      lastUpdated: Date.now(),
    };

    // Update UI immediately with rollback on error
    await mutate(
      async () => {
        const response = await fetch('/api/kanban', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            taskId,
            checklistItemId: itemId,
            checklistCompleted: completed,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to update checklist item');
        }

        const result = await response.json();

        // Return updated full data
        return {
          ...data,
          tasks: data.tasks.map((task) =>
            task.id === taskId ? result.task : task
          ),
          lastUpdated: result.lastUpdated,
        };
      },
      {
        optimisticData,
        rollbackOnError: true,
        revalidate: false,
      }
    );
  };

  return {
    data,
    error,
    isLoading,
    isTabVisible,
    refreshInterval,
    updateTaskStatus,
    updateChecklistItem,
    refresh: mutate,
  };
}
