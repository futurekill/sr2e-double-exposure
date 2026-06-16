# Art Prompts — Double Exposure

Ready-to-paste **Midjourney** prompts for the cast portraits and scene maps.
I can't generate images directly; these are written for you to run in Midjourney
(or any compatible generator). Descriptions are original, built from the cast
stat blocks and scene notes in this module.

## How to use

1. **Pick a consistent look.** Generate one portrait you like, then reuse it as
   a style reference (`--sref <url>`) on the rest so the cast feels like one set.
2. **Aspect ratios:**
   - Character portraits → `--ar 2:3` (sheet image). For square token art, also
     render `--ar 1:1`.
   - Scene maps → `--ar 4:3` to match the placeholder scenes (1600×1200).
3. **Style suffix.** For the classic-rulebook look (gritty black-and-white
   pen-and-ink comic illustration, *not* photoreal), append this to every
   portrait prompt:
   `black-and-white ink illustration, gritty cyberpunk RPG sourcebook art, bold inked linework, heavy crosshatching and stippling, high-contrast pen and ink, dramatic black shadows, hand-drawn graphic-novel style, monochrome --no photo, photorealistic, 3d render, color, smooth shading --v 6 --ar 2:3`
   - The `--no photo, photorealistic, 3d render` part is what kills the photo
     look; the "ink / crosshatching / pen and ink / hand-drawn" words pull it
     toward illustration. Don't use `--style raw` here — it nudges toward realism.
   - Want **colour** illustration instead of B&W? Drop `monochrome` and `color`
     from the `--no` list. Want a cleaner, more anime-leaning line style? Try
     `--niji 6` instead of `--v 6`.
4. **Drop into Foundry.** The cast already points at
   `assets/portraits/<Name>.png` and the scenes at `assets/scenes/<Scene>.png`
   (the current placeholders). **Save your final art over those exact filenames**
   (keep the `.png` name) and Foundry picks it up automatically — no rebuild, no
   re-pointing. If you'd rather use `.webp`, save it and update the actor image /
   token texture / scene background path to match.

> Midjourney is great for evocative art but not grid-accurate tactical maps.
> For true VTT battlemaps consider **Dungeon Alchemist**, **Inkarnate**, or
> **Dungeondraft**; the map prompts below still work for top-down art you can
> drop a grid over in Foundry.

---

## Cast portraits

**Jonathan Tung** — `portrait of a charismatic Asian man in his 40s, immaculate charcoal suit, warm reassuring smile that never quite reaches the eyes, soft corporate-PR confidence, a faint unsettling wrongness beneath the charm, standing in a sunlit relief-camp garden`

**Hive Queen** — `monstrous four-meter hybrid of metahuman and giant ant, bloated chitinous abdomen, humanoid torso and face fused with insectoid mandibles and compound eyes, glistening dark exoskeleton, looming in a cavernous hive chamber lit by sickly bioluminescence, body horror, awe and dread`

**Special Agent Simon Juárez** — `weary hard-edged UCAS FBI agent, late 30s, cheap government suit, subtle chrome datajack at the temple and faint cybereye glow, cynical jaded expression, dim dive-bar booth, cigarette smoke, distrustful`

**FBI Sniper** — `lean federal marksman in low-profile tactical gear and armored vest, mirrored cyber-eyes with thermographic glint, perched overwatch on a rooftop at dusk, sniper rifle with a long scope, calm and patient`

**Peace-Enforcement Officer (PEO)** — `camp security guard in a crisp white uniform, helmet and assault rifle, outwardly an ordinary human but with an uncanny stillness and a faint insectile sheen to the eyes, clean menacing, manicured camp gate behind`

**True-Form Soldier Ant** — `towering insect-spirit soldier, armored chitin plates, scything mandibles and barbed forelimbs, segmented carapace, alien and predatory, emerging from shadow, dark fantasy body horror`

**True-Form Worker Ant** — `smaller insect-spirit worker, spindly chitinous limbs, hunched laboring posture, dull carapace, tending pale cocoons in a fleshy hive nursery, unsettling`

**Aztechnology Security Guard** — `corporate security trooper in matte-black Aztechnology armor jacket with subtle Aztec-motif trim, AK-97 assault rifle, mirrored visor, cocky aggressive stance, neon-lit street`

**Aztechnology Driver (Rigger)** — `corporate wheelman jacked into a vehicle control rig, datacable from temple to dashboard, focused glassy-eyed concentration, armored convoy cab interior, dashboard glow`

**DocWagon Courier** — `nervous low-end courier in a cheap jacket, holding a small refrigerated case, plain compact car behind, jittery and unthreatening, rainy night street`

---

## Scene maps

Top-down / overhead battlemaps, append: `top-down tabletop RPG battlemap, orthographic overhead view, clean readable layout, subtle grid, high detail --ar 4:3 --v 6`

**Hope Relief Camp — Compound** — `overhead map of a fenced relief-camp compound in toxic wasteland, rows of barracks, central administration building, gardens and gravel paths, an electrified chain-link perimeter with a guarded main gate`

**Hope Relief Camp — Registration Building** — `overhead floor plan of a single-story registration/processing building, entrance lobby, intake desks, waiting area, offices, side corridors`

**The Hive — Queen's Lair** — `overhead map of a vast organic underground hive chamber, fleshy chitinous walls, cocoon clusters, pools of dark ichor, a raised central dais for the queen, eerie bioluminescence`

**New Dawn Environics — Research Lab** — `overhead floor plan of a corporate water-treatment and research facility, lab rooms, a massive effluent-treatment pool of brown sludge, catwalks, loading bay, security checkpoints`

**Cyber Shipment — Warehouse & Route** — `overhead map of an industrial warehouse loading dock and adjacent stretch of cracked Barrens highway at night, parked armored truck, crates, chain-link yard`

**Seattle Streets — The Meet (McHugh's)** — `overhead floor plan of a grungy dive bar, food prep area, manager's office, storeroom, washrooms, scattered tables, a back corner booth, neon sign`
