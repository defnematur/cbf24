import Link from "next/link";
import styles from "@/components/TextPage.module.css";

export default function NotFound() {
  return (
    <section className={styles.head}>
      <span className="eyebrow">Fehler 404</span>
      <h1 className={styles.h1}>Diese Seite gibt es leider nicht.</h1>
      <div className="btn-row" style={{ justifyContent: "center" }}>
        <Link href="/" className="btn btn--dark">
          Zur Startseite
        </Link>
        <Link href="/kontakt" className="btn btn--light">
          Kontakt
        </Link>
      </div>
    </section>
  );
}
