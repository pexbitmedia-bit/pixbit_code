import type { FaqItem, NavItem, Principle, ProcessStep, Service, Stat, Testimonial } from '@/types';

export const navItems: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'why', label: 'Why Personal Branding' },
  { id: 'services', label: 'Services' },
  { id: 'process', label: 'Process' },
  { id: 'results', label: 'Results' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

export const audiences = ['Founders', 'Coaches', 'Consultants', 'Creators', 'Executives'] as const;

export const whyStats: Stat[] = [
  {
    value: 92,
    suffix: '%',
    label: 'of buyers say they trust an individual expert more than a company message.',
  },
  {
    value: 3.6,
    decimals: 1,
    suffix: '×',
    label: 'more inbound conversations for leaders who publish steadily under their own name.',
  },
  {
    value: 67,
    suffix: '%',
    label: 'of high-value opportunities begin with a personal introduction, not an advertisement.',
  },
];

export const services: Service[] = [
  {
    id: 'direction-session',
    icon: 'mark',
    title: 'Direction Session',
    description:
      'A private working session that settles your position, your audience, and the path your name should take next.',
    groups: [
      {
        label: 'Inside the session',
        items: [
          { slug: 'positioning', title: 'Positioning' },
          { slug: 'point-of-view', title: 'Point of view' },
          { slug: 'audience-focus', title: 'Audience focus' },
          { slug: 'content-pillars', title: 'Content pillars' },
          { slug: 'presence-audit', title: 'Presence audit' },
          { slug: 'six-month-roadmap', title: 'Six-month roadmap' },
        ],
      },
    ],
  },
  {
    id: 'organic-presence',
    icon: 'video',
    title: 'Organic Presence',
    description:
      'An ongoing system that keeps your ideas moving from strategy to a published cadence, in your voice.',
    groups: [
      {
        label: 'What we handle',
        items: [
          { slug: 'strategy', title: 'Strategy' },
          { slug: 'scripting', title: 'Scripting' },
          { slug: 'shoot-direction', title: 'Shoot direction' },
          { slug: 'editing', title: 'Editing' },
          { slug: 'publishing', title: 'Publishing' },
        ],
      },
    ],
  },
  {
    id: 'pexbit-1',
    icon: 'site',
    title: 'Pexbit 1.0',
    description:
      'The full build: organic presence, paid media, and the digital products people use to find you.',
    featured: true,
    groups: [
      {
        label: 'Marketing',
        items: [
          { slug: 'paid-media-strategy', title: 'Paid media strategy' },
          { slug: 'audience-funnel', title: 'Audience and funnel mapping' },
          { slug: 'creative-testing', title: 'Creative testing' },
          { slug: 'conversion-tracking', title: 'Conversion tracking' },
          { slug: 'performance-reporting', title: 'Performance reporting' },
        ],
      },
      {
        label: 'Development',
        items: [
          { slug: 'website', title: 'Website' },
          { slug: 'app', title: 'App' },
          { slug: 'software', title: 'Software' },
        ],
      },
    ],
  },
];

export const processSteps: ProcessStep[] = [
  {
    title: 'Discover',
    description:
      'Interviews and an audit of how you are perceived today versus how you should be known.',
  },
  {
    title: 'Strategy',
    description: 'Positioning, narrative, and the point of view your name will own in the market.',
  },
  {
    title: 'Content',
    description: 'Profile, personal site, scripts, and thought leadership written in your voice.',
  },
  {
    title: 'Distribution',
    description:
      'LinkedIn, short-form video, and press placements that turn the narrative into proof.',
  },
  {
    title: 'Growth',
    description:
      'A publishing cadence and review rhythm so recognition compounds instead of fading.',
  },
];

export const resultStats: Stat[] = [
  { value: 150, suffix: '+', label: 'Personal brands built' },
  { value: 10, suffix: 'M+', label: 'Impressions generated' },
  { value: 60, suffix: '+', label: 'Press features secured' },
];

export const pressNames = [
  'Forbes',
  'Entrepreneur',
  'Inc.',
  'Fast Company',
  'Business Insider',
  'Harvard Business Review',
  'LinkedIn News',
  'TechCrunch',
] as const;

export const testimonials: Testimonial[] = [
  {
    quote:
      'I stopped sounding like my company page. Within a quarter, clients were arriving already convinced I was the person to hire.',
    name: 'Amira Shah',
    role: 'Founder, Northline Studio',
  },
  {
    quote:
      'The positioning work gave my coaching practice a point of view. Inbound calls now start with “I have been reading you,” not “what do you charge?”',
    name: 'Daniel Okonkwo',
    role: 'Executive Coach',
  },
  {
    quote:
      'Press used to feel random. Pexbit turned my ideas into a narrative editors could place, and my name started showing up without me chasing it.',
    name: 'Priya Raman',
    role: 'Independent Consultant',
  },
  {
    quote:
      'I had an audience and no authority. The short-form system and ghostwritten essays made the work feel like one recognizable voice.',
    name: 'Jonah Ellis',
    role: 'Creator and Speaker',
  },
  {
    quote:
      'My board asked me to be more visible. The personal site and LinkedIn cadence did that without turning me into a full-time content person.',
    name: 'Helena Voss',
    role: 'Operating Executive',
  },
];

export const principles: Principle[] = [
  {
    title: 'Narrative',
    description:
      'One clear point of view, repeated until the market can say it back without you in the room.',
  },
  {
    title: 'Proof',
    description:
      'Ideas, work, and third-party mentions that make the claim believable to strangers.',
  },
  {
    title: 'Presence',
    description:
      'A profile, personal site, and content system that look and sound like the same person.',
  },
];

export const faqs: FaqItem[] = [
  {
    question: 'What does Pexbit Media do?',
    answer:
      'We build personal brands through three engagements: a Direction Session, an Organic Presence program, and Pexbit 1.0, which adds paid media plus website, app, and software development.',
  },
  {
    question: 'Who do you work with?',
    answer:
      'Founders, coaches, consultants, creators, and executives who want to be known as the credible authority in their field. Every engagement is built around that person.',
  },
  {
    question: 'How is a personal brand different from a company brand?',
    answer:
      'A company brand introduces the organization. A personal brand makes a specific human easy to trust and remember. Buyers, partners, and editors increasingly choose the person first, then the company behind them.',
  },
  {
    question: 'Will the content sound like me?',
    answer:
      'Yes. We interview you, study how you speak, and draft from your point of view. You approve the narrative and every piece that carries your name.',
  },
  {
    question: 'How long before the brand starts working?',
    answer:
      'Most clients leave the first month with positioning, a sharpened profile, and a publishing system. Visibility compounds after that through consistent content, distribution, and proof such as features and inbound conversations.',
  },
  {
    question: 'What happens on the strategy call?',
    answer:
      'We learn your goals, your audience, and where your reputation stands today. You leave with a clear read on the opportunity and whether we are the right studio. It is a working conversation, not a generic pitch.',
  },
];

export const proofNote =
  'Illustrative figures for this preview. Replace with verified client results.';
export const testimonialNote =
  'Representative stories for the layout. Real client quotes replace these.';
