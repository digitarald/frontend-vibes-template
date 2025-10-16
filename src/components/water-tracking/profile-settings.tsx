/**
 * Profile/settings component for water tracking
 * Displays and allows editing of user profile and hydration goal
 */

import { UserProfile } from '@/types/water-tracking';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';

interface ProfileSettingsProps {
  profile: UserProfile;
}

export function ProfileSettings({ profile }: ProfileSettingsProps) {
  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
            Profile
          </h2>
          <Button variant="ghost" size="sm">
            <Settings className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
                Name
              </p>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                {profile.name}
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
                Weight
              </p>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                {profile.weight} kg
              </p>
            </div>
          </div>

          <div className="space-y-1 pt-4 border-t border-slate-200 dark:border-slate-700">
            <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
              Daily Hydration Goal
            </p>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {profile.dailyGoal.toLocaleString()}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {profile.preferredUnit === 'ml' ? 'ml' : 'fl oz'} per day
              </p>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              Recommended: 1.5-3L daily (varies by activity, climate, and health)
            </p>
          </div>
        </div>

        <Button className="w-full" variant="outline">
          Edit Profile
        </Button>
      </div>
    </Card>
  );
}
