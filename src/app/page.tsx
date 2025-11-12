import { Metadata } from 'next';
import { KanbanBoard } from '@/components/kanban/kanban-board';

export const metadata: Metadata = {
  title: 'Task Board - Frontend Vibes',
  description: 'Manage your development workflow with a kanban board',
};

export default function Home() {
  return <KanbanBoard />;
}
