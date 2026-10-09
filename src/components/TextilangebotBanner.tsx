import { links } from "@/data/kontakt";
import { ExternalLink } from "./ExternalLink";
import styles from "./TextilangebotBanner.module.css";

/** `dark`: Startseite. `light`: Kontaktseite (kürzerer Text, weiße Karte). */
export function TextilangebotBanner({ variant = "dark" }: { variant?: "dark" | "light" }) {
  if (variant === "light") {
    return (
      <section className={`${styles.banner} ${styles.light} card`} aria-labelledby="textil-light">
        <div className={styles.text}>
          <h2 id="textil-light" className={styles.titleSmall}>
            Noch kein Textil ausgesucht?
          </h2>
          <p className={styles.copyLight}>
            Im Katalog unseres Textilpartners finden Sie T-Shirts, Polos, Frottee, Winterparkas und Arbeitskleidung.
            Notieren Sie Artikelnummer, Farbe und Größen – den Rest machen wir.
          </p>
        </div>
        <div className={styles.buttons}>
          <ExternalLink href={links.textilangebot} className="btn btn--dark">
            Textilangebot öffnen
          </ExternalLink>
          <ExternalLink href={links.hakro} className="btn btn--light">
            Hakro
          </ExternalLink>
        </div>
      </section>
    );
  }

  return (
    <section className={`${styles.banner} ${styles.dark} on-dark`} aria-labelledby="textil-dark">
      <div className={styles.text}>
        <span className={styles.eyebrowDark}>Textilangebot</span>
        <h2 id="textil-dark" className={styles.title}>
          Das passende Textil zuerst – dann veredeln wir es.
        </h2>
        <p className={styles.copyDark}>
          T-Shirts, Polos, Frotteewaren, Winterparkas und Arbeitskleidung für Freizeit, Verein, Gastro und Industrie.
          Stöbern Sie im Katalog unseres Textilpartners und schicken Sie uns Ihre Auswahl – wir beraten Sie gern.
        </p>
      </div>
      <div className={styles.buttons}>
        <ExternalLink href={links.textilangebot} className="btn btn--white">
          Katalog öffnen
        </ExternalLink>
        <ExternalLink href={links.hakro} className="btn btn--ghost-dark">
          Hakro Kollektion
        </ExternalLink>
      </div>
    </section>
  );
}
