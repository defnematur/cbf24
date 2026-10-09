"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { kontakt } from "@/data/kontakt";
import { Icon } from "./Icon";
import styles from "./ChatButton.module.css";

// Voiceflow-Chat (Phase 2): wird erst nach Klick auf „Chat starten“ geladen (DSGVO, Zwei-Klick-Lösung).
// Ohne NEXT_PUBLIC_VOICEFLOW_PROJECT_ID bleibt es bei WhatsApp, Anruf und Anfrageformular.
const VF_PROJECT_ID = process.env.NEXT_PUBLIC_VOICEFLOW_PROJECT_ID;
const VF_BUNDLE = "https://cdn.voiceflow.com/widget-next/bundle.mjs";
const VF_RUNTIME = "https://general-runtime.voiceflow.com";
const SPEICHER_KEY = "cbf-chat-erlaubt";

type VoiceflowChat = { load: (config: object) => unknown; open: () => void };
declare global {
  interface Window {
    voiceflow?: { chat: VoiceflowChat };
  }
}

function voiceflowStarten(): Promise<void> {
  return new Promise((resolve, reject) => {
    const oeffnen = () => {
      const chat = window.voiceflow!.chat;
      Promise.resolve(
        chat.load({
          verify: { projectID: VF_PROJECT_ID },
          url: VF_RUNTIME,
          versionID: "production",
        }),
      )
        .then(() => chat.open())
        .then(resolve, reject);
    };
    if (window.voiceflow?.chat) return oeffnen();
    const script = document.createElement("script");
    script.src = VF_BUNDLE;
    script.type = "text/javascript";
    script.onload = oeffnen;
    script.onerror = () => reject(new Error("Voiceflow konnte nicht geladen werden"));
    document.body.appendChild(script);
  });
}

export function ChatButton() {
  const [open, setOpen] = useState(false);
  const [erlaubt, setErlaubt] = useState(false);
  const [status, setStatus] = useState<"aus" | "laedt" | "aktiv" | "fehler">("aus");

  useEffect(() => {
    try {
      setErlaubt(localStorage.getItem(SPEICHER_KEY) === "ja");
    } catch {}
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  async function chatStarten() {
    try {
      localStorage.setItem(SPEICHER_KEY, "ja");
    } catch {}
    setErlaubt(true);
    setStatus("laedt");
    try {
      await voiceflowStarten();
      setOpen(false);
      setStatus("aktiv"); // ab jetzt übernimmt der Voiceflow-Button
    } catch {
      setStatus("fehler");
      setOpen(true);
    }
  }

  // Voiceflow läuft – eigener Button wird ausgeblendet, damit nicht zwei Chat-Buttons sichtbar sind
  if (status === "aktiv") return null;

  return (
    <>
      {open && (
        <div id="chat-panel" className={styles.panel} role="dialog" aria-label="Kontakt aufnehmen">
          <span className={styles.title}>Fragen? Schreiben Sie uns.</span>
          <p className={styles.bubble}>
            Wir helfen bei Fragen zu Stickerei, Druck, Preisen und Lieferzeiten. Was möchten Sie veredeln?
          </p>
          <div className={styles.actions}>
            {VF_PROJECT_ID && (
              <>
                <button
                  type="button"
                  className="btn btn--dark btn--sm"
                  onClick={chatStarten}
                  disabled={status === "laedt"}
                >
                  <Icon name="chat" />
                  {status === "laedt" ? "Chat wird geladen …" : "Chat mit dem Assistenten starten"}
                </button>
                {!erlaubt && (
                  <p className={styles.note}>
                    Beim Start werden Ihre Chat-Eingaben an unseren Dienstleister Voiceflow übertragen. Mehr in der{" "}
                    <Link href="/datenschutz" onClick={() => setOpen(false)}>
                      Datenschutzerklärung
                    </Link>
                    .
                  </p>
                )}
                {status === "fehler" && (
                  <p className={styles.note} role="alert">
                    Der Chat konnte leider nicht geladen werden. Schreiben Sie uns gern per WhatsApp oder über das
                    Anfrageformular.
                  </p>
                )}
              </>
            )}
            <a
              className={`btn ${VF_PROJECT_ID ? "btn--light" : "btn--dark"} btn--sm`}
              href={kontakt.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
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
        onClick={() => {
          // Wer dem Chat schon zugestimmt hat, landet direkt im Voiceflow-Chat
          if (!open && erlaubt && VF_PROJECT_ID) chatStarten();
          else setOpen((o) => !o);
        }}
      >
        <Icon name={open ? "close" : "chat"} size={26} />
      </button>
    </>
  );
}
