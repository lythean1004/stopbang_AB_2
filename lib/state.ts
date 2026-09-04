export type AppState = { started: boolean; answers: number[]; score: number | null; bookingPath?: "self" | "assist" };
export const initialState: AppState = { started: false, answers: [], score: null };
export const stateKey = "stopbang_state_v1";
export function riskBand(score: number) { return score <= 2 ? "저위험" : score <= 4 ? "중등도" : "고위험"; }
