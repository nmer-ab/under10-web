import { hasLocale } from "next-intl";
import type { NextRequest } from "next/server";
import { routing } from "@/i18n/routing";
import { STORE_LINKS } from "@/lib/links";
import { localePath } from "@/lib/social-metadata";

// Target of the QR codes: phones go straight to their store; desktops, and stores that aren't
// live yet, land on the home page's download section.
function storeFor(userAgent: string) {
  if (/iPhone|iPad|iPod/i.test(userAgent)) return STORE_LINKS.appStore;
  if (/Android/i.test(userAgent)) return STORE_LINKS.googlePlay;
  return null;
}

export async function GET(request: NextRequest, { params }: RouteContext<"/[locale]/download">) {
  const { locale: requested } = await params;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;
  const store = storeFor(request.headers.get("user-agent") ?? "");
  const target = store ?? new URL(`${localePath(locale)}#download`, request.url);

  return Response.redirect(target, 307);
}
