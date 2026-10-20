export const translations = {
  en: {
    appName: "ScamShield India",
    tagline: "Check before you click or pay",
    heroDesc: "A safe, calm tool for Indian citizens to verify suspicious SMS, WhatsApp messages, UPI payment requests, links, or calls.",
    privacyPledge: "Zero-logging pledge: Your messages are checked instantly on your device and never saved on servers.",
    
    // Tabs
    tabMessage: "Message",
    tabLink: "Link / URL",
    tabPhoneUpi: "Phone / UPI ID",
    tabScreenshot: "Screenshot OCR",
    
    // Inputs & Placeholders
    msgPlaceholder: "Paste suspicious SMS, WhatsApp message, or email here (English, Hindi, or Hinglish)...",
    linkPlaceholder: "Paste link here (e.g. https://sbi-kyc-verify.apk or http://bit.ly/claim)...",
    phoneUpiPlaceholder: "Type phone number or UPI ID (e.g. 9876543210 or reward@ybl)...",
    screenshotTitle: "Check a screenshot",
    screenshotDesc: "Upload an image of a message, WhatsApp chat, or payment request. Text will be extracted automatically.",
    uploadPrompt: "Tap to take a photo or select screenshot",
    extractingText: "Reading text from image...",
    extractedSuccess: "Text extracted! Review or edit below, then tap Check.",
    
    // Buttons
    btnCheck: "Check for Scam",
    btnChecking: "Analyzing carefully...",
    btnTryExample: "Try an Example",
    btnEmergency: "I already paid / I'm being pressured right now",
    btnReadAloud: "Read aloud",
    btnStopAudio: "Stop listening",
    btnShareWarning: "Share warning on WhatsApp",
    btnReportScam: "Report this to warn others",
    btnReported: "Reported",
    btnViewHistory: "Past Checks",
    btnClearHistory: "Clear History",
    
    // Verdicts
    verdictSafe: "SAFE / LOW RISK",
    verdictSuspicious: "SUSPICIOUS / BE CAUTIOUS",
    verdictScam: "LIKELY SCAM / DANGER",
    riskScoreLabel: "Risk Score",
    reasonsTitle: "Why this was flagged:",
    whatToDoTitle: "What you should do right now:",
    disclaimer: "Guidance note: This is automated guidance, not an absolute guarantee. When in doubt, call your bank on the official number printed on the back of your debit card.",
    
    // Navigation
    navCheck: "Check",
    navLibrary: "Scam Library",
    navReported: "Trending Reports",
    navEmergency: "Emergency Help",
    
    // Emergency
    emergencyTitle: "Stay Calm — Emergency Fraud Response",
    emergencySubtitle: "Every minute counts. Follow these 5 clear steps right now to protect your remaining money.",
    step1Title: "1. Freeze your account / card immediately",
    step1Desc: "Call your bank's 24x7 fraud number to block your debit card, netbanking, or UPI. Do this BEFORE filing police reports.",
    step2Title: "2. Call National Cyber Crime Helpline: 1930",
    step2Desc: "Dial 1930 immediately. It alerts banks in real time to freeze the scammer's bank account before they withdraw cash.",
    call1930: "Call Helpline 1930 Now",
    step3Title: "3. File complaint on cybercrime.gov.in",
    step3Desc: "Submit an online complaint on the official Ministry of Home Affairs cyber portal within 24 hours.",
    visitPortal: "Open cybercrime.gov.in",
    step4Title: "4. Preserve all evidence",
    step4Desc: "Take screenshots of chats, save caller numbers, note the 12-digit UTR/UPI reference ID and SMS alerts.",
    step5Title: "5. Beware of secondary scams",
    step5Desc: "NEVER pay anyone claiming to be a 'recovery agent' or 'cyber lawyer' on Telegram/Instagram to get your money back. Official police never ask for money to investigate.",
    
    // Crowdsource Registry
    reportedByBadge: "Reported by {count} people in India as suspicious",
    reportModalTitle: "Report this identifier",
    reportModalDesc: "Only the phone number, UPI ID, or domain is stored to warn fellow citizens. Message content is NOT saved.",
    reportSuccess: "Thank you! Your report has been added to warn others.",
    rateLimitMsg: "You have already submitted reports recently. Thank you for protecting the community!",
    
    // Library
    libraryTitle: "10 Most Common Scams in India",
    libraryDesc: "Real examples and simple tricks to spot them before you lose money.",
    spotIt: "How to spot it:",
    realExample: "Real-looking example:",
    actionTip: "Golden Rule:",
    testInScanner: "Test this in Scanner",
    
    // Trending
    trendingTitle: "Most Reported This Week",
    trendingDesc: "Suspicious numbers, UPI handles, and fake websites reported by vigilant citizens across India.",
    
    // Settings / API
    apiKeyNotice: "Powered by Hybrid Rules + Gemini AI. Add your own Gemini API key for enhanced reasoning (optional)."
  },
  
  hi: {
    appName: "स्कैम शील्ड इंडिया (ScamShield)",
    tagline: "क्लिक या भुगतान करने से पहले जांचें",
    heroDesc: "संदिग्ध एसएमएस, व्हाट्सएप संदेश, यूपीआई अनुरोध, लिंक या फोन कॉल की जांच करने का सरल और सुरक्षित माध्यम।",
    privacyPledge: "शून्य-डेटा गारंटी: आपका संदेश आपके फ़ोन पर तुरंत जांचा जाता है और सर्वर पर कभी सेव नहीं होता।",
    
    // Tabs
    tabMessage: "संदेश (SMS/WhatsApp)",
    tabLink: "लिंक (URL)",
    tabPhoneUpi: "फ़ोन / UPI ID",
    tabScreenshot: "स्क्रीनशॉट OCR",
    
    // Inputs & Placeholders
    msgPlaceholder: "संदिग्ध SMS, व्हाट्सएप मैसेज या ईमेल यहाँ पेस्ट करें (हिंदी, हिंग्लिश या अंग्रेज़ी)...",
    linkPlaceholder: "संदिग्ध लिंक यहाँ पेस्ट करें (जैसे https://sbi-kyc-verify.apk या bit.ly)...",
    phoneUpiPlaceholder: "फ़ोन नंबर या UPI ID लिखें (जैसे 9876543210 या reward@ybl)...",
    screenshotTitle: "स्क्रीनशॉट की जांच करें",
    screenshotDesc: "संदेश, व्हाट्सएप चैट या भुगतान अनुरोध का फोटो अपलोड करें। टेक्स्ट अपने-आप पढ़ लिया जाएगा।",
    uploadPrompt: "फोटो खींचें या स्क्रीनशॉट चुनें",
    extractingText: "चित्र से टेक्स्ट पढ़ा जा रहा है...",
    extractedSuccess: "टेक्स्ट सफलतापूर्वक निकाला गया! नीचे जांचें और 'जांचें' बटन दबाएं।",
    
    // Buttons
    btnCheck: "स्कैम की जांच करें",
    btnChecking: "जांच जारी है...",
    btnTryExample: "उदाहरण देखें",
    btnEmergency: "मैंने पैसे भेज दिए हैं / मुझ पर दबाव डाला जा रहा है",
    btnReadAloud: "आवाज़ में सुनें",
    btnStopAudio: "रोकें",
    btnShareWarning: "व्हाट्सएप पर चेतावनी भेजें",
    btnReportScam: "स्कैम की रिपोर्ट करें",
    btnReported: "रिपोर्ट दर्ज हुई",
    btnViewHistory: "पिछली जांचें",
    btnClearHistory: "इतिहास मिटाएं",
    
    // Verdicts
    verdictSafe: "सुरक्षित / कम जोखिम",
    verdictSuspicious: "संदिग्ध / सावधान रहें",
    verdictScam: "धोखाधड़ी / स्कैम (खतरा)",
    riskScoreLabel: "जोखिम स्कोर",
    reasonsTitle: "यह क्यों संदिग्ध है:",
    whatToDoTitle: "अब आपको तुरंत क्या करना चाहिए:",
    disclaimer: "महत्वपूर्ण सलाह: यह एक स्वचालित मार्गदर्शन है, कोई अंतिम गारंटी नहीं। संदेह होने पर अपने बैंक के डेबिट कार्ड के पीछे लिखे आधिकारिक नंबर पर ही कॉल करें।",
    
    // Navigation
    navCheck: "जांचें",
    navLibrary: "स्कैम लाइब्रेरी",
    navReported: "रिपोर्ट किए गए नंबर",
    navEmergency: "आपातकालीन मदद",
    
    // Emergency
    emergencyTitle: "शांत रहें — आपातकालीन मदद",
    emergencySubtitle: "हर मिनट महत्वपूर्ण है। अपने बाकी पैसे सुरक्षित रखने के लिए अभी ये 5 कदम उठाएं।",
    step1Title: "1. तुरंत अपना बैंक खाता / कार्ड ब्लॉक कराएं",
    step1Desc: "अपने बैंक के 24x7 फ्रॉड हेल्पलाइन नंबर पर कॉल करके तुरंत डेबिट कार्ड, नेटबैंकिंग और यूपीआई बंद कराएं।",
    step2Title: "2. राष्ट्रीय साइबर क्राइम हेल्पलाइन: 1930 पर कॉल करें",
    step2Desc: "तुरंत 1930 डायल करें। यह प्रणाली जालसाज के खाते को तत्काल फ्रीज करने के लिए बैंकों को सतर्क करती है।",
    call1930: "हेल्पलाइन 1930 पर कॉल करें",
    step3Title: "3. cybercrime.gov.in पर शिकायत दर्ज करें",
    step3Desc: "गृह मंत्रालय के आधिकारिक साइबर पोर्टल पर 24 घंटे के भीतर ऑनलाइन शिकायत दर्ज करें।",
    visitPortal: "cybercrime.gov.in खोलें",
    step4Title: "4. सभी सबूत सुरक्षित रखें",
    step4Desc: "चैट के स्क्रीनशॉट, जालसाज का नंबर, बैंक का एसएमएस और 12 अंकों का UTR/UPI रेफरेंस नंबर सुरक्षित रखें।",
    step5Title: "5. 'पैसे वापस दिलाने' वाले ठगों से बचें",
    step5Desc: "टेलीग्राम या इंस्टाग्राम पर खुद को 'रिकवरी एजेंट' या 'साइबर वकील' बताने वाले किसी भी व्यक्ति को पैसे न दें। पुलिस पैसे नहीं मांगती।",
    
    // Crowdsource Registry
    reportedByBadge: "भारत में {count} लोगों द्वारा संदिग्ध रिपोर्ट किया गया",
    reportModalTitle: "इस नंबर/आईडी की रिपोर्ट करें",
    reportModalDesc: "नागरिकों को सतर्क करने के लिए केवल फ़ोन नंबर, UPI ID या वेबसाइट का नाम सुरक्षित किया जाता है। व्यक्तिगत संदेश सुरक्षित नहीं होता।",
    reportSuccess: "धन्यवाद! आपकी रिपोर्ट दर्ज कर ली गई है।",
    rateLimitMsg: "आप हाल ही में रिपोर्ट कर चुके हैं। समुदाय की सुरक्षा के लिए धन्यवाद!",
    
    // Library
    libraryTitle: "भारत के 10 सबसे आम स्कैम",
    libraryDesc: "पैसे गंवाने से पहले इन धोखाधड़ी के तरीकों को पहचानना सीखें।",
    spotIt: "इसे कैसे पहचानें:",
    realExample: "असली जैसा दिखने वाला उदाहरण:",
    actionTip: "सुनहरा नियम:",
    testInScanner: "स्कैनर में टेस्ट करें",
    
    // Trending
    trendingTitle: "इस सप्ताह सबसे ज्यादा रिपोर्ट किए गए",
    trendingDesc: "जागरूक नागरिकों द्वारा रिपोर्ट किए गए संदिग्ध नंबर, UPI आईडी और फर्जी वेबसाइटें।",
    
    // Settings / API
    apiKeyNotice: "स्मार्ट रूल्स + जेमिनी एआई द्वारा संचालित। उन्नत विश्लेषण के लिए अपनी जेमिनी एपीआई की (Gemini API Key) जोड़ सकते हैं।"
  }
};
