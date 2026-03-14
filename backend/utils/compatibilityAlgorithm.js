const { MATCHING_RULES, QUESTION_WEIGHTS, NLP_CATEGORIES, NLP_RELATED_CATEGORIES } = require('./matchingRules');

// Simple NLP Category matcher
function categorizeQ5(answer) {
  if (!answer) return null;
  const lowerAnswer = answer.toLowerCase();
  for (const [category, keywords] of Object.entries(NLP_CATEGORIES)) {
    for (const kw of keywords) {
      if (lowerAnswer.includes(kw.toLowerCase())) {
        return category;
      }
    }
  }
  return null; // No match found
}

function calculateCompatibility(currentUser, otherUser) {
  let compatibilityScore = 0;

  for (let i = 1; i <= 25; i++) {
    const qKey = `q${i}`;
    const weight = QUESTION_WEIGHTS[qKey];
    if (!weight) continue;

    const val1 = currentUser.answers[qKey];
    const val2 = otherUser.answers[qKey];
    
    // Both users must answer
    if (val1 === undefined || val2 === undefined) continue;

    let compatibilityLevel = 0; // Low by default

    if (qKey === 'q5') {
      // NLP question
      const cat1 = categorizeQ5(val1);
      const cat2 = categorizeQ5(val2);
      
      if (cat1 && cat2) {
        if (cat1 === cat2) {
          compatibilityLevel = 2; // High
        } else if (NLP_RELATED_CATEGORIES[cat1]?.includes(cat2) || NLP_RELATED_CATEGORIES[cat2]?.includes(cat1)) {
          compatibilityLevel = 1; // Moderate
        } else {
          compatibilityLevel = 0; // Low
        }
      }
    } else {
      // Direct array match logic
      const rule = MATCHING_RULES[qKey];
      if (rule) {
        // Pairs could be checked directionally (val1, val2) or bidirectionally based on rule set
        // Usually, the rules provided show [currUser, otherUser]
        const isHigh = rule.high && rule.high.some(pair => (pair[0] === val1 && pair[1] === val2) || (pair[0] === val2 && pair[1] === val1));
        const isMod = !isHigh && rule.moderate && rule.moderate.some(pair => (pair[0] === val1 && pair[1] === val2) || (pair[0] === val2 && pair[1] === val1));
        
        if (isHigh) {
          compatibilityLevel = 2;
        } else if (isMod) {
          compatibilityLevel = 1;
        } else {
          compatibilityLevel = 0;
        }
      }
    }

    const questionScore = weight * compatibilityLevel;
    compatibilityScore += questionScore;
  }

  // Max score is 200 (100 total weight * 2)
  const MAX_SCORE = 200;
  const percentage = Math.round((compatibilityScore / MAX_SCORE) * 100);

  return percentage;
}

module.exports = { calculateCompatibility };
