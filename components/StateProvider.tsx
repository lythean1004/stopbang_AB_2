"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { AppState, initialState, stateKey } from "@/lib/state";
import { sessionId, track } from "@/lib/track";

type Store = { state: AppState; setState: React.Dispatch<React.SetStateAction<AppState>>; ready: boolean; demo: boolean };
const Context = createContext<Store | null>(null);
export function StateProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState(initialState); const [ready, setReady] = useState(false);
  const demo = typeof window !== "undefined" && new URLSearchParams(location.search).get("demo") === "1";
  useEffect(() => { const raw = sessionStorage.getItem(stateKey); if (raw) setState(JSON.parse(raw)); else if (demo) setState({ started: true, answers: [1,1,1,1,1,0,0,0], score: 5 }); setReady(true); sessionId(); track("session_start"); }, [demo]);
  useEffect(() => { if (ready) sessionStorage.setItem(stateKey, JSON.stringify(state)); }, [state, ready]);
  return <Context.Provider value={useMemo(() => ({ state, setState, ready, demo }), [state, ready, demo])}>{children}</Context.Provider>;
}
export function useAppState() { const value = useContext(Context); if (!value) throw new Error("StateProvider가 필요합니다."); return value; }
