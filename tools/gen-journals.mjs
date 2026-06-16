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
    page("GM Overview — Double Exposure", "Run Index — Scenes, Cast & Handouts",
      `<p>Everything ships in this module's compendia: <strong>Scenes</strong> (maps), <strong>Cast</strong> (NPCs), and these journals. Suggested mapping:</p>
       <table border="1" cellpadding="4" style="border-collapse:collapse;">
         <tr><th>Encounter (journal)</th><th>Scene</th><th>Key Cast</th></tr>
         <tr><td>1. Digging Their Own Graves</td><td>Cyber Shipment — Warehouse &amp; Route</td><td>Aztech Driver, Aztech Security Guard</td></tr>
         <tr><td>2. Six Feet Under</td><td>(any Seattle street/road)</td><td>DocWagon Courier</td></tr>
         <tr><td>3. The Worst Kind of Mail</td><td>Seattle Streets — The Meet (McHugh's)</td><td>Simon Juárez, FBI Sniper</td></tr>
         <tr><td>4. The Big Interview</td><td>(downtown office — narrative)</td><td>(Ms. Montagu, narrative)</td></tr>
         <tr><td>5. A Glimmer of Hope</td><td>Hope Relief Camp — Compound</td><td>Peace-Enforcement Officer</td></tr>
         <tr><td>6. Hope Relief Camp</td><td>Hope Relief Camp — Compound / Registration Building</td><td>Jonathan Tung, PEO, PEO Shaman</td></tr>
         <tr><td>6b. Camp Life — Events</td><td>Hope Relief Camp — Compound</td><td>PEO, PEO Shaman, Butcher (Ganger)</td></tr>
         <tr><td>7. The Medical Center</td><td>(Faith Relief Camp clinic — narrative/placeholder)</td><td>Jonathan Tung (keyholder)</td></tr>
         <tr><td>New Dawn Environics (branch)</td><td>New Dawn Environics — Research Lab</td><td>Aztech Security Guard, True-Form Ants</td></tr>
         <tr><td>8. Picking Up the Pieces</td><td>(resolution — no map)</td><td>Simon Juárez</td></tr>
         <tr><td>Climax — the Hive</td><td>The Hive — Queen's Lair</td><td>Hive Queen, True-Form Ants</td></tr>
       </table>
       <p><strong>GM references:</strong> "Insect Spirits &amp; the Hive" (possession, summoning) and "Awareness &amp; Detection" (awareness points, chem-sniffer). <strong>Player Handouts:</strong> the Project Hope enrollment form (give at Encounter 4) and Tung's decoded essay (give at Encounter 8 if cracked).</p>`),
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
      `<p>The bus parks just inside the main gates and everyone is asked to step off. Camp security — <strong>"peace-enforcement officers" (PEOs)</strong> — spend about an hour searching the new arrivals: hands through personal belongings, scanners for weapons and contraband, and metal detectors that flag <em>cyberware</em> (which Project Hope quietly records). Use the <strong>Peace-Enforcement Officer (PEO)</strong> stat block in the Cast — and note that most PEOs are flesh-form soldier ant spirits in human guise.</p>
       <p><strong>This is the scene's real challenge.</strong> Smuggling something past the search is a runner's Quickness (Palming/Stealth) against the guards' <strong>Perception Test</strong> and scanners. Anything detected is confiscated; the team isn't arrested, just disarmed and noted. Clever stashing, an outside cache, or simply going in clean are the ways through.</p>
       <p><strong>The perimeter.</strong> The whole camp is ringed by an <strong>8 m chain-link fence topped with three strands of razorwire</strong>, electrified for a <strong>14S</strong> shock to anyone who touches it (and no way to tell from ten metres out that it's live). The fence is <strong>Barrier Rating 24</strong> against vehicles and the like. The party line is that it keeps Glow City's gangs out; really it keeps the "guests" in.</p>
       <p><em>Legal note for color: a warrantless search would be illegal in the UCAS, but the moment an applicant steps through the gate they're on Project Hope's land and "agree" to its rules. The camp isn't truly extraterritorial — the guards simply act as if it is, and the desperate don't argue.</em></p>`),
    page("5. A Glimmer of Hope", "Behind the Scenes & Debugging",
      `<p>Getting in is supposed to cost the team its firepower — that tension (infiltrators, disarmed, deep in hostile territory) is the point of the camp arc. Don't soften the search, but do reward genuinely clever smuggling or a decker/rigger who arranges an outside cache.</p>
       <p>If the team tries to fight their way past the gate, they reveal themselves far too early; treat it as a failed infiltration (active alert, the camp's full security responds) rather than a winnable stand-up fight, and steer toward escape and a different approach.</p>`)
  ]),

  journal("6. Hope Relief Camp", [
    page("6. Hope Relief Camp", "Read to the Players",
      `<p><em>(Once the team is past the gate search and walking into the camp proper.)</em></p>
       <blockquote><p>It's beautiful. After the Barrens, that word feels obscene — but it fits. Trees. Flowers. Clean, manicured ground. Birds. People who look <em>content</em>, moving through honest work in the morning light. It should be a relief, and instead it crawls up the back of your neck: nothing this good belongs out here. You feel completely, dangerously out of place.</p></blockquote>
       <p>Halfway to the registration building, a warm, well-dressed man intercepts the team with a handshake and a genuine smile. "Welcome. I'm Jonathan Tung — the camp director. Anything you need, anything you want to know, you just ask me." (Paraphrased; full boxed text on p.23.)</p>`),
    page("6. Hope Relief Camp", "Talking to Jonathan Tung",
      `<p>Play <strong>Tung</strong> (Cast compendium) as caring, charming, and <em>almost</em> too good to be true — never sinister. He'll happily answer questions. Sample:</p>
       <p><strong>"How many people are here?"</strong> — "Depends what you mean by here. There are several camps across the Barrens. Almost everyone comes to <em>Hope Relief Camp</em> for training, then transfers to wherever their skills fit best. This camp's home to about <strong>200</strong> right now; all the camps together, more than <strong>2,000</strong>."</p>
       <p>Let the players probe; Tung deflects nothing and reveals nothing damning. The wrongness should come from <em>tone</em>, not slips.</p>`),
    page("6. Hope Relief Camp", "Behind the Scenes (GM)",
      `<p>Keep the Plot Synopsis in mind. <strong>Jonathan Tung is the Hive Queen's willing servant</strong> and her most direct link to this camp. Five years ago he felt the Queen's overwhelming "love," and he has devoted his life to bringing it to everyone else — by force if need be. He believes his cause is noble and sleeps soundly.</p>
       <p>The camps process and prepare hundreds of the destitute for the day the Queen will "love" the whole population — i.e., feed and convert them into the colony. Tung knows building the new hive takes serious money, which is why he funnels <strong>Renraku</strong>'s funding (via the experimentation on enrollees) into the Brotherhood. The idyll is the lure; the people are livestock.</p>`),
    page("6. Hope Relief Camp", "Investigation & Debugging",
      `<p>This is a slow-burn infiltration, not a fight. Reward poking around: legwork among the enrollees, watching the routine, and especially <strong>astral perception</strong> — a magician who looks at the PEOs or the "happiest" workers sees the insect-spirit truth (flesh-forms). Each clue should tighten the dread.</p>
       <p>Don't let the players force a confrontation here; they're unarmed and outnumbered. If they push too hard too fast, escalate camp awareness (see the Universal Brotherhood Awareness rules) rather than dropping the whole camp on them at once — the tension is the point.</p>`)
  ]),

  journal("6b. Camp Life — Events", [
    page("6b. Camp Life — Events", "Attempted Security Breach — The Butchers Raid",
      `<p>One night, while the team sleeps, the <strong>Butchers</strong> — a Glow City gang that's been eyeing the camp's fences — ram a heavy truck through the wire and storm in shooting. This is the scene that <em>shows</em> the players what the PEOs really are. Run it as a fast capsule timeline (≈ 35 minutes):</p>
       <table border="1" cellpadding="4" style="border-collapse:collapse;">
         <tr><th>Time</th><th>Event</th></tr>
         <tr><td>00:00</td><td>15 Butchers pour through the breach, firing at anything that moves (Cast: <strong>Butcher (Ganger)</strong>).</td></tr>
         <tr><td>00:30</td><td>5 PEOs take cover and start picking them off.</td></tr>
         <tr><td>00:35</td><td>Two punks vanish in a multicoloured fireball — a PEO shaman's handiwork.</td></tr>
         <tr><td>00:42</td><td>Half the gang is already dead; one PEO has taken a single hit.</td></tr>
         <tr><td>00:55</td><td>The survivors break and run; two dive behind the truck.</td></tr>
         <tr><td>01:00</td><td>Those two catch a second fireball.</td></tr>
         <tr><td>02:15</td><td>10 more PEOs arrive and execute the wounded — "prisoners are a waste of resources."</td></tr>
         <tr><td>04:21</td><td>Tung's voice over the loudspeaker: everything's fine, no need to worry.</td></tr>
         <tr><td>12:01</td><td>The PEOs shove the truck back out and start repairing the fence.</td></tr>
         <tr><td>34:45</td><td>Fence as good as new.</td></tr>
       </table>
       <p><strong>The point:</strong> the runners see PEOs moving far faster than any normal guard and dropping gangers with battle magic they can't quite place — and they see that a "charity" answers a gang raid with overwhelming, lethal, cybered-and-magical force. That should scare the drek out of them.</p>`),
    page("6b. Camp Life — Events", "Hey Charlie, Something's Wrong with the Computer",
      `<p>If a decker jacks into the terminal in the living quarters, they get a faceful of Project Hope propaganda — and, unless they're careful, a hidden routine logs their keystrokes to a file. Spotting and removing the shoulder-surfer takes a successful <strong>Computer (4) Test</strong>; fail and the camp has a record of exactly what the decker went looking for (feed that into the Awareness Points).</p>`),
    page("6b. Camp Life — Events", "Whatever Happened to Freedom of the Press?",
      `<p>Over a too-pleasant camp breakfast, a friendly stranger sits down and chats — then drifts into pointed questions: "Seen anything strange around here?" "What do any of us really know about Project Hope?" He's one of the <em>other</em> parties poking at the camp (recall Juárez warned the FBI isn't the only one watching). Play him as bait <em>and</em> as a potential ally — paranoid runners may burn a useful contact, while talkative ones may tip their hand to a Brotherhood plant. Let the table decide which he turns out to be.</p>`)
  ]),

  journal("7. The Medical Center", [
    page("7. The Medical Center", "Read to the Players",
      `<p><em>(At Faith Relief Camp — a sister camp whose one real difference is the Medical Center, a clean white building serving as the camp infirmary.)</em></p>
       <blockquote><p>The Medical Center is the cleanest thing for kilometres: white walls, real equipment, calm staff in scrubs moving between recovery beds. A couple of dozen patients rest in the open ward. It looks exactly like what it claims to be — a charity clinic doing honest medicine. Which is precisely the problem.</p></blockquote>
       <p>(Paraphrased; full text on p.41.)</p>`),
    page("7. The Medical Center", "Main Floor — the Clinic",
      `<p>The ground floor is a believable standard clinic: entrance/administration, recovery rooms, examination rooms, a prep room, operating rooms, offices, and washrooms — staffed by ordinary-seeming doctors and nurses caring for ~20 enrollees. Nothing here is overtly wrong, and the staff give genuine medical attention. Play it straight; the dread is in what's <em>below</em>.</p>
       <p><em>Map: see the Medical Center main-floor layout (p.41); the secure elevator and a heavy metal stair door lead down.</em></p>`),
    page("7. The Medical Center", "The Secure Lower Level (Getting the Paydata)",
      `<p>The real prize — the paydata proving what Project Hope is doing — is on the <strong>secure lower level</strong>. Getting down is the puzzle:</p>
       <ul>
         <li>The <strong>elevator</strong> needs a <strong>keycard + thumbprint</strong> (Rating 5 maglock and scanner). <em>None</em> of the ground-floor staff carry the card — only high-ranking Project Hope personnel like <strong>Jonathan Tung</strong>.</li>
         <li>A failed bypass sounds an alarm and pings Tung; PEOs respond and may disable the elevator, forcing the team to the heavy metal <strong>stair door</strong> instead.</li>
       </ul>
       <p>So the team needs Tung's credentials (lift them, coerce, or social-engineer), a Rating-5 decking/electronics defeat of the locks, or the stairs under cover. The lower level keeps up the patient-friendly clinic façade on its surface — but this is where the conspiracy lives. (Continued in <em>Getting at the Paydata</em>, p.45.)</p>`),
    page("7. The Medical Center", "Debugging",
      `<p>If the locks stop the team cold, let legwork or a captured/charmed staffer point at Tung as the only key-holder — that turns the obstacle into a goal (get to Tung) rather than a dead end. Award faction Awareness Points (see the Awareness reference) for noisy attempts rather than instantly collapsing the camp on them; an alarm here should ratchet tension and bring PEOs, not end the run.</p>`)
  ]),

  journal("New Dawn Environics (Branch)", [
    page("New Dawn Environics (Branch)", "Read to the Players",
      `<p><em>(For runners who investigate the camps' water/soil supplier in Kent — the alternate way into the truth.)</em></p>
       <blockquote><p>New Dawn Environics looks like a research park that swallowed a fortress. Manicured lawns, a babbling brook, songbirds — and a four-metre electrified fence with hard-eyed guards cradling assault rifles while the birds land on their shoulders. Trucks roll up, get scanned, and vanish through a big door that opens in the side of the main building and swallows them into the dark.</p></blockquote>
       <p>Inside, in the treatment hall, the smell hits first — toxic effluent and rotting flesh, worse than anything since the enrollment office. The lights come up on a room a hundred metres long that is almost entirely a <strong>pool of brown sludge</strong>, popping and burbling. Then something floats up: a bloated, sore-covered corpse with an <em>insect</em> fused to it — which detaches and hisses at you. In the corner, the muck swirls and an amorphous brown shape begins to <strong>rise</strong>, spindly limbs and a forming head. Something is very, very wrong at New Dawn. (Paraphrased; full boxed text on p.33.)</p>`),
    page("New Dawn Environics (Branch)", "Hooks & Horror",
      `<p>Lean into the contrast — "At One With Nature" on the sign, an abattoir underneath. Gross them out, then scare them: the effluent pool is where the colony dumps spent hosts and incubates new spirits, complete with <strong>dog-sized flesh-eating larvae</strong> drifting in the muck. This branch can reveal the insect-spirit truth earlier and more viscerally than the camps do.</p>`),
    page("New Dawn Environics (Branch)", "Behind the Scenes & Opposition",
      `<p><strong>New Dawn Environics</strong> is a three-year-old environmental-cleanup corp — and a big one. It owns 10+ Seattle sites (including a downtown corporate office) and enough payroll to claim <strong>extraterritoriality</strong>, so UCAS law can't touch its guards, who shoot first and ask later. The Kent plant supplies the relief camps' water and soil; its real function is body disposal and incubation for the Hive.</p>
       <p><strong>Opposition:</strong> AK-97 perimeter guards — use the <strong>Aztechnology Security Guard</strong> stat block (re-skin as New Dawn security). In and around the pool: <strong>True-Form Worker</strong> and <strong>Soldier Ants</strong>, larvae, and freshly-incubating spirits (Cast compendium). Escalate toward the Queen's attention via the Awareness rules.</p>`),
    page("New Dawn Environics (Branch)", "Debugging",
      `<p>This site can hand the team the big reveal on a platter — that's fine. Let it land, but don't let a small team try to clear an extraterritorial corp facility full of insect spirits in a stand-up fight; treat overreach as a fight-and-flee that confirms the horror and points them back at Project Hope and the paydata. The two branches (camps and New Dawn) converge: the records tie New Dawn, Renraku, and Project Hope together.</p>`)
  ]),

  journal("8. Picking Up the Pieces", [
    page("8. Picking Up the Pieces", "Getting at the Paydata",
      `<p>The prize is the encrypted records on Project Hope's systems — guarded by the same password subsystem as the Faith Relief Camp central computer ("Springs Eternal"). The team either rides that access in, or cracks the files cold: a successful <strong>Computer (9) Test</strong> (GM's discretion) defeats the security and encryption.</p>
       <p>At first the data reads like ordinary medical records — surgical procedures, cyberware fittings. Then the truth surfaces: illegal cyberware, BTL chips, bootleg simsense and cybernetic-limb work performed on enrollees; documents that <strong>incontrovertibly link Renraku to Project Hope</strong>; and proof that Project Hope actually belongs to the <strong>Universal Brotherhood</strong>. Renraku is especially interested in behavioural modification via simsense — it has nearly perfected <em>subjective time dilation</em>, which makes a victim feel they spent 200+ years in hell during two real-world days.</p>
       <p>Buried among it is a separate, heavily encrypted personal document by <strong>Jonathan Tung</strong>. Decoding it takes real time; when (and if) the team cracks it, hand the players <strong>Player Handout 1 (Tung's essay)</strong> — unrelated to the plot mechanically, but something to chew on for a long while.</p>`),
    page("8. Picking Up the Pieces", "Don't Forget the Vid",
      `<p>Once the team escapes the camp, they take the files to <strong>Juárez</strong>. With them he has everything he needs to gut Renraku — not in court, but as <em>leverage</em>: blackmail to hold over the corp the next time it crosses the UCAS.</p>
       <p>On hand-off, Juárez transfers the promised <strong>15,000¥</strong> to each runner and returns their blackmail vids. He asks if the team kept a copy of the files; they say no. He says the vids he's handing back are the originals. <em>Both are lying, of course</em> — neither side gives up that kind of leverage. Let the players enjoy the mutual distrust; the copies may matter in a later run.</p>`),
    page("8. Picking Up the Pieces", "Beyond Hope (Aftermath)",
      `<p>With the dirt the runners dug up, the UCAS government comes down hard. Within about a week it shutters every Project Hope relief camp and the <strong>New Dawn Environics</strong> facility in Kent. Publicly it's a charity-fraud scandal; what really happened to the Hive Queen, the colony, and the people already transformed is left for the GM (and future adventures) to decide. The bugs are rarely gone for good.</p>
       <p><strong>Loose ends to seed sequels:</strong> the fate of Agent Clint Ranger; the copies both the team and Juárez secretly kept; surviving flesh-forms scattering into the sprawl; and whether the Queen herself was actually put down.</p>`)
  ]),

  journal("GM Information — Insect Spirits & the Hive", [
    page("GM Information — Insect Spirits & the Hive", "The Bug Metaplot",
      `<p>Most shamanic totems are well known; the <strong>insect totems</strong> are not — followed in secret, and considered abhorrent by most awakened cultures, though shamans rarely see their own path as evil. An insect shaman gains real power, but at a price: the totem's awesome will eventually dominates them. The greatest of these spirits is the <strong>Hive Queen</strong>.</p>
       <p>In Double Exposure, the shaman who first summoned this Queen is long dead — she killed and replaced him, and now operates as her own master, building a colony in the shadows beneath the relief camps with Renraku's unwitting money.</p>`),
    page("GM Information — Insect Spirits & the Hive", "Possession & Transformation",
      `<p>A summoned insect spirit must <strong>incubate inside a living (meta)human host</strong>. Over a span tied to the spirit's Force, the host body warps as the spirit takes hold — and the outcome ranges from an obvious chitinous horror to a <strong>flesh-form that looks like an ordinary person</strong>.</p>
       <p>How human the result looks depends on the host's will against the spirit's power. Make an <strong>opposed test</strong>: the host's <strong>Willpower</strong> versus a target number equal to <strong>twice the spirit's Force</strong>. Because the Queen herself is doing the summoning here, add <strong>+2</strong> to the host's target number (making a clean, human-passing bond more likely). The more the spirit's successes dominate, the more complete and seamless the transformation.</p>
       <p>This is why the camp's PEOs and "happiest" workers can pass for human in the material world yet read as insect spirits on the astral — and why a low-Willpower enrollee is exactly what the colony wants.</p>`),
    page("GM Information — Insect Spirits & the Hive", "Summoning the Swarm",
      `<p>Each day, the Hive Queen (and any insect shaman serving her) can summon a number of insect <strong>workers</strong> equal to her <strong>Force Rating</strong>. Soldiers exist to protect the Queen; workers tend the cocoons and larvae. Every new spirit needs a living host to incubate in — which is the real purpose of funnelling the destitute into the camps.</p>
       <p>For the Queen's full powers, attributes, and the manifest/astral initiative bonuses, see her entry in the Cast compendium and the True-Form Soldier/Worker Ants. Full descriptions of insect-spirit powers are in the Shadowrun sourcebooks (Grimoire II, the Neo-Anarchists' Guide to Real Life).</p>`)
  ]),

  journal("Player Handouts", [
    page("Player Handouts", "Handout 2 — Project Hope Enrollment Form",
      `<p style="text-align:center;"><strong>★ PROJECT HOPE ★</strong><br><em>A New Dawn for Everyone</em><br>RELIEF CAMP ENROLLMENT FORM</p>
       <hr>
       <p>"Tired, hungry, forgotten? You don't have to be. Project Hope offers clean shelter, three square meals, honest work, and a fresh start out where the air is sweet. Fill this in — we'll take it from here."</p>
       <table border="1" cellpadding="4" style="border-collapse:collapse;width:100%;">
         <tr><td><strong>Full Name</strong></td><td>________________________</td></tr>
         <tr><td><strong>Also Known As</strong></td><td>________________________</td></tr>
         <tr><td><strong>Age / Metatype</strong></td><td>________________________</td></tr>
         <tr><td><strong>System Identification No. (if any)</strong></td><td>________________________</td></tr>
         <tr><td><strong>Skills / Trade</strong></td><td>________________________</td></tr>
         <tr><td><strong>Current lodging</strong></td><td>________________________</td></tr>
         <tr><td><strong>Next of kin / contacts</strong></td><td>________________________</td></tr>
         <tr><td><strong>Notable medical history</strong></td><td>________________________</td></tr>
         <tr><td><strong>Cyberware / bioware (please declare)</strong></td><td>________________________</td></tr>
         <tr><td><strong>Why are you seeking Hope?</strong></td><td>________________________</td></tr>
       </table>
       <p style="font-size:11px;">By signing below I agree to abide by all rules and procedures of the Project Hope relief camps while on Project Hope grounds, and consent to reasonable security screening. <br><br>Signed: ____________________  Date: __________</p>
       <p style="font-size:10px;color:#666;"><em>(Original handout authored for this module; voice-recognition entry available for those who cannot write.)</em></p>`),
    page("Player Handouts", "Handout 1 — A Found Document (Tung's Essay)",
      `<p><em>(Hand to the players only if/when they decode Jonathan Tung's encrypted personal file. It has no mechanical bearing on the run — it's there to unsettle.)</em></p>
       <hr>
       <blockquote>
         <p>They ask me how I can smile out here, among the lost. They don't understand yet. I didn't either, once.</p>
         <p>I was as empty as any of them when She found me. I had nothing left to give and no one to give it to — and then I was <em>filled</em>. Not crushed. Not erased. <strong>Loved</strong>, completely, for the first time in my life. You cannot describe that warmth to someone who has never felt it; you can only wish it for them, the way you'd wish food for the starving.</p>
         <p>So that is my work now. Not charity — charity is a coin you toss and forget. I am offering something whole. A home where no one is ever alone again, where every hand has a purpose and every purpose serves the same beautiful thing. They come to us broken. They leave us part of something that will never let them go.</p>
         <p>Mankind is slow to accept a gift it doesn't understand. That is alright. I was slow, too. We have time, and we have patience, and we have Her. One day they will all feel what I felt — and on that day they will thank me, every one, for not giving up on them.</p>
         <p>Sleep well. You are loved.</p>
         <p style="text-align:right;">— J.T.</p>
       </blockquote>
       <p style="font-size:10px;color:#666;"><em>(Original text authored for this module, in the spirit of the in-fiction essay; not a transcription.)</em></p>`)
  ]),

  journal("Reference — Awareness & Detection", [
    page("Reference — Awareness & Detection", "Awareness Points",
      `<p>So long as the runners behave like ordinary enrollees, they're treated like any other. The moment they snoop, snatch, or fight, the various factions start to <em>notice</em>. The GM tracks separate <strong>Awareness Point</strong> totals for each faction watching the camps — chiefly the <strong>Universal Brotherhood (UB)</strong>, plus <strong>Renraku (RKS)</strong> and the government <strong>EPA</strong> agent — and a faction's response escalates with its total.</p>
       <p>After any conspicuous action, judge who plausibly noticed and award that faction's points. Sample values:</p>
       <table border="1" cellpadding="4" style="border-collapse:collapse;">
         <tr><th>Action</th><th>Awareness</th></tr>
         <tr><td>Attempting to bring guns into the camp</td><td>1 UB</td></tr>
         <tr><td>Fighting with another enrollee</td><td>1 UB</td></tr>
         <tr><td>Owning cyberware</td><td>1 UB / RKS</td></tr>
         <tr><td>Conspicuously watching or tailing the guards</td><td>2 UB</td></tr>
         <tr><td>Getting caught by guards in secure areas</td><td>4 UB</td></tr>
         <tr><td>Getting spotted by the EPA agent doing something illegal</td><td>1 EPA</td></tr>
       </table>
       <p>As a faction's total climbs, dial up its response — extra watchers, "friendly" questions, a search of the runners' bunk, reassignment, and finally open confrontation. The full per-faction Awareness Point tables are on p.51–52 of the adventure.</p>`),
    page("Reference — Awareness & Detection", "Chemical Detection (Chem-Sniffers)",
      `<p>Camp and corporate security use chemical sniffers to find munitions. The base Target Number for a sniffer to detect contraband is <strong>10</strong>; what a character is carrying <em>lowers</em> that TN (more ordnance = easier to sniff out). Total the modifiers below and subtract from 10:</p>
       <table border="1" cellpadding="4" style="border-collapse:collapse;">
         <tr><th>Carried</th><th>Modifier</th></tr>
         <tr><td>Every 8 standard rounds (or part)</td><td>−1</td></tr>
         <tr><td>Every 6 explosive rounds (or part)</td><td>−1</td></tr>
         <tr><td>Each concussion or fragmentation grenade</td><td>−1</td></tr>
         <tr><td>Every 2 smoke or flash grenades</td><td>−1</td></tr>
         <tr><td>Every 3 mini-grenades (any type)</td><td>−1</td></tr>
         <tr><td>Every 30 g standard (non-plastique) explosive</td><td>−1</td></tr>
         <tr><td>Every 100 g plastique</td><td>−1</td></tr>
       </table>
       <p><em>Example: a samurai carrying an Ares Predator with a spare clip (−3 from rounds) and two frag grenades (−2) hits −5 total — TN 10 → 5. The sniffer finds the hardware easily. Pack light to get through the gate.</em></p>`)
  ])
];

let n = 0;
for (const j of JOURNALS) {
  const safe = j.name.replace(/[^A-Za-z0-9]+/g, "_").replace(/^_|_$/g, "");
  writeFileSync(`${DIR}/${safe}_${j._id}.json`, JSON.stringify(j, null, 2) + "\n");
  n++;
}
console.log(`wrote ${n} journal(s)`);
