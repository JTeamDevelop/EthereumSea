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
  "Biopsionics": `Master powers of physical repair, body augmentation,
and shapeshifting.`,
  "Metapsionics": `Master powers that nullify, boost, and
shape the use of other psychic abilities.`,
  "Precognition": `Master the ability to sense future events
and control probability.`,
  "Telekinesis": `Master the remote control of kinetic energy
to move objects and fabricate force constructs.`,
  "Telepathy": `Master the reading and influencing of other
sapient minds.`,
  "Teleportation": `Master the arts`
}

const classes = {
  exp: {
    name: "Expert",
    canSelect : true,
    abilities: [`You gain a free level in a non-combat focus related
      to your background. Most concepts will take
      Specialist in their main skill, though Diplomat, Starfarer,
      Healer, or some other focus might suit better.
      You may not take a combat-oriented focus with
      this perk. In case of uncertainty, the GM decides
      whether or not a focus is permitted.`, `Once per scene, you can reroll a failed skill check,
      taking the new roll if it’s better.`, `When you advance an experience level, you
      gain a bonus skill point that can be spent on any
      non-combat, non-psychic skill. You can save this
      point to spend later if you wish.`],
    hpb: 0,
    atk: 0.5,
    partial: `You gain a free level in a non-combat focus related to
your background. Most concepts will take Specialist,
though Diplomat, Starfarer, Healer, or some other focus
might suit better. Gain an extra skill point every time
you gain a character level which can be spent on any
non-psychic, non-combat skill.`,
    heroic: ['']
  },
  psy: {
    name: "Psychic",
    canSelect : true,
    abilities: [`Unlike Warriors or Experts, you are capable of
learning psychic disciplines and their associated
techniques, as described starting on page 28.`, `When you pick this class, choose any two psychic
skills as bonus skills. You can pick the same one
twice to obtain level-1 proficiency in it and a free
level-1 technique from that discipline.`, `You have an Effort score, which can be used to
fuel psychic abilities. Your maximum Effort is
equal to 1 plus your highest psychic skill plus the
better of your Wisdom or Constitution modifiers.
Even with a penalty, your maximum Effort
cannot be lower than 1.`],
    hpb: 0,
    atk: 0.5,
    partial: `You are a restricted psychic. Pick one psychic discipline
as a bonus skill at level-0. You can improve this skill
with foci or skill points gained from advancing a level,
but you cannot learn or improve any other psychic skill.
Your maximum Effort equals 1 plus this psychic skill’s
level plus the best of your Wisdom or Constitution
modifiers, down to a minimum of 1.`,
    heroic: ['']
  },
  war: {
    name: "Warrior",
    canSelect : true,
    abilities: [`You gain a free level in a combat-related focus associated
with your background. The GM decides
if a focus qualifies if it’s an ambiguous case.`, `Warriors are lucky in combat. Once per scene, as
an Instant ability, you can either choose to negate
a successful attack roll against you or turn a
missed attack roll you made into a successful hit.
You can use this ability after the dice are rolled,
but it cannot be used against environmental damage,
effects without an attack roll, or hits on a
vehicle you’re occupying.`, `You gain two extra maximum hit points at each
character level.`],
    hpb: 2,
    atk: 1,
    partial: `You gain a free level in a combat focus related to your
background. Gain +1 to your attack bonus at first and
fifth levels. Gain 2 extra maximum hit points each level.
Thus, at first level, you’d roll 1d6+2 for your maximum
hit points. At second, you’d roll 2d6+4, and so forth.`,
    heroic: ['']
  },
  arc: {
    name: "Arcanist",
    canSelect : true,
    abilities: [`Arcanists must be able to move freely to channel
undisrupted metadimensional energy. They cannot cast
spells while wearing any kind of powered armor, or
any other sort of armor with an Encumbrance value
higher than zero.`, `Arcanists may choose foci from the General Arcane
list on page 90. They get a bonus focus chosen
from this list as an addition to their usual free pick at
character creation.`, `Arcanists get Cast Magic-0 as a bonus skill. If this
would increase their skill level above level-1, they may
instead pick any other non-psychic skill.`,`Arcanists start play knowing two first-level spells
from the Arcanist spell list on page 64, plus one more
for each point of bonus Intelligence modifier. If not using
the Occult Lore rules from the Arcane Research and
Development section, they can pick two more Arcanist
spells of any level they can cast each time they advance
a character level.`],
    hpb: -1,
    atk: 0.2,
    partial: `Partial Arcanists suffer a -1 penalty to their hit
point rolls. Partial Arcanists suffer a -1 penalty to their attack
bonus, as calculated by the other class. Partial Arcanists can learn and prepare spells as
an Arcanist of half their level, rounded up. Partial Arcanists cast their spells at their full level.
Partial Arcanists gain Cast Magic-0 as a bonus skill. Partial Arcanists may choose General Arcane foci,
but unlike full Arcanists, they do not get a free bonus
focus from that list.`,
    heroic: [
    `A Heroic Arcanist gets an additional spell slot of
every level they are capable of casting.`,
    `A Heroic Arcanist also gets an additional number
of “open” spell slots equal to their character level. These
open spell slots do not require preparation. They can
use these slots to cast any spell they know, whether or
not they’ve prepared it, and whatever the level of the
spell might be. If you use an open slot to fuel an arcane
focus that requires the use of a spell, treat it as a spell
of the highest level you can cast.`,
  ],
    fray : "1d4"
  },
  mag: {
    name: "Magister",
    canSelect : false,
    abilities: [`Magisters must be able to move freely to channel
undisrupted metadimensional energy. They cannot cast
spells while wearing any kind of powered armor, or
any other sort of armor with an Encumbrance value
higher than zero.`, `Magisters may choose foci from the General Arcane
list on page 90. They get a bonus focus chosen
from this list as an addition to their usual free pick at
character creation.`, `Magisters get Cast Magic-0 as a bonus skill. If this
would increase their skill level above level-1, they may
instead pick any other non-psychic skill.`,`Magisters start play knowing two first-level spells
from their class’s spell list. As they advance in character
levels, they learn to master addition spells as given in
the adjacent table. They do not require a trainer or a
source for these spells; their secrets are implicit in the
Magister’s basic training. Magisters cannot add additional
spells to this allotment, though they can trade out
their choices slowly as described on page 22.`],
    hpb: -1,
    atk: 0.2,
    partial: `Partial Magisters suffer a -1 penalty to their hit
point rolls. Partial Magisters suffer a -1 penalty to their attack
bonus, as calculated by the other class. Partial Magisters can learn and prepare spells as
an Magister of half their level, rounded up. Partial Magisters cast their spells at their full level.
Partial Magisters gain Cast Magic-0 as a bonus skill. Partial Magisters may choose General Arcane foci,
but unlike full Magisters, they do not get a free bonus
focus from that list.`,
    heroic: [
    `A Heroic Magister gets an additional spell slot of
every level they are capable of casting.`,
    `A Heroic Magister may also pick one known spell
from every level they are able to cast, gaining the ability
to cast these spells freely without expending spell slots.
These free spells may not be used to fuel foci that require
expending a spell slot. The Heroic Magister can
change which spells are nominated for this ability with
a day’s work.`,
  ],
    fray : "1d4"
  },
  adp: {
    name: "Adept",
    canSelect : false,
    abilities: [`Adept special abilities are not spells. They function
as described and cannot be interrupted by damage and
do not require a specific declaration of intent to use
them at the start of the round.`,
      `An Adept does not get any bonus focus picks like
Experts or Warriors do. They get only their normal
single free focus level when creating their character.`
    ],
    hpb: 0,
    atk: 0.5,
    partial: `Partial Adepts gain their class abilities as if they
were half their character level, rounded up. The Adept abilities they possess are used at their
full character level.`,
    heroic: [
    `A Heroic Magister gets an additional spell slot of
every level they are capable of casting.`,
    `A Heroic Magister may also pick one known spell
from every level they are able to cast, gaining the ability
to cast these spells freely without expending spell slots.
These free spells may not be used to fuel foci that require
expending a spell slot. The Heroic Magister can
change which spells are nominated for this ability with
a day’s work.`,
  ],
    fray : "1d4"
  },
  aexp : {
    name: "Arcane Expert",
    canSelect : true,
    base : "exp",
    abilities : [
      `Arcane Experts are treated and created exactly the same
way as normal Experts, except that they are also allowed
to take Arcane Expert-exclusive foci. They may
spend any focus pick on Arcane Expert foci except
those exclusively limited to combat-based foci, which
may be the case if a player makes up a Partial Arcane
Expert/Partial Arcane Warrior as their character.`
    ],
    partial : `Characters who take the Adventurer class might choose
to be a Partial Arcane Expert. Such heroes are treated
just as Partial Experts are for purposes of class benefits,
but they can also take Arcane Expert foci.`,
    heroic : [
      `Players in a Heroic campaign who choose to play Heroic
Arcane Experts get the normal benefits of being
a Heroic Expert.`
    ],
    fray : "1d6"
  },
  awar : {
    name: "Arcane Warrior",
    canSelect : true,
    base : "war",
    abilities : [
      `Arcane Warriors are treated and created exactly the
same way as normal Warriors, except that they are also
allowed to take Arcane Warrior-exclusive foci. They
may spend any focus pick on Arcane Warrior foci except
those exclusively limited to non-combat-based
foci, which may happen if a player makes up a Partial
Arcane Expert/Partial Arcane Warrior. In addition,
any weapon or unarmed attack they use is treated as
magical for purposes of overcoming the defenses of
creatures immune to mundane weapons.`
    ],
    partial : `A Partial Arcane Warrior is treated just like a Partial
Warrior, albeit with the ability to take Arcane Warrior
foci. They do not get the benefit of naturally magical
weapon or unarmed attacks.`,
    heroic : [
      `Heroic Arcane Warriors get all the usual benefits of a
Heroic Warrior, in addition to the opportunity to take
Arcane Warrior foci.`
    ],
    fray : "1d8"
  },
  fnx : {
    name: "Free Nexus",
    canSelect : true,
    base : "adp",
    abilities : [
      `A Free Nexus tends to develop in different ways, often
demonstrating new nexus gifts based on what kind of
associations and companionship they’ve found. They
gain Symbiosis and Free Nexus Effort at first level. At first
level and every even-numbered level thereafter, they
can also pick one of the Nexus gifts listed below. They
may also exchange a focus pick for one of the gifts when
they gain a pick on advancing a character level.`
    ],
    gifts : {
      g: `Symbiosis : As an Instant action once per round,
nominate a visible, willing target within 30 meters
that is not you. Until you change your selection,
the target counts as your symbiotic partner for use
of your Nexus gifts, provided they remain within
300 meters. Only one Free Nexus can partner with
a given target on any single round.
Free Nexus Effort : You have a Free Nexus Effort
score that fuels all your abilities. It is committed
and recovered just as psychic Effort is, but is
tracked separately. Your total Free Nexus Effort
equals your number of Nexus gifts, plus the better
of your Wisdom or Charisma attribute modifiers.
      Arcane Battery: You gain the Eldritch Battery focus at
level-2, with the difference that it only applies to
your partner, and you can fuel two spells they cast
each day before risking damage.
Borrowed Brilliance: Commit Free Nexus Effort for
the scene as an Instant action immediately before
making an attack roll or a skill check. You make
the attack or skill check as if your partner was the
one making it, using their bonuses and skills.
Cognitive Backup: Commit Free Nexus Effort for the
day as an Instant action when your partner fails
a skill check or attack roll. They may reroll the
skill check at a -2 penalty or the attack roll at a -4
penalty. This gift can be used only once per roll.
Diffuse Strain: When you remain partnered with a
single target for a full night’s rest, your partner
sheds two additional points of System Strain beyond
what they would ordinarily recover. Once
per day per partner, you can Commit Free Nexus
Effort for the day to remove a point of System
Strain from them.
Distributed War Mind: Commit Free Nexus Effort for
the scene as an Instant action to refresh a Warrior
partner’s class ability, allowing them to use it a
second time in the scene. This gift can be used
only once per scene per partner.
Distributive Action: During your turn in a round, you
may confer either or both of your Main Action or
your Move on one partner, sacrificing it to grant
them a bonus action of the appropriate type.
Full Override: As an On Turn action, you or your partner
may concede full control to the other. The
controlling subject’s body becomes motionless;
they instead take their actions with the controlled
subject’s body, using their own attack bonus and
skill levels, but the controlled subject’s physical
attributes and hit points. Spells available, Effort,
and System Strain remain those of the controlling
subject. Thus, if a psychic PC took control of the
Free Nexus, they’d use their own Effort and incur
their own System Strain for any activities involving
psychic powers. An override may be ended
as an On Turn action on either participant’s part.
Group Symbiosis: Your Symbiosis ability expands, allowing
you to have up to a half-dozen partners at
once. When using a gift that involves Committing
Effort, however, the benefits of that commitment
apply to only one partner per action. Thus, you
could Diffuse Strain for the whole party, but you
can only Commit Effort to reduce System Strain
for one partner at a time.
Psychic Battery: Once per round as an Instant action,
Commit Free Nexus Effort for the day to refresh
one point of Committed Effort for a Psychic partner.
You can use this gift once per scene per Psychic
partner, or any number of times if you have
ten minutes to focus on it.
Red Well: Your partner automatically stabilizes at zero
hit points, assuming the injury was not impossible
for anyone to survive. In addition, you may commit
Free Nexus Effort for the scene as an Instant
action when your partner takes damage or incurs
System Strain. You receive the damage or System
Strain instead, even if that damage would kill you.
Reflexive Action: Commit Free Nexus Effort for the
scene as an Instant action. Your partner immediately
can take a Main Action of their choice. This
gift can only be used once per scene per partner.
Shared Mind: You and your partner may voluntarily
share thoughts and sensory input, and your senses
count as both “unaided sight” and “personal presence”
for your partner’s use of teleportation, telepathy,
or other abilities that require such.
Symbiotic Healing: Commit Free Nexus Effort for the
day as an On Turn action to heal your partner for
up to 1d6 lost hit points per two character levels
you have, rounded up. You may use this gift once
per round.
Two Minds, One Flesh: Whenever you or your partner
must make a Mental saving throw, both of you
roll it. If either roll is a success, the target’s roll
counts as a success. If both are failures, only the
original target suffers the consequences. In addition,
food, drink, sleep, or oxygen taken by one of
you also nourishes or rests the other.`
    },
    partial : `A partial Free Nexus works as is usual for a partial Adept
class. Note, however, that their Free Nexus Effort
pool is based on how many Nexus gifts they have, not
their character level or a skill total. Thus, a partial Free
Nexus will have fewer gifts, and so less Effort, than a
full one.`,
    heroic : [
      `There is no Heroic Free Nexus class equivalent,
so PCs in a Heroic campaign should take Heroic
Adventurer to add an additional partial class.`
    ],
    fray : "1d4"
  },
  ght : {
    name: "Godhunter",
    canSelect : true,
    base : "adp",
    abilities : [
      "Gain level based abilities."
    ],
    level : [
      [`Purity of Arms (Level 1): Any weapon or unarmed attack
counts as a magical weapon for the purposes
of affecting targets only subject to magical weapons.
The Godhunter may take Arcane Warrior
foci with their initial focus pick and any other they
may accrue. If taken as a partial Adept class, no
more than half of their total foci, rounded up, can
be Arcane Warrior foci unless their other partial
class also allows access to them.
True Hand (Level 1): The Godhunter receives a bonus
to hit rolls against Shadows and Shadow cultists
equal to half their character level, rounded up.
Grim Determination (Level 1): Gain a +1 bonus to maximum
hit points at this and every odd character
level thereafter.`],
      [`Sacrilegious Scorn (Level 2): Gain a +2 bonus to all saving
throws against magical or mundane effects
created by Shadows or Shadow cultists. This bonus
increases to +4 at level 6.
Armor of Contempt (Level 2): The Godhunter gains an
AC bonus against Shadows and Shadow cultists
equal to half their level, rounded up.`],
      [`True Eyes (Level 3): The Godhunter may make a Mental
saving throw to automatically pierce any magical
illusions created or magical disguises adopted by
a Shadow or cultist. Failure means a new attempt
cannot be made until a new scene begins.`],
      [`Stench of Heresy (Level 4): By accepting a point of System
Strain, the Godhunter can concentrate on
their surroundings as a Main Action, detecting the
presence of Shadows, Shadow cultists, or the past
performance of Shadow cult worship rites within
the past week anywhere in the immediate vicinity.
The radius of the sense extends up to 30 meters
and penetrates all barriers. The sense only indicates
whether or not there are Shadows, Shadow
cultists, or past worship rites within the area, not
specific identities or locations. Magical cloaks that
would interfere with this sense can be penetrated
on a successful Mental save.`],
      [`Righteous Fire (Level 5): The Godhunter's personal
weapons or unarmed attacks are limned with
crackling arcane energy, adding their character
level in damage to all successful hits. Against
Shadows and Shadow cultists this damage is always
inflicted, whether or not the attack roll hits.`],
      [`Feed the Fury (Level 6): As an On Turn action whenever
the Godhunter is within 30 meters of a Shadow,
they can choose to regain twice their character level
in lost hit points. They may do this even when
incapacitated or unconscious, but they can do this
only once per scene. This ability only functions if
the Godhunter is trying to kill or otherwise fight
the Shadow in question; allied or neutral Shadows
will not enable this ability.`],
      [`Nemesis Pursuit (Level 7): As an On Turn action, a Godbound
can tag a visible Shadow or a Shadow cultist.
Until the Godhunter tags a different target, they
have an intuitive knowledge of the exact position
of their target, regardless of the distance between
them. By accepting a point of System Strain and
taking a Move action, they can teleport to a point
within 10 meters of the target, provided the target
is within 100 meters. This teleportation can be
performed only once per round.`],
      [`Storm of Desecration (Level 8): Once per scene as a
Main Action the Godhunter can erupt in a frenzy
of violence that allows them to make an attack
roll against up to six targets within range of their
weapon, or within 10 meters for melee weapons.
Each attack is rolled separately and each target can
be attacked only once.`],
      [`True Rebuke (Level 9): The Godhunter's attack rolls
against Shadows and Shadow cultists are always
automatically successful, assuming a hit is physically
possible. This ability applies even to vehicle-
mounted weapons if the target is being helmed
or controlled by Shadows or Shadow cultists.`],
      [`Deus Vult (Level 10): The Godhunter automatically
succeeds at all saving throws against magical or
mundane effects created by Shadows or Shadow
cultists. For damage rolls and other variable effects
inflicted by such actions, the result is always
the minimum possible. Weapon damage or other
mundane damage inflicted by Shadows and Shadow
cultists is always the minimum possible.`]
    ],
    partial : `Characters who take Godhunter as a partial Adept class
gain the class abilities as usual for partial Adepts, as if
their character level was halved, rounded up. Whenever an ability's
bonus is based on character level, however, their
full level is used.`,
    heroic : [
      `There is no Heroic Godhunters class equivalent,
so PCs in a Heroic campaign should take Heroic
Adventurer to add an additional partial class.`
    ],
    fray : "1d6"
  },
  pct : {
    name: "Pacter",
    canSelect : true,
    base : "mag",
    abilities : [
      `Pacters are treated as Magisters with access to the
Pacter spell list. They gain the same number of known
spells per level and spell slots usable per day as any
other Magister.`,
      `Pacters cannot automatically dismiss their Shadows.
Without use of the Put Down spell, a Shadow must be
allowed to remain its full allotted span before returning
to the Burning Void. Shadows may be destroyed prematurely,
but that runs into the second limit of their
particular discipline.`,
      `Pacters cannot betray their Shadows. Intentionally
harming one’s own summoned Shadow, trying to force
it to act in ways contrary to its Principles, or otherwise
abusing their Shadow breaks their control over the entity.
It then becomes a free Shadow, one very likely to
be antagonistically disposed toward the Pacter. Most
free Shadows will disappear by the end of the scene, but
powerful or intelligent ones may last long enough to
find a substitute source of metadimensional energy to
consume. Note that this stricture is intimately wound
up in the caster’s own psyche; betrayals that they don’t
realize or foresee won’t break this stricture, but trying
to sidestep the ban via schemes will trigger it.`
    ],
    partial : `Partial Pacters are treated just like any other partial
Magister. Thus, they’d learn spells and have available
daily spell slots as if they were half their character level,
rounded up, but would cast those spells at their full
character level.`,
    heroic : [
      `Heroic Pacters have all the usual abilities of full
Pacters, but also learn one extra spell of each spell level
they are capable of casting. In addition, they can pick
one spell from each spell level they are capable of casting;
this spell may be cast as often as desired without
expending spell slots for the day. These unlimited spells
may not be used to fuel arcane foci or other abilities
that require expending a spell slot. They may change
their unlimited spell choices with a day’s work.`
    ],
    fray : "1d4"
  },
  rfr : {
    name: "Rectifier",
    canSelect : true,
    base : "mag",
    abilities : [
      `Rectifiers are treated as Magisters with access to the
Rectifier spell list. They gain the same number of known
spells per level and spell slots usable per day as any
other Magister.`,
      `A Rectifier can have one Change active per level,
plus their Cast Magic skill level. The description for
a given spell indicates whether or not it counts as a
Change to be maintained by the caster. A Rectifier can
drop a Change as an Instant action; the spell indicates
how long it will last after this support is withdrawn.`
    ],
    partial : `Partial Rectifiers are treated just like any other partial
Magister. Thus, they’d learn spells and have available
daily spell slots as if they were half their character level,
rounded up, but would cast those spells at their full
character level. They can maintain a number of Changes
equal to half their character level, rounded up, plus
their Cast Magic skill.`,
    heroic : [
      `Heroic Rectifiers have all the usual abilities of full
Rectifiers, but also learn one extra spell of each spell
level they are capable of casting. In addition, they can
pick one spell from each spell level they are capable of
casting; this spell may be cast as often as desired without
expending spell slots for the day. These unlimited
spells may not be used to fuel arcane foci or other
abilities that require expending a spell slot. They may
change their unlimited spell choices with a day’s work.`
    ],
    fray : "1d4"
  },
  sbe : {
    name: "Sunblade",
    canSelect : true,
    base : "adp",
    abilities : [
      `Those belonging to a Sunblade order have a special
class skill, the “Sunblade” skill. This skill represents a
facility with the mystical powers of the order and a
mundane familiarity with the knowledge and rituals
appropriate to their order. It can be acquired and raised
just as any other skill, though non-Sunblades cannot
take it.
The Sunblade skill may be used in place of Know
Magic when the topic is one that the Sunblade’s order
ought to know about. It can also substitute for Connect
in getting favors or help from members of the order,
and might qualify in place of other skills specifically
related to the Sunblade’s organization and training.
Most often, the Sunblade skill will be used when
fighting with the order’s sacred weapon. Regardless of
the weapon’s form, it is always used as the weapon’s
relevant skill for attack roll purposes. In addition, the
skill is added to all successful damage rolls inflicted by
the sacred weapon.
Other skills do not stack with the Sunblade skill’s
hit bonus. If using a laser sword as a sacred weapon, the
PC would add Sunblade to the attack roll, not Sunblade
and Stab both. Sunblade is used as the skill for weapon
damage Focus benefits, such as those for Armsman.`,
      `All Sunblade orders have a sacred weapon, created and
wielded as a symbol of the order’s teachings. Whether
a plasma sword, blessed revolver, or occult martial art,
the sacred weapon is potent in the Sunblade’s hands
and useless or dangerous when wielded by unbelievers.
Assuming ordinary TL4 parts availability, any Sunblade
can build a replacement for a lost sacred weapon with
no more than a day’s work. It is theoretically possible to
make or discover enchanted sacred weapons, but such
artifacts tend to be extremely rare.
When a Sunblade order is created, the GM should
choose a sacred weapon for it. Such weapons use the
statistics provided below, regardless of what they look
like. A blessed revolver may look and act like a revolver
in mundane hands, but it has the small ranged weapon
stats given below for a Sunblade.
Large sacred weapons require two hands to use,
and large ranged weapons can be bound up in melee
combat. Ranged sacred weapons do not run out
of ammo in the hands of a Sunblade. Thrown sacred
weapons always return to the wielder’s hand.
Foci that apply to all melee or all ranged weapons,
like Armsman or Gunslinger, apply their benefits normally
to matching sacred weapons.`,
      `Sunblades tend to develop different abilities at different
times, based on their interests and the focus of their order.
First level Sunblades all acquire the Sunblade Wielder,
Esoteric Secrets, and Sunblade Effort abilities. At second,
fourth, and every even-numbered level thereafter,
they can pick one additional ability from the list given
below. They may also exchange a focus pick gained by
advancing a character level for a power from this list.`
    ],
    gifts : {
      g : `Sunblade Wielder (Level 1): When using the sacred
weapon of their order, the Sunblade gains a bonus
to their hit roll equal to half their class level,
rounded up. Their sacred weapon always counts
as a magical weapon.
Esoteric Secrets (Level 1): The Sunblade may pick Arcane
Expert or Arcane Warrior foci with their choices,
but each level in either type requires two picks
instead of one. They may save focus picks for later
levels in order to afford such abilities.
Sunblade Effort (Level 1): You have a Sunblade Effort
score which is committed and recovered just as
psychic Effort is, but is tracked separately. Your
total Effort equals your Sunblade skill plus the
higher of your Wisdom or Charisma modifiers.
Cosmic Insight: The Sunblade may Commit Sunblade
Effort for the day as a Main Action to contemplate
a particular action they intend to take within
the next ten seconds. The GM describes what the
Sunblade would likely perceive as that action’s
immediately consequent result, up to a minute
afterwards. These results are based on what the
GM thinks is most likely to happen.
Deflect Bolts: When wielding a Readied sacred weapon,
the Sunblade may Commit Effort for the day as
an Instant action to negate an otherwise successful
ranged attack from a foe with equal or fewer
hit dice than the Sunblade’s character level. The
weapon may knock a bullet aside, disrupt a plasma
blast with a counter-shot, or otherwise deflect it.
False Visions of the World: The Sunblade may Commit
Sunblade Effort for the day as a Main Action to
conjure an audio-visual illusion within 30 meters
consisting of figures or scenes occupying no more
than five meters in radius. These illusions sound
and look real, but are intangible to the touch. The
Sunblade can control and maintain the illusions so
long as they continue to spend a Main Action each
round to do so, but they cannot make them move
out of the initial area of effect.
Insinuating Will: You may Commit Sunblade Effort for
the day as a Main Action to make a verbal suggestion
to a single listener within 10 meters, whether
or not they understand your words. The target
gets a Mental save to resist; on a failure, they will
believe what you have stated or carry out the request
you made, unless it would expose them to
physical danger or inflict deep emotional anguish.
Targets who save against this ability are immune
to it for a scene. Compliance or clearly incorrect
belief never lasts more than one scene.
Long Step: The Sunblade may Commit Effort as an On
Turn action; as long as it remains Committed, they
may use a Move action to make a leap of up to 10
meters horizontal or vertical distance. This leap
counts as a Fighting Withdrawal for escaping melee
engagements.
Mastery of Motion: The Sunblade may Commit Effort
for the scene as a Main Action to use the Telekinesis
discipline’s Telekinetic Manipulation technique
for one round at a skill level equal to their
Sunblade skill.
Mystical Resilience: The Sunblade may Commit Sunblade
Effort for the day as an Instant action to reroll
a failed saving throw. They may reroll a saving
throw with this ability only once. In addition, they
gain +1 maximum hit point per character level,
retroactive to first level.
Robes of Discipline: When unarmored and carrying
a Readied sacred weapon, whether or not it is
drawn, the Sunblade’s base AC equals 16 plus their
Sunblade skill level. This AC can be modified by
Dexterity, but not by shields.
Self-Sustenance: The Sunblade needs neither eat nor
drink, and is impervious to hostile environments
as if they were wearing a vacc suit at all times.
Sense the Unseen: The Sunblade gains an intuitive sense
of any magical energies within 30 meters, including
items, spellcasting or otherworldly entities.
Sunblade Healer: By touching a living target as a Main
Action, the PC can Commit Sunblade Effort for
the day to heal lost hit points equal to their Sunblade
skill level plus one in d6. Thus, a PC with
Sunblade-1 skill would heal 2d6 damage when using
this ability. The Sunblade may instead Commit
Sunblade Effort for the day to cure a non-congenital
sickness rather than cure hit point damage.
Torrent of Energy: The PC may Commit Sunblade Effort
for the day as a Main Action to hurl a torrent
of mystical energy at one target within 30 meters.
The torrent does 1d6 damage per character level,
with a Physical save for half. Using this ability
more than once per day forces the PC to take half
the damage they inflicted on the target.
Universal Speech: You can speak with and understand
any creature with a language. You gain a level in
the Diplomat focus as a bonus, acquiring level 1
in it, or level 2 if you already have the first level.
`
    },
    partial : `Partial Sunblades are treated as is usual for partial Adepts,
with abilities being gained as if they were half
their character level, rounded up, and being applied
with their full character level.`,
    heroic : [
      `There is no specific Heroic
Sunblade class, so PCs in a Heroic campaign will
need to blend it into a Heroic Adventurer’s mix.`
    ],
    fray : "1d6"
  },
  wmg : {
    name: "War Mage",
    canSelect : true,
    base : "mag",
    abilities : [
      `War Mages are treated as Magisters with access to the
Rectifier spell list. They gain the same number of known
spells per level and spell slots usable per day as any
other Magister.`,
    ],
    atk: 0.5,
    partial : `Partial War Mages are treated just like any other partial
Magister. Thus, they’d learn spells and have available
daily spell slots as if they were half their character level,
rounded up, but would cast those spells at their full
character level.`,
    heroic : [
      `Heroic War Mages have all the usual abilities of
full War Mages, but also learn one extra spell of each
spell level they are capable of casting. In addition, they
can pick one spell from each spell level they are capable
of casting; this spell may be cast as often as desired
without expending spell slots for the day. These unlimited
spells may not be used to fuel arcane foci or other
abilities that require expending a spell slot. They may
change their unlimited spell choices with a day’s work.`
    ],
    fray : "1d8"
  },
}

export { skills, classes }