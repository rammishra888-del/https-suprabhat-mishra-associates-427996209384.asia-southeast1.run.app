import React, { useState } from "react";
import { AppointmentInput, ScheduledCaseFile } from "../types";
import { Calendar, Clock, FileCheck, Printer, Download, User, Phone, Mail, BookOpen, AlertCircle, FileText, ClipboardList } from "lucide-react";

export default function AppointmentForm() {
  const [input, setInput] = useState<AppointmentInput>({
    clientName: "",
    phone: "",
    email: "",
    matterType: "Civil Litigation",
    description: "",
    preferredDate: new Date().toISOString().substring(0, 10),
    preferredSlot: "11:30 AM - 01:30 PM (Collectorate Court Chamber)"
  });

  const [caseFile, setCaseFile] = useState<ScheduledCaseFile | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.clientName || !input.phone) {
      alert("Please provide at least your Name and Phone Number.");
      return;
    }

    // Determine estimated Kanpur court jurisdiction
    let jurisdiction = "District & Sessions Court, Kanpur Nagar (Civil Lines Area)";
    if (input.matterType === "Family & Matrimonial Law") {
      jurisdiction = "Principal Family Court, New Court Building Campus, Kanpur Nagar";
    } else if (input.matterType === "Property & Real Estate Law") {
      jurisdiction = "Sub-Registrar Office, Collectorate Comp., Kanpur Nagar";
    } else if (input.matterType === "Civil Litigation") {
      jurisdiction = "Civil Judge Senior Division, Collectorate Court, Kanpur";
    } else if (input.matterType === "Corporate & Business Compliance") {
      jurisdiction = "Commercial Disputes Court, Kanpur Nagar Jurisdiction";
    }

    // Generate random file number
    const year = new Date().getFullYear();
    const randNum = Math.floor(100 + Math.random() * 900);
    const alphabet = ["A", "B", "C", "D", "SM"][Math.floor(Math.random() * 5)];
    const fileNumber = `SM/${year}/${alphabet}-${randNum}`;

    const newCase: ScheduledCaseFile = {
      fileNumber,
      clientName: input.clientName,
      phone: input.phone,
      email: input.email || "N/A",
      matterType: input.matterType,
      description: input.description || "General litigation consultation.",
      preferredDate: input.preferredDate,
      preferredSlot: input.preferredSlot,
      estimatedJurisdiction: jurisdiction,
      dateCreated: new Date().toLocaleString(),
      status: "Confirmed"
    };

    // Save newly created case to localStorage
    try {
      const existingStr = localStorage.getItem("sm_scheduled_dossiers");
      const existing = existingStr ? JSON.parse(existingStr) : [];
      // Prevent duplicates by checking phone
      const filtered = existing.filter((f: any) => f.phone !== input.phone);
      filtered.push(newCase);
      localStorage.setItem("sm_scheduled_dossiers", JSON.stringify(filtered));
    } catch (e) {
      console.error("Failed to persist scheduled dossier", e);
    }

    setCaseFile(newCase);
    setSuccess(true);
  };

  const resetForm = () => {
    setInput({
      clientName: "",
      phone: "",
      email: "",
      matterType: "Civil Litigation",
      description: "",
      preferredDate: new Date().toISOString().substring(0, 10),
      preferredSlot: "11:30 AM - 01:30 PM (Collectorate Court Chamber)"
    });
    setCaseFile(null);
    setSuccess(false);
  };

  const printCaseFile = () => {
    window.print();
  };

  const downloadCaseFileText = () => {
    if (!caseFile) return;
    const content = `===========================================
SUPRABHAT MISHRA & ASSOCIATES LEGAL SOLUTIONS
Chamber No. 7, 2nd Floor, New Adhivakta Bldg, Collectorate Court, Kanpur
Contact: +91 9450365729 | Email: ram.mishra888@gmail.com
===========================================
CONFIRMED CLIENT INTAKE CASE DOSSIER

File Number:       ${caseFile.fileNumber}
Intake Date:       ${caseFile.dateCreated}
Status:            ${caseFile.status}
Client Name:       ${caseFile.clientName}
Contact Phone:     ${caseFile.phone}
Contact Email:     ${caseFile.email}
Matter Category:   ${caseFile.matterType}
Description:       ${caseFile.description}

SCHEDULED APPOINTMENT SPECIFICS
Consultation Date: ${caseFile.preferredDate}
Preferred Slot:    ${caseFile.preferredSlot}
Est. Jurisdiction: ${caseFile.estimatedJurisdiction}

Note: Please carry all relevant land registries, summons copy, or
police memos during the physical chamber meet.
===========================================`;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Chamber_File_${caseFile.fileNumber.replace(/\//g, "_")}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const timeSlots = [
    "10:30 AM - 11:30 AM (Early Ch. Consultations)",
    "11:30 AM - 01:30 PM (Collectorate Court Chamber)",
    "02:30 PM - 04:30 PM (Court Work & Client Meets)",
    "04:30 PM - 06:00 PM (Late-evening chamber review)"
  ];

  return (
    <div id="appointment-booking" class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {!success ? (
        <div class="grid lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-gray-100">
          {/* Form Side */}
          <div class="lg:col-span-7 p-6 sm:p-8">
            <div class="mb-6">
              <h3 class="text-xl font-serif font-bold text-navy-900 tracking-wide">Initiate Case Registration</h3>
              <p class="text-xs text-gray-500 mt-1">
                Enter your dispute outline below to auto-prepare an intake case folder for Advocate Suprabhat Mishra.
              </p>
            </div>

            <form onSubmit={handleSubmit} class="space-y-5">
              <div class="grid sm:grid-cols-2 gap-5">
                <div class="space-y-1.5">
                  <label class="block text-xs font-semibold text-gray-600 uppercase tracking-wider">Client Name *</label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      id="client-name"
                      type="text"
                      required
                      placeholder="e.g. Ramesh Chandra"
                      class="block w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-300 bg-gray-50 focus:bg-white focus:border-gold-500 focus:ring-1 focus:ring-gold-500 text-sm font-medium transition-colors"
                      value={input.clientName}
                      onChange={(e) => setInput({ ...input, clientName: e.target.value })}
                    />
                  </div>
                </div>

                <div class="space-y-1.5">
                  <label class="block text-xs font-semibold text-gray-600 uppercase tracking-wider">Phone Number *</label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      id="client-phone"
                      type="tel"
                      required
                      placeholder="e.g. 9450365729"
                      class="block w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-300 bg-gray-50 focus:bg-white focus:border-gold-500 focus:ring-1 focus:ring-gold-500 text-sm font-medium transition-colors"
                      value={input.phone}
                      onChange={(e) => setInput({ ...input, phone: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div class="grid sm:grid-cols-2 gap-5">
                <div class="space-y-1.5">
                  <label class="block text-xs font-semibold text-gray-600 uppercase tracking-wider">Email Address</label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      id="client-email"
                      type="email"
                      placeholder="name@example.com"
                      class="block w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-300 bg-gray-50 focus:bg-white focus:border-gold-500 focus:ring-1 focus:ring-gold-500 text-sm font-medium transition-colors"
                      value={input.email}
                      onChange={(e) => setInput({ ...input, email: e.target.value })}
                    />
                  </div>
                </div>

                <div class="space-y-1.5">
                  <label class="block text-xs font-semibold text-gray-600 uppercase tracking-wider">Matter Category</label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <select
                      id="client-matter-type"
                      class="block w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-300 bg-gray-50 focus:bg-white focus:border-gold-500 focus:ring-1 focus:ring-gold-500 text-sm font-medium transition-colors"
                      value={input.matterType}
                      onChange={(e) => setInput({ ...input, matterType: e.target.value })}
                    >
                      <option>Civil Litigation</option>
                      <option>Criminal Defense</option>
                      <option>Family & Matrimonial Law</option>
                      <option>Property & Real Estate Law</option>
                      <option>Corporate & Business Compliance</option>
                      <option>Drafting & Legal Documentation</option>
                    </select>
                  </div>
                </div>
              </div>

              <div class="grid sm:grid-cols-2 gap-5">
                <div class="space-y-1.5">
                  <label class="block text-xs font-semibold text-gray-600 uppercase tracking-wider">Preferred Date</label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <input
                      id="preferred-date"
                      type="date"
                      class="block w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-300 bg-gray-50 focus:bg-white focus:border-gold-500 focus:ring-1 focus:ring-gold-500 text-sm font-medium transition-colors"
                      value={input.preferredDate}
                      onChange={(e) => setInput({ ...input, preferredDate: e.target.value })}
                    />
                  </div>
                </div>

                <div class="space-y-1.5">
                  <label class="block text-xs font-semibold text-gray-600 uppercase tracking-wider">Chamber Meeting Slot</label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <Clock className="w-4 h-4" />
                    </div>
                    <select
                      id="preferred-slot"
                      class="block w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-300 bg-gray-50 focus:bg-white focus:border-gold-500 focus:ring-1 focus:ring-gold-500 text-sm font-medium transition-colors"
                      value={input.preferredSlot}
                      onChange={(e) => setInput({ ...input, preferredSlot: e.target.value })}
                    >
                      {timeSlots.map((slot) => (
                        <option key={slot}>{slot}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div class="space-y-1.5">
                <label class="block text-xs font-semibold text-gray-600 uppercase tracking-wider">Brief Summary of Legal Issue</label>
                <textarea
                  id="client-description"
                  rows={4}
                  placeholder="Summarize the land dispute, registry details, notice reply requirement, or pending summons..."
                  class="block w-full p-3.5 rounded-lg border border-gray-300 bg-gray-50 focus:bg-white focus:border-gold-500 focus:ring-1 focus:ring-gold-500 text-sm font-medium transition-colors"
                  value={input.description}
                  onChange={(e) => setInput({ ...input, description: e.target.value })}
                />
              </div>

              <button
                id="submit-appointment-btn"
                type="submit"
                class="w-full py-4 bg-navy-900 border border-gold-500/20 text-gold-500 font-bold uppercase tracking-wider rounded-lg hover:bg-navy-950 transition-colors shadow-md flex items-center justify-center gap-2"
              >
                <ClipboardList className="w-5 h-5" />
                Prepare Intaked Case Folder
              </button>
            </form>
          </div>

          {/* Quick Info / Guidelines */}
          <div class="lg:col-span-5 p-6 sm:p-8 bg-gray-50/50 flex flex-col justify-between">
            <div class="space-y-6">
              <div>
                <h4 class="text-sm font-serif font-bold text-navy-900">Important Client Guidelines</h4>
                <p class="text-xs text-gray-500 mt-1">Please read before filing your virtual case file</p>
              </div>

              <div class="space-y-4 text-xs leading-relaxed text-gray-600">
                <div class="flex items-start gap-2.5">
                  <div class="w-5 h-5 bg-gold-500/10 text-gold-600 rounded flex items-center justify-center font-mono font-bold flex-shrink-0">1</div>
                  <p>
                    <strong>Physical Chamber Meets:</strong> Standard consultations are held in person at <strong class="text-navy-900">Chamber No. 7, 2nd Floor, New Adhivakta Building, Collectorate Court Compound, Kanpur</strong>.
                  </p>
                </div>

                <div class="flex items-start gap-2.5">
                  <div class="w-5 h-5 bg-gold-500/10 text-gold-600 rounded flex items-center justify-center font-mono font-bold flex-shrink-0">2</div>
                  <p>
                    <strong>Document Checklist:</strong> Carry all original registry sales deeds, pending court summons, police FIR copies, previous mutations transcripts, or lease drafts.
                  </p>
                </div>

                <div class="flex items-start gap-2.5">
                  <div class="w-5 h-5 bg-gold-500/10 text-gold-600 rounded flex items-center justify-center font-mono font-bold flex-shrink-0">3</div>
                  <p>
                    <strong>Confidentiality:</strong> Under Section 126 of the Indian Evidence Act, all client communication and detailed case disclosures are protected under absolute advocate-client privilege.
                  </p>
                </div>
              </div>

              <div class="p-4 bg-white rounded-xl border border-gold-400 text-xs text-gray-800 space-y-1.5">
                <p class="font-bold text-gold-600 uppercase tracking-wide flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  Urgent Emergency Pleading?
                </p>
                <p>
                  In cases of urgent police arrest cautions, pending stay orders eviction threats, or bail needs, contact Chamber No.7 immediately:
                </p>
                <a href="tel:9450365729" class="text-navy-900 font-bold block hover:underline text-sm mt-1">
                  📞 Call Hotline: 9450365729
                </a>
              </div>
            </div>

            <div class="pt-6 border-t border-gray-100 text-center font-serif italic text-xs text-gray-500 mt-6 lg:mt-0">
              "Affiliated Practising Solicitor Kanpur District Bar Association"
            </div>
          </div>
        </div>
      ) : (
        /* Confirmation Case Dossier */
        <div class="p-6 sm:p-10 bg-slate-900 text-white space-y-8">
          <div class="text-center space-y-2">
            <div class="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto delicate-pulse border border-emerald-500/50">
              <FileCheck className="w-6 h-6" />
            </div>
            <h3 class="text-2xl font-serif font-bold tracking-wide">Client Intake Dossier Prepared</h3>
            <p class="text-xs text-gray-400 max-w-md mx-auto">
              Your legal case file has been structured. Present this file number or printout during your Visit to Chamber No. 7.
            </p>
          </div>

          <div id="print-case-area" class="bg-white text-gray-900 rounded-xl p-6 sm:p-8 border border-gray-200 font-sans shadow-lg max-w-3xl mx-auto">
            {/* Header */}
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-2 border-dashed border-gray-300 pb-5 gap-4">
              <div>
                <h4 class="font-serif font-bold text-navy-900 text-xl tracking-tight">Suprabhat Mishra & Associates</h4>
                <p class="text-[11px] text-gray-500 uppercase tracking-wider font-semibold">Chamber No. 7, 2nd Floor, New Adhivakta Bldg, Kanpur</p>
                <p class="text-[10px] text-gray-500">Collectorate Court Complex, Kanpur Nagar | Tel: 9450365729</p>
              </div>
              <div class="text-left sm:text-right">
                <span class="inline-block px-3 py-1 bg-navy-900 text-gold-400 font-mono text-xs font-bold rounded">
                  {caseFile?.fileNumber}
                </span>
                <p class="text-[10px] text-gray-400 mt-1 uppercase tracking-wider font-semibold">Intake Case Dossier</p>
              </div>
            </div>

            {/* Case Details */}
            {caseFile && (
              <div class="py-6 grid sm:grid-cols-2 gap-6 text-sm">
                <div class="space-y-4">
                  <div>
                    <h5 class="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Client Identity</h5>
                    <p class="font-bold text-gray-900 mt-0.5 text-base">{caseFile.clientName}</p>
                    <p class="text-xs text-gray-500 font-medium">Cell: {caseFile.phone} | Email: {caseFile.email}</p>
                  </div>

                  <div>
                    <h5 class="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Legal Category</h5>
                    <p class="font-bold text-navy-900 mt-0.5">{caseFile.matterType}</p>
                  </div>

                  <div>
                    <h5 class="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Est. Pleading Court</h5>
                    <p class="text-xs text-gray-800 font-medium mt-0.5">{caseFile.estimatedJurisdiction}</p>
                  </div>
                </div>

                <div class="space-y-4">
                  <div>
                    <h5 class="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Intake Date / Time</h5>
                    <p class="text-xs text-gray-800 font-semibold mt-0.5">{caseFile.dateCreated}</p>
                  </div>

                  <div>
                    <h5 class="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Chamber Meet Appointment</h5>
                    <p class="text-xs text-gray-800 font-bold mt-0.5">{caseFile.preferredDate}</p>
                    <p class="text-xs text-gold-600 font-bold">{caseFile.preferredSlot}</p>
                  </div>

                  <div>
                    <h5 class="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Case Status</h5>
                    <span class="inline-flex items-center gap-1 mt-1 text-xs font-semibold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full">
                      <FileText className="w-3.5 h-3.5" />
                      {caseFile.status}
                    </span>
                  </div>
                </div>

                <div class="sm:col-span-2 pt-4 border-t border-gray-100">
                  <h5 class="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Dispute Summary Outline</h5>
                  <p class="text-xs text-gray-700 leading-relaxed font-serif italic mt-1.5 p-3 bg-gray-50 rounded border border-gray-200">
                    "{caseFile.description}"
                  </p>
                </div>
              </div>
            )}

            {/* Footnote */}
            <div class="border-t-2 border-dashed border-gray-200 pt-5 text-[10px] text-gray-400 flex flex-col sm:flex-row justify-between items-center gap-3">
              <span class="font-serif italic">"Where Justice Begins With Trust"</span>
              <span class="font-mono text-center sm:text-right">Issued via Digital Law Portal @ Chamber No.7, Kanpur</span>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              id="print-intake-btn"
              onClick={printCaseFile}
              class="w-full sm:w-auto px-6 py-3 bg-gold-500 text-navy-900 font-bold rounded-lg hover:bg-gold-400 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              Print Intake Dossier
            </button>
            <button
              id="download-intake-btn"
              onClick={downloadCaseFileText}
              class="w-full sm:w-auto px-6 py-3 bg-navy-800 border border-gold-500/20 text-gold-400 font-bold rounded-lg hover:bg-navy-700 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Download Case File (.txt)
            </button>
            <button
              id="new-intake-btn"
              onClick={resetForm}
              class="w-full sm:w-auto px-6 py-3 bg-transparent text-gray-400 hover:text-white font-medium rounded-lg text-sm transition-colors text-center"
            >
              Create New intake
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
