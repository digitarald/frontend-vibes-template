import { NextResponse } from 'next/server';
import { mockStore } from '../mock-store';

export async function GET() {
  try {
    const data = mockStore.getData();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching kanban data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch kanban data' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { taskId, status, checklistItemId, checklistCompleted } = body;

    if (!taskId) {
      return NextResponse.json(
        { error: 'taskId is required' },
        { status: 400 }
      );
    }

    let updatedTask;

    if (status) {
      // Update task status
      updatedTask = mockStore.updateTaskStatus(taskId, status);
    } else if (checklistItemId !== undefined) {
      // Update checklist item
      updatedTask = mockStore.updateChecklistItem(
        taskId,
        checklistItemId,
        checklistCompleted
      );
    } else {
      return NextResponse.json(
        { error: 'No valid update operation specified' },
        { status: 400 }
      );
    }

    if (!updatedTask) {
      return NextResponse.json(
        { error: 'Task not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      task: updatedTask,
      lastUpdated: Date.now(),
    });
  } catch (error) {
    console.error('Error updating task:', error);
    return NextResponse.json(
      { error: 'Failed to update task' },
      { status: 500 }
    );
  }
}
