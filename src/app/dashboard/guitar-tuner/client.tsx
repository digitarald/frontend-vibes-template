"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Settings2 } from "lucide-react";
import { ChromaticTuner } from "@/components/guitar-tuner/chromatic-tuner";
import { GuitarModeTuner } from "@/components/guitar-tuner/guitar-mode-tuner";
import { PresetManager } from "@/components/guitar-tuner/preset-manager";
import { TuningHistory } from "@/components/guitar-tuner/tuning-history";
import { FrequencyAnalyzer } from "@/components/guitar-tuner/frequency-analyzer";
import { SettingsSidebar } from "@/components/guitar-tuner/settings-sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

export function GuitarTunerClient() {
  const [activeTab, setActiveTab] = useState("chromatic");
  const isMobile = useIsMobile();

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Guitar Tuner</h1>
          <p className="text-muted-foreground">
            Professional-grade multi-mode tuner with advanced features
          </p>
        </div>

        {/* Mobile Settings Button */}
        {isMobile && (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Settings2 className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 overflow-y-auto">
              <SettingsSidebar />
            </SheetContent>
          </Sheet>
        )}
      </div>

      {/* Main Layout */}
      {isMobile ? (
        // Mobile: Stacked Layout
        <div className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="chromatic">Chromatic</TabsTrigger>
              <TabsTrigger value="guitar">Guitar</TabsTrigger>
              <TabsTrigger value="presets">Presets</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>

            <TabsContent value="chromatic" className="space-y-6 mt-6">
              <ChromaticTuner />
              <FrequencyAnalyzer />
            </TabsContent>

            <TabsContent value="guitar" className="mt-6">
              <GuitarModeTuner />
            </TabsContent>

            <TabsContent value="presets" className="mt-6">
              <PresetManager />
            </TabsContent>

            <TabsContent value="history" className="mt-6">
              <TuningHistory />
            </TabsContent>
          </Tabs>
        </div>
      ) : (
        // Desktop: Resizable Layout with Sidebar
        <ResizablePanelGroup direction="horizontal" className="min-h-[calc(100vh-12rem)] rounded-lg border">
          {/* Main Content */}
          <ResizablePanel defaultSize={75} minSize={60}>
            <div className="h-full p-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
                <TabsList className="grid w-full max-w-md grid-cols-4 mb-6">
                  <TabsTrigger value="chromatic">Chromatic</TabsTrigger>
                  <TabsTrigger value="guitar">Guitar</TabsTrigger>
                  <TabsTrigger value="presets">Presets</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>

                <div className="h-[calc(100%-4rem)] overflow-y-auto">
                  <TabsContent value="chromatic" className="space-y-6 mt-0">
                    <ChromaticTuner />
                    <FrequencyAnalyzer />
                  </TabsContent>

                  <TabsContent value="guitar" className="mt-0">
                    <GuitarModeTuner />
                  </TabsContent>

                  <TabsContent value="presets" className="mt-0">
                    <PresetManager />
                  </TabsContent>

                  <TabsContent value="history" className="mt-0">
                    <TuningHistory />
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Settings Sidebar */}
          <ResizablePanel defaultSize={25} minSize={20} maxSize={35}>
            <Card className="h-full border-0 rounded-none">
              <div className="h-full overflow-y-auto">
                <SettingsSidebar />
              </div>
            </Card>
          </ResizablePanel>
        </ResizablePanelGroup>
      )}
    </div>
  );
}
