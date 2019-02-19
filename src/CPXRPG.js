const POWERS = [
  {id:"Abb", name:"Ability Boost", cat:"alteration"},
  {id:"Abi", name:"Ability Increase", cat:"alteration"},
  {id:"Abso", name:"Absorption", cat:"defensive"},
  {id:"Adap", name:"Adaptation", cat:"defensive"},
  {id:"Affl", name:"Affliction", cat:"offensive"},
  {id:"Alte", name:"Alter Ego", cat:"alteration"},
  {id:"Altr", name:"Alteration Ray", cat:"control"},
  {id:"Altf", name:"Alternate Form", cat:"alteration"},
  {id:"Aqua", name:"Aquatic", cat:"alteration"},
  {id:"Astr", name:"Astral Projection", cat:"mental"},
  {id:"Aura", name:"Aura", cat:"offensive"},
  {id:"Bind", name:"Binding", cat:"offensive"},
  {id:"Blas", name:"Blast", cat:"offensive"},
  {id:"Burr", name:"Burrowing", cat:"movement"},
  {id:"Cont", name:"Continuum Control", cat:"control"},
  {id:"Corr", name:"Corrosion", cat:"offensive"},
  {id:"Dang", name:"Danger Sense", cat:"sensory"},
  {id:"Dazz", name:"Dazzle", cat:"offensive"},
  {id:"Dens", name:"Density", cat:"alteration"},
  {id:"Dete", name:"Detection", cat:"sensory"},
  {id:"Dimc", name:"Dimension Control", cat:"alteration"},
  {id:"Dimt", name:"Dimensional Travel", cat:"movement"},
  {id:"Drea", name:"Dream Control", cat:"mental"},
  {id:"Dupl", name:"Duplication", cat:"alteration"},
  {id:"Elem", name:"Element Control", cat:"control"},
  {id:"Emot", name:"Emotion Control", cat:"mental"},
  {id:"Enec", name:"Energy Control", cat:"control"},
  {id:"Ened", name:"Energy Drain", cat:"offensive"},
  {id:"Envi", name:"Environmental Awareness", cat:"sensory"},
  {id:"ESP", name:"ESP", cat:"sensory"},
  {id:"Evol", name:"Evolution", cat:"alteration"},
  {id:"Extr", name:"Extra Body Parts", cat:"alteration"},
  {id:"Fast", name:"Fast Attack", cat:"offensive"},
  {id:"Flig", name:"Flight", cat:"movement"},
  {id:"Forc", name:"Force Field", cat:"defensive"},
  {id:"Gest", name:"Gestalt", cat:"alteration"},
  {id:"Grow", name:"Growth", cat:"alteration"},
  {id:"Heal", name:"Healing", cat:"control"},
  {id:"Illu", name:"Illusion/Images", cat:"mental"},
  {id:"Immo", name:"Immortality", cat:"defensive"},
  {id:"Inte", name:"Interface", cat:"sensory"},
  {id:"Invi", name:"Invisibility", cat:"alteration"},
  {id:"Leap", name:"Leaping", cat:"movement"},
  {id:"Life", name:"Life Support", cat:"defensive"},
  {id:"Mach", name:"Machine Control", cat:"control"},
  {id:"Matt", name:"Matter Control", cat:"control"},
  {id:"Ment", name:"Mental Blast", cat:"mental"},
  {id:"Mimi", name:"Mimicry", cat:"alteration"},
  {id:"Mindc", name:"Mind Control", cat:"mental"},
  {id:"Minds", name:"Mind Shield", cat:"mental"},
  {id:"Phas", name:"Phasing", cat:"alteration"},
  {id:"Post", name:"Postcognition", cat:"sensory"},
  {id:"Powe", name:"Power Control", cat:"control"},
  {id:"Prec", name:"Precognition", cat:"sensory"},
  {id:"Refl", name:"Reflection", cat:"defensive"},
  {id:"Rege", name:"Regeneration", cat:"defensive"},
  {id:"Resi", name:"Resistance", cat:"defensive"},
  {id:"Serv", name:"Servant", cat:"control"},
  {id:"Shri", name:"Shrinking", cat:"alteration"},
  {id:"Spin", name:"Spinning", cat:"movement"},
  {id:"Spir", name:"Spirit Control", cat:"control"},
  {id:"Stri", name:"Strike", cat:"offensive"},
  {id:"Stun", name:"Stunning", cat:"offensive"},
  {id:"Sups", name:"Super-Senses", cat:"sensory"},
  {id:"Susp", name:"Super-Speed", cat:"movement"},
  {id:"Swin", name:"Swinging", cat:"movement"},
  {id:"Tele", name:"Telepathy", cat:"mental"},
  {id:"Tp", name:"Teleportation", cat:"movement"},
  {id:"Wall", name:"Wall-Crawling", cat:"movement"},
  {id:"Wiza", name:"Wizardry", cat:"control"},
]

const skills = {
  "Administer": `Manage an organization, handle paperwork,
analyze records, and keep an institution
functioning on a daily basis. Roll it for bureaucratic
expertise, organizational management, legal
knowledge, dealing with government agencies,
and understanding how institutions really work.`,
  "Connect": `Find people who can be helpful to your purposes
and get them to cooperate with you. Roll
it to make useful connections with others, find
people you know, know where to get illicit goods
and services, and be familiar with foreign cultures
and languages. You can use it in place of Talk for
persuading people you find via this skill.`,
  "Exert": `Apply trained speed, strength, or stamina in
some feat of physical exertion. Roll it to run, jump,
lift, swim, climb, throw, and so forth. You can use
it as a combat skill when throwing things, though
it doesn’t qualify as a combat skill for other ends.`,
  "Fix": `Create and repair devices both simple and complex.
How complex will depend on your character’s
background; a lostworlder blacksmith is going to
need some study time before he’s ready to fix that
broken fusion reactor, though he can do it eventually.
Roll it to fix things, build things, and identify
what something is supposed to do.`,
  "Heal": `Employ medical and psychological treatment for
the injured or disturbed. Roll it to cure diseases,
stabilize the critically injured, treat psychological
disorders, or diagnose illnesses.`,
  "Know": `Know facts about academic or scientific fields.
Roll it to understand planetary ecologies, remember
relevant history, solve science mysteries, and
know the basic facts about rare or esoteric topics.`,
  "Lead": `Convince others to also do whatever it is you’re
trying to do. Talk might persuade them that following
you is smart, but Lead can make them do
it even when they think it’s a bad idea. Roll it to
lead troops in combat, convince others to follow
you, or maintain morale and discipline.`,
  "Magic" : ``,
  "Notice": `Spot anomalies or interesting facts about your
environment. Roll it for searching places, detecting
ambushes, spotting things, and reading the
emotional state of other people.`,
  "Perform": `Exhibit some performative skill. Roll it to
dance, sing, orate, act, or otherwise put on a convincing
or emotionally moving performance.`,
  "Pilot": `Use this skill to pilot vehicles or ride beasts. Roll
it to fly spaceships, drive vehicles, ride animals,
or tend to basic vehicle repair. This skill doesn’t
help you with things entirely outside the scope
of your background or experience, though with
some practice a PC can expand their expertise.`,
  "Program": `Operating or hacking computing and communications
hardware. Roll it to program or hack
computers, control computer-operated hardware,
operate communications tech, or decrypt things.`,
  "Psionics":``,
  "Punch": `Use it as a combat skill when fighting unarmed.
If your PC means to make a habit of this rather
than as a recourse of desperation, you should take
the Unarmed Combatant focus described later.`,
  "Shoot": `Use it as a combat skill when using ranged weaponry,
whether hurled rocks, bows, laser pistols,
combat rifles, or ship’s gunnery.`,
  "Sneak": `Move without drawing notice. Roll it for stealth,
disguise, infiltration, manual legerdemain, pickpocketing,
and the defeat of security measures.`,
  "Stab": `Use it as a combat skill when wielding melee
weapons, whether primitive or complex.`,
  "Survive": `Obtain the basics of food, water, and shelter
in hostile environments, along with avoiding their
natural perils. Roll it to handle animals, navigate
difficult terrain, scrounge urban resources, make
basic tools, and avoid wild beasts or gangs.`,
  "Talk": `Convince other people of the facts you want them
to believe. What they do with that conviction may
not be completely predictable. Roll it to persuade,
charm, or deceive others in conversation.`,
  "Trade": `Find what you need on the market and sell what
you have. Roll it to sell or buy things, figure out
where to purchase hard-to-get or illicit goods, deal
with customs agents, or run a business.`,
  "Work": `This is a catch-all skill for professions not represented
by other skills. Roll it to work at a particular
profession, art, or trade.`,
}

const skillGroupIds = ["arcane", "combat", "diplomacy", "exploration", "science", "thievery"]
const skillGroups = {
  arcane : ["Magic","Psionics"],
  combat : ["Punch","Shoot","Stab"],
  diplomacy : ["Connect","Notice","Lead","Perform","Talk","Trade"],
  exploration : ["Exert","Notice","Pilot","Survive"],
  science: ["Administer","Fix","Heal","Know","Program","Work"],
  thievery : ["Notice","Burglary","Sneak"]
}

let colors = ["ruby","topaz","citrine","emerald","sapphire","amethyst"]

let CPXData = (app) => {
  app.colors = colors

  app.CPX = {
    powers : POWERS,
    skills,
    skillGroupIds,
    skillGroups
  }
}

export {CPXData}

