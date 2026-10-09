import type { Metadata, Viewport } from "next";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/jost/400.css";
import "@fontsource/jost/500.css";
import "./globals.css";
import { ChatButton } from "@/components/ChatButton";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { instagramUrl, kontakt, noindex, siteUrl } from "@/data/kontakt";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "CBF Textildruck & Bestickung – Stickerei und Textildruck in Oberhaching bei München",
    template: "%s | CBF Textildruck & Bestickung",
  },
  description:
    "Stickerei und Textildruck in Oberhaching bei München: Logos und Schriften auf Arbeitskleidung, Vereinskleidung, T-Shirts und Polos – für Handwerk, Vereine, Schulen, Promotion und Privat.",
  robots: noindex ? { index: false, follow: false } : undefined,
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "CBF Textildruck & Bestickung",
  },
};

export const viewport: Viewport = {
  themeColor: "#F4F4F4",
};

// LocalBusiness – Geo-Koordinaten fehlen noch (beim Inhaber bzw. im Google-Unternehmensprofil erfragen).
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: kontakt.firma,
  url: siteUrl,
  logo: `${siteUrl}/brand/logo-schwarz.png`,
  telephone: kontakt.telefon.anzeige,
  faxNumber: kontakt.fax,
  email: kontakt.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: kontakt.strasse,
    postalCode: kontakt.plz,
    addressLocality: kontakt.ort,
    addressCountry: "DE",
  },
  openingHoursSpecification: kontakt.oeffnungszeiten.flatMap((o) =>
    o.schema.von.map((von, i) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: o.schema.tage,
      opens: von,
      closes: o.schema.bis[i],
    })),
  ),
  ...(kontakt.instagramHandle ? { sameAs: [instagramUrl()] } : {}),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>
        <a href="#inhalt" className="skip-link">
          Zum Inhalt springen
        </a>
        <Nav />
        <main id="inhalt">{children}</main>
        <Footer />
        <ChatButton />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
