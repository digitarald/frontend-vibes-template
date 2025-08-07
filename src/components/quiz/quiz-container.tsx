"use client";

import * as React from 'react';
import { QuizIntro } from './quiz-intro';
import { ScenarioView } from './scenario-view';
import { QuizResults } from './quiz-results';
import { QuizProgress as QuizProgressComponent } from './quiz-progress';
import { mockScenarios } from './mock-data';
import { QuizState, QuizProgress } from './types';

export function QuizContainer() {
  const [quizState, setQuizState] = React.useState<QuizState>({
    currentScenarioIndex: 0,
    currentQuestionIndex: 0,
    answers: {},
    score: 0,
    completed: false,
    startTime: new Date(),
  });

  const [showIntro, setShowIntro] = React.useState(true);
  const scenarios = mockScenarios;

  const progress: QuizProgress = React.useMemo(() => {
    const totalQuestions = scenarios.reduce((total, scenario) => total + scenario.questions.length, 0);
    const answeredQuestions = Object.keys(quizState.answers).length;
    const correctAnswers = Object.entries(quizState.answers).filter(([questionId, answer]) => {
      const scenario = scenarios.find(s => s.questions.some(q => q.id === questionId));
      const question = scenario?.questions.find(q => q.id === questionId);
      return question?.correctAnswer === answer;
    }).length;

    return {
      totalScenarios: scenarios.length,
      completedScenarios: quizState.currentScenarioIndex + (quizState.completed ? 1 : 0),
      totalQuestions,
      answeredQuestions,
      correctAnswers,
      incorrectAnswers: answeredQuestions - correctAnswers,
    };
  }, [quizState.answers, quizState.currentScenarioIndex, quizState.completed, scenarios]);

  const handleStartQuiz = () => {
    setShowIntro(false);
    setQuizState(prev => ({ ...prev, startTime: new Date() }));
  };

  const handleAnswerQuestion = (questionId: string, answer: string) => {
    setQuizState(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questionId]: answer,
      },
    }));
  };

  const handleNextQuestion = () => {
    const currentScenario = scenarios[quizState.currentScenarioIndex];
    const isLastQuestion = quizState.currentQuestionIndex >= currentScenario.questions.length - 1;
    
    if (isLastQuestion) {
      // Move to next scenario
      if (quizState.currentScenarioIndex < scenarios.length - 1) {
        setQuizState(prev => ({
          ...prev,
          currentScenarioIndex: prev.currentScenarioIndex + 1,
          currentQuestionIndex: 0,
        }));
      } else {
        // Quiz completed
        setQuizState(prev => ({
          ...prev,
          completed: true,
          endTime: new Date(),
          score: progress.correctAnswers,
        }));
      }
    } else {
      // Move to next question in current scenario
      setQuizState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
      }));
    }
  };

  const handlePreviousQuestion = () => {
    if (quizState.currentQuestionIndex > 0) {
      setQuizState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex - 1,
      }));
    } else if (quizState.currentScenarioIndex > 0) {
      const prevScenario = scenarios[quizState.currentScenarioIndex - 1];
      setQuizState(prev => ({
        ...prev,
        currentScenarioIndex: prev.currentScenarioIndex - 1,
        currentQuestionIndex: prevScenario.questions.length - 1,
      }));
    }
  };

  const handleRestartQuiz = () => {
    setQuizState({
      currentScenarioIndex: 0,
      currentQuestionIndex: 0,
      answers: {},
      score: 0,
      completed: false,
      startTime: new Date(),
    });
    setShowIntro(true);
  };

  if (showIntro) {
    return <QuizIntro onStart={handleStartQuiz} totalScenarios={scenarios.length} />;
  }

  if (quizState.completed) {
    return (
      <QuizResults
        progress={progress}
        scenarios={scenarios}
        answers={quizState.answers}
        startTime={quizState.startTime}
        endTime={quizState.endTime!}
        onRestart={handleRestartQuiz}
      />
    );
  }

  const currentScenario = scenarios[quizState.currentScenarioIndex];
  const currentQuestion = currentScenario.questions[quizState.currentQuestionIndex];
  const currentAnswer = quizState.answers[currentQuestion.id];

  return (
    <div className="space-y-6">
      <QuizProgressComponent progress={progress} />
      <ScenarioView
        scenario={currentScenario}
        question={currentQuestion}
        questionIndex={quizState.currentQuestionIndex}
        selectedAnswer={currentAnswer}
        onAnswerSelect={handleAnswerQuestion}
        onNext={handleNextQuestion}
        onPrevious={handlePreviousQuestion}
        canGoBack={quizState.currentScenarioIndex > 0 || quizState.currentQuestionIndex > 0}
        isLastQuestion={
          quizState.currentScenarioIndex === scenarios.length - 1 &&
          quizState.currentQuestionIndex === currentScenario.questions.length - 1
        }
      />
    </div>
  );
}