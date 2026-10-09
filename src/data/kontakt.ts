// Einzige Quelle für Kontaktdaten. `null` = beim Inhaber erfragen, wird als [PLATZHALTER] angezeigt.

export const kontakt = {
  firma: "Fa. CBF Textildruck & Bestickung",
  strasse: "Bajuwarenring 17a",
  plz: "82041",
  ort: "Oberhaching",
  ortZusatz: "bei München",
  telefon: { anzeige: "+49 89 61469280", href: "tel:+498961469280" },
  mobil: { anzeige: "+49 176 40064461", href: "tel:+4917640064461" },
  fax: "089 61469281",
  email: "info@cbf24.de",
  whatsapp: "https://wa.me/4917640064461",
  oeffnungszeiten: null as string | null, // [ÖFFNUNGSZEITEN]
  instagramHandle: "cbf24.de" as string | null, // ohne @ → https://www.instagram.com/cbf24.de/
  angebotWerktage: null as string | null, // [X] Werktage
  // Routenplaner mit der Werkstatt als Ziel (Start = Standort des Besuchers)
  routeUrl:
    "https://www.google.com/maps/dir/?api=1&destination=Bajuwarenring+17a%2C+82041+Oberhaching",
  // Eingebettete Karte – wird erst nach Klick auf „Karte anzeigen“ geladen (DSGVO)
  mapsEmbedUrl:
    "https://maps.google.com/maps?q=Bajuwarenring+17a%2C+82041+Oberhaching&z=15&hl=de&output=embed",
};

export const links = {
  textilangebot: "https://cbf24-textil.de/",
  hakro: "https://hakro.com/",
};

export const siteUrl = "https://www.cbf24.de";

export function instagramUrl() {
  return kontakt.instagramHandle
    ? `https://www.instagram.com/${kontakt.instagramHandle}/`
    : "https://www.instagram.com/";
}
