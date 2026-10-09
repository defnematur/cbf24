"use client";

import { useEffect, useState } from "react";
import styles from "./SectionTabs.module.css";

/** Anker-Tabs; der aktive Tab folgt dem sichtbaren Abschnitt. */
export function SectionTabs({ tabs }: { tabs: { id: string; label: string }[] }) {
  const [active, setActive] = useState(tabs[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    tabs.forEach((t) => {
      const el = document.getElementById(t.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [tabs]);

  return (
    <nav aria-label="Leistungen" className={styles.tabs}>
      {tabs.map((t) => (
        <a
          key={t.id}
          href={`#${t.id}`}
          className={`${styles.tab} ${active === t.id ? styles.active : ""}`}
          aria-current={active === t.id ? "true" : undefined}
          onClick={() => setActive(t.id)}
        >
          {t.label}
        </a>
      ))}
    </nav>
  );
}
