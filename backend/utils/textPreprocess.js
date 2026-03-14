/**
 * Normalizes user input before classification.
 * Converts to lowercase, removes punctuation, trims whitespace, and tokenizes into words.
 *
 * @param {string} text - The raw user input.
 * @returns {string[]} Array of normalized tokens.
 */
function preprocessText(text) {
  if (!text || typeof text !== 'string') return [];

  return text
    .toLowerCase()
    .replace(/[^\w\s]|_/g, "") // Remove punctuation
    .replace(/\s+/g, " ")      // Replace multiple spaces with a single space
    .trim()
    .split(" ")                // Tokenize by space
    .filter(token => token.length > 0);
}

module.exports = { preprocessText };
