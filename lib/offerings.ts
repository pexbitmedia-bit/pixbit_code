import { services } from '@/lib/content';

export type OfferingFaq = {
  question: string;
  answer: string;
};

export type OfferingStep = {
  title: string;
  text: string;
};

export type OfferingChapter = {
  title: string;
  text: string;
};

export type Offering = {
  slug: string;
  title: string;
  kicker: string;
  lede: string;
  seoTitle: string;
  seoDescription: string;
  image: string;
  imageAlt: string;
  shape: 0 | 1 | 2;
  primaryCta: string;
  secondaryCta: string;
  whyHeading: string;
  whyText: string;
  cards: OfferingChapter[];
  points: string[];
  whoHeading: string;
  whoText: string;
  processHeading: string;
  steps: OfferingStep[];
  faqs: OfferingFaq[];
  relatedHeading: string;
  ctaHeading: string;
  ctaText: string;
  ctaButton: string;
  parent: { slug: string; title: string } | null;
  siblings: { slug: string; title: string }[];
};

type Copy = Omit<Offering, 'slug' | 'title' | 'kicker' | 'parent' | 'siblings'> & {
  displayTitle: string;
};

const copy: Record<string, Copy> = {
  'direction-session': {
    displayTitle: 'Direction Session',
    lede: 'A private personal branding consultant session that settles your position, your audience, and the path your name should take next.',
    seoTitle: 'Direction Session | Pexbit Media',
    seoDescription: 'A private personal branding consultant session that settles your position, your audience, and the path your name should take next.',
    image: '/images/service-direction.jpg',
    imageAlt: 'Strategy notebook and pen for a personal branding Direction Session',
    shape: 0,
    primaryCta: 'Book a Strategy Call',
    secondaryCta: 'See the session',
    whyHeading: 'Why a Direction Session',
    whyText: 'A private personal branding consultant session that settles your position, your audience, and the path your name should take next.',
    cards: [
      { title: 'The room is for decisions', text: 'We isolate the claim your name should own, then pressure-test it against how buyers already talk about your field.' },
      { title: 'You leave with a brief', text: 'Positioning, point of view, audience, pillars, a presence audit, and a six-month roadmap leave the session as one document.' }
    ],
    points: [
      'A single position the market can repeat',
      'Audience narrowed to the people who can hire you',
      'Pillars that stop the content from drifting',
      'A roadmap you can brief a team from'
    ],
    whoHeading: 'Built for leaders who need clarity first',
    whoText: 'Founders, coaches, consultants, creators and executives who want a clear personal brand before content and media spend.',
    processHeading: 'Inside the session',
    steps: [
      { title: 'Audit', text: 'We review how you are perceived today.' },
      { title: 'Position', text: 'We settle the claim your name will own.' },
      { title: 'Audience', text: 'We narrow who should notice you next.' },
      { title: 'Pillars', text: 'We define what you will publish about.' },
      { title: 'Roadmap', text: 'We map the next six months of presence.' }
    ],
    faqs: [

    ],
    relatedHeading: 'Continue through Direction Session',
    ctaHeading: 'Book your Direction Session',
    ctaText: 'In one strategy call, we will see whether a Direction Session is the right first step.',
    ctaButton: 'Book a Strategy Call',
  },
  'organic-presence': {
    displayTitle: 'Organic Presence',
    lede: 'An ongoing content creation and social media marketing system that keeps your ideas moving from strategy to a published cadence, in your voice.',
    seoTitle: 'Organic Presence | Pexbit Media',
    seoDescription: 'Ongoing content creation and social media marketing that keeps your personal brand publishing in your voice.',
    image: '/images/service-organic.jpg',
    imageAlt: 'Camera and phone for organic content creation and social presence',
    shape: 1,
    primaryCta: 'Book a Strategy Call',
    secondaryCta: 'See the system',
    whyHeading: 'Why Organic Presence',
    whyText: 'An ongoing content creation and social media marketing system that keeps your ideas moving from strategy to a published cadence, in your voice.',
    cards: [
      { title: 'Strategy to publish', text: 'We move from pillars and scripts to shoot, edit and publish without losing your voice.' },
      { title: 'A cadence that compounds', text: 'Consistency turns recognition into inbound conversations.' }
    ],
    points: [
      'Strategy',
      'Scripting',
      'Shoot direction',
      'Editing',
      'Publishing'
    ],
    whoHeading: 'Built for leaders who need a publishing system',
    whoText: 'Business owners who want steady personal brand content without becoming a full-time creator.',
    processHeading: 'How the cadence runs',
    steps: [
      { title: 'Strategy', text: 'We set the message and the calendar.' },
      { title: 'Script', text: 'We write in your voice.' },
      { title: 'Shoot', text: 'We direct the capture.' },
      { title: 'Edit', text: 'We finish the films and posts.' },
      { title: 'Publish', text: 'We post and review what worked.' }
    ],
    faqs: [

    ],
    relatedHeading: 'Continue through Organic Presence',
    ctaHeading: 'Start your Organic Presence',
    ctaText: 'In one strategy call, we will map the cadence your brand needs.',
    ctaButton: 'Book a Strategy Call',
  },
  'pexbit-1': {
    displayTitle: 'Pexbit 1.0',
    lede: 'The full build: organic presence, Meta ads and performance marketing, plus the website development people use to find you.',
    seoTitle: 'Pexbit 1.0 | Pexbit Media',
    seoDescription: 'The full personal brand build: organic presence, Meta ads and performance marketing, plus website, app and software development.',
    image: '/images/service-pexbit.jpg',
    imageAlt: 'Laptop and phone for the full Pexbit 1.0 personal brand system',
    shape: 2,
    primaryCta: 'Book a Strategy Call',
    secondaryCta: 'See Pexbit 1.0',
    whyHeading: 'Why Pexbit 1.0',
    whyText: 'The full build: organic presence, Meta ads and performance marketing, plus the website development people use to find you.',
    cards: [
      { title: 'Marketing that finds you', text: 'Paid media, funnels, creative testing, tracking and reporting under one plan.' },
      { title: 'Products people use', text: 'Website, app and software that carry the same personal brand standard.' }
    ],
    points: [
      'Paid media strategy',
      'Audience and funnel mapping',
      'Creative testing',
      'Conversion tracking',
      'Performance reporting',
      'Website, App, Software'
    ],
    whoHeading: 'Built for owners ready for the full system',
    whoText: 'Founders and experts who want organic, paid and digital products working as one personal brand.',
    processHeading: 'How Pexbit 1.0 runs',
    steps: [
      { title: 'Direction', text: 'We settle the brand position.' },
      { title: 'Organic', text: 'We build the publishing system.' },
      { title: 'Paid', text: 'We plan and run performance media.' },
      { title: 'Build', text: 'We ship website, app or software.' },
      { title: 'Grow', text: 'We review and compound results.' }
    ],
    faqs: [

    ],
    relatedHeading: 'Continue through Pexbit 1.0',
    ctaHeading: 'Start Pexbit 1.0',
    ctaText: 'In one strategy call, we will show you what the full build should include.',
    ctaButton: 'Book a Strategy Call',
  },
  'website': {
    displayTitle: 'A Personal Brand Website That Makes You the Obvious Choice',
    lede: 'Your business is established. Your website should show the person behind it. We design and build custom websites for business owners that share your point of view, show your proof and give every visitor a clear next step.',
    seoTitle: 'Website Development for Business Owners | Pexbit Media',
    seoDescription: 'Pexbit Media builds custom personal brand websites for business owners and professionals, designed to build authority, show proof and turn visitors into conversations.',
    image: '/images/studio.jpg',
    imageAlt: '3D personal brand website mockup on laptop and phone',
    shape: 0,
    primaryCta: 'Book a Strategy Call',
    secondaryCta: 'See How We Build',
    whyHeading: 'Your Website Is Your First Meeting',
    whyText: 'When someone searches your name, your website is the first thing they see. If it only lists services, you look like one more company. If it shows your thinking, your journey and your proof, you look like the authority in your field. We build websites that speak for you, whether or not you are in the room.',
    cards: [
      { title: 'A Website That Makes Your Case', text: 'This is not a brochure of services. Your site explains why you, in your field, are the right person to call, using your story, your expertise and your results.' },
      { title: 'Built to Grow With You', text: 'Structure, design and motion are planned so new case studies, videos and articles can be added easily, without a redesign every few months.' }
    ],
    points: [
      'A story-led homepage that explains who you are and why people should trust you.',
      'Proof placed where trust is built: testimonials, case studies, media mentions and numbers.',
      'A fast, mobile-friendly build that loads quickly on every device.',
      'Clear call-to-action buttons and a contact form that bring in real enquiries.',
      'On-page SEO basics: page titles, meta tags, clean structure and fast loading.',
      'A blog and content section for your articles and videos.'
    ],
    whoHeading: 'Built for Business Owners and Professionals',
    whoText: 'If your business is doing well but your online identity is weak, this service is for you. We build personal brand websites for founders, coaches, consultants, doctors, agency owners and experts, so your work and your name are seen together.',
    processHeading: 'From First Call to Launch',
    steps: [
      { title: 'Discover', text: 'We learn about your business, your audience and your goals.' },
      { title: 'Position', text: 'We decide your message, your tone and the story your homepage will tell.' },
      { title: 'Design', text: 'We create a custom, premium design in the Pexbit style.' },
      { title: 'Build', text: 'We develop a fast, responsive and SEO-ready website.' },
      { title: 'Launch', text: 'We test everything, take the site live and keep supporting you after launch.' }
    ],
    faqs: [
      { question: 'What is the difference between a personal brand website and a normal business website?', answer: 'A business website presents your company. A personal brand website presents you, your ideas and your authority, and supports your company alongside it.' },
      { question: 'How long does it take to build a website?', answer: 'It depends on the scope, but most websites are ready in a few weeks. We confirm the exact timeline during the strategy call.' },
      { question: 'Will the website be optimised for mobile and SEO?', answer: 'Yes. Every website is built to be mobile-friendly, fast and set up with on-page SEO basics.' },
      { question: 'Can I add content and pages later?', answer: 'Yes. The site is structured so you can easily add new blogs, videos and case studies.' },
      { question: 'Do you also handle content and social media along with the website?', answer: 'Yes. Your website, content and social media work best together, so we also offer personal brand strategy, content and production.' }
    ],
    relatedHeading: 'Continue Building Your Personal Brand',
    ctaHeading: 'Let\'s Build the Website That Speaks for You',
    ctaText: 'In one strategy call, we will understand your goals and show you what your website should look like.',
    ctaButton: 'Book a Strategy Call',
  },
  'app': {
    displayTitle: 'A Custom App That Puts Your Brand in Your Audience\'s Pocket',
    lede: 'Your business already has customers and followers. An app gives them a direct, branded place to learn from you, book with you and stay connected with you. We design and build custom apps for business owners that feel premium, work smoothly and carry your identity everywhere.',
    seoTitle: 'Custom App Development for Business Owners | Pexbit Media',
    seoDescription: 'Pexbit Media designs and builds custom mobile and web apps for business owners and professionals, helping you serve clients better, stay connected with your audience and grow your brand.',
    image: '/images/product.jpg',
    imageAlt: '3D personal brand app mockup on a floating phone',
    shape: 2,
    primaryCta: 'Book a Strategy Call',
    secondaryCta: 'See How We Build',
    whyHeading: 'Your Brand, Always One Tap Away',
    whyText: 'Social media platforms control who sees your content. An app is different. It is a space you own, where your clients and followers come to you directly. They can book sessions, watch your content, get updates and stay close to your brand without depending on any algorithm. For a business owner building a personal brand, that direct connection builds trust and loyalty over time.',
    cards: [
      { title: 'An App Built Around Your Business', text: 'We do not use a ready-made template. We study how your clients find you, buy from you and stay with you, and then build an app around that journey, in your brand\'s look and voice.' },
      { title: 'Built to Scale With You', text: 'The app is planned so new features, content and users can be added over time, without rebuilding it from scratch as your business grows.' }
    ],
    points: [
      'A custom app design that matches your brand colours, tone and personality.',
      'A smooth, easy-to-use experience for your clients and followers.',
      'Core features planned around your business, such as bookings, content, payments, notifications or a members area.',
      'A secure, fast and reliable build that works well on every device.',
      'An admin panel so you can manage users, content and updates yourself.',
      'Launch support and ongoing maintenance after the app goes live.'
    ],
    whoHeading: 'Built for Business Owners and Professionals',
    whoText: 'If you have an established business and an engaged audience, an app can take that relationship further. We build apps for coaches, consultants, doctors, educators, agency owners, creators and founders who want to offer a better experience and a stronger brand presence.',
    processHeading: 'From First Call to Launch',
    steps: [
      { title: 'Discover', text: 'We learn about your business, your audience and what the app needs to achieve.' },
      { title: 'Plan', text: 'We decide the features, the user journey and the structure of the app.' },
      { title: 'Design', text: 'We create a custom, premium interface in the Pexbit style.' },
      { title: 'Build', text: 'We develop and test a fast, secure and responsive app.' },
      { title: 'Launch', text: 'We publish the app, train you to manage it and keep supporting you after launch.' }
    ],
    faqs: [
      { question: 'Why would a business owner need an app?', answer: 'An app gives your audience a direct, branded space to connect with you, book with you and access your content, without relying on social media algorithms.' },
      { question: 'What kind of apps do you build?', answer: 'We build custom mobile and web apps based on your business needs, such as booking apps, community or membership apps, content and course apps, and client service apps. The exact type is decided during the strategy call.' },
      { question: 'How long does it take to build an app?', answer: 'It depends on the features and complexity, but most apps take a few weeks to a few months. We confirm the timeline and scope during the strategy call.' },
      { question: 'Will I be able to manage the app myself?', answer: 'Yes. We include an admin panel so you can manage content, users and updates without needing technical skills.' },
      { question: 'Do you help with the app after launch?', answer: 'Yes. We offer support, updates and maintenance so your app stays secure and keeps improving.' },
      { question: 'Can the app work together with my website and social media?', answer: 'Yes. Your app, website and content work best as one connected brand, and we can build them together as part of your personal brand plan.' }
    ],
    relatedHeading: 'Continue Building Your Personal Brand',
    ctaHeading: 'Let\'s Build the App Your Brand Deserves',
    ctaText: 'In one strategy call, we will understand your goals and show you what your app should do and how it should look.',
    ctaButton: 'Book a Strategy Call',
  },
  'software': {
    displayTitle: 'Custom Software That Runs Your Business the Way You Do',
    lede: 'Your business has grown, and spreadsheets, scattered tools and manual work are starting to slow it down. We design and build custom software for business owners that automates repeated work, organises your data and gives your clients a smooth, professional experience.',
    seoTitle: 'Custom Software Development for Business Owners | Pexbit Media',
    seoDescription: 'Pexbit Media builds custom software for business owners and growing businesses, from client portals and dashboards to automation tools, so your operations run smoothly and your brand looks professional.',
    image: '/images/product.jpg',
    imageAlt: '3D custom software interface for business owners',
    shape: 1,
    primaryCta: 'Book a Strategy Call',
    secondaryCta: 'See How We Build',
    whyHeading: 'Your Business Deserves Its Own System',
    whyText: 'Off-the-shelf tools are built for everyone, so they rarely fit your business perfectly. You end up adjusting your process to the tool, not the other way around. Custom software works the other way. It is built around how you sell, serve and manage your clients, so your team saves time, your clients get a better experience and your business looks as professional as the brand you are building.',
    cards: [
      { title: 'Software Built Around Your Process', text: 'We do not force your business into a template. We study how you work today, find where time and money are being lost, and build software that fits your process and removes the friction.' },
      { title: 'Built to Scale With You', text: 'The system is planned so new features, users and integrations can be added over time, without rebuilding it from scratch as your business grows.' }
    ],
    points: [
      'A custom software design that matches your brand and is easy for your team to use.',
      'Workflow automation that removes repeated manual tasks and reduces errors.',
      'A central dashboard where you can see your clients, leads, sales and performance in one place.',
      'A client portal or login area where customers can access their information, files and updates.',
      'Integrations with the tools you already use, such as payment gateways, email, WhatsApp and CRM systems.',
      'A secure, fast and reliable build, with documentation, training and ongoing support after launch.'
    ],
    whoHeading: 'Built for Growing Businesses and Their Owners',
    whoText: 'If your business is established and your operations have become harder to manage, custom software can help. We build for founders, agency owners, coaches, consultants, clinics, educators and service businesses that want to save time, serve clients better and run with more control.',
    processHeading: 'From First Call to Launch',
    steps: [
      { title: 'Discover', text: 'We learn about your business, your team and the problems you want to solve.' },
      { title: 'Plan', text: 'We define the features, the workflow and the structure of the system.' },
      { title: 'Design', text: 'We create a clean, premium interface in the Pexbit style.' },
      { title: 'Build', text: 'We develop and test secure, fast and reliable software.' },
      { title: 'Launch', text: 'We deploy the software, train your team and keep supporting you after launch.' }
    ],
    faqs: [
      { question: 'Why would my business need custom software?', answer: 'Custom software fits the way you actually work. It saves time, reduces manual errors and gives you and your clients a better, more professional experience than generic tools.' },
      { question: 'What kind of software do you build?', answer: 'We build custom systems based on your needs, such as dashboards, client portals, booking and CRM systems, internal tools and automation workflows. The exact solution is decided during the strategy call.' },
      { question: 'How long does it take to build custom software?', answer: 'It depends on the features and complexity, but most projects take a few weeks to a few months. We confirm the scope and timeline during the strategy call.' },
      { question: 'Can the software connect with the tools I already use?', answer: 'Yes. We can integrate it with tools such as payment gateways, email, messaging platforms and CRM systems wherever they offer the required access.' },
      { question: 'Will my data be safe?', answer: 'Yes. We build with security in mind, including secure logins and controlled access. We discuss your specific security needs during planning.' },
      { question: 'Do you provide support after launch?', answer: 'Yes. We offer training, support, updates and maintenance so your software keeps working well as your business grows.' }
    ],
    relatedHeading: 'Continue Building Your Personal Brand',
    ctaHeading: 'Let\'s Build the Software Your Business Needs',
    ctaText: 'In one strategy call, we will understand your goals and show you how custom software can save you time and help you grow.',
    ctaButton: 'Book a Strategy Call',
  },
  'paid-media-strategy': {
    displayTitle: 'A Paid Media Strategy That Puts Your Name in Front of the Right People',
    lede: 'Running ads without a plan wastes budget. We build a clear paid media strategy for business owners, covering where to advertise, who to reach, what to spend and what to say, so every rupee supports your brand and your business.',
    seoTitle: 'Paid Media Strategy for Business Owners | Pexbit Media',
    seoDescription: 'Pexbit Media plans paid media strategy for business owners, covering Meta and YouTube ads, budgets and targeting, so your personal brand reaches the right people and brings in real enquiries.',
    image: '/images/signal.jpg',
    imageAlt: '3D paid media strategy megaphone with purple glow',
    shape: 0,
    primaryCta: 'Book a Strategy Call',
    secondaryCta: 'See How We Plan',
    whyHeading: 'Ads Work Best When Strategy Comes First',
    whyText: 'Boosting posts and hoping for results is not a strategy. Paid media works when it is built on a clear goal, a defined audience, a tested message and a realistic budget. Our strategy gives your ads a direction before any money is spent, so you grow your visibility and enquiries with control and not guesswork.',
    cards: [
      { title: 'A Plan Built Around Your Goal', text: 'Whether you want brand awareness, leads or bookings, we decide the platforms, budget split and campaign structure around that one goal.' },
      { title: 'Built to Improve Over Time', text: 'Your strategy is not fixed. We review results, learn from the data and adjust, so each month of advertising works better than the last.' }
    ],
    points: [
      'A clear paid media plan with goals, platforms and campaign structure.',
      'Platform selection across Meta (Facebook and Instagram), YouTube and other channels that suit your audience.',
      'A recommended budget split and spending plan.',
      'Campaign structure and ad formats planned for your goal.',
      'Messaging direction that matches your personal brand voice.',
      'A roadmap for testing, tracking and scaling what works.'
    ],
    whoHeading: 'Built for Business Owners Ready to Grow Faster',
    whoText: 'If your business is established and you want more visibility, more enquiries or a stronger public presence, paid media can speed it up. We work with founders, coaches, consultants, doctors, agency owners and experts who want a plan before they spend.',
    processHeading: 'From First Call to First Campaign',
    steps: [
      { title: 'Discover', text: 'We learn about your business, your audience and your goals.' },
      { title: 'Audit', text: 'We review your current ads, content and results, if you have any.' },
      { title: 'Plan', text: 'We build the platform, budget and campaign strategy.' },
      { title: 'Align', text: 'We match the ad messaging with your personal brand.' },
      { title: 'Roadmap', text: 'You get a clear plan for launch, testing and growth.' }
    ],
    faqs: [
      { question: 'What is a paid media strategy?', answer: 'It is a plan that decides where you advertise, who you target, how much you spend and what message you use, before the ads go live.' },
      { question: 'Which platforms do you plan for?', answer: 'We plan mainly for Meta (Facebook and Instagram) and YouTube, and recommend others if they suit your audience. The final mix is decided during the strategy call.' },
      { question: 'How much budget do I need?', answer: 'It depends on your goal, your market and your industry. We recommend a realistic starting budget during the strategy call.' },
      { question: 'Can you run the ads as well?', answer: 'Yes. We can plan and manage the campaigns, or hand you the strategy to run with your own team.' },
      { question: 'How soon will I see results?', answer: 'Timelines vary by goal and budget. Early data usually comes within the first few weeks, and results improve as we test and refine.' }
    ],
    relatedHeading: 'Continue Building Your Personal Brand',
    ctaHeading: 'Let\'s Plan Ads That Actually Work for You',
    ctaText: 'In one strategy call, we will understand your goals and show you how paid media can fit into your personal brand plan.',
    ctaButton: 'Book a Strategy Call',
  },
  'audience-funnel': {
    displayTitle: 'Know Who You Are Talking To and Where They Go Next',
    lede: 'Attention alone does not bring clients. We map your audience and the full journey they take, from first seeing you to contacting you, so every piece of content and every ad has a clear role.',
    seoTitle: 'Audience and Funnel Mapping for Business Owners | Pexbit Media',
    seoDescription: 'Pexbit Media maps your audience and sales funnel, so business owners know who to reach, what to say at each stage and how to turn attention into enquiries.',
    image: '/images/signal.jpg',
    imageAlt: '3D audience and funnel mapping visual',
    shape: 1,
    primaryCta: 'Book a Strategy Call',
    secondaryCta: 'See How We Map',
    whyHeading: 'Right Message, Right Person, Right Moment',
    whyText: 'Someone who has just discovered you needs a different message from someone ready to book a call. When everyone gets the same message, many people drop off. Audience and funnel mapping shows you who your buyers are, what they care about and what they need to hear at each step, so your marketing feels relevant instead of random.',
    cards: [
      { title: 'Start With the Right Audience', text: 'We define who your ideal clients are, what they struggle with and where they spend their time, so your brand speaks to people who can actually become clients.' },
      { title: 'A Clear Journey From Stranger to Client', text: 'We design every stage of the journey, with the content, offer and call to action that moves people forward without pushing them.' }
    ],
    points: [
      'An ideal client profile covering needs, problems, goals and online behaviour.',
      'Audience segments for your ads and content.',
      'A full funnel map from awareness to enquiry.',
      'Content and offer recommendations for each funnel stage.',
      'Clear calls to action and next steps at every stage.',
      'A list of drop-off points and what to fix first.'
    ],
    whoHeading: 'Built for Business Owners Who Want Better Leads',
    whoText: 'If you get attention but few quality enquiries, or you are not sure who your content should speak to, this service is for you. We work with founders, coaches, consultants, doctors, agency owners and experts who want their marketing to follow a clear path.',
    processHeading: 'From First Call to a Clear Funnel',
    steps: [
      { title: 'Discover', text: 'We learn about your business, offers and current clients.' },
      { title: 'Research', text: 'We study your audience, market and competitors.' },
      { title: 'Segment', text: 'We define your ideal client groups and their needs.' },
      { title: 'Map', text: 'We build the funnel stages and the content for each one.' },
      { title: 'Review', text: 'We hand over a clear map and the first actions to take.' }
    ],
    faqs: [
      { question: 'What is a sales funnel?', answer: 'It is the journey a person takes from first discovering you to becoming a client, usually through stages like awareness, interest, consideration and action.' },
      { question: 'Why do I need audience mapping?', answer: 'It shows you exactly who to target and what to say, so you stop spending time and money on people who will never buy.' },
      { question: 'Do I need this if I already run ads?', answer: 'Yes, it often helps most when you already advertise, because it shows where people drop off and how to improve results.' },
      { question: 'Will this work for a personal brand and not just a company?', answer: 'Yes. We build the funnel around you as a person and your expertise, with your business as the next step.' },
      { question: 'What will I receive at the end?', answer: 'You will get an audience profile, a funnel map and a clear list of actions for content, ads and follow-up.' }
    ],
    relatedHeading: 'Continue Building Your Personal Brand',
    ctaHeading: 'Let\'s Map the Path From Attention to Enquiry',
    ctaText: 'In one strategy call, we will look at your audience and show you where your funnel can improve.',
    ctaButton: 'Book a Strategy Call',
  },
  'creative-testing': {
    displayTitle: 'Stop Guessing Which Content Works. Test It.',
    lede: 'The best-looking ad is not always the best-performing one. We test different hooks, visuals, videos and messages for your ads and content, so you learn what your audience actually responds to.',
    seoTitle: 'Creative Testing for Ads and Content | Pexbit Media',
    seoDescription: 'Pexbit Media tests ad creatives, videos, hooks and messaging for business owners, so you learn what your audience responds to and put your budget behind what works.',
    image: '/images/signal.jpg',
    imageAlt: '3D creative testing boards for ads',
    shape: 2,
    primaryCta: 'Book a Strategy Call',
    secondaryCta: 'See How We Test',
    whyHeading: 'Let Your Audience Choose the Winner',
    whyText: 'Opinions about what looks good are often wrong. Real data shows what people click, watch and act on. Creative testing compares different versions in a controlled way, so you can spend more on the ideas that work and drop the ones that do not.',
    cards: [
      { title: 'Test One Idea at a Time', text: 'We change one thing at a time, such as the hook, the visual or the call to action, so you know exactly what caused the difference in results.' },
      { title: 'Learn, Then Scale', text: 'Every test teaches you something about your audience. We turn those results into stronger content and better ads over time.' }
    ],
    points: [
      'A testing plan with clear ideas and a simple schedule.',
      'Multiple creative variations, such as hooks, videos, images and headlines.',
      'Structured A/B tests with a fair budget split.',
      'Clear results showing what worked and what did not.',
      'Insights about your audience\'s language, interests and behaviour.',
      'Recommendations for what to scale, change or stop.'
    ],
    whoHeading: 'Built for Business Owners Who Advertise or Post Regularly',
    whoText: 'If you already create content or run ads and want better returns, creative testing helps you improve faster. We work with founders, coaches, consultants, doctors, agency owners and experts who want proof, not guesses.',
    processHeading: 'From First Idea to Clear Results',
    steps: [
      { title: 'Review', text: 'We look at your current content, ads and results.' },
      { title: 'Hypothesise', text: 'We decide what to test and why.' },
      { title: 'Create', text: 'We prepare the different creative versions.' },
      { title: 'Test', text: 'We run the tests with a fair budget and clear rules.' },
      { title: 'Learn', text: 'We share the results and what to do next.' }
    ],
    faqs: [
      { question: 'What is creative testing?', answer: 'It is the process of comparing different versions of ads or content, such as different hooks, visuals or messages, to see which performs best.' },
      { question: 'What can be tested?', answer: 'Hooks, headlines, videos, images, captions, offers and calls to action can all be tested.' },
      { question: 'How much budget is needed to test?', answer: 'You need enough budget for each version to collect useful data. We recommend a realistic amount during the strategy call.' },
      { question: 'How long does a test take?', answer: 'Most tests run for one to a few weeks, depending on your budget and how many people see the ads.' },
      { question: 'Do you create the creatives too?', answer: 'Yes. We can work with our content and production services to create the variations, or test creatives you already have.' }
    ],
    relatedHeading: 'Continue Building Your Personal Brand',
    ctaHeading: 'Let\'s Find Out What Your Audience Wants to See',
    ctaText: 'In one strategy call, we will look at your content and ads and show you what to test first.',
    ctaButton: 'Book a Strategy Call',
  },
  'conversion-tracking': {
    displayTitle: 'Know Exactly Which Efforts Bring You Clients',
    lede: 'If you cannot see what is working, you cannot improve it. We set up accurate conversion tracking for your website, ads and forms, so you know which sources bring real enquiries, calls and bookings.',
    seoTitle: 'Conversion Tracking for Business Owners | Pexbit Media',
    seoDescription: 'Pexbit Media sets up conversion tracking for business owners, so you can see which ads, content and pages bring real enquiries, calls and bookings.',
    image: '/images/signal.jpg',
    imageAlt: '3D conversion tracking dashboard',
    shape: 0,
    primaryCta: 'Book a Strategy Call',
    secondaryCta: 'See How We Track',
    whyHeading: 'What You Can\'t Measure, You Can\'t Improve',
    whyText: 'Likes and views look good but do not pay bills. Real growth comes from knowing which ad, post or page led to a client. Conversion tracking connects your marketing to real actions, so you can put your budget and time where they bring results.',
    cards: [
      { title: 'Track the Actions That Matter', text: 'We decide which actions count, such as form submissions, calls, WhatsApp clicks or bookings, and set up tracking for each one.' },
      { title: 'One Clear Picture of Your Results', text: 'We connect your website, ads and analytics tools so the data is accurate, consistent and easy to understand.' }
    ],
    points: [
      'A tracking plan listing the actions and goals to measure.',
      'Setup of analytics and ad platform tracking, such as Google Analytics, Google Tag Manager and Meta Pixel.',
      'Form, call and button tracking on your website.',
      'Testing to confirm that every conversion is recorded correctly.',
      'Clean, organised data connected to your campaigns.',
      'Clear documentation of what is being tracked and how.'
    ],
    whoHeading: 'Built for Business Owners Who Want Clear Numbers',
    whoText: 'If you run ads, have a website or generate leads but are not sure what is working, this service is for you. We work with founders, coaches, consultants, doctors, agency owners and experts who want reliable data behind their decisions.',
    processHeading: 'From First Call to Accurate Data',
    steps: [
      { title: 'Audit', text: 'We check your current tracking and find the gaps.' },
      { title: 'Plan', text: 'We decide which actions and goals to track.' },
      { title: 'Set Up', text: 'We install and configure the tracking tools.' },
      { title: 'Test', text: 'We confirm that every conversion is recorded correctly.' },
      { title: 'Hand Over', text: 'We document the setup and explain how to read the data.' }
    ],
    faqs: [
      { question: 'What is conversion tracking?', answer: 'It is the setup that records valuable actions on your website or ads, such as form submissions, calls and bookings, so you can measure results.' },
      { question: 'Why is it important?', answer: 'It shows which ads, pages and content bring real enquiries, so you can spend your budget on what works.' },
      { question: 'Which tools do you use?', answer: 'We typically work with Google Analytics, Google Tag Manager and the Meta Pixel, depending on your needs.' },
      { question: 'Do I need a website for this?', answer: 'A website or landing page is usually needed to track on-site actions. We can also help you set one up.' },
      { question: 'How do I know the tracking is accurate?', answer: 'We test every conversion after setup and document the results, so you can trust the data.' }
    ],
    relatedHeading: 'Continue Building Your Personal Brand',
    ctaHeading: 'Let\'s Make Every Result Measurable',
    ctaText: 'In one strategy call, we will review your setup and show you what you should be tracking.',
    ctaButton: 'Book a Strategy Call',
  },
  'performance-reporting': {
    displayTitle: 'Clear Reports That Show What\'s Working and What to Do Next',
    lede: 'Numbers are only useful when you understand them. We turn your data from content, ads and your website into simple, honest reports that show your progress and guide your next decision.',
    seoTitle: 'Performance Reporting for Business Owners | Pexbit Media',
    seoDescription: 'Pexbit Media delivers clear performance reports for business owners, showing how your content, ads and website perform and what to do next to grow.',
    image: '/images/signal.jpg',
    imageAlt: '3D performance reporting chart',
    shape: 1,
    primaryCta: 'Book a Strategy Call',
    secondaryCta: 'See How We Report',
    whyHeading: 'Data Is Only Useful When It Leads to Action',
    whyText: 'Many business owners receive reports full of numbers they do not understand. A good report answers three questions: what happened, why it happened and what should be done next. Our reports focus on the results that matter to your business, in plain language, so you can make confident decisions.',
    cards: [
      { title: 'Reports You Can Actually Understand', text: 'We skip the confusing jargon and focus on the numbers tied to your goals, with simple explanations of what they mean.' },
      { title: 'Built to Drive the Next Step', text: 'Every report ends with clear recommendations, so you always know what to keep, change or try next.' }
    ],
    points: [
      'A regular report, typically monthly, covering your key results.',
      'Clear metrics for reach, engagement, traffic, leads and conversions.',
      'Performance summaries for your content, ads and website.',
      'Insights explaining what worked, what did not and why.',
      'Specific recommendations for the next period.',
      'A review call to walk you through the results and answer questions.'
    ],
    whoHeading: 'Built for Business Owners Who Want to See Real Progress',
    whoText: 'If you invest in content, ads or a website and want honest visibility into the results, this service is for you. We work with founders, coaches, consultants, doctors, agency owners and experts who want clear, reliable reporting.',
    processHeading: 'From Raw Data to Clear Decisions',
    steps: [
      { title: 'Define', text: 'We agree on your goals and the key numbers to track.' },
      { title: 'Connect', text: 'We bring your data sources together in one place.' },
      { title: 'Analyse', text: 'We study the results and find the patterns.' },
      { title: 'Report', text: 'We prepare a clear, simple report with insights.' },
      { title: 'Review', text: 'We walk you through the results and agree on next steps.' }
    ],
    faqs: [
      { question: 'What does a performance report include?', answer: 'It includes the key results for your content, ads and website, along with insights and recommendations for what to do next.' },
      { question: 'How often will I receive reports?', answer: 'Most clients receive monthly reports. We can agree on a different schedule during the strategy call.' },
      { question: 'Which metrics do you report on?', answer: 'We focus on the metrics tied to your goals, such as reach, engagement, website traffic, leads and conversions.' },
      { question: 'Will I be able to understand the report?', answer: 'Yes. We write reports in plain language and explain the results on a review call.' },
      { question: 'Can reporting work without conversion tracking?', answer: 'Basic reporting is possible, but accurate conversion tracking makes your reports much more useful, so we recommend setting it up first.' }
    ],
    relatedHeading: 'Continue Building Your Personal Brand',
    ctaHeading: 'Let\'s Turn Your Numbers Into Clear Decisions',
    ctaText: 'In one strategy call, we will understand your goals and show you how our reporting can guide your growth.',
    ctaButton: 'Book a Strategy Call',
  },
  'strategy': {
    displayTitle: 'An Organic Content Strategy That Builds Your Name Without Ads',
    lede: 'Posting without a plan gets you scattered views and no clear identity. We build a content strategy for business owners that decides what you talk about, where you show up and how often, so your audience grows steadily and remembers you.',
    seoTitle: 'Organic Content Strategy for Business Owners | Pexbit Media',
    seoDescription: 'Pexbit Media builds organic content strategy for business owners, covering topics, platforms and posting plans, so your personal brand grows on Instagram, YouTube and LinkedIn without paid ads.',
    image: '/images/lens.jpg',
    imageAlt: '3D organic content strategy plan',
    shape: 0,
    primaryCta: 'Book a Strategy Call',
    secondaryCta: 'See How We Plan',
    whyHeading: 'Consistent Content Needs a Clear Direction',
    whyText: 'Most business owners know they should post, but not what to say or why. Without a strategy, content feels random and the audience never gets a clear picture of who you are. A good strategy gives every post a purpose, so over time people recognise your voice, trust your expertise and think of you first.',
    cards: [
      { title: 'Content Built Around Your Story', text: 'We start with your experience, your point of view and your expertise, and turn them into content pillars that only you can own.' },
      { title: 'A Plan You Can Follow Every Week', text: 'Your strategy becomes a simple content calendar with clear topics and formats, so posting stops being a daily guessing game.' }
    ],
    points: [
      'A personal brand content strategy with clear goals and positioning.',
      'Three to five content pillars based on your expertise and story.',
      'Platform recommendations across Instagram, YouTube and LinkedIn.',
      'A content calendar with topics, formats and posting frequency.',
      'Hook and topic ideas suited to your audience.',
      'A simple system to track what is growing your presence.'
    ],
    whoHeading: 'Built for Business Owners Who Want to Be Seen',
    whoText: 'If your business is established but your online presence is quiet or inconsistent, this service is for you. We work with founders, coaches, consultants, doctors, agency owners and experts who want a clear plan for growing their name organically.',
    processHeading: 'From First Call to a Clear Content Plan',
    steps: [
      { title: 'Discover', text: 'We learn about your business, your story and your goals.' },
      { title: 'Research', text: 'We study your audience, market and competitors.' },
      { title: 'Position', text: 'We define your voice, pillars and the message you want to be known for.' },
      { title: 'Plan', text: 'We build your platform mix and content calendar.' },
      { title: 'Hand Over', text: 'You get a clear strategy and the first steps to start.' }
    ],
    faqs: [
      { question: 'What is an organic content strategy?', answer: 'It is a plan for growing your audience through regular, valuable content on platforms like Instagram, YouTube and LinkedIn, without paying for ads.' },
      { question: 'How long does organic growth take?', answer: 'It varies by niche and consistency, but most business owners start seeing clear progress within a few months of regular, focused posting.' },
      { question: 'Which platforms will you plan for?', answer: 'We recommend the platforms where your audience is most active, usually a mix of Instagram, YouTube and LinkedIn. The final mix is decided in the strategy call.' },
      { question: 'Do I need to be on camera?', answer: 'Not always. We plan the formats that suit your comfort level, though video usually builds personal recognition fastest.' },
      { question: 'Can you also create and post the content?', answer: 'Yes. We can handle scripting, shooting, editing and publishing, so the strategy turns into real content.' }
    ],
    relatedHeading: 'Continue Building Your Organic Presence',
    ctaHeading: 'Let\'s Plan Content That Builds Your Name',
    ctaText: 'In one strategy call, we will understand your goals and show you what your content plan should look like.',
    ctaButton: 'Book a Strategy Call',
  },
  'scripting': {
    displayTitle: 'Scripts That Sound Like You and Keep People Watching',
    lede: 'Good content starts with good words. We write scripts for reels, shorts and YouTube videos that turn your expertise into clear, engaging stories, in a voice that feels natural and makes people stay till the end.',
    seoTitle: 'Content Scripting Services for Business Owners | Pexbit Media',
    seoDescription: 'Pexbit Media writes scripts for reels, YouTube videos and short-form content, so business owners can share their expertise in a clear, engaging voice that sounds like them.',
    image: '/images/lens.jpg',
    imageAlt: '3D content scripting notebook',
    shape: 1,
    primaryCta: 'Book a Strategy Call',
    secondaryCta: 'See How We Write',
    whyHeading: 'The First Three Seconds Decide Everything',
    whyText: 'People scroll fast. If the opening does not hold them, even great advice goes unseen. A strong script grabs attention in the first seconds, delivers one clear idea and ends with a reason to follow or contact you. Scripting is what turns your knowledge into content people actually finish watching.',
    cards: [
      { title: 'Your Voice, Not a Template', text: 'We study how you speak and think, so every script sounds like you and not like a generic marketing line.' },
      { title: 'Built to Hold Attention', text: 'Every script follows a clear structure with a strong hook, a focused message and a simple ending, so viewers stay and act.' }
    ],
    points: [
      'Scripts for reels, shorts, YouTube videos and talking-head content.',
      'Strong hooks written for the first seconds of every video.',
      'Content based on your expertise, stories and opinions.',
      'Clear calls to action that move viewers to follow, comment or enquire.',
      'Simple formatting that is easy to read on camera.',
      'Revisions so the final script feels right to you.'
    ],
    whoHeading: 'Built for Business Owners With Something to Say',
    whoText: 'If you have knowledge and stories but struggle to put them into words, this service is for you. We work with founders, coaches, consultants, doctors, agency owners and experts who want ready-to-shoot scripts without spending hours writing.',
    processHeading: 'From Idea to Ready-to-Shoot Script',
    steps: [
      { title: 'Discover', text: 'We learn about your voice, audience and topics.' },
      { title: 'Ideate', text: 'We choose the topics and hooks for your content.' },
      { title: 'Write', text: 'We write the first drafts in your style.' },
      { title: 'Refine', text: 'We revise based on your feedback.' },
      { title: 'Deliver', text: 'You get final scripts that are ready to shoot.' }
    ],
    faqs: [
      { question: 'What kind of scripts do you write?', answer: 'We write scripts for reels, YouTube shorts, long-form YouTube videos and other talking-head content.' },
      { question: 'Will the script sound like me?', answer: 'Yes. We learn your tone, vocabulary and style first, and revise until it feels natural to you.' },
      { question: 'Do I need to give topics?', answer: 'No. We suggest topics based on your strategy, though you can add your own ideas at any time.' },
      { question: 'How many scripts can I get?', answer: 'It depends on your plan. We agree on the number of scripts per month during the strategy call.' },
      { question: 'Can you write in Hindi or English?', answer: 'Yes. We can write in Hindi, English or a mix, depending on your audience.' }
    ],
    relatedHeading: 'Continue Building Your Organic Presence',
    ctaHeading: 'Let\'s Put Your Expertise Into Words',
    ctaText: 'In one strategy call, we will understand your voice and show you how your scripts can sound.',
    ctaButton: 'Book a Strategy Call',
  },
  'shoot-direction': {
    displayTitle: 'Shoot Direction That Makes You Look Confident on Camera',
    lede: 'Most business owners are experts, not actors. We direct every shoot, from setup and framing to delivery and retakes, so you feel at ease on camera and your content looks premium.',
    seoTitle: 'Video Shoot Direction for Business Owners | Pexbit Media',
    seoDescription: 'Pexbit Media guides business owners through every video shoot, covering framing, delivery, setup and flow, so you look confident and your content looks professional.',
    image: '/images/lens.jpg',
    imageAlt: '3D shoot direction camera',
    shape: 2,
    primaryCta: 'Book a Strategy Call',
    secondaryCta: 'See How We Direct',
    whyHeading: 'How You Look on Camera Shapes How You Are Trusted',
    whyText: 'Viewers judge your authority in seconds. Poor lighting, awkward delivery or messy framing can make strong advice feel weak. Good direction fixes this. It helps you speak naturally, look your best and stay consistent across every video, so your brand feels professional from the first frame.',
    cards: [
      { title: 'Direction That Puts You at Ease', text: 'We guide your posture, tone and delivery during the shoot, so you speak naturally and confidently without feeling stiff.' },
      { title: 'A Shoot That Saves Your Time', text: 'We plan scenes, setups and outfits in advance, so one shoot day gives you weeks of content.' }
    ],
    points: [
      'A pre-shoot plan covering scripts, setups, outfits and locations.',
      'On-set direction for framing, delivery and energy.',
      'Guidance on lighting, background and audio quality.',
      'Multiple videos shot in one planned session.',
      'Retakes and feedback on the spot until the shot works.',
      'Raw footage organised and ready for editing.'
    ],
    whoHeading: 'Built for Business Owners Who Want to Look Their Best',
    whoText: 'If you want to be on camera but feel unsure about it, this service is for you. We work with founders, coaches, consultants, doctors, agency owners and experts who want a smooth, professional shoot without the stress.',
    processHeading: 'From Planning to a Smooth Shoot Day',
    steps: [
      { title: 'Plan', text: 'We prepare the scripts, setups and shot list.' },
      { title: 'Prepare', text: 'We agree on locations, outfits and equipment.' },
      { title: 'Brief', text: 'We explain the flow so you know what to expect.' },
      { title: 'Shoot', text: 'We direct the session and capture multiple videos.' },
      { title: 'Deliver', text: 'We organise the footage and move it to editing.' }
    ],
    faqs: [
      { question: 'Do I need any experience being on camera?', answer: 'No. We direct you through the whole shoot and help you feel comfortable, even if it is your first time.' },
      { question: 'Where does the shoot take place?', answer: 'It can be at your office, a studio or another suitable location. We decide this during planning.' },
      { question: 'How many videos can we shoot in one day?', answer: 'It depends on the content, but a well-planned session can produce many videos. We agree on the number during planning.' },
      { question: 'What equipment do you use?', answer: 'We use professional camera, lighting and audio equipment suited to the shoot. The exact setup is confirmed before the shoot day.' },
      { question: 'Do you handle editing after the shoot?', answer: 'Yes. Our editing service takes the footage from the shoot all the way to finished videos.' }
    ],
    relatedHeading: 'Continue Building Your Organic Presence',
    ctaHeading: 'Let\'s Make Your Next Shoot Easy and Powerful',
    ctaText: 'In one strategy call, we will understand your content goals and plan your first shoot with you.',
    ctaButton: 'Book a Strategy Call',
  },
  'editing': {
    displayTitle: 'Video Editing That Turns Raw Footage Into Content People Remember',
    lede: 'Great footage needs great editing. We edit reels, shorts and YouTube videos for business owners with sharp cuts, clean captions, strong sound and consistent branding, so every video looks polished and keeps viewers watching.',
    seoTitle: 'Video Editing Services for Business Owners | Pexbit Media',
    seoDescription: 'Pexbit Media edits reels, shorts and YouTube videos for business owners, with sharp cuts, captions, sound and branding that keep viewers watching and make your personal brand look premium.',
    image: '/images/lens.jpg',
    imageAlt: '3D video editing timeline',
    shape: 0,
    primaryCta: 'Book a Strategy Call',
    secondaryCta: 'See How We Edit',
    whyHeading: 'Editing Decides Whether People Keep Watching',
    whyText: 'Viewers leave quickly when a video feels slow, unclear or messy. Editing controls pace, clarity and emotion. The right cuts, captions, music and visuals keep attention, make your message easy to follow and give your brand a professional, recognisable look.',
    cards: [
      { title: 'Edits Built for Attention', text: 'We shape every video around pace and clarity, using tight cuts, captions and sound so viewers stay till the end.' },
      { title: 'One Look Across Every Video', text: 'We use consistent fonts, colours and styles, so all your videos look like they belong to one recognisable brand.' }
    ],
    points: [
      'Professional editing for reels, shorts, YouTube videos and talking-head content.',
      'Sharp cuts, pacing and transitions that keep viewers engaged.',
      'Clean, readable captions and on-screen text.',
      'Music, sound design and audio clean-up.',
      'Branding with your colours, fonts and style.',
      'Thumbnails and cover images, and revisions until you are happy.'
    ],
    whoHeading: 'Built for Business Owners Who Want Polished Content',
    whoText: 'If you have footage but no time to edit, or your current videos do not look professional, this service is for you. We work with founders, coaches, consultants, doctors, agency owners and experts who want premium videos without managing an editor.',
    processHeading: 'From Raw Footage to Finished Video',
    steps: [
      { title: 'Receive', text: 'You share your footage and any references.' },
      { title: 'Plan', text: 'We decide the style, pace and branding for each video.' },
      { title: 'Edit', text: 'We cut, add captions, sound and visuals.' },
      { title: 'Review', text: 'You share feedback and we revise.' },
      { title: 'Deliver', text: 'You get final videos in the right formats for each platform.' }
    ],
    faqs: [
      { question: 'What types of videos do you edit?', answer: 'We edit reels, YouTube shorts, long-form YouTube videos and other talking-head content.' },
      { question: 'How long does editing take?', answer: 'It depends on the length and number of videos. We confirm turnaround times during the strategy call.' },
      { question: 'How many revisions are included?', answer: 'We include revisions so the final video feels right. The exact number is agreed during the strategy call.' },
      { question: 'Can you add captions and subtitles?', answer: 'Yes. We add clear captions, and can do Hindi, English or mixed-language subtitles.' },
      { question: 'Can you edit footage I shot myself?', answer: 'Yes. We can edit footage from your own shoots or from ours.' }
    ],
    relatedHeading: 'Continue Building Your Organic Presence',
    ctaHeading: 'Let\'s Turn Your Footage Into Standout Content',
    ctaText: 'In one strategy call, we will look at your content and show you how your videos can look after editing.',
    ctaButton: 'Book a Strategy Call',
  },
  'publishing': {
    displayTitle: 'Consistent Publishing That Keeps Your Brand Visible',
    lede: 'Creating great content is only half the job. We handle the publishing for you, including captions, scheduling, formatting and posting across Instagram, YouTube and LinkedIn, so your brand shows up regularly without taking your time.',
    seoTitle: 'Content Publishing and Social Media Management | Pexbit Media',
    seoDescription: 'Pexbit Media handles content publishing for business owners, including scheduling, captions, hashtags and platform optimisation, so your personal brand posts consistently on Instagram, YouTube and LinkedIn.',
    image: '/images/lens.jpg',
    imageAlt: '3D content publishing calendar',
    shape: 1,
    primaryCta: 'Book a Strategy Call',
    secondaryCta: 'See How We Publish',
    whyHeading: 'Consistency Is What Builds Recognition',
    whyText: 'Audiences remember brands they see often. Posting in bursts and then disappearing breaks that trust, and platforms reward steady activity. Reliable publishing keeps your name in front of your audience week after week, with each post formatted and timed for the platform it appears on.',
    cards: [
      { title: 'Posting That Never Misses a Week', text: 'We schedule and publish your content on a steady rhythm, so your presence stays active even during your busiest weeks.' },
      { title: 'Built for Each Platform', text: 'Every post is formatted, captioned and optimised for the platform it goes on, so it gets the best chance to be seen.' }
    ],
    points: [
      'A publishing schedule based on your content calendar.',
      'Captions and descriptions written in your brand voice.',
      'Hashtags, titles and keywords chosen for reach and search.',
      'Formatting and sizing for Instagram, YouTube and LinkedIn.',
      'Scheduling and posting of every piece of content.',
      'A regular summary of what was published and how it is performing.'
    ],
    whoHeading: 'Built for Busy Business Owners',
    whoText: 'If you have content ready but no time to post it regularly, this service is for you. We work with founders, coaches, consultants, doctors, agency owners and experts who want a consistent online presence without managing it themselves.',
    processHeading: 'From Ready Content to Live Posts',
    steps: [
      { title: 'Collect', text: 'We receive your finished videos and posts.' },
      { title: 'Prepare', text: 'We write captions, titles and hashtags.' },
      { title: 'Schedule', text: 'We plan the best posting days and times.' },
      { title: 'Publish', text: 'We post your content on each platform.' },
      { title: 'Review', text: 'We share a summary of results and adjust the plan.' }
    ],
    faqs: [
      { question: 'Which platforms do you publish on?', answer: 'We publish on Instagram, YouTube and LinkedIn, and can add other platforms if they suit your audience.' },
      { question: 'Do you write the captions too?', answer: 'Yes. We write captions, titles and descriptions in your brand voice.' },
      { question: 'Will I get to approve posts before they go live?', answer: 'Yes. You can review and approve content before it is scheduled, if you prefer.' },
      { question: 'How often will you post for me?', answer: 'We follow the posting frequency agreed in your content strategy, and it can be changed as your needs grow.' },
      { question: 'Can you respond to comments and messages?', answer: 'We can discuss community management during the strategy call, depending on your needs.' }
    ],
    relatedHeading: 'Continue Building Your Organic Presence',
    ctaHeading: 'Let\'s Keep Your Brand Visible Every Week',
    ctaText: 'In one strategy call, we will understand your goals and plan a publishing rhythm that fits you.',
    ctaButton: 'Book a Strategy Call',
  },
  'positioning': {
    displayTitle: 'Positioning That Makes You the Obvious Choice in Your Market',
    lede: 'Many business owners are good at what they do but hard to describe in one line. In the Direction Session, we define your personal brand positioning: who you are for, what you are known for and why you are different, so people understand you quickly and remember you.',
    seoTitle: 'Personal Brand Positioning for Business Owners | Pexbit Media',
    seoDescription: 'Pexbit Media defines your personal brand positioning in a Direction Session, so business owners know exactly what they stand for, who they serve and why people should choose them.',
    image: '/images/studio.jpg',
    imageAlt: '3D personal brand positioning flag',
    shape: 0,
    primaryCta: 'Book a Strategy Call',
    secondaryCta: 'See How We Position',
    whyHeading: 'If You Are Known for Everything, You Are Known for Nothing',
    whyText: 'When your brand tries to speak to everyone, it sounds like everyone else. Strong positioning gives you a clear place in your market. It tells people what you do, who you do it for and why you are the one to call, so your content, website and conversations all carry the same message.',
    cards: [
      { title: 'One Clear Message', text: 'We boil your experience down to a short, sharp statement that people can repeat after hearing it once.' },
      { title: 'Different From Your Competitors', text: 'We study how others in your market present themselves and find the space only you can own.' }
    ],
    points: [
      'A one-line positioning statement for your personal brand.',
      'A clear description of who you serve and the problem you solve.',
      'Your key strengths and what makes you different.',
      'A short competitor and market comparison.',
      'Brand message examples for your bio, website and content.',
      'Guidance on how to use your positioning across platforms.'
    ],
    whoHeading: 'Built for Business Owners Who Are Hard to Describe in One Line',
    whoText: 'If people struggle to explain what you do, or you compete on price because you look like everyone else, this session is for you. We work with founders, coaches, consultants, doctors, agency owners and experts who want a clear identity.',
    processHeading: 'From First Call to Clear Positioning',
    steps: [
      { title: 'Listen', text: 'We learn about your business, story and goals.' },
      { title: 'Research', text: 'We study your market and competitors.' },
      { title: 'Find', text: 'We identify what makes you different.' },
      { title: 'Define', text: 'We write your positioning statement and key messages.' },
      { title: 'Apply', text: 'We show you how to use it across your brand.' }
    ],
    faqs: [
      { question: 'What is personal brand positioning?', answer: 'It is the clear space you hold in your market, defined by who you serve, what you are known for and why you are different.' },
      { question: 'Why does a business owner need positioning?', answer: 'Without it, your content and website feel generic. Positioning makes you recognisable and easier to choose.' },
      { question: 'Can my positioning change later?', answer: 'Yes. It can grow as your business grows, though the core stays steady.' },
      { question: 'Is this different from my company\'s branding?', answer: 'Yes. Company branding presents the business. Personal positioning presents you and supports the company.' },
      { question: 'What do I receive at the end?', answer: 'You receive a positioning statement, key messages and a guide to using them across your brand.' }
    ],
    relatedHeading: 'Continue Through the Direction Session',
    ctaHeading: 'Let\'s Define What You Want to Be Known For',
    ctaText: 'In one strategy call, we will explore your story and show you how your positioning can take shape.',
    ctaButton: 'Book a Strategy Call',
  },
  'point-of-view': {
    displayTitle: 'A Point of View That Makes People Listen',
    lede: 'Authority comes from having something to say. In the Direction Session, we help you uncover the opinions, beliefs and lessons that only your experience can give, and turn them into a clear point of view your audience remembers.',
    seoTitle: 'Personal Brand Point of View for Business Owners | Pexbit Media',
    seoDescription: 'Pexbit Media helps business owners find and shape their point of view, so your opinions, beliefs and ideas set you apart as a voice worth following.',
    image: '/images/studio.jpg',
    imageAlt: '3D point of view lens',
    shape: 1,
    primaryCta: 'Book a Strategy Call',
    secondaryCta: 'See How We Shape It',
    whyHeading: 'Opinions Build Authority, Information Does Not',
    whyText: 'Anyone can share tips found online. What sets leaders apart is a clear stance: what they believe, what they disagree with and what they have learned the hard way. A strong point of view gives your content personality and gives people a reason to follow you instead of anyone else.',
    cards: [
      { title: 'Drawn From Your Own Experience', text: 'We dig into your journey, mistakes and wins to find the ideas that only you can speak about with real authority.' },
      { title: 'Clear Enough to Repeat', text: 'We turn your thinking into a few strong statements that are easy to share in videos, posts and conversations.' }
    ],
    points: [
      'A set of core beliefs that define your thinking.',
      'Your key opinions on your industry and its common myths.',
      'Personal stories and lessons that support your views.',
      'A clear stance on what you stand for and against.',
      'Guidance on how to express your view with confidence.',
      'Example talking points for content and interviews.'
    ],
    whoHeading: 'Built for Business Owners With Experience Worth Sharing',
    whoText: 'If you have years of knowledge but your content feels generic, this session is for you. We work with founders, coaches, consultants, doctors, agency owners and experts who want to be known for their thinking.',
    processHeading: 'From Experience to a Clear Point of View',
    steps: [
      { title: 'Discuss', text: 'We talk through your career, lessons and opinions.' },
      { title: 'Extract', text: 'We find the ideas that stand out.' },
      { title: 'Shape', text: 'We turn them into clear beliefs and statements.' },
      { title: 'Test', text: 'We check them against your market and audience.' },
      { title: 'Finalise', text: 'You receive your point of view and talking points.' }
    ],
    faqs: [
      { question: 'What is a point of view in personal branding?', answer: 'It is your clear stance on your field: what you believe, what you challenge and what you have learned.' },
      { question: 'What if I do not think I have strong opinions?', answer: 'Most experienced business owners do. We bring them out through guided questions about your journey.' },
      { question: 'Is a bold opinion risky?', answer: 'Not when it is honest and well thought out. We help you express your view in a confident and respectful way.' },
      { question: 'How is this used in my content?', answer: 'Your point of view becomes the base for your videos, posts, website and interviews.' },
      { question: 'Will it sound like me?', answer: 'Yes. It comes directly from your own thinking and experience.' }
    ],
    relatedHeading: 'Continue Through the Direction Session',
    ctaHeading: 'Let\'s Find the Ideas Only You Can Share',
    ctaText: 'In one strategy call, we will explore your experience and show you where your strongest point of view lies.',
    ctaButton: 'Book a Strategy Call',
  },
  'audience-focus': {
    displayTitle: 'Focus on the Audience That Matters Most',
    lede: 'Trying to reach everyone means reaching no one. In the Direction Session, we decide exactly who your personal brand is for, what they care about and where they spend time, so every piece of content speaks to the right people.',
    seoTitle: 'Audience Focus for Personal Brands | Pexbit Media',
    seoDescription: 'Pexbit Media helps business owners decide exactly who their personal brand speaks to, so your content reaches the people who can become clients, partners and followers.',
    image: '/images/studio.jpg',
    imageAlt: '3D audience focus target',
    shape: 2,
    primaryCta: 'Book a Strategy Call',
    secondaryCta: 'See How We Focus',
    whyHeading: 'The Right Few Matter More Than the Many',
    whyText: 'A large audience that never becomes clients does little for your business. A smaller, focused audience that trusts you does far more. Knowing exactly who you speak to helps you choose the right topics, tone and platforms, and attract people who value what you offer.',
    cards: [
      { title: 'A Clear Picture of Your Ideal Person', text: 'We describe who they are, what they struggle with and what they want, so you always know who you are talking to.' },
      { title: 'Reach Them Where They Are', text: 'We identify the platforms and content types your audience actually uses, so your effort goes where it counts.' }
    ],
    points: [
      'A profile of your ideal audience and client.',
      'Their main problems, questions and goals.',
      'The language and topics they respond to.',
      'Platforms where they are most active.',
      'Priority audience groups to focus on first.',
      'Guidance on how to speak to them in your content.'
    ],
    whoHeading: 'Built for Business Owners Who Want Better Followers and Better Leads',
    whoText: 'If you have followers who never become clients, or you are unsure who your content is for, this session is for you. We work with founders, coaches, consultants, doctors, agency owners and experts who want a focused audience.',
    processHeading: 'From Wide Reach to a Clear Audience',
    steps: [
      { title: 'Review', text: 'We look at your current clients and followers.' },
      { title: 'Research', text: 'We study your market and audience behaviour.' },
      { title: 'Segment', text: 'We separate your audience into clear groups.' },
      { title: 'Prioritise', text: 'We choose the groups to focus on first.' },
      { title: 'Guide', text: 'You receive an audience profile and content guidance.' }
    ],
    faqs: [
      { question: 'What is audience focus?', answer: 'It is the decision about exactly who your personal brand speaks to, based on who can become your clients and supporters.' },
      { question: 'Can I have more than one audience?', answer: 'Yes, though we help you choose one main group to focus on first.' },
      { question: 'Will focusing on one audience limit my growth?', answer: 'No. A clear focus usually grows your audience faster because people feel the content is made for them.' },
      { question: 'How do you research my audience?', answer: 'We use your current clients, your market, platform data and competitor research.' },
      { question: 'How is this different from funnel mapping?', answer: 'Audience focus decides who you speak to. Funnel mapping decides the journey they take after that.' }
    ],
    relatedHeading: 'Continue Through the Direction Session',
    ctaHeading: 'Let\'s Find the People Your Brand Is Built For',
    ctaText: 'In one strategy call, we will look at your market and show you who your content should speak to.',
    ctaButton: 'Book a Strategy Call',
  },
  'content-pillars': {
    displayTitle: 'Content Pillars That Give Every Post a Purpose',
    lede: 'Posting random topics makes your brand hard to follow. In the Direction Session, we define the three to five themes you will be known for, so your content stays focused, your audience knows what to expect and ideas never run out.',
    seoTitle: 'Content Pillars for Personal Branding | Pexbit Media',
    seoDescription: 'Pexbit Media defines content pillars for business owners, so every post, reel and video supports a clear theme and builds your personal brand with purpose.',
    image: '/images/studio.jpg',
    imageAlt: '3D content pillars structure',
    shape: 0,
    primaryCta: 'Book a Strategy Call',
    secondaryCta: 'See How We Build Pillars',
    whyHeading: 'Strong Brands Are Built on a Few Clear Themes',
    whyText: 'When your content jumps between unrelated topics, your audience cannot tell what you stand for. Content pillars keep your message steady. They give you a clear base to build on, make planning easier and help people link your name to specific ideas.',
    cards: [
      { title: 'Themes Drawn From Who You Are', text: 'We build your pillars from your expertise, story and point of view, so they feel real and are easy to talk about.' },
      { title: 'Endless Ideas, One Direction', text: 'Each pillar opens many topics and formats, so you always have something to post without losing focus.' }
    ],
    points: [
      'Three to five content pillars built around your brand.',
      'A short description of each pillar and its purpose.',
      'Topic ideas and example hooks for every pillar.',
      'Suggested formats such as reels, videos, carousels and posts.',
      'A balance guide for mixing education, story and opinion.',
      'Guidance on how to turn pillars into a weekly plan.'
    ],
    whoHeading: 'Built for Business Owners Who Want Consistent Content',
    whoText: 'If you never know what to post, or your content feels scattered, this session is for you. We work with founders, coaches, consultants, doctors, agency owners and experts who want a clear framework for their content.',
    processHeading: 'From Scattered Topics to Clear Pillars',
    steps: [
      { title: 'Review', text: 'We look at your current content and strengths.' },
      { title: 'Gather', text: 'We collect your expertise, stories and opinions.' },
      { title: 'Group', text: 'We organise them into clear themes.' },
      { title: 'Name', text: 'We define each pillar and its purpose.' },
      { title: 'Plan', text: 'We show you how to turn pillars into content.' }
    ],
    faqs: [
      { question: 'What are content pillars?', answer: 'They are the main themes you post about regularly, which define what your personal brand is known for.' },
      { question: 'How many pillars do I need?', answer: 'Most personal brands do well with three to five, which keeps your content focused without feeling repetitive.' },
      { question: 'Will pillars make my content boring?', answer: 'No. Each pillar can be shared in many formats and angles, so variety stays high.' },
      { question: 'Can pillars change over time?', answer: 'Yes. We review them as your business and audience grow.' },
      { question: 'How do pillars connect to scripting?', answer: 'Scripts are written within your pillars, so every video supports your main themes.' }
    ],
    relatedHeading: 'Continue Through the Direction Session',
    ctaHeading: 'Let\'s Build the Themes Your Brand Stands On',
    ctaText: 'In one strategy call, we will explore your expertise and show you what your content pillars could be.',
    ctaButton: 'Book a Strategy Call',
  },
  'presence-audit': {
    displayTitle: 'See Exactly How Your Brand Looks Online Today',
    lede: 'Before building anything new, you need to know where you stand. In the Direction Session, we review your profiles, content and website, and show you what is working, what is missing and what to fix first.',
    seoTitle: 'Personal Brand Presence Audit | Pexbit Media',
    seoDescription: 'Pexbit Media audits your online presence across Instagram, YouTube, LinkedIn and your website, so business owners see what is working, what is missing and what to fix first.',
    image: '/images/studio.jpg',
    imageAlt: '3D presence audit checklist',
    shape: 1,
    primaryCta: 'Book a Strategy Call',
    secondaryCta: 'See How We Audit',
    whyHeading: 'You Cannot Improve What You Have Not Looked At',
    whyText: 'Many business owners have profiles, posts and a website but have never reviewed them as a stranger would. A presence audit shows the gaps: unclear bios, inconsistent visuals, weak content and missed opportunities. It gives you an honest starting point and a clear list of priorities.',
    cards: [
      { title: 'An Honest Outside View', text: 'We review your presence the way a new client would, and tell you what they would think and feel when they find you.' },
      { title: 'Clear Priorities, Not a Long Complaint List', text: 'We rank what to fix so you know what will make the biggest difference first.' }
    ],
    points: [
      'A review of your Instagram, YouTube and LinkedIn profiles.',
      'A review of your website and its message.',
      'An assessment of your content quality and consistency.',
      'A check of your visual branding, bios and links.',
      'A comparison with a few competitors in your market.',
      'A prioritised list of fixes and opportunities.'
    ],
    whoHeading: 'Built for Business Owners Who Want a Clear Starting Point',
    whoText: 'If you already post or have a website but are unsure how it comes across, this session is for you. We work with founders, coaches, consultants, doctors, agency owners and experts who want an honest review before they invest more.',
    processHeading: 'From Honest Review to Clear Priorities',
    steps: [
      { title: 'Collect', text: 'We gather your profiles, website and content links.' },
      { title: 'Review', text: 'We study each platform and your overall brand.' },
      { title: 'Compare', text: 'We check how you stand against competitors.' },
      { title: 'Score', text: 'We identify strengths, gaps and opportunities.' },
      { title: 'Report', text: 'We share the findings and a priority list.' }
    ],
    faqs: [
      { question: 'What is a presence audit?', answer: 'It is a full review of your online presence, including profiles, content and website, to find what works and what needs fixing.' },
      { question: 'Which platforms do you review?', answer: 'We review Instagram, YouTube, LinkedIn and your website, and others if they matter to your business.' },
      { question: 'Do I need to prepare anything?', answer: 'You only need to share your profile and website links. We handle the rest.' },
      { question: 'Will you tell me honestly if something is weak?', answer: 'Yes. The audit is honest and focused on helping you improve.' },
      { question: 'What happens after the audit?', answer: 'You get a priority list, and we can help you act on it through the other services.' }
    ],
    relatedHeading: 'Continue Through the Direction Session',
    ctaHeading: 'Let\'s See Where Your Brand Stands Today',
    ctaText: 'In one strategy call, we will take a first look at your presence and tell you what stands out.',
    ctaButton: 'Book a Strategy Call',
  },
  'six-month-roadmap': {
    displayTitle: 'A Six-Month Roadmap to Build Your Personal Brand',
    lede: 'Knowing your direction is one thing. Knowing what to do each month is another. In the Direction Session, we turn your strategy into a clear six-month plan with goals, actions and milestones, so you always know the next step.',
    seoTitle: 'Six-Month Personal Brand Roadmap | Pexbit Media',
    seoDescription: 'Pexbit Media builds a six-month personal brand roadmap for business owners, with clear goals, content plans and milestones so you know what to do each month to grow your authority.',
    image: '/images/studio.jpg',
    imageAlt: '3D six-month personal brand roadmap',
    shape: 2,
    primaryCta: 'Book a Strategy Call',
    secondaryCta: 'See How We Plan',
    whyHeading: 'A Plan Turns Good Intentions Into Progress',
    whyText: 'Without a plan, personal branding gets pushed aside by daily business work. A roadmap breaks the journey into months, each with a clear focus and measurable goals. It keeps you consistent, shows you your progress and helps you decide what to do next with confidence.',
    cards: [
      { title: 'One Clear Focus Each Month', text: 'We assign each month a main goal, such as foundation, content launch or growth, so effort never feels scattered.' },
      { title: 'Built Around Real Results', text: 'We set milestones you can measure, so you can see your brand growing and adjust the plan when needed.' }
    ],
    points: [
      'A month-by-month plan for the next six months.',
      'Clear goals and milestones for each month.',
      'A content and posting plan matched to your pillars.',
      'Recommended services and priorities for each stage.',
      'Simple measures to track your progress.',
      'A review point to adjust the plan after the first months.'
    ],
    whoHeading: 'Built for Business Owners Who Want a Clear Plan',
    whoText: 'If you want to build your personal brand but are not sure where to begin or how to stay consistent, this session is for you. We work with founders, coaches, consultants, doctors, agency owners and experts who want a practical plan to follow.',
    processHeading: 'From Strategy to a Month-by-Month Plan',
    steps: [
      { title: 'Gather', text: 'We bring together your positioning, point of view and audience focus.' },
      { title: 'Set Goals', text: 'We agree on what you want in six months.' },
      { title: 'Map', text: 'We divide the journey into monthly focuses.' },
      { title: 'Plan', text: 'We add content, services and milestones to each month.' },
      { title: 'Hand Over', text: 'You receive your roadmap and the first steps to take.' }
    ],
    faqs: [
      { question: 'What is a six-month roadmap?', answer: 'It is a step-by-step plan that shows what to focus on each month to build your personal brand over half a year.' },
      { question: 'Can the roadmap be changed?', answer: 'Yes. We build in a review point so the plan can be adjusted based on your results.' },
      { question: 'What results can I expect in six months?', answer: 'Results depend on your starting point and consistency, but most business owners can build a clear identity, a steady content habit and a growing audience in this time.' },
      { question: 'Do I need to follow the roadmap on my own?', answer: 'No. We can handle the work for you through our content, production and publishing services.' },
      { question: 'Does the roadmap include my budget?', answer: 'We can include ad and production budget guidance if you want it. We discuss this during the strategy call.' }
    ],
    relatedHeading: 'Continue Through the Direction Session',
    ctaHeading: 'Let\'s Plan the Next Six Months of Your Brand',
    ctaText: 'In one strategy call, we will understand your goals and show you what your roadmap could look like.',
    ctaButton: 'Book a Strategy Call',
  }
};

export function getOffering(slug: string): Offering | null {
  return allOfferings().find((page) => page.slug === slug) ?? null;
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
      const { displayTitle, ...rest } = parentCopy;
      pages.push({
        slug: service.id,
        title: displayTitle,
        kicker: 'Pexbit Media',
        parent: null,
        siblings: services
          .filter((item) => item.id !== service.id)
          .map((item) => ({ slug: item.id, title: item.title })),
        ...rest,
      });
    }

    for (const child of children) {
      const childCopy = copy[child.slug];
      if (!childCopy) continue;
      const { displayTitle, ...rest } = childCopy;
      pages.push({
        slug: child.slug,
        title: displayTitle,
        kicker: service.title,
        parent: { slug: service.id, title: service.title },
        siblings: children
          .filter((item) => item.slug !== child.slug)
          .map((item) => ({ slug: item.slug, title: item.title })),
        ...rest,
      });
    }
  }

  return pages;
}
