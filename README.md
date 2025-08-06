This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## 🌊 PADI Open Water Diver Quiz

This application includes a comprehensive daily quiz system for PADI Open Water Diver education with spaced repetition learning.

### Features

- **Daily Quiz Practice**: 5-7 micro-questions per day (2-3 minutes)
- **Spaced Repetition System (SRS)**: Leitner-style scheduling with 6 review boxes
- **Multiple Question Types**: MCQ, True/False, and diving signal recognition
- **Progress Tracking**: Daily streaks and mastery levels
- **50+ Educational Questions**: Safety, physics, physiology, equipment, planning, environment, signals, and emergency procedures
- **Mobile-Responsive**: Optimized for 320-768px screens
- **Accessibility**: Full keyboard navigation and screen reader support

### How to Use the Daily Quiz

1. **Navigate to Quiz**: Click "Quiz" in the main navigation
2. **Start Daily Quiz**: Click "Start Daily Quiz" on the quiz hub page
3. **Answer Questions**: Work through 5-7 questions tailored to your progress
4. **Review Results**: See your accuracy, streak, and areas for improvement
5. **Build Streaks**: Return daily to maintain your learning streak

### Quiz Routes

- `/quiz` - Quiz hub with navigation to different modes
- `/quiz/daily` - Daily spaced repetition quiz

### Educational Content

Questions cover all essential PADI Open Water topics:

- **Safety**: BWRAF checks, ascent rates, safety stops
- **Physics**: Boyle's Law, pressure, buoyancy
- **Physiology**: DCS, equalization, nitrogen narcosis
- **Equipment**: BCD, regulator, mask clearing, weights
- **Planning**: NDLs, computers, surface intervals, no-fly times
- **Environment**: Marine life, currents, visibility
- **Signals**: Hand signals, communication underwater
- **Emergency**: Air sharing, separation procedures

### Storage

All progress is stored locally in your browser using localStorage:
- `owd-srs-v1` - Question scheduling and review history
- Individual question mastery levels and next review dates

### Disclaimer

⚠️ **Educational practice only.** Always follow your PADI Instructor, agency standards, and local regulations. Not a substitute for formal training or medical advice.

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.
