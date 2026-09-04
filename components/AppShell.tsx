"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { track } from "@/lib/track";
import { BackIcon } from "./UI";
const steps: Record<string, number> = { "/": 1, "/low-risk": 1, "/learn": 2, "/choose": 3, "/self": 3, "/assist": 3, "/done": 3 };
export function AppShell({ children }: { children: React.ReactNode }) {
  const path = usePathname(); const router = useRouter(); const entered = useRef(Date.now()); const step = steps[path] || 0;
  useEffect(() => { entered.current = Date.now(); track("step_view", { step: step }, step); return () => track("page_exit", { durationMs: Date.now()-entered.current }, step); }, [path, step]);
  return <div className="app"><header><button aria-label="뒤로가기" className={`back ${path === "/" ? "hidden" : ""}`} onClick={() => router.back()}><BackIcon/></button><span>수면 건강 체크</span></header>{step>0 && <div className="progress" aria-label={`${step}단계`}><div style={{ width: step===1?"33%":step===2?"66%":"100%" }}/></div>}<main>{children}</main><footer>본 페이지는 테스트용 목업이며, 의학적 진단이나 의료행위를 대체하지 않습니다.</footer></div>;
}
