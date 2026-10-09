import type { Metadata } from "next";
import styles from "@/components/TextPage.module.css";

export const metadata: Metadata = {
  title: "Allgemeine Geschäftsbedingungen",
  description: "AGB der Fa. CBF Textildruck & Bestickung.",
  alternates: { canonical: "/agb" },
};

// TODO: Text von cbf24.de/AGB-s übernehmen und vom Inhaber bestätigen lassen.
export default function Page() {
  return (
    <>
      <section className={styles.head}>
        <h1 className={styles.h1}>Allgemeine Geschäftsbedingungen</h1>
      </section>
      <div className={`container ${styles.article}`}>
        <div className={`card ${styles.body}`}>
          <p>[TEXT FOLGT – Allgemeine Geschäftsbedingungen von cbf24.de/AGB-s übernehmen und vom Inhaber bestätigen lassen]</p>
        </div>
      </div>
    </>
  );
}
