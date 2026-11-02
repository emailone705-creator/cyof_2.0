import React, { useState } from 'react';
import { ViewRoute } from '../../types';
import { AccountNavHeader } from '../../components/AccountNavHeader';

interface SupportViewProps {
  onNavigate: (route: ViewRoute) => void;
  onOpenSalonModal: () => void;
}

export const SupportView: React.FC<SupportViewProps> = ({
  onNavigate,
  onOpenSalonModal,
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [inquirySubject, setInquirySubject] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Encrypted client dispatch transmitted to Mumbai Client Care Desk');
    setInquirySubject('');
    setInquiryMessage('');
  };

  const faqs = [
    {
      q: 'How does CYOF White-Glove Hand-Delivery operate across India?',
      a: 'All CYOF creations are housed in custom cedar garment boxes and delivered by our private chauffeur fleet in Mumbai, New Delhi, and Bengaluru, and via secure armed air freight across all other Indian cities. Handover requires encrypted patron signature and OTP authorization.',
    },
    {
      q: 'Can I request bespoke size adjustments or tailoring after delivery?',
      a: 'Yes. Every CYOF acquisition includes complimentary lifetime atelier adjustments. You may request a salon fitting appointment or schedule our visiting master tailor to attend to you at your residence.',
    },
    {
      q: 'What is the authenticity guarantee for CYOF hand-painted garments?',
      a: 'Each piece is individually painted by our master artisans and inscribed with a unique serial number in our Mumbai central archive. A NFC-embedded physical Provenance Certificate accompanies every piece.',
    },
    {
      q: 'What payment modes are accepted for luxury commissions?',
      a: 'We accept Indian UPI (Google Pay, PhonePe, Paytm, BHIM), Indian NetBanking (HDFC, ICICI, SBI, Axis, Kotak), RuPay Infinite, Visa, MasterCard, and American Express in Indian Rupees (INR ₹). All transactions are encrypted and GST compliant.',
    },
    {
      q: 'How do I arrange a private salon fitting rendezvous?',
      a: 'You can tap the "Book Private Salon Fitting" button at the top of your Client Dossier to reserve private salon suites at The Oberoi (Mumbai), DLF Emporio (New Delhi), UB City (Bengaluru), or Taj Falaknuma Palace (Hyderabad).',
    },
    {
      q: 'What is the care protocol for vegetable-tanned leather and hand-painted silk?',
      a: 'Garments should be stored within the provided breathable cedar garment bags at controlled humidity. We provide complimentary annual conditioning and hand-paint preservation at our Kala Ghoda atelier.',
    },
  ];

  const filteredFaqs = faqs.filter(
    (f) =>
      f.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full flex flex-col bg-[#fcf9f4] min-h-screen text-[#1c1c19] py-8 sm:py-12 px-4 md:px-8 lg:px-12 max-w-[1500px] mx-auto">
      {toastMessage && (
        <div className="fixed top-24 right-4 z-50 bg-[#111111] text-white text-xs font-['Manrope'] px-5 py-3.5 shadow-2xl border-l-4 border-[#B94700] animate-in slide-in-from-top-2 flex items-center gap-3">
          <span className="material-symbols-outlined text-[18px] text-[#B94700]">verified</span>
          <span>{toastMessage}</span>
        </div>
      )}

      <AccountNavHeader
        currentRoute="account-support"
        onNavigate={onNavigate}
        title="Help & Concierge Support"
        subtitle="Dedicated Client Care • India Concierge Desk"
        onOpenSalonModal={onOpenSalonModal}
      />

      <div className="space-y-8 font-['Manrope']">
        {/* Support Channels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white border border-[#E9DFD2] shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <span className="material-symbols-outlined text-[28px] text-[#B94700]">call</span>
              <h4 className="font-['EB_Garamond'] text-2xl font-bold text-[#111111]">
                Toll-Free Concierge Hotline
              </h4>
              <p className="text-xs text-[#57534E]">
                Direct line to our senior client services managers in Mumbai.
              </p>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#57534E] block">Operating Hours: 10:00 – 20:00 IST</span>
              <a
                href="tel:+9118002092963"
                className="text-base font-bold text-[#111111] hover:text-[#B94700] block mt-1"
              >
                +91 1800 209 2963
              </a>
            </div>
          </div>

          <div className="p-6 bg-white border border-[#E9DFD2] shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <span className="material-symbols-outlined text-[28px] text-[#B94700]">chat</span>
              <h4 className="font-['EB_Garamond'] text-2xl font-bold text-[#111111]">
                Encrypted WhatsApp Care
              </h4>
              <p className="text-xs text-[#57534E]">
                Immediate assistance for courier handovers, fits, and monogram inquiries.
              </p>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#57534E] block">Instant Patron Handshake</span>
              <a
                href="https://wa.me/919820092963"
                target="_blank"
                rel="noreferrer"
                className="text-base font-bold text-[#111111] hover:text-[#B94700] block mt-1"
              >
                +91 98200 92963
              </a>
            </div>
          </div>

          <div className="p-6 bg-white border border-[#E9DFD2] shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <span className="material-symbols-outlined text-[28px] text-[#B94700]">mail</span>
              <h4 className="font-['EB_Garamond'] text-2xl font-bold text-[#111111]">
                Private Dispatch Inbox
              </h4>
              <p className="text-xs text-[#57534E]">
                Confidential written inquiries and bespoke styling commissions.
              </p>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#57534E] block">Expected Reply: Under 2 Hours</span>
              <a
                href="mailto:concierge@cyof.in"
                className="text-base font-bold text-[#111111] hover:text-[#B94700] block mt-1"
              >
                concierge@cyof.in
              </a>
            </div>
          </div>
        </div>

        {/* Two-Column: Message Desk & FAQs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Message Form */}
          <div className="lg:col-span-5 bg-white border border-[#E9DFD2] p-6 sm:p-8 shadow-xs">
            <div className="pb-4 border-b border-[#E9DFD2] mb-4">
              <span className="text-[10px] uppercase tracking-widest text-[#B94700] font-bold block">
                Encrypted Patron Transmission
              </span>
              <h3 className="font-['EB_Garamond'] text-2xl text-[#111111]">
                Transmit Concierge Inquiry
              </h3>
            </div>

            <form onSubmit={handleSendMessage} className="space-y-4 text-xs">
              <div>
                <label className="block uppercase tracking-wider text-[10px] text-[#57534E] mb-1 font-semibold">
                  Inquiry Topic
                </label>
                <select
                  value={inquirySubject}
                  onChange={(e) => setInquirySubject(e.target.value)}
                  required
                  className="w-full bg-[#fcf9f4] border border-[#E9DFD2] p-3 text-[#111111] focus:outline-none focus:border-[#111111]"
                >
                  <option value="">Select Category...</option>
                  <option value="Active Order & Chauffeur Tracking">Active Order & Chauffeur Tracking</option>
                  <option value="Bespoke Sizing & Visiting Tailor">Bespoke Sizing & Visiting Tailor</option>
                  <option value="Tax Invoice & GST Input Credit">Tax Invoice & GST Input Credit</option>
                  <option value="Private Salon Rendezvous Booking">Private Salon Rendezvous Booking</option>
                  <option value="Atelier Privé Rewards Redemption">Atelier Privé Rewards Redemption</option>
                </select>
              </div>

              <div>
                <label className="block uppercase tracking-wider text-[10px] text-[#57534E] mb-1 font-semibold">
                  Detailed Transmission
                </label>
                <textarea
                  rows={5}
                  required
                  value={inquiryMessage}
                  onChange={(e) => setInquiryMessage(e.target.value)}
                  placeholder="Inscribe details of your request, order token, or desired consultation..."
                  className="w-full bg-[#fcf9f4] border border-[#E9DFD2] p-3 text-[#111111] focus:outline-none focus:border-[#111111] resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#111111] hover:bg-[#B94700] text-white text-xs uppercase tracking-widest font-semibold transition-colors cursor-pointer"
              >
                Transmit to Private Client Desk
              </button>
            </form>
          </div>

          {/* Right Column: Searchable FAQs */}
          <div className="lg:col-span-7 bg-white border border-[#E9DFD2] p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E9DFD2] gap-3">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#B94700] font-bold block">
                  Knowledge Base
                </span>
                <h3 className="font-['EB_Garamond'] text-2xl text-[#111111]">
                  Frequently Inquired Curations
                </h3>
              </div>

              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search questions..."
                  className="w-full bg-[#fcf9f4] border border-[#E9DFD2] pl-8 pr-3 py-2 text-xs text-[#111111] focus:outline-none focus:border-[#111111]"
                />
                <span className="material-symbols-outlined text-[16px] text-[#57534E] absolute left-2.5 top-2.5">
                  search
                </span>
              </div>
            </div>

            <div className="space-y-3">
              {filteredFaqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="border border-[#E9DFD2] bg-white overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-semibold text-[#111111] hover:text-[#B94700] cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <span className="material-symbols-outlined text-[18px]">
                        {isOpen ? 'expand_less' : 'expand_more'}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 pt-1 text-xs text-[#57534E] leading-relaxed border-t border-[#f0ede9]">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
