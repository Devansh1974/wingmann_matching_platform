const { NLP_CATEGORIES } = require('./matchingRules');
const { preprocessText } = require('./textPreprocess');
const { keywordMatch } = require('./keywordMatch');
const { fuzzyMatch } = require('./fuzzyMatch');
const { cosineSimilarity } = require('./vectorSimilarity');
const { getEmbeddings, getCategoryEmbeddingsCache } = require('./embeddingClassifier');

// In-Memory cache using ES6 Map for lightning-fast repeat processing
const classificationCache = new Map();

/**
 * STEP 4: AI Semantic Embedding Fallback
 * Orchestrates mapping the raw answer through HuggingFace semantics. 
 *
 * @param {string} rawInput 
 * @returns {Promise<string|null>} The winning category or null if it fails.
 */
async function semanticClassification(rawInput) {
  const categoryEmbeddingsCache = getCategoryEmbeddingsCache();
  
  // Abort if the dictionary embeddings failed to boot, or missing HF Key.
  if (!categoryEmbeddingsCache) return null;

  // Generate vector block for the user string
  const vectorResponse = await getEmbeddings([rawInput]);
  if (!vectorResponse || vectorResponse.length === 0) return null;

  // Assume single response array index 0
  const userVec = vectorResponse[0];
  let bestCategory = null;
  let highestSimilarity = -1;

  for (const [category, categoryVec] of Object.entries(categoryEmbeddingsCache)) {
    const similarity = cosineSimilarity(userVec, categoryVec);
    if (similarity > highestSimilarity) {
      highestSimilarity = similarity;
      bestCategory = category;
    }
  }

  return bestCategory;
}

/**
 * Orchestrates the full Hybrid NLP Pipeline logic in prioritizing order.
 * Flow: Memory Cache -> Preprocess -> Keyword Map -> Fuzzy Matcher -> HF Fallback (Slow)
 * 
 * @param {string} rawInput 
 * @returns {Promise<{category: string, method: string}>}
 */
async function classifyAnswer(rawInput) {
  const fallbackResult = { category: "communication", method: "default" };

  if (!rawInput || typeof rawInput !== 'string') return fallbackResult;

  // STEP 0: Check memory (Sub-millisecond resolution)
  const normalizedKey = rawInput.toLowerCase().trim();
  if (classificationCache.has(normalizedKey)) {
    return classificationCache.get(normalizedKey);
  }

  // STEP 1: Text Preprocessing
  const tokens = preprocessText(rawInput);
  if (tokens.length === 0) return fallbackResult;

  // STEP 2: Strict Keyword Matches (Extremely Fast O(N))
  const exactCategory = keywordMatch(tokens, NLP_CATEGORIES);
  if (exactCategory) {
    const result = { category: exactCategory, method: "keyword" };
    classificationCache.set(normalizedKey, result);
    return result;
  }

  // STEP 3: String Similarity (Fuzzy Math Fastish)
  const fuzzyCategory = fuzzyMatch(tokens, NLP_CATEGORIES);
  if (fuzzyCategory) {
    const result = { category: fuzzyCategory, method: "fuzzy" };
    classificationCache.set(normalizedKey, result);
    return result;
  }

  // STEP 4: Embedding Classification via HuggingFace (API Slowest)
  const semanticCategory = await semanticClassification(rawInput);
  if (semanticCategory) {
    const result = { category: semanticCategory, method: "embedding" };
    console.log(`[NLP] Semantic fallback consumed on -> "${rawInput}"`);
    classificationCache.set(normalizedKey, result);
    return result;
  }

  // STEP 5: Guaranteed Fallback
  classificationCache.set(normalizedKey, fallbackResult);
  return fallbackResult;
}

module.exports = { classifyAnswer };
