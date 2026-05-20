import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function og() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 140,
            fontWeight: 900,
            lineHeight: 0.9,
            letterSpacing: "-0.04em",
          }}
        >
          <div style={{ display: "flex" }}>SOFTWARE</div>
          <div style={{ display: "flex" }}>DEVELOPER.</div>
        </div>
      </div>
    ),
    size,
  );
}
