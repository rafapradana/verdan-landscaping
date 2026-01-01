
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white pt-20 pb-10 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                V
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">
                Verdan<span className="text-emerald-600">.</span>
              </span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              Modern landscaping for Brooklyn's urban spaces. Reliable, aesthetic, and low-maintenance.
            </p>
            <div className="flex gap-4">
              {['ig', 'fb', 'tw'].map(s => (
                <div key={s} className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 hover:bg-emerald-50 hover:text-emerald-600 cursor-pointer transition-colors">
                  <span className="uppercase text-[10px] font-bold">{s}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6">Service Areas</h4>
            <ul className="space-y-3 text-sm text-slate-500">
              <li>Williamsburg</li>
              <li>Bushwick</li>
              <li>Park Slope</li>
              <li>Downtown Brooklyn</li>
              <li>Red Hook & Greenpoint</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6">Quick Links</h4>
            <ul className="space-y-3 text-sm text-slate-500">
              <li><a href="#services" className="hover:text-emerald-600">Services</a></li>
              <li><a href="#projects" className="hover:text-emerald-600">Our Work</a></li>
              <li><a href="#process" className="hover:text-emerald-600">How It Works</a></li>
              <li><a href="#faq" className="hover:text-emerald-600">FAQ</a></li>
              <li><a href="#contact" className="hover:text-emerald-600">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6">Contact</h4>
            <div className="space-y-4 text-sm text-slate-500">
              <p className="flex items-center gap-3">
                <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                (718) 555-0192
              </p>
              <p className="flex items-center gap-3">
                <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                hello@verdanlandscaping.com
              </p>
              <p className="flex items-center gap-3">
                <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                Brooklyn, New York
              </p>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-slate-400 font-medium">
          <p>© 2024 Verdan Landscaping Co. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-emerald-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-emerald-600 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
