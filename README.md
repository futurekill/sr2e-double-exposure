# Shadowrun 2E: Double Exposure

A FoundryVTT **module** that packages the *Double Exposure* adventure (FASA 7319)
for the [Shadowrun 2nd Edition system](../sr2e-foundryvtt) (`sr2e`). It ships an
importable Adventure compendium: scenes/maps, the NPC cast as SR2E actors, and
GM journals.

This is a content module — it **requires** the `sr2e` system (declared in
`module.json` → `relationships.systems`) and is enabled per-world. It is entirely
separate from the system: its own repo, its own packs, no shared code.

## Status
Early scaffold. Content is authored from the source adventure into:
- `de-scenes` — maps as Foundry Scenes
- `de-actors` — the cast (built on SR2E actor types)
- `de-journals` — plot, scene breakdowns, GM notes, handouts
- `double-exposure` — the Adventure document that bundles the above for one-click import

## Development
`packs-src/` (per-document JSON) is the source of truth; `packs/` is the LevelDB
build. `npm run build-packs [name]` builds; `npm run extract-packs` pulls Foundry
edits back to JSON. Mirrors the system repo's pack workflow.

## Copyright
*Double Exposure* and *Shadowrun* are © FASA / their rights holders. This module
is for personal use at the owner's own table and is not for distribution.
The `_work/` directory (OCR text and page renders of the source PDF) is local
planning material only and is git-ignored.
