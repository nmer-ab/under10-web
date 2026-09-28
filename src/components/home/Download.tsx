import { useTranslations } from "next-intl";
import { AppDownloadCard } from "./AppDownloadCard";

export function Download() {
  const t = useTranslations("home.download");

  return (
    <AppDownloadCard
      id="download"
      theme="green"
      eyebrow={t("eyebrow")}
      title={t("title")}
      subtitle={t("subtitle")}
    />
  );
}
