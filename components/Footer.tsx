import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { LanguageToggle } from "@/components/LanguageToggle";
import { profile } from "@/lib/data/profile";
import { Mail, Terminal } from "lucide-react";
import {
  GithubIcon,
  LinkedinIcon,
  TwitterXIcon,
} from "@/components/icons/BrandIcons";
import { cn } from "@/lib/utils";

const FOOTER_NAV = [
  { href: "#about",      key: "about"      },
  { href: "#services",   key: "services"   },
  { href: "#work",       key: "work"       },
  { href: "#experience", key: "experience" },
  { href: "#stack",      key: "stack"      },
  { href: "#contact",    key: "contact"    },
] as const;

const SOCIAL_LINKS = [
  { href: profile.social.github,     icon: GithubIcon,   label: "GitHub"    },
  { href: profile.social.linkedin,  icon: LinkedinIcon, label: "LinkedIn"  },
  { href: profile.social.twitter,   icon: TwitterXIcon, label: "Twitter/X" },
  { href: `mailto:${profile.email}`, icon: Mail,        label: "Email"     },
] as const;

/**
 * Site footer — quick links, social row, language toggle, attribution.
 * Uses server component rendering (no interactivity needed except LanguageToggle).
 */
export function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const locale = useLocale();

  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t border-border bg-surface mt-32"
      aria-label="Site footer"
    >
      <div className="section-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Terminal size={16} className="text-accent-from" />
              <span className="font-mono font-bold text-sm">
                <span className="gradient-text">ep</span>
                <span className="text-text-dim">@portfolio</span>
              </span>
            </div>
            <p className="text-sm text-text-muted leading-relaxed max-w-xs">
              {profile.name} · Lead Software Engineer
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3 mt-1">
              {SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className={cn(
                    "p-2 rounded border border-border text-text-muted",
                    "hover:text-accent-from hover:border-accent-from/40 hover:bg-surface-2",
                    "transition-all duration-150",
                    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-from"
                  )}
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick nav */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-text-dim mb-4">
              {t("quickLinks")}
            </h3>
            <ul className="grid grid-cols-2 gap-1.5">
              {FOOTER_NAV.map(({ href, key }) => (
                <li key={key}>
                  <a
                    href={`/${locale}/${href}`}
                    className={cn(
                      "font-mono text-sm text-text-muted",
                      "hover:text-accent-from transition-colors duration-150",
                      "focus-visible:outline-none focus-visible:underline"
                    )}
                  >
                    <span className="text-text-dim mr-1">~/</span>
                    {nav(key)}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  href="/uses"
                  className="font-mono text-sm text-text-muted hover:text-accent-from transition-colors duration-150 focus-visible:outline-none focus-visible:underline"
                >
                  <span className="text-text-dim mr-1">~/</span>
                  {nav("uses")}
                </Link>
              </li>
              <li>
                <Link
                  href="/resume"
                  className="font-mono text-sm text-text-muted hover:text-accent-from transition-colors duration-150 focus-visible:outline-none focus-visible:underline"
                >
                  <span className="text-text-dim mr-1">~/</span>
                  {nav("resume")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Language + contact */}
          <div className="flex flex-col gap-4">
            <h3 className="font-mono text-xs uppercase tracking-widest text-text-dim">
              Language / Idioma
            </h3>
            <LanguageToggle variant="pill" />

            <div className="mt-2">
              <a
                href={`mailto:${profile.email}`}
                className="font-mono text-sm text-text-muted hover:text-accent-from transition-colors duration-150 break-all"
              >
                {profile.email}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-mono text-xs text-text-dim">
            {t("builtWith")}
          </p>
          <p className="font-mono text-xs text-text-dim">
            © {year} {profile.name}. {t("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
