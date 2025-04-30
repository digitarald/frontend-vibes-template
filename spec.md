**Concept name**: *Sleep Coach Mini*

**Goal**: a friction-free, browser-only pilot that gives anyone a 14-day, AI-tailored sleep reboot—no sign-up, all data in localStorage.

### Core user flow
1. **First visit – Hero screen**  
   - Full-bleed night-sky image, headline “Reboot Your Sleep in 14 Days”.  
   - Single CTA button **Start** → launches Wizard.

2. **Adaptive 6-question Wizard** (one card per question, swipe / ← → keys)  
   - Q1: pick main sleep worry (duration, awakenings, energy, other).  
   - Subsequent 5 adapt via OpenRouter prompt chain to probe fitness, nutrition, relationships, environment, schedule.  
   - Micro-animation on answer selection (subtle haptic-like bounce).  
   - Progress ring fills 1/6 each step.

3. **Plan Reveal (within same flow)**  
   - Confetti burst → “Your 14-Day Plan is Ready”.  
   - Stacked cards: *Bedtime goal*, *Wake goal*, *Tonight’s micro-habit*, *Daily journal prompt*.  
   - “Let’s Go” closes wizard; hero screen morphs into Dashboard.

4. **Main Dashboard (PWA-style home)**  
   - Top bar shows current streak badge; tap opens **Rewards Drawer**.  
   - Big “Lights-Out” button (starts sleep log timer). After 3 s press → animation to moon icon.  
   - If timer running, shows elapsed; morning tap “I’m Up” ends log, triggers Quick-Journal modal.  
   - **Today card stack**:  
     - *Micro-goal*: e.g., “No phone after 10 pm”. Done? toggle.  
     - *Advisor Tip*: one-sentence AI tip localized to user’s region/time (OpenRouter).  
     - *Journal prompt*: AI-generated question reflecting wizard themes + previous mood tag.

5. **Rewards Drawer**  
   - Adaptive medals (bronze after 3 streak days, etc.).  
   - “Share win” button hits `/share` endpoint → gets back PNG + caption; uses Web Share API.

6. **Settings fly-over** (top-right gear)  
   - Toggle bedtime / wake notifications (browser Notification API).  
   - Re-take Wizard, clear data.

### Micro-interactions & delight
- Apple-like tension-release animation on button presses.  
- Subtle parallax on scroll; haptic-style sound on streak unlock (softer for night hours).  
- Dark-mode default, auto-switches to light mode at local sunrise.

### AI touch-points
- **Wizard adaptation & scoring** → returns JSON: chronotype, top barriers, motivation profile.  
- **Plan generator** → outputs 14-day array of micro-goals (one per day, aligned to user profile).  
- **Daily tip & journal prompt** → prompt includes user streak, recent mood tag, local weather event.  
- **Reward logic** → OpenRouter function picks reward copy + suggested “next habit” when user plateaus 3 days.  
- **Shareable infographic** → parameter list (streak days, badge, key stat) sent to `/share` endpoint for runtime image generation.

### Data model (all in localStorage)
```
userProfile {wizardAnswers, chronoType, barriers, createdAt}
plan {day#, bedtime, waketime, goal, completed}
sleepLogs [{start, end, duration}]
journalEntries [{date, text, moodTag}]
streak {current, longest, lastUpdated}
```

### Notification cadence
- At T-60 min before target bedtime → “Wind-down starts now: {micro-goal}”.  
- At target wake time → “Log your night & journal”.

### Edge cases
- If “Lights-Out” not tapped by 3 am local → morning check-in asks for manual duration.  
- Clearing storage resets app to hero screen.

### Testing hooks
- In dev mode, `?fast=true` compresses 24 h cycles to 2 min for UX demos.