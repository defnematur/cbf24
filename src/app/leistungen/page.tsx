import type { Metadata } from "next";
import Link from "next/link";
import { AnwendungenChips } from "@/components/AnwendungenChips";
import { ExternalLink } from "@/components/ExternalLink";
import { Foto, VideoBlock } from "@/components/Media";
import { DruckPreise, StickPreise } from "@/components/PriceTable";
import { SectionTabs } from "@/components/SectionTabs";
import { links } from "@/data/kontakt";
import { leistungen as medien } from "@/data/medien";
import styles from "./leistungen.module.css";

export const metadata: Metadata = {
  title: "Stickerei & Textildruck – Verfahren und Preise",
  description:
    "Stickerei und Textildruck in Oberhaching bei München: Stickprogramm, Offset-Transfer, Siebdruck, Flex- und Flockdruck, Aufnäher. Ablauf, Beispiele und Preise.",
  alternates: { canonical: "/leistungen" },
};

const tabs = [
  { id: "stickerei", label: "Stickerei" },
  { id: "druckerei", label: "Druckerei" },
  { id: "applikationen", label: "Applikationen" },
];

const stickSchritte = [
  {
    titel: "Motiv & Textil",
    text: "Sie schicken uns Ihr Logo – am besten als Vektorgrafik – und sagen uns, worauf es soll.",
  },
  {
    titel: "Stickprogramm (Punch)",
    text: "Unser Puncher legt Stickdichte, -richtung, -abstand, Muster und Reihenfolge fest – abgestimmt auf Motiv, Maschine und Stoff.",
  },
  {
    titel: "Probestick & Freigabe",
    text: "Sie sehen ein Foto des Probesticks und geben frei – erst dann läuft die Produktion.",
  },
  {
    titel: "Produktion & Archiv",
    text: "Wir besticken Ihre Auflage. Die Stickdatei wird archiviert – Nachbestellungen kosten keine Erstellungsgebühr mehr.",
  },
];

const verfahren = [
  {
    name: "Offset-Transferdruck",
    tag: "Fotomotive · CMYK",
    text: "Vierfarbige Motive werden auf Transferpapier gedruckt und mit Hitze und Druck auf den Stoff übertragen. Farbverläufe möglich, für helle und dunkle Stoffe, waschbeständig.",
    fakten: ["Farbverläufe: ja", "Dunkle Stoffe: ja", "Ab: 1 Stück"],
  },
  {
    name: "Siebdruck",
    tag: "Große Auflagen",
    text: "Direkt auf das Textil oder als Siebtransfer über eine Folie. Farbverläufe auf hellen und dunklen Stoffen. Empfiehlt sich bei höheren Druckmengen.",
    fakten: ["Farbverläufe: ja", "Dunkle Stoffe: ja", "Ab: ca. 100 Stück"],
  },
  {
    name: "Flexdruck",
    tag: "Einzelstücke · Namen",
    text: "Bewährter Standard der Textilindustrie, bleibt auch auf dunklen Stoffen gut sichtbar. Bis zu 2 Farben, keine Farbverläufe. Datencheck vor dem Schneiden.",
    fakten: ["Farbverläufe: nein", "Max. 2 Farben", "Ab: 1 Stück"],
  },
  {
    name: "Flockdruck",
    tag: "Samtige Oberfläche",
    text: "Samtartige, voll deckende Oberfläche – für helle und dunkle Stoffe. Nur für grobe Grafiken, keine Farbverläufe. Haftet nicht auf silikonbeschichteten Textilien.",
    fakten: ["Farbverläufe: nein", "Grobe Motive", "Ab: 1 Stück"],
  },
];

function Galerie({ titel, bilder }: { titel: string; bilder: typeof medien.stickereiBeispiele }) {
  return (
    <div className={styles.stack20}>
      <h3 className={styles.h3}>{titel}</h3>
      <div className={styles.gallery}>
        {bilder.map((b, i) => (
          <Foto key={b.alt} bild={b} labelBottom tone={i === 1 ? "mid" : "light"} className={styles.galleryItem} />
        ))}
      </div>
    </div>
  );
}

export default function Leistungen() {
  return (
    <>
      <section className={styles.intro}>
        <span className="eyebrow">Was wir machen</span>
        <h1 className={styles.h1}>Stickerei &amp; Druckerei</h1>
        <p className={styles.lead}>
          Zwei Werkstätten, ein Anspruch: Ihr Motiv soll so lange halten wie das Textil selbst. Hier erfahren Sie, wie
          wir arbeiten – und was es kostet.
        </p>
        <SectionTabs tabs={tabs} />
      </section>

      {/* ================= STICKEREI ================= */}
      <div className="container">
        <section id="stickerei" className={`card ${styles.section}`} aria-labelledby="stickerei-titel">
          <div className={styles.split}>
            <div className={styles.stack16}>
              <span className="eyebrow">Stickerei</span>
              <h2 id="stickerei-titel" className={styles.h2}>
                Die hochwertigste und langlebigste Veredelung
              </h2>
              <p className={styles.body}>
                Wir besticken Textilien aller Art mit Logos und Schriften nach Ihren Vorstellungen. Stickerei übersteht
                selbst Industriewäsche – ideal für Arbeitskleidung, Vereine, Schulen und Gastronomie.
              </p>
              <ul className={styles.chips} aria-label="Geeignete Textilien">
                {["Arbeitskleidung", "Polos & Hemden", "Caps", "Jacken", "Frottee"].map((c) => (
                  <li key={c} className="chip">
                    {c}
                  </li>
                ))}
              </ul>
            </div>
            <VideoBlock video={medien.stickereiVideo} className={styles.video} />
          </div>

          <div className={styles.stack24}>
            <h3 className={styles.h3}>So entsteht Ihre Stickerei</h3>
            <ol className={styles.steps}>
              {stickSchritte.map((s, i) => (
                <li key={s.titel} className={styles.step}>
                  <span className={styles.stepNo} aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <strong className={styles.stepTitle}>{s.titel}</strong>
                  <p className={styles.small}>{s.text}</p>
                </li>
              ))}
            </ol>
          </div>

          <Galerie titel="Beispiele aus der Stickerei" bilder={medien.stickereiBeispiele} />

          <div className={styles.priceSplit}>
            <div className={styles.stack14}>
              <h3 className={styles.h3}>Preise Stickprogramm</h3>
              <p className={styles.small14}>
                Einmalige Kosten für die Erstellung der Stickdatei, inkl. MwSt. Der Preis pro Stück richtet sich danach
                nach Stichzahl, Textil und Auflage – wir rechnen Ihnen das gern vor.
              </p>
              <StickPreise />
            </div>
            <div className={`${styles.note} on-dark`}>
              <h3 className={styles.noteTitle}>Gut zu wissen</h3>
              <p>
                Eine Stickdatei wird für ein bestimmtes Gewebe und eine bestimmte Größe erstellt und ist nur begrenzt
                skalierbar (max. ca. 10 %). Eine Cap braucht deshalb ein anderes Programm als eine Lederjacke – auch bei
                gleichem Motiv.
              </p>
              <p>Mit einer Vektorgrafik geht die Erstellung je nach Motiv schneller und damit günstiger.</p>
              <Link href="/kontakt?leistung=Stickerei#anfrage" className={`btn btn--white btn--sm ${styles.noteBtn}`}>
                Stickerei anfragen
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* ================= DRUCKEREI ================= */}
      <div className="container">
        <section id="druckerei" className={`card ${styles.section} ${styles.sectionGap}`} aria-labelledby="druckerei-titel">
          <div className={`${styles.split} ${styles.splitReverse}`}>
            <VideoBlock video={medien.druckereiVideo} className={styles.video} />
            <div className={styles.stack16}>
              <span className="eyebrow">Druckerei</span>
              <h2 id="druckerei-titel" className={styles.h2}>
                Vier Verfahren – für jedes Motiv und jede Auflage
              </h2>
              <p className={styles.body}>
                Transferdruck, Siebdruck, Beflockung und Flexdruck: Je nach Motiv, Farbanzahl, Stoff und Stückzahl
                empfehlen wir Ihnen das passende Verfahren – vom Einzelstück bis zur Großauflage.
              </p>
            </div>
          </div>

          <div className={styles.stack24}>
            <h3 className={styles.h3}>Die Verfahren im Überblick</h3>
            <div className={styles.methods}>
              {verfahren.map((v) => (
                <article key={v.name} className={styles.method}>
                  <div className={styles.methodHead}>
                    <h4 className={styles.methodName}>{v.name}</h4>
                    <span className={styles.methodTag}>{v.tag}</span>
                  </div>
                  <p className={styles.small14}>{v.text}</p>
                  <ul className={styles.facts}>
                    {v.fakten.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>

          <Galerie titel="Beispiele aus der Druckerei" bilder={medien.druckereiBeispiele} />

          <div className={styles.stack16}>
            <div className={styles.priceHead}>
              <h3 className={styles.h3}>Preise Druck</h3>
              <span className={styles.priceHint}>
                Richtwerte pro Stück, inkl. MwSt., zzgl. Textil – abhängig von Motivgröße, Verfahren und Auflage
              </span>
            </div>
            <DruckPreise />
            <div className={styles.textilBox}>
              <span>
                Sie haben Ihr Textil noch nicht? Wählen Sie es im Katalog unseres Partners – wir übernehmen Beschaffung
                und Veredelung.
              </span>
              <div className="btn-row">
                <ExternalLink href={links.textilangebot} className="btn btn--dark btn--sm">
                  Textilangebot
                </ExternalLink>
                <Link href="/kontakt?leistung=Druck#anfrage" className="btn btn--light btn--sm">
                  Druck anfragen
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ================= APPLIKATIONEN + GRAFIK ================= */}
      <div className={`container ${styles.twoCol} ${styles.sectionGap}`}>
        <section id="applikationen" className={`card ${styles.smallCard}`} aria-labelledby="applikationen-titel">
          <span className="eyebrow">Applikationen</span>
          <h2 id="applikationen-titel" className={styles.h2small}>
            Aufnäher – gestickt, gewebt, sublimiert
          </h2>
          <p className={styles.body15}>
            Wir produzieren individuelle Aufnäher in verschiedenen Techniken. Welche für Ihr Projekt die richtige ist,
            klären wir gern im persönlichen Gespräch.
          </p>
          <div className={styles.patches}>
            {medien.aufnaeher.map((b, i) => (
              <Foto key={b.alt} bild={b} tone={i === 1 ? "mid" : "light"} className={styles.patch} />
            ))}
          </div>
        </section>
        <section id="grafikservice" className={`card ${styles.smallCard}`} aria-labelledby="grafik-titel">
          <span className="eyebrow">Grafikservice &amp; Tipps</span>
          <h2 id="grafik-titel" className={styles.h2small}>
            Wir machen Ihre Datei druck- und stickfertig
          </h2>
          <p className={styles.body15}>
            Am besten liefern Sie Vektordaten (AI, EPS, PDF, SVG). Haben Sie nur ein JPG oder PNG? Wir zeichnen Ihr Logo
            nach – für Stickerei, Sieb- und Offsetdruck genügt oft auch eine Pixelgrafik mit 300 dpi. Für Flex- und
            Flockdruck brauchen wir eine Vektorgrafik ohne Farbverläufe in 1:1-Originalgröße.
          </p>
          <ul className={styles.list}>
            <li>Vektorformate: AI, EPS, PDF, SVG</li>
            <li>Pixelbilder: mind. 300 dpi in Originalgröße</li>
            <li>Schriften in Pfade umwandeln</li>
            <li>Farben als Pantone oder HKS angeben</li>
            <li>Vektorpfade geschlossen und ohne Überschneidungen</li>
            <li>Word, Excel und PowerPoint eignen sich nicht zur Grafikerstellung</li>
          </ul>
          <Link href="/blog/vektor-oder-pixel" className={styles.more}>
            Alle Dateiformate je Verfahren
          </Link>
        </section>
      </div>

      <div className={`container ${styles.sectionGap}`}>
        <AnwendungenChips titel="Beliebte Anwendungen" />
      </div>
    </>
  );
}
