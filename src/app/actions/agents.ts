'use server';

import { revalidatePath } from 'next/cache';
import { db } from '@/data/mock-database';
import { AgentStatus } from '@/types/kanban';

export async function updateAgentStatus(agentId: string, status: AgentStatus) {
  const agent = db.updateAgentStatus(agentId, status);
  
  if (!agent) {
    return { success: false, error: 'Agent not found' };
  }

  revalidatePath('/');
  return { success: true, agent };
}

export async function pauseAgent(agentId: string) {
  return updateAgentStatus(agentId, 'paused');
}

export async function resumeAgent(agentId: string) {
  const agent = db.getAgentById(agentId);
  if (!agent) {
    return { success: false, error: 'Agent not found' };
  }

  const newStatus = agent.currentTask ? 'working' : 'idle';
  return updateAgentStatus(agentId, newStatus);
}

export async function resolveBlock(taskId: string) {
  const task = db.updateTask(taskId, {
    status: 'in-progress',
    blockReason: undefined,
  });
  
  if (!task) {
    return { success: false, error: 'Task not found' };
  }

  // Update agent status if assigned
  if (task.assignedAgent) {
    db.updateAgentStatus(task.assignedAgent, 'working', taskId);
  }

  revalidatePath('/');
  return { success: true, task };
}
