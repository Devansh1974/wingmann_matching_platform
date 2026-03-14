/**
 * Keyword Matching Module (Step 2)
 *
 * Implements dictionary-based classification. Keyword matching immediately returns a 
 * category if any token matches, handling the majority of inputs quickly.
 *
 * @param {string[]} tokens - Array of preprocessed words
 * @param {Object} categories - The dictionary of category keyword arrays
 * @returns {string|null} The matched category name or null if no exact match.
 */
function keywordMatch(tokens, categories) {
  if (!tokens || tokens.length === 0) return null;

  for (const token of tokens) {
    for (const [category, keywords] of Object.entries(categories)) {
      if (keywords.includes(token)) {
        return category; // Immediate match
      }
    }
  }

  return null;
}

module.exports = { keywordMatch };
