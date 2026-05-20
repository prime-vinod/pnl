import { ImageResponse } from "next/og";

export function brandedOG(title: string) {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          background: "#0a0a0a",
          color: "#f5f5f0",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 18, letterSpacing: 4, textTransform: "uppercase", color: "#888" }}>
          Vinod Suthar
        </div>
        <div style={{ fontSize: 96, fontWeight: 900, lineHeight: 0.95, letterSpacing: "-0.04em" }}>
          {title}
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
