export const OPTION_ORDER = ["self", "assist"] as const;
export const RANDOMIZE_OPTION_ORDER = false;
export type BookingOption = (typeof OPTION_ORDER)[number];
