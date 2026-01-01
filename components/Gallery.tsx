
import React, { useState, useEffect } from 'react';

interface ProjectImage {
  url: string;
  title: string;
  category: string;
}

export const Gallery: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const projects: ProjectImage[] = [
    {
      url: "/images/gallery/1.jpg",
      title: "Cobble Hill Garden",
      category: "Backyard Transformation"
    },
    {
      url: "/images/gallery/2.jpg",
      title: "Williamsburg Rooftop",
      category: "Urban Terrace"
    },
    {
      url: "/images/gallery/3.jpg",
      title: "Park Slope Patio",
      category: "Hardscaping"
    },
    {
      url: "/images/gallery/4.webp",
      title: "Fort Greene Greenery",
      category: "Native Planting"
    },
    {
      url: "/images/gallery/5.jpg",
      title: "DUMBO Industrial Terrace",
      category: "Modern Design"
    },
    {
      url: "/images/gallery/6.jpg",
      title: "Brooklyn Heights Courtyard",
      category: "Townhouse Garden"
    }
  ];

  const openLightbox = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % projects.length);
    }
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + projects.length) % projects.length);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex]);

  return (
    <section id="gallery" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6">
            Our Portfolio
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight">Recent <span className="text-emerald-600">Masterpieces</span></h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            A glimpse into the outdoor spaces we've transformed across the borough.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="group cursor-pointer"
              onClick={() => openLightbox(index)}
            >
              {/* Image Container */}
              <div className="relative aspect-square rounded-[32px] overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-500 mb-5">
                <img 
                  src={project.url} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                {/* Subtle Hover Overlay */}
                <div className="absolute inset-0 bg-emerald-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur p-4 rounded-full scale-90 group-hover:scale-100 transition-transform duration-500">
                    <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Visible Caption */}
              <div className="px-2">
                <p className="text-emerald-600 text-[10px] font-black uppercase tracking-[0.2em] mb-1">
                  {project.category}
                </p>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  {project.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div 
          className="fixed inset-0 z-[110] bg-slate-900/95 backdrop-blur-md flex items-center justify-center p-4 md:p-12 animate-in fade-in duration-300"
          onClick={closeLightbox}
        >
          <button 
            onClick={closeLightbox}
            className="absolute top-8 right-8 z-[120] text-white/50 hover:text-white transition-colors"
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <button 
            onClick={prevImage}
            className="absolute left-4 md:left-8 z-[120] w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all backdrop-blur-sm"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button 
            onClick={nextImage}
            className="absolute right-4 md:right-8 z-[120] w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all backdrop-blur-sm"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="relative max-w-5xl w-full max-h-[80vh] flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <img 
              src={projects[selectedIndex].url} 
              alt={projects[selectedIndex].title}
              className="max-w-full max-h-[70vh] object-contain rounded-2xl shadow-2xl animate-in zoom-in-95 duration-500"
            />
            <div className="mt-6 text-center text-white">
              <h4 className="text-2xl font-bold mb-1">{projects[selectedIndex].title}</h4>
              <p className="text-emerald-400 font-medium uppercase tracking-widest text-xs">{projects[selectedIndex].category}</p>
              <p className="mt-4 text-white/40 text-sm font-bold">
                {selectedIndex + 1} / {projects.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
