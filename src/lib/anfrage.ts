// Gemeinsame Regeln für das Anfrageformular – im Browser (ContactForm) und auf dem Server (/api/anfrage).

export const LEISTUNGEN = [
  "Stickerei",
  "Druck",
  "Applikationen / Aufnäher",
  "Textilien + Veredelung",
  "Noch unklar – bitte beraten",
];

export const ERLAUBTE_ENDUNGEN = ["ai", "eps", "pdf", "svg", "png"];

// Vercel Functions nehmen max. 4,5 MB pro Anfrage an (Datei + Formularfelder).
export const MAX_DATEI_MB = 4;
export const MAX_DATEI_BYTES = MAX_DATEI_MB * 1024 * 1024;

export type Feld = "name" | "email" | "motiv" | "datenschutz";
export type Fehler = Partial<Record<Feld, string>>;

const text = (data: FormData, key: string) => String(data.get(key) ?? "").trim();

export function pruefeAnfrage(data: FormData): Fehler {
  const f: Fehler = {};
  if (!text(data, "name")) f.name = "Bitte geben Sie Ihren Namen an.";
  const email = text(data, "email");
  if (!email) f.email = "Bitte geben Sie Ihre E-Mail-Adresse an.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) f.email = "Bitte geben Sie eine gültige E-Mail-Adresse an.";
  const datei = data.get("motiv");
  if (datei instanceof File && datei.size > 0) {
    const endung = datei.name.split(".").pop()?.toLowerCase() ?? "";
    if (!ERLAUBTE_ENDUNGEN.includes(endung)) f.motiv = "Erlaubt sind AI, EPS, PDF, SVG und PNG.";
    else if (datei.size > MAX_DATEI_BYTES) f.motiv = `Die Datei ist größer als ${MAX_DATEI_MB} MB.`;
  }
  if (!data.get("datenschutz")) f.datenschutz = "Bitte stimmen Sie der Datenschutzerklärung zu.";
  return f;
}
