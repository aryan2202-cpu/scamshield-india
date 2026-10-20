// Node verification test for analyzer heuristics & samples
import { analyzeWithRules } from "./src/services/analyzer.js";
import { sampleExamples } from "./src/data/sampleExamples.js";
import { checkRegistryForMatches, reportScamIdentifier, getRegistry } from "./src/services/crowdRegistry.js";

// Mock localStorage for node environment
global.localStorage = {
  _store: {},
  getItem(k) { return this._store[k] || null; },
  setItem(k, v) { this._store[k] = String(v); },
  removeItem(k) { delete this._store[k]; }
};

console.log("=== RUNNING SCAMSHIELD ANALYZER VERIFICATION ===");

let passed = 0;
let failed = 0;

sampleExamples.forEach((sample, idx) => {
  const result = analyzeWithRules(sample.text, sample.suggestedTab, "en");
  console.log(`\n[Test ${idx + 1}] ${sample.titleEn} (${sample.category})`);
  console.log(`- Expected Category: ${sample.category}`);
  console.log(`- Actual Verdict:    ${result.verdict} (Score: ${result.score}/100)`);
  console.log(`- Reasons Count:     ${result.reasons.length}`);
  console.log(`- Sample Reason:     "${result.reasons[0]}"`);
  console.log(`- What to do Count:  ${result.whatToDo.length}`);
  console.log(`- Flags:             ${result.flags.join(", ")}`);

  // Verification checks
  let isMatch = false;
  if (sample.category === "SCAM" && result.verdict === "LIKELY SCAM") isMatch = true;
  if (sample.category === "SUSPICIOUS" && (result.verdict === "SUSPICIOUS" || result.verdict === "LIKELY SCAM")) isMatch = true;
  if (sample.category === "SAFE" && result.verdict === "SAFE") isMatch = true;

  if (isMatch) {
    console.log("-> PASS ✓");
    passed++;
  } else {
    console.error("-> FAIL ✗ (Verdict mismatch)");
    failed++;
  }
});

console.log(`\nVerification Summary: ${passed} Passed, ${failed} Failed.`);
if (failed > 0) process.exit(1);
