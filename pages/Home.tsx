
import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { BUSINESS_NAME, BUSINESS_AREA } from '../constants';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { ProblemSolution } from '../components/ProblemSolution';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { Services } from '../components/Services';
import { Gallery } from '../components/Gallery';
import { BeforeAfter } from '../components/BeforeAfter';
import { HowItWorks } from '../components/HowItWorks';
import { FAQ } from '../components/FAQ';
import { FinalCTA } from '../components/FinalCTA';
import { ContactForm } from '../components/ContactForm';
import { Footer } from '../components/Footer';
import { ContactModal } from '../components/ContactModal';

export const Home: React.FC = () => {
    const [showBackToTop, setShowBackToTop] = useState(false);
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);

    // Data state
    const [testimonials, setTestimonials] = useState<any[]>([]);
    const [portfolio, setPortfolio] = useState<any[]>([]);
    const [beforeAfter, setBeforeAfter] = useState<any[]>([]);
    const [faqs, setFaqs] = useState<any[]>([]);
    const [settings, setSettings] = useState<any>({});

    const openContactModal = () => setIsContactModalOpen(true);
    const closeContactModal = () => setIsContactModalOpen(false);

    useEffect(() => {
        const fetchData = async () => {
            // Fetch settings
            const { data: settingsData } = await supabase.from('settings').select('*');
            if (settingsData) {
                setSettings(settingsData.reduce((acc, curr) => ({ ...acc, [curr.key]: curr.value }), {}));
            }

            // Fetch other data
            const { data: testimonialsData } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false });
            if (testimonialsData) setTestimonials(testimonialsData);

            const { data: portfolioData } = await supabase.from('portfolio').select('*').order('created_at', { ascending: false });
            if (portfolioData) setPortfolio(portfolioData.map(p => ({ url: p.image_url, title: p.title, category: p.category })));

            const { data: beforeAfterData } = await supabase.from('before_after').select('*').order('created_at', { ascending: false });
            if (beforeAfterData) setBeforeAfter(beforeAfterData);

            const { data: faqData } = await supabase.from('faqs').select('*').order('created_at', { ascending: false });
            if (faqData) setFaqs(faqData);
        };

        fetchData();
    }, []);

    useEffect(() => {
        document.title = `${BUSINESS_NAME} Landscaping Co. | ${BUSINESS_AREA}’s Modern Outdoor Experts`;

        const handleScroll = () => {
            setShowBackToTop(window.scrollY > 800);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Prevent scroll when modal is open
    useEffect(() => {
        if (isContactModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isContactModalOpen]);

    const defaultTestimonials = [
        {
            name: "Alex M.",
            loc: "Park Slope",
            content: `Our backyard was a mess for years. ${BUSINESS_NAME} fixed everything and now we actually use the space. Highly recommend.`,
            avatar: "https://i.pravatar.cc/150?u=alex_bk"
        },
        {
            name: "Jasmine T.",
            loc: "Williamsburg",
            content: "Reliable, clean work, and great communication. That alone is rare in NYC. They transformed my rooftop garden.",
            avatar: "https://i.pravatar.cc/150?u=jasmine_bk"
        },
        {
            name: "Marcus L.",
            loc: "Red Hook",
            content: `Property value instantly improved. Tenants noticed immediately. ${BUSINESS_NAME} handles the maintenance so I don't have to.`,
            avatar: "https://i.pravatar.cc/150?u=marcus_bk"
        },
        {
            name: "Sarah K.",
            loc: "Cobble Hill",
            content: `The level of professionalism was outstanding. They really understand how to work with small ${BUSINESS_AREA} spaces.`,
            avatar: "https://i.pravatar.cc/150?u=sarah_bk"
        },
        {
            name: "David R.",
            loc: "Greenpoint",
            content: `Transparent pricing from the start. No hidden fees or '${BUSINESS_AREA} surcharges'. Just honest, high-quality landscaping.`,
            avatar: "https://i.pravatar.cc/150?u=david_bk"
        },
        {
            name: "Elena V.",
            loc: "Brooklyn Heights",
            content: `We have very narrow access to our garden. Most companies turned us down, but ${BUSINESS_NAME} handled it like pros. Zero damage, 100% satisfaction.`,
            avatar: "https://i.pravatar.cc/150?u=elena_bk"
        }
    ];
    const displayTestimonials = testimonials.length > 0 ? testimonials.map(t => ({
        name: t.name,
        loc: t.location,
        content: t.content,
        avatar: t.avatar_url || `https://ui-avatars.com/api/?name=${t.name}`
    })) : defaultTestimonials;

    return (
        <div className="min-h-screen selection:bg-emerald-100 selection:text-emerald-900 relative">
            <Header
                onContactClick={openContactModal}
                phone={settings.phone}
                bannerText={settings.banner_text}
                bannerActive={settings.banner_active}
            />

            <main>
                <Hero onContactClick={openContactModal} />
                <ProblemSolution />
                <WhyChooseUs onContactClick={openContactModal} />
                <Services onContactClick={openContactModal} />

                <section className="py-16 bg-white">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="bg-emerald-50 rounded-[48px] p-8 md:p-16 border border-emerald-100 flex flex-col md:flex-row items-center gap-12">
                            <div className="flex-shrink-0 relative">
                                <div className="w-32 h-32 md:w-40 md:h-40 bg-white rounded-full flex items-center justify-center text-6xl shadow-xl border-4 border-emerald-500 relative z-10">
                                    🛡️
                                </div>
                                <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-20"></div>
                            </div>
                            <div className="text-center md:text-left">
                                <h3 className="text-2xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">The {BUSINESS_NAME} Peace-of-Mind Guarantee</h3>
                                <p className="text-slate-600 text-lg mb-8 max-w-2xl">We take the risk out of home improvement. If you're not 100% satisfied with our work, we'll keep working until it's right—at no extra cost to you.</p>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                    <div className="flex items-center gap-3">
                                        <span className="text-xl">✨</span>
                                        <span className="font-bold text-slate-900 text-sm uppercase tracking-wider">No-Mess Promise</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-xl">⏰</span>
                                        <span className="font-bold text-slate-900 text-sm uppercase tracking-wider">Punctual Arrival</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-xl">💰</span>
                                        <span className="font-bold text-slate-900 text-sm uppercase tracking-wider">Locked-In Quotes</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <Gallery items={portfolio} />

                <BeforeAfter onContactClick={openContactModal} items={beforeAfter} />

                <section className="py-24 bg-white overflow-hidden">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-6xl font-bold text-slate-900 mb-4 tracking-tight">What Your Neighbors Say</h2>
                            <p className="text-lg text-slate-600 font-medium">Rated 4.9/5 stars across {BUSINESS_AREA}.</p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {displayTestimonials.map((t, i) => (
                                <div key={i} className="bg-slate-50 p-10 rounded-[48px] border border-slate-100 hover:shadow-2xl hover:shadow-emerald-100/30 transition-all duration-500 hover:-translate-y-1">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="flex gap-1 text-amber-400">
                                            {[1, 2, 3, 4, 5].map(s => <span key={s}>★</span>)}
                                        </div>
                                        <span className="bg-emerald-100 text-emerald-700 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest">Verified Project</span>
                                    </div>
                                    <p className="text-slate-700 leading-relaxed mb-10 text-lg font-medium italic">"{t.content}"</p>
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 bg-emerald-600 rounded-2xl overflow-hidden shadow-lg shadow-emerald-200 flex-shrink-0 border-2 border-white">
                                            <img
                                                src={t.avatar}
                                                alt={t.name}
                                                className="w-full h-full object-cover"
                                                loading="lazy"
                                            />
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-900">{t.name}</p>
                                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">{t.loc}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <HowItWorks onContactClick={openContactModal} />
                <FAQ onContactClick={openContactModal} items={faqs} />
                <FinalCTA onContactClick={openContactModal} />

                {/* Footer Contact Form */}
                <ContactForm />
            </main>

            <Footer phone={settings.phone} email={settings.email} />
            <ContactModal isOpen={isContactModalOpen} onClose={closeContactModal} />

            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className={`fixed bottom-24 right-6 md:bottom-10 md:right-10 z-50 p-4 bg-white border border-slate-100 text-emerald-600 rounded-full shadow-2xl transition-all duration-500 ${showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
                    } hover:bg-emerald-50 hover:scale-110 active:scale-95`}
                aria-label="Back to top"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 15l7-7 7 7" />
                </svg>
            </button>

            <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:hidden pointer-events-none">
                <div className="max-w-md mx-auto flex gap-3 pointer-events-auto">
                    <a
                        href="tel:7185550192"
                        className="flex-1 bg-white border-2 border-emerald-600 text-emerald-600 py-4 rounded-2xl font-bold text-center shadow-xl flex items-center justify-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 005.47 5.47l.772-1.548a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path></svg>
                        Call
                    </a>
                    <button
                        onClick={openContactModal}
                        className="flex-[2] bg-emerald-600 text-white py-4 rounded-2xl font-bold text-center shadow-xl shadow-emerald-200 flex items-center justify-center gap-2"
                    >
                        Get Free Quote
                    </button>
                </div>
            </div>
        </div>
    );
};
