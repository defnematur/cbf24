// Fotos und Videos des Inhabers. Datei nach public/media/ legen und `src` (bzw. `poster`) eintragen.
// Ohne `src` wird ein grauer Platzhalter mit der Beschreibung angezeigt.
// Noch ungenutzt: /media/beispiele/polo-ruecken.jpg (Polo-Rückseite mit großem CBF24-Logo)

export type Bild = { alt: string; src?: string };
export type Video = { beschreibung: string; src?: string; poster?: string };

export const startseite = {
  collageHintergrund: { alt: "Stickmaschine in der Werkstatt" } as Bild,
  collage: [
    { alt: "Bestickte Arbeitsjacke mit Logo" } as Bild,
    { beschreibung: "Stickprozess – Nahaufnahme der Nadel, 15 s Loop" } as Video,
    { alt: "Siebdruck auf T-Shirts, Vereinsauflage" } as Bild,
  ] as const,
  // Aus design/design.pdf (Flyer-Mockups) zugeschnitten – durch echte Fotos ersetzen, sobald vorhanden
  stickereiKarte: {
    alt: "Graues Poloshirt mit CBF24-Logo auf der Brust",
    src: "/media/beispiele/polo-brustlogo.jpg",
  } as Bild,
  druckereiKarte: {
    alt: "Navyblaue Schul-Hoodies: vorne Schullogo, hinten Abschlussjahrgang mit Namensliste",
    src: "/media/beispiele/hoodie-navy-paar.jpg",
  } as Bild,
};

// Instagram-Raster auf der Startseite vorerst ausgeblendet – auf true setzen, sobald echte Posts eingetragen sind.
export const instagramRasterAnzeigen = false;

export const instagramPosts: (Bild & { href?: string })[] = [
  { alt: "Instagram-Post 1" },
  { alt: "Instagram-Post 2" },
  { alt: "Instagram-Post 3" },
  { alt: "Instagram-Post 4" },
];

export const leistungen = {
  stickereiVideo: {
    beschreibung: "Stickmaschine im Einsatz – vom Einspannen bis zum fertigen Logo, ca. 45 s",
  } as Video,
  stickereiBeispiele: [
    {
      alt: "Graues Poloshirt mit CBF24-Logo, Vorder- und Rückseite",
      src: "/media/beispiele/polo-vorne-hinten.jpg",
    },
    {
      alt: "Beige Trucker-Cap mit gesticktem Logo-Aufnäher",
      src: "/media/beispiele/cap-aufnaeher-gestickt.jpg", // aus design/test_image.png
    },
    { alt: "Namenszug auf Handtuch" },
  ] as Bild[],
  druckereiVideo: {
    beschreibung:
      "Transferpresse und Siebdruck – Motiv wird mit Hitze und Druck übertragen, ca. 40 s",
  } as Video,
  druckereiBeispiele: [
    { alt: "Siebdruck Vereins-T-Shirts" },
    { alt: "Flexdruck Rückennummern" },
    { alt: "Offset-Transfer Fotomotiv JGA" },
  ] as Bild[],
  aufnaeher: [{ alt: "gestickt" }, { alt: "gewebt" }, { alt: "sublimiert" }] as Bild[],
};
