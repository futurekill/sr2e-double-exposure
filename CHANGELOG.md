# Changelog

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
