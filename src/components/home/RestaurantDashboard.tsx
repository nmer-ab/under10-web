"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useMemo, useRef } from "react";
import { numberFormat } from "@/lib/format";
import { DASHBOARD_STATS } from "./dashboard-stats";
import { EASE_OUT, INSTANT } from "./motion";
import { useNumber, usePrice } from "./usePrice";

const DAYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"] as const;
const BAR_HEIGHTS = [40, 55, 48, 70, 62, 88, 100];

function CountUp({ value, run, instant }: { value: number; run: boolean; instant: boolean }) {
  const locale = useLocale();
  const formatter = useMemo(() => numberFormat(locale), [locale]);
  const count = useMotionValue(0);
  const text = useTransform(count, (v) => formatter.format(Math.round(v)));

  useEffect(() => {
    if (!run) return;
    if (instant) {
      count.set(value);
      return;
    }
    const controls = animate(count, value, { duration: 1, ease: EASE_OUT });
    return () => controls.stop();
  }, [run, instant, value, count]);

  return <motion.span>{text}</motion.span>;
}

export function RestaurantDashboard() {
  const t = useTranslations("home.forRestaurants.dashboard");
  const number = useNumber();
  const price = usePrice();
  const reduce = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const timed = (delay = 0, duration = 0.5) =>
    reduce ? INSTANT : { duration, delay, ease: EASE_OUT };

  return (
    <motion.div
      ref={ref}
      aria-hidden
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={timed()}
      className="relative w-full max-w-[520px]"
    >
      <motion.div
        className="absolute -right-3.5 -top-3.5 z-10 flex h-8 items-center gap-2 rounded-2xl bg-ink px-3.5 text-[13px] font-bold text-white"
        animate={reduce ? undefined : { y: [0, -4, 0, 4, 0] }}
        transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
      >
        <span className="size-2 rounded-full bg-orange" />
        {t("newStory")}
      </motion.div>

      <div className="rounded-3xl border border-[#FED7AA] bg-white p-5 shadow-[0_30px_60px_rgba(249,115,22,0.15)]">
        <div className="flex items-center gap-3">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#FFEDD5] text-[22px] leading-none">
            🥙
          </span>
          <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
            <span className="text-[17px] font-extrabold text-ink">Kebab du Coin</span>
            <span className="flex h-[22px] items-center rounded-[11px] bg-orange px-2 text-[11px] font-bold text-white">
              {t("official")}
            </span>
          </div>
          <span className="ml-auto shrink-0 text-[12px] font-semibold text-muted">{t("period")}</span>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2.5">
          {DASHBOARD_STATS.map((stat) => (
            <div key={stat.key} className="rounded-[14px] bg-[#F9FAFB] p-3">
              <p className="truncate text-[12px] font-semibold text-muted">{t(`stats.${stat.key}`)}</p>
              <p className="mt-0.5 text-[22px] font-extrabold leading-tight text-ink">
                <CountUp value={stat.value} run={inView} instant={reduce} />
              </p>
              <p className="text-[12px] font-bold text-green">
                {number(stat.change, { style: "percent", signDisplay: "always" })}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <div className="flex h-[120px] items-end justify-between px-1">
            {BAR_HEIGHTS.map((height, i) => (
              <motion.div
                key={DAYS[i]}
                className={i === BAR_HEIGHTS.length - 1 ? "bg-orange" : "bg-[#FDBA74]"}
                style={{ width: 28, borderRadius: "8px 8px 4px 4px" }}
                initial={{ height: 0 }}
                animate={inView ? { height: `${height}%` } : undefined}
                transition={timed(0.2 + i * 0.06, 0.6)}
              />
            ))}
          </div>
          <div className="mt-2 flex justify-between px-1">
            {DAYS.map((day) => (
              <span key={day} className="w-7 text-center text-[11px] font-semibold text-faint">
                {t(`days.${day}`)}
              </span>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={inView ? { opacity: 1, x: 0 } : undefined}
          transition={timed(0.8)}
          className="mt-4 flex items-center gap-3 rounded-[14px] bg-[#FFF7ED] p-3"
        >
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-bold text-ink">💬 {t("inboxTitle")}</p>
            <p className="mt-0.5 text-[12px] font-medium text-muted">
              {t("inboxText", { from: price(5), to: price(5.5), name: "Camille" })}
            </p>
          </div>
          <span className="flex h-[30px] shrink-0 items-center rounded-[15px] bg-ink px-3.5 text-[12px] font-bold text-white">
            {t("accept")}
          </span>
          <span className="shrink-0 text-[12px] font-bold text-muted">{t("reject")}</span>
        </motion.div>
      </div>
    </motion.div>
  );
}
