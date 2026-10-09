import type { Metadata } from "next";
import styles from "@/components/TextPage.module.css";
import { rechtstext } from "@/lib/rechtliches";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum der Fa. CBF Textildruck & Bestickung, Oberhaching.",
  alternates: { canonical: "/impressum" },
};

export default function Page() {
  return (
    <>
      <section className={styles.head}>
        <h1 className={styles.h1}>Impressum</h1>
      </section>
      <div className={`container ${styles.article}`}>
        <div className={`card ${styles.body} ${styles.legal}`} dangerouslySetInnerHTML={{ __html: rechtstext("impressum") }} />
      </div>
    </>
  );
}
