import { ScrollArea } from '@/components/ui/scroll-area';
import { PullRequest } from '@/data/pulls';
import { PrCardDetailed } from './pr-card-detailed';

interface KanbanColumnDenseProps {
  title: string;
  pulls: PullRequest[];
  colorClass: string;
  borderColorClass: string;
}

export function KanbanColumnDense({ title, pulls, colorClass, borderColorClass }: KanbanColumnDenseProps) {
  return (
    <div className={`flex flex-col border-2 rounded-lg overflow-hidden ${borderColorClass}`}>
      <div className={`px-4 py-3 ${colorClass} border-b-2 ${borderColorClass}`}>
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-lg">{title}</h2>
          <span className="text-2xl font-bold">{pulls.length}</span>
        </div>
      </div>
      
      <ScrollArea className="flex-1 h-[calc(100vh-16rem)]">
        <div className="p-4 space-y-3">
          {pulls.map(pr => (
            <PrCardDetailed key={pr.id} pr={pr} />
          ))}
          {pulls.length === 0 && (
            <div className="text-center text-muted-foreground py-8">
              No pull requests
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
