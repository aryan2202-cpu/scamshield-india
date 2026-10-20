import React, { useState } from "react";
import { 
  PhoneCall, 
  ExternalLink, 
  ShieldAlert, 
  Lock, 
  CheckSquare, 
  Square, 
  FileCheck, 
  AlertOctagon, 
  Building2, 
  Copy, 
  Check,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { translations } from "../i18n/translations";
import { bankHelplines } from "../data/bankHelplines";

export default function EmergencyFlow({ lang, onBackToScanner }) {
  const t = translations[lang] || translations.en;
  const [copiedBankIndex, setCopiedBankIndex] = useState(null);
  const [showAllBanks, setShowAllBanks] = useState(false);
  const [evidenceChecks, setEvidenceChecks] = useState({
    utr: false,
    screenshots: false,
    bankSms: false,
    phoneNumbers: false
  });

  const toggleCheck = (key) => {
    setEvidenceChecks(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const copyToClipboard = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedBankIndex(idx);
    setTimeout(() => setCopiedBankIndex(null), 2000);
  };

  const displayedBanks = showAllBanks ? bankHelplines : bankHelplines.slice(0, 4);

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Calm Emergency Header */}
      <div className="bg-gradient-to-br from-red-700 via-rose-800 to-red-900 text-white rounded-3xl p-6 shadow-xl border border-red-500/30">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 bg-white/20 rounded-2xl">
            <AlertOctagon className="w-8 h-8 text-white" />
          </div>
          <div>
            <span className="text-xs font-bold tracking-widest uppercase bg-red-950/70 text-red-200 px-2.5 py-0.5 rounded-full border border-red-800">
              {lang === "hi" ? "आपातकालीन कार्ययोजना" : "Emergency Action Protocol"}
            </span>
            <h2 className="text-xl md:text-2xl font-black mt-1">
              {t.emergencyTitle}
            </h2>
          </div>
        </div>
        <p className="text-sm text-red-100 font-medium leading-relaxed">
          {t.emergencySubtitle}
        </p>

        {/* 1930 Direct Tap-To-Call Main CTA */}
        <div className="mt-5 pt-4 border-t border-red-600/60">
          <a
            href="tel:1930"
            className="w-full bg-white hover:bg-red-50 text-red-700 font-extrabold text-lg py-4 px-6 rounded-2xl shadow-lg flex items-center justify-center gap-3 transition-transform active:scale-98 animate-pulse"
          >
            <PhoneCall className="w-6 h-6 fill-red-600 text-red-600" />
            <span>{t.call1930}</span>
          </a>
          <p className="text-[11px] text-center text-red-200 mt-2">
            {lang === "hi" 
              ? "गृह मंत्रालय की राष्ट्रीय साइबर हेल्पलाइन — कॉल 100% निःशुल्क है" 
              : "Ministry of Home Affairs National Cyber Fraud Helpline — Toll-Free"}
          </p>
        </div>
      </div>

      {/* Step 1: Bank Freeze */}
      <div className="bg-white rounded-3xl p-5 md:p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 font-bold flex items-center justify-center flex-shrink-0 text-base">
            1
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 text-base md:text-lg">
              {t.step1Title}
            </h3>
            <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
              {t.step1Desc}
            </p>
          </div>
        </div>

        {/* Bank Directory */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
          {displayedBanks.map((bank, idx) => (
            <div 
              key={idx}
              className="p-3 rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-slate-50 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-xs text-slate-800">
                  {lang === "hi" ? bank.hindiName : bank.name}
                </span>
                <Building2 className="w-4 h-4 text-slate-400" />
              </div>
              <div className="flex items-center justify-between gap-2 mt-2">
                <a
                  href={`tel:${bank.tollFree.replace(/\s+/g, '')}`}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-1.5 px-3 rounded-xl text-center flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>{bank.tollFree}</span>
                </a>
                <button
                  onClick={() => copyToClipboard(bank.smsBlock, idx)}
                  className="p-1.5 bg-slate-200 hover:bg-slate-300 rounded-xl text-slate-600"
                  title="Copy SMS blocking syntax"
                >
                  {copiedBankIndex === idx ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
              <p className="text-[10px] text-slate-500 mt-1 truncate">
                {bank.smsBlock}
              </p>
            </div>
          ))}
        </div>

        {/* Show more/less banks toggle */}
        <button
          onClick={() => setShowAllBanks(!showAllBanks)}
          className="w-full text-xs font-semibold text-blue-700 hover:text-blue-900 flex items-center justify-center gap-1 py-1"
        >
          {showAllBanks ? (
            <>
              <span>{lang === "hi" ? "कम बैंक दिखाएं" : "Show fewer banks"}</span>
              <ChevronUp className="w-4 h-4" />
            </>
          ) : (
            <>
              <span>{lang === "hi" ? "और बैंक देखें (Axis, PNB, Kotak, Paytm)" : "View all banks (Axis, PNB, Kotak, Paytm)"}</span>
              <ChevronDown className="w-4 h-4" />
            </>
          )}
        </button>
      </div>

      {/* Step 2: 1930 CFCFRMS Explanation */}
      <div className="bg-white rounded-3xl p-5 md:p-6 border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-red-100 text-red-700 font-bold flex items-center justify-center flex-shrink-0 text-base">
            2
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 text-base md:text-lg">
              {t.step2Title}
            </h3>
            <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
              {t.step2Desc}
            </p>
          </div>
        </div>

        <div className="bg-rose-50 rounded-2xl p-3.5 border border-rose-200 text-xs text-rose-950 font-medium">
          {lang === "hi" 
            ? "💡 महत्वपूर्ण: पहले 2 घंटे 'गोल्डन ऑवर' होते हैं। जैसे ही आप 1930 पर शिकायत करते हैं, यह सिस्टम ठग के खाते से पैसे निकलने से पहले उस खाते को फ्रीज कर देता है।" 
            : "💡 Golden Hour Rule: Reporting within the first 2-3 hours enables the National Cyber Crime Reporting Portal to freeze the money at the scammer's bank or payment gateway before cash is withdrawn at an ATM."}
        </div>
      </div>

      {/* Step 3: cybercrime.gov.in complaint */}
      <div className="bg-white rounded-3xl p-5 md:p-6 border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 font-bold flex items-center justify-center flex-shrink-0 text-base">
            3
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 text-base md:text-lg">
              {t.step3Title}
            </h3>
            <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
              {t.step3Desc}
            </p>
          </div>
        </div>

        <div className="pt-1">
          <a
            href="https://cybercrime.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs md:text-sm py-2.5 px-5 rounded-xl shadow-sm transition-colors"
          >
            <span>{t.visitPortal}</span>
            <ExternalLink className="w-4 h-4 text-slate-400" />
          </a>
        </div>
      </div>

      {/* Step 4: Evidence Checklist */}
      <div className="bg-white rounded-3xl p-5 md:p-6 border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 font-bold flex items-center justify-center flex-shrink-0 text-base">
            4
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 text-base md:text-lg">
              {t.step4Title}
            </h3>
            <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
              {t.step4Desc}
            </p>
          </div>
        </div>

        <div className="space-y-2 pt-1">
          <button
            onClick={() => toggleCheck("utr")}
            className="w-full text-left p-3 rounded-xl border border-slate-200 hover:bg-slate-50 flex items-center gap-3 text-xs md:text-sm"
          >
            {evidenceChecks.utr ? (
              <CheckSquare className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            ) : (
              <Square className="w-5 h-5 text-slate-400 flex-shrink-0" />
            )}
            <span className={evidenceChecks.utr ? "line-through text-slate-400" : "font-medium text-slate-800"}>
              {lang === "hi" ? "12 अंकों का UTR / UPI रेफरेंस नंबर नोट कर लिया है" : "Saved the 12-digit UTR / UPI Reference Number from payment app"}
            </span>
          </button>

          <button
            onClick={() => toggleCheck("screenshots")}
            className="w-full text-left p-3 rounded-xl border border-slate-200 hover:bg-slate-50 flex items-center gap-3 text-xs md:text-sm"
          >
            {evidenceChecks.screenshots ? (
              <CheckSquare className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            ) : (
              <Square className="w-5 h-5 text-slate-400 flex-shrink-0" />
            )}
            <span className={evidenceChecks.screenshots ? "line-through text-slate-400" : "font-medium text-slate-800"}>
              {lang === "hi" ? "व्हाट्सएप चैट / एसएमएस के स्क्रीनशॉट ले लिए हैं" : "Captured screenshots of WhatsApp chats, SMS, and fake receipts"}
            </span>
          </button>

          <button
            onClick={() => toggleCheck("bankSms")}
            className="w-full text-left p-3 rounded-xl border border-slate-200 hover:bg-slate-50 flex items-center gap-3 text-xs md:text-sm"
          >
            {evidenceChecks.bankSms ? (
              <CheckSquare className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            ) : (
              <Square className="w-5 h-5 text-slate-400 flex-shrink-0" />
            )}
            <span className={evidenceChecks.bankSms ? "line-through text-slate-400" : "font-medium text-slate-800"}>
              {lang === "hi" ? "बैंक से पैसे कटने का आधिकारिक एसएमएस सुरक्षित रख लिया है" : "Retained the official bank debit notification SMS"}
            </span>
          </button>

          <button
            onClick={() => toggleCheck("phoneNumbers")}
            className="w-full text-left p-3 rounded-xl border border-slate-200 hover:bg-slate-50 flex items-center gap-3 text-xs md:text-sm"
          >
            {evidenceChecks.phoneNumbers ? (
              <CheckSquare className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            ) : (
              <Square className="w-5 h-5 text-slate-400 flex-shrink-0" />
            )}
            <span className={evidenceChecks.phoneNumbers ? "line-through text-slate-400" : "font-medium text-slate-800"}>
              {lang === "hi" ? "जालसाज का फोन नंबर और UPI ID कॉपी कर ली है" : "Recorded fraudster's phone number and beneficiary UPI ID"}
            </span>
          </button>
        </div>
      </div>

      {/* Step 5: Beware of Secondary Scams */}
      <div className="bg-amber-50 rounded-3xl p-5 md:p-6 border border-amber-300 shadow-sm space-y-2">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-amber-200 text-amber-900 font-bold flex items-center justify-center flex-shrink-0 text-base">
            5
          </div>
          <div>
            <h3 className="font-extrabold text-amber-950 text-base md:text-lg">
              {t.step5Title}
            </h3>
            <p className="text-xs text-amber-900 mt-0.5 leading-relaxed font-medium">
              {t.step5Desc}
            </p>
          </div>
        </div>
      </div>

      {/* Back to scanner button */}
      <div className="text-center pt-2">
        <button
          onClick={onBackToScanner}
          className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs md:text-sm px-6 py-2.5 rounded-xl border border-slate-300 transition-colors"
        >
          {lang === "hi" ? "← मुख्य स्कैनर पर वापस जाएं" : "← Back to Main Scanner"}
        </button>
      </div>
    </div>
  );
}
