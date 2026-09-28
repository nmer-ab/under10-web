import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ContentPage, contentMetadata } from "@/components/ContentPage";

export async function generateMetadata({ params }: PageProps<"/[locale]/privacy">): Promise<Metadata> {
  const { locale } = await params;
  return contentMetadata(locale, "privacy");
}

export default async function PrivacyPage({ params }: PageProps<"/[locale]/privacy">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ContentPage slug="privacy" />;
}
