import createMiddleware from "next-intl/middleware";
import { routing } from "./lib/i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for:
  // - API routes (/api/...)
  // - Static files (/_next/...)
  // - Public files (/images/..., /favicon.ico, etc.)
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
