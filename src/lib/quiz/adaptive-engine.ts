import { 
  QuizQuestion, 
  UserAnswer, 
  TopicPerformance, 
  PadiTopic, 
  PADI_TOPICS,
  SpacedRepetitionItem,
  RecommendationItem 
} from '@/types/quiz';
import { MOCK_QUESTIONS } from '@/data/questions';

export class AdaptiveQuizEngine {
  private userAnswers: UserAnswer[] = [];
  private topicPerformance: Map<PadiTopic, TopicPerformance> = new Map();
  private spacedRepetitionItems: SpacedRepetitionItem[] = [];
  
  constructor() {
    this.initializeTopicPerformance();
  }

  private initializeTopicPerformance() {
    Object.values(PADI_TOPICS).forEach(topic => {
      this.topicPerformance.set(topic, {
        topic,
        totalQuestions: 0,
        correctAnswers: 0,
        averageTime: 0,
        difficulty1Accuracy: 0,
        difficulty2Accuracy: 0,
        difficulty3Accuracy: 0,
        lastAttempt: new Date(),
        masteryLevel: 0,
        needsReview: false,
        recommendedFocus: true, // Start with all topics as focus areas
      });
    });
  }

  // Record a user's answer and update performance metrics
  recordAnswer(answer: UserAnswer): void {
    this.userAnswers.push(answer);
    this.updateTopicPerformance(answer);
    this.updateSpacedRepetition(answer);
  }

  private updateTopicPerformance(answer: UserAnswer): void {
    const question = MOCK_QUESTIONS.find(q => q.id === answer.questionId);
    if (!question) return;

    const performance = this.topicPerformance.get(question.topic);
    if (!performance) return;

    // Update basic metrics
    performance.totalQuestions++;
    if (answer.isCorrect) {
      performance.correctAnswers++;
    }
    
    // Update average time (running average)
    const totalTime = performance.averageTime * (performance.totalQuestions - 1) + answer.timeSpent;
    performance.averageTime = totalTime / performance.totalQuestions;
    
    // Update difficulty-specific accuracy
    const difficultyAnswers = this.userAnswers.filter(a => {
      const q = MOCK_QUESTIONS.find(q => q.id === a.questionId);
      return q?.topic === question.topic && q?.difficulty === question.difficulty;
    });
    
    const correctDifficultyAnswers = difficultyAnswers.filter(a => a.isCorrect).length;
    const accuracyPercentage = (correctDifficultyAnswers / difficultyAnswers.length) * 100;
    
    switch (question.difficulty) {
      case 1:
        performance.difficulty1Accuracy = accuracyPercentage;
        break;
      case 2:
        performance.difficulty2Accuracy = accuracyPercentage;
        break;
      case 3:
        performance.difficulty3Accuracy = accuracyPercentage;
        break;
    }
    
    // Calculate overall mastery level
    performance.masteryLevel = this.calculateMasteryLevel(performance);
    performance.lastAttempt = answer.timestamp;
    
    // Determine if topic needs review or focus
    performance.needsReview = performance.masteryLevel < 70;
    performance.recommendedFocus = performance.masteryLevel < 80;
    
    this.topicPerformance.set(question.topic, performance);
  }

  private calculateMasteryLevel(performance: TopicPerformance): number {
    // Weight different difficulty levels
    const difficulty1Weight = 0.3;
    const difficulty2Weight = 0.4;
    const difficulty3Weight = 0.3;
    
    const weightedAccuracy = (
      performance.difficulty1Accuracy * difficulty1Weight +
      performance.difficulty2Accuracy * difficulty2Weight +
      performance.difficulty3Accuracy * difficulty3Weight
    );
    
    // Consider question volume (more questions = more reliable mastery)
    const volumeBonus = Math.min(performance.totalQuestions * 2, 20); // Max 20% bonus
    
    return Math.min(100, Math.max(0, weightedAccuracy + volumeBonus));
  }

  private updateSpacedRepetition(answer: UserAnswer): void {
    const existingItem = this.spacedRepetitionItems.find(item => item.questionId === answer.questionId);
    const question = MOCK_QUESTIONS.find(q => q.id === answer.questionId);
    if (!question) return;

    if (existingItem) {
      // Update existing spaced repetition item using SM-2 algorithm
      this.updateSpacedRepetitionItem(existingItem, answer.isCorrect);
    } else {
      // Create new spaced repetition item
      this.spacedRepetitionItems.push({
        questionId: answer.questionId,
        topic: question.topic,
        nextReviewDate: this.calculateNextReviewDate(1, answer.isCorrect),
        repetitionCount: 1,
        easinessFactor: answer.isCorrect ? 2.6 : 1.3,
        interval: answer.isCorrect ? 1 : 0,
        lastReviewed: answer.timestamp,
      });
    }
  }

  private updateSpacedRepetitionItem(item: SpacedRepetitionItem, correct: boolean): void {
    item.repetitionCount++;
    item.lastReviewed = new Date();

    if (correct) {
      if (item.repetitionCount === 1) {
        item.interval = 1;
      } else if (item.repetitionCount === 2) {
        item.interval = 6;
      } else {
        item.interval = Math.round(item.interval * item.easinessFactor);
      }
      item.easinessFactor = Math.max(1.3, item.easinessFactor + 0.1);
    } else {
      item.repetitionCount = 1;
      item.interval = 1;
      item.easinessFactor = Math.max(1.3, item.easinessFactor - 0.8);
    }

    item.nextReviewDate = this.calculateNextReviewDate(item.interval, correct);
  }

  private calculateNextReviewDate(interval: number, correct: boolean): Date {
    const now = new Date();
    const days = correct ? interval : 1; // Review incorrect answers the next day
    return new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
  }

  // Get the next question based on adaptive logic
  getNextQuestion(excludeQuestions: string[] = []): QuizQuestion | null {
    const availableQuestions = MOCK_QUESTIONS.filter(q => !excludeQuestions.includes(q.id));
    
    // 1. Prioritize questions due for spaced repetition review
    const dueForReview = this.getQuestionsForReview();
    if (dueForReview.length > 0) {
      const reviewQuestion = availableQuestions.find(q => 
        dueForReview.some(review => review.questionId === q.id)
      );
      if (reviewQuestion) return reviewQuestion;
    }

    // 2. Focus on weak topic areas
    const weakTopics = this.getWeakTopics();
    if (weakTopics.length > 0) {
      const weakTopicQuestions = availableQuestions.filter(q => weakTopics.includes(q.topic));
      if (weakTopicQuestions.length > 0) {
        return this.selectQuestionByDifficulty(weakTopicQuestions);
      }
    }

    // 3. Progressive difficulty based on recent performance
    const recentAccuracy = this.getRecentAccuracy();
    const targetDifficulty = this.getTargetDifficulty(recentAccuracy);
    
    const difficultyQuestions = availableQuestions.filter(q => q.difficulty === targetDifficulty);
    if (difficultyQuestions.length > 0) {
      return difficultyQuestions[Math.floor(Math.random() * difficultyQuestions.length)];
    }

    // 4. Fallback to any available question
    return availableQuestions.length > 0 
      ? availableQuestions[Math.floor(Math.random() * availableQuestions.length)]
      : null;
  }

  private getQuestionsForReview(): SpacedRepetitionItem[] {
    const now = new Date();
    return this.spacedRepetitionItems.filter(item => item.nextReviewDate <= now);
  }

  private getWeakTopics(): PadiTopic[] {
    return Array.from(this.topicPerformance.values())
      .filter(perf => perf.recommendedFocus)
      .sort((a, b) => a.masteryLevel - b.masteryLevel)
      .slice(0, 3) // Focus on top 3 weak topics
      .map(perf => perf.topic);
  }

  private getRecentAccuracy(limit = 10): number {
    const recentAnswers = this.userAnswers.slice(-limit);
    if (recentAnswers.length === 0) return 0.7; // Default to 70%
    
    const correctAnswers = recentAnswers.filter(a => a.isCorrect).length;
    return correctAnswers / recentAnswers.length;
  }

  private getTargetDifficulty(accuracy: number): 1 | 2 | 3 {
    if (accuracy >= 0.8) return 3; // High accuracy -> harder questions
    if (accuracy >= 0.6) return 2; // Medium accuracy -> medium questions
    return 1; // Low accuracy -> easier questions
  }

  private selectQuestionByDifficulty(questions: QuizQuestion[]): QuizQuestion {
    const recentAccuracy = this.getRecentAccuracy();
    const targetDifficulty = this.getTargetDifficulty(recentAccuracy);
    
    const preferredQuestions = questions.filter(q => q.difficulty === targetDifficulty);
    if (preferredQuestions.length > 0) {
      return preferredQuestions[Math.floor(Math.random() * preferredQuestions.length)];
    }
    
    return questions[Math.floor(Math.random() * questions.length)];
  }

  // Generate personalized recommendations
  generateRecommendations(): RecommendationItem[] {
    const recommendations: RecommendationItem[] = [];
    const now = new Date();

    // Analyze performance for recommendations
    const weakTopics = this.getWeakTopics();
    const dueForReview = this.getQuestionsForReview();
    const recentAccuracy = this.getRecentAccuracy();

    // Recommend focusing on weak topics
    weakTopics.slice(0, 2).forEach((topic, index) => {
      const performance = this.topicPerformance.get(topic);
      if (performance) {
        recommendations.push({
          id: `focus_${topic}_${Date.now()}`,
          type: 'focus_topic',
          priority: index === 0 ? 'high' : 'medium',
          title: `Focus on ${this.getTopicLabel(topic)}`,
          description: `Your mastery level: ${Math.round(performance.masteryLevel)}%. Practice more questions in this area.`,
          actionText: 'Practice Now',
          relatedTopic: topic,
          estimatedTime: 15,
          reasoning: `Low mastery level (${Math.round(performance.masteryLevel)}%) indicates need for focused practice`,
          createdAt: now,
        });
      }
    });

    // Recommend review session if items are due
    if (dueForReview.length > 0) {
      recommendations.push({
        id: `review_${Date.now()}`,
        type: 'review_session',
        priority: 'high',
        title: 'Review Previously Learned Material',
        description: `${dueForReview.length} questions are due for review to maintain retention.`,
        actionText: 'Start Review',
        estimatedTime: dueForReview.length * 2,
        reasoning: 'Spaced repetition schedule indicates optimal time for review',
        createdAt: now,
      });
    }

    // Recommend difficulty adjustment
    if (recentAccuracy < 0.5) {
      recommendations.push({
        id: `difficulty_${Date.now()}`,
        type: 'difficulty_adjustment',
        priority: 'medium',
        title: 'Consider Easier Questions',
        description: 'Recent accuracy is low. Focus on fundamentals before advancing.',
        actionText: 'Practice Basics',
        estimatedTime: 10,
        reasoning: `Recent accuracy of ${Math.round(recentAccuracy * 100)}% suggests need for easier content`,
        createdAt: now,
      });
    } else if (recentAccuracy > 0.9) {
      recommendations.push({
        id: `difficulty_up_${Date.now()}`,
        type: 'difficulty_adjustment',
        priority: 'low',
        title: 'Try Harder Questions',
        description: 'You\'re doing great! Challenge yourself with advanced questions.',
        actionText: 'Level Up',
        estimatedTime: 20,
        reasoning: `High recent accuracy of ${Math.round(recentAccuracy * 100)}% indicates readiness for harder content`,
        createdAt: now,
      });
    }

    // Recommend study break if too many questions answered recently
    const recentSessions = this.userAnswers.filter(a => 
      a.timestamp.getTime() > now.getTime() - 2 * 60 * 60 * 1000 // Last 2 hours
    );
    
    if (recentSessions.length > 30) {
      recommendations.push({
        id: `break_${Date.now()}`,
        type: 'study_break',
        priority: 'medium',
        title: 'Take a Study Break',
        description: 'You\'ve been studying intensively. A break can help with retention.',
        actionText: 'Take Break',
        estimatedTime: 30,
        reasoning: `${recentSessions.length} questions answered in the last 2 hours`,
        createdAt: now,
      });
    }

    return recommendations.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  }

  private getTopicLabel(topic: PadiTopic): string {
    const labels = {
      [PADI_TOPICS.PHYSICS_PHYSIOLOGY]: 'Diving Physics & Physiology',
      [PADI_TOPICS.EQUIPMENT]: 'Equipment Knowledge',
      [PADI_TOPICS.SAFETY_EMERGENCY]: 'Safety & Emergency Procedures',
      [PADI_TOPICS.BUOYANCY]: 'Buoyancy Control',
      [PADI_TOPICS.SKILLS]: 'Diving Skills',
      [PADI_TOPICS.DIVE_PLANNING]: 'Dive Planning',
      [PADI_TOPICS.ENVIRONMENT]: 'Environmental Awareness',
    };
    return labels[topic] || topic;
  }

  // Get current performance analytics
  getAnalytics() {
    const totalQuestions = this.userAnswers.length;
    const correctAnswers = this.userAnswers.filter(a => a.isCorrect).length;
    const overallAccuracy = totalQuestions > 0 ? correctAnswers / totalQuestions : 0;
    
    const totalTime = this.userAnswers.reduce((sum, a) => sum + a.timeSpent, 0);
    const averageTime = totalQuestions > 0 ? totalTime / totalQuestions : 0;
    
    const recentAccuracy = this.getRecentAccuracy();
    const topicPerformanceArray = Array.from(this.topicPerformance.values());
    
    return {
      totalQuestions,
      overallAccuracy,
      recentAccuracy,
      averageTime,
      totalTime,
      topicPerformance: topicPerformanceArray,
      weakestTopics: topicPerformanceArray
        .sort((a, b) => a.masteryLevel - b.masteryLevel)
        .slice(0, 3),
      strongestTopics: topicPerformanceArray
        .sort((a, b) => b.masteryLevel - a.masteryLevel)
        .slice(0, 3),
      reviewItemsDue: this.getQuestionsForReview().length,
    };
  }

  // Load user data (for demo purposes, using localStorage)
  loadUserData(): void {
    if (typeof window === 'undefined') return;
    
    try {
      const savedAnswers = localStorage.getItem('quiz_user_answers');
      const savedPerformance = localStorage.getItem('quiz_topic_performance');
      const savedSpacedRep = localStorage.getItem('quiz_spaced_repetition');
      
      if (savedAnswers) {
        this.userAnswers = JSON.parse(savedAnswers).map((a: UserAnswer & { timestamp: string }) => ({
          ...a,
          timestamp: new Date(a.timestamp),
        }));
      }
      
      if (savedPerformance) {
        const performanceData = JSON.parse(savedPerformance);
        Object.entries(performanceData).forEach(([topic, data]) => {
          const performanceItem = data as TopicPerformance & { lastAttempt: string };
          this.topicPerformance.set(topic as PadiTopic, {
            ...performanceItem,
            lastAttempt: new Date(performanceItem.lastAttempt),
          });
        });
      }
      
      if (savedSpacedRep) {
        this.spacedRepetitionItems = JSON.parse(savedSpacedRep).map((item: SpacedRepetitionItem & { nextReviewDate: string; lastReviewed: string }) => ({
          ...item,
          nextReviewDate: new Date(item.nextReviewDate),
          lastReviewed: new Date(item.lastReviewed),
        }));
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  }

  // Save user data (for demo purposes, using localStorage)
  saveUserData(): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem('quiz_user_answers', JSON.stringify(this.userAnswers));
      
      const performanceObj = Object.fromEntries(this.topicPerformance);
      localStorage.setItem('quiz_topic_performance', JSON.stringify(performanceObj));
      
      localStorage.setItem('quiz_spaced_repetition', JSON.stringify(this.spacedRepetitionItems));
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  }
}