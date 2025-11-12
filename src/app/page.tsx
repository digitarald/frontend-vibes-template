import { Metadata } from 'next';
import { KanbanBoard } from '@/components/kanban/kanban-board';

export const metadata: Metadata = {
  title: 'AI Agent Kanban Board',
  description: 'Real-time task tracking with Server-Sent Events and React Server Components',
};

export default function Home() {
  return <KanbanBoard />;
}
