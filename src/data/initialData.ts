import { Project, NotificationItem } from '../types';

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'mithis-world-moderator-management-system',
    title: "MITHI'S WORLD — Moderator Management System",
    description: 'A Laravel-powered workforce management platform for moderator onboarding, team assignments, shift scheduling, attendance, salary tracking, and operational reporting.',
    fullOverview: 'Built to solve the operational bottlenecks of large-scale community and content moderation. Includes role-based dashboards, automated shift allocation, attendance geotagging, payroll metrics calculation, and incident reports logging.',
    keyFeatures: [
      'Moderator onboarding and multi-tier role permissions',
      'Dynamic shift scheduling and attendance monitoring',
      'Automated payroll and hourly salary calculation',
      'Operational incident reporting and KPI tracking',
      'Real-time administrative alerts and CSV export'
    ],
    techStack: ['PHP', 'Laravel', 'MySQL', 'Tailwind CSS', 'JavaScript'],
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80'
    ],
    link: 'https://example.com/demo/mithis-world',
    repo: 'https://github.com/AdiBhaiAlpha/mithis-world',
    state: 'active',
    selectedWork: true,
    category: 'Workforce / ERP',
    publishedDate: '1 week ago'
  },
  {
    id: 'sabus-world-multivendor-e-commerce-retail-management-platform',
    title: "Sabu's World — Multivendor E-commerce & Retail Management",
    description: 'A responsive online store, multi-tier referral-commission system, and all-in-one retail operations dashboard.',
    fullOverview: 'Complete e-commerce platform supporting merchant onboarding, nested product catalog with variations, automated affiliate tracking, wallet withdrawal requests, order fulfillment workflows, and analytics.',
    keyFeatures: [
      'Multivendor marketplace with isolated merchant dashboards',
      'Automated referral tier commission calculating engine',
      'Stripe & bKash / Nagad integrated payment gateways',
      'Inventory replenishment alerts and barcode order processing'
    ],
    techStack: ['PHP 8.2', 'Laravel 12', 'JavaScript (ES6+)', 'Tailwind CSS', 'MySQL'],
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556742049-0a67e5572293?auto=format&fit=crop&w=1200&q=80'
    ],
    link: 'https://example.com/demo/sabus-world',
    repo: 'https://github.com/AdiBhaiAlpha/sabus-world',
    state: 'active',
    selectedWork: true,
    category: 'E-commerce',
    publishedDate: '2 weeks ago'
  },
  {
    id: 'shei-fashion-ecommerce-store',
    title: 'SHEI — Fashion E-commerce Store',
    description: 'From High-End Fashion to Street Style: modern luxury apparel storefront with lightning-fast checkout and curated lookbooks.',
    fullOverview: 'High-aesthetic clothing brand e-commerce platform with dynamic lookbook showcases, mobile-first quick buy drawers, size recommender algorithms, and customer reviews with photo uploads.',
    keyFeatures: [
      'Interactive lookbook with direct hot-spot purchasing',
      'Ultra-responsive mobile shopping experience (<1.2s load)',
      'Smart size and fit recommendation assistant',
      'Automated order status emails and SMS dispatch tracking'
    ],
    techStack: ['WordPress CMS', 'WooCommerce', 'PHP', 'Tailwind CSS', 'JavaScript'],
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80'
    ],
    link: 'https://example.com/demo/shei-store',
    repo: 'https://github.com/AdiBhaiAlpha/shei-fashion',
    state: 'active',
    selectedWork: true,
    category: 'E-commerce',
    publishedDate: '3 weeks ago'
  },
  {
    id: 'zihad-garments-management-system',
    title: 'Zihad Garments - Management System',
    description: 'A comprehensive ERP and business management web app for garment factories, inventory batches, and retail distribution.',
    fullOverview: 'Engineered specifically for manufacturing facilities. Tracks fabric raw material stock, cutting-to-stitching floor stages, quality control checkpoints, employee piece-rate production, and export consignment shipping.',
    keyFeatures: [
      'Raw material inventory tracking by lot and color dye batch',
      'Floor workstation barcode tracking for garment bundles',
      'Piece-rate wage calculators with biometric attendance sync',
      'Commercial invoice and bill of lading document generator'
    ],
    techStack: ['Laravel', 'PHP', 'MySQL', 'Alpine.js', 'Tailwind CSS'],
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=80'
    ],
    link: 'https://example.com/demo/zihad-garments',
    repo: 'https://github.com/AdiBhaiAlpha/garments-erp',
    state: 'active',
    selectedWork: false,
    category: 'Workforce / ERP',
    publishedDate: '1 month ago'
  },
  {
    id: 'socialgrowbd-smm-reseller-panel',
    title: 'SocialGrowBD – SMM Reseller Panel',
    description: 'A web-based SMM reseller panel for discovering social media marketing services, placing bulk API orders, and managing balances.',
    fullOverview: 'High-throughput reseller panel handling thousands of automated provider API dispatches daily. Integrates automatic refill webhooks, multi-currency wallet deposits, and real-time order status polling.',
    keyFeatures: [
      'Provider API synchronization with instant order forwarding',
      'Custom pricing margin controls per customer tier',
      'Instant automated deposit verification via local gateways',
      'Support ticket helpdesk with live status tracking'
    ],
    techStack: ['SMM Panel Platform', 'PHP', 'MySQL', 'RESTful API', 'Tailwind CSS'],
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&q=80'
    ],
    link: 'https://example.com/demo/socialgrowbd',
    repo: 'https://github.com/AdiBhaiAlpha/smm-reseller-panel',
    state: 'active',
    selectedWork: false,
    category: 'Fintech & Tools',
    publishedDate: '5 days ago'
  },
  {
    id: 'golden-income-platform',
    title: 'Golden Income Platform',
    description: 'A comprehensive earning and rewards platform for users to complete tasks, refer connections, and redeem digital assets.',
    fullOverview: 'Gamified digital rewards application with anti-fraud click detection, progressive milestone rewards, leaderboards, and audited automated payout queues.',
    keyFeatures: [
      'Fraud prevention and multi-account bot mitigation',
      'Hierarchical affiliate referral levels with instant commission',
      'Task verification engine with screenshot submission review',
      'Instant payout disbursement pipelines'
    ],
    techStack: ['Laravel', 'PHP', 'MySQL', 'JavaScript', 'Tailwind CSS'],
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=800&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=1200&q=80'
    ],
    link: 'https://example.com/demo/golden-income',
    repo: 'https://github.com/AdiBhaiAlpha/golden-income',
    state: 'active',
    selectedWork: false,
    category: 'Fintech & Tools',
    publishedDate: '5 days ago'
  },
  {
    id: 'cinezone-premium-video-streaming-platform',
    title: 'CineZone — Premium Video Streaming Platform',
    description: 'A video streaming platform featuring limited free previews, subscription-based full access, and complete admin-managed content.',
    fullOverview: 'Netflix-inspired media platform with adaptive HLS video streaming, watchlist persistence, resume-playback markers, genre tagging, and member subscriptions.',
    keyFeatures: [
      'HLS video player with adaptive multi-bitrate streaming',
      'Watch time progress tracking and continue-watching rails',
      'Subscription paywall with 30-second teaser preview modes',
      'Media management with episode batches and subtitle tracks'
    ],
    techStack: ['PHP', 'Laravel', 'MySQL', 'Video.js', 'Tailwind CSS'],
    image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&w=800&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&w=1200&q=80'
    ],
    link: 'https://example.com/demo/cinezone',
    repo: 'https://github.com/AdiBhaiAlpha/cinezone-stream',
    state: 'active',
    selectedWork: false,
    category: 'Web Application',
    publishedDate: '3 days ago'
  },
  {
    id: 'shoppos-point-of-sale-business-management-system',
    title: 'ShopPOS — Point of Sale & Business Management System',
    description: 'A complete web-based POS system for barcode sales, billing, inventory, customers, employees, expenses, and financial reporting.',
    fullOverview: 'Offline-tolerant cloud POS designed for retail stores and grocery marts. Features fast keyboard-friendly billing, thermal receipt printing, stock alerts, and daily sales closing summaries.',
    keyFeatures: [
      'Instant barcode scanning and multi-payment receipt split',
      'Low stock threshold notifications and supplier purchase orders',
      'Daily register cash-drawer reconciliation and staff shifts',
      'Comprehensive profit & loss reporting with analytics charts'
    ],
    techStack: ['PHP', 'Laravel', 'MySQL', 'Alpine.js', 'Tailwind CSS'],
    image: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=800&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=1200&q=80'
    ],
    link: 'https://example.com/demo/shoppos',
    repo: 'https://github.com/AdiBhaiAlpha/shoppos-system',
    state: 'active',
    selectedWork: false,
    category: 'Management System',
    publishedDate: '3 days ago'
  },
  {
    id: 'royalbet-casino-betting-platform',
    title: 'RoyalBet — Casino & Betting Platform',
    description: 'Interactive gaming and sports betting platform with third-party odds APIs, wallet management, payment processing, and role-based administration.',
    fullOverview: 'High-availability betting web application with live odds feeds, instant slip calculations, provably fair mini-games, and secure double-entry accounting ledgers.',
    keyFeatures: [
      'Real-time odds updates using WebSockets',
      'Provably fair algorithm integration for instant RNG games',
      'Multi-currency deposits and withdrawal security checks',
      'Comprehensive risk management and maximum wager thresholds'
    ],
    techStack: ['Laravel', 'MySQL', 'JavaScript', 'Redis', 'Tailwind CSS'],
    image: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=800&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=1200&q=80'
    ],
    link: 'https://example.com/demo/royalbet',
    repo: 'https://github.com/AdiBhaiAlpha/royalbet-platform',
    state: 'active',
    selectedWork: false,
    category: 'Web Application',
    publishedDate: '3 days ago'
  },
  {
    id: 'plasticshark-prepaid-card-marketplace',
    title: 'PlasticShark — Prepaid Card Marketplace',
    description: 'A digital storefront for browsing and purchasing prepaid cards, product availability, card specs, shopping cart, wallet funding, and payments.',
    fullOverview: 'Automated digital gift card and prepaid virtual card dispensing system with instant PIN delivery, cryptographic key storage, and fraud checks.',
    keyFeatures: [
      'Instant digital voucher and virtual card PIN delivery',
      'Automated stock inventory replenishment from card vendors',
      'Real-time currency exchange rates and checkout conversion',
      'Transaction receipt and encrypted code download vault'
    ],
    techStack: ['React', 'Laravel', 'MySQL', 'Tailwind CSS', 'TypeScript'],
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80'
    ],
    link: 'https://example.com/demo/plasticshark',
    repo: 'https://github.com/AdiBhaiAlpha/plasticshark-cards',
    state: 'building',
    selectedWork: false,
    category: 'Fintech & Tools',
    publishedDate: '3 days ago'
  },
  {
    id: 'invextream-investment-vip-rewards-platform',
    title: 'Invextream — Investment & VIP Rewards Platform',
    description: 'A web-based investment management platform featuring configurable VIP packages, account balances, referral rewards, and transaction tracking.',
    fullOverview: 'Structured investment package portal featuring daily return on investment (ROI) distribution crons, tiered VIP levels, team commission downlines, and automated payout limits.',
    keyFeatures: [
      'Automated daily ROI calculation cron scheduler',
      'VIP badge tier upgrades based on accumulated turnover',
      'Multi-level referral network tree visualizer',
      'Manual admin review threshold for security audits'
    ],
    techStack: ['PHP', 'Laravel', 'MySQL', 'Chart.js', 'Tailwind CSS'],
    image: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=800&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=1200&q=80'
    ],
    link: 'https://example.com/demo/invextream',
    repo: 'https://github.com/AdiBhaiAlpha/invextream-portal',
    state: 'planned',
    selectedWork: false,
    category: 'Fintech & Tools',
    publishedDate: '3 days ago'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: '128',
    title: 'New project: PlasticShark — Prepaid Card Marketplace',
    description: 'A digital storefront for browsing and purchasing prepaid cards, with product availability, card specifications, shopping cart, and payment workflows.',
    timeAgo: '3 days ago',
    projectId: 'plasticshark-prepaid-card-marketplace',
    read: false,
    type: 'project'
  },
  {
    id: '127',
    title: 'New project: Invextream — Investment & VIP Rewards Platform',
    description: 'A web-based investment management platform featuring configurable VIP packages, account balances, referral rewards, and transaction tracking.',
    timeAgo: '3 days ago',
    projectId: 'invextream-investment-vip-rewards-platform',
    read: false,
    type: 'project'
  },
  {
    id: '126',
    title: 'New project: RoyalBet — Casino & Betting Platform',
    description: 'A feature-rich casino and betting platform with interactive games, third-party game integrations, wallet management, and role-based administration.',
    timeAgo: '3 days ago',
    projectId: 'royalbet-casino-betting-platform',
    read: false,
    type: 'project'
  },
  {
    id: '125',
    title: 'New project: ShopPOS — Point of Sale & Business Management System',
    description: 'A complete web-based POS and business management system for sales, barcode billing, inventory, customers, employees, and financial reporting.',
    timeAgo: '3 days ago',
    projectId: 'shoppos-point-of-sale-business-management-system',
    read: true,
    type: 'project'
  },
  {
    id: '124',
    title: 'New project: CineZone — Premium Video Streaming Platform',
    description: 'A premium video streaming platform with limited free previews, subscription-based full access, and complete admin-managed content.',
    timeAgo: '3 days ago',
    projectId: 'cinezone-premium-video-streaming-platform',
    read: true,
    type: 'project'
  }
];

export const PROFILE_INFO = {
  name: 'Md Rafiul Islam',
  role: 'Full Stack Web Developer & Designer',
  alias: 'Chitron Bhattacharjee Adi',
  tagline: 'I build useful digital things and share what I learn.',
  bio: 'I am interested in technology, education, and the small details that make an idea useful. My work moves between building products, documenting the process, and helping other people learn through practical examples.',
  location: 'Bangladesh',
  status: 'Available for thoughtful collaborations',
  email: 'mdrafiulislam3103@gmail.com',
  phone: '01865467486',
  whatsapp: '+8801865467486',
  heroPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
  socials: {
    facebook: 'https://www.facebook.com/rafiul.islam.606438',
    youtube: 'https://youtube.com/@virtualacademy-bd',
    linkedin: 'https://linkedin.com/in/mdrafiul-laravel',
    whatsapp: 'https://wa.me/8801865467486'
  },
  stats: {
    publishedProjects: 11,
    journalEntries: 4,
    courses: 2,
    yearsExperience: '4+'
  }
};

export const TIMELINE_ITEMS = [
  {
    id: '1',
    period: '2023 — Present',
    badge: 'Work & Systems',
    title: 'Full Stack Web Architecture & Client Solutions',
    organization: 'Independent Software Developer',
    description: 'Designing end-to-end web applications, e-commerce stores, custom ERP platforms, and POS software for international and local retail businesses.',
    tags: ['Laravel', 'React', 'MySQL', 'Tailwind CSS', 'REST APIs']
  },
  {
    id: '2',
    period: '2021 — 2024',
    badge: 'Education',
    title: 'Tourism & Hospitality Management',
    organization: 'Undergraduate Program',
    description: 'Studying service design, operational flow, human communication, and the intricate logistical details required for memorable, reliable customer journeys.',
    bullets: [
      'Study service design principles',
      'Practice transparent client communication',
      'Master operational and systems details'
    ]
  },
  {
    id: '3',
    period: '2020 — 2022',
    badge: 'Open Knowledge',
    title: 'Technical Content & Practical Education',
    organization: 'Virtual Academy BD',
    description: 'Creating practical programming tutorials, web dev guides, and beginner-friendly walk-throughs covering Laravel, PHP, and responsive frontend design.'
  }
];
