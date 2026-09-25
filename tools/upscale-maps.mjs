#!/usr/bin/env node
/**
 * Upscale a battle map to Foundry-scale and write it back as WebP.
 *
 *   node tools/upscale-maps.mjs           # report
 *   node tools/upscale-maps.mjs --fix     # rewrite the .webp files
 *
 * WHY NOT REGENERATE. The image generator exposes no size parameter and cannot
 * produce 8K natively — it lands around 1792x1024, which is exactly what these
 * maps already are. Re-rolling them would risk two good top-down maps for zero
 * resolution gain, so this enlarges what we have instead.
 *
 * WHY IT IS STILL WORTH DOING. The scenes were mis-scaled, not just small. At
 * the estate's 100 px = 1 m convention a 1792 px map is 17.9 m across, while
 * both maps plainly depict 60-90 m of ground: a semi-trailer rendered ~3.5 m
 * long, a four-lane road ~2 m wide. Enlarging to 8200 px makes the scene 82 m
 * across, which matches what the art actually shows — so this fixes the grid
 * scale as much as the resolution.
 *
 * Dimensions are whole multiples of the grid so cells land exactly on the map
 * edges. 8200x4700 is a 0.3% stretch off the source's 1.75 aspect — invisible,
 * and worth it for a grid that lines up.
 *
 * Enlarging runs in 2x Lanczos steps rather than one 4.6x jump: repeated
 * doubling holds edges together far better, and a light unsharp between steps
 * counters the softening. This adds no detail that was not there — it cannot —
 * it just stops the enlargement turning to mush.
 */
import { statSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join } from "node:path";

const FIX = process.argv.includes("--fix");
const DIR = "assets/scenes";
const TARGET_W = 8200, TARGET_H = 4700;

// Only the real painted maps. The other five are SVG placeholders reading
// "replace with final art" — enlarging those would just produce bigger text.
const MAPS = ["DE_1_Digging_Their_Own_Graves", "DE_2_Six_Feet_Under"];

const dims = (f) => execFileSync("magick", [f, "-format", "%wx%h", "info:"], { encoding: "utf8" }).trim();
const kb = (f) => Math.round(statSync(f).size / 1024);

const rows = [];
for (const name of MAPS) {
  const src = join(DIR, `${name}.webp`);
  if (!existsSync(src)) { console.log(`  missing: ${src}`); continue; }

  const before = dims(src), beforeKb = kb(src);
  const [w] = before.split("x").map(Number);

  if (FIX && w < TARGET_W) {
    // Double with Lanczos until one more double would overshoot, then land exactly.
    const args = [src];
    for (let cur = w; cur * 2 <= TARGET_W; cur *= 2) {
      args.push("-filter", "Lanczos", "-resize", "200%", "-unsharp", "0x0.6+0.6+0.02");
    }
    args.push("-filter", "Lanczos", "-resize", `${TARGET_W}x${TARGET_H}!`,
              "-unsharp", "0x0.8+0.5+0.02", "-quality", "88", "-define", "webp:method=6", src);
    execFileSync("magick", args);
  }

  rows.push({ name, before, beforeKb, after: dims(src), afterKb: kb(src) });
}

const pad = (s, n) => String(s).padEnd(n);
console.log(`\n${FIX ? "UPSCALED" : "WOULD UPSCALE"} ${rows.length} map(s) -> ${TARGET_W}x${TARGET_H} (${TARGET_W / 100} x ${TARGET_H / 100} m at 100 px/m)\n`);
console.log(`${pad("map", 36)}${pad("before", 14)}${pad("", 8)}after`);
for (const r of rows) {
  console.log(`${pad(r.name, 36)}${pad(r.before, 14)}${pad(r.beforeKb + "K", 8)}${pad(r.after, 12)}${r.afterKb}K`);
}
if (!FIX) console.log("\nRe-run with --fix to write.");
