import { useTranslations } from "next-intl";
import { FaqJsonLd } from "@/components/FaqJsonLd";
import { FaqAccordion, type FaqItem } from "@/components/home/FaqAccordion";
import { Heading } from "@/components/ui/Heading";

export function OwnerFaq() {
  const t = useTranslations("restaurants.faq");
  const items = t.raw("items") as FaqItem[];

  return (
    <section className="bg-white py-24">
      <FaqJsonLd items={items} />
      <div className="site-container">
        <Heading className="text-center text-[30px] font-extrabold leading-[1.1] tracking-[-1px] text-ink md:text-[40px]">
          {t("title")}
        </Heading>
        <div className="mx-auto mt-10 max-w-[720px]">
          <FaqAccordion items={items} />
        </div>
      </div>
    </section>
  );
}
