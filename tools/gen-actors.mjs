// Generate Double Exposure cast actors (npc type) into packs-src/de-actors.
// Stats transcribed from the adventure's Cast of Shadows / scene stat blocks.
// Re-run after editing CAST; it overwrites the per-name files (stable _id by name).
import { writeFileSync, readdirSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";

const DIR = "packs-src/de-actors";
const idFor = (s) => createHash("sha1").update("de:" + s).digest("hex").slice(0, 16);
const SKILL_ATTR = {
  computer: "intelligence", etiquette: "charisma", negotiation: "charisma",
  psychology: "intelligence", "armed combat": "strength", "unarmed combat": "strength",
  firearms: "quickness", pistols: "quickness", "assault rifles": "quickness",
  stealth: "quickness", athletics: "body", car: "reaction", magic: "willpower",
  conjuring: "charisma", sorcery: "willpower", biotech: "intelligence",
  leadership: "charisma", intimidation: "charisma", "interrogation": "charisma"
};

function attr(base, mod = 0) {
  return { base, mod, value: Math.max(1, base + mod), racial: 0 };
}

function skillItem(s) {
  const key = s.name.toLowerCase().replace(/\s*\(.*\)$/, "");
  return {
    _id: idFor("skill:" + s.name + ":" + s.rating), name: s.name, type: "skill",
    img: "icons/svg/book.svg",
    system: {
      category: "active", linkedAttribute: s.attr ?? SKILL_ATTR[key] ?? "intelligence",
      rating: s.rating, concentration: { name: "", rating: 0 },
      specialization: { name: s.spec ?? "", rating: s.spec ? s.rating : 0 },
      isMagical: !!s.magical, notes: ""
    },
    effects: [], flags: {},
    _stats: { coreVersion: "13.351", systemId: null, systemVersion: null, createdTime: null, modifiedTime: null, lastModifiedBy: null, compendiumSource: null, duplicateSource: null, exportSource: null },
    folder: null, sort: 0, ownership: { default: 0 }
  };
}

function actor(n) {
  const _id = idFor(n.name);
  const a = n.attrs;
  const reactionBase = Math.floor((a.qui + a.int) / 2);
  const reactionMod = (n.reaction ?? reactionBase) - reactionBase;
  const reactionVal = reactionBase + reactionMod;
  const items = (n.skills ?? []).map(skillItem);
  return {
    _id, name: n.name, type: "npc", img: n.img ?? "icons/svg/mystery-man.svg",
    system: {
      biography: n.bio ?? "", race: n.race ?? "human", professionalRating: n.pro ?? 0,
      body: attr(a.body), quickness: attr(a.qui), strength: attr(a.str),
      charisma: attr(a.cha), intelligence: attr(a.int), willpower: attr(a.wil),
      essence: { value: n.essence ?? 6, max: n.essence ?? 6 },
      magic: { value: n.magic ?? 0, max: n.magic ?? 0, tradition: n.tradition ?? "none", type: n.magicType ?? "none", totem: n.totem ?? "" },
      reaction: { base: reactionBase, mod: reactionMod, value: reactionVal },
      conditionMonitor: { physical: { value: 0, max: 10, overflow: 0 }, stun: { value: 0, max: 10, overflow: 0 }, overflow: 0 },
      armor: { ballistic: n.armor?.[0] ?? 0, impact: n.armor?.[1] ?? 0 },
      dicePools: { combat: { value: 0, max: 0, bonus: 0 }, magic: { value: 0, max: 0, bonus: 0 } },
      initiative: { base: reactionVal, dice: n.initDice ?? 1, mod: 0, value: reactionVal },
      threatRating: n.threat ?? 0, nuyen: 0, movement: { walk: a.qui, run: a.qui * 5 }
    },
    items, effects: [], folder: null, sort: 0, flags: {},
    _stats: { coreVersion: "13.351", systemId: "sr2e", systemVersion: "0.1.0", createdTime: 1781600000000, modifiedTime: 1781600000000, lastModifiedBy: null, compendiumSource: null, duplicateSource: null, exportSource: null },
    prototypeToken: {
      name: n.name, displayName: 20, actorLink: false, width: 1, height: 1,
      texture: { src: n.img ?? "icons/svg/mystery-man.svg", anchorX: 0.5, anchorY: 0.5, offsetX: 0, offsetY: 0, fit: "contain", scaleX: 1, scaleY: 1, rotation: 0, tint: "#ffffff", alphaThreshold: 0.75 },
      lockRotation: false, rotation: 0, alpha: 1, disposition: n.disposition ?? -1, displayBars: 20,
      bar1: { attribute: "conditionMonitor.physical" }, bar2: { attribute: "conditionMonitor.stun" }
    },
    ownership: { default: 0 }, _key: `!actors!${_id}`
  };
}

// ---------------------------------------------------------------------------
// CAST — transcribed from the Double Exposure stat blocks (FASA 7319).
// ---------------------------------------------------------------------------
const CAST = [
  {
    name: "Jonathan Tung",
    pro: 4, threat: 6, essence: 6,
    bio: "<p>Public-relations manager for the Project Hope relief camps and a willing servant of the Hive Queen — though he shows no overt physical signs of his changed nature; intense love for the Queen masks his aura. A charismatic 'face' who recruits the hopeless and dissatisfied into the Universal Brotherhood.</p><p><em>Printed initiative reads \"22 + 1D6\" (Reaction 12); his enhanced Reaction is represented via a modifier. Gear: Pocket Secretary, Portable Phone. Cast of Shadows, Double Exposure p.57.</em></p>",
    attrs: { body: 4, qui: 3, str: 3, cha: 6, int: 3, wil: 3 },
    reaction: 12, initDice: 1,
    skills: [
      { name: "Computer", rating: 4 },
      { name: "Etiquette (Corporate)", attr: "charisma", rating: 3, spec: "Corporate" },
      { name: "Negotiation", rating: 6 },
      { name: "Psychology", rating: 3 }
    ]
  },
  {
    name: "Hive Queen",
    pro: 4, threat: 10, essence: 10, magic: 10, disposition: -1,
    bio: "<p>Nearly 4 metres long, the Queen looks like a bloated hybrid of metahuman and ant — the conduit of power for the shaman who summoned her long ago (whom she killed and replaced). An atypical insect spirit of <strong>Force 10</strong> with an extremely high Willpower.</p><p><strong>Powers:</strong> Animal Control (Ants), Compulsion, Enhanced Senses (Smell), Fear, Immunity to Normal Weapons, Paralyzing Touch, Share Senses, Share Willpower, Summoning, Venom.</p><p><strong>Weaknesses:</strong> Reduced Senses (Sight), Vulnerability (Insecticides).</p><p><em>Printed: Reaction 30; Initiative 40 / 50 + 1D6 — base 40, +10 when physically manifest (50), +20 in astral space. When attacking in melee, use Force (10) instead of Reaction for Skill dice. Quickness 16 (running ×5). Full power descriptions: Gamemaster Information p.49. Cast of Shadows, Double Exposure p.58.</em></p>",
    attrs: { body: 15, qui: 16, str: 10, cha: 10, int: 10, wil: 10 },
    reaction: 30, initDice: 1
  },
  {
    name: "Special Agent Simon Juarez",
    pro: 3, threat: 4, essence: 2.6, disposition: 0, armor: [3, 1],
    bio: "<p>A UCAS FBI special agent who, after ten years enforcing UCAS federal law, learned to perform truly repulsive acts, all of which he hated. Assigned to investigate the Project Hope relief camps after Agent Clint Ranger disappeared, he approaches the case from a different direction — putting his own neck on the line and treating the runners as disposable help. Anything that jeopardises him is fair game for blame.</p><p><strong>Cyberware:</strong> Chipjack w/ Federal Laws &amp; Regulations Chip (5), Datajack w/ 50 Mp memory, Smartlink, Wired Reflexes (1).</p><p><strong>Gear:</strong> Ares Predator [9M, smartlinked, 15-round clip + 50 rds], Armor Clothing (3/1), credstick (100,000¥), Micro-Transceiver, Portable Phone (ear/boosted).</p><p><em>Unaugmented Reaction 5 / Initiative 5 + 1D6; augmented (Wired Reflexes 1) Reaction 7 / Initiative 7 + 2D6 — the combat values are used here. Cast of Shadows, Double Exposure p.56.</em></p>",
    attrs: { body: 6, qui: 6, str: 6, cha: 4, int: 5, wil: 4 },
    reaction: 7, initDice: 2,
    skills: [
      { name: "Car", rating: 4 },
      { name: "Etiquette (Government)", attr: "charisma", rating: 4, spec: "Government" },
      { name: "Etiquette (Street)", attr: "charisma", rating: 4, spec: "Street" },
      { name: "Firearms", rating: 6 },
      { name: "Negotiation", rating: 6 },
      { name: "Psychology", rating: 3 },
      { name: "Stealth", rating: 4 }
    ]
  },
  {
    name: "True-Form Soldier Ant (Force 4)",
    race: "spirit", pro: 4, threat: 4, essence: 4, disposition: -1, armor: [4, 8],
    bio: "<p>An insect spirit soldier in its true form — a chitin-armoured horror that exists to protect the Queen. Dual-natured. Attributes scale with Force (here F = 4): Body F+1, Quickness F×4, Strength F+4, Charisma/Intelligence/Willpower F, Essence F(A), Reaction F; Armor F / F×2.</p><p><strong>Powers:</strong> Enhanced Senses (Smell), Paralyzing Touch, Venom, Skill. <strong>Weaknesses:</strong> Reduced Senses (Sight), Vulnerability (Insecticides).</p><p><em>True Reaction = Force (4). Initiative gets +10 when physically manifest (already included below: 14 + 1D6) and +20 in astral space. When attacking in melee, use Force instead of Reaction for Skill dice. GM Information, Double Exposure p.48.</em></p>",
    attrs: { body: 5, qui: 16, str: 8, cha: 4, int: 4, wil: 4 },
    reaction: 14, initDice: 1
  },
  {
    name: "True-Form Worker Ant (Force 3)",
    race: "spirit", pro: 4, threat: 3, essence: 3, disposition: -1,
    bio: "<p>An insect spirit worker in its true form — the colony's labour caste, tending cocoons and larvae. Dual-natured but a poor combatant. Attributes scale with Force (here F = 3): Body F−2, Quickness F×3, Strength F+2, Charisma/Willpower F, Intelligence F−2, Essence F(A), Reaction F; no armour.</p><p><strong>Powers:</strong> Enhanced Senses (Smell), Skill. <strong>Weaknesses:</strong> Reduced Senses (Sight), Vulnerability (Insecticides).</p><p><em>True Reaction = Force (3). Initiative +10 manifest (included: 13 + 1D6), +20 astral. GM Information, Double Exposure p.48.</em></p>",
    attrs: { body: 1, qui: 9, str: 5, cha: 3, int: 1, wil: 3 },
    reaction: 13, initDice: 1
  }
];

let n = 0;
for (const c of CAST) {
  const doc = actor(c);
  const safe = c.name.replace(/[^A-Za-z0-9]+/g, "_").replace(/^_|_$/g, "");
  writeFileSync(`${DIR}/${safe}_${doc._id}.json`, JSON.stringify(doc, null, 2) + "\n");
  n++;
}
console.log(`wrote ${n} cast actor(s)`);
