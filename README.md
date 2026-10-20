# ScamShield India

**Live Link:** [https://scamshield-check-india.vercel.app/](https://scamshield-check-india.vercel.app/)

ScamShield India is a mobile-first web app designed to protect ordinary citizens, elderly users, and non-technical people across India from cyber fraud, fake KYC threats, UPI collect traps, phishing links, and digital arrest calls.

---

## What It Does

- **Check Something (Scam Scanner):** Instantly analyzes SMS, WhatsApp messages, URLs/domains, phone numbers, and UPI IDs for scam indicators with a risk score (0–100), plain-language reasons, and recommended action steps.
- **Screenshot OCR:** Upload or photograph a message or payment request to automatically extract text and run detection.
- **Scam Library:** Educational breakdown of the 10 most common Indian scams (Fake KYC, UPI Collect, Fake Google Helplines, Electricity Cut threats, Digital Arrest, WFH/Telegram task scams, OLX Army QR codes, Lottery/KBC bait, Fake loan apps, and Courier parcel fraud) with spotting tips and realistic examples.
- **Emergency Flow:** Calm, step-by-step triage for victims who have already paid or are under pressure, featuring tap-to-call for the **National Cyber Crime Helpline 1930**, bank fraud contact numbers, a link to [cybercrime.gov.in](https://cybercrime.gov.in), and an evidence checklist.
- **Bilingual & Accessible:** Full support for both **English and Hindi (`हिंदी`)**, text-to-speech voice readouts, one-tap WhatsApp warning sharing, and device-only history storage with zero server-side logging of personal messages.

---

## Tech Stack

- **Framework:** React 19
- **Build Tool:** Vite 8
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`)
- **Icons:** Lucide React
- **OCR Engine:** Tesseract.js (in-browser client-side OCR for screenshots)
- **Voice / Accessibility:** Web Speech API (`SpeechSynthesis`)
- **AI / Analysis Engine:** Hybrid deterministic heuristic rule engine + optional Google Gemini AI (`VITE_GEMINI_API_KEY`)
- **Storage & Privacy:** Browser `localStorage` (client-side only)

---

## How to Run Locally

### Prerequisites
- Node.js (v18+ or v20+)
- npm

### Steps

1. **Clone the repository and install dependencies:**
   ```bash
   git clone <repository-url>
   cd SCAMMMM
   npm install
   ```

2. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview the production build:**
   ```bash
   npm run preview
   ```
