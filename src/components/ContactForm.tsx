"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { formatGroesse, LEISTUNGEN, MAX_DATEI_MB, pruefeAnfrage, pruefeDatei, type Fehler } from "@/lib/anfrage";
import styles from "./ContactForm.module.css";

type Status = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [fehler, setFehler] = useState<Fehler>({});
  const [status, setStatus] = useState<Status>("idle");
  const dateiRef = useRef<HTMLInputElement>(null);
  const [datei, setDatei] = useState<{ name: string; size: number } | null>(null);
  const [ziehen, setZiehen] = useState(false);

  function dateiGewaehlt(input: HTMLInputElement) {
    const f = input.files?.[0];
    setDatei(f ? { name: f.name, size: f.size } : null);
    setFehler(({ motiv: _, ...rest }) => (f && pruefeDatei(f) ? { ...rest, motiv: pruefeDatei(f) } : rest));
  }

  function dateiEntfernen() {
    if (dateiRef.current) dateiRef.current.value = "";
    setDatei(null);
    setFehler(({ motiv: _, ...rest }) => rest);
    dateiRef.current?.focus();
  }

  // Vorauswahl über ?leistung=… (Links von /leistungen)
  useEffect(() => {
    const wunsch = new URLSearchParams(window.location.search).get("leistung");
    const select = formRef.current?.elements.namedItem("leistung");
    if (wunsch && select instanceof HTMLSelectElement && LEISTUNGEN.includes(wunsch)) select.value = wunsch;
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot: Bots füllen das versteckte Feld aus – stillschweigend „Erfolg“ melden
    if (data.get("_gotcha")) {
      setStatus("success");
      return;
    }

    const neu = pruefeAnfrage(data);
    setFehler(neu);
    const erstes = Object.keys(neu)[0];
    if (erstes) {
      (form.elements.namedItem(erstes) as HTMLElement | null)?.focus();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/anfrage", { method: "POST", body: data });
      if (res.ok) {
        form.reset();
        setDatei(null);
        setStatus("success");
        return;
      }
      if (res.status === 413) {
        setFehler({ motiv: `Die Datei ist zu groß (max. ${MAX_DATEI_MB} MB).` });
        setStatus("idle");
        return;
      }
      const body = (await res.json().catch(() => null)) as { fehler?: Fehler | string } | null;
      if (res.status === 422 && body && typeof body.fehler === "object") {
        setFehler(body.fehler);
        setStatus("idle");
        return;
      }
      setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className={`card ${styles.form}`} role="status" aria-live="polite">
        <h2 className={styles.title}>Vielen Dank für Ihre Anfrage!</h2>
        <p className={styles.successText}>
          Wir haben Ihre Nachricht erhalten und melden uns so schnell wie möglich bei Ihnen.
        </p>
        <button type="button" className="btn btn--light btn--sm" onClick={() => setStatus("idle")}>
          Weitere Anfrage senden
        </button>
      </div>
    );
  }

  const feld = (name: keyof Fehler) => ({
    "aria-invalid": fehler[name] ? true : undefined,
    "aria-describedby": fehler[name] ? `${name}-fehler` : undefined,
  });
  const meldung = (name: keyof Fehler) =>
    fehler[name] ? (
      <span id={`${name}-fehler`} className={styles.error}>
        {fehler[name]}
      </span>
    ) : null;

  return (
    <form
      ref={formRef}
      id="anfrage"
      className={`card ${styles.form}`}
      onSubmit={onSubmit}
      noValidate
      encType="multipart/form-data"
      aria-labelledby="anfrage-titel"
    >
      <h2 id="anfrage-titel" className={styles.title}>
        Anfrage senden
      </h2>

      <div className={styles.row}>
        <label className={styles.label}>
          Name *
          <input className={styles.input} type="text" name="name" autoComplete="name" required {...feld("name")} />
          {meldung("name")}
        </label>
        <label className={styles.label}>
          Firma / Verein
          <input className={styles.input} type="text" name="firma" autoComplete="organization" />
        </label>
      </div>

      <div className={styles.row}>
        <label className={styles.label}>
          E-Mail *
          <input className={styles.input} type="email" name="email" autoComplete="email" required {...feld("email")} />
          {meldung("email")}
        </label>
        <label className={styles.label}>
          Telefon
          <input className={styles.input} type="tel" name="telefon" autoComplete="tel" />
        </label>
      </div>

      <div className={styles.row}>
        <label className={styles.label}>
          Leistung
          <select className={styles.input} name="leistung" defaultValue={LEISTUNGEN[0]}>
            {LEISTUNGEN.map((l) => (
              <option key={l}>{l}</option>
            ))}
          </select>
        </label>
        <label className={styles.label}>
          Stückzahl (ca.)
          <input className={styles.input} type="number" name="stueckzahl" min={1} inputMode="numeric" />
        </label>
      </div>

      <label className={styles.label}>
        Nachricht
        <textarea
          className={styles.textarea}
          name="nachricht"
          rows={5}
          placeholder="Was soll veredelt werden? Welches Textil, welche Position, bis wann?"
        />
      </label>

      <div className={styles.label}>
        <span id="motiv-label">Logo / Motiv anhängen (AI, EPS, PDF, SVG, PNG, JPG, TIFF, BMP, CDR; max. {MAX_DATEI_MB} MB)</span>
        <div
          className={`${styles.fileBox} ${ziehen ? styles.fileBoxDrag : ""} ${fehler.motiv ? styles.fileBoxInvalid : ""}`}
          onDragOver={(e) => {
            e.preventDefault();
            setZiehen(true);
          }}
          onDragLeave={() => setZiehen(false)}
          onDrop={(e) => {
            e.preventDefault();
            setZiehen(false);
            const input = dateiRef.current;
            if (input && e.dataTransfer.files.length) {
              input.files = e.dataTransfer.files;
              dateiGewaehlt(input);
            }
          }}
        >
          <label className={`btn btn--light btn--sm ${styles.fileButton}`}>
            <input
              ref={dateiRef}
              className={styles.fileInput}
              type="file"
              name="motiv"
              accept=".ai,.eps,.pdf,.svg,.png,.jpg,.jpeg,.tif,.tiff,.bmp,.cdr"
              aria-labelledby="motiv-label"
              onChange={(e) => dateiGewaehlt(e.currentTarget)}
              {...feld("motiv")}
            />
            {datei ? "Andere Datei" : "Datei auswählen"}
          </label>
          <span className={styles.fileName} aria-live="polite">
            {datei ? (
              <>
                <span className={styles.fileNameText}>{datei.name}</span>
                <span className={styles.fileSize}>{formatGroesse(datei.size)}</span>
              </>
            ) : (
              <span className={styles.fileHint}>Keine Datei ausgewählt – oder hierher ziehen</span>
            )}
          </span>
          {datei && (
            <button type="button" className={styles.fileRemove} onClick={dateiEntfernen}>
              Entfernen
            </button>
          )}
        </div>
        {meldung("motiv")}
      </div>

      {/* Honeypot – für Menschen unsichtbar */}
      <div className={styles.honeypot} aria-hidden="true">
        <label>
          Bitte leer lassen
          <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className={styles.consentWrap}>
        <label className={styles.consent}>
          <input type="checkbox" name="datenschutz" value="ja" required {...feld("datenschutz")} />
          <span>
            Ich habe die <Link href="/datenschutz">Datenschutzerklärung</Link> gelesen und bin mit der Verarbeitung
            meiner Daten zur Bearbeitung der Anfrage einverstanden. *
          </span>
        </label>
        {meldung("datenschutz")}
      </div>

      {status === "error" && (
        <p className={styles.formError} role="alert">
          Ihre Anfrage konnte leider nicht gesendet werden. Bitte versuchen Sie es erneut oder schreiben Sie uns direkt
          an <a href="mailto:info@cbf24.de">info@cbf24.de</a>.
        </p>
      )}

      <button type="submit" className={`btn btn--dark ${styles.submit}`} disabled={status === "sending"}>
        {status === "sending" ? "Wird gesendet …" : "Anfrage absenden"}
      </button>
      <span className={styles.required}>* Pflichtfeld</span>
    </form>
  );
}
