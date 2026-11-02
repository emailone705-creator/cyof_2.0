import React, { useState } from 'react';
import { ViewRoute } from '../../types';
import { usePatron, AddressItem } from '../../context/PatronContext';
import { AccountNavHeader } from '../../components/AccountNavHeader';

interface AddressBookViewProps {
  onNavigate: (route: ViewRoute) => void;
  onOpenSalonModal: () => void;
}

export const AddressBookView: React.FC<AddressBookViewProps> = ({
  onNavigate,
  onOpenSalonModal,
}) => {
  const { addresses, addAddress, updateAddress, deleteAddress, setDefaultAddress, profile } = usePatron();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [form, setForm] = useState<Omit<AddressItem, 'id'>>({
    label: '',
    fullName: profile.fullName,
    phone: profile.phone,
    addressLine1: '',
    addressLine2: '',
    city: 'Mumbai',
    state: 'Maharashtra',
    pinCode: '',
    isDefaultShipping: false,
    isDefaultBilling: false,
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  const handleOpenAdd = () => {
    setEditingId(null);
    setForm({
      label: '',
      fullName: profile.fullName,
      phone: profile.phone,
      addressLine1: '',
      addressLine2: '',
      city: 'Mumbai',
      state: 'Maharashtra',
      pinCode: '',
      isDefaultShipping: false,
      isDefaultBilling: false,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (addr: AddressItem) => {
    setEditingId(addr.id);
    setForm({
      label: addr.label,
      fullName: addr.fullName,
      phone: addr.phone,
      addressLine1: addr.addressLine1,
      addressLine2: addr.addressLine2 || '',
      city: addr.city,
      state: addr.state,
      pinCode: addr.pinCode,
      isDefaultShipping: addr.isDefaultShipping,
      isDefaultBilling: addr.isDefaultBilling,
    });
    setModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateAddress(editingId, form);
      showToast('Delivery destination successfully updated');
    } else {
      addAddress(form);
      showToast('New white-glove destination inscribed in dossier');
    }
    setModalOpen(false);
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
        currentRoute="account-addresses"
        onNavigate={onNavigate}
        title="Address Book & Delivery Salons"
        subtitle="Pan-India Logistics Registry • White-Glove Hand-Delivery"
        onOpenSalonModal={onOpenSalonModal}
      />

      <div className="space-y-6 font-['Manrope']">
        {/* Top Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E9DFD2] gap-4">
          <div>
            <h3 className="font-['EB_Garamond'] text-2xl text-[#111111]">
              Saved Residences & Ateliers ({addresses.length})
            </h3>
            <p className="text-xs text-[#57534E]">
              All destinations are serviced via CYOF private chauffeur fleet or insured air transit.
            </p>
          </div>

          <button
            onClick={handleOpenAdd}
            className="px-5 py-3 bg-[#111111] hover:bg-[#B94700] text-white text-xs uppercase tracking-widest font-semibold transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <span className="material-symbols-outlined text-[18px]">add_location_alt</span>
            <span>Add New Destination</span>
          </button>
        </div>

        {/* Addresses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className={`p-6 border transition-all flex flex-col justify-between ${
                addr.isDefaultShipping
                  ? 'border-[#111111] bg-white ring-1 ring-[#111111]'
                  : 'border-[#E9DFD2] bg-white'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-[#B94700]">
                    {addr.label}
                  </span>
                  {addr.isDefaultShipping && (
                    <span className="text-[9px] uppercase tracking-widest px-2.5 py-0.5 bg-[#111111] text-white font-bold">
                      Default Destination
                    </span>
                  )}
                </div>

                <h4 className="font-semibold text-sm text-[#111111] mb-2">
                  {addr.fullName}
                </h4>

                <p className="text-xs text-[#57534E] leading-relaxed">
                  {addr.addressLine1}
                  {addr.addressLine2 && <><br />{addr.addressLine2}</>}
                  <br />
                  {addr.city}, {addr.state} — <strong className="text-[#111111]">{addr.pinCode}</strong>
                  <br />
                  India
                </p>

                <p className="text-xs text-[#57534E] mt-3">
                  Handover Contact: <strong className="text-[#111111]">{addr.phone}</strong>
                </p>
              </div>

              <div className="pt-5 mt-5 border-t border-[#E9DFD2] flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleOpenEdit(addr)}
                    className="text-[#111111] hover:text-[#B94700] uppercase tracking-wider font-semibold cursor-pointer"
                  >
                    Edit
                  </button>
                  <span className="text-[#E9DFD2]">|</span>
                  <button
                    onClick={() => {
                      if (addresses.length > 1) {
                        deleteAddress(addr.id);
                        showToast('Destination removed from dossier');
                      } else {
                        showToast('At least one address must be retained in your dossier');
                      }
                    }}
                    className="text-[#57534E] hover:text-[#B94700] uppercase tracking-wider font-semibold cursor-pointer"
                  >
                    Delete
                  </button>
                </div>

                {!addr.isDefaultShipping && (
                  <button
                    onClick={() => {
                      setDefaultAddress(addr.id);
                      showToast('Default delivery destination updated');
                    }}
                    className="text-[11px] text-[#B94700] hover:underline uppercase font-bold cursor-pointer"
                  >
                    Set as Default
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add / Edit Address Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#111111]/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="w-full max-w-lg bg-white border border-[#E9DFD2] p-6 sm:p-8 max-h-[90vh] overflow-y-auto font-['Manrope'] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#E9DFD2]">
              <h3 className="font-['EB_Garamond'] text-2xl text-[#111111]">
                {editingId ? 'Edit Delivery Destination' : 'Inscribe New Destination'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="w-8 h-8 flex items-center justify-center text-[#57534E] hover:text-[#111111]"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 pt-4 text-xs">
              <div>
                <label className="block uppercase tracking-wider text-[10px] text-[#57534E] mb-1 font-semibold">
                  Address Label (e.g. Flagship Villa, Sea Face Studio)
                </label>
                <input
                  type="text"
                  required
                  value={form.label}
                  onChange={(e) => setForm({ ...form, label: e.target.value })}
                  placeholder="e.g. Worli Sea Face Residence"
                  className="w-full bg-[#fcf9f4] border border-[#E9DFD2] p-3 text-[#111111] focus:outline-none focus:border-[#111111]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block uppercase tracking-wider text-[10px] text-[#57534E] mb-1 font-semibold">
                    Recipient Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    className="w-full bg-[#fcf9f4] border border-[#E9DFD2] p-3 text-[#111111] focus:outline-none focus:border-[#111111]"
                  />
                </div>
                <div>
                  <label className="block uppercase tracking-wider text-[10px] text-[#57534E] mb-1 font-semibold">
                    Delivery Contact Phone
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-[#fcf9f4] border border-[#E9DFD2] p-3 text-[#111111] focus:outline-none focus:border-[#111111]"
                  />
                </div>
              </div>

              <div>
                <label className="block uppercase tracking-wider text-[10px] text-[#57534E] mb-1 font-semibold">
                  Address Line 1
                </label>
                <input
                  type="text"
                  required
                  value={form.addressLine1}
                  onChange={(e) => setForm({ ...form, addressLine1: e.target.value })}
                  placeholder="Apartment, Suite, Building Name, Street"
                  className="w-full bg-[#fcf9f4] border border-[#E9DFD2] p-3 text-[#111111] focus:outline-none focus:border-[#111111]"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider text-[10px] text-[#57534E] mb-1 font-semibold">
                  Address Line 2 (Optional)
                </label>
                <input
                  type="text"
                  value={form.addressLine2}
                  onChange={(e) => setForm({ ...form, addressLine2: e.target.value })}
                  placeholder="Landmark, Area, Gate Number"
                  className="w-full bg-[#fcf9f4] border border-[#E9DFD2] p-3 text-[#111111] focus:outline-none focus:border-[#111111]"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block uppercase tracking-wider text-[10px] text-[#57534E] mb-1 font-semibold">
                    City
                  </label>
                  <input
                    type="text"
                    required
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="w-full bg-[#fcf9f4] border border-[#E9DFD2] p-3 text-[#111111] focus:outline-none focus:border-[#111111]"
                  />
                </div>
                <div>
                  <label className="block uppercase tracking-wider text-[10px] text-[#57534E] mb-1 font-semibold">
                    State
                  </label>
                  <select
                    value={form.state}
                    onChange={(e) => setForm({ ...form, state: e.target.value })}
                    className="w-full bg-[#fcf9f4] border border-[#E9DFD2] p-3 text-[#111111] focus:outline-none focus:border-[#111111]"
                  >
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="West Bengal">West Bengal</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Haryana">Haryana</option>
                  </select>
                </div>
                <div>
                  <label className="block uppercase tracking-wider text-[10px] text-[#57534E] mb-1 font-semibold">
                    PIN Code (6 Digits)
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={form.pinCode}
                    onChange={(e) => setForm({ ...form, pinCode: e.target.value })}
                    placeholder="400026"
                    className="w-full bg-[#fcf9f4] border border-[#E9DFD2] p-3 text-[#111111] focus:outline-none focus:border-[#111111]"
                  />
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.isDefaultShipping}
                    onChange={(e) => setForm({ ...form, isDefaultShipping: e.target.checked })}
                    className="w-4 h-4 accent-[#B94700]"
                  />
                  <span>Set as primary default Pan-India delivery destination</span>
                </label>
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
                  Save Destination
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
