import { useTranslations } from "next-intl";
import { Heading } from "@/components/ui/Heading";

const STEPS = ["account", "find", "proof", "badge"] as const;

export function OwnerSteps() {
  const t = useTranslations("restaurants.how");

  return (
    <section id="how" className="scroll-mt-[72px] bg-white py-24">
      <div className="site-container">
        <div className="mx-auto max-w-[640px] text-center">
          <p className="text-[13px] font-bold uppercase tracking-[1.5px] text-orange">{t("eyebrow")}</p>
          <Heading className="mt-3 text-[30px] font-extrabold leading-[1.1] tracking-[-1px] text-ink md:text-[40px]">
            {t("title")}
          </Heading>
        </div>

        <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <li key={step} className="rounded-3xl border border-[#FED7AA] bg-white p-6">
              <span className="flex size-10 items-center justify-center rounded-full bg-orange text-[16px] font-extrabold text-white">
                {i + 1}
              </span>
              <h3 className="mt-4 text-[18px] font-extrabold text-ink">{t(`steps.${step}.title`)}</h3>
              <p className="mt-2 text-[15px] font-medium leading-[1.6] text-muted">
                {t(`steps.${step}.text`)}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
