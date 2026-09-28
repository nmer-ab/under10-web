import { BadgeCheck, BarChart3, Clock, Inbox, UtensilsCrossed, Video } from "lucide-react";
import { useTranslations } from "next-intl";
import { Heading } from "@/components/ui/Heading";

const FEATURES = [
  { key: "badge", Icon: BadgeCheck },
  { key: "menu", Icon: UtensilsCrossed },
  { key: "hours", Icon: Clock },
  { key: "media", Icon: Video },
  { key: "stats", Icon: BarChart3 },
  { key: "inbox", Icon: Inbox },
] as const;

export function OwnerFeatures() {
  const t = useTranslations("restaurants.features");

  return (
    <section className="bg-[#F9FAFB] py-24">
      <div className="site-container">
        <Heading className="mx-auto max-w-[640px] text-center text-[30px] font-extrabold leading-[1.1] tracking-[-1px] text-ink md:text-[40px]">
          {t("title")}
        </Heading>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ key, Icon }) => (
            <li key={key} className="rounded-3xl border border-line bg-white p-7">
              <span className="flex size-11 items-center justify-center rounded-xl bg-[#FFEDD5]">
                <Icon size={22} className="text-orange" aria-hidden />
              </span>
              <h3 className="mt-4 text-[17px] font-extrabold text-ink">{t(`items.${key}.title`)}</h3>
              <p className="mt-1.5 text-[15px] font-medium leading-[1.6] text-muted">
                {t(`items.${key}.text`)}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
