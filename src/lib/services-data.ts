export interface ServiceDetail {
  id: string;
  title: string;
  metaTitle: string;
  metaDesc: string;
  headline: string;
  category: string;
  description: string;
  iconName: string;
  accent: string;
  gradient: string;
  features: string[];
  techStack: string[];
  process: { step: string; title: string; desc: string }[];
  pricing: {
    tier: string;
    price: string;
    desc: string;
    features: string[];
  }[];
}

export const SERVICES_MAP: Record<string, ServiceDetail> = {
  web: {
    id: "web",
    title: "Web Development",
    metaTitle: "Custom Web Application Development Services | eVeda",
    metaDesc: "Scale your business with high-performance, responsive full-stack web applications. Expert React, Next.js, and TypeScript developers.",
    headline: "Fast, Secure, and Autoscale Web Architectures",
    category: "software",
    description: "We build bespoke full-stack web applications that combine pixel-perfect styling with high-performance routing. Utilizing server-side rendering, microservices, and edge computing, our web platforms deliver sub-second response times globally.",
    iconName: "web",
    accent: "#3b82f6",
    gradient: "rgba(59, 130, 246, 0.15)",
    features: [
      "Server-side rendering (SSR) & Static Site Generation (SSG)",
      "Edge caching and optimal core web vitals",
      "Robust REST & GraphQL API integrations",
      "Progressive Web App (PWA) configurations",
      "Responsive grids optimized for mobile & desktop viewports",
      "Full web accessibility (A11y) and WCAG compliance"
    ],
    techStack: ["Next.js 15", "React 19", "TypeScript", "Node.js", "Tailwind CSS", "Prisma"],
    process: [
      { step: "01", title: "Discovery & Wireframing", desc: "Map site maps, user interactions, and structural mockups." },
      { step: "02", title: "Engineering Phase", desc: "Implement edge-routing, design components, and hook databases." },
      { step: "03", title: "Deployment & Speed Optimization", desc: "Configure CDNs, secure SSL certificates, and check performance scores." },
      { step: "04", title: "Ongoing Support & Scaling", desc: "Monitor performance, iterate on feedback, and scale infrastructure as your traffic grows." }
    ],
    pricing: [
      { tier: "Startup", price: "₹2,50,000+", desc: "For launching initial MVPs and marketing pages.", features: ["Single-page App", "Tailwind CSS", "Basic Database Integration", "1 Month Support"] },
      { tier: "Growth", price: "₹5,00,000+", desc: "For scaling platforms and e-commerce dashboards.", features: ["Multi-page App", "Full CRM integrations", "Admin portal", "3 Months Support"] },
      { tier: "Enterprise", price: "Custom Quote", desc: "For microservice architectures and high concurrent load.", features: ["Microservices", "Autoscaling setups", "SLA contract", "Dedicated support team"] }
    ]
  },
  mobile: {
    id: "mobile",
    title: "Mobile App Development",
    metaTitle: "iOS & Android Mobile App Development Company | eVeda",
    metaDesc: "Hire developers to build premium native and cross-platform apps using Flutter and React Native. Fully optimized for the App Store.",
    headline: "Immersive Experiences for iOS and Android",
    category: "software",
    description: "We design and build top-tier mobile applications that deliver native performance, beautiful transitions, and offline-first capabilities. Whether using React Native or Flutter, our apps provide seamless cross-platform user experiences.",
    iconName: "mobile",
    accent: "#10B981",
    gradient: "rgba(16, 185, 129, 0.15)",
    features: [
      "React Native & Flutter cross-platform environments",
      "Native iOS Swift and Android Kotlin extensions",
      "Offline-first databases with automatic cloud sync",
      "Integrated push notifications & analytics trackers",
      "Apple App Store & Google Play Store release management",
      "Continuous runtime monitoring & crash reports"
    ],
    techStack: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase", "SQLite"],
    process: [
      { step: "01", title: "UI Prototype Design", desc: "Create interactive clickable mockups in Figma." },
      { step: "02", title: "Functional Buildout", desc: "Write cross-platform codebase and link device peripherals." },
      { step: "03", title: "Store Submission", desc: "Manage deployment reviews and production settings." },
      { step: "04", title: "Post-Launch Growth", desc: "Track app analytics, release updates, and optimize store rankings continuously." }
    ],
    pricing: [
      { tier: "MVP App", price: "₹3,50,000+", desc: "Perfect for initial product launch on one app store.", features: ["Flutter Core", "Standard Auth", "Cloud Database Sync", "1 Month Maintenance"] },
      { tier: "Standard", price: "₹6,00,000+", desc: "Dual app store launching with advanced modules.", features: ["Dual App Launch", "Payment Integrations", "Custom Dashboards", "3 Months Support"] },
      { tier: "Enterprise", price: "Custom Quote", desc: "High-security financial or enterprise-focused apps.", features: ["End-to-end encryption", "Custom APIs", "Priority update loops", "SLA support"] }
    ]
  },
  saas: {
    id: "saas",
    title: "SaaS Platforms",
    metaTitle: "Custom SaaS Platform Development Services | eVeda",
    metaDesc: "Build your next multi-tenant SaaS application. Advanced user billing, Stripe gateways, analytics dashboards, and role management.",
    headline: "Powering Your Next SaaS Unicorn Startup",
    category: "software",
    description: "Launch secure, scalable SaaS applications. We implement secure database level tenant segregation, advanced usage trackers, subscription billing systems, and responsive admin modules.",
    iconName: "saas",
    accent: "#8B5CF6",
    gradient: "rgba(139, 92, 246, 0.15)",
    features: [
      "Rigid Multi-tenant database schema architecture",
      "Stripe payment integration with recurring subscription rules",
      "Usage-based billing APIs & customer portal logs",
      "Role-Based Access Control (RBAC) user permission systems",
      "Embedded analytics, charts, and dashboard views",
      "White-labeling features and custom domain routing"
    ],
    techStack: ["Next.js", "Supabase", "Stripe API", "PostgreSQL", "Recharts", "Node.js"],
    process: [
      { step: "01", title: "SaaS Blueprinting", desc: "Detail billing tiers, data flows, and database segregation." },
      { step: "02", title: "Core Architecture Setup", desc: "Build authentication, multi-tenancy layers, and Stripe integrations." },
      { step: "03", title: "Dashboard & Release", desc: "Launch charts portal and open API gateway endpoints." },
      { step: "04", title: "Retention & Optimization", desc: "Analyze churn signals, optimize billing flows, and iterate on user feedback loops." }
    ],
    pricing: [
      { tier: "SaaS MVP", price: "₹4,00,000+", desc: "For launching basic SaaS concepts with simple plans.", features: ["User Authentication", "Stripe Checkout Integration", "Database Setup", "1 Month Support"] },
      { tier: "Pro Platform", price: "₹8,00,000+", desc: "For established businesses looking to launch modern portals.", features: ["Multi-tenant Database", "Dynamic billing upgrades", "Team management", "3 Months Support"] },
      { tier: "Enterprise", price: "Custom Quote", desc: "Custom white-labeled platform for enterprise organizations.", features: ["Custom domains config", "SAML SSO Auth", "Audit log tracking", "SLA contract"] }
    ]
  },
  ai: {
    id: "ai",
    title: "AI & ML Solutions",
    metaTitle: "Enterprise AI & Machine Learning Services | eVeda",
    metaDesc: "Integrate custom AI models, LLM agents, and vector databases. Specialists in OpenAI, Claude, RAG, and NLP automation.",
    headline: "Deploy AI Agents That Generate Real Value",
    category: "ai-cloud",
    description: "Integrate machine learning into your workflows. From LLM agents to retrieval-augmented generation (RAG) databases and predictive analytics models, we build production-ready AI tools.",
    iconName: "ai",
    accent: "#EF4444",
    gradient: "rgba(239, 68, 68, 0.15)",
    features: [
      "Retrieval-Augmented Generation (RAG) vector integrations",
      "OpenAI, Anthropic, and open-source LLM implementations",
      "Custom machine learning models & predictive analytics",
      "Natural Language Processing (NLP) sentiment classifiers",
      "Computer vision systems for automated image indexing",
      "Agentic workflows and tool-calling scripts"
    ],
    techStack: ["Python", "PyTorch", "LangChain", "Pinecone", "OpenAI API", "FastAPI"],
    process: [
      { step: "01", title: "Data Collection & Feasibility", desc: "Clean training datasets and verify machine learning approaches." },
      { step: "02", title: "Model Development & Tuning", desc: "Fine-tune LLMs, design prompt networks, and integrate vectors." },
      { step: "03", title: "API Integration & Testing", desc: "Connect models to UI interfaces and optimize query speeds." },
      { step: "04", title: "Monitoring & Retraining", desc: "Track model accuracy drift, retrain on new data, and scale inference infrastructure." }
    ],
    pricing: [
      { tier: "AI Integration", price: "₹3,00,000+", desc: "Connect existing models like GPT-4 to your current software.", features: ["API Wrapper", "Prompt Engineering", "Basic Vector Database", "1 Month Support"] },
      { tier: "Custom RAG System", price: "₹7,00,000+", desc: "Build private search databases over internal company wikis.", features: ["Private Doc Parser", "Vector database setup", "Chatbot UI integration", "3 Months Support"] },
      { tier: "Custom ML Model", price: "Custom Quote", desc: "Train custom models for high-scale classification tasks.", features: ["Dataset cleaning", "Model training & evaluation", "FastAPI endpoints", "Full monitoring"] }
    ]
  },
  cloud: {
    id: "cloud",
    title: "Cloud Services",
    metaTitle: "Enterprise Cloud Architecture & Migration | eVeda",
    metaDesc: "Scale securely with AWS, Google Cloud, and Azure. Specialized in serverless, microservices, and database tuning.",
    headline: "High-Availability, Zero-Downtime Cloud Architectures",
    category: "ai-cloud",
    description: "We architect secure and cost-efficient cloud setups using AWS, GCP, and Azure. From containerization to automated backup failovers, we verify your system stays online 24/7.",
    iconName: "cloud",
    accent: "#0ea5e9",
    gradient: "rgba(14, 165, 233, 0.15)",
    features: [
      "Autoscaling setups on AWS, Google Cloud & Azure",
      "Serverless architecture setups (Lambda, Cloud Functions)",
      "Zero-downtime database migrations & backups",
      "Security compliance audits (SOC2, ISO27001 models)",
      "CDN edge configurations for faster loading speeds",
      "Continuous cloud spend audits and cost optimizations"
    ],
    techStack: ["AWS", "Google Cloud", "Azure", "Terraform", "Cloudflare", "Docker"],
    process: [
      { step: "01", title: "Infrastructure Audit", desc: "Analyze current system architecture and estimate cloud costs." },
      { step: "02", title: "IaC Setup", desc: "Write Terraform files and provision network boundaries." },
      { step: "03", title: "Migration Phase", desc: "Transfer database assets with zero-downtime." },
      { step: "04", title: "Optimization & Cost Control", desc: "Fine-tune cloud spend, set auto-scaling thresholds, and configure real-time cost alerts." }
    ],
    pricing: [
      { tier: "Basic Migration", price: "₹2,00,000+", desc: "Migrate basic applications to secure cloud instances.", features: ["Single Server Setup", "Cloud Backup Setup", "SSL Installation", "1 Month Maintenance"] },
      { tier: "Autoscaling", price: "₹5,00,000+", desc: "For scaling platforms needing dynamic server load support.", features: ["Terraform Config", "Load Balancers", "Docker Setup", "3 Months Support"] },
      { tier: "Enterprise Hybrid", price: "Custom Quote", desc: "Custom configurations for large compliance frameworks.", features: ["SOC2 Setup", "Multi-region Failovers", "Dedicated monitoring dashboard", "SLA Uptime guarantee"] }
    ]
  },
  erp: {
    id: "erp",
    title: "ERP & CRM Systems",
    metaTitle: "Custom ERP & CRM Software Development | eVeda",
    metaDesc: "Centralize business workflows, manage client leads, track invoicing, and generate reports with tailor-made ERP platforms.",
    headline: "Bespoke ERP and CRM Engines for Enterprise Scale",
    category: "software",
    description: "Centralize business operations. We build custom ERP, CRM, and workflow dashboards that integrate team roles, data management, and automated invoicing.",
    iconName: "erp",
    accent: "#ec4899",
    gradient: "rgba(236, 72, 153, 0.15)",
    features: [
      "Granular team role permissions and audit trails",
      "Automated quotation calculators with GST computations",
      "Integrated pipeline trackers (leads, sales stages)",
      "Dynamic data exports (Excel, CSV, PDF frameworks)",
      "Embedded messaging modules (SMTP, WhatsApp, SMS)",
      "Integrated support ticketing and client chat logs"
    ],
    techStack: ["Next.js", "Node.js", "PostgreSQL", "jsPDF", "Tailwind CSS", "Express"],
    process: [
      { step: "01", title: "Workflow Analysis", desc: "Map department roles, database tables, and reports." },
      { step: "02", title: "Database Development", desc: "Construct relational schemas and draft permission boundaries." },
      { step: "03", title: "Dashboard Launch", desc: "Integrate communication channels and output metrics." },
      { step: "04", title: "Training & Handover", desc: "Train staff on new dashboards, document workflows, and set up ongoing SLA support." }
    ],
    pricing: [
      { tier: "Standard CRM", price: "₹4,00,000+", desc: "For tracking sales, contacts, and lead logs.", features: ["Lead Kanban View", "Team Auth", "SMTP Email setups", "1 Month Support"] },
      { tier: "Full-scale ERP", price: "₹9,00,005+", desc: "For multi-department management and inventory control.", features: ["Multi-department Auth", "Invoice generation", "Custom reports", "3 Months Support"] },
      { tier: "Custom Enterprise", price: "Custom Quote", desc: "For globally distributed teams with deep offline connections.", features: ["Bespoke schemas", "Private cloud deployment", "On-site training session", "24/7 SLA support"] }
    ]
  },
  devops: {
    id: "devops",
    title: "DevOps & CI/CD",
    metaTitle: "DevOps Consulting & CI/CD Automation Services | eVeda",
    metaDesc: "Automate builds, containerize services, and monitor instances. Docker, Kubernetes, GitHub Actions, and Prometheus systems.",
    headline: "Ship Code Safely and Automatically",
    category: "ai-cloud",
    description: "Build robust automated deployment structures. We design pipelines that build, test, and release code to cloud instances with zero human intervention.",
    iconName: "devops",
    accent: "#EAB308",
    gradient: "rgba(234, 179, 8, 0.15)",
    features: [
      "Automated CI/CD pipelines (GitHub Actions, GitLab CI)",
      "Docker containerizations & Kubernetes orchestration setups",
      "Infrastructure monitoring systems (Prometheus, Grafana)",
      "Automated unit, integration, and security testing scripts",
      "Central logging frameworks (ELK Stack, Logstash configs)",
      "Rollback routines for immediate issue mitigation"
    ],
    techStack: ["Kubernetes", "Docker", "GitHub Actions", "Prometheus", "Grafana", "Linux"],
    process: [
      { step: "01", title: "Pipeline Mapping", desc: "Trace current build steps and deploy targets." },
      { step: "02", title: "Pipeline Scripting", desc: "Write workflows, configure tests, and package servers." },
      { step: "03", title: "Monitoring Launch", desc: "Launch Grafana displays and connect alert thresholds." },
      { step: "04", title: "Continuous Improvement", desc: "Tune pipeline speed, add security scan gates, and iterate on deployment frequency." }
    ],
    pricing: [
      { tier: "Basic Pipeline", price: "₹2,50,000+", desc: "Automate deployments for a single server project.", features: ["GitHub Actions Setup", "Docker Configuration", "Basic Alerts", "1 Month Support"] },
      { tier: "K8s Setup", price: "₹6,00,000+", desc: "For load-balanced multi-service projects.", features: ["Kubernetes Setup", "Helm charts creation", "Grafana dashboards", "3 Months Support"] },
      { tier: "DevOps Suite", price: "Custom Quote", desc: "High-scale engineering teams needing zero-downtime updates.", features: ["Advanced blue-green deploys", "Vulnerability scans", "Dedicated monitoring agent", "SLA contracts"] }
    ]
  },
  design: {
    id: "design",
    title: "UI/UX Design",
    metaTitle: "Premium UI/UX Design & Design Systems Agency | eVeda",
    metaDesc: "User-centered design systems, Figma wireframing, high-fidelity prototypes, and cohesive mobile and web UI interfaces.",
    headline: "Interfaces That Feel Premium and Intuitive",
    category: "design-growth",
    description: "We craft beautiful user interfaces designed to build customer trust. From user research to interactive Figma prototyping, we deliver layouts that align with your brand.",
    iconName: "design",
    accent: "#f43f5e",
    gradient: "rgba(244, 63, 94, 0.15)",
    features: [
      "Bespoke typography systems & custom color palettes",
      "Interactive high-fidelity prototypes in Figma",
      "User research & wireframing analysis reports",
      "Comprehensive digital style guides and design libraries",
      "A11y accessibility validation testing",
      "Seamless design handoff to front-end engineers"
    ],
    techStack: ["Figma", "Adobe CC", "Procreate", "Tailwind CSS", "Google Fonts", "Framing"],
    process: [
      { step: "01", title: "User Research", desc: "Interview target audiences and define user flows." },
      { step: "02", title: "Wireframing", desc: "Construct layouts and layout parameters." },
      { step: "03", title: "Design System Assembly", desc: "Establish type scales, components, and style guides." },
      { step: "04", title: "Handoff & Developer Support", desc: "Export annotated Figma specs, component libraries, and support engineering implementation." }
    ],
    pricing: [
      { tier: "Standard UI", price: "₹1,50,000+", desc: "Figma layouts for simple projects.", features: ["Up to 8 Pages", "Mobile Responsive Specs", "Brand Styling Assets", "Handoff Files"] },
      { tier: "Full Product", price: "₹3,50,000+", desc: "End-to-end design for complex platforms.", features: ["Up to 25 Pages", "Figma Design Library", "Dynamic Prototypes", "Handoff Calls"] },
      { tier: "Enterprise Design", price: "Custom Quote", desc: "Ongoing brand development and UI support.", features: ["Unlimited Pages", "Design system audit", "Monthly iterations", "SLA designer support"] }
    ]
  },
  transform: {
    id: "transform",
    title: "Digital Transformation",
    metaTitle: "Legacy Modernization & Digital Transformation | eVeda",
    metaDesc: "Modernize outdated software architectures, automate business processes, and deploy cloud-native configurations.",
    headline: "Future-Proof Your Enterprise Infrastructure",
    category: "design-growth",
    description: "Evolve your legacy processes. We evaluate outdated systems and rebuild them using modern stacks to reduce maintenance overhead and improve API support.",
    iconName: "transform",
    accent: "#eab308",
    gradient: "rgba(234, 179, 8, 0.15)",
    features: [
      "In-depth tech audit analysis & risk reports",
      "Zero-downtime database structural migrations",
      "Converting monolith designs to microservice modules",
      "Wrapping legacy software with modern API endpoints",
      "Automating manual document tasks",
      "Training staff on new tool configurations"
    ],
    techStack: ["Docker", "API Gateways", "Next.js", "Python", "PostgreSQL", "Cloud migrations"],
    process: [
      { step: "01", title: "Technology Audit", desc: "Evaluate software setups, code structure, and data flows." },
      { step: "02", title: "Modernization Blueprinting", desc: "Map steps to replace services with microservices." },
      { step: "03", title: "Migration & Rollout", desc: "Migrate data and deploy modern web modules." },
      { step: "04", title: "Stabilize & Train", desc: "Validate system stability under load, document new architecture, and train teams on modern tooling." }
    ],
    pricing: [
      { tier: "Technology Audit", price: "₹2,00,000+", desc: "Identify performance bottlenecks and security issues.", features: ["Full Codebase Scan", "Database Performance Check", "Transformation Plan", "Audit Document"] },
      { tier: "Standard Migration", price: "₹6,00,000+", desc: "Rebuild outdated systems as modern web apps.", features: ["Modern Stack Migration", "Database Transfer", "Security Audits", "3 Months Support"] },
      { tier: "Enterprise Monolith Split", price: "Custom Quote", desc: "For large monolithic platforms requiring microservice transitions.", features: ["Microservice migration", "Zero-downtime pipeline", "Integration testing suite", "SLA contract"] }
    ]
  },
  support: {
    id: "support",
    title: "Maintenance & Support",
    metaTitle: "24/7 Software Maintenance & System Monitoring | eVeda",
    metaDesc: "SLA-backed technical support, server monitoring, bug fixes, software updates, and performance tuning.",
    headline: "Keep Your Platforms Online and Optimized",
    category: "design-growth",
    description: "We provide active support, database tuning, and emergency hotfixes to ensure your digital services run smoothly.",
    iconName: "support",
    accent: "#14b8a6",
    gradient: "rgba(20, 184, 166, 0.15)",
    features: [
      "24/7 server monitoring & alert notifications",
      "Regular backups and security patches",
      "SLA-guaranteed hotfixes & minor iterations",
      "Continuous performance audits",
      "Version upgrades (Node.js, database drivers)",
      "Technical support availability"
    ],
    techStack: ["New Relic", "Sentry", "AWS CloudWatch", "Prometheus", "Git", "PagerDuty"],
    process: [
      { step: "01", title: "Setup Monitoring", desc: "Install bug logging and performance tools." },
      { step: "02", title: "Scheduled Maintenance", desc: "Run weekly backups and database cleanup." },
      { step: "03", title: "Incident Support", desc: "Resolve issues according to the SLA timeline." },
      { step: "04", title: "Reporting & Improvement", desc: "Deliver monthly health reports and recommend proactive upgrades to prevent future incidents." }
    ],
    pricing: [
      { tier: "Essential", price: "₹50,000 / mo", desc: "For simple web applications.", features: ["8 Hours Monthly Support", "Uptime Monitoring", "Monthly Backups", "48h Response SLA"] },
      { tier: "Pro Support", price: "₹1,20,000 / mo", desc: "For active applications needing quick updates.", features: ["25 Hours Monthly Support", "Error Logging Integration", "Weekly Backups", "12h Response SLA"] },
      { tier: "Enterprise SLA", price: "Custom Quote", desc: "For high-scale enterprise tools.", features: ["Dedicated Developers", "24/7 Pager Alerts", "SLA Response Guarantee", "Sentry tracking setup"] }
    ]
  },
  "whatsapp-marketing": {
    id: "whatsapp-marketing",
    title: "WhatsApp Marketing",
    metaTitle: "Enterprise WhatsApp Marketing & Chatbot Automation | eVeda",
    metaDesc: "Scale customer engagement with WhatsApp Business API integration, broadcast scheduling, and AI-powered automated chatbot workflows.",
    headline: "Connect Instantly with 98% Open Rate WhatsApp Solutions",
    category: "marketing",
    description: "We deploy scalable WhatsApp Business API configurations, custom broadcast campaign schedulers, and intelligent conversational chatbots to engage and convert your audience directly in their chat client.",
    iconName: "whatsapp",
    accent: "#25d366",
    gradient: "rgba(37, 211, 102, 0.15)",
    features: [
      "Official WhatsApp Business API verification and setup",
      "Conversational AI chatbots with intent classification",
      "Automated broadcast scheduling and analytics tracking",
      "CRM and ERP database synchronization integrations",
      "Rich media template approvals and messaging rules",
      "Multi-agent chat inbox systems for support teams"
    ],
    techStack: ["WhatsApp API", "Node.js", "OpenAI API", "PostgreSQL", "Redis", "React"],
    process: [
      { step: "01", title: "API Verification", desc: "Verify Meta Business Manager and register phone number endpoints." },
      { step: "02", title: "Flow & Agent Design", desc: "Draft interactive chatbot flows and intent parameters in AI nodes." },
      { step: "03", title: "Integration & Launch", desc: "Synchronize messaging gateways with your internal CRM databases." },
      { step: "04", title: "Analytics & Iteration", desc: "Monitor message delivery rates, conversation drop-offs, and refine bot responses continuously." }
    ],
    pricing: [
      { tier: "Starter", price: "₹80,000+", desc: "Standard templates and custom contact list uploads.", features: ["Official API Setup", "1 Automated Bot Flow", "Up to 10k contacts/mo", "1 Month Support"] },
      { tier: "Growth", price: "₹1,80,000+", desc: "Multi-agent support console and active database integration.", features: ["Interactive AI Chatbot", "Multi-agent dashboard", "Up to 50k contacts/mo", "3 Months Support"] },
      { tier: "Enterprise", price: "Custom Quote", desc: "Custom automation flows and CRM syncing.", features: ["Custom ML Bot Agent", "CRM real-time database sync", "SLA API uptime guarantee", "Dedicated support team"] }
    ]
  },
  "content-marketing": {
    id: "content-marketing",
    title: "Content Marketing",
    metaTitle: "Premium Content Marketing & Copywriting Services | eVeda",
    metaDesc: "Scale search visibility and build brand authority with high-converting copy, technical blogs, press releases, and landing page assets.",
    headline: "High-Converting Content That Commands Authority",
    category: "marketing",
    description: "We research, write, and distribute authoritative content that attracts, informs, and converts target audiences. Combining SEO insights with human-written copy, we drive organic lead loops.",
    iconName: "content",
    accent: "#f97316",
    gradient: "rgba(249, 115, 22, 0.15)",
    features: [
      "Keyword-targeted search intent content plans",
      "In-depth research reports and whitepapers",
      "High-converting landing page copywriting",
      "SEO-optimized blogs and content hubs",
      "Email marketing newsletter sequence structures",
      "Social media micro-copywriting layouts"
    ],
    techStack: ["Ahrefs", "Google Analytics", "WordPress", "Markdown", "Semrush", "Grammarly"],
    process: [
      { step: "01", title: "Audience Research", desc: "Analyze competitor content gaps and map key search terms." },
      { step: "02", title: "Content Development", desc: "Write deep-dive technical copy focused on user conversions." },
      { step: "03", title: "Distribution & Optimization", desc: "Publish across search networks and track conversion metrics." },
      { step: "04", title: "Authority Growth", desc: "Build topical cluster authority through consistent publishing and strategic internal linking." }
    ],
    pricing: [
      { tier: "Standard", price: "₹60,000 / mo", desc: "Regular articles for search visibility and organic growth.", features: ["4 Technical Articles", "Keyword optimization", "1 Newsletter email template", "Monthly reports"] },
      { tier: "Pro Scale", price: "₹1,40,000 / mo", desc: "Full authority builder for SaaS and technical systems.", features: ["8 Deep-dive articles", "Custom landing page copy", "Email sequence setup", "Quarterly strategy"] },
      { tier: "Enterprise", price: "Custom Quote", desc: "Omnichannel authority campaigns for large corporate systems.", features: ["Full content inventory audit", "Dedicated copy team", "Whitepapers and reports", "PR outreach options"] }
    ]
  },
  "seo": {
    id: "seo",
    title: "Search Engine Optimization",
    metaTitle: "Technical SEO & Organic Growth Optimization | eVeda",
    metaDesc: "Rank page 1 on Google. Technical site speed optimization, schema markup integration, backlink building, and local SEO services.",
    headline: "Dominating Search Rankings for High-Value Intent",
    category: "marketing",
    description: "Our technical SEO experts optimize page performance, schemas, and link architectures to drive search engines to crawl and index your site on Page 1 for high-converting query terms.",
    iconName: "seo",
    accent: "#2563eb",
    gradient: "rgba(37, 99, 235, 0.15)",
    features: [
      "Comprehensive technical SEO site audits",
      "Core Web Vitals speed optimization updates",
      "Advanced structured schema markups (JSON-LD)",
      "Strategic competitor backlink audits",
      "Keyword cluster mapping and planning",
      "Local search optimization and Google Profile setups"
    ],
    techStack: ["Google Search Console", "Screaming Frog", "Ahrefs", "Lighthouse", "Schema.org", "Next.js"],
    process: [
      { step: "01", title: "Technical Audit", desc: "Scan website crawl blocks, duplicate tags, and load speeds." },
      { step: "02", title: "On-Page & Schema Updates", desc: "Inject structured data markup and optimize search hierarchy." },
      { step: "03", title: "Authority Building", desc: "Deploy target outreach assets to acquire premium links." },
      { step: "04", title: "Rank Tracking & Reporting", desc: "Monitor keyword positions weekly and deliver actionable growth strategy adjustments monthly." }
    ],
    pricing: [
      { tier: "Starter SEO", price: "₹75,000 / mo", desc: "For local businesses and emerging startup frameworks.", features: ["Technical SEO audit", "On-page tag optimization", "5 target keywords", "Monthly progress reports"] },
      { tier: "Professional", price: "₹1,50,000 / mo", desc: "For competitive SaaS and ecommerce portal targets.", features: ["Competitor gap analysis", "Core Web Vitals fixes", "20 target keywords", "10 premium backlinks/mo"] },
      { tier: "Enterprise", price: "Custom Quote", desc: "Global multilingual campaigns with dedicated engineer support.", features: ["Multilingual international SEO", "Dedicated developer integration", "Audit logs tracking", "Custom API rank tracker"] }
    ]
  },
  "social-media-marketing": {
    id: "social-media-marketing",
    title: "Social Media Marketing",
    metaTitle: "Organic Social Media Growth & Brand Marketing | eVeda",
    metaDesc: "Grow your audience on LinkedIn, X, Instagram, and YouTube. Creative asset production, community management, and growth strategies.",
    headline: "Engage Audiences Where They Spend Their Time",
    category: "marketing",
    description: "We construct and execute high-impact organic social media strategies. By producing premium graphics, video reels, and technical copy, we grow active communities around your brand.",
    iconName: "social-media",
    accent: "#a855f7",
    gradient: "rgba(168, 85, 247, 0.15)",
    features: [
      "LinkedIn leadership branding and copywriting",
      "Video Reels & Shorts creative storyboard design",
      "Interactive asset creation and design styling",
      "Multi-channel calendar scheduling and execution",
      "Active community monitoring and brand responses",
      "Monthly viral reach and interaction analytics reports"
    ],
    techStack: ["Figma", "Premiere Pro", "Buffer", "Hootsuite", "Loom", "Notion"],
    process: [
      { step: "01", title: "Brand Tone Definition", desc: "Establish design rules, content pillars, and writing guidelines." },
      { step: "02", title: "Creative Production", desc: "Produce reels, high-end infographics, and weekly copy." },
      { step: "03", title: "Scheduler & Engagement", desc: "Publish across active networks and engage with community comments." },
      { step: "04", title: "Analytics & Strategy Refresh", desc: "Analyze reach and engagement data monthly and pivot content pillars to maximize audience growth." }
    ],
    pricing: [
      { tier: "Starter", price: "₹65,000 / mo", desc: "Essential social media scheduling for consistent presence.", features: ["3 posts per week", "1 custom video reel/mo", "Community monitoring", "Monthly growth report"] },
      { tier: "Growth", price: "₹1,30,000 / mo", desc: "Authority builder for scaling companies on key networks.", features: ["5 posts per week", "4 custom video reels/mo", "LinkedIn leadership support", "Weekly analytics tracking"] },
      { tier: "Enterprise", price: "Custom Quote", desc: "Custom brand campaign pipelines and creative direction.", features: ["Unlimited weekly posts", "Dedicated video editors", "Influencer cross-promotion support", "Interactive campaign pages"] }
    ]
  },
  "ppc": {
    id: "ppc",
    title: "Paid Ads (PPC)",
    metaTitle: "Google Ads & Meta Advertising (PPC) Experts | eVeda",
    metaDesc: "Maximize ROI with highly-targeted pay-per-click ad campaigns on Google, Meta, LinkedIn, and programmatic ad networks.",
    headline: "Direct Conversions with High-Yield Ad Campaigns",
    category: "marketing",
    description: "We deploy data-driven paid advertising campaigns designed to maximize return on ad spend (ROAS). From ad copywriting and creative A/B testing to pixel setup, we verify your budget converts.",
    iconName: "ppc",
    accent: "#ef4444",
    gradient: "rgba(239, 68, 68, 0.15)",
    features: [
      "High-intent Google Search Ad setup and optimization",
      "Meta (Facebook & Instagram) visual ad sets",
      "LinkedIn B2B demographic funnel routing",
      "Advanced conversion pixel and API configurations",
      "Dynamic retargeting campaign loops",
      "Ad copywriting and visual asset A/B testing"
    ],
    techStack: ["Google Ads", "Meta Ads Manager", "LinkedIn Campaign Manager", "Tag Manager", "Google Analytics", "Hotjar"],
    process: [
      { step: "01", title: "Funnel Mapping & Setup", desc: "Configure tracking pixels, landing pages, and campaign settings." },
      { step: "02", title: "Asset Creation & Launch", desc: "Write ad copies, design visuals, and launch targeted test sets." },
      { step: "03", title: "A/B Testing & Optimization", desc: "Scale winning ad sets, lower CPC, and maximize ROI." },
      { step: "04", title: "Budget Scaling", desc: "Increase spend on proven creatives, expand audience segments, and track ROAS targets weekly." }
    ],
    pricing: [
      { tier: "Test Campaign", price: "₹80,000+", desc: "For launching initial product validation ad groups.", features: ["Google & Meta setup", "Audience research", "3 ad creative designs", "Weekly reports"] },
      { tier: "Growth Funnel", price: "₹1,80,000+", desc: "B2B or e-commerce scaling campaign management.", features: ["Google, Meta & LinkedIn", "Pixel setup & tracking APIs", "Continuous A/B testing", "Retargeting campaigns"] },
      { tier: "Enterprise", price: "Custom Quote", desc: "High-scale monthly spend campaign optimization.", features: ["Multi-funnel scaling", "Dedicated media buyer", "Creative director validation", "Custom reporting dashboard"] }
    ]
  },
  "influencer-marketing": {
    id: "influencer-marketing",
    title: "Influencer Marketing",
    metaTitle: "Creator Partnerships & Influencer Campaigns | eVeda",
    metaDesc: "Partner with top creators on YouTube, Instagram, and LinkedIn. End-to-end influencer outreach, negotiation, and ROI tracking.",
    headline: "Drive Brand Trust via Creator Endorsements",
    category: "marketing",
    description: "We match your brand with hand-picked micro and macro creators. By drafting campaign guidelines, managing negotiations, and tracking conversion links, we turn views into sales.",
    iconName: "influencer",
    accent: "#ec4899",
    gradient: "rgba(236, 72, 153, 0.15)",
    features: [
      "Influencer match discovery and outreach",
      "Contract negotiation and usage rights management",
      "Creative campaign briefs and asset reviews",
      "Unique affiliate tracking link configurations",
      "Multi-creator content compilation reels",
      "Campaign reach, engagement, and conversion analysis"
    ],
    techStack: ["Modash", "Upfluence", "Google Sheets", "Linktree", "Figma", "Google Analytics"],
    process: [
      { step: "01", title: "Creator Research", desc: "Identify creators matching your demographic bounds." },
      { step: "02", title: "Outreach & Negotiation", desc: "Contact creators, agree on assets, and secure contracts." },
      { step: "03", title: "Launch & Link Tracking", desc: "Monitor video publishes and track conversions using affiliate metrics." },
      { step: "04", title: "Results Review & Scale", desc: "Analyze conversion attribution reports and renegotiate top-performing creator partnerships." }
    ],
    pricing: [
      { tier: "Starter", price: "₹1,20,000+", desc: "Micro-influencer campaign builder for local reach.", features: ["Up to 5 Micro-Creators", "Outreach & Briefs", "Asset validation reviews", "Campaign report"] },
      { tier: "Growth Suite", price: "₹3,00,000+", desc: "Dual platform creator partnerships with authority figures.", features: ["Up to 15 Micro & Mid-Creators", "Affiliate tracking setup", "Usage rights management", "Video asset edits"] },
      { tier: "Enterprise Scale", price: "Custom Quote", desc: "Macro partnerships and brand ambassador programs.", features: ["Macro-influencer partnerships", "Ambassador contracts", "Dedicated campaign manager", "Integrated PR campaigns"] }
    ]
  },
  "digital-marketing": {
    id: "digital-marketing",
    title: "Digital Marketing Services",
    metaTitle: "Full-Scale Growth & Digital Marketing Solutions | eVeda",
    metaDesc: "Comprehensive digital growth strategies combining SEO, Paid Ads, Email Funnels, CRO, and Content Marketing into one unified growth engine.",
    headline: "Omnichannel Growth Engine to Scale B2B and SaaS",
    category: "marketing",
    description: "We build and execute complete digital growth machines. By integrating organic search, paid funnels, conversion rate optimization (CRO), and email flows, we align all channels to scale your MRR.",
    iconName: "digital-marketing",
    accent: "#06b6d4",
    gradient: "rgba(6, 182, 212, 0.15)",
    features: [
      "Omnichannel growth strategy mapping and KPIs",
      "Conversion Rate Optimization (CRO) heatmaps",
      "Automated email onboarding and nurture funnels",
      "SaaS product-led growth (PLG) loops",
      "Unified customer analytics dashboard integrations",
      "B2B account-based marketing (ABM) outreach"
    ],
    techStack: ["Klaviyo", "Hotjar", "Google Analytics 4", "Semrush", "Apollo.io", "ActiveCampaign"],
    process: [
      { step: "01", title: "Funnel Diagnostics", desc: "Audit current digital touchpoints, bounce rates, and copy." },
      { step: "02", title: "Campaign Implementation", desc: "Build email flows, optimize landing pages, and align ad copy." },
      { step: "03", title: "Scale & Optimize", desc: "Run continuous A/B test iterations to maximize sales value." },
      { step: "04", title: "Revenue Attribution", desc: "Map MRR growth to each channel, report on CAC/LTV ratios, and refocus budget on best ROI." }
    ],
    pricing: [
      { tier: "Growth Plan", price: "₹1,50,000 / mo", desc: "Integrated digital marketing plan for scaling startups.", features: ["SEO & Blog updates", "Email newsletter setup", "Ad campaign tracking support", "Weekly metrics report"] },
      { tier: "Pro Scale", price: "₹3,00,000 / mo", desc: "Full-scale growth optimization with CRO and onboarding funnels.", features: ["Full CRO audit & fixes", "Klaviyo/Hubspot flow setup", "Multichannel ad management", "Monthly strategy review"] },
      { tier: "Enterprise", price: "Custom Quote", desc: "Custom consulting and dedicated growth squads.", features: ["Dedicated growth team", "Bespoke marketing software setups", "Custom dashboard integrations", "SLA conversion assurance"] }
    ]
  },
  "orm": {
    id: "orm",
    title: "Online Reputation Management",
    metaTitle: "Online Reputation Management (ORM) & PR Services | eVeda",
    metaDesc: "Protect your brand. Remove negative search results, manage online reviews, monitor brand mentions, and build positive PR campaigns.",
    headline: "Protect and Control Your Digital Footprint",
    category: "branding",
    description: "We help brands establish and protect their digital public image. By building positive PR assets, monitoring brand mentions, and suppressing negative search queries, we ensure your brand commands trust.",
    iconName: "orm",
    accent: "#10b981",
    gradient: "rgba(16, 185, 129, 0.15)",
    features: [
      "Negative search engine result suppression",
      "Real-time brand mentions monitoring & alerts",
      "Review generation campaign management",
      "Crisis PR planning and press release pipelines",
      "Executive profile authority building",
      "Wikipedia and official profile verification support"
    ],
    techStack: ["Brand24", "Google Alerts", "Press Release Networks", "SERP Tracker", "SEO", "LinkedIn"],
    process: [
      { step: "01", title: "Reputation Analysis", desc: "Scan reviews, search engines, and mention sentiment metrics." },
      { step: "02", title: "PR & SEO Injection", desc: "Draft positive press releases and launch high-authority pages." },
      { step: "03", title: "Suppression & Review Loops", desc: "Promote positive pages to push down negative search results." },
      { step: "04", title: "Ongoing Brand Guard", desc: "Run continuous sentiment monitoring and respond swiftly to emerging reputation threats." }
    ],
    pricing: [
      { tier: "Basic Protection", price: "₹1,00,000+", desc: "Monitor brand mentions and request positive review flows.", features: ["Mentions monitoring", "Review link generation setup", "Monthly search check", "1 Month Support"] },
      { tier: "Active Suppression", price: "₹2,50,000+", desc: "For brands facing negative search listings or review spikes.", features: ["Search engine suppression", "5 Positive press releases", "Review campaign management", "3 Months Support"] },
      { tier: "Enterprise SLA", price: "Custom Quote", desc: "Continuous brand protection and executive PR.", features: ["24/7 crisis monitoring", "Executive profile building", "Wikipedia page creation support", "Dedicated PR strategist"] }
    ]
  },
  "3d-video-editing": {
    id: "3d-video-editing",
    title: "3D Video Editing",
    metaTitle: "Premium 3D Animation & Video Editing Services | eVeda",
    metaDesc: "Cinematic video editing, 3D product renders, dynamic motion graphics, and corporate promo edits. Perfect for SaaS and ad creatives.",
    headline: "Cinematic 3D Visuals and Premium Motion Graphics",
    category: "branding",
    description: "We edit cinematic video assets and render photorealistic 3D product animations. Perfect for SaaS explainer videos, paid ads, and brand showcases.",
    iconName: "video",
    accent: "#ec4899",
    gradient: "rgba(236, 72, 153, 0.15)",
    features: [
      "High-end 3D product modeling and rendering",
      "Dynamic motion graphics and typography animation",
      "SaaS product walkthrough and explainer videos",
      "Professional color grading and audio mixing",
      "Social media short-form video optimization",
      "Cinematic brand promos and commercials"
    ],
    techStack: ["Blender", "After Effects", "Premiere Pro", "DaVinci Resolve", "Cinema 4D", "Audition"],
    process: [
      { step: "01", title: "Storyboarding & Mockups", desc: "Draft video scripts, reference styles, and 3D wireframes." },
      { step: "02", title: "Rendering & Assembly", desc: "Animate 3D layers, compile clips, and color grade files." },
      { step: "03", title: "Audio & Delivery", desc: "Add voiceovers, mix sound effects, and output high-res files." },
      { step: "04", title: "Revisions & Final Export", desc: "Incorporate client feedback, finalize color grades, and deliver platform-specific optimized exports." }
    ],
    pricing: [
      { tier: "Social Pack", price: "₹90,000+", desc: "Short-form video edits for social media channels.", features: ["3 Short-form reels", "Dynamic captions & SFX", "Color correction", "1 Round revision"] },
      { tier: "Product Showcase", price: "₹2,20,000+", desc: "Photorealistic 3D render and explainer video compilation.", features: ["1 Explainer video (up to 90s)", "3D model modeling & render", "Professional voiceover sync", "3 Rounds revisions"] },
      { tier: "Brand Commercial", price: "Custom Quote", desc: "Enterprise level commercial video production.", features: ["Cinematic brand promo", "Custom 3D environments", "SLA delivery timeline", "Unlimited revisions"] }
    ]
  },
  "still-branding": {
    id: "still-branding",
    title: "Still Branding",
    metaTitle: "Brand Identity, Logo Design & Style Systems | eVeda",
    metaDesc: "Develop a premium brand identity. Custom logo designs, comprehensive design systems, typography rules, and stationery mockups.",
    headline: "Visual Identity That Commands Market Presence",
    category: "branding",
    description: "We design premium brand identity systems. From custom logos to color palettes, typography systems, and stationery mockups, we create a unified brand footprint.",
    iconName: "branding-still",
    accent: "#8b5cf6",
    gradient: "rgba(139, 92, 246, 0.15)",
    features: [
      "Custom logo systems (primary, secondary, logomark)",
      "Premium typography scales and hierarchy rules",
      "Harmonious brand color systems (digital & print)",
      "Comprehensive digital brand style manuals",
      "Business cards, stationery, and slide deck mockups",
      "Physical packaging and product layout design options"
    ],
    techStack: ["Figma", "Illustrator", "Photoshop", "Indesign", "Google Fonts", "Keynote"],
    process: [
      { step: "01", title: "Moodboarding", desc: "Explore competitor brand identities and establish tone rules." },
      { step: "02", title: "Identity Design", desc: "Develop logos, typography scales, and color systems." },
      { step: "03", title: "Handoff Manual", desc: "Compile logo files, document design guides, and export layouts." },
      { step: "04", title: "Brand Activation", desc: "Apply brand identity across digital touchpoints, social profiles, and marketing collateral." }
    ],
    pricing: [
      { tier: "Startup Identity", price: "₹80,000+", desc: "Essential branding assets for launching companies.", features: ["Primary Logo Design", "Color palette setup", "Typography guide", "Handoff files"] },
      { tier: "Full Brand System", price: "₹2,00,000+", desc: "Complete visual design system for digital businesses.", features: ["Full logo kit", "Slide deck template", "Business stationery", "Detailed brand style manual"] },
      { tier: "Enterprise Corporate", price: "Custom Quote", desc: "High-scale rebranding campaigns and packaging specs.", features: ["Rebranding strategy workshop", "Global typography licenses", "Custom packaging formats", "Dedicated support manager"] }
    ]
  },
  "performance-marketing": {
    id: "performance-marketing",
    title: "Performance Marketing",
    metaTitle: "Data-Driven Performance Marketing & ROI Scaling | eVeda",
    metaDesc: "Scale revenue with performance-focused ad management, conversion tracking setup, budget optimization, and creative iterations.",
    headline: "Vetted Creative Testing for Guaranteed ROI Scale",
    category: "branding",
    description: "We run data-driven, ROI-focused ad campaigns. By analyzing conversion rates, split-testing landing pages, and launching ad sets, we verify your marketing spend yields results.",
    iconName: "performance",
    accent: "#f59e0b",
    gradient: "rgba(245, 158, 11, 0.15)",
    features: [
      "ROI-driven campaign architecture setups",
      "Landing page split testing (A/B testing)",
      "Advanced customer attribution configurations",
      "Continuous budget tracking and bid management",
      "Creative concept scaling and ad reviews",
      "LTV and CAC metrics analysis dashboards"
    ],
    techStack: ["Triple Whale", "Meta Pixel", "Google Analytics", "Unbounce", "Optimizely", "Figma"],
    process: [
      { step: "01", title: "Attribution Setup", desc: "Verify tracking codes, conversion triggers, and pixels." },
      { step: "02", title: "Creative A/B Testing", desc: "Deploy ad variants, test copy, and identify winners." },
      { step: "03", title: "Scale Phase", desc: "Scale winning ad sets and optimize cost-per-acquisition metrics." },
      { step: "04", title: "ROAS Reporting", desc: "Deliver weekly performance dashboards mapping ad spend directly to revenue and LTV outcomes." }
    ],
    pricing: [
      { tier: "Growth Funnel", price: "₹1,20,000 / mo", desc: "Scale initial customer acquisition channels.", features: ["Meta & Google ads", "A/B landing page updates", "Attribution tracking setup", "Weekly KPI sync calls"] },
      { tier: "Pro Scale", price: "₹2,50,000 / mo", desc: "For scaling brands targeting multichannel acquisition.", features: ["Omnichannel ad management", "Triple Whale integrations", "Creative asset generation", "Monthly attribution report"] },
      { tier: "Enterprise Squad", price: "Custom Quote", desc: "Dedicated media buying and CRO team integration.", features: ["Dedicated media buyer", "Dedicated CRO engineer", "Custom database reporting", "SLA-backed target ROAS"] }
    ]
  },
  "graphic-designing": {
    id: "graphic-designing",
    title: "Graphic Designing",
    metaTitle: "Premium Graphic Design & Collateral Production | eVeda",
    metaDesc: "Professional graphic design services. Marketing collaterals, social media assets, ebooks, corporate brochures, and digital illustrations.",
    headline: "Stunning Graphic Collaterals That Match Your Brand",
    category: "branding",
    description: "We design eye-catching graphic assets. From social media templates to ebook layouts, banner ads, and corporate brochures, we build graphics that convert.",
    iconName: "graphics",
    accent: "#0ea5e9",
    gradient: "rgba(14, 165, 233, 0.15)",
    features: [
      "Custom social media template packs (Figma/Canva)",
      "High-end corporate brochures and PDF layouts",
      "Ebook and whitepaper layout styling",
      "Paid advertising visual banner designs",
      "Custom digital drawings and vector icons",
      "Print-ready banners and event backdrop layouts"
    ],
    techStack: ["Photoshop", "Illustrator", "InDesign", "Figma", "Canva", "Lightroom"],
    process: [
      { step: "01", title: "Design Concept Brief", desc: "Align on graphic dimensions, brand guidelines, and visual goals." },
      { step: "02", title: "Draft Development", desc: "Produce initial graphic directions and color layouts." },
      { step: "03", title: "Handoff & File Prep", desc: "Export high-resolution PNG, SVG, and print-ready PDF files." },
      { step: "04", title: "Revision & Asset Library", desc: "Incorporate final feedback rounds and compile all assets into an organized, shareable design vault." }
    ],
    pricing: [
      { tier: "Basic Pack", price: "₹50,000+", desc: "Essential marketing graphic assets for startups.", features: ["10 Custom social assets", "3 Ad banner variants", "Figma source files", "1 Round revision"] },
      { tier: "Brand Collateral", price: "₹1,20,000+", desc: "Premium brochure and multi-channel asset pack.", features: ["20 Social assets", "Full brochure PDF layout", "Banner ads suite", "3 Rounds revisions"] },
      { tier: "Monthly Studio", price: "Custom Quote", desc: "Ongoing graphic support for active marketing teams.", features: ["Dedicated designer availability", "Unlimited monthly requests", "Same-day turnaround times", "Source file handoffs"] }
    ]
  },
  "book-designing": {
    id: "book-designing",
    title: "Book Designing",
    metaTitle: "Professional Book Designing & Typesetting Services | eVeda",
    metaDesc: "Bestseller-grade book formatting, cover design, typesetting, and interior layout for paperback, hardcover, Kindle, and audiobooks.",
    headline: "Award-Winning Book Interior Layouts & Custom Cover Art",
    category: "branding",
    description: "We provide world-class book design services tailored for indie authors, publishers, and enterprises. From eye-catching 3D book covers to meticulously formatted interior typography, Kindle/ePub conversion, and print-ready files.",
    iconName: "book",
    accent: "#f97316",
    gradient: "rgba(249, 115, 22, 0.15)",
    features: [
      "Custom Front, Back & Spine 3D Cover Designs",
      "Professional Interior Typesetting & Layout (InDesign / Vellum)",
      "Reflowable & Fixed ePub / Kindle Mobi Formats",
      "IngramSpark, Amazon KDP & Barnes & Noble Print-Ready Specs",
      "Custom Chapter Headers, Drop Caps & Ornaments",
      "Audiobook ACX Square Cover Formatting & 3D Mockups"
    ],
    techStack: ["Adobe InDesign", "Adobe Photoshop", "Adobe Illustrator", "Vellum", "Kindle Create", "Sigil ePub"],
    process: [
      { step: "01", title: "Manuscript Review & Style Brief", desc: "Analyze genre aesthetics, target audience, trim size, and typography style preferences." },
      { step: "02", title: "Cover Concepts & Sample Layout", desc: "Deliver 3 distinct front cover concepts and 5 formatted interior sample pages." },
      { step: "03", title: "Full Interior Typesetting", desc: "Format entire manuscript with running headers, page numbers, margins, and drop caps." },
      { step: "04", title: "Print & Digital Handoff", desc: "Deliver KDP/IngramSpark PDF print files with spine calculations and validated ePub files." }
    ],
    pricing: [
      { tier: "Essential Author", price: "₹35,000+", desc: "Complete cover & interior formatting for standard fiction/non-fiction.", features: ["Custom Ebook & Paperback Cover", "Interior Layout (Up to 60k words)", "KDP & ePub Formats", "2 Rounds Revisions"] },
      { tier: "Bestseller Pro", price: "₹75,000+", desc: "Premium formatting with custom illustrations, hardcover & audiobook kit.", features: ["Paperback + Hardcover + Dust Jacket", "Complex Interior Layout (Unlimited words)", "3D Promotional Mockups", "Audiobook ACX Cover", "Priority 5-Day Delivery"] },
      { tier: "Publishing House", price: "Custom Quote", desc: "Bulk title design, catalog formatting, and dedicated art director.", features: ["Multi-title Volume Discounts", "Custom Typography & Licensing", "Dedicated Art Director", "Source Files (.INDD, .PSD)"] }
    ]
  },
  "book-branding": {
    id: "book-branding",
    title: "Book Branding",
    metaTitle: "Author Branding, Book Marketing & Launch Strategy | eVeda",
    metaDesc: "Complete author identity, book launch PR, Amazon A+ Content, social media book trailers, and reader magnet funnels to turn books into bestsellers.",
    headline: "Build an Iconic Author Brand & Bestseller Launch Campaign",
    category: "branding",
    description: "We transform books and authors into unforgettable global brands. From author logos and custom website landing pages to Amazon A+ Content, Goodreads launch kits, press release distribution, and viral social media campaigns.",
    iconName: "sparkles",
    accent: "#c4347cdc",
    gradient: "rgba(196, 52, 124, 0.15)",
    features: [
      "Amazon A+ Content Modules & Enhanced Brand Content (EBC)",
      "Author Platform Identity (Logo, Typography, Color Palette)",
      "Viral Book Trailer Videos (Vertical TikTok/Reels & 16:9 4K)",
      "Reader Magnet & Lead Generation Funnel Architecture",
      "Goodreads, BookBub & Amazon Author Central Optimization",
      "Full Media Press Kit, Virtual Launch Party Assets & PR Outreach"
    ],
    techStack: ["Figma", "After Effects", "Amazon A+ Creator", "Mailchimp", "Canva Pro", "WordPress/Next.js"],
    process: [
      { step: "01", title: "Brand Discovery & Audience Mapping", desc: "Define author voice, reader demographics, and genre positioning strategy." },
      { step: "02", title: "Visual Identity & Asset Production", desc: "Design Amazon A+ modules, social launch kits, banners, and author media kit." },
      { step: "03", title: "Launch Funnel & Trailer Cut", desc: "Produce 3D cinematic book teaser video and setup reader newsletter funnel." },
      { step: "04", title: "Campaign Rollout & Scaling", desc: "Deploy omnichannel promotion across TikTok, Instagram, Amazon, and media publications." }
    ],
    pricing: [
      { tier: "Launch Accelerator", price: "₹60,000+", desc: "Essential launch branding package for indie author releases.", features: ["Standard Amazon A+ Content", "15 Social Launch Posts & Stories", "Author One-Sheet Media Kit", "BookBub Banner Suite"] },
      { tier: "Bestseller Authority", price: "₹1,40,000+", desc: "Complete author branding, high-retention video trailers, and launch funnel.", features: ["Premium Amazon A+ Layouts", "30-Sec 3D Cinematic Book Trailer", "Author Website Landing Page", "Full Press Release Distribution", "Newsletter Lead Magnet Setup"] },
      { tier: "Franchise Brand", price: "Custom Quote", desc: "For series authors, publishing houses, and international bestseller tours.", features: ["Multi-Book Series Branding", "Dedicated Launch PR Strategist", "Omnichannel Ad Creative Production", "Speaker & Event Stage Kits"] }
    ]
  }
};

