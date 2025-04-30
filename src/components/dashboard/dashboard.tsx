"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getFromLocalStorage, saveToLocalStorage } from '@/lib/utils';
import { SleepLog, DailyPlan } from '@/lib/types';
import { Moon, Sun, Award, Settings, CheckCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Dashboard({ onRestart }: { onRestart: () => void }) {
  const [currentStreak, setCurrentStreak] = useState(0);
  const [todayPlan, setTodayPlan] = useState<DailyPlan | null>(null);
  const [advisorTip, setAdvisorTip] = useState<string>('');
  const [sleepTimer, setSleepTimer] = useState<{ active: boolean; startTime?: Date }>({
    active: false,
  });
  const [elapsedTime, setElapsedTime] = useState<string>('0:00:00');
  const [showRewardsDrawer, setShowRewardsDrawer] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [goalCompleted, setGoalCompleted] = useState(false);

  // Load user data and current day's plan
  useEffect(() => {
    const data = getFromLocalStorage();
    if (data?.streak) {
      setCurrentStreak(data.streak.current);
    }
    
    if (data?.plan && data.plan.length > 0) {
      // Get today's plan (Day 1 to start)
      const today = new Date();
      const createdDate = data.userProfile?.createdAt 
        ? new Date(data.userProfile.createdAt) 
        : today;
      
      // Calculate days since starting the plan
      const daysSinceStart = Math.floor(
        (today.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24)
      );
      
      // Get the current day's plan (capped at the last day)
      const dayIndex = Math.min(daysSinceStart, data.plan.length - 1);
      setTodayPlan(data.plan[dayIndex]);
      setGoalCompleted(data.plan[dayIndex].completed);
    }
    
    // Check if there's an ongoing sleep timer
    const activeLog = data?.sleepLogs?.find(log => !log.end);
    if (activeLog) {
      setSleepTimer({
        active: true,
        startTime: new Date(activeLog.start)
      });
    }
    
    // Generate advisor tip based on user profile
    generateAdvisorTip(data?.userProfile?.wizardAnswers);
  }, []);
  
  // Update elapsed time if sleep timer is active
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (sleepTimer.active && sleepTimer.startTime) {
      interval = setInterval(() => {
        const now = new Date();
        const start = sleepTimer.startTime as Date;
        const diff = now.getTime() - start.getTime();
        
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        setElapsedTime(
          `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        );
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [sleepTimer]);
  
  const generateAdvisorTip = (wizardAnswers?: Record<string, string>) => {
    // In a real app, this would call an API to generate a tip
    // For now, we'll use a simple system based on the main concern
    const mainConcern = wizardAnswers?.['main-concern'] || 'duration';
    
    const tips: Record<string, string[]> = {
      duration: [
        "Try to maintain the same bedtime every day, even on weekends.",
        "Aim for 7-9 hours of sleep consistently for improved cognitive function.",
        "Keep your bedroom as dark as possible to support melatonin production."
      ],
      awakenings: [
        "Limit fluids 2 hours before bedtime to reduce bathroom visits.",
        "Consider white noise to mask disruptive sounds during sleep.",
        "Practice 4-7-8 breathing if you wake up: inhale for 4, hold for 7, exhale for 8."
      ],
      energy: [
        "Morning sunlight exposure helps regulate your circadian rhythm.",
        "A 20-minute power nap before 3 PM can boost afternoon energy.",
        "Consider light exercise when feeling sluggish instead of caffeine."
      ],
      other: [
        "Create a consistent wind-down routine to signal your body it's time for sleep.",
        "Keep your bedroom temperature between 65-68°F for optimal sleep.",
        "Try a sleep journal to identify patterns affecting your rest."
      ]
    };
    
    // Get a random tip based on the main concern
    const concernTips = tips[mainConcern as keyof typeof tips] || tips.other;
    const randomIndex = Math.floor(Math.random() * concernTips.length);
    setAdvisorTip(concernTips[randomIndex]);
  };

  const handleStartSleep = () => {
    const now = new Date();
    
    // Create a new sleep log
    const newLog: SleepLog = {
      start: now.toISOString()
    };
    
    // Save to localStorage
    const data = getFromLocalStorage() || {};
    const updatedLogs = [...(data.sleepLogs || []), newLog];
    saveToLocalStorage({ sleepLogs: updatedLogs });
    
    // Update state
    setSleepTimer({
      active: true,
      startTime: now
    });
  };
  
  const handleEndSleep = () => {
    const now = new Date();
    
    // Get the current data
    const data = getFromLocalStorage() || {};
    const logs = [...(data.sleepLogs || [])];
    
    // Find the active log and update it
    const activeLogIndex = logs.findIndex(log => !log.end);
    if (activeLogIndex !== -1) {
      const startTime = new Date(logs[activeLogIndex].start);
      const durationMs = now.getTime() - startTime.getTime();
      const durationHours = durationMs / (1000 * 60 * 60);
      
      logs[activeLogIndex] = {
        ...logs[activeLogIndex],
        end: now.toISOString(),
        duration: parseFloat(durationHours.toFixed(2))
      };
      
      // Update streak if applicable
      const streak = data.streak || { current: 0, longest: 0, lastUpdated: new Date().toISOString() };
      const lastUpdated = new Date(streak.lastUpdated);
      const daysSinceLastUpdate = Math.floor(
        (now.getTime() - lastUpdated.getTime()) / (1000 * 60 * 60 * 24)
      );
      
      // Only increment streak if it's a new day
      if (daysSinceLastUpdate > 0) {
        streak.current += 1;
        streak.longest = Math.max(streak.current, streak.longest);
        streak.lastUpdated = now.toISOString();
      }
      
      // Save updated data
      saveToLocalStorage({ 
        sleepLogs: logs,
        streak
      });
      
      // Update state
      setSleepTimer({ active: false });
      setCurrentStreak(streak.current);
      
      // Show quick journal modal (not implemented in this version)
      // showQuickJournalModal();
    }
  };
  
  const toggleGoalComplete = () => {
    if (!todayPlan) return;
    
    // Update the plan
    const data = getFromLocalStorage() || {};
    const plan = [...(data.plan || [])];
    
    const dayIndex = plan.findIndex(p => p.day === todayPlan.day);
    if (dayIndex !== -1) {
      plan[dayIndex] = {
        ...plan[dayIndex],
        completed: !plan[dayIndex].completed
      };
      
      // Save updated plan
      saveToLocalStorage({ plan });
      
      // Update state
      setGoalCompleted(!goalCompleted);
      setTodayPlan({
        ...todayPlan,
        completed: !todayPlan.completed
      });
    }
  };
  
  const handleShowRewards = () => {
    setShowRewardsDrawer(true);
  };
  
  const handleCloseRewards = () => {
    setShowRewardsDrawer(false);
  };
  
  const handleShowSettings = () => {
    setShowSettings(true);
  };
  
  const handleCloseSettings = () => {
    setShowSettings(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 pt-4 pb-6 px-4">
      {/* Top bar */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={handleShowRewards}
          className="flex items-center text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          <Award className="mr-2 h-5 w-5" />
          <span className="font-medium">{currentStreak} day streak</span>
        </button>
        
        <button
          onClick={handleShowSettings}
          className="text-slate-400 hover:text-slate-300 transition-colors"
        >
          <Settings className="h-6 w-6" />
        </button>
      </div>
      
      {/* Main content */}
      <div className="max-w-md mx-auto space-y-6">
        {/* Sleep timer button */}
        {sleepTimer.active ? (
          <div className="bg-indigo-900/60 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-indigo-100 mb-2">{elapsedTime}</div>
            <div className="text-indigo-300 mb-4">Sleep in progress</div>
            <Button 
              onClick={handleEndSleep}
              className="bg-amber-600 hover:bg-amber-500 text-white"
              size="lg"
            >
              <Sun className="mr-2 h-5 w-5" />
              I&apos;m Up
            </Button>
          </div>
        ) : (
          <Button
            onClick={handleStartSleep}
            className="w-full py-8 text-xl bg-indigo-800 hover:bg-indigo-700 text-white flex items-center justify-center gap-3"
            size="lg"
          >
            <Moon className="h-6 w-6" />
            Lights-Out
          </Button>
        )}
        
        {/* Today's plan */}
        {todayPlan && (
          <Card className="border-slate-700 bg-slate-800/50">
            <CardContent className="pt-6 pb-4">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center justify-between">
                Today&apos;s Plan
                <span className="text-sm font-normal text-slate-400">Day {todayPlan.day}/14</span>
              </h2>
              
              <div className="space-y-4">
                {/* Micro-goal card */}
                <div 
                  className={cn(
                    "p-4 rounded-lg border border-slate-700 flex items-start justify-between",
                    goalCompleted && "bg-green-950/20 border-green-800/50"
                  )}
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-white mb-1">Today&apos;s micro-habit</h3>
                    <p className="text-slate-300">{todayPlan.goal}</p>
                  </div>
                  <button 
                    onClick={toggleGoalComplete}
                    className={cn(
                      "flex-shrink-0 ml-3",
                      goalCompleted ? "text-green-400" : "text-slate-500"
                    )}
                  >
                    <CheckCircle className="h-6 w-6" />
                  </button>
                </div>
                
                {/* Advisor tip */}
                <div className="p-4 rounded-lg border border-slate-700 bg-indigo-900/20">
                  <h3 className="font-medium text-white mb-1">Advisor Tip</h3>
                  <p className="text-slate-300">{advisorTip}</p>
                </div>
                
                {/* Sleep targets */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 rounded-lg border border-slate-700 bg-slate-800/80">
                    <div className="flex items-center mb-1">
                      <Moon className="h-4 w-4 text-indigo-400 mr-2" />
                      <h3 className="font-medium text-white">Bedtime Target</h3>
                    </div>
                    <p className="text-xl font-bold text-white">{todayPlan.bedtime}</p>
                  </div>
                  
                  <div className="p-4 rounded-lg border border-slate-700 bg-slate-800/80">
                    <div className="flex items-center mb-1">
                      <Sun className="h-4 w-4 text-amber-400 mr-2" />
                      <h3 className="font-medium text-white">Wake Target</h3>
                    </div>
                    <p className="text-xl font-bold text-white">{todayPlan.waketime}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      
      {/* Rewards drawer (simplified version) */}
      {showRewardsDrawer && (
        <div className="fixed inset-0 bg-black/50 z-30 flex items-center justify-center p-4">
          <div className="bg-slate-800 rounded-lg p-6 max-w-md w-full">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <Award className="h-6 w-6 text-amber-400 mr-2" />
              Your Achievements
            </h2>
            
            <div className="space-y-4 mb-6">
              <div className="p-4 border border-slate-700 rounded-lg bg-slate-900/50">
                <div className="flex items-center">
                  <div className="h-12 w-12 bg-indigo-900 rounded-full flex items-center justify-center text-indigo-300 mr-4">
                    {currentStreak >= 7 ? (
                      <Award className="h-6 w-6 text-yellow-400" />
                    ) : currentStreak >= 3 ? (
                      <Award className="h-6 w-6 text-slate-400" />
                    ) : (
                      <Award className="h-6 w-6 text-amber-800" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-white">Current Streak</h3>
                    <p className="text-2xl font-bold text-white">{currentStreak} days</p>
                  </div>
                </div>
              </div>
              
              {currentStreak === 0 && (
                <div className="text-center text-slate-400 py-2">
                  <AlertCircle className="h-5 w-5 mx-auto mb-2" />
                  <p>You haven&apos;t started your streak yet.</p>
                  <p className="text-sm">Log your sleep tonight to begin!</p>
                </div>
              )}
              
              {currentStreak > 0 && (
                <div className="text-center">
                  <Button className="bg-indigo-600 hover:bg-indigo-500">
                    Share Your Progress
                  </Button>
                </div>
              )}
            </div>
            
            <div className="flex justify-end">
              <Button 
                variant="ghost" 
                onClick={handleCloseRewards}
                className="text-slate-400 hover:text-slate-300"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {/* Settings panel (simplified version) */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/50 z-30 flex items-center justify-center p-4">
          <div className="bg-slate-800 rounded-lg p-6 max-w-md w-full">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <Settings className="h-6 w-6 text-slate-400 mr-2" />
              Settings
            </h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between p-3 border border-slate-700 rounded-lg">
                <div>
                  <h3 className="font-medium text-white">Bedtime Reminder</h3>
                  <p className="text-sm text-slate-400">60 min before target time</p>
                </div>
                <div className="h-6 w-11 relative">
                  <input type="checkbox" className="sr-only" id="bedtime-toggle" />
                  <label
                    htmlFor="bedtime-toggle"
                    className="block h-6 w-11 rounded-full bg-slate-700 cursor-pointer"
                  >
                    <span className="block h-4 w-4 mt-1 ml-1 bg-slate-400 rounded-full transition-transform duration-200 ease-in-out" />
                  </label>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 border border-slate-700 rounded-lg">
                <div>
                  <h3 className="font-medium text-white">Morning Reminder</h3>
                  <p className="text-sm text-slate-400">At target wake time</p>
                </div>
                <div className="h-6 w-11 relative">
                  <input type="checkbox" className="sr-only" id="morning-toggle" />
                  <label
                    htmlFor="morning-toggle"
                    className="block h-6 w-11 rounded-full bg-slate-700 cursor-pointer"
                  >
                    <span className="block h-4 w-4 mt-1 ml-1 bg-slate-400 rounded-full transition-transform duration-200 ease-in-out" />
                  </label>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                className="w-full text-amber-400 border-amber-800 hover:bg-amber-900/20"
                onClick={onRestart}
              >
                Re-take Wizard
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full text-red-400 border-red-800 hover:bg-red-900/20"
                onClick={() => {
                  localStorage.removeItem('sleep-coach-mini-data');
                  onRestart();
                }}
              >
                Clear All Data
              </Button>
            </div>
            
            <div className="flex justify-end">
              <Button 
                variant="ghost" 
                onClick={handleCloseSettings}
                className="text-slate-400 hover:text-slate-300"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
