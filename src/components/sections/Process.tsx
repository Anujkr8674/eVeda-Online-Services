"use client";

import { useState, useEffect, useRef } from "react";

import { 
  Laptop, Smartphone, Layers, Brain, Cloud, Paintbrush,
  BookOpen, Sparkles, Palette, Megaphone, Search,
  Sliders, Zap, CheckCircle, ArrowRight, ChevronDown, ChevronUp
} from "lucide-react";

const servicesList = [
  { id: "book-design", name: "Book Designing", icon: BookOpen, baseHours: 45, code: "BKD", desc: "Covers, layout & KDP formatting" },
  { id: "book-brand", name: "Book Branding", icon: Sparkles, baseHours: 55, code: "BKB", desc: "Author platform & book trailers" },
  { id: "graphic-design", name: "Graphics Designing", icon: Palette, baseHours: 40, code: "GFX", desc: "Logos, brand identity & creatives" },
  { id: "web", name: "Web Application", icon: Laptop, baseHours: 120, code: "WEB", desc: "Custom website or web portal" },
  { id: "mobile", name: "Mobile App", icon: Smartphone, baseHours: 160, code: "MOB", desc: "iOS & Android app solution" },
  { id: "saas", name: "SaaS Platform", icon: Layers, baseHours: 240, code: "SAS", desc: "Subscription cloud software" },
  { id: "digital-marketing", name: "Digital Marketing", icon: Megaphone, baseHours: 60, code: "MKT", desc: "Targeted ads & campaign growth" },
  { id: "seo", name: "SEO Optimization", icon: Search, baseHours: 50, code: "SEO", desc: "Keyword rank & organic traffic" },
  { id: "ai", name: "AI/LLM Solution", icon: Brain, baseHours: 200, code: "AIS", desc: "Chatbots & automation agents" },
  { id: "devops", name: "Cloud & DevOps", icon: Cloud, baseHours: 90, code: "CLD", desc: "Server, CI/CD & cloud infra" },
  { id: "uiux", name: "UI/UX Design", icon: Paintbrush, baseHours: 70, code: "DSN", desc: "Figma specs & prototypes" }
];

const projectScales = [
  {
    name: "Starter Launch",
    desc: "Build core features quickly to test your product idea.",
    multiplier: 1.0,
    code: "STR"
  },
  {
    name: "Growth Edition",
    desc: "Optimized for high growth and customer traffic.",
    multiplier: 2.2,
    code: "GRW"
  },
  {
    name: "Enterprise Grade",
    desc: "For top-tier scale, security, and dedicated support.",
    multiplier: 4.5,
    code: "ENT"
  }
];

const featureModules = [
  { id: "auth", name: "Sign-in & Accounts", desc: "Secure signup, user roles & logins.", hours: 25 },
  { id: "admin", name: "Owner Control Panel", desc: "Dashboard to manage user actions.", hours: 35 },
  { id: "api", name: "Tool Integrations", desc: "Stripe payments & CRM setup.", hours: 20 },
  { id: "realtime", name: "Live Chat & Alerts", desc: "Instantly message users or send alerts.", hours: 30 },
  { id: "ai", name: "Smart AI Chatbot", desc: "Integrate ChatGPT-like assistants.", hours: 45 },
  { id: "multitenant", name: "Multi-Company Sync", desc: "Separate secure account isolation.", hours: 40 }
];

const velocities = [
  { name: "Regular Pace", desc: "Standard delivery time with a balanced team.", durationMult: 1.0, costMult: 1.0 },
  { name: "Accelerated Delivery", desc: "Speed up project launch with extra developers.", durationMult: 0.6, costMult: 1.25 },
  { name: "High Priority Launch", desc: "Fastest delivery with priority launch.", durationMult: 0.4, costMult: 1.5 }
];

export default function Process() {
  const [selectedService, setSelectedService] = useState(servicesList[0]);
  const [selectedScale, setSelectedScale] = useState(projectScales[1]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [selectedVelocity, setSelectedVelocity] = useState(velocities[0]);
  const [blueprintId, setBlueprintId] = useState("");
  const [compiling, setCompiling] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showAllMobileServices, setShowAllMobileServices] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);

  // Trigger simulated blueprint compilation
  useEffect(() => {
    setCompiling(true);
    const serviceCode = selectedService.code;
    const scaleCode = selectedScale.code;
    const randNum = Math.floor(1000 + Math.random() * 9000);
    const id = `EV-${serviceCode}-${scaleCode}-${randNum}`;
    setBlueprintId(id);

    const timer = setTimeout(() => {
      setCompiling(false);
    }, 350);

    return () => clearTimeout(timer);
  }, [selectedService, selectedScale, selectedFeatures, selectedVelocity]);

  // When selected service changes on mobile, open in place without scrolling/rendering from top
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      const container = containerRef.current;
      const wrap = document.getElementById("mobile-service-wrap-" + selectedService.id);
      if (container && wrap) {
        // Set scrollTop directly to open exactly in-place, without smooth-scroll animation from top
        container.scrollTop = Math.max(0, wrap.offsetTop - 8);
      }
    }
  }, [selectedService]);

  const handleSelectService = (service: typeof servicesList[0]) => {
    if (selectedService.id === service.id) return;
    setSelectedService(service);
  };

  const toggleFeature = (id: string) => {
    setSelectedFeatures(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const featureHours = selectedFeatures.reduce((acc, fId) => {
    const feat = featureModules.find(f => f.id === fId);
    return acc + (feat ? feat.hours : 0);
  }, 0);

  const baseHours = selectedService.baseHours;
  const calculatedHours = Math.round((baseHours * selectedScale.multiplier) + featureHours);
  const calculatedWeeks = Math.max(2, Math.round((calculatedHours / 35) * selectedVelocity.durationMult));

    // Pricing in Indian Rupees (INR)
  const minCost = calculatedHours * 750 * selectedVelocity.costMult;
  const maxCost = calculatedHours * 1250 * selectedVelocity.costMult;

  const formatCostValue = (val: number) => {
    if (val >= 100000) {
      const lakhs = val / 100000;
      return "₹" + lakhs.toFixed(1) + "L";
    }
    return "₹" + Math.round(val / 1000) + "k";
  };

  const costRangeStr = formatCostValue(minCost) + " – " + formatCostValue(maxCost);

  // Calculate complexity index percentage
  const maxPossibleHours = (240 * 4.5) + 195;
  const complexityIndex = Math.min(98, Math.max(20, Math.round((calculatedHours / maxPossibleHours) * 100)));

    let mappedBudget = "₹25k-₹50k";
  const averageCost = (minCost + maxCost) / 2;
  if (averageCost < 50000) mappedBudget = "₹25k-₹50k";
  else if (averageCost >= 50000 && averageCost < 150000) mappedBudget = "₹50k-₹1.5L";
  else if (averageCost >= 150000 && averageCost < 500000) mappedBudget = "₹1.5L-₹5L";
  else mappedBudget = "₹5L+";

  const renderTelemetryDashboard = (isMobileInline = false) => (
    <div 
      id={isMobileInline ? undefined : "configuration-summary-card"} 
      className={"bg-[#0B0F19] border border-slate-800/80 rounded-3xl p-4 sm:p-6 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex flex-col justify-between z-10 text-slate-350 " + (
        isMobileInline ? "min-h-[380px] h-auto my-1" : "min-h-[490px] h-auto w-full"
      )}
    >
      <div className="absolute top-0 right-0 w-80 h-80 bg-[radial-gradient(circle_at_top_right,_rgba(124,58,237,0.12)_0%,_transparent_70%)] pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[radial-gradient(circle_at_bottom_left,_rgba(6,182,212,0.06)_0%,_transparent_70%)] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none z-0" />
      
      <div className="relative z-10 space-y-4 sm:space-y-5 flex-1 flex flex-col justify-between">
        <div className="flex items-center justify-between border-b border-slate-800/60 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
            <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase font-sora font-extrabold">
              Configuration Summary
            </span>
          </div>
          <span className="text-[9px] text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 font-bold font-sora select-none">
            Live Estimate
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 items-center">
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 112 112">
                <defs>
                  <linearGradient id={isMobileInline ? "purpleGradInline" : "purpleGrad"} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#4F46E5" />
                  </linearGradient>
                </defs>
                <circle cx="56" cy="56" r="48" className="stroke-slate-800/60 fill-none" strokeWidth="6" />
                <circle
                  cx="56" cy="56" r="48" className="fill-none transition-all duration-500"
                  stroke={"url(#" + (isMobileInline ? "purpleGradInline" : "purpleGrad") + ")"}
                  strokeWidth="6" strokeDasharray={2 * Math.PI * 48}
                  strokeDashoffset={2 * Math.PI * 48 * (1 - complexityIndex / 100)} strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center font-sora">
                <span className="text-[8px] text-slate-400 uppercase tracking-wider font-extrabold">Project Scale</span>
                <span className="text-lg sm:text-xl font-black text-white leading-none mt-0.5">
                  {compiling ? "..." : (complexityIndex + "%")}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-950/20 to-slate-900/20 border border-purple-900/30 p-3 sm:p-4 rounded-2xl flex flex-col justify-center h-24 sm:h-28 shadow-inner">
            <div className="text-[9px] sm:text-[9.5px] text-purple-400 font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
              <Sparkles className="w-3 h-3 animate-pulse" />
              Investment Range (INR)
            </div>
            <div className="text-lg sm:text-xl font-black text-white tracking-tight font-sora leading-tight">
              {compiling ? "Calculating..." : costRangeStr}
            </div>
            <div className="text-[8px] sm:text-[8.5px] text-slate-500 mt-1 leading-tight">
              *Estimated total investment (₹)
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div className="space-y-1.5 font-sora">
            <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              <span>Scope Effort</span>
              <span className="text-white font-extrabold">{compiling ? "..." : (calculatedHours + "h")}</span>
            </div>
            <div className="h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800/40 p-[0.5px]">
              <div className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-500" style={{ width: (compiling ? 10 : complexityIndex) + "%" }} />
            </div>
          </div>

          <div className="space-y-1.5 font-sora">
            <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              <span>Timeline</span>
              <span className="text-white font-extrabold">{compiling ? "..." : ("~" + calculatedWeeks + "w")}</span>
            </div>
            <div className="h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800/40 p-[0.5px]">
              <div className="h-full bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full transition-all duration-500" style={{ width: (compiling ? 10 : (100 - (calculatedWeeks / 15) * 100)) + "%" }} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-3 border-t border-slate-800/40 pt-3 text-[9.5px] sm:text-[10px] font-sora">
          <div>
            <div className="text-slate-500 mb-0.5">Blueprint Code:</div>
            <div className="text-purple-400 font-mono font-bold tracking-wider truncate">{blueprintId}</div>
          </div>
          <div>
            <div className="text-slate-500 mb-0.5">Category:</div>
            <div className="text-white font-bold truncate">{selectedService.name}</div>
          </div>
          <div>
            <div className="text-slate-500 mb-0.5">Security Level:</div>
            <div className="text-emerald-400 font-bold truncate">ENTERPRISE</div>
          </div>
        </div>

      </div>
    </div>
  );

  const handleLockScope = () => {
    const scopeData = {
      service: selectedService.name,
      scale: selectedScale.name,
      velocity: selectedVelocity.name,
      hours: calculatedHours,
      costRange: costRangeStr,
      blueprintId,
      budget: mappedBudget
    };
    localStorage.setItem("eveda_planned_scope", JSON.stringify(scopeData));
    window.dispatchEvent(new Event("eveda_scope_locked"));

    const el = document.getElementById("contact");
    if (el) {
      const offset = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
  };

  return (
    <section className="py-16 bg-slate-50 text-slate-800 border-t border-slate-200/50" id="process">
      <div className="max-w-[1400px] mx-auto px-4" id="scope-planner">
        
        {/* Scope Planner Section Header */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider text-[var(--accent-global)] bg-[var(--accent-global-dim)] mb-4">
            Interactive Planner
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight font-sora">
            Interactive Scope & <span className="text-[var(--accent-global)]">Cost Planner</span>
          </h2>
          <p className="text-slate-555 mt-3 text-sm max-w-xl mx-auto leading-relaxed">
            Configure your custom solution parameters to generate immediate technical estimates and blueprint calculations.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-stretch w-full">
          
          {/* Left Controls (Funnel-Step Form Card) */}
          <div ref={containerRef} className="lg:col-span-7 bg-white border border-slate-200/80 rounded-3xl p-5 sm:p-7 flex flex-col justify-between shadow-sm relative min-h-[620px] sm:min-h-[500px] max-h-[720px] sm:max-h-none overflow-y-auto sm:overflow-visible hide-scrollbar no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden [&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar]:h-0 [&::-webkit-scrollbar]:bg-transparent">
            
            {/* Step Header & Indicators */}
            <div className={(currentStep === 1 ? "hidden sm:flex " : "flex ") + "items-center justify-between border-b border-slate-100 pb-4 mb-4"}>
              <div className="flex items-center gap-2 font-sora">
                <span className="w-6 h-6 rounded-full bg-purple-100 text-[var(--accent-global)] flex items-center justify-center text-xs font-black select-none">
                  {currentStep}
                </span>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Step {currentStep} of 4
                </span>
              </div>
              <div className="flex gap-1.5">
                {[1, 2, 3, 4].map((stepNum) => (
                  <div
                    key={stepNum}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      currentStep >= stepNum ? "w-6 bg-[var(--accent-global)]" : "w-2 bg-slate-200"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Mobile Telemetry Dashboard for Steps 2, 3, 4 */}
            {currentStep > 1 && (
              <div className="lg:hidden mb-5">
                {renderTelemetryDashboard(true)}
              </div>
            )}

            {/* Form Content Steps */}
            <div className="flex-1 flex flex-col justify-center">
              
              {/* Step 1: Select Service Type */}
              {currentStep === 1 && (
                <div className="space-y-3.5 animate-fadeIn">
                  <div className="mb-2">
                    <h4 className="text-base font-bold text-slate-900 font-sora mb-0.5">What type of product are we building?</h4>
                    <p className="text-xs text-slate-500">Select a category to set the foundation of your blueprint scope.</p>
                  </div>

                  {/* Tablet & Desktop Grid (sm and up) */}
                  <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-[320px] overflow-y-auto pr-1">
                    {servicesList.map((service) => {
                      const SIcon = service.icon;
                      const isSelected = selectedService.id === service.id;
                      return (
                        <button
                          key={service.id}
                          type="button"
                          onClick={() => setSelectedService(service)}
                          className={"p-3 rounded-xl border transition-all text-left flex items-center gap-3 cursor-pointer group/btn " + (
                            isSelected
                              ? "bg-[var(--accent-global-dim)] border-[var(--accent-global)] text-[var(--accent-global)] shadow-sm"
                              : "bg-slate-50/70 border-slate-200 text-slate-700 hover:border-slate-350 hover:bg-slate-100/70"
                          )}
                        >
                          <div className={"w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-300 " + (
                            isSelected ? "bg-[var(--accent-global)] text-white shadow-xs" : "bg-white text-slate-400 group-hover/btn:scale-110 shadow-2xs"
                          )}>
                            <SIcon className="w-4.5 h-4.5" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-xs font-bold font-sora leading-tight mb-0.5">{service.name}</div>
                            <div className="text-[10px] text-slate-500 font-medium leading-tight truncate">{service.desc}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Mobile-only Accordion List (sm:hidden) */}
                  <div className="sm:hidden space-y-2.5">
                    {servicesList.map((service, index) => {
                      const SIcon = service.icon;
                      const isSelected = selectedService.id === service.id;
                      
                      // On mobile, if not expanded, only show the first 3 items
                      if (!showAllMobileServices && index >= 3) {
                        return null;
                      }

                      return (
                        <div key={service.id} id={"mobile-service-wrap-" + service.id} className="space-y-2.5">
                          {/* The Cost Card is open JUST ABOVE the selective menu item */}
                          {isSelected && (
                            <div id={"mobile-cost-card-" + service.id} className="space-y-2.5 animate-fadeIn">
                              {renderTelemetryDashboard(true)}

                              {/* Step indicator & Next Step button bar, exactly matching Image 2 */}
                              <div className="flex items-center justify-between bg-white border border-slate-200 rounded-2xl px-3.5 py-2.5 shadow-xs">
                                <div className="flex items-center gap-2 font-sora">
                                  <span className="w-5 h-5 rounded-full bg-purple-100 text-[var(--accent-global)] flex items-center justify-center text-[10px] font-black select-none">
                                    1
                                  </span>
                                  <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                                    Step 1 of 4
                                  </span>
                                  <div className="flex gap-1 ml-1">
                                    <div className="w-4 h-1.5 rounded-full bg-[var(--accent-global)]" />
                                    <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                                    <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                                    <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => setCurrentStep(2)}
                                  className="px-3.5 py-1.5 bg-[var(--accent-global)] hover:bg-[var(--accent-global-hover)] text-white text-[11px] font-bold font-sora rounded-xl flex items-center gap-1.5 shadow-sm transition-all cursor-pointer active:scale-95"
                                >
                                  <span>Next Step</span>
                                  <ArrowRight className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          )}

                          {/* Menu Item Card */}
                          <button
                            type="button"
                            onClick={() => handleSelectService(service)}
                            className={"w-full p-3.5 rounded-2xl border transition-all text-left flex items-center gap-3 cursor-pointer " + (
                              isSelected
                                ? "bg-[var(--accent-global-dim)] border-[var(--accent-global)] text-[var(--accent-global)] shadow-sm ring-1 ring-[var(--accent-global)]/30"
                                : "bg-slate-50/80 border-slate-200 text-slate-700 hover:border-slate-350 hover:bg-slate-100/70"
                            )}
                          >
                            <div className={"w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 " + (
                              isSelected ? "bg-[var(--accent-global)] text-white shadow-xs" : "bg-white text-slate-400 shadow-2xs border border-slate-100"
                            )}>
                              <SIcon className="w-5 h-5" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="text-xs font-bold font-sora leading-tight mb-0.5">{service.name}</div>
                              <div className="text-[10.5px] text-slate-500 font-medium leading-tight truncate">{service.desc}</div>
                            </div>
                          </button>
                        </div>
                      );
                    })}

                    {/* Mobile "View All Services" / "Show Less" toggle button */}
                    <div className="pt-1">
                      <button
                        type="button"
                        onClick={() => setShowAllMobileServices(!showAllMobileServices)}
                        className="w-full py-2.5 px-4 rounded-xl border border-purple-200/80 bg-purple-50/40 hover:bg-purple-50 text-[var(--accent-global)] text-xs font-bold font-sora flex items-center justify-center gap-2 transition-all shadow-2xs cursor-pointer active:scale-[0.99]"
                      >
                        {showAllMobileServices ? (
                          <>
                            <span>Show Less</span>
                            <ChevronUp className="w-4 h-4 text-[var(--accent-global)]" />
                          </>
                        ) : (
                          <>
                            <span>View All Services ({servicesList.length})</span>
                            <ChevronDown className="w-4 h-4 text-[var(--accent-global)]" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Choose Project Scale */}
              {currentStep === 2 && (
                <div className="space-y-3.5 animate-fadeIn">
                  <div>
                    <h4 className="text-base font-bold text-slate-900 font-sora mb-0.5">Select the scale of your project</h4>
                    <p className="text-xs text-slate-500">Choose a scale matching your development goals and traffic density.</p>
                  </div>
                  <div className="grid grid-cols-3 gap-2.5">
                    {projectScales.map((scale) => {
                      const isSelected = selectedScale.name === scale.name;
                      return (
                        <button
                          key={scale.name}
                          type="button"
                          onClick={() => setSelectedScale(scale)}
                          className={`p-3.5 rounded-xl border transition-all text-left flex flex-col justify-between cursor-pointer group/btn h-full min-h-[95px] ${
                            isSelected
                              ? "bg-purple-50/15 border-[var(--accent-global)] shadow-sm"
                              : "bg-slate-55/40 border-slate-200 hover:border-slate-350 hover:bg-slate-100/50"
                          }`}
                        >
                          <div className="flex items-center justify-between w-full mb-2.5">
                            <div className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                              isSelected
                                ? "border-[var(--accent-global)] bg-[var(--accent-global)] text-white"
                                : "border-slate-300 bg-white text-transparent"
                            }`}>
                              <CheckCircle className="w-3 h-3" />
                            </div>
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900 mb-0.5 font-sora leading-tight">{scale.name}</div>
                            <div className="text-[9.5px] text-slate-555 leading-normal font-medium">{scale.desc}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 3: Select Advanced Features */}
              {currentStep === 3 && (
                <div className="space-y-3.5 animate-fadeIn">
                  <div>
                    <h4 className="text-base font-bold text-slate-900 font-sora mb-0.5">Select advanced features to include</h4>
                    <p className="text-xs text-slate-500">Select capabilities to enhance the functionality of your product.</p>
                  </div>
                  <div className="grid grid-cols-3 gap-2.5">
                    {featureModules.map((feat) => {
                      const active = selectedFeatures.includes(feat.id);
                      return (
                        <button
                          key={feat.id}
                          type="button"
                          onClick={() => toggleFeature(feat.id)}
                          className={`text-left p-3 rounded-xl border transition-all flex flex-col justify-between cursor-pointer h-full min-h-[95px] ${
                            active
                              ? "bg-purple-50/15 border-[var(--accent-global)] shadow-sm"
                              : "bg-slate-55/40 border-slate-200 hover:border-slate-350 hover:bg-slate-100/50"
                          }`}
                        >
                          <div className="flex items-center justify-between w-full mb-2">
                            {/* Futuristic Switch UI */}
                            <div className={`w-6.5 h-4 rounded-full p-0.5 shrink-0 transition-colors duration-300 flex items-center ${
                              active ? "bg-[var(--accent-global)]" : "bg-slate-300"
                            }`}>
                              <div className={`w-2.5 h-2.5 bg-white rounded-full transition-transform duration-300 shadow-sm ${
                                active ? "translate-x-2.5" : "translate-x-0"
                              }`} />
                            </div>
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900 mb-0.5 font-sora leading-tight">
                              {feat.name}
                            </div>
                            <div className="text-[9.5px] text-slate-500 leading-tight font-medium line-clamp-2">{feat.desc}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 4: Select Delivery Velocity */}
              {currentStep === 4 && (
                <div className="space-y-3.5 animate-fadeIn">
                  <div>
                    <h4 className="text-base font-bold text-slate-900 font-sora mb-0.5">Choose your preferred delivery speed</h4>
                    <p className="text-xs text-slate-500">Select the timeline pace that matches your roadmap velocity objectives.</p>
                  </div>
                  <div className="grid grid-cols-3 gap-2.5">
                    {velocities.map((v) => {
                      const isSelected = selectedVelocity.name === v.name;
                      return (
                        <button
                          key={v.name}
                          type="button"
                          onClick={() => setSelectedVelocity(v)}
                          className={`p-3 rounded-xl border transition-all text-left flex flex-col justify-between cursor-pointer group/btn h-full min-h-[95px] ${
                            isSelected
                              ? "bg-[var(--accent-global-dim)] border-[var(--accent-global)] text-[var(--accent-global)] shadow-sm"
                              : "bg-slate-55/40 border-slate-200 text-slate-655 hover:border-slate-350 hover:bg-slate-100/50"
                          }`}
                        >
                          <div className="text-xs font-bold mb-2.5 flex items-center gap-1.5 font-sora">
                            {v.name === "High Priority Launch" ? (
                              <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                            ) : (
                              <Sliders className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            )}
                            {v.name}
                          </div>
                          <div className="text-[9.5px] text-slate-500 leading-normal font-medium">{v.desc}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

            </div>

            {/* Navigation Footer Buttons */}
            <div className={(currentStep === 1 ? "hidden sm:flex " : "flex ") + "justify-between items-center pt-4 mt-4 border-t border-slate-100 font-sora"}>
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(prev => prev - 1)}
                  className="px-5 h-10 border border-slate-200 text-slate-600 hover:bg-slate-55/20 text-xs font-bold rounded-xl transition-all cursor-pointer"
                >
                  Back
                </button>
              ) : (
                <div />
              )}

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(prev => prev + 1)}
                  className="px-5 h-10 bg-[var(--accent-global)] hover:bg-[var(--accent-global-hover)] text-white text-xs font-bold rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-sm"
                >
                  Next Step
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleLockScope}
                  className="px-5 h-10 bg-gradient-to-r from-[var(--accent-global)] to-indigo-650 hover:from-[var(--accent-global-hover)] hover:to-indigo-550 text-white text-xs font-bold rounded-xl flex items-center gap-2 transition-all shadow-md cursor-pointer"
                >
                  Lock Scope & Request Quote
                  <CheckCircle className="w-4 h-4" />
                </button>
              )}
            </div>

          </div>

          {/* Desktop Telemetry Dashboard (Right Column on lg screens) */}
          <div className="hidden lg:flex lg:col-span-5 flex-col justify-between">
            {renderTelemetryDashboard(false)}
          </div>
        </div>
      </div>
    </section>
  );
}
