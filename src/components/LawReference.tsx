import React, { useState } from "react";
import { FAMOUS_SECTIONS } from "../legalData";
import { LawSectionItem } from "../types";
import { Search, Gavel, ShieldAlert, Archive, Star, BookOpen } from "lucide-react";

export default function LawReference() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeSection, setActiveSection] = useState<LawSectionItem | null>(FAMOUS_SECTIONS[0]);

  const categories = ["All", "Civil", "Criminal", "Family", "Property"];

  const filteredSections = FAMOUS_SECTIONS.filter((item) => {
    const matchesSearch =
      item.section.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div id="law-reference" class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="bg-gradient-to-r from-navy-900 to-navy-850 p-6 sm:p-8 text-white">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 bg-gold-500/20 text-gold-400 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h3 class="text-xl font-serif font-bold text-white tracking-wide">IPC & Indian Law Quick Reference</h3>
              <p class="text-xs text-gold-300 font-medium tracking-wider uppercase mt-1">Collectorate Court Legal Directory</p>
            </div>
          </div>

          <div class="relative max-w-xs w-full">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              id="search-law-input"
              type="text"
              placeholder="Search sections (e.g. 125, 498A)..."
              class="w-full pl-9 pr-4 py-2 bg-navy-950/40 border border-gold-500/30 rounded-lg text-sm text-white placeholder-gray-400 focus:outline-none focus:border-gold-500 font-medium transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Category Filters */}
        <div class="flex flex-wrap gap-2 mt-6">
          {categories.map((cat) => (
            <button
              id={`cat-filter-${cat.toLowerCase()}`}
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              class={`px-4 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-gold-500 text-navy-900 shadow-sm"
                  : "bg-navy-950/40 text-gray-300 hover:bg-navy-900 border border-white/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div class="grid lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-gray-100 min-h-[450px]">
        {/* Sections List */}
        <div class="lg:col-span-5 max-h-[500px] overflow-y-auto divide-y divide-gray-100">
          {filteredSections.length > 0 ? (
            filteredSections.map((item) => (
              <button
                id={`law-btn-${item.section.replace(/\s+/g, "-").toLowerCase()}`}
                key={item.section}
                onClick={() => setActiveSection(item)}
                class={`w-full text-left p-4 sm:p-5 transition-all hover:bg-gold-50/40 flex items-start justify-between gap-3 cursor-pointer ${
                  activeSection?.section === item.section ? "bg-gold-50/60 border-l-4 border-l-gold-500" : ""
                }`}
              >
                <div class="space-y-1">
                  <div class="flex items-center gap-2">
                    <span class="font-mono text-xs font-bold px-2 py-0.5 bg-navy-900 text-gold-400 rounded">
                      {item.section}
                    </span>
                    <span class="text-[10px] uppercase font-semibold text-gray-400 px-1.5 py-0.5 bg-gray-100 rounded">
                      {item.category}
                    </span>
                  </div>
                  <h4 class="font-serif font-bold text-gray-900 text-sm line-clamp-1">{item.title}</h4>
                  <p class="text-xs text-gray-500 line-clamp-2 leading-relaxed">{item.description}</p>
                </div>
                <ChevronRightIcon className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
              </button>
            ))
          ) : (
            <div class="p-8 text-center text-gray-500">
              <ShieldAlert className="w-10 h-10 mx-auto text-gray-300 mb-2 delicate-pulse" />
              <p class="text-sm font-medium">No legal matches found</p>
              <p class="text-xs text-gray-400 mt-1">Try searching for other legal phrases or keywords.</p>
            </div>
          )}
        </div>

        {/* Detailed Viewer Panel */}
        <div class="lg:col-span-7 p-6 sm:p-8 bg-gray-50/30 flex flex-col justify-between">
          {activeSection ? (
            <div class="space-y-6">
              <div class="space-y-2">
                <div class="flex flex-wrap items-center gap-2">
                  <span class="font-mono text-sm font-bold bg-navy-900 text-gold-400 px-3 py-1 rounded">
                    {activeSection.section}
                  </span>
                  <span class="text-xs font-sans font-semibold text-gray-500 tracking-wider">
                    {activeSection.act}
                  </span>
                </div>
                <h3 class="text-xl font-serif font-bold text-navy-900 leading-tight">
                  {activeSection.title}
                </h3>
              </div>

              <div class="space-y-4">
                <div class="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                  <h4 class="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1 flex items-center gap-1.5">
                    <Archive className="w-3.5 h-3.5 text-navy-900" />
                    Statutory Provision Description
                  </h4>
                  <p class="text-sm text-gray-700 leading-relaxed font-sans">{activeSection.description}</p>
                </div>

                <div class="bg-red-50/50 p-4 rounded-xl border border-red-100">
                  <h4 class="text-xs font-semibold uppercase tracking-wider text-red-600 mb-1 flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    Penal / Legal Consequences
                  </h4>
                  <p class="text-sm text-gray-800 leading-relaxed font-sans">{activeSection.penalty}</p>
                </div>

                <div class="bg-gold-50 p-4 rounded-xl border border-gold-200">
                  <h4 class="text-xs font-semibold uppercase tracking-wider text-gold-700 mb-1.5 flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 fill-gold-400 text-gold-500" />
                    Advocate's Special Guidance (चैम्बर सलाह)
                  </h4>
                  <p class="text-xs text-navy-950 font-serif italic leading-relaxed">
                    "{activeSection.keyAdvice}"
                  </p>
                </div>
              </div>

              <div class="pt-4 border-t border-gray-100 text-xs text-gray-400 text-center flex items-center justify-center gap-2">
                <Gavel className="w-4 h-4 text-gold-500" />
                <span>Reference database from Chamber No. 7, New Adhivakta Building, Kanpur Nagar</span>
              </div>
            </div>
          ) : (
            <div class="flex flex-col items-center justify-center h-full text-center py-12 text-gray-500">
              <Gavel className="w-12 h-12 text-gray-300 mb-2 delicate-pulse" />
              <p class="font-serif font-bold text-gray-700">Select Section to Inspect</p>
              <p class="text-xs text-gray-400 mt-1">Detailed statutory context will be rendered here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ChevronRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}
