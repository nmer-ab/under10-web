import { ImageResponse } from "next/og";
import { jakartaFonts } from "@/components/share/share-image";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 40,
          backgroundColor: "#10B981",
          color: "#FFFFFF",
          fontFamily: "Plus Jakarta Sans",
          fontSize: 96,
          fontWeight: 800,
          letterSpacing: -3,
        }}
      >
        10
      </div>
    ),
    { ...size, fonts: await jakartaFonts() },
  );
}
