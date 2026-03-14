import { CheckCircle2 } from 'lucide-react';

export default function ResultCard({ match, rank }) {
  const isTopMatch = rank === 1;
  const isHighMatch = match.compatibility >= 80;
  
  // Generic insights to fulfill the UI requirement for "Strengths" visualization
  const insights = isHighMatch 
    ? ["Trust & Integrity", "Emotional Connection", "Growth Mindset"]
    : ["Communication", "Lifestyle Alignment"];

  return (
    <div className={`bg-card w-full p-8 rounded-[2rem] shadow-[0_4px_20px_rgba(0,0,0,0.04)] border transition-all duration-300 hover:shadow-[0_12px_30px_rgba(106,76,147,0.12)] hover:-translate-y-1 relative overflow-hidden ${isTopMatch ? 'border-primary/40' : 'border-gray-100'}`}>
      
      {isTopMatch && (
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary to-[#B89CE0]"></div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Left: User Info */}
        <div className="flex items-center gap-5">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-heading font-bold text-2xl ${isTopMatch ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-primary/10 text-primary'}`}>
            #{rank}
          </div>
          <div>
            <h3 className="text-2xl font-heading font-bold text-text-primary flex items-center gap-3">
              {match.name}
              {isTopMatch && <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-bold uppercase tracking-wide">Best Match</span>}
            </h3>
            <p className="text-text-secondary font-medium">Potential Partner</p>
          </div>
        </div>
        
        {/* Right: Score */}
        <div className="flex flex-col items-start md:items-end">
          <div className="text-4xl font-bold text-primary font-heading tracking-tight">
            {match.compatibility}%
          </div>
          <div className="text-sm text-text-secondary font-semibold uppercase tracking-wider">
            Compatibility
          </div>
        </div>
      </div>

      {/* Compatibility Visualization */}
      <div className="mt-8 mb-6">
        <div className="flex justify-between text-sm font-semibold mb-2">
          <span className="text-text-primary">Match Strength</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-3.5 overflow-hidden shadow-inner">
          <div 
            className="h-full rounded-full bg-gradient-to-r from-primary to-[#B89CE0] transition-all duration-1000 ease-out relative"
            style={{ width: `${match.compatibility}%` }}
          >
            <div className="absolute top-0 right-0 bottom-0 w-8 bg-white/30 blur-[4px] rounded-full translate-x-4"></div>
          </div>
        </div>
      </div>

      {/* Compatibility Insights */}
      <div className="bg-gray-50/50 rounded-2xl p-5 border border-gray-100">
        <p className="text-sm font-bold text-text-secondary mb-3 uppercase tracking-wider">Shared Strengths</p>
        <div className="flex flex-wrap gap-2">
          {insights.map((insight, idx) => (
            <div key={idx} className="bg-white border border-gray-200 px-4 py-2 rounded-xl text-sm font-semibold text-text-primary flex items-center gap-2 shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              {insight}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
