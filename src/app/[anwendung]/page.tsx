import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AnwendungenChips } from "@/components/AnwendungenChips";
import { ExternalLink } from "@/components/ExternalLink";
import { Icon } from "@/components/Icon";
import { Foto } from "@/components/Media";
import { anwendungen, getAnwendung } from "@/data/anwendungen";
import { links, siteUrl } from "@/data/kontakt";
import { getPosts } from "@/lib/blog";
import styles from "./anwendung.module.css";

// Landingpages wie /t-shirts-bedrucken – Inhalte in src/data/anwendungen.ts
export const dynamicParams = false;

export function generateStaticParams() {
  return anwendungen.map((a) => ({ anwendung: a.slug }));
}

type Props = { params: Promise<{ anwendung: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const a = getAnwendung((await params).anwendung);
  if (!a) return {};
  return {
    title: a.seitentitel,
    description: a.beschreibung,
    alternates: { canonical: `/${a.slug}` },
    ...(a.bild?.src ? { openGraph: { images: [a.bild.src] } } : {}),
  };
}

const schritte = [
  { titel: "Textil wählen", text: "Aus dem Katalog unseres Textilpartners – oder Sie bringen Ihre eigenen Textilien mit." },
  { titel: "Motiv schicken", text: "Logo, Foto oder Namensliste einfach über das Anfrageformular hochladen." },
  { titel: "Angebot erhalten", text: "Wir empfehlen das passende Verfahren und schicken Ihnen ein Angebot." },
  { titel: "Freigabe & Produktion", text: "Nach Ihrer Freigabe veredeln wir Ihre Textilien." },
];

export default async function AnwendungPage({ params }: Props) {
  const a = getAnwendung((await params).anwendung);
  if (!a) notFound();

  const anfrage = `/kontakt?leistung=${encodeURIComponent(a.leistung)}#anfrage`;
  const posts = getPosts().filter((p) => a.blog.includes(p.slug));

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: a.fragen.map((f) => ({
      "@type": "Question",
      name: f.frage,
      acceptedAnswer: { "@type": "Answer", text: f.antwort },
    })),
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Start", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Leistungen", item: `${siteUrl}/leistungen` },
      { "@type": "ListItem", position: 3, name: a.kurz, item: `${siteUrl}/${a.slug}` },
    ],
  };

  return (
    <>
      <section className={styles.intro}>
        <nav aria-label="Brotkrümelnavigation" className={styles.crumbs}>
          <Link href="/leistungen">Leistungen</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{a.kurz}</span>
        </nav>
        <h1 className={styles.h1}>{a.titel}</h1>
        <p className={styles.lead}>{a.einleitung}</p>
        <div className="btn-row" style={{ justifyContent: "center" }}>
          <Link href={anfrage} className="btn btn--dark">
            Anfrage starten
          </Link>
          <ExternalLink href={links.textilangebot} className="btn btn--light">
            Textil aussuchen
          </ExternalLink>
        </div>
      </section>

      <div className="container">
        <section className={`card ${styles.section}`} aria-labelledby="vorteile-titel">
          <div className={a.bild?.src ? styles.split : undefined}>
            <div className={styles.stack}>
              <span className="eyebrow">{a.eyebrow}</span>
              <h2 id="vorteile-titel" className={styles.h2}>
                Das bekommen Sie bei uns
              </h2>
              <ul className={styles.checks}>
                {a.vorteile.map((v) => (
                  <li key={v}>{v}</li>
                ))}
              </ul>
            </div>
            {a.bild?.src && <Foto bild={a.bild} className={styles.image} sizes="(max-width: 900px) 100vw, 480px" priority />}
          </div>

          <div className={styles.stack}>
            <h2 className={styles.h3}>Passende Verfahren</h2>
            <div className={styles.methods}>
              {a.verfahren.map((v) => (
                <article key={v.name} className={styles.method}>
                  <h3 className={styles.methodName}>{v.name}</h3>
                  <p>{v.text}</p>
                </article>
              ))}
            </div>
            <Link href="/leistungen" className={styles.more}>
              Alle Verfahren im Detail <Icon name="arrowRight" />
            </Link>
          </div>

          <div className={styles.stack}>
            <h2 className={styles.h3}>So läuft es ab</h2>
            <ol className={styles.steps}>
              {schritte.map((s, i) => (
                <li key={s.titel} className={styles.step}>
                  <span className={styles.stepNo} aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <strong>{s.titel}</strong>
                  <p>{s.text}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className={styles.stack}>
            <h2 className={styles.h3}>Häufige Fragen</h2>
            <div className={styles.faq}>
              {a.fragen.map((f) => (
                <details key={f.frage} className={styles.faqItem}>
                  <summary>{f.frage}</summary>
                  <p>{f.antwort}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </div>

      <div className="container">
        <section className={`${styles.cta} on-dark`} aria-labelledby="cta-titel">
          <div className={styles.ctaText}>
            <h2 id="cta-titel" className={styles.ctaTitle}>
              Erzählen Sie uns von Ihrem Projekt.
            </h2>
            <p>Schicken Sie uns Motiv, Textilwunsch und Stückzahl – wir melden uns mit einem Angebot.</p>
          </div>
          <div className="btn-row">
            <Link href={anfrage} className="btn btn--white">
              Anfrage senden
            </Link>
            <a href="tel:+498961469280" className="btn btn--ghost-dark">
              <Icon name="phone" />
              +49 89 61469280
            </a>
          </div>
        </section>
      </div>

      {posts.length > 0 && (
        <section className={`container ${styles.related}`} aria-labelledby="ratgeber-titel">
          <h2 id="ratgeber-titel" className={styles.h3}>
            Ratgeber zum Thema
          </h2>
          <ul className={styles.relatedList}>
            {posts.map((p) => (
              <li key={p.slug}>
                <Link href={`/blog/${p.slug}`}>
                  {p.title} <Icon name="arrowRight" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className={`container ${styles.related}`}>
        <AnwendungenChips titel="Weitere Anwendungen" ohne={a.slug} />
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
    </>
  );
}
