import { Metadata } from 'next';
import { KanbanColumn } from '@/components/layout/kanban-column';
import { mockPullRequests } from '@/data/pulls';

export const metadata: Metadata = {
  title: 'PR Dashboard - Frontend Vibes',
  description: 'TV-optimized kanban board for GitHub pull requests',
};

export default function Home() {
  const draftPRs = mockPullRequests.filter(pr => pr.state === 'draft');
  const reviewPRs = mockPullRequests.filter(pr => pr.state === 'review');
  const completedPRs = mockPullRequests.filter(pr => pr.state === 'completed');

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-background via-background to-accent/5">
      <div className="h-screen grid grid-cols-3">
        <KanbanColumn title="Draft" prs={draftPRs} />
        <KanbanColumn title="In Review" prs={reviewPRs} />
        <KanbanColumn title="Completed" prs={completedPRs} />
      </div>
    </div>
  );
}
