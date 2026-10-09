import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/Icon";
import styles from "@/components/TextPage.module.css";
import { formatDatum, getPost, getPosts } from "@/lib/blog";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const data = getPost(slug);
  if (!data) return {};
  return {
    title: data.post.title,
    description: data.post.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: { type: "article", publishedTime: data.post.date },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = getPost(slug);
  if (!data) notFound();
  const { post, html } = data;

  return (
    <article>
      <header className={styles.head}>
        <span className="eyebrow">{post.kategorie}</span>
        <h1 className={styles.h1}>{post.title}</h1>
        <time className={styles.meta} dateTime={post.date}>
          {formatDatum(post.date)}
        </time>
      </header>
      <div className={`container ${styles.article}`}>
        <div className={`card ${styles.body}`} dangerouslySetInnerHTML={{ __html: html }} />
        <Link href="/blog" className={styles.back}>
          Alle Beiträge <Icon name="arrowRight" />
        </Link>
      </div>
    </article>
  );
}
