"use client";

import clsx from "clsx";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Bookmark, CheckCircle, Heart, Share2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { cuisineArt, type FeedItem } from "@/lib/feed";
import { INSTANT } from "./motion";
import { useNumber, usePrice } from "./usePrice";

const DWELL_MS = 3500;
const LIKE_AT_MS = 1200;

function formatDuration(seconds: number) {
  return `${Math.floor(seconds / 60)}:${String(Math.round(seconds % 60)).padStart(2, "0")}`;
}

function FeedCard({ item, liked, hidden }: { item: FeedItem; liked: boolean; hidden: boolean }) {
  const t = useTranslations("home.explore.feed");
  const number = useNumber();
  const price = usePrice();
  const art = cuisineArt(item.cuisine);
  const media = item.media[0];

  const cuisineKey = `cuisines.${item.cuisine}` as Parameters<typeof t>[0];
  const cuisine = t.has(cuisineKey) ? t(cuisineKey) : item.cuisine;
  const distance =
    item.distance_m < 1000
      ? number(item.distance_m, { style: "unit", unit: "meter" })
      : number(item.distance_m / 1000, {
          style: "unit",
          unit: "kilometer",
          maximumFractionDigits: 1,
        });
  const meta = [cuisine, distance, item.open_now ? t("openNow") : null].filter(Boolean).join(" · ");

  const actions = [
    {
      key: "like",
      label: t("likes"),
      icon: (
        <Heart
          size={26}
          className={clsx("transition-colors duration-200", liked && "fill-[#EF4444] text-[#EF4444]")}
        />
      ),
      count: item.like_count + (liked ? 1 : 0),
    },
    { key: "verify", label: t("verified"), icon: <CheckCircle size={26} />, count: item.verify_count },
    { key: "save", label: t("save"), icon: <Bookmark size={26} /> },
    { key: "share", label: t("share"), icon: <Share2 size={26} /> },
  ];

  return (
    <div
      aria-hidden={hidden || undefined}
      className="relative h-full shrink-0 overflow-hidden"
      style={{
        background: `linear-gradient(160deg, ${art.gradient[0]}, ${art.gradient[1]})`,
      }}
    >
      <span
        aria-hidden
        className="absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 text-[120px] leading-none"
      >
        {art.emoji}
      </span>

      {media?.type === "video" && media.duration_s != null && (
        <span className="absolute left-4 top-4 flex h-6 items-center gap-1 rounded-xl bg-black/45 px-2.5 text-[12px] font-bold text-white">
          <span aria-hidden>▶</span>
          {formatDuration(media.duration_s)}
        </span>
      )}

      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-b from-transparent to-black/75" />

      {liked && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: [0, 1.2, 1, 1], opacity: [1, 1, 1, 0] }}
          transition={{ duration: 0.95, times: [0, 0.2, 0.37, 1], ease: "easeOut" }}
        >
          <Heart size={72} fill="#FFFFFF" stroke="#FFFFFF" />
        </motion.div>
      )}

      <div className="absolute bottom-5 left-4 right-[72px]">
        {item.is_official ? (
          <span className="inline-flex h-5 items-center rounded-[10px] bg-orange px-2 text-[11px] font-bold text-white">
            {t("official")}
          </span>
        ) : (
          item.creator_name && (
            <p className="text-[12px] font-semibold text-white/85">
              {t("spottedBy", { name: item.creator_name })}
            </p>
          )
        )}
        <p className="mt-1.5 text-[20px] font-extrabold leading-tight text-white">{item.name}</p>
        <div className="mt-2 flex items-center gap-2">
          <span className="flex h-[26px] shrink-0 items-center rounded-[13px] bg-green px-2.5 text-[14px] font-extrabold text-white">
            {price(item.price)}
          </span>
          <span className="truncate text-[12px] font-medium text-white/85">{meta}</span>
        </div>
      </div>

      <ul className="absolute bottom-7 right-2.5 flex flex-col items-center gap-4 text-white">
        {actions.map((action) => (
          <li
            key={action.key}
            className="flex flex-col items-center gap-1 drop-shadow-[0_1px_3px_rgba(0,0,0,0.45)]"
          >
            <span aria-label={action.label} role="img">
              {action.icon}
            </span>
            {action.count != null && (
              <span className="text-[11px] font-bold">{number(action.count)}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function FeedPhone({ items }: { items: FeedItem[] }) {
  const t = useTranslations("home.explore.feed");
  const reduce = useReducedMotion();
  const screenRef = useRef<HTMLDivElement>(null);
  const inView = useInView(screenRef, { amount: 0.5 });
  const [hovered, setHovered] = useState(false);
  // Runs 0..items.length; the last position is a copy of the first so the loop continues downward.
  const [position, setPosition] = useState(0);
  const [jumping, setJumping] = useState(false);
  const [likedPosition, setLikedPosition] = useState<number | null>(null);

  const autoplay = !reduce && inView && !hovered && items.length > 1;
  const active = position % items.length;
  const slides = items.length > 1 ? [...items, items[0]] : items;

  useEffect(() => {
    if (!autoplay) return;
    const like = setTimeout(() => setLikedPosition(position), LIKE_AT_MS);
    const next = setTimeout(() => setPosition((p) => p + 1), DWELL_MS);
    return () => {
      clearTimeout(like);
      clearTimeout(next);
    };
  }, [autoplay, position]);

  const onSlideSettled = () => {
    if (position === items.length) {
      setJumping(true);
      setPosition(0);
    } else if (jumping) {
      setJumping(false);
    }
  };

  return (
    <div className="relative h-[660px] w-[320px] shrink-0 max-[389px]:h-[619px] max-[389px]:w-[300px] rounded-[48px] border-[10px] border-[#1F2937] bg-black">
      <div
        ref={screenRef}
        role="group"
        aria-roledescription="carousel"
        aria-label={t("label")}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="absolute inset-0 overflow-hidden rounded-[38px]"
      >
        <motion.div
          animate={{ y: `${-position * 100}%` }}
          transition={reduce || jumping ? INSTANT : { duration: 0.6, ease: "easeInOut" }}
          onAnimationComplete={onSlideSettled}
          className="flex h-full flex-col"
        >
          {slides.map((item, i) => (
            <FeedCard
              key={`${item.id}-${i}`}
              item={item}
              liked={!reduce && likedPosition === i}
              hidden={i % items.length !== active || i === items.length}
            />
          ))}
        </motion.div>

        <div className="absolute right-0 top-1/2 z-10 flex -translate-y-1/2 flex-col">
          {items.map((item, i) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setJumping(false);
                setPosition(i);
              }}
              aria-label={t("showItem", { n: i + 1 })}
              aria-current={i === active || undefined}
              className="flex h-3 w-6 items-center justify-center"
            >
              <span
                className={clsx(
                  "size-1.5 rounded-full transition-colors",
                  i === active ? "bg-white" : "bg-white/40",
                )}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="absolute left-1/2 top-2.5 z-20 h-7 w-[110px] -translate-x-1/2 rounded-[14px] bg-[#1F2937]" />
    </div>
  );
}
