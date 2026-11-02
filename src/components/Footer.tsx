import React, { useState } from 'react';
import { ViewRoute } from '../types';

interface FooterProps {
  onNavigate: (route: ViewRoute) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="w-full bg-[#E9DFD2]/40 border-t border-[#E9DFD2] pt-16 pb-12">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
          {/* Gazette Newsletter Column */}
          <div className="lg:col-span-5 space-y-4">
            <span className="font-['Manrope'] text-[10px] uppercase tracking-[0.2em] text-[#57534E] block font-semibold">
              L'Édition Exclusive • #CraftedYourOwnFashion
            </span>
            <h4 className="font-['EB_Garamond'] text-2xl lg:text-3xl text-[#111111]">
              The CYOF Gazette & Atelier Inquiries
            </h4>
            <p className="font-['Manrope'] text-sm text-[#594238] max-w-md leading-relaxed">
              Receive intimate dispatches, private salon invitations, and seasonal monograph previews direct from our Mumbai and New Delhi ateliers.
            </p>
            
            <form onSubmit={handleSubscribe} className="pt-2 max-w-md">
              <div className="flex items-center border-b border-[#111111] pb-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ENTER YOUR EMAIL ADDRESS"
                  required
                  className="w-full bg-transparent font-['Manrope'] text-xs text-[#111111] placeholder-[#57534E] focus:outline-none uppercase tracking-widest"
                />
                <button
                  type="submit"
                  className="font-['Manrope'] text-xs font-semibold text-[#111111] hover:text-[#B94700] uppercase tracking-widest transition-colors cursor-pointer pl-4 whitespace-nowrap"
                >
                  JOIN
                </button>
              </div>
              {subscribed && (
                <p className="font-['Manrope'] text-[11px] text-[#B94700] mt-2 uppercase tracking-wider">
                  ✓ Your address has been inscribed to the private CYOF salon registry.
                </p>
              )}
            </form>
          </div>

          {/* Client Care Column */}
          <div className="lg:col-span-2 space-y-3">
            <h5 className="font-['Manrope'] text-xs uppercase tracking-widest text-[#111111] font-bold">
              Client Care
            </h5>
            <ul className="space-y-2 font-['Manrope'] text-xs text-[#594238]">
              <li>
                <button onClick={() => onNavigate('account-orders')} className="hover:text-[#B94700] transition-colors cursor-pointer text-left">
                  My Orders & Shipments
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('account-returns')} className="hover:text-[#B94700] transition-colors cursor-pointer text-left">
                  Returns & Exchanges
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('account-invoices')} className="hover:text-[#B94700] transition-colors cursor-pointer text-left">
                  Tax Invoices & GST
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('account-loyalty')} className="hover:text-[#B94700] transition-colors cursor-pointer text-left">
                  Atelier Privé Rewards
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('account-support')} className="hover:text-[#B94700] transition-colors cursor-pointer text-left">
                  Concierge Support & FAQs
                </button>
              </li>
            </ul>
          </div>

          {/* CYOF Heritage Column */}
          <div className="lg:col-span-2 space-y-3">
            <h5 className="font-['Manrope'] text-xs uppercase tracking-widest text-[#111111] font-bold">
              CYOF Heritage
            </h5>
            <ul className="space-y-2 font-['Manrope'] text-xs text-[#594238]">
              <li>
                <button onClick={() => onNavigate('journal')} className="hover:text-[#B94700] transition-colors cursor-pointer text-left">
                  L'Atelier 1928
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('journal')} className="hover:text-[#B94700] transition-colors cursor-pointer text-left">
                  Master Artisans
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('journal')} className="hover:text-[#B94700] transition-colors cursor-pointer text-left">
                  Monographs & Journal
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('journal')} className="hover:text-[#B94700] transition-colors cursor-pointer text-left">
                  Conscious Craft Charter
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('journal')} className="hover:text-[#B94700] transition-colors cursor-pointer text-left">
                  Archive Exhibitions
                </button>
              </li>
            </ul>
          </div>

          {/* Flagship Boutiques Column */}
          <div className="lg:col-span-3 space-y-3">
            <h5 className="font-['Manrope'] text-xs uppercase tracking-widest text-[#111111] font-bold">
              India Flagship Salons
            </h5>
            <p className="font-['Manrope'] text-xs text-[#594238] leading-relaxed">
              The Oberoi, Nariman Point, Mumbai 400021<br />
              DLF Emporio, Vasant Kunj, New Delhi 110070<br />
              UB City, Vittal Mallya Road, Bengaluru 560001<br />
              Taj Falaknuma Palace Arcade, Hyderabad 500053
            </p>
            <div className="pt-1 text-[11px] font-['Manrope'] text-[#B94700] font-semibold">
              Prices in INR (₹) • GST Registered
            </div>
            <button
              onClick={() => onNavigate('account')}
              className="inline-block font-['Manrope'] text-[10px] text-[#111111] underline underline-offset-4 hover:text-[#B94700] uppercase tracking-widest font-semibold pt-1 cursor-pointer"
            >
              LOCATE A PRIVATE SALON
            </button>
          </div>
        </div>

        {/* Bottom Rights & Policy Row */}
        <div className="pt-8 border-t border-[#E9DFD2] flex flex-col md:flex-row items-center justify-between text-[#57534E] text-[10px] font-['Manrope'] gap-4">
          <div className="flex items-center gap-2 tracking-widest uppercase">
            <span>© 2026 CYOF HAUTE COUTURE INDIA. ALL RIGHTS RESERVED.</span>
            <span className="hidden sm:inline">•</span>
            <span className="text-[#B94700] font-bold">#CraftedYourOwnFashion</span>
          </div>

          <div className="flex items-center space-x-6 uppercase tracking-widest">
            <button onClick={() => onNavigate('account')} className="hover:text-[#111111] transition-colors cursor-pointer">
              Privacy Policy
            </button>
            <button onClick={() => onNavigate('account')} className="hover:text-[#111111] transition-colors cursor-pointer">
              Terms of Service
            </button>
            <button onClick={() => onNavigate('account')} className="hover:text-[#111111] transition-colors cursor-pointer">
              Legal Notices
            </button>
            <button onClick={() => onNavigate('account')} className="hover:text-[#111111] transition-colors cursor-pointer">
              Accessibility
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
