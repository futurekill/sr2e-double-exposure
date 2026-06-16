// Generate Double Exposure GM journals into packs-src/de-journals.
// Content is original GM-facing summary/prep authored for this module.
import { writeFileSync } from "node:fs";
import { createHash } from "node:crypto";

const DIR = "packs-src/de-journals";
const idFor = (s) => createHash("sha1").update("de-journal:" + s).digest("hex").slice(0, 16);

function page(journalName, name, html, level = 1) {
  return {
    _id: idFor(journalName + "::" + name), name, type: "text",
    title: { show: true, level },
    text: { format: 1, content: html, markdown: undefined },
    image: {}, video: { controls: true, volume: 0.5 }, src: null,
    system: {}, sort: 0, ownership: { default: -1 }, flags: {},
    _stats: { coreVersion: "13.351", systemId: "sr2e", systemVersion: "0.1.0", createdTime: 1781600000000, modifiedTime: 1781600000000, lastModifiedBy: null, compendiumSource: null, duplicateSource: null, exportSource: null }
  };
}

function journal(name, pages) {
  const _id = idFor(name);
  return {
    _id, name, pages, folder: null, sort: 0, flags: {},
    ownership: { default: 0 },
    _stats: { coreVersion: "13.351", systemId: "sr2e", systemVersion: "0.1.0", createdTime: 1781600000000, modifiedTime: 1781600000000, lastModifiedBy: null, compendiumSource: null, duplicateSource: null, exportSource: null },
    _key: `!journal!${_id}`
  };
}

const JOURNALS = [
  journal("GM Overview — Double Exposure", [
    page("GM Overview — Double Exposure", "The Premise",
      `<p><em>Double Exposure</em> is a Shadowrun 2nd Edition adventure set in 2055 Seattle. A new charity, <strong>Project Hope</strong>, has appeared in the toxic ruins of the <strong>Glow City</strong> region of the Redmond Barrens, offering food, shelter, and a way out to the destitute — and quietly drawing them into its <strong>relief camps</strong>.</p>
       <p>The camps are a front. Behind the philanthropy sits a three-way tangle: a megacorp footing the bill, a federal agency sniffing around, and a hidden horror feeding on the people the charity "saves."</p>`),
    page("GM Overview — Double Exposure", "Plot Synopsis (GM Eyes Only)",
      `<p><strong>Renraku Computer Systems</strong> secretly funds Project Hope. Lagging its rivals in research, Renraku wants a steady supply of willing, off-the-books test subjects; Project Hope's doctors examine the destitute, keep records, and quietly funnel "volunteers" into the corp's experiments.</p>
       <p>What Renraku does <em>not</em> know is that Project Hope belongs to the <strong>Universal Brotherhood</strong> — a front for an <strong>insect-spirit colony</strong> ruled by the <strong>Hive Queen</strong> (the "Ant Queen"). The Brotherhood launders Renraku's money to expand, and every desperate soul drawn into the camps swells the colony's ranks as flesh-form soldiers and worse. Renraku is unwittingly bankrolling a hive.</p>
       <p>The <strong>UCAS FBI</strong> suspects Renraku of illegal bio-experiments and wants leverage. It sent <strong>Special Agent Clint Ranger</strong> into the camps to dig. Ranger disappeared. Agent <strong>Simon Juárez</strong> now approaches the problem from a different angle — by hiring deniable help.</p>`),
    page("GM Overview — Double Exposure", "How the Adventure Runs",
      `<p>The runners are hired to investigate the Project Hope relief camps and find out what happened to the people who vanish into them. The trail leads from the camps to New Dawn Environics and the corp connection, and ultimately down into the Hive and the Queen herself.</p>
       <p>Each encounter follows the standard SR2 format:</p>
       <ul>
         <li><strong>Tell It To Them Straight</strong> — read-aloud text describing what the characters see.</li>
         <li><strong>Hooks</strong> — ways to draw the team in / cues to convey.</li>
         <li><strong>Behind the Scenes</strong> — what's really happening and how NPCs react.</li>
         <li><strong>Debugging</strong> — fixes if the run stalls or goes sideways.</li>
       </ul>
       <p>See the per-scene journals for each encounter, the <strong>Cast</strong> compendium for stat blocks, and the <strong>Scenes</strong> compendium for maps.</p>`),
    page("GM Overview — Double Exposure", "Key Cast & Threats",
      `<ul>
         <li><strong>Jonathan Tung</strong> — Project Hope's PR/relief-camp director and a willing servant of the Queen; the smiling face of the recruitment machine.</li>
         <li><strong>Special Agent Simon Juárez (UCAS FBI)</strong> — the team's likely employer; ruthless and self-protective.</li>
         <li><strong>Special Agent Clint Ranger (UCAS FBI)</strong> — went into the camps and vanished; finding him (or what's left) is a thread throughout.</li>
         <li><strong>The Hive Queen</strong> — a Force-10 insect spirit, the colony's heart. The climax.</li>
         <li><strong>Universal Brotherhood members &amp; flesh-form soldiers</strong> — the colony's foot soldiers and security.</li>
       </ul>
       <p><em>Stat blocks for all of these live in the "Double Exposure — Cast" compendium.</em></p>`)
  ])
];

let n = 0;
for (const j of JOURNALS) {
  const safe = j.name.replace(/[^A-Za-z0-9]+/g, "_").replace(/^_|_$/g, "");
  writeFileSync(`${DIR}/${safe}_${j._id}.json`, JSON.stringify(j, null, 2) + "\n");
  n++;
}
console.log(`wrote ${n} journal(s)`);
