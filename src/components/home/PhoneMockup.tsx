"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { EASE_OUT, INSTANT } from "./motion";
import { PricePin } from "./PricePin";
import { usePrice } from "./usePrice";

const PINS = [
  { emoji: "🥙", price: 5, left: "40%", top: "46%", selected: true },
  { emoji: "🍜", price: 7.5, left: "72%", top: "23%" },
  { emoji: "🥐", price: 3.2, left: "27%", top: "16%" },
  { emoji: "🍕", price: 8, left: "73%", top: "61%" },
  { emoji: "🌮", price: 6, left: "25%", top: "69%" },
];

const ROADS = [
  [-20, 130, 300, 60],
  [-20, 330, 300, 250],
  [-20, 470, 300, 570],
  [-20, 190, 300, 430],
  [70, -20, 120, 620],
  [205, -20, 175, 620],
];

function MapBackground() {
  return (
    <svg
      viewBox="0 0 280 600"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 size-full"
      aria-hidden
    >
      <path
        d="M-20 395 C 50 350, 110 450, 180 405 S 255 330, 300 350"
        fill="none"
        stroke="#CFE8F7"
        strokeWidth={16}
        strokeLinecap="round"
      />
      {ROADS.map(([x1, y1, x2, y2]) => (
        <line
          key={`${x1}-${y1}`}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="rgba(255,255,255,0.9)"
          strokeWidth={4}
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}

export function PhoneMockup() {
  const t = useTranslations("home.hero.phone");
  const price = usePrice();
  const reduce = useReducedMotion();

  return (
    <motion.div
      role="img"
      aria-label={t("label")}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={reduce ? INSTANT : { duration: 0.7, delay: 0.2, ease: EASE_OUT }}
      className="relative h-[620px] w-[300px] shrink-0 max-[389px]:h-[579px] max-[389px]:w-[280px] rounded-[48px] border-[10px] border-ink bg-ink shadow-[0_40px_80px_rgba(17,24,39,0.18)]"
    >
      <div className="absolute inset-0 overflow-hidden rounded-[38px] bg-[#EAF6EF]">
        <MapBackground />

        {PINS.map((pin, i) => (
          <motion.div
            key={pin.emoji}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: pin.left, top: pin.top, zIndex: pin.selected ? 2 : 1 }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={
              reduce
                ? INSTANT
                : { type: "spring", stiffness: 420, damping: 18, delay: 0.6 + i * 0.15 }
            }
          >
            <motion.div
              animate={reduce ? undefined : { y: [0, -4, 0, 4, 0] }}
              transition={{
                duration: 3,
                ease: "easeInOut",
                repeat: Infinity,
                delay: 1.4 + i * 0.35,
              }}
            >
              <PricePin emoji={pin.emoji} price={price(pin.price)} selected={pin.selected} />
            </motion.div>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduce ? INSTANT : { duration: 0.5, delay: 1.4, ease: EASE_OUT }}
          className="absolute inset-x-2.5 bottom-2.5 z-10 rounded-[20px] bg-white p-3.5 shadow-[0_8px_24px_rgba(17,24,39,0.12)]"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[15px] font-extrabold leading-snug text-ink">{t("placeName")}</p>
              <p className="mt-0.5 text-[12px] font-medium text-muted">{t("placeMeta")}</p>
            </div>
            <span className="flex h-6 shrink-0 items-center rounded-xl bg-green px-2.5 text-[13px] font-extrabold text-white">
              {price(5)}
            </span>
          </div>
          <p className="mt-2 text-[12px] font-semibold text-green-dark">✓ {t("verified")}</p>
        </motion.div>
      </div>

      <div className="absolute left-1/2 top-2.5 z-20 h-7 w-[110px] -translate-x-1/2 rounded-[14px] bg-ink" />
    </motion.div>
  );
}
