import { Metadata } from 'next';
import { WaveDashboard } from './components/wave-dashboard';

export const metadata: Metadata = {
  title: 'Wave Dashboard | Migration Progress',
  description: 'Track migration progress organized in waves and phases',
};

export default function WaveDashboardPage() {
  return <WaveDashboard />;
}
