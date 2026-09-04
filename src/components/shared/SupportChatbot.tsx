"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  X,
  Send,
  ArrowLeft,
  Ticket,
  CheckCircle2,
  ChevronRight,
  Activity,
  Code,
  Calendar,
  PhoneCall,
  HelpCircle,
  MessageCircle,
  ThumbsUp,
  ThumbsDown,
  Info,
  Sparkles,
  Bot
} from "lucide-react";
import toast from "react-hot-toast";

// ── Types ──
type Slide =
  | "welcome"
  | "project_lookup"
  | "project_details"
  | "ticket_menu"
  | "ticket_lookup"
  | "ticket_details"
  | "ticket_create"
  | "faqs"
  | "call_request"
  | "call_request_success"
  | "ai_chat";

interface ProjectUpdateLog {
  id: string;
  text: string;
  createdBy: string;
  createdAt: string;
}

interface ProjectData {
  projectId: string;
  title: string;
  client: string;
  status: string;
  startDate?: string;
  endDate?: string;
  progress: number;
  developerName: string;
  updates: ProjectUpdateLog[];
}

interface TicketComment {
  id: string;
  content: string;
  createdByName: string;
  createdAt: string;
}

interface TicketData {
  id: string;
  ticketId: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  category: string;
  createdAt: string;
  comments: TicketComment[];
}

const FAQS = [
  {
    q: "How do I track my project delivery updates?",
    a: "Select 'Track Project Progress' on the main menu, enter your unique Project ID (e.g., PRJ-001) or registration email, and click search. You will see a live technical delivery timeline updated directly by your developers."
  },
  {
    q: "How can I raise a technical bug/ticket?",
    a: "Go to 'Support Ticketing Desk' and click 'Raise Technical Ticket'. Provide your Project/Lead ID, a descriptive subject, select the category, and submit. You will get a unique Ticket ID (e.g. NGT00001) to track status."
  },
  {
    q: "What is your average response time for critical issues?",
    a: "For critical bug fixes or system outages on active support SLA packages, our average response time is under 15 minutes, with resolution times typically within 2-4 hours."
  },
  {
    q: "Can I directly speak to the developer on my ticket?",
    a: "Yes! Once you look up your Ticket ID in 'Check Ticket Status', you will see a live comment thread. Typing a reply there sends an instant notification to the assigned developers, allowing you to collaborate directly."
  }
];

export default function SupportChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [slide, setSlide] = useState<Slide>("welcome");
  const [loading, setLoading] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [ratingFeedback, setRatingFeedback] = useState(false);

  // Inputs
  const [lookupId, setLookupId] = useState("");
  const [ticketLookupId, setTicketLookupId] = useState("");
  const [newCommentText, setNewCommentText] = useState("");

  // AI Assistant Chat States
  const [aiMessages, setAiMessages] = useState<Array<{ sender: "user" | "ai"; text: string }>>([
    { sender: "ai", text: "Hello! I am your eVeda AI Assistant. How can I help you today?" }
  ]);
  const [aiInput, setAiInput] = useState("");
  const [aiTyping, setAiTyping] = useState(false);
  const aiChatEndRef = useRef<HTMLDivElement>(null);

  // Callback Form
  const [callRequestForm, setCallRequestForm] = useState({
    name: "",
    email: "",
    phone: "",
    reason: "technical"
  });

  // Create Ticket Form
  const [createTicketForm, setCreateTicketForm] = useState({
    trackingId: "",
    title: "",
    category: "general",
    description: "",
  });

  // Fetched Data
  const [project, setProject] = useState<ProjectData | null>(null);
  const [ticket, setTicket] = useState<TicketData | null>(null);
  const [createdTicketId, setCreatedTicketId] = useState<string | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto Scroll Comments
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [ticket?.comments, slide]);

  // Auto Scroll AI Chat
  useEffect(() => {
    if (aiChatEndRef.current) {
      aiChatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [aiMessages, aiTyping]);

  const handleProjectLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lookupId.trim()) return;

    setLoading(true);
    setRatingFeedback(false);
    try {
      const res = await fetch(`/api/public/project-updates?id=${encodeURIComponent(lookupId.trim())}`);
      const json = await res.json();
      if (!res.ok) {
        toast.error(json.error || "Project lookup failed");
        return;
      }
      setProject(json.data);
      setSlide("project_details");
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleTicketLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketLookupId.trim()) return;

    setLoading(true);
    setRatingFeedback(false);
    try {
      const res = await fetch(`/api/public/tickets?id=${encodeURIComponent(ticketLookupId.trim())}`);
      const json = await res.json();
      if (!res.ok) {
        toast.error(json.error || "Ticket lookup failed");
        return;
      }
      setTicket(json.data);
      setSlide("ticket_details");
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePostComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim() || !ticket) return;

    const textToSubmit = newCommentText;
    setNewCommentText("");

    try {
      const res = await fetch(`/api/public/tickets/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ticketId: ticket.ticketId,
          content: textToSubmit,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        toast.error(json.error || "Failed to add comment");
        return;
      }
      // Update local comments state
      setTicket((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          comments: [...prev.comments, json.comment],
        };
      });
      toast.success("Comment sent!");
    } catch {
      toast.error("Failed to post comment");
    }
  };

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!createTicketForm.trackingId || !createTicketForm.title || !createTicketForm.description) {
      toast.error("Please fill all required fields");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/public/tickets`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(createTicketForm),
      });
      const json = await res.json();
      if (!res.ok) {
        toast.error(json.error || "Failed to submit ticket");
        return;
      }
      setCreatedTicketId(json.data.ticketId);
      toast.success("Support ticket raised successfully!");
      setCreateTicketForm({ trackingId: "", title: "", category: "general", description: "" });
    } catch {
      toast.error("Failed to submit ticket");
    } finally {
      setLoading(false);
    }
  };

  const handleCallRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!callRequestForm.name || !callRequestForm.phone || !callRequestForm.email) {
      toast.error("Please fill all required fields");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/public/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: callRequestForm.name,
          email: callRequestForm.email.trim().toLowerCase(),
          phone: callRequestForm.phone,
          company: "Callback Inquiry",
          service: "Callback",
          budget: "Not Specified",
          message: `Callback requested via Support Chatbot. Topic: ${callRequestForm.reason}.`,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        toast.error(json.error || "Failed to log callback request");
        return;
      }
      setSlide("call_request_success");
      setCallRequestForm({ name: "", email: "", phone: "", reason: "technical" });
    } catch {
      toast.error("Failed to log request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getAIResponse = (msg: string): string => {
    const text = msg.toLowerCase().trim();

    if (/hi|hello|hey|greetings|good morning|good afternoon|good evening/.test(text)) {
      return "Hello! I am your eVeda AI Assistant. How can I assist you with our software solutions, services, or technical tickets today?";
    }
    if (/service|offer|do you build|mobile app|website|software|saas|web development|artificial intelligence|ai|enterprise|automation|design|ui/.test(text)) {
      return "Eveda Online Services specializes in high-performance digital products:\n\n• **Custom Web & Mobile Apps** (Next.js, React Native, Node.js)\n• **SaaS Products & Enterprise Platforms** (custom CRM/ERP)\n• **AI & Automation** (LLM integrations, custom chat agents)\n• **Cloud & DevOps** (AWS, Supabase, Docker)\n\nWe design, develop, and deploy end-to-end custom systems for global clients!";
    }
    if (/tech|stack|technology|language|react|next|node|python|supabase|database|framework/.test(text)) {
      return "Our standard premium technology stack includes:\n\n• **Frontend:** Next.js, React, Tailwind CSS, TypeScript\n• **Backend & APIs:** Node.js, Express, Python (FastAPI/Django)\n• **Database & Realtime:** Supabase, PostgreSQL, MongoDB, Redis\n• **Cloud & Infrastructure:** AWS, Docker, Vercel, Hostinger\n\nThis ensures your application is fast, secure, and infinitely scalable.";
    }
    if (/price|cost|quote|budget|how much|rate/.test(text)) {
      return "We provide tailor-made quotes based on project complexity, features, and timeline. Simple websites or MVPs start around $1,500, while complex enterprise platforms or custom AI integrations range higher.\n\nTo get a precise estimate, you can click **'Request Callback'** in the main menu, or email us at **info@evedaonlineservices.com**!";
    }
    if (/time|timeline|duration|how long|process|methodology/.test(text)) {
      return "Our standard development lifecycle follows 4 key phases:\n\n1. **Discovery & UI/UX Design** (1-2 weeks)\n2. **Agile Development** (3-6 weeks)\n3. **Quality Assurance & Testing** (1 week)\n4. **Deployment & Launch** (1-2 days)\n\nMost projects are fully delivered and launched within 4 to 8 weeks.";
    }
    if (/ticket|support|bug|issue|error|help desk/.test(text)) {
      return "To raise a technical ticket, go back to the main menu and select **'Support Ticketing Desk'** -> **'Raise Technical Ticket'**. You will need your Project ID or Lead ID. Once created, you can track it live and message developers directly!";
    }
    if (/location|office|address|where are you|haridwar|india/.test(text)) {
      return "Our corporate office is located at:\n\n**53 eVeda Online Services Aryanagar, Haridwar, Uttarakhand, India.**\n\nWe serve clients globally and hold meetings online via Zoom, Google Meet, or Microsoft Teams.";
    }
    if (/contact|email|phone|whatsapp|reach/.test(text)) {
      return "You can reach us instantly via:\n\n• **Email:** info@evedaonlineservices.com\n• **Phone/WhatsApp:** +91 8630508235\n• **Callback:** Use the 'Request Call Back' feature in the menu to have us contact you directly.";
    }

    return "That's an interesting question! As an AI assistant, I recommend discussing this directly with our engineers.\n\nYou can click **'Request Call Back'** on the main menu, or email our technical delivery desk at **info@evedaonlineservices.com** for a detailed consultation.";
  };

  const handleSendMessageToAI = (messageText?: string) => {
    const textToSend = messageText || aiInput;
    if (!textToSend.trim()) return;

    // Add user message
    setAiMessages((prev) => [...prev, { sender: "user", text: textToSend }]);
    if (!messageText) setAiInput("");
    setAiTyping(true);

    // Simulate thinking delay (700ms) for realistic response
    setTimeout(() => {
      const response = getAIResponse(textToSend);
      setAiMessages((prev) => [...prev, { sender: "ai", text: response }]);
      setAiTyping(false);
    }, 700);
  };

  const resetLookupFlows = () => {
    setProject(null);
    setTicket(null);
    setCreatedTicketId(null);
    setLookupId("");
    setTicketLookupId("");
    setActiveFaq(null);
    setRatingFeedback(false);
    setAiMessages([
      { sender: "ai", text: "Hello! I am your eVeda AI Assistant. How can I help you today?" }
    ]);
    setAiInput("");
    setAiTyping(false);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40">
        <motion.button
          onClick={() => {
            setIsOpen(!isOpen);
            if (!isOpen) {
              setSlide("welcome");
              resetLookupFlows();
            }
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative flex items-center justify-center w-14 h-14 rounded-full bg-purple-600 text-white shadow-xl hover:shadow-2xl cursor-pointer border-none outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all"
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
          {/* Pulse Indicator */}
          {!isOpen && (
            <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4.5 w-4.5 bg-purple-500 border-2 border-white"></span>
            </span>
          )}
        </motion.button>
      </div>

      {/* Chatbot Popup Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            className="fixed bottom-20 sm:bottom-24 left-4 sm:left-6 w-[calc(100vw-32px)] sm:w-96 h-[550px] max-h-[calc(100vh-100px)] z-50 rounded-2xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col bg-white"
          >
            {/* Header */}
            <div className="px-5 py-4 bg-purple-600 border-b border-purple-700 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <div>
                  <h4 className="text-[13px] font-bold text-white tracking-wide Outfit">eVeda Support Desk</h4>
                  <p className="text-[10px] text-purple-100 flex items-center gap-1.5">
                    Project & Delivery Center <span className="text-[8px] bg-purple-700 px-1.5 py-0.2 rounded text-emerald-300 font-bold uppercase tracking-wider">Live</span>
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full text-purple-200 hover:text-white hover:bg-purple-700/50 transition-colors border-none bg-transparent cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Slide Container */}
            <div className="flex-1 overflow-y-auto p-5 text-slate-700 bg-slate-50/50">
              {slide === "welcome" && (
                <div className="space-y-3 h-full flex flex-col justify-center py-2">
                  <div className="text-center">
                    <span className="text-3xl">👋</span>
                    <h5 className="text-base font-bold text-slate-800 mt-2">How can we help you?</h5>
                    <p className="text-[11px] text-slate-500 mt-1">Track project logs, ask AI, or raise technical support tickets.</p>
                  </div>

                  <div className="space-y-2 pt-2">
                    <button
                      onClick={() => setSlide("ai_chat")}
                      className="w-full flex items-center justify-between p-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white transition-all text-left text-xs font-semibold hover:border-purple-600/30 group cursor-pointer shadow-md border-none"
                    >
                      <span className="flex items-center gap-2.5">
                        <Sparkles className="w-4 h-4 text-emerald-300 animate-pulse" />
                        Ask AI Assistant (Free & Instant)
                      </span>
                      <ChevronRight className="w-4 h-4 text-purple-200 group-hover:text-white transition-colors" />
                    </button>

                    <button
                      onClick={() => setSlide("project_lookup")}
                      className="w-full flex items-center justify-between p-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 transition-all text-left text-xs font-semibold text-slate-700 hover:border-purple-600/30 group cursor-pointer shadow-sm"
                    >
                      <span className="flex items-center gap-2.5">
                        <Activity className="w-4 h-4 text-purple-600" />
                        Track Project Progress
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-purple-600 transition-colors" />
                    </button>

                    <button
                      onClick={() => setSlide("ticket_menu")}
                      className="w-full flex items-center justify-between p-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 transition-all text-left text-xs font-semibold text-slate-700 hover:border-purple-600/30 group cursor-pointer shadow-sm"
                    >
                      <span className="flex items-center gap-2.5">
                        <Ticket className="w-4 h-4 text-purple-600" />
                        Support Ticketing Desk
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-purple-600 transition-colors" />
                    </button>

                    <button
                      onClick={() => setSlide("faqs")}
                      className="w-full flex items-center justify-between p-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 transition-all text-left text-xs font-semibold text-slate-700 hover:border-purple-600/30 group cursor-pointer shadow-sm"
                    >
                      <span className="flex items-center gap-2.5">
                        <HelpCircle className="w-4 h-4 text-purple-600" />
                        Technical FAQs
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-purple-600 transition-colors" />
                    </button>

                    <button
                      onClick={() => setSlide("call_request")}
                      className="w-full flex items-center justify-between p-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 transition-all text-left text-xs font-semibold text-slate-700 hover:border-purple-600/30 group cursor-pointer shadow-sm"
                    >
                      <span className="flex items-center gap-2.5">
                        <PhoneCall className="w-4 h-4 text-purple-600" />
                        Request Call Back
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-purple-600 transition-colors" />
                    </button>

                    <a
                      href="https://wa.me/918630508235?text=Hello%20eVeda%20Support,%20I%20need%20assistance%20regarding%20my%20project."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-between p-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 transition-all text-left text-xs font-semibold text-slate-700 hover:border-emerald-600/30 group cursor-pointer shadow-sm no-underline"
                    >
                      <span className="flex items-center gap-2.5">
                        <MessageCircle className="w-4 h-4 text-emerald-600" />
                        Instant WhatsApp Chat
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
                    </a>
                  </div>
                </div>
              )}

              {slide === "ai_chat" && (
                <div className="flex flex-col h-full space-y-3 min-h-[380px] justify-between">
                  <div className="flex flex-col space-y-2">
                    <button
                      onClick={() => setSlide("welcome")}
                      className="flex items-center gap-1 text-[11px] text-purple-600 hover:text-purple-700 font-semibold cursor-pointer mb-1 border-none bg-transparent"
                    >
                      <ArrowLeft className="w-3 h-3" /> Back to Main
                    </button>

                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider">eVeda AI Assistant</h5>
                        <p className="text-[10px] text-slate-500">Ask about our services, pricing, or tech stack.</p>
                      </div>
                      <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                        <Bot className="w-3 h-3" /> Free
                      </span>
                    </div>
                  </div>

                  {/* Chat bubbles container */}
                  <div className="flex-1 flex flex-col justify-between pt-1">
                    <div className="flex-1 overflow-y-auto max-h-[200px] space-y-3 pr-1 pl-1 mb-2 bg-slate-50 rounded-xl p-3 border border-slate-200 shadow-inner">
                      {aiMessages.map((msg, idx) => {
                        const isAI = msg.sender === "ai";
                        return (
                          <div key={idx} className={`flex flex-col ${isAI ? "items-start" : "items-end"}`}>
                            <span className="text-[8px] text-slate-400 mb-0.5">{isAI ? "AI Assistant" : "You"}</span>
                            <div
                              className={`text-[11px] p-2.5 rounded-xl max-w-[85%] leading-normal whitespace-pre-line ${
                                isAI
                                  ? "bg-white text-slate-700 rounded-tl-none border border-slate-200 shadow-xs"
                                  : "bg-purple-600 text-white rounded-tr-none"
                              }`}
                            >
                              {msg.text}
                            </div>
                          </div>
                        );
                      })}
                      {aiTyping && (
                        <div className="flex flex-col items-start">
                          <span className="text-[8px] text-slate-400 mb-0.5">AI Assistant</span>
                          <div className="bg-white text-slate-700 p-2.5 rounded-xl rounded-tl-none border border-slate-200 shadow-xs flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                          </div>
                        </div>
                      )}
                      <div ref={aiChatEndRef} />
                    </div>

                    {/* Suggestion Chips */}
                    {aiMessages.length === 1 && (
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {["Our Stack", "Services", "Pricing?", "Location"].map((chip) => (
                          <button
                            key={chip}
                            onClick={() => {
                              let fullQuery = "";
                              if (chip === "Our Stack") fullQuery = "What technologies do you use?";
                              if (chip === "Services") fullQuery = "What services do you offer?";
                              if (chip === "Pricing?") fullQuery = "How much does a website cost?";
                              if (chip === "Location") fullQuery = "Where is your office located?";
                              handleSendMessageToAI(fullQuery);
                            }}
                            className="px-2.5 py-1 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 rounded-lg text-[9px] font-semibold cursor-pointer transition-colors"
                          >
                            {chip}
                          </button>
                        ))}
                      </div>
                    )}

                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSendMessageToAI();
                      }}
                      className="flex gap-2"
                    >
                      <input
                        type="text"
                        required
                        placeholder="Ask about technologies, services..."
                        value={aiInput}
                        onChange={(e) => setAiInput(e.target.value)}
                        className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                      />
                      <button
                        type="submit"
                        disabled={aiTyping}
                        className="p-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl border-none transition-all cursor-pointer outline-none shadow-sm disabled:opacity-50"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </form>
                  </div>
                </div>
              )}

              {slide === "faqs" && (
                <div className="space-y-4">
                  <button
                    onClick={() => setSlide("welcome")}
                    className="flex items-center gap-1 text-[11px] text-purple-600 hover:text-purple-700 font-semibold cursor-pointer mb-2 border-none bg-transparent"
                  >
                    <ArrowLeft className="w-3 h-3" /> Back to Main
                  </button>
                  <div>
                    <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">Frequently Asked Questions</h5>
                    <p className="text-[10px] text-slate-500 leading-relaxed">Immediate answers to common support inquires.</p>
                  </div>

                  <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1">
                    {FAQS.map((faq, index) => (
                      <div key={index} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
                        <button
                          onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                          className="w-full flex items-center justify-between p-3 text-left text-xs font-semibold text-slate-700 hover:bg-slate-50 border-none bg-transparent cursor-pointer transition-colors"
                        >
                          <span>{faq.q}</span>
                          <ChevronRight className={`w-3.5 h-3.5 text-slate-400 transition-transform ${activeFaq === index ? "rotate-90 text-purple-600" : ""}`} />
                        </button>
                        {activeFaq === index && (
                          <div className="px-3 pb-3 pt-1 text-[10px] text-slate-500 border-t border-slate-100 bg-slate-50/50 leading-relaxed">
                            {faq.a}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {slide === "call_request" && (
                <div className="space-y-4">
                  <button
                    onClick={() => setSlide("welcome")}
                    className="flex items-center gap-1 text-[11px] text-purple-600 hover:text-purple-700 font-semibold cursor-pointer mb-2 border-none bg-transparent"
                  >
                    <ArrowLeft className="w-3 h-3" /> Back
                  </button>
                  <div>
                    <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">Request a Callback</h5>
                    <p className="text-[10px] text-slate-500">Provide details and our technical team will call you.</p>
                  </div>

                  <form onSubmit={handleCallRequest} className="space-y-3 pt-1">
                    <div>
                      <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">Your Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. John Doe"
                        value={callRequestForm.name}
                        onChange={(e) => setCallRequestForm({ ...callRequestForm, name: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. client@example.com"
                        value={callRequestForm.email}
                        onChange={(e) => setCallRequestForm({ ...callRequestForm, email: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +91 9031806381"
                        value={callRequestForm.phone}
                        onChange={(e) => setCallRequestForm({ ...callRequestForm, phone: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">Inquiry Topic</label>
                      <select
                        value={callRequestForm.reason}
                        onChange={(e) => setCallRequestForm({ ...callRequestForm, reason: e.target.value })}
                        className="w-full px-2.5 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                      >
                        <option value="technical">Technical Support</option>
                        <option value="billing">Billing & Invoices</option>
                        <option value="project">Project Progress</option>
                        <option value="sales">New Project Consultation</option>
                      </select>
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-semibold border-none transition-all disabled:opacity-50 cursor-pointer shadow-sm"
                    >
                      {loading ? "Submitting..." : "Schedule Call"}
                    </button>
                  </form>
                </div>
              )}

              {slide === "call_request_success" && (
                <div className="text-center py-10 space-y-4 h-full flex flex-col justify-center">
                  <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto" />
                  <div>
                    <h6 className="text-sm font-bold text-slate-800">Callback Scheduled!</h6>
                    <p className="text-[10px] text-slate-500 mt-1.5 leading-relaxed px-4">
                      Thank you. We have logged your request. A support team engineer will call you shortly on your provided number.
                    </p>
                  </div>
                  <button
                    onClick={() => setSlide("welcome")}
                    className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-semibold border-none transition-all cursor-pointer shadow-sm mx-auto"
                  >
                    Return to Main Menu
                  </button>
                </div>
              )}

              {slide === "project_lookup" && (
                <div className="space-y-4">
                  <button
                    onClick={() => setSlide("welcome")}
                    className="flex items-center gap-1 text-[11px] text-purple-600 hover:text-purple-700 font-semibold cursor-pointer mb-2 border-none bg-transparent"
                  >
                    <ArrowLeft className="w-3 h-3" /> Back
                  </button>
                  <div>
                    <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">Enter Project or Lead ID</h5>
                    <p className="text-[10px] text-slate-500 leading-relaxed">Use the unique code shared by your manager (e.g. PRJ-001, NGL00001, or billing email).</p>
                  </div>

                  <form onSubmit={handleProjectLookup} className="space-y-3 pt-1">
                    <input
                      type="text"
                      required
                      placeholder="e.g. PRJ-001 or client@example.com"
                      value={lookupId}
                      onChange={(e) => setLookupId(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-semibold border-none transition-colors disabled:opacity-50 cursor-pointer shadow-sm"
                    >
                      {loading ? "Searching..." : "Lookup Progress Logs"}
                    </button>
                  </form>
                </div>
              )}

              {slide === "project_details" && project && (
                <div className="space-y-4">
                  <button
                    onClick={() => setSlide("project_lookup")}
                    className="flex items-center gap-1 text-[11px] text-purple-600 hover:text-purple-700 font-semibold cursor-pointer border-none bg-transparent"
                  >
                    <ArrowLeft className="w-3 h-3" /> Back to Lookup
                  </button>

                  {/* Project Summary Card */}
                  <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-3 shadow-sm">
                    <div>
                      <span className="text-[9px] font-bold text-purple-600 uppercase tracking-widest">{project.projectId}</span>
                      <h6 className="text-sm font-bold text-slate-800 truncate">{project.title}</h6>
                      <p className="text-[10px] text-slate-500 mt-0.5">Manager: {project.client}</p>
                    </div>

                    {/* Progress */}
                    <div>
                      <div className="flex justify-between text-[9px] mb-1">
                        <span className="text-slate-500">Overall Progress</span>
                        <span className="font-bold text-slate-800">{project.progress}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
                        <div className="h-full bg-purple-600 rounded-full" style={{ width: `${project.progress}%` }} />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[10px] border-t border-slate-100 pt-2">
                      <div>
                        <span className="text-slate-500 block">Lead Developer</span>
                        <span className="font-semibold text-slate-800 flex items-center gap-1 mt-0.5">
                          <Code className="w-3 h-3 text-purple-500" />
                          {project.developerName}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Current Status</span>
                        <span className="font-semibold text-emerald-600 mt-0.5 uppercase tracking-wide">{project.status}</span>
                      </div>
                    </div>
                  </div>

                  {/* Updates logs */}
                  <div>
                    <p className="text-[11px] font-bold text-slate-800 uppercase tracking-wider mb-2">Technical Delivery Timeline</p>
                    {project.updates && project.updates.length > 0 ? (
                      <div className="space-y-3 border-l-2 border-slate-200 pl-4 py-1.5 ml-2.5 max-h-[160px] overflow-y-auto pr-1">
                        {project.updates.map((update, idx) => (
                          <div key={update.id || idx} className="relative space-y-1">
                            <span className="absolute -left-[23px] top-1 w-2 h-2 rounded-full bg-purple-600 border border-white" />
                            <div className="text-[10px] text-slate-400 flex items-center gap-1.5">
                              <Calendar className="w-2.5 h-2.5 text-slate-400" />
                              {new Date(update.createdAt).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}
                              <span className="text-slate-300">•</span>
                              <span className="text-[9px] bg-slate-100 px-1 py-0.2 rounded text-slate-600 font-mono font-medium">{update.createdBy}</span>
                            </div>
                            <p className="text-[11px] text-slate-700 bg-white border border-slate-200/60 p-2 rounded-lg leading-normal shadow-xs">{update.text}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-[10px] text-slate-400 p-4 text-center border border-dashed border-slate-200 rounded-xl bg-white">No delivery logs posted yet.</p>
                    )}
                  </div>

                  {/* Rating Feedback */}
                  <div className="border-t border-slate-100 pt-3">
                    {ratingFeedback ? (
                      <div className="text-center py-1 text-[10px] text-emerald-600 font-semibold flex items-center justify-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Thank you for your rating!
                      </div>
                    ) : (
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-slate-400 flex items-center gap-1"><Info className="w-3 h-3" /> Is this timeline helpful?</span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setRatingFeedback(true);
                              toast.success("Feedback recorded, thank you!");
                            }}
                            className="p-1 rounded hover:bg-slate-200 text-slate-500 hover:text-purple-600 transition-colors border-none bg-transparent cursor-pointer"
                          >
                            <ThumbsUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              setRatingFeedback(true);
                              toast.success("Feedback recorded. We will improve.");
                            }}
                            className="p-1 rounded hover:bg-slate-200 text-slate-500 hover:text-red-500 transition-colors border-none bg-transparent cursor-pointer"
                          >
                            <ThumbsDown className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {slide === "ticket_menu" && (
                <div className="space-y-4 h-full flex flex-col justify-center">
                  <button
                    onClick={() => setSlide("welcome")}
                    className="flex items-center gap-1 text-[11px] text-purple-600 hover:text-purple-700 font-semibold cursor-pointer mb-2 border-none bg-transparent"
                  >
                    <ArrowLeft className="w-3 h-3" /> Back
                  </button>

                  <div className="space-y-2.5">
                    <button
                      onClick={() => setSlide("ticket_lookup")}
                      className="w-full p-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 transition-all text-left cursor-pointer group shadow-sm"
                    >
                      <h6 className="text-xs font-bold text-slate-800">Check Ticket Status</h6>
                      <p className="text-[10px] text-slate-500 mt-1">Track status and chat with developers on an active support ticket.</p>
                    </button>

                    <button
                      onClick={() => {
                        setSlide("ticket_create");
                        setCreatedTicketId(null);
                      }}
                      className="w-full p-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 transition-all text-left cursor-pointer group shadow-sm"
                    >
                      <h6 className="text-xs font-bold text-slate-800">Raise Technical Ticket</h6>
                      <p className="text-[10px] text-slate-500 mt-1">Log a bug or technical request linked to your Project/Lead ID.</p>
                    </button>
                  </div>
                </div>
              )}

              {slide === "ticket_lookup" && (
                <div className="space-y-4">
                  <button
                    onClick={() => setSlide("ticket_menu")}
                    className="flex items-center gap-1 text-[11px] text-purple-600 hover:text-purple-700 font-semibold cursor-pointer mb-2 border-none bg-transparent"
                  >
                    <ArrowLeft className="w-3 h-3" /> Back
                  </button>

                  <div>
                    <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">Enter Support Ticket ID</h5>
                    <p className="text-[10px] text-slate-500">Type the Ticket Code (e.g. NGT00001) generated when raising the request.</p>
                  </div>

                  <form onSubmit={handleTicketLookup} className="space-y-3 pt-1">
                    <input
                      type="text"
                      required
                      placeholder="e.g. NGT00001"
                      value={ticketLookupId}
                      onChange={(e) => setTicketLookupId(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-semibold border-none transition-colors disabled:opacity-50 cursor-pointer shadow-sm"
                    >
                      {loading ? "Searching..." : "Track Ticket Desk"}
                    </button>
                  </form>
                </div>
              )}

              {slide === "ticket_details" && ticket && (
                <div className="flex flex-col h-full space-y-4 min-h-[380px] justify-between">
                  <div>
                    <button
                      onClick={() => setSlide("ticket_lookup")}
                      className="flex items-center gap-1 text-[11px] text-purple-600 hover:text-purple-700 font-semibold cursor-pointer mb-2 border-none bg-transparent"
                    >
                      <ArrowLeft className="w-3 h-3" /> Back to Lookup
                    </button>

                    {/* Support Meta Card */}
                    <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-2 shadow-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-bold text-purple-600 uppercase tracking-widest">{ticket.ticketId}</span>
                        <span className="text-[8px] font-bold uppercase px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200">
                          {ticket.status}
                        </span>
                      </div>
                      <h6 className="text-xs font-bold text-slate-800 truncate">{ticket.title}</h6>
                      <p className="text-[10px] text-slate-500 leading-snug">{ticket.description}</p>
                    </div>
                  </div>

                  {/* Support Chat Box comments */}
                  <div className="flex-1 flex flex-col justify-between pt-1">
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2.5">Chat History</div>

                    <div className="flex-1 overflow-y-auto max-h-[140px] space-y-3 pr-1 pl-1 mb-2 bg-slate-50 rounded-xl p-3 border border-slate-200 shadow-inner">
                      {ticket.comments && ticket.comments.length > 0 ? (
                        ticket.comments.map((comment, index) => {
                          const isClient = comment.createdByName === "Client (Chatbot)";
                          return (
                            <div key={comment.id || index} className={`flex flex-col ${isClient ? "items-end" : "items-start"}`}>
                              <span className="text-[8px] text-slate-400 mb-0.5">{comment.createdByName}</span>
                              <div
                                className={`text-[11px] p-2.5 rounded-xl max-w-[85%] leading-normal ${
                                  isClient
                                    ? "bg-purple-600 text-white rounded-tr-none"
                                    : "bg-white text-slate-700 rounded-tl-none border border-slate-200 shadow-xs"
                                }`}
                              >
                                {comment.content}
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <p className="text-[10px] text-slate-400 text-center py-6">No chat messages yet. Type below to reply.</p>
                      )}
                      <div ref={chatEndRef} />
                    </div>

                    <form onSubmit={handlePostComment} className="flex gap-2">
                      <input
                        type="text"
                        required
                        placeholder="Type reply to developers..."
                        value={newCommentText}
                        onChange={(e) => setNewCommentText(e.target.value)}
                        className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                      />
                      <button
                        type="submit"
                        className="p-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl border-none transition-all cursor-pointer outline-none shadow-sm"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </form>
                  </div>
                </div>
              )}

              {slide === "ticket_create" && (
                <div className="space-y-4">
                  <button
                    onClick={() => setSlide("ticket_menu")}
                    className="flex items-center gap-1 text-[11px] text-purple-600 hover:text-purple-700 font-semibold cursor-pointer border-none bg-transparent"
                  >
                    <ArrowLeft className="w-3 h-3" /> Back
                  </button>

                  <AnimatePresence mode="wait">
                    {!createdTicketId ? (
                      <form onSubmit={handleCreateTicket} className="space-y-3 pt-1">
                        <div>
                          <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                            Associated Project ID / Lead ID *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. PRJ-001 or NGL00001"
                            value={createTicketForm.trackingId}
                            onChange={(e) => setCreateTicketForm({ ...createTicketForm, trackingId: e.target.value })}
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                              Subject Issue *
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Payment issue"
                              value={createTicketForm.title}
                              onChange={(e) => setCreateTicketForm({ ...createTicketForm, title: e.target.value })}
                              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                            />
                          </div>
                          <div>
                            <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                              Category
                            </label>
                            <select
                              value={createTicketForm.category}
                              onChange={(e) => setCreateTicketForm({ ...createTicketForm, category: e.target.value })}
                              className="w-full px-2.5 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                            >
                              <option value="technical">Technical Bug</option>
                              <option value="billing">Billing Inquiry</option>
                              <option value="sales">Sales Help</option>
                              <option value="general">General Support</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                            Description of issue *
                          </label>
                          <textarea
                            rows={3}
                            required
                            placeholder="Provide full description of the error..."
                            value={createTicketForm.description}
                            onChange={(e) => setCreateTicketForm({ ...createTicketForm, description: e.target.value })}
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all resize-none"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-semibold border-none transition-all disabled:opacity-50 cursor-pointer shadow-sm"
                        >
                          {loading ? "Submitting Request..." : "Raise Technical Ticket"}
                        </button>
                      </form>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-8 space-y-4"
                      >
                        <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                        <div>
                          <h6 className="text-sm font-bold text-slate-800">Ticket Logged!</h6>
                          <p className="text-[10px] text-slate-500 mt-1">Our development engineers will address this shortly.</p>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 font-mono text-xs font-bold text-slate-800 select-all shadow-xs">
                          {createdTicketId}
                        </div>
                        <p className="text-[9px] text-slate-400">Copy this ID to check status/chat using this support chatbot anytime.</p>
                        <button
                          onClick={() => {
                            setTicketLookupId(createdTicketId);
                            setCreatedTicketId(null);
                            setSlide("ticket_lookup");
                          }}
                          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-semibold border-none transition-all cursor-pointer shadow-sm"
                        >
                          View Ticket Desk
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
            {/* System Status operational banner */}
            <div className="px-5 py-2.5 bg-slate-100 border-t border-slate-200/80 flex items-center justify-between text-[9px] text-slate-500 font-semibold tracking-wide">
              <span>eVeda System Core</span>
              <span className="flex items-center gap-1 text-emerald-600 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Operational
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
