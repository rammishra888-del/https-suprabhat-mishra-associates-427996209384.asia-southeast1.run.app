import { useState } from "react";
import { PRACTICE_AREAS, FAQ_ITEMS } from "./legalData";
import { PracticeArea } from "./types";
import StampDutyCalculator from "./components/StampDutyCalculator";
import LawReference from "./components/LawReference";
import AppointmentForm from "./components/AppointmentForm";
import AiConsultant from "./components/AiConsultant";
import ClientDashboard from "./components/ClientDashboard";

import {
  Scale,
  ShieldAlert,
  Users,
  Home,
  Briefcase,
  FileText,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Clock,
  ArrowRight,
  Calculator,
  Bot,
  MessageSquare,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  Menu,
  X,
  Check,
  ChevronDown,
  History,
  Shield
} from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<"ai" | "stamp" | "search" | "booking" | "dashboard">("ai");
  const [selectedPracticeArea, setSelectedPracticeArea] = useState<string | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handlePracticeCardClick = (id: string) => {
    setSelectedPracticeArea(id === selectedPracticeArea ? null : id);
  };

  const currentPractice = PRACTICE_AREAS.find((p) => p.id === selectedPracticeArea);

  // Map icon strings to Lucide components
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "Scale":
        return <Scale className="w-6 h-6" />;
      case "ShieldAlert":
        return <ShieldAlert className="w-6 h-6" />;
      case "Users":
        return <Users className="w-6 h-6" />;
      case "Home":
        return <Home className="w-6 h-6" />;
      case "Briefcase":
        return <Briefcase className="w-6 h-6" />;
      case "FileText":
        return <FileText className="w-6 h-6" />;
      default:
        return <Scale className="w-6 h-6" />;
    }
  };

  return (
    <div class="min-h-screen bg-[#fafafc] text-gray-800 flex flex-col relative antialiased selection:bg-gold-500 selection:text-navy-950">
      
      {/* 1. Header Navigation Bar */}
      <nav class="fixed w-full z-50 bg-navy-900/95 backdrop-blur-md border-b border-gold-500/10 shadow-md">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-20">
            
            {/* Logo Brand Title */}
            <div class="flex-shrink-0 flex items-center gap-3">
              <div class="w-11 h-11 rounded-full bg-gold-500 flex items-center justify-center text-navy-900 font-serif font-bold text-xl border border-gold-450 shadow-inner">
                SM
              </div>
              <div>
                <a href="#" class="font-serif font-bold text-lg sm:text-xl text-white tracking-wide block leading-tight">
                  Suprabhat Mishra
                </a>
                <span class="text-gold-500 text-[10px] sm:text-xs font-semibold uppercase tracking-wider block">
                  & Associates Legal Solutions
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div class="hidden md:flex space-x-6 items-center">
              <a href="#about" class="text-gray-200 hover:text-gold-500 transition-colors font-medium text-xs uppercase tracking-wider">
                About Us
              </a>
              <a href="#practice-areas" class="text-gray-200 hover:text-gold-500 transition-colors font-medium text-xs uppercase tracking-wider">
                Practice Areas
              </a>
              <a href="#digital-workspace" class="text-gray-200 hover:text-gold-500 transition-colors font-medium text-xs uppercase tracking-wider">
                Tools & AI Consult
              </a>
              <a href="#contact" class="text-gray-200 hover:text-gold-500 transition-colors font-medium text-xs uppercase tracking-wider">
                Location & Schedule
              </a>
              <button
                type="button"
                id="header-portal-toggle"
                onClick={() => {
                  setActiveTab("dashboard");
                  document.getElementById("digital-workspace")?.scrollIntoView({ behavior: "smooth" });
                }}
                class="text-gold-400 hover:text-white hover:bg-gold-500/10 transition-all font-semibold text-[11px] uppercase tracking-wider flex items-center gap-1.5 border border-gold-500/30 px-3.5 py-1.5 rounded-lg cursor-pointer"
              >
                <History className="w-3.5 h-3.5" />
                Client Portal
              </button>
              <a
                href="tel:9450365729"
                class="bg-gold-500 hover:bg-gold-400 text-navy-900 px-5 py-2.5 rounded-lg font-bold text-xs uppercase tracking-widest transition-all shadow-md shadow-gold-500/10 flex items-center gap-2 border border-gold-400"
              >
                <Phone className="w-3.5 h-3.5" />
                9450365729
              </a>
            </div>

            {/* Mobile Menu Toggle Button */}
            <div class="md:hidden">
              <button
                id="main-mobile-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                class="text-gray-300 hover:text-gold-500 focus:outline-none transition-colors p-2"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Dropdown Panel */}
        {mobileMenuOpen && (
          <div class="md:hidden bg-navy-950 border-t border-gold-500/10 px-4 pt-4 pb-6 space-y-3 shadow-2xl transition-all">
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              class="block px-3 py-2 text-base font-semibold text-gray-200 hover:text-gold-500 hover:bg-navy-900 rounded-lg transition-all"
            >
              About Us
            </a>
            <a
              href="#practice-areas"
              onClick={() => setMobileMenuOpen(false)}
              class="block px-3 py-2 text-base font-semibold text-gray-200 hover:text-gold-500 hover:bg-navy-900 rounded-lg transition-all"
            >
              Practice Areas
            </a>
            <a
              href="#digital-workspace"
              onClick={() => setMobileMenuOpen(false)}
              class="block px-3 py-2 text-base font-semibold text-gray-200 hover:text-gold-500 hover:bg-navy-900 rounded-lg transition-all"
            >
              Tools & AI Consult
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              class="block px-3 py-2 text-base font-semibold text-gray-200 hover:text-gold-500 hover:bg-navy-900 rounded-lg transition-all"
            >
              Location & Schedule
            </a>
            <div class="pt-2 border-t border-navy-800 space-y-2">
              <button
                type="button"
                id="mobile-portal-toggle"
                onClick={() => {
                  setActiveTab("dashboard");
                  setMobileMenuOpen(false);
                  document.getElementById("digital-workspace")?.scrollIntoView({ behavior: "smooth" });
                }}
                class="w-full text-gold-400 border border-gold-500/20 px-3 py-2 text-base font-semibold text-center hover:bg-navy-900 rounded-lg transition-all flex items-center justify-center gap-2"
              >
                <History className="w-4 h-4" />
                Returning Client Portal
              </button>
              <a
                href="tel:9450365729"
                class="w-full bg-gold-500 text-navy-900 px-4 py-3 rounded-lg font-bold text-center flex items-center justify-center gap-2 shadow-lg"
              >
                <Phone className="w-4 h-4" />
                Call: 9450365729
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* 2. Brand Hero Section */}
      <header class="relative bg-navy-900 pt-32 pb-24 sm:pt-40 sm:pb-32 overflow-hidden border-b border-gold-500/15">
        <div class="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-900 to-navy-850 opacity-95"></div>
        
        {/* Dynamic Abstract Background Elements */}
        <div class="absolute top-1/4 right-0 w-96 h-96 bg-gold-500 rounded-full blur-[100px] opacity-10 pointer-events-none"></div>
        <div class="absolute -bottom-10 left-0 w-80 h-80 bg-blue-500 rounded-full blur-[100px] opacity-10 pointer-events-none"></div>
        
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 z-10">
          
          <span class="inline-block px-3.5 py-1.5 bg-gold-500/10 border border-gold-500/30 rounded-full text-[10px] sm:text-xs font-semibold text-gold-400 uppercase tracking-widest">
            Chamber No. 7, Kanpur Collectorate Court
          </span>

          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight tracking-tight max-w-4xl mx-auto">
            One Firm. <span class="shimmer-text bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">All Legal Solutions.</span>
          </h1>

          <p class="text-lg sm:text-xl text-gray-300 font-serif italic max-w-3xl mx-auto border-l-2 border-r-2 border-gold-500/20 px-6 py-2">
            "Where Justice Begins With Trust — न्याय जहाँ विश्वास से शुरू होता है।"
          </p>

          {/* Core Areas Tag Grid */}
          <div class="flex flex-wrap justify-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-300 font-medium max-w-2xl mx-auto">
            <span class="px-3.5 py-1.5 bg-navy-950/55 border border-white/10 rounded-lg">Civil Litigation</span>
            <span class="px-3.5 py-1.5 bg-navy-950/55 border border-white/10 rounded-lg">Criminal Defense</span>
            <span class="px-3.5 py-1.5 bg-navy-950/55 border border-white/10 rounded-lg">Family & Alimony</span>
            <span class="px-3.5 py-1.5 bg-navy-950/55 border border-white/10 rounded-lg">Real Estate & Mutat.</span>
            <span class="px-3.5 py-1.5 bg-navy-950/55 border border-white/10 rounded-lg">Business Deeds</span>
          </div>

          {/* Instant Call Action Buttons */}
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 max-w-xl mx-auto">
            <a
              id="hero-call-btn"
              href="tel:9450365729"
              class="w-full sm:w-auto px-8 py-4 bg-gold-500 text-navy-900 rounded-xl font-bold hover:bg-gold-400 transition-all shadow-lg hover:shadow-gold-500/20 flex items-center justify-center gap-2 text-base border border-gold-300 hover:-translate-y-0.5"
            >
              <Phone className="w-5 h-5" />
              Call Advocate: 9450365729
            </a>
            <button
              id="hero-portal-btn"
              onClick={() => {
                setActiveTab("dashboard");
                document.getElementById("digital-workspace")?.scrollIntoView({ behavior: "smooth" });
              }}
              class="w-full sm:w-auto px-8 py-4 bg-navy-950/40 text-gold-500 border border-gold-500 hover:bg-gold-500/10 rounded-xl font-bold transition-all flex items-center justify-center gap-2 text-base cursor-pointer"
            >
              <History className="w-5 h-5 text-gold-500" />
              Returning Client Portal
            </button>
            <a
              id="hero-whatsapp-btn"
              href="https://wa.me/919450365729"
              target="_blank"
              rel="noreferrer"
              class="w-full sm:w-auto px-8 py-4 bg-navy-950/40 text-gray-300 border border-white/10 hover:bg-white/5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 text-base"
            >
              <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              WhatsApp Us
            </a>
          </div>

        </div>
      </header>

      {/* 3. Chamber / Bio Section */}
      <section id="about" class="py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div class="text-center mb-16 space-y-2">
            <h2 class="text-3xl md:text-4xl font-serif font-bold text-navy-900 inline-block relative px-4">
              Our Professional Chamber Profile
              <div class="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gold-500 rounded-full"></div>
            </h2>
          </div>

          <div class="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Visual Portrait */}
            <div class="lg:col-span-5 relative group">
              <div class="absolute inset-0 bg-gold-500 transform translate-x-4 translate-y-4 rounded-2xl -z-10 transition-transform duration-300 group-hover:translate-x-2.5 group-hover:translate-y-2.5"></div>
              <div class="bg-navy-900 rounded-2xl overflow-hidden aspect-4/3 shadow-xl border border-gold-500/20 max-h-[380px]">
                {/* Visual depiction of Kanpur Collectorate Chamber */}
                <div class="w-full h-full bg-navy-950 flex flex-col items-center justify-center p-8 text-center space-y-4 relative">
                  <div class="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-transparent opacity-90"></div>
                  <Scale className="w-16 h-16 text-gold-500" />
                  <p class="font-serif font-bold text-2xl text-white">Chamber No. 7</p>
                  <p class="text-gold-400 font-mono text-xs uppercase tracking-widest font-semibold">New Adhivakta Building, 2nd Floor</p>
                  <p class="text-xs text-gray-300 max-w-sm">
                    Collectorate Court Compound, Municipal Civil Lines bounds, Kanpur Nagar, Uttar Pradesh
                  </p>
                </div>
              </div>
            </div>

            {/* Profile Bio Details */}
            <div class="lg:col-span-7 space-y-6">
              <h3 class="text-2xl sm:text-3xl font-serif font-bold text-navy-900">
                Advocate Suprabhat Mishra <span class="text-gold-600 block text-lg font-sans font-semibold mt-1">B.A. LL.B | High Court & District Court Counsel</span>
              </h3>

              <div class="space-y-4 text-sm text-gray-600 leading-relaxed font-sans">
                <p>
                  Active and practicing since several years from <strong class="text-navy-900 font-semibold">Chamber No. 7, New Adhivakta Building, Collectorate Court, Kanpur</strong>, Adv. Suprabhat Mishra is associated with absolute legal integrity, solid documentation, and professional representation.
                </p>
                <p>
                  हम कानपुर एवं समीपवर्ती जिलों में <strong class="text-navy-900 font-semibold">दीवानी (Civil), फौजदारी (Criminal), वैवाहिक और पारिवारिक (Family Law), कॉर्पोरेट अनुपालन, एवं संपत्ति प्रलेखन</strong> कानूनी मामलों में उत्कृष्ट विधिक सेवाएं प्रदान करते हैं।
                </p>
                <p>
                  Our legal chamber is committed to delivering honest, objective legal insights without unrequested jargon. We empower clients with the precise statutory realities of their suits so they make safe decisions.
                </p>
              </div>

              {/* Three Chamber Pillars */}
              <div class="grid sm:grid-cols-3 gap-4 pt-4">
                <div class="bg-gray-50 p-4 rounded-xl border-l-4 border-l-gold-500 space-y-1">
                  <p class="font-serif font-bold text-navy-900 text-sm">Chamber 7 Advantage</p>
                  <p class="text-xs text-gray-500">Accessible location in New Adhivakta complex.</p>
                </div>
                <div class="bg-gray-50 p-4 rounded-xl border-l-4 border-l-gold-500 space-y-1">
                  <p class="font-serif font-bold text-navy-900 text-sm">Clear Honest Counsel</p>
                  <p class="text-xs text-gray-500">Plain human terms without hidden guidelines.</p>
                </div>
                <div class="bg-gray-50 p-4 rounded-xl border-l-4 border-l-gold-500 space-y-1">
                  <p class="font-serif font-bold text-navy-900 text-sm">Complete Privilege</p>
                  <p class="text-xs text-gray-500">All litigation strategies are entirely confidential.</p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 4. Tabbed Digital Intake & Tools Workspace Section */}
      <section id="digital-workspace" class="py-20 bg-gray-100/50 border-t border-b border-gray-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div class="text-center mb-12 space-y-2">
            <h2 class="text-2xl sm:text-3xl font-serif font-bold text-navy-900">
              Interactive Legal Tools & Client Workspace
            </h2>
            <p class="text-xs sm:text-sm text-gray-500 max-w-2xl mx-auto">
              Draft formal notice blueprints with our AI assistant, compute Uttar Pradesh property registries stamp duties, search statutory IPC elements, or book a physical consult.
            </p>
          </div>

          {/* Interactive Workspace Navigation Tabs */}
          <div class="bg-white p-2 rounded-2xl shadow-sm border border-gray-200 flex flex-nowrap overflow-x-auto scrollbar-thin divide-x divide-gray-100 mb-8 max-w-5xl mx-auto">
            <button
              id="tab-client-dashboard"
              onClick={() => setActiveTab("dashboard")}
              class={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer min-w-[170px] ${
                activeTab === "dashboard"
                  ? "bg-navy-900 text-gold-500 shadow-sm font-bold"
                  : "text-gray-500 hover:text-navy-900 hover:bg-gray-50"
              }`}
            >
              <History className="w-4.5 h-4.5" />
              Returning Client Portal
            </button>
            <button
              id="tab-ai-consultant"
              onClick={() => setActiveTab("ai")}
              class={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer min-w-[170px] ${
                activeTab === "ai"
                  ? "bg-navy-900 text-gold-500 shadow-sm font-bold"
                  : "text-gray-500 hover:text-navy-900 hover:bg-gray-50"
              }`}
            >
              <Bot className="w-4.5 h-4.5" />
              AI Legal Bot Consult
            </button>
            <button
              id="tab-stamp-calculator"
              onClick={() => setActiveTab("stamp")}
              class={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer min-w-[170px] ${
                activeTab === "stamp"
                  ? "bg-navy-900 text-gold-500 shadow-sm font-bold"
                  : "text-gray-500 hover:text-navy-900 hover:bg-gray-50"
              }`}
            >
              <Calculator className="w-4.5 h-4.5" />
              Stamp Duty Estimator
            </button>
            <button
              id="tab-law-finder"
              onClick={() => setActiveTab("search")}
              class={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer min-w-[170px] ${
                activeTab === "search"
                  ? "bg-navy-900 text-gold-500 shadow-sm font-bold"
                  : "text-gray-500 hover:text-navy-900 hover:bg-gray-50"
              }`}
            >
              <Scale className="w-4.5 h-4.5" />
              IPC / CrPC Guide Finder
            </button>
            <button
              id="tab-booking-form"
              onClick={() => setActiveTab("booking")}
              class={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer min-w-[170px] ${
                activeTab === "booking"
                  ? "bg-navy-900 text-gold-500 shadow-sm font-bold"
                  : "text-gray-500 hover:text-navy-900 hover:bg-gray-50"
              }`}
            >
              <Calendar className="w-4.5 h-4.5" />
              Book Chamber Consult
            </button>
          </div>

          {/* Active Dynamic Component Wrapper */}
          <div class="transition-all duration-300">
            {activeTab === "dashboard" && <ClientDashboard />}
            {activeTab === "ai" && <AiConsultant />}
            {activeTab === "stamp" && <StampDutyCalculator />}
            {activeTab === "search" && <LawReference />}
            {activeTab === "booking" && <AppointmentForm />}
          </div>

        </div>
      </section>

      {/* 5. Bento Practice Areas Catalog */}
      <section id="practice-areas" class="py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div class="text-center mb-16 space-y-3">
            <h2 class="text-3xl md:text-4xl font-serif font-bold text-navy-900 inline-block relative">
              Practice Disciplines
              <div class="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gold-500 rounded-full"></div>
            </h2>
            <p class="text-sm text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Explore key aspects of cases actively defended under Adv. Suprabhat Mishra's counsel. Click any area cards to expand typical litigation matters.
            </p>
          </div>

          <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRACTICE_AREAS.map((pt) => {
              const isSelected = selectedPracticeArea === pt.id;
              return (
                <div
                  id={`practice-card-${pt.id}`}
                  key={pt.id}
                  onClick={() => handlePracticeCardClick(pt.id)}
                  class={`bg-white rounded-2xl border transition-all duration-300 hover:shadow-xl cursor-pointer flex flex-col justify-between overflow-hidden relative group p-8 ${
                    isSelected
                      ? "ring-2 ring-gold-500 border-transparent shadow-xl"
                      : "border-gray-1.5 shadow-sm"
                  }`}
                >
                  {/* Styling indicator */}
                  <div class="absolute top-0 left-0 w-full h-1.5 bg-navy-900 transition-colors group-hover:bg-gold-500"></div>

                  <div class="space-y-5">
                    {/* Icon container */}
                    <div class="w-13 h-13 bg-navy-900/5 text-navy-900 rounded-xl flex items-center justify-center transition-all group-hover:bg-navy-900 group-hover:text-gold-500">
                      {getIconComponent(pt.iconName)}
                    </div>

                    <div class="space-y-1">
                      <div class="flex justify-between items-center">
                        <h3 class="text-xl font-serif font-bold text-navy-900 group-hover:text-navy-850">
                          {pt.title}
                        </h3>
                        <span class="text-xs font-serif font-semibold text-gold-600 bg-gold-50 px-2.5 py-0.5 rounded border border-gold-200">
                          {pt.titleHindi}
                        </span>
                      </div>
                      <p class="text-xs text-gray-500 leading-relaxed font-medium mt-1">
                        {pt.shortDesc}
                      </p>
                    </div>

                    {/* Expandable Matter Details list */}
                    {isSelected && (
                      <div class="pt-4 border-t border-dashed border-gray-100 space-y-4 text-xs">
                        <div class="space-y-2">
                          <p class="font-bold text-navy-900 uppercase tracking-wide">Litigation Specifics:</p>
                          <ul class="space-y-1.5 list-none">
                            {pt.casesHandled.map((ch, idx) => (
                              <li key={idx} class="flex items-center gap-2 text-gray-700">
                                <span class="w-1.5 h-1.5 rounded-full bg-gold-500 flex-shrink-0" />
                                {ch}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div class="space-y-1.5 bg-gray-50 p-3 rounded-lg border border-gray-200">
                          <p class="font-bold text-[10px] text-gray-500 uppercase tracking-widest">Common Dispute Conflicts:</p>
                          <p class="text-[11px] text-gray-700 leading-relaxed font-serif italic">
                            "{pt.disputesType.join(" • ")}"
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <button
                    id={`toggle-details-btn-${pt.id}`}
                    type="button"
                    class="pt-5 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-navy-900 group-hover:text-gold-600 transition-colors w-full border-t border-gray-100 mt-6"
                  >
                    <span>{isSelected ? "Hide Details" : "View Court matters"}</span>
                    <ArrowRight className={`w-4 h-4 transform transition-transform ${isSelected ? "rotate-90 text-gold-500" : "group-hover:translate-x-1"}`} />
                  </button>

                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 6. Professional FAQ Section */}
      <section id="faq" class="py-20 bg-gray-50">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div class="text-center mb-12 space-y-2">
            <h2 class="text-2xl sm:text-3xl font-serif font-bold text-navy-900">
              Uttar Pradesh Court & Legal FAQs
            </h2>
            <p class="text-xs sm:text-sm text-gray-500">
              Typical guidelines for property, divorce registries, stamp valuations, and bails in Kanpur District courts.
            </p>
          </div>

          <div class="space-y-4">
            {FAQ_ITEMS.map((faq, index) => {
              const isOpen = expandedFaq === index;
              return (
                <div
                  id={`faq-item-${index}`}
                  key={index}
                  class="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm transition-all"
                >
                  <button
                    id={`faq-btn-${index}`}
                    onClick={() => setExpandedFaq(isOpen ? null : index)}
                    class="w-full text-left p-5 flex items-center justify-between gap-4 focus:outline-none cursor-pointer hover:bg-gold-50/20"
                  >
                    <div>
                      <span class="inline-block px-2 py-0.5 bg-navy-900 text-gold-500 font-mono text-[9px] uppercase tracking-widest font-bold rounded mb-2">
                        {faq.vibe}
                      </span>
                      <h4 class="font-serif font-bold text-navy-900 text-sm sm:text-base leading-tight">
                        {faq.q}
                      </h4>
                    </div>
                    {isOpen ? (
                      <X className="w-5 h-5 text-gold-600 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div class="px-5 pb-5 border-t border-gray-100 pt-4 bg-gray-50/40 text-xs sm:text-sm text-gray-700 leading-relaxed font-sans">
                      <p class="whitespace-pre-line">
                        {faq.a}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 7. Contact / Location & Schedule Section */}
      <section id="contact" class="py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div class="bg-navy-900 rounded-3xl shadow-2xl overflow-hidden border border-gold-500/10 relative">
            <div class="absolute top-0 right-0 w-80 h-80 bg-gold-500 rounded-full blur-[120px] opacity-[0.06] pointer-events-none"></div>

            <div class="grid lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-white/5">
              
              {/* Info Block */}
              <div class="lg:col-span-6 p-8 sm:p-12 lg:p-16 flex flex-col justify-between space-y-10">
                <div class="space-y-3">
                  <span class="inline-block px-3 py-1 bg-gold-500/10 border border-gold-500/20 text-gold-400 font-serif italic text-xs rounded-full">
                    Consultation & Pleading Appointments
                  </span>
                  <h2 class="text-3xl sm:text-4xl font-serif font-bold text-white tracking-wide">
                    Chamber Visitation Info
                  </h2>
                  <p class="text-sm text-gray-300 leading-relaxed">
                    Prior appointment scheduling ensures Advocate Suprabhat Mishra completes reviews of land registries or chargesheets before matches.
                  </p>
                </div>

                <div class="space-y-6 text-sm">
                  
                  <div class="flex items-start gap-4">
                    <div class="w-11 h-11 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center text-gold-500 flex-shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 class="text-gold-500 font-semibold uppercase tracking-wider text-[11px] mb-0.5">Physical Chamber Coordinate</h4>
                      <p class="text-gray-300 leading-relaxed text-xs">
                        Chamber No. 7, Second Floor,<br />
                        New Adhivakta Building, Collectorate Court Compound,<br />
                        Kanpur Nagar - 208001, Uttar Pradesh, India.
                      </p>
                    </div>
                  </div>

                  <div class="flex items-start gap-4">
                    <div class="w-11 h-11 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center text-gold-500 flex-shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 class="text-gold-500 font-semibold uppercase tracking-wider text-[11px] mb-0.5">Telephone Call Box</h4>
                      <a href="tel:9450365729" class="text-gray-100 hover:text-gold-500 transition-colors text-sm font-bold block mt-0.5">
                        +91 94503 65729
                      </a>
                    </div>
                  </div>

                  <div class="flex items-start gap-4">
                    <div class="w-11 h-11 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center text-gold-500 flex-shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 class="text-gold-500 font-semibold uppercase tracking-wider text-[11px] mb-0.5">E-Mail Address</h4>
                      <a href="mailto:ram.mishra888@gmail.com" class="text-gray-100 hover:text-gold-500 transition-colors text-sm font-medium block mt-0.5">
                        ram.mishra888@gmail.com
                      </a>
                    </div>
                  </div>

                  <div class="flex items-start gap-4">
                    <div class="w-11 h-11 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center text-gold-500 flex-shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 class="text-gold-500 font-semibold uppercase tracking-wider text-[11px] mb-0.5">Visiting Working Timings</h4>
                      <p class="text-gray-300 text-xs">Monday to Saturday: 10:00 AM - 06:00 PM (Court Working hours)</p>
                    </div>
                  </div>

                </div>

                <div class="pt-4 flex flex-wrap gap-3">
                  <a
                    id="map-directions-btn"
                    href="https://maps.google.com/?q=Kanpur+Collectorate"
                    target="_blank"
                    rel="noreferrer"
                    class="inline-flex items-center gap-2 bg-gold-500 text-navy-900 px-6 py-3 rounded-lg font-bold hover:bg-gold-400 text-xs uppercase tracking-widest border border-gold-300 transition-all shadow-md shadow-gold-500/10 cursor-pointer"
                  >
                    <MapPin className="w-4.5 h-4.5" />
                    Get Map Directions
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

              </div>
              
              {/* Map Frame Embedded */}
              <div class="lg:col-span-6 h-72 sm:h-auto min-h-[400px] overflow-hidden relative">
                {/* Embed focusing on Kanpur Collectorate area roughly inline with references */}
                <iframe
                  id="google-maps-embed-frame"
                  class="absolute inset-0 w-full h-full border-0 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3571.4939221190457!2d80.347895!3d26.471927!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399c47a2569f7069%3A0xc3e17cf3cf081827!2sKanpur%20Collectorate!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  allowfullscreen
                  loading="lazy"
                  referrerPolicy="no-referrer"
                ></iframe>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 8. Footer Block */}
      <footer class="bg-navy-950 border-t border-gold-500/10 py-12 text-center text-xs text-gray-400">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          <div class="w-12 h-12 bg-gold-500 rounded-full flex items-center justify-center text-navy-900 font-serif font-bold text-lg mx-auto border border-gold-400 shadow">
            SM
          </div>

          <div class="space-y-1">
            <p class="text-sm font-semibold text-gray-200">© 2026 Suprabhat Mishra & Associates Legal Solutions.</p>
            <p class="text-gold-500 font-serif italic text-xs">"Advocate Suprabhat Mishra, B.A. LL.B — Practicing Active Litigation"</p>
          </div>

          <div class="max-w-lg mx-auto text-[11px] text-gray-500 leading-relaxed font-sans">
            Chamber No. 7, Second Floor, New Adhivakta Building, Collectorate Court, Civil Lines bounds, Kanpur Nagar, Uttar Pradesh - 208001. All solicitor-client operations are subject to standard confidentiality protections in Indian courts.
          </div>

          <div class="pt-4 border-t border-white/5 flex flex-wrap justify-center gap-6 font-mono text-[10px] tracking-wider text-gray-500">
            <span>OFFICIAL COMPLIANCE</span>
            <span>•</span>
            <span>UTTAR PRADESH DISTRICT BAR ASSOCIATION</span>
            <span>•</span>
            <span>SUPREME COURT ADVOCACY PRECEDENTS</span>
          </div>

        </div>
      </footer>

    </div>
  );
}
