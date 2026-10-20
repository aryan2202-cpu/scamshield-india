import React, { useState } from "react";
import { 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  Volume2, 
  VolumeX, 
  Share2, 
  Flag, 
  CheckCircle, 
  ArrowRight, 
  Info,
  RotateCcw,
  Sparkles
} from "lucide-react";
import { translations } from "../i18n/translations";
import { speakResultText, stopSpeaking } from "../services/ttsService";
import { reportScamIdentifier } from "../services/crowdRegistry";

export default function ResultCard({
  result,
  lang,
  onReset,
  onOpenEmergency
}) {
  const t = translations[lang] || translations.en;
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [reportState, setReportState] = useState({
    reported: false,
    message: "",
    count: result?.totalReports || 0
  });

  if (!result) return null;

  const isScam = result.verdict === "LIKELY SCAM";
  const isSuspicious = result.verdict === "SUSPICIOUS";
  const isSafe = result.verdict === "SAFE";

  // Visual Theme Config
  let theme = {
    bgBadge: "bg-red-600 text-white",
    cardBorder: "border-red-300 ring-2 ring-red-100",
    headerBg: "bg-red-50 text-red-950",
    scoreBar: "bg-red-600",
    textColor: "text-red-700",
    icon: <ShieldAlert className="w-8 h-8 text-red-600" />,
    verdictText: t.verdictScam
  };

  if (isSuspicious) {
    theme = {
      bgBadge: "bg-amber-600 text-white",
      cardBorder: "border-amber-300 ring-2 ring-amber-100",
      headerBg: "bg-amber-50 text-amber-950",
      scoreBar: "bg-amber-500",
      textColor: "text-amber-700",
      icon: <AlertTriangle className="w-8 h-8 text-amber-600" />,
      verdictText: t.verdictSuspicious
    };
  } else if (isSafe) {
    theme = {
      bgBadge: "bg-emerald-600 text-white",
      cardBorder: "border-emerald-300 ring-2 ring-emerald-100",
      headerBg: "bg-emerald-50 text-emerald-950",
      scoreBar: "bg-emerald-600",
      textColor: "text-emerald-700",
      icon: <ShieldCheck className="w-8 h-8 text-emerald-600" />,
      verdictText: t.verdictSafe
    };
  }

  // Text to speech generator
  const handleToggleSpeech = () => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
    } else {
      const reasonsList = result.reasons.join(". ");
      const actionsList = result.whatToDo.join(". ");
      const verdictSpoken = isScam 
        ? (lang === "hi" ? "सावधान! यह एक संभावित धोखा या स्कैम है।" : "Warning! This is likely a scam.")
        : isSuspicious 
        ? (lang === "hi" ? "ध्यान दें! यह संदेश संदिग्ध है।" : "Caution! This message is suspicious.")
        : (lang === "hi" ? "यह संदेश सुरक्षित प्रतीत होता है।" : "This appears safe.");

      const fullSpokenText = `${verdictSpoken}. ${reasonsList}. ${lang === "hi" ? "सुझाव:" : "Recommended actions:"} ${actionsList}`;

      speakResultText(
        fullSpokenText, 
        lang, 
        () => setIsSpeaking(true), 
        () => setIsSpeaking(false)
      );
    }
  };

  // WhatsApp warning share generator
  const handleShareWarning = () => {
    const mainReason = result.reasons[0] || "Suspicious scam indicators detected";
    let shareText = "";

    if (lang === "hi") {
      shareText = `🚨 सावधान! मैंने ScamShield India पर इस संदेश की जांच की है और यह एक धोखाधड़ी (${result.verdict}) लग रहा है:\n\n⚠️ कारण: ${mainReason}\n\n🛑 सलाह: किसी भी अनजान लिंक पर क्लिक न करें और न ही कभी पैसे लेने के लिए UPI PIN डालें। हमेशा सतर्क रहें!`;
    } else {
      shareText = `🚨 SCAM ALERT: I checked this message on ScamShield India and it looks like a scam (${result.verdict}):\n\n⚠️ Reason: ${mainReason}\n\n🛑 Warning: Never click unknown links, never share OTP, and NEVER enter your UPI PIN to receive money. Stay safe!`;
    }

    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(whatsappUrl, "_blank");
  };

  // Crowdsource scam reporting handler
  const handleReportScam = () => {
    if (reportState.reported) return;

    const entityToReport = result.detectedEntity?.entity || "Reported suspicious sender";
    const entityType = result.detectedEntity?.type || "identifier";

    const res = reportScamIdentifier({
      entity: entityToReport,
      type: entityType,
      category: isScam ? "Flagged as Likely Scam" : "Flagged as Suspicious"
    });

    if (res.success) {
      setReportState({
        reported: true,
        message: t.reportSuccess,
        count: res.totalReports
      });
    } else if (res.rateLimited) {
      alert(t.rateLimitMsg);
    }
  };

  return (
    <div className={`bg-white rounded-3xl shadow-lg border overflow-hidden transition-all ${theme.cardBorder}`}>
      {/* Header Banner */}
      <div className={`p-5 md:p-6 ${theme.headerBg} border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4`}>
        <div className="flex items-center gap-3.5">
          <div className="p-2.5 bg-white rounded-2xl shadow-sm border border-slate-200/80">
            {theme.icon}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-bold tracking-wider px-2.5 py-0.5 rounded-full ${theme.bgBadge}`}>
                {theme.verdictText}
              </span>
              {result.source === "gemini" && (
                <span className="text-[10px] bg-indigo-100 text-indigo-700 font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 border border-indigo-200">
                  <Sparkles className="w-2.5 h-2.5" /> Gemini AI
                </span>
              )}
            </div>
            <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 mt-1">
              {theme.verdictText}
            </h3>
          </div>
        </div>

        {/* Circular / Meter Risk Score Gauge */}
        <div className="flex items-center gap-3 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-2xl border border-slate-200 shadow-sm self-stretch sm:self-auto justify-between sm:justify-start">
          <div className="text-left">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
              {t.riskScoreLabel}
            </span>
            <div className="flex items-baseline gap-1">
              <span className={`text-2xl font-black ${theme.textColor}`}>
                {result.score}
              </span>
              <span className="text-xs text-slate-400 font-semibold">/ 100</span>
            </div>
          </div>
          <div className="w-16 bg-slate-200 h-2.5 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-700 ${theme.scoreBar}`}
              style={{ width: `${Math.max(5, result.score)}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Reported By Crowd Badge */}
      {(result.totalReports > 0 || reportState.count > 0) && (
        <div className="bg-amber-500/10 border-b border-amber-200/60 px-5 py-2.5 flex items-center gap-2 text-amber-900 text-xs font-semibold">
          <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
          <span>
            {t.reportedByBadge.replace("{count}", reportState.count || result.totalReports)}
          </span>
        </div>
      )}

      {/* Content Body */}
      <div className="p-5 md:p-6 space-y-6">
        {/* Reasons */}
        <div>
          <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2.5 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            {t.reasonsTitle}
          </h4>
          <ul className="space-y-2">
            {result.reasons.map((reason, idx) => (
              <li 
                key={idx}
                className="flex items-start gap-2.5 text-sm text-slate-800 bg-slate-50 p-3 rounded-xl border border-slate-200"
              >
                <span className="font-bold text-slate-400 text-xs mt-0.5">•</span>
                <span className="font-medium leading-relaxed">{reason}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Steps: What to do now */}
        <div>
          <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2.5 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
            {t.whatToDoTitle}
          </h4>
          <div className="space-y-2">
            {result.whatToDo.map((step, idx) => (
              <div 
                key={idx}
                className="flex items-start gap-3 bg-blue-50/60 border border-blue-100 p-3 rounded-xl text-slate-800 text-sm"
              >
                <div className="w-5 h-5 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <p className="font-medium leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Toolbar: Read Aloud, WhatsApp Share, Report */}
        <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-2.5 border-t border-slate-200">
          {/* Read Aloud Button */}
          <button
            onClick={handleToggleSpeech}
            className={`py-2.5 px-3 rounded-xl font-semibold text-xs md:text-sm flex items-center justify-center gap-2 border transition-all ${
              isSpeaking
                ? "bg-red-50 text-red-700 border-red-300"
                : "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300"
            }`}
          >
            {isSpeaking ? (
              <>
                <VolumeX className="w-4 h-4 text-red-600" />
                <span>{t.btnStopAudio}</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-blue-600" />
                <span>{t.btnReadAloud}</span>
              </>
            )}
          </button>

          {/* Share Warning on WhatsApp */}
          <button
            onClick={handleShareWarning}
            className="py-2.5 px-3 rounded-xl font-semibold text-xs md:text-sm bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] border border-[#25D366]/30 flex items-center justify-center gap-2 transition-all"
          >
            <Share2 className="w-4 h-4" />
            <span className="truncate">{t.btnShareWarning}</span>
          </button>

          {/* Report Scam Button */}
          <button
            onClick={handleReportScam}
            disabled={reportState.reported}
            className={`py-2.5 px-3 rounded-xl font-semibold text-xs md:text-sm flex items-center justify-center gap-2 border transition-all ${
              reportState.reported
                ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                : "bg-rose-50 hover:bg-rose-100 text-rose-700 border-rose-200"
            }`}
          >
            {reportState.reported ? (
              <>
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>{t.btnReported}</span>
              </>
            ) : (
              <>
                <Flag className="w-4 h-4 text-rose-600" />
                <span className="truncate">{t.btnReportScam}</span>
              </>
            )}
          </button>
        </div>

        {/* If SCAM or SUSPICIOUS: Big shortcut to Emergency Flow */}
        {(isScam || isSuspicious) && (
          <div className="bg-red-50 rounded-2xl p-4 border border-red-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <p className="text-xs text-red-900 font-medium">
                {lang === "hi" 
                  ? "क्या आपने पहले ही पैसे भेज दिए हैं या खाते की जानकारी साझा कर दी है?" 
                  : "Did you already transfer money or reveal banking passwords?"}
              </p>
            </div>
            <button
              onClick={onOpenEmergency}
              className="w-full sm:w-auto px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-sm whitespace-nowrap transition-colors"
            >
              {lang === "hi" ? "आपातकालीन सहायता खोलें" : "Open Emergency Guide"}
            </button>
          </div>
        )}

        {/* Guidance Disclaimer */}
        <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200 flex items-start gap-2.5 text-xs text-slate-500">
          <Info className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
          <p className="leading-relaxed">{t.disclaimer}</p>
        </div>

        {/* Re-check another input button */}
        <div className="text-center pt-2">
          <button
            onClick={onReset}
            className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 px-5 py-2.5 rounded-xl border border-blue-200 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{lang === "hi" ? "दूसरी जांच करें" : "Check something else"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
