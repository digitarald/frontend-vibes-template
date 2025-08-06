This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Features

### Scenario Mode - PADI Open Water Diver Training

The application includes a **Scenario of the Day** mode designed for PADI Open Water Diver learners and refreshers. Access it at `/quiz/scenario` or through the Features menu.

#### Usage

- **Daily Scenarios**: Each day presents one safety-critical diving scenario you haven't completed recently
- **Branching Stories**: Each scenario has multiple decision points with immediate feedback
- **Progress Tracking**: Your choices, completion times, and accuracy are saved locally
- **Educational Focus**: Scenarios emphasize safe diving practices without replacing formal training

#### Data Format

Scenarios are defined in `src/data/owd-scenarios.ts` with the following structure:

```typescript
interface Scenario {
  id: string
  title: string
  tags: string[]
  rootId: string
  nodes: Record<string, ScenarioNode>
}

interface ScenarioNode {
  id: string
  prompt: string
  options: Array<{
    id: string
    label: string
    nextId?: string
    correct?: boolean
    rationale?: string
  }>
  terminal?: boolean
  debrief?: string
}
```

#### Current Scenarios

1. **Low Air at Depth with Current** - Air management and ascent procedures
2. **Mask Flooding in Surge** - Equipment handling and buoyancy control  
3. **Boat Recall Signal During Dive** - Emergency procedures and surface protocols
4. **Lost Navigation in Low Visibility** - Underwater navigation and safety protocols

#### Storage

Progress is tracked in localStorage under the key `owd-scenarios-v1` with:
- `lastPlayedAt`: ISO timestamp of completion
- `scenarioId`: Which scenario was completed
- `path`: Sequence of decisions made
- `correctness`: Score from 0-1 based on correct choices
- `timeToComplete`: Duration in milliseconds

#### Disclaimer

These scenarios are educational tools designed to supplement formal PADI Open Water Diver training. They do not replace proper certification, supervised training, or professional instruction. Always dive within your certification limits and never dive alone.
