import { useTranslations } from "next-intl";
import { RestaurantDashboard } from "@/components/home/RestaurantDashboard";
import { ORANGE_BUTTON } from "@/components/ui/buttons";
import { Heading } from "@/components/ui/Heading";

export function RestaurantsHero() {
  const t = useTranslations("restaurants.hero");

  return (
    <section className="bg-[#FFF7ED] pb-12 pt-14 md:pb-[72px] md:pt-24">
      <div className="site-container flex flex-col items-center gap-12 lg:flex-row lg:justify-between lg:gap-16">
        <div className="w-full max-w-[560px]">
          <p className="text-[13px] font-bold uppercase tracking-[1.5px] text-orange">{t("eyebrow")}</p>
          <Heading
            as="h1"
            className="mt-3 text-[36px] font-extrabold leading-[1.05] tracking-[-1.5px] text-ink md:text-[52px]"
          >
            {t("title")}
          </Heading>
          <p className="mt-5 text-[19px] font-medium leading-[1.6] text-muted">{t("subtitle")}</p>
          <a href="#join" className={`mt-8 ${ORANGE_BUTTON}`}>
            {t("cta")}
          </a>
          <p className="mt-4 text-[14px] font-semibold text-[#9A3412] md:text-[13px]">{t("note")}</p>
        </div>

        <RestaurantDashboard />
      </div>
    </section>
  );
}
