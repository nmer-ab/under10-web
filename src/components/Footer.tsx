import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Logo } from "./Logo";

type FooterLink = { label: string; href: string; external?: boolean };

export function Footer() {
  const t = useTranslations();

  const columns: { title: string; links: FooterLink[] }[] = [
    {
      title: t("footer.product"),
      links: [
        { label: t("nav.howItWorks"), href: "/#how-it-works" },
        { label: t("nav.explore"), href: "/#explore" },
        { label: t("nav.forRestaurants"), href: "/restaurants" },
      ],
    },
    {
      title: t("footer.support"),
      links: [
        { label: t("footer.help"), href: "/help" },
        { label: "support@under10.app", href: "mailto:support@under10.app", external: true },
      ],
    },
    {
      title: t("footer.legal"),
      links: [
        { label: t("footer.privacy"), href: "/privacy" },
        { label: t("footer.terms"), href: "/terms" },
        { label: t("footer.legalNotice"), href: "/legal" },
      ],
    },
  ];

  const linkClass =
    "inline-flex min-h-11 min-w-11 items-center text-[15px] text-faint transition-colors hover:text-white";

  return (
    <footer className="bg-ink pb-8 pt-16">
      <div className="site-container">
        <div className="grid gap-12 md:grid-cols-[2fr_1fr_1fr_1fr] md:gap-8">
          <div>
            <Link href="/" aria-label={t("nav.home")} className="inline-flex h-11 items-center text-white">
              <Logo />
            </Link>
            <p className="mt-2 max-w-xs text-[15px] text-faint">{t("footer.tagline")}</p>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h2 className="text-[15px] font-bold text-white">{column.title}</h2>
              <ul className="mt-2 flex flex-col">
                {column.links.map((link) => (
                  <li key={link.href}>
                    {link.external ? (
                      <a href={link.href} className={linkClass}>
                        <span className="sr-only">{t("footer.contact")}: </span>
                        {link.label}
                      </a>
                    ) : (
                      <Link href={link.href} className={linkClass}>
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t border-white/10 pt-8">
          <p className="text-[14px] text-muted md:text-[13px]">{t("footer.copyright")}</p>
        </div>
      </div>
    </footer>
  );
}
