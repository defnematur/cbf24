import nodemailer from "nodemailer";
import { kontakt } from "@/data/kontakt";
import { LEISTUNGEN, pruefeAnfrage } from "@/lib/anfrage";

// Schickt Anfragen aus /kontakt per SMTP an das Firmenpostfach.
// Benötigte Umgebungsvariablen (Vercel → Settings → Environment Variables), siehe .env.example.

const env = (key: string) => process.env[key]?.trim() || undefined;

// Zeilenumbrüche aus Werten entfernen, die in Kopfzeilen (Betreff, Dateiname) landen
const einzeilig = (s: string) => s.replace(/[\r\n]+/g, " ").slice(0, 200);

export async function POST(request: Request) {
  let data: FormData;
  try {
    data = await request.formData();
  } catch {
    return Response.json({ ok: false, fehler: "Ungültige Anfrage." }, { status: 400 });
  }

  // Honeypot ausgefüllt → Bot. Erfolg melden, nichts senden.
  if (String(data.get("_gotcha") ?? "")) return Response.json({ ok: true });

  const fehler = pruefeAnfrage(data);
  if (Object.keys(fehler).length) return Response.json({ ok: false, fehler }, { status: 422 });

  const host = env("SMTP_HOST");
  const user = env("SMTP_USER");
  const pass = env("SMTP_PASS");
  if (!host || !user || !pass) {
    console.error("Anfrageformular: SMTP_HOST, SMTP_USER oder SMTP_PASS fehlt.");
    return Response.json({ ok: false }, { status: 500 });
  }
  const port = Number.parseInt(env("SMTP_PORT") ?? "", 10) || 465;

  const feld = (key: string) => String(data.get(key) ?? "").trim();
  const name = einzeilig(feld("name"));
  const email = einzeilig(feld("email"));
  const leistung = LEISTUNGEN.includes(feld("leistung")) ? feld("leistung") : "";

  const zeilen = [
    `Name: ${name}`,
    `Firma / Verein: ${feld("firma") || "–"}`,
    `E-Mail: ${email}`,
    `Telefon: ${feld("telefon") || "–"}`,
    `Leistung: ${leistung || "–"}`,
    `Stückzahl (ca.): ${feld("stueckzahl") || "–"}`,
    "",
    "Nachricht:",
    feld("nachricht") || "–",
    "",
    "—",
    "Gesendet über das Anfrageformular auf cbf24.de. Antworten gehen direkt an den Absender der Anfrage.",
  ];

  const datei = data.get("motiv");
  const anhaenge =
    datei instanceof File && datei.size > 0
      ? [{ filename: einzeilig(datei.name), content: Buffer.from(await datei.arrayBuffer()) }]
      : [];

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // 465 = SSL/TLS, 587 = STARTTLS
    auth: { user, pass },
  });

  try {
    await transporter.sendMail({
      from: { name: "Website CBF24", address: env("MAIL_FROM") ?? user },
      to: env("MAIL_TO") ?? kontakt.email,
      replyTo: { name, address: email },
      subject: einzeilig(leistung ? `Neue Anfrage: ${leistung} – ${name}` : `Neue Anfrage – ${name}`),
      text: zeilen.join("\n"),
      attachments: anhaenge,
    });
  } catch (err) {
    console.error("Anfrageformular: Versand fehlgeschlagen", err);
    return Response.json({ ok: false }, { status: 502 });
  }

  return Response.json({ ok: true });
}
