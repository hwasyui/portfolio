import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Angelica Suti Whiharto Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#ffffff",
          backgroundImage:
            "linear-gradient(to right, #e4e4e7 1px, transparent 1px), linear-gradient(to bottom, #e4e4e7 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          padding: "90px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#a1a1aa",
            marginBottom: 28,
          }}
        >
          PORTFOLIO · 2026
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#71717a", marginBottom: 6 }}>I am a</div>
        <div
          style={{
            display: "flex",
            fontSize: 96,
            fontWeight: 700,
            color: "#18181b",
            letterSpacing: -2,
            lineHeight: 1,
          }}
        >
          Backend Engineer
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 28,
            color: "#71717a",
            marginTop: 36,
            maxWidth: 820,
          }}
        >
          Backend systems, data pipelines, and AI, built to actually ship.
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 30,
            fontWeight: 600,
            color: "#3f3f46",
            marginTop: 60,
          }}
        >
          Angelica Suti Whiharto
        </div>
        <div style={{ display: "flex", fontSize: 22, color: "#a1a1aa", marginTop: 6 }}>
          West Java, Indonesia
        </div>
      </div>
    ),
    { ...size }
  );
}
