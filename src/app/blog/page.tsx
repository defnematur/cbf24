import type { Metadata } from "next";
import { BlogCard, BlogGrid } from "@/components/BlogCard";
import styles from "@/components/TextPage.module.css";
import { getPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog & Tipps",
  description:
    "Wissenswertes rund um Textilveredelung: Stickprogramme, Druckverfahren und die richtige Datei für Ihr Logo.",
  alternates: { canonical: "/blog" },
};

export default function Blog() {
  const posts = getPosts();
  return (
    <>
      <section className={styles.head}>
        <span className="eyebrow">Blog &amp; Tipps</span>
        <h1 className={styles.h1}>Wissenswertes rund um Textilveredelung</h1>
      </section>
      <div className={`container ${styles.grid}`}>
        <BlogGrid>
          {posts.map((p) => (
            <BlogCard key={p.slug} post={p} headingLevel={2} />
          ))}
        </BlogGrid>
      </div>
    </>
  );
}
