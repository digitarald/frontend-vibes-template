import { Suspense } from "react"
import { Metadata } from "next"
import { ScenarioRunner } from "@/components/quiz/scenario/ScenarioRunner"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, BookOpen, Users } from "lucide-react"

export const metadata: Metadata = {
  title: "Scenario of the Day - PADI Open Water Diver Training",
  description: "Practice safety-critical decision making with daily diving scenarios for Open Water Diver learners and refreshers",
}

function ScenarioDisclaimer() {
  return (
    <Card className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/50">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-amber-800 dark:text-amber-200">
          <AlertTriangle className="h-5 w-5" />
          Training Scenarios - Educational Use Only
        </CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-amber-700 dark:text-amber-300 space-y-2">
        <p>
          These scenarios are designed for educational purposes to supplement formal PADI Open Water 
          Diver training. They do not replace proper certification, supervised training, or professional 
          instruction.
        </p>
        <p className="font-medium">
          Always dive within your certification limits and never dive alone. When in doubt, 
          surface safely and seek assistance.
        </p>
      </CardContent>
    </Card>
  )
}

function ScenarioLoadingSkeleton() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="h-6 bg-muted animate-pulse rounded w-64" />
              <div className="flex gap-2">
                <div className="h-5 bg-muted animate-pulse rounded w-20" />
                <div className="h-5 bg-muted animate-pulse rounded w-16" />
                <div className="h-5 bg-muted animate-pulse rounded w-24" />
              </div>
            </div>
            <div className="text-right space-y-1">
              <div className="h-4 bg-muted animate-pulse rounded w-20" />
              <div className="h-4 bg-muted animate-pulse rounded w-16" />
            </div>
          </div>
          <div className="h-2 bg-muted animate-pulse rounded w-full mt-3" />
        </CardHeader>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-3">
            <div className="h-4 bg-muted animate-pulse rounded w-full" />
            <div className="h-4 bg-muted animate-pulse rounded w-5/6" />
            <div className="h-4 bg-muted animate-pulse rounded w-4/5" />
          </div>
          
          <div className="mt-6 space-y-3">
            <div className="h-4 bg-muted animate-pulse rounded w-32" />
            <div className="space-y-3">
              <div className="h-12 bg-muted animate-pulse rounded" />
              <div className="h-12 bg-muted animate-pulse rounded" />
              <div className="h-12 bg-muted animate-pulse rounded" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function ScenarioPage() {
  return (
    <div className="container mx-auto py-6 space-y-8">
      {/* Page Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Scenario of the Day</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Practice safety-critical decision making with real-world diving scenarios. 
          One branching scenario per day with immediate feedback and expert guidance.
        </p>
        <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            PADI Open Water
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Learners & Refreshers
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <ScenarioDisclaimer />

      {/* Scenario Runner */}
      <Suspense fallback={<ScenarioLoadingSkeleton />}>
        <ScenarioRunner />
      </Suspense>
      
      {/* Additional Info */}
      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle className="text-lg">How Scenarios Work</CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-3">
          <p>
            <strong>Daily Selection:</strong> Each day presents one scenario you haven&apos;t completed recently. 
            Once you&apos;ve tried all scenarios, the system will select random scenarios for review practice.
          </p>
          <p>
            <strong>Immediate Feedback:</strong> Every choice provides instant feedback explaining the reasoning 
            behind safe diving practices, based on established safety protocols.
          </p>
          <p>
            <strong>Progress Tracking:</strong> Your choices and completion times are saved locally to 
            track your progress and ensure daily variety.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}