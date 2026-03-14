export default function ProgressBar({ currentStep, totalSteps, title }) {
  const percentage = Math.round((currentStep / totalSteps) * 100);
  
  return (
    <div className="w-full sticky top-[72px] bg-background/95 backdrop-blur-md z-40 py-4 border-b border-gray-200 shadow-sm mb-8 transition-all duration-300">
      <div className="max-w-2xl mx-auto px-6">
        <div className="flex justify-between items-end mb-3">
          <div>
            <p className="text-xs text-primary font-bold tracking-wider uppercase mb-1">Step {currentStep} of {totalSteps}</p>
            <h2 className="text-xl md:text-2xl font-heading font-semibold text-text-primary">{title}</h2>
          </div>
          <span className="text-sm font-heading font-bold text-text-secondary bg-white px-3 py-1 rounded-full border border-gray-200">{percentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-primary to-[#8A63C8] h-full rounded-full transition-all duration-700 ease-out relative" 
            style={{ width: `${percentage}%` }}
          >
            <div className="absolute top-0 right-0 bottom-0 w-8 bg-white/30 blur-[4px] rounded-full translate-x-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
