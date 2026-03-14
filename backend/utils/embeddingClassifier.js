const { HfInference } = require('@huggingface/inference');

// Initialize HuggingFace client conditionally
// Provide fallback so server boot doesn't crash on missing key
const key = process.env.HF_API_KEY || 'dummy_missing_key';
const hf = new HfInference(key);

// Fallback safety to track API status
let apiIsWorking = !!process.env.HF_API_KEY;

// Category descriptions acting as precomputed semantic anchors
const CATEGORY_DESCRIPTIONS = {
  emotional: "love, care, compassion, emotional support and kindness in relationships",
  trust: "honesty, loyalty, trustworthiness, faithfulness and reliability in a partner",
  communication: "open communication, listening, emotional understanding and expressing feelings",
  respect: "mutual respect, equality, independence and healthy boundaries",
  growth: "personal growth, teamwork and supporting each other's goals",
  fun: "chemistry, humor, adventure and shared experiences",
  stability: "commitment, safety, consistency and long term partnership"
};

// In-memory cache for computed category embeddings to optimize inference speed
let categoryEmbeddingsCache = null;

// Constant model identifier mapping to local model spec
const EMBEDDING_MODEL = 'sentence-transformers/all-MiniLM-L6-v2';

/**
 * Calls HuggingFace Inference API to generate a vector for a string.
 * Uses all-MiniLM-L6-v2 for extremely fast, robust English semantic mappings.
 * 
 * @param {string[]} inputs - Array of string sequences to convert to vectors
 * @returns {Promise<number[][]|null>}
 */
async function getEmbeddings(inputs) {
  if (!apiIsWorking) return null;

  try {
    const response = await hf.featureExtraction({
      model: EMBEDDING_MODEL,
      inputs: inputs
    });

    // Handle structural differences depending on exact request format
    return response;
  } catch (error) {
    console.error("HuggingFace Embedding API Error:", error.message);
    apiIsWorking = false; // Graceful degradation threshold
    return null;
  }
}

/**
 * Pre-computes and caches the embeddings for all category descriptions during Server Startup.
 * Dramatically reduces total API calls to Hugging Face.
 */
async function loadCategoryEmbeddings() {
  if (categoryEmbeddingsCache) return;
  if (!process.env.HF_API_KEY) {
    console.warn("⚠️ Skipping HuggingFace category load (Missing HF_API_KEY in .env)");
    return;
  }

  const keys = Object.keys(CATEGORY_DESCRIPTIONS);
  const descriptions = keys.map(k => CATEGORY_DESCRIPTIONS[k]);
  
  const embeddings = await getEmbeddings(descriptions);
  if (!embeddings) return;

  categoryEmbeddingsCache = {};
  keys.forEach((key, index) => {
    // Some inference versions return raw flat arrays, some return arrays of arrays
    categoryEmbeddingsCache[key] = embeddings[index];
  });
  console.log(`✅ Precomputed HuggingFace Categorical Embeddings loaded in memory via ${EMBEDDING_MODEL}`);
}

/**
 * Gets the raw array data for categorical embeddings.
 * Used for vector similarity math.
 * 
 * @returns {Object|null}
 */
function getCategoryEmbeddingsCache() {
  return categoryEmbeddingsCache;
}

module.exports = {
  getEmbeddings,
  loadCategoryEmbeddings,
  getCategoryEmbeddingsCache
};
