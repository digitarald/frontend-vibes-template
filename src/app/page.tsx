import { Metadata } from 'next';
import { Dashboard } from '@/components/dashboard';

export const metadata: Metadata = {
  title: 'PADI Quiz Pro',
  description: 'Gamified daily quiz for PADI Open Water certification prep',
};

export default function Home() {
  return <Dashboard />;
}
