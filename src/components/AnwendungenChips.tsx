import Link from "next/link";
import { anwendungen } from "@/data/anwendungen";
import styles from "./AnwendungenChips.module.css";

/** Dezente Link-Zeile zu den Landingpages (z. B. „T-Shirts bedrucken“). */
export function AnwendungenChips({ titel, ohne }: { titel: string; ohne?: string }) {
  return (
    <nav className={styles.wrap} aria-label={titel}>
      <span className="eyebrow">{titel}</span>
      <ul className={styles.chips}>
        {anwendungen
          .filter((a) => a.slug !== ohne)
          .map((a) => (
            <li key={a.slug}>
              <Link href={`/${a.slug}`} className={styles.chip}>
                {a.kurz}
              </Link>
            </li>
          ))}
      </ul>
    </nav>
  );
}
