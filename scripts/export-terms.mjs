#!/usr/bin/env node
/**
 * Extract the Finnish terms-of-service text from lib/terms.ts and
 * write three editor-friendly files to ~/Desktop/82rentals/sopimusehdot/:
 *
 *   1. sopimusehdot.md   — clean Markdown, opens in TextEdit / VS Code / etc.
 *   2. sopimusehdot.html — formatted HTML, drag into Google Docs to keep
 *                          formatting on import.
 *   3. sopimusehdot.txt  — plain text fallback for any tool.
 *
 * The user edits any of these in their preferred editor and sends the
 * updated version back to me; I sync the changes into lib/terms.ts.
 *
 *   node --experimental-strip-types scripts/export-terms.mjs
 *
 * The --experimental-strip-types flag lets Node 22+ import the
 * TypeScript source directly, no separate compile step needed.
 */

import fs from "fs";
import path from "path";
import url from "url";
import { COMPANY, TERMS_VERSION, TERMS_UPDATED, terms } from "../lib/terms.ts";

const here = path.dirname(url.fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const fi = terms.fi;

/* ---------------------------------------------------------------- *
 * Markdown
 * ---------------------------------------------------------------- */
const md = [];
md.push(`# ${fi.title}`);
md.push("");
md.push(`*${fi.intro}*`);
md.push("");
md.push("---");
md.push("");
for (const s of fi.sections) {
  md.push(`## ${s.heading}`);
  md.push("");
  md.push(s.body);
  md.push("");
}
for (const a of fi.appendices) {
  md.push(`## ${a.heading}`);
  md.push("");
  md.push(a.body);
  md.push("");
}
md.push("---");
md.push("");
md.push(`*${fi.footer}*`);

/* ---------------------------------------------------------------- *
 * HTML — clean, no inline styles. Google Docs picks up <h1>, <h2>,
 * <p>, <ul>, <li> as native styles when you drag the file into a doc.
 * ---------------------------------------------------------------- */
function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
function paragraphsToHtml(body) {
  const blocks = body.split(/\n\n+/);
  return blocks
    .map((block) => {
      const lines = block.split("\n");
      const allBullets = lines.every((l) => l.startsWith("· ") || l.trim() === "");
      if (allBullets) {
        const items = lines
          .filter((l) => l.startsWith("· "))
          .map((l) => `<li>${esc(l.slice(2))}</li>`)
          .join("\n  ");
        return `<ul>\n  ${items}\n</ul>`;
      }
      const head = lines.filter((l) => !l.startsWith("· ")).join("\n");
      const bullets = lines.filter((l) => l.startsWith("· "));
      if (bullets.length === 0) {
        return `<p>${esc(block).replace(/\n/g, "<br>")}</p>`;
      }
      const headHtml = head.trim()
        ? `<p>${esc(head).replace(/\n/g, "<br>")}</p>`
        : "";
      const ul = `<ul>\n  ${bullets
        .map((l) => `<li>${esc(l.slice(2))}</li>`)
        .join("\n  ")}\n</ul>`;
      return `${headHtml}${ul}`;
    })
    .join("\n");
}

const html = [];
html.push("<!doctype html>");
html.push('<html lang="fi"><head><meta charset="utf-8">');
html.push(`<title>${esc(fi.title)}</title>`);
html.push(
  "<style>body{font-family:Inter,Helvetica,Arial,sans-serif;max-width:760px;margin:40px auto;padding:0 24px;color:#0F172A;line-height:1.55;}h1{font-size:28px;}h2{margin-top:32px;font-size:20px;color:#0A3D62;}hr{border:0;border-top:1px solid #cbd5e1;margin:32px 0;}ul{padding-left:22px;}li{margin:4px 0;}p{margin:10px 0;}em{color:#475569;}</style>",
);
html.push("</head><body>");
html.push(`<h1>${esc(fi.title)}</h1>`);
html.push(`<p><em>${esc(fi.intro)}</em></p>`);
html.push("<hr>");
for (const s of fi.sections) {
  html.push(`<h2>${esc(s.heading)}</h2>`);
  html.push(paragraphsToHtml(s.body));
}
for (const a of fi.appendices) {
  html.push(`<h2>${esc(a.heading)}</h2>`);
  html.push(paragraphsToHtml(a.body));
}
html.push("<hr>");
html.push(`<p><em>${esc(fi.footer)}</em></p>`);
html.push("</body></html>");

/* ---------------------------------------------------------------- *
 * Plain text
 * ---------------------------------------------------------------- */
const txt = [];
txt.push(fi.title.toUpperCase());
txt.push("");
txt.push(fi.intro);
txt.push("");
txt.push("=".repeat(72));
txt.push("");
for (const s of fi.sections) {
  txt.push(s.heading.toUpperCase());
  txt.push("");
  txt.push(s.body);
  txt.push("");
  txt.push("-".repeat(72));
  txt.push("");
}
for (const a of fi.appendices) {
  txt.push(a.heading.toUpperCase());
  txt.push("");
  txt.push(a.body);
  txt.push("");
  txt.push("-".repeat(72));
  txt.push("");
}
txt.push(fi.footer);

/* ---------------------------------------------------------------- *
 * Write files
 * ---------------------------------------------------------------- */
const outDir = path.join(
  process.env.HOME || "/tmp",
  "Desktop/82rentals/sopimusehdot",
);
fs.mkdirSync(outDir, { recursive: true });
const mdPath = path.join(outDir, "sopimusehdot.md");
const htmlPath = path.join(outDir, "sopimusehdot.html");
const txtPath = path.join(outDir, "sopimusehdot.txt");

fs.writeFileSync(mdPath, md.join("\n"), "utf8");
fs.writeFileSync(htmlPath, html.join("\n"), "utf8");
fs.writeFileSync(txtPath, txt.join("\n"), "utf8");

console.log("Sopimusehdot tallennettu:");
console.log("  Markdown:", mdPath);
console.log("  HTML:    ", htmlPath);
console.log("  Plain:   ", txtPath);
console.log("");
console.log(
  `Versio ${TERMS_VERSION}, päivitetty ${TERMS_UPDATED} · ${COMPANY.name}`,
);
