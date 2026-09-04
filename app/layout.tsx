import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/components/AppShell";
import { StateProvider } from "@/components/StateProvider";
export const metadata: Metadata = { title: "수면 건강 체크", description: "STOP-BANG 기반 수면 건강 체크 목업입니다." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="ko"><body><StateProvider><AppShell>{children}</AppShell></StateProvider></body></html>; }
