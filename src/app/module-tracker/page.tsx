'use client';

import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Search, LayoutGrid, LayoutList, X } from 'lucide-react';
import { ModuleCard } from './module-card';
import { ModuleDetail } from './module-detail';
import { mockModules, getKanbanColumns, getAllTeams, getAllAssignees } from './mock-data';
import type { Module, Priority } from './types';

export default function ModuleTrackerPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeam, setSelectedTeam] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<Priority | 'all'>('all');
  const [selectedAssignee, setSelectedAssignee] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const teams = getAllTeams(mockModules);
  const assignees = getAllAssignees(mockModules);

  const handleViewDetails = (module: Module) => {
    setSelectedModule(module);
    setIsDetailOpen(true);
  };

  // Filter modules
  const filteredModules = useMemo(() => {
    const modules = mockModules;
    return modules.filter((module) => {
      const matchesSearch =
        searchTerm === '' ||
        module.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        module.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        module.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesTeam = selectedTeam === 'all' || module.assignee.team === selectedTeam;
      const matchesPriority = selectedPriority === 'all' || module.priority === selectedPriority;
      const matchesAssignee = selectedAssignee === 'all' || module.assignee.name === selectedAssignee;

      return matchesSearch && matchesTeam && matchesPriority && matchesAssignee;
    });
  }, [searchTerm, selectedTeam, selectedPriority, selectedAssignee]);

  const kanbanColumns = getKanbanColumns(filteredModules);

  // Calculate stats
  const stats = useMemo(() => {
    const total = filteredModules.length;
    const completed = filteredModules.filter((m) => m.status === 'completed').length;
    const blocked = filteredModules.filter((m) => m.blockers.length > 0).length;
    const highPriority = filteredModules.filter((m) => m.priority === 'high').length;

    return {
      total,
      completed,
      blocked,
      highPriority,
      completionPercentage: total > 0 ? Math.round((completed / total) * 100) : 0,
    };
  }, [filteredModules]);

  const hasActiveFilters = searchTerm !== '' || selectedTeam !== 'all' || selectedPriority !== 'all' || selectedAssignee !== 'all';

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedTeam('all');
    setSelectedPriority('all');
    setSelectedAssignee('all');
  };

  return (
    <div className="container mx-auto space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Module Tracker</h1>
        <p className="text-muted-foreground">
          Track module migration status across teams with Kanban-style workflow visualization
        </p>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-card border rounded-lg p-4">
          <p className="text-sm text-muted-foreground">Total Modules</p>
          <p className="text-2xl font-bold">{stats.total}</p>
        </div>
        <div className="bg-card border rounded-lg p-4">
          <p className="text-sm text-muted-foreground">Completed</p>
          <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
        </div>
        <div className="bg-card border rounded-lg p-4">
          <p className="text-sm text-muted-foreground">Completion</p>
          <p className="text-2xl font-bold">{stats.completionPercentage}%</p>
        </div>
        <div className="bg-card border rounded-lg p-4">
          <p className="text-sm text-muted-foreground">Blocked</p>
          <p className="text-2xl font-bold text-red-600">{stats.blocked}</p>
        </div>
        <div className="bg-card border rounded-lg p-4">
          <p className="text-sm text-muted-foreground">High Priority</p>
          <p className="text-2xl font-bold text-orange-600">{stats.highPriority}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Search modules, descriptions, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={selectedTeam} onValueChange={setSelectedTeam}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Team" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Teams</SelectItem>
              {teams.map((team) => (
                <SelectItem key={team} value={team}>
                  {team}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedPriority} onValueChange={(value) => setSelectedPriority(value as Priority | 'all')}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedAssignee} onValueChange={setSelectedAssignee}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Assignee" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Assignees</SelectItem>
              {assignees.map((assignee) => (
                <SelectItem key={assignee} value={assignee}>
                  {assignee}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Active Filters and View Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 flex-wrap">
            {hasActiveFilters && (
              <>
                <span className="text-sm text-muted-foreground">Active filters:</span>
                {searchTerm && (
                  <Badge variant="secondary">
                    Search: {searchTerm}
                    <button
                      onClick={() => setSearchTerm('')}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="size-3" />
                    </button>
                  </Badge>
                )}
                {selectedTeam !== 'all' && (
                  <Badge variant="secondary">
                    Team: {selectedTeam}
                    <button
                      onClick={() => setSelectedTeam('all')}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="size-3" />
                    </button>
                  </Badge>
                )}
                {selectedPriority !== 'all' && (
                  <Badge variant="secondary">
                    Priority: {selectedPriority}
                    <button
                      onClick={() => setSelectedPriority('all')}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="size-3" />
                    </button>
                  </Badge>
                )}
                {selectedAssignee !== 'all' && (
                  <Badge variant="secondary">
                    Assignee: {selectedAssignee}
                    <button
                      onClick={() => setSelectedAssignee('all')}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="size-3" />
                    </button>
                  </Badge>
                )}
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Clear all
                </Button>
              </>
            )}
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 border rounded-md p-1">
            <Button
              variant={viewMode === 'kanban' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('kanban')}
              className="h-8 px-3"
            >
              <LayoutGrid className="size-4 mr-1" />
              Kanban
            </Button>
            <Button
              variant={viewMode === 'list' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="h-8 px-3"
            >
              <LayoutList className="size-4 mr-1" />
              List
            </Button>
          </div>
        </div>
      </div>

      {/* Kanban Board / List View */}
      {viewMode === 'kanban' ? (
        <ScrollArea className="w-full">
          <div className="flex gap-4 pb-4">
            {kanbanColumns.map((column) => (
              <div
                key={column.id}
                className="flex-shrink-0 w-[320px] md:w-[350px] bg-muted/40 rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-sm">{column.title}</h3>
                  <Badge variant="secondary">{column.modules.length}</Badge>
                </div>
                <div className="space-y-3">
                  {column.modules.length === 0 ? (
                    <div className="text-center py-8 text-sm text-muted-foreground">
                      No modules
                    </div>
                  ) : (
                    column.modules.map((module) => (
                      <ModuleCard
                        key={module.id}
                        module={module}
                        onViewDetails={handleViewDetails}
                      />
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      ) : (
        <div className="space-y-3">
          {filteredModules.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No modules found matching your filters
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredModules.map((module) => (
                <ModuleCard
                  key={module.id}
                  module={module}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Module Detail Sheet */}
      <ModuleDetail
        module={selectedModule}
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
      />
    </div>
  );
}
