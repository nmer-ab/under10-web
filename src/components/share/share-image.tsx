import { ImageResponse } from "next/og";
import type { ReactNode } from "react";
import { SHARE_IMAGE_SIZE } from "@/lib/social-metadata";

const FONT_FAMILY = "Plus Jakarta Sans";

// Google Fonts serves TrueType when the request has no browser user agent, which is what Satori needs.
async function loadFont(weight: 600 | 800): Promise<ArrayBuffer> {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@${weight}`,
  ).then((res) => res.text());
  const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
  if (!url) throw new Error(`Plus Jakarta Sans ${weight} not found in Google Fonts CSS`);
  return fetch(url).then((res) => res.arrayBuffer());
}

let fonts: Promise<ArrayBuffer[]> | undefined;

export async function jakartaFonts() {
  fonts ??= Promise.all([loadFont(600), loadFont(800)]).catch((error) => {
    fonts = undefined;
    throw error;
  });
  const [semibold, extrabold] = await fonts;
  return [
    { name: FONT_FAMILY, data: semibold, weight: 600 as const, style: "normal" as const },
    { name: FONT_FAMILY, data: extrabold, weight: 800 as const, style: "normal" as const },
  ];
}

// Satori can't draw emoji glyphs reliably, so emoji are drawn from Twemoji SVGs.
function twemojiUrl(emoji: string) {
  const codepoints = Array.from(emoji)
    .map((char) => char.codePointAt(0)!.toString(16))
    .filter((cp) => cp !== "fe0f")
    .join("-");
  return `https://cdn.jsdelivr.net/gh/jdecked/twemoji@15.1.0/assets/svg/${codepoints}.svg`;
}

export function Emoji({ emoji, size }: { emoji: string; size: number }) {
  // eslint-disable-next-line @next/next/no-img-element -- rendered by Satori, not the browser
  return <img src={twemojiUrl(emoji)} width={size} height={size} alt="" />;
}

export const SHARE_THEMES = {
  green: { background: "#065F46", glow: "#10B981", accent: "#34D399" },
  orange: { background: "#9A3412", glow: "#F97316", accent: "#FDBA74" },
};

export type ShareTheme = (typeof SHARE_THEMES)[keyof typeof SHARE_THEMES];

export async function renderShareImage({
  theme,
  title,
  subtitle,
  visual,
}: {
  theme: ShareTheme;
  /** One entry per line; a line longer than 640px wraps. */
  title: ReactNode[];
  subtitle: string;
  visual: ReactNode;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          fontFamily: FONT_FAMILY,
          backgroundColor: theme.background,
          backgroundImage: `radial-gradient(circle 900px at 1050px 80px, ${theme.glow}, ${theme.glow}00)`,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 80,
            top: 0,
            bottom: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <div style={{ display: "flex", fontSize: 44, fontWeight: 800, lineHeight: 1 }}>
            <span style={{ color: "#FFFFFF" }}>Under</span>
            <span style={{ color: theme.accent }}>10</span>
          </div>

          <div
            style={{
              marginTop: 36,
              maxWidth: 640,
              display: "flex",
              flexDirection: "column",
              fontSize: 76,
              fontWeight: 800,
              lineHeight: 1.02,
              letterSpacing: -2,
              color: "#FFFFFF",
            }}
          >
            {title.map((line, i) => (
              <div key={i} style={{ display: "flex", textWrap: "balance" }}>
                {line}
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: 24,
              maxWidth: 640,
              textWrap: "balance",
              fontSize: 30,
              fontWeight: 600,
              color: "rgba(255,255,255,0.8)",
            }}
          >
            {subtitle}
          </div>

          <div
            style={{
              marginTop: 36,
              height: 56,
              padding: "0 28px",
              borderRadius: 28,
              backgroundColor: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              fontSize: 26,
              fontWeight: 800,
              color: theme.background,
            }}
          >
            under10.app
          </div>
        </div>

        {visual}
      </div>
    ),
    { ...SHARE_IMAGE_SIZE, fonts: await jakartaFonts() },
  );
}
