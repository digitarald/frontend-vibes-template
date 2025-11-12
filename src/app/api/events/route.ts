// SSE endpoint for real-time kanban board updates
import { NextRequest } from 'next/server';
import { db, simulateProgress, simulateAgentActivity } from '@/data/mock-database';
import { SSEEvent, TaskUpdate, AgentStatusUpdate, ProgressUpdate, StageTransitionUpdate } from '@/types/kanban';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      // Helper to send SSE formatted message
      const sendEvent = (event: SSEEvent) => {
        const data = `data: ${JSON.stringify(event)}\n\n`;
        controller.enqueue(encoder.encode(data));
      };

      // Send initial connection confirmation
      sendEvent({
        type: 'agent-status',
        data: {
          agentId: 'system',
          status: 'idle',
        } as AgentStatusUpdate,
        timestamp: Date.now(),
      });

      // Simulation interval - emit events every 2-3 seconds
      const intervalId = setInterval(() => {
        try {
          const tasks = db.getTasks();
          const agents = db.getAgents();

          // Simulate agent activity
          simulateAgentActivity();

          // Progress updates for in-progress tasks
          const inProgressTasks = tasks.filter(t => t.status === 'in-progress');
          inProgressTasks.forEach(task => {
            const previousProgress = task.progress;
            const previousChecklist = [...task.checklist];

            simulateProgress(task.id);
            const updatedTask = db.getTaskById(task.id);

            if (updatedTask) {
              // Send progress tick if progress changed
              if (updatedTask.progress !== previousProgress) {
                sendEvent({
                  type: 'progress-tick',
                  data: {
                    taskId: task.id,
                    progress: updatedTask.progress,
                  } as ProgressUpdate,
                  timestamp: Date.now(),
                });
              }

              // Check for checklist changes
              updatedTask.checklist.forEach((item, index) => {
                if (item.completed !== previousChecklist[index]?.completed) {
                  sendEvent({
                    type: 'progress-tick',
                    data: {
                      taskId: task.id,
                      progress: updatedTask.progress,
                      checklistItemId: item.id,
                      completed: item.completed,
                    } as ProgressUpdate,
                    timestamp: Date.now(),
                  });
                }
              });

              // Send stage transition if status changed
              if (updatedTask.status !== task.status) {
                sendEvent({
                  type: 'stage-transition',
                  data: {
                    taskId: task.id,
                    fromStatus: task.status,
                    toStatus: updatedTask.status,
                  } as StageTransitionUpdate,
                  timestamp: Date.now(),
                });

                // Update task with new status
                sendEvent({
                  type: 'task-update',
                  data: {
                    taskId: task.id,
                    updates: {
                      status: updatedTask.status,
                      progress: updatedTask.progress,
                      checklist: updatedTask.checklist,
                    },
                  } as TaskUpdate,
                  timestamp: Date.now(),
                });
              }
            }
          });

          // Send agent status updates
          agents.forEach(agent => {
            sendEvent({
              type: 'agent-status',
              data: {
                agentId: agent.id,
                status: agent.status,
                currentTask: agent.currentTask,
              } as AgentStatusUpdate,
              timestamp: Date.now(),
            });
          });

        } catch (error) {
          console.error('Error in SSE simulation:', error);
        }
      }, 2500); // 2.5 seconds

      // Cleanup on connection close
      request.signal.addEventListener('abort', () => {
        clearInterval(intervalId);
        controller.close();
      });
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}
