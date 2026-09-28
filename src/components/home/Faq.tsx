import { useTranslations } from "next-intl";
import { FaqJsonLd } from "@/components/FaqJsonLd";
import { Heading } from "@/components/ui/Heading";
import { Link } from "@/i18n/navigation";
import { FaqAccordion, type FaqItem } from "./FaqAccordion";

export function Faq() {
  const t = useTranslations("home.faq");
  const items = t.raw("items") as FaqItem[];

  return (
    <section id="faq" className="scroll-mt-[72px] bg-white py-[72px] md:py-28">
      <FaqJsonLd items={items} />

      <div className="site-container flex flex-col gap-10 lg:flex-row lg:justify-center lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:w-[360px] lg:shrink-0 lg:self-start">
          <p className="text-[13px] font-bold uppercase tracking-[1.5px] text-green">{t("eyebrow")}</p>
          <Heading className="mt-3 text-[32px] font-extrabold leading-[1.1] tracking-[-1px] text-ink md:text-[44px]">
            {t("title")}
          </Heading>
          <p className="mt-4 text-[16px] font-medium leading-[1.6] text-muted">
            {t.rich("contact", {
              email: (chunks) => (
                <a
                  href="mailto:support@under10.app"
                  className="font-semibold text-green hover:underline"
                >
                  {chunks}
                </a>
              ),
            })}
          </p>
          <Link
            href="/help"
            className="mt-2.5 inline-flex min-h-11 items-center text-[15px] font-bold text-ink underline-offset-4 hover:underline"
          >
            {t("helpLink")}
          </Link>
        </div>

        <div className="w-full lg:max-w-[720px] lg:flex-1">
          <FaqAccordion items={items} />
        </div>
      </div>
    </section>
  );
}
