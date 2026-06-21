# Double Exposure — QA Plan

How to verify the `sr2e-double-exposure` **adventure** module before tagging a
release. Unlike the gear modules, this ships a full **Adventure**: an NPC cast,
GM/scene journals, map Scenes, plus roll tables, handouts, and macros bundled
into one importable Adventure document. QA is therefore mostly: *does the
Adventure import cleanly, and does everything a GM needs to run it render,
link, and play?*

Run with the **SR2E system** active and Foundry **V13**. Close Foundry before
`npm run build-packs` (LevelDB locks).

---

## 0. Pre-flight (automated, no Foundry)
- [ ] **Build clean:** `npm run build-packs` exits 0 and reports the expected
      document count per pack (see §1 table).
- [ ] **Sources are valid JSON:** every `packs-src/**/*.json` parses
      (`for f in packs-src/**/*.json; do node -e "JSON.parse(require('fs').readFileSync('$f'))" || echo "BAD $f"; done` prints nothing).
- [ ] **`module.json`** lists all packs (incl. the `Adventure`-type pack) and
      requires `sr2e` under `relationships.systems`.
- [ ] **Asset paths resolve:** token/portrait/handout/scene-background image
      paths referenced in the docs exist under the module's `assets/` (no
      broken-image references baked into the data).

## 1. Load & import (in Foundry)
- [ ] Enable the module in an SR2E world: loads with **no console errors**.
- [ ] All packs appear and match counts:

  | Pack | Expected | Type |
  |---|---|---|
  | Double Exposure (`double-exposure`) | 1 | Adventure |
  | Double Exposure — Cast (`de-actors`) | 12 | Actor |
  | Double Exposure — GM Journals (`de-journals`) | 14 | JournalEntry |
  | Double Exposure — Scenes (`de-scenes`) | 6 | Scene |

  *(update counts to match each `tools/gen-*.mjs` `wrote N …` line.)*

- [ ] **Import the Adventure** (open the `double-exposure` Adventure compendium
      entry → Import): it imports with **no errors**, and the summary lists the
      expected actors, journals, scenes, roll tables, and macros.
- [ ] Re-importing is idempotent / behaves sanely (no duplicate-id crash).

## 2. Cast (de-actors)
- [ ] All 12 NPC/cast actors open without error; **portraits and token art
      render** (no broken images).
- [ ] Stat blocks are sensible SR2E values (attributes, skills, condition
      monitors); any attached items (weapons/cyberware/gear) are intact.
- [ ] Tokens have correct disposition and prototype settings; dropping one on a
      scene produces a usable token.

## 3. Journals (de-journals)
- [ ] All 14 journal entries open and render (headings, formatting intact).
- [ ] **Internal links resolve:** `@UUID`/content links to actors, scenes, other
      journals, roll tables, and handouts all jump to the right document (no
      "broken link" / unresolved references after import).
- [ ] Embedded images/handouts display.
- [ ] GM-only content is appropriately ownership-restricted (players shouldn't
      see GM journals by default).

## 4. Scenes (de-scenes / maps)
- [ ] All 6 scenes activate and **the map background renders** at the right
      dimensions/grid.
- [ ] Walls/doors and lighting (if authored) behave; vision works.
- [ ] Pre-placed tokens (if any) map to the right cast actors and render.
- [ ] Scene navigation labels are set; the intended starting scene is clear.

## 5. Tables, handouts, macros
- [ ] Bundled **roll tables** roll and return valid results.
- [ ] **Handouts** (player images) open and display full-size.
- [ ] Bundled **macros** execute without error and target the right documents.

## 6. Runnability (content pass)
- [ ] A GM can read the journals top-to-bottom and run the adventure: scene order
      is followed, links lead where the prose says, NPC references resolve to
      real actors.
- [ ] No verbatim-copied long prose beyond what's needed (copyright discipline);
      original/summarised text where appropriate.

## 7. Packaging
- [ ] Release workflow builds packs and zips **without** `_work/` renders,
      `node_modules`, or `art-prompts.md` working files.
- [ ] Install the released zip in a clean world, import the Adventure, and
      re-run §1–§5.

---

## Sign-off before tagging
- [ ] §0–§1 green; the Adventure imports clean.
- [ ] §2–§5 spot-checks pass (cast renders, journal links resolve, scenes load,
      tables/handouts/macros work).
- [ ] §6 read-through confirms the adventure is runnable end-to-end.
