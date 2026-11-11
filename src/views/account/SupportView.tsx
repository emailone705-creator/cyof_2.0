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
                className="w-full py-3.5 bg-[#D34500] hover:bg-[#B94700] text-white text-xs uppercase tracking-widest font-semibold transition-colors cursor-pointer"
              >
                Transmit to Private Client Desk
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
