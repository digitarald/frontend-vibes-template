'use server';

import { revalidatePath } from 'next/cache';
import { db } from '@/data/mock-database';
import { TaskStatus } from '@/types/kanban';

export async function moveTask(taskId: string, newStatus: TaskStatus) {
  const task = db.moveTask(taskId, newStatus);
  
  if (!task) {
    return { success: false, error: 'Task not found' };
  }

  revalidatePath('/');
  return { success: true, task };
}

export async function updateTaskProgress(taskId: string, progress: number) {
  const task = db.updateTaskProgress(taskId, progress);
  
  if (!task) {
    return { success: false, error: 'Task not found' };
  }

  revalidatePath('/');
  return { success: true, task };
}

export async function toggleChecklistItem(taskId: string, itemId: string, completed: boolean) {
  const task = db.updateChecklistItem(taskId, itemId, completed);
  
  if (!task) {
    return { success: false, error: 'Task not found' };
  }

  revalidatePath('/');
  return { success: true, task };
}

export async function updateTask(taskId: string, updates: Partial<{ title: string; description: string; priority: 'low' | 'medium' | 'high' }>) {
  const task = db.updateTask(taskId, updates);
  
  if (!task) {
    return { success: false, error: 'Task not found' };
  }

  revalidatePath('/');
  return { success: true, task };
}
