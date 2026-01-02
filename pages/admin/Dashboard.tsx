
import React, { useEffect, useState } from 'react';
import { Sidebar } from '../../components/admin/Sidebar';
import { supabase } from '../../lib/supabase';
import { Link } from 'react-router-dom';
import { ADMIN_URL_PATH, BUSINESS_NAME } from '../../constants';
import { Image01Icon, Message01Icon, HelpCircleIcon, LeftToRightListNumberIcon, ArrowRight01Icon } from 'hugeicons-react';

export const Dashboard = () => {
    const [stats, setStats] = useState({
        portfolio: 0,
        testimonials: 0,
        faqs: 0,
        beforeAfter: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            const [portfolioRes, testimonialRes, faqRes, beforeAfterRes] = await Promise.all([
                supabase.from('portfolio').select('*', { count: 'exact', head: true }),
                supabase.from('testimonials').select('*', { count: 'exact', head: true }),
                supabase.from('faqs').select('*', { count: 'exact', head: true }),
                supabase.from('before_after').select('*', { count: 'exact', head: true }),
            ]);

            setStats({
                portfolio: portfolioRes.count || 0,
                testimonials: testimonialRes.count || 0,
                faqs: faqRes.count || 0,
                beforeAfter: beforeAfterRes.count || 0
            });
            setLoading(false);
        };
        fetchStats();
    }, []);

    const statCards = [
        {
            title: 'Portfolio Projects',
            value: stats.portfolio,
            icon: Image01Icon,
            color: 'emerald',
            link: `/${ADMIN_URL_PATH}/portfolio`,
            description: 'Showcase items'
        },
        {
            title: 'Before & After',
            value: stats.beforeAfter,
            icon: LeftToRightListNumberIcon,
            color: 'blue',
            link: `/${ADMIN_URL_PATH}/visual-proof`,
            description: 'Transformation proofs'
        },
        {
            title: 'Testimonials',
            value: stats.testimonials,
            icon: Message01Icon,
            color: 'amber',
            link: `/${ADMIN_URL_PATH}/testimonials`,
            description: 'Client reviews'
        },
        {
            title: 'FAQs',
            value: stats.faqs,
            icon: HelpCircleIcon,
            color: 'purple',
            link: `/${ADMIN_URL_PATH}/faq`,
            description: 'Active questions'
        },
    ];

    const colorClasses: Record<string, { bg: string; icon: string; shadow: string }> = {
        emerald: { bg: 'bg-emerald-50', icon: 'text-emerald-600', shadow: 'shadow-emerald-100' },
        blue: { bg: 'bg-blue-50', icon: 'text-blue-600', shadow: 'shadow-blue-100' },
        amber: { bg: 'bg-amber-50', icon: 'text-amber-600', shadow: 'shadow-amber-100' },
        purple: { bg: 'bg-purple-50', icon: 'text-purple-600', shadow: 'shadow-purple-100' },
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <Sidebar />
            <div className="lg:pl-80 p-6 lg:p-12">
                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-3xl font-bold text-slate-900">Welcome back! 👋</h1>
                    <p className="text-slate-500 mt-1">Here's an overview of your {BUSINESS_NAME} website content.</p>
                </div>

                {/* Stats Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    {statCards.map((card) => {
                        const Icon = card.icon;
                        const colors = colorClasses[card.color];
                        return (
                            <Link
                                key={card.title}
                                to={card.link}
                                className={`group bg-white p-6 rounded-2xl border border-slate-100 shadow-lg ${colors.shadow} hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center`}>
                                        <Icon className={`w-6 h-6 ${colors.icon}`} />
                                    </div>
                                    <ArrowRight01Icon className="w-5 h-5 text-slate-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-500">{card.title}</p>
                                    <p className="text-3xl font-bold text-slate-900 mt-1">
                                        {loading ? (
                                            <span className="inline-block w-8 h-8 bg-slate-100 rounded animate-pulse"></span>
                                        ) : card.value}
                                    </p>
                                    <p className="text-xs text-slate-400 mt-1">{card.description}</p>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-lg p-6">
                    <h2 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Link
                            to={`/${ADMIN_URL_PATH}/portfolio`}
                            className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
                        >
                            <Image01Icon className="w-5 h-5" />
                            <span className="font-medium text-sm">Add Project</span>
                        </Link>
                        <Link
                            to={`/${ADMIN_URL_PATH}/testimonials`}
                            className="flex items-center gap-3 p-4 rounded-xl bg-amber-50 text-amber-700 hover:bg-amber-100 transition-colors"
                        >
                            <Message01Icon className="w-5 h-5" />
                            <span className="font-medium text-sm">Add Review</span>
                        </Link>
                        <Link
                            to={`/${ADMIN_URL_PATH}/visual-proof`}
                            className="flex items-center gap-3 p-4 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                        >
                            <LeftToRightListNumberIcon className="w-5 h-5" />
                            <span className="font-medium text-sm">Add Comparison</span>
                        </Link>
                        <Link
                            to={`/${ADMIN_URL_PATH}/settings`}
                            className="flex items-center gap-3 p-4 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
                        >
                            <HelpCircleIcon className="w-5 h-5" />
                            <span className="font-medium text-sm">Edit Settings</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
