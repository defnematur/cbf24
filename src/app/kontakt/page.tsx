import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { ExternalLink } from "@/components/ExternalLink";
import { Icon } from "@/components/Icon";
import { MapEmbed } from "@/components/MapEmbed";
import { Platzhalter } from "@/components/Platzhalter";
import { TextilangebotBanner } from "@/components/TextilangebotBanner";
import { instagramUrl, kontakt } from "@/data/kontakt";
import styles from "./kontakt.module.css";

export const metadata: Metadata = {
  title: "Kontakt & Anfrage",
  description:
    "Anfrage für Stickerei und Textildruck in Oberhaching bei München: Motiv, Textilwunsch und Stückzahl schicken – per Formular, Telefon oder WhatsApp.",
  alternates: { canonical: "/kontakt" },
};

export default function Kontakt() {
  return (
    <>
      <section className={styles.intro}>
        <span className="eyebrow">Kontakt</span>
        <h1 className={styles.h1}>Erzählen Sie uns von Ihrem Projekt.</h1>
        <p className={styles.lead}>
          Schicken Sie uns Motiv, Textilwunsch und Stückzahl – Sie bekommen innerhalb von{" "}
          <Platzhalter wert={kontakt.angebotWerktage} label="X" /> Werktagen ein Angebot. Oder rufen Sie einfach an.
        </p>
      </section>

      <div className={`container ${styles.grid}`}>
        <ContactForm />

        <div className={styles.side}>
          <address className={`${styles.info} on-dark`}>
            <h2 className={styles.infoTitle}>{kontakt.firma}</h2>
            <div className={styles.infoRow}>
              <Icon name="pin" size={20} />
              <div className={styles.infoLines}>
                <span>{kontakt.strasse}</span>
                <span>
                  {kontakt.plz} {kontakt.ort}
                </span>
                <span className={styles.infoMuted}>{kontakt.ortZusatz}</span>
              </div>
            </div>
            <div className={styles.infoRow}>
              <Icon name="phone" size={20} />
              <div className={styles.infoLines}>
                <a href={kontakt.telefon.href}>{kontakt.telefon.anzeige}</a>
                <a href={kontakt.mobil.href}>Mobil {kontakt.mobil.anzeige}</a>
                <span className={styles.infoMuted}>Fax {kontakt.fax}</span>
              </div>
            </div>
            <div className={styles.infoRow}>
              <Icon name="mail" size={20} />
              <a href={`mailto:${kontakt.email}`}>{kontakt.email}</a>
            </div>
            <div className={styles.infoRow}>
              <Icon name="clock" size={20} />
              <div className={styles.infoLines}>
                <span>
                  Mo–Fr <Platzhalter wert={kontakt.oeffnungszeiten} label="ÖFFNUNGSZEITEN" />
                </span>
                <span className={styles.infoMuted}>Termine außerhalb nach Absprache</span>
              </div>
            </div>
            <div className="btn-row">
              <ExternalLink href={instagramUrl()} className="btn btn--ghost-dark btn--sm" icon={false}>
                <Icon name="instagram" />
                Instagram
              </ExternalLink>
              <ExternalLink href={kontakt.whatsapp} className="btn btn--ghost-dark btn--sm" icon={false}>
                <Icon name="chat" />
                WhatsApp
              </ExternalLink>
            </div>
          </address>

          <MapEmbed />
        </div>
      </div>

      <div className={`container ${styles.banner}`}>
        <TextilangebotBanner variant="light" />
      </div>
    </>
  );
}
