// filepath: /Users/digitarald/Developer/frontend-vibes/src/app/page.tsx
import { Metadata } from 'next';
import { SleepCoachClient } from '@/components/sleep-coach-client';

export const metadata: Metadata = {
  title: 'Sleep Coach Mini',
  description: 'Your 14-day AI-tailored sleep reboot',
};

export default function Home() {
  return <SleepCoachClient />;
}
