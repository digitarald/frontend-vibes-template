'use client';

import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { ConfidenceMeter } from './confidence-meter';
import { QuizQuestionComponent } from './quiz-question';
import { BreathingExerciseComponent } from './breathing-exercise';
import { MindfulnessMomentComponent } from './mindfulness-moment';
import { 
  quizQuestions, 
  confidenceMetrics, 
  breathingExercises, 
  mindfulnessMoments,
  encouragementMessages,
  anxietyTips,
  type ConfidenceMetric 
} from '@/lib/quiz-data';

type AppPhase = 'welcome' | 'breathing' | 'quiz' | 'mindfulness' | 'complete';

export function ConfidenceQuizApp() {
  const [currentPhase, setCurrentPhase] = useState<AppPhase>('welcome');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userConfidenceMetrics, setUserConfidenceMetrics] = useState<ConfidenceMetric[]>(confidenceMetrics);
  const [overallScore, setOverallScore] = useState(55);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [currentBreathingExercise, setCurrentBreathingExercise] = useState(0);
  const [currentMindfulnessMoment, setCurrentMindfulnessMoment] = useState(0);

  const handleAnswerSubmit = useCallback((isCorrect: boolean, confidenceGain: number) => {
    // Update answered questions count
    setAnsweredQuestions(prev => prev + 1);
    
    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);
    }

    // Update confidence metrics based on question category
    const currentQuestion = quizQuestions[currentQuestionIndex];
    setUserConfidenceMetrics(prev => prev.map(metric => {
      const categoryMap: Record<string, string> = {
        'safety': 'Safety Knowledge',
        'equipment': 'Equipment Comfort',
        'skills': 'Underwater Skills',
        'emergency': 'Emergency Readiness',
        'buddy': 'Buddy Communication',
        'mental': 'Mental Preparation'
      };
      
      if (metric.category === categoryMap[currentQuestion.category]) {
        const newValue = Math.min(metric.max, metric.current + confidenceGain);
        return { ...metric, current: newValue };
      }
      return metric;
    }));

    // Update overall score
    setOverallScore(prev => Math.min(100, prev + Math.floor(confidenceGain * 0.8)));

    // Move to next question or phase after a delay
    setTimeout(() => {
      if (currentQuestionIndex + 1 >= quizQuestions.length) {
        setCurrentPhase('complete');
      } else if ((currentQuestionIndex + 1) % 3 === 0) {
        // Show mindfulness moment every 3 questions
        setCurrentPhase('mindfulness');
      } else {
        setCurrentQuestionIndex(prev => prev + 1);
      }
    }, 3000);
  }, [currentQuestionIndex]);

  const handleBreathingComplete = useCallback(() => {
    setCurrentPhase('quiz');
  }, []);

  const handleMindfulnessComplete = useCallback(() => {
    setCurrentMindfulnessMoment(prev => (prev + 1) % mindfulnessMoments.length);
    setCurrentQuestionIndex(prev => prev + 1);
    setCurrentPhase('quiz');
  }, []);

  const startQuiz = useCallback(() => {
    setCurrentPhase('breathing');
  }, []);

  const restartQuiz = useCallback(() => {
    setCurrentPhase('welcome');
    setCurrentQuestionIndex(0);
    setUserConfidenceMetrics(confidenceMetrics);
    setOverallScore(55);
    setAnsweredQuestions(0);
    setCorrectAnswers(0);
    setCurrentBreathingExercise(0);
    setCurrentMindfulnessMoment(0);
  }, []);

  const getRandomEncouragement = () => {
    return encouragementMessages[Math.floor(Math.random() * encouragementMessages.length)];
  };

  const getRandomAnxietyTip = () => {
    return anxietyTips[Math.floor(Math.random() * anxietyTips.length)];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-blue-100">
      <div className="container mx-auto py-8 px-4">
        
        {/* Welcome Phase */}
        {currentPhase === 'welcome' && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-8 mb-8">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                  PADI Open Water Confidence Builder
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Build genuine confidence and manage diving anxiety through supportive, psychology-focused learning
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-start">
                <div className="space-y-6">
                  <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg border border-blue-200 space-y-4">
                    <h3 className="text-lg font-semibold text-blue-800">🌊 What Makes This Different</h3>
                    <ul className="text-sm space-y-2 text-left">
                      <li className="flex items-start gap-2">
                        <span>💙</span>
                        <span>Focus on building confidence, not just testing knowledge</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>🧘‍♀️</span>
                        <span>Integrated breathing exercises and mindfulness moments</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>🤗</span>
                        <span>Positive reinforcement and anxiety management support</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>📈</span>
                        <span>Visual confidence tracking to celebrate your progress</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-teal-50/80 backdrop-blur-sm p-4 rounded-lg border border-teal-200">
                    <p className="text-sm text-teal-800">
                      <strong>💡 Remember:</strong> {getRandomAnxietyTip()}
                    </p>
                  </div>
                </div>

                <ConfidenceMeter 
                  metrics={userConfidenceMetrics}
                  overallScore={overallScore}
                  className="bg-white/80 backdrop-blur-sm p-6 rounded-lg border border-blue-200"
                />
              </div>

              <Button 
                onClick={startQuiz}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white px-8 py-3"
              >
                Begin Your Confidence Journey
              </Button>
            </div>
          </div>
        )}

        {/* Breathing Exercise Phase */}
        {currentPhase === 'breathing' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg border border-blue-200 overflow-hidden">
              <div className="p-6 border-b border-blue-200 text-center">
                <h2 className="text-2xl font-semibold text-blue-800">Let&apos;s Center Ourselves</h2>
                <p className="text-muted-foreground mt-2">
                  Before we begin, let&apos;s practice the breathing techniques that will serve you underwater
                </p>
              </div>
              <BreathingExerciseComponent 
                exercise={breathingExercises[currentBreathingExercise]}
                onComplete={handleBreathingComplete}
              />
            </div>
          </div>
        )}

        {/* Quiz Phase */}
        {currentPhase === 'quiz' && (
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white/90 backdrop-blur-sm rounded-lg border border-blue-200 p-8">
                  <QuizQuestionComponent
                    question={quizQuestions[currentQuestionIndex]}
                    questionNumber={currentQuestionIndex + 1}
                    totalQuestions={quizQuestions.length}
                    onAnswer={handleAnswerSubmit}
                  />
                </div>
              </div>
              
              <div className="space-y-6">
                <ConfidenceMeter 
                  metrics={userConfidenceMetrics}
                  overallScore={overallScore}
                  className="bg-white/90 backdrop-blur-sm rounded-lg border border-blue-200 p-6"
                />
                
                <div className="bg-blue-50/80 backdrop-blur-sm p-4 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-800">
                    <strong>🌟 Progress:</strong> {answeredQuestions} questions completed
                  </p>
                  <p className="text-sm text-blue-600 mt-1">
                    {getRandomEncouragement()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mindfulness Moment Phase */}
        {currentPhase === 'mindfulness' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg border border-teal-200 overflow-hidden">
              <div className="p-6 border-b border-teal-200 text-center">
                <h2 className="text-2xl font-semibold text-teal-800">Mindful Pause</h2>
                <p className="text-muted-foreground mt-2">
                  You&apos;re doing great! Let&apos;s take a moment to center ourselves before continuing
                </p>
              </div>
              <MindfulnessMomentComponent 
                moment={mindfulnessMoments[currentMindfulnessMoment]}
                onComplete={handleMindfulnessComplete}
              />
            </div>
          </div>
        )}

        {/* Completion Phase */}
        {currentPhase === 'complete' && (
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <div className="text-6xl">🏆</div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                Confidence Journey Complete!
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                You&apos;ve completed your confidence-building session. Look how far you&apos;ve come!
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div className="space-y-6">
                <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg border border-green-200 space-y-4">
                  <h3 className="text-lg font-semibold text-green-800">🎯 Your Achievements</h3>
                  <div className="space-y-3 text-left">
                    <div className="flex justify-between items-center">
                      <span>Questions Completed:</span>
                      <span className="font-medium">{answeredQuestions}/{quizQuestions.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Correct Answers:</span>
                      <span className="font-medium">{correctAnswers}/{answeredQuestions}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Confidence Growth:</span>
                      <span className="font-medium text-green-600">
                        {overallScore - 55} points gained!
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50/80 backdrop-blur-sm p-6 rounded-lg border border-blue-200">
                  <h3 className="text-lg font-semibold text-blue-800 mb-3">🌊 Next Steps</h3>
                  <ul className="text-sm space-y-2 text-left">
                    <li>• Practice breathing techniques regularly</li>
                    <li>• Review areas where confidence can grow</li>
                    <li>• Discuss any concerns with your instructor</li>
                    <li>• Trust in your preparation and training</li>
                  </ul>
                </div>
              </div>

              <ConfidenceMeter 
                metrics={userConfidenceMetrics}
                overallScore={overallScore}
                className="bg-white/90 backdrop-blur-sm rounded-lg border border-blue-200 p-6"
              />
            </div>

            <div className="flex gap-4 justify-center">
              <Button 
                onClick={restartQuiz}
                variant="outline"
                className="px-6"
              >
                Practice Again
              </Button>
              <Button 
                onClick={() => window.location.href = '/'}
                className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 px-6"
              >
                Continue Your Journey
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}