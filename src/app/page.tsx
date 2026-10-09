import Link from "next/link";
import { BlogCard, BlogGrid } from "@/components/BlogCard";
import { ExternalLink } from "@/components/ExternalLink";
import { Icon } from "@/components/Icon";
import { Foto, VideoBlock } from "@/components/Media";
import { TextilangebotBanner } from "@/components/TextilangebotBanner";
import { instagramUrl, kontakt } from "@/data/kontakt";
import { instagramPosts, instagramRasterAnzeigen, startseite } from "@/data/medien";
import { getPosts } from "@/lib/blog";
import styles from "./page.module.css";

const services = [
  { title: "Stickerei", text: "Logos und Schriften – die langlebigste Veredelung, auch industriewaschfest." },
  { title: "Druckerei", text: "Transfer-, Sieb-, Flex- und Flockdruck – vom Einzelstück bis zur Großauflage." },
  { title: "Applikationen", text: "Individuelle Aufnäher – gestickt, gewebt oder sublimiert." },
  { title: "Textilien", text: "Von Promotion über Geschenke bis zur hochwertigen Arbeitskleidung." },
];

export default function Home() {
  const posts = getPosts().slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <h1 className={styles.h1}>Ihre Ideen, hochwertig auf Stoff.</h1>
        <p className={styles.lead}>
          Wir besticken und bedrucken Textilien aller Art mit Ihrem Logo – präzise, kreativ und individuell. Für
          Handwerk, Vereine, Schulen, Promotion und Privat.
        </p>
        <div className="btn-row" style={{ justifyContent: "center" }}>
          <Link href="/kontakt" className="btn btn--dark">
            Anfrage starten
          </Link>
          <Link href="/leistungen" className="btn btn--light">
            Leistungen ansehen
          </Link>
        </div>
      </section>

      {/* Video-Bühne; die Leistungen-Leiste schwebt über ihrer Unterkante */}
      <div className="container">
        <VideoBlock video={startseite.heroVideo} className={styles.stage} />
      </div>

      {/* Leistungen-Leiste */}
      <div className={`container ${styles.stripOverlap}`}>
        <section className={`card ${styles.strip}`} aria-label="Unsere Leistungen">
          {services.map((s) => (
            <div key={s.title} className={styles.stripItem}>
              <h2 className={styles.stripTitle}>{s.title}</h2>
              <span className={styles.rule} aria-hidden="true" />
              <p className={styles.stripText}>{s.text}</p>
            </div>
          ))}
        </section>
      </div>

      {/* Stickerei / Druckerei */}
      <div className={`container ${styles.twoWays}`}>
        <Link href="/leistungen#stickerei" className={`card lift ${styles.wayCard}`}>
          <Foto bild={startseite.stickereiKarte} className={styles.wayImage} />
          <span className="eyebrow">Stickerei</span>
          <h2 className={styles.wayTitle}>Gestickt. Für Jahre gemacht.</h2>
          <p className={styles.wayText}>
            Jedes Motiv bekommt sein eigenes Stickprogramm – abgestimmt auf Stoff, Größe und Maschine.
            Standardschriften ab 10 €, Brustlogos ab 45 €.
          </p>
          <span className={styles.more}>
            Mehr zur Stickerei <Icon name="arrowRight" />
          </span>
        </Link>
        <Link href="/leistungen#druckerei" className={`card lift ${styles.wayCard}`}>
          <Foto bild={startseite.druckereiKarte} className={styles.wayImage} />
          <span className="eyebrow">Druckerei</span>
          <h2 className={styles.wayTitle}>Gedruckt. In jeder Auflage.</h2>
          <p className={styles.wayText}>
            Offset-Transfer für Fotomotive, Siebdruck ab ca. 100 Stück, Flex und Flock für Einzelstücke und kleine
            Serien – auf hellen wie dunklen Stoffen.
          </p>
          <span className={styles.more}>
            Mehr zur Druckerei <Icon name="arrowRight" />
          </span>
        </Link>
      </div>

      <div className={`container ${styles.bannerWrap}`}>
        <TextilangebotBanner />
      </div>

      {/* Instagram – statisches Raster, lädt nichts von Meta. Ein/aus: instagramRasterAnzeigen */}
      {instagramRasterAnzeigen && (
        <section className={`container ${styles.block}`} aria-labelledby="instagram-titel">
          <div className={styles.blockHead}>
            <div className="section-head">
              <span className="eyebrow">Aus der Werkstatt</span>
              <h2 id="instagram-titel" className="section-title">
                Neueste Arbeiten auf Instagram
              </h2>
            </div>
            <ExternalLink href={instagramUrl()} className="btn btn--light btn--sm" icon={false}>
              <Icon name="instagram" />@{kontakt.instagramHandle ?? "[INSTAGRAM-HANDLE]"} folgen
            </ExternalLink>
          </div>
          <div className={styles.instaGrid}>
            {instagramPosts.map((p, i) =>
              p.href ? (
                <ExternalLink key={i} href={p.href} icon={false}>
                  <Foto bild={p} className={styles.instaItem} sizes="(max-width: 640px) 50vw, 280px" />
                </ExternalLink>
              ) : (
                <Foto key={i} bild={p} className={styles.instaItem} tone={i % 2 ? "mid" : "light"} />
              ),
            )}
          </div>
        </section>
      )}

      {/* Blog */}
      <section className={`container ${styles.block}`} aria-labelledby="blog-titel">
        <div className={styles.blockHead}>
          <div className="section-head">
            <span className="eyebrow">Blog &amp; Tipps</span>
            <h2 id="blog-titel" className="section-title">
              Wissenswertes rund um Textilveredelung
            </h2>
          </div>
          <Link href="/blog" className={styles.more}>
            Alle Beiträge <Icon name="arrowRight" />
          </Link>
        </div>
        <BlogGrid>
          {posts.map((p) => (
            <BlogCard key={p.slug} post={p} />
          ))}
        </BlogGrid>
      </section>
    </>
  );
}
