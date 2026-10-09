"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { links } from "@/data/kontakt";
import { ExternalLink } from "./ExternalLink";
import { Icon } from "./Icon";
import styles from "./Nav.module.css";

const items = [
  { href: "/", label: "Start", match: (p: string) => p === "/" },
  { href: "/leistungen#stickerei", label: "Stickerei", match: (p: string) => p === "/leistungen" },
  { href: "/leistungen#druckerei", label: "Druckerei", match: (p: string) => p === "/leistungen" },
  { href: "/blog", label: "Blog", match: (p: string) => p === "/blog" || p.startsWith("/blog/") },
  { href: "/kontakt", label: "Kontakt", match: (p: string) => p === "/kontakt" },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={`container ${styles.header}`}>
      <Link href="/" className={styles.logo}>
        <Image
          src="/brand/logo-schwarz.png"
          alt="CBF24.DE – Textildruck & Bestickung, zur Startseite"
          width={481}
          height={285}
          priority
          className={styles.logoImg}
        />
      </Link>

      <button
        type="button"
        className={styles.menuButton}
        aria-expanded={open}
        aria-controls="hauptnavigation"
        onClick={() => setOpen((o) => !o)}
      >
        <Icon name={open ? "close" : "menu"} size={20} />
        <span className={styles.menuLabel}>{open ? "Schließen" : "Menü"}</span>
      </button>

      <div id="hauptnavigation" className={`${styles.panel} ${open ? styles.open : ""}`}>
        <nav aria-label="Hauptnavigation" className={styles.nav}>
          {items.map((item) => {
            const active = item.match(pathname);
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`${styles.link} ${active ? styles.active : ""}`}
                aria-current={active && item.href === pathname ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <ExternalLink href={links.textilangebot} className="btn btn--dark btn--sm">
          Textilangebot
        </ExternalLink>
      </div>
    </header>
  );
}
