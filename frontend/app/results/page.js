"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import ResultCard from '@/components/ResultCard';
import { Users, PartyPopper } from 'lucide-react';

function ResultsContent() {
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');
  const router = useRouter();

  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      router.push('/');
      return;
    }

    const fetchMatches = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://wingmann-matching-platform.onrender.com";
        const res = await fetch(`${API_URL}/api/compatibility/${userId}`);
        const data = await res.json();
        if (res.ok) {
          setMatches(data);
        }
      } catch (err) {
        console.error("Error fetching matches", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [userId, router]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="relative">
          <div className="w-20 h-20 border-[6px] border-primary/20 rounded-full"></div>
          <div className="w-20 h-20 border-[6px] border-primary border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary animate-pulse"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>
          </div>
        </div>
        <p className="mt-8 text-xl font-heading font-bold text-text-primary">Finding your matches...</p>
      </div>
    );
  }

  return (
    <>
      <div className="text-center mb-12 w-full animate-[fade-in-up_0.6s_ease-out_forwards]">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 text-primary rounded-2xl mb-6">
          <PartyPopper className="w-8 h-8" />
        </div>
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-text-primary mb-4 tracking-tight">Your Top Matches</h1>
        <p className="text-text-secondary text-lg max-w-lg mx-auto">
          We analyzed your psychological profile. Here are the people most compatible with you based on deep metrics.
        </p>
      </div>

      {matches.length === 0 ? (
        <div className="bg-card w-full p-12 rounded-[2rem] shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 text-center animate-[fade-in-up_0.8s_ease-out_forwards] flex flex-col items-center">
          <div className="bg-primary/5 p-8 rounded-full inline-flex items-center justify-center mb-8 relative">
            <div className="absolute inset-0 bg-primary/10 rounded-full animate-ping opacity-50"></div>
            <Users className="w-16 h-16 text-primary" />
          </div>
          <h3 className="text-2xl font-heading font-bold text-text-primary mb-3">You are the first explorer here!</h3>
          <p className="text-text-secondary text-lg max-w-sm">
            Invite others to join WingMann to start seeing your high-intent matches.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-8 w-full cursor-default">
          {matches.map((match, idx) => (
            <div key={match._id} className="animate-[fade-in-up_0.8s_ease-out_forwards]" style={{ animationDelay: `${idx * 0.15}s` }}>
              <ResultCard match={match} rank={idx + 1} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default function ResultsPage() {
  return (
    <div className="flex flex-col items-center min-h-screen pt-32 pb-24 px-6 w-full max-w-3xl mx-auto">
      <Suspense fallback={
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      }>
        <ResultsContent />
      </Suspense>
    </div>
  );
}
