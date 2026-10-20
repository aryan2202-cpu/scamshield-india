// Initial seed data reflecting actual real-world scam indicators reported to authorities
const SEED_REGISTRY = [
  {
    id: "rep-1",
    entity: "sbi-kyc-verify.apk",
    type: "domain",
    category: "Fake KYC Phishing APK",
    reportsCount: 428,
    lastReported: "2026-10-20T14:32:00Z"
  },
  {
    id: "rep-2",
    entity: "cashback-rewards@ybl",
    type: "upi",
    category: "UPI Collect Request Fraud",
    reportsCount: 312,
    lastReported: "2026-10-20T17:15:00Z"
  },
  {
    id: "rep-3",
    entity: "9872104918",
    type: "phone",
    category: "Electricity Power Cut Threat",
    reportsCount: 289,
    lastReported: "2026-10-20T19:40:00Z"
  },
  {
    id: "rep-4",
    entity: "8291044921",
    type: "phone",
    category: "Digital Arrest / Fake Police Video Call",
    reportsCount: 194,
    lastReported: "2026-10-20T11:05:00Z"
  },
  {
    id: "rep-5",
    entity: "indiapost-parcel-redelivery-address.online",
    type: "domain",
    category: "Fake Postal Parcel Phishing",
    reportsCount: 175,
    lastReported: "2026-10-19T22:10:00Z"
  },
  {
    id: "rep-6",
    entity: "winprize@ybl",
    type: "upi",
    category: "Diwali Lottery / KBC Collect Scam",
    reportsCount: 156,
    lastReported: "2026-10-20T08:20:00Z"
  },
  {
    id: "rep-7",
    entity: "fastrupeeloan.apk",
    type: "domain",
    category: "Predatory Illegal Loan App",
    reportsCount: 142,
    lastReported: "2026-10-18T16:45:00Z"
  },
  {
    id: "rep-8",
    entity: "9821304812",
    type: "phone",
    category: "Fake Google Customer Care / AnyDesk",
    reportsCount: 118,
    lastReported: "2026-10-19T13:25:00Z"
  },
  {
    id: "rep-9",
    entity: "army-canteen-advance@oksbi",
    type: "upi",
    category: "OLX Army Personnel QR Scam",
    reportsCount: 97,
    lastReported: "2026-10-20T04:15:00Z"
  },
  {
    id: "rep-10",
    entity: "t.me/EarnDailyOnlineIndia",
    type: "domain",
    category: "YouTube Like Task Investment Fraud",
    reportsCount: 84,
    lastReported: "2026-10-20T18:00:00Z"
  }
];

const STORAGE_KEY = "scamshield_crowd_registry";
const RATE_LIMIT_KEY = "scamshield_report_rate_limit";
const MAX_REPORTS_PER_HOUR = 4;

export function getRegistry() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_REGISTRY));
      return SEED_REGISTRY;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading registry:", err);
    return SEED_REGISTRY;
  }
}

export function saveRegistry(registry) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(registry));
  } catch (err) {
    console.error("Error saving registry:", err);
  }
}

export function extractEntity(input, tabType = "message") {
  if (!input || typeof input !== "string") return null;
  const trimmed = input.trim();

  // Check UPI format: name@bank
  const upiMatch = trimmed.match(/[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}/);
  if (upiMatch) {
    return { entity: upiMatch[0].toLowerCase(), type: "upi" };
  }

  // Check URL / Domain
  const urlMatch = trimmed.match(/(?:https?:\/\/)?(?:www\.)?([a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+(?:\/[^\s]*)?)/i);
  if (urlMatch && (tabType === "link" || trimmed.includes("http") || trimmed.includes(".com") || trimmed.includes(".in") || trimmed.includes(".apk") || trimmed.includes(".online") || trimmed.includes(".info") || trimmed.includes(".xyz"))) {
    try {
      let hostname = urlMatch[1].split('/')[0].toLowerCase();
      // If ends with .apk or specific path
      if (urlMatch[0].includes(".apk")) {
        const apkPart = urlMatch[0].replace(/^https?:\/\//, '').split(/[?#]/)[0];
        return { entity: apkPart.toLowerCase(), type: "domain" };
      }
      return { entity: hostname, type: "domain" };
    } catch {
      // fallback
    }
  }

  // Check 10-digit Indian mobile number
  const phoneDigits = trimmed.replace(/\D/g, '');
  if (phoneDigits.length === 10 && ['6', '7', '8', '9'].includes(phoneDigits[0])) {
    return { entity: phoneDigits, type: "phone" };
  }
  if (phoneDigits.length === 12 && phoneDigits.startsWith('91')) {
    const local = phoneDigits.slice(2);
    if (['6', '7', '8', '9'].includes(local[0])) {
      return { entity: local, type: "phone" };
    }
  }

  // If in phone tab, try stripping all non-digits
  if (tabType === "phone" && phoneDigits.length >= 10) {
    return { entity: phoneDigits.slice(-10), type: "phone" };
  }

  return null;
}

export function checkRegistryForMatches(inputText, tabType = "message") {
  if (!inputText) return { match: null, totalReports: 0 };
  const registry = getRegistry();
  const normalized = inputText.toLowerCase();

  // Find exact entity or substring
  for (const item of registry) {
    const ent = item.entity.toLowerCase();
    // For phone: check both exact number and digits
    if (item.type === "phone") {
      const cleanEnt = ent.replace(/\D/g, '');
      const inputDigits = normalized.replace(/\D/g, '');
      if (inputDigits.includes(cleanEnt)) {
        return { match: item, totalReports: item.reportsCount };
      }
    } else {
      if (normalized.includes(ent)) {
        return { match: item, totalReports: item.reportsCount };
      }
    }
  }

  return { match: null, totalReports: 0 };
}

export function reportScamIdentifier({ entity, type, category = "Reported Citizen Alert" }) {
  // Check rate limit per device
  const now = Date.now();
  let rateLogs = [];
  try {
    const stored = localStorage.getItem(RATE_LIMIT_KEY);
    if (stored) {
      rateLogs = JSON.parse(stored).filter(ts => now - ts < 60 * 60 * 1000); // past 1 hour
    }
  } catch (err) {
    rateLogs = [];
  }

  if (rateLogs.length >= MAX_REPORTS_PER_HOUR) {
    return {
      success: false,
      rateLimited: true,
      message: "Device rate limit reached. Max 4 reports per hour to prevent spam."
    };
  }

  // Clean entity
  const clean = entity.trim().toLowerCase();
  const registry = getRegistry();
  const existingIndex = registry.findIndex(r => r.entity.toLowerCase() === clean);

  let updatedRecord;
  if (existingIndex >= 0) {
    registry[existingIndex].reportsCount += 1;
    registry[existingIndex].lastReported = new Date().toISOString();
    updatedRecord = registry[existingIndex];
  } else {
    updatedRecord = {
      id: "rep-" + Date.now(),
      entity: clean,
      type: type || "identifier",
      category,
      reportsCount: 1,
      lastReported: new Date().toISOString()
    };
    registry.unshift(updatedRecord);
  }

  saveRegistry(registry);

  // Update rate logs
  rateLogs.push(now);
  try {
    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(rateLogs));
  } catch {}

  return {
    success: true,
    record: updatedRecord,
    totalReports: updatedRecord.reportsCount
  };
}

export function getMostReportedList(limit = 10) {
  const registry = getRegistry();
  return [...registry]
    .sort((a, b) => b.reportsCount - a.reportsCount)
    .slice(0, limit);
}
