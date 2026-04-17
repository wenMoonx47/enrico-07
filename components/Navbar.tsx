"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/lib/i18n/navigation";
import { usePalette } from "@/components/providers/Providers";
import { LanguageToggle } from "@/components/LanguageToggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X, Terminal } from "lucide-react";

const NAV_LINKS = [
  { href: "#about",      key: "about"      },
  { href: "#services",   key: "services"   },
  { href: "#work",       key: "work"       },
  { href: "#experience", key: "experience" },
  { href: "#education",  key: "education"  },
  { href: "#stack",      key: "stack"      },
  { href: "#contact",    key: "contact"    },
] as const;

/**
 * Fixed top navigation bar.
 * - Transparent at top, surface-2 + backdrop blur once scrolled
 * - Collapsible mobile menu
 * - "Resume" CTA routes to /resume
 * - Language toggle (pill variant)
 */
export function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { toggle: openPalette } = usePalette();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Detect scroll to add background
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    closeMobile();
    if (isHome) {
      e.preventDefault();
      const id = hash.replace("#", "");
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    // On sub-pages: let browser navigate to /{locale}#section naturally
  };

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-40",
          "transition-all duration-300",
          scrolled
            ? "bg-surface-2/90 backdrop-blur-md border-b border-border"
            : "bg-transparent"
        )}
        aria-label="Primary navigation"
      >
        <div className="section-container">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-from rounded"
              aria-label="Enrico Perania — home"
            >
              <Terminal
                size={16}
                className="text-accent-from group-hover:text-accent-to transition-colors duration-150"
              />
              <span className="font-mono font-bold text-sm tracking-tight">
                <span className="gradient-text">ep</span>
                <span className="text-text-dim">@portfolio</span>
              </span>
            </Link>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map(({ href, key }) => (
                <a
                  key={key}
                  href={`/${locale}/${href}`}
                  onClick={(e) => scrollToSection(e, href)}
                  className={cn(
                    "px-3 py-1.5 rounded font-mono text-xs text-text-muted",
                    "hover:text-text-primary hover:bg-surface transition-colors duration-150",
                    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-from"
                  )}
                >
                  {t(key)}
                </a>
              ))}
            </div>

            {/* Desktop right actions */}
            <div className="hidden md:flex items-center gap-3">
              <LanguageToggle variant="pill" />

              <Link href="/resume" tabIndex={-1}>
                <Button
                  size="sm"
                  className="font-mono text-xs bg-transparent border border-accent-from text-accent-from hover:bg-accent-from hover:text-background transition-colors duration-150 gap-1.5"
                >
                  <span className="text-accent-from/70 group-hover:text-background/70">$</span>
                  {t("resume")}
                </Button>
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 text-text-muted hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-from rounded"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-30 bg-background/60 backdrop-blur-sm md:hidden"
            onClick={closeMobile}
            aria-hidden="true"
          />

          {/* Drawer */}
          <div
            className={cn(
              "fixed top-14 left-0 right-0 z-40 md:hidden",
              "bg-surface-2 border-b border-border py-4"
            )}
          >
            <div className="section-container flex flex-col gap-1">
              {NAV_LINKS.map(({ href, key }) => (
                <a
                  key={key}
                  href={`/${locale}/${href}`}
                  onClick={(e) => scrollToSection(e, href)}
                  className="px-3 py-2.5 rounded font-mono text-sm text-text-muted hover:text-text-primary hover:bg-surface transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-from"
                >
                  <span className="text-accent-from mr-2">$</span>
                  {t(key)}
                </a>
              ))}

              <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
                <LanguageToggle variant="pill" />
                <Link href="/resume" onClick={closeMobile}>
                  <Button
                    size="sm"
                    className="font-mono text-xs bg-transparent border border-accent-from text-accent-from hover:bg-accent-from hover:text-background"
                  >
                    {t("resume")}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
