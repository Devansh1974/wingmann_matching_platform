"use client";

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProgressBar from '@/components/ProgressBar';
import QuestionCard from '@/components/QuestionCard';
import { questions } from '@/utils/questions';

export default function QuestionnairePage() {
  const router = useRouter();
  
  // Steps: 0 = User Info, 1 = Lifestyle, 2 = Communication, 3 = Attachment, 4 = Conflict, 5 = Growth
  const [step, setStep] = useState(0); 
  const [userInfo, setUserInfo] = useState({ name: '', gender: 'Male', phone: '' });
  const [answers, setAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  const stepTitles = [
    "User Information",
    "Lifestyle",
    "Communication",
    "Attachment",
    "Conflict",
    "Growth Mindset"
  ];

  // Validate User Info
  const canProceedUserInfo = userInfo.name.trim() !== '' && userInfo.phone.trim() !== '';

  const getQuestionsForStep = (s) => {
    if (s === 0) return [];
    // Each step gets 5 questions exactly (e.g. Step 1 -> Q1-Q5)
    return questions.slice((s - 1) * 5, s * 5);
  };

  const getCanProceedCurrentStep = () => {
    if (step === 0) return canProceedUserInfo;
    const currentQuestions = getQuestionsForStep(step);
    // Every question in this step must have an answer
    for (let q of currentQuestions) {
      if (answers[q.id] === undefined || answers[q.id] === '') return false;
    }
    return true;
  };

  const currentQuestions = getQuestionsForStep(step);
  const canProceed = getCanProceedCurrentStep();

  useEffect(() => {
    // Scroll to the top whenever the step changes, ignoring the first render (step 0 doesn't need aggressive scroll mostly)
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  const handleNextStep = async () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      await submitData();
    }
  };

  const handlePrevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const submitData = async () => {
    setIsLoading(true);
    try {
      const payload = {
        name: userInfo.name,
        gender: userInfo.gender,
        phone: userInfo.phone,
        answers: answers
      };

      const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://wingmann-matching-platform.onrender.com";
      const res = await fetch(`${API_URL}/api/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const data = await res.json();
      
      if (res.ok && data._id) {
        router.push(`/results?userId=${data._id}`);
      } else {
        alert("Failed to submit, please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting questionnaire.");
      setIsLoading(false); // only disable loader on error
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] mt-[80px]">
        <div className="relative">
          <div className="w-20 h-20 border-[6px] border-primary/20 rounded-full"></div>
          <div className="w-20 h-20 border-[6px] border-primary border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary animate-pulse"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>
          </div>
        </div>
        <h2 className="mt-8 text-2xl font-heading font-bold text-text-primary">Calculating Compatibility...</h2>
        <p className="text-text-secondary mt-2 animate-pulse">Running psychological algorithms...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen pt-4 pb-24 w-full bg-background relative">
      
      {step > 0 && (
        <ProgressBar currentStep={step} totalSteps={5} title={stepTitles[step]} />
      )}

      <div className="w-full max-w-2xl mx-auto px-6 mt-6 md:mt-12">
        {/* Step 0: User Info */}
        {step === 0 && (
          <div className="bg-card w-full p-8 md:p-10 rounded-[2rem] shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 animate-[fade-in-up_0.6s_ease-out_forwards]">
            
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>

            <h2 className="text-3xl font-heading font-bold text-text-primary mb-2">Let's get to know you</h2>
            <p className="text-text-secondary mb-8">We need just a few details before starting the psychological analysis.</p>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2">Full Name</label>
                <input 
                  type="text" 
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-text-primary focus:bg-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all shadow-sm"
                  placeholder="John Doe"
                  value={userInfo.name}
                  onChange={e => setUserInfo({...userInfo, name: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2">Gender</label>
                <select 
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-text-primary focus:bg-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all shadow-sm appearance-none"
                  value={userInfo.gender}
                  onChange={e => setUserInfo({...userInfo, gender: e.target.value})}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2">Phone Number</label>
                <input 
                  type="tel" 
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-text-primary focus:bg-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all shadow-sm"
                  placeholder="+1 (234) 567-8900"
                  value={userInfo.phone}
                  onChange={e => setUserInfo({...userInfo, phone: e.target.value})}
                />
              </div>
            </div>

            <button 
              onClick={handleNextStep}
              disabled={!canProceedUserInfo}
              className={`w-full mt-10 py-5 rounded-xl font-heading font-bold text-lg text-white transition-all duration-300 ${
                canProceedUserInfo 
                  ? 'bg-primary hover:bg-primary-hover shadow-[0_8px_20px_rgba(106,76,147,0.25)] hover:shadow-[0_12px_25px_rgba(106,76,147,0.35)] hover:-translate-y-1' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Start Diagnostic Test
            </button>
          </div>
        )}

        {/* Questionnaire Steps 1-5 */}
        {step > 0 && (
          <div className="w-full flex flex-col items-center">
            
            <div className="w-full space-y-6 md:space-y-8">
              {currentQuestions.map((q, idx) => (
                <div key={q.id} className="animate-[fade-in-up_0.5s_ease-out_forwards]" style={{ animationDelay: `${idx * 0.15}s` }}>
                  <QuestionCard 
                    number={parseInt(q.id.replace('q', ''))}
                    questionText={q.title}
                    options={q.options}
                    totalType={q.type}
                    selected={answers[q.id]}
                    onSelect={(val) => setAnswers({...answers, [q.id]: val})}
                  />
                </div>
              ))}
            </div>

            <div className="flex w-full justify-between items-center mt-12 bg-card p-4 rounded-2xl shadow-sm border border-gray-100">
              <button 
                onClick={handlePrevStep}
                className="px-6 py-3 rounded-xl hover:bg-gray-100 text-text-secondary font-semibold transition-colors flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                Previous
              </button>
              
              <button 
                onClick={handleNextStep}
                disabled={!canProceed}
                className={`px-8 py-3 rounded-xl font-heading font-bold transition-all duration-300 flex items-center gap-2 ${
                  canProceed 
                    ? 'bg-primary text-white hover:bg-primary-hover shadow-[0_4px_15px_rgba(106,76,147,0.25)] hover:scale-105 active:scale-95' 
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                {step === 5 ? 'Analyze Matches' : 'Continue'}
                {step === 5 ? 
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><circle cx="12" cy="12" r="4"/></svg> : 
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                }
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
