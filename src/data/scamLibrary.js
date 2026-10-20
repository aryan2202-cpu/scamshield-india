export const scamLibraryData = [
  {
    id: "fake-kyc",
    titleEn: "1. Fake Bank / SIM KYC Update Scam",
    titleHi: "1. फर्जी बैंक / सिम केवाईसी अपडेट स्कैम",
    oneLinerEn: "Scammers threaten that your bank account, SIM card, or PAN will be suspended within 24 hours unless you click a link.",
    oneLinerHi: "धोखेबाज़ 24 घंटे में बैंक खाता, सिम कार्ड या पैन बंद होने की धमकी देकर फर्जी लिंक पर क्लिक करवाते हैं।",
    exampleSender: "VK-SBINB / JM-AIRTEL",
    exampleMessage: "Dear SBI Customer, your YONO Netbanking has expired today. Your account will be blocked within 24 hours. Click here to verify your Aadhaar & PAN: http://sbi-kyc-update.apk",
    spotItEn: [
      "Mentions urgent deadline ('expires today', 'blocked in 24 hours').",
      "Asks you to download an '.apk' file or open an unofficial URL (not on onlinesbi.sbi or airtel.in).",
      "Banks and telecom operators NEVER ask you to update KYC via third-party SMS links or APK files."
    ],
    spotItHi: [
      "झूठी जल्दबाजी दिखाते हैं ('आज ही बंद हो जाएगा', '24 घंटे में ब्लॉक')।",
      "कोई '.apk' फाइल डाउनलोड करने या अनौपचारिक लिंक खोलने को कहते हैं।",
      "बैंक या सिम कंपनियां कभी भी SMS लिंक या APK फाइल से KYC अपडेट नहीं करवाती हैं।"
    ],
    goldenRuleEn: "KYC updates are ONLY done inside your official mobile banking app or by visiting your home branch physically.",
    goldenRuleHi: "केवाईसी केवल आधिकारिक बैंक ऐप में लॉग इन करके या अपनी होम ब्रांच में जाकर ही होता है।"
  },
  {
    id: "upi-collect",
    titleEn: "2. UPI 'Collect Request' & PIN Trick",
    titleHi: "2. यूपीआई 'कलेक्ट रिक्वेस्ट' और पिन की चालाकी",
    oneLinerEn: "Fraudsters send a collect request on PhonePe/GPay promising you will 'receive' prize money, cashback, or refund.",
    oneLinerHi: "ठग फोनपे या गूगल-पे पर कलेक्ट रिक्वेस्ट भेजते हैं और कहते हैं कि कैशबैक या इनाम पाने के लिए पिन डालें।",
    exampleSender: "PhonePe Notification / WhatsApp Call",
    exampleMessage: "You won ₹25,000 Diwali Reward! Tap to approve payment request from 'PhonePe-Cashback@ybl' and ENTER YOUR UPI PIN to receive ₹25,000 in your bank account.",
    spotItEn: [
      "THE GOLDEN RULE: You NEVER, EVER need to enter a UPI PIN to RECEIVE money.",
      "Entering your UPI PIN ALWAYS transfers money OUT of your bank account.",
      "The notification says 'Pay' or 'Collect' instead of 'Received'."
    ],
    spotItHi: [
      "सुनहरा नियम: पैसे प्राप्त करने के लिए आपको कभी भी यूपीआई पिन (UPI PIN) दर्ज नहीं करना पड़ता।",
      "यूपीआई पिन डालने का मतलब है कि पैसा आपके खाते से कटेगा।",
      "स्क्रीन पर 'Pay' (भुगतान करें) लिखा होता है, 'Receive' नहीं।"
    ],
    goldenRuleEn: "If someone asks you to enter your UPI PIN to claim money, it is a 100% scam. Immediately decline the request.",
    goldenRuleHi: "अगर कोई कहे कि पैसा लेने के लिए पिन डालो, तो वह 100% स्कैम है। अनुरोध तुरंत अस्वीकार (Decline) करें।"
  },
  {
    id: "fake-customer-care",
    titleEn: "3. Fake Customer Care Numbers on Google",
    titleHi: "3. गूगल सर्च पर फर्जी कस्टमर केयर नंबर",
    oneLinerEn: "Scammers upload their own mobile numbers on Google Maps or search results as helpline for Swiggy, Zomato, airlines, or banks.",
    oneLinerHi: "जालसाज स्विगी, जोमैटो, एयरलाइंस या बैंक के नाम से गूगल सर्च पर अपना मोबाइल नंबर डाल देते हैं।",
    exampleSender: "Google Search Result: 'Swiggy Refund Help 98712XXXXX'",
    exampleMessage: "Hello sir, I am speaking from Customer Support refund desk. To process your failed refund of ₹450, please install QuickSupport/AnyDesk app so we can verify your wallet session.",
    spotItEn: [
      "Legitimate enterprise companies rarely use regular 10-digit mobile numbers as support lines.",
      "The 'agent' instructs you to download AnyDesk, TeamViewer, or RustDesk to 'help you'.",
      "They ask you to transfer ₹1 or ₹5 to 'test the connection'."
    ],
    spotItHi: [
      "बड़ी कंपनियां कस्टमर सपोर्ट के लिए 10 अंकों का साधारण मोबाइल नंबर इस्तेमाल नहीं करतीं।",
      "तथाकथित एजेंट आपको AnyDesk, TeamViewer या QuickSupport ऐप इंस्टॉल करने को कहता है।",
      "वे 'चेक करने के लिए' 1 या 5 रुपये भेजने को कहते हैं।"
    ],
    goldenRuleEn: "Never search support numbers on Google. Only use the 'Help & Support' section inside the official app.",
    goldenRuleHi: "गूगल पर कभी कस्टमर केयर नंबर न खोजें। हमेशा ऐप के अंदर दिए गए सहायता (Help) विकल्प का उपयोग करें।"
  },
  {
    id: "electricity-bill",
    titleEn: "4. Electricity Bill Disconnection Threat",
    titleHi: "4. बिजली बिल न भरने पर कनेक्शन काटने की धमकी",
    oneLinerEn: "Urgent SMS claiming your home power will be disconnected at 9:30 PM tonight unless you call an unauthorized mobile number.",
    oneLinerHi: "आज रात 9:30 बजे बिजली कटने का डरावना एसएमएस, जिसमें किसी निजी मोबाइल नंबर पर कॉल करने को कहा जाता है।",
    exampleSender: "Personal Mobile / BZ-POWER",
    exampleMessage: "Dear consumer, your electricity power will be disconnected tonight at 9:30 PM from the power office because your previous month bill was not updated. Call Electricity Officer at 98102XXXXX immediately.",
    spotItEn: [
      "Electricity distribution boards (BESCOM, BSES, Tata Power, MSEDCL) never send messages from regular 10-digit mobile numbers.",
      "Government power disconnections require written legal notices with consumer account numbers, not overnight SMS.",
      "The person on the call asks you to download an app or pay via an unverified UPI ID."
    ],
    spotItHi: [
      "बिजली बोर्ड (जैसे BSES, UPPCL, TNEB) कभी किसी निजी 10 अंकों के मोबाइल नंबर से मैसेज नहीं भेजते।",
      "बिजली काटने से पहले बाकायदा लिखित नोटिस और कंज्यूमर नंबर होता है, रातों-रात SMS नहीं।",
      "कॉल करने पर वे किसी अनजान UPI पर भुगतान करने या ऐप डाउनलोड करने को कहते हैं।"
    ],
    goldenRuleEn: "Pay electricity bills only through your official electricity provider portal or trusted apps like Bharat BillPay (BBPS).",
    goldenRuleHi: "बिजली का बिल केवल आधिकारिक बिजली बोर्ड की वेबसाइट या भारत बिलपे (BBPS) समर्थित ऐप से ही भरें।"
  },
  {
    id: "digital-arrest",
    titleEn: "5. 'Digital Arrest' & Fake Police/CBI Call",
    titleHi: "5. 'डिजिटल अरेस्ट' और फर्जी पुलिस/सीबीआई कॉल",
    oneLinerEn: "Impostors pose as Mumbai/Delhi Police, CBI, or Narcotics Bureau on WhatsApp video call, showing fake police stations and uniforms.",
    oneLinerHi: "ठग व्हाट्सएप वीडियो कॉल पर पुलिस की वर्दी और फर्जी थाने का सेटअप बनाकर लोगों को घंटों डिजिटल अरेस्ट में रखते हैं।",
    exampleSender: "WhatsApp Video Call with Police Logo",
    exampleMessage: "A FedEx parcel in your name was seized at Mumbai airport with 140 grams MDMA and 5 fake passports. You are under Digital Arrest. You cannot disconnect this video call or contact family until your bank balance is audited in our RBI clearance account.",
    spotItEn: [
      "THERE IS NO LEGAL CONCEPT OF 'DIGITAL ARREST' in Indian law. Police cannot arrest anyone over WhatsApp or Skype video calls.",
      "Scammers forbid you from hanging up or telling your family or lawyer.",
      "They demand you transfer money to a 'government verification account' (which is a mule account)."
    ],
    spotItHi: [
      "भारतीय कानून में 'डिजिटल अरेस्ट' नाम की कोई चीज नहीं है! पुलिस वीडियो कॉल पर किसी को गिरफ्तार नहीं कर सकती।",
      "वे आपको कॉल काटने या परिवार/वकील को बताने से मना करते हैं।",
      "वे पैसे को 'सुरक्षित सरकारी जांच खाते' में ट्रांसफर करने की मांग करते हैं।"
    ],
    goldenRuleEn: "Hang up immediately. No police officer will ever conduct an investigation or demand money over a WhatsApp video call. Report to 1930.",
    goldenRuleHi: "तुरंत कॉल काट दें! कोई भी असली पुलिस अधिकारी वीडियो कॉल पर पूछताछ या पैसे की मांग नहीं करता। सीधे 1930 पर शिकायत करें।"
  },
  {
    id: "wfh-task-scam",
    titleEn: "6. Work-From-Home / Telegram Task Scam",
    titleHi: "6. घर बैठे काम / टेलीग्राम टास्क स्कैम",
    oneLinerEn: "Victims are lured by promises of ₹3,000–₹8,000/day for liking YouTube videos or Google reviews, then tricked into 'prepaid investment tasks'.",
    oneLinerHi: "यूट्यूब वीडियो लाइक करने के नाम पर पहले 150-500 रुपये देते हैं, फिर लाखों का 'क्रिप्टो/इन्वेस्टमेंट टास्क' में फंसा लेते हैं।",
    exampleSender: "WhatsApp Message from Unknown International Number (+62, +84, +234)",
    exampleMessage: "Hello! We offer part-time remote work. Just like 3 YouTube videos and send screenshots to earn ₹150 per video. Daily earnings ₹5,000 directly to UPI. Join Telegram channel: @DailyWealthEarners.",
    spotItEn: [
      "Initial small payments (₹150 to ₹500) are paid to win your trust.",
      "Soon they introduce 'Prepaid task' or 'Crypto trading VIP group' requiring you to deposit ₹10,000 to get ₹15,000 back.",
      "Once you deposit large sums (lakhs), they freeze the website and demand more 'tax clearance' fees."
    ],
    spotItHi: [
      "शुरुआत में विश्वास जीतने के लिए 150 से 500 रुपये सच में ट्रांसफर करते हैं।",
      "इसके बाद 'प्रीपेड टास्क' के नाम पर 5,000, 50,000 या 1 लाख जमा करने को कहते हैं।",
      "जब आप बड़ी रकम जमा करते हैं, तो विड्रॉल बंद कर देते हैं और टैक्स के नाम पर और पैसे मांगते हैं।"
    ],
    goldenRuleEn: "No legitimate company pays money for liking YouTube videos. Any job asking you to deposit money is a scam.",
    goldenRuleHi: "यूट्यूब लाइक करने के कोई पैसे नहीं देता। जिस नौकरी में आपसे पैसे मांगे जाएं, वह पूरी तरह फर्जी है।"
  },
  {
    id: "olx-army-scam",
    titleEn: "7. OLX Advance Payment / Fake Army QR Code",
    titleHi: "7. ओएलएक्स एडवांस पेमेंट / फर्जी आर्मी अफसर QR कोड",
    oneLinerEn: "A fake buyer on OLX/Quikr claims to be an Army/CISF officer getting transferred and sends a QR code to 'send you the advance payment'.",
    oneLinerHi: "ओएलएक्स पर फर्जी खरीदार खुद को आर्मी अफसर बताकर बिना मोलभाव किए एडवांस भेजने के बहाने QR कोड भेजता है।",
    exampleSender: "OLX Chat / WhatsApp",
    exampleMessage: "I want to buy your sofa immediately. I am an Army officer stationed at Pune Cantt. My military account only allows merchant QR transfers. Please scan this QR code and approve to receive ₹12,000 advance.",
    spotItEn: [
      "They send fake military ID cards, canteen cards, and uniform photos to build instant trust.",
      "They never come to inspect the item or negotiate the price.",
      "They send a QR code claiming 'Scanning this will credit money to you'. SCANNING A QR CODE ONLY DEDUCTS MONEY!"
    ],
    spotItHi: [
      "भरोसा जीतने के लिए फर्जी आर्मी आईडी कार्ड और वर्दी की तस्वीरें भेजते हैं।",
      "सामान देखने या मोलभाव करने में कोई रुचि नहीं दिखाते।",
      "वे QR कोड भेजते हैं और कहते हैं कि इसे स्कैन करने पर पैसे मिलेंगे। QR कोड स्कैन करने पर पैसा कटता है, मिलता नहीं!"
    ],
    goldenRuleEn: "Never scan a QR code to receive money. QR codes are only meant for MAKING payments.",
    goldenRuleHi: "पैसे लेने के लिए कभी QR कोड स्कैन न करें। QR कोड केवल पैसे भेजने के लिए होता है।"
  },
  {
    id: "lottery-kbc",
    titleEn: "8. Lottery / KBC WhatsApp Prize Scam",
    titleHi: "8. लॉटरी / केबीसी कौन बनेगा करोड़पति स्कैम",
    oneLinerEn: "An audio message or letter on WhatsApp claims you won a ₹25 Lakh lottery in KBC or Reliance Jio Lucky Draw.",
    oneLinerHi: "व्हाट्सएप पर अमिताभ बच्चन या केबीसी के नाम से 25 लाख की लॉटरी जीतने का फर्जी ऑडियो और पोस्टर भेजा जाता है।",
    exampleSender: "WhatsApp Voice Note with KBC Logo (+92 / +1 / Unknown)",
    exampleMessage: "Congratulations! Your mobile number has been selected in KBC All India SIM Card Lucky Draw for ₹25,00,000 cash. To claim prize, contact KBC Manager Rana Pratap on WhatsApp and pay ₹12,500 registration fee.",
    spotItEn: [
      "You cannot win a lottery you never bought a ticket for.",
      "The message demands 'processing fee', 'GST', or 'tax clearance' before releasing the prize.",
      "Legitimate lotteries never ask you to pay advance fees via UPI to an individual's account."
    ],
    spotItHi: [
      "जिस लॉटरी का आपने टिकट ही नहीं खरीदा, वह आप कभी नहीं जीत सकते।",
      "इनाम देने से पहले 'फाइल चार्ज', 'जीएसटी' या 'टैक्स' के नाम पर पैसे मांगे जाते हैं।",
      "केबीसी या जियो कभी भी व्हाट्सएप पर नकद लॉटरी नहीं बांटते।"
    ],
    goldenRuleEn: "Block and report. Any 'prize' that requires you to pay advance money first is a 100% scam.",
    goldenRuleHi: "नंबर तुरंत ब्लॉक करें। जिस इनाम को पाने के लिए पहले अपनी जेब से पैसे देने पड़ें, वह फ्रॉड है।"
  },
  {
    id: "fake-loan-app",
    titleEn: "9. Fake Instant Loan Apps & Extortion",
    titleHi: "9. फर्जी इंस्टेंट लोन ऐप और ब्लैकमेलिंग",
    oneLinerEn: "Unregistered Chinese/illegal apps offer instant loans in 5 minutes, steal your phone contacts & gallery, then blackmail you.",
    oneLinerHi: "5 मिनट में बिना दस्तावेज लोन देने वाले ऐप आपके फोन के कॉन्टैक्ट्स और फोटो चुराकर मॉर्फ्ड फोटो से ब्लैकमेल करते हैं।",
    exampleSender: "Social Media Ad / APK Link",
    exampleMessage: "Instant Loan approved up to ₹50,000 in 2 minutes! No CIBIL score required, zero interest for first 30 days. Download FastRupee app APK now: http://fastrupeeloan.apk",
    spotItEn: [
      "The app is not on Google Play Store or is offered as a direct .apk download.",
      "During installation, it demands invasive permissions: Contacts, SMS, and Photo Gallery.",
      "They disburse only a fraction (e.g. ₹3,000 for a ₹5,000 loan) and demand double repayment in just 6-7 days with abusive phone calls."
    ],
    spotItHi: [
      "ऐप गूगल प्ले स्टोर पर नहीं होता या डायरेक्ट .apk लिंक से डाउनलोड करवाया जाता है।",
      "इंस्टॉल करते समय यह कॉन्टैक्ट लिस्ट, फोटो गैलरी और एसएमएस की परमिशन मांगता है।",
      "5,000 के लोन पर सिर्फ 3,000 देते हैं और 6 दिन बाद 8,000 मांगते हुए रिश्तेदारों को मॉर्फ्ड फोटो भेजने की धमकी देते हैं।"
    ],
    goldenRuleEn: "Borrow only from RBI-registered Banks and NBFCs. Check the RBI website before taking any digital loan.",
    goldenRuleHi: "केवल आरबीआई (RBI) द्वारा मान्यता प्राप्त बैंकों और एनबीएफसी (NBFC) से ही लोन लें।"
  },
  {
    id: "courier-customs",
    titleEn: "10. Courier / Customs Parcel with Contraband",
    titleHi: "10. कूरियर / कस्टम्स पार्सल में नशीले पदार्थ का झांसा",
    oneLinerEn: "Caller claims an international FedEx/DHL courier under your Aadhaar has been detained with illegal substances.",
    oneLinerHi: "कूरियर कंपनी या कस्टम्स विभाग के नाम पर कॉल करके कहा जाता है कि आपके आधार कार्ड पर ताइवान या विदेश से ड्रग्स भेजी गई है।",
    exampleSender: "Automated IVR Call / Fake FedEx SMS",
    exampleMessage: "FedEx Notice: Parcel #FX9028 sent to Taiwan with your Aadhaar ID has been detained by Customs. Press 1 to connect to Senior Narcotics Investigation Officer immediately.",
    spotItEn: [
      "Uses automated robotic voice saying 'Your parcel is seized, press 9 to talk to executive'.",
      "They claim someone stole your Aadhaar card to send drugs or illegal passports.",
      "They quickly transfer the call to a fake 'Cyber Police' station on Skype or WhatsApp."
    ],
    spotItHi: [
      "कंप्यूटर जनरेटेड आवाज में कॉल आता है कि 'आपका पार्सल जब्त कर लिया गया है, 9 दबाएं'।",
      "वे दावा करते हैं कि आपके आधार कार्ड का उपयोग करके विदेश में ड्रग्स भेजी जा रही है।",
      "वे तुरंत फोन को किसी फर्जी 'साइबर सेल' या 'नारकोटिक्स अफसर' को ट्रांसफर करने का नाटक करते हैं।"
    ],
    goldenRuleEn: "Customs and Police do not conduct investigations or settle criminal cases through phone calls or money transfers.",
    goldenRuleHi: "कस्टम्स या पुलिस फोन पर समझौता नहीं करती। ऐसे कॉल आने पर घबराएं नहीं, कॉल काटें और 1930 पर सूचना दें।"
  }
];
