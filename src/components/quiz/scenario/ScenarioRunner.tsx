"use client"

import { useState, useEffect, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, XCircle, Clock, Target } from "lucide-react"
import { scenarios, type Scenario, type ScenarioProgress } from "@/data/owd-scenarios"

const STORAGE_KEY = "owd-scenarios-v1"

interface ScenarioRunnerProps {
  onComplete?: (progress: ScenarioProgress) => void
}

function getTodaysScenario(): Scenario {
  // Default to first scenario for SSR, will be updated on client
  if (typeof window === 'undefined') {
    return scenarios[0]
  }
  
  const today = new Date().toDateString()
  const stored = localStorage.getItem(STORAGE_KEY)
  let playedScenarios: Record<string, string> = {}
  
  if (stored) {
    try {
      const data = JSON.parse(stored)
      playedScenarios = data.playedScenarios || {}
    } catch {
      // Ignore parsing errors
    }
  }

  // Find unplayed scenarios
  const unplayedScenarios = scenarios.filter(s => !playedScenarios[s.id] || playedScenarios[s.id] !== today)
  
  if (unplayedScenarios.length > 0) {
    // Use date as seed for consistent daily scenario
    const dateNum = new Date().getDate() + new Date().getMonth() * 31
    return unplayedScenarios[dateNum % unplayedScenarios.length]
  }
  
  // All scenarios played today, pick random for review
  const dateNum = new Date().getDate() + new Date().getMonth() * 31
  return scenarios[dateNum % scenarios.length]
}

function saveProgress(progress: ScenarioProgress) {
  if (typeof window === 'undefined') return
  
  const stored = localStorage.getItem(STORAGE_KEY)
  let data: { playedScenarios: Record<string, string>; progress: ScenarioProgress[] } = { 
    playedScenarios: {}, 
    progress: [] 
  }
  
  if (stored) {
    try {
      data = JSON.parse(stored)
    } catch {
      // Ignore parsing errors
    }
  }
  
  // Mark scenario as played today
  const today = new Date().toDateString()
  data.playedScenarios = data.playedScenarios || {}
  data.playedScenarios[progress.scenarioId] = today
  
  // Add to progress history
  data.progress = data.progress || []
  data.progress.push(progress)
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function ScenarioRunner({ onComplete }: ScenarioRunnerProps) {
  const [scenario, setScenario] = useState<Scenario>(() => getTodaysScenario())
  const [currentNodeId, setCurrentNodeId] = useState<string>(scenario.rootId)
  const [path, setPath] = useState<string[]>([scenario.rootId])
  const [startTime] = useState<number>(Date.now())
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  // Update scenario on client hydration
  useEffect(() => {
    const clientScenario = getTodaysScenario()
    if (clientScenario.id !== scenario.id) {
      setScenario(clientScenario)
      setCurrentNodeId(clientScenario.rootId)
      setPath([clientScenario.rootId])
    }
  }, [scenario.id])

  const currentNode = scenario.nodes[currentNodeId]
  
  const correctChoices = useMemo(() => {
    return path.slice(1).reduce((correct, nodeId, index) => {
      const prevNode = scenario.nodes[path[index]]
      const chosenOption = prevNode?.options.find(opt => opt.nextId === nodeId)
      return correct + (chosenOption?.correct ? 1 : 0)
    }, 0)
  }, [path, scenario.nodes])

  const totalChoices = path.length - 1

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId)
    setShowFeedback(true)
  }

  const handleContinue = () => {
    if (!selectedOption) return
    
    const option = currentNode.options.find(opt => opt.id === selectedOption)
    if (!option) return

    const newPath = [...path]
    
    if (option.nextId) {
      newPath.push(option.nextId)
      setPath(newPath)
      setCurrentNodeId(option.nextId)
      setSelectedOption(null)
      setShowFeedback(false)
      
      const nextNode = scenario.nodes[option.nextId]
      if (nextNode?.terminal) {
        setIsComplete(true)
        
        // Save progress
        const progress: ScenarioProgress = {
          lastPlayedAt: new Date().toISOString(),
          scenarioId: scenario.id,
          path: newPath,
          correctness: totalChoices > 0 ? (correctChoices + (option.correct ? 1 : 0)) / (totalChoices + 1) : 1,
          timeToComplete: Date.now() - startTime
        }
        
        saveProgress(progress)
        onComplete?.(progress)
      }
    }
  }

  const selectedOptionData = selectedOption ? currentNode.options.find(opt => opt.id === selectedOption) : null
  const progressPercent = scenario ? Math.min(((path.length - 1) / Object.keys(scenario.nodes).length) * 100, 100) : 0

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">{scenario.title}</CardTitle>
              <div className="flex flex-wrap gap-2 mt-2">
                {scenario.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="text-right space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Target className="h-4 w-4" />
                {totalChoices > 0 ? `${correctChoices}/${totalChoices} correct` : 'Starting'}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                {Math.round((Date.now() - startTime) / 1000)}s
              </div>
            </div>
          </div>
          <Progress value={progressPercent} className="mt-3" />
        </CardHeader>
      </Card>

      {/* Current Scenario */}
      <Card>
        <CardContent className="pt-6">
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-lg leading-relaxed">{currentNode.prompt}</p>
          </div>
          
          {!isComplete && currentNode.options.length > 0 && (
            <div className="mt-6 space-y-3">
              <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                What do you do?
              </h4>
              <div className="grid gap-3">
                {currentNode.options.map((option) => (
                  <Button
                    key={option.id}
                    variant={selectedOption === option.id ? "default" : "outline"}
                    className="justify-start text-left h-auto p-4 whitespace-normal"
                    disabled={showFeedback}
                    onClick={() => handleOptionSelect(option.id)}
                  >
                    <span className="text-sm">{option.label}</span>
                  </Button>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Feedback */}
      {showFeedback && selectedOptionData && (
        <Card className="border-l-4 border-l-primary">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              {selectedOptionData.correct ? (
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
              )}
              <div className="flex-1">
                <p className="font-medium text-sm mb-2">
                  {selectedOptionData.correct ? "Correct Decision!" : "Consider This..."}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {selectedOptionData.rationale}
                </p>
                <Button 
                  className="mt-4" 
                  onClick={handleContinue}
                  disabled={!selectedOptionData.nextId && !currentNode.terminal}
                >
                  {selectedOptionData.nextId ? "Continue" : "Complete Scenario"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Debrief */}
      {isComplete && currentNode.debrief && (
        <Card className="bg-muted/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Scenario Debrief
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="leading-relaxed">{currentNode.debrief}</p>
            </div>
            
            <div className="mt-6 p-4 bg-background rounded-lg border">
              <h4 className="font-medium mb-3">Your Performance</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">Accuracy</div>
                  <div className="font-medium">
                    {totalChoices > 0 ? Math.round((correctChoices / totalChoices) * 100) : 100}%
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground">Decisions</div>
                  <div className="font-medium">{correctChoices}/{totalChoices}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Time</div>
                  <div className="font-medium">
                    {Math.round((Date.now() - startTime) / 1000)}s
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}