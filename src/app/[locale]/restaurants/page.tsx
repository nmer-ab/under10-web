import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { AppDownloadCard } from "@/components/home/AppDownloadCard";
import { OwnerFaq } from "@/components/restaurants/OwnerFaq";
import { OwnerFeatures } from "@/components/restaurants/OwnerFeatures";
import { OwnerSteps } from "@/components/restaurants/OwnerSteps";
import { Pricing } from "@/components/restaurants/Pricing";
import { RestaurantsHero } from "@/components/restaurants/RestaurantsHero";
import { socialMetadata } from "@/lib/social-metadata";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/restaurants">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "restaurants.meta" });
  const tShare = await getTranslations({ locale, namespace: "share.restaurants" });
  const title = t("title");
  const description = t("description");

  return {
    title,
    description,
    ...(await socialMetadata({
      locale,
      path: "/restaurants",
      title: `${title} · Under10`,
      description,
      imageAlt: tShare("alt"),
    })),
  };
}

export default async function RestaurantsPage({ params }: PageProps<"/[locale]/restaurants">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("restaurants.join");

  return (
    <>
      <RestaurantsHero />
      <OwnerSteps />
      <OwnerFeatures />
      <Pricing />
      <OwnerFaq />
      <AppDownloadCard id="join" theme="orange" title={t("title")} subtitle={t("subtitle")} />
    </>
  );
}
