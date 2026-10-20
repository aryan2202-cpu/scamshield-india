let currentUtterance = null;

export function speakResultText(textToSpeak, lang = "en", onStart = () => {}, onEnd = () => {}) {
  if (!("speechSynthesis" in window)) {
    alert("Speech synthesis is not supported on this browser.");
    return false;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  if (!textToSpeak || !textToSpeak.trim()) return false;

  const utterance = new SpeechSynthesisUtterance(textToSpeak);
  currentUtterance = utterance;

  // Language settings
  utterance.lang = lang === "hi" ? "hi-IN" : "en-IN";
  utterance.rate = 0.95; // slightly slower for clarity and elderly accessibility
  utterance.pitch = 1.0;

  // Try to pick suitable voice if loaded
  const voices = window.speechSynthesis.getVoices();
  if (voices && voices.length > 0) {
    if (lang === "hi") {
      const hiVoice = voices.find(v => v.lang.includes("hi") || v.name.toLowerCase().includes("hindi"));
      if (hiVoice) utterance.voice = hiVoice;
    } else {
      const enInVoice = voices.find(v => v.lang.includes("en-IN") || v.name.toLowerCase().includes("india"));
      if (enInVoice) utterance.voice = enInVoice;
    }
  }

  utterance.onstart = () => {
    onStart();
  };

  utterance.onend = () => {
    currentUtterance = null;
    onEnd();
  };

  utterance.onerror = (e) => {
    console.warn("Speech error:", e);
    currentUtterance = null;
    onEnd();
  };

  window.speechSynthesis.speak(utterance);
  return true;
}

export function stopSpeaking() {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
    currentUtterance = null;
  }
}

export function isCurrentlySpeaking() {
  return "speechSynthesis" in window && window.speechSynthesis.speaking;
}
