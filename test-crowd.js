import { reportScamIdentifier, getRegistry, extractEntity, getMostReportedList } from "./src/services/crowdRegistry.js";

global.localStorage = {
  _store: {},
  getItem(k) { return this._store[k] || null; },
  setItem(k, v) { this._store[k] = String(v); },
  removeItem(k) { delete this._store[k]; }
};

console.log("=== TESTING CROWDSOURCE REGISTRY & RATE LIMITING ===");

// 1. Entity extraction tests
const e1 = extractEntity("http://fake-sbi-login.apk/update", "link");
console.log("Extracted domain/apk:", e1);
if (!e1 || e1.type !== "domain") throw new Error("Entity extraction failed for domain");

const e2 = extractEntity("Call officer at 9872104918", "message");
console.log("Extracted phone:", e2);
if (!e2 || e2.type !== "phone" || e2.entity !== "9872104918") throw new Error("Entity extraction failed for phone");

const e3 = extractEntity("Send money to fraudster@okaxis", "message");
console.log("Extracted upi:", e3);
if (!e3 || e3.type !== "upi" || e3.entity !== "fraudster@okaxis") throw new Error("Entity extraction failed for UPI");

// 2. Reporting an entity
const r1 = reportScamIdentifier({ entity: "9998887776", type: "phone", category: "Fake Job Scam" });
console.log("Report 1 result:", r1.success, "Total reports:", r1.totalReports);
if (!r1.success || r1.totalReports !== 1) throw new Error("Reporting failed");

// Report same entity again
const r2 = reportScamIdentifier({ entity: "9998887776", type: "phone" });
console.log("Report 2 result:", r2.success, "Total reports:", r2.totalReports);
if (!r2.success || r2.totalReports !== 2) throw new Error("Incrementing report count failed");

// Test rate limiting: max 4 per hour
const r3 = reportScamIdentifier({ entity: "fake1@ybl", type: "upi" });
const r4 = reportScamIdentifier({ entity: "fake2@ybl", type: "upi" });
const r5 = reportScamIdentifier({ entity: "fake3@ybl", type: "upi" });
console.log("Report 5 (should be rate limited):", r5);
if (r5.success !== false || !r5.rateLimited) throw new Error("Rate limiting failed to engage");

// Test top reported list
const topList = getMostReportedList(5);
console.log("Top 5 reported entities:", topList.map(t => `${t.entity} (${t.reportsCount})`));

console.log("-> ALL REGISTRY TESTS PASSED ✓");
