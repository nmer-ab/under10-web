import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { ORANGE_BUTTON } from "@/components/ui/buttons";
import { Link } from "@/i18n/navigation";
import { RestaurantDashboard } from "./RestaurantDashboard";
import { Heading } from "@/components/ui/Heading";

const PERKS = ["badge", "menu", "stories", "insights"] as const;

export function ForRestaurants() {
  const t = useTranslations("home.forRestaurants");

  return (
    <section id="for-restaurants" className="scroll-mt-[72px] bg-[#FFF7ED] py-[72px] md:py-28">
      <div className="site-container flex flex-col items-center gap-12 lg:flex-row-reverse lg:justify-center lg:gap-20">
        <div className="w-full max-w-[500px]">
          <p className="text-[13px] font-bold uppercase tracking-[1.5px] text-orange">{t("eyebrow")}</p>
          <Heading className="mt-3 text-[32px] font-extrabold leading-[1.1] tracking-[-1px] text-ink md:text-[44px]">
            {t("title")}
          </Heading>
          <p className="mt-4 text-[18px] font-medium leading-[1.6] text-muted">{t("subtitle")}</p>

          <ul className="mt-7 flex flex-col gap-3.5">
            {PERKS.map((perk) => (
              <li key={perk} className="flex items-center gap-3 text-[16px] font-semibold text-ink">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-orange">
                  <Check size={14} strokeWidth={3} className="text-white" aria-hidden />
                </span>
                {t(`perks.${perk}`)}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/restaurants#join" className={ORANGE_BUTTON}>
              {t("claim")}
            </Link>
            <Link
              href="/restaurants#how"
              className="inline-flex min-h-11 items-center text-[16px] font-bold text-ink underline-offset-4 hover:underline"
            >
              {t("ownersLink")}
            </Link>
          </div>

          <p className="mt-4 text-[14px] font-semibold text-[#9A3412] md:text-[13px]">{t("note")}</p>
        </div>

        <RestaurantDashboard />
      </div>
    </section>
  );
}
