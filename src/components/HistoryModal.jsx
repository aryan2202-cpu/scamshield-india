import React from "react";
import { History, X, Trash2, ArrowRight, ShieldAlert, ShieldCheck, AlertTriangle } from "lucide-react";
import { translations } from "../i18n/translations";

export default function HistoryModal({
  isOpen,
  onClose,
  history,
  onSelectHistoryItem,
  onClearHistory,
  lang
}) {
  const t = translations[lang] || translations.en;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-2 sm:p-4 animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-lg rounded-3xl p-5 shadow-2xl max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-base text-slate-900">
              {t.btnViewHistory}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List */}
        <div className="overflow-y-auto space-y-2 py-3 flex-1">
          {(!history || history.length === 0) ? (
            <div className="text-center py-12 text-slate-400 text-sm space-y-2">
              <History className="w-8 h-8 mx-auto text-slate-300" />
              <p>{lang === "hi" ? "कोई पिछला रिकॉर्ड नहीं है।" : "No checks recorded yet on this device."}</p>
            </div>
          ) : (
            history.map((item) => {
              const isScam = item.verdict === "LIKELY SCAM";
              const isSuspicious = item.verdict === "SUSPICIOUS";

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectHistoryItem(item);
                    onClose();
                  }}
                  className="w-full text-left p-3.5 rounded-2xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/40 transition-all flex items-start justify-between gap-3 group"
                >
                  <div className="space-y-1 flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isScam
                            ? "bg-red-100 text-red-700"
                            : isSuspicious
                            ? "bg-amber-100 text-amber-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {item.verdict} • {item.score}/100
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-xs text-slate-800 font-medium truncate">
                      {item.rawInput}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 flex-shrink-0 mt-1 transition-colors" />
                </button>
              );
            })
          )}
        </div>

        {/* Footer */}
        {history && history.length > 0 && (
          <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
            <span className="text-[11px] text-slate-400">
              {lang === "hi" ? "केवल आपके डिवाइस पर सुरक्षित" : "Stored strictly on device only"}
            </span>
            <button
              onClick={onClearHistory}
              className="text-xs text-red-600 hover:text-red-800 font-semibold flex items-center gap-1.5 py-1 px-2 rounded-lg hover:bg-red-50"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{t.btnClearHistory}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
