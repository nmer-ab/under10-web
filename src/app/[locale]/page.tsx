import { setRequestLocale } from "next-intl/server";
import { CuisineMarquee } from "@/components/home/CuisineMarquee";
import { DEMO_ITEMS } from "@/components/home/demo-feed";
import { Download } from "@/components/home/Download";
import { ExplorePreview } from "@/components/home/ExplorePreview";
import { Faq } from "@/components/home/Faq";
import { ForRestaurants } from "@/components/home/ForRestaurants";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { homeSocialMetadata } from "@/lib/social-metadata";

// opengraph-image.tsx sits beside this page, so Next attaches it here; list the images again or
// the file convention replaces the layout's (translated alt text included).
export async function generateMetadata({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  return homeSocialMetadata(locale);
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <CuisineMarquee />
      <HowItWorks />
      <ExplorePreview items={DEMO_ITEMS} />
      <ForRestaurants />
      <Faq />
      <Download />
    </>
  );
}
