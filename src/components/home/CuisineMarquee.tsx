import clsx from "clsx";
import { useTranslations } from "next-intl";
import type messages from "@/messages/en.json";
import { usePrice } from "./usePrice";
import { Heading } from "@/components/ui/Heading";

type Cuisine = { key: keyof typeof messages.home.cuisines.items; emoji: string; from: number };

const ROWS: Cuisine[][] = [
  [
    { key: "kebab", emoji: "🥙", from: 5 },
    { key: "pho", emoji: "🍜", from: 8 },
    { key: "crepes", emoji: "🥞", from: 4 },
    { key: "tacos", emoji: "🌮", from: 6 },
    { key: "pizzaSlice", emoji: "🍕", from: 3 },
    { key: "banhMi", emoji: "🥖", from: 6 },
    { key: "falafel", emoji: "🧆", from: 5 },
    { key: "couscous", emoji: "🍛", from: 9 },
  ],
  [
    { key: "burger", emoji: "🍔", from: 7 },
    { key: "sushi", emoji: "🍣", from: 9 },
    { key: "dumplings", emoji: "🥟", from: 6 },
    { key: "shawarma", emoji: "🌯", from: 6 },
    { key: "bakery", emoji: "🥐", from: 2 },
    { key: "pasta", emoji: "🍝", from: 8 },
    { key: "soup", emoji: "🍲", from: 5 },
    { key: "salad", emoji: "🥗", from: 7 },
  ],
];

function ChipList({ items, duplicate }: { items: Cuisine[]; duplicate?: boolean }) {
  const t = useTranslations("home.cuisines");
  const price = usePrice();

  return (
    <ul
      aria-hidden={duplicate || undefined}
      className={clsx("flex shrink-0 gap-3 pr-3", duplicate && "motion-reduce:hidden")}
    >
      {items.map((item) => (
        <li
          key={item.key}
          className="flex h-12 shrink-0 items-center whitespace-nowrap rounded-3xl border border-line bg-white pl-2 pr-5"
        >
          <span
            aria-hidden
            className="flex size-8 items-center justify-center rounded-full bg-green-soft text-[18px] leading-none"
          >
            {item.emoji}
          </span>
          <span className="ml-2.5 text-[16px] font-bold text-ink">{t(`items.${item.key}`)}</span>
          <span className="ml-2 text-[14px] font-semibold text-green">
            {t("from", { price: price(item.from) })}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function CuisineMarquee() {
  const t = useTranslations("home.cuisines");

  return (
    <section className="border-y border-line bg-white py-14">
      <Heading className="site-container text-center text-[14px] font-bold uppercase tracking-[1.5px] text-faint">
        {t("title")}
      </Heading>

      <div className="mt-8 flex flex-col gap-4">
        {ROWS.map((row, i) => (
          <div
            key={i}
            className="group overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_80px,#000_calc(100%-80px),transparent)] motion-reduce:overflow-x-auto"
          >
            <div
              className={clsx(
                "flex w-max group-hover:[animation-play-state:paused] motion-reduce:animate-none motion-reduce:px-20",
                i === 0 ? "animate-marquee" : "animate-marquee-reverse",
              )}
            >
              <ChipList items={row} />
              <ChipList items={row} duplicate />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
