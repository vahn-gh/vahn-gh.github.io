const JOBS = [
  {
    id: "nash",
    co: "Nash.io",
    role: "Frontend Developer",
    yr: "2023-2026",
    dates: "March 2023 - June 2026 (3 yr 4 mo)",
    about: "Non-custodial cryptocurrency exchange and platform offering trading, payment services, and digital asset management.",
    bullets: [
      "Built the ModulR/IBAN banking integration (account funding, transfers, card issuance) - worked against incomplete/mid-transition designs, improvising UX where specs were missing, and integrated the full GraphQL surface with backend",
      "Built a native iOS module (CryptoModule) for secure debit card data reveal (RSA-4096 key pair, AES token decryption) from scratch, researching key parsing and encryption/decryption with no prior cryptography experience",
      "Designed and built the compliance system architecture - a global async singleton to eliminate race conditions, plus a feature-availability interface used across the app to gate features - working directly with backend to ship it",
      "Migrated the app off a legacy custom navigation system (untyped, re-render-heavy modal/stack wrappers) to a typed React Navigation architecture (Stack/Modal/Bottom Tab) - about 220 screens and modals",
      "Consolidated scattered deep-link handling across the app into a single LinkAgent service, replacing a 678-line chain of url.includes() checks - improving maintainability and reliability of link/state restoration",
      "Designed features in code alongside product (e.g., Contacts, Earn) when the team had no dedicated designer - prototyping directly in React Native and iterating with the team over screenshots",
      "Built UI and API integration for Contacts (including Contacts V2: friends, chats and seamless transactions inside chat windows), Automations, Earn, Price Alerts and other in-app features",
      "Contributed to the migration from legacy MobX stores to Redux + redux-persist as part of an ongoing architecture modernization effort",
      "Co-wrote and ran the team's Maestro e2e suite (KYC, compliance, IBAN, trading, Earn and other flows): wrote some flows, fixed others, refactored shared configs for reuse across the main flows, ran the full suite before every release and reported the results to the PM",
      "Maintained parts of the GitLab CI/CD and Fastlane setup (config fixes, release notes) and worked with Jest unit tests covering core utility functions",
      "Worked in a small frontend team with daily code review in both directions, and with backend on GraphQL schema design across most features above",
      "Web platform (separate codebase from the mobile app; Nash Exchange & Nash Widget monorepo support): diagnosed and fixed precision-related display bugs in withdrawals and portfolio balances; built compliance-adjacent flows for the fiat on/off-ramp (source-of-funds and occupation confirmation, sell quote flow); MiCA-related request improvements",
    ],
  },
  {
    id: "porttie",
    co: "Porttie",
    role: "React Native Developer",
    yr: "2022-2023",
    dates: "December 2022 - March 2023 (4 mo)",
    about: "Hotel booking app MVP. Sole React Native developer.",
    bullets: [
      "Bootstrapped the app from scratch - stack selection, project structure, navigation, and state management patterns",
      "Chose React Native (old architecture) with MobX over Redux, prioritizing shipping speed for a small, fast-moving MVP feature set",
      "Built the full data layer from scratch - network providers, DTO-to-domain model adapters, and MobX stores using dependency injection (tsyringe) with reactive state syncing",
      "Implemented map-based hotel search with dynamic radius calculation and clustering (supercluster, geo-viewport bounding box) - including a discriminated-union search flow supporting both region search and direct single-hotel lookup/deep-linking",
      "Integrated and heavily customized react-native-calendars for date-range/availability selection, coordinating with backend on the data contract for availability",
      "Designed empty-state handling across the app (filtered list \"not found\" states, dedicated not-found screen wired into navigation)",
      "Reviewed designs with the team in Figma before implementation and contributed UX changes",
      "Set up react-native-appmetrica-yandex analytics and Sentry crash reporting",
    ],
  },
  {
    id: "tap",
    co: "Take A Place",
    role: "React Native Developer",
    yr: "2022-2023",
    dates: "May 2022 - June 2023 (1 yr 2 mo)",
    about: "Coworking-space booking app, published on the App Store and Google Play.",
    bullets: [
      "Built features across a multi-city coworking marketplace: multi-city rollout (added Saint Petersburg - city model, adapter, localization), a points/loyalty payment system, and a referral program",
      "Refactored the app's authorization flow",
      "Migrated lists to FlashList for performance",
      "Built subscriptions UI integrated with a card-based web view payment flow",
      "Implemented gesture-driven UI and animations using Reanimated and Gesture Handler - including a custom animated wheel picker (no library), animated bottom drawers, skeleton loaders, and review-rating animations",
      "Built a multi-criteria coworking filter system (MobX computed chains for room type, price range, tags, and sorting) and map filters",
      "Fixed cross-platform bugs (Android map rendering, region restoration from local storage, working-hours modal)",
      "Shipped Reviews, Booking, Pages, Favorites, promo codes, and other user-facing features",
      "Localized the app with i18n (RU/EN)",
      "Helped with Firebase Cloud Messaging (push notifications), deeplinking, and analytics",
      "Worked with Gatsby based landing website and GraphQL",
    ],
  },
  {
    id: "povoenke",
    co: "poVoenke",
    role: "React Native Developer",
    yr: "2021-2023",
    dates: "March 2021 - March 2023 (2 yr 1 mo)",
    about: "iOS/Android mobile application for real-estate purchase, published on the App Store and Google Play.",
    bullets: [
      "Primary engineer on the Banks/Documents module for over a year - built bank onboarding, document upload/management, and file handling flows; worked on full redesigns of the Documents (Jan-Feb 2022) and Banks (Apr-Jul 2022) areas",
      "Refactored a legacy codebase into a maintainable component/store structure following React patterns",
      "Built local-first data layer with Realm - repository pattern with a generic AbstractArrayRepo, stale-while-revalidate loading (serve from local DB, then refresh from server) across Buildings, Banks, Contacts, and Calculator modules",
      "Reduced crash rate by triaging and fixing native crashes and long-tail bugs surfaced through Sentry",
      "Mentored a junior developer - code review, written feedback, and pairing calls",
      "Rebuilt UI for a full app redesign (new Figma design system) across Buildings, Calculator, and other modules, closing out with a Buildings redesign",
    ],
  },
]

const TABS = ['profile', 'work', 'skills', 'projects', 'school', 'tetris']

const BOOT_TEXT = 'RN-3000 BOOT OK\nLOADING CV...\n'
const NAME_HTML = '<b>IVAN YURKIN</b>React Native engineer'

const FACE_BITMAP = [
  [0, 1, 0, 1, 0],
  [0, 0, 0, 0, 0],
  [1, 0, 0, 0, 1],
  [0, 1, 1, 1, 0],
]
