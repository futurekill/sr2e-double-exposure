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

const safeName = (s) => s.replace(/[^A-Za-z0-9]+/g, "_").replace(/^_|_$/g, "");
const slugName = (s) => s.toLowerCase().replace(/['’]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const portraitPath = (name) => `modules/sr2e-double-exposure/assets/portraits/${slugName(name)}.webp`;

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

// Weapons the cast carry (stats from the system weapons compendium, SR2E p.94),
// so NPCs can actually roll attacks instead of only naming the gun in their bio.
const WEAPONS = {
  ak97:         { name: "AK-97", type: "firearm", skill: "firearms", dmg: "8M", modes: "sa,bf,fa", ammo: [38, "rifle"], ranges: [25, 100, 250, 500], conceal: 3, cost: 700, avail: "5/10 days", notes: "Assault rifle (SR2E p.94)." },
  uzi3:         { name: "Uzi III", type: "firearm", skill: "firearms", dmg: "6M", modes: "bf", ammo: [24, "smg"], ranges: [10, 40, 80, 150], conceal: 5, cost: 600, avail: "6/8 days", notes: "SMG (SR2E p.94)." },
  coltL36:      { name: "Colt America L36", type: "firearm", skill: "firearms", dmg: "6L", modes: "sa", ammo: [11, "pistol"], ranges: [5, 15, 30, 50], conceal: 7, cost: 250, avail: "4/4 days", notes: "Light pistol (SR2E p.94)." },
  rangerSM3:    { name: "Ranger Arms SM-3", type: "firearm", skill: "firearms", dmg: "14S", modes: "sa", ammo: [6, "rifle"], ranges: [75, 350, 700, 1400], conceal: 2, cost: 4500, avail: "8/14 days", notes: "Sniper rifle (SR2E p.94)." },
  aresPredator: { name: "Ares Predator", type: "firearm", skill: "firearms", dmg: "9M", modes: "sa", ammo: [15, "pistol"], ranges: [5, 20, 40, 60], conceal: 5, cost: 450, avail: "4/5 days", notes: "Heavy pistol, smartlinked (SR2E p.94)." },
  foresight500: { name: "Foresight Security 500", type: "firearm", skill: "firearms", dmg: "6L", modes: "sa", ammo: [8, "pistol"], ranges: [5, 15, 30, 50], conceal: 6, cost: 200, avail: "4/5 days", notes: "Light pistol." },
  knife:        { name: "Knife", type: "melee", skill: "armed_combat", dmg: "4L", modes: "", ammo: null, ranges: null, conceal: 8, reach: 0, cost: 30, avail: "Legal", notes: "Blade." }
};

function weaponItem(key) {
  const w = WEAPONS[key];
  const fm = { ss: false, sa: false, bf: false, fa: false };
  for (const m of (w.modes ? w.modes.split(",") : [])) fm[m.trim()] = true;
  return {
    _id: idFor("weapon:" + w.name), name: w.name, type: "weapon",
    img: w.type === "melee" ? "icons/svg/sword.svg" : "icons/svg/target.svg",
    system: {
      weaponType: w.type, skill: w.skill, damageCode: w.dmg, damageType: "physical",
      concealability: w.conceal ?? 4, reach: w.reach ?? 0, firingModes: fm,
      ammo: w.ammo ? { current: w.ammo[0], max: w.ammo[0], type: w.ammo[1] } : { current: 0, max: 0, type: "" },
      recoilComp: 0,
      ranges: w.ranges ? { short: w.ranges[0], medium: w.ranges[1], long: w.ranges[2], extreme: w.ranges[3] }
                       : { short: 0, medium: 0, long: 0, extreme: 0 },
      strengthMin: 0, weight: 0, cost: w.cost ?? 0, availability: w.avail ?? "",
      legality: "Restricted", equipped: true, accessories: [], notes: w.notes ?? ""
    },
    effects: [], flags: {},
    _stats: { coreVersion: "13.351", systemId: null, systemVersion: null, createdTime: null, modifiedTime: null, lastModifiedBy: null, compendiumSource: null, duplicateSource: null, exportSource: null },
    folder: null, sort: 0, ownership: { default: 0 }
  };
}

// Worn armor as an item (so a GM can swap it on the fly). Only for cast who wear
// armor — natural/dermal armor on spirits & critters stays in the flat field.
function armorItem(name, av) {
  return {
    _id: idFor("armor:" + name), name, type: "armor", img: "icons/svg/shield.svg",
    system: {
      ballistic: av?.[0] ?? 0, impact: av?.[1] ?? 0, concealability: 0, weight: 0,
      cost: 0, availability: "", legality: "Legal", equipped: true, isLayered: false,
      notes: "Worn armor (Double Exposure stat block)."
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
  // Worn armor moves into an item (flat base zeroed so it isn't double-counted);
  // natural armor (no armorName) stays in the flat field.
  const wornArmor = n.armorName ? [armorItem(n.armorName, n.armor)] : [];
  const items = [...(n.skills ?? []).map(skillItem), ...(n.weapons ?? []).map(weaponItem), ...wornArmor];
  const armorField = n.armorName
    ? { ballistic: 0, impact: 0 }
    : { ballistic: n.armor?.[0] ?? 0, impact: n.armor?.[1] ?? 0 };
  const img = n.img ?? portraitPath(n.name);
  return {
    _id, name: n.name, type: "npc", img,
    system: {
      biography: n.bio ?? "", race: n.race ?? "human", professionalRating: n.pro ?? 0,
      body: attr(a.body), quickness: attr(a.qui), strength: attr(a.str),
      charisma: attr(a.cha), intelligence: attr(a.int), willpower: attr(a.wil),
      essence: { value: n.essence ?? 6, max: n.essence ?? 6 },
      magic: { value: n.magic ?? 0, max: n.magic ?? 0, tradition: n.tradition ?? "none", type: n.magicType ?? "none", totem: n.totem ?? "" },
      reaction: { base: reactionBase, mod: reactionMod, value: reactionVal },
      conditionMonitor: { physical: { value: 0, max: 10, overflow: 0 }, stun: { value: 0, max: 10, overflow: 0 }, overflow: 0 },
      armor: armorField,
      dicePools: { combat: { value: 0, max: 0, bonus: 0 }, magic: { value: 0, max: 0, bonus: 0 } },
      initiative: { base: reactionVal, dice: n.initDice ?? 1, mod: 0, value: reactionVal },
      threatRating: n.threat ?? 0, nuyen: 0, movement: { walk: a.qui, run: a.qui * 5 }
    },
    items, effects: [], folder: null, sort: 0, flags: {},
    _stats: { coreVersion: "13.351", systemId: "sr2e", systemVersion: "0.1.0", createdTime: 1781600000000, modifiedTime: 1781600000000, lastModifiedBy: null, compendiumSource: null, duplicateSource: null, exportSource: null },
    prototypeToken: {
      name: n.name, displayName: 20, actorLink: false, width: 1, height: 1,
      texture: { src: img, anchorX: 0.5, anchorY: 0.5, offsetX: 0, offsetY: 0, fit: "cover", scaleX: 1, scaleY: 1, rotation: 0, tint: "#ffffff", alphaThreshold: 0.75 },
      lockRotation: true, rotation: 0, alpha: 1, disposition: n.disposition ?? -1, displayBars: 20,
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
    armorName: "Armor Clothing",
    weapons: ["aresPredator"],
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
  },
  {
    name: "DocWagon Courier",
    weapons: ["coltL36"],
    pro: 1, threat: 1, essence: 6, disposition: 0,
    bio: "<p>A paid hireling courier — the kind hired to move a refrigerated case or drive a delivery and ask no questions. No fighter; will hand over the goods rather than risk their life. (\"Put my hands up and step out of the car? Yes sir — here, take the keys.\")</p><p><strong>Gear:</strong> Colt America L36 [Light Pistol, 6L, 11-round clip, laser sight]. Often drives a Chrysler-Nissan Jackrabbit. Six Feet Under / The Worst Kind of Mail, Double Exposure p.14–15.</p>",
    attrs: { body: 2, qui: 3, str: 2, cha: 3, int: 3, wil: 3 },
    initDice: 1,
    skills: [
      { name: "Armed Combat", rating: 2 },
      { name: "Etiquette (Corporate)", attr: "charisma", rating: 2, spec: "Corporate" },
      { name: "Firearms", rating: 2 },
      { name: "Ground Vehicles", attr: "reaction", rating: 3 }
    ]
  },
  {
    name: "Aztechnology Security Guard",
    armorName: "Armor Jacket",
    weapons: ["ak97"],
    pro: 2, threat: 2, essence: 6, disposition: -1, armor: [5, 3],
    bio: "<p>A uniformed Aztechnology corporate-security trooper — the muscle guarding the camps, convoys, and facilities. They'll talk tough and act as if they have the right to do almost anything, and act like it.</p><p><strong>Gear:</strong> AK-97 [Assault Rifle, 8M, SA/BF/FA, 38-round clip + 2 spares, laser sight, gas-vent II recoil comp], Armor Jacket (5/3), Commlink. Digging Their Own Graves, Double Exposure p.12.</p>",
    attrs: { body: 4, qui: 3, str: 3, cha: 3, int: 3, wil: 3 },
    initDice: 1,
    skills: [
      { name: "Armed Combat", rating: 2 },
      { name: "Etiquette (Corporate)", attr: "charisma", rating: 2, spec: "Corporate" },
      { name: "Firearms", rating: 3 },
      { name: "Unarmed Combat", rating: 3 }
    ]
  },
  {
    name: "Aztechnology Driver (Rigger)",
    armorName: "Armor Jacket",
    weapons: ["uzi3"],
    pro: 2, threat: 2, essence: 5, disposition: -1, armor: [5, 3],
    bio: "<p>An Aztechnology wheelman who runs the armoured convoys, jacked into the vehicle through a control rig.</p><p><strong>Cyberware:</strong> Datajack, Vehicle Control Rig (3) — rigged Initiative 3 + 3D6. <strong>Gear:</strong> Uzi III [SMG, 6M, BF, 24-round clip + spare, laser sight, shock pads], Armor Jacket (5/3). Digging Their Own Graves, Double Exposure p.12.</p>",
    attrs: { body: 4, qui: 5, str: 4, cha: 3, int: 3, wil: 3 },
    reaction: 4, initDice: 1,
    skills: [
      { name: "Armed Combat", rating: 2 },
      { name: "Etiquette (Corporate)", attr: "charisma", rating: 2, spec: "Corporate" },
      { name: "Firearms", rating: 3 },
      { name: "Ground Vehicles", attr: "reaction", rating: 3 }
    ]
  },
  {
    name: "FBI Sniper",
    armorName: "Armored Vest w/ Plates",
    weapons: ["rangerSM3", "uzi3"],
    pro: 3, threat: 3, essence: 5, disposition: 0, armor: [4, 3],
    bio: "<p>A UCAS FBI marksman — Juárez's backup, watching the meets and ready to reach out and touch a problem from a rooftop. Not the runners' enemy unless things go very wrong.</p><p><strong>Cyberware:</strong> Cybereyes w/ Thermographic Imaging &amp; Magnification. <strong>Gear:</strong> Ranger Arms SM-3 [Sniper Rifle, 14S, SA, 6-round magazine + 2 spares, Magnification-3 thermographic scope, gas-vent III recoil comp], Uzi III [SMG, 6M, BF], Armoured Vest w/ plates (4/3), Commlink. The Worst Kind of Mail, Double Exposure p.17.</p>",
    attrs: { body: 6, qui: 5, str: 5, cha: 3, int: 4, wil: 4 },
    reaction: 4, initDice: 1,
    skills: [
      { name: "Armed Combat", rating: 2 },
      { name: "Etiquette (Government)", attr: "charisma", rating: 4, spec: "Government" },
      { name: "Firearms", rating: 4 },
      { name: "Ground Vehicles", attr: "reaction", rating: 3 },
      { name: "Stealth", rating: 3 }
    ]
  },
  {
    name: "Peace-Enforcement Officer (PEO)",
    armorName: "Armor Jacket",
    weapons: ["ak97", "foresight500"],
    pro: 4, threat: 5, essence: 4, disposition: -1, armor: [5, 3],
    bio: "<p>The Hope Relief Camp's white-uniformed \"peace-enforcement officers\" — the muscle at the gates and inside the wire. <strong>Most PEOs are flesh-form soldier ant spirits wearing a human guise</strong> (see the True-Form Soldier Ant and GM Information, p.48). They search every arrival and quietly note any cyberware in Project Hope's records.</p><p><strong>Cyber/notes:</strong> boosted reflexes — Reaction 4 (8 augmented) plus a +10 manifest Initiative bonus (already included: 18 + 1D6). <strong>Gear:</strong> AK-97 [Assault Rifle, 8M, SA/BF/FA, 38-round clip + 4 spares, gas-vent II], Foresight Security 500 [Light Pistol, 6L, laser sight], Low-Light Imaging Goggles. A Glimmer of Hope, Double Exposure p.22.</p>",
    attrs: { body: 6, qui: 4, str: 4, cha: 3, int: 3, wil: 4 },
    reaction: 18, initDice: 1,
    skills: [
      { name: "Armed Combat", rating: 3 },
      { name: "Etiquette (Corporate)", attr: "charisma", rating: 2, spec: "Corporate" },
      { name: "Firearms", rating: 5 },
      { name: "Security Procedures", attr: "intelligence", rating: 3 },
      { name: "Stealth", rating: 3 }
    ]
  },
  {
    name: "PEO Shaman",
    armorName: "Armored Suit + Helmet",
    weapons: ["ak97"],
    pro: 4, threat: 5, essence: 6, magic: 6, magicType: "shaman", tradition: "shamanic", totem: "Insect (Hive Queen)",
    disposition: -1, armor: [9, 7],
    bio: "<p>An insect shaman serving the Hive Queen — the camp's defence against <em>magical</em> intrusion. Two patrol Hope Relief Camp, sweeping it astrally to make sure nobody slips in that way. Neither is on duty between noon and 8 p.m., and both are warded against mental magic the same way Tung and the PEOs are (the Hive Queen's Protection, p.27).</p><p><strong>Spells:</strong> Armor 4, Chaotic World 5, Mana Barrier 4, Mana Bolt 4, Powerball 5, Sleep 5. <strong>Gear:</strong> AK-97 [8M, SA/BF/FA, gas-vent III], Armoured Suit (8/6) + Helmet (1/1) = 9/7, Commlink, Low-Light/Thermographic goggles. Hope Relief Camp, Double Exposure p.26.</p>",
    attrs: { body: 3, qui: 3, str: 4, cha: 5, int: 5, wil: 6 },
    reaction: 5, initDice: 1,
    skills: [
      { name: "Armed Combat", rating: 2 },
      { name: "Conjuring", attr: "charisma", rating: 6 },
      { name: "Etiquette (Corporate)", attr: "charisma", rating: 2, spec: "Corporate" },
      { name: "Firearms", rating: 3 },
      { name: "Security Procedures", attr: "intelligence", rating: 2 },
      { name: "Sorcery", attr: "willpower", rating: 3 }
    ]
  },
  {
    name: "Butcher (Ganger)",
    armorName: "Armor Jacket",
    weapons: ["uzi3", "knife"],
    pro: 2, threat: 2, essence: 6, disposition: -1, armor: [5, 3],
    bio: "<p>A member of the <strong>Butchers</strong>, a Glow City street gang dumb and desperate enough to ram a relief-camp fence and storm in shooting. Cannon fodder for the camp's raid event — fifteen of them come through the breach and most don't come back out. Use the standard SR2 <strong>Ganger</strong> archetype (and the <strong>Gang Boss</strong> archetype for their leader); these are representative numbers.</p><p><strong>Gear:</strong> Armour Jacket (5/3), an SMG or assault rifle, a knife. Miscellaneous Encounters, Double Exposure p.30.</p>",
    attrs: { body: 4, qui: 4, str: 4, cha: 2, int: 3, wil: 3 },
    initDice: 1,
    skills: [
      { name: "Armed Combat", rating: 4 },
      { name: "Etiquette (Street)", attr: "charisma", rating: 2, spec: "Street" },
      { name: "Firearms", rating: 4 },
      { name: "Stealth", rating: 2 }
    ]
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
