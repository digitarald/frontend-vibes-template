"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Signal } from "@/data/owd-signals";
import { 
  CheckCircle, 
  AlertTriangle, 
  ArrowUp, 
  ArrowDown, 
  Hand, 
  UserCheck, 
  Wind, 
  AlertCircle, 
  Users, 
  Minus, 
  UserPlus, 
  HelpCircle, 
  Eye, 
  Zap, 
  Ship,
  RotateCcw,
  Check,
  X
} from "lucide-react";

// Map icon names to Lucide components
const iconMap = {
  CheckCircle,
  AlertTriangle,
  ArrowUp,
  ArrowDown,
  Hand,
  UserCheck,
  Wind,
  AlertCircle,
  Users,
  Minus,
  UserPlus,
  HelpCircle,
  Eye,
  Zap,
  Ship
};

interface SignalCardProps {
  signal: Signal;
  isFlipped: boolean;
  onFlip: () => void;
  onKnown: () => void;
  onUnknown: () => void;
  showActions?: boolean;
}

export function SignalCard({ 
  signal, 
  isFlipped, 
  onFlip, 
  onKnown, 
  onUnknown, 
  showActions = true 
}: SignalCardProps) {
  const IconComponent = signal.icon ? iconMap[signal.icon as keyof typeof iconMap] : null;

  return (
    <Card className="w-full max-w-md mx-auto cursor-pointer select-none" onClick={onFlip}>
      <CardContent className="p-8">
        <div className="text-center space-y-6">
          {!isFlipped ? (
            // Front of card - show icon and name
            <>
              <div className="flex justify-center">
                {IconComponent ? (
                  <IconComponent className="w-20 h-20 text-primary" />
                ) : (
                  <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center">
                    <span className="text-2xl text-muted-foreground">?</span>
                  </div>
                )}
              </div>
              <h3 className="text-2xl font-bold">{signal.name}</h3>
              <div className="flex justify-center">
                <Badge variant="secondary">
                  <RotateCcw className="w-3 h-3 mr-1" />
                  Tap to flip
                </Badge>
              </div>
            </>
          ) : (
            // Back of card - show description and aliases
            <>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">{signal.name}</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {signal.description}
                </p>
                {signal.aliases && signal.aliases.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Also known as:</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {signal.aliases.map((alias, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {alias}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
        
        {showActions && isFlipped && (
          <div className="flex gap-4 mt-8 justify-center">
            <Button 
              variant="outline" 
              onClick={(e) => {
                e.stopPropagation();
                onUnknown();
              }}
              className="flex-1 max-w-32"
            >
              <X className="w-4 h-4 mr-2" />
              Need Practice
            </Button>
            <Button 
              onClick={(e) => {
                e.stopPropagation();
                onKnown();
              }}
              className="flex-1 max-w-32"
            >
              <Check className="w-4 h-4 mr-2" />
              I Know This
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}