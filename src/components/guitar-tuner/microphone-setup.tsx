"use client";

import * as React from "react";
import { Mic, MicOff, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface MicrophoneSetupProps {
  onPermissionGranted: (stream: MediaStream) => void;
  onPermissionDenied: (error: string) => void;
}

export function MicrophoneSetup({
  onPermissionGranted,
  onPermissionDenied,
}: MicrophoneSetupProps) {
  const [isRequesting, setIsRequesting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function requestMicrophoneAccess() {
    setIsRequesting(true);
    setError(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          autoGainControl: false,
          noiseSuppression: false,
        },
      });
      onPermissionGranted(stream);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to access microphone";
      setError(errorMessage);
      onPermissionDenied(errorMessage);
    } finally {
      setIsRequesting(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mic className="size-5" />
            Microphone Access Required
          </CardTitle>
          <CardDescription>
            To tune your guitar, we need access to your microphone to detect the
            pitch of each string.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="size-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Button
            onClick={requestMicrophoneAccess}
            disabled={isRequesting}
            className="w-full"
            size="lg"
          >
            {isRequesting ? (
              <>
                <MicOff className="size-5" />
                Requesting Access...
              </>
            ) : (
              <>
                <Mic className="size-5" />
                Allow Microphone Access
              </>
            )}
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            Your audio is processed locally and never sent to any server.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
