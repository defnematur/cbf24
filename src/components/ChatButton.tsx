"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { kontakt } from "@/data/kontakt";
import { Icon } from "./Icon";
import styles from "./ChatButton.module.css";

// Phase 1: Kein KI-Assistent – das Panel bietet WhatsApp, Anruf und das Anfrageformular an.
// Phase 2 (KI-Assistent mit FAQ/Preisdaten) braucht Datenschutzhinweis und Einwilligung.
export function ChatButton() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      {open && (
        <div id="chat-panel" className={styles.panel} role="dialog" aria-label="Kontakt aufnehmen">
          <span className={styles.title}>Fragen? Schreiben Sie uns.</span>
          <p className={styles.bubble}>
            Wir helfen bei Fragen zu Stickerei, Druck, Preisen und Lieferzeiten. Was möchten Sie veredeln?
          </p>
          <div className={styles.actions}>
            <a className="btn btn--dark btn--sm" href={kontakt.whatsapp} target="_blank" rel="noopener noreferrer">
              Per WhatsApp schreiben
              <span className="sr-only"> (öffnet in neuem Tab)</span>
            </a>
            <a className="btn btn--light btn--sm" href={kontakt.telefon.href}>
              <Icon name="phone" />
              {kontakt.telefon.anzeige}
            </a>
            <Link className="btn btn--light btn--sm" href="/kontakt#anfrage" onClick={() => setOpen(false)}>
              Anfrage senden
            </Link>
          </div>
        </div>
      )}
      <button
        type="button"
        className={styles.button}
        aria-label={open ? "Chat schließen" : "Chat öffnen"}
        aria-expanded={open}
        aria-controls="chat-panel"
        onClick={() => setOpen((o) => !o)}
      >
        <Icon name={open ? "close" : "chat"} size={26} />
      </button>
    </>
  );
}
