"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { kontakt } from "@/data/kontakt";
import { ExternalLink } from "./ExternalLink";
import styles from "./MapEmbed.module.css";

const SPEICHER_KEY = "cbf-karte-erlaubt";

// Zwei-Klick-Lösung: Google Maps wird erst nach ausdrücklicher Zustimmung geladen.
export function MapEmbed() {
  const [erlaubt, setErlaubt] = useState(false);
  const [merken, setMerken] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(SPEICHER_KEY) === "ja") setErlaubt(true);
    } catch {
      // Speicher nicht verfügbar – Zustimmung gilt dann nur für diesen Besuch
    }
  }, []);

  function laden() {
    if (merken) {
      try {
        localStorage.setItem(SPEICHER_KEY, "ja");
      } catch {}
    }
    setErlaubt(true);
  }

  const adresse = `${kontakt.strasse}, ${kontakt.plz} ${kontakt.ort}`;

  return (
    <div className={styles.map}>
      {erlaubt ? (
        <iframe
          className={styles.frame}
          src={kontakt.mapsEmbedUrl}
          title={`Karte: ${adresse}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <div className={styles.consent}>
          <strong className={styles.address}>{adresse}</strong>
          <p className={styles.note}>
            Beim Anzeigen der Karte werden Daten (u. a. Ihre IP-Adresse) an Google übertragen. Mehr dazu in der{" "}
            <Link href="/datenschutz">Datenschutzerklärung</Link>.
          </p>
          <button type="button" className="btn btn--dark btn--sm" onClick={laden}>
            Karte anzeigen
          </button>
          <label className={styles.remember}>
            <input type="checkbox" checked={merken} onChange={(e) => setMerken(e.target.checked)} />
            Karte künftig automatisch anzeigen
          </label>
        </div>
      )}
      <ExternalLink href={kontakt.routeUrl} className={`btn btn--white btn--sm ${styles.route}`}>
        Route planen
      </ExternalLink>
    </div>
  );
}
