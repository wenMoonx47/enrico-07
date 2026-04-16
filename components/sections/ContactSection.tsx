"use client";

import { useTranslations, useLocale } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { FadeUp } from "@/components/motion/FadeUp";
import { TerminalPrompt } from "@/components/terminal/TerminalPrompt";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { profile } from "@/lib/data/profile";
import { Mail, MapPin, Send, Loader2 } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterXIcon, WhatsappIcon } from "@/components/icons/BrandIcons";
import { cn } from "@/lib/utils";

// ── Contact form schema ──────────────────────────────────────────
const makeSchema = (t: (key: string) => string) =>
  z.object({
    name:    z.string().min(2,  t("nameMin")).nonempty(t("nameRequired")),
    email:   z.string().email(t("emailInvalid")).nonempty(t("emailRequired")),
    subject: z.string().min(5,  t("subjectMin")).nonempty(t("subjectRequired")),
    message: z.string().min(20, t("messageMin")).nonempty(t("messageRequired")),
    _trap:   z.string().max(0).optional(), // honeypot
  });

type ContactFormData = z.infer<ReturnType<typeof makeSchema>>;

// ── Direct channel items ─────────────────────────────────────────
function ChannelRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-accent-from/30 hover:bg-surface-2 transition-all duration-150 group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-from"
    >
      <div className="p-1.5 rounded border border-border group-hover:border-accent-from/30 group-hover:bg-accent-from/5 transition-colors duration-150">
        <Icon size={13} className="text-accent-from" />
      </div>
      <div className="min-w-0">
        <p className="font-mono text-[10px] text-text-dim uppercase tracking-widest">{label}</p>
        <p className="font-sans text-sm text-text-muted group-hover:text-text-primary transition-colors truncate">
          {value}
        </p>
      </div>
    </a>
  );
}

export function ContactSection() {
  const t = useTranslations("contact");
  const tf = useTranslations("contact.form");
  const te = useTranslations("contact.errors");
  const tc = useTranslations("contact.channels");

  const schema = makeSchema((key) => te(key as any));

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: ContactFormData) => {
    // Silent honeypot check — bots filling _trap get a fake success
    if (data._trap) { reset(); return; }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("send failed");

      toast.success(tf("successTitle"), {
        description: tf("successMessage"),
      });
      reset();
    } catch {
      toast.error(tf("errorTitle"), {
        description: tf("errorMessage"),
      });
    }
  };

  return (
    <section id="contact" className="py-24 bg-surface" aria-labelledby="contact-heading">
      <div className="section-container">
        <FadeUp>
          <TerminalPrompt command="send message --to=enrico" className="mb-2" />
          <h2 id="contact-heading" className="sr-only">{t("title")}</h2>
          <p className="font-mono text-xs text-text-dim mb-10">{t("subtitle")}</p>
        </FadeUp>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* ── Contact Form — 3/5 ──────────────────────────────── */}
          <FadeUp delay={0.05} className="lg:col-span-3">
            <div className="rounded-lg border border-border bg-background p-6">
              {/* Terminal-style form header */}
              <div className="flex items-center gap-3 pb-4 mb-5 border-b border-border">
                <div className="flex gap-1.5" aria-hidden="true">
                  <span className="size-2.5 rounded-full bg-rose-500/50" />
                  <span className="size-2.5 rounded-full bg-amber-400/50" />
                  <span className="size-2.5 rounded-full bg-success/50" />
                </div>
                <span className="font-mono text-xs text-text-dim">contact_form.sh</span>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
                {/* Honeypot — hidden from real users */}
                <input
                  {...register("_trap")}
                  type="text"
                  tabIndex={-1}
                  aria-hidden="true"
                  className="absolute opacity-0 w-0 h-0 pointer-events-none"
                  autoComplete="off"
                />

                {/* Name + Email row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="name" className="font-mono text-xs text-text-muted">
                      <span className="text-accent-from mr-1">$</span>{tf("name")}
                    </Label>
                    <Input
                      id="name"
                      {...register("name")}
                      placeholder={tf("namePlaceholder")}
                      className={cn(
                        "font-mono text-sm bg-surface border-border placeholder:text-text-dim",
                        "focus-visible:border-accent-from focus-visible:ring-0",
                        errors.name && "border-error focus-visible:border-error"
                      )}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "name-error" : undefined}
                    />
                    {errors.name && (
                      <p id="name-error" className="font-mono text-[11px] text-error" role="alert">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="font-mono text-xs text-text-muted">
                      <span className="text-accent-from mr-1">$</span>{tf("email")}
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      {...register("email")}
                      placeholder={tf("emailPlaceholder")}
                      className={cn(
                        "font-mono text-sm bg-surface border-border placeholder:text-text-dim",
                        "focus-visible:border-accent-from focus-visible:ring-0",
                        errors.email && "border-error focus-visible:border-error"
                      )}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                    {errors.email && (
                      <p id="email-error" className="font-mono text-[11px] text-error" role="alert">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-1.5">
                  <Label htmlFor="subject" className="font-mono text-xs text-text-muted">
                    <span className="text-accent-from mr-1">$</span>{tf("subject")}
                  </Label>
                  <Input
                    id="subject"
                    {...register("subject")}
                    placeholder={tf("subjectPlaceholder")}
                    className={cn(
                      "font-mono text-sm bg-surface border-border placeholder:text-text-dim",
                      "focus-visible:border-accent-from focus-visible:ring-0",
                      errors.subject && "border-error focus-visible:border-error"
                    )}
                    aria-invalid={!!errors.subject}
                    aria-describedby={errors.subject ? "subject-error" : undefined}
                  />
                  {errors.subject && (
                    <p id="subject-error" className="font-mono text-[11px] text-error" role="alert">
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <Label htmlFor="message" className="font-mono text-xs text-text-muted">
                    <span className="text-accent-from mr-1">$</span>{tf("message")}
                  </Label>
                  <Textarea
                    id="message"
                    {...register("message")}
                    placeholder={tf("messagePlaceholder")}
                    rows={5}
                    className={cn(
                      "font-mono text-sm bg-surface border-border placeholder:text-text-dim resize-none",
                      "focus-visible:border-accent-from focus-visible:ring-0",
                      errors.message && "border-error focus-visible:border-error"
                    )}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "message-error" : undefined}
                  />
                  {errors.message && (
                    <p id="message-error" className="font-mono text-[11px] text-error" role="alert">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full font-mono text-sm bg-accent-from text-background hover:bg-accent-to transition-colors duration-150 gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      {tf("sending")}
                    </>
                  ) : (
                    <>
                      <Send size={14} />
                      {tf("submit")}
                    </>
                  )}
                </Button>
              </form>
            </div>
          </FadeUp>

          {/* ── Direct Channels — 2/5 ───────────────────────────── */}
          <FadeUp delay={0.12} className="lg:col-span-2">
            <div className="space-y-3">
              <p className="font-mono text-xs text-text-dim uppercase tracking-widest mb-4">
                {tc("title")}
              </p>

              <ChannelRow
                icon={Mail}
                label={tc("email")}
                value={profile.email}
                href={`mailto:${profile.email}`}
              />
              <ChannelRow
                icon={LinkedinIcon}
                label={tc("linkedin")}
                value="enrico-perania"
                href={profile.social.linkedin}
              />
              <ChannelRow
                icon={GithubIcon}
                label={tc("github")}
                value="github.com/ethhandy"
                href={profile.social.github}
              />
              <ChannelRow
                icon={TwitterXIcon}
                label={tc("twitter")}
                value={profile.social.twitterHandle}
                href={profile.social.twitter}
              />
              <ChannelRow
                icon={WhatsappIcon}
                label={tc("whatsapp")}
                value={profile.phone}
                href={profile.social.whatsapp}
              />
              <ChannelRow
                icon={MapPin}
                label={tc("location")}
                value={`${profile.address.city} (${profile.timezoneOffset})`}
                href="https://maps.google.com/?q=Lima+Peru"
              />
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
