import React, { useState, useEffect } from "react";
import { ClientProfile, ClientDocument, ClientConsultation } from "../types";
import {
  FileText,
  User,
  Phone,
  Search,
  CheckCircle,
  Clock,
  Briefcase,
  AlertCircle,
  FileCheck,
  Download,
  Printer,
  ChevronRight,
  ArrowRight,
  Plus,
  Send,
  XCircle,
  ExternalLink,
  History,
  FileSpreadsheet,
  Gavel,
  Check,
  Shield,
  MapPin,
  X
} from "lucide-react";

// Initial Demo Returning Clients
const PRESET_PROFILES: ClientProfile[] = [
  {
    phone: "9876543210",
    clientName: "Rajesh Kumar Chaturvedi",
    email: "rajesh.chaturvedi@yahoo.com",
    caseStatus: "Advocate Pleading Filed",
    fileNumber: "SM/2026/A-412",
    matterType: "Civil Litigation & Property",
    progressPercent: 75,
    consultations: [
      {
        id: "c-101",
        date: "2026-05-10, 11:30 AM",
        summary: "Detailed review of ancestor ancestral land partition deed records in Swaroop Nagar.",
        lawyerNotes: "The partition deed lacks co-sharer signatures. Filed a physical suit for declaration of partition and permanent injunction in the Court of Civil Judge Senior Division.",
        courtLocation: "Chamber No. 7 / Civil Judge Court Building Campus, Kanpur"
      },
      {
        id: "c-102",
        date: "2026-04-14, 02:45 PM",
        summary: "Consultation regarding mutation denial by Kanpur Nagar Nigam authorities.",
        lawyerNotes: "Suggested immediate mutation appeal under Section 213 of the UP Municipal Corporation Act. Arranged necessary tax receipt copies.",
        courtLocation: "Chamber No. 7, Collectorate Court Compound, Kanpur"
      }
    ],
    documents: [
      {
        id: "doc-201",
        name: "Partition_Declaration_Suit_Petition_Draft.txt",
        type: "Pleading Affidavit",
        dateCreated: "2026-05-12",
        fileSize: "14.2 KB",
        content: `IN THE COURT OF THE CIVIL JUDGE (SENIOR DIVISION), KANPUR NAGAR
PRESIDED BY: HON'BLE CIVIL JUDGE IN THE MATTER OF SPECIAL CIVIL SUIT NO. 142 OF 2026

Rajesh Kumar Chaturvedi
S/o Late Pt. Dina Nath Chaturvedi,
R/o Flat 402, Swaroop Nagar, Kanpur Nagar.
                                                     ...PLAINTIFF

                     VERSUS

Dinesh Chandra Chaturvedi & Others
                                                     ...DEFENDANTS

SUIT FOR DECLARATION, PARTITION BY METES AND BOUNDS, AND PERMANENT INJUNCTION

The humble plaintiff submits as under:
1. That the plaintiff and defendants are absolute direct legal heirs of Late Pt. Dina Nath Chaturvedi who passed away intestate on 15th October 2024.
2. That the property described in Schedule 'A' is ancestral land measuring 2400 Sq. Yards situated at Kanpur Nagar.
3. That the defendants are attempting to execute an illegal sale deed of the said joint family property without the explicit consent of the plaintiff.
4. Hence, the plaintiff prays for:
   a) A decree of partition allocating 1/3rd share to the plaintiff.
   b) A decree of permanent injunction restraining the defendants from alienating the land.

Advocate: Suprabhat Mishra, Chamber 7, Kanpur.`
      },
      {
        id: "doc-202",
        name: "Municipal_Corporation_Mutation_Appeal.txt",
        type: "Notice",
        dateCreated: "2026-04-16",
        fileSize: "8.5 KB",
        content: `BEFORE THE APPELLATE AUTHORITY / MUNICIPAL COMMISSIONER
KANPUR NAGAR NIGAM, MOTIJHEEL, KANPUR

MUTATION APPEAL UNDER SEC 213 OF THE UP MUNICIPAL CORPORATION ACT, 1959

In Re: Mutation Rejection Order No. KNN/MUT/8912/2026

Rajesh Kumar Chaturvedi ...Appellant

Versus

Tax Assessment Officer, Zone-3, Kanpur Nagar Nigam ...Respondent

REPRESENTATION MEMO ON BEHALF OF THE APPELLANT:
The Appellant begs to challenge the assessment officer's mechanical mutation rejection on the following grounds:
1. That the appellant is in active possessive title over the household premises via an registered gift deed dated 12.02.2018.
2. That the rejection contains no reasons, violating fundamental principles of natural administrative justice.
3. It is prayed that the rejection order is set aside and mutation is allowed.

Counsel for Appellant: Advocate Suprabhat Mishra, Chamber No. 7`
      }
    ]
  },
  {
    phone: "9123456789",
    clientName: "Suman Lata Devi",
    email: "sumandevi.kanpur@gmail.com",
    caseStatus: "Documentation Review",
    fileNumber: "SM/2026/F-208",
    matterType: "Family & Matrimonial Law",
    progressPercent: 40,
    consultations: [
      {
        id: "c-103",
        date: "2026-05-02, 03:30 PM",
        summary: "Pre-mediation drafting terms setup for counseling session.",
        lawyerNotes: "Drafted an intensive separation alimony clause seeking 25,000 INR per month under family rules. Husband party has agreed to legal physical mediation.",
        courtLocation: "Principal Family Court Campus, New Court Compound, Kanpur"
      },
      {
        id: "c-104",
        date: "2026-03-10, 11:00 AM",
        summary: "Maintenance petition strategy under Section 125 of CrPC.",
        lawyerNotes: "Evaluated husband salary slips. Preparing concrete affidavit listing bank accounts.",
        courtLocation: "Chamber No. 7, Collectorate court complex, Kanpur"
      }
    ],
    documents: [
      {
        id: "doc-203",
        name: "Family_Mediation_Agreement_Blueprint.txt",
        type: "Agreement",
        dateCreated: "2026-05-03",
        fileSize: "11.6 KB",
        content: `MEMORANDUM OF FAMILY SETTLEMENT AND MUTUAL CONCILIATION AGREEMENT
DATED: 3rd May 2026

This settlement is entered into between:
Smt. Suman Lata Devi, Wife of Sh. Vinay Kumar,
R/o Sharda Nagar, Kanpur.
                                                     ...First Party
                     AND
Sh. Vinay Kumar, Son of Sh. Harish Kumar,
R/o Swaroop Nagar, Kanpur.
                                                     ...Second Party

WHEREAS both parties have pending marital dispute proceedings before the Principal Family Court, Kanpur Nagar bearing Case No. 421/2026.
NOW IT IS MUTUALLY RESOLVED AS UNDER:
1. Both parties agree to reside separately without interference or harassment.
2. The Second Party agrees to pay Sh. 22,000/- (Twenty Two Thousand) towards permanent monthly maintenance.
3. Both parties shall withdraw all police cases within 30 days.

Witnesses:
1. Pt. Ram Mishra, Kanpur Collectorate Area
2. Counsel Adv. Suprabhat Mishra, Chamber No. 7, Kanpur.`
      }
    ]
  },
  {
    phone: "9450365729",
    clientName: "Mishra Builders (Sh. Amit Mishra)",
    email: "mishrabuilders.corp@gmail.com",
    caseStatus: "Court Decision Status",
    fileNumber: "SM/2026/C-580",
    matterType: "Property Registries & Deeds",
    progressPercent: 90,
    consultations: [
      {
        id: "c-105",
        date: "2026-05-22, 10:30 AM",
        summary: "Stamp Duty assessment review for high-value Commercial Lease Registry.",
        lawyerNotes: "Analyzed Swaroop Nagar municipal circle rates. Computed exact stamp levy at 7% as per UP Gazette. Saved registry penalty threats.",
        courtLocation: "Sub-Registrar Office-I, Collectorate Complex, Kanpur"
      }
    ],
    documents: [
      {
        id: "doc-204",
        name: "Commercial_Lease_Stamp_duty_report.txt",
        type: "Stamp Estimator",
        dateCreated: "2026-05-22",
        fileSize: "6.8 KB",
        content: `LEGAL STAMP DUTY ASSESSMENT REPORT & OPINION CERTIFICATE
CHAMBER NO. 7, SUPRABHAT MISHRA & ASSOCIATES

PREPARED FOR: Sh. Amit Mishra, Managing Director, Mishra Builders & Developers.
SUBJECT PROPERTY: Commercial Plot No. A-12, Swaroop Nagar Municipal Bounds, Kanpur Nagar.

STAMP VALUATION COMPUTATIONS:
- Market Value of Property: INR 1,50,000.00
- Prescribed UP Stamp Duty Rate (Commercial property, Urban bounds): 7.00%
- Base Stamp Duty computed: INR 10,500.00
- Additional Municipal Surcharge: INR 2,000.00
- Total Required Stamp Duty paper valuation: INR 12,500.00
- Registration Commission (1.00% ceiling): INR 1,500.00

OPINION INSIGHTS:
The lease registry is lawfully admissible when executed with stamps valued at the computed INR 12,500. Delay in filing will incur interest under UP Stamp Act Section 47A.

Date: 22nd May 2026
Advocate Suprabhat Mishra, Kanpur Nagar.`
      }
    ]
  }
];

export default function ClientDashboard() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [activeProfile, setActiveProfile] = useState<ClientProfile | null>(null);
  const [searchError, setSearchError] = useState("");
  const [selectedDoc, setSelectedDoc] = useState<ClientDocument | null>(null);
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [clientNoteInput, setClientNoteInput] = useState("");
  const [customProfiles, setCustomProfiles] = useState<ClientProfile[]>([]);
  const [successMsg, setSuccessMsg] = useState("");

  // Load state and load any booked appointments as profiles
  useEffect(() => {
    // Collect pre-filled profiles and custom ones from localStorage
    const savedCustom = localStorage.getItem("sm_custom_clients");
    let customList: ClientProfile[] = [];
    if (savedCustom) {
      try {
        customList = JSON.parse(savedCustom);
        setCustomProfiles(customList);
      } catch (e) {
        console.error("Failed to parse custom profiles", e);
      }
    }

    // Check if we can synchronize bookings from local state as profiles
    const savedDossierList = localStorage.getItem("sm_scheduled_dossiers");
    if (savedDossierList) {
      try {
        const bookings = JSON.parse(savedDossierList);
        // Convert any new booking into a mock returning client profile automatically if not exists
        bookings.forEach((bk: any) => {
          const phoneClean = bk.phone.trim();
          const alreadyInPresets = PRESET_PROFILES.some(p => p.phone === phoneClean);
          const alreadyInCustom = customList.some(p => p.phone === phoneClean);

          if (!alreadyInPresets && !alreadyInCustom) {
            const newProf: ClientProfile = {
              phone: phoneClean,
              clientName: bk.clientName,
              email: bk.email || "N/A",
              caseStatus: "Case Initiated",
              fileNumber: bk.fileNumber || "SM/2026/NEW-001",
              matterType: bk.matterType,
              progressPercent: 20,
              consultations: [
                {
                  id: `c-new-${Math.random().toString(36).substr(2, 4)}`,
                  date: bk.dateCreated || new Date().toLocaleString(),
                  summary: `Initial digital intake dossier submitted: "${bk.description}"`,
                  lawyerNotes: `Appointment scheduled for ${bk.preferredDate} (${bk.preferredSlot}). Jurisdiction matches ${bk.estimatedJurisdiction}.`,
                  courtLocation: "Chamber No. 7, Kanpur Collectorate Court"
                }
              ],
              documents: [
                {
                  id: `doc-new-${Math.random().toString(36).substr(2, 4)}`,
                  name: `Intake_Dossier_Summary_${bk.fileNumber.replace(/\//g, "_")}.txt`,
                  type: "Notice",
                  dateCreated: bk.dateCreated ? bk.dateCreated.substring(0, 10) : new Date().toISOString().substring(0, 10),
                  fileSize: "2.1 KB",
                  content: `SUPRABHAT MISHRA & ASSOCIATES LEGAL SOLUTIONS
Intake Record File Number: ${bk.fileNumber}
===========================================
Client Identity Name: ${bk.clientName}
Contact Cellphone:     ${bk.phone}
Contact Email:         ${bk.email}
Legal Matter:          ${bk.matterType}

Description Brief:
"${bk.description}"

Meeting Allocation Date: ${bk.preferredDate}
Meeting Allocation Slot: ${bk.preferredSlot}
Court Jurisdiction:     ${bk.estimatedJurisdiction}

Please carry your identity proof and direct documents to Chamber 7.`
                }
              ]
            };
            customList.push(newProf);
          }
        });
        localStorage.setItem("sm_custom_clients", JSON.stringify(customList));
        setCustomProfiles(customList);
      } catch (err) {
        console.error("Booking sync error", err);
      }
    }
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchError("");
    setSuccessMsg("");

    const term = phoneNumber.trim();
    if (!term) {
      setSearchError("Please input an active phone number to look up records.");
      return;
    }

    // Search presets
    let found = PRESET_PROFILES.find((p) => p.phone === term);
    
    // Search custom/localStorage profiles
    if (!found) {
      found = customProfiles.find((p) => p.phone === term);
    }

    if (found) {
      setActiveProfile({ ...found });
    } else {
      setSearchError("No case records found for this phone number format. Tip: Try looking up '9876543210' or '9123456789' for demo records!");
    }
  };

  const loadDemoProfile = (phone: string) => {
    setPhoneNumber(phone);
    const found = PRESET_PROFILES.find((p) => p.phone === phone) || customProfiles.find((p) => p.phone === phone);
    if (found) {
      setActiveProfile({ ...found });
      setSearchError("");
      setSuccessMsg("");
    }
  };

  const handleAddClientConsultNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientNoteInput.trim() || !activeProfile) return;

    const newConsultation: ClientConsultation = {
      id: `c-note-${Date.now()}`,
      date: new Date().toLocaleDateString() + ", " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      summary: "Client Portal Self-Submitted Note/Update Request",
      lawyerNotes: clientNoteInput,
      courtLocation: "Digital Chamber Portal Submission"
    };

    const updatedProfile: ClientProfile = {
      ...activeProfile,
      consultations: [newConsultation, ...activeProfile.consultations]
    };

    // Update state & save in custom list
    const updatedCustoms = customProfiles.filter(p => p.phone !== activeProfile.phone);
    updatedCustoms.push(updatedProfile);
    setCustomProfiles(updatedCustoms);
    localStorage.setItem("sm_custom_clients", JSON.stringify(updatedCustoms));

    setActiveProfile(updatedProfile);
    setClientNoteInput("");
    setShowNoteForm(false);
    setSuccessMsg("Your consultation memo has been securely appended to your case file timeline!");
  };

  const downloadTextDoc = (doc: ClientDocument) => {
    const blob = new Blob([doc.content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = doc.name;
    link.click();
    URL.revokeObjectURL(url);
  };

  const printDocument = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow || !selectedDoc) return;
    printWindow.document.write(`
      <html>
        <head>
          <title>PRINT - ${selectedDoc.name}</title>
          <style>
            body { font-family: 'Courier New', monospace; padding: 40px; line-height: 1.5; color: #1e293b; }
            .header { border-bottom: 2px dashed #94a3b8; padding-bottom: 20px; margin-bottom: 300px; text-align: center; }
            .content { white-space: pre-wrap; font-size: 14px; margin-top: 20px; }
            .footer { border-top: 1px solid #e2e8f0; margin-top: 40px; padding-top: 20px; text-align: center; font-size: 11px; color: #64748b; }
          </style>
        </head>
        <body>
          <div class="header">
            <h2>SUPRABHAT MISHRA & ASSOCIATES LEGAL SOLUTIONS</h2>
            <p>CHAMBER NO. 7, NEW ADHIVAKTA COMP., COLLECTORATE COURT, KANPUR</p>
            <p>Printed via Secure Client Portal Console</p>
          </div>
          <div class="content">${selectedDoc.content}</div>
          <div class="footer">
            <p>All legal drafts, notices, and pleadings are private attorney-client privileged matters under Indian legal frameworks.</p>
          </div>
          <script>window.print();</script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div id="returning-client-portal" class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-h-[580px]">
      
      {/* 1. Header Banner & Quick Demo Shortcuts */}
      <div class="bg-gradient-to-r from-navy-900 to-navy-950 p-6 sm:p-8 text-white relative">
        <div class="absolute top-0 right-0 w-64 h-64 bg-gold-500 rounded-full blur-[80px] opacity-[0.07] pointer-events-none"></div>
        <div class="max-w-4xl space-y-4">
          <div class="flex items-center gap-2 text-gold-400 font-serif font-semibold text-xs tracking-widest uppercase">
            <Shield className="w-4 h-4 text-gold-500" />
            Attorney-Client Privileged Panel
          </div>
          <h3 class="text-2xl sm:text-3xl font-serif font-bold text-white tracking-wide">
            Returning Client Workspace & Case Dossier Hub
          </h3>
          <p class="text-xs sm:text-sm text-gray-300 max-w-2xl leading-relaxed">
            Enter your cell phone number linked with Advocate Suprabhat Mishra's case registrations to evaluate past litigation timelines, check on pleading statuses, and download notices or land registry reports.
          </p>

          {/* Quick Demo Selector Chips */}
          <div class="pt-2 text-xs text-gray-400 space-y-1.5">
            <p class="font-semibold text-gray-300">Quick Test Chamber Profiles (Returning Clients):</p>
            <div class="flex flex-wrap gap-2.5">
              {PRESET_PROFILES.map((p) => (
                <button
                  key={p.phone}
                  type="button"
                  id={`demo-profile-btn-${p.phone}`}
                  onClick={() => loadDemoProfile(p.phone)}
                  class={`px-3 py-1.5 rounded-lg border text-[11px] font-sans font-semibold transition-all flex items-center gap-1.5 ${
                    activeProfile && activeProfile.phone === p.phone
                      ? "bg-gold-500 text-navy-950 border-gold-400 shadow-sm"
                      : "bg-navy-900/40 text-gray-200 border-white/10 hover:bg-gold-500/10 hover:text-gold-400"
                  }`}
                >
                  <User className="w-3 h-3" />
                  {p.clientName} ({p.phone})
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Client Profile Query Form */}
      <div class="p-6 border-b border-gray-100 bg-gray-50/50">
        <form onSubmit={handleSearch} class="max-w-lg">
          <label class="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
            Look up Client Case History (10-Digit Cellphone Number)
          </label>
          <div class="flex flex-col sm:flex-row gap-3">
            <div class="relative flex-1">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Phone className="w-4 h-4" />
              </div>
              <input
                id="search-phone-input"
                type="text"
                maxLength={12}
                placeholder="e.g. 9876543210 (Rajesh Kumar)"
                class="block w-full pl-9 pr-4 py-3 rounded-xl border border-gray-300 bg-white focus:border-gold-500 focus:ring-1 focus:ring-gold-500 text-sm font-medium tracking-wide transition-colors"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <button
              id="lookup-records-btn"
              type="submit"
              class="px-6 py-3 bg-navy-900 border border-gold-500/15 text-gold-500 hover:text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 hover:bg-navy-950 cursor-pointer shadow-sm"
            >
              <Search className="w-4 h-4" />
              Search Records
            </button>
          </div>
          {searchError && (
            <p className="text-xs text-red-600 mt-2 font-medium flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {searchError}
            </p>
          )}
        </form>
      </div>

      {/* 3. Live Client Workspace Interface */}
      {activeProfile ? (
        <div class="p-6 sm:p-8 space-y-8 animate-fade-in">
          
          {/* A: Profile Snapshot Summary Card */}
          <div class="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 bg-navy-900 text-gold-500 rounded-full flex items-center justify-center border border-gold-500/20 shadow-inner">
                <User className="w-6 h-6" />
              </div>
              <div>
                <div class="flex items-center gap-2 flex-wrap">
                  <h4 class="font-serif font-bold text-lg text-navy-900 leading-tight">
                    {activeProfile.clientName}
                  </h4>
                  <span class="px-2.5 py-0.5 bg-gold-150 border border-gold-250 text-gold-800 rounded font-mono text-[10px] uppercase font-bold">
                    {activeProfile.fileNumber}
                  </span>
                </div>
                <p class="text-xs text-gray-500 font-medium font-sans mt-0.5 mt-1">
                  Contact Phone: <strong class="text-gray-900 font-semibold">{activeProfile.phone}</strong> | Email: <strong class="text-gray-900 font-semibold">{activeProfile.email}</strong>
                </p>
                <p class="text-xs text-gray-500 font-mono mt-0.5">
                  Matter: {activeProfile.matterType} | Verified Client Account
                </p>
              </div>
            </div>

            {/* Progress of Suit status */}
            <div class="w-full md:w-64 space-y-1.5">
              <div class="flex justify-between items-center text-xs">
                <span class="font-bold uppercase tracking-wider text-gray-500">Pleading Lifecycle Progress</span>
                <span class="font-mono font-bold text-navy-900">{activeProfile.progressPercent}%</span>
              </div>
              <div class="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-gold-500 h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${activeProfile.progressPercent}%` }}
                ></div>
              </div>
              <p class="text-[11px] font-medium text-emerald-600 flex items-center gap-1 mt-1">
                <CheckCircle className="w-3.5 h-3.5" />
                Current Phase: <strong class="uppercase font-semibold">{activeProfile.caseStatus}</strong>
              </p>
            </div>
          </div>

          {/* B: Status Process Flow Tracker */}
          <div class="bg-gray-50 rounded-2xl p-5 border border-gray-150">
            <p class="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4 font-mono text-center sm:text-left">
              Suit Progression Timeline Visualizer
            </p>
            <div class="grid grid-cols-2 md:grid-cols-5 gap-3.5">
              {[
                { label: "Case Initiated", desc: "Brief filed & Case file number assigned" },
                { label: "Documentation Review", desc: "Sales deeds, records & bails crosschecked" },
                { label: "Advocate Pleading Filed", desc: "Plaints registered in Kanpur District Court" },
                { label: "Court Decision Status", desc: "Hearings scheduling & replication pleadings" },
                { label: "Closed", desc: "Dispute permanently resolved or settled" }
              ].map((step, index) => {
                const stepOrder = ["Case Initiated", "Documentation Review", "Advocate Pleading Filed", "Court Decision Status", "Closed"];
                const activeIndex = stepOrder.indexOf(activeProfile.caseStatus);
                const isCompleted = index < activeIndex;
                const isCurrent = index === activeIndex;

                return (
                  <div
                    key={step.label}
                    class={`p-3 rounded-lg border transition-all ${
                      isCompleted
                        ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                        : isCurrent
                        ? "bg-navy-900 text-white border-gold-500 shadow-md ring-1 ring-gold-500"
                        : "bg-white text-gray-400 border-gray-200"
                    }`}
                  >
                    <div class="flex items-center gap-1.5 mb-1">
                      {isCompleted ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      ) : isCurrent ? (
                        <Clock className="w-3.5 h-3.5 text-gold-400 animate-spin flex-shrink-0" />
                      ) : (
                        <span class="w-2 h-2 rounded-full bg-gray-300 flex-shrink-0" />
                      )}
                      <p class="text-[11px] font-bold uppercase tracking-wider truncate leading-tight">
                        {step.label}
                      </p>
                    </div>
                    <p class={`text-[10px] leading-tight ${isCurrent ? "text-gray-200" : "text-gray-500"}`}>
                      {step.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Success Appended Notification */}
          {successMsg && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs sm:text-sm font-medium flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                {successMsg}
              </span>
              <button onClick={() => setSuccessMsg("")} className="text-emerald-800 hover:text-emerald-950 font-bold p-1">
                ✕
              </button>
            </div>
          )}

          {/* C: Documents and Consultation Split Columns */}
          <div class="grid lg:grid-cols-12 gap-8">
            
            {/* Split 1: Privilege Document Hub */}
            <div class="lg:col-span-5 space-y-5">
              <div class="flex items-center justify-between border-b border-gray-100 pb-3">
                <h5 class="text-base font-serif font-bold text-navy-900 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-gold-600" />
                  Privileged Document Vault
                </h5>
                <span class="text-[10px] font-mono text-gray-400 uppercase">
                  {activeProfile.documents.length} Files
                </span>
              </div>

              <div class="space-y-4">
                {activeProfile.documents.map((doc) => (
                  <div
                    key={doc.id}
                    class="bg-white rounded-xl border border-gray-250 p-4 hover:border-gold-500 transition-all shadow-sm space-y-3"
                  >
                    <div class="flex items-start justify-between gap-2">
                      <div class="flex items-center gap-2.5">
                        <div class="p-2 bg-navy-50 text-navy-900 rounded-lg">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <p class="font-sans font-bold text-xs text-navy-900 tracking-wide line-clamp-1 truncate text-left">
                            {doc.name}
                          </p>
                          <div class="flex items-center gap-2 mt-0.5 text-[10px] text-gray-500">
                            <span class="px-1.5 py-0.2 bg-gray-100 font-mono rounded">
                              {doc.type}
                            </span>
                            <span>•</span>
                            <span>{doc.fileSize}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="flex items-center gap-2 pt-2 border-t border-gray-100 text-[11px] font-bold text-navy-900">
                      <button
                        id={`view-doc-btn-${doc.id}`}
                        onClick={() => setSelectedDoc(doc)}
                        class="flex-1 py-2 px-3 bg-gray-100 rounded-lg hover:bg-gold-500 hover:text-navy-900 transition-all text-center uppercase tracking-wider text-[10px] cursor-pointer"
                      >
                        Preview Draft File
                      </button>
                      <button
                        id={`download-doc-btn-${doc.id}`}
                        onClick={() => downloadTextDoc(doc)}
                        class="p-2 bg-gray-50 rounded-lg hover:bg-navy-900 hover:text-gold-500 text-gray-500 border border-gray-200 transition-all cursor-pointer"
                        title="Download Plain Text Document"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}

                {activeProfile.documents.length === 0 && (
                  <div class="p-8 text-center text-gray-400 bg-gray-50/50 rounded-xl space-y-2 border border-dashed border-gray-200">
                    <FileText className="w-8 h-8 text-gray-300 mx-auto" />
                    <p class="text-xs font-semibold">No digital drafts prepared yet</p>
                    <p class="text-[10px]">Your pleadings files appear after initial physical checks at Chamber 7.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Split 2: Timeline of Past Consultations & Case Log */}
            <div class="lg:col-span-7 space-y-5">
              <div class="flex items-center justify-between border-b border-gray-100 pb-3">
                <h5 class="text-base font-serif font-bold text-navy-900 flex items-center gap-2">
                  <History className="w-5 h-5 text-gold-600" />
                  Chamber Activity & Consultation Timelines
                </h5>
                <button
                  id="toggle-add-note-btn"
                  onClick={() => setShowNoteForm(!showNoteForm)}
                  class="text-[11px] font-bold bg-navy-900 text-gold-400 border border-gold-400 px-3 py-1.5 rounded-lg hover:bg-navy-950 transition-colors flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Self Submission Note
                </button>
              </div>

              {/* Submission Form */}
              {showNoteForm && (
                <form onSubmit={handleAddClientConsultNote} class="bg-gray-50 rounded-xl p-4 border border-gold-500/20 space-y-3.5 animate-slide-up">
                  <div>
                    <label class="block text-xs font-semibold text-gray-650 uppercase tracking-wide mb-1 leading-tight">
                      Add Case Updates or Information Notes to Chamber
                    </label>
                    <span class="text-[10px] text-gray-400 leading-tight block mb-2">
                      Submit any physical stay updates, witness telephone info, family settlement changes, or urgent queries.
                    </span>
                    <textarea
                      required
                      placeholder="Enter specific facts or queries. Advocate Suprabhat Mishra will evaluate this on your next physical court date check-in."
                      class="block w-full p-3 rounded-lg border border-gray-300 bg-white focus:border-gold-500 focus:ring-1 focus:ring-gold-500 text-xs font-medium"
                      rows={3}
                      value={clientNoteInput}
                      onChange={(e) => setClientNoteInput(e.target.value)}
                    />
                  </div>
                  <div class="flex items-center gap-2 justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        setShowNoteForm(false);
                        setClientNoteInput("");
                      }}
                      class="px-2.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-gray-500 hover:text-gray-900"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      class="bg-navy-900 text-gold-500 border border-gold-400 px-4 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-navy-950 flex items-center gap-1 shadow"
                    >
                      <Send className="w-3.5 h-3.5" />
                      Add to Timeline
                    </button>
                  </div>
                </form>
              )}

              {/* Consultation Timeline Cards */}
              <div class="space-y-4">
                {activeProfile.consultations.map((c) => (
                  <div
                    key={c.id}
                    class="bg-gray-50/50 rounded-xl border border-gray-150 p-4 sm:p-5 relative text-left space-y-3 hover:bg-white transition-all duration-200"
                  >
                    <div class="flex justify-between items-start gap-4 flex-wrap pb-2 border-b border-gray-100">
                      <div>
                        <span class="inline-block px-2 py-0.5 bg-navy-90% bg-navy-900 text-gold-500 font-mono text-[9px] uppercase tracking-widest font-bold rounded mb-1.5">
                          Verified consultation Log
                        </span>
                        <h6 class="font-serif font-black text-navy-900 text-xs sm:text-sm">
                          {c.summary}
                        </h6>
                      </div>
                      <span class="text-[10px] font-mono font-bold text-gray-400 bg-white border border-gray-200 px-2.5 py-0.5 rounded">
                        {c.date}
                      </span>
                    </div>

                    <div class="space-y-2 text-xs text-gray-700">
                      <p class="leading-relaxed">
                        <strong class="text-navy-950 font-semibold">Chamber Litigation Strategy & Directives:</strong>
                        <br />
                        <span class="text-gray-600 block mt-1 italic font-serif">
                          "{c.lawyerNotes}"
                        </span>
                      </p>
                      
                      <p class="text-[10px] text-gray-400 flex items-center gap-1.5 font-mono">
                        <MapPin className="w-3.5 h-3.5 text-gold-500" />
                        Location: {c.courtLocation}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          <div class="pt-4 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
            <span class="flex items-center gap-1 font-medium text-gold-600">
              <Shield className="w-3.5 h-3.5" />
              Chamber PRIVACY Protected
            </span>
            <span>Last accessed: {new Date().toLocaleDateString()}</span>
          </div>

        </div>
      ) : (
        /* Empty Case view */
        <div class="py-16 text-center space-y-6 max-w-lg mx-auto px-4">
          <div class="relative w-16 h-16 bg-navy-100 text-navy-900 rounded-full flex items-center justify-center mx-auto border border-gold-500/10">
            <History className="w-8 h-8 text-gold-600 animate-pulse" />
          </div>
          <div class="space-y-2">
            <h4 class="font-serif font-bold text-lg text-navy-900">Awaiting Search Query Credentials</h4>
            <p class="text-xs text-gray-500 leading-relaxed">
              No profile is currently loaded. Enter your linked cell phone number above or click on one of the quick test presets to inspect historical pleadings schedules, mutation forms, and draft separations.
            </p>
          </div>
          <div class="text-[10px] text-gray-400 bg-gray-50 p-3 rounded-lg border border-dashed border-gray-200">
            💡 <strong>Advocate's Tip:</strong> Use cell phone <strong>9876543210</strong> to instantly inspect Rajesh Kumar's civil partition suit documents and municipal representation appeal forms!
          </div>
        </div>
      )}

      {/* 4. Overlay Modal Document Viewer */}
      {selectedDoc && (
        <div class="fixed inset-0 z-50 overflow-y-auto bg-navy-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div class="bg-white rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl border border-gold-500/20 max-h-[85vh] flex flex-col">
            
            {/* Header */}
            <div class="bg-navy-900 p-5 text-white flex justify-between items-center border-b border-gold-500/15">
              <div class="flex items-center gap-2">
                <FileText className="w-5 h-5 text-gold-500" />
                <div>
                  <h4 class="font-serif font-bold text-sm sm:text-base">{selectedDoc.name}</h4>
                  <p class="text-[10px] text-gray-300 uppercase tracking-widest">{selectedDoc.type} • size: {selectedDoc.fileSize}</p>
                </div>
              </div>
              <button
                id="close-preview-modal"
                onClick={() => setSelectedDoc(null)}
                class="text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Document Draft Content */}
            <div class="p-6 overflow-y-auto bg-gray-50 font-mono text-xs text-gray-800 leading-relaxed whitespace-pre-wrap select-text text-left max-h-[50vh] border-b border-gray-150">
              {selectedDoc.content}
            </div>

            {/* Panel Actions Footer inside modal */}
            <div class="p-4 bg-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span class="text-[10px] text-gray-400 font-mono font-bold uppercase tracking-wider">
                📄 attorney-client privilege strictly protected
              </span>
              <div class="flex items-center gap-2.5 w-full sm:w-auto">
                <button
                  id="print-modal-doc-btn"
                  onClick={printDocument}
                  class="flex-1 sm:flex-none px-4 py-2 bg-navy-900 border border-gold-500/20 text-gold-500 hover:text-white font-bold text-[11px] uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  Print Draft
                </button>
                <button
                  id="download-modal-doc-btn"
                  onClick={() => downloadTextDoc(selectedDoc)}
                  class="flex-1 sm:flex-none px-4 py-2 bg-gold-500 text-navy-950 font-bold text-[11px] uppercase tracking-wider rounded-lg hover:bg-gold-400 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
