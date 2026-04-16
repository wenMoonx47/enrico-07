import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const locale = req.nextUrl.searchParams.get("locale") ?? "es";

  const title =
    locale === "es"
      ? "Ingeniero de Software Senior · Backend & AI Systems"
      : "Senior Software Engineer · Backend & AI Systems";

  const subtitle =
    locale === "es"
      ? "Lead Engineer en Kueski · Lima, Perú · Disponible para trabajo remoto"
      : "Lead Engineer at Kueski · Lima, Peru · Available for remote work";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "60px 72px",
          background: "#0A0E0C",
          position: "relative",
          fontFamily: "monospace",
        }}
      >
        {/* Dot grid background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle, rgba(52,211,153,0.08) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Top-right glow */}
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 500,
            height: 500,
            background:
              "radial-gradient(circle, rgba(52,211,153,0.18) 0%, rgba(34,211,238,0.08) 40%, transparent 70%)",
          }}
        />

        {/* Border frame */}
        <div
          style={{
            position: "absolute",
            inset: 24,
            border: "1px solid #1F2A26",
            borderRadius: 12,
          }}
        />

        {/* Content */}
        <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Prompt */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ color: "#34D399", fontSize: 18, fontWeight: 600 }}>$</span>
            <span style={{ color: "#8B9A93", fontSize: 16 }}>whoami</span>
          </div>

          {/* Name */}
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              background: "linear-gradient(90deg, #34D399, #22D3EE)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              lineHeight: 1.1,
            }}
          >
            Enrico Perania
          </div>

          {/* Title */}
          <div style={{ fontSize: 24, color: "#E8F0EC", lineHeight: 1.3, maxWidth: 800 }}>
            {title}
          </div>

          {/* Subtitle */}
          <div style={{ fontSize: 18, color: "#8B9A93" }}>{subtitle}</div>

          {/* Badges */}
          <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
            {["9+ years", "Backend & AI", "Remote-first"].map((label) => (
              <div
                key={label}
                style={{
                  padding: "6px 14px",
                  border: "1px solid rgba(52,211,153,0.3)",
                  borderRadius: 6,
                  background: "rgba(52,211,153,0.05)",
                  color: "#34D399",
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom URL */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            right: 72,
            color: "#5A6B64",
            fontSize: 14,
          }}
        >
          enricoperania.dev
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
