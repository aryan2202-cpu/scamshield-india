import React from "react";
import { ShieldAlert, ShieldCheck, Globe, History, Settings, PhoneCall } from "lucide-react";
import { translations } from "../i18n/translations";

export default function Header({ 
  lang, 
  setLang, 
  onOpenHistory, 
  historyCount, 
  onOpenSettings, 
  onOpenEmergency,
  currentTab,
  setCurrentTab 
}) {
  const t = translations[lang] || translations.en;

  return (
    <header className="sticky top-0 z-40 bg-[#0a1c3d] text-white border-b border-blue-900 shadow-md">
      {/* Top Banner with Tricolor strip */}
      <div className="h-1.5 w-full flex">
        <div className="h-full w-1/3 bg-[#FF9933]"></div>
        <div className="h-full w-1/3 bg-white"></div>
        <div className="h-full w-1/3 bg-[#138808]"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand */}
        <button 
          onClick={() => setCurrentTab("check")}
          className="flex items-center gap-2.5 text-left focus:outline-none group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-700 flex items-center justify-center shadow-inner border border-blue-400/30">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-lg md:text-xl tracking-tight text-white group-hover:text-blue-200 transition-colors">
                ScamShield
              </span>
              <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-blue-800/80 text-blue-200 border border-blue-700">
                INDIA
              </span>
            </div>
            <p className="text-xs text-blue-200/80 font-medium hidden sm:block">
              {t.tagline}
            </p>
          </div>
        </button>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Quick 1930 Emergency button */}
          <button
            onClick={onOpenEmergency}
            className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white text-xs md:text-sm font-semibold px-2.5 py-1.5 rounded-lg shadow transition-all active:scale-95"
            title="Cyber Crime Helpline 1930"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Help</span> 1930
          </button>

          {/* Language Toggle */}
          <div className="flex items-center bg-blue-950/80 rounded-lg p-0.5 border border-blue-800">
            <button
              onClick={() => setLang("en")}
              className={`px-2 py-1 text-xs font-semibold rounded transition-all ${
                lang === "en" 
                  ? "bg-blue-600 text-white shadow-sm" 
                  : "text-blue-300 hover:text-white"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLang("hi")}
              className={`px-2 py-1 text-xs font-semibold rounded transition-all ${
                lang === "hi" 
                  ? "bg-blue-600 text-white shadow-sm" 
                  : "text-blue-300 hover:text-white"
              }`}
            >
              हिंदी
            </button>
          </div>

          {/* History Icon */}
          <button
            onClick={onOpenHistory}
            className="relative p-2 rounded-lg bg-blue-900/60 hover:bg-blue-800 text-blue-200 hover:text-white transition-all"
            title={t.btnViewHistory}
          >
            <History className="w-4 h-4" />
            {historyCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-blue-950 rounded-full text-[10px] font-bold flex items-center justify-center">
                {historyCount > 9 ? "9+" : historyCount}
              </span>
            )}
          </button>

          {/* Settings Icon */}
          <button
            onClick={onOpenSettings}
            className="p-2 rounded-lg bg-blue-900/60 hover:bg-blue-800 text-blue-200 hover:text-white transition-all"
            title="Settings & AI key"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Tab Bar for Mobile & Desktop */}
      <div className="max-w-4xl mx-auto px-4 flex border-t border-blue-900/60 text-xs md:text-sm font-medium">
        <button
          onClick={() => setCurrentTab("check")}
          className={`flex-1 py-2.5 text-center border-b-2 transition-colors ${
            currentTab === "check" 
              ? "border-blue-400 text-white font-bold" 
              : "border-transparent text-blue-300 hover:text-white"
          }`}
        >
          {t.navCheck}
        </button>
        <button
          onClick={() => setCurrentTab("library")}
          className={`flex-1 py-2.5 text-center border-b-2 transition-colors ${
            currentTab === "library" 
              ? "border-blue-400 text-white font-bold" 
              : "border-transparent text-blue-300 hover:text-white"
          }`}
        >
          {t.navLibrary}
        </button>
        <button
          onClick={() => setCurrentTab("trending")}
          className={`flex-1 py-2.5 text-center border-b-2 transition-colors ${
            currentTab === "trending" 
              ? "border-blue-400 text-white font-bold" 
              : "border-transparent text-blue-300 hover:text-white"
          }`}
        >
          {t.navReported}
        </button>
        <button
          onClick={() => setCurrentTab("emergency")}
          className={`flex-1 py-2.5 text-center border-b-2 transition-colors ${
            currentTab === "emergency" 
              ? "border-red-400 text-red-200 font-bold" 
              : "border-transparent text-red-300/80 hover:text-red-200"
          }`}
        >
          {t.navEmergency}
        </button>
      </div>
    </header>
  );
}
