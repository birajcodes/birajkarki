import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#08080a",
          color: "#f2f2f4",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 20, letterSpacing: 4, color: "#7c5cff" }}>
          SYSTEM / 001
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 26, color: "#7c5cff", marginBottom: 16 }}>
            {site.name.toUpperCase()}
          </div>
          <div style={{ display: "flex", fontSize: 88, lineHeight: 1, fontWeight: 600 }}>
            SOFTWARE ENGINEER
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 22, color: "#9a9aa2" }}>
          {site.tagline}
        </div>
      </div>
    ),
    { ...size }
  );
}
