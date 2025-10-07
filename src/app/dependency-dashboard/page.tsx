"use client";

import { useState } from "react";
import { 
  mockDependencyGraph, 
  calculateReadinessGroups, 
  calculateHealthMetrics,
  Module,
  getModuleById
} from "@/lib/dependency-data";
import { DependencyGraph } from "@/components/dependency-graph";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  GitBranch, 
  AlertTriangle, 
  CheckCircle, 
  Lock, 
  Clock,
  TrendingUp,
  Users,
  Target,
  Zap,
  AlertCircle
} from "lucide-react";

export default function DependencyDashboard() {
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const readinessGroups = calculateReadinessGroups(mockDependencyGraph.modules);
  const healthMetrics = calculateHealthMetrics(mockDependencyGraph.modules);
  
  // Calculate critical path modules with their impact
  const criticalModules = mockDependencyGraph.modules
    .filter(m => mockDependencyGraph.criticalPath.includes(m.id))
    .map(m => ({
      ...m,
      impactScore: m.dependents.length
    }))
    .sort((a, b) => b.impactScore - a.impactScore);

  const getStatusBadge = (status: Module['status']) => {
    switch (status) {
      case 'migrated':
        return <Badge variant="default" className="bg-green-500"><CheckCircle className="size-3 mr-1" />Migrated</Badge>;
      case 'in-progress':
        return <Badge variant="default" className="bg-blue-500"><Clock className="size-3 mr-1" />In Progress</Badge>;
      case 'blocked':
        return <Badge variant="default" className="bg-yellow-500 text-black"><Lock className="size-3 mr-1" />Blocked</Badge>;
      case 'not-started':
        return <Badge variant="outline"><AlertTriangle className="size-3 mr-1" />Not Started</Badge>;
    }
  };

  const getPriorityBadge = (priority: Module['priority']) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive">High</Badge>;
      case 'medium':
        return <Badge variant="secondary">Medium</Badge>;
      case 'low':
        return <Badge variant="outline">Low</Badge>;
    }
  };

  return (
    <div className="container mx-auto space-y-6 max-w-7xl">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Migration Dependency Dashboard</h1>
        <p className="text-muted-foreground text-lg">
          Visualize component dependencies, identify critical paths, and prioritize migration work
        </p>
      </div>

      {/* Health Metrics Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="size-4 text-muted-foreground" />
              Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{healthMetrics.progressPercentage}%</div>
            <p className="text-xs text-muted-foreground mt-1">
              {healthMetrics.migratedCount} of {healthMetrics.totalModules} modules migrated
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Zap className="size-4 text-muted-foreground" />
              Ready to Migrate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{healthMetrics.unblockedCount}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Modules with no blockers
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <GitBranch className="size-4 text-muted-foreground" />
              Avg Dependency Depth
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{healthMetrics.averageDependencyDepth}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Layers of dependencies
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertCircle className="size-4 text-muted-foreground" />
              Critical Blockers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">{criticalModules.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              High-impact modules
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Dependency Graph - takes 2 columns */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GitBranch className="size-5" />
                Dependency Graph
              </CardTitle>
              <CardDescription>
                Interactive visualization showing module relationships and migration status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DependencyGraph
                modules={mockDependencyGraph.modules}
                criticalPath={mockDependencyGraph.criticalPath}
                onModuleClick={setSelectedModule}
                selectedModuleId={selectedModule?.id}
              />
            </CardContent>
          </Card>
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          {/* Selected Module Details */}
          {selectedModule ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Module Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="font-semibold text-lg mb-2">{selectedModule.name}</div>
                  <div className="flex gap-2 mb-3">
                    {getStatusBadge(selectedModule.status)}
                    {getPriorityBadge(selectedModule.priority)}
                  </div>
                  {selectedModule.description && (
                    <p className="text-sm text-muted-foreground mb-3">{selectedModule.description}</p>
                  )}
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Team:</span>
                    <span className="font-medium">{selectedModule.team}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Effort:</span>
                    <span className="font-medium">{selectedModule.estimatedEffort} pts</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Dependencies:</span>
                    <span className="font-medium">{selectedModule.dependencies.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Dependents:</span>
                    <span className="font-medium">{selectedModule.dependents.length}</span>
                  </div>
                </div>

                {selectedModule.dependencies.length > 0 && (
                  <div>
                    <div className="text-sm font-medium mb-2">Depends On:</div>
                    <div className="space-y-1">
                      {selectedModule.dependencies.map(depId => {
                        const dep = getModuleById(depId);
                        return dep ? (
                          <div key={depId} className="text-xs flex items-center gap-2 p-2 rounded bg-muted/50">
                            <span>{dep.name}</span>
                            <span className="ml-auto">{getStatusBadge(dep.status)}</span>
                          </div>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}

                {selectedModule.dependents.length > 0 && (
                  <div>
                    <div className="text-sm font-medium mb-2">Blocks:</div>
                    <div className="space-y-1">
                      {selectedModule.dependents.slice(0, 5).map(depId => {
                        const dep = getModuleById(depId);
                        return dep ? (
                          <div key={depId} className="text-xs flex items-center gap-2 p-2 rounded bg-muted/50">
                            <span>{dep.name}</span>
                          </div>
                        ) : null;
                      })}
                      {selectedModule.dependents.length > 5 && (
                        <div className="text-xs text-muted-foreground">
                          +{selectedModule.dependents.length - 5} more
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Module Details</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Click on a module in the graph to view its details
                </p>
              </CardContent>
            </Card>
          )}

          {/* Critical Path Panel */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Target className="size-5 text-red-500" />
                Critical Blockers
              </CardTitle>
              <CardDescription>
                High-impact modules blocking multiple others
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {criticalModules.slice(0, 5).map(module => (
                  <div 
                    key={module.id}
                    className="flex items-start justify-between p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => setSelectedModule(module)}
                  >
                    <div className="flex-1">
                      <div className="font-medium text-sm mb-1">{module.name}</div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Users className="size-3" />
                        {module.team}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <Badge variant="destructive" className="text-xs">
                        {module.impactScore} blocked
                      </Badge>
                      {getStatusBadge(module.status)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Migration Readiness Lists */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="size-5" />
            Migration Readiness Queue
          </CardTitle>
          <CardDescription>
            Modules grouped by readiness status and blocking dependencies
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="ready" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="ready">
                Ready ({readinessGroups.ready.length})
              </TabsTrigger>
              <TabsTrigger value="waiting">
                Waiting ({readinessGroups.waiting.length})
              </TabsTrigger>
              <TabsTrigger value="blocked">
                Blocked ({readinessGroups.blocked.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="ready" className="mt-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Module</TableHead>
                      <TableHead>Team</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Effort</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {readinessGroups.ready.map(module => (
                      <TableRow 
                        key={module.id}
                        className="cursor-pointer"
                        onClick={() => setSelectedModule(module)}
                      >
                        <TableCell className="font-medium">{module.name}</TableCell>
                        <TableCell>{module.team}</TableCell>
                        <TableCell>{getPriorityBadge(module.priority)}</TableCell>
                        <TableCell>{module.estimatedEffort} pts</TableCell>
                        <TableCell>{getStatusBadge(module.status)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="waiting" className="mt-4">
              <Accordion type="single" collapsible className="w-full">
                {readinessGroups.waiting.map(module => {
                  const unmigrated = module.dependencies.filter(depId => {
                    const dep = getModuleById(depId);
                    return dep && dep.status !== 'migrated';
                  });

                  return (
                    <AccordionItem key={module.id} value={module.id}>
                      <AccordionTrigger>
                        <div className="flex items-center justify-between w-full pr-4">
                          <div className="flex items-center gap-3">
                            <span className="font-medium">{module.name}</span>
                            <Badge variant="secondary" className="text-xs">
                              {unmigrated.length} blockers
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">{module.team}</span>
                            {getPriorityBadge(module.priority)}
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 pt-2">
                          <div className="text-sm text-muted-foreground mb-2">
                            Waiting on {unmigrated.length} {unmigrated.length === 1 ? 'dependency' : 'dependencies'}:
                          </div>
                          {unmigrated.map(depId => {
                            const dep = getModuleById(depId);
                            return dep ? (
                              <div key={depId} className="flex items-center justify-between p-2 rounded bg-muted/50">
                                <div>
                                  <div className="text-sm font-medium">{dep.name}</div>
                                  <div className="text-xs text-muted-foreground">{dep.team}</div>
                                </div>
                                {getStatusBadge(dep.status)}
                              </div>
                            ) : null;
                          })}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </TabsContent>

            <TabsContent value="blocked" className="mt-4">
              <Accordion type="single" collapsible className="w-full">
                {readinessGroups.blocked.map(module => {
                  const unmigrated = module.dependencies.filter(depId => {
                    const dep = getModuleById(depId);
                    return dep && dep.status !== 'migrated';
                  });

                  return (
                    <AccordionItem key={module.id} value={module.id}>
                      <AccordionTrigger>
                        <div className="flex items-center justify-between w-full pr-4">
                          <div className="flex items-center gap-3">
                            <span className="font-medium">{module.name}</span>
                            <Badge variant="destructive" className="text-xs">
                              {unmigrated.length} blockers
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">{module.team}</span>
                            {getPriorityBadge(module.priority)}
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 pt-2">
                          <div className="text-sm text-muted-foreground mb-2">
                            Blocked by {unmigrated.length} {unmigrated.length === 1 ? 'dependency' : 'dependencies'}:
                          </div>
                          {unmigrated.map(depId => {
                            const dep = getModuleById(depId);
                            return dep ? (
                              <div key={depId} className="flex items-center justify-between p-2 rounded bg-muted/50">
                                <div>
                                  <div className="text-sm font-medium">{dep.name}</div>
                                  <div className="text-xs text-muted-foreground">{dep.team}</div>
                                </div>
                                {getStatusBadge(dep.status)}
                              </div>
                            ) : null;
                          })}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
