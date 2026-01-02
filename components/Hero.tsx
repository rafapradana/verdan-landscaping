
import React from 'react';
import { BUSINESS_AREA } from '../constants';

export const Hero: React.FC<{ onContactClick: () => void }> = ({ onContactClick }) => {
  return (
    <section className="relative pt-40 pb-16 md:pt-48 md:pb-24 overflow-hidden bg-white">
      {/* Abstract Background Element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-emerald-50/50 -skew-x-12 translate-x-1/2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6">
            <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            {BUSINESS_AREA}'s #1 Rated Team
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 leading-[1.05] mb-6 tracking-tight">
            Turn Your Yard Into Your <span className="text-emerald-600 italic underline decoration-emerald-100 underline-offset-4">Favorite Room.</span>
          </h1>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-md">
            Professional landscaping for townhouses, brownstones, and rooftops. Clean results. Reliable crews. Zero headaches.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <button
              onClick={onContactClick}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-2xl font-bold text-base transition-all text-center flex items-center justify-center gap-2 shadow-xl shadow-emerald-100 hover:scale-[1.02] active:scale-95"
            >
              🌱 Start My Transformation
            </button>
            <a
              href="#projects"
              className="bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 px-8 py-4 rounded-2xl font-bold text-base transition-all text-center flex items-center justify-center gap-2"
            >
              📸 See Our Work
            </a>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2.5">
                {[1, 2, 3, 4, 5].map(i => (
                  <img
                    key={i}
                    src={`https://i.pravatar.cc/100?u=${i + 40}`}
                    className="w-9 h-9 rounded-full border-2 border-white shadow-sm"
                    alt="Customer"
                  />
                ))}
              </div>
              <div>
                <div className="flex gap-0.5 text-amber-400 text-xs mb-0.5">
                  {[1, 2, 3, 4, 5].map(s => <span key={s}>★</span>)}
                </div>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">450+ Local Clients</p>
              </div>
            </div>
            <div className="h-10 w-px bg-slate-200"></div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🏙️</span>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-tight">
                Specialized in<br />{BUSINESS_AREA} Layouts
              </p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 bg-emerald-100/30 rounded-[48px] rotate-2 blur-xl"></div>
          <div className="relative rounded-[40px] overflow-hidden shadow-2xl aspect-[4/5] md:aspect-square group border-4 border-white">
            <img
              src="/images/hero.webp"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              alt={`${BUSINESS_AREA} Backyard`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent opacity-40"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
