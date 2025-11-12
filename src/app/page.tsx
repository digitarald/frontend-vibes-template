import { Metadata } from 'next';
import { HybridKanbanTimeline } from '@/components/kanban/hybrid-kanban-timeline';

export const metadata: Metadata = {
  title: 'Hybrid Kanban-Timeline View',
  description: 'A dual-mode interface combining traditional kanban stages with a chronological timeline view',
};

export default function Home() {
  return <HybridKanbanTimeline />;
}
