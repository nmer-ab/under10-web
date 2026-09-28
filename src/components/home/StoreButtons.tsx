import clsx from "clsx";
import { useTranslations } from "next-intl";
import { STORE_LINKS } from "@/lib/links";

type Variant = "dark" | "light";

function AppleLogo() {
  return (
    <svg viewBox="0 0 24 24" width={24} height={24} fill="currentColor" aria-hidden>
      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
    </svg>
  );
}

function GooglePlayLogo() {
  return (
    <svg viewBox="0 0 24 24" width={24} height={24} fill="currentColor" aria-hidden>
      <path d="M22.018 13.298l-3.919 2.218-3.515-3.493 3.543-3.521 3.891 2.202a1.49 1.49 0 0 1 0 2.594zM1.337.924a1.486 1.486 0 0 0-.112.568v21.017c0 .217.045.419.124.6l11.155-11.087L1.337.924zm12.207 10.065l3.258-3.238L3.45.195a1.466 1.466 0 0 0-.946-.179l11.04 10.973zm0 2.067l-11 10.933c.298.036.612-.016.906-.183l13.324-7.54-3.23-3.21z" />
    </svg>
  );
}

function StoreButton({
  href,
  logo,
  pre,
  name,
  variant,
}: {
  href: string | null;
  logo: React.ReactNode;
  pre: string;
  name: string;
  variant: Variant;
}) {
  const className = clsx(
    "inline-flex h-14 items-center gap-3 rounded-[14px] px-5 text-left",
    variant === "dark" ? "bg-ink text-white" : "bg-white text-ink",
    href ? "transition-opacity hover:opacity-90" : "cursor-default",
  );
  const content = (
    <>
      {logo}
      <span className="flex flex-col">
        <span
          className={clsx(
            "text-[11px] font-medium leading-tight",
            variant === "dark" ? "text-[#D1D5DB]" : "text-[#4B5563]",
          )}
        >
          {pre}
        </span>
        <span className="text-[17px] font-bold leading-tight">{name}</span>
      </span>
    </>
  );

  // Not in the store yet: same look, but nothing to click.
  if (!href) {
    return (
      <span aria-disabled="true" className={className}>
        {content}
      </span>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener" className={className}>
      {content}
    </a>
  );
}

export function StoreButtons({ variant = "dark" }: { variant?: Variant }) {
  const t = useTranslations("home.hero");
  const { appStore, googlePlay } = STORE_LINKS;
  const missing = [
    { href: appStore, name: t("appStore") },
    { href: googlePlay, name: t("googlePlay") },
  ].filter((store) => !store.href);
  const tag =
    missing.length === 2
      ? t("comingSoon")
      : missing.length === 1
        ? t("comingSoonStore", { store: missing[0].name })
        : null;

  return (
    <div className="flex flex-col items-center gap-2 lg:items-start">
      {tag && (
        <span
          className={clsx(
            "text-[12px] font-bold",
            variant === "dark" ? "text-orange" : "text-[#FDE68A]",
          )}
        >
          {tag}
        </span>
      )}
      <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
        <StoreButton
          variant={variant}
          href={appStore}
          logo={<AppleLogo />}
          pre={t("appStorePre")}
          name={t("appStore")}
        />
        <StoreButton
          variant={variant}
          href={googlePlay}
          logo={<GooglePlayLogo />}
          pre={t("googlePlayPre")}
          name={t("googlePlay")}
        />
      </div>
    </div>
  );
}
