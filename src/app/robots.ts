import type { MetadataRoute } from "next";
import { noindex, siteUrl } from "@/data/kontakt";

export default function robots(): MetadataRoute.Robots {
  if (noindex) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
