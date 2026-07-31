# Changelog

## 0.4.0 — 2026-07-28

### Changed
- **The two intro battle maps are now 8200x4700 WebP.** *Digging Their Own
  Graves* (Cyber Shipment — Warehouse & Route) and *Six Feet Under* (Courier
  Intercept), the maps needed to run the opening adventures.

  This also **fixes their scale.** At the estate's 100 px = 1 m convention a
  1792 px map is only **17.9 m across**, while both maps plainly depict 60–90 m
  of ground — a semi-trailer rendered ~3.5 m long, a four-lane road ~2 m wide.
  They are now **82 x 47 m**, which matches what the art shows, and the
  dimensions are whole multiples of the grid so cells land on the map edges.

### Fixed
- **`gen-scenes.mjs` would have reverted a finished map to a placeholder.** It
  hardcoded 1600x1200 and a `.png`, so re-running it silently replaced the
  Warehouse scene's real art — the same pattern that cost the Rigger Black Book
  all 69 vehicle portraits. It now keeps the background and dimensions of any
  scene already pointing at real art, and reports which scenes are still
  placeholders.

### Notes
- **These are enlargements, not re-generations.** The image generator exposes no
  size parameter and cannot produce 8K natively — it lands around 1792x1024,
  exactly what these maps already were, so re-rolling risked two good top-down
  maps for zero resolution gain. Enlarging runs in 2x Lanczos steps with light
  unsharp between, which holds edges together far better than one 4.6x jump, but
  it adds no detail that was not in the source.
- **Five scenes are still placeholders** reading "replace with final art":
  Hope Relief Camp (Compound and Registration), The Hive — Queen's Lair, New
  Dawn Environics — Research Lab, and Seattle Streets — The Meet. Those need
  real maps commissioned or generated, not enlarged.

## 0.3.0 — 2026-07-24

### Added
- **Battle maps for the first two runs.** *Digging Their Own Graves* (the
  Aztechnology cyberware-truck hijack) now uses a night-industrial map with a
  rail level-crossing chokepoint, and a new **Six Feet Under — Courier Intercept**
  scene gives the DocWagon snatch a daytime Seattle-arterial map. Both are
  top-down 1792×1024, generated to match each run. The Adventure bundle imports
  them.


## 0.2.0 — Cast portraits

All 12 Double Exposure cast members now have custom painterly portraits
(square 1024px, rotation-locked) instead of placeholder silhouettes —
9 people and the 3 insect spirits (Worker/Soldier Ant, Hive Queen).

## 0.1.2

- **Cast wear their armor as items** (Armor Jacket, Armored Vest, etc.) instead of
  a flat value, so a GM can swap/modify it on the fly. Requires the system build
  that sums equipped armor items into NPC armor (≥ 0.11.3). Natural armor on the
  insect spirits stays in the flat field.

## 0.1.1

- **Cast NPCs now carry their weapons as items** (were named only in the bio), so
  they can roll attacks: AK-97, Uzi III, Colt America L36, Ranger Arms SM-3, Ares
  Predator, Foresight 500, knife — stats from the core weapons (SR2E p.94),
  applied to the 7 armed cast members. Jonathan Tung stays unarmed.

## 0.1.0

The adventure is playable end-to-end and one-click importable.

### Module
- Scaffolded the `sr2e-double-exposure` module: `module.json` requiring the
  `sr2e` system (≥ 0.9.0), four packs (Adventure + Scenes/Cast/Journals), and
  pack-build tooling (with JournalEntry page-splitting). Generators for actors,
  scenes, journals, and the Adventure bundle.

### Cast (`de-actors`, 12)
- Named NPCs: Jonathan Tung, the Hive Queen (Force-10 boss), Special Agent
  Simon Juárez, and the FBI Sniper.
- Opposition: true-form soldier & worker insect spirits, the Peace-Enforcement
  Officer and PEO Shaman (flesh-form camp security), Aztechnology security guard
  and rigger-driver, a DocWagon courier, and a Butcher ganger.
- All SR2E `npc` actors with skills, armour, initiative, and GM bios,
  transcribed from the page renders. Each wired to a placeholder portrait in
  `assets/portraits/` (swap for final art).

### Journals (`de-journals`, 14)
- **GM Overview** (premise, plot synopsis, how it runs, a Run Index mapping
  every encounter to its scene/cast/handout, and key cast).
- **Encounters 1–8** + **6b. Camp Life — Events** (the Butchers raid, the
  decker keystroke-trap, the snooping stranger): Digging Their Own Graves ·
  Six Feet Under · The Worst Kind of Mail (recruitment + leads/branch hub) ·
  The Big Interview · A Glimmer of Hope (camp infiltration & gate search) ·
  Hope Relief Camp · The Medical Center · Picking Up the Pieces (resolution).
- **New Dawn Environics** — the alternate investigation branch.
- **GM references:** Insect Spirits & the Hive (possession/transformation,
  summoning); Awareness & Detection (Awareness Points, chem-sniffer table).
- **Player Handouts** — an original Project Hope enrollment form and an
  original "found document" in Tung's voice.

### Art
- `docs/art-prompts.md` — Midjourney prompts for every cast portrait and scene
  map, with style/aspect guidance and Foundry drop-in paths.

### Scenes (`de-scenes`, 6)
- Placeholder maps with labeled grid backgrounds for the major locations
  (swap each background for final art).

### Adventure (`double-exposure`)
- One-click Adventure document bundling all of the above for world import.

### Remaining for 0.1.0
- Final portrait and map art (placeholders are wired and ready to swap; see
  `docs/art-prompts.md`).
