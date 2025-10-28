import { Metadata } from 'next';
import { AdvancedTuner } from '@/components/guitar-tuner/advanced-tuner';

export const metadata: Metadata = {
  title: 'Advanced Guitar Tuner | Professional Multi-Instrument Tuner',
  description: 'Professional-grade guitar tuner with chromatic mode, multiple tuning presets, and advanced calibration settings for serious musicians.',
};

export default function GuitarTunerPage() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="space-y-6">
        {/* Page Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Advanced Guitar Tuner</h1>
          <p className="text-lg text-muted-foreground">
            Professional multi-instrument tuner with chromatic mode, comprehensive tuning presets, 
            and precision calibration controls.
          </p>
        </div>

        {/* Main Tuner Component */}
        <AdvancedTuner />

        {/* Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8">
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-semibold mb-2">Multiple Instruments</h3>
            <p className="text-sm text-muted-foreground">
              Support for guitar, bass, ukulele, and mandolin with various tuning presets.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-semibold mb-2">High Precision</h3>
            <p className="text-sm text-muted-foreground">
              Advanced FFT analysis with autocorrelation for professional-grade accuracy.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-semibold mb-2">Customizable</h3>
            <p className="text-sm text-muted-foreground">
              Adjustable A4 calibration, sensitivity, tolerance, and temperament settings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
