import type { Metadata } from "next";
import styles from "@/components/TextPage.module.css";
import { rechtstext } from "@/lib/rechtliches";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description: "Datenschutzerklärung der Fa. CBF Textildruck & Bestickung.",
  alternates: { canonical: "/datenschutz" },
};

export default function Page() {
  return (
    <>
      <section className={styles.head}>
        <h1 className={styles.h1}>Datenschutzerklärung</h1>
      </section>
      <div className={`container ${styles.article}`}>
        <div className={`card ${styles.body} ${styles.legal}`} dangerouslySetInnerHTML={{ __html: rechtstext("datenschutz") }} />
      </div>
    </>
  );
}
