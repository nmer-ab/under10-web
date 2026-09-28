import { homeShareImage } from "@/components/share/home-image";
import { routing } from "@/i18n/routing";
import { SHARE_IMAGE_SIZE } from "@/lib/social-metadata";

// Alt text is set per locale in the layout's generateMetadata.
export const size = SHARE_IMAGE_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return homeShareImage(locale);
}
