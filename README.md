This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Features

### Hand Signal Drills

Interactive learning tool for PADI Open Water Diver hand signals at `/quiz/signals`.

**Practice Mode:**
- Interactive flashcard carousel with 15 common diving signals
- Flip cards to reveal signal meanings and aliases
- Mark signals as "known" or "need practice"
- Progress tracking with localStorage persistence
- Shuffle and reset functionality

**Quiz Mode:**
- 10 random questions per session
- Multiple choice format with immediate feedback
- Detailed explanations and rationale for each answer
- Score tracking and session history
- Review of incorrect answers with correct explanations

**Data Format:**
The signal data is stored in `src/data/owd-signals.ts` with the following structure:

```typescript
interface Signal {
  id: string;
  name: string;
  description: string;
  icon?: string;        // Lucide icon name
  aliases?: string[];   // Alternative names
}

interface SignalQuestion {
  id: string;
  prompt: string;
  choices: string[];
  answerIndex: number;
  rationale: string;
  tags: string[];
}
```

**Storage:**
Progress is automatically saved to localStorage under the key `owd-signals-v1` including:
- Practice completion status for each signal
- Quiz scores and attempt history
- Last seen signal IDs for continuity

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.
