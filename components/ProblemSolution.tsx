
import React from 'react';
import { BUSINESS_NAME } from '../constants';

export const ProblemSolution: React.FC = () => {
  const painPoints = [
    { text: "Yard looks messy no matter what you do", icon: "❌" },
    { text: "No time to maintain it consistently", icon: "❌" },
    { text: "Previous landscapers were unreliable", icon: "❌" },
    { text: "Outdoor space feels wasted", icon: "❌" },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            Landscaping Shouldn’t Be This Stressful
          </h2>
          <p className="text-lg text-slate-600">
            You shouldn’t have to chase contractors or guess what your yard needs.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 mb-16">
          {painPoints.map((point, idx) => (
            <div key={idx} className="bg-slate-50 p-6 rounded-2xl flex items-center gap-4 border border-slate-100">
              <span className="text-2xl">{point.icon}</span>
              <p className="font-semibold text-slate-700">{point.text}</p>
            </div>
          ))}
        </div>

        <div className="bg-emerald-900 text-white p-8 md:p-12 rounded-[32px] text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-800 rounded-full -mr-16 -mt-16 opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-emerald-800 rounded-full -ml-12 -mb-12 opacity-50"></div>

          <h3 className="text-2xl md:text-3xl font-bold mb-6 leading-tight relative z-10">
            {BUSINESS_NAME} handles design, build, and maintenance — so your outdoor space stays clean, functional, and valuable year-round.
          </h3>
          <p className="text-emerald-100 text-lg opacity-80 relative z-10">
            From seasonal cleanups to total backyard transformations.
          </p>
        </div>
      </div>
    </section>
  );
};
