import Image from "next/image";
import type { CSSProperties } from "react";
import type { Bild, Video } from "@/data/medien";
import { AutoplayVideo } from "./AutoplayVideo";
import { Icon } from "./Icon";
import styles from "./Media.module.css";

type BoxProps = {
  className?: string;
  style?: CSSProperties;
  /** Platzhalter-Beschriftung unten links statt mittig (Galerie-Stil der Vorlage) */
  labelBottom?: boolean;
  tone?: "light" | "mid";
  sizes?: string;
  priority?: boolean;
};

/** Foto aus public/media oder grauer Platzhalter mit Bildbeschreibung. */
export function Foto({
  bild,
  className = "",
  style,
  labelBottom,
  tone = "light",
  sizes = "(max-width: 640px) 100vw, 400px",
  priority,
}: BoxProps & { bild: Bild }) {
  if (bild.src) {
    return (
      <div className={`${styles.box} ${className}`} style={style}>
        <Image src={bild.src} alt={bild.alt} fill sizes={sizes} priority={priority} className={styles.img} />
      </div>
    );
  }
  return (
    <div
      className={`${styles.box} ${styles.placeholder} ${tone === "mid" ? styles.mid : ""} ${
        labelBottom ? styles.labelBottom : ""
      } ${className}`}
      style={style}
      role="img"
      aria-label={`Platzhalter: ${bild.alt}`}
    >
      {labelBottom ? `[Foto] ${bild.alt}` : `[Foto: ${bild.alt}]`}
    </div>
  );
}

/** Prozessvideo: selbst gehostet, stumm, Loop. Ohne Datei: dunkler Platzhalter mit Play-Symbol. */
export function VideoBlock({
  video,
  className = "",
  variant = "dark",
}: {
  video: Video;
  className?: string;
  variant?: "dark" | "light";
}) {
  if (video.src) {
    return (
      <div className={`${styles.box} ${className}`}>
        <AutoplayVideo
          className={styles.img}
          mp4={video.src}
          webm={video.webm}
          poster={video.poster}
          label={video.beschreibung}
        />
      </div>
    );
  }
  if (variant === "light") {
    return (
      <div className={`${styles.box} ${styles.placeholder} ${className}`} role="img" aria-label={`Platzhalter: ${video.beschreibung}`}>
        [Video: {video.beschreibung}]
      </div>
    );
  }
  return (
    <div className={`${styles.box} ${styles.video} ${className}`} role="img" aria-label={`Platzhalter: ${video.beschreibung}`}>
      <span className={styles.play}>
        <Icon name="play" size={24} />
      </span>
      <span className={styles.videoLabel}>[Video: {video.beschreibung}]</span>
    </div>
  );
}
