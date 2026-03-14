const QUESTION_WEIGHTS = {
  q1: 3, q2: 5, q3: 4, q4: 4, q5: 5,
  q6: 4, q7: 4, q8: 4, q9: 5, q10: 4,
  q11: 5, q12: 4, q13: 4, q14: 2, q15: 4,
  q16: 5, q17: 4, q18: 5, q19: 4, q20: 2,
  q21: 5, q22: 5, q23: 3, q24: 3, q25: 3
};

const NLP_CATEGORIES = {
  emotional: ['love', 'care', 'affection', 'warmth', 'emotional support', 'kindness', 'compassion', 'maturity'],
  trust: ['honesty', 'loyalty', 'transparency', 'dependability', 'faithfulness', 'reliability'],
  communication: ['openness', 'communication', 'listening', 'understanding', 'expressing emotions', 'patience'],
  respect: ['support', 'respect', 'equality', 'appreciation', 'independence', 'space', 'boundaries'],
  growth: ['growth', 'teamwork', 'understanding', 'adaptive', 'flexible', 'supporting goals', 'solving'],
  fun: ['sex', 'sharing experiences', 'adventure', 'chemistry', 'humour', 'emotional connection'],
  stability: ['commitment', 'safety', 'consistency', 'partnership', 'togetherness']
};

const MATCHING_RULES = {
  q1: { high: [[1,1], [2,2], [3,3], [4,4]], moderate: [[1,4], [2,4], [3,4]], low: [[1,2], [1,3], [2,3]] },
  q2: { high: [[1,1], [3,3], [1,3], [2,2]], moderate: [[2,3], [2,1]], low: [[1,4], [2,4], [3,4], [4,4]] },
  q3: { high: [[1,1], [2,2], [3,3], [4,4], [5,5], [1,2], [4,5]], moderate: [[1,3], [2,3], [3,4], [3,5]], low: [[1,4], [1,5], [2,4], [2,5]] },
  q4: { high: [[1,1], [2,2], [3,3], [4,4], [5,5], [1,2], [4,5]], moderate: [[1,3], [2,3], [3,4], [3,5]], low: [[1,4], [1,5], [2,4], [2,5]] },
  q6: { high: [[1,1], [2,2], [2,4]], moderate: [[1,3], [1,2]], low: [[3,3], [3,4], [4,4], [2,3], [1,4]] },
  q7: { high: [[1,1], [2,2], [3,3], [4,4], [1,4]], moderate: [[1,3], [2,4]], low: [[1,2], [2,3], [3,4]] },
  q8: { high: [[1,1], [2,2], [3,3], [4,4], [5,5], [1,2], [4,5]], moderate: [[1,3], [2,3], [3,4], [3,5]], low: [[1,4], [1,5], [2,4], [2,5]] },
  q9: { high: [[1,1], [2,2], [3,3], [4,4], [5,5], [1,2], [4,5]], moderate: [[1,3], [2,3], [3,4], [3,5]], low: [[1,4], [1,5], [2,4], [2,5]] },
  q10: { high: [[1,1], [2,2], [3,3], [4,4], [5,5], [1,2], [4,5]], moderate: [[1,3], [2,3], [3,4], [3,5]], low: [[1,4], [1,5], [2,4], [2,5]] },
  q11: { high: [[1,1], [2,2], [3,3], [4,4], [5,5], [1,2], [4,5]], moderate: [[1,3], [2,3], [3,4], [3,5]], low: [[1,4], [1,5], [2,4], [2,5]] },
  q12: { high: [[1,1], [2,2], [3,3], [4,4], [5,5], [1,2], [4,5]], moderate: [[1,3], [2,3], [3,4], [3,5]], low: [[1,4], [1,5], [2,4], [2,5]] },
  q13: { high: [[1,1], [2,2], [3,3], [4,4], [5,5], [1,2], [4,5]], moderate: [[1,3], [2,3], [3,4], [3,5]], low: [[1,4], [1,5], [2,4], [2,5]] },
  q14: { high: [[1,1], [2,2]], moderate: [[1,2], [1,3], [1,4]], low: [[3,3], [2,4], [2,3], [4,4], [3,4]] },
  q15: { high: [[1,1]], moderate: [[2,2], [1,2], [1,3], [1,4]], low: [[3,3], [3,4], [4,3], [2,3], [3,2], [4,4], [2,4], [4,2]] },
  q16: { high: [[1,1], [2,2], [3,3], [4,4], [5,5], [1,2], [4,5]], moderate: [[1,3], [2,3], [3,4], [3,5]], low: [[1,4], [1,5], [2,4], [2,5]] },
  q17: { high: [[4,4], [5,5], [4,5]], moderate: [[1,3], [2,3], [3,3], [3,4], [3,5]], low: [[1,1], [2,2], [1,2], [1,4], [1,5], [2,4], [2,5]] },
  q18: { high: [[2,2], [3,3], [4,4]], moderate: [[3,4], [2,3]], low: [[1,1], [2,4], [1,2], [1,3], [1,4]] },
  q19: { high: [[1,1], [2,2], [1,2]], moderate: [[1,3], [2,3], [3,3], [3,4], [3,5]], low: [[4,4], [5,5], [4,5], [2,4], [2,5], [1,4], [1,5]] },
  q20: { high: [[1,1], [2,2], [1,2], [4,4], [5,5], [4,5]], moderate: [[1,3], [2,3], [3,3], [2,4], [1,4]], low: [[1,5], [2,5], [4,3], [5,3]] },
  q21: { high: [[4,4], [5,5], [4,5]], moderate: [[3,3], [3,4], [3,5], [2,3], [1,3]], low: [[1,1], [2,2], [1,2], [1,4], [1,5], [2,4], [2,5]] },
  q22: { high: [[4,4], [5,5], [4,5]], moderate: [[3,3], [3,4], [3,5], [1,3]], low: [[1,1], [2,2], [1,2], [2,3], [2,4], [2,5], [1,5], [1,4]] },
  q23: { high: [[1,1], [2,2], [1,3], [2,3], [1,2]], moderate: [[3,4], [3,5], [3,3]], low: [[5,5], [1,5], [2,5], [1,4], [2,4], [4,5]] },
  q24: { high: [[1,1]], moderate: [[1,2], [1,4], [2,2], [4,4], [3,3]], low: [[2,4], [2,3], [3,4], [1,3]] },
  q25: { high: [[1,1], [3,3], [1,3]], moderate: [[2,2], [1,2], [4,4], [2,3], [3,4]], low: [[1,4], [2,4]] }
};

const NLP_RELATED_CATEGORIES = {
  emotional: ['communication', 'fun', 'respect'],
  trust: ['respect', 'stability', 'communication'],
  communication: ['emotional', 'respect', 'trust', 'growth'],
  respect: ['trust', 'communication', 'emotional', 'stability'],
  growth: ['stability', 'communication', 'respect'],
  fun: ['emotional', 'communication'],
  stability: ['trust', 'growth', 'respect']
};

module.exports = { QUESTION_WEIGHTS, NLP_CATEGORIES, MATCHING_RULES, NLP_RELATED_CATEGORIES };
