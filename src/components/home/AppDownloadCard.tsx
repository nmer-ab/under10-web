"use client";

import clsx from "clsx";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { QRCodeSVG } from "qrcode.react";
import { Heading } from "@/components/ui/Heading";
import { DOWNLOAD_URL } from "@/lib/links";
import { EASE_OUT, INSTANT } from "./motion";
import { PricePin } from "./PricePin";
import { StoreButtons } from "./StoreButtons";
import { usePrice } from "./usePrice";

const THEMES = {
  green: {
    card: "bg-[linear-gradient(135deg,#065F46_0%,#047857_45%,#10B981_100%)]",
    eyebrow: "text-[#A7F3D0]",
  },
  orange: {
    card: "bg-[linear-gradient(135deg,#9A3412_0%,#EA580C_50%,#F97316_100%)]",
    eyebrow: "text-[#FED7AA]",
  },
};

const BLOBS = [
  { size: 320, className: "-left-24 -top-24" },
  { size: 240, className: "-bottom-20 -right-16" },
  { size: 180, className: "-right-10 -top-12" },
];

const PINS = [
  { emoji: "🥙", price: 5, style: { left: "6%", top: 18 }, duration: 4 },
  { emoji: "🍜", price: 7.5, style: { left: "40%", top: 20 }, duration: 5.5 },
  { emoji: "🥐", price: 3.2, style: { right: "9%", top: 14 }, duration: 5 },
  { emoji: "🍕", price: 8, style: { left: "16%", bottom: 18 }, duration: 6 },
  { emoji: "🌮", price: 6, style: { left: "47%", bottom: 14 }, duration: 4.5 },
  { emoji: "🍔", price: 7, style: { right: "15%", bottom: 20 }, duration: 5 },
];

/** Gradient call-to-action card: store buttons, plus a QR code to /download on desktop. */
export function AppDownloadCard({
  id,
  theme,
  eyebrow,
  title,
  subtitle,
}: {
  id: string;
  theme: keyof typeof THEMES;
  eyebrow?: string;
  title: string;
  subtitle: string;
}) {
  const t = useTranslations("appDownload");
  const price = usePrice();
  const reduce = useReducedMotion();
  const colors = THEMES[theme];

  return (
    <section id={id} className="scroll-mt-[72px] bg-white py-16 md:py-24">
      <div className="site-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={reduce ? INSTANT : { duration: 0.5, ease: EASE_OUT }}
          className={clsx("relative overflow-hidden rounded-[32px] p-7 md:p-16", colors.card)}
        >
          {BLOBS.map((blob) => (
            <span
              key={blob.size}
              aria-hidden
              className={`pointer-events-none absolute rounded-full bg-white/[0.08] blur-2xl ${blob.className}`}
              style={{ width: blob.size, height: blob.size }}
            />
          ))}

          {PINS.map((pin, i) => (
            <motion.div
              key={pin.emoji}
              aria-hidden
              className="pointer-events-none absolute hidden opacity-90 lg:block"
              style={pin.style}
              animate={reduce ? undefined : { y: [0, -6, 0, 6, 0] }}
              transition={{ duration: pin.duration, ease: "easeInOut", repeat: Infinity, delay: i * 0.4 }}
            >
              <PricePin emoji={pin.emoji} price={price(pin.price)} className="scale-80" />
            </motion.div>
          ))}

          <div className="relative flex flex-col items-center gap-10 lg:flex-row lg:gap-14">
            <div className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left">
              {eyebrow && (
                <p
                  className={clsx(
                    "mb-3 text-[13px] font-bold uppercase tracking-[1.5px]",
                    colors.eyebrow,
                  )}
                >
                  {eyebrow}
                </p>
              )}
              <Heading className="text-[32px] font-extrabold leading-[1.1] tracking-[-1px] text-white md:text-[44px]">
                {title}
              </Heading>
              <p className="mt-4 max-w-[520px] text-[18px] font-medium leading-[1.6] text-white/80">
                {subtitle}
              </p>
              <div className="mt-7">
                <StoreButtons variant="light" />
              </div>
            </div>

            {/* Phones already have the store buttons, so the QR code is desktop-only. */}
            <figure className="hidden shrink-0 flex-col items-center rounded-3xl bg-white p-6 shadow-[0_30px_60px_rgba(0,0,0,0.2)] lg:flex">
              <QRCodeSVG
                value={DOWNLOAD_URL}
                size={200}
                fgColor="#111827"
                bgColor="#FFFFFF"
                title={t("qrLabel")}
              />
              <figcaption className="mt-3 text-[14px] font-semibold text-muted">{t("qrCaption")}</figcaption>
            </figure>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
