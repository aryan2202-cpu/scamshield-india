import { checkRegistryForMatches, extractEntity } from "./crowdRegistry.js";

// Safe known official domains for whitelist validation
const OFFICIAL_TRUSTED_DOMAINS = [
  "onlinesbi.sbi", "sbi.co.in", "hdfcbank.com", "icicibank.com", "axisbank.com",
  "pnbindia.in", "bankofbaroda.in", "kotak.com", "amazon.in", "flipkart.com",
  "swiggy.com", "zomato.com", "cybercrime.gov.in", "uidai.gov.in", "incometax.gov.in",
  "airtel.in", "jio.com", "mygov.in", "epfindia.gov.in", "irctc.co.in"
];

// Shortener domains often abused by phishing campaigns
const URL_SHORTENERS = [
  "bit.ly", "tinyurl.com", "is.gd", "t.co", "cutt.ly", "rb.gy", "shorturl.at", "ow.ly"
];

// Remote access screen-sharing tools commonly requested by scammers
const REMOTE_ACCESS_APPS = [
  "anydesk", "teamviewer", "quicksupport", "rustdesk", "ultraviewer", "airdroid"
];

/**
 * Runs thorough rule-based heuristic checks against text, link, or phone/UPI
 */
export function analyzeWithRules(inputText, tabType = "message", lang = "en") {
  const text = (inputText || "").trim();
  const lower = text.toLowerCase();
  
  let riskScore = 0;
  const reasonsEn = [];
  const reasonsHi = [];
  const whatToDoEn = [];
  const whatToDoHi = [];
  const flags = [];

  // 1. Check Crowdsourced Scam Registry first
  const { match: crowdMatch, totalReports } = checkRegistryForMatches(text, tabType);
  if (crowdMatch && totalReports > 0) {
    riskScore += Math.min(45, 20 + totalReports * 5);
    reasonsEn.push(`Already reported by ${totalReports} people in India as a known fraud identifier.`);
    reasonsHi.push(`यह नंबर या लिंक भारत में पहले ही ${totalReports} नागरिकों द्वारा फ्रॉड के रूप में रिपोर्ट किया जा चुका है।`);
    flags.push("CROWD_REPORTED");
  }

  // 2. UPI "Collect Request" and PIN Scam Detection
  const hasUpiPinRequest = lower.includes("upi pin") || lower.includes("enter pin") || lower.includes("6-digit pin") || lower.includes("pin to receive") || lower.includes("pin to claim");
  const hasCashbackOrPrize = lower.includes("cashback") || lower.includes("reward") || lower.includes("won ₹") || lower.includes("won rs") || lower.includes("lucky draw") || lower.includes("cash prize");
  const hasUpiProtocol = lower.includes("upi://pay") || lower.includes("pa=") || lower.includes("@ybl") || lower.includes("@oksbi") || lower.includes("@paytm");

  if (hasUpiPinRequest && (hasCashbackOrPrize || hasUpiProtocol || lower.includes("receive") || lower.includes("claim") || lower.includes("deposit"))) {
    riskScore += 90;
    reasonsEn.push("CRITICAL DANGER: Asks you to enter your UPI PIN to 'receive' money. You NEVER need to enter a PIN to receive funds — entering a PIN transfers money OUT of your bank account.");
    reasonsHi.push("गंभीर खतरा: पैसे 'प्राप्त' करने के लिए यूपीआई पिन डालने को कहा जा रहा है। पैसे लेने के लिए कभी पिन नहीं डालना पड़ता—पिन डालते ही आपके खाते से पैसा कट जाएगा।");
    flags.push("UPI_PIN_RECEIVE_TRICK");
  } else if (hasUpiPinRequest) {
    riskScore += 65;
    reasonsEn.push("Mentions entering or sharing UPI PIN. Never share or type your PIN unless you intentionally initiated a payment transfer.");
    reasonsHi.push("यूपीआई पिन दर्ज करने का उल्लेख है। जब तक आप खुद किसी को भुगतान नहीं कर रहे हों, तब तक कभी पिन न डालें।");
    flags.push("PIN_MENTION");
  }

  // 3. Fake KYC Suspension / Account Blocked Urgency
  const hasKycWords = lower.includes("kyc") || lower.includes("pan update") || lower.includes("aadhaar update") || lower.includes("netbanking expired") || lower.includes("yono");
  const hasSuspensionWords = lower.includes("suspended") || lower.includes("blocked") || lower.includes("deactivated") || lower.includes("expires today") || lower.includes("within 24 hours") || lower.includes("frozen");

  if (hasKycWords && hasSuspensionWords) {
    riskScore += 80;
    reasonsEn.push("Classic Fake KYC Scam: Uses false urgency ('suspended', 'blocked today') to panic you into revealing confidential bank login or Aadhaar details.");
    reasonsHi.push("फर्जी केवाईसी घोटाला: बैंक खाता या सिम बंद होने की झूठी धमकी देकर आपकी गोपनीय बैंकिंग जानकारी चुराने का प्रयास है।");
    flags.push("FAKE_KYC_URGENCY");
  }

  // 4. Electricity Bill Cut Threat
  const hasPowerWords = lower.includes("electricity") || lower.includes("power") || lower.includes("bijli") || lower.includes("light will be disconnected") || lower.includes("power will be disconnected");
  const hasUrgentCut = lower.includes("tonight at") || lower.includes("previous month bill") || lower.includes("power office") || lower.includes("call officer") || lower.includes("9:30 pm");

  if (hasPowerWords && hasUrgentCut) {
    riskScore += 85;
    reasonsEn.push("Electricity Disconnection Fraud: Power companies never threaten disconnection tonight via personal SMS with an individual mobile number.");
    reasonsHi.push("बिजली बिल फर्जीवाड़ा: बिजली कंपनियां कभी किसी निजी मोबाइल नंबर से आज रात बिजली काटने का मैसेज नहीं भेजतीं।");
    flags.push("ELECTRICITY_BILL_SCAM");
  }

  // 5. Digital Arrest & Fake Police / CBI / FedEx Contraband
  const hasPoliceCbiWords = lower.includes("cbi") || lower.includes("digital arrest") || lower.includes("narcotics") || lower.includes("cyber crime branch") || lower.includes("police video call") || lower.includes("skype interrogation") || lower.includes("arrest warrant");
  const hasContrabandWords = lower.includes("fedex") || lower.includes("mdma") || lower.includes("parcel seized") || lower.includes("illegal drugs") || lower.includes("taiwan");

  if (hasPoliceCbiWords || (hasContrabandWords && (lower.includes("customs") || lower.includes("police") || lower.includes("arrest")))) {
    riskScore += 95;
    reasonsEn.push("DIGITAL ARREST EXTORTION: There is NO legal provision for 'digital arrest' in India. Police and CBI never hold interrogations over WhatsApp/Skype video calls.");
    reasonsHi.push("डिजिटल अरेस्ट ब्लैकमेल: भारतीय कानून में डिजिटल अरेस्ट का कोई प्रावधान नहीं है। असली पुलिस कभी व्हाट्सएप/स्काइप वीडियो कॉल पर जांच नहीं करती।");
    flags.push("DIGITAL_ARREST_EXTORTION");
  }

  // 6. Remote Desktop Screen-Sharing Apps (AnyDesk, TeamViewer, QuickSupport)
  const matchedRemoteApp = REMOTE_ACCESS_APPS.find(app => lower.includes(app));
  if (matchedRemoteApp) {
    riskScore += 85;
    reasonsEn.push(`Requests installation of screen-sharing software (${matchedRemoteApp}). Installing this allows scammers to see your screen, OTPs, and control your phone.`);
    reasonsHi.push(`स्क्रीन शेयरिंग ऐप (${matchedRemoteApp}) डाउनलोड करने को कहा जा रहा है। इसे इंस्टॉल करते ही जालसाज आपका फोन और बैंक ओटीपी देख सकते हैं।`);
    flags.push("REMOTE_ACCESS_APP");
  }

  // 7. Work-from-Home YouTube Like Task Scam
  const hasJobTaskWords = (lower.includes("work from home") || lower.includes("part-time") || lower.includes("earn rs") || lower.includes("daily payout") || lower.includes("daily 3000") || lower.includes("daily 5000") || lower.includes("daily 8000")) &&
    (lower.includes("youtube") || lower.includes("like videos") || lower.includes("rate hotel") || lower.includes("telegram") || lower.includes("t.me/"));

  if (hasJobTaskWords) {
    riskScore += 75;
    reasonsEn.push("Telegram Task Scam: Lures you with easy money for liking YouTube videos, then coerces you into depositing funds into fraudulent 'prepaid investment' tasks.");
    reasonsHi.push("टेलीग्राम टास्क घोटाला: यूट्यूब लाइक के आसान काम का लालच देकर बाद में 'प्रीपेड टास्क' के नाम पर लाखों रुपये ऐंठ लेते हैं।");
    flags.push("TASK_JOB_SCAM");
  }

  // 8. Lottery / KBC WhatsApp Prize
  const hasLotteryWords = lower.includes("kbc") || lower.includes("lottery") || lower.includes("25 lakh") || lower.includes("25,00,000") || lower.includes("sim card lucky draw") || lower.includes("rana pratap");
  if (hasLotteryWords && (lower.includes("prize") || lower.includes("winner") || lower.includes("claim") || lower.includes("whatsapp"))) {
    riskScore += 85;
    reasonsEn.push("Fake KBC / Lottery Scam: Unsolicited prize alert demanding advance registration fees or GST before releasing fake prize money.");
    reasonsHi.push("फर्जी केबीसी लॉटरी: बिना टिकट खरीदे 25 लाख जीतने का झांसा, जिसमें टैक्स या फाइल चार्ज के नाम पर पैसे मांगे जाते हैं।");
    flags.push("LOTTERY_SCAM");
  }

  // 9. URL / Link Analysis
  if (tabType === "link" || lower.includes("http") || lower.includes(".com") || lower.includes(".apk") || lower.includes(".online") || lower.includes(".info") || lower.includes(".xyz")) {
    // Check .apk direct download
    if (lower.includes(".apk")) {
      riskScore += 75;
      reasonsEn.push("Direct .APK App File Link: Financial and banking apps should ONLY be downloaded from Google Play Store or Apple App Store. Direct APK links often install malware/trojans.");
      reasonsHi.push("डायरेक्ट .APK ऐप फाइल लिंक: बैंक या सरकारी ऐप केवल गूगल प्ले स्टोर से डाउनलोड करें। सीधे APK डाउनलोड करने से फोन हैक हो सकता है।");
      flags.push("APK_DOWNLOAD_LINK");
    }

    // Check Shorteners
    const hasShortener = URL_SHORTENERS.some(sh => lower.includes(sh));
    if (hasShortener) {
      riskScore += 45;
      reasonsEn.push("Uses a shortened URL (bit.ly, tinyurl, etc.) which hides the actual destination website to bypass safety filters.");
      reasonsHi.push("शॉर्ट यूआरएल (छोटा किया गया लिंक) का उपयोग किया गया है जो असली वेबसाइट को छुपाने के लिए इस्तेमाल होता है।");
      flags.push("SHORTENED_URL");
    }

    // Check IP-address URL (e.g. http://192.168.1.1 or http://103.45.2.1)
    const ipUrlMatch = text.match(/https?:\/\/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/);
    if (ipUrlMatch) {
      riskScore += 80;
      reasonsEn.push("Uses a raw IP address instead of a recognized registered domain name. Legitimate organizations never send raw IP links.");
      reasonsHi.push("वेबसाइट के नाम की जगह सीधा आईपी एड्रेस (IP Address) दिया गया है। कोई भी वैध संस्था ऐसा लिंक नहीं भेजती।");
      flags.push("IP_ADDRESS_URL");
    }

    // Check Lookalike phishing domains (e.g. sbi-kyc, indlapost, yono-update, paytm-security)
    const lookalikePatterns = [
      /sbi[a-z0-9-]*\.(apk|xyz|top|online|site|info|buzz)/i,
      /hdfc[a-z0-9-]*\.(apk|xyz|top|online|site|info)/i,
      /ind[li]apost[a-z0-9-]*\.(online|info|top|site)/i,
      /yono[a-z0-9-]*\.(online|info|site|apk)/i,
      /paytm[a-z0-9-]*\.(online|xyz|top)/i
    ];
    if (lookalikePatterns.some(p => p.test(text))) {
      riskScore += 80;
      reasonsEn.push("Spoofed Lookalike Domain: The link imitates a trusted brand (e.g., SBI, India Post, HDFC) but is registered on an unofficial suspicious extension.");
      reasonsHi.push("नकली मिलती-जुलती वेबसाइट: यह लिंक असली बैंक या डाक विभाग की नकल कर रहा है ताकि आप धोखा खा जाएं।");
      flags.push("LOOKALIKE_DOMAIN");
    }

    // Whitelist check
    const isWhitelisted = OFFICIAL_TRUSTED_DOMAINS.some(domain => lower.includes(domain));
    if (isWhitelisted && !flags.includes("APK_DOWNLOAD_LINK") && !hasUpiPinRequest && !hasPoliceCbiWords) {
      riskScore = Math.max(0, riskScore - 50);
    }
  }

  // 10. Genuine / Safe Message Heuristics
  const hasSafeOtpPhrase = lower.includes("never share your otp") || lower.includes("never share otp") || lower.includes("do not share with anyone");
  const hasBlockHelpline = lower.includes("sms block to") || lower.includes("if you did not initiate") || lower.includes("if not you");
  const hasLegitMerchant = lower.includes("swiggy") || lower.includes("zomato") || lower.includes("amazon") || lower.includes("flipkart") || lower.includes("irctc");

  if (hasSafeOtpPhrase && hasBlockHelpline && riskScore < 40) {
    riskScore = 5;
    reasonsEn.length = 0;
    reasonsHi.length = 0;
    reasonsEn.push("Authentic Transaction Alert: Contains standard security safety warnings ('Never share OTP') and official bank SMS cancellation instructions.");
    reasonsHi.push("असली बैंक संदेश: इसमें सुरक्षा चेतावनी ('ओटीपी किसी से साझा न करें') और बैंक को तुरंत ब्लॉक करने का सही तरीका दिया गया है।");
    flags.push("GENUINE_BANK_ALERT");
  } else if ((lower.includes("has been delivered") || lower.includes("order delivered")) && (lower.includes("amazon.in") || lower.includes("flipkart.com")) && riskScore < 30) {
    riskScore = 0;
    reasonsEn.length = 0;
    reasonsHi.length = 0;
    reasonsEn.push("Standard Delivery Confirmation: Official order completion update referencing trusted domain.");
    reasonsHi.push("सामान्य डिलीवरी सूचना: आधिकारिक और सुरक्षित वेबसाइट से संबंधित डिलीवरी अपडेट।");
    flags.push("GENUINE_DELIVERY_UPDATE");
  }

  // 11. Normalize Risk Score & Determine Verdict
  riskScore = Math.min(100, Math.max(0, riskScore));

  let verdict = "SAFE";
  if (riskScore >= 60) {
    verdict = "LIKELY SCAM";
  } else if (riskScore >= 25) {
    verdict = "SUSPICIOUS";
  } else {
    verdict = "SAFE";
  }

  // If SAFE and no reasons populated
  if (verdict === "SAFE" && reasonsEn.length === 0) {
    reasonsEn.push("No common scam keywords, suspicious urgent demands, or malicious links detected.");
    reasonsHi.push("कोई संदिग्ध शब्द, झूठी जल्दबाजी या खतरनाक लिंक नहीं पाया गया।");
  }

  // If SUSPICIOUS and reasons empty
  if (verdict === "SUSPICIOUS" && reasonsEn.length === 0) {
    reasonsEn.push("Contains unverified contact details or unusual requests. Exercise caution before proceeding.");
    reasonsHi.push("इसमें असत्यापित संपर्क जानकारी या असामान्य अनुरोध है। आगे बढ़ने से पहले पूरी सावधानी बरतें।");
  }

  // Generate "What to do now" action steps
  if (verdict === "LIKELY SCAM") {
    whatToDoEn.push("DO NOT click the link, download any file, or enter your UPI PIN.");
    whatToDoEn.push("Block and report the sender's phone number or WhatsApp account.");
    whatToDoEn.push("If you already shared banking details or sent money, immediately call 1930 and your bank.");

    whatToDoHi.push("लिंक पर क्लिक न करें, कोई फाइल डाउनलोड न करें और कभी यूपीआई पिन न डालें।");
    whatToDoHi.push("भेजने वाले का फोन नंबर या व्हाट्सएप तुरंत ब्लॉक और रिपोर्ट करें।");
    whatToDoHi.push("यदि आपने पहले ही जानकारी दे दी है या पैसे भेज दिए हैं, तो तुरंत 1930 और बैंक को कॉल करें।");
  } else if (verdict === "SUSPICIOUS") {
    whatToDoEn.push("Do not click links or pay any advance fee until you verify with an official source.");
    whatToDoEn.push("Contact the company solely through their official app or website help desk, not this message.");
    whatToDoEn.push("Never install remote desktop apps (AnyDesk, QuickSupport) on instruction from callers.");

    whatToDoHi.push("आधिकारिक स्रोत से पुष्टि किए बिना लिंक पर क्लिक न करें या कोई अग्रिम शुल्क न दें।");
    whatToDoHi.push("कंपनी से केवल उनके आधिकारिक ऐप या वेबसाइट के जरिए संपर्क करें, इस मैसेज के नंबर पर नहीं।");
    whatToDoHi.push("किसी कॉलर के कहने पर कभी AnyDesk या QuickSupport जैसे ऐप इंस्टॉल न करें।");
  } else {
    whatToDoEn.push("Verify that the sender matches your expected transaction or delivery.");
    whatToDoEn.push("Remember: Never share OTPs or passwords with anyone claiming to be bank staff.");
    whatToDoEn.push("Keep your bank's official card helpline saved for routine peace of mind.");

    whatToDoHi.push("जांच लें कि यह संदेश आपके द्वारा किए गए किसी वास्तविक लेनदेन या डिलीवरी से ही जुड़ा है।");
    whatToDoHi.push("याद रखें: बैंक कर्मचारी बनकर कॉल करने वाले किसी भी व्यक्ति को कभी भी ओटीपी या पासवर्ड न बताएं।");
    whatToDoHi.push("संतुष्टि के लिए अपने बैंक के आधिकारिक नंबर को हमेशा अपने फोन में सुरक्षित रखें।");
  }

  const detectedEntity = extractEntity(text, tabType);

  return {
    verdict,
    score: riskScore,
    reasons: lang === "hi" ? reasonsHi : reasonsEn,
    reasonsEn,
    reasonsHi,
    whatToDo: lang === "hi" ? whatToDoHi : whatToDoEn,
    whatToDoEn,
    whatToDoHi,
    flags,
    totalReports,
    detectedEntity,
    source: "rules"
  };
}

/**
 * Optional Gemini LLM deep analysis with structured JSON output.
 * Blends rule-based signals with semantic reasoning.
 */
export async function analyzeWithGemini(inputText, tabType, lang = "en", customApiKey = "") {
  // First run local rules as baseline signal
  const ruleResult = analyzeWithRules(inputText, tabType, lang);

  const apiKey = customApiKey || import.meta.env.VITE_GEMINI_API_KEY || "";
  if (!apiKey) {
    // Return pure rule analysis seamlessly
    return ruleResult;
  }

  try {
    const prompt = `You are ScamShield India, an expert Indian cybercrime forensic analyst. Analyze this user input for cyber fraud, UPI collect scam, fake KYC, digital arrest, fake job, fake parcel, electricity bill cut, or phishing.

USER INPUT TYPE: ${tabType}
USER INPUT TEXT:
"""
${inputText}
"""

PRE-ANALYZED LOCAL HEURISTICS:
- Rule-based risk score: ${ruleResult.score}/100
- Flags triggered: ${ruleResult.flags.join(", ") || "None"}
- Known reports in India: ${ruleResult.totalReports}

CRITICAL RULES FOR INDIA:
1. Entering UPI PIN is ONLY for paying/sending money. It is NEVER needed to receive money.
2. Digital arrest is illegal; Indian police never interrogates over Skype/WhatsApp video call.
3. Power boards never disconnect power overnight via 10-digit mobile SMS.
4. AnyDesk/QuickSupport download request = Remote access theft.
5. Never claim 100% certainty.

Return ONLY a valid JSON object with this exact structure, with NO markdown backticks or commentary:
{
  "verdict": "SAFE" | "SUSPICIOUS" | "LIKELY SCAM",
  "score": <number between 0 and 100>,
  "reasonsEn": [
    "<short clear reason 1>",
    "<short clear reason 2>"
  ],
  "reasonsHi": [
    "<short clear reason 1 in Hindi>",
    "<short clear reason 2 in Hindi>"
  ],
  "whatToDoEn": [
    "<action step 1>",
    "<action step 2>"
  ],
  "whatToDoHi": [
    "<action step 1 in Hindi>",
    "<action step 2 in Hindi>"
  ]
}`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.2,
          responseMimeType: "application/json"
        }
      })
    });

    if (!response.ok) {
      console.warn("Gemini API call failed, falling back to local heuristics.");
      return ruleResult;
    }

    const data = await response.json();
    const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!candidateText) {
      return ruleResult;
    }

    const parsed = JSON.parse(candidateText.replace(/```json/g, "").replace(/```/g, "").trim());

    return {
      verdict: parsed.verdict || ruleResult.verdict,
      score: typeof parsed.score === "number" ? parsed.score : ruleResult.score,
      reasons: lang === "hi" ? (parsed.reasonsHi || ruleResult.reasonsHi) : (parsed.reasonsEn || ruleResult.reasonsEn),
      reasonsEn: parsed.reasonsEn || ruleResult.reasonsEn,
      reasonsHi: parsed.reasonsHi || ruleResult.reasonsHi,
      whatToDo: lang === "hi" ? (parsed.whatToDoHi || ruleResult.whatToDoHi) : (parsed.whatToDoEn || ruleResult.whatToDoEn),
      whatToDoEn: parsed.whatToDoEn || ruleResult.whatToDoEn,
      whatToDoHi: parsed.whatToDoHi || ruleResult.whatToDoHi,
      flags: ruleResult.flags,
      totalReports: ruleResult.totalReports,
      detectedEntity: ruleResult.detectedEntity,
      source: "gemini"
    };
  } catch (err) {
    console.warn("Gemini processing error, falling back cleanly to rule heuristics:", err);
    return ruleResult;
  }
}
