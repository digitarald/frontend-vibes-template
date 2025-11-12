import { Metadata } from 'next';
import { KanbanBoard } from '@/components/kanban/kanban-board';

export const metadata: Metadata = {
  title: 'AI Agent Kanban Board',
  description: 'Track AI agent tasks with real-time polling updates',
};

export default function Home() {
  return <KanbanBoard />;
}
