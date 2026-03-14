import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="w-full bg-card/90 backdrop-blur-md shadow-[0_2px_10px_rgba(106,76,147,0.05)] border-b border-gray-100 py-4 px-6 fixed top-0 z-50 transition-all">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Left: Logo Mark */}
        <Link href="/" className="group flex-shrink-0">
          <div className="w-12 h-12 overflow-hidden shadow-sm shadow-primary/20 group-hover:shadow-primary/40 transition-all duration-300 group-hover:scale-105 group-hover:-rotate-3">
            <Image src="/image.png" alt="WingMann Logo" width={48} height={48} priority className="object-cover" />
          </div>
        </Link>
        
        {/* Center: Brand Name */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Link href="/">
            <span className="font-logo font-extrabold text-3xl text-primary tracking-tight hover:text-primary-hover transition-colors drop-shadow-sm" style={{ fontWeight: 800 }}>WingMann</span>
          </Link>
        </div>

        {/* Right: Empty for balance, or could be a minimal button */}
        <div className="flex-shrink-0 w-12 hidden md:block"></div>

      </div>
    </nav>
  );
}
