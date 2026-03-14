export const agreeScale5 = [
  { value: 1, label: "Strongly Disagree" },
  { value: 2, label: "Disagree" },
  { value: 3, label: "Neutral" },
  { value: 4, label: "Agree" },
  { value: 5, label: "Strongly Agree" }
];

export const freqScale4 = [
  { value: 1, label: "Rarely/Never" },
  { value: 2, label: "Sometimes" },
  { value: 3, label: "Often" },
  { value: 4, label: "Always/Constantly" }
];

export const relaxScale4 = [
  { value: 1, label: "Relaxing at home" },
  { value: 2, label: "Outdoors/Adventure" },
  { value: 3, label: "Socializing/Partying" },
  { value: 4, label: "Working/Productive" }
];

export const questions = [
  { id: 'q1', title: "How do you like to spend weekends?", type: 'multiple-choice', options: relaxScale4 },
  { id: 'q2', title: "Managing money as a couple...", type: 'multiple-choice', options: freqScale4 },
  { id: 'q3', title: "Feeling balanced with similar habits", type: 'latent-scale', options: agreeScale5 },
  { id: 'q4', title: "Goals vs relationship priority", type: 'latent-scale', options: agreeScale5 },
  { id: 'q5', title: "What matters most in a relationship?", type: 'descriptive', options: [] },
  { id: 'q6', title: "When upset, I tend to...", type: 'multiple-choice', options: freqScale4 },
  { id: 'q7', title: "How do you show you care?", type: 'multiple-choice', options: freqScale4 },
  { id: 'q8', title: "Pick up on mood changes", type: 'latent-scale', options: agreeScale5 },
  { id: 'q9', title: "Expressing feelings even in conflict", type: 'latent-scale', options: agreeScale5 },
  { id: 'q10', title: "Reaching out after partner withdraws", type: 'latent-scale', options: agreeScale5 },
  { id: 'q11', title: "Worry partner may lose interest", type: 'latent-scale', options: agreeScale5 },
  { id: 'q12', title: "Closeness vs need for space", type: 'latent-scale', options: agreeScale5 },
  { id: 'q13', title: "Holding back true feelings", type: 'latent-scale', options: agreeScale5 },
  { id: 'q14', title: "When overwhelmed I...", type: 'multiple-choice', options: freqScale4 },
  { id: 'q15', title: "Reaction to delayed texting", type: 'multiple-choice', options: freqScale4 },
  { id: 'q16', title: "Feeling safe to share feelings", type: 'latent-scale', options: agreeScale5 },
  { id: 'q17', title: "Taking first step after disagreement", type: 'latent-scale', options: agreeScale5 },
  { id: 'q18', title: "How you handle conflict", type: 'multiple-choice', options: freqScale4 },
  { id: 'q19', title: "Focus on being right vs understood", type: 'latent-scale', options: agreeScale5 },
  { id: 'q20', title: "Difficulty staying calm when misunderstood", type: 'latent-scale', options: agreeScale5 },
  { id: 'q21', title: "Belief that relationships help both grow", type: 'latent-scale', options: agreeScale5 },
  { id: 'q22', title: "Taking responsibility when hurt someone", type: 'latent-scale', options: agreeScale5 },
  { id: 'q23', title: "Rarely talk about emotions", type: 'latent-scale', options: agreeScale5 },
  { id: 'q24', title: "How you feel about relationships right now", type: 'multiple-choice', options: freqScale4 },
  { id: 'q25', title: "What you've learned from relationships", type: 'multiple-choice', options: freqScale4 },
];
