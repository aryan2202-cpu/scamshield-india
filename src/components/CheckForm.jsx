import React, { useState, useRef } from "react";
import { 
  MessageSquare, 
  Link as LinkIcon, 
  CreditCard, 
  Camera, 
  AlertTriangle, 
  Sparkles, 
  Upload, 
  X, 
  CheckCircle2, 
  Loader2,
  FileText
} from "lucide-react";
import { translations } from "../i18n/translations";
import { sampleExamples } from "../data/sampleExamples";
import { extractTextFromImage } from "../services/ocrService";

export default function CheckForm({
  lang,
  onAnalyze,
  isAnalyzing,
  onOpenEmergency,
  prefilledData
}) {
  const t = translations[lang] || translations.en;
  
  const [activeTab, setActiveTab] = useState("message"); // 'message' | 'link' | 'phone' | 'screenshot'
  const [inputContent, setInputContent] = useState("");
  const [ocrLoading, setOcrLoading] = useState(false);
  const [ocrProgress, setOcrProgress] = useState(0);
  const [previewImage, setPreviewImage] = useState(null);
  const [showExamplesModal, setShowExamplesModal] = useState(false);
  const fileInputRef = useRef(null);

  // Sync prefilled data if passed (e.g. from scam library or trending)
  React.useEffect(() => {
    if (prefilledData) {
      if (prefilledData.tab) setActiveTab(prefilledData.tab);
      if (prefilledData.text) setInputContent(prefilledData.text);
    }
  }, [prefilledData]);

  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
    // Don't wipe text if user switches between message/link/phone, but keep clean if desired
  };

  const handleSelectExample = (example) => {
    setActiveTab(example.suggestedTab || "message");
    setInputContent(example.text);
    setShowExamplesModal(false);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show image preview
    const previewUrl = URL.createObjectURL(file);
    setPreviewImage(previewUrl);
    setOcrLoading(true);
    setOcrProgress(15);

    const result = await extractTextFromImage(file, ({ progress }) => {
      setOcrProgress(Math.round(progress * 100));
    });

    setOcrLoading(false);

    if (result.success && result.text) {
      setInputContent(result.text);
      setActiveTab("message"); // switch to message view with extracted text
    } else {
      alert(lang === "hi" ? "चित्र से टेक्स्ट नहीं पढ़ा जा सका। कृपया स्पष्ट स्क्रीनशॉट चुनें या टेक्स्ट टाइप करें।" : "Could not clearly read text from this image. Please upload a clearer screenshot or type the text.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputContent.trim()) return;
    onAnalyze(inputContent, activeTab);
  };

  return (
    <div className="w-full">
      {/* Big Emergency Alert Button */}
      <div className="mb-4">
        <button
          onClick={onOpenEmergency}
          className="w-full group bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3.5 px-4 rounded-2xl shadow-lg shadow-red-900/20 border-2 border-red-500/40 flex items-center justify-center gap-3 transition-all transform active:scale-[0.99] animate-pulse-subtle"
        >
          <div className="p-1.5 bg-white/20 rounded-lg group-hover:rotate-6 transition-transform">
            <AlertTriangle className="w-5 h-5 text-white" />
          </div>
          <span className="text-sm md:text-base tracking-wide uppercase text-left sm:text-center">
            {t.btnEmergency}
          </span>
        </button>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 overflow-hidden">
        {/* Input Selector Tabs */}
        <div className="grid grid-cols-4 bg-slate-50 border-b border-slate-200 p-1.5 gap-1 text-xs md:text-sm font-semibold">
          <button
            type="button"
            onClick={() => handleTabChange("message")}
            className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl transition-all ${
              activeTab === "message"
                ? "bg-white text-blue-900 shadow-sm border border-slate-200 font-bold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <MessageSquare className="w-4 h-4 text-blue-600" />
            <span className="truncate">{t.tabMessage}</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange("link")}
            className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl transition-all ${
              activeTab === "link"
                ? "bg-white text-blue-900 shadow-sm border border-slate-200 font-bold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <LinkIcon className="w-4 h-4 text-indigo-600" />
            <span className="truncate">{t.tabLink}</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange("phone")}
            className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl transition-all ${
              activeTab === "phone"
                ? "bg-white text-blue-900 shadow-sm border border-slate-200 font-bold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <CreditCard className="w-4 h-4 text-emerald-600" />
            <span className="truncate">{t.tabPhoneUpi}</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange("screenshot")}
            className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl transition-all ${
              activeTab === "screenshot"
                ? "bg-white text-blue-900 shadow-sm border border-slate-200 font-bold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Camera className="w-4 h-4 text-purple-600" />
            <span className="truncate">{t.tabScreenshot}</span>
          </button>
        </div>

        {/* Input Body */}
        <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-4">
          {/* Top toolbar inside card: Example picker + clear */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setShowExamplesModal(true)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg border border-blue-200 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>{t.btnTryExample} (8)</span>
            </button>

            {inputContent && (
              <button
                type="button"
                onClick={() => setInputContent("")}
                className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1"
              >
                <X className="w-3.5 h-3.5" />
                <span>{lang === "hi" ? "साफ़ करें" : "Clear"}</span>
              </button>
            )}
          </div>

          {/* Screenshot Upload Screen if activeTab is screenshot */}
          {activeTab === "screenshot" ? (
            <div className="border-2 border-dashed border-blue-200 bg-blue-50/50 rounded-2xl p-6 text-center space-y-4">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileUpload}
                className="hidden"
                id="screenshot-file-input"
              />

              {previewImage && (
                <div className="relative inline-block max-w-[200px] max-h-[160px] rounded-lg overflow-hidden border border-slate-300 shadow">
                  <img src={previewImage} alt="Screenshot preview" className="object-cover w-full h-full" />
                </div>
              )}

              {ocrLoading ? (
                <div className="py-4 space-y-2">
                  <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto" />
                  <p className="text-sm font-semibold text-blue-900">{t.extractingText}</p>
                  <div className="w-48 bg-slate-200 rounded-full h-2 mx-auto overflow-hidden">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${ocrProgress}%` }}
                    ></div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mx-auto">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-base">{t.screenshotTitle}</h4>
                    <p className="text-xs text-slate-600 max-w-sm mx-auto mt-1">
                      {t.screenshotDesc}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow transition-colors inline-flex items-center gap-2"
                  >
                    <Camera className="w-4 h-4" />
                    <span>{t.uploadPrompt}</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Text / Link / Phone Inputs */
            <div>
              {activeTab === "message" && (
                <textarea
                  rows={4}
                  value={inputContent}
                  onChange={(e) => setInputContent(e.target.value)}
                  placeholder={t.msgPlaceholder}
                  className="w-full text-base text-slate-900 placeholder:text-slate-400 p-3.5 bg-slate-50/70 focus:bg-white border border-slate-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none resize-none leading-relaxed"
                />
              )}

              {activeTab === "link" && (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={inputContent}
                    onChange={(e) => setInputContent(e.target.value)}
                    placeholder={t.linkPlaceholder}
                    className="w-full text-base text-slate-900 placeholder:text-slate-400 p-3.5 bg-slate-50/70 focus:bg-white border border-slate-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                  />
                  <p className="text-[11px] text-slate-500">
                    {lang === "hi" 
                      ? "सलाह: आप पूरा लिंक या वेबसाइट का नाम (उदा. sbi-kyc.apk) पेस्ट कर सकते हैं।" 
                      : "Tip: Paste full link or domain name (e.g. indlapost-redelivery.online or .apk link)"}
                  </p>
                </div>
              )}

              {activeTab === "phone" && (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={inputContent}
                    onChange={(e) => setInputContent(e.target.value)}
                    placeholder={t.phoneUpiPlaceholder}
                    className="w-full text-base text-slate-900 placeholder:text-slate-400 p-3.5 bg-slate-50/70 focus:bg-white border border-slate-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                  />
                  <p className="text-[11px] text-slate-500">
                    {lang === "hi"
                      ? "सलाह: 10 अंकों का मोबाइल नंबर (उदा. 9872104918) या UPI ID (उदा. cashprize@ybl) लिखें।"
                      : "Tip: Type 10-digit phone number or UPI handle (e.g. 9872104918 or cashback@ybl)"}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Primary Action Button */}
          <div>
            <button
              type="submit"
              disabled={isAnalyzing || !inputContent.trim()}
              className={`w-full py-4 px-6 rounded-2xl font-bold text-base md:text-lg flex items-center justify-center gap-2.5 shadow-md transition-all ${
                isAnalyzing || !inputContent.trim()
                  ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                  : "bg-[#0f2b5c] hover:bg-[#0a1c3d] text-white active:scale-[0.99] shadow-blue-900/10"
              }`}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>{t.btnChecking}</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>{t.btnCheck}</span>
                </>
              )}
            </button>
          </div>

          {/* Privacy Pledge Note */}
          <div className="pt-1 text-center">
            <p className="text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
              <span>{t.privacyPledge}</span>
            </p>
          </div>
        </form>
      </div>

      {/* Examples Popover / Modal */}
      {showExamplesModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-2 sm:p-4">
          <div className="bg-white w-full max-w-xl rounded-3xl p-5 shadow-2xl max-h-[85vh] flex flex-col animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-base text-slate-900">
                  {lang === "hi" ? "तुरंत टेस्ट करने के लिए उदाहरण चुनें" : "Select a Sample Test Message"}
                </h3>
              </div>
              <button
                onClick={() => setShowExamplesModal(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500 py-2">
              {lang === "hi" 
                ? "यहाँ 4 असली स्कैम, 2 संदिग्ध और 2 असली/सुरक्षित संदेश दिए गए हैं जिन्हें आप एक क्लिक में जांच सकते हैं:" 
                : "8 realistic test cases (4 Scams, 2 Suspicious, 2 Safe). Tap any example to inspect:"}
            </p>

            <div className="overflow-y-auto space-y-2.5 pr-1 py-1 flex-1">
              {sampleExamples.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSelectExample(item)}
                  className="w-full text-left p-3 rounded-2xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 transition-all group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-slate-900 group-hover:text-blue-900">
                      {lang === "hi" ? item.titleHi : item.titleEn}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        item.category === "SCAM"
                          ? "bg-red-100 text-red-700 border border-red-200"
                          : item.category === "SUSPICIOUS"
                          ? "bg-amber-100 text-amber-800 border border-amber-200"
                          : "bg-green-100 text-green-800 border border-green-200"
                      }`}
                    >
                      {lang === "hi" ? item.badgeHi : item.badgeEn}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2">
                    {item.text}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
