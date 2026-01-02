
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    DashboardSquare01Icon,
    Settings01Icon,
    Image01Icon,
    Message01Icon,
    HelpCircleIcon,
    LeftToRightListNumberIcon,
    Logout01Icon,
    Menu01Icon,
    Cancel01Icon
} from 'hugeicons-react';
import { cn } from '../../lib/utils';
import { BUSINESS_NAME, ADMIN_URL_PATH } from '../../constants';
import { supabase } from '../../lib/supabase';

const navItems = [
    { to: `/${ADMIN_URL_PATH}/dashboard`, icon: DashboardSquare01Icon, label: 'Dashboard' },
    { to: `/${ADMIN_URL_PATH}/settings`, icon: Settings01Icon, label: 'Settings' },
    { to: `/${ADMIN_URL_PATH}/portfolio`, icon: Image01Icon, label: 'Portfolio' },
    { to: `/${ADMIN_URL_PATH}/visual-proof`, icon: LeftToRightListNumberIcon, label: 'Before & After' },
    { to: `/${ADMIN_URL_PATH}/testimonials`, icon: Message01Icon, label: 'Testimonials' },
    { to: `/${ADMIN_URL_PATH}/faq`, icon: HelpCircleIcon, label: 'FAQ' },
];

const SidebarLink = ({ to, icon: Icon, children }: { to: string; icon: any; children: React.ReactNode }) => (
    <NavLink
        to={to}
        className={({ isActive }) => cn(
            "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
            isActive
                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200"
                : "text-slate-600 hover:bg-emerald-50 hover:text-emerald-700"
        )}
    >
        <Icon className="w-5 h-5" />
        {children}
    </NavLink>
);

export const Sidebar = () => {
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate(`/${ADMIN_URL_PATH}/login`);
    };

    const SidebarContent = () => (
        <>
            {/* Logo */}
            <div className="flex items-center gap-3 mb-8 px-2">
                <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-emerald-200">
                    V
                </div>
                <div>
                    <span className="font-bold text-slate-900 text-lg">{BUSINESS_NAME}</span>
                    <span className="block text-xs text-slate-400">Admin Panel</span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1">
                <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Menu</p>
                {navItems.map((item) => (
                    <SidebarLink key={item.to} to={item.to} icon={item.icon}>
                        {item.label}
                    </SidebarLink>
                ))}
            </nav>

            {/* Logout */}
            <div className="pt-4 border-t border-slate-100">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 text-sm font-medium"
                >
                    <Logout01Icon className="w-5 h-5" />
                    Sign Out
                </button>
            </div>
        </>
    );

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-xl shadow-lg border border-slate-100"
            >
                <Menu01Icon className="w-6 h-6 text-slate-700" />
            </button>

            {/* Mobile Overlay */}
            {mobileOpen && (
                <div className="lg:hidden fixed inset-0 bg-black/50 z-50" onClick={() => setMobileOpen(false)}>
                    <aside
                        className="w-72 h-full bg-white p-6 flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setMobileOpen(false)}
                            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600"
                        >
                            <Cancel01Icon className="w-5 h-5" />
                        </button>
                        <SidebarContent />
                    </aside>
                </div>
            )}

            {/* Desktop Sidebar */}
            <aside className="fixed inset-y-0 left-0 w-72 bg-white border-r border-slate-100 hidden lg:flex flex-col p-6 z-40">
                <SidebarContent />
            </aside>
        </>
    );
};
