import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ContentPage, contentMetadata } from "@/components/ContentPage";

export async function generateMetadata({ params }: PageProps<"/[locale]/legal">): Promise<Metadata> {
  const { locale } = await params;
  return contentMetadata(locale, "legal");
}

export default async function LegalPage({ params }: PageProps<"/[locale]/legal">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ContentPage slug="legal" />;
}
