"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DailyPlan, UserProfile } from "@/lib/types";
import { Moon, Sun, ArrowDown, Sparkles } from "lucide-react";
import { saveToLocalStorage } from "@/lib/utils";

interface PlanRevealProps {
  userAnswers: Record<string, string>;
  onComplete: () => void;
}

export function PlanReveal({ userAnswers, onComplete }: PlanRevealProps) {
  const [isRevealing, setIsRevealing] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const [plan, setPlan] = useState<{
    bedtime: string;
    wakeTime: string;
    microHabit: string;
    journalPrompt: string;
  } | null>(null);

  // Generate a plan based on user answers
  useEffect(() => {
    const generatePlan = async () => {
      // In a real implementation, this would call an AI service via OpenRouter
      // For now, we'll create a simple plan based on the answers
      
      // Simulate an API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Generate a plan based on main sleep concern
      const mainConcern = userAnswers["main-concern"] || "duration";
      
      const plan: DailyPlan[] = [];
      let bedtime = "";
      let wakeTime = "";
      let microHabit = "";
      let journalPrompt = "";
      
      // Simple logic to determine recommendations based on main concern
      switch(mainConcern) {
        case "duration":
          bedtime = "10:30 PM";
          wakeTime = "6:30 AM";
          microHabit = "No screens 30 minutes before bed";
          journalPrompt = "What activities helped you feel tired today?";
          break;
        case "awakenings":
          bedtime = "11:00 PM";
          wakeTime = "7:00 AM";
          microHabit = "Keep bedroom temperature between 65-68°F";
          journalPrompt = "What disruptions did you notice in your sleep last night?";
          break;
        case "energy":
          bedtime = "10:00 PM";
          wakeTime = "6:00 AM";
          microHabit = "Spend 10 minutes in natural sunlight after waking";
          journalPrompt = "Rate your energy levels throughout the day on a scale of 1-10";
          break;
        default:
          bedtime = "10:30 PM";
          wakeTime = "6:30 AM";
          microHabit = "Practice 5 minutes of deep breathing before bed";
          journalPrompt = "What would an ideal night's sleep look like for you?";
      }
      
      // Create 14-day plan (we'll just create a template here)
      for (let i = 0; i < 14; i++) {
        plan.push({
          day: i + 1,
          bedtime,
          waketime: wakeTime,
          goal: i === 0 ? microHabit : `Day ${i + 1} goal will be revealed later`,
          completed: false
        });
      }
      
      // Save the plan and user profile to localStorage
      const userProfile: UserProfile = {
        wizardAnswers: userAnswers,
        chronoType: mainConcern === "energy" ? "early-bird" : "night-owl",
        barriers: [mainConcern],
        createdAt: new Date().toISOString()
      };
      
      saveToLocalStorage({
        userProfile,
        plan
      });
      
      // Update state to show the plan reveal
      setPlan({
        bedtime,
        wakeTime,
        microHabit,
        journalPrompt
      });
      
      // Trigger confetti animation after plan is ready
      setShowConfetti(true);
      setIsRevealing(false);
    };
    
    if (isRevealing) {
      generatePlan();
    }
  }, [userAnswers, isRevealing]);

  return (
    <div className="relative w-full max-w-md mx-auto">
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none flex justify-center items-center z-10">
          <div className="absolute inset-0 flex items-center justify-center">
            {Array.from({ length: 50 }).map((_, index) => {
              const randomLeft = Math.random() * 100;
              const randomDelay = Math.random() * 0.5;
              const randomDuration = 0.5 + Math.random() * 1;
              const randomSize = 5 + Math.random() * 10;
              const randomColor = [
                "bg-yellow-500", 
                "bg-indigo-500", 
                "bg-pink-500", 
                "bg-emerald-500",
                "bg-blue-500"
              ][Math.floor(Math.random() * 5)];
              
              return (
                <div
                  key={index}
                  className={`absolute rounded-full ${randomColor}`}
                  style={{
                    left: `${randomLeft}%`,
                    width: `${randomSize}px`,
                    height: `${randomSize}px`,
                    animation: `confetti ${randomDuration}s ease-out ${randomDelay}s forwards`,
                  }}
                />
              );
            })}
          </div>
        </div>
      )}
      
      <Card className="overflow-hidden">
        <CardHeader className="flex flex-col items-center text-center pb-0">
          <Sparkles className="h-12 w-12 text-yellow-500 mb-2" />
          <h2 className="text-3xl font-bold">Your 14-Day Plan is Ready!</h2>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Here&apos;s your personalized sleep plan
          </p>
        </CardHeader>
        
        <CardContent className="pt-6 space-y-4">
          {isRevealing ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          ) : plan ? (
            <>
              <div className="grid gap-4">
                <Card className="bg-indigo-50 dark:bg-indigo-950 border-none">
                  <CardContent className="p-4 flex items-center space-x-3">
                    <div className="bg-indigo-100 dark:bg-indigo-900 rounded-full p-2">
                      <Moon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <h3 className="font-medium">Bedtime Goal</h3>
                      <p className="text-xl font-bold">{plan.bedtime}</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-amber-50 dark:bg-amber-950 border-none">
                  <CardContent className="p-4 flex items-center space-x-3">
                    <div className="bg-amber-100 dark:bg-amber-900 rounded-full p-2">
                      <Sun className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div>
                      <h3 className="font-medium">Wake Goal</h3>
                      <p className="text-xl font-bold">{plan.wakeTime}</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-emerald-50 dark:bg-emerald-950 border-none">
                  <CardContent className="p-4 flex items-center space-x-3">
                    <div className="bg-emerald-100 dark:bg-emerald-900 rounded-full p-2">
                      <Sparkles className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="font-medium">Tonight&apos;s Micro-Habit</h3>
                      <p className="text-md font-bold">{plan.microHabit}</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-violet-50 dark:bg-violet-950 border-none">
                  <CardContent className="p-4 flex items-center space-x-3">
                    <div className="bg-violet-100 dark:bg-violet-900 rounded-full p-2">
                      <ArrowDown className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                    </div>
                    <div>
                      <h3 className="font-medium">Journal Prompt</h3>
                      <p className="text-md font-bold">{plan.journalPrompt}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          ) : (
            <p>Something went wrong with your plan generation. Please try again.</p>
          )}
        </CardContent>
        
        <CardFooter className="flex justify-center">
          <Button
            onClick={onComplete}
            disabled={isRevealing}
            size="lg"
            className="font-semibold"
          >
            Let&apos;s Go!
          </Button>
        </CardFooter>
      </Card>

      <style jsx global>{`
        @keyframes confetti {
          0% {
            transform: translateY(-50vh) translateX(0) rotate(0);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) translateX(20px) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
