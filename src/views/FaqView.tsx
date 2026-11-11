import React, { useState } from 'react';
import { ViewRoute } from '../types';

interface FaqViewProps {
  onNavigate: (route: ViewRoute) => void;
}

export const FaqView: React.FC<FaqViewProps> = ({ onNavigate }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const faqs = [
    {
      category: 'Shipping & Delivery',
      q: 'How does CYOF White-Glove Hand-Delivery operate across India?',
      a: 'All CYOF creations are housed in custom cedar garment boxes and delivered by our private chauffeur fleet in Mumbai, New Delhi, and Bengaluru, and via secure armed air freight across all other Indian cities. Handover requires encrypted patron signature and OTP authorization.',
    },
    {
      category: 'Atelier & Bespoke',
      q: 'Can I request bespoke size adjustments or tailoring after delivery?',
      a: 'Yes. Every CYOF acquisition includes complimentary lifetime atelier adjustments. You may request a salon fitting appointment or schedule our visiting master tailor to attend to you at your residence.',
    },
    {
      category: 'Atelier & Bespoke',
      q: 'What is the authenticity guarantee for CYOF hand-painted garments?',
      a: 'Each piece is individually painted by our master artisans and inscribed with a unique serial number in our central archive. A physical NFC-embedded Provenance Certificate accompanies every piece.',
    },
    {
      category: 'Orders & Payments',
      q: 'What payment modes are accepted for luxury commissions?',
      a: 'We accept Indian UPI (Google Pay, PhonePe, Paytm, BHIM), Indian NetBanking (HDFC, ICICI, SBI, Axis, Kotak), RuPay Infinite, Visa, MasterCard, and American Express in Indian Rupees (INR ₹). All transactions are encrypted and GST compliant.',
    },
    {
      category: 'Appointments',
      q: 'How do I arrange a private salon fitting rendezvous?',
      a: 'You can tap the "Book Private Salon Fitting" button or contact our concierge to reserve private salon suites at The Oberoi (Mumbai), DLF Emporio (New Delhi), UB City (Bengaluru), or Taj Falaknuma Palace (Hyderabad).',
    },
    {
      category: 'Care & Preservation',
      q: 'What is the care protocol for vegetable-tanned leather and hand-painted silk?',
      a: 'Garments should be stored within the provided breathable cedar garment bags at controlled humidity. We provide complimentary annual conditioning and hand-paint preservation at our atelier.',
    },
    {
      category: 'Orders & Payments',
      q: 'How do I track my active order and bespoke creation timeline?',
      a: 'Once your commission enters our atelier, you will receive real-time SMS dispatches and can view your garment\'s artisan progress and chauffeur dispatch in your Client Dossier under Orders & Dispatches.',
    },
    {
      category: 'Shipping & Delivery',
      q: 'What are the returns and exchanges terms for bespoke creations?',
      a: 'CYOF offers complimentary 14-day white-glove reverse collection across India for unworn creations with intact security seals and provenance passports. Bespoke custom-monogrammed commissions are tailored specifically for you and include lifetime tailoring rather than return.',
    },
  ];

  const categories = ['All', 'Shipping & Delivery', 'Atelier & Bespoke', 'Orders & Payments', 'Appointments', 'Care & Preservation'];

  const filteredFaqs = faqs.filter((f) => {
    const matchesCategory = activeCategory === 'All' || f.category === activeCategory;
    const matchesSearch =
      f.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.a.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full flex flex-col bg-[#fcf9f4] min-h-screen text-[#1c1c19] pb-24">
      {/* Breadcrumb Bar */}
      <div className="w-full bg-[#f6f3ee] px-4 md:px-8 lg:px-16 pt-6 pb-3 sm:py-3 border-b border-[#E9DFD2]">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between font-['Manrope'] text-xs">
          <div className="flex items-center gap-2 text-[#57534E]">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-[#B94700] transition-colors uppercase tracking-wider cursor-pointer"
            >
              Flagship
            </button>
            <span className="text-[#E9DFD2]">/</span>
            <button
              onClick={() => onNavigate('account-support')}
              className="hover:text-[#B94700] transition-colors uppercase tracking-wider cursor-pointer"
            >
              Client Service
            </button>
            <span className="text-[#E9DFD2]">/</span>
            <span className="text-[#111111] font-semibold uppercase tracking-wider">FAQ</span>
          </div>
          <button
            onClick={() => onNavigate('home')}
            className="hidden sm:flex items-center gap-1 uppercase tracking-widest text-[#57534E] hover:text-[#B94700] transition-colors font-semibold cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>Return to Flagship</span>
          </button>
        </div>
      </div>

      {/* Main Editorial Header Lockup */}
      <header className="w-full max-w-[1100px] mx-auto px-4 md:px-8 pt-12 md:pt-16 pb-8 border-b border-[#E9DFD2]">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-[#B94700]" />
            <span className="font-['Manrope'] text-[10px] tracking-[0.28em] text-[#57534E] uppercase font-bold">
              CYOF CLIENT SERVICE • KNOWLEDGE BASE • #CraftedYourOwnFashion
            </span>
          </div>

          <h1 className="font-['EB_Garamond'] text-3xl sm:text-4xl md:text-5xl text-[#111111] tracking-tight font-normal">
            Frequently Asked Questions
          </h1>

          <p className="font-['Manrope'] text-xs sm:text-sm text-[#57534E] max-w-2xl leading-relaxed">
            Explore curated answers regarding our hand-painted bespoke craftsmanship, complimentary white-glove chauffeur deliveries, lifetime adjustments, and private client care.
          </p>
        </div>
      </header>

      {/* Main FAQ Content Body */}
      <main className="w-full max-w-[1100px] mx-auto px-4 md:px-8 py-10 md:py-14 space-y-10">
        
        {/* Search & Category Filter Section */}
        <div className="space-y-6">
          {/* Search Bar */}
          <div className="relative w-full max-w-xl mx-auto font-['Manrope']">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search knowledge base or keywords (e.g. delivery, tailoring, leather, payment)..."
              className="w-full bg-white border border-[#E9DFD2] pl-11 pr-10 py-3.5 text-xs text-[#111111] placeholder:text-[#888888] focus:outline-none focus:border-[#B94700] shadow-xs"
            />
            <span className="material-symbols-outlined text-[20px] text-[#57534E] absolute left-3.5 top-3.5">
              search
            </span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="material-symbols-outlined text-[18px] text-[#888888] hover:text-[#111111] absolute right-3.5 top-3.5 cursor-pointer"
              >
                close
              </button>
            )}
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 font-['Manrope'] text-[11px] uppercase tracking-wider font-semibold transition-colors cursor-pointer border ${
                  activeCategory === cat
                    ? 'bg-[#111111] text-white border-[#111111]'
                    : 'bg-white text-[#57534E] border-[#E9DFD2] hover:border-[#111111] hover:text-[#111111]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Selected FAQ Component Section */}
        <div className="bg-white border border-[#E9DFD2] p-6 sm:p-10 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E9DFD2] gap-3">
            <div>
              <span className="font-['Manrope'] text-[10px] uppercase tracking-widest text-[#B94700] font-bold block mb-1">
                KNOWLEDGE BASE
              </span>
              <h2 className="font-['EB_Garamond'] text-2xl sm:text-3xl text-[#111111] font-normal">
                Frequently Inquired Curations
              </h2>
            </div>
            <span className="font-['Manrope'] text-xs text-[#57534E]">
              Showing {filteredFaqs.length} {filteredFaqs.length === 1 ? 'result' : 'results'}
            </span>
          </div>

          {filteredFaqs.length === 0 ? (
            <div className="py-12 text-center space-y-3 font-['Manrope']">
              <span className="material-symbols-outlined text-4xl text-[#E9DFD2]">help_outline</span>
              <p className="text-sm font-semibold text-[#111111]">No matching inquiries found</p>
              <p className="text-xs text-[#57534E]">
                Please try a different search phrase or contact our concierge desk directly.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('All');
                }}
                className="mt-2 text-xs text-[#B94700] hover:underline font-semibold cursor-pointer"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="space-y-3 font-['Manrope']">
              {filteredFaqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="border border-[#E9DFD2] bg-white overflow-hidden transition-colors"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full p-4 sm:p-5 text-left flex items-center justify-between text-xs sm:text-sm font-semibold text-[#111111] hover:text-[#B94700] cursor-pointer gap-4"
                    >
                      <span className="flex-1">{faq.q}</span>
                      <span className="material-symbols-outlined text-[20px] text-[#B94700] shrink-0">
                        {isOpen ? 'expand_less' : 'expand_more'}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-[#57534E] leading-relaxed border-t border-[#f0ede9] bg-[#fcfbf9]">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Closing Note */}
        <div className="border-t border-[#E9DFD2] pt-6 text-center">
          <p className="font-['EB_Garamond'] text-xl sm:text-2xl text-[#111111] italic">
            Excellence in every bespoke thread.
          </p>
          <p className="font-['Manrope'] text-[10px] uppercase tracking-[0.25em] text-[#B94700] mt-2">
            #CraftedYourOwnFashion
          </p>
        </div>

        {/* Bottom Navigation CTA */}
        <div className="pt-8 border-t border-[#D34500] flex flex-col sm:flex-row items-center justify-between gap-4 font-['Manrope']">
          <button
            onClick={() => onNavigate('home')}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#D34500] hover:bg-[#B94700] text-white text-xs uppercase tracking-widest font-semibold transition-colors shadow-xs cursor-pointer"
          >
            Return to Flagship Boutique
          </button>

          <button
            onClick={() => onNavigate('account-support')}
            className="text-xs text-[#57534E] hover:text-[#B94700] transition-colors uppercase tracking-wider font-semibold cursor-pointer"
          >
            Contact Concierge Support Desk →
          </button>
        </div>
      </main>
    </div>
  );
};
