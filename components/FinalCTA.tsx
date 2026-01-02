
import React from 'react';
import { BUSINESS_AREA } from '../constants';

export const FinalCTA: React.FC<{ onContactClick: () => void }> = ({ onContactClick }) => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-emerald-900 rounded-[60px] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl shadow-emerald-200">
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-800 rounded-full -ml-32 -mt-32 opacity-20"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-800 rounded-full -mr-48 -mb-48 opacity-20"></div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-7xl font-bold text-white mb-8 tracking-tighter leading-none">
              Ready to Upgrade Your <span className="text-emerald-400">Outdoor Space?</span>
            </h2>
            <p className="text-xl text-emerald-100/70 mb-12 leading-relaxed">
              Join hundreds of {BUSINESS_AREA} homeowners who stopped stressing and started enjoying their yards. We're ready when you are.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button
                onClick={onContactClick}
                className="w-full sm:w-auto bg-white text-emerald-900 px-12 py-6 rounded-3xl font-bold text-xl hover:bg-emerald-50 transition-all shadow-xl hover:scale-[1.05] active:scale-95"
              >
                🌱 Book Free Assessment
              </button>
              <div className="text-left">
                <p className="text-emerald-400 font-bold uppercase tracking-widest text-[10px] mb-1">Prefer to text?</p>
                <p className="text-2xl font-bold text-white">(718) 555-0192</p>
              </div>
            </div>
            <div className="mt-12 flex items-center justify-center gap-8 grayscale opacity-50">
              <span className="text-white font-bold text-xs uppercase tracking-[0.2em]">Fully Licensed</span>
              <span className="text-white font-bold text-xs uppercase tracking-[0.2em]">Insured</span>
              <span className="text-white font-bold text-xs uppercase tracking-[0.2em]">local business</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
