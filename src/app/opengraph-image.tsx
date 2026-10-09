import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";

// Vorschaubild für geteilte Links: weißes Original-Logo auf Schwarz.
export const alt = "CBF24.DE – Textildruck & Bestickung in Oberhaching bei München";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  const logo = fs.readFileSync(path.join(process.cwd(), "public/brand/logo-weiss.png")).toString("base64");
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 48,
          background: "#1C1C1C",
          color: "#FFFFFF",
        }}
      >
        <img src={`data:image/png;base64,${logo}`} width={481} height={285} alt="" />
        <div style={{ display: "flex", fontSize: 40, fontWeight: 600 }}>Ihre Ideen, hochwertig auf Stoff.</div>
      </div>
    ),
    size,
  );
}
