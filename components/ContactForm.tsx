
import React, { useState } from 'react';
import { BUSINESS_NAME } from '../constants';

export const ContactForm: React.FC<{ isModal?: boolean; onClose?: () => void }> = ({ isModal, onClose }) => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    // Simulate API call
    setTimeout(() => setStatus('success'), 1500);
  };

  if (status === 'success') {
    return (
      <div className={`flex flex-col items-center justify-center text-center bg-white ${isModal ? 'py-16 px-6' : 'py-24 px-6 rounded-[40px]'}`}>
        <div className="w-24 h-24 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center text-4xl mb-8 animate-bounce border-4 border-emerald-100">
          ✓
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">Everything's Set!</h2>
        <p className="text-lg text-slate-600 mb-10 max-w-lg mx-auto leading-relaxed">
          Thanks for reaching out. A {BUSINESS_NAME} project specialist will review your details and contact you within <span className="text-emerald-600 font-bold">24 hours</span> to schedule your assessment.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => setStatus('idle')}
            className="px-8 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-colors"
          >
            Submit Another Request
          </button>
          {isModal && onClose && (
            <button
              onClick={onClose}
              className="px-8 py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100"
            >
              Close Window
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <section id="contact" className={`${isModal ? '' : 'py-24 bg-white'}`}>
      <div className={`${isModal ? '' : 'max-w-7xl mx-auto px-6'}`}>
        <div className={`${isModal ? 'border-none' : 'bg-slate-50 border border-slate-100 shadow-sm rounded-[40px]'} overflow-hidden`}>
          <div className="grid lg:grid-cols-12">

            {/* Left Column: Trust & Info - Visible on large screens or if not a modal */}
            <div className={`lg:col-span-5 bg-emerald-900 p-8 md:p-14 text-white flex flex-col justify-between relative overflow-hidden ${isModal ? 'hidden lg:flex' : 'hidden md:flex'}`}>
              <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-800 rounded-full -mr-40 -mt-40 opacity-20"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-800 rounded-full -ml-32 -mb-32 opacity-10"></div>

              <div className="relative z-10">
                <div className="inline-block bg-emerald-800 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-8 border border-emerald-700/50">
                  Brooklyn's Best
                </div>
                <h2 className="text-4xl xl:text-5xl font-bold mb-8 leading-tight tracking-tight">Let's Build Your <span className="text-emerald-400 italic">Urban Oasis.</span></h2>
                <p className="text-emerald-100/70 mb-12 text-lg leading-relaxed max-w-md">
                  Whether it's a small backyard or a sprawling rooftop, we have the expertise to make it beautiful.
                </p>

                <div className="space-y-8">
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 bg-emerald-800 rounded-2xl flex items-center justify-center flex-shrink-0 text-xl border border-emerald-700">
                      ⚡
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Fast Response</h4>
                      <p className="text-sm text-emerald-100/50 leading-snug mt-1">Our team replies to all inquiries within one business day, guaranteed.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 bg-emerald-800 rounded-2xl flex items-center justify-center flex-shrink-0 text-xl border border-emerald-700">
                      🛡️
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Risk-Free Quote</h4>
                      <p className="text-sm text-emerald-100/50 leading-snug mt-1">Transparent, fixed pricing. No hidden fees or "Brooklyn surcharges."</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-20 pt-10 border-t border-emerald-800 relative z-10 flex items-center justify-between">
                <div>
                  <p className="text-emerald-400 font-bold uppercase tracking-widest text-[10px] mb-2">Prefer to talk?</p>
                  <p className="text-2xl font-bold">(718) 555-0192</p>
                </div>
                <div className="w-14 h-14 bg-emerald-800 rounded-2xl flex items-center justify-center text-emerald-400 border border-emerald-700">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 005.47 5.47l.772-1.548a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path></svg>
                </div>
              </div>
            </div>

            {/* Right Column: The Form */}
            <div className={`${isModal ? 'lg:col-span-7' : 'lg:col-span-7'} p-8 md:p-14 bg-white`}>
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 font-bold">🌱</span>
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Free Assessment</h3>
                </div>
                <p className="text-slate-500 text-sm font-medium">Tell us about your space to get a personalized quote.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] ml-1">Full Name</label>
                    <input
                      required
                      type="text"
                      placeholder="Jane Doe"
                      className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:bg-white outline-none transition-all font-medium text-slate-900"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] ml-1">Phone Number</label>
                    <input
                      required
                      type="tel"
                      placeholder="(718) 000-0000"
                      className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:bg-white outline-none transition-all font-medium text-slate-900"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] ml-1">Service Type</label>
                    <div className="relative">
                      <select className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:bg-white outline-none transition-all appearance-none font-medium text-slate-900">
                        <option>Full Yard Transformation</option>
                        <option>Monthly Maintenance</option>
                        <option>Hardscaping / Patio Build</option>
                        <option>Seasonal Cleanup</option>
                        <option>Rooftop Garden</option>
                      </select>
                      <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] ml-1">Brooklyn Neighborhood</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Park Slope"
                      className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:bg-white outline-none transition-all font-medium text-slate-900"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] ml-1">What can we help you with? (Optional)</label>
                  <textarea
                    placeholder="Describe your goals, challenges, or vision for the space..."
                    rows={isModal ? 3 : 5}
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:bg-white outline-none transition-all resize-none font-medium text-slate-900 text-base"
                  ></textarea>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-5 rounded-2xl font-bold text-lg shadow-2xl shadow-emerald-100 transition-all flex items-center justify-center gap-3 disabled:opacity-70 group"
                  >
                    {status === 'sending' ? (
                      <span className="flex items-center gap-3">
                        <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        Submitting...
                      </span>
                    ) : (
                      <>
                        Request My Free Assessment
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                      </>
                    )}
                  </button>
                  <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-8 opacity-40">
                    <div className="flex items-center gap-1.5 grayscale">
                      <span className="text-xs font-bold text-slate-500">🛡️ Data Encrypted</span>
                    </div>
                    <div className="flex items-center gap-1.5 grayscale">
                      <span className="text-xs font-bold text-slate-500">🚫 No Spam</span>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
