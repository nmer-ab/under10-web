"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Play } from "lucide-react";
import { useTranslations } from "next-intl";
import { PricePin } from "./PricePin";
import { usePrice } from "./usePrice";

const FIND_PINS = [
  { emoji: "🥐", price: 4, left: "26%", top: "44%", pulse: true },
  { emoji: "🍜", price: 6.5, left: "72%", top: "32%" },
  { emoji: "🥙", price: 5, left: "62%", top: "66%", pulse: true },
  { emoji: "🍕", price: 8, left: "28%", top: "80%" },
];

export function FindVisual() {
  const t = useTranslations("home.howItWorks.visuals");
  const price = usePrice();
  const reduce = useReducedMotion();

  return (
    <div className="absolute inset-0 bg-[#EAF6EF]">
      <svg
        viewBox="0 0 300 280"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 size-full"
        aria-hidden
      >
        {[
          [-20, 120, 320, 70],
          [-20, 250, 320, 170],
          [110, -20, 180, 300],
        ].map(([x1, y1, x2, y2]) => (
          <line
            key={`${x1}-${y1}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#FFFFFF"
            strokeWidth={6}
            strokeLinecap="round"
          />
        ))}
      </svg>

      <div className="absolute left-3 top-3 z-10 flex gap-2">
        <span className="flex h-7 items-center rounded-[14px] bg-green px-3 text-[12px] font-bold text-white">
          {t("underPrice", { price: price(5) })}
        </span>
        <span className="flex h-7 items-center rounded-[14px] bg-white px-3 text-[12px] font-bold text-ink">
          {t("openNow")}
        </span>
      </div>

      {FIND_PINS.map((pin, i) => (
        <div
          key={pin.emoji}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: pin.left, top: pin.top }}
        >
          <motion.div
            animate={pin.pulse && !reduce ? { scale: [1, 1.08, 1] } : undefined}
            transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, delay: i * 0.3 }}
          >
            <PricePin emoji={pin.emoji} price={price(pin.price)} className="scale-[0.85]" />
          </motion.div>
        </div>
      ))}
    </div>
  );
}

export function VerifyVisual() {
  const t = useTranslations("home.howItWorks.visuals");
  const price = usePrice();
  const reduce = useReducedMotion();
  const loop = { duration: 3, repeat: Infinity, ease: "easeOut" } as const;

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-[220px] rounded-[18px] bg-white p-4 shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
        <div className="flex items-center justify-between gap-2">
          <p className="text-[15px] font-extrabold text-ink">{t("placeName")}</p>
          <span className="flex h-6 items-center rounded-xl bg-green px-2.5 text-[13px] font-extrabold text-white">
            {price(5)}
          </span>
        </div>

        <div className="relative mt-4">
          {!reduce && (
            <motion.span
              aria-hidden
              className="absolute left-1/2 top-0 z-10 flex h-6 -translate-x-1/2 items-center whitespace-nowrap px-2.5 rounded-xl bg-ink text-[13px] font-extrabold text-white"
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: [0, 0, 1, 0, 0], y: [0, 0, -6, -30, -30] }}
              transition={{ ...loop, times: [0, 0.15, 0.25, 0.75, 1] }}
            >
              {t("points", { count: 2 })}
            </motion.span>
          )}
          <motion.div
            className="flex h-10 w-full items-center justify-center rounded-[20px] bg-green text-[14px] font-bold text-white"
            animate={reduce ? undefined : { scale: [1, 1, 0.95, 1, 1] }}
            transition={{ ...loop, times: [0, 0.05, 0.1, 0.2, 1] }}
          >
            ✓ {t("wasThere")}
          </motion.div>
        </div>

        <p className="mt-2 text-center text-[12px] font-semibold text-muted">
          {t("peopleHere", { count: 12 })}
        </p>
      </div>
    </div>
  );
}

export function ShareVisual() {
  const t = useTranslations("home.howItWorks.visuals");
  const price = usePrice();
  const reduce = useReducedMotion();

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <motion.span
        className="absolute right-3 top-3 z-10 flex h-7 items-center rounded-[14px] bg-orange px-3 text-[13px] font-extrabold text-white"
        animate={
          reduce ? undefined : { scale: [0, 1.15, 0.95, 1, 1, 0], opacity: [0, 1, 1, 1, 1, 0] }
        }
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeOut",
          times: [0, 0.08, 0.13, 0.18, 0.9, 1],
        }}
      >
        {t("points", { count: 20 })}
      </motion.span>

      <div className="w-[230px] rounded-[18px] bg-white p-3.5 shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
        <div className="relative flex aspect-[16/10] items-center justify-center rounded-xl bg-[linear-gradient(135deg,#FDE68A,#F97316)]">
          <Play size={28} fill="#FFFFFF" stroke="#FFFFFF" aria-hidden />
          <span className="absolute bottom-1.5 right-1.5 rounded bg-black/60 px-1.5 py-0.5 text-[11px] font-bold leading-none text-white">
            0:34
          </span>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-[13px] font-semibold text-muted">{t("price")}</span>
          <span className="text-[15px] font-extrabold text-ink">{price(5, { cents: true })}</span>
        </div>

        <div className="mt-3 flex h-10 w-full items-center justify-center rounded-[20px] bg-ink text-[14px] font-bold text-white">
          {t("postSpot")}
        </div>
      </div>
    </div>
  );
}
