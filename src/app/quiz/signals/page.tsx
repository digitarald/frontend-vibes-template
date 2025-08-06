import { Metadata } from 'next';
import { SignalsPageClient } from './signals-client';

export const metadata: Metadata = {
  title: 'Hand Signal Drills - PADI Open Water Diver',
  description: 'Practice and quiz yourself on essential hand signals for PADI Open Water Diver certification',
};

function Disclaimer() {
  return (
    <div className="mb-6 p-4 bg-muted/50 rounded-lg border-l-4 border-primary">
      <p className="text-sm text-muted-foreground">
        <strong>Educational Purpose Only:</strong> This tool is for educational practice only and does not replace official PADI training. 
        Always refer to official PADI materials and your certified instructor for authoritative guidance on diving signals and safety procedures.
      </p>
    </div>
  );
}

export default function SignalsPage() {
  return (
    <div className="container max-w-4xl mx-auto py-8 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Hand Signal Drills</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Master essential underwater communication signals for PADI Open Water Diver certification. 
          Practice with flashcards or test yourself with a 10-question quiz.
        </p>
      </div>
      
      <Disclaimer />
      
      <SignalsPageClient />
    </div>
  );
}