import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

// Blogbeiträge als Markdown in content/blog/*.md. Frontmatter: title, date (JJJJ-MM-TT), kategorie, excerpt, cover?
const DIR = path.join(process.cwd(), "content/blog");

export type Post = {
  slug: string;
  title: string;
  date: string;
  kategorie: string;
  excerpt: string;
  cover?: string;
};

function read(file: string) {
  const { data, content } = matter(fs.readFileSync(path.join(DIR, file), "utf8"));
  const post: Post = {
    slug: file.replace(/\.md$/, ""),
    title: String(data.title),
    date: data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date),
    kategorie: String(data.kategorie ?? ""),
    excerpt: String(data.excerpt ?? ""),
    cover: data.cover ? String(data.cover) : undefined,
  };
  return { post, content };
}

export function getPosts(): Post[] {
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => read(f).post)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string) {
  const file = `${slug}.md`;
  if (!fs.existsSync(path.join(DIR, file))) return null;
  const { post, content } = read(file);
  return { post, html: marked.parse(content, { async: false }) };
}

export function formatDatum(iso: string) {
  return new Date(iso).toLocaleDateString("de-DE", { day: "numeric", month: "long", year: "numeric" });
}
