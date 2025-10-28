"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, XCircle, TrendingUp } from "lucide-react";
import { mockTuningSessions } from "@/data/guitar-tuner";
import { format, formatDistanceToNow } from "date-fns";

export function TuningHistory() {
  const sessions = mockTuningSessions;

  // Calculate statistics
  const completedSessions = sessions.filter((s) => s.completed);
  const averageAccuracy =
    completedSessions.reduce((sum, s) => sum + s.averageCents, 0) /
    completedSessions.length;
  const totalDuration = sessions.reduce((sum, s) => sum + s.duration, 0);

  // Count tuning usage
  const tuningCounts = sessions.reduce(
    (acc, session) => {
      acc[session.tuningPreset] = (acc[session.tuningPreset] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const mostUsedTuning = Object.entries(tuningCounts).sort(
    ([, a], [, b]) => b - a
  )[0];

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  const getAccuracyColor = (cents: number) => {
    if (cents < 3) return "text-green-600 dark:text-green-400";
    if (cents < 5) return "text-yellow-600 dark:text-yellow-400";
    return "text-orange-600 dark:text-orange-400";
  };

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">
              Average Accuracy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold ${getAccuracyColor(averageAccuracy)}`}>
              {averageAccuracy.toFixed(1)}¢
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Across {completedSessions.length} completed sessions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Most Used</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mostUsedTuning[0]}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Used {mostUsedTuning[1]} times
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {Math.floor(totalDuration / 60)}m
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Spent tuning your guitar
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Session Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Tuning Sessions</CardTitle>
          <p className="text-sm text-muted-foreground">
            Your recent tuning history
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sessions.map((session, index) => (
              <div
                key={session.id}
                className="flex gap-4 pb-4 last:pb-0 border-b last:border-0"
              >
                {/* Timeline indicator */}
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${
                      session.completed
                        ? "bg-green-500/10 text-green-600 dark:text-green-400"
                        : "bg-orange-500/10 text-orange-600 dark:text-orange-400"
                    }`}
                  >
                    {session.completed ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <XCircle className="h-5 w-5" />
                    )}
                  </div>
                  {index < sessions.length - 1 && (
                    <div className="w-px h-full bg-border mt-2" />
                  )}
                </div>

                {/* Session details */}
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">
                          {session.tuningPreset}
                        </span>
                        <Badge
                          variant={session.completed ? "default" : "secondary"}
                        >
                          {session.completed ? "Completed" : "Incomplete"}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatDistanceToNow(session.date, {
                            addSuffix: true,
                          })}
                        </span>
                        <span>•</span>
                        <span>{formatDuration(session.duration)}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <div
                        className={`text-lg font-bold ${getAccuracyColor(session.averageCents)}`}
                      >
                        {session.averageCents.toFixed(1)}¢
                      </div>
                      <div className="text-xs text-muted-foreground">
                        avg accuracy
                      </div>
                    </div>
                  </div>

                  {/* String accuracy breakdown */}
                  <div className="flex gap-1">
                    {session.stringAccuracy.map((accuracy, idx) => (
                      <div
                        key={idx}
                        className="flex-1 h-2 rounded-full overflow-hidden bg-muted"
                        title={`String ${6 - idx}: ${accuracy.toFixed(1)}¢`}
                      >
                        <div
                          className={`h-full transition-all ${
                            accuracy < 3
                              ? "bg-green-500"
                              : accuracy < 5
                                ? "bg-yellow-500"
                                : "bg-orange-500"
                          }`}
                          style={{
                            width: `${Math.max(10, 100 - accuracy * 10)}%`,
                          }}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="text-xs text-muted-foreground">
                    {format(session.date, "PPpp")}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>
                Your tuning accuracy has improved by{" "}
                <span className="font-semibold">15%</span> over the last week
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>
                You tune most frequently in <span className="font-semibold">Standard</span> tuning
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>
                Your fastest tuning session was{" "}
                <span className="font-semibold">2:45</span>
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
