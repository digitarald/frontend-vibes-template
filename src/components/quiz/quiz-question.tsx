'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { type QuizQuestion } from '@/lib/quiz-data';

interface QuizQuestionProps {
  question: QuizQuestion;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (isCorrect: boolean, confidenceGain: number) => void;
  className?: string;
}

export function QuizQuestionComponent({ 
  question, 
  questionNumber, 
  totalQuestions, 
  onAnswer, 
  className 
}: QuizQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    if (hasAnswered) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null || hasAnswered) return;
    
    setHasAnswered(true);
    setShowExplanation(true);
    
    const isCorrect = selectedAnswer === question.correctAnswer;
    const confidenceGain = isCorrect ? question.confidenceBoost : Math.floor(question.confidenceBoost * 0.3);
    
    onAnswer(isCorrect, confidenceGain);
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      safety: 'bg-red-100 text-red-800 border-red-200',
      equipment: 'bg-blue-100 text-blue-800 border-blue-200',
      skills: 'bg-green-100 text-green-800 border-green-200',
      emergency: 'bg-orange-100 text-orange-800 border-orange-200',
      buddy: 'bg-purple-100 text-purple-800 border-purple-200',
      mental: 'bg-teal-100 text-teal-800 border-teal-200',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      easy: 'bg-green-100 text-green-700 border-green-200',
      medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      hard: 'bg-red-100 text-red-700 border-red-200',
    };
    return colors[difficulty as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getAnswerButtonClass = (answerIndex: number) => {
    if (!hasAnswered) {
      return selectedAnswer === answerIndex 
        ? 'bg-blue-100 border-blue-300 text-blue-800' 
        : 'bg-white border-gray-200 text-gray-800 hover:bg-gray-50';
    }

    // After answering, show correct/incorrect
    if (answerIndex === question.correctAnswer) {
      return 'bg-green-100 border-green-300 text-green-800';
    }
    
    if (answerIndex === selectedAnswer && selectedAnswer !== question.correctAnswer) {
      return 'bg-red-100 border-red-300 text-red-800';
    }
    
    return 'bg-gray-50 border-gray-200 text-gray-600';
  };

  return (
    <div className={`max-w-2xl mx-auto space-y-6 ${className || ''}`}>
      {/* Question Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-xs">
            Question {questionNumber} of {totalQuestions}
          </Badge>
          <div className="flex gap-2">
            <Badge variant="outline" className={`text-xs ${getCategoryColor(question.category)}`}>
              {question.category.charAt(0).toUpperCase() + question.category.slice(1)}
            </Badge>
            <Badge variant="outline" className={`text-xs ${getDifficultyColor(question.difficulty)}`}>
              {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
            </Badge>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 bg-muted rounded-full">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-teal-500 rounded-full transition-all duration-300"
            style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="text-center space-y-4">
        <h2 className="text-xl font-semibold leading-relaxed">
          {question.question}
        </h2>
        
        {/* Deep breath reminder for harder questions */}
        {question.difficulty === 'hard' && !hasAnswered && (
          <div className="text-sm text-blue-600 bg-blue-50 p-3 rounded-lg border border-blue-200">
            🌬️ <strong>Take a deep breath.</strong> You&apos;ve got this! Trust your knowledge and instincts.
          </div>
        )}
      </div>

      {/* Answer Options */}
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(index)}
            disabled={hasAnswered}
            className={`w-full p-4 text-left border-2 rounded-lg transition-all duration-200 ${getAnswerButtonClass(index)}`}
          >
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-current flex items-center justify-center text-xs font-medium">
                {String.fromCharCode(65 + index)}
              </div>
              <span>{option}</span>
              {hasAnswered && index === question.correctAnswer && (
                <span className="ml-auto text-green-600">✓</span>
              )}
              {hasAnswered && index === selectedAnswer && selectedAnswer !== question.correctAnswer && (
                <span className="ml-auto text-red-600">✗</span>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Submit Button */}
      {!hasAnswered && (
        <div className="text-center">
          <Button 
            onClick={handleSubmit}
            disabled={selectedAnswer === null}
            className="bg-blue-600 hover:bg-blue-700 px-8"
          >
            Submit Answer
          </Button>
        </div>
      )}

      {/* Explanation and Encouragement */}
      {showExplanation && (
        <div className="space-y-4">
          {/* Result message */}
          <div className={`p-4 rounded-lg border ${
            selectedAnswer === question.correctAnswer 
              ? 'bg-green-50 border-green-200' 
              : 'bg-blue-50 border-blue-200'
          }`}>
            <div className="font-medium mb-2">
              {selectedAnswer === question.correctAnswer ? (
                <span className="text-green-800">🎉 Excellent! That&apos;s correct!</span>
              ) : (
                <span className="text-blue-800">🌊 Learning opportunity!</span>
              )}
            </div>
            <p className="text-sm text-gray-700">{question.explanation}</p>
          </div>

          {/* Encouragement */}
          <div className="p-4 bg-gradient-to-r from-blue-50 to-teal-50 rounded-lg border border-blue-200">
            <p className="text-blue-800 font-medium">{question.encouragement}</p>
          </div>

          {/* Anxiety tip if available */}
          {question.anxietyTip && (
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="text-sm">
                <span className="font-medium text-purple-800">💙 Confidence Tip: </span>
                <span className="text-purple-700">{question.anxietyTip}</span>
              </div>
            </div>
          )}

          {/* Confidence gain indicator */}
          <div className="text-center text-sm text-muted-foreground">
            <div className="flex items-center justify-center gap-2">
              <span>⭐</span>
              <span>
                +{selectedAnswer === question.correctAnswer ? question.confidenceBoost : Math.floor(question.confidenceBoost * 0.3)} 
                confidence points earned
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}