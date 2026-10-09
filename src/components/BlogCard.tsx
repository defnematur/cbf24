import Link from "next/link";
import type { Post } from "@/lib/blog";
import { Foto } from "./Media";
import styles from "./BlogCard.module.css";

export function BlogCard({ post, headingLevel = 3 }: { post: Post; headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? "h2" : "h3";
  return (
    <Link href={`/blog/${post.slug}`} className={`${styles.card} lift`}>
      <Foto bild={{ alt: post.cover ? post.title : "Titelbild", src: post.cover }} className={styles.cover} />
      <span className={styles.kategorie}>{post.kategorie}</span>
      <H className={styles.title}>{post.title}</H>
      <p className={styles.excerpt}>{post.excerpt}</p>
    </Link>
  );
}

export function BlogGrid({ children }: { children: React.ReactNode }) {
  return <div className={styles.grid}>{children}</div>;
}
