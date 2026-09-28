import { getTranslations } from "next-intl/server";
import { formatPrice } from "@/lib/format";
import { Emoji, renderShareImage, SHARE_THEMES } from "./share-image";

const PINS = [
  { emoji: "🥐", price: 3.2, left: "27%", top: "16%" },
  { emoji: "🍜", price: 7.5, left: "72%", top: "27%" },
  { emoji: "🌮", price: 6, left: "28%", top: "72%" },
  { emoji: "🥙", price: 5, left: "56%", top: "50%", selected: true },
];

const ROADS = [
  "M -20 150 L 300 70",
  "M -20 440 L 300 330",
  "M 150 -20 L 115 620",
];

// PricePin at 1.2×, with the selected pin's extra 1.1× on top.
function Pin({ emoji, price, selected }: { emoji: string; price: string; selected?: boolean }) {
  return (
    <div
      style={{
        height: 36,
        paddingLeft: 4,
        paddingRight: 12,
        borderRadius: 18,
        display: "flex",
        alignItems: "center",
        gap: 7,
        backgroundColor: selected ? "#10B981" : "#FFFFFF",
        color: selected ? "#FFFFFF" : "#111827",
        boxShadow: "0 5px 14px rgba(0,0,0,0.14)",
        transform: selected ? "translate(-50%, -50%) scale(1.1)" : "translate(-50%, -50%)",
      }}
    >
      <div
        style={{
          width: 29,
          height: 29,
          borderRadius: 15,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: selected ? "rgba(255,255,255,0.25)" : "#F3F4F6",
        }}
      >
        <Emoji emoji={emoji} size={18} />
      </div>
      <span style={{ fontSize: 17, fontWeight: 800, lineHeight: 1 }}>{price}</span>
    </div>
  );
}

function MapPhone({ locale }: { locale: string }) {
  return (
    <div
      style={{
        position: "absolute",
        left: 780,
        top: 30,
        width: 300,
        height: 600,
        borderRadius: 44,
        border: "10px solid #111827",
        backgroundColor: "#EAF6EF",
        display: "flex",
        transform: "rotate(-6deg)",
        boxShadow: "0 40px 80px rgba(0,0,0,0.3)",
      }}
    >
      {/* Roads are clipped inside the SVG: Satori drops images under a rotated overflow:hidden box. */}
      <svg width="280" height="580" viewBox="0 0 280 580" style={{ position: "absolute" }}>
        <defs>
          <clipPath id="screen">
            <rect width="280" height="580" rx="34" />
          </clipPath>
        </defs>
        <g clipPath="url(#screen)">
          {ROADS.map((d) => (
            <path key={d} d={d} stroke="#FFFFFF" strokeWidth={14} strokeLinecap="round" fill="none" />
          ))}
        </g>
      </svg>
      {PINS.map((pin) => (
        <div key={pin.emoji} style={{ position: "absolute", left: pin.left, top: pin.top, display: "flex" }}>
          <Pin emoji={pin.emoji} price={formatPrice(locale, pin.price)} selected={pin.selected} />
        </div>
      ))}
    </div>
  );
}

export async function homeShareImage(locale: string) {
  const t = await getTranslations({ locale, namespace: "share.home" });

  return renderShareImage({
    theme: SHARE_THEMES.green,
    title: [
      t("titleStart"),
      <span key="highlight" style={{ color: SHARE_THEMES.green.accent }}>
        {t("titleHighlight")}
      </span>,
      t("titleEnd"),
    ],
    subtitle: t("subtitle"),
    visual: <MapPhone locale={locale} />,
  });
}
