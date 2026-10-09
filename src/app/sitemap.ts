import type { MetadataRoute } from "next";
import { anwendungen } from "@/data/anwendungen";
import { siteUrl } from "@/data/kontakt";
import { getPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const seiten = ["", "/leistungen", "/kontakt", "/blog", "/impressum", "/datenschutz", "/agb"];
  return [
    ...seiten.map((p) => ({ url: `${siteUrl}${p}` })),
    ...anwendungen.map((a) => ({ url: `${siteUrl}/${a.slug}` })),
    ...getPosts().map((p) => ({ url: `${siteUrl}/blog/${p.slug}`, lastModified: p.date })),
  ];
}
