const stringSimilarity = require("string-similarity");

/**
 * Performs fuzzy matching to detect similar words against the keyword dictionary.
 * Requires a similarity score of > 0.7 to return a match.
 *
 * @param {string[]} userTokens - Array of preprocessed words from the user.
 * @param {Object} categories - The dictionary of category keyword arrays.
 * @returns {string|null} The matched category name or null if no match > 0.7.
 */
function fuzzyMatch(userTokens, categories) {
  if (!userTokens || userTokens.length === 0) return null;

  let bestCategoryMatch = null;
  let highestSimilarity = 0;
  const SIMILARITY_THRESHOLD = 0.7;

  // Flatten the category dictionary into a searchable array map
  const categoryKeys = Object.keys(categories);
  
  for (const token of userTokens) {
    for (const category of categoryKeys) {
      const keywords = categories[category];
      
      // Compare the token against every keyword in this category
      const matchData = stringSimilarity.findBestMatch(token, keywords);
      const bestMatchScore = matchData.bestMatch.rating;

      if (bestMatchScore > highestSimilarity) {
        highestSimilarity = bestMatchScore;
        bestCategoryMatch = category;
      }
    }
  }

  if (highestSimilarity > SIMILARITY_THRESHOLD) {
    return bestCategoryMatch;
  }

  return null;
}

module.exports = { fuzzyMatch };
