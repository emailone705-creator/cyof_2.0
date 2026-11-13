import React, { useState } from 'react';
import { ViewRoute } from '../types';

interface FooterProps {
  onNavigate: (route: ViewRoute) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setNewsletterSubscribed(false), 4000);
    }
  };

  return (
    <div className="w-full bg-[#fcf9f4] border-t border-[#E9DFD2]">
      {/* House Newsletter Section */}
      <section className="w-full py-16 px-4 md:px-8 text-center border-b border-[#E9DFD2]">
        <div className="max-w-md mx-auto space-y-4">
          <span className="font-['Manrope'] text-[10px] uppercase tracking-[0.25em] text-[#B94700] font-bold block">
            JOIN THE HOUSE OF CYOF
          </span>
          <h2 className="font-['EB_Garamond'] text-2xl sm:text-3xl text-[#111111] font-normal">
            Sign up to stay up to date on events, collections, and exclusive news.
          </h2>

          <form onSubmit={handleNewsletterSubmit} className="pt-2">
            <div className="relative flex items-center border-b border-[#111111] pb-2">
              <input
                type="email"
                required
                placeholder="Enter your email address *"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="w-full bg-transparent font-['Manrope'] text-xs text-[#111111] focus:outline-none placeholder:text-[#888888]"
              />
              <button
                type="submit"
                className="text-[#111111] hover:text-[#B94700] p-1 font-bold text-lg cursor-pointer"
                aria-label="Subscribe to newsletter"
              >
                →
              </button>
            </div>
            {newsletterSubscribed && (
              <p className="text-[11px] text-[#B94700] font-['Manrope'] mt-2 font-semibold animate-in fade-in">
                Thank you for subscribing to CYOF Private Dispatches.
              </p>
            )}
          </form>
        </div>
      </section>

      {/* Main Luxury Footer */}
      <footer className="w-full py-8 px-4 md:px-8 max-w-[1600px] mx-auto font-['Manrope'] text-xs text-[#111111]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-8 border-b border-[#E9DFD2]">
          <div>
            <h4 className="font-bold text-[10px] uppercase tracking-widest mb-3 text-[#111111]">CLIENT SERVICE</h4>
            <ul className="space-y-2 text-[11px] text-[#57534E]">
              <li>
                <button onClick={() => onNavigate('account-support')} className="hover:text-[#B94700] transition-colors cursor-pointer text-left">
                  Contact Us
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('returns-exchanges')} className="hover:text-[#B94700] transition-colors cursor-pointer text-left">
                  Returns & Exchanges?
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('account')} className="hover:text-[#B94700] transition-colors cursor-pointer text-left">
                  Craftsmanship Appointment
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('faq')} className="hover:text-[#B94700] transition-colors cursor-pointer text-left">
                  FAQ
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[10px] uppercase tracking-widest mb-3 text-[#111111]">ABOUT CYOF</h4>
            <ul className="space-y-2 text-[11px] text-[#57534E]">
              <li>
                <button onClick={() => onNavigate('journal')} className="hover:text-[#B94700] transition-colors cursor-pointer text-left">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('journal')} className="hover:text-[#B94700] transition-colors cursor-pointer text-left">
                  The Atelier Provenance
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('journal')} className="hover:text-[#B94700] transition-colors cursor-pointer text-left">
                  Artisanal Craftsmanship
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('journal')} className="hover:text-[#B94700] transition-colors cursor-pointer text-left">
                  Monographs & Journal
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('journal')} className="hover:text-[#B94700] transition-colors cursor-pointer text-left">
                  Careers
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[10px] uppercase tracking-widest mb-3 text-[#111111]">LEGAL</h4>
            <ul className="space-y-2 text-[11px] text-[#57534E]">
              <li>
                <button onClick={() => onNavigate('terms-conditions')} className="hover:text-[#B94700] transition-colors cursor-pointer text-left">
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('privacy-policy')} className="hover:text-[#B94700] transition-colors cursor-pointer text-left">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('returns-exchanges-policy')} className="hover:text-[#B94700] transition-colors cursor-pointer text-left">
                  Returns & Exchanges Policy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('account-orders')} className="hover:text-[#B94700] transition-colors cursor-pointer text-left">
                  Shipping & Handover Policy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('account-support')} className="hover:text-[#B94700] transition-colors cursor-pointer text-left">
                  Cookie Settings
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[10px] uppercase tracking-widest mb-3 text-[#111111]">STORE LOCATOR</h4>
            <p className="text-[11px] text-[#57534E] leading-relaxed">
              CYOF, Bongaon, North 24 Parganas, West Bengal - 743235
            </p>
            <p className="text-[10px] uppercase tracking-wider text-[#B94700] font-bold mt-2">
              INDIA — EN (₹ INR)
            </p>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-[#888888] uppercase tracking-widest">
          <p>© CYOF BISWAJAL PRIVATE LIMITED • <strong className="text-[#D34500]">#CraftedYourOwnFashion</strong></p>

          <p>PROVENANCE REGISTERED 2026</p>
        </div>
      </footer>
    </div>
  );
};
