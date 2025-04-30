import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { SleepMiniState } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Storage keys
const STORAGE_KEY = "sleep-coach-mini-data"

// Local storage functions
export function saveToLocalStorage(data: Partial<SleepMiniState>): void {
  if (typeof window === 'undefined') return

  try {
    const existingData = getFromLocalStorage() || {}
    const newData = { ...existingData, ...data }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData))
  } catch (error) {
    console.error("Error saving to localStorage:", error)
  }
}

export function getFromLocalStorage(): SleepMiniState | null {
  if (typeof window === 'undefined') return null

  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : null
  } catch (error) {
    console.error("Error reading from localStorage:", error)
    return null
  }
}

export function clearLocalStorage(): void {
  if (typeof window === 'undefined') return

  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.error("Error clearing localStorage:", error)
  }
}

// Time formatting helpers
export function formatTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

// Get initial state or reset
export function getInitialState(): SleepMiniState {
  const storedData = getFromLocalStorage()
  return storedData || { 
    userProfile: undefined,
    plan: undefined,
    sleepLogs: [],
    journalEntries: [],
    streak: { current: 0, longest: 0, lastUpdated: new Date().toISOString() }
  }
}
