"use client";

import { Module } from "@/lib/dependency-data";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { AlertTriangle, CheckCircle, Clock, Lock } from "lucide-react";

interface DependencyGraphProps {
  modules: Module[];
  criticalPath: string[];
  onModuleClick?: (module: Module) => void;
  selectedModuleId?: string;
}

// Get status color
function getStatusColor(status: Module['status'], isCritical: boolean): string {
  if (isCritical && status !== 'migrated') return 'rgb(239, 68, 68)'; // red
  
  switch (status) {
    case 'migrated':
      return 'rgb(34, 197, 94)'; // green
    case 'in-progress':
      return 'rgb(59, 130, 246)'; // blue
    case 'blocked':
      return 'rgb(234, 179, 8)'; // yellow
    case 'not-started':
      return 'rgb(156, 163, 175)'; // gray
  }
}

// Get status icon
function getStatusIcon(status: Module['status']) {
  switch (status) {
    case 'migrated':
      return <CheckCircle className="size-3" />;
    case 'in-progress':
      return <Clock className="size-3" />;
    case 'blocked':
      return <Lock className="size-3" />;
    case 'not-started':
      return <AlertTriangle className="size-3" />;
  }
}

// Simple hierarchical layout
function calculateLayout(modules: Module[], criticalPath: string[]) {
  // Group modules by their dependency level
  const levels: string[][] = [];
  const placed = new Set<string>();
  
  // Level 0: No dependencies
  const level0 = modules
    .filter(m => m.dependencies.length === 0)
    .map(m => m.id);
  levels.push(level0);
  level0.forEach(id => placed.add(id));
  
  // Subsequent levels: Dependencies are all placed
  let currentLevel = 0;
  while (placed.size < modules.length && currentLevel < 10) {
    currentLevel++;
    const nextLevel = modules
      .filter(m => !placed.has(m.id))
      .filter(m => m.dependencies.every(depId => placed.has(depId)))
      .map(m => m.id);
    
    if (nextLevel.length === 0) {
      // Place remaining modules (circular deps or orphans)
      const remaining = modules
        .filter(m => !placed.has(m.id))
        .map(m => m.id);
      if (remaining.length > 0) {
        levels.push(remaining);
        remaining.forEach(id => placed.add(id));
      }
      break;
    }
    
    levels.push(nextLevel);
    nextLevel.forEach(id => placed.add(id));
  }
  
  // Calculate positions
  const positions: Record<string, { x: number; y: number }> = {};
  const nodeWidth = 180;
  const nodeHeight = 80;
  const levelGap = 150;
  const nodeGap = 20;
  
  levels.forEach((level, levelIndex) => {
    const levelWidth = level.length * nodeWidth + (level.length - 1) * nodeGap;
    const startX = -levelWidth / 2;
    
    level.forEach((id, index) => {
      positions[id] = {
        x: startX + index * (nodeWidth + nodeGap) + nodeWidth / 2,
        y: levelIndex * levelGap + 50
      };
    });
  });
  
  return {
    positions,
    width: Math.max(1200, levels.reduce((max, level) => 
      Math.max(max, level.length * (nodeWidth + nodeGap)), 0
    )),
    height: levels.length * levelGap + 100
  };
}

export function DependencyGraph({ 
  modules, 
  criticalPath, 
  onModuleClick,
  selectedModuleId 
}: DependencyGraphProps) {
  const { positions, width, height } = calculateLayout(modules, criticalPath);
  const moduleMap = new Map(modules.map(m => [m.id, m]));
  
  return (
    <div className="relative w-full h-[600px] overflow-auto border rounded-lg bg-muted/20">
      <svg 
        width={width} 
        height={height}
        className="absolute top-0 left-0"
        style={{ minWidth: '100%', minHeight: '100%' }}
      >
        {/* Draw dependency lines */}
        {modules.map(module => 
          module.dependencies.map(depId => {
            const start = positions[module.id];
            const end = positions[depId];
            if (!start || !end) return null;
            
            const dep = moduleMap.get(depId);
            const isCriticalPath = criticalPath.includes(depId);
            
            return (
              <g key={`${module.id}-${depId}`}>
                <defs>
                  <marker
                    id={`arrowhead-${module.id}-${depId}`}
                    markerWidth="10"
                    markerHeight="10"
                    refX="9"
                    refY="3"
                    orient="auto"
                  >
                    <polygon
                      points="0 0, 10 3, 0 6"
                      fill={dep?.status === 'migrated' ? '#22c55e' : '#94a3b8'}
                      opacity="0.6"
                    />
                  </marker>
                </defs>
                <line
                  x1={start.x}
                  y1={start.y}
                  x2={end.x}
                  y2={end.y - 40}
                  stroke={dep?.status === 'migrated' ? '#22c55e' : '#94a3b8'}
                  strokeWidth={isCriticalPath ? 3 : 1.5}
                  strokeDasharray={isCriticalPath ? '5,5' : 'none'}
                  opacity="0.6"
                  markerEnd={`url(#arrowhead-${module.id}-${depId})`}
                />
              </g>
            );
          })
        )}
        
        {/* Draw module nodes */}
        {modules.map(module => {
          const pos = positions[module.id];
          if (!pos) return null;
          
          const isCritical = criticalPath.includes(module.id);
          const isSelected = selectedModuleId === module.id;
          const color = getStatusColor(module.status, isCritical);
          
          return (
            <g 
              key={module.id}
              transform={`translate(${pos.x - 85}, ${pos.y - 35})`}
              className="cursor-pointer transition-transform hover:scale-105"
              onClick={() => onModuleClick?.(module)}
            >
              {/* Node background */}
              <rect
                width="170"
                height="70"
                rx="8"
                fill="hsl(var(--card))"
                stroke={isSelected ? 'hsl(var(--primary))' : color}
                strokeWidth={isSelected ? 3 : 2}
                className="transition-all"
              />
              
              {/* Status indicator */}
              <circle
                cx="12"
                cy="12"
                r="5"
                fill={color}
              />
              
              {/* Module name */}
              <text
                x="85"
                y="25"
                textAnchor="middle"
                className="text-xs font-medium fill-foreground"
                style={{ fontSize: '11px' }}
              >
                {module.name.length > 20 
                  ? module.name.substring(0, 20) + '...' 
                  : module.name}
              </text>
              
              {/* Team */}
              <text
                x="85"
                y="40"
                textAnchor="middle"
                className="text-xs fill-muted-foreground"
                style={{ fontSize: '9px' }}
              >
                {module.team}
              </text>
              
              {/* Dependency count */}
              <text
                x="85"
                y="55"
                textAnchor="middle"
                className="text-xs fill-muted-foreground"
                style={{ fontSize: '9px' }}
              >
                {module.dependencies.length} deps • {module.dependents.length} deps on this
              </text>
              
              {/* Critical badge */}
              {isCritical && (
                <rect
                  x="145"
                  y="5"
                  width="20"
                  height="14"
                  rx="3"
                  fill="rgb(239, 68, 68)"
                  opacity="0.9"
                />
              )}
              {isCritical && (
                <text
                  x="155"
                  y="15"
                  textAnchor="middle"
                  className="text-white font-bold"
                  style={{ fontSize: '8px' }}
                >
                  !
                </text>
              )}
            </g>
          );
        })}
      </svg>
      
      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-card border rounded-lg p-3 shadow-lg">
        <div className="text-xs font-semibold mb-2">Status Legend</div>
        <div className="space-y-1.5 text-xs">
          <div className="flex items-center gap-2">
            <div className="size-3 rounded-full bg-green-500" />
            <span>Migrated</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-3 rounded-full bg-blue-500" />
            <span>In Progress</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-3 rounded-full bg-yellow-500" />
            <span>Blocked</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-3 rounded-full bg-gray-400" />
            <span>Not Started</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-3 rounded-full bg-red-500" />
            <span>Critical Blocker</span>
          </div>
        </div>
      </div>
    </div>
  );
}
