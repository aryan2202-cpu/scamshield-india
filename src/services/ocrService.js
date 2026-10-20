import { createWorker } from 'tesseract.js';

let workerInstance = null;

export async function extractTextFromImage(imageFile, onProgress = () => {}) {
  try {
    onProgress({ status: "initializing", progress: 0.1 });

    // Use createWorker from tesseract.js
    const worker = await createWorker('eng');
    
    onProgress({ status: "recognizing", progress: 0.3 });
    const ret = await worker.recognize(imageFile);
    
    onProgress({ status: "finishing", progress: 0.9 });
    const extractedText = (ret.data && ret.data.text) ? ret.data.text.trim() : "";
    
    await worker.terminate();
    onProgress({ status: "complete", progress: 1.0 });

    return {
      success: true,
      text: extractedText
    };
  } catch (err) {
    console.error("OCR extraction failed:", err);
    return {
      success: false,
      error: err.message || "Failed to read text from image",
      text: ""
    };
  }
}
