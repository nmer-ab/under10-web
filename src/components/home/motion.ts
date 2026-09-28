import type { Transition } from "framer-motion";

export const INSTANT: Transition = { type: "tween", duration: 0 };

export const EASE_OUT = [0.22, 1, 0.36, 1] as const;
