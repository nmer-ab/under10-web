"use client";

import { Check } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import { LiveStats } from "./LiveStats";
import { PhoneMockup } from "./PhoneMockup";
import { StoreButtons } from "./StoreButtons";
import { Heading } from "@/components/ui/Heading";
import { EASE_OUT, INSTANT } from "./motion";

const TRUST_KEYS = ["freeForEaters", "realPrices", "madeIn"] as const;

export function Hero() {
  const t = useTranslations("home.hero");
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.08 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: reduce ? INSTANT : { duration: 0.5, ease: EASE_OUT } },
  };

  return (
    <section className="relative overflow-hidden bg-white pb-16 pt-10 md:pb-24 md:pt-[72px]">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-[200px] size-[720px] rounded-full bg-[radial-gradient(circle,#ECFDF5_0%,rgba(236,253,245,0)_70%)]"
      />

      <div className="site-container relative flex flex-col items-center lg:flex-row lg:justify-between lg:gap-16">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex max-w-[560px] flex-col items-center text-center lg:items-start lg:text-left"
        >
          <motion.span
            variants={item}
            className="inline-flex h-8 items-center gap-1.5 rounded-2xl bg-green-soft px-3.5 text-[13px] font-bold text-green-dark"
          >
            <span aria-hidden>📍</span>
            {t("eyebrow")}
          </motion.span>

          <motion.div variants={item} className="mt-5">
            <Heading as="h1" className="text-[38px] font-extrabold leading-[1.05] tracking-[-1.5px] text-ink md:text-[56px]">
            {t.rich("title", {
              br: () => <br />,
              highlight: (chunks) => <span className="text-green">{chunks}</span>,
            })}
            </Heading>
          </motion.div>

          <motion.p
            variants={item}
            className="mt-5 max-w-[520px] text-[19px] font-medium leading-[1.6] text-muted"
          >
            {t("subtitle")}
          </motion.p>

          <motion.div variants={item} className="mt-8">
            <StoreButtons />
          </motion.div>

          <motion.ul
            variants={item}
            className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 lg:justify-start"
          >
            {TRUST_KEYS.map((key) => (
              <li key={key} className="flex items-center gap-1.5 text-[14px] font-semibold text-muted">
                <Check size={16} strokeWidth={3} className="text-green" aria-hidden />
                {t(`trust.${key}`)}
              </li>
            ))}
          </motion.ul>

          <LiveStats />
        </motion.div>

        <div className="mt-12 lg:mt-0">
          <PhoneMockup />
        </div>
      </div>
    </section>
  );
}
