
import React, { useState } from 'react';
import { BUSINESS_NAME } from '../constants';

// Fix: Use React.FC to handle React internal props (like 'key') when mapping components
const FAQItem: React.FC<{ question: string, answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <span className={`text-lg font-bold transition-colors ${isOpen ? 'text-emerald-600' : 'text-slate-900 group-hover:text-emerald-600'}`}>
          {question}
        </span>
        <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[300px] pb-6' : 'max-h-0'}`}>
        <p className="text-slate-600 leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
};

export const FAQ: React.FC<{ onContactClick: () => void }> = ({ onContactClick }) => {
  const faqs = [
    {
      question: "Do you handle debris removal for tight Brooklyn spaces?",
      answer: "Absolutely. We specialize in urban logistics. Whether it's a brownstone with narrow hallway access or a rooftop garden, our crew manages all debris removal and ensures your space is spotless when we leave."
    },
    {
      question: "How quickly can you start a new project?",
      answer: "Typically, maintenance can start within 1 week. Larger design and installation projects usually have a 2-4 week lead time depending on the season. We recommend booking your Free Assessment early to secure your spot."
    },
    {
      question: "Do I need to be home for maintenance visits?",
      answer: "No, as long as our crew has access to the yard or outdoor space. Many of our clients are at work during our visits. We send a text confirmation before we arrive and a photo of the completed work once we're done."
    },
    {
      question: "What happens if it rains on my scheduled day?",
      answer: "Safety and quality are our priorities. If the weather doesn't permit work, we will notify you via text and automatically reschedule you for the next available clear day—usually within 48 hours."
    },
    {
      question: "Do you offer organic or pet-safe treatments?",
      answer: "Yes! We live in Brooklyn too, and we know how important pet safety is. We use eco-friendly, organic fertilizers and pest control methods upon request to keep your furry friends and the local environment safe."
    }
  ];

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">Frequently Asked Questions</h2>
          <p className="text-lg text-slate-600">Everything you need to know about working with {BUSINESS_NAME}.</p>
        </div>
        <div className="bg-slate-50 rounded-[40px] p-8 md:p-12 border border-slate-100">
          {faqs.map((faq, index) => (
            <FAQItem key={index} {...faq} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <p className="text-slate-500 mb-6">Have a different question?</p>
          <button
            onClick={onContactClick}
            className="inline-flex items-center gap-2 text-emerald-600 font-bold hover:gap-3 transition-all"
          >
            Contact our team directly
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};
