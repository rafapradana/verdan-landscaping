
import React, { useState, useEffect } from 'react';
import { BUSINESS_NAME } from '../constants';

interface HeaderProps {
  onContactClick: () => void;
  phone?: string;
  bannerText?: string;
  bannerActive?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onContactClick, phone, bannerText, bannerActive }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Urgency Banner */}
      {bannerActive && (
        <div className="bg-emerald-900 text-emerald-100 py-2 px-6 text-center text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">
          {bannerText || <span>📅 Now Booking Spring Cleanups — <span className="text-amber-400">Only 4 slots left for April</span></span>}
        </div>
      )}

      <header
        className={`transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-3' : 'bg-white/50 backdrop-blur-sm py-5'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-emerald-200">
              V
            </div>
            <span className={`text-xl font-bold tracking-tight text-slate-900`}>
              {BUSINESS_NAME}<span className="text-emerald-600">.</span>
            </span>
          </div>

          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <a href="#services" className="hover:text-emerald-600 transition-colors">Services</a>
            <a href="#gallery" className="hover:text-emerald-600 transition-colors">Gallery</a>
            <a href="#projects" className="hover:text-emerald-600 transition-colors">Our Work</a>
            <a href="#service-area" className="hover:text-emerald-600 transition-colors">Service Area</a>
            <a href="#process" className="hover:text-emerald-600 transition-colors">How It Works</a>
          </nav>

          <div className="flex items-center gap-6">
            <a href="tel:7185550192" className="hidden md:flex items-center gap-2 text-slate-900 font-bold hover:text-emerald-600 transition-colors">
              <span className="w-8 h-8 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 005.47 5.47l.772-1.548a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path></svg>
              </span>
              {phone || "(718) 555-0192"}
            </a>
            <button
              onClick={onContactClick}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-2xl text-sm font-bold transition-all shadow-xl shadow-emerald-200 hover:scale-[1.02] active:scale-95"
            >
              Check Availability
            </button>
          </div>
        </div>
      </header>
    </div>
  );
};
