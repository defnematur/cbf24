import Link from "next/link";
import { anwendungen } from "@/data/anwendungen";
import { kontakt, links } from "@/data/kontakt";
import { ExternalLink } from "./ExternalLink";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={`container ${styles.wrap}`}>
      <div className={styles.footer}>
        <div className={styles.address}>
          <span className={styles.firma}>{kontakt.firma}</span>
          <span>
            {kontakt.strasse} · {kontakt.plz} {kontakt.ort}
          </span>
          <span>
            <a href={kontakt.telefon.href}>{kontakt.telefon.anzeige}</a> ·{" "}
            <a href={`mailto:${kontakt.email}`}>{kontakt.email}</a>
          </span>
        </div>
        <nav aria-label="Fußzeile" className={styles.links}>
          <Link href="/leistungen#stickerei">Stickerei</Link>
          <Link href="/leistungen#druckerei">Druckerei</Link>
          <Link href="/kontakt">Kontakt</Link>
          <Link href="/blog">Blog</Link>
          <ExternalLink href={links.textilangebot}>Textilangebot</ExternalLink>
          <Link href="/datenschutz">Datenschutz</Link>
          <Link href="/agb">AGB</Link>
          <Link href="/impressum">Impressum</Link>
        </nav>
      </div>
      <nav aria-label="Beliebte Anwendungen" className={styles.anwendungen}>
        {anwendungen.map((a) => (
          <Link key={a.slug} href={`/${a.slug}`}>
            {a.kurz}
          </Link>
        ))}
      </nav>
    </footer>
  );
}
