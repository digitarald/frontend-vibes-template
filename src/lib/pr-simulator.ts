import { PullRequest, PRStatus } from '@/data/pulls';

export interface PRSimulatorState {
  pulls: PullRequest[];
  lastUpdate: Date;
}

// State transition rules
const stateTransitions: Record<PRStatus, { next: PRStatus[]; weights: number[] }> = {
  draft: {
    next: ['in_review', 'draft'],
    weights: [0.7, 0.3], // 70% chance to move to review, 30% stay
  },
  in_review: {
    next: ['completed', 'draft', 'in_review'],
    weights: [0.5, 0.1, 0.4], // 50% complete, 10% back to draft, 40% stay
  },
  completed: {
    next: ['completed'],
    weights: [1.0], // Always stay completed
  },
};

function getRandomByWeight<T>(items: T[], weights: number[]): T {
  const totalWeight = weights.reduce((sum, w) => sum + w, 0);
  let random = Math.random() * totalWeight;
  
  for (let i = 0; i < items.length; i++) {
    random -= weights[i];
    if (random <= 0) {
      return items[i];
    }
  }
  
  return items[items.length - 1];
}

export function simulatePRUpdates(pulls: PullRequest[]): {
  pulls: PullRequest[];
  changes: Array<{ pr: PullRequest; oldStatus: PRStatus; newStatus: PRStatus }>;
} {
  const changes: Array<{ pr: PullRequest; oldStatus: PRStatus; newStatus: PRStatus }> = [];
  
  // Randomly select 1-2 PRs to update (excluding completed ones unless forced)
  const eligiblePulls = pulls.filter(pr => pr.status !== 'completed');
  
  if (eligiblePulls.length === 0) {
    return { pulls, changes };
  }
  
  const numUpdates = Math.random() > 0.6 ? 2 : 1;
  const selectedIndexes = new Set<number>();
  
  while (selectedIndexes.size < Math.min(numUpdates, eligiblePulls.length)) {
    selectedIndexes.add(Math.floor(Math.random() * eligiblePulls.length));
  }
  
  const updatedPulls = pulls.map(pr => {
    const eligibleIndex = eligiblePulls.findIndex(p => p.id === pr.id);
    
    if (eligibleIndex !== -1 && selectedIndexes.has(eligibleIndex)) {
      const transition = stateTransitions[pr.status];
      const newStatus = getRandomByWeight(transition.next, transition.weights);
      
      if (newStatus !== pr.status) {
        changes.push({
          pr: { ...pr, status: newStatus },
          oldStatus: pr.status,
          newStatus,
        });
        
        return { ...pr, status: newStatus };
      }
    }
    
    return pr;
  });
  
  return { pulls: updatedPulls, changes };
}

export function createSimulator(
  initialPulls: PullRequest[],
  onUpdate: (state: PRSimulatorState, changes: Array<{ pr: PullRequest; oldStatus: PRStatus; newStatus: PRStatus }>) => void,
  interval: number = 15000 // 15 seconds default
): { start: () => void; stop: () => void; getState: () => PRSimulatorState } {
  let state: PRSimulatorState = {
    pulls: initialPulls,
    lastUpdate: new Date(),
  };
  
  let intervalId: NodeJS.Timeout | null = null;
  
  function tick() {
    const { pulls: updatedPulls, changes } = simulatePRUpdates(state.pulls);
    
    state = {
      pulls: updatedPulls,
      lastUpdate: new Date(),
    };
    
    if (changes.length > 0) {
      onUpdate(state, changes);
    }
  }
  
  return {
    start: () => {
      if (!intervalId) {
        intervalId = setInterval(tick, interval);
      }
    },
    stop: () => {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    },
    getState: () => state,
  };
}
