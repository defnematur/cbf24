"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import styles from "./AutoplayVideo.module.css";

// Stummes Loop-Video: spielt erst, wenn es im Bild ist, und gar nicht bei „Bewegung reduzieren“
// (dann bleibt das Posterbild stehen). Blockiert der Browser Autoplay (z. B. iPhone im Stromsparmodus),
// erscheint ein Play-Button zum Antippen.
export function AutoplayVideo({
  mp4,
  webm,
  poster,
  label,
  className,
}: {
  mp4: string;
  webm?: string;
  poster?: string;
  label: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [blockiert, setBlockiert] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    // iOS erlaubt Autoplay nur stumm und inline – als Eigenschaft UND Attribut setzen
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");

    const ruhig = window.matchMedia("(prefers-reduced-motion: reduce)");
    const observer = new IntersectionObserver(
      ([eintrag]) => {
        if (eintrag.isIntersecting && !ruhig.matches) {
          video.play().then(
            () => setBlockiert(false),
            () => setBlockiert(true),
          );
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  function abspielen() {
    ref.current?.play().then(
      () => setBlockiert(false),
      () => {},
    );
  }

  return (
    <>
      <video
        ref={ref}
        className={className}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={label}
      >
        {/* MP4 (H.264) zuerst: läuft überall, auch auf iPhones; WebM als kleinere Alternative */}
        <source src={mp4} type="video/mp4" />
        {webm && <source src={webm} type="video/webm" />}
      </video>
      {blockiert && (
        <button type="button" className={styles.play} onClick={abspielen} aria-label={`Video abspielen: ${label}`}>
          <Icon name="play" size={22} />
        </button>
      )}
    </>
  );
}
