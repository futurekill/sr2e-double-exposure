# Double Exposure Module — Development Notes

A FoundryVTT **V13** content module packaging the *Double Exposure* adventure
(FASA 7319) for the **Shadowrun 2nd Edition system** (`sr2e`). This is a
separate package from the system: its own repo, its own packs, no shared code.
It depends on the system via `module.json` → `relationships.systems` (sr2e
≥ 0.9.0), so its actors use the system's data models and sheets.

The sibling system repo lives at `../sr2e-foundryvtt`. Read its `CLAUDE.md` for
the SR2E data-model contract (actor/item types, derived data) that this module's
content is authored against.

## Source material
The adventure PDF is a **scanned image** (no text layer). Extraction lives in
`_work/` (git-ignored, never shipped):
- `_work/pages/pg-NN.png` — page renders (`pdftoppm -r 200`)
- `_work/pages/pg-NN.txt` + `_work/double-exposure-ocr.txt` — OCR (`tesseract`)

OCR is noisy (scan borders garble headers/numbers); **read the page render to
verify any stat block or table** before transcribing — the same discipline the
system repo uses for the core rulebook. Book page N ≈ PDF page N.

## Authoring conventions
- **Cast** are `npc` actors (stat-block type with a Skills section). The
  `npc` model derives Reaction from attributes, so to match a printed Reaction
  use a `reaction:` value in the generator (it back-solves `reaction.mod`).
  For insect spirits the **manifest** initiative (+10) is baked into Reaction so
  tokens are combat-ready; the Force formula and astral bonus go in the bio.
- **Journals** are authored as **original GM-facing prep** — summaries,
  paraphrased read-aloud, mechanical references to the Cast/Scenes compendia.
  Do not paste long verbatim passages; point to the page number instead.
- **Scenes** ship labeled **placeholder** backgrounds (`assets/scenes/*.png`,
  generated via `rsvg-convert`); final maps replace each scene's background.

## Build workflow
`packs-src/` (per-document JSON) is the source of truth; `packs/` is the LevelDB
build. Generators emit the JSON, then `npm run build-packs [name]`:
- `node tools/gen-actors.mjs` → `de-actors`
- `node tools/gen-scenes.mjs` → `de-scenes` (+ placeholder PNGs)
- `node tools/gen-journals.mjs` → `de-journals`
- `node tools/gen-adventure.mjs` → assembles the one-click **Adventure** from
  the three above; re-run it after any content change, then build
  `double-exposure`.

`tools/build-packs.mjs` is copied from the system and extended with
`journal: ["pages"]` so JournalEntry pages serialize as the separate LevelDB
records Foundry expects. `.gitignore` keeps `packs/**/*.log` tracked (LevelDB
write-ahead logs must survive or releases lose data).

## Copyright
*Double Exposure* / *Shadowrun* are © FASA and rights holders. This module is
for the owner's **personal** table use from a PDF they own, not for
distribution. Keep `_work/` out of git.
