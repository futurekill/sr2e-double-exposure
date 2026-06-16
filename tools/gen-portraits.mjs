// Generate labeled placeholder portraits for each cast actor (assets/portraits).
// Swap each PNG for your final Midjourney art (keep the filename). Run AFTER
// gen-actors so it can read the names; re-run if the cast changes.
import { readdirSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { execFileSync } from "node:child_process";

mkdirSync("assets/portraits", { recursive: true });
const W = 512, H = 768;
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

let n = 0;
for (const f of readdirSync("packs-src/de-actors").filter(f => f.endsWith(".json"))) {
  const d = JSON.parse(readFileSync(`packs-src/de-actors/${f}`, "utf8"));
  const name = d.name;
  const safe = name.replace(/[^A-Za-z0-9]+/g, "_").replace(/^_|_$/g, "");
  // Wrap the label onto up to 3 lines.
  const words = name.split(" ");
  const lines = [];
  let cur = "";
  for (const w of words) { if ((cur + " " + w).trim().length > 16) { lines.push(cur.trim()); cur = w; } else cur += " " + w; }
  if (cur.trim()) lines.push(cur.trim());
  const labelY = H - 120;
  const text = lines.map((l, i) => `<text x="${W/2}" y="${labelY + i*40}" fill="#e0d4f0" font-family="sans-serif" font-size="32" font-weight="bold" text-anchor="middle">${esc(l)}</text>`).join("");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <rect width="${W}" height="${H}" fill="#15151f"/>
    <circle cx="${W/2}" cy="${H/2 - 80}" r="90" fill="#2a2a3a"/>
    <rect x="${W/2-120}" y="${H/2+20}" width="240" height="200" rx="60" fill="#2a2a3a"/>
    ${text}
    <text x="${W/2}" y="${H-50}" fill="#6f6790" font-family="sans-serif" font-size="20" text-anchor="middle">placeholder — replace with portrait</text>
  </svg>`;
  writeFileSync("/tmp/de-portrait.svg", svg);
  execFileSync("rsvg-convert", ["-o", `assets/portraits/${safe}.png`, "/tmp/de-portrait.svg"]);
  n++;
}
console.log(`wrote ${n} placeholder portraits`);
