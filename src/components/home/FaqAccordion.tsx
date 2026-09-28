"use client";

import clsx from "clsx";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { type ReactNode, useId, useState } from "react";
import { INSTANT } from "./motion";

export type FaqItem = { q: string; a: string };

export function FaqAccordion({
  items,
  defaultOpen = 0,
}: {
  /** Answers may be rendered content (e.g. Markdown) instead of plain text. */
  items: { q: string; a: ReactNode }[];
  /** Index of the item open on first render; null keeps them all closed. */
  defaultOpen?: number | null;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const reduce = useReducedMotion();
  const baseId = useId();

  return (
    <ul className="border-y border-line">
      {items.map((item, i) => {
        const isOpen = open === i;
        const buttonId = `${baseId}-q${i}`;
        const panelId = `${baseId}-a${i}`;

        return (
          <li key={i} className={clsx(i > 0 && "border-t border-line")}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={isOpen ? panelId : undefined}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-center justify-between gap-6 py-6 text-left"
              >
                <span className="text-[18px] font-bold text-ink transition-colors group-hover:text-green-dark">
                  {item.q}
                </span>
                <span
                  aria-hidden
                  className={clsx(
                    "flex size-8 shrink-0 items-center justify-center rounded-full border transition-colors",
                    isOpen ? "border-green bg-green text-white" : "border-line text-ink",
                  )}
                >
                  {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                </span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={reduce ? INSTANT : { duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="pb-6 pr-12 text-[16px] font-medium leading-[1.7] text-muted">
                    {item.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
