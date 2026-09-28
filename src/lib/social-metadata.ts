import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";

export const SHARE_IMAGE_SIZE = { width: 1200, height: 630 };

export function localePath(locale: string, path = "") {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  return `${prefix}${path}` || "/";
}

/**
 * Open Graph and Twitter tags for a page with generated share images. The images are listed
 * explicitly (rather than left to the file convention) so their alt text can be translated.
 */
export async function socialMetadata({
  locale,
  path = "",
  title,
  description,
  imageAlt,
  twitterImage = "opengraph-image",
}: {
  locale: string;
  /** Route without the locale prefix, e.g. "/restaurants". */
  path?: string;
  title: string;
  description: string;
  imageAlt: string;
  /** Image route used for twitter:image, when the segment has its own twitter-image. */
  twitterImage?: "opengraph-image" | "twitter-image";
}): Promise<Pick<Metadata, "openGraph" | "twitter">> {
  const t = await getTranslations({ locale, namespace: "metadata" });
  const image = (route: string) => ({
    url: localePath(locale, `${path}/${route}`),
    ...SHARE_IMAGE_SIZE,
    type: "image/png",
    alt: imageAlt,
  });

  return {
    openGraph: {
      type: "website",
      siteName: "Under10",
      title,
      description,
      locale: t("ogLocale"),
      url: localePath(locale, path),
      images: [image("opengraph-image")],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image(twitterImage)],
    },
  };
}

/** Home share tags: the layout's default for every page, repeated on the home page itself. */
export async function homeSocialMetadata(locale: string) {
  const t = await getTranslations({ locale, namespace: "metadata" });
  const tShare = await getTranslations({ locale, namespace: "share.home" });

  return socialMetadata({
    locale,
    title: t("title"),
    description: t("description"),
    imageAlt: tShare("alt"),
    twitterImage: "twitter-image",
  });
}
