
import React from 'react';
import { BUSINESS_NAME, BUSINESS_AREA } from '../constants';

// Fix: Use React.FC to handle React internal props (like 'key') when mapping components
const DifferentiatorCard: React.FC<{ icon: string, title: string, description: string }> = ({ icon, title, description }) => (
  <div className="group p-8 rounded-[32px] bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-emerald-50 transition-all duration-300">
    <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-600 text-sm leading-relaxed">
      {description}
    </p>
  </div>
);

export const WhyChooseUs: React.FC<{ onContactClick: () => void }> = ({ onContactClick }) => {
  const differentiators = [
    {
      icon: "🕒",
      title: "Reliable, On-Time Crews",
      description: "We show up exactly when we say we will. In an industry known for disappearing acts, we pride ourselves on professional punctuality."
    },
    {
      icon: "🏙️",
      title: "Tailored for Urban Spaces",
      description: `We're ${BUSINESS_AREA} natives. We specialize in the logistics of small yards, narrow townhouses, and high-rise rooftops.`
    },
    {
      icon: "💎",
      title: "Clear Pricing, No Games",
      description: `Transparent, line-item quotes. You'll know exactly what you're paying for before we ever pick up a shovel. No '${BUSINESS_AREA} surcharges'.`
    },
    {
      icon: "🌿",
      title: "Eco-Friendly & Low Maintenance",
      description: "We design for sustainability. Our landscapes are built to thrive with minimal upkeep using native, non-toxic plants."
    }
  ];

  return (
    <section id="why-us" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-16 items-start">
          <div className="lg:col-span-1 lg:sticky lg:top-32">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
              The {BUSINESS_NAME} Difference
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight leading-[1.1]">
              Why {BUSINESS_AREA} <span className="text-emerald-600">Chooses</span> {BUSINESS_NAME}
            </h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              You shouldn't have to chase contractors or wonder if your yard is in good hands. We built {BUSINESS_NAME} to be the most professional landscaping partner in the borough.
            </p>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white text-[10px]">✓</div>
                <span className="font-bold text-slate-900">Rated 4.9/5 stars by homeowners</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white text-[10px]">✓</div>
                <span className="font-bold text-slate-900">Fully Licensed & Insured</span>
              </div>
            </div>
            <div className="mt-10">
              <button
                onClick={onContactClick}
                className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg"
              >
                Book Free Assessment
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </button>
            </div>
          </div>

          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
            {differentiators.map((item, idx) => (
              <DifferentiatorCard key={idx} {...item} />
            ))}

            {/* Callout Card */}
            <div className="sm:col-span-2 bg-emerald-900 p-8 rounded-[40px] text-white flex flex-col md:flex-row items-center justify-between gap-8 mt-4 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-800 rounded-full -mr-16 -mt-16 opacity-30"></div>
              <div className="relative z-10">
                <h4 className="text-2xl font-bold mb-2">Fast Communication</h4>
                <p className="text-emerald-100/70 text-sm">We respond to every text, call, or email within 24 hours. Guaranteed.</p>
              </div>
              <div className="relative z-10 whitespace-nowrap">
                <p className="text-emerald-400 font-bold uppercase tracking-widest text-[10px] mb-2">Prefer to text?</p>
                <p className="text-2xl font-bold">(718) 555-0192</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
