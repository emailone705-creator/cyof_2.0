import React, { useState } from 'react';
import { ViewRoute } from '../../types';
import { usePatron } from '../../context/PatronContext';
import { AccountNavHeader } from '../../components/AccountNavHeader';

interface ProfileViewProps {
  onNavigate: (route: ViewRoute) => void;
  onOpenSalonModal: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  onNavigate,
  onOpenSalonModal,
}) => {
  const { profile, updateProfile } = usePatron();
  const [formData, setFormData] = useState(profile);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    setSavedSuccess(true);
    showToast('Patron Profile successfully updated in Mumbai Central Registry');
    setTimeout(() => setSavedSuccess(false), 3500);
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
        currentRoute="account-profile"
        onNavigate={onNavigate}
        title="Profile & Patron Identity"
        subtitle="Confidential Dossier Records • CYOF Private Client Services"
        onOpenSalonModal={onOpenSalonModal}
      />

      <div className="max-w-4xl mx-auto w-full space-y-8 font-['Manrope']">
        {/* Dossier Credentials Card */}
        <div className="bg-[#111111] text-white p-6 sm:p-8 border border-[#E9DFD2] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-[#B94700] text-white flex items-center justify-center font-['EB_Garamond'] text-2xl font-bold">
              {profile.fullName.charAt(0)}
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#B94700] font-bold block">
                Authenticated Haute Patron
              </span>
              <h3 className="font-['EB_Garamond'] text-2xl sm:text-3xl text-white font-normal mt-0.5">
                {profile.salutation} {profile.fullName}
              </h3>
              <p className="text-xs text-[#E9DFD2]/70 mt-1">
                Patron ID: <strong className="text-white">{profile.patronId}</strong> • Member since 2024
              </p>
            </div>
          </div>

          <div className="text-left sm:text-right shrink-0">
            <span className="text-[10px] uppercase tracking-wider text-[#E9DFD2] block">Client Tier Status</span>
            <span className="text-lg font-bold text-[#D35400]">{profile.tier}</span>
            <span className="text-[11px] text-emerald-400 block mt-0.5">● Active & Verified</span>
          </div>
        </div>

        {savedSuccess && (
          <div className="p-4 bg-emerald-50 border-l-4 border-emerald-600 text-xs text-emerald-900 flex items-center gap-3 animate-in fade-in">
            <span className="material-symbols-outlined text-[20px] text-emerald-600">check_circle</span>
            <span>Your personal particulars have been synchronized across all Pan-India boutiques and ateliers.</span>
          </div>
        )}

        {/* Profile Edit Form */}
        <div className="bg-white border border-[#E9DFD2] p-6 sm:p-10 shadow-xs">
          <form onSubmit={handleSubmit} className="space-y-6 text-xs">
            <div className="pb-4 border-b border-[#E9DFD2]">
              <h4 className="font-['EB_Garamond'] text-2xl text-[#111111]">
                Edit Personal Particulars
              </h4>
              <p className="text-xs text-[#57534E] mt-1">
                Update legal name, confidential contact points, gender identity, and birth date.
              </p>
            </div>

            {/* Salutation & Full Name */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
              <div className="sm:col-span-3">
                <label className="block uppercase tracking-wider text-[10px] text-[#57534E] mb-1 font-semibold">
                  Salutation
                </label>
                <select
                  value={formData.salutation}
                  onChange={(e) => setFormData({ ...formData, salutation: e.target.value })}
                  className="w-full bg-[#fcf9f4] border border-[#E9DFD2] p-3 text-[#111111] focus:outline-none focus:border-[#111111]"
                >
                  <option value="Mr.">Mr.</option>
                  <option value="Ms.">Ms.</option>
                  <option value="Mrs.">Mrs.</option>
                  <option value="Dr.">Dr.</option>
                  <option value="Lord">Lord</option>
                  <option value="Lady">Lady</option>
                </select>
              </div>

              <div className="sm:col-span-9">
                <label className="block uppercase tracking-wider text-[10px] text-[#57534E] mb-1 font-semibold">
                  Full Legal Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Aarav Singhania"
                  className="w-full bg-[#fcf9f4] border border-[#E9DFD2] p-3 text-[#111111] focus:outline-none focus:border-[#111111]"
                />
              </div>
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block uppercase tracking-wider text-[10px] text-[#57534E] mb-1 font-semibold">
                  Confidential Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="singhania@private.in"
                  className="w-full bg-[#fcf9f4] border border-[#E9DFD2] p-3 text-[#111111] focus:outline-none focus:border-[#111111]"
                />
                <span className="text-[10px] text-[#57534E] mt-1 block">
                  Used for GST tax invoices and encrypted atelier dispatches.
                </span>
              </div>

              <div>
                <label className="block uppercase tracking-wider text-[10px] text-[#57534E] mb-1 font-semibold">
                  Phone Number (India)
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98200 12834"
                  className="w-full bg-[#fcf9f4] border border-[#E9DFD2] p-3 text-[#111111] focus:outline-none focus:border-[#111111]"
                />
                <span className="text-[10px] text-[#57534E] mt-1 block">
                  Required for white-glove hand-delivery OTP verification.
                </span>
              </div>
            </div>

            {/* Gender & DOB */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block uppercase tracking-wider text-[10px] text-[#57534E] mb-1 font-semibold">
                  Gender Identity
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="w-full bg-[#fcf9f4] border border-[#E9DFD2] p-3 text-[#111111] focus:outline-none focus:border-[#111111]"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Non-Binary">Non-Binary</option>
                  <option value="Prefer not to specify">Prefer not to specify</option>
                </select>
              </div>

              <div>
                <label className="block uppercase tracking-wider text-[10px] text-[#57534E] mb-1 font-semibold">
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={formData.dob}
                  onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                  className="w-full bg-[#fcf9f4] border border-[#E9DFD2] p-3 text-[#111111] focus:outline-none focus:border-[#111111]"
                />
                <span className="text-[10px] text-[#57534E] mt-1 block">
                  Eligible for annual Haute Couturier Birthday Privileges.
                </span>
              </div>
            </div>

            {/* Communication Preferences */}
            <div className="pt-6 border-t border-[#E9DFD2] space-y-3">
              <h4 className="font-['EB_Garamond'] text-xl text-[#111111]">
                Concierge Communication Preferences
              </h4>
              <div className="space-y-3 pt-1">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.whatsappNotifications}
                    onChange={(e) => setFormData({ ...formData, whatsappNotifications: e.target.checked })}
                    className="w-4 h-4 mt-0.5 accent-[#B94700]"
                  />
                  <div>
                    <span className="text-xs font-semibold text-[#111111] block">
                      Encrypted WhatsApp Dispatch Alerts
                    </span>
                    <span className="text-[11px] text-[#57534E]">
                      Receive real-time chauffeur handover notifications and OTPs directly to WhatsApp.
                    </span>
                  </div>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.monographPreviews}
                    onChange={(e) => setFormData({ ...formData, monographPreviews: e.target.checked })}
                    className="w-4 h-4 mt-0.5 accent-[#B94700]"
                  />
                  <div>
                    <span className="text-xs font-semibold text-[#111111] block">
                      Le Journal Monograph & Capsule Previews
                    </span>
                    <span className="text-[11px] text-[#57534E]">
                      Early editorial previews of new hand-painted collections 48 hours prior to public debut.
                    </span>
                  </div>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.salonAlerts}
                    onChange={(e) => setFormData({ ...formData, salonAlerts: e.target.checked })}
                    className="w-4 h-4 mt-0.5 accent-[#B94700]"
                  />
                  <div>
                    <span className="text-xs font-semibold text-[#111111] block">
                      Private Salon Rendezvous Reminders
                    </span>
                    <span className="text-[11px] text-[#57534E]">
                      Invitations to visiting master tailors and bespoke seasonal trunk shows.
                    </span>
                  </div>
                </label>
              </div>
            </div>

            <div className="pt-6 border-t border-[#E9DFD2] flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setFormData(profile)}
                className="px-6 py-3 border border-[#E9DFD2] hover:bg-[#fcf9f4] text-xs uppercase tracking-wider font-semibold transition-colors"
              >
                Reset Changes
              </button>
              <button
                type="submit"
                className="px-8 py-3 bg-[#111111] hover:bg-[#B94700] text-white text-xs uppercase tracking-widest font-semibold transition-colors cursor-pointer"
              >
                Save Profile Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
