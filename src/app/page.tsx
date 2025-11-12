import { Metadata } from 'next';
import { SwipeableKanban } from '@/components/kanban/swipeable-kanban';

export const metadata: Metadata = {
  title: 'Swipeable Kanban Board',
  description: 'A mobile-first swipeable kanban board with gesture controls',
};

export default function Home() {
  return <SwipeableKanban />;
}
