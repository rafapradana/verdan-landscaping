
import React, { useState } from 'react';

// Slider component for Before/After comparison
const Slider: React.FC<{ before: string; after: string; caption: string }> = ({ before, after, caption }) => {
  const [sliderPos, setSliderPos] = useState(50);

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    const container = e.currentTarget.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const pos = ((x - container.left) / container.width) * 100;
    setSliderPos(Math.max(0, Math.min(100, pos)));
  };

  return (
    <div className="space-y-4">
      <div 
        className="relative aspect-[4/3] rounded-[32px] overflow-hidden cursor-ew-resize shadow-xl border border-slate-100 group"
        onMouseMove={handleMove}
        onTouchMove={handleMove}
      >
        <img src={after} className="absolute inset-0 w-full h-full object-cover" alt="After" />
        <div 
          className="absolute inset-0 w-full h-full overflow-hidden" 
          style={{ width: `${sliderPos}%` }}
        >
          <img src={before} className="absolute inset-0 w-full h-full object-cover max-w-none" style={{ width: '100vw' }} alt="Before" />
        </div>
        <div 
          className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_15px_rgba(0,0,0,0.3)] pointer-events-none"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-2xl flex items-center justify-center border-4 border-emerald-50 text-emerald-600 transition-transform group-hover:scale-110">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M8 7l-5 5m0 0l5 5m-5-5h18m-5-5l5 5m0 0l-5 5"></path></svg>
          </div>
        </div>
        <div className="absolute bottom-4 left-4 bg-black/60 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full backdrop-blur-md border border-white/20">Before</div>
        <div className="absolute bottom-4 right-4 bg-emerald-600/90 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full backdrop-blur-md border border-white/20">After</div>
      </div>
      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
        <p className="text-slate-700 text-sm font-semibold italic text-center leading-relaxed">"{caption}"</p>
      </div>
    </div>
  );
};

export const BeforeAfter: React.FC<{ onContactClick: () => void }> = ({ onContactClick }) => {
  const projects = [
    {
      before: "/images/proof/1/before.png",
      after: "/images/proof/1/after.png",
      caption: "Converted an unused backyard into a low-maintenance hangout space in under 2 weeks."
    },
    {
      before: "/images/proof/2/before.png",
      after: "/images/proof/2/after.png",
      caption: "Urban garden rejuvenation: focused on native Brooklyn flora and modern lighting."
    },
    {
      before: "/images/proof/3/before.png",
      after: "/images/proof/3/after.png",
      caption: "Rooftop terrace transformation: turned a concrete slab into a lush escape with custom planters."
    },
    {
      before: "/images/proof/4/before.png",
      after: "/images/proof/4/after.png",
      caption: "Small townhouse patio makeover: maximized a tight layout with tiered bluestone and privacy screens."
    }
  ];

  return (
    <section id="projects" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6">
            Visual Proof
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight">Real Yards. <span className="text-emerald-600">Real Results.</span></h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Slide the white bar to see the direct transformation of actual properties across Brooklyn.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
          {projects.map((p, i) => <Slider key={i} {...p} />)}
        </div>
        
        <div className="mt-20 text-center">
          <button 
            onClick={onContactClick}
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-emerald-100 hover:scale-105"
          >
            Get a Quote for Your Space
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </button>
        </div>
      </div>
    </section>
  );
};
