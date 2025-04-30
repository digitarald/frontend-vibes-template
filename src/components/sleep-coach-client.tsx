"use client";

import { useState, useEffect, Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { WizardCard } from '@/components/wizard/wizard-card';
import { PlanReveal } from '@/components/wizard/plan-reveal';
import { Dashboard } from '@/components/dashboard/dashboard';
import { getFromLocalStorage } from '@/lib/utils';
import { MoonStar } from 'lucide-react';

const APP_STATES = {
  HERO: 'hero',
  WIZARD: 'wizard',
  PLAN_REVEAL: 'planReveal',
  DASHBOARD: 'dashboard',
} as const;

type AppState = typeof APP_STATES[keyof typeof APP_STATES];

export function SleepCoachClient() {
  const [appState, setAppState] = useState<AppState>(APP_STATES.HERO);
  const [wizardAnswers, setWizardAnswers] = useState<Record<string, string>>({});
  const [hasExistingData, setHasExistingData] = useState(false);

  // Check if user already has data
  useEffect(() => {
    const storedData = getFromLocalStorage();
    if (storedData?.userProfile) {
      setHasExistingData(true);
      // If user has data, go directly to dashboard unless querystring specifies otherwise
      if (typeof window !== 'undefined' && !window.location.search.includes('hero=true')) {
        setAppState(APP_STATES.DASHBOARD);
      }
    }
    
    // Check for fast mode (for testing)
    if (typeof window !== 'undefined' && window.location.search.includes('fast=true')) {
      console.log('🚀 Fast mode enabled: 24h cycles compressed to 2min');
    }
  }, []);

  const handleStartClick = () => {
    setAppState(APP_STATES.WIZARD);
  };

  const handleWizardComplete = (answers: Record<string, string>) => {
    setWizardAnswers(answers);
    setAppState(APP_STATES.PLAN_REVEAL);
  };

  const handlePlanComplete = () => {
    setAppState(APP_STATES.DASHBOARD);
  };
  
  const handleRestart = () => {
    setAppState(APP_STATES.HERO);
  };

  // Render the appropriate component based on the current state
  const renderContent = () => {
    switch (appState) {
      case APP_STATES.WIZARD:
        return <WizardCard onComplete={handleWizardComplete} />;
      case APP_STATES.PLAN_REVEAL:
        return <PlanReveal userAnswers={wizardAnswers} onComplete={handlePlanComplete} />;
      case APP_STATES.DASHBOARD:
        return <Dashboard onRestart={handleRestart} />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-screen">
            <div className="relative z-10 text-center max-w-2xl px-4">
              <MoonStar className="h-20 w-20 mx-auto mb-6 text-indigo-400" />
              <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
                Reboot Your Sleep in 14 Days
              </h1>
              <p className="text-xl text-slate-300 mb-8 max-w-xl mx-auto">
                A personalized, AI-powered sleep coach that helps you develop better sleep habits — no sign-up required.
              </p>
              <Button 
                size="lg" 
                onClick={handleStartClick}
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-6 rounded-lg text-lg font-semibold"
              >
                Start
              </Button>
              {hasExistingData && (
                <p className="mt-4 text-slate-400">
                  <button onClick={() => setAppState(APP_STATES.DASHBOARD)} className="underline">
                    Return to your existing plan
                  </button>
                </p>
              )}
            </div>
          </div>
        );
    }
  };

  return (
    <main 
      className="min-h-screen bg-gradient-to-b from-slate-900 to-indigo-950 flex flex-col items-center justify-center p-4"
    >
      <Suspense fallback={<div className="text-white">Loading...</div>}>
        {renderContent()}
      </Suspense>
    </main>
  );
}
