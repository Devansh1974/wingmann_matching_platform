const { MATCHING_RULES, QUESTION_WEIGHTS, NLP_RELATED_CATEGORIES } = require('./matchingRules');
const { classifyAnswer } = require('./nlpClassifier');

async function calculateCompatibility(currentUser, otherUser) {
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
      // NLP question pipeline (Keyword -> Fuzzy -> Embedding)
      const nlp1 = await classifyAnswer(val1);
      const nlp2 = await classifyAnswer(val2);
      
      const cat1 = nlp1.category;
      const cat2 = nlp2.category;

      if (cat1 && cat2) {
        if (cat1 === cat2) {
          compatibilityLevel = 2; // High (Identical semantic category)
        } else if (NLP_RELATED_CATEGORIES[cat1]?.includes(cat2) || NLP_RELATED_CATEGORIES[cat2]?.includes(cat1)) {
          compatibilityLevel = 1; // Moderate (Related semantic category)
        } else {
          compatibilityLevel = 0; // Low (Clashing values)
        }
      }
    } else {
      // Direct array match logic
      const rule = MATCHING_RULES[qKey];
      if (rule) {
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
