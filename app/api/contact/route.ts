import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

// ── Validation schema ────────────────────────────────────────────
const contactSchema = z.object({
  name:    z.string().min(2).max(80),
  email:   z.string().email().max(200),
  subject: z.string().min(5).max(200),
  message: z.string().min(20).max(5000),
  _trap:   z.string().max(0).optional(), // honeypot — must be empty
});

// ── HTML email template ──────────────────────────────────────────
function buildEmailHtml(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): string {
  const escaped = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="utf-8"/></head>
<body style="margin:0;padding:0;background:#0A0E0C;font-family:monospace;color:#E8F0EC;">
  <div style="max-width:600px;margin:32px auto;padding:32px;border:1px solid #1F2A26;border-radius:8px;background:#0F1513;">
    <div style="margin-bottom:24px;padding-bottom:16px;border-bottom:1px solid #1F2A26;">
      <p style="margin:0;font-size:11px;color:#5A6B64;letter-spacing:0.1em;text-transform:uppercase;">
        Portfolio Contact Form
      </p>
      <h1 style="margin:8px 0 0;font-size:18px;color:#34D399;">
        ${escaped(data.subject)}
      </h1>
    </div>

    <table style="width:100%;margin-bottom:24px;font-size:13px;">
      <tr>
        <td style="padding:4px 0;color:#8B9A93;width:80px;">De:</td>
        <td style="padding:4px 0;color:#E8F0EC;">${escaped(data.name)}</td>
      </tr>
      <tr>
        <td style="padding:4px 0;color:#8B9A93;">Email:</td>
        <td style="padding:4px 0;">
          <a href="mailto:${escaped(data.email)}" style="color:#34D399;">${escaped(data.email)}</a>
        </td>
      </tr>
    </table>

    <div style="padding:16px;background:#161D1A;border-radius:6px;border:1px solid #1F2A26;">
      <p style="margin:0;font-size:11px;color:#5A6B64;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:12px;">
        Mensaje
      </p>
      <p style="margin:0;font-size:14px;color:#E8F0EC;line-height:1.7;white-space:pre-wrap;">${escaped(data.message)}</p>
    </div>

    <p style="margin-top:24px;font-size:11px;color:#5A6B64;">
      Enviado desde <a href="https://enricoperania.dev" style="color:#34D399;">enricoperania.dev</a>
    </p>
  </div>
</body>
</html>`;
}

// ── POST handler ─────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate
    const result = contactSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid request data", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, subject, message, _trap } = result.data;

    // Honeypot — return fake success so bots don't know it failed
    if (_trap && _trap.length > 0) {
      return NextResponse.json({ ok: true });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_EMAIL_TO ?? "enricoperania@gmail.com";
    const from = process.env.CONTACT_EMAIL_FROM ?? "noreply@enricoperania.dev";

    if (!apiKey || apiKey === "re_xxxxxxxxxxxxxxxxxxxxxxxxxxxx") {
      // Development fallback — log to console, return success
      console.log("[contact] Message received (no API key configured):", {
        name, email, subject, message: message.slice(0, 100),
      });
      return NextResponse.json({ ok: true });
    }

    const resend = new Resend(apiKey);

    await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      html: buildEmailHtml({ name, email, subject, message }),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
