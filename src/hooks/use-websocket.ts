'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import type { ConnectionState, WebSocketMessage } from '@/types/kanban';

interface UseWebSocketOptions {
  url?: string;
  autoConnect?: boolean;
  reconnectInterval?: number;
  maxReconnectAttempts?: number;
  heartbeatInterval?: number;
  onMessage?: (message: WebSocketMessage) => void;
  onOpen?: () => void;
  onClose?: () => void;
  onError?: (error: Error) => void;
}

interface UseWebSocketReturn {
  connectionState: ConnectionState;
  sendMessage: (message: WebSocketMessage) => void;
  connect: () => void;
  disconnect: () => void;
}

export function useWebSocket(options: UseWebSocketOptions = {}): UseWebSocketReturn {
  const {
    // Note: These are unused in demo mode but would be used in real WebSocket implementation
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    url = '',
    autoConnect = true,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    reconnectInterval = 3000,
    maxReconnectAttempts = 5,
    heartbeatInterval = 30000,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onMessage,
    onOpen,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onClose,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onError,
  } = options;

  const [connectionState, setConnectionState] = useState<ConnectionState>({
    status: 'disconnected',
    reconnectAttempts: 0,
  });

  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>();
  const heartbeatIntervalRef = useRef<NodeJS.Timeout>();
  const messageQueueRef = useRef<WebSocketMessage[]>([]);
  const reconnectAttemptsRef = useRef(0);

  const clearTimers = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }
    if (heartbeatIntervalRef.current) {
      clearInterval(heartbeatIntervalRef.current);
    }
  }, []);

  const flushMessageQueue = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      while (messageQueueRef.current.length > 0) {
        const message = messageQueueRef.current.shift();
        if (message) {
          wsRef.current.send(JSON.stringify(message));
        }
      }
    }
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const startHeartbeat = useCallback(() => {
    clearTimers();
    heartbeatIntervalRef.current = setInterval(() => {
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify({ type: 'ping' }));
      }
    }, heartbeatInterval);
  }, [heartbeatInterval, clearTimers]);

  const connect = useCallback(() => {
    // For demo purposes, we don't actually connect to a WebSocket server
    // Instead, we simulate a connection state
    setConnectionState({
      status: 'connecting',
      reconnectAttempts: reconnectAttemptsRef.current,
    });

    // Simulate successful connection after a short delay
    setTimeout(() => {
      setConnectionState({
        status: 'connected',
        reconnectAttempts: 0,
      });
      reconnectAttemptsRef.current = 0;
      onOpen?.();
      flushMessageQueue();
    }, 500);

    // Note: In a real implementation, this would be:
    // if (wsRef.current?.readyState === WebSocket.OPEN) {
    //   return;
    // }
    // 
    // clearTimers();
    // 
    // try {
    //   const ws = new WebSocket(url);
    //   wsRef.current = ws;
    // 
    //   ws.onopen = () => {
    //     setConnectionState({
    //       status: 'connected',
    //       reconnectAttempts: 0,
    //     });
    //     reconnectAttemptsRef.current = 0;
    //     onOpen?.();
    //     startHeartbeat();
    //     flushMessageQueue();
    //   };
    // 
    //   ws.onmessage = (event) => {
    //     try {
    //       const message = JSON.parse(event.data) as WebSocketMessage;
    //       onMessage?.(message);
    //     } catch (error) {
    //       console.error('Failed to parse WebSocket message:', error);
    //     }
    //   };
    // 
    //   ws.onerror = (event) => {
    //     const error = new Error('WebSocket error');
    //     setConnectionState(prev => ({
    //       ...prev,
    //       status: 'error',
    //       error,
    //     }));
    //     onError?.(error);
    //   };
    // 
    //   ws.onclose = () => {
    //     clearTimers();
    //     setConnectionState(prev => ({
    //       ...prev,
    //       status: 'disconnected',
    //     }));
    //     onClose?.();
    // 
    //     // Auto-reconnect logic
    //     if (reconnectAttemptsRef.current < maxReconnectAttempts) {
    //       reconnectAttemptsRef.current += 1;
    //       reconnectTimeoutRef.current = setTimeout(() => {
    //         connect();
    //       }, reconnectInterval);
    //     }
    //   };
    // } catch (error) {
    //   const err = error instanceof Error ? error : new Error('Failed to create WebSocket');
    //   setConnectionState({
    //     status: 'error',
    //     error: err,
    //     reconnectAttempts: reconnectAttemptsRef.current,
    //   });
    //   onError?.(err);
    // }
  }, [onOpen, flushMessageQueue]);

  const disconnect = useCallback(() => {
    clearTimers();
    reconnectAttemptsRef.current = maxReconnectAttempts; // Prevent auto-reconnect
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    setConnectionState({
      status: 'disconnected',
      reconnectAttempts: 0,
    });
  }, [clearTimers, maxReconnectAttempts]);

  const sendMessage = useCallback((message: WebSocketMessage) => {
    // For demo, we just queue messages (in real implementation, we'd send them)
    if (connectionState.status === 'connected') {
      // In real implementation: wsRef.current?.send(JSON.stringify(message));
      console.log('Sending message:', message);
    } else {
      // Queue message for later
      messageQueueRef.current.push(message);
    }
  }, [connectionState.status]);

  useEffect(() => {
    if (autoConnect) {
      connect();
    }

    return () => {
      clearTimers();
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [autoConnect, connect, clearTimers]);

  return {
    connectionState,
    sendMessage,
    connect,
    disconnect,
  };
}
