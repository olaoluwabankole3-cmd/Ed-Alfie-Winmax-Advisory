import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  Menu, 
  X, 
  Home, 
  BookOpen, 
  Clock, 
  Calendar, 
  Shield, 
  Globe, 
  Award, 
  Briefcase, 
  ChevronLeft,
  ChevronRight, 
  ArrowRight,  
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  MessageSquare, 
  CheckCircle, 
  Search, 
  Play, 
  Users,
  Check,
  Smartphone,
  CheckSquare,
  Linkedin,
  ArrowUpRight
} from "lucide-react";
import AnimatedBackground from "./components/AnimatedBackground";
import Header from "./components/Header";
import Logo from "./components/Logo";
import HomeHeroSection from "./components/HomeHeroSection";
import Preloader from "./components/Preloader";
import ScrollAnimatedSection from "./components/ScrollAnimatedSection";
import ServicesSection from "./components/ServicesSection";
import CareersSection from "./components/CareersSection";
import BookingSection from "./components/BookingSection";
import ApproachSection from "./components/ApproachSection";
import AIAgentChat from "./components/AIAgentChat";

// Types
interface BlogPost {
  id: string;
  title: string;
  slug: string;
  summary: string;
  category: "Strategy" | "Operations" | "Finance" | "Governance";
  author: string;
  date: string;
  readTime: string;
  content: string[];
}

interface Expert {
  id: string;
  name: string;
  title: string;
  avatar: string;
  avatarFallback?: string;
  experience: string;
  specializations: string[];
  tagline: string;
  biography: string;
  expertiseDetails: string[];
  industriesServed: string[];
  philosophy: string;
  experienceSummary: string;
  linkedin?: string;
}

const EXPERTS_DATA: Expert[] = [
  {
    id: "tunji",
    name: "Tunji Osoko",
    title: "Principal Business Consultant",
    experience: "30+ Years Experience",
    avatar: "https://lh3.googleusercontent.com/d/1OyyfudW7sWuT19CZNyG_e8qLN-4cGZ9P",
    avatarFallback: "https://drive.google.com/uc?export=view&id=1OyyfudW7sWuT19CZNyG_e8qLN-4cGZ9P",
    linkedin: "https://www.linkedin.com/in/teejay-osoko/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3Bt6p6eZg1TbWxJzX1QGgBAA%3D%3D",
    specializations: ["Business Strategy", "Commercial Excellence", "Route-to-Market Design", "Operational Excellence", "Business Transformation"],
    tagline: "Helping organizations transform strategy into measurable business results through disciplined execution, operational excellence, and sustainable growth systems.",
    biography: "Tunji Osoko is an accomplished business transformation executive and principal business consultant with three decades of hands-on leadership experience driving commercial growth, operational excellence, and large-scale business transformation across Africa’s most competitive industries. Having held senior leadership positions within multinational organizations and led complex transformation initiatives across FMCG, manufacturing, healthcare, distribution, agribusiness, metallurgy, and services sectors, Tunji brings a rare blend of boardroom strategy, operational rigor, and frontline execution expertise. At Ed Alfie & Winmax Advisory, Tunji leads strategic engagements focused on helping organizations improve growth, profitability, market execution, organizational capability, and operational performance. He works closely with business owners, CEOs, executive teams, and boards to solve complex business challenges and deliver measurable business outcomes.",
    expertiseDetails: [
      "Business Strategy & Transformation",
      "Commercial Excellence & Sales Force effectiveness",
      "Route-to-Market (RTM) Design & Optimization",
      "Distribution & Channel Development",
      "Retail Execution Excellence",
      "Supply Chain & Operational Excellence Optimization",
      "Organizational Capability & Performance Systems",
      "ERP Implementation & Optimization",
      "Business Turnaround, Governance & Recovery"
    ],
    industriesServed: [
      "Fast-Moving Consumer Goods (FMCG)",
      "Industrial Manufacturing & Metallurgy",
      "Healthcare Systems & Pharmaceuticals",
      "Agribusiness, Trading & Commodities",
      "Retail, Distribution & High-Scale Services"
    ],
    philosophy: "Great strategies only create value when they are translated into practical systems and flawlessly executed with discipline. Tunji Osoko helps organizations bridge the gap between ambition and execution.",
    experienceSummary: "Design and implementation of sustainable corporate turnaround frameworks across multiple sectors in emerging markets, driving scalable business models and performance."
  },
  {
    id: "bankole",
    name: "Bankole Olaoluwa",
    title: "AI Systems Engineer",
    experience: "4+ Years Experience",
    avatar: "https://lh3.googleusercontent.com/d/1coIBU6Z6KC95tg_Y6uAkZmRH7ZiD0AIQ",
    avatarFallback: "https://drive.google.com/uc?export=view&id=1coIBU6Z6KC95tg_Y6uAkZmRH7ZiD0AIQ",
    linkedin: "https://www.linkedin.com/in/olaoluwa-bankole-a7487a348/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3BM%2FNzdRvrTPuNVy4cqbkQig%3D%3D",
    specializations: ["AI Automation", "Workflow Design", "Business Systems", "Digital Transformation", "Process Optimization"],
    tagline: "Helping organizations streamline operations and improve productivity through AI-powered automation, intelligent workflows, and scalable digital systems.",
    biography: "Bankole Olaoluwa is an AI Systems Engineer and automation specialist focused on helping organizations improve efficiency, productivity, and operational performance through intelligent technology solutions. With experience spanning workflow automation, AI-powered business systems, digital operations, and process optimization, he works with organizations to identify inefficiencies, streamline repetitive tasks, and implement scalable systems that support business growth. At Ed Alfie & Winmax Advisory, Bankole supports digital transformation initiatives by designing and implementing technology-driven solutions that enable businesses to operate more effectively, make better decisions, and improve overall organizational performance. His work bridges the gap between business operations and emerging technologies, helping organizations adopt practical AI solutions that deliver measurable value rather than unnecessary complexity.",
    expertiseDetails: [
      "AI-Powered Workflow Automation",
      "Business Process Optimization & Systems Design",
      "Productivity Improvement Solutions",
      "Intelligent Data & Knowledge Management Systems",
      "AI Adoption & Implementation & Technology Integration",
      "Process Documentation & Digital Operations",
      "Operational Efficiency Improvement & Business Intelligence"
    ],
    industriesServed: [
      "Professional Services & Advisory & Consulting",
      "Small & Medium Enterprises (SMEs)",
      "Technology Startups & E-Commerce",
      "Logistics & Operations & Digital Media",
      "Education & Scalable Information Platforms"
    ],
    philosophy: "Technology delivers its greatest value when it simplifies complexity and empowers people to perform at their best. Bankole's approach focuses on implementing practical, business-oriented solutions that improve operational efficiency, strengthen decision-making, and create sustainable systems for long-term growth.",
    experienceSummary: "Successfully designed and executed intelligent automation frameworks, workflow integrations, and digital scaling blueprints across advisory, logistics, media, and SME sectors."
  },
  {
    id: "dapo",
    name: "Dapo Okegbemila",
    title: "Senior Finance Transformation & ERP Consultant",
    experience: "20+ Years Experience",
    avatar: "https://lh3.googleusercontent.com/d/1uKFKEIy09sF_1KQpY2Clky0hyEWmqeSC",
    avatarFallback: "https://drive.google.com/uc?export=view&id=1uKFKEIy09sF_1KQpY2Clky0hyEWmqeSC",
    specializations: ["Finance", "Technology", "Transformation"],
    tagline: "Finance transformation executive and ERP advisory specialist with 20+ years of experience helping organizations improve financial performance, operational efficiency, and business scalability.",
    biography: "Dapo Okegbemila is a finance transformation executive and ERP advisory specialist with over two decades of experience helping organizations strengthen financial performance, improve operational efficiency, and build scalable foundations for sustainable growth. Combining deep expertise in finance, technology, and business transformation, Dapo has successfully led finance transformation initiatives, ERP implementations, process optimization programs, and investment readiness engagements across multinational corporations, medium-sized enterprises, and growth-stage businesses. His experience spans financial management, enterprise systems implementation, digital finance transformation, governance enhancement, and organizational performance improvement. Working at the intersection of finance and technology, he partners with business owners, executive leadership teams, investors, and key stakeholders to design and implement solutions that improve decision-making, strengthen financial controls, and accelerate business growth. Dapo is recognized for helping organizations establish robust financial governance structures, performance management frameworks, ERP-enabled process integration, and scalable operating models that deliver sustainable business value.",
    expertiseDetails: [
      "Finance Transformation & Value Creation",
      "ERP Advisory, Implementation & Optimization",
      "SAP Finance (SAP FICO)",
      "Financial Planning, Analysis & Performance Management",
      "Finance Operating Model Transformation",
      "Shared Services Transformation",
      "Business Process Optimization",
      "Financial Governance, Risk & Internal Controls",
      "Digital Finance & Business Intelligence",
      "Change Management & Enterprise Transformation"
    ],
    industriesServed: [
      "Consumer Goods & FMCG",
      "Manufacturing & Industrial Operations",
      "Logistics & Supply Chain",
      "Technology & Digital Services",
      "Professional Services",
      "Small & Medium Enterprises (SMEs)"
    ],
    philosophy: "The most successful organizations are those that combine strategic vision with execution excellence. Real value emerges when finance, processes, people, and systems are aligned to execute strategy with discipline, transparency, and measurable business impact.",
    experienceSummary: "Driving Finance Transformation, ERP Excellence, and Business Performance Improvement."
  }
];

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  // Navigation & Tab state
  const [activeTab, setActiveTab] = useState<"home" | "services" | "careers" | "booking" | "blog" | "post" | "approach">("home");
  const [activePostId, setActivePostId] = useState<string | null>(null);
  const [introCompleted, setIntroCompleted] = useState(false);
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);

  useEffect(() => {
    const path = location.pathname;
    if (path === "/") {
      setActiveTab("home");
    } else if (path === "/our-approach") {
      setActiveTab("approach");
    } else if (path === "/our-services") {
      setActiveTab("services");
    } else if (path === "/meet-our-experts") {
      setActiveTab("home");
      setTimeout(() => {
        const element = document.getElementById("leadership-section");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 300);
    } else if (path === "/contact-us" || path === "/booking") {
      setActiveTab("booking");
    } else if (path === "/careers") {
      setActiveTab("careers");
    } else if (path === "/blog" || path === "/insights") {
      setActiveTab("blog");
    } else if (path.startsWith("/blog/") || path.startsWith("/insights/")) {
      const parts = path.split("/");
      const postId = parts[parts.length - 1];
      if (postId) {
        setActivePostId(postId);
        setActiveTab("post");
      }
    }
  }, [location.pathname]);
  
  // Mobile Hamburger menu state
  const [menuOpen, setMenuOpen] = useState(false);

  // AI Agent Chatbot state
  const [aiAgentOpen, setAiAgentOpen] = useState(false);

  // User input states inside Forms
  // Career application
  const [careerName, setCareerName] = useState("");
  const [careerEmail, setCareerEmail] = useState("");
  const [careerSpecialty, setCareerSpecialty] = useState("Route-to-Market & Logistics");
  const [careerSummary, setCareerSummary] = useState("");
  const [careerStatus, setCareerStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [careerCode, setCareerCode] = useState("");

  // Contact Us & Direct Booking
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactCompany, setContactCompany] = useState("");
  const [contactRevenue, setContactRevenue] = useState("$2M - $5M Enterprise");
  const [contactChallenge, setContactChallenge] = useState("Route-to-Market Pipeline");
  const [contactMessage, setContactMessage] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("14:00 WAT");
  const [bookingStatus, setBookingStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [bookingCode, setBookingCode] = useState("");

  // Blog research states
  const [blogSearch, setBlogSearch] = useState("");
  const [blogCategory, setBlogCategory] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  // useDeferredValue ensures search input field remains lag-free as dataset size increases
  const deferredSearch = React.useDeferredValue(blogSearch);
  const deferredCategory = React.useDeferredValue(blogCategory);

  // Reset page number back to 1 instantly when search query or category switches
  useEffect(() => {
    setCurrentPage(1);
  }, [blogSearch, blogCategory]);

  // Sample static high-quality blog posts (written with extreme executive/professional depth)
  const blogPosts: BlogPost[] = [
    {
      id: "rtm-slippages",
      title: "Plugging Trade-Route Slippages: A Practical Guide to RTM Auditing",
      slug: "plugging-trade-route-slippages",
      summary: "Why consumer goods manufacturers in West Africa lose up to 12% of gross revenue to unmapped detours, unauthorized dual-handling, and physical cash collection delay.",
      category: "Operations",
      author: "Route-to-Market Advisory Bench",
      date: "May 28, 2026",
      readTime: "7 min read",
      content: [
        "In fast-growing frontier retail hubs, strategy is frequently divorced from the realities of the field route. Senior leadership structures high-level supply projections and signs retail distribution agreements, yet up to 12% of total transaction value dissipates between the loading warehouse and the localized merchant point.",
        "This critical operational leakage occurs primarily in three areas: unmapped transport detours that waste fuel and driver hours, unauthorized double-handling at unmonitored transfer hubs, and the friction of collecting physical cash. In many instances, sales agents spend up to 40% of their day counting paper currency instead of onboarding new retail targets.",
        "To combat this execution deficit, EAW Advisory implements a three-part Route-to-Market (RTM) audit protocol:",
        "1. PRE-MAPPED TRADE GEOGRAPHY: We replace vague sales territories with fixed, digitally mapped corridors. Every driver and truck operates on scheduled geographic route brackets, minimizing unapproved detours.",
        "2. DIRECT RETAIL SHIPMENT MODELLING: We eliminate middle-tier logistics handovers. By restructuring localized delivery clusters, commodities flow from main warehouses directly to trade points without multiple unrecorded stops.",
        "3. CASH-TO-BANK DISCIPLINE: We transition high-frequency cash networks onto streamlined merchant payment gateways. Distributing agents carry out transactions via secure bank-connected mobile systems, converting physical currency risk into immediate ledger visibility.",
        "Operational efficiency is not achieved by drawing bigger dreams on slider files; it is achieved on the hot pavement where drivers, products, and currency meet. Plugging these slippages immediately restores lost margins without needing to inflate baseline prices."
      ]
    },
    {
      id: "gov-cadence",
      title: "The 15-Minute Daily Cadence: Agility in Enterprise Governance",
      slug: "15-minute-daily-cadence",
      summary: "How high-growth leadership teams can convert passive, tedious 3-hour status sessions into highly focused, action-centric daily checkpoints.",
      category: "Governance",
      author: "Corporate Governance Advisory Bench",
      date: "May 15, 2026",
      readTime: "5 min read",
      content: [
        "Traditional corporate structures are weighted down by reporting overhead. Boards and executive teams meet monthly to discuss historical spreadsheets that are already thirty days stale. By the time a cash flow bottleneck is identified, the damage has been done and capital has leaked.",
        "We believe that governance is not an academic retrospective—it is an daily operational rhythm. We help frontier founders and corporate boards dismantle slow, multi-hour status sessions and replace them with a strict 15-minute daily check-in.",
        "Here is how EAW structures the 15-Minute Operational Cadence:",
        "• NO RETROSPECTIVE STORIES: Every executive addresses only three variables: metrics achieved in the last 24 hours, goals committed for the next 24 hours, and actual blockers stalling immediate progress. General narratives are strictly prohibited.",
        "• STABILIZED SCORECARDS: Directors manage functional scorecards featuring only 3-5 real-time lead performance indicators. We bypass qualitative status updates in favor of direct quantitative numbers.",
        "• PARTNER-LED RESOLUTION SPRINT: When an impediment or discrepancy is flagged, it is not debated in the meeting. It is assigned to a specific owner and resolved during a dedicated 10-minute focus sprint directly after.",
        "This level of operational discipline shifts an organization's posture from reactive firefighting to predictive coordination. When everyone knows exactly which metric they own every 24 hours, execution becomes a clockwork routine."
      ]
    },
    {
      id: "book-automation",
      title: "Real-Time Bookkeeping Automation: Tracing Financial Drifts",
      slug: "real-time-bookkeeping-automation",
      summary: "Transitioning high-growth frontier enterprises from lagged monthly accounting cycles toward automated daily transaction ledgers.",
      category: "Finance",
      author: "Systems & Accounting Audit Bench",
      date: "April 30, 2026",
      readTime: "6 min read",
      content: [
        "In many mid-sized companies, the accounting office is a bottleneck. Ledgers are manually updated every fortnight or month, leaving executives blind to sudden cash contractions, inventory theft, or supplier markup inflations.",
        "Relying on lagging books is like driving a high-speed vehicle while looking purely through the rearview mirror. To protect capital integrity, modern enterprises must establish daily financial reconciliation systems.",
        "An effective bookkeeping automation model rests on three functional pillars:",
        "1. AUTOMATED BANK-TO-SYSTEM SYNC: Manual entry represents a high-risk error vector. Transactions should sync directly from business banking accounts into accounting ledgers, categorized instantly by code filters.",
        "2. COST-OF-GOODS-SOLD (COGS) SHIELDING: Shipping fees, import tariffs, and material expenses are matched to inventory items immediately at point of receipt, revealing accurate margins daily.",
        "3. REAL-TIME CASH FLOW MONITORING: Executives consult a single secure dashboard displaying daily cash runway, outstanding client liabilities, and upcoming supplier disbursements. This enables proactive working capital allocation.",
        "By automating manual ledger entry, the accounting team transitions from retroactive recordkeepers into proactive tactical partners. This level of systemic control is a key prerequisite to securing institutional equity."
      ]
    },
    {
      id: "supply-logistics",
      title: "Navigating Frontier Logistics: Overcoming Port & Diesel Multipliers",
      slug: "navigating-frontier-logistics",
      summary: "Practical operational architectures to offset fuel price fluctuations, seaport congestion overheads, and inventory shrinkage in developing corridors.",
      category: "Strategy",
      author: "Supply Chain Operations Bench",
      date: "April 12, 2026",
      readTime: "8 min read",
      content: [
        "West African logistical networks are a primary source of enterprise failure. Companies are frequently subjected to double-digit fuel spikes, unexpected port custom delays, and systemic warehouse leakage. These factors can drain up to 35% of an operator's margin if not governed tightly.",
        "EAW Advisory approaches supply chain not as an isolated transport cost, but as an integrated cash-flow process. To de-risk frontier operations, we recommend adopting a local decentralization model.",
        "Key tactics include:",
        "• TRANSIT CLUSTERING: Instead of relying on a single mega-warehouse, we divide distribution into decentralized regional transit clusters under strict custody rules. This insulates stock against transport roadblocks.",
        "• FUEL-INDEXED TRANSIT AGREEMENTS: We structure freight logistics agreements using standard fuel-indexed pricing models, shielding our clients from sudden localized fuel spikes.",
        "• TRANS-RECEIPT SYSTEMS: Every product handoff between warehouse, driver, and retail point is recorded via digital, two-way cryptographic receipts. This completely eliminates manual inventory 'shrinkage' during transit.",
        "Logistics is the physical framework of Route-to-Market. Operating a transparent, tightly controlled physical network is the fastest path to outcompeting larger, more sluggish competitors in frontier markets."
      ]
    },
    {
      id: "capital-alignment",
      title: "Raising Institutional Equity: The Pre-Audit Checklist",
      slug: "raising-institutional-equity-checklist",
      summary: "What PE funds and infrastructure lenders actually look for in your primary ledger books and secondary inventory controls.",
      category: "Finance",
      author: "Systems & Accounting Audit Bench",
      date: "March 28, 2026",
      readTime: "6 min read",
      content: [
        "Securing expansion equity from foreign institutional investors is the standard goal of enterprise scale. However, over 75% of prospective funding cycles fail because the client's reporting structure cannot parse dynamic due diligence.",
        "Investors do not build valuation around optimistic slider forecasts; they build validation around historical transaction data consistency. A single unexplained batch discrepancy or manual adjustment on bank spreadsheets is enough to abort the investment review.",
        "To pass institutional capital due diligence, EAW sets up the following core accounting guidelines:",
        "1. BANK STATEMENT VERIFICATION: Ensuring cash values on ledger registers match actual statements with zero manual interventions.",
        "2. COST MATCHING REGULATION: Allocating material custom clearance duties, port holding costs, and transport overheads as part of inventory asset values rather than treating them as disconnected general sales expenses.",
        "3. INDEPENDENT INVENTORY CUSTODY: Enforcing separate handoff limits where stock values are audited on-site before cargo trucks are cleared to exit regional hubs."
      ]
    },
    {
      id: "scale-bottlenecks",
      title: "The Danger of Premature Scale: Mastering Local Product Placement",
      slug: "danger-premature-scale-local-placement",
      summary: "Why direct distribution density in a single city center outperforms fragile nationwide supply pipelines every single time.",
      category: "Strategy",
      author: "Route-to-Market Advisory Bench",
      date: "March 10, 2026",
      readTime: "5 min read",
      content: [
        "The desire to scale is a strategic trap. Founders frequently believe that expansion is an operational victory, pushing their items to multiple distant cities before local merchant loops are saturated.",
        "Expanding geographically before achieving localized efficiency results in high-cost shipping logistics, extreme field team overhead, and high physical transaction risks. If you are losing 8% on each transaction in your home city, expanding to five more cities will only multiply your losses or result in massive cash depletion.",
        "At EAW, we enforce density over spatial coverage. Our strategy centers on:",
        "• SPREAD DENSITY MODEL: Restricting transport corridors to a 20km radius until you capture 40% of the active points in that quadrant.",
        "• CONCENTRATED SALES ROSTERS: Deploying specialized sales agents on mapped routes, scheduling weekly visits to existing outlets to capture repeated volume.",
        "• LOCALIZED SHIPPING HUBS: Establishing regional storage buffers that feed trade points inside 24 hours, shielding product availability against unforeseen transport disruptions."
      ]
    },
    {
      id: "audit-margins",
      title: "Closing Warehousing Gaps: Direct Custody Models",
      slug: "closing-warehousing-gaps-custody-models",
      summary: "How modern supply operators eliminate internal shrinkage through digital handshakes, itemized weight checks, and immediate local escrow accounts.",
      category: "Operations",
      author: "Supply Chain Operations Bench",
      date: "February 18, 2026",
      readTime: "7 min read",
      content: [
        "Warehouse shrinkage represents a critical silent leak in emerging logistics corridors. Standard paper manifests are easily altered, cargo scales are rarely audited, and cargo handlers frequently write off losses to generalized 'spillage.'",
        "EAW dismantles manual accountability models. We design direct digital custody procedures that require active verification at every critical loading dock.",
        "Our warehouse operations guidelines include:",
        "• ITEM-VALUE SECURITY: We link product barcode registries directly with financial journals. If a specific item is checked out of the warehouse, it must instantly raise either an invoice or a digital transit ticket.",
        "• TRUCK WEIGHT VERIFICATION: We implement real-time weight meters on outbound vehicles. A difference of even 1.5% between standard stock dispatch weights and outbound weights halts the convoy.",
        "• CUSTODY HANDSHAKES: Every driver confirms receipt of precise cargo quantities by entering a secure code on their mobile app, transferring active financial liability to them until they reach the retail destination."
      ]
    },
    {
      id: "governance-metrics",
      title: "Unlocking Latent Valuation: Designing Strategic Boards",
      slug: "unlocking-latent-valuation-strategic-boards",
      summary: "Transitioning active founding directors away from operational firefighting to focused quarterly capital allocation objectives.",
      category: "Governance",
      author: "Corporate Governance Advisory Bench",
      date: "January 29, 2026",
      readTime: "6 min read",
      content: [
        "In fast-growing West African enterprises, founders are often trapped with operational tasks. Boards are assembled simply to fulfill legal filing mandates, rather than to serve as strategic partners for capital allocation.",
        "To unlock true market value and secure investment, the board of directors must operate as a highly structured strategic committee. We transition board agendas from general administrative summaries to strict accountability reviews.",
        "Our governance model introduces three primary structural mandates:",
        "• AUDIT CONTROL DIVISION: Establishing an independent team with direct access to physical bank records and automated ledger balances.",
        "• MANDATED LEAD TIMES: Every board packet must be compiled, audited, and distributed at least 7 days before the session. This leaves zero room for eleventh-hour surprises.",
        "• STATUTORY PERFORMANCE METRICS: Direct operational managers present results of on-ground territory metrics, exposing any gap between projected board forecasts and street-level execution."
      ]
    },
    {
      id: "rtm-tech-integration",
      title: "RTM Digitization: Choosing Tactical Field Tools Over Fluff Software",
      slug: "rtm-digitization-tactical-tools",
      summary: "A practical guide to implementing rugged, offline-capable field sales software that field agents actually use without friction.",
      category: "Operations",
      author: "Route-to-Market Advisory Bench",
      date: "January 10, 2026",
      readTime: "8 min read",
      content: [
        "Too many digital transformations fail because strategic leadership purchases expensive, complex European sales systems that are unusable in regions with intermittent data coverage and simple mobile phones.",
        "If a field sales agent must wait three minutes to load a checkout screen on a dusty retail route, they will abandon the app and revert to paper records. This breaks data visibility and leaves ledger balances stale.",
        "EAW installs rugged, high-performing offline-capable systems:",
        "1. LOCAL DATABASE BUFFERING: Order tickets, customer contacts, and transaction logs are compiled entirely locally on simple mobile apps, syncing in short sub-second bursts when cell service is found.",
        "2. ZERO-FLUFF CHECKOUT FLUTES: The checkout workflow is stripped of unnecessary graphic assets, limiting transactions to exactly three taps: select merchant, select quantity, swipe to confirm cash code.",
        "3. DATA COMPRESSION PROTOCOLS: Restructuring network pipelines to transmit entire route summaries in a lightweight 10KB payload, minimizing transport data biaya."
      ]
    },
    {
      id: "working-capital-optimization",
      title: "Working Capital Resilience: Managing 60-Day Supplier Cracks",
      slug: "working-capital-resilience-supplier-cracks",
      summary: "How to structure localized payment deferrals and inventory trade offsets during sudden regional currency corrections.",
      category: "Finance",
      author: "Systems & Accounting Audit Bench",
      date: "December 15, 2025",
      readTime: "7 min read",
      content: [
        "Emerging market currencies are prone to sudden, volatile movements. If your imports are priced in foreign currencies while your local sales are settled in regional cash, a sudden 30% devaluation can instantly destroy your working capital buffer.",
        "Relying on standard debt facilities during high-volatility events often leads to high interest rates and ultimate default. Companies must execute operational hedging to protect supplier channels.",
        "We help clients stabilize cash flows through two primary mechanisms:",
        "• TRADING OFFSETS: Settling raw material supplier contracts directly with agricultural commodities produced in corresponding local sectors.",
        "• SUPPLIER AGREEMENT STRUCTURES: Structuring trade payments in local currencies pegged to weighted averages, spreading price-hike shocks evenly across the distribution chain.",
        "• CONCENTRATING ON DOMESTIC PROCUREMENT: Gradually replacing foreign material inputs with domestic alternatives, completely insulating operations from global exchange volatility."
      ]
    }
  ];

  // Smooth scroll helper for internal page landing hashes
  const scrollToSection = (id: string) => {
    setMenuOpen(false);
    
    let targetPath = "/";
    if (id === "services-section" || id === "industries-section") {
      targetPath = "/our-services";
    } else if (id === "career-section") {
      targetPath = "/careers";
    } else if (id === "contact-section") {
      targetPath = "/contact-us";
    } else if (id === "leadership-section") {
      targetPath = "/meet-our-experts";
    } else if (id === "about-section" || id === "why-eaw-section") {
      targetPath = "/";
    }

    if (location.pathname === targetPath) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      navigate(targetPath);
      // Wait for navigation and rendering before scrolling
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }, 300);
    }
  };

  // Switch to specific blog post reader
  const handleReadPost = (postId: string) => {
    navigate(`/blog/${postId}`);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Memoized filtered posts matching BOTH keyword search and category selection
  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesSearch = 
        post.title.toLowerCase().includes(deferredSearch.toLowerCase()) || 
        post.summary.toLowerCase().includes(deferredSearch.toLowerCase()) || 
        post.content.some(paragraph => paragraph.toLowerCase().includes(deferredSearch.toLowerCase()));
        
      const matchesCategory = deferredCategory === "All" || post.category === deferredCategory;
      return matchesSearch && matchesCategory;
    });
  }, [blogPosts, deferredSearch, deferredCategory]);

  // Dynamically count posts for each category under the active search keyword
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      All: 0,
      Strategy: 0,
      Operations: 0,
      Finance: 0,
      Governance: 0
    };

    blogPosts.forEach((post) => {
      const matchesSearch = 
        post.title.toLowerCase().includes(deferredSearch.toLowerCase()) || 
        post.summary.toLowerCase().includes(deferredSearch.toLowerCase()) ||
        post.content.some(p => p.toLowerCase().includes(deferredSearch.toLowerCase()));

      if (matchesSearch) {
        counts.All += 1;
        if (counts[post.category] !== undefined) {
          counts[post.category] += 1;
        }
      }
    });

    return counts;
  }, [blogPosts, deferredSearch]);

  // Slice posts according to current pagination metrics
  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredPosts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredPosts, currentPage, itemsPerPage]);

  // Calculate total pages
  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(filteredPosts.length / itemsPerPage));
  }, [filteredPosts.length, itemsPerPage]);

  // Handle Career form submission
  const handleCareerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!careerName || !careerEmail || !careerSummary) {
      alert("Please provide all required application details requested.");
      return;
    }
    setCareerStatus("submitting");
    setTimeout(() => {
      const generatedCode = `EAW-CAR-${Math.floor(10000 + Math.random() * 90000)}`;
      setCareerCode(generatedCode);
      setCareerStatus("success");
    }, 1200);
  };

  // Reset Career form
  const resetCareerForm = () => {
    setCareerName("");
    setCareerEmail("");
    setCareerSummary("");
    setCareerStatus("idle");
    setCareerCode("");
  };

  // Handle Contact & Booking submission
  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactCompany) {
      alert("Please enter your name, corporate email, and enterprise name to request a consultation.");
      return;
    }
    setBookingStatus("submitting");

    setTimeout(() => {
      const generatedToken = `EAW-MEET-${Math.floor(10000 + Math.random() * 90000)}`;
      setBookingCode(generatedToken);
      setBookingStatus("success");
    }, 1500);
  };

  // Reset booking form
  const resetBookingForm = () => {
    setContactName("");
    setContactEmail("");
    setContactPhone("");
    setContactCompany("");
    setContactMessage("");
    setSelectedDate("");
    setBookingStatus("idle");
    setBookingCode("");
  };

  // Handle automated schedule requests via AI Advisor
  const handleScheduleFromChat = (dateTime: string, advisorName: string) => {
    navigate("/contact-us");
    
    // Auto-populate form
    setContactMessage(`Executive alignment requested via AI Intelligent Assistant.\nPreferred Schedule: ${dateTime}\nRequested Partner/Expert Consultation: ${advisorName}`);
    
    // Highlight or scroll to section
    setTimeout(() => {
      const element = document.getElementById("contact-section");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 300);
  };

  // Computed post for post reader
  const currentPost = useMemo(() => {
    return blogPosts.find((p) => p.id === activePostId) || blogPosts[0];
  }, [activePostId]);

  return (
    <div className="bg-[#030712] text-zinc-100 min-h-screen font-sans flex flex-col selection:bg-[#B08D57]/30 selection:text-white relative">
      {!introCompleted && <Preloader onComplete={() => setIntroCompleted(true)} />}
      <AnimatedBackground />
      
      {/* 1. Header/Navbar */}
      <Header 
        activeTab={activeTab}
        setActiveTab={(tab) => {
          const pathToTab: Record<string, string> = {
            home: "/",
            approach: "/our-approach",
            services: "/our-services",
            careers: "/careers",
            blog: "/blog",
            booking: "/contact-us",
          };
          navigate(pathToTab[tab] || "/");
        }}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        onBookCall={() => { navigate("/contact-us"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
        onOpenAiAgent={() => setAiAgentOpen(true)}
      />

      {/* 3. Main Content Wrapper */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          
          {/* VIEW: HOMEPAGE */}
          {activeTab === "home" && (
            <motion.div
              key="home-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-12 sm:space-y-24 pb-12 sm:pb-24"
            >
              
              {/* SECTION 1: HERO STATEMENT */}
              <HomeHeroSection 
                onExploreServices={() => scrollToSection("services-section")}
                onSecureConsultation={() => scrollToSection("contact-section")}
                onReadInsights={() => { navigate("/blog"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                onSeeApproach={() => { navigate("/our-approach"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                onOpenAiAgent={() => setAiAgentOpen(true)}
              />

              {/* SECTION 2: ABOUT EAW ADVISORY */}
              <ScrollAnimatedSection id="about-section" className="max-w-5xl mx-auto px-6 scroll-mt-36 sm:scroll-mt-48 md:scroll-mt-56 lg:scroll-mt-64">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                  
                  {/* Left Column Text */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="space-y-3">
                      <span className="text-[10px] font-mono tracking-[0.25em] text-[#B08D57] uppercase font-bold block">
                        ESTABLISHED INTEG-SYSTEM / 01
                      </span>
                      <h2 className="text-3xl min-[360px]:text-4xl sm:text-5xl font-bold text-white tracking-tight leading-[1.05] font-serif">
                        Solving the Execution Deficit in Emerging Markets.
                      </h2>
                    </div>

                    <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-sans font-normal border-l-2 border-[#B08D57] pl-4">
                      High-level strategy papers drafted in distant boardrooms frequently fail when touching the frontier markets of West Africa. The gap lies in execution: in the unmapped detours of delivery trucks, mismatched cash reconciliations, and slow reporting cadences that delay corrective decisions by several months.
                    </p>

                    <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-sans font-normal">
                      EAW Advisory was built specifically to address this issue. We do not stop at dropping off thick slide decks. We embed hands-on operators inline with your management team to install physical distribution pipelines, structure resilient financial ledgers, and establish strict corporate governance.
                    </p>

                    {/* Left-Aligned Monospace Segmented List */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 pt-6 border-t border-zinc-900 mt-8">
                      <div className="flex gap-3 items-start group">
                        <span className="text-[#B08D57] font-mono text-[11px] mt-0.5 select-none transition-transform group-hover:translate-x-0.5">[ 01 ]</span>
                        <span className="text-xs text-zinc-400 font-sans leading-normal">On-site operational partners embedded inline</span>
                      </div>
                      <div className="flex gap-3 items-start group">
                        <span className="text-[#B08D57] font-mono text-[11px] mt-0.5 select-none transition-transform group-hover:translate-x-0.5">[ 02 ]</span>
                        <span className="text-xs text-zinc-400 font-sans leading-normal">Strict quantitative results auditing</span>
                      </div>
                      <div className="flex gap-3 items-start group">
                        <span className="text-[#B08D57] font-mono text-[11px] mt-0.5 select-none transition-transform group-hover:translate-x-0.5">[ 03 ]</span>
                        <span className="text-xs text-zinc-400 font-sans leading-normal">Zero manual dual-handling leakages</span>
                      </div>
                      <div className="flex gap-3 items-start group">
                        <span className="text-[#B08D57] font-mono text-[11px] mt-0.5 select-none transition-transform group-hover:translate-x-0.5">[ 04 ]</span>
                        <span className="text-xs text-zinc-400 font-sans leading-normal">Real-time daily synchronized ledgers</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column visual layout - Bloomberg editorial style */}
                  <div className="lg:col-span-5 p-8 border border-zinc-900 relative flex flex-col justify-between h-80 overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#B08D57]/3 rounded-full blur-2xl pointer-events-none"></div>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center text-[9px] font-mono text-[#B08D57] tracking-widest font-bold">
                        <span>PRACTICAL ADVISORY</span>
                        <span>[ RATIO: 1:1 ]</span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-white font-serif tracking-tight leading-snug group-hover:text-[#B08D57] transition-colors duration-300">
                        "Your frontline operations determine your corporate valuation—not the other way around."
                      </h3>
                      <p className="text-[11px] text-zinc-500 leading-relaxed font-sans">
                        By focusing entirely on supply loops, inventory reconciliation accuracy, and agile daily communication, we secure our clients' assets before launching expansion pipelines.
                      </p>
                    </div>

                    <div className="border-t border-zinc-900 pt-4 flex justify-between items-center text-[10px] font-mono text-zinc-650">
                      <span>EST. 2026 // LAGOS HUB</span>
                      <span className="text-[#B08D57] font-bold">SYSTEM INTEGRITY</span>
                    </div>
                  </div>

                </div>
              </ScrollAnimatedSection>

              {/* SECTION 4: WHY EAW */}
              <ScrollAnimatedSection id="why-eaw-section" className="max-w-5xl mx-auto px-6 scroll-mt-36 sm:scroll-mt-48 md:scroll-mt-56 lg:scroll-mt-64">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start pb-12 border-b border-zinc-900">
                  
                  {/* Why EAW Intro */}
                  <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-72">
                    <span className="text-[10px] font-mono tracking-[0.25em] text-[#B08D57] uppercase font-bold block mb-2">
                      SYSTEM COMPLIANCE / 02
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight font-serif leading-[1.05]">
                      What Makes EAW Radically Different.
                    </h2>
                    <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-sans">
                      We define our partners not by the slideshow presentations they display, but by the physical cash leakage they resolve and the structural discipline they embed.
                    </p>
                  </div>

                  {/* Why EAW Rows (No generic card boxes!) */}
                  <div className="lg:col-span-7 divide-y divide-zinc-900">
                    
                    <div className="py-6 group grid grid-cols-[auto_1fr] items-start gap-x-5 transition-all duration-300 hover:bg-zinc-950/10 rounded-lg px-2" id="why-eaw-row-1">
                      <span className="text-xl font-serif text-[#B08D57]/30 group-hover:text-[#B08D57] transition-all font-bold select-none col-start-1 pt-0.5" id="why-eaw-number-1">// 01</span>
                      <div className="col-start-2 pl-4 border-l border-zinc-900/80 group-hover:border-[#B08D57]/30 transition-colors space-y-2 text-left" id="why-eaw-content-1">
                        <h4 className="font-bold text-white text-sm font-serif group-hover:translate-x-1 transition-transform">No Mock Templates</h4>
                        <p className="text-zinc-400 text-xs font-sans leading-relaxed max-w-sm" id="why-eaw-desc-1">
                          We do not deploy generic corporate toolkits. We map your specific distribution channels, locate bottlenecks, and write bespoke operational blueprints.
                        </p>
                      </div>
                    </div>

                    <div className="py-6 group grid grid-cols-[auto_1fr] items-start gap-x-5 transition-all duration-300 hover:bg-zinc-950/10 rounded-lg px-2" id="why-eaw-row-2">
                      <span className="text-xl font-serif text-[#B08D57]/30 group-hover:text-[#B08D57] transition-all font-bold select-none col-start-1 pt-0.5" id="why-eaw-number-2">// 02</span>
                      <div className="col-start-2 pl-4 border-l border-zinc-900/80 group-hover:border-[#B08D57]/30 transition-colors space-y-2 text-left" id="why-eaw-content-2">
                        <h4 className="font-bold text-white text-sm font-serif group-hover:translate-x-1 transition-transform">Partner-Led</h4>
                        <p className="text-zinc-400 text-xs font-sans leading-relaxed max-w-sm" id="why-eaw-desc-2">
                          Your operational account is managed inline by active tactical directors who possess years of proven on-the-ground frontier regional industry expertise.
                        </p>
                      </div>
                    </div>

                    <div className="py-6 group grid grid-cols-[auto_1fr] items-start gap-x-5 transition-all duration-300 hover:bg-zinc-950/10 rounded-lg px-2" id="why-eaw-row-3">
                      <span className="text-xl font-serif text-[#B08D57]/30 group-hover:text-[#B08D57] transition-all font-bold select-none col-start-1 pt-0.5" id="why-eaw-number-3">// 03</span>
                      <div className="col-start-2 pl-4 border-l border-zinc-900/80 group-hover:border-[#B08D57]/30 transition-colors space-y-2 text-left" id="why-eaw-content-3">
                        <h4 className="font-bold text-white text-sm font-serif group-hover:translate-x-1 transition-transform">On-The-Route</h4>
                        <p className="text-zinc-400 text-xs font-sans leading-relaxed max-w-sm" id="why-eaw-desc-3">
                          We physically join drivers on transit corridors to evaluate delivery clusters and plug working capital friction directly on raw trade routes.
                        </p>
                      </div>
                    </div>

                    <div className="py-6 group grid grid-cols-[auto_1fr] items-start gap-x-5 transition-all duration-300 hover:bg-zinc-950/10 rounded-lg px-2" id="why-eaw-row-4">
                      <span className="text-xl font-serif text-[#B08D57]/30 group-hover:text-[#B08D57] transition-all font-bold select-none col-start-1 pt-0.5" id="why-eaw-number-4">// 04</span>
                      <div className="col-start-2 pl-4 border-l border-zinc-900/80 group-hover:border-[#B08D57]/30 transition-colors space-y-2 text-left" id="why-eaw-content-4">
                        <h4 className="font-bold text-white text-sm font-serif group-hover:translate-x-1 transition-transform">Absolute Shield</h4>
                        <p className="text-zinc-400 text-xs font-sans leading-relaxed max-w-sm" id="why-eaw-desc-4">
                          We design ledger matching systems configured to automatically balance bank transfers and block dual-handling overhead expenses instantly.
                        </p>
                      </div>
                    </div>

                  </div>

                </div>
              </ScrollAnimatedSection>

              {/* SECTION 6: LEADERSHIP / MEET OUR EXPERTS */}
              <ScrollAnimatedSection id="leadership-section" className="max-w-6xl mx-auto px-6 scroll-mt-36 sm:scroll-mt-48 md:scroll-mt-56 lg:scroll-mt-64">
                
                {/* Header block with elegant McKinsey-style dual-column alignment */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-zinc-900 items-end mb-12">
                  <div className="lg:col-span-6 space-y-4">
                    <span className="text-[11px] font-mono tracking-[0.3em] text-[#B08D57] uppercase font-bold block">
                      GOVERNANCE BOARD / 03
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#ffffff] tracking-tight font-serif leading-[1.1]">
                      Meet Our Experts.
                    </h2>
                  </div>
                  <div className="lg:col-span-6 lg:border-l lg:border-zinc-900 lg:pl-10">
                    <p className="text-zinc-400 font-sans text-xs sm:text-sm leading-relaxed">
                      Our team combines deep industry knowledge, strategic thinking, operational excellence, and technology expertise to help organizations achieve measurable business results. We don’t just consult—we execute directly with you in the field.
                    </p>
                  </div>
                </div>

                {/* A Glance Level Highlight Counters / Cards */}
                <div className="mb-16">
                  <span className="text-[10px] font-mono tracking-[0.2em] text-zinc-500 uppercase font-bold block mb-6">
                    OUR EXPERTISE AT A GLANCE
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left" id="operational-metrics-grid">
                    
                    {/* Stat 1: Business Transformation */}
                    <div className="bg-[#0b1c33]/30 backdrop-blur-md border border-zinc-800/60 p-6 rounded-lg flex flex-col justify-between hover:border-[#B08D57]/30 transition-all duration-300 group text-left break-words overflow-hidden w-full h-full min-h-[160px]">
                      <div>
                        <span className="text-2xl font-serif text-[#B08D57] font-bold block mb-1 group-hover:scale-[1.03] transition-transform origin-left">+45%</span>
                        <h3 className="text-xs font-bold text-zinc-200 tracking-tight font-sans">Business Transformation</h3>
                      </div>
                      <p className="text-[10px] text-zinc-500 font-sans mt-3 leading-snug">Average client revenue acceleration achieved through integrated commercial engines.</p>
                    </div>

                    {/* Stat 2: Operations Excellence */}
                    <div className="bg-[#0b1c33]/30 backdrop-blur-md border border-zinc-800/60 p-6 rounded-lg flex flex-col justify-between hover:border-[#B08D57]/30 transition-all duration-300 group text-left break-words overflow-hidden w-full h-full min-h-[160px]">
                      <div>
                        <span className="text-2xl font-serif text-[#B08D57] font-bold block mb-1 group-hover:scale-[1.03] transition-transform origin-left">120+</span>
                        <h3 className="text-xs font-bold text-zinc-200 tracking-tight font-sans">Operations Excellence</h3>
                      </div>
                      <p className="text-[10px] text-zinc-500 font-sans mt-3 leading-snug">Trade routes fully geocoded, audited, and optimized to eliminate local leakages.</p>
                    </div>

                    {/* Stat 3: AI & Digital Innovation */}
                    <div className="bg-[#0b1c33]/30 backdrop-blur-md border border-zinc-800/60 p-6 rounded-lg flex flex-col justify-between hover:border-[#B08D57]/30 transition-all duration-300 group text-left break-words overflow-hidden w-full h-full min-h-[160px]">
                      <div>
                        <span className="text-2xl font-serif text-[#B08D57] font-bold block mb-1 group-hover:scale-[1.03] transition-transform origin-left">15M+</span>
                        <h3 className="text-xs font-bold text-zinc-200 tracking-tight font-sans">AI & Digital Innovation</h3>
                      </div>
                      <p className="text-[10px] text-zinc-500 font-sans mt-3 leading-snug">Daily transaction ledger balances automated, converting COD cash with total control.</p>
                    </div>

                    {/* Stat 4: Organizational Development */}
                    <div className="bg-[#0b1c33]/30 backdrop-blur-md border border-zinc-800/60 p-6 rounded-lg flex flex-col justify-between hover:border-[#B08D57]/30 transition-all duration-300 group text-left break-words overflow-hidden w-full h-full min-h-[160px]">
                      <div>
                        <span className="text-2xl font-serif text-[#B08D57] font-bold block mb-1 group-hover:scale-[1.03] transition-transform origin-left">3K+</span>
                        <h3 className="text-xs font-bold text-zinc-200 tracking-tight font-sans">Organizational Development</h3>
                      </div>
                      <p className="text-[10px] text-zinc-500 font-sans mt-3 leading-snug font-normal">Frontline agents and local distributors fully upskilled and performance-coached.</p>
                    </div>

                    {/* Stat 5: Strategic Advisory */}
                    <div className="bg-[#0b1c33]/30 backdrop-blur-md border border-zinc-800/60 p-6 rounded-lg flex flex-col justify-between hover:border-[#B08D57]/30 transition-all duration-300 group text-left break-words overflow-hidden w-full h-full min-h-[160px] sm:col-span-2 lg:col-span-4 xl:col-span-4">
                      <div>
                        <span className="text-2xl font-serif text-[#B08D57] font-bold block mb-1 group-hover:scale-[1.03] transition-transform origin-left">$120M+</span>
                        <h3 className="text-xs font-bold text-zinc-200 tracking-tight font-sans">Strategic Advisory</h3>
                      </div>
                      <p className="text-[10px] text-zinc-500 font-sans mt-3 leading-snug">In institutional growth capital readiness unlocked for mid-market founders.</p>
                    </div>

                  </div>
                </div>

                {/* Experts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
                  {EXPERTS_DATA.map((expert) => (
                    <div 
                      key={expert.id}
                      onClick={() => setSelectedExpert(expert)}
                      className="group relative rounded-xl overflow-hidden bg-[#091523]/65 border border-zinc-800/80 backdrop-blur-md p-5 flex flex-col justify-between hover:scale-[1.02] hover:border-[#B08D57]/40 hover:shadow-2xl hover:shadow-[#B08D57]/5 transition-all duration-500 cursor-pointer"
                    >
                      {/* Gold hover light rays */}
                      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#B08D57]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                      
                      <div>
                        {/* Elegant avatar inside card */}
                        <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-5 bg-zinc-950">
                          <img 
                            src={expert.avatar}
                            alt={expert.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              const target = e.currentTarget;
                              if (expert.avatarFallback && target.src !== expert.avatarFallback) {
                                target.src = expert.avatarFallback;
                              } else {
                                target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600";
                              }
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-40 group-hover:opacity-20 transition-opacity duration-500" />
                          
                          {/* Gold premium indicator */}
                          <div className="absolute top-3 right-3 bg-zinc-950/95 backdrop-blur-md border border-[#B08D57]/40 text-[#B08D57] font-mono text-[9px] px-2.5 py-1 rounded-full uppercase tracking-wider font-bold">
                            {expert.experience}
                          </div>
                        </div>

                        {/* Title block */}
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between gap-1">
                            <h3 className="text-base font-bold text-white font-serif tracking-tight group-hover:text-[#B08D57]/90 transition-colors line-clamp-1">
                              {expert.name}
                            </h3>
                            <div className="flex items-center gap-1.5 flex-shrink-0">
                              {expert.linkedin && (
                                <a 
                                  href={expert.linkedin}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="text-zinc-500 hover:text-[#B08D57] transition-colors p-1 rounded hover:bg-zinc-800/30 flex items-center justify-center"
                                  title="View LinkedIn Profile"
                                >
                                  <Linkedin size={15} />
                                </a>
                              )}
                              <span className="text-zinc-500 group-hover:text-[#B08D57]/95 transition-colors">
                                <ArrowUpRight size={15} className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                              </span>
                            </div>
                          </div>
                          <p className="text-[10px] font-mono uppercase tracking-widest text-[#B08D57] font-semibold line-clamp-2 min-h-[30px]">
                            {expert.title}
                          </p>
                        </div>
                      </div>

                      {/* Hover specializations list */}
                      <div className="mt-5 pt-4 border-t border-zinc-900/40 group-hover:border-[#B08D57]/20 transition-all">
                        <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block mb-1.5 font-semibold">Core Specializations</span>
                        <div className="flex flex-wrap gap-1">
                          {expert.specializations.slice(0, 3).map((spec, i) => (
                            <span key={i} className="text-[8px] text-[#B08D57] bg-[#B08D57]/5 border border-[#B08D57]/15 px-1.5 py-0.5 rounded">
                              {spec}
                            </span>
                          ))}
                          {expert.specializations.length > 3 && (
                            <span className="text-[8px] text-zinc-400 px-1 py-0.5">
                              +{expert.specializations.length - 3} more
                            </span>
                          )}
                        </div>
                        <div className="mt-3.5 text-[9px] text-zinc-500 group-hover:text-zinc-200 flex items-center gap-1 font-sans font-medium transition-colors">
                          <span>View Credentials</span>
                          <span className="text-[#B08D57]">→</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* PREMIUM GLASSMORPHIC MODAL WINDOW WITH ENTRANCE ANIMATIONS */}
                <AnimatePresence>
                  {selectedExpert && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
                    >
                      {/* Backdrop click closer */}
                      <div className="absolute inset-0 cursor-default" onClick={() => setSelectedExpert(null)} />
                      
                      {/* Modal Content Box */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 15 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 15 }}
                        transition={{ type: "spring", duration: 0.4, bounce: 0.15 }}
                        className="relative w-full max-w-3xl bg-[#091523]/95 border border-zinc-800/80 rounded-2xl overflow-hidden shadow-2xl z-10 text-left flex flex-col md:flex-row max-h-[90vh] md:max-h-[85vh] overflow-y-auto md:overflow-visible"
                      >
                        {/* Premium golden header micro line */}
                        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#B08D57] to-transparent" />

                        {/* Profile Photo sidebar */}
                        <div className="w-full md:w-2/5 relative min-h-[220px] md:min-h-auto bg-zinc-950 flex-shrink-0">
                          <img 
                            src={selectedExpert.avatar} 
                            alt={selectedExpert.name}
                            className="w-full h-full object-cover absolute inset-0"
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              const target = e.currentTarget;
                              if (selectedExpert.avatarFallback && target.src !== selectedExpert.avatarFallback) {
                                target.src = selectedExpert.avatarFallback;
                              } else {
                                target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600";
                              }
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#091523] via-transparent to-transparent opacity-85 md:opacity-40" />
                          
                          {/* Close button inside mobile version */}
                          <div className="absolute inset-x-0 bottom-0 p-5 z-10 bg-gradient-to-t from-[#091523] via-[#091523]/25 to-transparent md:hidden">
                            <span className="text-[10px] font-mono uppercase tracking-widest text-[#B08D57] font-bold">
                              {selectedExpert.experience}
                            </span>
                            <div className="flex items-center justify-between gap-2 mt-0.5">
                              <h2 className="text-2xl font-bold font-serif text-white tracking-tight">{selectedExpert.name}</h2>
                              {selectedExpert.linkedin && (
                                <a 
                                  href={selectedExpert.linkedin} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className="text-zinc-300 hover:text-[#B08D57] transition-colors p-1.5 bg-[#091523]/80 backdrop-blur-sm rounded border border-zinc-800"
                                >
                                  <Linkedin size={15} />
                                </a>
                              )}
                            </div>
                            <p className="text-xs text-zinc-400 font-sans mt-0.5">{selectedExpert.title}</p>
                          </div>

                          {/* Desktop Experience widget */}
                          <div className="hidden md:block absolute bottom-6 left-6 right-6 bg-[#091523]/95 backdrop-blur-md border border-zinc-850 p-4 rounded-xl shadow-lg">
                            <span className="text-[9px] font-mono text-[#B08D57] uppercase tracking-wider block mb-1">TRACK RECORD</span>
                            <div className="text-xl font-bold text-white font-serif">{selectedExpert.experience}</div>
                            <div className="text-[10px] text-zinc-400 mt-1">Of active, field-governed market execution</div>
                          </div>
                        </div>

                        {/* Credentials Content Area */}
                        <div className="w-full md:w-3/5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[70vh] md:max-h-[85vh]">
                          
                          {/* Top-Right Absolute Close */}
                          <button 
                            onClick={() => setSelectedExpert(null)}
                            className="absolute top-4 right-4 z-20 p-2 text-zinc-400 hover:text-white hover:bg-zinc-900/50 rounded-full transition-colors border border-zinc-800/40 bg-zinc-950/70 backdrop-blur-sm"
                            aria-label="Close modal"
                          >
                            <X size={15} />
                          </button>

                          <div className="space-y-5">
                            {/* Desktop Header */}
                            <div className="hidden md:block space-y-1">
                              <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#B08D57] font-bold">
                                SENIOR CONSULTING CREDENTIALS
                              </span>
                              <div className="flex items-center justify-between gap-3">
                                <h2 className="text-3xl font-serif text-white tracking-tight font-extrabold">
                                  {selectedExpert.name}
                                </h2>
                                {selectedExpert.linkedin && (
                                  <a 
                                    href={selectedExpert.linkedin} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="text-zinc-400 hover:text-[#B08D57] transition-colors p-1.5 bg-zinc-900/60 rounded border border-zinc-800 flex items-center justify-center hover:scale-105"
                                    title="View LinkedIn Profile"
                                  >
                                    <Linkedin size={16} />
                                  </a>
                                )}
                              </div>
                              <p className="text-xs text-zinc-400 mt-1">
                                {selectedExpert.title}
                              </p>
                            </div>

                            {/* Luxury tagline callout */}
                            <div className="border-l-2 border-[#B08D57] pl-4 italic text-zinc-200 text-xs sm:text-sm my-3 font-serif bg-gradient-to-r from-[#B08D57]/5 to-transparent py-2.5 pr-2 rounded-r-lg">
                              "{selectedExpert.tagline}"
                            </div>

                            {/* Biography */}
                            <div className="space-y-4 text-xs sm:text-[13px] text-zinc-300 leading-relaxed font-sans">
                              <p>{selectedExpert.biography}</p>

                              {/* Two columns: Expertise details + Industries served */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-zinc-800/50">
                                <div>
                                  <h4 className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold mb-2 flex items-center gap-1.5">
                                    <Award size={12} className="text-[#B08D57]" /> Expertise Areas
                                  </h4>
                                  <ul className="space-y-1.5 text-zinc-300">
                                    {selectedExpert.expertiseDetails.map((item, idx) => (
                                      <li key={idx} className="flex gap-1.5 items-start text-[11px]">
                                        <span className="text-[#B08D57] text-[10px] mt-0.5">•</span>
                                        <span>{item}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                <div>
                                  <h4 className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold mb-2 flex items-center gap-1.5">
                                    <Briefcase size={12} className="text-[#B08D57]" /> Sectors Served
                                  </h4>
                                  <ul className="space-y-1.5 text-zinc-300">
                                    {selectedExpert.industriesServed.map((item, idx) => (
                                      <li key={idx} className="flex gap-1.5 items-start text-[11px]">
                                        <span className="text-emerald-500 text-[10px] mt-0.5">✓</span>
                                        <span>{item}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>

                              {/* Leadership Summary Panel */}
                              <div className="pt-4 border-t border-zinc-800/50">
                                <h4 className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold mb-1.5">
                                  Leadership & Track Record
                                </h4>
                                <p className="text-[11px] text-zinc-400">
                                  {selectedExpert.experienceSummary}
                                </p>
                              </div>

                              {/* Philosophy summary */}
                              <div className="pt-4 border-t border-zinc-800/50">
                                <h4 className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold mb-1">
                                  Professional Philosophy
                                </h4>
                                <p className="text-[11px] text-zinc-400 italic font-serif bg-zinc-950/20 p-2.5 rounded border border-zinc-900/60 leading-relaxed">
                                  "{selectedExpert.philosophy}"
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Close & Booking CTA */}
                          <div className="mt-8 pt-4 border-t border-zinc-850 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <span className="text-[10px] font-mono text-zinc-500">
                              * Subject to scheduling board clearances.
                            </span>
                            <div className="flex items-center gap-2.5">
                              <button
                                onClick={() => setSelectedExpert(null)}
                                className="px-4 py-2 text-xs font-mono tracking-wider font-semibold text-zinc-400 hover:text-white transition-colors"
                              >
                                Close
                              </button>
                              <button
                                onClick={() => {
                                  // Determine appropriate challenge & route message
                                  let challengeLabel = "Route-to-Market Pipeline";
                                  if (selectedExpert.id === "edwin") challengeLabel = "Agile Board Cadencing";
                                  if (selectedExpert.id === "winmax") challengeLabel = "Financial Ledger Systems";
                                  if (selectedExpert.id === "amina") challengeLabel = "Digital Transformation Strategy";
                                  if (selectedExpert.id === "dapo") challengeLabel = "Finance & ERP Transformation";
                                  if (selectedExpert.id === "bankole") challengeLabel = "AI Automation & Intelligent Workflows";

                                  setContactChallenge(challengeLabel);
                                  setContactMessage(`Initial scheduling request to initiate brief advisory consultations with ${selectedExpert.name}, ${selectedExpert.title}. Looking to secure structured insights into: ${selectedExpert.specializations.join(", ")}.`);
                                  
                                  // Close modal
                                  setSelectedExpert(null);
                                  
                                  // Scroll seamlessly to form 
                                  scrollToSection("contact-section");
                                }}
                                className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#B08D57] hover:bg-[#967746] text-[#091523] font-bold text-xs uppercase tracking-wider rounded-lg transition-transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg font-mono"
                              >
                                Contact Consultant <ArrowUpRight size={13} />
                              </button>
                            </div>
                          </div>

                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Closing quote */}
                <div className="text-center max-w-3xl mx-auto pt-8 border-t border-zinc-900/60 transition-all">
                  <p className="text-[#B08D57] font-serif italic text-sm sm:text-base md:text-lg leading-relaxed font-normal">
                    "Every engagement is supported by experienced professionals committed to delivering practical solutions, measurable outcomes, and sustainable growth."
                  </p>
                </div>

              </ScrollAnimatedSection>

            </motion.div>
          )}

          {/* VIEW: SERVICES & SECTORS */}
          {activeTab === "services" && (
            <motion.div
              key="services-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.25 }}
              className="py-12 space-y-12 sm:space-y-20 pb-16 sm:pb-24"
            >
              {/* Standalone Header */}
              <div className="max-w-5xl mx-auto px-6 text-center space-y-4">
                <span className="text-xs font-mono tracking-widest text-[#B08D57] uppercase font-bold block">
                  WHAT WE DELIVER
                </span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-serif leading-tight">
                  Advisory Services & Sector Expertise
                </h1>
                <p className="text-zinc-400 font-sans text-xs sm:text-sm max-w-xl mx-auto">
                  Our core methodologies are engineered for margin protection, direct-to-retail distribution, and robust enterprise governance across West Africa.
                </p>
              </div>

              <ServicesSection />
            </motion.div>
          )}

          {/* VIEW: JOIN OUR BENCH */}
          {activeTab === "careers" && (
            <motion.div
              key="careers-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.25 }}
              className="py-12 pb-16 sm:pb-24 space-y-12"
            >
              {/* Standalone Header */}
              <div className="max-w-5xl mx-auto px-6 text-center space-y-4">
                <span className="text-xs font-mono tracking-widest text-[#B08D57] uppercase font-bold block">
                  TALENT BENCH ACQUISITION
                </span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-serif leading-tight">
                  Join EAW Advisory Team
                </h1>
                <p className="text-zinc-400 font-sans text-xs sm:text-sm max-w-xl mx-auto">
                  Submit your strategic executive profile and experience credentials directly to our lead partner selection board.
                </p>
              </div>

              <CareersSection 
                careerStatus={careerStatus}
                careerName={careerName}
                setCareerName={setCareerName}
                careerEmail={careerEmail}
                setCareerEmail={setCareerEmail}
                careerSpecialty={careerSpecialty}
                setCareerSpecialty={setCareerSpecialty}
                careerSummary={careerSummary}
                setCareerSummary={setCareerSummary}
                careerCode={careerCode}
                handleCareerSubmit={handleCareerSubmit}
                resetCareerForm={resetCareerForm}
              />
            </motion.div>
          )}

          {/* VIEW: BOOK BRIEFING & CONTACT */}
          {activeTab === "booking" && (
            <motion.div
              key="booking-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.25 }}
              className="py-12 pb-16 sm:pb-24 space-y-12"
            >
              {/* Standalone Header */}
              <div className="max-w-5xl mx-auto px-6 text-center space-y-4">
                <span className="text-xs font-mono tracking-widest text-[#B08D57] uppercase font-bold block">
                  ENGAGEMENT PROTOCOLS
                </span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-serif leading-tight">
                  Secure Your Tactical Briefing
                </h1>
                <p className="text-zinc-400 font-sans text-xs sm:text-sm max-w-xl mx-auto">
                  Schedule direct calendar time with our managing team and coordinate on-site route audits for your enterprise.
                </p>
              </div>

              <BookingSection 
                contactName={contactName}
                setContactName={setContactName}
                contactEmail={contactEmail}
                setContactEmail={setContactEmail}
                contactCompany={contactCompany}
                setContactCompany={setContactCompany}
                contactPhone={contactPhone}
                setContactPhone={setContactPhone}
                contactRevenue={contactRevenue}
                setContactRevenue={setContactRevenue}
                contactChallenge={contactChallenge}
                setContactChallenge={setContactChallenge}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                selectedTime={selectedTime}
                setSelectedTime={setSelectedTime}
                contactMessage={contactMessage}
                setContactMessage={setContactMessage}
                bookingStatus={bookingStatus}
                bookingCode={bookingCode}
                handleBookingSubmit={handleBookingSubmit}
                resetBookingForm={resetBookingForm}
              />
            </motion.div>
          )}

          {/* VIEW: INSIGHTS BLOG */}
          {activeTab === "blog" && (
            <motion.div
              key="blog-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.25 }}
              className="max-w-5xl mx-auto px-6 py-12 space-y-12"
              id="blog-tab-content"
            >
              
              {/* Blog Title Header */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-900 pb-8">
                <div className="space-y-3">
                  <span className="text-xs font-mono tracking-widest text-[#B08D57] uppercase font-bold block">
                    EXECUTIVE PERSPECTIVES
                  </span>
                  <h1 className="text-2xl min-[360px]:text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-serif leading-[1.15] md:leading-tight">
                    Insights & Analysis
                  </h1>
                  <p className="text-zinc-500 font-sans text-xs sm:text-sm max-w-xl">
                    Pragmatic, system-oriented guidance written by current active partners to defend frontier operational margins.
                  </p>
                </div>

                {/* Return button */}
                <button
                  onClick={() => { navigate("/"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className="px-4 py-2 border border-zinc-800 hover:border-zinc-500 rounded-lg text-xs font-semibold text-zinc-400 hover:text-white uppercase transition-colors cursor-pointer w-fit"
                >
                  ← Back to Home
                </button>
              </div>

              {/* Research Bar & Category selectors */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                
                {/* Search Term */}
                <div className="md:col-span-6 relative">
                  <input 
                    type="text"
                    value={blogSearch}
                    onChange={(e) => setBlogSearch(e.target.value)}
                    placeholder="Search strategic keywords (e.g. leakage, cadence, RTM)..."
                    className="w-full bg-zinc-950 border border-[#2b3341] focus:border-[#B08D57] rounded-xl p-3 pl-10 text-base md:text-xs text-white placeholder-zinc-500 font-sans focus:outline-none"
                  />
                  <Search size={14} className="text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>

                {/* Categories */}
                <div className="md:col-span-6 flex flex-wrap gap-2 md:justify-end">
                  {["All", "Strategy", "Operations", "Finance", "Governance"].map((cat) => {
                    const count = categoryCounts[cat] || 0;
                    const isActive = blogCategory === cat;
                    return (
                      <button
                        key={cat}
                        onClick={() => setBlogCategory(cat)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all flex items-center gap-1.5 border ${
                          isActive 
                            ? "bg-[#B08D57] border-[#B08D57] text-white font-bold" 
                            : "bg-zinc-950/80 border-zinc-900 text-zinc-400 hover:text-white"
                        }`}
                      >
                        <span>{cat}</span>
                        <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-zinc-900 text-zinc-500"
                        }`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>

              </div>

              {/* Grid of posts */}
              {paginatedPosts.length > 0 ? (
                <div className="space-y-8 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {paginatedPosts.map((post) => (
                      <motion.div 
                        key={post.id}
                        layout
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => handleReadPost(post.id)}
                        className="p-6 bg-zinc-950/60 border border-zinc-900 hover:border-[#B08D57]/30 transition-all rounded-3xl space-y-4 shadow-lg cursor-pointer flex flex-col justify-between h-80 group overflow-hidden"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono tracking-widest text-[#B08D57] bg-[#B08D57]/15 px-2.5 py-1 rounded uppercase font-bold">
                              {post.category}
                            </span>
                            <span className="text-[10px] font-mono text-zinc-500 flex items-center gap-1">
                              <Clock size={10} />
                              {post.readTime}
                            </span>
                          </div>
                          
                          <h3 className="text-lg font-bold text-white font-serif group-hover:text-[#B08D57] transition-colors leading-snug">
                            {post.title}
                          </h3>

                          <p className="text-zinc-400 text-xs font-sans leading-relaxed line-clamp-3">
                            {post.summary}
                          </p>
                        </div>

                        <div className="border-t border-zinc-900 pt-3.5 flex justify-between items-center text-xs text-zinc-500 font-sans">
                          <span>By {post.author}</span>
                          <span className="text-[#B08D57] uppercase font-mono text-[10px] font-bold tracking-wider group-hover:translate-x-1.5 transition-transform flex items-center gap-1">
                            Read Document <ChevronRight size={12} />
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Responsive Pagination row */}
                  <div className="border-t border-zinc-900 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    
                    {/* Items tracker */}
                    <div className="flex items-center gap-4 text-xs font-sans text-zinc-500">
                      <span>
                        Showing <strong className="text-zinc-300">{(currentPage - 1) * itemsPerPage + 1}</strong> to{" "}
                        <strong className="text-zinc-300">
                          {Math.min(currentPage * itemsPerPage, filteredPosts.length)}
                        </strong> of <strong className="text-zinc-300">{filteredPosts.length}</strong> matching strategic documents
                      </span>

                      <div className="hidden sm:flex items-center gap-1.5 font-sans">
                        <span className="text-[10px] text-zinc-650 uppercase font-mono tracking-wider">Page Size:</span>
                        <select
                          value={itemsPerPage}
                          onChange={(e) => {
                            setItemsPerPage(Number(e.target.value));
                            setCurrentPage(1);
                          }}
                          className="bg-zinc-950 border border-zinc-90 w-full text-zinc-400 p-2 text-base md:text-[11px] rounded cursor-pointer focus:outline-none focus:border-[#B08D57] font-sans md:py-0.5"
                        >
                          <option value={2}>2 Briefs</option>
                          <option value={4}>4 Briefs</option>
                          <option value={6}>6 Briefs</option>
                          <option value={10}>10 Briefs</option>
                        </select>
                      </div>
                    </div>

                    {/* Pagination Button set */}
                    {totalPages > 1 && (
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                          disabled={currentPage === 1}
                          className="p-1.5 rounded-lg bg-zinc-950 border border-zinc-900 hover:border-zinc-700 disabled:opacity-30 disabled:hover:border-zinc-900 text-zinc-400 hover:text-white transition-all cursor-pointer"
                          title="Previous Page"
                        >
                          <ChevronLeft size={16} />
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                          const isSelected = pageNum === currentPage;
                          return (
                            <button
                              key={pageNum}
                              onClick={() => setCurrentPage(pageNum)}
                              className={`w-8 h-8 rounded-lg text-xs font-mono font-bold border transition-all cursor-pointer ${
                                isSelected
                                  ? "bg-[#B08D57] border-[#B08D57] text-white shadow-lg shadow-[#B08D57]/15"
                                  : "bg-zinc-950/80 border-zinc-900 text-zinc-400 hover:border-zinc-700 hover:text-white"
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        })}

                        <button
                          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                          disabled={currentPage === totalPages}
                          className="p-1.5 rounded-lg bg-zinc-950 border border-zinc-900 hover:border-zinc-700 disabled:opacity-30 disabled:hover:border-zinc-900 text-zinc-400 hover:text-white transition-all cursor-pointer"
                          title="Next Page"
                        >
                          <ChevronRight size={16} />
                        </button>
                      </div>
                    )}

                  </div>

                </div>
              ) : (
                <div className="text-center py-20 border border-zinc-900 rounded-3xl bg-zinc-950/30">
                  <BookOpen size={36} className="text-zinc-700 mx-auto mb-3" />
                  <p className="text-xs text-zinc-500 font-sans">No executive briefs matching your search queries were located.</p>
                  <button 
                    onClick={() => { setBlogSearch(""); setBlogCategory("All"); }}
                    className="text-xs font-mono text-[#B08D57] hover:underline mt-2 cursor-pointer font-bold"
                  >
                    Reset Filter Search
                  </button>
                </div>
              )}

            </motion.div>
          )}

          {/* VIEW: BLOG POST READER */}
          {activeTab === "post" && (
            <motion.div
              key="post-reader"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.25 }}
              className="max-w-3xl mx-auto px-6 py-12 space-y-8"
              id="blog-post-view"
            >
              
              {/* Back button */}
              <button
                onClick={() => { navigate("/blog"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className="text-xs font-mono text-[#B08D57] hover:text-[#8C6A35] flex items-center gap-1 cursor-pointer font-semibold uppercase tracking-wider"
                id="blog-back-to-briefs"
              >
                ← Back to Executive Briefs
              </button>

              {/* Post Metadata Header */}
              <div className="space-y-4 border-b border-zinc-950 pb-8">
                <div className="flex items-center gap-3 text-xs font-mono">
                  <span className="text-xs text-[#B08D57] font-bold uppercase">{currentPost.category} ARTICLE</span>
                  <span className="text-zinc-700">•</span>
                  <span className="text-zinc-500">{currentPost.date}</span>
                  <span className="text-zinc-700">•</span>
                  <span className="text-zinc-500">{currentPost.readTime}</span>
                </div>

                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white font-serif tracking-tight leading-tight">
                  {currentPost.title}
                </h1>

                <p className="text-zinc-400 font-sans text-xs sm:text-sm italic leading-relaxed border-l-2 border-[#B08D57] pl-4">
                  {currentPost.summary}
                </p>

                <div className="flex items-center gap-3 pt-2">
                  <div className="w-8 h-8 rounded-full bg-[#B08D57]/20 flex items-center justify-center text-xs font-mono font-bold text-[#B08D57]">
                    EAW
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono text-zinc-500 block">Advisory Author</span>
                    <span className="text-xs text-white font-sans font-semibold">{currentPost.author}</span>
                  </div>
                </div>
              </div>

              {/* Long form Body Content */}
              <div className="space-y-6 text-zinc-300 font-sans text-xs sm:text-sm leading-relaxed font-normal">
                {currentPost.content.map((paragraph, index) => {
                  if (paragraph.startsWith("•") || paragraph.match(/^\d\./)) {
                    // special styling for list elements/tactical lists
                    return (
                      <div key={index} className="p-4 bg-zinc-950/40 border border-zinc-950 rounded-xl leading-relaxed">
                        <p className="font-sans text-zinc-300">{paragraph}</p>
                      </div>
                    );
                  }
                  return (
                    <p key={index} className="leading-relaxed">
                      {paragraph}
                    </p>
                  );
                })}
              </div>

              {/* Call to action section below article */}
              <div className="mt-12 p-8 bg-zinc-950/80 border border-zinc-900 rounded-3xl space-y-4 text-center">
                <h4 className="font-bold text-white text-base font-serif">Apply These Operating Systems to Your Corporation</h4>
                <p className="text-xs text-zinc-450 max-w-md mx-auto leading-normal">
                  Our tactical directors help leading organizations implement on-site Route-to-Market structures and automate daily digital ledger bookkeeping.
                </p>
                <button
                  onClick={() => scrollToSection("contact-section")}
                  className="bg-[#B08D57] text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-lg hover:bg-[#8C6A35] transition-all cursor-pointer inline-flex items-center gap-2"
                >
                  <span>Schedule Executive Briefing</span>
                  <ArrowRight size={12} />
                </button>
              </div>

            </motion.div>
          )}

          {/* VIEW: OUR ROADMAP / APPROACH METHODOLOGY */}
          {activeTab === "approach" && (
            <motion.div
              key="approach-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ApproachSection 
                onBackToOverview={() => { navigate("/"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                onBookConsultation={() => { navigate("/contact-us"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              />
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* 4. Footer */}
      <footer className="bg-zinc-950 border-t border-zinc-900 py-12 text-zinc-500 text-xs">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center">
              <Logo size="sm" />
            </div>
            <p className="max-w-sm text-zinc-500 text-[11px] leading-relaxed">
              Leading Route-to-Market strategic developers and bookkeeping system specialists ensuring operational transparency and zero working capital shrinkage in frontier emerging environments.
            </p>
            {/* Social Media Row */}
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://www.linkedin.com/company/ed-alfie-winmax-advisory/?lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3BvVcqXKRURBqEro6J2ME1vQ%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-500 hover:text-[#B08D57] transition-all duration-300 p-2 rounded-lg hover:bg-zinc-900/40 flex items-center justify-center border border-transparent hover:border-zinc-800/30 active:scale-95 transform"
                title="Follow us on LinkedIn"
              >
                <Linkedin size={20} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          <div className="md:col-span-3 space-y-2.5">
            <span className="text-[10px] font-mono uppercase text-white font-bold block tracking-wider">Corporate Directory</span>
            <button onClick={() => scrollToSection("about-section")} className="block text-[#B08D57] hover:underline cursor-pointer py-0.5 text-left text-zinc-400 hover:text-white">About Us overview</button>
            <button onClick={() => scrollToSection("services-section")} className="block text-[#B08D57] hover:underline cursor-pointer py-0.5 text-left text-zinc-400 hover:text-white">Core strategic pillars</button>
            <button onClick={() => scrollToSection("leadership-section")} className="block text-[#B08D57] hover:underline cursor-pointer py-0.5 text-left text-zinc-400 hover:text-white">Advisory leadership roles</button>
            <button onClick={() => scrollToSection("career-section")} className="block text-[#B08D57] hover:underline cursor-pointer py-0.5 text-left text-zinc-400 hover:text-white">Careers at EAW team</button>
          </div>

          <div className="md:col-span-4 space-y-2.5">
            <span className="text-[10px] font-mono uppercase text-white font-bold block tracking-wider">Strategic Sprints</span>
            <p className="text-zinc-600 text-[11px] leading-relaxed">
              We operate exclusively in high-discipline frameworks. Secure connections are classified in compliance with ISO 27001 parameters and GDPR operational standards.
            </p>
            <span className="text-[10px] font-mono block text-zinc-600">
              © 2026 EAW ADVISORY. ALL PARTNERS RESERVED.
            </span>
          </div>

        </div>
      </footer>

      {/* Floating AI Strategic Planning Desk Chatbot */}
      <AIAgentChat
        isOpen={aiAgentOpen}
        onClose={() => setAiAgentOpen(false)}
        onOpen={() => setAiAgentOpen(true)}
        onScheduleFromChat={handleScheduleFromChat}
      />

    </div>
  );
}
