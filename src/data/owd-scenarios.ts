// PADI Open Water Diver Scenario Data Model
export interface ScenarioNode {
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

export interface Scenario {
  id: string
  title: string
  tags: string[]
  rootId: string
  nodes: Record<string, ScenarioNode>
}

export interface ScenarioProgress {
  lastPlayedAt: string // ISO date
  scenarioId: string
  path: string[] // node IDs taken
  correctness: number // 0-1 score
  timeToComplete: number // milliseconds
}

// Mock scenario data - safety-critical diving decisions
export const scenarios: Scenario[] = [
  {
    id: "low-air-current",
    title: "Low Air at Depth with Current",
    tags: ["air-management", "depth", "current", "safety"],
    rootId: "start",
    nodes: {
      start: {
        id: "start",
        prompt: "You're at 18 meters depth during a reef dive. Your air gauge shows 50 bar (725 psi) remaining. You notice a mild current pulling you along the reef. Your buddy is about 3 meters away, looking at coral formations. What's your immediate action?",
        options: [
          {
            id: "signal-ascend",
            label: "Signal buddy and begin controlled ascent",
            nextId: "good-ascent",
            correct: true,
            rationale: "Correct! At 50 bar, you should begin ascent immediately. The rule of thirds suggests starting ascent with reserve air, and 50 bar is cutting it close at 18m depth."
          },
          {
            id: "continue-dive",
            label: "Continue diving - 50 bar is enough for a few more minutes",
            nextId: "dangerous-choice",
            correct: false,
            rationale: "Dangerous! 50 bar at 18m gives very little safety margin. Air consumption increases with depth and stress."
          },
          {
            id: "share-air",
            label: "Swim to buddy and signal for air sharing",
            nextId: "unnecessary-sharing",
            correct: false,
            rationale: "Premature air sharing. While good to know your buddy's location, 50 bar is still breathable - use it for controlled ascent instead."
          }
        ]
      },
      "good-ascent": {
        id: "good-ascent",
        prompt: "You signal your buddy and begin ascending. During ascent, you notice your air dropping to 30 bar. Your buddy signals they have 80 bar remaining. What do you do?",
        options: [
          {
            id: "continue-normal",
            label: "Continue normal ascent, monitor air closely",
            nextId: "safe-surface",
            correct: true,
            rationale: "Correct! With 30 bar remaining and ascending, continue your controlled ascent while monitoring. Your buddy has adequate air if emergency sharing is needed."
          },
          {
            id: "emergency-ascent",
            label: "Switch to emergency ascent procedures",
            nextId: "too-fast",
            correct: false,
            rationale: "Unnecessary emergency ascent. 30 bar is still breathable during controlled ascent. Emergency ascents risk DCS."
          }
        ]
      },
      "dangerous-choice": {
        id: "dangerous-choice",
        prompt: "You continue diving. At 20 meters, your gauge now reads 20 bar and you feel slightly anxious. The current has strengthened. What now?",
        options: [
          {
            id: "emergency-surface",
            label: "Emergency ascent to surface immediately",
            nextId: "dcs-risk",
            correct: false,
            rationale: "High DCS risk! Even in low air emergency, controlled ascent is safer than rapid emergency ascent when possible."
          },
          {
            id: "share-air-now",
            label: "Signal buddy for emergency air sharing",
            nextId: "good-sharing",
            correct: true,
            rationale: "Correct emergency response! With 20 bar at 20m, immediate air sharing is necessary. Signal buddy clearly and prepare for shared ascent."
          }
        ]
      },
      "safe-surface": {
        id: "safe-surface",
        prompt: "You surface safely with 15 bar remaining. Your buddy surfaces with 60 bar.",
        options: [],
        terminal: true,
        debrief: "Excellent decision-making! You recognized the low air situation early and took appropriate action. Key takeaways: Monitor air consumption regularly, begin ascent with adequate reserves (typically 50-70 bar depending on depth), and maintain buddy contact throughout the dive. The '50 bar rule' exists for safety - use it as your absolute minimum for starting ascent."
      },
      "unnecessary-sharing": {
        id: "unnecessary-sharing",
        prompt: "Your buddy is confused by your air-sharing signal since you both have breathable air. This creates confusion underwater.",
        options: [
          {
            id: "clarify-ascent",
            label: "Signal for ascent instead - show air gauge",
            nextId: "delayed-ascent",
            correct: true,
            rationale: "Good recovery! Clear communication prevents panic. Showing your air gauge helps buddy understand the situation."
          }
        ]
      },
      "delayed-ascent": {
        id: "delayed-ascent",
        prompt: "After the confusion, you've used additional air and now have 35 bar. You begin ascending together.",
        options: [],
        terminal: true,
        debrief: "Communication mix-up caused delay, but you recovered well. Remember: 50 bar is 'ascent now' time, not 'air sharing' time. Practice clear hand signals for low air situations. Always start ascent with adequate reserves to account for unexpected delays or increased consumption during ascent."
      },
      "good-sharing": {
        id: "good-sharing",
        prompt: "Your buddy responds well to your air sharing signal. You successfully share air and begin a controlled ascent together.",
        options: [],
        terminal: true,
        debrief: "Good emergency response! You correctly identified the need for air sharing when air became critically low. However, this situation could have been prevented by monitoring air more closely and starting ascent at 50+ bar. Emergency air sharing works, but prevention is always better. Review your air consumption rate and plan better gas management for future dives."
      },
      "dcs-risk": {
        id: "dcs-risk",
        prompt: "You ascend rapidly to the surface. You have some joint pain after the dive.",
        options: [],
        terminal: true,
        debrief: "Poor decision! Rapid emergency ascents significantly increase decompression sickness (DCS) risk. Even with low air, controlled ascent or air sharing is safer than rapid ascent when possible. Joint pain after rapid ascent from 20m is concerning - seek medical evaluation. Better air management and emergency procedures could have prevented this dangerous situation."
      },
      "too-fast": {
        id: "too-fast",
        prompt: "Your rapid ascent causes ear discomfort and you feel dizzy upon surfacing.",
        options: [],
        terminal: true,
        debrief: "Unnecessary emergency ascent! 30 bar was sufficient for controlled ascent. Rapid ascents risk DCS, ear barotrauma, and other injuries. Emergency ascents should only be used when air supply is completely exhausted or in immediate danger. Practice better air monitoring and ascent planning to avoid these situations."
      }
    }
  },
  {
    id: "mask-flood-surge",
    title: "Mask Flooding in Surge",
    tags: ["mask-skills", "surge", "buoyancy", "reef"],
    rootId: "start",
    nodes: {
      start: {
        id: "start",
        prompt: "You're diving near a reef at 12 meters when surge pushes you closer to the coral. Your mask floods completely during a sudden wave motion. You can see the reef wall very close. What's your immediate priority?",
        options: [
          {
            id: "stabilize-first",
            label: "Stabilize position and buoyancy, then address mask",
            nextId: "good-priorities",
            correct: true,
            rationale: "Correct! Buoyancy and position control come first. Stabilizing prevents reef damage and injury while maintaining safety before addressing equipment issues."
          },
          {
            id: "clear-mask-now",
            label: "Clear mask immediately while being pushed by surge",
            nextId: "unstable-clear",
            correct: false,
            rationale: "Poor timing! Attempting mask clearing while unstable near reef risks hitting coral and losing buoyancy control. Stabilize first."
          },
          {
            id: "ascend-immediately",
            label: "Ascend away from reef to clear water",
            nextId: "good-spacing",
            correct: true,
            rationale: "Also correct! Moving to open water removes reef collision risk and provides stable environment for mask clearing."
          }
        ]
      },
      "good-priorities": {
        id: "good-priorities",
        prompt: "You maintain neutral buoyancy and position yourself safely away from the reef. Your mask is still flooded but you're breathing normally through your regulator. How do you clear it?",
        options: [
          {
            id: "standard-clear",
            label: "Tilt head back, press top of mask, exhale through nose",
            nextId: "successful-clear",
            correct: true,
            rationale: "Perfect technique! Standard mask clearing works well when you have good buoyancy control and stable positioning."
          },
          {
            id: "remove-replace",
            label: "Remove mask completely and replace it",
            nextId: "unnecessary-removal",
            correct: false,
            rationale: "Overly complicated! Standard clearing is simpler and faster. Mask removal should be reserved for equipment malfunction, not routine clearing."
          }
        ]
      },
      "unstable-clear": {
        id: "unstable-clear",
        prompt: "While trying to clear your mask, the surge pushes you into soft coral. You bump the reef but avoid major damage. Your mask is still partially flooded.",
        options: [
          {
            id: "move-away-now",
            label: "Swim away from reef to stable water first",
            nextId: "recovery-clear",
            correct: true,
            rationale: "Good learning! You recognize the need to stabilize before continuing equipment procedures."
          },
          {
            id: "keep-trying",
            label: "Continue trying to clear mask while near reef",
            nextId: "reef-damage",
            correct: false,
            rationale: "Dangerous persistence! Continuing equipment tasks while unstable near reef risks injury and environmental damage."
          }
        ]
      },
      "good-spacing": {
        id: "good-spacing",
        prompt: "You ascend to 8 meters in open water, away from the reef. The surge is less noticeable here. Your mask is still flooded but you're in a stable environment.",
        options: [
          {
            id: "clear-here",
            label: "Clear mask using standard technique",
            nextId: "successful-clear",
            correct: true,
            rationale: "Excellent positioning! Open water provides stable environment for mask clearing without reef collision risk."
          }
        ]
      },
      "successful-clear": {
        id: "successful-clear",
        prompt: "Your mask clears completely. You can see clearly and feel comfortable. The surge is still affecting the reef area below.",
        options: [
          {
            id: "continue-dive",
            label: "Continue dive in open water, monitor conditions",
            nextId: "safe-completion",
            correct: true,
            rationale: "Smart continuation! Staying in open water while surge affects reef shows good environmental awareness and safety judgment."
          },
          {
            id: "return-reef",
            label: "Return to reef diving immediately",
            nextId: "challenging-conditions",
            correct: false,
            rationale: "Questionable choice. While not wrong, waiting for calmer conditions or staying in open water might be safer given the surge."
          }
        ]
      },
      "recovery-clear": {
        id: "recovery-clear",
        prompt: "You move to open water and successfully clear your mask. You have a small scrape on your hand from the coral contact.",
        options: [],
        terminal: true,
        debrief: "Good recovery from initial poor judgment! You learned that buoyancy and positioning come before equipment tasks. The small coral contact reminds us why we avoid reef contact - it protects both diver and environment. Key lesson: Address buoyancy and positioning first, then handle equipment issues in stable conditions."
      },
      "reef-damage": {
        id: "reef-damage",
        prompt: "Your continued attempts near the reef result in breaking a piece of coral and scraping your equipment. Your mask finally clears but environmental damage is done.",
        options: [],
        terminal: true,
        debrief: "Poor decision sequence! Persistence in the wrong environment caused unnecessary reef damage and equipment wear. Remember: 1) Establish safety first (buoyancy, positioning), 2) Move to appropriate environment, 3) Then address equipment. Reef protection is every diver's responsibility. Your mask would have cleared just as well in open water without environmental damage."
      },
      "unnecessary-removal": {
        id: "unnecessary-removal",
        prompt: "Removing and replacing your mask takes longer than necessary and uses more air. The mask seals properly when replaced.",
        options: [],
        terminal: true,
        debrief: "Mission accomplished but inefficiently! You had good priorities (stabilizing first) but chose an overly complex solution. Standard mask clearing is faster, uses less air, and achieves the same result. Save mask removal techniques for true equipment malfunction. Efficient diving conserves air and time underwater."
      },
      "safe-completion": {
        id: "safe-completion",
        prompt: "You complete the dive safely in open water, avoiding the surge-affected reef area until conditions improve.",
        options: [],
        terminal: true,
        debrief: "Excellent decision-making throughout! You demonstrated proper priorities: safety first, then equipment, then environment selection. Key lessons: 1) Buoyancy control enables equipment handling, 2) Environment affects task difficulty, 3) Patience and positioning prevent problems. Your approach protected both yourself and the reef environment."
      },
      "challenging-conditions": {
        id: "challenging-conditions",
        prompt: "You return to reef diving but the surge makes it challenging to maintain position. You manage to avoid reef contact but it's more difficult diving.",
        options: [],
        terminal: true,
        debrief: "Acceptable but challenging choice! While you maintained good buoyancy control near the reef in surge conditions, diving in easier conditions would have been more enjoyable and safer. Consider environmental conditions when planning your dive path. Sometimes patience leads to better diving experiences."
      }
    }
  },
  {
    id: "boat-recall-signal",
    title: "Boat Recall Signal During Dive",
    tags: ["surface-signaling", "emergency-procedures", "dive-planning"],
    rootId: "start",
    nodes: {
      start: {
        id: "start",
        prompt: "You're 25 minutes into a planned 45-minute dive at 15 meters. You hear the boat's emergency recall signal (5 sharp whistle blasts repeated). You have 70 bar remaining and are with your buddy who has 80 bar. What do you do?",
        options: [
          {
            id: "ascend-with-smb",
            label: "Deploy SMB and begin immediate controlled ascent",
            nextId: "good-emergency-response",
            correct: true,
            rationale: "Correct! Emergency recall signals require immediate response. SMB deployment alerts surface support to your position during ascent."
          },
          {
            id: "ignore-continue",
            label: "Ignore signal - we have plenty of air for planned dive",
            nextId: "dangerous-ignore",
            correct: false,
            rationale: "Extremely dangerous! Emergency recall signals indicate surface emergencies (weather, medical, boat problems). Never ignore emergency signals."
          },
          {
            id: "search-other-divers",
            label: "Look for other divers first, then ascend together",
            nextId: "delayed-response",
            correct: false,
            rationale: "Well-intentioned but wrong! Emergency recalls require immediate response. Other divers are responsible for their own emergency procedures."
          }
        ]
      },
      "good-emergency-response": {
        id: "good-emergency-response",
        prompt: "You deploy your SMB successfully and begin ascending with your buddy. At 8 meters, you notice heavy chop on the surface that wasn't there when you descended. Your ascent rate is good.",
        options: [
          {
            id: "continue-ascent",
            label: "Continue controlled ascent to surface",
            nextId: "surface-weather",
            correct: true,
            rationale: "Correct! Continue emergency ascent as signaled. Surface crew has made recall decision based on conditions they can observe."
          },
          {
            id: "hold-depth",
            label: "Hold at safety stop depth until seas calm",
            nextId: "disobey-recall",
            correct: false,
            rationale: "Disobeying emergency recall! Surface crew needs divers up NOW for safety reasons. They've assessed conditions and made the call."
          }
        ]
      },
      "surface-weather": {
        id: "surface-weather",
        prompt: "You surface to find 3-foot waves and darkening skies. The boat crew immediately begins pulling divers aboard quickly but safely. You see lightning in the distance.",
        options: [
          {
            id: "board-quickly",
            label: "Board boat immediately when crew signals",
            nextId: "safe-recovery",
            correct: true,
            rationale: "Perfect! Lightning and deteriorating weather justified the emergency recall. Quick boarding keeps everyone safe."
          }
        ]
      },
      "dangerous-ignore": {
        id: "dangerous-ignore",
        prompt: "You continue diving for 10 more minutes. When you finally surface, you find the boat crew in emergency mode with weather deteriorating rapidly. Lightning is visible and waves are building.",
        options: [
          {
            id: "emergency-board",
            label: "Board immediately despite rough conditions",
            nextId: "difficult-recovery",
            correct: true,
            rationale: "Only option now! Your delay made recovery more dangerous for everyone. Emergency boarding in rough weather is risky."
          }
        ]
      },
      "delayed-response": {
        id: "delayed-response",
        prompt: "You spend 5 minutes looking for other divers before ascending. When you surface, weather conditions have worsened significantly and the crew seems stressed.",
        options: [
          {
            id: "board-now",
            label: "Board boat immediately",
            nextId: "marginally-safe",
            correct: true,
            rationale: "Right action, but your delay created unnecessary risk. Emergency procedures exist for immediate response."
          }
        ]
      },
      "safe-recovery": {
        id: "safe-recovery",
        prompt: "All divers are recovered safely before the weather becomes dangerous. The boat heads to protected water.",
        options: [],
        terminal: true,
        debrief: "Excellent emergency response! You demonstrated proper understanding of emergency recall procedures: immediate response, SMB deployment, controlled ascent, and quick boarding. Emergency signals override dive plans because surface conditions can change rapidly. Your quick response helped ensure everyone's safety."
      },
      "difficult-recovery": {
        id: "difficult-recovery",
        prompt: "Boarding in rough conditions is challenging and slightly injuries another diver during recovery. You're all safe but it was unnecessarily dangerous.",
        options: [],
        terminal: true,
        debrief: "Poor decision with serious consequences! Ignoring emergency recall signals endangers everyone. Weather can deteriorate rapidly, and surface crews have information divers don't. Your delay forced dangerous recovery conditions and injured a fellow diver. Emergency signals demand immediate response - no exceptions."
      },
      "disobey-recall": {
        id: "disobey-recall",
        prompt: "You wait underwater for 3 minutes. When you surface, seas are rougher and the crew is very concerned about your location and delay.",
        options: [],
        terminal: true,
        debrief: "Dangerous disobedience! Emergency recall means surface NOW, not when convenient. Staying underwater during emergency recall violates fundamental diving safety. Surface crews cannot help divers who don't respond to emergency signals. Your delay created unnecessary risk and stress for everyone."
      },
      "marginally-safe": {
        id: "marginally-safe",
        prompt: "Recovery is successful but more difficult than necessary due to worsening conditions during your delay.",
        options: [],
        terminal: true,
        debrief: "Delayed but acceptable outcome. Your search for other divers was well-intentioned but wrong. Emergency recalls require immediate individual response - other divers are responsible for their own emergency procedures. Five-minute delay seems minor but can be critical in deteriorating weather conditions."
      }
    }
  },
  {
    id: "navigation-lost-lowvis",
    title: "Lost Navigation in Low Visibility",
    tags: ["navigation", "low-visibility", "safety-procedures", "compass"],
    rootId: "start",
    nodes: {
      start: {
        id: "start",
        prompt: "You're 30 minutes into a shore dive in 10 meters of water. Visibility has dropped from 8 meters to 2 meters due to sediment stirred up by other divers. You've lost sight of the anchor line and are unsure of your direction back to shore. Your buddy is still with you. Air: 60 bar. What's your first action?",
        options: [
          {
            id: "stop-assess",
            label: "Stop, signal buddy, and assess the situation",
            nextId: "good-stop",
            correct: true,
            rationale: "Correct! First rule when lost: STOP. Don't make it worse by swimming randomly. Assessment with buddy prevents separation and poor decisions."
          },
          {
            id: "surface-immediately",
            label: "Ascend to surface to get bearings",
            nextId: "premature-ascent",
            correct: false,
            rationale: "Premature ascent! Try underwater navigation first. Surfacing should be last resort as you'll lose your current position reference."
          },
          {
            id: "swim-random",
            label: "Pick a direction and swim to find reference",
            nextId: "making-worse",
            correct: false,
            rationale: "Dangerous! Random swimming when lost usually makes the situation worse. You could swim away from safety or get further lost."
          }
        ]
      },
      "good-stop": {
        id: "good-stop",
        prompt: "You and your buddy stop and hover in place. You have limited visibility but can see the bottom. You remember entering the water swimming east, and the shore was generally south of your position. What navigation aid do you use?",
        options: [
          {
            id: "check-compass",
            label: "Check compass for directional reference",
            nextId: "compass-navigation",
            correct: true,
            rationale: "Excellent! Compass navigation works in any visibility. If you know your entry direction, you can reverse the bearing to head back."
          },
          {
            id: "follow-bottom",
            label: "Follow bottom contours toward shallow water",
            nextId: "depth-navigation",
            correct: true,
            rationale: "Also good! Natural navigation using depth changes. Generally, shore is in shallower direction. Combined with compass is even better."
          },
          {
            id: "wait-for-visibility",
            label: "Wait in place for visibility to improve",
            nextId: "patient-wait",
            correct: false,
            rationale: "Passive but wasteful of air. With 60 bar, you need active navigation. Sediment stirred by divers may not settle quickly."
          }
        ]
      },
      "compass-navigation": {
        id: "compass-navigation",
        prompt: "Your compass shows you've been heading northeast. To return to shore (south), you should head southwest. You set a reciprocal bearing and begin swimming slowly with your buddy, checking the compass regularly.",
        options: [
          {
            id: "swim-bearing",
            label: "Follow compass bearing while monitoring depth",
            nextId: "successful-navigation",
            correct: true,
            rationale: "Perfect technique! Compass navigation combined with depth monitoring provides multiple references for safe return."
          },
          {
            id: "surface-check",
            label: "Surface periodically to verify direction",
            nextId: "repeated-surfacing",
            correct: false,
            rationale: "Inefficient! Trust your compass underwater. Repeated surfacing wastes air and time, and you might lose your buddy."
          }
        ]
      },
      "depth-navigation": {
        id: "depth-navigation",
        prompt: "You begin following the bottom toward shallower water. Your depth decreases from 10m to 8m to 6m. This seems promising, but you want to verify direction.",
        options: [
          {
            id: "add-compass",
            label: "Use compass to confirm you're heading toward shore",
            nextId: "combined-navigation",
            correct: true,
            rationale: "Excellent! Combining natural navigation (depth) with compass bearing gives maximum confidence in low visibility."
          },
          {
            id: "continue-depth-only",
            label: "Continue following depth only - it's working",
            nextId: "depth-only-risk",
            correct: false,
            rationale: "Risky! Bottom contours can be deceiving. Shallow areas might lead parallel to shore or to underwater features, not shore."
          }
        ]
      },
      "premature-ascent": {
        id: "premature-ascent",
        prompt: "You surface and see the shore about 100 meters south. However, you've lost your underwater position reference and will need to redescend to collect your buddy who remained below.",
        options: [
          {
            id: "descend-rejoin",
            label: "Descend to rejoin buddy and navigate underwater",
            nextId: "rejoin-navigate",
            correct: true,
            rationale: "Good recovery! Buddy separation was poor, but you're fixing it. Use surface bearing to set underwater compass course."
          },
          {
            id: "signal-buddy-up",
            label: "Signal buddy to surface and swim on surface",
            nextId: "surface-swim",
            correct: false,
            rationale: "Acceptable but not ideal. Surface swimming in low visibility water might indicate rough conditions. Underwater navigation is often safer."
          }
        ]
      },
      "making-worse": {
        id: "making-worse",
        prompt: "After swimming for 3 minutes in random directions, you're now completely disoriented. Your air is down to 45 bar and you have no idea which direction leads to safety.",
        options: [
          {
            id: "emergency-ascent",
            label: "Emergency ascent to surface for help",
            nextId: "emergency-surface",
            correct: true,
            rationale: "Now it's the right choice! When thoroughly lost with limited air, surfacing becomes necessary. Should have stopped sooner!"
          },
          {
            id: "keep-searching",
            label: "Continue swimming to find references",
            nextId: "critical-air",
            correct: false,
            rationale: "Dangerous! With 45 bar and completely lost, continued random swimming risks running out of air underwater."
          }
        ]
      },
      "successful-navigation": {
        id: "successful-navigation",
        prompt: "Following your compass bearing while monitoring depth, you find the anchor line at 6 meters depth. You can follow it safely to shore.",
        options: [],
        terminal: true,
        debrief: "Outstanding navigation skills! You demonstrated the correct sequence: STOP when lost, assess with buddy, use compass navigation combined with depth monitoring. This systematic approach prevented panic and led to safe resolution. Key lesson: Compass skills are essential for low visibility diving."
      },
      "combined-navigation": {
        id: "combined-navigation",
        prompt: "Using both depth and compass, you confidently navigate toward shore and eventually find familiar underwater landmarks that confirm your location.",
        options: [],
        terminal: true,
        debrief: "Excellent navigation technique! You used multiple references (depth and compass) to navigate safely in low visibility. This redundant approach prevented errors and gave confidence in your direction. Remember: When visibility is poor, trust your instruments and use multiple navigation methods."
      },
      "patient-wait": {
        id: "patient-wait",
        prompt: "After waiting 5 minutes, visibility hasn't improved and your air is now 45 bar. You need to take action soon.",
        options: [
          {
            id: "navigate-now",
            label: "Use compass navigation to head toward shore",
            nextId: "late-navigation",
            correct: true,
            rationale: "Better late than never! Should have started navigation earlier, but compass bearing will still work with 45 bar."
          }
        ]
      },
      "repeated-surfacing": {
        id: "repeated-surfacing",
        prompt: "Multiple surface checks confirm your direction, but you've used significant air and time. You navigate successfully but with only 25 bar remaining.",
        options: [],
        terminal: true,
        debrief: "Navigation successful but inefficient! Repeated surfacing wastes air and separates you from your buddy. Trust your compass underwater - it's more reliable than visual references in low visibility. Better air management would have resulted from continuous underwater navigation."
      },
      "depth-only-risk": {
        id: "depth-only-risk",
        prompt: "Following depth only, you end up in 3 meters of water but parallel to shore rather than approaching it. You've wasted air and time going the wrong direction.",
        options: [
          {
            id: "compass-correction",
            label: "Use compass to correct course toward shore",
            nextId: "corrected-course",
            correct: true,
            rationale: "Good learning! Natural navigation alone can be misleading. Compass provides reliable directional reference when depth cues fail."
          }
        ]
      },
      "rejoin-navigate": {
        id: "rejoin-navigate",
        prompt: "You rejoin your buddy and use your surface bearing to set a compass course. You navigate successfully to shore together.",
        options: [],
        terminal: true,
        debrief: "Good recovery from initial mistake! While surfacing separated you from buddy temporarily, you used the surface information effectively to set an underwater compass course. Better approach: stop and navigate underwater first, surface only if that fails."
      },
      "surface-swim": {
        id: "surface-swim",
        prompt: "You both surface and swim to shore on the surface. It's safe but you miss the underwater portion of your dive.",
        options: [],
        terminal: true,
        debrief: "Safe but suboptimal solution! Surface swimming ended your dive prematurely. Better navigation skills would have allowed you to complete the dive underwater. Practice compass navigation in good visibility so you're prepared for low visibility situations."
      },
      "emergency-surface": {
        id: "emergency-surface",
        prompt: "You surface in an emergency ascent. You're safe but have to signal for help to return to shore, and your rapid ascent creates decompression stress.",
        options: [],
        terminal: true,
        debrief: "Poor initial decision led to emergency! Random swimming when lost made everything worse. The lesson: STOP immediately when lost, don't make it worse. Emergency ascents should be last resort. Learn compass navigation and practice it regularly."
      },
      "critical-air": {
        id: "critical-air",
        prompt: "Your air reaches 20 bar with no references found. You must surface immediately in a near-emergency ascent.",
        options: [],
        terminal: true,
        debrief: "Dangerous situation created by poor decisions! Random swimming when lost consumed air and orientation. Critical air situations can be life-threatening. Key lessons: STOP when lost, use navigation tools immediately, and never let poor decisions compound into emergencies."
      },
      "late-navigation": {
        id: "late-navigation",
        prompt: "Your compass navigation works with 45 bar remaining. You navigate successfully to shore but with less safety margin than ideal.",
        options: [],
        terminal: true,
        debrief: "Successful but delayed navigation! Waiting when lost wasted precious air and time. The lesson: when lost, immediately use navigation tools rather than hoping conditions improve. Your compass skills saved the dive, but earlier action would have been safer."
      },
      "corrected-course": {
        id: "corrected-course",
        prompt: "Using compass correction, you successfully navigate to shore. The lesson about combining navigation methods is learned.",
        options: [],
        terminal: true,
        debrief: "Good learning experience! Depth-only navigation led you astray, but compass navigation corrected the problem. Key takeaway: use multiple navigation references in low visibility. Natural navigation (depth, bottom features) combined with compass bearing provides the most reliable underwater navigation."
      }
    }
  }
]