"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import type { InstrumentType, TuningPresetKey, TunerSettings, PitchDetectionResult } from '@/types/guitar-tuner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { InstrumentSelector } from './instrument-selector';
import { TuningPresets } from './tuning-presets';
import { SettingsPanel } from './settings-panel';
import { ChromaticMode } from './chromatic-mode';
import { AdvancedAudioAnalyzer, isInTune, calculateCents } from '@/lib/advanced-audio-utils';
import { getDefaultPreset, TUNING_PRESETS } from '@/lib/tuning-presets';
import { Mic, MicOff, Settings, AlertCircle } from 'lucide-react';

const DEFAULT_SETTINGS: TunerSettings = {
  a4Frequency: 440,
  sensitivity: 50,
  tolerance: 5,
  chromaticMode: false,
  autoDetect: true,
  temperament: 'equal',
  visualizationMode: 'meter',
};

export function AdvancedTuner() {
  // Core state
  const [instrument, setInstrument] = useState<InstrumentType>('guitar');
  const [tuningPreset, setTuningPreset] = useState<TuningPresetKey>('standard');
  const [settings, setSettings] = useState<TunerSettings>(DEFAULT_SETTINGS);
  const [isActive, setIsActive] = useState(false);
  const [currentNote, setCurrentNote] = useState<PitchDetectionResult | null>(null);
  const [selectedStringIndex, setSelectedStringIndex] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  
  const analyzerRef = useRef<AdvancedAudioAnalyzer | null>(null);

  // Get current tuning notes
  const currentTuning = TUNING_PRESETS[tuningPreset];
  const targetNote = currentTuning?.notes[selectedStringIndex];

  // Load settings from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('tuner-settings');
    if (saved) {
      try {
        setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(saved) });
      } catch {
        // Ignore parse errors
      }
    }
  }, []);

  // Save settings to localStorage
  useEffect(() => {
    localStorage.setItem('tuner-settings', JSON.stringify(settings));
  }, [settings]);

  // Update analyzer settings when they change
  useEffect(() => {
    if (analyzerRef.current) {
      analyzerRef.current.updateSettings(settings.a4Frequency, settings.sensitivity);
    }
  }, [settings.a4Frequency, settings.sensitivity]);

  // Handle instrument change
  const handleInstrumentChange = useCallback((newInstrument: InstrumentType) => {
    setInstrument(newInstrument);
    const defaultPreset = getDefaultPreset(newInstrument);
    setTuningPreset(defaultPreset.id);
    setSelectedStringIndex(0);
  }, []);

  // Handle tuning preset change
  const handleTuningPresetChange = useCallback((preset: TuningPresetKey) => {
    setTuningPreset(preset);
    setSelectedStringIndex(0);
  }, []);

  // Handle settings change
  const handleSettingsChange = useCallback((newSettings: Partial<TunerSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  }, []);

  // Start tuner
  const startTuner = async () => {
    try {
      setError(null);
      const analyzer = new AdvancedAudioAnalyzer(settings.a4Frequency, settings.sensitivity);
      await analyzer.initialize();
      
      analyzer.startDetection((result) => {
        setCurrentNote(result);
      });
      
      analyzerRef.current = analyzer;
      setIsActive(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to access microphone');
    }
  };

  // Stop tuner
  const stopTuner = () => {
    if (analyzerRef.current) {
      analyzerRef.current.cleanup();
      analyzerRef.current = null;
    }
    setIsActive(false);
    setCurrentNote(null);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (analyzerRef.current) {
        analyzerRef.current.cleanup();
      }
    };
  }, []);

  // Calculate tuning status for target note
  const getTuningStatus = useCallback(() => {
    if (!currentNote || !targetNote) return null;
    
    const cents = calculateCents(currentNote.frequency, targetNote.frequency);
    const inTune = isInTune(cents, settings.tolerance);
    
    return { cents, inTune };
  }, [currentNote, targetNote, settings.tolerance]);

  const tuningStatus = getTuningStatus();

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <InstrumentSelector value={instrument} onChange={handleInstrumentChange} />
        </div>
        <div className="flex-1">
          <TuningPresets
            instrument={instrument}
            value={tuningPreset}
            onChange={handleTuningPresetChange}
          />
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Main Content */}
      <Tabs defaultValue="tuner" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="tuner">String Tuner</TabsTrigger>
          <TabsTrigger value="chromatic">Chromatic</TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="h-4 w-4 md:mr-2" />
            <span className="hidden md:inline">Settings</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tuner" className="space-y-6">
          {/* Tuner Control */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>String Tuner</span>
                <Button
                  onClick={isActive ? stopTuner : startTuner}
                  variant={isActive ? "destructive" : "default"}
                  size="sm"
                >
                  {isActive ? (
                    <>
                      <MicOff className="h-4 w-4 mr-2" />
                      Stop
                    </>
                  ) : (
                    <>
                      <Mic className="h-4 w-4 mr-2" />
                      Start
                    </>
                  )}
                </Button>
              </CardTitle>
              <CardDescription>
                Select a string and tune until the indicator turns green
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* String Selection */}
              <div className="space-y-2">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                  {currentTuning?.notes.map((note, index) => (
                    <Button
                      key={index}
                      variant={selectedStringIndex === index ? "default" : "outline"}
                      onClick={() => setSelectedStringIndex(index)}
                      className="h-16 flex flex-col"
                    >
                      <span className="text-xs text-muted-foreground">String {index + 1}</span>
                      <span className="text-2xl font-bold">{note.name}</span>
                      <span className="text-xs">{note.frequency.toFixed(1)} Hz</span>
                    </Button>
                  ))}
                </div>
              </div>

              {isActive && targetNote && (
                <>
                  {/* Current Detection */}
                  <div className="text-center space-y-2">
                    {currentNote ? (
                      <>
                        <div className={cn(
                          "text-5xl font-bold transition-colors",
                          tuningStatus?.inTune ? "text-green-600 dark:text-green-500" : "text-foreground"
                        )}>
                          {currentNote.note}{currentNote.octave}
                        </div>
                        <div className="text-lg text-muted-foreground">
                          {currentNote.frequency.toFixed(2)} Hz
                        </div>
                      </>
                    ) : (
                      <div className="text-2xl text-muted-foreground py-8">
                        Play string {selectedStringIndex + 1}
                      </div>
                    )}
                  </div>

                  {/* Tuning Meter */}
                  {tuningStatus && (
                    <div className="space-y-4">
                      <div className="relative h-12 bg-muted rounded-lg overflow-hidden">
                        {/* Center line */}
                        <div className="absolute left-1/2 top-0 w-0.5 h-full bg-border z-10" />
                        
                        {/* Tolerance zone */}
                        <div
                          className="absolute top-0 h-full bg-green-500/20"
                          style={{
                            left: `calc(50% - ${settings.tolerance}%)`,
                            width: `${settings.tolerance * 2}%`
                          }}
                        />
                        
                        {/* Tuning indicator */}
                        <div
                          className={cn(
                            "absolute top-0 h-full w-3 rounded transition-all",
                            tuningStatus.inTune ? "bg-green-600 dark:bg-green-500" :
                            tuningStatus.cents > 0 ? "bg-orange-600 dark:bg-orange-500" :
                            "bg-blue-600 dark:bg-blue-500"
                          )}
                          style={{
                            left: `calc(50% + ${Math.max(-50, Math.min(50, tuningStatus.cents))}%)`,
                            transform: 'translateX(-50%)'
                          }}
                        />
                      </div>

                      {/* Cents Display */}
                      <div className="flex justify-center items-baseline gap-2">
                        <span className={cn(
                          "text-3xl font-mono font-bold",
                          tuningStatus.inTune ? "text-green-600 dark:text-green-500" :
                          tuningStatus.cents > 0 ? "text-orange-600 dark:text-orange-500" :
                          "text-blue-600 dark:bg-blue-500"
                        )}>
                          {tuningStatus.cents > 0 ? '+' : ''}{tuningStatus.cents}
                        </span>
                        <span className="text-lg text-muted-foreground">cents</span>
                      </div>

                      {tuningStatus.inTune && (
                        <div className="text-center text-lg font-semibold text-green-600 dark:text-green-500">
                          ✓ In Tune
                        </div>
                      )}

                      {/* Tuning Direction */}
                      {!tuningStatus.inTune && (
                        <div className="text-center text-sm text-muted-foreground">
                          {tuningStatus.cents > 0 ? '⬆ Tune Down (Sharp)' : '⬇ Tune Up (Flat)'}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Confidence Indicator */}
                  {currentNote && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>Signal:</span>
                      <Progress value={currentNote.confidence * 100} className="flex-1" />
                      <span className="w-12 text-right">{Math.round(currentNote.confidence * 100)}%</span>
                    </div>
                  )}
                </>
              )}

              {!isActive && (
                <div className="text-center py-12 text-muted-foreground">
                  Click Start to begin tuning
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="chromatic">
          <ChromaticMode currentNote={isActive ? currentNote : null} tolerance={settings.tolerance} />
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardContent className="pt-6">
              <SettingsPanel settings={settings} onChange={handleSettingsChange} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
