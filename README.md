# Shadowrun 2E: Double Exposure

A Foundry VTT V13 module bringing *Double Exposure* (FASA 7319) to the [Shadowrun 2nd Edition system](https://github.com/futurekill/sr2e-foundryvtt) (`sr2e`). The adventure, ready to import: the scenes and maps, the cast as SR2E actors, and the GM journals, bundled as one Adventure.

## Contents

| Pack | Contents |
|---|---|
| Double Exposure (Adventure) | everything, for one-click import |
| Double Exposure — Cast | 12 actors |
| Double Exposure — GM Journals | 14 journals |
| Double Exposure — Scenes | 7 scenes |

## Notes

- Import the **Double Exposure (Adventure)** pack for everything in one go; the individual packs are there for picking pieces out.
- The [Missions](https://github.com/futurekill/sr2e-missions) module fills the downtime gaps between its runs.

## Requirements

- Foundry VTT V13
- The `sr2e` system, version 0.9.0 or later

## Installation

In Foundry, **Add-on Modules → Install Module**, and paste this manifest URL:

```
https://github.com/futurekill/sr2e-double-exposure/releases/latest/download/module.json
```

Then enable it in your world (**Game Settings → Manage Modules**).

## Development

`packs-src/` (one JSON file per document) is the source of truth. `packs/` is built from it, gitignored, and rebuilt by the release workflow.

```bash
npm install
npm run build-packs     # packs-src/ JSON -> packs/ LevelDB (close Foundry first)
npm run extract-packs   # pull edits made in Foundry back to packs-src/
npm run validate        # pre-flight checks on the pack sources
npm run lint
```

To release: add a `## X.Y.Z — date` section to `CHANGELOG.md` (the release notes come from it), bump `module.json`, then tag and push `vX.Y.Z`.

## Copyright

*Double Exposure* and *Shadowrun* are © FASA and their rights holders. This is a fan-made, non-commercial module for personal table use by owners of the book. Journals are original summaries with page references, not book text.
