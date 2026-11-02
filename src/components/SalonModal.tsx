import React, { useState } from 'react';

interface SalonModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
}

export const SalonModal: React.FC<SalonModalProps> = ({
  isOpen,
  onClose,
  productName,
}) => {
  const [salon, setSalon] = useState('Mumbai Flagship — The Oberoi, Nariman Point');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 3000);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#111111]/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-[#F8F5F0] shadow-2xl p-6 sm:p-8 border border-[#E9DFD2] relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-[#E9DFD2]">
          <div>
            <span className="font-['Manrope'] text-[10px] uppercase tracking-widest text-[#B94700] font-semibold block">
              Private Salon Rendezvous
            </span>
            <h3 className="font-['EB_Garamond'] text-2xl text-[#111111]">
              Reserve Private Fitting & Consultation
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center text-[#111111] hover:text-[#B94700]"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        {submitted ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 bg-[#B94700] text-white rounded-full mx-auto flex items-center justify-center">
              <span className="material-symbols-outlined text-[32px]">check</span>
            </div>
            <h4 className="font-['EB_Garamond'] text-2xl text-[#111111]">
              Rendezvous Inscribed
            </h4>
            <p className="font-['Manrope'] text-xs text-[#57534E] max-w-sm mx-auto leading-relaxed">
              Your private appointment at {salon} has been forwarded to our Head of Client Care. A concierge advisor will confirm via encrypted dispatch.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 pt-4 font-['Manrope'] text-xs">
            {productName && (
              <div className="p-3 bg-[#f0ede9] flex items-center justify-between">
                <span className="text-[#57534E] uppercase tracking-wider text-[10px]">Silhouette on Hold:</span>
                <span className="text-[#111111] font-semibold">{productName}</span>
              </div>
            )}

            <div>
              <label className="block uppercase tracking-wider text-[10px] text-[#57534E] mb-1">
                Select Indian Flagship Salon
              </label>
              <select
                value={salon}
                onChange={(e) => setSalon(e.target.value)}
                className="w-full bg-[#FFFFFF] border border-[#E9DFD2] p-3 text-[#111111] focus:outline-none focus:border-[#111111]"
              >
                <option value="Mumbai Flagship — The Oberoi, Nariman Point">Mumbai Flagship — The Oberoi, Nariman Point</option>
                <option value="New Delhi Flagship — DLF Emporio, Vasant Kunj">New Delhi Flagship — DLF Emporio, Vasant Kunj</option>
                <option value="Bengaluru Flagship — UB City, Vittal Mallya Road">Bengaluru Flagship — UB City, Vittal Mallya Road</option>
                <option value="Hyderabad Heritage Salon — Taj Falaknuma Palace">Hyderabad Heritage Salon — Taj Falaknuma Palace</option>
                <option value="Kala Ghoda Heritage Atelier — Fort, Mumbai">Kala Ghoda Heritage Atelier — Fort, Mumbai</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block uppercase tracking-wider text-[10px] text-[#57534E] mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Aarav Singhania"
                  className="w-full bg-[#FFFFFF] border border-[#E9DFD2] p-3 text-[#111111] focus:outline-none focus:border-[#111111]"
                />
              </div>
              <div>
                <label className="block uppercase tracking-wider text-[10px] text-[#57534E] mb-1">Confidential Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="singhania@private.in"
                  className="w-full bg-[#FFFFFF] border border-[#E9DFD2] p-3 text-[#111111] focus:outline-none focus:border-[#111111]"
                />
              </div>
            </div>

            <div>
              <label className="block uppercase tracking-wider text-[10px] text-[#57534E] mb-1">Preferred Date & Time (IST)</label>
              <input
                type="text"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="e.g. 14 November 2026, 15:00 IST"
                className="w-full bg-[#FFFFFF] border border-[#E9DFD2] p-3 text-[#111111] focus:outline-none focus:border-[#111111]"
              />
            </div>

            <div>
              <label className="block uppercase tracking-wider text-[10px] text-[#57534E] mb-1">Bespoke Fitting Requirements</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Mention specific measurements, archive pieces to prepare, or champagne preferences..."
                rows={3}
                className="w-full bg-[#FFFFFF] border border-[#E9DFD2] p-3 text-[#111111] focus:outline-none focus:border-[#111111] resize-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-4 bg-[#111111] hover:bg-[#B94700] text-white font-['Manrope'] text-xs uppercase tracking-widest font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">verified</span>
                Confirm Salon Reservation
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
