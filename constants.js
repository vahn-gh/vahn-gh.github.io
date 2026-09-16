const JOBS = [
  {
    id: 'nash',
    co: 'Nash.io',
    role: 'Frontend Developer',
    yr: '2023-2026',
    dates: 'March 2023 - June 2026 (3 yr 4 mo)',
    about:
      'Non-custodial cryptocurrency exchange and platform offering trading, payment services, and digital asset management.',
    bullets: [
      'Designed and built the compliance system architecture - a global async singleton to eliminate race conditions, plus a feature-availability interface - working directly with backend to ship it',
      'Migrated the app off a legacy custom navigation system (untyped, re-render-heavy modal/stack wrappers) to a typed React Navigation architecture (Stack/Modal/Bottom Tab)',
      'Removed legacy MobX stores in favor of Redux + redux-persist as part of an ongoing architecture modernization effort',
      'Refactored technical debt as part of daily work - e.g. rewrote the payment modal rather than patching it while fixing a bug in it',
      'Built a native iOS encryption module (CryptoModule) for debit card data from scratch, researching key parsing and encryption/decryption with no prior cryptography experience',
      'Designed features in code alongside product (e.g. Contacts, Earn) when the team had no dedicated designer - prototyping directly in React Native and iterating with the team over screenshots',
      'Consolidated scattered deep-link handling across the app into a single LinkAgent service - improving maintainability and reliability of link/state restoration',
      'Built the ModulR/IBAN banking integration (account funding, transfers, card issuance) - worked against incomplete/mid-transition designs, improvising UX where specs were missing, and integrated the full GraphQL surface with BE',
      'Co-wrote and maintained a local Maestro E2E suite (refactored shared helpers/config across the full suite covering KYC, compliance, IBAN, NFR trading, Earn, etc.)',
      'Implemented GraphQL cache normalization with local persistence so list data renders instantly before server hydration - resolved sync issues between the local cache and virtualized list rendering',
      'Built UI and API integration for Contacts, Round-up purchases, Automations, Earn, Price Alerts and other in-app features',
      'Worked in a small frontend team with daily code review in both directions, and with backend on GraphQL schema design across most features above',
    ],
  },
  {
    id: 'porttie',
    co: 'Porttie',
    role: 'React Native Developer',
    yr: '2022-2023',
    dates: 'December 2022 - March 2023 (4 mo)',
    about: 'Hotel booking app MVP.',
    bullets: [
      'Bootstrapped the app from scratch - stack selection, project structure, navigation, and state management patterns',
      'Chose React Native (old architecture) with MobX over Redux, prioritizing shipping speed for a small, fast-moving MVP feature set',
      'Built the full data layer from scratch - network providers, DTO-to-domain model adapters, and MobX stores using dependency injection (tsyringe) with reactive state syncing',
      'Implemented map-based hotel search with dynamic radius calculation and clustering (supercluster, geo-viewport bounding box) - including a discriminated-union search flow supporting both region search and direct single-hotel lookup/deep-linking',
      'Integrated and heavily customized react-native-calendars for date-range/availability selection, coordinating with backend on the data contract for availability',
      'Designed empty-state handling across the app (filtered list not-found states, dedicated not-found screen wired into navigation)',
      'Reviewed designs with the team in Figma before implementation and contributed UX changes',
      'Set up react-native-appmetrica-yandex analytics and Sentry crash reporting',
    ],
  },
  {
    id: 'tap',
    co: 'Take A Place',
    role: 'React Native Developer',
    yr: '2022-2023',
    dates: 'May 2022 - June 2023 (1 yr 2 mo)',
    about: 'Coworking-space booking app.',
    bullets: [
      'Built features across a multi-city coworking marketplace: multi-city rollout (added Saint Petersburg - city model, adapter, localization), a points/loyalty payment system, and a referral program',
      "Refactored the app's authorization flow",
      'Migrated lists to FlashList for performance',
      'Built subscriptions UI integrated with a card-based web view payment flow',
      'Implemented gesture-driven UI and animations using Reanimated and Gesture Handler - including a custom animated wheel picker (no library), animated bottom drawers, skeleton loaders, and review-rating animations',
      'Built a multi-criteria coworking filter system (MobX computed chains for room type, price range, tags, and sorting) and map filters',
      'Fixed cross-platform bugs (Android map rendering, region restoration from local storage, working-hours modal)',
      'Shipped Reviews, Booking, Pages, Favorites, promo codes, and other user-facing features',
      'Localized the app with i18n (RU/EN)',
      'Helped with Firebase Cloud Messaging (push notifications), deeplinking, and analytics',
      'Worked with Gatsby based landing website and GraphQL',
    ],
  },
  {
    id: 'povoenke',
    co: 'poVoenke',
    role: 'React Native Developer',
    yr: '2021-2023',
    dates: 'March 2021 - March 2023 (2 yr 1 mo)',
    about: 'iOS / Android mobile application for real-estate purchase.',
    bullets: [
      'Primary engineer on the Banks/Documents module for over a year - built bank onboarding, document upload/management, and file handling flows; worked on full redesigns of the Documents (Jan-Feb 2022) and Banks (Apr-Jul 2022) areas',
      'Refactored a legacy codebase into a maintainable component/store structure following React patterns',
      'Built local-first data layer with Realm - repository pattern with a generic AbstractArrayRepo, stale-while-revalidate loading (serve from local DB, then refresh from server) across Buildings, Banks, Contacts, and Calculator modules',
      'Reduced crash rate by triaging and fixing native crashes and long-tail bugs surfaced through Sentry',
      'Mentored a junior developer - code review, written feedback, and pairing calls',
      'Rebuilt UI for a full app redesign (new Figma design system) across Buildings, Calculator, and other modules, closing out with a Buildings redesign',
    ],
  },
  {
    id: 'maff',
    co: 'Maff Metaverse',
    role: 'Frontend Lead Developer',
    yr: '2021',
    dates: 'Nov 2021 - Dec 2021 (university project)',
    about: 'Metaverse development company.',
    bullets: [
      'Set up team workflow and managed work in Trello',
      'Designed game concept and project architecture',
      'Contributed to park integration in Decentraland',
    ],
  },
  {
    id: 'fizruk',
    co: 'Fizruk',
    role: 'Frontend Lead Developer',
    yr: '2020-2022',
    dates: 'Jan 2020 - Dec 2022 (university project)',
    about:
      'Management system for the Department of Physical Education at Moscow Polytech University.',
    bullets: [
      'Led the frontend team',
      'Built student-facing personal account with viewing features',
      'Built teacher-facing personal account for managing students',
      'Coached junior developers',
    ],
  },
]

const MORE_TOPICS = [
  {
    id: 'myself',
    title: 'About myself',
    body: [
      "If I need to describe myself I usually say that I'm brutally honest, passionate about learning, a bit stubborn and organized person.",
      "I like making plans and following them through – it's easier to make decisions when you have a good plan. I excel at making plans for my daily life, and I try to do the same in my work when I plan something, splitting tasks so they're easier to focus on.",
      "I have a huge GTD system I've been using for more than 7 years which includes writing everything down and then sorting it out every morning.",
      'I have certain strategies for planning big tasks more effectively to avoid confusion and procrastination. As they say by failing to prepare, you are preparing to fail — good plans is 80% of work.',
      "I'm trying my best to focus on outcomes instead of effort required whether that's going for a run or making a new project. By focusing on what to come rather than on how much work required – I usually avoid lots of problems with laziness or procrastination.",
      'From the start of my career during the covid I had to work remotely most of the time – it was hard at first. I read a lot of productivity/psychology books to fix it, and it worked – now, I can be alone in a room all day and still get through the work.',
      'One of my favorite things in this world is to read books and tech articles that land in my inbox over morning coffee.',
      'Aside from that, I also like to play games, read books and go on long walks. My favorite game is Hollow Knight and my favorite book is "The Book Thief" by Markus Zusak.',
    ],
  },
  {
    id: 'ai',
    title: 'Something I wrote about AI',
    body: [
      'I have lots of opinions about the AI. I use agents myself to keep up with the trend as I always did, but I cannot say I enjoy it.',
      'Writing code has always been something delicate to me. After I read a book called "Clean Code" during my university years I\'ve been trying to write code like you write a book — agents don\'t really follow that rule. Even if you feed lots of context to an AI agent you can\'t expect it to write exactly like you want.',
      'That is my huge problem with AI in addition to the obvious one — killing the enjoyment of writing code by your own hand. I\'ve read so many stories of people getting tired of being just a "verification layer" between an agent and the codebase.',
      'In my personal projects I like to keep AI usage to minimum. But in production it depends a lot on the context.',
      'The AI can build so much in such little time, but it can’t do the one thing senior developers still do – take responsibility. Senior devs care a lot about understanding the system, making it simple, because it allows fixing it when things go wrong. It allows extending it when the system needs to grow. It allows providing reliable service to the customers.',
      'So why using AI in the first place? The answer is simple – because the business needs to grow fast, push more things to the market and test new hypothesis. Everyone can push their code using AI, but if you have a bunch of agents, junior devs, non-developers and investors adding code to the system – you get a system that overcompensates for speed by giving up the stability we care about so much.',
      'Just look at how senior devs work – they always try to make their code understandable and simple, so that others can read it, pick it up, maintain it, extend it and rewrite it if needed.',
      "That's why I think AI usage depends a lot on the context. What kind of system do we want? Do we want to push as many things as possible to the market and see how users react? Or do we want a stable and reliable system?",
      "It's a delicate matter that requires lots of attention in this twisted tech world that we currently live in.",
    ],
  },
]

const TABS = ['profile', 'work', 'skills', 'school', 'tetris', 'more']

const BOOT_TEXT = 'RN-3000 BOOT OK\nLOADING CV...\n'
const NAME_HTML = '<b>IVAN YURKIN</b>React Native engineer'

const FACE_BITMAP = [
  [0, 1, 0, 1, 0],
  [0, 0, 0, 0, 0],
  [1, 0, 0, 0, 1],
  [0, 1, 1, 1, 0],
]
