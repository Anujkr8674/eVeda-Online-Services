export type ProductPricingTier = {
  tier: string;
  price: string;
  desc: string;
  features: string[];
};

export type ProductBentoFeature = {
  iconName: string;
  title: string;
  description: string;
  colSpan: string; // e.g. "md:col-span-8" or "md:col-span-4"
  colorClasses: string; // Tailwind colors matching color palette
  borderHover: string;
  glowGradient: string;
  textHover: string;
};

export type ProductFAQ = {
  question: string;
  answer: string;
};

export type ProductDetail = {
  id: string;
  title: string;
  metaTitle: string;
  metaDesc: string;
  headline: string;
  description: string;
  iconName: string;
  accent: string;
  gradient: string;
  features: string[];
  pricing: ProductPricingTier[];
  bentoFeatures: ProductBentoFeature[];
  faqs: ProductFAQ[];
};

export const productsData: Record<string, ProductDetail> = {
  "dms": {
    id: "dms",
    title: "Documents Management System",
    metaTitle: "Enterprise Document Management System (DMS) | eVeda",
    metaDesc: "Secure, scalable document management system with OCR, version control, and workflow automation.",
    headline: "Go Paperless with Intelligent Document Management",
    description: "Centralize, secure, and manage all your corporate files with our enterprise-grade DMS.",
    iconName: "file-text",
    accent: "#3B82F6",
    gradient: "rgba(59, 130, 246, 0.15)",
    features: ["OCR Text Recognition", "Version Control", "Role-based Access", "E-Signature Integration"],
    pricing: [
      {
        tier: "Standard",
        price: "₹18,000 / month",
        desc: "Ideal for small to medium teams looking to transition to digital document workflows.",
        features: [
          "Up to 50 Users",
          "500 GB Secure Storage",
          "Basic OCR Search Capabilities",
          "Role-based Permission Controls",
          "Standard Email & Phone Support"
        ]
      },
      {
        tier: "Growth",
        price: "₹45,000 / month",
        desc: "Designed for scaling corporations needing automation and third-party integrations.",
        features: [
          "Up to 250 Users",
          "2 TB Encrypted Storage",
          "AI-Powered Advanced OCR Search",
          "Custom Approval Workflow Automation",
          "Integrations: Slack, Drive & Email",
          "Priority 24/7 Support SLA"
        ]
      },
      {
        tier: "Enterprise Custom",
        price: "Contact for Quote",
        desc: "Engineered for global multi-branch corporations requiring custom deployment and setups.",
        features: [
          "Unlimited Users",
          "Dedicated Uncapped Storage",
          "On-Premise / Hybrid Deployment",
          "Single Sign-On (SSO) & AD Sync",
          "Dedicated Success Manager",
          "Custom API & ERP Integration"
        ]
      }
    ],
    bentoFeatures: [
      {
        iconName: "search",
        title: "AI-Powered Search",
        description: "Find any document in seconds with AI, OCR and natural language search. Retrieve context, scanned text, and handwritten notes instantly.",
        colSpan: "md:col-span-8",
        colorClasses: "bg-blue-50 border-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600",
        borderHover: "hover:border-blue-300 hover:shadow-[0_20px_50px_rgba(59,130,246,0.06)]",
        glowGradient: "from-blue-50/0 via-transparent to-blue-500/[0.02]",
        textHover: "group-hover:text-blue-600"
      },
      {
        iconName: "list",
        title: "Everything at a Glance",
        description: "Get a real-time overview of your documents, team activity, approvals, and system health from a single unified panel.",
        colSpan: "md:col-span-4",
        colorClasses: "bg-blue-50 border-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600",
        borderHover: "hover:border-blue-300 hover:shadow-[0_20px_50px_rgba(59,130,246,0.06)]",
        glowGradient: "from-blue-50/0 via-transparent to-blue-500/[0.02]",
        textHover: "group-hover:text-blue-600"
      },
      {
        iconName: "shield",
        title: "Role-Based Access",
        description: "Control view, edit, download and share permissions with granular roles, keeping confidential files strictly restricted.",
        colSpan: "md:col-span-4",
        colorClasses: "bg-blue-50 border-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600",
        borderHover: "hover:border-blue-300 hover:shadow-[0_20px_50px_rgba(59,130,246,0.06)]",
        glowGradient: "from-blue-50/0 via-transparent to-blue-500/[0.02]",
        textHover: "group-hover:text-blue-600"
      },
      {
        iconName: "cloud",
        title: "Secure Cloud Storage",
        description: "Enterprise-grade encryption keeps your data safe in the cloud 24/7. Built on high-availability cloud architecture.",
        colSpan: "md:col-span-4",
        colorClasses: "bg-blue-50 border-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600",
        borderHover: "hover:border-blue-300 hover:shadow-[0_20px_50px_rgba(59,130,246,0.06)]",
        glowGradient: "from-blue-50/0 via-transparent to-blue-500/[0.02]",
        textHover: "group-hover:text-blue-600"
      },
      {
        iconName: "refresh",
        title: "Workflow Automation",
        description: "Automate document review pipelines, multi-level approvals, and instant notifications to eliminate manual delays.",
        colSpan: "md:col-span-4",
        colorClasses: "bg-blue-50 border-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600",
        borderHover: "hover:border-blue-300 hover:shadow-[0_20px_50px_rgba(59,130,246,0.06)]",
        glowGradient: "from-blue-50/0 via-transparent to-blue-500/[0.02]",
        textHover: "group-hover:text-blue-600"
      },
      {
        iconName: "mobile",
        title: "Mobile Access",
        description: "Access, edit, and approve critical business documents securely on the go from any mobile device or tablet.",
        colSpan: "md:col-span-4",
        colorClasses: "bg-blue-50 border-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600",
        borderHover: "hover:border-blue-300 hover:shadow-[0_20px_50px_rgba(59,130,246,0.06)]",
        glowGradient: "from-blue-50/0 via-transparent to-blue-500/[0.02]",
        textHover: "group-hover:text-blue-600"
      },
      {
        iconName: "history",
        title: "Version Control",
        description: "Track document changes over time, compare revisions side-by-side, and restore previous file versions with a single click.",
        colSpan: "md:col-span-8",
        colorClasses: "bg-blue-50 border-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600",
        borderHover: "hover:border-blue-300 hover:shadow-[0_20px_50px_rgba(59,130,246,0.06)]",
        glowGradient: "from-blue-50/0 via-transparent to-blue-500/[0.02]",
        textHover: "group-hover:text-blue-600"
      }
    ],
    faqs: [
      {
        question: "Is the DMS cloud-based or on-premise?",
        answer: "We offer both! You can deploy our DMS on your own internal servers (On-Premise) or use our scalable, secure cloud-hosted version."
      },
      {
        question: "Does it support OCR and full-text search?",
        answer: "Yes, our built-in OCR (Optical Character Recognition) engine scans PDFs and images, allowing you to instantly search for any keyword within the document."
      },
      {
        question: "Is it compliant with HIPAA/GDPR?",
        answer: "Absolutely. Our DMS includes role-based access control, encryption at rest, and detailed audit logs ensuring full regulatory compliance."
      },
      {
        question: "Can we integrate it with our existing ERP?",
        answer: "Yes, we provide REST APIs and Webhooks to seamlessly integrate the DMS with your existing ERP, CRM, or HR systems."
      }
    ]
  },
  "lms": {
    id: "lms",
    title: "Learning Management System",
    metaTitle: "Custom Learning Management System (LMS) | eVeda",
    metaDesc: "Launch your own online academy or corporate training portal with our white-label LMS.",
    headline: "Empower Your Team with Scalable E-Learning",
    description: "A complete LMS featuring course builders, video hosting, quizzes, and automated certifications.",
    iconName: "graduation-cap",
    accent: "#F59E0B",
    gradient: "rgba(245, 158, 11, 0.15)",
    features: ["Video Hosting", "Quiz & Assessment Engine", "Student Progress Tracking", "Automated Certification"],
    pricing: [
      {
        tier: "Starter Academy",
        price: "₹15,000 / month",
        desc: "Best for individual creators or small coaching centers launch their online classes.",
        features: [
          "Up to 200 Students",
          "10 Course Categories",
          "Standard Video Hosting (100GB)",
          "Automatic Course Certificates",
          "Email & Ticket Support"
        ]
      },
      {
        tier: "Growth Portal",
        price: "₹38,000 / month",
        desc: "Designed for professional institutions or corporate employee training.",
        features: [
          "Up to 1,500 Students",
          "Unlimited Courses & Tests",
          "Advanced Live Classes (Zoom Sync)",
          "Granular Progress Analytics",
          "Custom Domain Branding",
          "24/7 Priority Support SLA"
        ]
      },
      {
        tier: "Enterprise LMS",
        price: "Contact for Quote",
        desc: "Custom multi-tenant setup for large universities or multi-national corporations.",
        features: [
          "Unlimited Students",
          "Uncapped Storage & Bandwidth",
          "White-labeled Mobile Apps",
          "HRMS & ERP Sync Integration",
          "Dedicated Solutions Engineer",
          "Active Directory / SSO Login"
        ]
      }
    ],
    bentoFeatures: [
      {
        iconName: "graduation",
        title: "Intelligent Course Builder",
        description: "Organize course units, upload high-definition video resources, build assignments, and setup drip content schedules dynamically.",
        colSpan: "md:col-span-8",
        colorClasses: "bg-amber-50 border-amber-100 text-amber-600 group-hover:bg-amber-600 group-hover:text-white group-hover:border-amber-600",
        borderHover: "hover:border-amber-300 hover:shadow-[0_20px_50px_rgba(245,158,11,0.06)]",
        glowGradient: "from-amber-50/0 via-transparent to-amber-500/[0.02]",
        textHover: "group-hover:text-amber-600"
      },
      {
        iconName: "video",
        title: "Live Classes Integration",
        description: "Conduct high-quality interactive virtual lectures natively inside the app with integrated Zoom, Teams, or custom RTC connections.",
        colSpan: "md:col-span-4",
        colorClasses: "bg-amber-50 border-amber-100 text-amber-600 group-hover:bg-amber-600 group-hover:text-white group-hover:border-amber-600",
        borderHover: "hover:border-amber-300 hover:shadow-[0_20px_50px_rgba(245,158,11,0.06)]",
        glowGradient: "from-amber-50/0 via-transparent to-amber-500/[0.02]",
        textHover: "group-hover:text-amber-600"
      },
      {
        iconName: "shield",
        title: "Anti-Piracy Safeguards",
        description: "Protect intellectual property with video watermarking, screen recording blocks, and single-device login restrictions.",
        colSpan: "md:col-span-4",
        colorClasses: "bg-amber-50 border-amber-100 text-amber-600 group-hover:bg-amber-600 group-hover:text-white group-hover:border-amber-600",
        borderHover: "hover:border-amber-300 hover:shadow-[0_20px_50px_rgba(245,158,11,0.06)]",
        glowGradient: "from-amber-50/0 via-transparent to-amber-500/[0.02]",
        textHover: "group-hover:text-amber-600"
      },
      {
        iconName: "activity",
        title: "Progress Reporting",
        description: "Review detailed student analytics including watch duration, quiz logs, assignment scores, and portal logins.",
        colSpan: "md:col-span-4",
        colorClasses: "bg-amber-50 border-amber-100 text-amber-600 group-hover:bg-amber-600 group-hover:text-white group-hover:border-amber-600",
        borderHover: "hover:border-amber-300 hover:shadow-[0_20px_50px_rgba(245,158,11,0.06)]",
        glowGradient: "from-amber-50/0 via-transparent to-amber-500/[0.02]",
        textHover: "group-hover:text-amber-600"
      },
      {
        iconName: "award",
        title: "Automated Certificates",
        description: "Deploy custom verification codes on certificates, automatically generated immediately upon course module completion.",
        colSpan: "md:col-span-4",
        colorClasses: "bg-amber-50 border-amber-100 text-amber-600 group-hover:bg-amber-600 group-hover:text-white group-hover:border-amber-600",
        borderHover: "hover:border-amber-300 hover:shadow-[0_20px_50px_rgba(245,158,11,0.06)]",
        glowGradient: "from-amber-50/0 via-transparent to-amber-500/[0.02]",
        textHover: "group-hover:text-amber-600"
      },
      {
        iconName: "mobile",
        title: "Cross-Platform Access",
        description: "Let students view content on custom web portals or white-labeled native Android and iOS mobile applications.",
        colSpan: "md:col-span-4",
        colorClasses: "bg-amber-50 border-amber-100 text-amber-600 group-hover:bg-amber-600 group-hover:text-white group-hover:border-amber-600",
        borderHover: "hover:border-amber-300 hover:shadow-[0_20px_50px_rgba(245,158,11,0.06)]",
        glowGradient: "from-amber-50/0 via-transparent to-amber-500/[0.02]",
        textHover: "group-hover:text-amber-600"
      },
      {
        iconName: "users",
        title: "Multi-Tenant Portals",
        description: "Launch separate sub-academies for corporate clients, each branded custom with distinct user bases and course access rules.",
        colSpan: "md:col-span-8",
        colorClasses: "bg-amber-50 border-amber-100 text-amber-600 group-hover:bg-amber-600 group-hover:text-white group-hover:border-amber-600",
        borderHover: "hover:border-amber-300 hover:shadow-[0_20px_50px_rgba(245,158,11,0.06)]",
        glowGradient: "from-amber-50/0 via-transparent to-amber-500/[0.02]",
        textHover: "group-hover:text-amber-600"
      }
    ],
    faqs: [
      {
        question: "Can we sell courses using the LMS?",
        answer: "Yes, our LMS integrates with Razorpay, Stripe, and PayPal out of the box, allowing you to accept secure credit card, UPI, and netbanking payments."
      },
      {
        question: "Is there a limit to course uploads?",
        answer: "Our cloud plans offer generous video hosting space, and we also support integrating your own AWS S3 or Vimeo Pro accounts for unlimited media storage."
      },
      {
        question: "Do you support interactive quizzes?",
        answer: "Absolutely. You can build multiple-choice questions, descriptive assignments, and timed tests, with automatic grading configurations."
      }
    ]
  },
  "hms": {
    id: "hms",
    title: "Hospital Management System",
    metaTitle: "Hospital Management System (HMS) | eVeda",
    metaDesc: "End-to-end HMS software for clinics, nursing homes, and multi-specialty hospitals.",
    headline: "Streamline Healthcare Operations",
    description: "Manage patient records, appointments, billing, and pharmacy inventory all from a single dashboard.",
    iconName: "activity",
    accent: "#EF4444",
    gradient: "rgba(239, 68, 68, 0.15)",
    features: ["EHR Management", "Doctor Appointments", "Pharmacy Inventory", "Lab Result Portals"],
    pricing: [
      {
        tier: "Clinic Pro",
        price: "₹22,000 / month",
        desc: "Designed for private clinics or diagnostic facilities streamlining standard routines.",
        features: [
          "Up to 10 Doctor Accounts",
          "Patient EHR & Intake Logs",
          "Appointment Scheduler API",
          "Basic Billing & OPD Invoice",
          "Email & WhatsApp Alerts"
        ]
      },
      {
        tier: "Hospital Core",
        price: "₹65,000 / month",
        desc: "Ideal for mid-sized multi-specialty nursing homes and corporate hospitals.",
        features: [
          "Up to 60 Doctor Accounts",
          "IPD/OPD Admission Manager",
          "Ward & Bed Allocator Grid",
          "Pharmacy & Lab Inventory Sync",
          "TPA / Corporate Insurance billing",
          "24/7 Hospital SLA Support"
        ]
      },
      {
        tier: "Enterprise Health",
        price: "Contact for Quote",
        desc: "Fully customized multi-chain hospital ERP systems requiring custom deployments.",
        features: [
          "Unlimited Doctors & Staff",
          "Custom DICOM PACS Integration",
          "On-Premises Server Deployments",
          "HL7 & HIPAA Compliance Setups",
          "Dedicated Success Manager",
          "Custom API Connections"
        ]
      }
    ],
    bentoFeatures: [
      {
        iconName: "activity",
        title: "Intelligent Patient EMR/EHR",
        description: "Store history logs, diagnosis charts, prescriptions, and lab uploads securely. HIPAA compliant data structure and tracking.",
        colSpan: "md:col-span-8",
        colorClasses: "bg-red-55 border-red-100 text-red-600 group-hover:bg-red-600 group-hover:text-white group-hover:border-red-600",
        borderHover: "hover:border-red-300 hover:shadow-[0_20px_50px_rgba(239,68,68,0.06)]",
        glowGradient: "from-red-50/0 via-transparent to-red-500/[0.02]",
        textHover: "group-hover:text-red-600"
      },
      {
        iconName: "calendar",
        title: "OPD/IPD Queue Scheduler",
        description: "Manage walk-ins, online bookings, and emergency admissions. Live display queues for department waiting rooms.",
        colSpan: "md:col-span-4",
        colorClasses: "bg-red-55 border-red-100 text-red-600 group-hover:bg-red-600 group-hover:text-white group-hover:border-red-600",
        borderHover: "hover:border-red-300 hover:shadow-[0_20px_50px_rgba(239,68,68,0.06)]",
        glowGradient: "from-red-50/0 via-transparent to-red-500/[0.02]",
        textHover: "group-hover:text-red-600"
      },
      {
        iconName: "dollar",
        title: "OPD/IPD Billing Engine",
        description: "Calculate consultation fees, diagnostic fees, bed rates, medicine inventory taxes, and insurance splits automatically.",
        colSpan: "md:col-span-4",
        colorClasses: "bg-red-55 border-red-100 text-red-600 group-hover:bg-red-600 group-hover:text-white group-hover:border-red-600",
        borderHover: "hover:border-red-300 hover:shadow-[0_20px_50px_rgba(239,68,68,0.06)]",
        glowGradient: "from-red-50/0 via-transparent to-red-500/[0.02]",
        textHover: "group-hover:text-red-600"
      },
      {
        iconName: "box",
        title: "Pharmacy & Lab Inventory",
        description: "Track expiry dates, monitor inventory thresholds, and dispatch order lists automatically when stock gets low.",
        colSpan: "md:col-span-4",
        colorClasses: "bg-red-55 border-red-100 text-red-600 group-hover:bg-red-600 group-hover:text-white group-hover:border-red-600",
        borderHover: "hover:border-red-300 hover:shadow-[0_20px_50px_rgba(239,68,68,0.06)]",
        glowGradient: "from-red-50/0 via-transparent to-red-500/[0.02]",
        textHover: "group-hover:text-red-600"
      },
      {
        iconName: "plus",
        title: "Interactive Bed Allocator",
        description: "Get real-time visualizations of ward capacities, available rooms, ICU slots, and active nurse assignments.",
        colSpan: "md:col-span-4",
        colorClasses: "bg-red-55 border-red-100 text-red-600 group-hover:bg-red-600 group-hover:text-white group-hover:border-red-600",
        borderHover: "hover:border-red-300 hover:shadow-[0_20px_50px_rgba(239,68,68,0.06)]",
        glowGradient: "from-red-50/0 via-transparent to-red-500/[0.02]",
        textHover: "group-hover:text-red-600"
      },
      {
        iconName: "mobile",
        title: "Patient Portal Web App",
        description: "Let patients download prescriptions, view billing histories, check lab results, and book appointments securely.",
        colSpan: "md:col-span-4",
        colorClasses: "bg-red-55 border-red-100 text-red-600 group-hover:bg-red-600 group-hover:text-white group-hover:border-red-600",
        borderHover: "hover:border-red-300 hover:shadow-[0_20px_50px_rgba(239,68,68,0.06)]",
        glowGradient: "from-red-50/0 via-transparent to-red-500/[0.02]",
        textHover: "group-hover:text-red-600"
      },
      {
        iconName: "users",
        title: "Doctor consultation rooms",
        description: "Integrate high-definition video consultations with secure prescription dispatch for tele-medicine.",
        colSpan: "md:col-span-8",
        colorClasses: "bg-red-55 border-red-100 text-red-600 group-hover:bg-red-600 group-hover:text-white group-hover:border-red-600",
        borderHover: "hover:border-red-300 hover:shadow-[0_20px_50px_rgba(239,68,68,0.06)]",
        glowGradient: "from-red-50/0 via-transparent to-red-500/[0.02]",
        textHover: "group-hover:text-red-600"
      }
    ],
    faqs: [
      {
        question: "Is our medical data secure and compliant?",
        answer: "Yes, our database architectures use complete encryption at rest and in transit. We maintain detailed audit logs and satisfy HIPAA guidelines."
      },
      {
        question: "Can we integrate diagnostic machinery (PACS)?",
        answer: "Yes, our enterprise plan supports custom DICOM and PACS server integrations, bringing medical scans directly into patient EMR files."
      },
      {
        question: "Do you support TPA and Insurance billing?",
        answer: "Yes. Our billing module includes multi-layered claim templates supporting insurance approvals, copays, and deductions."
      }
    ]
  },
  "ott": {
    id: "ott",
    title: "OTT Platforms",
    metaTitle: "Custom OTT Platform Development | eVeda",
    metaDesc: "Launch your own Netflix-like video streaming platform with DRM and subscription management.",
    headline: "Launch Your Own Video Streaming Empire",
    description: "Build robust, scalable OTT apps for Web, iOS, Android, and Smart TVs with premium DRM protection.",
    iconName: "monitor-play",
    accent: "#8B5CF6",
    gradient: "rgba(139, 92, 246, 0.15)",
    features: ["Multi-bitrate Streaming", "DRM Protection", "Subscription Billing", "Smart TV Apps"],
    pricing: [
      {
        tier: "Streamer Base",
        price: "₹30,000 / month",
        desc: "Perfect for content creators or independent studios starting their own subscription video portal.",
        features: [
          "Web & Mobile Responsive Apps",
          "Up to 5,000 Active Members",
          "HLS Transcoding (1080p max)",
          "Promo Codes & Coupons",
          "Standard Email Support"
        ]
      },
      {
        tier: "Media Network",
        price: "₹75,005 / month",
        desc: "Designed for premium regional channels, entertainment brands, or broad production networks.",
        features: [
          "Native iOS, Android & TV Apps",
          "Up to 50,000 Active Members",
          "Secure DRM Protection (Widevine)",
          "Live Channels & Event Broadcasts",
          "Ad Server Integration (AVOD)",
          "24/7 Media Escalation SLA"
        ]
      },
      {
        tier: "Broadcaster Pro",
        price: "Contact for Quote",
        desc: "Custom global scale video delivery network supporting millions of concurrent streams.",
        features: [
          "Unlimited Active Members",
          "Multi-CDN Live Failovers",
          "Studio-Grade DRM & Watermarking",
          "Custom UI/UX & Player Features",
          "Dedicated Platform Engineer",
          "Direct Telecommunications Sync"
        ]
      }
    ],
    bentoFeatures: [
      {
        iconName: "tv",
        title: "Multi-Platform Deployments",
        description: "Deploy premium video playback applications natively across Web, iOS, Android, Apple TV, Android TV, Fire TV, and Samsung Tizen.",
        colSpan: "md:col-span-8",
        colorClasses: "bg-purple-50 border-purple-100 text-purple-650 group-hover:bg-purple-600 group-hover:text-white group-hover:border-purple-600",
        borderHover: "hover:border-purple-300 hover:shadow-[0_20px_50px_rgba(139,92,246,0.06)]",
        glowGradient: "from-purple-50/0 via-transparent to-purple-500/[0.02]",
        textHover: "group-hover:text-purple-600"
      },
      {
        iconName: "lock",
        title: "Studio-Grade DRM Securing",
        description: "Protect premium catalog assets from illegal screen rips with certified Google Widevine, Apple FairPlay, and Microsoft PlayReady encryptions.",
        colSpan: "md:col-span-4",
        colorClasses: "bg-purple-50 border-purple-100 text-purple-650 group-hover:bg-purple-600 group-hover:text-white group-hover:border-purple-600",
        borderHover: "hover:border-purple-300 hover:shadow-[0_20px_50px_rgba(139,92,246,0.06)]",
        glowGradient: "from-purple-50/0 via-transparent to-purple-500/[0.02]",
        textHover: "group-hover:text-purple-600"
      },
      {
        iconName: "card",
        title: "Flexible Monetization (SVOD/TVOD)",
        description: "Setup custom subscription tiers (SVOD), pay-per-view rentals (TVOD), or free ad-supported schedules (AVOD/FAST).",
        colSpan: "md:col-span-4",
        colorClasses: "bg-purple-50 border-purple-100 text-purple-650 group-hover:bg-purple-600 group-hover:text-white group-hover:border-purple-600",
        borderHover: "hover:border-purple-300 hover:shadow-[0_20px_50px_rgba(139,92,246,0.06)]",
        glowGradient: "from-purple-50/0 via-transparent to-purple-500/[0.02]",
        textHover: "group-hover:text-purple-600"
      },
      {
        iconName: "refresh",
        title: "Transcoding Pipeline",
        description: "Convert uploads to HLS/DASH profiles automatically, optimizing resolution based on cellular and broadband connections.",
        colSpan: "md:col-span-4",
        colorClasses: "bg-purple-50 border-purple-100 text-purple-650 group-hover:bg-purple-600 group-hover:text-white group-hover:border-purple-600",
        borderHover: "hover:border-purple-300 hover:shadow-[0_20px_50px_rgba(139,92,246,0.06)]",
        glowGradient: "from-purple-50/0 via-transparent to-purple-500/[0.02]",
        textHover: "group-hover:text-purple-600"
      },
      {
        iconName: "activity",
        title: "Analytics Console",
        description: "Monitor watch times, active users, drop-off rates, buffer stats, device distribution, and revenue gains in real-time.",
        colSpan: "md:col-span-4",
        colorClasses: "bg-purple-50 border-purple-100 text-purple-650 group-hover:bg-purple-600 group-hover:text-white group-hover:border-purple-600",
        borderHover: "hover:border-purple-300 hover:shadow-[0_20px_50px_rgba(139,92,246,0.06)]",
        glowGradient: "from-purple-50/0 via-transparent to-purple-500/[0.02]",
        textHover: "group-hover:text-purple-600"
      },
      {
        iconName: "mobile",
        title: "Offline Video Downloads",
        description: "Let users save media directly to local mobile storage inside the application for offline playback.",
        colSpan: "md:col-span-4",
        colorClasses: "bg-purple-50 border-purple-100 text-purple-650 group-hover:bg-purple-600 group-hover:text-white group-hover:border-purple-600",
        borderHover: "hover:border-purple-300 hover:shadow-[0_20px_50px_rgba(139,92,246,0.06)]",
        glowGradient: "from-purple-50/0 via-transparent to-purple-500/[0.02]",
        textHover: "group-hover:text-purple-600"
      },
      {
        iconName: "play",
        title: "Custom Built Player SDK",
        description: "Deploy dynamic subtitle rendering, audio track switches, PIP mode support, and playback rate adjustments.",
        colSpan: "md:col-span-8",
        colorClasses: "bg-purple-50 border-purple-100 text-purple-650 group-hover:bg-purple-600 group-hover:text-white group-hover:border-purple-600",
        borderHover: "hover:border-purple-300 hover:shadow-[0_20px_50px_rgba(139,92,246,0.06)]",
        glowGradient: "from-purple-50/0 via-transparent to-purple-500/[0.02]",
        textHover: "group-hover:text-purple-600"
      }
    ],
    faqs: [
      {
        question: "How do we prevent illegal file sharing?",
        answer: "We integrate studio-standard digital rights management (DRM) which blocks browser extensions, video grabbers, and device-level screen captures."
      },
      {
        question: "Can we support live sports streaming?",
        answer: "Yes, our broadcaster architecture supports high-concurrency RTMP ingest points, dynamic transcoding, and ultra-low latency live outputs."
      },
      {
        question: "What CDN networks do you deploy?",
        answer: "We route streams through multi-tier Content Delivery Networks (AWS CloudFront, Cloudflare, Akamai) ensuring high speed globally."
      }
    ]
  },
  "school-erp": {
    id: "school-erp",
    title: "School Management System",
    metaTitle: "School Management ERP | eVeda",
    metaDesc: "Digitalize your school campus with our comprehensive ERP. Manage admissions, fees, and academics.",
    headline: "The Complete Digital Campus ERP",
    description: "Automate fee collection, attendance, timetables, and parent communication securely.",
    iconName: "school",
    accent: "#10B981",
    gradient: "rgba(16, 185, 129, 0.15)",
    features: ["Fee Management", "Student Attendance", "Parent Portal App", "Timetable Generation"],
    pricing: [
      {
        tier: "Standard Campus",
        price: "₹12,000 / month",
        desc: "Ideal for single-branch schools and institutes managing basic academic logistics.",
        features: [
          "Up to 500 Students",
          "OPD & Fee Collection Portal",
          "Granular Attendance Logging",
          "Homework & Report Card generation",
          "Email Support & Core SMS alerts"
        ]
      },
      {
        tier: "Academic Pro",
        price: "₹32,000 / month",
        desc: "Designed for comprehensive private academies seeking complete digitalisation.",
        features: [
          "Up to 2,500 Students",
          "Online Admission Manager",
          "Library & Roster inventory trackers",
          "Hostel & GPS Bus Tracker Sync",
          "Custom Parent Mobile App",
          "24/7 Priority Support SLA"
        ]
      },
      {
        tier: "Institutional ERP",
        price: "Contact for Quote",
        desc: "Advanced enterprise scaling systems for universities and multi-branch school organizations.",
        features: [
          "Unlimited Students & Branches",
          "Custom Finance & Ledger Integrations",
          "Biometric Attendance hardware sync",
          "dedicated DB instances",
          "Dedicated Success Manager",
          "Custom API and CRM Pipelines"
        ]
      }
    ],
    bentoFeatures: [
      {
        iconName: "school",
        title: "Academics & Timetable Engine",
        description: "Construct conflict-free weekly timetables, manage teacher rosters, assign classroom sections, and register subject maps dynamically.",
        colSpan: "md:col-span-8",
        colorClasses: "bg-emerald-50 border-emerald-100 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600",
        borderHover: "hover:border-emerald-300 hover:shadow-[0_20px_50px_rgba(16,185,129,0.06)]",
        glowGradient: "from-emerald-50/0 via-transparent to-emerald-500/[0.02]",
        textHover: "group-hover:text-emerald-600"
      },
      {
        iconName: "dollar",
        title: "Automated Fee Collector",
        description: "Deploy dynamic fee configurations, send recurring auto-reminders to parents, and process UPI payments instantly.",
        colSpan: "md:col-span-4",
        colorClasses: "bg-emerald-50 border-emerald-100 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600",
        borderHover: "hover:border-emerald-300 hover:shadow-[0_20px_50px_rgba(16,185,129,0.06)]",
        glowGradient: "from-emerald-50/0 via-transparent to-emerald-500/[0.02]",
        textHover: "group-hover:text-emerald-600"
      },
      {
        iconName: "sheet",
        title: "Report Cards & Marksheets",
        description: "Compute grades automatically, print formatted PDF reports, and broadcast test scores to parent portals.",
        colSpan: "md:col-span-4",
        colorClasses: "bg-emerald-50 border-emerald-100 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600",
        borderHover: "hover:border-emerald-300 hover:shadow-[0_20px_50px_rgba(16,185,129,0.06)]",
        glowGradient: "from-emerald-50/0 via-transparent to-emerald-500/[0.02]",
        textHover: "group-hover:text-emerald-600"
      },
      {
        iconName: "activity",
        title: "Attendance Sync (RFID/Face)",
        description: "Sync classroom attendance logs automatically via RFID cards, fingerprint scanners, or facial recognition hardware.",
        colSpan: "md:col-span-4",
        colorClasses: "bg-emerald-50 border-emerald-100 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600",
        borderHover: "hover:border-emerald-300 hover:shadow-[0_20px_50px_rgba(16,185,129,0.06)]",
        glowGradient: "from-emerald-50/0 via-transparent to-emerald-500/[0.02]",
        textHover: "group-hover:text-emerald-600"
      },
      {
        iconName: "pin",
        title: "GPS Bus Tracking",
        description: "Let parents monitor active school bus locations in real-time, receiving proximity alerts when the vehicle approaches.",
        colSpan: "md:col-span-4",
        colorClasses: "bg-emerald-50 border-emerald-100 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600",
        borderHover: "hover:border-emerald-300 hover:shadow-[0_20px_50px_rgba(16,185,129,0.06)]",
        glowGradient: "from-emerald-50/0 via-transparent to-emerald-500/[0.02]",
        textHover: "group-hover:text-emerald-600"
      },
      {
        iconName: "mobile",
        title: "Dedicated Parent Mobile App",
        description: "Single access portal for fee transactions, teacher chats, holiday notices, and student progress reports.",
        colSpan: "md:col-span-4",
        colorClasses: "bg-emerald-50 border-emerald-100 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600",
        borderHover: "hover:border-emerald-300 hover:shadow-[0_20px_50px_rgba(16,185,129,0.06)]",
        glowGradient: "from-emerald-50/0 via-transparent to-emerald-500/[0.02]",
        textHover: "group-hover:text-emerald-600"
      },
      {
        iconName: "box",
        title: "Library & Hostel Inventory",
        description: "Track textbook issuance logs, catalog available rooms, manage mess menus, and log hostel attendance reports.",
        colSpan: "md:col-span-8",
        colorClasses: "bg-emerald-50 border-emerald-100 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600",
        borderHover: "hover:border-emerald-300 hover:shadow-[0_20px_50px_rgba(16,185,129,0.06)]",
        glowGradient: "from-emerald-50/0 via-transparent to-emerald-500/[0.02]",
        textHover: "group-hover:text-emerald-600"
      }
    ],
    faqs: [
      {
        question: "Can we migrate student records from our current system?",
        answer: "Yes, we provide migration templates and script imports to quickly import existing data from Excel, CSV, or legacy databases."
      },
      {
        question: "Is there a limit to SMS or email notifications?",
        answer: "Our plans include generous limits. We also support direct integrations with Twilio, MSG91, or custom gateway APIs."
      },
      {
        question: "Does the ERP support multiple school branches?",
        answer: "Yes, our Institutional ERP allows administrators to manage academic schedules and financial ledgers across multiple branches from one login."
      }
    ]
  },
  "marketplace": {
    id: "marketplace",
    title: "Marketplace Solutions",
    metaTitle: "Multi-vendor Marketplace Development | eVeda",
    metaDesc: "Launch your own B2B or B2C multi-vendor marketplace like Amazon or Upwork.",
    headline: "Build Your Multi-Vendor Marketplace",
    description: "Robust platform to onboard multiple sellers, manage commissions, and track global fulfillment.",
    iconName: "store",
    accent: "#F97316",
    gradient: "rgba(249, 115, 22, 0.15)",
    features: ["Vendor Dashboards", "Commission Splits", "Multi-currency Support", "Dispute Resolution"],
    pricing: [
      {
        tier: "Marketplace Launch",
        price: "₹35,000 / month",
        desc: "Ideal for starting a localized multi-vendor platform or boutique marketplace.",
        features: [
          "Up to 50 Active Vendors",
          "Dedicated Vendor Dashboards",
          "Automated Commission Splits",
          "Standard Payment Gateways",
          "Email & Ticket Support"
        ]
      },
      {
        tier: "Marketplace Scale",
        price: "₹85,000 / month",
        desc: "Designed for professional B2C or B2B platforms expanding nationwide.",
        features: [
          "Up to 1,000 Active Vendors",
          "Advanced Shipping Partner API",
          "Escrow & Hold Settlement rules",
          "Product Bulk Upload & OCR parser",
          "Custom SEO Landing pages",
          "24/7 Platform SLA Support"
        ]
      },
      {
        tier: "Global Enterprise",
        price: "Contact for Quote",
        desc: "High-performance custom architecture built for global scale and operations.",
        features: [
          "Unlimited Vendors & Sellers",
          "Dedicated Database Cluster",
          "Multi-currency & Cross-border checkout",
          "White-labeled Vendor Mobile apps",
          "Dedicated Platform Engineer",
          "Custom CRM Integration"
        ]
      }
    ],
    bentoFeatures: [
      {
        iconName: "users",
        title: "Bespoke Vendor Dashboards",
        description: "Onboard independent sellers, letting them list items, set shipping parameters, track sales, and review payouts.",
        colSpan: "md:col-span-8",
        colorClasses: "bg-orange-50 border-orange-100 text-orange-600 group-hover:bg-orange-600 group-hover:text-white group-hover:border-orange-600",
        borderHover: "hover:border-orange-300 hover:shadow-[0_20px_50px_rgba(249,115,22,0.06)]",
        glowGradient: "from-orange-50/0 via-transparent to-orange-500/[0.02]",
        textHover: "group-hover:text-orange-600"
      },
      {
        iconName: "dollar",
        title: "Automated Commission Splits",
        description: "Distribute split balances automatically to vendors via Stripe Connect or Razorpay Route, routing platform cuts immediately.",
        colSpan: "md:col-span-4",
        colorClasses: "bg-orange-50 border-orange-100 text-orange-600 group-hover:bg-orange-600 group-hover:text-white group-hover:border-orange-600",
        borderHover: "hover:border-orange-300 hover:shadow-[0_20px_50px_rgba(249,115,22,0.06)]",
        glowGradient: "from-orange-50/0 via-transparent to-orange-500/[0.02]",
        textHover: "group-hover:text-orange-600"
      },
      {
        iconName: "truck",
        title: "Logistics Partner SDKs",
        description: "Integrate Shippo, Shiprocket, or Delhivery to compute real-time shipping costs, print labels, and dispatch tracking details.",
        colSpan: "md:col-span-4",
        colorClasses: "bg-orange-50 border-orange-100 text-orange-600 group-hover:bg-orange-600 group-hover:text-white group-hover:border-orange-600",
        borderHover: "hover:border-orange-300 hover:shadow-[0_20px_50px_rgba(249,115,22,0.06)]",
        glowGradient: "from-orange-50/0 via-transparent to-orange-500/[0.02]",
        textHover: "group-hover:text-orange-600"
      },
      {
        iconName: "shield",
        title: "Escrow & Dispute Controls",
        description: "Protect transactions with custom holding rule sets, releasing payments to vendors only after positive customer delivery.",
        colSpan: "md:col-span-4",
        colorClasses: "bg-orange-50 border-orange-100 text-orange-600 group-hover:bg-orange-600 group-hover:text-white group-hover:border-orange-600",
        borderHover: "hover:border-orange-300 hover:shadow-[0_20px_50px_rgba(249,115,22,0.06)]",
        glowGradient: "from-orange-50/0 via-transparent to-orange-500/[0.02]",
        textHover: "group-hover:text-orange-600"
      },
      {
        iconName: "chart",
        title: "Advanced Vendor Analytics",
        description: "Empower sellers with sales graphs, inventory speed charts, click-through metrics, and average order values.",
        colSpan: "md:col-span-4",
        colorClasses: "bg-orange-50 border-orange-100 text-orange-600 group-hover:bg-orange-600 group-hover:text-white group-hover:border-orange-600",
        borderHover: "hover:border-orange-300 hover:shadow-[0_20px_50px_rgba(249,115,22,0.06)]",
        glowGradient: "from-orange-50/0 via-transparent to-orange-500/[0.02]",
        textHover: "group-hover:text-orange-600"
      },
      {
        iconName: "mobile",
        title: "Buyer Mobile Applications",
        description: "Launch native mobile applications to let consumers purchase, review, and track orders securely.",
        colSpan: "md:col-span-4",
        colorClasses: "bg-orange-50 border-orange-100 text-orange-600 group-hover:bg-orange-600 group-hover:text-white group-hover:border-orange-600",
        borderHover: "hover:border-orange-300 hover:shadow-[0_20px_50px_rgba(249,115,22,0.06)]",
        glowGradient: "from-orange-50/0 via-transparent to-orange-500/[0.02]",
        textHover: "group-hover:text-orange-600"
      },
      {
        iconName: "search",
        title: "Intelligent Elastic Search",
        description: "Deploy lightning-fast product search queries using Algolia or ElasticSearch, returning dynamic category facets.",
        colSpan: "md:col-span-8",
        colorClasses: "bg-orange-50 border-orange-100 text-orange-600 group-hover:bg-orange-600 group-hover:text-white group-hover:border-orange-600",
        borderHover: "hover:border-orange-300 hover:shadow-[0_20px_50px_rgba(249,115,22,0.06)]",
        glowGradient: "from-orange-50/0 via-transparent to-orange-500/[0.02]",
        textHover: "group-hover:text-orange-600"
      }
    ],
    faqs: [
      {
        question: "How do payouts route to vendors?",
        answer: "We configure automated split payment systems (Stripe Connect, Razorpay Route) that transfer balances to vendor accounts after checking platform rules."
      },
      {
        question: "Does it support custom tax calculations?",
        answer: "Yes, the marketplace ERP can calculate dynamic GST/VAT rules based on vendor origin, customer shipping location, and product HS codes."
      },
      {
        question: "Can we moderate vendor products?",
        answer: "Absolutely. Admins have access to a central moderation dashboard to approve, reject, or edit vendor catalog lists."
      }
    ]
  },
  "pos": {
    id: "pos",
    title: "Point of Sale (POS)",
    metaTitle: "Cloud Point of Sale (POS) Software | eVeda",
    metaDesc: "Fast, reliable cloud POS for retail and restaurants with offline support and inventory sync.",
    headline: "Modern Cloud POS for Retail & Restaurants",
    description: "A lightning-fast billing solution with hardware integration, offline mode, and real-time inventory.",
    iconName: "calculator",
    accent: "#0EA5E9",
    gradient: "rgba(14, 165, 233, 0.15)",
    features: ["Barcode Scanning", "Offline Mode", "Hardware Integration", "Daily Sales Analytics"],
    pricing: [
      {
        tier: "Single Outlet",
        price: "₹8,000 / month",
        desc: "Ideal for retail shops, cafes, or boutiques managing billing on a single register.",
        features: [
          "1 Register Connection",
          "Offline Billing Capabilities",
          "Barcode Scanner Support",
          "Receipt Template Editor",
          "Email Daily Sales Summary"
        ]
      },
      {
        tier: "Multi-Store Pro",
        price: "₹24,000 / month",
        desc: "Designed for growing retail chains or full-service restaurants requiring central tracking.",
        features: [
          "Up to 10 Outlets / Registers",
          "Real-time central inventory sync",
          "Table Layout & KDS (Kitchen Display)",
          "Customer Loyalty & Coupon module",
          "Integrates Razorpay Card POS",
          "24/7 Technical SLA Support"
        ]
      },
      {
        tier: "Enterprise POS",
        price: "Contact for Quote",
        desc: "Custom high-concurrency billing systems for major supermarkets or franchise chains.",
        features: [
          "Unlimited Registers & Outlets",
          "Dedicated Offline Sync Engine",
          "Custom ERP & SAP API integrations",
          "Dedicated Database Instance",
          "Dedicated Success Manager",
          "Custom Hardware integrations"
        ]
      }
    ],
    bentoFeatures: [
      {
        iconName: "cart",
        title: "Lightning-Fast Billing Panel",
        description: "Process orders in sub-seconds. Add items, apply discounts, select payment options, and print receipts instantly.",
        colSpan: "md:col-span-8",
        colorClasses: "bg-sky-50 border-sky-100 text-sky-600 group-hover:bg-sky-600 group-hover:text-white group-hover:border-sky-600",
        borderHover: "hover:border-sky-300 hover:shadow-[0_20px_50px_rgba(14,165,233,0.06)]",
        glowGradient: "from-sky-50/0 via-transparent to-sky-500/[0.02]",
        textHover: "group-hover:text-sky-600"
      },
      {
        iconName: "lock",
        title: "Reliable Offline Mode",
        description: "Keep billing even when the internet drops. Sales logs sync back to the cloud automatically once connection returns.",
        colSpan: "md:col-span-4",
        colorClasses: "bg-sky-50 border-sky-100 text-sky-600 group-hover:bg-sky-600 group-hover:text-white group-hover:border-sky-600",
        borderHover: "hover:border-sky-300 hover:shadow-[0_20px_50px_rgba(14,165,233,0.06)]",
        glowGradient: "from-sky-50/0 via-transparent to-sky-500/[0.02]",
        textHover: "group-hover:text-sky-600"
      },
      {
        iconName: "search",
        title: "Barcode Scanner Integrations",
        description: "Connect standard USB or Bluetooth scanners natively to scan items and search product codes dynamically.",
        colSpan: "md:col-span-4",
        colorClasses: "bg-sky-50 border-sky-100 text-sky-600 group-hover:bg-sky-600 group-hover:text-white group-hover:border-sky-600",
        borderHover: "hover:border-sky-300 hover:shadow-[0_20px_50px_rgba(14,165,233,0.06)]",
        glowGradient: "from-sky-50/0 via-transparent to-sky-500/[0.02]",
        textHover: "group-hover:text-sky-600"
      },
      {
        iconName: "box",
        title: "Outlet Inventory Sync",
        description: "Deduct stocks in real-time as bills are settled, ensuring accurate multi-warehouse product audits.",
        colSpan: "md:col-span-4",
        colorClasses: "bg-sky-50 border-sky-100 text-sky-600 group-hover:bg-sky-600 group-hover:text-white group-hover:border-sky-600",
        borderHover: "hover:border-sky-300 hover:shadow-[0_20px_50px_rgba(14,165,233,0.06)]",
        glowGradient: "from-sky-50/0 via-transparent to-sky-500/[0.02]",
        textHover: "group-hover:text-sky-600"
      },
      {
        iconName: "percent",
        title: "Loyalty & Promo Engine",
        description: "Store customer profiles, compute shopping points, and apply custom promo codes dynamically during billing.",
        colSpan: "md:col-span-4",
        colorClasses: "bg-sky-50 border-sky-100 text-sky-600 group-hover:bg-sky-600 group-hover:text-white group-hover:border-sky-600",
        borderHover: "hover:border-sky-300 hover:shadow-[0_20px_50px_rgba(14,165,233,0.06)]",
        glowGradient: "from-sky-50/0 via-transparent to-sky-500/[0.02]",
        textHover: "group-hover:text-sky-600"
      },
      {
        iconName: "mobile",
        title: "Mobile POS Application",
        description: "Bill directly on mobile devices, tablet systems, or specialized handheld POS billing machines.",
        colSpan: "md:col-span-4",
        colorClasses: "bg-sky-50 border-sky-100 text-sky-600 group-hover:bg-sky-600 group-hover:text-white group-hover:border-sky-600",
        borderHover: "hover:border-sky-300 hover:shadow-[0_20px_50px_rgba(14,165,233,0.06)]",
        glowGradient: "from-sky-50/0 via-transparent to-sky-500/[0.02]",
        textHover: "group-hover:text-sky-600"
      },
      {
        iconName: "chart",
        title: "Daily Sales Reports",
        description: "Review top selling items, payment splits (Cash, Card, UPI), tax collections, and total cash balances.",
        colSpan: "md:col-span-8",
        colorClasses: "bg-sky-50 border-sky-100 text-sky-600 group-hover:bg-sky-600 group-hover:text-white group-hover:border-sky-600",
        borderHover: "hover:border-sky-300 hover:shadow-[0_20px_50px_rgba(14,165,233,0.06)]",
        glowGradient: "from-sky-50/0 via-transparent to-sky-500/[0.02]",
        textHover: "group-hover:text-sky-600"
      }
    ],
    faqs: [
      {
        question: "Does the POS support thermal receipt printers?",
        answer: "Yes, our POS app integrates natively with standard 80mm/58mm thermal printers (USB, Bluetooth, Ethernet) and cash drawers."
      },
      {
        question: "Can we sync offline billing data securely?",
        answer: "Absolutely. When you reconnect, our offline engine resolves conflicts and updates database ledgers automatically."
      },
      {
        question: "Does it support card terminal integrations?",
        answer: "Yes, we support card payments terminal connections (Plutus, PineLabs, Mswipe) to speed up card payments."
      }
    ]
  },
  "crm": {
    id: "crm",
    title: "CRM System",
    metaTitle: "Custom CRM Software Development | eVeda",
    metaDesc: "Custom Customer Relationship Management software tailored to your specific sales pipeline.",
    headline: "Close More Deals with Custom CRM",
    description: "Track leads, manage pipelines, automate follow-ups, and integrate with WhatsApp & Email.",
    iconName: "users",
    accent: "#EC4899",
    gradient: "rgba(236, 72, 153, 0.15)",
    features: ["Lead Tracking", "Pipeline Management", "Automated Follow-ups", "WhatsApp API"],
    pricing: [
      {
        tier: "Sales Team Starter",
        price: "₹15,000 / month",
        desc: "Ideal for growing sales teams looking to organize lead collection and tracking.",
        features: [
          "Up to 15 User Accounts",
          "Custom Kanban Lead Pipeline",
          "Email & Ticket log tracking",
          "Basic Reporting Dashboard",
          "Standard Email Support"
        ]
      },
      {
        tier: "Growth Sales Suite",
        price: "₹38,000 / month",
        desc: "Designed for performance sales teams needing automation and marketing sync.",
        features: [
          "Up to 100 User Accounts",
          "Multiple Pipeline management",
          "WhatsApp Business API sync",
          "Auto-Assign Round Robin leads",
          "Advanced analytics & commission",
          "24/7 Priority Support SLA"
        ]
      },
      {
        tier: "Custom CRM Enterprise",
        price: "Contact for Quote",
        desc: "Custom corporate sales platforms requiring custom database and workflow routing.",
        features: [
          "Unlimited User Accounts",
          "Dedicated Database Server",
          "On-Premises server setups",
          "Dedicated Success Manager",
          "Custom telephony/Dialer SDK",
          "Integrates ERP ledger systems"
        ]
      }
    ],
    bentoFeatures: [
      {
        iconName: "users",
        title: "Kanban Pipeline Tracker",
        description: "Track sales pipelines visually. Move leads from Intake to Contacted, Quoted, and Closed with simple drag-and-drop actions.",
        colSpan: "md:col-span-8",
        colorClasses: "bg-pink-50 border-pink-100 text-pink-600 group-hover:bg-pink-600 group-hover:text-white group-hover:border-pink-600",
        borderHover: "hover:border-pink-300 hover:shadow-[0_20px_50px_rgba(236,72,153,0.06)]",
        glowGradient: "from-pink-50/0 via-transparent to-pink-500/[0.02]",
        textHover: "group-hover:text-pink-600"
      },
      {
        iconName: "mobile",
        title: "WhatsApp Business API",
        description: "Send automated messages, updates, payment links, and template reminders directly to customers' WhatsApp chats.",
        colSpan: "md:col-span-4",
        colorClasses: "bg-pink-50 border-pink-100 text-pink-600 group-hover:bg-pink-600 group-hover:text-white group-hover:border-pink-600",
        borderHover: "hover:border-pink-300 hover:shadow-[0_20px_50px_rgba(236,72,153,0.06)]",
        glowGradient: "from-pink-50/0 via-transparent to-pink-500/[0.02]",
        textHover: "group-hover:text-pink-600"
      },
      {
        iconName: "refresh",
        title: "Round-Robin Auto Assign",
        description: "Distribute incoming sales queries automatically among available agents based on priority and capacity rules.",
        colSpan: "md:col-span-4",
        colorClasses: "bg-pink-50 border-pink-100 text-pink-600 group-hover:bg-pink-600 group-hover:text-white group-hover:border-pink-600",
        borderHover: "hover:border-pink-300 hover:shadow-[0_20px_50px_rgba(236,72,153,0.06)]",
        glowGradient: "from-pink-50/0 via-transparent to-pink-500/[0.02]",
        textHover: "group-hover:text-pink-600"
      },
      {
        iconName: "activity",
        title: "Activity & Contact Logs",
        description: "Maintain historical records of calls, email responses, notes, and meeting dates in patient-style timelines.",
        colSpan: "md:col-span-4",
        colorClasses: "bg-pink-50 border-pink-100 text-pink-600 group-hover:bg-pink-600 group-hover:text-white group-hover:border-pink-600",
        borderHover: "hover:border-pink-300 hover:shadow-[0_20px_50px_rgba(236,72,153,0.06)]",
        glowGradient: "from-pink-50/0 via-transparent to-pink-500/[0.02]",
        textHover: "group-hover:text-pink-600"
      },
      {
        iconName: "chart",
        title: "Sales Forecast Analytics",
        description: "Review lead conversion speeds, calculate commission splits, and analyze monthly recurring revenue trends.",
        colSpan: "md:col-span-4",
        colorClasses: "bg-pink-50 border-pink-100 text-pink-600 group-hover:bg-pink-600 group-hover:text-white group-hover:border-pink-600",
        borderHover: "hover:border-pink-300 hover:shadow-[0_20px_50px_rgba(236,72,153,0.06)]",
        glowGradient: "from-pink-50/0 via-transparent to-pink-500/[0.02]",
        textHover: "group-hover:text-pink-600"
      },
      {
        iconName: "lock",
        title: "Granular Lead Permission",
        description: "Ensure agents view only assigned client records, protecting the core organization lead directory.",
        colSpan: "md:col-span-4",
        colorClasses: "bg-pink-50 border-pink-100 text-pink-600 group-hover:bg-pink-600 group-hover:text-white group-hover:border-pink-600",
        borderHover: "hover:border-pink-300 hover:shadow-[0_20px_50px_rgba(236,72,153,0.06)]",
        glowGradient: "from-pink-50/0 via-transparent to-pink-500/[0.02]",
        textHover: "group-hover:text-pink-600"
      },
      {
        iconName: "puzzle",
        title: "Omnichannel Lead Ingestion",
        description: "Route sales leads directly from Facebook, Google Ads, IndiaMart, and custom website forms into one database panel.",
        colSpan: "md:col-span-8",
        colorClasses: "bg-pink-50 border-pink-100 text-pink-600 group-hover:bg-pink-600 group-hover:text-white group-hover:border-pink-600",
        borderHover: "hover:border-pink-300 hover:shadow-[0_20px_50px_rgba(236,72,153,0.06)]",
        glowGradient: "from-pink-50/0 via-transparent to-pink-500/[0.02]",
        textHover: "group-hover:text-pink-600"
      }
    ],
    faqs: [
      {
        question: "Can we integrate cloud telephony dials?",
        answer: "Yes, our CRM supports custom click-to-call setups integrating standard cloud telephony providers like Knowlarity, Exotel, or RingCentral."
      },
      {
        question: "Can we create custom fields for leads?",
        answer: "Absolutely. Administrators can configure custom dropdowns, text inputs, dates, and files to collect specific project details."
      },
      {
        question: "Does the WhatsApp sync require official API?",
        answer: "Yes, we integrate using official WhatsApp Business API credentials, ensuring stable connections without account bans."
      }
    ]
  },
  "logistics": {
    id: "logistics",
    title: "Logistics Management",
    metaTitle: "Logistics & Fleet Management Software | eVeda",
    metaDesc: "Track vehicles, optimize routes, and manage dispatch with our Logistics ERP.",
    headline: "Optimize Your Supply Chain & Fleet",
    description: "End-to-end logistics platform with live GPS tracking, route optimization, and driver apps.",
    iconName: "truck",
    accent: "#6366F1",
    gradient: "rgba(99, 102, 241, 0.15)",
    features: ["Live GPS Tracking", "Route Optimization", "Driver Mobile App", "Proof of Delivery"],
    pricing: [
      {
        tier: "Fleet Starter",
        price: "₹25,000 / month",
        desc: "Ideal for regional shipping businesses managing minor vehicle deliveries.",
        features: [
          "Up to 20 Active Vehicles",
          "Basic GPS Tracking integrations",
          "Driver App and Delivery logs",
          "Standard Dispatch Sheet printer",
          "Email & Ticket Support"
        ]
      },
      {
        tier: "Logistics Pro",
        price: "₹68,000 / month",
        desc: "Designed for freight brokers and logistics networks managing mid-scale operations.",
        features: [
          "Up to 150 Active Vehicles",
          "Dynamic Route Optimizer engine",
          "Instant digital POD (Proof of Delivery)",
          "Fuel Card & Expense tracker",
          "Customer tracking link portal",
          "24/7 Logistics SLA Support"
        ]
      },
      {
        tier: "Supply Chain Custom",
        price: "Contact for Quote",
        desc: "Enterprise supply chain setups for global shipping networks or national fleet corporations.",
        features: [
          "Unlimited Vehicles & Outlets",
          "Multi-Warehouse inventory integration",
          "Dedicated Telemetry API integrations",
          "Dedicated database server",
          "Dedicated Success Manager",
          "Custom ERP billing ledger integration"
        ]
      }
    ],
    bentoFeatures: [
      {
        iconName: "truck",
        title: "Dynamic Dispatch & Routing",
        description: "Optimize delivery routes automatically based on distance, traffic, vehicle capacities, and drop times, reducing fuel costs.",
        colSpan: "md:col-span-8",
        colorClasses: "bg-indigo-50 border-indigo-100 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600",
        borderHover: "hover:border-indigo-300 hover:shadow-[0_20px_50px_rgba(99,102,241,0.06)]",
        glowGradient: "from-indigo-50/0 via-transparent to-indigo-500/[0.02]",
        textHover: "group-hover:text-indigo-600"
      },
      {
        iconName: "pin",
        title: "Live Telemetry & GPS",
        description: "Monitor vehicle locations, transit speeds, routes taken, and estimated arrival times on visual maps in real-time.",
        colSpan: "md:col-span-4",
        colorClasses: "bg-indigo-50 border-indigo-100 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600",
        borderHover: "hover:border-indigo-300 hover:shadow-[0_20px_50px_rgba(99,102,241,0.06)]",
        glowGradient: "from-indigo-50/0 via-transparent to-indigo-500/[0.02]",
        textHover: "group-hover:text-indigo-600"
      },
      {
        iconName: "mobile",
        title: "Driver App (POD Verification)",
        description: "Let drivers review route lists, log fuel purchases, chat with dispatchers, and upload signatures or delivery photos.",
        colSpan: "md:col-span-4",
        colorClasses: "bg-indigo-50 border-indigo-100 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600",
        borderHover: "hover:border-indigo-300 hover:shadow-[0_20px_50px_rgba(99,102,241,0.06)]",
        glowGradient: "from-indigo-50/0 via-transparent to-indigo-500/[0.02]",
        textHover: "group-hover:text-indigo-600"
      },
      {
        iconName: "sheet",
        title: "E-Way Bill & Tax Sync",
        description: "Generate delivery challans, invoice calculations, and tax splits, integrating with official e-way bill portals.",
        colSpan: "md:col-span-4",
        colorClasses: "bg-indigo-50 border-indigo-100 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600",
        borderHover: "hover:border-indigo-300 hover:shadow-[0_20px_50px_rgba(99,102,241,0.06)]",
        glowGradient: "from-indigo-50/0 via-transparent to-indigo-500/[0.02]",
        textHover: "group-hover:text-indigo-600"
      },
      {
        iconName: "activity",
        title: "Fleet Service Scheduler",
        description: "Track tire logs, oil change records, insurance renewals, and fitness certificates, receiving alerts before expiry.",
        colSpan: "md:col-span-4",
        colorClasses: "bg-indigo-50 border-indigo-100 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600",
        borderHover: "hover:border-indigo-300 hover:shadow-[0_20px_50px_rgba(99,102,241,0.06)]",
        glowGradient: "from-indigo-50/0 via-transparent to-indigo-500/[0.02]",
        textHover: "group-hover:text-indigo-600"
      },
      {
        iconName: "users",
        title: "Client Tracking Link",
        description: "Send live map links to customers, allowing them to track their consignments in real-time, just like food delivery apps.",
        colSpan: "md:col-span-4",
        colorClasses: "bg-indigo-50 border-indigo-100 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600",
        borderHover: "hover:border-indigo-300 hover:shadow-[0_20px_50px_rgba(99,102,241,0.06)]",
        glowGradient: "from-indigo-50/0 via-transparent to-indigo-500/[0.02]",
        textHover: "group-hover:text-indigo-600"
      },
      {
        iconName: "box",
        title: "Hub Sorting & Scanning",
        description: "Automate item routing at sorting hubs using custom barcode scanners, checking and dispatching inventory packages.",
        colSpan: "md:col-span-8",
        colorClasses: "bg-indigo-50 border-indigo-100 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600",
        borderHover: "hover:border-indigo-300 hover:shadow-[0_20px_50px_rgba(99,102,241,0.06)]",
        glowGradient: "from-indigo-50/0 via-transparent to-indigo-500/[0.02]",
        textHover: "group-hover:text-indigo-600"
      }
    ],
    faqs: [
      {
        question: "Can we connect existing GPS hardware?",
        answer: "Yes, our software integrates with most standard GPS tracking units using telemetry APIs and server configurations."
      },
      {
        question: "How does Route Optimization operate?",
        answer: "Our optimizer processes shipment counts, address points, and vehicle payload rules to generate the most fuel-efficient delivery sequences."
      },
      {
        question: "Does the driver app work offline?",
        answer: "Yes, the driver app records signatures and delivery photos offline, syncing them once mobile data coverage returns."
      }
    ]
  },
  "inventory": {
    id: "inventory",
    title: "Inventory Management",
    metaTitle: "Smart Inventory Management System | eVeda",
    metaDesc: "Multi-warehouse inventory tracking with low-stock alerts and purchase order automation.",
    headline: "Never Run Out of Stock Again",
    description: "Smart, automated inventory management supporting multiple warehouses, serialization, and batch tracking.",
    iconName: "boxes",
    accent: "#14B8A6",
    gradient: "rgba(20, 184, 166, 0.15)",
    features: ["Multi-warehouse Sync", "Low-stock Alerts", "Batch Tracking", "PO Automation"],
    pricing: [
      {
        tier: "Warehouse Basic",
        price: "₹15,000 / month",
        desc: "Ideal for retailers or distributors managing stock in a single central warehouse.",
        features: [
          "1 Warehouse Connection",
          "Low-Stock Automatic Alerts",
          "Purchase Order (PO) PDF Maker",
          "Barcode Label Generator",
          "Email & Ticket Support"
        ]
      },
      {
        tier: "Multi-Depot Pro",
        price: "₹36,000 / month",
        desc: "Designed for wholesale operations managing multiple depots and supplier networks.",
        features: [
          "Up to 12 Warehouse Locations",
          "Batch & Expiry Date tracking",
          "Serialization & Asset tagging",
          "Dynamic Stock Transfer orders",
          "Integrates WooCommerce & Shopify",
          "24/7 Support SLA Escalations"
        ]
      },
      {
        tier: "Supply Chain Core",
        price: "Contact for Quote",
        desc: "Advanced multi-branch inventory tracking with automatic supply chain routing.",
        features: [
          "Unlimited Warehouses & Outlets",
          "Custom SAP / ERP API Sync",
          "On-Premises deployment setups",
          "FIFO / LIFO COGS analytics",
          "Dedicated Success Manager",
          "Custom Hardware / Scanner sync"
        ]
      }
    ],
    bentoFeatures: [
      {
        iconName: "box",
        title: "Multi-Warehouse Tracking",
        description: "Monitor inventory stock counts, active reserves, and product values across multiple storage locations from one interface.",
        colSpan: "md:col-span-8",
        colorClasses: "bg-teal-50 border-teal-100 text-teal-650 group-hover:bg-teal-600 group-hover:text-white group-hover:border-teal-600",
        borderHover: "hover:border-teal-300 hover:shadow-[0_20px_50px_rgba(20,184,166,0.06)]",
        glowGradient: "from-teal-50/0 via-transparent to-teal-500/[0.02]",
        textHover: "group-hover:text-teal-600"
      },
      {
        iconName: "refresh",
        title: "Automatic Reorder Rules",
        description: "Set minimum threshold levels for each item. The system drafts purchase orders automatically when stocks dip below safety margins.",
        colSpan: "md:col-span-4",
        colorClasses: "bg-teal-50 border-teal-100 text-teal-650 group-hover:bg-teal-600 group-hover:text-white group-hover:border-teal-600",
        borderHover: "hover:border-teal-300 hover:shadow-[0_20px_50px_rgba(20,184,166,0.06)]",
        glowGradient: "from-teal-50/0 via-transparent to-teal-500/[0.02]",
        textHover: "group-hover:text-teal-600"
      },
      {
        iconName: "history",
        title: "Batch & Expiry Controls",
        description: "Track inventory expiration dates, assign batch codes, and run FIFO/LIFO dispatch logic to minimize stock waste.",
        colSpan: "md:col-span-4",
        colorClasses: "bg-teal-50 border-teal-100 text-teal-650 group-hover:bg-teal-600 group-hover:text-white group-hover:border-teal-600",
        borderHover: "hover:border-teal-300 hover:shadow-[0_20px_50px_rgba(20,184,166,0.06)]",
        glowGradient: "from-teal-50/0 via-transparent to-teal-500/[0.02]",
        textHover: "group-hover:text-teal-600"
      },
      {
        iconName: "search",
        title: "Barcode Label Systems",
        description: "Design custom barcode labels, print stickers, and scan items for stocktakes or order dispatches.",
        colSpan: "md:col-span-4",
        colorClasses: "bg-teal-50 border-teal-100 text-teal-650 group-hover:bg-teal-600 group-hover:text-white group-hover:border-teal-600",
        borderHover: "hover:border-teal-300 hover:shadow-[0_20px_50px_rgba(20,184,166,0.06)]",
        glowGradient: "from-teal-50/0 via-transparent to-teal-500/[0.02]",
        textHover: "group-hover:text-teal-600"
      },
      {
        iconName: "activity",
        title: "Stock Transfer Orders",
        description: "Request and track product transfers between warehouse depots, keeping delivery records updated.",
        colSpan: "md:col-span-4",
        colorClasses: "bg-teal-50 border-teal-100 text-teal-650 group-hover:bg-teal-600 group-hover:text-white group-hover:border-teal-600",
        borderHover: "hover:border-teal-300 hover:shadow-[0_20px_50px_rgba(20,184,166,0.06)]",
        glowGradient: "from-teal-50/0 via-transparent to-teal-500/[0.02]",
        textHover: "group-hover:text-teal-600"
      },
      {
        iconName: "users",
        title: "Supplier Portal Panel",
        description: "Onboard material suppliers, letting them review pending PO lists, confirm dispatch dates, and upload invoices.",
        colSpan: "md:col-span-4",
        colorClasses: "bg-teal-50 border-teal-100 text-teal-650 group-hover:bg-teal-600 group-hover:text-white group-hover:border-teal-600",
        borderHover: "hover:border-teal-300 hover:shadow-[0_20px_50px_rgba(20,184,166,0.06)]",
        glowGradient: "from-teal-50/0 via-transparent to-teal-500/[0.02]",
        textHover: "group-hover:text-teal-600"
      },
      {
        iconName: "chart",
        title: "Cost of Goods (COGS)",
        description: "Analyze product margin variations, supplier price updates, and current inventory assets valuations.",
        colSpan: "md:col-span-8",
        colorClasses: "bg-teal-50 border-teal-100 text-teal-650 group-hover:bg-teal-600 group-hover:text-white group-hover:border-teal-600",
        borderHover: "hover:border-teal-300 hover:shadow-[0_20px_50px_rgba(20,184,166,0.06)]",
        glowGradient: "from-teal-50/0 via-transparent to-teal-500/[0.02]",
        textHover: "group-hover:text-teal-600"
      }
    ],
    faqs: [
      {
        question: "Does the system support serial number tracking?",
        answer: "Yes, you can track individual products using unique serial numbers or batch codes, which is helpful for electronics and warranties."
      },
      {
        question: "Can we sync with online marketplaces?",
        answer: "Absolutely. Our platform can sync stock levels with Amazon, Shopify, WooCommerce, and Magento dynamically."
      },
      {
        question: "How do low-stock alerts work?",
        answer: "You define safety margins for each item. When stock levels drop, the system sends daily email alerts or drafts supplier POs."
      }
    ]
  },
  "ecommerce": {
    id: "ecommerce",
    title: "E-Commerce Solutions",
    metaTitle: "Custom E-Commerce Development | eVeda",
    metaDesc: "High-performance headless e-commerce platforms built for scale and conversion.",
    headline: "High-Performance Digital Storefronts",
    description: "Custom headless e-commerce solutions that load instantly and provide seamless checkout experiences.",
    iconName: "shopping-cart",
    accent: "#F43F5E",
    gradient: "rgba(244, 63, 94, 0.15)",
    features: ["Headless Architecture", "Custom Checkout", "Abandoned Cart Recovery", "Payment Gateway Integrations"],
    pricing: [
      {
        tier: "Growth Store",
        price: "₹30,000 / month",
        desc: "Ideal for retail brands launching their first custom high-speed storefront.",
        features: [
          "Custom Headless Storefront",
          "Up to 2,000 Products Catalog",
          "Stripe & Razorpay Payments",
          "Basic Discount Coupon engine",
          "Standard Email Support"
        ]
      },
      {
        tier: "Brand Direct",
        price: "₹75,000 / month",
        desc: "Designed for premium direct-to-consumer (D2C) brands with scaling transaction volumes.",
        features: [
          "Native iOS & Android mobile apps",
          "Unlimited Product Catalog list",
          "Abandoned Cart email automation",
          "Multi-currency & localization checkout",
          "Shiprocket Logistics API integration",
          "24/7 Platform SLA Support"
        ]
      },
      {
        tier: "Enterprise Commerce",
        price: "Contact for Quote",
        desc: "Custom commerce platforms built for major retail networks or multi-brand operations.",
        features: [
          "Bespoke High-Speed Architecture",
          "Omnichannel POS & ERP sync",
          "Multi-vendor seller network integration",
          "Dedicated Database Cluster",
          "Dedicated Success Manager",
          "Custom SLA & Infrastructure setups"
        ]
      }
    ],
    bentoFeatures: [
      {
        iconName: "cart",
        title: "Bespoke Headless Storefronts",
        description: "Deploy fast storefronts using Next.js, loading catalogs in milliseconds and optimizing Google Core Web Vitals.",
        colSpan: "md:col-span-8",
        colorClasses: "bg-rose-50 border-rose-100 text-rose-650 group-hover:bg-rose-600 group-hover:text-white group-hover:border-rose-600",
        borderHover: "hover:border-rose-300 hover:shadow-[0_20px_50px_rgba(244,63,94,0.06)]",
        glowGradient: "from-rose-50/0 via-transparent to-rose-500/[0.02]",
        textHover: "group-hover:text-rose-600"
      },
      {
        iconName: "refresh",
        title: "One-Click Custom Checkouts",
        description: "Reduce shopping cart drops with clean, single-page checkouts featuring guest checkouts and saved payment profiles.",
        colSpan: "md:col-span-4",
        colorClasses: "bg-rose-50 border-rose-100 text-rose-650 group-hover:bg-rose-600 group-hover:text-white group-hover:border-rose-600",
        borderHover: "hover:border-rose-300 hover:shadow-[0_20px_50px_rgba(244,63,94,0.06)]",
        glowGradient: "from-rose-50/0 via-transparent to-rose-500/[0.02]",
        textHover: "group-hover:text-rose-600"
      },
      {
        iconName: "history",
        title: "Abandoned Cart Reminders",
        description: "Re-engage lost buyers automatically with custom email schedules or WhatsApp promo code offers.",
        colSpan: "md:col-span-4",
        colorClasses: "bg-rose-50 border-rose-100 text-rose-650 group-hover:bg-rose-600 group-hover:text-white group-hover:border-rose-600",
        borderHover: "hover:border-rose-300 hover:shadow-[0_20px_50px_rgba(244,63,94,0.06)]",
        glowGradient: "from-rose-50/0 via-transparent to-rose-500/[0.02]",
        textHover: "group-hover:text-rose-600"
      },
      {
        iconName: "percent",
        title: "Dynamic Discount Rules",
        description: "Configure promotional rules: buy-one-get-one deals, category-wide percentage discounts, or tier-based cart rewards.",
        colSpan: "md:col-span-4",
        colorClasses: "bg-rose-50 border-rose-100 text-rose-650 group-hover:bg-rose-600 group-hover:text-white group-hover:border-rose-600",
        borderHover: "hover:border-rose-300 hover:shadow-[0_20px_50px_rgba(244,63,94,0.06)]",
        glowGradient: "from-rose-50/0 via-transparent to-rose-500/[0.02]",
        textHover: "group-hover:text-rose-600"
      },
      {
        iconName: "activity",
        title: "Conversion Funnel Reports",
        description: "Track visitor paths, product click metrics, cart addition rates, and checkout conversion stats.",
        colSpan: "md:col-span-4",
        colorClasses: "bg-rose-50 border-rose-100 text-rose-650 group-hover:bg-rose-600 group-hover:text-white group-hover:border-rose-600",
        borderHover: "hover:border-rose-300 hover:shadow-[0_20px_50px_rgba(244,63,94,0.06)]",
        glowGradient: "from-rose-50/0 via-transparent to-rose-500/[0.02]",
        textHover: "group-hover:text-rose-600"
      },
      {
        iconName: "mobile",
        title: "Mobile Shopping Apps",
        description: "Deploy native shopping applications on iOS and Android to capture repeat purchases and send push alerts.",
        colSpan: "md:col-span-4",
        colorClasses: "bg-rose-50 border-rose-100 text-rose-650 group-hover:bg-rose-600 group-hover:text-white group-hover:border-rose-600",
        borderHover: "hover:border-rose-300 hover:shadow-[0_20px_50px_rgba(244,63,94,0.06)]",
        glowGradient: "from-rose-50/0 via-transparent to-rose-500/[0.02]",
        textHover: "group-hover:text-rose-600"
      },
      {
        iconName: "search",
        title: "AI Product Recommender",
        description: "Increase cart values with AI product recommendations on catalog pages based on past visitor paths.",
        colSpan: "md:col-span-8",
        colorClasses: "bg-rose-50 border-rose-100 text-rose-650 group-hover:bg-rose-600 group-hover:text-white group-hover:border-rose-600",
        borderHover: "hover:border-rose-300 hover:shadow-[0_20px_50px_rgba(244,63,94,0.06)]",
        glowGradient: "from-rose-50/0 via-transparent to-rose-500/[0.02]",
        textHover: "group-hover:text-rose-600"
      }
    ],
    faqs: [
      {
        question: "Why use Headless Commerce instead of Shopify templates?",
        answer: "Headless stores isolate the frontend code, which enables sub-second page loads, custom checkout steps, and better organic search rankings."
      },
      {
        question: "Can we integrate existing inventory ERP systems?",
        answer: "Yes, our headless stores connect with inventory systems via REST APIs, keeping stock levels synced in real-time."
      },
      {
        question: "Do you support international currencies?",
        answer: "Absolutely. The checkout system can convert prices to international currencies and apply local tax rules dynamically."
      }
    ]
  },
  "hrms": {
    id: "hrms",
    title: "HR Payroll & Roster",
    metaTitle: "HRMS & Payroll Management Software | eVeda",
    metaDesc: "Automate payroll, track attendance, and manage employee life-cycles with our HRMS.",
    headline: "Automate Your HR & Payroll",
    description: "Comprehensive HRMS that handles everything from recruitment and onboarding to payroll and tax compliance.",
    iconName: "briefcase",
    accent: "#8B5CF6",
    gradient: "rgba(139, 92, 246, 0.15)",
    features: ["Automated Payroll", "Biometric Sync", "Leave Management", "Employee Self-Service"],
    pricing: [
      {
        tier: "Small Team HR",
        price: "₹10,000 / month",
        desc: "Ideal for startups and growing offices seeking basic payroll and attendance logs.",
        features: [
          "Up to 30 Employee Profiles",
          "Automated Payroll Slip generator",
          "Leave Intake & Approval dashboard",
          "Basic Document Storage",
          "Email & Ticket Support"
        ]
      },
      {
        tier: "Enterprise HR Suite",
        price: "₹34,000 / month",
        desc: "Designed for mid-sized corporations needing detailed shift rosters and compliance checks.",
        features: [
          "Up to 250 Employee Profiles",
          "Biometric Attendance hardware sync",
          "PF, ESIC & TDS compliance calculator",
          "Performance Appraisal manager",
          "Recruitment & Interview tracking",
          "24/7 Priority Support SLA"
        ]
      },
      {
        tier: "Multi-National HRMS",
        price: "Contact for Quote",
        desc: "Custom HR ERP systems built for global organizations with complex rosters.",
        features: [
          "Unlimited Employees & Branches",
          "Multi-Country tax compliance engine",
          "Custom API and CRM/ERP integrations",
          "Dedicated database server instance",
          "Dedicated Success Manager",
          "Custom Shift Roster configurations"
        ]
      }
    ],
    bentoFeatures: [
      {
        iconName: "usercheck",
        title: "Employee Life-Cycle Tracker",
        description: "Manage employee files from recruitment and onboarding checklists to asset tracking, reviews, and exit interviews.",
        colSpan: "md:col-span-8",
        colorClasses: "bg-purple-50 border-purple-100 text-purple-650 group-hover:bg-purple-600 group-hover:text-white group-hover:border-purple-600",
        borderHover: "hover:border-purple-300 hover:shadow-[0_20px_50px_rgba(139,92,246,0.06)]",
        glowGradient: "from-purple-50/0 via-transparent to-purple-500/[0.02]",
        textHover: "group-hover:text-purple-600"
      },
      {
        iconName: "dollar",
        title: "Automated Payroll & Taxes",
        description: "Compute monthly salaries, process salary slips, calculate tax deductions (PF, ESIC, TDS), and draft bank payout sheets automatically.",
        colSpan: "md:col-span-4",
        colorClasses: "bg-purple-50 border-purple-100 text-purple-650 group-hover:bg-purple-600 group-hover:text-white group-hover:border-purple-600",
        borderHover: "hover:border-purple-300 hover:shadow-[0_20px_50px_rgba(139,92,246,0.06)]",
        glowGradient: "from-purple-50/0 via-transparent to-purple-500/[0.02]",
        textHover: "group-hover:text-purple-600"
      },
      {
        iconName: "calendar",
        title: "Shift Roster Scheduler",
        description: "Assign rotating shift slots, monitor attendance, and calculate overtime hours automatically from a single grid calendar.",
        colSpan: "md:col-span-4",
        colorClasses: "bg-purple-50 border-purple-100 text-purple-650 group-hover:bg-purple-600 group-hover:text-white group-hover:border-purple-600",
        borderHover: "hover:border-purple-300 hover:shadow-[0_20px_50px_rgba(139,92,246,0.06)]",
        glowGradient: "from-purple-50/0 via-transparent to-purple-500/[0.02]",
        textHover: "group-hover:text-purple-600"
      },
      {
        iconName: "activity",
        title: "Biometric Attendance Sync",
        description: "Sync attendance data instantly from office wall scanners, fingerprint readers, or GPS mobile check-ins.",
        colSpan: "md:col-span-4",
        colorClasses: "bg-purple-50 border-purple-100 text-purple-650 group-hover:bg-purple-600 group-hover:text-white group-hover:border-purple-600",
        borderHover: "hover:border-purple-300 hover:shadow-[0_20px_50px_rgba(139,92,246,0.06)]",
        glowGradient: "from-purple-50/0 via-transparent to-purple-500/[0.02]",
        textHover: "group-hover:text-purple-600"
      },
      {
        iconName: "sheet",
        title: "Leave Intake Approvals",
        description: "Let employees submit leave requests on self-service portals, keeping track of remaining balances automatically.",
        colSpan: "md:col-span-4",
        colorClasses: "bg-purple-50 border-purple-100 text-purple-650 group-hover:bg-purple-600 group-hover:text-white group-hover:border-purple-600",
        borderHover: "hover:border-purple-300 hover:shadow-[0_20px_50px_rgba(139,92,246,0.06)]",
        glowGradient: "from-purple-50/0 via-transparent to-purple-500/[0.02]",
        textHover: "group-hover:text-purple-600"
      },
      {
        iconName: "mobile",
        title: "Self-Service Mobile Portal",
        description: "Let staff review monthly slips, view attendance records, apply for leaves, and submit expense bills on the go.",
        colSpan: "md:col-span-4",
        colorClasses: "bg-purple-50 border-purple-100 text-purple-650 group-hover:bg-purple-600 group-hover:text-white group-hover:border-purple-600",
        borderHover: "hover:border-purple-300 hover:shadow-[0_20px_50px_rgba(139,92,246,0.06)]",
        glowGradient: "from-purple-50/0 via-transparent to-purple-500/[0.02]",
        textHover: "group-hover:text-purple-600"
      },
      {
        iconName: "briefcase",
        title: "ATS Recruitment Pipeline",
        description: "Onboard prospective candidates, track interview stages, log feedback, and generate offer letters seamlessly.",
        colSpan: "md:col-span-8",
        colorClasses: "bg-purple-50 border-purple-100 text-purple-650 group-hover:bg-purple-600 group-hover:text-white group-hover:border-purple-600",
        borderHover: "hover:border-purple-300 hover:shadow-[0_20px_50px_rgba(139,92,246,0.06)]",
        glowGradient: "from-purple-50/0 via-transparent to-purple-500/[0.02]",
        textHover: "group-hover:text-purple-600"
      }
    ],
    faqs: [
      {
        question: "Does the system calculate tax deductions in India?",
        answer: "Yes, our HRMS payroll calculations comply with local laws including Provident Fund (PF), ESIC, Professional Tax, and TDS."
      },
      {
        question: "How does the biometric sync operate?",
        answer: "We connect wall fingerprint scanner networks to our server databases via secure APIs, syncing clock-in data in real-time."
      },
      {
        question: "Can we configure shift roster rules?",
        answer: "Absolutely. Admins can configure rotating shifts, overtime multiplier rules, grace periods, and late penalty metrics."
      }
    ]
  }
};
