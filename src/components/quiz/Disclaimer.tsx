import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

export function Disclaimer() {
  return (
    <Alert className="mb-6">
      <AlertTriangle className="h-4 w-4" />
      <AlertDescription>
        Educational practice only. Always follow your PADI Instructor, agency 
        standards, and local regulations. Not a substitute for formal training 
        or medical advice.
      </AlertDescription>
    </Alert>
  );
}