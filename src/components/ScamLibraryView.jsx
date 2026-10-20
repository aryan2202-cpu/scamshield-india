import React, { useState } from "react";
import { 
  BookOpen, 
  ChevronDown, 
  ChevronUp, 
  ShieldAlert, 
  ExternalLink, 
  Search,
  CheckCircle2,
  Sparkles
} from "lucide-react";
import { scamLibraryData } from "../data/scamLibrary";
import { translations } from "../i18n/translations";

export default function ScamLibraryView({ lang, onTestExample }) {
  const t = translations[lang] || translations.en;
  const [expandedId, setExpandedId] = useState(scamLibraryData[0].id);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredScams = scamLibraryData.filter((scam) => {
    const q = searchQuery.toLowerCase();
    const title = (lang === "hi" ? scam.titleHi : scam.titleEn).toLowerCase();
    const oneLiner = (lang === "hi" ? scam.oneLinerHi : scam.oneLinerEn).toLowerCase();
    return title.includes(q) || oneLiner.includes(q) || scam.exampleMessage.toLowerCase().includes(q);
  });

  return (
    <div className="max-w-2xl mx-auto space-y-5 pb-12 animate-in fade-in duration-200">
      {/* Library Intro */}
      <div className="bg-white rounded-3xl p-5 md:p-6 border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 bg-blue-100 text-blue-700 rounded-2xl">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-extrabold text-slate-900">
              {t.libraryTitle}
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              {t.libraryDesc}
            </p>
          </div>
        </div>

        {/* Search Filter */}
        <div className="mt-4 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={lang === "hi" ? "स्कैम खोजें (उदा. KYC, बिजली, UPI, लॉटरी)..." : "Search scams (e.g. KYC, Electricity, UPI, Digital Arrest)..."}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs md:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {filteredScams.map((scam) => {
          const isExpanded = expandedId === scam.id;
          const title = lang === "hi" ? scam.titleHi : scam.titleEn;
          const oneLiner = lang === "hi" ? scam.oneLinerHi : scam.oneLinerEn;
          const spotList = lang === "hi" ? scam.spotItHi : scam.spotItEn;
          const goldenRule = lang === "hi" ? scam.goldenRuleHi : scam.goldenRuleEn;

          return (
            <div
              key={scam.id}
              className={`bg-white rounded-2xl border transition-all overflow-hidden ${
                isExpanded ? "border-blue-400 shadow-md ring-1 ring-blue-100" : "border-slate-200 shadow-sm hover:border-slate-300"
              }`}
            >
              <button
                onClick={() => setExpandedId(isExpanded ? null : scam.id)}
                className="w-full text-left p-4 md:p-5 flex items-start justify-between gap-3 focus:outline-none"
              >
                <div>
                  <h3 className="font-bold text-sm md:text-base text-slate-900 flex items-center gap-2">
                    <span>{title}</span>
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {oneLiner}
                  </p>
                </div>
                <div className="p-1 rounded-full text-slate-400 hover:text-slate-700 mt-0.5 flex-shrink-0">
                  {isExpanded ? <ChevronUp className="w-5 h-5 text-blue-600" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </button>

              {isExpanded && (
                <div className="px-4 pb-5 md:px-5 space-y-4 border-t border-slate-100 pt-3">
                  {/* Real-looking example */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                        {t.realExample}
                      </span>
                      <span className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                        Sender: {scam.exampleSender}
                      </span>
                    </div>
                    <div className="bg-slate-900 text-slate-100 p-3.5 rounded-xl text-xs font-mono border border-slate-800 leading-relaxed break-words">
                      {scam.exampleMessage}
                    </div>
                  </div>

                  {/* How to spot it */}
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                      {t.spotIt}
                    </span>
                    <ul className="space-y-1.5">
                      {spotList.map((item, i) => (
                        <li key={i} className="text-xs text-slate-700 flex items-start gap-2 bg-amber-50/60 p-2 rounded-lg border border-amber-100">
                          <span className="text-amber-600 font-bold">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Golden Rule */}
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-blue-700 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[11px] font-bold text-blue-900 uppercase tracking-wider">
                        {t.actionTip}
                      </span>
                      <p className="text-xs text-blue-950 font-medium mt-0.5">
                        {goldenRule}
                      </p>
                    </div>
                  </div>

                  {/* Test in Scanner CTA */}
                  <div className="pt-1">
                    <button
                      onClick={() => onTestExample({ text: scam.exampleMessage, tab: "message" })}
                      className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-blue-200" />
                      <span>{t.testInScanner}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
