import React, { useState, useEffect } from "react";
import { 
  TrendingUp, 
  AlertTriangle, 
  Phone, 
  CreditCard, 
  Globe, 
  ExternalLink, 
  Search,
  ShieldCheck,
  CheckCircle2,
  RefreshCw
} from "lucide-react";
import { getMostReportedList } from "../services/crowdRegistry";
import { translations } from "../i18n/translations";

export default function MostReportedView({ lang, onScanEntity }) {
  const t = translations[lang] || translations.en;
  const [list, setList] = useState([]);
  const [filterType, setFilterType] = useState("all"); // 'all' | 'phone' | 'upi' | 'domain'

  const refreshList = () => {
    setList(getMostReportedList(25));
  };

  useEffect(() => {
    refreshList();
  }, []);

  const filteredList = list.filter((item) => {
    if (filterType === "all") return true;
    return item.type === filterType;
  });

  return (
    <div className="max-w-2xl mx-auto space-y-5 pb-12 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white rounded-3xl p-5 md:p-6 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-rose-100 text-rose-700 rounded-2xl">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-extrabold text-slate-900">
                {t.trendingTitle}
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                {t.trendingDesc}
              </p>
            </div>
          </div>
          <button
            onClick={refreshList}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl"
            title="Refresh list"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 mt-4 text-xs font-semibold overflow-x-auto pb-1">
          <button
            onClick={() => setFilterType("all")}
            className={`px-3 py-1.5 rounded-xl border transition-all whitespace-nowrap ${
              filterType === "all"
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
            }`}
          >
            {lang === "hi" ? "सभी श्रेणियां" : "All Identifiers"}
          </button>
          <button
            onClick={() => setFilterType("phone")}
            className={`px-3 py-1.5 rounded-xl border transition-all whitespace-nowrap ${
              filterType === "phone"
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
            }`}
          >
            {lang === "hi" ? "फ़ोन नंबर" : "Phone Numbers"}
          </button>
          <button
            onClick={() => setFilterType("upi")}
            className={`px-3 py-1.5 rounded-xl border transition-all whitespace-nowrap ${
              filterType === "upi"
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
            }`}
          >
            {lang === "hi" ? "UPI आईडी" : "UPI Handles"}
          </button>
          <button
            onClick={() => setFilterType("domain")}
            className={`px-3 py-1.5 rounded-xl border transition-all whitespace-nowrap ${
              filterType === "domain"
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
            }`}
          >
            {lang === "hi" ? "वेबसाइट / लिंक" : "Domains & APKs"}
          </button>
        </div>
      </div>

      {/* Registry Items */}
      <div className="space-y-2.5">
        {filteredList.map((item, index) => {
          let typeIcon = <Globe className="w-4 h-4 text-indigo-600" />;
          if (item.type === "phone") typeIcon = <Phone className="w-4 h-4 text-emerald-600" />;
          if (item.type === "upi") typeIcon = <CreditCard className="w-4 h-4 text-purple-600" />;

          return (
            <div
              key={item.id || index}
              className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm hover:border-slate-300 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
            >
              <div className="flex items-start gap-3">
                <div className="w-6 text-xs font-bold text-slate-400 mt-0.5">
                  #{index + 1}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    {typeIcon}
                    <span className="font-mono font-bold text-sm text-slate-900 break-all">
                      {item.entity}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[11px] text-slate-500 font-medium">
                      {item.category || "Reported suspicious pattern"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
                <span className="text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-1 rounded-full whitespace-nowrap">
                  {item.reportsCount} {lang === "hi" ? "रिपोर्ट्स" : "reports"}
                </span>

                <button
                  onClick={() => onScanEntity({ text: item.entity, tab: item.type === "phone" ? "phone" : item.type === "upi" ? "phone" : "link" })}
                  className="text-xs font-semibold text-blue-700 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-xl border border-blue-200 whitespace-nowrap transition-colors"
                >
                  {lang === "hi" ? "स्कैन करें" : "Inspect"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Privacy note */}
      <div className="bg-slate-100 rounded-2xl p-4 text-center text-xs text-slate-600 border border-slate-200">
        <p>
          {lang === "hi" 
            ? "🛡️ नागरिक सुरक्षा नोट: यह रजिस्ट्री केवल रिपोर्ट किए गए नंबरों और डोमेन की गिनती रखती है। व्यक्तिगत संदेश सामग्री कभी संग्रहीत नहीं की जाती।"
            : "🛡️ Citizen Registry Protection: This ledger only tracks verified phone numbers, UPI handles, and domains. Individual user chat messages are NEVER stored."}
        </p>
      </div>
    </div>
  );
}
