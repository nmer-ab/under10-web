"use client";

import { motion, useReducedMotion, type Transition } from "framer-motion";
import { useTranslations } from "next-intl";
import { EASE_OUT, INSTANT } from "./motion";
import { FindVisual, ShareVisual, VerifyVisual } from "./StepVisuals";
import { Heading } from "@/components/ui/Heading";

const STEPS = [
  { key: "find", Visual: FindVisual },
  { key: "verify", Visual: VerifyVisual },
  { key: "share", Visual: ShareVisual },
] as const;

const hidden = { opacity: 0, y: 24 };
const shown = { opacity: 1, y: 0 };

export function HowItWorks() {
  const t = useTranslations("home.howItWorks");
  const reduce = useReducedMotion();
  const reveal = (delay = 0): Transition =>
    reduce ? INSTANT : { duration: 0.5, ease: EASE_OUT, delay };

  return (
    <section id="how-it-works" className="scroll-mt-[72px] bg-[#F9FAFB] py-[72px] md:py-28">
      <div className="site-container">
        <motion.div
          initial={hidden}
          whileInView={shown}
          viewport={{ once: true, amount: 0.4 }}
          transition={reveal()}
          className="mx-auto max-w-[640px] text-center"
        >
          <p className="text-[13px] font-bold uppercase tracking-[1.5px] text-green">
            {t("eyebrow")}
          </p>
          <Heading className="mt-3 text-[32px] font-extrabold leading-[1.1] tracking-[-1px] text-ink md:text-[44px]">
            {t("title")}
          </Heading>
          <p className="mt-4 text-[18px] font-medium leading-[1.6] text-muted">{t("subtitle")}</p>
        </motion.div>

        <ol className="mt-14 grid gap-6 lg:grid-cols-3">
          {STEPS.map(({ key, Visual }, i) => (
            <motion.li
              key={key}
              initial={hidden}
              whileInView={shown}
              viewport={{ once: true, amount: 0.3 }}
              transition={reveal(i * 0.12)}
              className="rounded-[28px] border border-line bg-white p-7 shadow-[0_1px_2px_rgba(17,24,39,0.04)]"
            >
              <div aria-hidden className="relative h-[280px] overflow-hidden rounded-[20px] bg-green-soft">
                <Visual />
              </div>
              <span className="mt-6 flex size-9 items-center justify-center rounded-full bg-ink text-[15px] font-extrabold text-white">
                {i + 1}
              </span>
              <h3 className="mt-4 text-[22px] font-extrabold text-ink">{t(`steps.${key}.title`)}</h3>
              <p className="mt-2 text-[16px] font-medium leading-[1.6] text-muted">
                {t(`steps.${key}.text`)}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
