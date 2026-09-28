import { getTranslations } from "next-intl/server";
import { DASHBOARD_STATS } from "@/components/home/dashboard-stats";
import { formatNumber } from "@/lib/format";
import { Emoji, renderShareImage, SHARE_THEMES } from "./share-image";

async function DashboardCard({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "home.forRestaurants.dashboard" });

  return (
    <div
      style={{
        position: "absolute",
        left: 720,
        top: 200,
        width: 420,
        padding: 24,
        borderRadius: 28,
        backgroundColor: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        transform: "rotate(-4deg)",
        boxShadow: "0 40px 80px rgba(0,0,0,0.3)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 14,
            backgroundColor: "#FFEDD5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Emoji emoji="🥙" size={28} />
        </div>
        <span style={{ fontSize: 22, fontWeight: 800, color: "#111827" }}>Kebab du Coin</span>
        <span
          style={{
            height: 26,
            padding: "0 10px",
            borderRadius: 13,
            backgroundColor: "#F97316",
            color: "#FFFFFF",
            fontSize: 13,
            fontWeight: 800,
            display: "flex",
            alignItems: "center",
          }}
        >
          {t("official")}
        </span>
      </div>

      <div style={{ marginTop: 20, display: "flex", gap: 12 }}>
        {DASHBOARD_STATS.map((stat) => (
          <div
            key={stat.key}
            style={{
              flex: 1,
              padding: 14,
              borderRadius: 16,
              backgroundColor: "#F9FAFB",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span style={{ fontSize: 14, fontWeight: 600, color: "#6B7280" }}>
              {t(`stats.${stat.key}`)}
            </span>
            <span style={{ marginTop: 2, fontSize: 28, fontWeight: 800, color: "#111827" }}>
              {formatNumber(locale, stat.value)}
            </span>
            <span style={{ fontSize: 14, fontWeight: 800, color: "#10B981" }}>
              {formatNumber(locale, stat.change, { style: "percent", signDisplay: "always" })}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function restaurantsShareImage(locale: string) {
  const t = await getTranslations({ locale, namespace: "share.restaurants" });

  return renderShareImage({
    theme: SHARE_THEMES.orange,
    title: [t("title")],
    subtitle: t("subtitle"),
    visual: await DashboardCard({ locale }),
  });
}
