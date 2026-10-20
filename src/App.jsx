import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import CheckForm from "./components/CheckForm";
import ResultCard from "./components/ResultCard";
import EmergencyFlow from "./components/EmergencyFlow";
import ScamLibraryView from "./components/ScamLibraryView";
import MostReportedView from "./components/MostReportedView";
import HistoryModal from "./components/HistoryModal";
import GeminiSettingsModal from "./components/GeminiSettingsModal";
import { analyzeWithGemini, analyzeWithRules } from "./services/analyzer";
import { translations } from "./i18n/translations";
import { ShieldCheck, PhoneCall, AlertTriangle, Sparkles, BookOpen, TrendingUp } from "lucide-react";

export default function App() {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem("scamshield_lang") || "en";
  });

  const [currentTab, setCurrentTab] = useState("check"); // 'check' | 'library' | 'trending' | 'emergency'
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentResult, setCurrentResult] = useState(null);
  const [prefilledData, setPrefilledData] = useState(null);

  const [geminiApiKey, setGeminiApiKey] = useState(() => {
    return localStorage.getItem("scamshield_gemini_key") || "";
  });

  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem("scamshield_history");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Save language changes
  useEffect(() => {
    localStorage.setItem("scamshield_lang", lang);
  }, [lang]);

  // Save history changes
  useEffect(() => {
    try {
      localStorage.setItem("scamshield_history", JSON.stringify(history));
    } catch {}
  }, [history]);

  // Handle Analysis Execution
  const handleAnalyze = async (inputText, tabType) => {
    setIsAnalyzing(true);
    setCurrentResult(null);

    // Provide a natural short pause (400ms) for forensic inspection feel
    const startTime = Date.now();

    try {
      let analysis;
      if (geminiApiKey) {
        analysis = await analyzeWithGemini(inputText, tabType, lang, geminiApiKey);
      } else {
        // Fallback to local rule engine
        analysis = analyzeWithRules(inputText, tabType, lang);
      }

      const elapsed = Date.now() - startTime;
      if (elapsed < 500) {
        await new Promise((resolve) => setTimeout(resolve, 500 - elapsed));
      }

      setCurrentResult(analysis);

      // Save to local device history
      const historyItem = {
        id: "check-" + Date.now(),
        rawInput: inputText,
        tabType,
        verdict: analysis.verdict,
        score: analysis.score,
        reasons: analysis.reasons,
        whatToDo: analysis.whatToDo,
        timestamp: new Date().toISOString()
      };

      setHistory((prev) => [historyItem, ...prev.slice(0, 24)]);
    } catch (err) {
      console.error("Analysis failed:", err);
      // Fallback to rules on any error
      const fallback = analyzeWithRules(inputText, tabType, lang);
      setCurrentResult(fallback);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSaveApiKey = (key) => {
    setGeminiApiKey(key);
    localStorage.setItem("scamshield_gemini_key", key);
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem("scamshield_history");
  };

  const handleSelectHistoryItem = (item) => {
    setCurrentTab("check");
    setCurrentResult({
      verdict: item.verdict,
      score: item.score,
      reasons: item.reasons,
      whatToDo: item.whatToDo,
      totalReports: 0,
      source: "history"
    });
    setPrefilledData({
      text: item.rawInput,
      tab: item.tabType
    });
  };

  const handleLoadSampleIntoScanner = ({ text, tab }) => {
    setCurrentTab("check");
    setCurrentResult(null);
    setPrefilledData({ text, tab });
    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const t = translations[lang] || translations.en;

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Top Header */}
      <Header
        lang={lang}
        setLang={setLang}
        onOpenHistory={() => setIsHistoryOpen(true)}
        historyCount={history.length}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenEmergency={() => setCurrentTab("emergency")}
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-xl w-full mx-auto px-4 py-4 md:py-6">
        {/* VIEW 1: Main Scanner (Check) */}
        {currentTab === "check" && (
          <div className="space-y-5 animate-in fade-in duration-150">
            {/* Quick Hero Banner if no result yet */}
            {!currentResult && (
              <div className="text-center py-2 px-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold mb-2 border border-blue-200">
                  <ShieldCheck className="w-4 h-4 text-blue-700" />
                  <span>{lang === "hi" ? "नागरिक साइबर सुरक्षा पोर्टल" : "Citizen Cyber Fraud Prevention"}</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-black text-[#0f2b5c] tracking-tight leading-snug">
                  {lang === "hi" ? "क्लिक या भुगतान करने से पहले जांचें" : "Check before you click or pay"}
                </h1>
                <p className="text-xs md:text-sm text-slate-600 max-w-md mx-auto mt-1 leading-relaxed">
                  {t.heroDesc}
                </p>
              </div>
            )}

            {/* Input Form */}
            <CheckForm
              lang={lang}
              onAnalyze={handleAnalyze}
              isAnalyzing={isAnalyzing}
              onOpenEmergency={() => setCurrentTab("emergency")}
              prefilledData={prefilledData}
            />

            {/* Result Card when analysis completes */}
            {currentResult && (
              <div id="result-section" className="pt-2 animate-in fade-in slide-in-from-bottom-3 duration-200">
                <ResultCard
                  result={currentResult}
                  lang={lang}
                  onReset={() => {
                    setCurrentResult(null);
                    setPrefilledData(null);
                  }}
                  onOpenEmergency={() => setCurrentTab("emergency")}
                />
              </div>
            )}

            {/* Quick Feature Highlights if no active result */}
            {!currentResult && (
              <div className="grid grid-cols-2 gap-3 pt-3">
                <button
                  onClick={() => setCurrentTab("library")}
                  className="bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-sm hover:border-blue-300 hover:bg-blue-50/30 transition-all text-left flex items-start gap-2.5"
                >
                  <div className="p-2 rounded-xl bg-blue-100 text-blue-700 mt-0.5">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">
                      {lang === "hi" ? "10 आम स्कैम" : "10 Common Scams"}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {lang === "hi" ? "पहचानना सीखें" : "Learn how to spot"}
                    </p>
                  </div>
                </button>

                <button
                  onClick={() => setCurrentTab("trending")}
                  className="bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-sm hover:border-blue-300 hover:bg-blue-50/30 transition-all text-left flex items-start gap-2.5"
                >
                  <div className="p-2 rounded-xl bg-rose-100 text-rose-700 mt-0.5">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">
                      {lang === "hi" ? "ट्रेंडिंग रिपोर्ट्स" : "Most Reported"}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {lang === "hi" ? "सक्रिय फर्जी नंबर" : "Active scam IDs"}
                    </p>
                  </div>
                </button>
              </div>
            )}
          </div>
        )}

        {/* VIEW 2: Scam Library */}
        {currentTab === "library" && (
          <ScamLibraryView
            lang={lang}
            onTestExample={handleLoadSampleIntoScanner}
          />
        )}

        {/* VIEW 3: Trending Reports */}
        {currentTab === "trending" && (
          <MostReportedView
            lang={lang}
            onScanEntity={handleLoadSampleIntoScanner}
          />
        )}

        {/* VIEW 4: Emergency Help */}
        {currentTab === "emergency" && (
          <EmergencyFlow
            lang={lang}
            onBackToScanner={() => setCurrentTab("check")}
          />
        )}
      </main>

      {/* History Modal */}
      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onSelectHistoryItem={handleSelectHistoryItem}
        onClearHistory={handleClearHistory}
        lang={lang}
      />

      {/* Gemini Settings Modal */}
      <GeminiSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        apiKey={geminiApiKey}
        onSaveApiKey={handleSaveApiKey}
        lang={lang}
      />

      {/* Bottom Sticky Emergency Floating Bar for Mobile (Always accessible) */}
      {currentTab !== "emergency" && (
        <div className="sticky bottom-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 py-2.5 px-4 max-w-xl mx-auto w-full flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping"></span>
            <span className="text-xs font-bold text-slate-800">
              {lang === "hi" ? "साइबर हेल्पलाइन 1930" : "Cyber Helpline 1930"}
            </span>
          </div>
          <a
            href="tel:1930"
            className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs py-1.5 px-3.5 rounded-xl flex items-center gap-1.5 shadow-sm active:scale-95 transition-transform"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>{lang === "hi" ? "कॉल 1930" : "Call 1930"}</span>
          </a>
        </div>
      )}
    </div>
  );
}
