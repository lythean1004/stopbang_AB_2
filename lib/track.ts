export type EventProps = Record<string, unknown>;
const KEY = "ab_events_v1";
const SID = "ab_session_id";
export function sessionId() {
  if (typeof window === "undefined") return "server";
  let id = sessionStorage.getItem(SID);
  if (!id) { id = crypto.randomUUID(); sessionStorage.setItem(SID, id); }
  return id;
}
export function track(event: string, props: EventProps = {}, stepIndex = 0) {
  if (typeof window === "undefined") return;
  const item = { variant: "B", sessionId: sessionId(), ts: new Date().toISOString(), path: location.pathname, stepIndex, event, props };
  try { const list = JSON.parse(localStorage.getItem(KEY) || "[]"); localStorage.setItem(KEY, JSON.stringify([...list, item].slice(-1000))); } catch {}
  void fetch("/api/track", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(item), keepalive: true });
}
export const eventsKey = KEY;
