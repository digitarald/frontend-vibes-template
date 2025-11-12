'use client';

import { useEffect, useState } from 'react';
import { SSEEvent } from '@/types/kanban';

interface UseSSEOptions {
  onEvent?: (event: SSEEvent) => void;
  onError?: (error: Event) => void;
  enabled?: boolean;
}

export function useSSE({ onEvent, onError, enabled = true }: UseSSEOptions = {}) {
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) {
      setIsConnected(false);
      return;
    }

    let eventSource: EventSource | null = null;

    const connect = () => {
      try {
        eventSource = new EventSource('/api/events');

        eventSource.onopen = () => {
          setIsConnected(true);
          setError(null);
        };

        eventSource.onmessage = (event) => {
          try {
            const sseEvent: SSEEvent = JSON.parse(event.data);
            onEvent?.(sseEvent);
          } catch (err) {
            console.error('Failed to parse SSE event:', err);
          }
        };

        eventSource.onerror = (err) => {
          console.error('SSE error:', err);
          setIsConnected(false);
          setError('Connection error');
          onError?.(err);
          eventSource?.close();
        };
      } catch (err) {
        console.error('Failed to create EventSource:', err);
        setError('Failed to connect');
      }
    };

    connect();

    return () => {
      if (eventSource) {
        eventSource.close();
        setIsConnected(false);
      }
    };
  }, [enabled, onEvent, onError]);

  return { isConnected, error };
}
