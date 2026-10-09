// Landingpages für konkrete Suchanfragen (z. B. „T-Shirt Druck München“, „Abschlusspullis“).
// Eine Seite pro Eintrag unter /<slug>. Nur Fakten verwenden, die auch auf /leistungen stehen –
// keine Preise, Lieferzeiten oder Mengenrabatte erfinden.

import type { Bild } from "./medien";

export type Verfahren = { name: string; text: string };
export type Frage = { frage: string; antwort: string };

export type Anwendung = {
  slug: string;
  /** Kurzname für Links (Footer, Chips) */
  kurz: string;
  /** <title> – Suchbegriff + Ort */
  seitentitel: string;
  beschreibung: string;
  eyebrow: string;
  titel: string;
  einleitung: string;
  vorteile: string[];
  verfahren: Verfahren[];
  bild?: Bild;
  fragen: Frage[];
  /** Vorauswahl im Anfrageformular (muss in LEISTUNGEN vorkommen) */
  leistung: string;
  blog: string[];
};

const V = {
  offset: {
    name: "Offset-Transferdruck",
    text: "Für Fotos, viele Farben und Farbverläufe – auf hellen und dunklen Stoffen, waschbeständig, ab 1 Stück.",
  },
  sieb: {
    name: "Siebdruck",
    text: "Leuchtende Farben, auch mit Farbverläufen. Empfiehlt sich bei höheren Stückzahlen ab ca. 100 Stück.",
  },
  flex: {
    name: "Flexdruck",
    text: "Für Namen, Nummern und Schriftzüge mit bis zu 2 Farben. Bleibt auch auf dunklen Stoffen gut sichtbar, ab 1 Stück.",
  },
  flock: {
    name: "Flockdruck",
    text: "Samtige, voll deckende Oberfläche für grobe Motive – auf hellen und dunklen Stoffen, ab 1 Stück.",
  },
  stick: {
    name: "Stickerei",
    text: "Die hochwertigste und langlebigste Veredelung – übersteht selbst Industriewäsche.",
  },
  aufnaeher: {
    name: "Aufnäher",
    text: "Gestickt, gewebt oder sublimiert – als Patch auf Caps, Jacken und Taschen.",
  },
} satisfies Record<string, Verfahren>;

const DATEI_FRAGE: Frage = {
  frage: "Welche Datei brauchen Sie von mir?",
  antwort:
    "Am besten eine Vektorgrafik (AI, EPS, PDF oder SVG). Für viele Verfahren reicht auch eine Pixelgrafik mit 300 dpi. Haben Sie nur ein JPG oder PNG, zeichnen wir Ihr Logo nach.",
};

const TEXTIL_FRAGE: Frage = {
  frage: "Kann ich das Textil bei Ihnen aussuchen?",
  antwort:
    "Ja. Im Katalog unseres Textilpartners finden Sie T-Shirts, Polos, Hoodies, Jacken und Arbeitskleidung. Notieren Sie Artikelnummer, Farbe und Größen – wir übernehmen Beschaffung und Veredelung.",
};

export const anwendungen: Anwendung[] = [
  {
    slug: "t-shirts-bedrucken",
    kurz: "T-Shirts bedrucken",
    seitentitel: "T-Shirts bedrucken lassen in Oberhaching bei München",
    beschreibung:
      "T-Shirts mit Logo, Foto oder Schriftzug bedrucken lassen – vom Einzelstück bis zur Großauflage. Offset-Transfer, Siebdruck, Flex- und Flockdruck aus Oberhaching bei München.",
    eyebrow: "T-Shirt-Druck",
    titel: "T-Shirts bedrucken lassen",
    einleitung:
      "Ob Firmenlogo, Vereinsmotiv oder Fotodruck: Wir bedrucken Ihre T-Shirts mit dem Verfahren, das zu Motiv und Stückzahl passt – vom Einzelstück bis zur Großauflage.",
    vorteile: [
      "Schon ab 1 Stück möglich",
      "Fotos und Farbverläufe auf hellen und dunklen Shirts",
      "Siebdruck für größere Auflagen ab ca. 100 Stück",
      "Namen und Nummern pro Shirt individuell",
    ],
    verfahren: [V.offset, V.sieb, V.flex, V.flock],
    bild: { alt: "Siebdruck-Karussell mit T-Shirt beim Bedrucken", src: "/media/blog/siebdruck-flex-oder-flock.jpg" },
    fragen: [
      {
        frage: "Ab wie vielen T-Shirts lohnt sich Siebdruck?",
        antwort:
          "Siebdruck empfiehlt sich ab ca. 100 Stück. Für kleinere Mengen sind Offset-Transfer-, Flex- oder Flockdruck die bessere Wahl – sie sind schon ab 1 Stück möglich.",
      },
      {
        frage: "Kann ich ein Foto auf ein T-Shirt drucken lassen?",
        antwort:
          "Ja, mit dem Offset-Transferdruck. Er druckt vierfarbig (CMYK), also auch Fotos und Farbverläufe – auf hellen und dunklen Stoffen.",
      },
      DATEI_FRAGE,
      TEXTIL_FRAGE,
    ],
    leistung: "Druck",
    blog: ["siebdruck-flex-oder-flock", "vektor-oder-pixel", "textilien-richtig-pflegen"],
  },
  {
    slug: "hoodies-pullover",
    kurz: "Hoodies & Pullover",
    seitentitel: "Hoodies & Pullover bedrucken und besticken",
    beschreibung:
      "Hoodies, Sweatshirts und Pullover bedrucken oder besticken lassen – mit Logo auf der Brust und großem Motiv auf dem Rücken. Aus Oberhaching bei München.",
    eyebrow: "Hoodies & Pullover",
    titel: "Hoodies & Pullover bedrucken und besticken",
    einleitung:
      "Hoodies und Sweatshirts sind die Lieblingsteile für Teams, Schulen und Firmen. Wir kombinieren gern: ein gesticktes Logo auf der Brust, ein großer Druck auf dem Rücken.",
    vorteile: [
      "Stickerei oder Druck – oder beides kombiniert",
      "Große Rückenmotive bis A3",
      "Namen und Nummern pro Teil möglich",
      "Für Teams, Schulen, Vereine und Firmen",
    ],
    verfahren: [V.stick, V.offset, V.sieb, V.flex],
    bild: {
      alt: "Navyblaue Hoodies: vorne Logo, hinten Namensliste",
      src: "/media/beispiele/hoodie-navy-paar.jpg",
    },
    fragen: [
      {
        frage: "Sticken oder drucken – was ist auf Hoodies besser?",
        antwort:
          "Für Logos auf der Brust ist Stickerei besonders hochwertig und langlebig. Große Motive auf dem Rücken werden meist gedruckt, weil sie so leicht und angenehm zu tragen bleiben. Beides lässt sich kombinieren.",
      },
      {
        frage: "Wie groß darf das Motiv auf dem Rücken sein?",
        antwort: "Im Druck sind Rückenmotive bis A3 üblich. Gestickte Logos sind bis 28 cm möglich.",
      },
      DATEI_FRAGE,
      TEXTIL_FRAGE,
    ],
    leistung: "Textilien + Veredelung",
    blog: ["vereinskleidung-bedrucken", "logo-positionen-und-groessen", "textilien-richtig-pflegen"],
  },
  {
    slug: "teamwear-vereinskleidung",
    kurz: "Teamwear & Vereinskleidung",
    seitentitel: "Teamkleidung & Vereinskleidung mit Namen und Nummern",
    beschreibung:
      "Teamwear, Trikots und Vereinskleidung mit Wappen, Namen und Rückennummern bedrucken oder besticken lassen – für Sportvereine, Chöre und Teams in München und Umgebung.",
    eyebrow: "Teamwear & Vereinskleidung",
    titel: "Teamkleidung mit Wappen, Namen und Nummern",
    einleitung:
      "Einheitliche Kleidung stärkt den Zusammenhalt – auf dem Platz, auf der Bühne und im Büro. Wir veredeln Trikots, Shirts, Hoodies, Polos und Jacken für Ihr ganzes Team.",
    vorteile: [
      "Namen und Rückennummern pro Person",
      "Vereinswappen auch mit vielen Farben",
      "Gestickte Wappen auf Polos und Jacken",
      "Nachbestellungen ohne neue Stickprogramm-Kosten",
    ],
    verfahren: [V.flex, V.offset, V.sieb, V.stick],
    fragen: [
      {
        frage: "Können alle Teammitglieder einen eigenen Namen bekommen?",
        antwort:
          "Ja. Namen und Nummern pro Stück setzen wir am besten im Flexdruck um. Schicken Sie uns einfach eine Liste mit Name, Größe und Nummer pro Person.",
      },
      {
        frage: "Was passiert, wenn später neue Mitglieder dazukommen?",
        antwort:
          "Ihr Stickprogramm wird bei uns archiviert. Nachbestellungen kosten deshalb keine erneute Erstellungsgebühr.",
      },
      DATEI_FRAGE,
      TEXTIL_FRAGE,
    ],
    leistung: "Textilien + Veredelung",
    blog: ["vereinskleidung-bedrucken", "logo-positionen-und-groessen", "textilien-richtig-pflegen"],
  },
  {
    slug: "abschlusspullis",
    kurz: "Abschluss- & Abipullis",
    seitentitel: "Abschlusspullis & Abi-Hoodies mit Namen bedrucken",
    beschreibung:
      "Abschlusspullis und Abi-Hoodies mit Schullogo und allen Namen des Jahrgangs – bedruckt oder bestickt aus Oberhaching bei München.",
    eyebrow: "Abschluss- & Abipullis",
    titel: "Abschlusspullis mit allen Namen eures Jahrgangs",
    einleitung:
      "Vorne das Schullogo, hinten der Jahrgang mit allen Namen: Der Abschluss-Hoodie ist das Andenken an die Schulzeit. Wir setzen ihn für Ihre Klasse oder Ihren Jahrgang um.",
    vorteile: [
      "Schullogo vorne, Namensliste hinten",
      "Gedruckt oder mit gesticktem Logo",
      "Auch große Jahrgänge – Siebdruck ab ca. 100 Stück",
      "Namensliste einfach als Text oder PDF schicken",
    ],
    verfahren: [V.offset, V.sieb, V.flex, V.stick],
    bild: {
      alt: "Abschluss-Hoodies: vorne Schullogo, hinten Jahrgang mit Namensliste",
      src: "/media/beispiele/hoodie-navy-paar.jpg",
    },
    fragen: [
      {
        frage: "Wie schicken wir die Namen?",
        antwort:
          "Am einfachsten als Liste im Anfrageformular oder als PDF im Anhang. Bitte prüfen Sie die Schreibweise der Namen vorab sorgfältig.",
      },
      {
        frage: "Wann sollten wir anfragen?",
        antwort:
          "So früh wie möglich – vor allem in der Abschlusszeit im Frühjahr. Den genauen Ablauf stimmen wir im Angebot mit Ihnen ab.",
      },
      DATEI_FRAGE,
      TEXTIL_FRAGE,
    ],
    leistung: "Textilien + Veredelung",
    blog: ["vereinskleidung-bedrucken", "logo-positionen-und-groessen", "vektor-oder-pixel"],
  },
  {
    slug: "arbeitskleidung-mit-logo",
    kurz: "Arbeitskleidung mit Logo",
    seitentitel: "Arbeitskleidung mit Logo besticken – Firmenkleidung",
    beschreibung:
      "Arbeitskleidung und Firmenkleidung mit Logo besticken lassen – industriewaschfest, langlebig und jederzeit nachbestellbar. Stickerei in Oberhaching bei München.",
    eyebrow: "Arbeitskleidung & Firmenkleidung",
    titel: "Arbeitskleidung mit Logo besticken",
    einleitung:
      "Ihre Firmenkleidung ist Visitenkarte und Arbeitsmittel zugleich. Gestickte Logos halten auch Industriewäsche stand und sehen lange professionell aus.",
    vorteile: [
      "Industriewaschfeste Stickerei",
      "Brustlogo bis 12 cm, große Logos bis 28 cm",
      "Stickprogramm wird archiviert – Nachbestellung ohne neue Einrichtung",
      "Für Handwerk, Gastro und Industrie",
    ],
    verfahren: [V.stick, V.flex, V.offset],
    bild: { alt: "Graues Poloshirt mit gesticktem Logo auf der Brust", src: "/media/beispiele/polo-brustlogo.jpg" },
    fragen: [
      {
        frage: "Hält eine Stickerei die Industriewäsche aus?",
        antwort: "Ja. Stickerei ist die langlebigste Form der Textilveredelung und übersteht auch Industriewäsche.",
      },
      {
        frage: "Was kostet die Einrichtung?",
        antwort:
          "Für jedes Motiv erstellen wir einmalig ein Stickprogramm. Die Preise dafür finden Sie unter Leistungen › Stickerei. Bei Nachbestellungen fallen keine erneuten Erstellungskosten an.",
      },
      {
        frage: "Kann ich das gleiche Logo auf Polo und Jacke sticken lassen?",
        antwort:
          "Ja. Weil ein Stickprogramm auf Stoff und Größe abgestimmt ist, braucht ein anderes Textil oder eine andere Größe aber meist ein eigenes Programm.",
      },
      TEXTIL_FRAGE,
    ],
    leistung: "Stickerei",
    blog: ["arbeitskleidung-besticken", "was-ist-ein-stickprogramm", "logo-positionen-und-groessen"],
  },
  {
    slug: "jga-shirts",
    kurz: "JGA-Shirts",
    seitentitel: "JGA-Shirts bedrucken lassen – Junggesellenabschied",
    beschreibung:
      "JGA-Shirts für den Junggesellenabschied mit Foto, Spruch und Namen bedrucken lassen – schon ab 1 Stück. Aus Oberhaching bei München.",
    eyebrow: "JGA-Shirts",
    titel: "JGA-Shirts für den Junggesellenabschied",
    einleitung:
      "Ein Foto der Braut oder des Bräutigams, ein Spruch und für jeden ein eigener Name: Mit passenden Shirts wird der Junggesellenabschied unvergesslich.",
    vorteile: [
      "Schon ab 1 Stück",
      "Fotos und bunte Motive im Offset-Transferdruck",
      "Eigener Name oder Spitzname pro Shirt",
      "Auf hellen und dunklen Shirts",
    ],
    verfahren: [V.offset, V.flex, V.flock],
    fragen: [
      {
        frage: "Können wir ein Foto auf die Shirts drucken?",
        antwort:
          "Ja. Der Offset-Transferdruck bildet Fotos und Farbverläufe ab. Schicken Sie uns das Foto in möglichst hoher Auflösung.",
      },
      {
        frage: "Kann jedes Shirt einen anderen Namen bekommen?",
        antwort: "Ja, Namen und Sprüche pro Shirt setzen wir zum Beispiel im Flexdruck um.",
      },
      DATEI_FRAGE,
      TEXTIL_FRAGE,
    ],
    leistung: "Druck",
    blog: ["siebdruck-flex-oder-flock", "vektor-oder-pixel", "textilien-richtig-pflegen"],
  },
  {
    slug: "caps-besticken",
    kurz: "Caps besticken",
    seitentitel: "Caps mit Logo besticken lassen",
    beschreibung:
      "Caps und Mützen mit Logo besticken lassen – direkt gestickt oder als Aufnäher. Stickerei aus Oberhaching bei München.",
    eyebrow: "Caps & Mützen",
    titel: "Caps mit Logo besticken",
    einleitung:
      "Eine bestickte Cap ist das perfekte Werbe- und Teamaccessoire. Wir sticken Ihr Logo direkt auf die Cap oder als gestickten, gewebten oder sublimierten Aufnäher.",
    vorteile: [
      "Direkt gestickt oder als Aufnäher",
      "Langlebig und formstabil",
      "Für Vereine, Firmen und Events",
      "Stickprogramm wird archiviert",
    ],
    verfahren: [V.stick, V.aufnaeher],
    bild: { alt: "Beige Trucker-Cap mit gesticktem Logo-Aufnäher", src: "/media/beispiele/cap-aufnaeher-gestickt.jpg" },
    fragen: [
      {
        frage: "Kann ich mein vorhandenes Stickprogramm für Caps nutzen?",
        antwort:
          "Meist nicht: Eine Cap braucht ein anderes Stickprogramm als zum Beispiel eine Jacke – auch bei gleichem Motiv in gleicher Größe, weil die Fläche gewölbt und das Material anders ist.",
      },
      {
        frage: "Was ist der Unterschied zwischen Stickerei und Aufnäher?",
        antwort:
          "Bei der Stickerei wird das Logo direkt in die Cap gestickt. Ein Aufnäher (Patch) wird separat hergestellt – gestickt, gewebt oder sublimiert – und dann aufgebracht.",
      },
      DATEI_FRAGE,
    ],
    leistung: "Stickerei",
    blog: ["logo-positionen-und-groessen", "was-ist-ein-stickprogramm", "arbeitskleidung-besticken"],
  },
];

export function getAnwendung(slug: string) {
  return anwendungen.find((a) => a.slug === slug);
}
