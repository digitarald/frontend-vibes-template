import { QuizItem } from '@/data/owd-questions';

// SRS (Spaced Repetition System) types and implementation
export interface SrsItemState {
  id: string;
  box: number;
  nextReviewAt: string;
}

export interface SrsState {
  items: Record<string, SrsItemState>;
  streak: number;
  lastSessionAt?: string;
}

// Storage keys
const SRS_STORAGE_KEY = 'owd-srs-v1';

// Leitner box intervals in days: [0d, 1d, 3d, 7d, 14d, 30d]
const BOX_INTERVALS = [0, 1, 3, 7, 14, 30];
const MAX_BOX = BOX_INTERVALS.length - 1;

// Helper functions
function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function isToday(date: Date): boolean {
  const today = new Date();
  return date.toDateString() === today.toDateString();
}

function getDateString(date: Date): string {
  return date.toISOString();
}

// SRS class implementation
class SrsManager {
  private state: SrsState;

  constructor() {
    this.state = this.loadState();
  }

  private loadState(): SrsState {
    try {
      const stored = localStorage.getItem(SRS_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.warn('Failed to load SRS state from localStorage:', error);
    }
    
    return {
      items: {},
      streak: 0,
      lastSessionAt: undefined
    };
  }

  private saveState(): void {
    try {
      localStorage.setItem(SRS_STORAGE_KEY, JSON.stringify(this.state));
    } catch (error) {
      console.warn('Failed to save SRS state to localStorage:', error);
    }
  }

  // Initialize item if it doesn't exist in SRS
  private initializeItem(itemId: string): SrsItemState {
    if (!this.state.items[itemId]) {
      this.state.items[itemId] = {
        id: itemId,
        box: 0,
        nextReviewAt: getDateString(new Date()) // Available immediately
      };
    }
    return this.state.items[itemId];
  }

  // Get items that are due for review
  getDueItems(items: QuizItem[], now = new Date()): QuizItem[] {
    const nowString = getDateString(now);
    
    return items.filter(item => {
      const srsItem = this.initializeItem(item.id);
      return srsItem.nextReviewAt <= nowString;
    });
  }

  // Grade an item and update its SRS state
  grade(itemId: string, correct: boolean): void {
    const srsItem = this.initializeItem(itemId);
    const now = new Date();

    if (correct) {
      // Move to next box (up to maximum)
      srsItem.box = Math.min(srsItem.box + 1, MAX_BOX);
    } else {
      // Reset to box 0 on incorrect answer
      srsItem.box = 0;
    }

    // Schedule next review based on box interval
    const daysToAdd = BOX_INTERVALS[srsItem.box];
    srsItem.nextReviewAt = getDateString(addDays(now, daysToAdd));

    this.saveState();
  }

  // Update streak after completing a session
  updateStreak(): void {
    const now = new Date();
    const lastSessionDate = this.state.lastSessionAt ? new Date(this.state.lastSessionAt) : null;

    if (!lastSessionDate || !isToday(lastSessionDate)) {
      // First session today
      if (lastSessionDate) {
        const daysDifference = Math.floor((now.getTime() - lastSessionDate.getTime()) / (1000 * 60 * 60 * 24));
        if (daysDifference === 1) {
          // Consecutive day - increment streak
          this.state.streak += 1;
        } else if (daysDifference > 1) {
          // Streak broken - reset to 1
          this.state.streak = 1;
        }
        // If same day (daysDifference === 0), keep current streak
      } else {
        // First ever session
        this.state.streak = 1;
      }
      
      this.state.lastSessionAt = getDateString(now);
      this.saveState();
    }
  }

  // Get current streak
  getStreak(): number {
    return this.state.streak;
  }

  // Get items that were answered incorrectly (for review)
  getMissedItems(items: QuizItem[]): QuizItem[] {
    return items.filter(item => {
      const srsItem = this.state.items[item.id];
      return srsItem && srsItem.box === 0;
    });
  }

  // Get random items for practice when no items are due
  getRandomItems(items: QuizItem[], count = 2): QuizItem[] {
    const shuffled = [...items].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }

  // Get statistics about SRS state
  getStats(items: QuizItem[]): {
    totalItems: number;
    dueItems: number;
    masteredItems: number;
    streak: number;
  } {
    const dueItems = this.getDueItems(items);
    const masteredItems = items.filter(item => {
      const srsItem = this.state.items[item.id];
      return srsItem && srsItem.box >= 4; // Consider items in box 4+ as mastered
    });

    return {
      totalItems: items.length,
      dueItems: dueItems.length,
      masteredItems: masteredItems.length,
      streak: this.getStreak()
    };
  }

  // Reset all progress (for testing or fresh start)
  reset(): void {
    this.state = {
      items: {},
      streak: 0,
      lastSessionAt: undefined
    };
    this.saveState();
  }
}

// Export singleton instance
export const srsManager = new SrsManager();

// Export helper functions for testing/utilities
export { addDays, isToday, getDateString };