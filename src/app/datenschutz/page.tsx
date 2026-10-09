import type { Metadata } from "next";
import styles from "@/components/TextPage.module.css";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description: "Datenschutzerklärung der Fa. CBF Textildruck & Bestickung.",
  alternates: { canonical: "/datenschutz" },
};

// TODO: Text von cbf24.de/DATENSCHUTZ übernehmen und vom Inhaber bestätigen lassen.
export default function Page() {
  return (
    <>
      <section className={styles.head}>
        <h1 className={styles.h1}>Datenschutzerklärung</h1>
      </section>
      <div className={`container ${styles.article}`}>
        <div className={`card ${styles.body}`}>
          <p>[TEXT FOLGT – Datenschutzerklärung von cbf24.de/DATENSCHUTZ übernehmen und vom Inhaber bestätigen lassen]</p>
        </div>
      </div>
    </>
  );
}
