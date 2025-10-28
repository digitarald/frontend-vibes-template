"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Music, Trash2 } from "lucide-react";
import { tuningPresets } from "@/data/guitar-tuner";
import type { TuningPreset } from "@/types/guitar-tuner";

export function PresetManager() {
  const [presets, setPresets] = useState<TuningPreset[]>(tuningPresets);
  const [selectedPreset, setSelectedPreset] = useState<string | null>("standard");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newPresetName, setNewPresetName] = useState("");
  const [newPresetDescription, setNewPresetDescription] = useState("");

  const handleSelectPreset = (presetId: string) => {
    setSelectedPreset(presetId);
  };

  const handleDeletePreset = (presetId: string) => {
    setPresets(presets.filter((p) => p.id !== presetId));
    if (selectedPreset === presetId) {
      setSelectedPreset(null);
    }
  };

  const handleCreatePreset = () => {
    const newPreset: TuningPreset = {
      id: `custom-${Date.now()}`,
      name: newPresetName || "Custom Tuning",
      description: newPresetDescription || "Custom tuning preset",
      strings: [
        { note: "E", octave: 2 },
        { note: "A", octave: 2 },
        { note: "D", octave: 3 },
        { note: "G", octave: 3 },
        { note: "B", octave: 3 },
        { note: "E", octave: 4 },
      ],
      isCustom: true,
      category: "Custom",
    };

    setPresets([...presets, newPreset]);
    setSelectedPreset(newPreset.id);
    setIsDialogOpen(false);
    setNewPresetName("");
    setNewPresetDescription("");
  };

  const groupedPresets = presets.reduce(
    (acc, preset) => {
      const category = preset.category || "Other";
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(preset);
      return acc;
    },
    {} as Record<string, TuningPreset[]>
  );

  return (
    <div className="space-y-6">
      {/* Header with Create Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Tuning Presets</h2>
          <p className="text-sm text-muted-foreground">
            Select or create custom tuning presets
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Custom Preset
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Custom Tuning Preset</DialogTitle>
              <DialogDescription>
                Create a new custom tuning preset for your guitar.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="preset-name">Preset Name</Label>
                <Input
                  id="preset-name"
                  placeholder="My Custom Tuning"
                  value={newPresetName}
                  onChange={(e) => setNewPresetName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="preset-description">Description</Label>
                <Input
                  id="preset-description"
                  placeholder="Describe your tuning..."
                  value={newPresetDescription}
                  onChange={(e) => setNewPresetDescription(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreatePreset}>Create Preset</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Preset Categories */}
      {Object.entries(groupedPresets).map(([category, categoryPresets]) => (
        <div key={category} className="space-y-3">
          <div className="flex items-center gap-2">
            <Music className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold">{category}</h3>
            <Badge variant="secondary">{categoryPresets.length}</Badge>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {categoryPresets.map((preset) => (
              <Card
                key={preset.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedPreset === preset.id
                    ? "border-primary shadow-md"
                    : ""
                }`}
                onClick={() => handleSelectPreset(preset.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{preset.name}</CardTitle>
                      <CardDescription className="text-xs">
                        {preset.description}
                      </CardDescription>
                    </div>
                    {preset.isCustom && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeletePreset(preset.id);
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {/* String visualization */}
                  <div className="space-y-1.5">
                    {preset.strings
                      .slice()
                      .reverse()
                      .map((string, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between text-sm"
                        >
                          <span className="text-muted-foreground">
                            String {6 - index}
                          </span>
                          <Badge variant="outline" className="font-mono">
                            {string.note}
                            <sub className="text-[10px]">{string.octave}</sub>
                          </Badge>
                        </div>
                      ))}
                  </div>

                  {/* Selected indicator */}
                  {selectedPreset === preset.id && (
                    <div className="mt-3 pt-3 border-t">
                      <Badge className="w-full justify-center">
                        ✓ Currently Selected
                      </Badge>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
