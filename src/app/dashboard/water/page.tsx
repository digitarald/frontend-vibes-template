/**
 * Water Tracking Dashboard page
 */

'use client';

import { useState } from 'react';
import { HydrationProgress } from '@/components/water-tracking/hydration-progress';
import { QuickAddButtons } from '@/components/water-tracking/quick-add-buttons';
import { WaterLogTimeline } from '@/components/water-tracking/water-log-timeline';
import { WeeklyChart } from '@/components/water-tracking/weekly-chart';
import { StreakBadge } from '@/components/water-tracking/streak-badge';
import { ProfileSettings } from '@/components/water-tracking/profile-settings';
import {
  mockUserProfile,
  quickAddOptions,
  mockTodayStats,
  mockStreakData,
  mockWeeklyStats,
} from '@/data/water-tracking';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Activity, User } from 'lucide-react';

export default function WaterTrackingDashboard() {
  const [todayStats, setTodayStats] = useState(mockTodayStats);

  const handleAddWater = (amount: number) => {
    setTodayStats((prev) => ({
      ...prev,
      totalIntake: prev.totalIntake + amount,
      logs: [
        ...prev.logs,
        {
          id: `log-${Date.now()}`,
          timestamp: new Date(),
          amount,
          containerType: 'custom',
        },
      ],
      goalMet: prev.totalIntake + amount >= prev.goal,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-blue-950">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">
            💧 Water Tracker
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Stay hydrated, stay healthy
          </p>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="dashboard" className="gap-2">
              <Activity className="w-4 h-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="profile" className="gap-2">
              <User className="w-4 h-4" />
              Profile
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Hydration Progress */}
            <HydrationProgress stats={todayStats} />

            {/* Quick Add Buttons */}
            <QuickAddButtons options={quickAddOptions} onAdd={handleAddWater} />

            {/* Streak Badge */}
            <StreakBadge streak={mockStreakData} />

            {/* Water Log Timeline */}
            <WaterLogTimeline logs={todayStats.logs} />

            {/* Weekly Chart */}
            <WeeklyChart data={mockWeeklyStats} />
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <ProfileSettings profile={mockUserProfile} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
