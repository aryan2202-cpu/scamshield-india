import React, { useState } from "react";
import { Settings, X, Key, Check, Shield, Sparkles, ExternalLink } from "lucide-react";
import { translations } from "../i18n/translations";

export default function GeminiSettingsModal({
  isOpen,
  onClose,
  apiKey,
  onSaveApiKey,
  lang
}) {
  const t = translations[lang] || translations.en;
  const [keyInput, setKeyInput] = useState(apiKey || "");
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    onSaveApiKey(keyInput.trim());
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-2 sm:p-4 animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-md rounded-3xl p-5 shadow-2xl space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            <h3 className="font-bold text-base text-slate-900">
              {lang === "hi" ? "एआई सेटिंग्स (Gemini AI)" : "AI Settings (Gemini)"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          {lang === "hi" 
            ? "ScamShield India बिना किसी API key के भी संपूर्ण रूल-बेस्ड इंजन के साथ पूरी तरह काम करता है। यदि आप जेमिनी AI (Gemini Flash) से अतिरिक्त भाषाई विश्लेषण चाहते हैं, तो अपनी निःशुल्क Google AI Studio key यहाँ जोड़ सकते हैं।"
            : "ScamShield India functions 100% out-of-the-box using the built-in deterministic rule engine. Optionally provide a Google AI Studio Gemini API key to enable semantic deep analysis."}
        </p>

        <form onSubmit={handleSave} className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Google Gemini API Key (Optional)
            </label>
            <div className="relative">
              <Key className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                value={keyInput}
                onChange={(e) => setKeyInput(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs md:text-sm font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500">
            <a 
              href="https://aistudio.google.com/app/apikey" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-indigo-600 hover:underline flex items-center gap-1"
            >
              <span>{lang === "hi" ? "निःशुल्क key प्राप्त करें" : "Get a free key from Google AI Studio"}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            {apiKey && (
              <button
                type="button"
                onClick={() => {
                  setKeyInput("");
                  onSaveApiKey("");
                }}
                className="text-red-600 hover:underline"
              >
                {lang === "hi" ? "Key हटाएं" : "Remove Key"}
              </button>
            )}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs md:text-sm rounded-xl shadow transition-colors flex items-center justify-center gap-2"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>{lang === "hi" ? "सेव हो गया!" : "Saved!"}</span>
                </>
              ) : (
                <span>{lang === "hi" ? "सेव करें" : "Save Key"}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
