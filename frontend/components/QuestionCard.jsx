export default function QuestionCard({ questionText, options, selected, onSelect, number, totalType }) {
  return (
    <div className="bg-card w-full p-6 md:p-8 rounded-3xl shadow-[0_4px_15px_rgba(0,0,0,0.03)] border border-gray-100 hover:border-primary/20 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(106,76,147,0.08)]">
      <h3 className="text-lg md:text-xl font-heading font-semibold text-text-primary mb-6">
        <span className="text-primary/60 font-medium mr-2">{number}.</span>
        {questionText}
      </h3>

      {totalType === 'descriptive' ? (
        <textarea 
          placeholder="Example: honesty, respect, trust, emotional connection..."
          className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl p-4 text-text-primary placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all min-h-[140px] resize-y"
          value={selected || ''}
          onChange={(e) => onSelect(e.target.value)}
        ></textarea>
      ) : totalType === 'latent-scale' ? (
        <div className="w-full flex flex-col gap-4 mt-2">
          {/* Slider visual */}
          <div className="relative flex justify-between items-center w-full px-2 mt-4">
            <div className="absolute top-1/2 left-4 right-4 h-1.5 bg-gray-100 -translate-y-1/2 rounded-full z-0"></div>
            {options.map((opt) => {
              const isActive = selected === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => onSelect(opt.value)}
                  className={`relative z-10 flex flex-col items-center justify-center gap-3 group outline-none`}
                >
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-heading font-semibold text-lg transition-all duration-300 ${
                    isActive 
                      ? 'bg-primary text-white scale-110 shadow-[0_4px_12px_rgba(106,76,147,0.4)]' 
                      : 'bg-white border-2 border-gray-200 text-text-secondary hover:border-primary/50 hover:text-primary hover:bg-primary/5'
                  }`}>
                    {opt.value}
                  </div>
                </button>
              );
            })}
          </div>
          <div className="flex justify-between items-center w-full text-xs md:text-sm font-medium text-text-secondary mt-2 px-1">
            <span>Strongly Disagree</span>
            <span>Strongly Agree</span>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {options.map((opt) => {
            const isSelected = selected === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => onSelect(opt.value)}
                className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between group outline-none ${
                  isSelected 
                    ? 'border-primary bg-primary text-white shadow-[0_4px_15px_rgba(106,76,147,0.25)] scale-[1.02]' 
                    : 'border-gray-200 bg-white hover:border-primary/40 hover:bg-primary/5 text-text-primary'
                }`}
              >
                <span className="font-medium text-base">
                  {opt.label}
                </span>
                
                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                  isSelected ? 'bg-white text-primary' : 'bg-gray-100 text-transparent group-hover:bg-primary/10'
                }`}>
                  {isSelected && (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  )}
                </div>
              </button>
            )
          })}
        </div>
      )}
    </div>
  );
}
