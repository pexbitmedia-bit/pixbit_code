import { services } from '@/lib/content';

export type OfferingChapter = {
  title: string;
  text: string;
};

export type Offering = {
  slug: string;
  title: string;
  kicker: string;
  lede: string;
  image: string;
  imageAlt: string;
  shape: 0 | 1 | 2;
  points: string[];
  chapters: OfferingChapter[];
  parent: { slug: string; title: string } | null;
  siblings: { slug: string; title: string }[];
};

type Copy = {
  lede: string;
  image: string;
  imageAlt: string;
  shape: 0 | 1 | 2;
  points: string[];
  chapters: OfferingChapter[];
};

const copy: Record<string, Copy> = {
  'direction-session': {
    lede: 'One working session to decide who you are in the market, who should notice, and what the next six months of your name should do.',
    image: '/images/studio.jpg',
    imageAlt: 'Violet light across a quiet studio table and a closed notebook',
    shape: 0,
    points: [
      'A single position the market can repeat',
      'Audience narrowed to the people who can hire you',
      'Pillars that stop the content from drifting',
      'A roadmap you can brief a team from',
    ],
    chapters: [
      {
        title: 'The room is for decisions',
        text: 'We do not tour your whole career. We isolate the claim your name should own, then pressure-test it against how buyers already talk about your field.',
      },
      {
        title: 'You leave with a brief',
        text: 'Positioning, point of view, audience, pillars, a presence audit, and a six-month roadmap leave the session as one document, not a pile of notes.',
      },
    ],
  },
  positioning: {
    lede: 'The sentence that tells a stranger what you are for, and what you are willing to be known against.',
    image: '/images/studio.jpg',
    imageAlt: 'Soft studio light on stone and paper',
    shape: 0,
    points: [
      'One claim, not a list of services',
      'A contrast with the obvious alternative',
      'Language your buyers already use',
      'A line that survives a cold introduction',
    ],
    chapters: [
      {
        title: 'Claim before credentials',
        text: 'Titles and years of experience blur together. Positioning names the problem you are the person for, in words a buyer can repeat to someone else.',
      },
      {
        title: 'Held across every surface',
        text: 'The same claim has to fit a profile headline, a homepage, a talk intro, and a press note. If it only works in one of those, it is not ready.',
      },
    ],
  },
  'point-of-view': {
    lede: 'The opinion your name is willing to repeat until the market associates the idea with you.',
    image: '/images/studio.jpg',
    imageAlt: 'A notebook in warm light with a violet edge',
    shape: 1,
    points: [
      'A stance, not a slogan',
      'Proof you can point to',
      'Lines you can say on camera',
      'Boundaries for what you will not publish',
    ],
    chapters: [
      {
        title: 'An idea with a spine',
        text: 'A point of view is the argument underneath the posts. It tells us which stories belong to you and which ones are just noise in your category.',
      },
      {
        title: 'Said in your cadence',
        text: 'We draft from how you actually talk. The opinion should sound like a person in a room, not a campaign line glued to a portrait.',
      },
    ],
  },
  'audience-focus': {
    lede: 'The short list of people whose attention is worth building the brand around.',
    image: '/images/studio.jpg',
    imageAlt: 'Quiet table setting with directional violet light',
    shape: 2,
    points: [
      'Buyers, not a demographic blur',
      'The room they already trust',
      'The sentence they use when they refer you',
      'What they need before they will reply',
    ],
    chapters: [
      {
        title: 'Fewer people, clearer work',
        text: 'A personal brand gets sharper when it is written for a real buyer: a founder, a partner, an editor, a client who already has the problem.',
      },
      {
        title: 'Where they already look',
        text: 'Audience focus decides the surfaces. Some names need a profile and a talk. Others need a site and a press path. We pick before we produce.',
      },
    ],
  },
  'content-pillars': {
    lede: 'Three or four themes your name returns to, so the archive feels like a body of work.',
    image: '/images/studio.jpg',
    imageAlt: 'Paper and stone in a controlled studio light',
    shape: 0,
    points: [
      'Themes tied to the position',
      'Room for proof, not only opinion',
      'A mix you can sustain',
      'A filter for ideas that do not fit',
    ],
    chapters: [
      {
        title: 'A shelf, not a stream',
        text: 'Pillars keep a year of publishing from looking accidental. Each theme earns a place because it supports the way you want to be hired.',
      },
      {
        title: 'Built to be repeated',
        text: 'The best pillars are wide enough for dozens of pieces and narrow enough that a stranger can describe what you talk about.',
      },
    ],
  },
  'presence-audit': {
    lede: 'A clear read on what your name currently signals, and what is getting in the way.',
    image: '/images/studio.jpg',
    imageAlt: 'Low light on a studio surface with a violet wash',
    shape: 1,
    points: [
      'Profile, site, and search as one picture',
      'Gaps between claim and proof',
      'What a stranger sees in thirty seconds',
      'The fixes that change perception first',
    ],
    chapters: [
      {
        title: 'Seen as a stranger sees it',
        text: 'We review the public record the way a buyer would: headline, featured work, about line, and the first page of search.',
      },
      {
        title: 'Ranked, not dumped',
        text: 'The audit ends with a short list. The point is to know what to change before the next month of content, not to collect every flaw.',
      },
    ],
  },
  'six-month-roadmap': {
    lede: 'A sequence for the next two quarters so the brand compounds instead of restarting every week.',
    image: '/images/studio.jpg',
    imageAlt: 'Still life of a notebook under studio light',
    shape: 2,
    points: [
      'Month-by-month priorities',
      'What you publish and what we hold',
      'Proof you intend to collect',
      'A review rhythm that stays light',
    ],
    chapters: [
      {
        title: 'Order matters',
        text: 'Positioning before volume. Proof before ads. The roadmap puts the work in an order a busy founder can actually keep.',
      },
      {
        title: 'A plan you can hand off',
        text: 'Writers, editors, and you should be able to read the same page and know what “done” looks like this month.',
      },
    ],
  },
  'organic-presence': {
    lede: 'A publishing system that carries your ideas from a point of view to a cadence people can follow.',
    image: '/images/lens.jpg',
    imageAlt: 'A camera lens catching violet rim light in a pale studio',
    shape: 1,
    points: [
      'Strategy that matches the position',
      'Scripts in your speaking voice',
      'Shoot direction that stays simple',
      'Editing and publishing on a rhythm',
    ],
    chapters: [
      {
        title: 'Presence with a system',
        text: 'Organic work fails when every week is a new idea. We install a cadence: what you say, how it is shot, and when it goes out.',
      },
      {
        title: 'Still recognizably you',
        text: 'The team handles the production. The opinion, the examples, and the approval stay with you.',
      },
    ],
  },
  strategy: {
    lede: 'The plan for what your name publishes, where, and why it earns attention without renting it.',
    image: '/images/lens.jpg',
    imageAlt: 'Glass and metal of a lens in soft studio light',
    shape: 0,
    points: [
      'Channels chosen on purpose',
      'A cadence you can keep',
      'Themes tied to demand',
      'A definition of a useful month',
    ],
    chapters: [
      {
        title: 'Attention with a job',
        text: 'Strategy decides which ideas are worth the time to say out loud. Vanity metrics stay off the page.',
      },
      {
        title: 'Light enough to run',
        text: 'The plan fits a founder’s calendar. If it needs a full-time content department to survive, it is the wrong plan.',
      },
    ],
  },
  scripting: {
    lede: 'Words you can say on camera or publish under your name without sounding scripted by a committee.',
    image: '/images/lens.jpg',
    imageAlt: 'Close lens glass with a purple highlight',
    shape: 1,
    points: [
      'Hooks that sound like speech',
      'One idea per piece',
      'Proof inside the draft',
      'A version you can approve quickly',
    ],
    chapters: [
      {
        title: 'Written to be spoken',
        text: 'Scripts are short, concrete, and cut for the way you pause. We would rather lose a clever line than keep one you would not say.',
      },
      {
        title: 'Your examples, our structure',
        text: 'The stories come from your work. We shape the opening, the turn, and the close so the piece holds together.',
      },
    ],
  },
  'shoot-direction': {
    lede: 'A simple on-camera setup so the person matches the standard of the words.',
    image: '/images/lens.jpg',
    imageAlt: 'Lens barrel in controlled light',
    shape: 2,
    points: [
      'Frame, light, and wardrobe notes',
      'What to look at and when to stop',
      'A shot list that stays short',
      'Guidance you can use without a crew',
    ],
    chapters: [
      {
        title: 'Direction, not a production',
        text: 'Most founders do not need a set. They need to know where to stand, how tight the frame is, and which line to hit first.',
      },
      {
        title: 'The same person every time',
        text: 'Direction keeps the archive consistent: one look, one energy, one standard, even when the topic changes.',
      },
    ],
  },
  editing: {
    lede: 'Cuts that keep your point intact and make the piece feel finished.',
    image: '/images/lens.jpg',
    imageAlt: 'Soft reflections on camera glass',
    shape: 0,
    points: [
      'Pacing that respects the idea',
      'Captions that match your voice',
      'A look that stays consistent',
      'Versions for the places you publish',
    ],
    chapters: [
      {
        title: 'The idea survives the cut',
        text: 'Editing is not decoration. We remove the stall, keep the proof, and make the opening earn the next second.',
      },
      {
        title: 'One visual language',
        text: 'Type, pace, and color stay in the same family so a month of pieces reads as one person, not a folder of experiments.',
      },
    ],
  },
  publishing: {
    lede: 'The last mile: the right cut, the right line, and a rhythm the audience can expect.',
    image: '/images/lens.jpg',
    imageAlt: 'A lens resting in pale light',
    shape: 1,
    points: [
      'A calendar, not a scramble',
      'Captions written with the piece',
      'A check before anything goes live',
      'Notes on what earned a response',
    ],
    chapters: [
      {
        title: 'Out in the world on purpose',
        text: 'Publishing is scheduled against the roadmap. Pieces go out when they are ready to represent you, not when the queue is restless.',
      },
      {
        title: 'A record you can learn from',
        text: 'We watch which ideas start conversations. The next month’s slate bends toward that, without chasing every spike.',
      },
    ],
  },
  'pexbit-1': {
    lede: 'The full system: organic presence, paid media, and the website, app, or software people use to reach you.',
    image: '/images/product.jpg',
    imageAlt: 'A dark laptop and phone on pale stone with a violet reflection',
    shape: 2,
    points: [
      'Marketing and development in one scope',
      'Paid media with a clear ceiling',
      'A product surface that matches the brand',
      'Reporting you can read in a sitting',
    ],
    chapters: [
      {
        title: 'One name, every layer',
        text: 'Pexbit 1.0 is for founders who need the public brand and the thing people click, download, or log into to be built together.',
      },
      {
        title: 'Marketing stays honest',
        text: 'Paid work sits on top of a real position. Development ships a site, an app, or software that sounds like the same person.',
      },
    ],
  },
  'paid-media-strategy': {
    lede: 'A plan for rented attention that points back to a person, not a generic offer.',
    image: '/images/signal.jpg',
    imageAlt: 'Violet light moving across dark glass',
    shape: 0,
    points: [
      'Offers tied to the position',
      'Budgets with a stated limit',
      'Creative that sounds like you',
      'A reason to keep or stop spending',
    ],
    chapters: [
      {
        title: 'Spend with a job',
        text: 'Paid media is for a specific conversation: a call, a launch, a proof point. It is not a substitute for having something to say.',
      },
      {
        title: 'Held to the brand',
        text: 'The ads use your point of view. If a line would embarrass the organic archive, it does not run.',
      },
    ],
  },
  'audience-funnel': {
    lede: 'Who sees you, what they understand next, and the step that turns attention into a conversation.',
    image: '/images/signal.jpg',
    imageAlt: 'Abstract violet streaks on glass',
    shape: 1,
    points: [
      'A named audience',
      'A path from first view to reply',
      'Pages that match the promise',
      'Fewer steps, clearer intent',
    ],
    chapters: [
      {
        title: 'Mapped before it is bought',
        text: 'We write the path on paper first: the person, the promise, the page, the ask. Media only amplifies a path that already makes sense.',
      },
      {
        title: 'The brand stays in the path',
        text: 'Every step still sounds like you. A funnel that drops into a generic form wastes the work that made them click.',
      },
    ],
  },
  'creative-testing': {
    lede: 'A disciplined way to learn which opening, proof, and offer your audience actually answers.',
    image: '/images/signal.jpg',
    imageAlt: 'Light trails over a dark reflective surface',
    shape: 2,
    points: [
      'One variable at a time',
      'Hooks drawn from your voice',
      'A stop rule, not endless tests',
      'Winners fed back into organic',
    ],
    chapters: [
      {
        title: 'Tests with a question',
        text: 'Each test asks something specific: which proof, which first line, which audience. We do not throw a pile of variants at a budget.',
      },
      {
        title: 'What wins gets reused',
        text: 'A line that earns replies belongs in the profile, the site, and the next script. Testing is there to sharpen the brand, not to live beside it.',
      },
    ],
  },
  'conversion-tracking': {
    lede: 'Measurement that tells you which attention became a real conversation.',
    image: '/images/signal.jpg',
    imageAlt: 'Purple light on dark glass, no interface',
    shape: 0,
    points: [
      'Events that match the ask',
      'A clean path from click to call',
      'Privacy-conscious setup',
      'Numbers a founder can trust',
    ],
    chapters: [
      {
        title: 'Track the conversation',
        text: 'We instrument the actions that matter: a booked call, a qualified reply, a meaningful view. Vanity events stay out of the report.',
      },
      {
        title: 'Set up so it stays true',
        text: 'Pixels, events, and naming are documented. When the site or the offer changes, the measurement still means the same thing.',
      },
    ],
  },
  'performance-reporting': {
    lede: 'A monthly read of what the spend and the publishing actually did for your name.',
    image: '/images/signal.jpg',
    imageAlt: 'Elegant streaks of violet light',
    shape: 1,
    points: [
      'A short written read, not a dump',
      'What to keep, cut, or rewrite',
      'Creative notes beside the numbers',
      'A next-month decision',
    ],
    chapters: [
      {
        title: 'Written for a decision',
        text: 'The report says what changed, what it cost, and what we recommend next. Charts are there to support the sentence, not replace it.',
      },
      {
        title: 'Brand and media in one note',
        text: 'Organic pieces and paid tests are reviewed together, so the name does not drift in two directions.',
      },
    ],
  },
  website: {
    lede: 'A personal site that argues for your authority, with proof, a point of view, and a clear next step.',
    image: '/images/product.jpg',
    imageAlt: 'Laptop and phone on stone with a single violet reflection',
    shape: 2,
    points: [
      'A narrative homepage',
      'Proof placed where trust is earned',
      'A fast, quiet build',
      'A path to a conversation',
    ],
    chapters: [
      {
        title: 'A site with an argument',
        text: 'The page is not a brochure of services. It makes the case for why this person, in this field, is the one to call.',
      },
      {
        title: 'Built to stay current',
        text: 'Structure, type, and motion are designed so new proof and new essays can land without a redesign every quarter.',
      },
    ],
  },
  app: {
    lede: 'A focused product for the people your brand attracts, designed to feel like the same person as the public work.',
    image: '/images/product.jpg',
    imageAlt: 'A matte device on pale stone',
    shape: 0,
    points: [
      'One job for the person using it',
      'Interface in the brand’s voice',
      'A path from the public name to the product',
      'A build scoped before it starts',
    ],
    chapters: [
      {
        title: 'Product after the promise',
        text: 'The app exists because the brand made a promise people want to use. We scope that job before a single screen is drawn.',
      },
      {
        title: 'The same standard',
        text: 'Motion, type, and tone match the site and the content. A person should feel they never left you.',
      },
    ],
  },
  software: {
    lede: 'Custom software for the operation behind the name: the tool your clients, team, or practice actually run on.',
    image: '/images/product.jpg',
    imageAlt: 'Dark hardware on a light stone surface',
    shape: 1,
    points: [
      'Scoped around a real workflow',
      'Clear ownership and handover',
      'An interface that stays quiet',
      'Built beside the brand, not apart from it',
    ],
    chapters: [
      {
        title: 'Software with a user',
        text: 'We start from the job: what someone needs to finish, decide, or hand off. Features that do not serve that job stay out of the first build.',
      },
      {
        title: 'A name on the product',
        text: 'Even internal tools carry your standard. The language, the pace, and the finish should be something you are willing to put next to your public work.',
      },
    ],
  },
};

export function getOffering(slug: string): Offering | null {
  const pages = allOfferings();
  return pages.find((page) => page.slug === slug) ?? null;
}

export function offeringSlugs(): string[] {
  return allOfferings().map((page) => page.slug);
}

function allOfferings(): Offering[] {
  const pages: Offering[] = [];

  for (const service of services) {
    const children = service.groups.flatMap((group) => group.items);
    const parentCopy = copy[service.id];
    if (parentCopy) {
      pages.push({
        slug: service.id,
        title: service.title,
        kicker: 'Pexbit Media',
        parent: null,
        siblings: services
          .filter((item) => item.id !== service.id)
          .map((item) => ({ slug: item.id, title: item.title })),
        ...parentCopy,
      });
    }

    for (const child of children) {
      const childCopy = copy[child.slug];
      if (!childCopy) continue;
      pages.push({
        slug: child.slug,
        title: child.title,
        kicker: service.title,
        parent: { slug: service.id, title: service.title },
        siblings: children
          .filter((item) => item.slug !== child.slug)
          .map((item) => ({ slug: item.slug, title: item.title })),
        ...childCopy,
      });
    }
  }

  return pages;
}
