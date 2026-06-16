// Assemble the one-click Adventure document from the de-actors / de-scenes /
// de-journals pack sources. Re-run whenever that content changes, then
// `npm run build-packs double-exposure`.
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";

const ID = createHash("sha1").update("de-adventure:Double Exposure").digest("hex").slice(0, 16);

function load(dir) {
  return readdirSync(dir)
    .filter(f => f.endsWith(".json"))
    .map(f => {
      const d = JSON.parse(readFileSync(`${dir}/${f}`, "utf8"));
      delete d._key;            // embedded copies have no LevelDB key
      delete d._stats?.compendiumSource;
      return d;
    });
}

const actors  = load("packs-src/de-actors");
const scenes  = load("packs-src/de-scenes");
const journal = load("packs-src/de-journals");

const adventure = {
  _id: ID,
  name: "Double Exposure",
  img: "modules/sr2e-double-exposure/assets/scenes/Hope_Relief_Camp_Compound.png",
  description: "<p>A Shadowrun 2nd Edition adventure (FASA 7319). The runners are drawn into the Project Hope relief camps and uncover the Universal Brotherhood — an insect-spirit colony ruled by the Hive Queen — while a megacorp and the UCAS FBI play their own games. Importing this adventure adds its scenes, cast, and GM journals to your world.</p>",
  caption: "Project Hope's charity hides a hive.",
  folders: [],
  actors, scenes, journal,
  items: [], tables: [], macros: [], cards: [], playlists: [],
  folder: null, sort: 0, flags: {},
  ownership: { default: 0 },
  _stats: { coreVersion: "13.351", systemId: "sr2e", systemVersion: "0.1.0", createdTime: 1781600000000, modifiedTime: 1781600000000, lastModifiedBy: null, compendiumSource: null, duplicateSource: null, exportSource: null },
  _key: `!adventures!${ID}`
};

writeFileSync(`packs-src/double-exposure/Double_Exposure_${ID}.json`, JSON.stringify(adventure, null, 2) + "\n");
console.log(`wrote Adventure: ${actors.length} actors, ${scenes.length} scenes, ${journal.length} journals`);
