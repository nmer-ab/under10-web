import { Clock, Heart, Play } from "lucide-react";
import { useTranslations } from "next-intl";
import type { FeedItem } from "@/lib/feed";
import { FeedPhone } from "./FeedPhone";
import { Heading } from "@/components/ui/Heading";

const FEATURES = [
  { key: "videos", Icon: Play },
  { key: "likes", Icon: Heart },
  { key: "stories", Icon: Clock },
] as const;

export function ExplorePreview({ items }: { items: FeedItem[] }) {
  const t = useTranslations("home.explore");

  return (
    <section id="explore" className="scroll-mt-[72px] bg-[#0B0F14] py-[72px] md:py-28">
      <div className="site-container flex flex-col-reverse items-center gap-12 lg:flex-row lg:justify-center lg:gap-20">
        <div className="w-full max-w-[480px]">
          <p className="text-[13px] font-bold uppercase tracking-[1.5px] text-[#34D399]">
            {t("eyebrow")}
          </p>
          <Heading className="mt-3 text-[32px] font-extrabold leading-[1.1] tracking-[-1px] text-white md:text-[44px]">
            {t("title")}
          </Heading>
          <p className="mt-4 text-[18px] font-medium leading-[1.6] text-white/70">{t("subtitle")}</p>

          <ul className="mt-8 flex flex-col gap-4">
            {FEATURES.map(({ key, Icon }) => (
              <li key={key} className="flex items-start gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[rgba(16,185,129,0.15)]">
                  <Icon size={20} className="text-[#34D399]" aria-hidden />
                </span>
                <div>
                  <p className="text-[16px] font-bold text-white">{t(`features.${key}.title`)}</p>
                  <p className="mt-0.5 text-[14px] font-medium text-white/60">
                    {t(`features.${key}.text`)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <FeedPhone items={items} />
      </div>
    </section>
  );
}
