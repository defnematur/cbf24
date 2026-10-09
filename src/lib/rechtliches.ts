import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";

// Rechtstexte als Markdown in content/rechtliches/ (Quelle: docs/*.md, vom Inhaber geliefert).
export function rechtstext(name: "datenschutz" | "agb" | "impressum") {
  const md = fs.readFileSync(path.join(process.cwd(), "content/rechtliches", `${name}.md`), "utf8");
  return marked.parse(md, { async: false });
}
