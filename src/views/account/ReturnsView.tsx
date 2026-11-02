import React, { useState } from 'react';
import { ViewRoute } from '../../types';
import { usePatron, ReturnRequest } from '../../context/PatronContext';
import { AccountNavHeader } from '../../components/AccountNavHeader';

interface ReturnsViewProps {
  onNavigate: (route: ViewRoute) => void;
  onOpenSalonModal: () => void;
}

export const ReturnsView: React.FC<ReturnsViewProps> = ({
  onNavigate,
  onOpenSalonModal,
}) => {
  const { returns, addReturn, orders } = usePatron();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOrderToken, setSelectedOrderToken] = useState(orders[0]?.token || 'CYOF-IN-982410-MUM');
  const [selectedItemName, setSelectedItemName] = useState(orders[0]?.items[0]?.name || 'Commissioned Garment');
  const [reason, setReason] = useState('Bespoke Size Exchange & Atelier Re-fit');
  const [notes, setNotes] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  const handleInitiate = (e: React.FormEvent) => {
    e.preventDefault();
    addReturn({
      orderToken: selectedOrderToken,
      item: selectedItemName,
      reason,
      status: 'Scheduled',
      pickupDate: 'Scheduled in 2 Business Days via Private Chauffeur',
      notes: notes || 'Private courier will provide signed cedar collection receipt upon handover.',
    });
    setModalOpen(false);
    setNotes('');
    showToast('Return & Exchange request inscribed. Our Concierge will coordinate collection.');
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
        currentRoute="account-returns"
        onNavigate={onNavigate}
        title="Returns & Bespoke Exchanges"
        subtitle="14-Day Complimentary White-Glove Reverse Logistics • Pan-India"
        onOpenSalonModal={onOpenSalonModal}
      />

      <div className="space-y-8 font-['Manrope']">
        {/* Policy Explainer Card */}
        <div className="bg-white border border-[#E9DFD2] p-6 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-widest text-[#B94700] font-bold block">
              Haute Couture Assurance
            </span>
            <h3 className="font-['EB_Garamond'] text-2xl text-[#111111]">
              Complimentary Reverse White-Glove Handshake
            </h3>
            <p className="text-xs text-[#57534E] max-w-2xl leading-relaxed">
              Every CYOF commission includes 14 calendar days from delivery to request a complimentary size exchange, tailoring modification, or full refund. Our private chauffeur attends directly to your residence to collect the piece in its archival cedar case.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => setModalOpen(true)}
              className="px-5 py-3 bg-[#111111] hover:bg-[#B94700] text-white text-xs uppercase tracking-widest font-semibold transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <span className="material-symbols-outlined text-[18px]">assignment_return</span>
              <span>Initiate New Request</span>
            </button>
            <button
              onClick={onOpenSalonModal}
              className="px-4 py-3 border border-[#E9DFD2] hover:bg-[#fcf9f4] text-[#111111] text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer"
            >
              Book Tailor Visit Instead
            </button>
          </div>
        </div>

        {/* Active & Historical Returns */}
        <div className="space-y-4">
          <h3 className="font-['EB_Garamond'] text-2xl text-[#111111]">
            Active Inscriptions ({returns.length})
          </h3>

          <div className="space-y-4">
            {returns.map((ret) => (
              <div
                key={ret.id}
                className="bg-white border border-[#E9DFD2] p-6 shadow-xs"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#E9DFD2]">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-[#111111]">
                      Reference Token: {ret.id}
                    </span>
                    <span className="text-[9px] uppercase tracking-widest px-2.5 py-0.5 bg-[#B94700] text-white font-bold">
                      {ret.status}
                    </span>
                  </div>
                  <span className="text-xs text-[#57534E]">
                    Originating Order: <strong className="text-[#111111]">{ret.orderToken}</strong>
                  </span>
                </div>

                <div className="py-4 space-y-1">
                  <h4 className="font-['EB_Garamond'] text-xl font-semibold text-[#111111]">
                    {ret.item}
                  </h4>
                  <p className="text-xs text-[#57534E]">
                    Resolution Category: <strong className="text-[#111111]">{ret.reason}</strong>
                  </p>
                  <p className="text-xs text-[#B94700] font-bold mt-1">
                    Chauffeur Pickup Window: {ret.pickupDate}
                  </p>
                  <p className="text-xs text-[#57534E] mt-1 bg-[#fcf9f4] p-3 border border-[#E9DFD2] italic">
                    {ret.notes}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E9DFD2] flex flex-wrap items-center justify-between gap-3 text-xs">
                  <span className="text-[#57534E]">
                    Inspected & Authenticated at Kala Ghoda Central Vault, Mumbai
                  </span>
                  <a
                    href="tel:+9118002092963"
                    className="text-[#111111] hover:text-[#B94700] uppercase font-bold flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[16px]">call</span>
                    <span>Speak to Returns Concierge (+91 1800 209 2963)</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Initiate Return Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#111111]/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="w-full max-w-lg bg-white border border-[#E9DFD2] p-6 sm:p-8 font-['Manrope'] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#E9DFD2]">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#B94700] font-bold block">
                  Complimentary Patron Service
                </span>
                <h3 className="font-['EB_Garamond'] text-2xl text-[#111111]">
                  Initiate Return or Size Exchange
                </h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="w-8 h-8 flex items-center justify-center text-[#57534E] hover:text-[#111111]"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleInitiate} className="space-y-4 pt-4 text-xs">
              <div>
                <label className="block uppercase tracking-wider text-[10px] text-[#57534E] mb-1 font-semibold">
                  Select Acquisition Token
                </label>
                <select
                  value={selectedOrderToken}
                  onChange={(e) => {
                    setSelectedOrderToken(e.target.value);
                    const matched = orders.find((o) => o.token === e.target.value);
                    if (matched && matched.items[0]) {
                      setSelectedItemName(matched.items[0].name);
                    }
                  }}
                  className="w-full bg-[#fcf9f4] border border-[#E9DFD2] p-3 text-[#111111] focus:outline-none focus:border-[#111111]"
                >
                  {orders.map((o) => (
                    <option key={o.id} value={o.token}>
                      {o.token} — {o.date} (₹{o.grandTotal.toLocaleString('en-IN')})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block uppercase tracking-wider text-[10px] text-[#57534E] mb-1 font-semibold">
                  Silhouette to Return / Exchange
                </label>
                <input
                  type="text"
                  required
                  value={selectedItemName}
                  onChange={(e) => setSelectedItemName(e.target.value)}
                  className="w-full bg-[#fcf9f4] border border-[#E9DFD2] p-3 text-[#111111] focus:outline-none focus:border-[#111111]"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider text-[10px] text-[#57534E] mb-1 font-semibold">
                  Resolution Type
                </label>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full bg-[#fcf9f4] border border-[#E9DFD2] p-3 text-[#111111] focus:outline-none focus:border-[#111111]"
                >
                  <option value="Bespoke Size Exchange & Atelier Re-fit">Bespoke Size Exchange & Atelier Re-fit</option>
                  <option value="Sleeve / Hem Length Alteration">Sleeve / Hem Length Alteration</option>
                  <option value="Alternate Colorway Swatch Exchange">Alternate Colorway Swatch Exchange</option>
                  <option value="Full Refund to Original Indian Bank Account">Full Refund to Original Indian Bank Account</option>
                  <option value="Convert to Instant Atelier Privé Store Credit">Convert to Instant Atelier Privé Store Credit (INR ₹)</option>
                </select>
              </div>

              <div>
                <label className="block uppercase tracking-wider text-[10px] text-[#57534E] mb-1 font-semibold">
                  Bespoke Fitting Notes or Instructions
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Specify desired size adjustments (e.g. IT 50 chest taper), pickup gate instructions, or special requests..."
                  className="w-full bg-[#fcf9f4] border border-[#E9DFD2] p-3 text-[#111111] focus:outline-none focus:border-[#111111] resize-none"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 border border-[#E9DFD2] text-xs uppercase tracking-wider font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#111111] hover:bg-[#B94700] text-white text-xs uppercase tracking-wider font-semibold transition-colors"
                >
                  Inscribe Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
