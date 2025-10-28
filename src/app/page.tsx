import { Metadata } from 'next';
import { mockPullRequests } from '@/data/pulls';
import { MetricsHeader } from '@/components/layout/metrics-header';
import { KanbanColumnDense } from '@/components/layout/kanban-column-dense';

export const metadata: Metadata = {
  title: 'PR Dashboard - Frontend Vibes',
  description: 'Data-dense TV dashboard for GitHub pull requests',
};

export default function Home() {
  const completedPRs = mockPullRequests.filter(pr => pr.state === 'completed');
  const inReviewPRs = mockPullRequests.filter(pr => pr.state === 'in-review');
  const draftPRs = mockPullRequests.filter(pr => pr.state === 'draft');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Pull Request Dashboard</h1>
        <div className="text-sm text-muted-foreground">
          Total: {mockPullRequests.length} PRs
        </div>
      </div>
      
      <MetricsHeader pulls={mockPullRequests} />
      
      <div className="grid grid-cols-3 gap-4">
        <KanbanColumnDense
          title="Completed"
          pulls={completedPRs}
          colorClass="bg-chart-1/10"
          borderColorClass="border-chart-1/30"
        />
        <KanbanColumnDense
          title="In Review"
          pulls={inReviewPRs}
          colorClass="bg-chart-2/10"
          borderColorClass="border-chart-2/30"
        />
        <KanbanColumnDense
          title="Draft"
          pulls={draftPRs}
          colorClass="bg-chart-3/10"
          borderColorClass="border-chart-3/30"
        />
      </div>
    </div>
  );
}
