# ScamShield India (स्कैम शील्ड इंडिया)

> **Mobile-first cyber fraud & scam prevention web app for citizens across India.**

ScamShield India helps ordinary citizens, elderly family members, and non-technical users check whether an SMS, WhatsApp message, payment link, phone number, or UPI ID is a scam before they click or pay.

---

## 🚀 Features

- **Check Anything in 3 Seconds**:
  - **Message**: SMS or WhatsApp text in English, Hindi, or Hinglish.
  - **Link**: Detects APK file downloads, IP-address links, URL shorteners, and fake bank lookalikes.
  - **Phone / UPI ID**: Flags suspicious numbers and UPI handles (e.g., `winprize@ybl`).
  - **Screenshot OCR**: Extracts text from images of chat messages or payment requests using client-side OCR.
- **Verdict & Risk Score**: `SAFE` (0-24), `SUSPICIOUS` (25-59), or `LIKELY SCAM` (60-100) with clear plain-language reasons and immediate action steps.
- **Emergency Flow**:
  - Tap-to-call **1930** (National Cyber Crime Helpline).
  - 24x7 Bank emergency fraud helplines directory (SBI, HDFC, ICICI, Axis, PNB, Kotak, Paytm).
  - Direct portal link to **cybercrime.gov.in**.
  - Evidence preservation checklist (12-digit UTR, chat screenshots, bank SMS).
- **10 Common Indian Scams Library**: Real-world examples, spotting tips, and golden rules for Fake KYC, UPI Collect, Fake Google Support, Electricity Disconnection, Digital Arrest, WFH Job Bait, OLX Army QR Code, Lottery/KBC, Illegal Loan Apps, and Courier Contraband.
- **Crowdsourced Scam Registry**: Real-time identifier reporting with anti-abuse rate limiting and a "Most Reported This Week" dashboard.
- **Accessibility & Privacy**:
  - Full English & Hindi (`हिंदी`) language toggle.
  - Text-to-Speech (TTS) read result aloud.
  - One-tap WhatsApp warning message sharing.
  - 100% device-only history and zero message logging on servers.
  - PWA Ready: Installable on Android & iOS home screens.

---

## 🛠️ Deployment Instructions

### 1. Deploy to Vercel (Recommended)
1. Push this repository to GitHub or GitLab.
2. Go to [vercel.com](https://vercel.com) and import the project.
3. Framework preset: **Vite**.
4. Build command: `npm run build`.
5. Output directory: `dist`.
6. *(Optional)* Add Environment Variable:
   - `VITE_GEMINI_API_KEY`: Your Google AI Studio Gemini API Key. (If omitted, the local rule-based heuristic engine works out of the box with zero dependencies).
7. Click **Deploy**. `vercel.json` is already pre-configured for SPA routing and security headers.

### 2. Deploy to Netlify
1. Connect your repo on [netlify.com](https://netlify.com).
2. Netlify will automatically detect [`netlify.toml`](file:///C:/Users/Aryan/Documents/SCAMMMM/netlify.toml).
3. Click **Deploy Site**.

### 3. Deploy via Docker / Static Hosting
Build the static files:
```bash
npm run build
```
Serve the `dist/` folder using Nginx, Apache, Caddy, or any static file server.

---

## 🧪 Local Development & Testing

```bash
# Install dependencies
npm install

# Run local development server
npm run dev

# Run automated heuristic & crowdsource tests
node test-analyzer.js
node test-crowd.js

# Build production bundle
npm run build

# Preview production build locally
npm run preview
```
