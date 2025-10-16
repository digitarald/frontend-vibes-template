/**
 * Weekly hydration chart component
 * Bar chart showing daily intake vs goal for the week
 */

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card } from '@/components/ui/card';
import { WeeklyStats } from '@/types/water-tracking';

interface WeeklyChartProps {
  data: WeeklyStats;
}

export function WeeklyChart({ data }: WeeklyChartProps) {
  const chartData = data.days.map((day) => ({
    date: day.date.toLocaleDateString('en-US', { weekday: 'short' }),
    intake: day.totalIntake,
    goal: day.goal,
    goalMet: day.goalMet,
  }));

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            Weekly Overview
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            {data.daysGoalMet} of 7 days met goal • Avg: {data.averageIntake} ml
          </p>
        </div>

        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12 }}
              stroke="currentColor"
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              stroke="currentColor"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--color-background)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
              }}
              formatter={(value) => `${value} ml`}
            />
            <Legend />
            <Bar
              dataKey="intake"
              fill="hsl(199 89% 48%)"
              name="Intake"
              radius={[8, 8, 0, 0]}
            />
            <Bar
              dataKey="goal"
              fill="hsl(160 84% 39%)"
              name="Goal"
              opacity={0.5}
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
