import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";
import { PullRequest } from "@/data/pulls";

function getTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  
  // Handle future dates or invalid timestamps
  if (diffMs < 0) {
    return 'just now';
  }
  
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 0) {
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  } else if (diffHours > 0) {
    return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  } else {
    return 'just now';
  }
}

interface PRCardMinimalProps {
  pr: PullRequest;
}

export function PRCardMinimal({ pr }: PRCardMinimalProps) {
  const displayLabels = pr.labels.slice(0, 3);

  return (
    <Card className="p-8 hover:border-primary/20 transition-all hover:shadow-lg border-border/30">
      <div className="flex items-start gap-5">
        <Avatar className="size-14 shrink-0 ring-2 ring-border/30">
          <AvatarImage src={pr.author.avatar} alt={pr.author.login} />
          <AvatarFallback className="text-lg font-semibold">
            {pr.author.login[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0 space-y-4">
          <h3 className="text-2xl font-semibold leading-tight line-clamp-2 tracking-tight">
            {pr.title}
          </h3>
          
          {displayLabels.length > 0 && (
            <div className="flex gap-2.5 flex-wrap">
              {displayLabels.map((label) => (
                <Badge 
                  key={label} 
                  variant="outline" 
                  className="text-base px-3 py-1 font-normal border-border/50"
                >
                  {label}
                </Badge>
              ))}
            </div>
          )}
          
          <div className="flex items-center gap-5 text-lg text-muted-foreground/80">
            <span className="font-medium">{getTimeAgo(pr.createdAt)}</span>
            {pr.reviewCount > 0 && (
              <div className="flex items-center gap-2">
                <MessageSquare className="size-5" />
                <span className="font-medium">{pr.reviewCount}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
