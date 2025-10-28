import { Card, CardContent } from '@/components/ui/card';
import { PullRequest } from '@/data/pulls';
import { Clock } from 'lucide-react';

interface MetricsHeaderProps {
  pulls: PullRequest[];
}

function calculateAverageTime(pulls: PullRequest[], state: PullRequest['state']): string {
  const statePulls = pulls.filter(p => p.state === state);
  if (statePulls.length === 0) return 'N/A';
  
  const now = new Date();
  const totalHours = statePulls.reduce((sum, pr) => {
    const created = new Date(pr.createdAt);
    const hours = (now.getTime() - created.getTime()) / (1000 * 60 * 60);
    return sum + hours;
  }, 0);
  
  const avgHours = totalHours / statePulls.length;
  if (avgHours < 24) {
    return `${Math.round(avgHours)}h`;
  }
  return `${Math.round(avgHours / 24)}d`;
}

function getCompletedToday(pulls: PullRequest[]): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  return pulls.filter(pr => {
    if (pr.state !== 'completed') return false;
    const updated = new Date(pr.updatedAt);
    return updated >= today;
  }).length;
}

export function MetricsHeader({ pulls }: MetricsHeaderProps) {
  const completedCount = pulls.filter(p => p.state === 'completed').length;
  const inReviewCount = pulls.filter(p => p.state === 'in-review').length;
  const draftCount = pulls.filter(p => p.state === 'draft').length;
  
  const avgCompleted = calculateAverageTime(pulls, 'completed');
  const avgInReview = calculateAverageTime(pulls, 'in-review');
  const avgDraft = calculateAverageTime(pulls, 'draft');
  
  const completedToday = getCompletedToday(pulls);
  
  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      <Card className="border-2 border-chart-1/30 bg-chart-1/5">
        <CardContent className="py-4">
          <div className="space-y-1">
            <div className="text-sm font-medium text-muted-foreground">Completed</div>
            <div className="text-4xl font-bold text-chart-1">{completedCount}</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="size-3" />
              <span>Avg: {avgCompleted}</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-2 border-chart-2/30 bg-chart-2/5">
        <CardContent className="py-4">
          <div className="space-y-1">
            <div className="text-sm font-medium text-muted-foreground">In Review</div>
            <div className="text-4xl font-bold text-chart-2">{inReviewCount}</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="size-3" />
              <span>Avg: {avgInReview}</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-2 border-chart-3/30 bg-chart-3/5">
        <CardContent className="py-4">
          <div className="space-y-1">
            <div className="text-sm font-medium text-muted-foreground">Draft</div>
            <div className="text-4xl font-bold text-chart-3">{draftCount}</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="size-3" />
              <span>Avg: {avgDraft}</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-2 border-primary/30 bg-primary/5">
        <CardContent className="py-4">
          <div className="space-y-1">
            <div className="text-sm font-medium text-muted-foreground">Velocity</div>
            <div className="text-4xl font-bold text-primary">{completedToday}</div>
            <div className="text-xs text-muted-foreground">Completed today</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
