"use client";

import clsx from "clsx";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState, useSyncExternalStore } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { LanguageSwitch } from "./LanguageSwitch";
import { Logo } from "./Logo";

const NAV_LINKS = [
  { href: "/#how-it-works", key: "howItWorks" },
  { href: "/#explore", key: "explore" },
  { href: "/restaurants", key: "forRestaurants" },
  { href: "/#faq", key: "faq" },
] as const;

// Download sections: #join on /restaurants (restaurant sign-up copy), #download everywhere else.
function getAppHref(pathname: string) {
  return pathname === "/restaurants" ? "/restaurants#join" : "/#download";
}

function subscribeToScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

function useScrolledPast(threshold: number) {
  return useSyncExternalStore(
    subscribeToScroll,
    () => window.scrollY > threshold,
    () => false,
  );
}

function GetAppButton({ className, onClick }: { className?: string; onClick?: () => void }) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  return (
    <Link
      href={getAppHref(pathname)}
      onClick={onClick}
      className={clsx(
        "inline-flex h-11 items-center justify-center whitespace-nowrap rounded-[22px] bg-ink px-5 text-[15px] font-bold text-white transition-opacity hover:opacity-90",
        className,
      )}
    >
      {t("getApp")}
    </Link>
  );
}

export function Header() {
  const t = useTranslations("nav");
  const scrolled = useScrolledPast(8);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onBreakpoint = (e: MediaQueryListEvent) => {
      if (e.matches) setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onBreakpoint);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, [menuOpen]);

  return (
    <header
      className={clsx(
        "sticky top-0 z-40 h-[72px] border-b bg-white transition-colors",
        scrolled ? "border-line" : "border-transparent",
      )}
    >
      <div className="site-container flex h-full items-center justify-between gap-4 lg:grid lg:grid-cols-[1fr_auto_1fr]">
        <Link href="/" aria-label={t("home")} className="flex h-11 items-center justify-self-start text-ink">
          <Logo />
        </Link>

        <nav aria-label={t("mainNav")} className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.key}>
                <Link
                  href={link.href}
                  className="inline-flex h-11 min-w-11 items-center justify-center whitespace-nowrap text-[15px] font-semibold text-muted transition-colors hover:text-ink"
                >
                  {t(link.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-6 justify-self-end lg:flex">
          <LanguageSwitch />
          <GetAppButton />
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label={t("openMenu")}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className="-mr-2.5 flex size-11 items-center justify-center text-ink lg:hidden"
        >
          <Menu size={24} aria-hidden />
        </button>
      </div>

      {menuOpen && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label={t("menu")}
          className="fixed inset-0 z-50 flex flex-col bg-white lg:hidden"
        >
          <div className="site-container flex h-[72px] shrink-0 items-center justify-between">
            <Link href="/" onClick={closeMenu} aria-label={t("home")} className="flex h-11 items-center text-ink">
              <Logo />
            </Link>
            <button
              type="button"
              onClick={closeMenu}
              aria-label={t("closeMenu")}
              className="-mr-2.5 flex size-11 items-center justify-center text-ink"
              autoFocus
            >
              <X size={24} aria-hidden />
            </button>
          </div>

          <nav aria-label={t("mainNav")} className="site-container flex-1 overflow-y-auto pt-6">
            <ul className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className="block py-3 text-[24px] font-bold text-ink"
                  >
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="site-container flex shrink-0 flex-col gap-6 pb-8 pt-6">
            <LanguageSwitch onNavigate={closeMenu} />
            <GetAppButton onClick={closeMenu} className="w-full" />
          </div>
        </div>
      )}
    </header>
  );
}
