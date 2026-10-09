import type { Metadata } from "next";
import styles from "@/components/TextPage.module.css";
import { rechtstext } from "@/lib/rechtliches";

export const metadata: Metadata = {
  title: "Allgemeine Geschäftsbedingungen",
  description: "AGB der Fa. CBF Textildruck & Bestickung.",
  alternates: { canonical: "/agb" },
};

export default function Page() {
  return (
    <>
      <section className={styles.head}>
        <h1 className={styles.h1}>Allgemeine Geschäftsbedingungen</h1>
      </section>
      <div className={`container ${styles.article}`}>
        <div className={`card ${styles.body} ${styles.legal}`} dangerouslySetInnerHTML={{ __html: rechtstext("agb") }} />
      </div>
    </>
  );
}
