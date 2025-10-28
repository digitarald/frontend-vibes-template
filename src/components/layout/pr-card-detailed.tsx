'use client';

import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { PullRequest } from '@/data/pulls';
import { CheckCircle, XCircle, MessageCircle, FileText, Clock } from 'lucide-react';

interface PrCardDetailedProps {
  pr: PullRequest;
}

function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  
  if (diffHours < 1) {
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    return `${diffMinutes}m ago`;
  }
  if (diffHours < 24) {
    return `${diffHours}h ago`;
  }
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
}

export function PrCardDetailed({ pr }: PrCardDetailedProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <Avatar className="size-10">
            <AvatarImage src={pr.author.avatar} alt={pr.author.name} />
            <AvatarFallback>
              {pr.author.name
                .split(' ')
                .map(n => n[0] || '')
                .join('')
                .slice(0, 2)
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-sm mb-0.5">{pr.author.name}</div>
            <div className="text-xs text-muted-foreground">#{pr.number}</div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="py-0 space-y-3">
        <div className="font-medium text-sm leading-snug line-clamp-2">
          {pr.title}
        </div>
        
        <div className="flex flex-wrap gap-1.5">
          {pr.labels.map((label, idx) => (
            <Badge 
              key={idx} 
              variant="outline" 
              className="text-xs px-2 py-0"
              style={{ 
                borderColor: label.color,
                color: label.color,
                backgroundColor: `color-mix(in srgb, ${label.color} 8%, transparent)`
              }}
            >
              {label.name}
            </Badge>
          ))}
        </div>
        
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1">
            {pr.reviewStatus.approved > 0 && (
              <div className="flex items-center gap-0.5 text-green-600">
                <CheckCircle className="size-3.5" />
                <span>{pr.reviewStatus.approved}</span>
              </div>
            )}
            {pr.reviewStatus.changesRequested > 0 && (
              <div className="flex items-center gap-0.5 text-red-600">
                <XCircle className="size-3.5" />
                <span>{pr.reviewStatus.changesRequested}</span>
              </div>
            )}
            {pr.reviewStatus.pending > 0 && (
              <div className="flex items-center gap-0.5 text-amber-600">
                <Clock className="size-3.5" />
                <span>{pr.reviewStatus.pending}</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-0.5">
            {pr.ciStatus === 'success' && <CheckCircle className="size-3.5 text-green-600" />}
            {pr.ciStatus === 'failure' && <XCircle className="size-3.5 text-red-600" />}
            {pr.ciStatus === 'pending' && <Clock className="size-3.5 text-amber-600" />}
            <span className="text-muted-foreground capitalize">{pr.ciStatus}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-3 pb-4">
        <div className="flex items-center justify-between w-full text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <MessageCircle className="size-3.5" />
              <span>{pr.commentCount}</span>
            </div>
            <div className="flex items-center gap-1">
              <FileText className="size-3.5" />
              <span>{pr.fileChanges}</span>
            </div>
          </div>
          <div>{formatTimeAgo(pr.updatedAt)}</div>
        </div>
      </CardFooter>
    </Card>
  );
}
