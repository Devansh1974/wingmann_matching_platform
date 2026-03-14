import Link from 'next/link';
import Image from 'next/image';
import { HeartOff, MessageSquareOff, UserX, Clock } from 'lucide-react';

export default function Home() {
  const benefits = [
    { 
      icon: <HeartOff className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300" />, 
      title: "People with no intent",
      desc: "If they don't know what they want, they don't get access to you."
    },
    { 
      icon: <UserX className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300" />, 
      title: "People not ready for something real",
      desc: "Emotional confusion shouldn't be your responsibility."
    },
    { 
      icon: <MessageSquareOff className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300" />, 
      title: "People who disappear after matching",
      desc: "Silence isn't chemistry, it's disinterest."
    },
    { 
      icon: <Clock className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300" />, 
      title: "People who text endlessly but never meet",
      desc: "Connection is built in real life, not in chat bubbles."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen pt-24 pb-12 w-full bg-gradient-to-br from-[#1a1224] via-[#2d1e3e] to-[#452b61] relative text-white">
      
      {/* Background ambient glows wrapped carefully to prevent body scroll overflow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[150px] translate-x-1/3 translate-y-1/3"></div>
      </div>

      {/* Hero Section */}
      <section className="w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[70vh] relative z-10">
        
        {/* Left Column (Text Config) */}
        <div className="flex flex-col items-start gap-8 animate-[fade-in-up_0.8s_ease-out_forwards]">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white font-heading font-medium text-sm backdrop-blur-md border border-white/10">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Psychology-Based Dating
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-[1.15] tracking-tight">
            Find people who are <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B89CE0] to-[#E2D8F0]">actually</span> compatible with you.
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-lg font-sans">
            WingMann filters out low-intent matches using deep psychology-based compatibility scoring. Stop wasting time on connections that don't make sense.
          </p>
          
          <div className="flex flex-wrap gap-4 w-full md:w-auto mt-2">
            <Link 
              href="/questionnaire" 
              className="w-full md:w-auto bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-2xl font-heading font-semibold text-lg shadow-[0_8px_20px_rgba(106,76,147,0.4)] transition-all duration-300 hover:shadow-[0_12px_25px_rgba(106,76,147,0.6)] hover:-translate-y-1 active:scale-95 text-center flex items-center justify-center gap-2 border border-primary/50"
            >
              Start Compatibility Test
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </Link>
            
            <a 
              href="#problem" 
              className="w-full md:w-auto bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10 hover:border-white/30 px-8 py-4 rounded-2xl font-heading font-semibold text-lg transition-all duration-300 hover:shadow-sm text-center"
            >
              Learn how it works
            </a>
          </div>
          
          {/* Trust signals */}
          <div className="flex items-center gap-6 mt-6 opacity-80">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-400"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
              Private & Secure
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
              Research-backed
            </div>
          </div>
        </div>

        {/* Right Column (Hero Graphic) */}
        <div className="relative hidden lg:flex justify-center items-center h-[500px]">
          {/* Abstract floating graphics instead of the specific PNG since that's the logo now */}
          <div className="relative w-full h-full flex items-center justify-center animate-[float_8s_ease-in-out_infinite]">
            <div className="absolute w-64 h-64 bg-primary/40 rounded-full blur-[60px]"></div>
            <div className="w-80 h-80 border border-white/10 rounded-full flex items-center justify-center backdrop-blur-sm relative z-10 before:absolute before:inset-[-20px] before:border before:border-primary/20 before:rounded-full before:animate-[ping_4s_linear_infinite]">
              <div className="w-48 h-48 bg-gradient-to-tr from-primary to-[#B89CE0] rounded-full shadow-[0_0_50px_rgba(106,76,147,0.5)] flex items-center justify-center">
                <HeartOff className="w-16 h-16 text-white/50" />
              </div>
            </div>
            {/* Floating connecting elements */}
            <div className="absolute top-20 right-10 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 animate-[float_5s_ease-in-out_infinite] shadow-xl delay-100">
              <div className="flex gap-2 items-center">
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="h-2 w-16 bg-white/20 rounded-full"></div>
              </div>
            </div>
            <div className="absolute bottom-20 left-10 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 animate-[float_7s_ease-in-out_infinite] shadow-xl delay-300">
              <div className="flex gap-2 items-center">
                <div className="w-8 h-8 rounded-full bg-primary/40 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-[#B89CE0]"></div>
                </div>
                <div className="h-2 w-20 bg-white/20 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
        
      </section>

      {/* Feature Cards Section */}
      <section id="problem" className="w-full max-w-7xl mx-auto px-6 py-24 relative z-10">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
            Hey Buddy, I'm your WingMann — here to save you from
          </h2>
          <p className="text-gray-300 text-lg">
            Dating shouldn't feel like a part-time job analyzing mixed signals. We filter out the noise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl mx-auto">
          {benefits.map((b, i) => (
            <div 
              key={i} 
              className="group bg-card p-8 rounded-3xl shadow-[0_4px_15px_rgba(0,0,0,0.03)] border border-transparent hover:border-primary/30 transition-all duration-300 hover:shadow-[0_15px_30px_rgba(106,76,147,0.1)] hover:-translate-y-2 flex flex-col items-start gap-4 cursor-default relative overflow-hidden"
            >
              {/* Subtle gradient flash on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="bg-primary/10 p-4 rounded-2xl relative z-10">
                {b.icon}
              </div>
              <div className="relative z-10">
                <h3 className="font-heading font-semibold text-text-primary text-xl mb-2">{b.title}</h3>
                <p className="text-text-secondary leading-relaxed">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
