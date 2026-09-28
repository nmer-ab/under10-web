import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const proxy = createMiddleware(routing);

export default proxy;

export const config = {
  // apple-icon is a root metadata route with no file extension, so it needs an explicit skip.
  matcher: "/((?!api|trpc|_next|_vercel|apple-icon|.*\\..*).*)",
};
