"use client";

import clsx from "clsx";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { INSTANT } from "@/components/home/motion";
import { usePrice } from "@/components/home/usePrice";
import { Heading } from "@/components/ui/Heading";
import { RESTAURANT_PLAN } from "@/lib/pricing";

type Period = "monthly" | "yearly";

const PERIODS: Period[] = ["monthly", "yearly"];

export function Pricing() {
  const t = useTranslations("restaurants.pricing");
  const price = usePrice();
  const reduce = useReducedMotion();
  const [period, setPeriod] = useState<Period>("monthly");
  const features = t.raw("features") as string[];

  return (
    <section id="pricing" className="scroll-mt-[72px] bg-white py-24">
      <div className="site-container">
        <div className="text-center">
          <Heading className="text-[30px] font-extrabold leading-[1.1] tracking-[-1px] text-ink md:text-[40px]">
            {t("title")}
          </Heading>
          <p className="mt-3 text-[17px] font-medium text-muted">{t("subtitle")}</p>
        </div>

        <fieldset className="mt-7 flex justify-center">
          <legend className="sr-only">{t("billingLabel")}</legend>
          <div className="inline-flex h-11 rounded-[22px] bg-[#F3F4F6] px-1">
            {PERIODS.map((option) => {
              const active = period === option;
              return (
                <label
                  key={option}
                  className="flex h-11 cursor-pointer items-center rounded-[22px] has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-orange"
                >
                  <input
                    type="radio"
                    name="billing"
                    value={option}
                    checked={active}
                    onChange={() => setPeriod(option)}
                    className="sr-only"
                  />
                  <span
                    className={clsx(
                      "flex h-9 items-center gap-2 whitespace-nowrap rounded-[18px] px-5 text-[14px] transition-colors",
                      active
                        ? "bg-white font-bold text-ink shadow-[0_1px_3px_rgba(17,24,39,0.12)]"
                        : "font-semibold text-muted",
                    )}
                  >
                    {t(option)}
                    {option === "yearly" && (
                      <span className="flex h-[22px] items-center rounded-[11px] bg-[#DCFCE7] px-2 text-[11px] font-extrabold text-green-dark">
                        {t("yearlyChip")}
                      </span>
                    )}
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>

        <div className="mx-auto mt-8 max-w-[480px] rounded-[28px] border-2 border-orange bg-[#FFF7ED] p-7 sm:p-9">
          <div className="flex items-start justify-between gap-3">
            <p className="text-[20px] font-extrabold text-ink">{t("planName")}</p>
            <span className="flex h-[26px] shrink-0 items-center rounded-[13px] bg-orange px-3 text-[12px] font-extrabold text-white">
              {t("badge")}
            </span>
          </div>

          <div className="mt-5 min-h-[84px]" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={period}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={reduce ? INSTANT : { duration: 0.1 }}
              >
                <p className="flex items-baseline gap-1 whitespace-nowrap">
                  <span className="text-[52px] font-extrabold leading-none tracking-[-1px] text-ink">
                    {price(period === "monthly" ? RESTAURANT_PLAN.monthly : RESTAURANT_PLAN.yearly)}
                  </span>
                  <span className="text-[16px] font-semibold text-muted">
                    {period === "monthly" ? t("perMonth") : t("perYear")}
                  </span>
                </p>
                {period === "yearly" && (
                  <p className="mt-2 text-[14px] font-semibold text-[#9A3412] md:text-[13px]">
                    {t("yearlyBreakdown", {
                      perMonth: price(RESTAURANT_PLAN.yearly / 12, { cents: true }),
                    })}
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <p className="mt-2 text-[14px] font-semibold text-[#9A3412]">{t("billingNote")}</p>

          <ul className="mt-6 flex flex-col gap-3">
            {features.map((feature) => (
              <li key={feature} className="flex items-start gap-3 text-[15px] font-medium text-[#374151]">
                <Check size={18} strokeWidth={3} className="mt-0.5 shrink-0 text-orange" aria-hidden />
                {feature}
              </li>
            ))}
          </ul>

          <a
            href="#join"
            className="mt-8 flex min-h-14 w-full items-center justify-center rounded-[28px] bg-orange px-6 py-3 text-center text-[17px] leading-tight font-bold text-white transition-colors hover:bg-[#EA580C]"
          >
            {t("cta")}
          </a>
        </div>

        <p className="mx-auto mt-5 max-w-[480px] text-center text-[14px] font-medium leading-[1.6] text-faint md:text-[13px]">
          {t("footnote")}
        </p>
      </div>
    </section>
  );
}
