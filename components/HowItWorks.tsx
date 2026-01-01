
import React from 'react';

const StepCard: React.FC<{ num: string; title: string; text: string; icon: React.ReactNode }> = ({ num, title, text, icon }) => (
  <div className="relative p-8 rounded-[32px] bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all group">
    <div className="absolute -top-4 -left-4 w-12 h-12 bg-emerald-600 text-white rounded-2xl flex items-center justify-center font-bold shadow-lg shadow-emerald-200 z-10">
      {num}
    </div>
    <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-600 text-sm leading-relaxed">
      {text}
    </p>
  </div>
);

export const HowItWorks: React.FC<{ onContactClick: () => void }> = ({ onContactClick }) => {
  const steps = [
    {
      num: "01",
      title: "Tell us about your space",
      text: "Fill out our quick contact form or give us a call. We'll discuss your goals and specific needs for your Brooklyn property.",
      icon: "📱"
    },
    {
      num: "02",
      title: "Get a clear plan & quote",
      text: "We visit your property to assess the space and provide a transparent, itemized quote with a realistic timeline.",
      icon: "📋"
    },
    {
      num: "03",
      title: "We do the work",
      text: "Our professional, background-checked crews show up on time and handle everything from delivery to final cleanup.",
      icon: "🛠️"
    },
    {
      num: "04",
      title: "You enjoy the results",
      text: "A beautiful, functional outdoor space ready for you to enjoy. We even offer maintenance plans to keep it looking perfect.",
      icon: "✨"
    }
  ];

  return (
    <section id="process" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
            The Process
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
            How It Works
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            We’ve streamlined our process to be as efficient and stress-free as possible, specifically for busy Brooklyn homeowners.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connector Line for Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 -translate-y-1/2 z-0"></div>
          
          {steps.map((step, idx) => (
            <StepCard key={idx} {...step} />
          ))}
        </div>

        <div className="mt-20 text-center">
          <div className="inline-block p-1 bg-white rounded-full shadow-sm border border-slate-100">
            <div className="px-6 py-3 flex items-center gap-4">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>
              <p className="text-sm font-medium text-slate-700">No hidden fees. No long calls. Just clear answers.</p>
              <button 
                onClick={onContactClick}
                className="text-emerald-600 font-bold text-sm hover:underline"
              >
                Contact Us →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
