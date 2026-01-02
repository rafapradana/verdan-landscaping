
import React from 'react';
import { BUSINESS_AREA } from '../constants';

const ServiceCard = ({ title, desc, price, features, icon, isFeatured, onContactClick }: any) => (
  <div className={`relative p-8 rounded-[40px] border transition-all duration-500 flex flex-col h-full ${isFeatured
      ? 'bg-emerald-900 text-white border-emerald-800 shadow-2xl scale-105 z-10'
      : 'bg-white text-slate-900 border-slate-100 shadow-sm hover:shadow-xl'
    }`}>
    {isFeatured && (
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-900 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
        Most Popular
      </div>
    )}
    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-8 ${isFeatured ? 'bg-emerald-800' : 'bg-emerald-50'
      }`}>
      {icon}
    </div>
    <h3 className="text-2xl font-bold mb-3">{title}</h3>
    <p className={`mb-8 text-sm flex-grow leading-relaxed ${isFeatured ? 'text-emerald-100/70' : 'text-slate-500'}`}>{desc}</p>

    <div className="mb-8">
      <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${isFeatured ? 'text-emerald-400' : 'text-slate-400'}`}>Starting at</p>
      <p className={`text-4xl font-bold ${isFeatured ? 'text-white' : 'text-emerald-600'}`}>{price}</p>
    </div>

    <ul className="space-y-4 mb-10">
      {features.map((f: string, i: number) => (
        <li key={i} className="flex items-center gap-3 text-sm font-medium">
          <svg className={`w-5 h-5 flex-shrink-0 ${isFeatured ? 'text-emerald-400' : 'text-emerald-500'}`} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
          <span className={isFeatured ? 'text-emerald-50' : 'text-slate-600'}>{f}</span>
        </li>
      ))}
    </ul>

    <button
      onClick={onContactClick}
      className={`w-full py-4 rounded-2xl font-bold text-center transition-all ${isFeatured
          ? 'bg-white text-emerald-900 hover:bg-emerald-50 shadow-xl shadow-emerald-950/20'
          : 'bg-slate-50 hover:bg-emerald-50 text-slate-900 hover:text-emerald-700'
        }`}
    >
      Request a Quote
    </button>
  </div>
);

export const Services: React.FC<{ onContactClick: () => void }> = ({ onContactClick }) => {
  const services = [
    {
      title: "Lawn Care & Maintenance",
      desc: "Perfect for busy owners who want a clean yard without lifting a finger.",
      price: "$120/mo",
      features: ["Mowing & Edging", "Debris Disposal", "Seasonal Prep", "Priority Scheduling"],
      icon: "🌱",
      isFeatured: true
    },
    {
      title: "Landscape Design",
      desc: "Total transformations for brownstone gardens and urban retreats.",
      price: "$1,500+",
      features: ["Urban Planning", "Native Planting", "Mulching & Grading", "3D Visualization"],
      icon: "🌿"
    },
    {
      title: "Structural Hardscaping",
      desc: "Modern patios, walkways, and custom masonry for urban layouts.",
      price: "Custom",
      features: ["Bluestone Patios", "Custom Borders", "Retaining Walls", "Permeable Paths"],
      icon: "🧱"
    },
    {
      title: "The Reset (Cleanup)",
      desc: "Complete seasonal overhaul to get your space ready for use.",
      price: "$250+",
      features: ["Bulk Debris Hauling", "Expert Pruning", "Bed Redefining", "Leaf Management"],
      icon: "🍂"
    }
  ];

  return (
    <section id="services" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
            Investment-Grade Results
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight">Our Landscaping Solutions</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">
            Tailored specifically for the unique architectural constraints of {BUSINESS_AREA} properties.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((s, i) => (
            <ServiceCard key={i} {...s} onContactClick={onContactClick} />
          ))}
        </div>
      </div>
    </section>
  );
};
