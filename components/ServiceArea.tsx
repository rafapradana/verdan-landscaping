
import React, { useState } from 'react';

interface Neighborhood {
  name: string;
  x: number; // percentage
  y: number; // percentage
}

const neighborhoods: Neighborhood[] = [
  { name: "Williamsburg", x: 58, y: 28 },
  { name: "Bushwick", x: 78, y: 38 },
  { name: "Park Slope", x: 38, y: 58 },
  { name: "Brooklyn Heights", x: 22, y: 35 },
  { name: "Downtown Brooklyn", x: 32, y: 32 },
  { name: "Red Hook", x: 18, y: 52 },
  { name: "Greenpoint", x: 55, y: 15 },
  { name: "Cobble Hill", x: 22, y: 45 },
  { name: "Carroll Gardens", x: 28, y: 52 },
  { name: "Clinton Hill", x: 48, y: 38 },
  { name: "Fort Greene", x: 42, y: 35 },
  { name: "DUMBO", x: 28, y: 22 }
];

const MapHotspot: React.FC<{ neighborhood: Neighborhood; isActive: boolean; onHover: (name: string | null) => void }> = ({ neighborhood, isActive, onHover }) => (
  <div 
    className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-300 z-20"
    style={{ left: `${neighborhood.x}%`, top: `${neighborhood.y}%` }}
    onMouseEnter={() => onHover(neighborhood.name)}
    onMouseLeave={() => onHover(null)}
  >
    <div className="relative group cursor-pointer">
      <span className={`relative flex h-5 w-5 ${isActive ? 'scale-125' : 'scale-100'} transition-transform duration-300`}>
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 ${isActive ? 'block' : 'hidden group-hover:block'}`}></span>
        <span className={`relative inline-flex rounded-full h-5 w-5 ${isActive ? 'bg-emerald-500 scale-110' : 'bg-emerald-600'} border-2 border-white shadow-lg shadow-emerald-900/20`}></span>
      </span>
      
      {/* Tooltip */}
      <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-lg shadow-xl whitespace-nowrap pointer-events-none transition-all duration-300 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'}`}>
        {neighborhood.name}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-900"></div>
      </div>
    </div>
  </div>
);

export const ServiceArea: React.FC = () => {
  const [activeNeighborhood, setActiveNeighborhood] = useState<string | null>(null);

  return (
    <section id="service-area" className="py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>
              Local Brooklyn Experts
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
              Serving Every Corner of Brooklyn
            </h2>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed">
              We specialize in the unique constraints of Brooklyn properties—from historic brownstone gardens to modern rooftop terraces and tight industrial backyards.
            </p>
            
            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              {neighborhoods.map((area, i) => (
                <div 
                  key={i} 
                  className={`flex items-center gap-3 font-bold transition-all duration-300 cursor-default ${activeNeighborhood === area.name ? 'text-emerald-600 translate-x-2' : 'text-slate-500'}`}
                  onMouseEnter={() => setActiveNeighborhood(area.name)}
                  onMouseLeave={() => setActiveNeighborhood(null)}
                >
                  <div className={`w-2 h-2 rounded-full transition-all duration-300 ${activeNeighborhood === area.name ? 'bg-emerald-500 scale-150' : 'bg-slate-300'}`}></div>
                  {area.name}
                </div>
              ))}
            </div>

            <div className="mt-12 p-8 bg-white rounded-3xl border border-slate-200 shadow-sm flex items-center gap-6 group hover:border-emerald-200 transition-colors">
              <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                📍
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 mb-1">Live in another borough?</p>
                <p className="text-xs text-slate-500 leading-relaxed">We also take select commercial and residential projects in <span className="text-emerald-600 font-bold">Queens</span> & <span className="text-emerald-600 font-bold">Lower Manhattan</span> on a case-by-case basis.</p>
              </div>
            </div>
          </div>

          <div className="relative">
            {/* Interactive Map Container */}
            <div className="relative rounded-[48px] overflow-hidden shadow-2xl border-[12px] border-white bg-slate-100 aspect-square group">
              
              {/* Modern Digital Map Grid Background */}
              <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#10b981 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}></div>
              
              {/* Stylized Brooklyn Shape SVG */}
              <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full p-12 z-10 fill-slate-200/50 stroke-slate-300 stroke-[0.5] drop-shadow-sm pointer-events-none">
                <path d="M55,10 L65,15 L70,30 L85,40 L88,55 L82,75 L70,85 L50,90 L30,85 L15,70 L10,50 L12,30 L25,15 L40,10 Z" />
              </svg>

              {/* Interactive Neighborhood Hotspots */}
              {neighborhoods.map((n, i) => (
                <MapHotspot 
                  key={i} 
                  neighborhood={n} 
                  isActive={activeNeighborhood === n.name} 
                  onHover={setActiveNeighborhood}
                />
              ))}

              {/* Scanner Effect */}
              <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-emerald-500/5 to-transparent border-b border-emerald-500/10 -translate-y-full animate-[scan_6s_linear_infinite] pointer-events-none z-10"></div>
              
              {/* Map UI Elements */}
              <div className="absolute top-6 left-6 z-30 flex flex-col gap-2">
                <div className="bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg shadow-lg border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Borough</p>
                  <p className="text-sm font-black text-emerald-600">BROOKLYN</p>
                </div>
              </div>

              <div className="absolute bottom-6 right-6 z-30 flex flex-col gap-2">
                <div className="w-12 h-12 bg-white/90 backdrop-blur rounded-2xl shadow-xl flex items-center justify-center text-slate-400 hover:text-emerald-600 transition-colors cursor-pointer border border-slate-100">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6v12m6-6H6" /></svg>
                </div>
                <div className="w-12 h-12 bg-white/90 backdrop-blur rounded-2xl shadow-xl flex items-center justify-center text-slate-400 hover:text-emerald-600 transition-colors cursor-pointer border border-slate-100">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M20 12H4" /></svg>
                </div>
              </div>

              {/* Bottom Legend */}
              <div className="absolute bottom-6 left-6 z-30">
                <div className="bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex items-center gap-4">
                  <div className="flex -space-x-2">
                    {[1,2,3].map(i => (
                      <div key={i} className="w-6 h-6 rounded-full border-2 border-slate-900 bg-emerald-500 flex items-center justify-center text-[8px] text-white font-bold">V</div>
                    ))}
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-emerald-400 uppercase tracking-widest leading-none mb-1">Live Updates</p>
                    <p className="text-xs font-bold text-white leading-none">Crews Active in Area</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Background Glow */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-200/20 blur-[60px] rounded-full pointer-events-none"></div>
            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-emerald-200/30 blur-[80px] rounded-full pointer-events-none"></div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
      `}</style>
    </section>
  );
};
