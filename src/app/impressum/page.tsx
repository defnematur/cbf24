import type { Metadata } from "next";
import styles from "@/components/TextPage.module.css";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum der Fa. CBF Textildruck & Bestickung, Oberhaching.",
  alternates: { canonical: "/impressum" },
};

// TODO: Text von cbf24.de übernehmen und vom Inhaber bestätigen lassen.
export default function Page() {
  return (
    <>
      <section className={styles.head}>
        <h1 className={styles.h1}>Impressum</h1>
      </section>
      <div className={`container ${styles.article}`}>
        <div className={`card ${styles.body}`}>
          <p>[TEXT FOLGT – Impressum von cbf24.de übernehmen und vom Inhaber bestätigen lassen]</p>
        </div>
      </div>
    </>
  );
}
