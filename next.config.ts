import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // 301-Weiterleitungen der alten cbf24.de-URLs (statusCode statt permanent, das wäre 308)
  async redirects() {
    return [
      { source: "/Stickerei", destination: "/leistungen#stickerei", statusCode: 301 },
      { source: "/Bedrucken", destination: "/leistungen#druckerei", statusCode: 301 },
      { source: "/Applikationen", destination: "/leistungen#applikationen", statusCode: 301 },
      { source: "/Grafikservice-und-Tipps", destination: "/leistungen#grafikservice", statusCode: 301 },
      { source: "/Textilangebot", destination: "https://cbf24-textil.de/", statusCode: 301 },
      // /DATENSCHUTZ → /datenschutz steht in src/proxy.ts: Next.js vergleicht Pfade hier ohne Groß-/Kleinschreibung (Endlosschleife)
      { source: "/AGB-s", destination: "/agb", statusCode: 301 },
    ];
  },
};

export default nextConfig;
