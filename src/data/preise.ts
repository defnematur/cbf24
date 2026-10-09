// Einzige Quelle für alle Preise. Alle Preise inkl. MwSt. (laut AGB §3, Stand 10/2026).
// `null` = Preis fehlt noch, beim Inhaber erfragen. Wird als Platzhalter angezeigt – niemals schätzen.

export type Preis = string | null;

export const stickprogramm: { leistung: string; preis: Preis }[] = [
  { leistung: "Standardschriften", preis: "10 €" },
  { leistung: "Brustlogo bis 12 cm Breite", preis: "45 €" },
  { leistung: "Großes Logo bis 28 cm", preis: "ab 60 €" },
];

export const stickpreisProStueck: Preis = null; // [PREIS je Stichzahl]

export const druckVerfahrenSpalten = [
  "Flex / Flock",
  "Offset-Transfer",
  "Siebdruck (ab 100 Stk.)",
] as const;

export const druckpreise: { motivgroesse: string; preise: [Preis, Preis, Preis] }[] = [
  { motivgroesse: "Klein · bis 10 × 10 cm (Brust, Ärmel)", preise: [null, null, null] },
  { motivgroesse: "Mittel · bis A4 (Brust groß)", preise: [null, null, null] },
  { motivgroesse: "Groß · bis A3 (Rücken)", preise: [null, null, null] },
];

export const mengenstaffel: { label: string; rabatte: [Preis, Preis, Preis] } = {
  label: "Mengenstaffel ab 25 / 50 / 100 Stück",
  rabatte: [null, null, null], // [RABATT]
};
