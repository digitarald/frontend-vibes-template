import { Metadata } from 'next';
import { KanbanBoard } from '@/components/kanban/kanban-board';

export const metadata: Metadata = {
  title: 'AI Agent Kanban Board',
  description: 'Real-time AI agent task management with WebSocket updates',
};

export default function Home() {
  return <KanbanBoard />;
}
