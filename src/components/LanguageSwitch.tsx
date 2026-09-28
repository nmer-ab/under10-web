"use client";

import clsx from "clsx";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LanguageSwitch({
  className,
  onNavigate,
}: {
  className?: string;
  onNavigate?: () => void;
}) {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <nav
      aria-label={t("language")}
      className={clsx("flex items-center text-[14px] font-semibold", className)}
    >
      {routing.locales.map((l, i) => (
        <span key={l} className="flex items-center">
          {i > 0 && (
            <span aria-hidden className="text-line">
              |
            </span>
          )}
          <Link
            href={pathname}
            locale={l}
            onClick={onNavigate}
            aria-current={l === locale ? "true" : undefined}
            className={clsx(
              "inline-flex size-11 items-center justify-center uppercase transition-colors",
              l === locale ? "text-ink" : "text-muted hover:text-ink",
            )}
          >
            {l}
          </Link>
        </span>
      ))}
    </nav>
  );
}
