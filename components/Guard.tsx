"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppState } from "./StateProvider";
export function Guard({ children, requireBooking=false }: { children: React.ReactNode; requireBooking?: boolean }) { const {state,ready,demo}=useAppState(); const router=useRouter(); useEffect(()=>{if(ready&&!demo&&(state.score===null||(requireBooking&&!state.bookingPath)))router.replace("/")},[ready,demo,state.score,state.bookingPath,requireBooking,router]); if(!ready||(!demo&&state.score===null))return null; return <>{children}</>; }
