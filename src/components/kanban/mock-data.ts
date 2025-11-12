import { Task, TimelineEvent, Agent, Stage } from './types';

// Mock agents
export const mockAgents: Agent[] = [
  {
    id: 'agent-1',
    name: 'Claude',
    avatar: '🤖',
    color: 'oklch(0.68 0.28 320)',
    status: 'active',
  },
  {
    id: 'agent-2',
    name: 'Copilot',
    avatar: '👨‍💻',
    color: 'oklch(0.72 0.25 180)',
    status: 'active',
  },
  {
    id: 'agent-3',
    name: 'Gemini',
    avatar: '✨',
    color: 'oklch(0.58 0.30 90)',
    status: 'idle',
  },
  {
    id: 'agent-4',
    name: 'GPT-4',
    avatar: '🧠',
    color: 'oklch(0.75 0.22 240)',
    status: 'active',
  },
];

// Helper to generate task IDs
let taskIdCounter = 1;
const generateTaskId = () => `task-${taskIdCounter++}`;

// Helper to generate event IDs
let eventIdCounter = 1;
const generateEventId = () => `event-${eventIdCounter++}`;

// Base time (3 hours ago)
const baseTime = new Date(Date.now() - 3 * 60 * 60 * 1000);

// Generate mock tasks
const generateTasks = (): Task[] => {
  const tasks: Task[] = [];
  const taskTitles = [
    'Implement user authentication',
    'Design landing page',
    'Fix database migration bug',
    'Add API rate limiting',
    'Update documentation',
    'Refactor payment service',
    'Optimize image loading',
    'Setup CI/CD pipeline',
  ];

  taskTitles.forEach((title, index) => {
    const stages: Stage[] = ['backlog', 'planning', 'in-progress', 'review', 'blocked', 'completed', 'failed'];
    const stageIndex = Math.min(index, stages.length - 1);
    
    tasks.push({
      id: generateTaskId(),
      title,
      description: `Description for ${title}`,
      stage: stages[stageIndex],
      agent: mockAgents[index % mockAgents.length],
      createdAt: new Date(baseTime.getTime() + index * 10 * 60 * 1000),
      updatedAt: new Date(baseTime.getTime() + (index + 1) * 15 * 60 * 1000),
      progress: {
        completed: Math.min(index + 2, 8),
        total: 8,
      },
      priority: ['high', 'medium', 'critical', 'low', 'medium', 'high', 'low', 'medium'][index] as 'low' | 'medium' | 'high' | 'critical',
      tags: [['frontend', 'react'], ['design', 'ui'], ['backend', 'bug'], ['api', 'security'], 
             ['docs'], ['backend', 'refactor'], ['performance', 'frontend'], ['devops', 'ci']][index],
    });
  });

  return tasks;
};

export const mockTasks = generateTasks();

// Generate comprehensive timeline events
export const generateTimelineEvents = (): TimelineEvent[] => {
  const events: TimelineEvent[] = [];

  mockTasks.forEach((task) => {
    const taskStartTime = task.createdAt.getTime();
    
    // Task created event
    events.push({
      id: generateEventId(),
      timestamp: new Date(taskStartTime),
      type: 'task_created',
      task,
      description: `Created task: ${task.title}`,
    });

    // Agent assigned
    if (task.agent) {
      events.push({
        id: generateEventId(),
        timestamp: new Date(taskStartTime + 2 * 60 * 1000),
        type: 'agent_assigned',
        agent: task.agent,
        task,
        description: `${task.agent.name} assigned to task`,
      });
    }

    // Stage: Planning
    if (['planning', 'in-progress', 'review', 'blocked', 'completed'].includes(task.stage)) {
      events.push({
        id: generateEventId(),
        timestamp: new Date(taskStartTime + 5 * 60 * 1000),
        type: 'stage_changed',
        agent: task.agent,
        task,
        description: `Moved to Planning`,
        metadata: { fromStage: 'backlog', toStage: 'planning' },
      });

      events.push({
        id: generateEventId(),
        timestamp: new Date(taskStartTime + 8 * 60 * 1000),
        type: 'agent_comment',
        agent: task.agent,
        task,
        description: `${task.agent?.name}: Analyzing requirements and planning approach`,
      });
    }

    // Stage: In Progress
    if (['in-progress', 'review', 'blocked', 'completed'].includes(task.stage)) {
      events.push({
        id: generateEventId(),
        timestamp: new Date(taskStartTime + 12 * 60 * 1000),
        type: 'task_started',
        agent: task.agent,
        task,
        description: `Started working on task`,
      });

      events.push({
        id: generateEventId(),
        timestamp: new Date(taskStartTime + 15 * 60 * 1000),
        type: 'stage_changed',
        agent: task.agent,
        task,
        description: `Moved to In Progress`,
        metadata: { fromStage: 'planning', toStage: 'in-progress' },
      });

      // Multiple step completions
      for (let i = 1; i <= Math.min(task.progress.completed, 5); i++) {
        events.push({
          id: generateEventId(),
          timestamp: new Date(taskStartTime + (15 + i * 8) * 60 * 1000),
          type: 'step_completed',
          agent: task.agent,
          task,
          description: `Completed step ${i}/${task.progress.total}`,
          metadata: { stepCompleted: `Step ${i}` },
        });
      }

      // CI events
      events.push({
        id: generateEventId(),
        timestamp: new Date(taskStartTime + 60 * 60 * 1000),
        type: 'ci_started',
        task,
        description: `CI/CD pipeline started`,
        metadata: { ciStatus: 'pending' },
      });

      if (task.stage !== 'failed' && task.stage !== 'blocked') {
        events.push({
          id: generateEventId(),
          timestamp: new Date(taskStartTime + 65 * 60 * 1000),
          type: 'ci_passed',
          task,
          description: `All checks passed ✓`,
          metadata: { ciStatus: 'passed' },
        });
      }
    }

    // Stage: Review
    if (['review', 'completed'].includes(task.stage)) {
      events.push({
        id: generateEventId(),
        timestamp: new Date(taskStartTime + 75 * 60 * 1000),
        type: 'stage_changed',
        agent: task.agent,
        task,
        description: `Moved to Review`,
        metadata: { fromStage: 'in-progress', toStage: 'review' },
      });

      events.push({
        id: generateEventId(),
        timestamp: new Date(taskStartTime + 80 * 60 * 1000),
        type: 'agent_comment',
        agent: task.agent,
        task,
        description: `${task.agent?.name}: Ready for review, all tests passing`,
      });
    }

    // Stage: Blocked
    if (task.stage === 'blocked') {
      events.push({
        id: generateEventId(),
        timestamp: new Date(taskStartTime + 90 * 60 * 1000),
        type: 'blocked',
        agent: task.agent,
        task,
        description: `Task blocked: Waiting for API access`,
        metadata: { blockReason: 'Waiting for API access' },
      });

      events.push({
        id: generateEventId(),
        timestamp: new Date(taskStartTime + 95 * 60 * 1000),
        type: 'human_intervention',
        task,
        description: `Human intervention required: API credentials needed`,
      });
    }

    // Stage: Completed
    if (task.stage === 'completed') {
      events.push({
        id: generateEventId(),
        timestamp: new Date(taskStartTime + 100 * 60 * 1000),
        type: 'task_completed',
        agent: task.agent,
        task,
        description: `Task completed successfully`,
        metadata: { fromStage: 'review', toStage: 'completed' },
      });

      events.push({
        id: generateEventId(),
        timestamp: new Date(taskStartTime + 105 * 60 * 1000),
        type: 'stage_changed',
        agent: task.agent,
        task,
        description: `Moved to Completed`,
        metadata: { fromStage: 'review', toStage: 'completed' },
      });
    }

    // Stage: Failed
    if (task.stage === 'failed') {
      events.push({
        id: generateEventId(),
        timestamp: new Date(taskStartTime + 65 * 60 * 1000),
        type: 'ci_failed',
        task,
        description: `CI/CD pipeline failed`,
        metadata: { ciStatus: 'failed' },
      });

      events.push({
        id: generateEventId(),
        timestamp: new Date(taskStartTime + 70 * 60 * 1000),
        type: 'stage_changed',
        agent: task.agent,
        task,
        description: `Moved to Failed`,
        metadata: { fromStage: 'in-progress', toStage: 'failed' },
      });
    }
  });

  // Sort events by timestamp
  return events.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
};

export const mockTimelineEvents = generateTimelineEvents();
