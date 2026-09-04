"use client";
import { motion } from "framer-motion";
import { ButtonHTMLAttributes, InputHTMLAttributes } from "react";
export const transition = { duration: 0.22, ease: [0.22, 1, 0.36, 1] as const };
export function Page({ children, className="" }: { children: React.ReactNode; className?: string }) { return <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={transition} className={className}>{children}</motion.div>; }
export function Card({ children, className="" }: { children: React.ReactNode; className?: string }) { return <div className={`card ${className}`}>{children}</div>; }
export function Button({ variant="primary", className="", ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary"|"secondary" }) { return <button className={`button ${variant} ${className}`} {...props} />; }
export function Input({ label, error, ...props }: InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string }) { return <label className="field"><span>{label}</span><input {...props}/>{error && <small className="error">{error}</small>}</label>; }
export function ArrowIcon() { return <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m9 18 6-6-6-6"/></svg>; }
export function BackIcon() { return <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m15 18-6-6 6-6"/></svg>; }
export function CalendarIcon() { return <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></svg>; }
export function PhoneIcon() { return <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z"/></svg>; }
