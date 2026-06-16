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
  ]),

  journal("1. Digging Their Own Graves", [
    page("1. Digging Their Own Graves", "Read to the Players",
      `<p><em>(The team's fixer calls in the middle of routine downtime — Matrix scanning, gear, whatever the runners are doing.)</em></p>
       <blockquote><p>A familiar face flickers onto your screen: your fixer, looking a little too pleased. "Got a quick one for you, and it's sweet. Aztechnology's moving a shipment of cyberware from a warehouse out to one of their research labs tonight. I've got a buyer who'd pay top nuyen to relieve them of it — so arrange a little accident for that truck somewhere between the warehouse and the lab. It rolls at twenty-two hundred. A thousand up front, more on delivery. Easy money. And don't keep any samples for yourself…"</p></blockquote>
       <p>(Paraphrased — read it in your own voice; full boxed text is on p.11 of the adventure.)</p>`),
    page("1. Digging Their Own Graves", "Hooks & Behind the Scenes",
      `<p><strong>Hooks.</strong> Keep this one low-stress and direct. It should feel like a routine smash-and-grab; the runners should <em>not</em> suspect anything bigger is going on.</p>
       <p><strong>Behind the Scenes.</strong> The adventure opens with two pre-scripted warm-up runs (this and "The Worst Kind of Mail"). Their real purpose is leverage: <strong>Special Agent Simon Juárez</strong> has quietly hired and surveilled the team through cut-outs, documenting everything, so he has a deniable hold over them when he needs help later. The Aztech shipment is genuinely cyberware bound for a research lab — the first faint thread connecting Aztechnology, Renraku, and the experiments behind Project Hope.</p>`),
    page("1. Digging Their Own Graves", "The Run & Opposition",
      `<p>The shipment leaves a Tacoma warehouse around <strong>22:00</strong> in a gray, nondescript armoured truck and runs to a research facility. Aztech believes the route is safe, so it travels <strong>lightly guarded</strong>. The cargo is a 1 m³ cooled storage box (~40 kg) of cybernetic parts.</p>
       <p><strong>Armoured Truck</strong> — Handling 4, Speed 30/120, Body/Armour 4/12, Signature 5, Pilot 1, ECM/ECCM none, no sensors; 3 bucket seats, rear-opening tailgate with firing gunports.</p>
       <p><strong>Crew</strong> (see the Cast compendium): 1× <strong>Aztechnology Driver (Rigger)</strong>, 3× <strong>Aztechnology Security Guard</strong> holed up in the back firing through the gunports.</p>
       <p><strong>Pay:</strong> 1,000¥ up front from the fixer, with the buyer's fee (~5,000¥) on delivery of the intact box.</p>`),
    page("1. Digging Their Own Graves", "Dropping Clues & Debugging",
      `<p><strong>Dropping clues.</strong> Use this run to plant the first seed that something is off about Aztechnology — through the nature of the cargo (cyberware headed to a <em>research</em> lab) and any legwork the team does. It quietly sets up the larger Project Hope investigation.</p>
       <p><strong>Debugging.</strong> If the runners decline or the job falls apart, nothing is lost: Juárez has other ways to pull them in, and the adventure proceeds. Don't let a botched warm-up end the campaign — fail forward to the next encounter.</p>`)
  ]),

  journal("2. Six Feet Under", [
    page("2. Six Feet Under", "Read to the Players",
      `<p><em>(A couple of real-time weeks after the last job, the team's Johnson calls again.)</em></p>
       <blockquote><p>"Buddy, have I got a job for you. Low-danger, high-pay — just the kind you like. DocWagon's moving some sample cases from one of its storage labs out to a response centre. My principal wants one of those cases — quietly. Snatch it, hand it off, walk away. Maybe eight thousand in it for you."</p></blockquote>
       <p>(Paraphrased; full boxed text on p.13.)</p>`),
    page("2. Six Feet Under", "Hooks & Behind the Scenes",
      `<p><strong>Hooks.</strong> The second scripted warm-up — keep it a straightforward, low-stress "milk run." It should reassure the players that not every gig is strange and dangerous, and give Juárez more documented dirt.</p>
       <p><strong>Behind the Scenes.</strong> Once again <strong>Juárez</strong> pulls the strings through a cut-out Johnson. He has learned that DocWagon is transferring <strong>DNA / blood sample cases</strong> between facilities — perfect blackmail material — and frames a run to grab one. The case is a refrigerated metal unit housing a DNA sample board and several vials of blood.</p>`),
    page("2. Six Feet Under", "The Run & Opposition",
      `<p>Around <strong>10:00</strong>, a DocWagon courier leaves the research/storage facility at <strong>Cherry Street &amp; 13th Avenue</strong> and drives the sample case straight to <strong>Response HQ 1 in Auburn</strong>, via Pacific and First Avenues (both heavily guarded — only fools assault there). The smart intercept is on the open road in between.</p>
       <p><strong>Courier</strong> (Cast compendium): 1× <strong>DocWagon Courier</strong>, no fighter — will surrender the case rather than die. <strong>Vehicle:</strong> Chrysler-Nissan Jackrabbit (2 seats, rear-opening tailgate, cooled storage box).</p>
       <p><strong>Pay:</strong> ~8,000¥ for the intact sample case.</p>`),
    page("2. Six Feet Under", "Debugging",
      `<p>This is a daylight job in a populated area — <strong>any loud action attracts Lone Star in droves</strong>. If the team takes the case quietly and cleanly, all is well. If they decide to shoot up a city block in broad daylight, let the consequences land: Lone Star response, heat, and reputation damage are entirely earned. Unless the runners simply refuse the job, very little can actually go wrong here.</p>`)
  ]),

  journal("3. The Worst Kind of Mail", [
    page("3. The Worst Kind of Mail", "Read to the Players",
      `<p><em>(A message sets up a meet at <strong>McHugh's</strong>, a scummy dive bar at Fourth and Blanchard — neutral ground where only an idiot draws a weapon.)</em></p>
       <blockquote><p>At the corner table sits a clean-cut man who doesn't belong in a place like this. He waves you over, waits for you to settle, and says quietly: "My name is Special Agent Simon Juárez. I know who you are — and I know what you've done. That Aztechnology truck. The DocWagon case. I have it all, nicely documented." He lets that sink in. "Relax. I'd much rather you do me a favour than spend the next decade inside. Hear me out — you might even find it profitable."</p></blockquote>
       <p>(Paraphrased; full boxed text on p.15.)</p>`),
    page("3. The Worst Kind of Mail", "Hooks & Behind the Scenes",
      `<p><strong>This is the turn.</strong> The two warm-up runs were Juárez's entrapment, and now he plays the card: he has the team cold and offers a way to work it off. McHugh's is deliberate — a neutral dive where violence is suicidal, so the conversation stays a conversation.</p>
       <p><strong>The leverage.</strong> Juárez has documented evidence of both prior runs. He'd rather have deniable shadowrunners than make arrests. He's after Renraku — and the Project Hope relief camps are his way in.</p>`),
    page("3. The Worst Kind of Mail", "The Offer",
      `<p>Juárez wants the team to go <strong>undercover into the Project Hope relief camps</strong> and find out what's really happening to the people who disappear into them. The FBI already sent one of its own — <strong>Agent Clint Ranger</strong> — and he vanished.</p>
       <ul>
         <li><strong>Pay:</strong> 30,000¥ total, <strong>15,000¥ up front</strong>.</li>
         <li>He hints at lucrative follow-up work tied to Renraku if this goes well.</li>
       </ul>
       <p>See the <strong>Special Agent Simon Juárez</strong> entry in the Cast compendium.</p>`),
    page("3. The Worst Kind of Mail", "Leads & Where to Go Next",
      `<p>Juárez hands the team what the Bureau knows:</p>
       <ol>
         <li>Project Hope runs an <strong>enrollment office in downtown Seattle</strong>; word is you can present yourself as a viable candidate and get singled out for a work camp.</li>
         <li>Most camps sit in the <strong>Glow City</strong> region of the Barrens, and they run <em>unusually high security</em> for a peaceful charity.</li>
         <li>The camps get their water and soil from <strong>New Dawn Environics</strong>, a firm in Kent.</li>
         <li>The FBI is <strong>not the only group</strong> investigating Project Hope — and Juárez doesn't know who the others are.</li>
       </ol>
       <p>From here the team chooses a way in (the adventure branches):</p>
       <ul>
         <li><strong>The Big Interview</strong> — apply at the downtown enrollment office (p.18).</li>
         <li><strong>A Glimmer of Hope</strong> — try to infiltrate a relief camp directly (riskier; p.21).</li>
         <li><strong>New Dawn Environics</strong> — investigate the water/soil supplier in Kent (p.33).</li>
       </ul>`),
    page("3. The Worst Kind of Mail", "Debugging",
      `<p>The runners are not really free to walk: Juárez holds documented evidence of two crimes, and he keeps copies of the vids "in case." If they balk, he applies pressure — and the up-front nuyen plus the threat of prison should close the deal. If a group flatly refuses even under leverage, fall back on a more sympathetic angle (someone they care about is in the camps) to get them through the door, since the rest of the adventure assumes they take the job. Juárez also has <strong>FBI Snipers</strong> (Cast compendium) covering the meet.</p>`)
  ]),

  journal("4. The Big Interview", [
    page("4. The Big Interview", "Read to the Players",
      `<p><em>(For runners who choose to apply at the downtown <strong>Project Hope Enrollment Center</strong>.)</em></p>
       <blockquote><p>The sign promises hope; the smell promises something else — sweat, vomit, alcohol, fear, packed bodies. A long line of the most unfortunate-looking people you've ever seen slumps against the wall, waiting. A well-dressed woman at a desk catches your eye, manages a plastic smile, and waves you over. "Welcome. May I take your names?"</p></blockquote>
       <p>(Paraphrased; full boxed text on p.18.)</p>`),
    page("4. The Big Interview", "The Interview — Ms. Montagu",
      `<p>After the secretary takes their names (or aliases), the runners are sent to a back office to see caseworker <strong>Ms. Montagu</strong>, a polished Project Hope representative working a portable computer. She hands each applicant an enrollment form (<strong>Player Handout: Project Hope Enrollment Form</strong>) and delivers the pitch:</p>
       <p>The Hope Relief Camp out in the Glow City region of the Barrens offers square meals, a safe clean place to sleep, clothing, and honest work — gardening, light labour, even educating the others. A fresh start for anyone willing to take it.</p>
       <p><em>Montagu is the warm, reasonable face of the recruitment machine; she runs applicants by the numbers and offers a voice-recognition unit for the illiterate.</em></p>`),
    page("4. The Big Interview", "Getting Selected",
      `<p>To be singled out for a camp, the runners must read as plausibly destitute and pliable. Call for an appropriate social/disguise test (Etiquette (Street), an appropriate Con/Acting equivalent, or a Charisma test at the GM's discretion) — those who oversell wealth, attitude, or competence get politely shelved; convincing applicants are told to return for the bus to the camp.</p>
       <p>A face who blows the act isn't caught out violently here — they're simply not selected, which pushes the team toward another way in (a relief-camp infiltration, or New Dawn Environics).</p>`),
    page("4. The Big Interview", "Debugging",
      `<p>This is a no-combat scene by design. The danger is the team standing out — flashing gear, cyber, or money. Keep the pressure social. If the whole team fails to get selected, route them to <em>A Glimmer of Hope</em> (direct camp infiltration) or <em>New Dawn Environics</em>; the camp arc continues regardless of the door they use.</p>`)
  ]),

  journal("5. A Glimmer of Hope", [
    page("5. A Glimmer of Hope", "Read to the Players",
      `<p><em>(For runners who ride the relief-camp bus in — selected at the interview, or boarding directly.)</em></p>
       <blockquote><p>The bus grinds out through the Barrens for hours, no air conditioning, windows that won't open, packed with the desperate and the smell of them. At last a loudspeaker crackles: "Hope Relief Camp ahead — remain seated." Through the front glass you see it: a fenced compound of barracks with bullet-scarred walls and big domed gates. The bus stops. Security guards in clean white step up to escort the new arrivals off.</p></blockquote>
       <p>(Paraphrased; full boxed text on p.21.)</p>`),
    page("5. A Glimmer of Hope", "The Ride In",
      `<p>The bus to the camp leaves the enrollment center about <strong>three hours</strong> after the interview — miss it and the team waits for the next one (a good moment to run the Legwork). The ride is miserable: no AC, sealed windows, brutal heat and stench. Unless a character has olfactory protection, call for periodic <strong>Body (4) Tests</strong> to avoid getting sick.</p>`),
    page("5. A Glimmer of Hope", "The Gate Search (the infiltration crux)",
      `<p>The bus parks just inside the main gates and everyone is asked to step off. Camp security — <strong>"peace-enforcement officers" (PEOs)</strong> — search every arrival: hands through personal belongings and runs scanners for weapons, cyberweapons, and contraband. (Use the <strong>Aztechnology Security Guard</strong> stat block in the Cast for PEOs.)</p>
       <p><strong>This is the scene's real challenge.</strong> Anything the runners want inside has to beat the search — stashed cleverly, smuggled (opposed Stealth/Palming vs the guards' scanners and Perception), shipped in some other way, or simply left behind. Detected weapons are confiscated; the team is not arrested, just disarmed and noted. Reward clever planning here.</p>
       <p><em>Legal note for color: a warrantless search would be illegal in the UCAS, but the moment an applicant steps through the gate they're on Project Hope's land and "agree" to its rules. The camp isn't truly extraterritorial — the guards simply act as if it is, and the desperate don't argue.</em></p>`),
    page("5. A Glimmer of Hope", "Behind the Scenes & Debugging",
      `<p>Getting in is supposed to cost the team its firepower — that tension (infiltrators, disarmed, deep in hostile territory) is the point of the camp arc. Don't soften the search, but do reward genuinely clever smuggling or a decker/rigger who arranges an outside cache.</p>
       <p>If the team tries to fight their way past the gate, they reveal themselves far too early; treat it as a failed infiltration (active alert, the camp's full security responds) rather than a winnable stand-up fight, and steer toward escape and a different approach.</p>`)
  ])
];

let n = 0;
for (const j of JOURNALS) {
  const safe = j.name.replace(/[^A-Za-z0-9]+/g, "_").replace(/^_|_$/g, "");
  writeFileSync(`${DIR}/${safe}_${j._id}.json`, JSON.stringify(j, null, 2) + "\n");
  n++;
}
console.log(`wrote ${n} journal(s)`);
