
import React from 'react';
import { ContactForm } from './ContactForm';

export const ContactModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-5xl h-[95vh] sm:h-auto max-h-[90vh] overflow-hidden bg-white rounded-t-[32px] sm:rounded-[40px] shadow-2xl animate-in slide-in-from-bottom sm:zoom-in-95 duration-300 flex flex-col">
                {/* Mobile Header / Close Handle */}
                <div className="flex items-center justify-between p-4 sm:hidden border-b border-slate-50">
                    <span className="font-bold text-slate-900">Request Assessment</span>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Desktop Close Button */}
                <button
                    onClick={onClose}
                    className="hidden sm:flex absolute top-6 right-6 z-50 w-12 h-12 bg-white/90 backdrop-blur hover:bg-emerald-600 hover:text-white rounded-full items-center justify-center transition-all text-slate-400 shadow-lg border border-slate-100 group"
                    aria-label="Close modal"
                >
                    <svg className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="overflow-y-auto flex-1 custom-scrollbar">
                    <ContactForm isModal={true} onClose={onClose} />
                </div>
            </div>
        </div>
    );
};
