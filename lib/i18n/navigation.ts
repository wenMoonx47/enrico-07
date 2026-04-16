/**
 * Typed navigation helpers generated from our routing config.
 * Import Link, useRouter, usePathname from here — NOT from next/navigation —
 * so locale is automatically injected into all routes.
 */
import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
