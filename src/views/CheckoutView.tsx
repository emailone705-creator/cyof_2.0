import React, { useState } from 'react';
import { CartItem, ViewRoute } from '../types';
import { usePatron } from '../context/PatronContext';

const INDIAN_STATES = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Delhi',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jammu & Kashmir',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
];

interface CheckoutViewProps {
  cart: CartItem[];
  onNavigate: (route: ViewRoute) => void;
  onClearCart: () => void;
}

export const CheckoutView: React.FC<CheckoutViewProps> = ({
  cart,
  onNavigate,
  onClearCart,
}) => {
  const { addresses, addAddress, profile } = usePatron();

  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState('');

  // 2. Customer condition state (Saved addresses vs New Customer)
  const [customerMode, setCustomerMode] = useState<'existing' | 'new'>(
    addresses.length > 0 ? 'existing' : 'new'
  );
  const [selectedSavedAddressId, setSelectedSavedAddressId] = useState<string>(
    addresses.find((a) => a.isDefaultShipping)?.id || addresses[0]?.id || ''
  );
  const [isAddingNewAddress, setIsAddingNewAddress] = useState<boolean>(false);

  // Delivery address form fields
  const [deliveryCountry, setDeliveryCountry] = useState('India');
  const [deliveryFirstName, setDeliveryFirstName] = useState(profile?.fullName ? profile.fullName.split(' ')[0] : 'Aarav');
  const [deliveryLastName, setDeliveryLastName] = useState(profile?.fullName ? profile.fullName.split(' ').slice(1).join(' ') : 'Singhania');
  const [deliveryCompany, setDeliveryCompany] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState(addresses[0]?.addressLine1 || 'Penthouse 42, The Imperial Towers');
  const [deliveryApartment, setDeliveryApartment] = useState(addresses[0]?.addressLine2 || 'Altamount Road, Cumballa Hill');
  const [deliveryCity, setDeliveryCity] = useState(addresses[0]?.city || 'Mumbai');
  const [deliveryState, setDeliveryState] = useState(addresses[0]?.state || 'Maharashtra');
  const [deliveryPinCode, setDeliveryPinCode] = useState(addresses[0]?.pinCode || '400026');
  const [deliveryPhone, setDeliveryPhone] = useState(profile?.phone || '+91 98200 12834');

  // 3. Billing address state
  const [billingMode, setBillingMode] = useState<'same' | 'alternative'>('same');
  const [billingCountry, setBillingCountry] = useState('India');
  const [billingFirstName, setBillingFirstName] = useState('');
  const [billingLastName, setBillingLastName] = useState('');
  const [billingCompany, setBillingCompany] = useState('');
  const [billingAddress, setBillingAddress] = useState('');
  const [billingApartment, setBillingApartment] = useState('');
  const [billingCity, setBillingCity] = useState('');
  const [billingState, setBillingState] = useState('Maharashtra');
  const [billingPinCode, setBillingPinCode] = useState('');
  const [billingPhone, setBillingPhone] = useState('');

  // 4. Shipping method pin code verification
  const activeDeliveryAddress = customerMode === 'existing' && !isAddingNewAddress && addresses.find((a) => a.id === selectedSavedAddressId)
    ? addresses.find((a) => a.id === selectedSavedAddressId)!
    : null;

  const currentDeliveryPin = activeDeliveryAddress ? activeDeliveryAddress.pinCode : deliveryPinCode;
  const currentDeliveryLine = activeDeliveryAddress ? activeDeliveryAddress.addressLine1 : deliveryAddress;
  const isShippingReady = Boolean(
    currentDeliveryPin && currentDeliveryPin.trim().length === 6 && currentDeliveryLine && currentDeliveryLine.trim().length > 0
  );

  // Coupon code states
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponError, setCouponError] = useState('');

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const handleApplyCoupon = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (!code) {
      setCouponError('Please enter a coupon code');
      return;
    }
    if (code === 'CYOF10' || code === 'ATELIER' || code === 'VIP' || code === 'FIRST10') {
      const discount = Math.round(subtotal * 0.1);
      setCouponDiscount(discount);
      setCouponApplied(true);
      setCouponError('');
    } else {
      const discount = Math.round(subtotal * 0.05);
      setCouponDiscount(discount);
      setCouponApplied(true);
      setCouponError('');
    }
  };

  const handleRemoveCoupon = () => {
    setCouponApplied(false);
    setCouponDiscount(0);
    setCouponCode('');
    setCouponError('');
  };

  const finalTotal = Math.max(0, subtotal - couponDiscount);

  const handlePlaceOrder = () => {
    // If a new delivery address was filled, automatically save it for the customer
    if (customerMode === 'new' || isAddingNewAddress) {
      if (deliveryAddress.trim() && deliveryCity.trim() && deliveryPinCode.trim()) {
        addAddress({
          label: `${deliveryAddress.slice(0, 20)} Residence`,
          fullName: `${deliveryFirstName} ${deliveryLastName}`.trim() || 'Aarav Singhania',
          phone: deliveryPhone || '+91 98200 12834',
          addressLine1: deliveryAddress,
          addressLine2: deliveryApartment,
          city: deliveryCity,
          state: deliveryState,
          pinCode: deliveryPinCode,
          isDefaultShipping: addresses.length === 0,
          isDefaultBilling: billingMode === 'same',
        });
      }
    }

    const token = `CYOF-IN-${Math.floor(10000 + Math.random() * 90000)}`;
    setOrderId(token);
    setOrderConfirmed(true);
    onClearCart();
  };

  return (
    <div className="w-full flex flex-col bg-[#fcf9f4] min-h-screen text-[#1c1c19] pb-32">
      {/* Order Confirmed Modal */}
      {orderConfirmed && (
        <div className="fixed inset-0 z-50 bg-[#111111]/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="w-full max-w-lg bg-[#F8F5F0] p-8 border border-[#E9DFD2] shadow-2xl space-y-6 text-center">
            <div className="w-16 h-16 bg-[#B94700] text-white rounded-full mx-auto flex items-center justify-center shadow-md">
              <span className="material-symbols-outlined text-[32px]">verified</span>
            </div>
            
            <div className="space-y-2">
              <span className="font-['Manrope'] text-[10px] uppercase tracking-widest text-[#B94700] font-bold">
                Direct Atelier Consignment Confirmed • India
              </span>
              <h2 className="font-['EB_Garamond'] text-3xl md:text-4xl text-[#111111]">
                Order Token #{orderId}
              </h2>
              <p className="font-['Manrope'] text-xs text-[#57534E] leading-relaxed max-w-sm mx-auto">
                Thank you, {activeDeliveryAddress ? activeDeliveryAddress.fullName : deliveryFirstName}. Your bespoke order has been assigned to our master tailor. An encrypted dossier and white-glove chauffeur appointment confirmation have been dispatched to {profile?.email || 'client.atelier@cyof.in'}.
              </p>
            </div>

            <div className="p-4 bg-white border border-[#E9DFD2] text-left space-y-2 font-['Manrope'] text-xs">
              <div className="flex justify-between">
                <span className="text-[#57534E]">Consignment Value:</span>
                <span className="font-semibold text-[#111111]">₹{finalTotal.toLocaleString('en-IN')} (Incl. of GST)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#57534E]">Delivery Service:</span>
                <span className="text-[#B94700] font-semibold">
                  Standard Complimentary White-Glove Hand-Delivery
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#57534E]">Salon Destination:</span>
                <span className="text-[#111111]">
                  {activeDeliveryAddress
                    ? `${activeDeliveryAddress.addressLine1}${activeDeliveryAddress.addressLine2 ? `, ${activeDeliveryAddress.addressLine2}` : ''}, ${activeDeliveryAddress.city}, ${activeDeliveryAddress.state} — PIN ${activeDeliveryAddress.pinCode}`
                    : `${deliveryAddress}${deliveryApartment ? `, ${deliveryApartment}` : ''}, ${deliveryCity}, ${deliveryState} — PIN ${deliveryPinCode}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#57534E]">Provenance Passport:</span>
                <span className="text-[#B94700] font-semibold">Immutable NFC Chip Inscribed</span>
              </div>
            </div>

            <button
              onClick={() => onNavigate('home')}
              style={{ backgroundColor: '#D34500' }}
              className="w-full py-4 bg-[#D34500] hover:bg-[#B94700] text-white font-['Manrope'] text-xs uppercase tracking-widest font-semibold transition-colors shadow-md cursor-pointer"
            >
              Return to CYOF Flagship
            </button>
          </div>
        </div>
      )}

      {/* Trust Sub-Bar */}
      <div className="w-full bg-[#f6f3ee] px-4 md:px-8 lg:px-16 py-3 flex items-center justify-between border-b border-[#E9DFD2]">
        <div className="flex items-center gap-2 text-[#57534E] font-['Manrope'] text-xs">
          <span className="uppercase tracking-wider text-[#D34500]"> • #CraftedYourOwnFashion</span>
        </div>
        <button
          onClick={() => onNavigate('cart')}
          className="font-['Manrope'] text-xs uppercase tracking-widest text-[#57534E] hover:text-[#111111] transition-colors flex items-center gap-1 cursor-pointer font-semibold"
        >
          <span>Review Bag ({cart.length})</span>
          <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
        </button>
      </div>

      {/* Stepper Indicator */}
      <div className="w-full px-4 md:px-8 lg:px-16 py-6 bg-[#fcf9f4] border-b border-[#E9DFD2]">
        <div className="max-w-2xl mx-auto relative font-['Manrope']">

          {/* Background connecting line */}
          <div className="absolute top-4 left-[16.6667%] right-[16.6667%] h-0.5 bg-[#E9DFD2] -translate-y-1/2 z-0" />

          {/* Completed progress line */}
          <div className="absolute top-4 left-[16.6667%] w-[33.3333%] h-0.5 bg-[#B94700] -translate-y-1/2 z-[1]" />

          {/* Step Items */}
          <div className="grid grid-cols-3 relative z-10">

            {/* Step 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-8 h-8 shrink-0 rounded-full bg-[#B94700] text-white flex items-center justify-center text-xs font-semibold shadow-sm ring-4 ring-[#fcf9f4]">
                1
              </div>
              <span className="text-[10px] text-[#111111] font-semibold mt-2 tracking-wider uppercase leading-tight">
                Contact & Delivery
              </span>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-8 h-8 shrink-0 rounded-full bg-[#111111] text-white flex items-center justify-center text-xs font-medium ring-4 ring-[#fcf9f4]">
                2
              </div>
              <span className="text-[10px] text-[#111111] font-semibold mt-2 tracking-wider uppercase leading-tight">
                Payment
              </span>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-8 h-8 shrink-0 rounded-full bg-[#ebe8e3] text-[#57534E] flex items-center justify-center text-xs font-medium ring-4 ring-[#fcf9f4]">
                3
              </div>
              <span className="text-[10px] text-[#57534E] font-medium mt-2 tracking-wider uppercase leading-tight">
                Confirmation
              </span>
            </div>

          </div>
        </div>
      </div>




      {/* Main Content Layout — Recreated per user specifications & provided design references */}
      <div className="max-w-3xl mx-auto w-full px-4 pt-6 pb-12 space-y-8 font-['Manrope']">
        
        {/* ========================================================= */}
        {/* 1. ORDER SUMMARY (Design matching attached reference) */}
        {/* ========================================================= */}
        <section className="bg-white p-6 sm:p-8 border border-[#E9DFD2] shadow-xs space-y-6">
          <div className="pb-3 border-b border-[#E9DFD2]">
            <h2 className="font-['EB_Garamond'] text-2xl sm:text-3xl font-normal uppercase tracking-[0.15em] text-[#111111]">
              ORDER SUMMARY
            </h2>
          </div>

          {/* Cart items list */}
          <div className="divide-y divide-[#E9DFD2]/70 space-y-4">
            {cart.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedShade}-${item.selectedSize}`}
                className="pt-4 first:pt-0 flex items-start gap-4 sm:gap-6"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-20 h-24 sm:w-24 sm:h-28 object-cover bg-[#F4F2EE] border border-[#E9DFD2]/60 shrink-0"
                />
                <div className="flex-1 min-w-0 space-y-1.5 pt-0.5">
                  <h3 className="font-['EB_Garamond'] text-lg sm:text-xl text-[#111111] font-normal leading-snug">
                    {item.product.name}
                  </h3>
                  <p className="font-['EB_Garamond'] text-sm sm:text-base text-[#111111]">
                    Quantity: {item.quantity}
                  </p>
                  <p className="font-['EB_Garamond'] text-sm sm:text-base text-[#111111] font-medium">
                    Total: ₹ {(item.product.price * item.quantity).toLocaleString('en-IN')}
                  </p>
                  <div className="text-[11px] text-[#57534E] font-['Manrope'] pt-0.5 flex flex-wrap gap-2">
                    <span>Hue: {item.selectedShade}</span>
                    <span>•</span>
                    <span>Scale: {item.selectedSize}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Items Total Row */}
          <div className="pt-4 border-t border-[#E9DFD2] flex items-center justify-between">
            <span className="font-['EB_Garamond'] text-lg sm:text-xl font-normal text-[#111111]">
              Items Total
            </span>
            <span className="font-['EB_Garamond'] text-lg sm:text-xl font-semibold text-[#111111]">
              ₹ {subtotal.toLocaleString('en-IN')}
            </span>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 2. DELIVERY ADDRESS */}
        {/* Condition: Existing Customer (choose saved or add new) vs New Customer (fill fields, auto-saves) */}
        {/* ========================================================= */}
        <section className="bg-white p-6 sm:p-8 border border-[#E9DFD2] shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#E9DFD2] gap-2">
            <h2 className="font-['EB_Garamond'] text-2xl sm:text-3xl font-normal uppercase tracking-[0.15em] text-[#111111]">
              Delivery
            </h2>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-[#57534E]">Customer Status:</span>
              <button
                type="button"
                onClick={() => {
                  setCustomerMode('existing');
                  setIsAddingNewAddress(false);
                }}
                className={`px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                  customerMode === 'existing' && !isAddingNewAddress
                    ? 'bg-[#111111] text-white'
                    : 'bg-[#F4EFEA] text-[#57534E] hover:text-[#111111]'
                }`}
              >
                Saved Patron Addresses ({addresses.length})
              </button>
              <button
                type="button"
                onClick={() => {
                  setCustomerMode('new');
                  setIsAddingNewAddress(true);
                }}
                className={`px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                  customerMode === 'new' || isAddingNewAddress
                    ? 'bg-[#111111] text-white'
                    : 'bg-[#F4EFEA] text-[#57534E] hover:text-[#111111]'
                }`}
              >
                New Customer
              </button>
            </div>
          </div>

          {/* Condition A: Existing customer choosing from saved addresses */}
          {customerMode === 'existing' && !isAddingNewAddress && addresses.length > 0 ? (
            <div className="space-y-4">
              <p className="text-xs text-[#57534E]">
                Select from your verified CYOF salon delivery addresses or enter a new destination:
              </p>

              <div className="grid grid-cols-1 gap-3">
                {addresses.map((addr) => {
                  const isSelected = selectedSavedAddressId === addr.id;
                  return (
                    <div
                      key={addr.id}
                      onClick={() => setSelectedSavedAddressId(addr.id)}
                      className={`p-4 border transition-all cursor-pointer flex items-start gap-3 ${
                        isSelected
                          ? 'border-[#111111] bg-[#FAF8F5] ring-1 ring-[#111111]'
                          : 'border-[#E9DFD2] bg-white hover:border-[#CCCCCC]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="saved-address"
                        checked={isSelected}
                        onChange={() => setSelectedSavedAddressId(addr.id)}
                        className="mt-1 accent-[#D34500]"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-xs text-[#111111] uppercase tracking-wider">
                            {addr.label}
                          </h4>
                          {addr.isDefaultShipping && (
                            <span className="text-[10px] bg-[#D34500]/10 text-[#D34500] font-bold uppercase tracking-wider px-2 py-0.5">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#111111] font-medium mt-1">{addr.fullName} • {addr.phone}</p>
                        <p className="text-xs text-[#57534E] mt-0.5">
                          {addr.addressLine1}{addr.addressLine2 ? `, ${addr.addressLine2}` : ''}, {addr.city}, {addr.state} — PIN {addr.pinCode}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => setIsAddingNewAddress(true)}
                className="w-full py-3 border border-dashed border-[#111111] hover:bg-[#FAF8F5] text-[#111111] text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">add</span>
                <span>Add an Alternative Delivery Address</span>
              </button>
            </div>
          ) : (
            /* Condition B: New customer (or adding a new address) — Shows all 10 fields matching the reference */
            <div className="space-y-4">
              {addresses.length > 0 && isAddingNewAddress && (
                <div className="flex justify-between items-center pb-2">
                  <span className="text-xs text-[#57534E]">Enter new salon delivery details:</span>
                  <button
                    type="button"
                    onClick={() => setIsAddingNewAddress(false)}
                    className="text-xs underline text-[#D34500] font-semibold hover:text-[#111111]"
                  >
                    ← Back to saved addresses
                  </button>
                </div>
              )}

              {/* Country/Region */}
              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-[#57534E] font-semibold block">
                  Country/Region
                </label>
                <div className="relative">
                  <select
                    value={deliveryCountry}
                    onChange={(e) => setDeliveryCountry(e.target.value)}
                    className="w-full bg-[#FAF8F5] text-[#111111] text-sm h-12 px-4 border border-[#D6C7B2] rounded-[4px] focus:outline-none focus:border-[#111111] appearance-none"
                  >
                    <option value="India">India</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#57534E] pointer-events-none text-[20px]">
                    keyboard_arrow_down
                  </span>
                </div>
              </div>

              {/* First name & Last name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-[#57534E] font-semibold block">
                    First name
                  </label>
                  <input
                    type="text"
                    required
                    value={deliveryFirstName}
                    onChange={(e) => setDeliveryFirstName(e.target.value)}
                    placeholder="First name"
                    className="w-full bg-[#FAF8F5] text-[#111111] text-sm h-12 px-4 border border-[#D6C7B2] rounded-[4px] focus:outline-none focus:border-[#111111]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-[#57534E] font-semibold block">
                    Last name
                  </label>
                  <input
                    type="text"
                    required
                    value={deliveryLastName}
                    onChange={(e) => setDeliveryLastName(e.target.value)}
                    placeholder="Last name"
                    className="w-full bg-[#FAF8F5] text-[#111111] text-sm h-12 px-4 border border-[#D6C7B2] rounded-[4px] focus:outline-none focus:border-[#111111]"
                  />
                </div>
              </div>

              {/* Company (optional) */}
              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-[#57534E] font-semibold block">
                  Company (optional)
                </label>
                <input
                  type="text"
                  value={deliveryCompany}
                  onChange={(e) => setDeliveryCompany(e.target.value)}
                  placeholder="Company (optional)"
                  className="w-full bg-[#FAF8F5] text-[#111111] text-sm h-12 px-4 border border-[#D6C7B2] rounded-[4px] focus:outline-none focus:border-[#111111]"
                />
              </div>

              {/* Address with magnifying glass icon */}
              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-[#57534E] font-semibold block">
                  Address
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="Address"
                    className="w-full bg-[#FAF8F5] text-[#111111] text-sm h-12 px-4 pr-10 border border-[#D6C7B2] rounded-[4px] focus:outline-none focus:border-[#111111]"
                  />
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#57534E] pointer-events-none text-[20px]">
                    search
                  </span>
                </div>
              </div>

              {/* Apartment, suite, etc. (optional) */}
              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-[#57534E] font-semibold block">
                  Apartment, suite, etc. (optional)
                </label>
                <input
                  type="text"
                  value={deliveryApartment}
                  onChange={(e) => setDeliveryApartment(e.target.value)}
                  placeholder="Apartment, suite, etc. (optional)"
                  className="w-full bg-[#FAF8F5] text-[#111111] text-sm h-12 px-4 border border-[#D6C7B2] rounded-[4px] focus:outline-none focus:border-[#111111]"
                />
              </div>

              {/* City */}
              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-[#57534E] font-semibold block">
                  City
                </label>
                <input
                  type="text"
                  required
                  value={deliveryCity}
                  onChange={(e) => setDeliveryCity(e.target.value)}
                  placeholder="City"
                  className="w-full bg-[#FAF8F5] text-[#111111] text-sm h-12 px-4 border border-[#D6C7B2] rounded-[4px] focus:outline-none focus:border-[#111111]"
                />
              </div>

              {/* State dropdown */}
              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-[#57534E] font-semibold block">
                  State
                </label>
                <div className="relative">
                  <select
                    value={deliveryState}
                    onChange={(e) => setDeliveryState(e.target.value)}
                    className="w-full bg-[#FAF8F5] text-[#111111] text-sm h-12 px-4 border border-[#D6C7B2] rounded-[4px] focus:outline-none focus:border-[#111111] appearance-none"
                  >
                    {INDIAN_STATES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#57534E] pointer-events-none text-[20px]">
                    keyboard_arrow_down
                  </span>
                </div>
              </div>

              {/* PIN code */}
              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-[#57534E] font-semibold block">
                  PIN code
                </label>
                <input
                  type="text"
                  required
                  value={deliveryPinCode}
                  onChange={(e) => setDeliveryPinCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="PIN code (6 digits)"
                  maxLength={6}
                  className="w-full bg-[#FAF8F5] text-[#111111] text-sm h-12 px-4 border border-[#D6C7B2] rounded-[4px] focus:outline-none focus:border-[#111111]"
                />
              </div>

              {/* Phone with help icon */}
              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-[#57534E] font-semibold block">
                  Phone
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    value={deliveryPhone}
                    onChange={(e) => setDeliveryPhone(e.target.value)}
                    placeholder="Phone"
                    className="w-full bg-[#FAF8F5] text-[#111111] text-sm h-12 px-4 pr-10 border border-[#D6C7B2] rounded-[4px] focus:outline-none focus:border-[#111111]"
                  />
                  <span
                    title="Required for chauffeur delivery appointment and dispatch updates"
                    className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#57534E] text-[20px] cursor-help"
                  >
                    help_outline
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-[#57534E] italic pt-1">
                * This address will be automatically saved to your CYOF patron profile upon placing the order.
              </p>
            </div>
          )}
        </section>

        {/* ========================================================= */}
        {/* 3. BILLING ADDRESS */}
        {/* 2 radio options: Same as Delivery / Add alternative billing address (reveals all fields) */}
        {/* ========================================================= */}
        <section className="bg-white p-6 sm:p-8 border border-[#E9DFD2] shadow-xs space-y-6">
          <div className="pb-3 border-b border-[#E9DFD2]">
            <h2 className="font-['EB_Garamond'] text-2xl sm:text-3xl font-normal uppercase tracking-[0.15em] text-[#111111]">
              BILLING ADDRESS
            </h2>
          </div>

          <div className="space-y-4">
            {/* Option 1: Same as Delivery */}
            <label
              onClick={() => setBillingMode('same')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="radio"
                name="billing-choice"
                checked={billingMode === 'same'}
                onChange={() => setBillingMode('same')}
                className="w-4 h-4 accent-[#111111] cursor-pointer"
              />
              <span className="font-['EB_Garamond'] text-base sm:text-lg text-[#111111] group-hover:text-[#D34500] transition-colors">
                Same as Delivery address
              </span>
            </label>

            {/* Option 2: Add an alternative billing address */}
            <label
              onClick={() => setBillingMode('alternative')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="radio"
                name="billing-choice"
                checked={billingMode === 'alternative'}
                onChange={() => setBillingMode('alternative')}
                className="w-4 h-4 accent-[#111111] cursor-pointer"
              />
              <span className="font-['EB_Garamond'] text-base sm:text-lg text-[#111111] group-hover:text-[#D34500] transition-colors">
                Add an alternative billing address
              </span>
            </label>
          </div>

          {/* Conditional Alternative Billing Address Fields */}
          {billingMode === 'alternative' && (
            <div className="space-y-4 pt-4 border-t border-[#E9DFD2]/70 animate-in fade-in duration-200">
              <p className="text-xs text-[#57534E]">
                Enter your tax invoice and registered billing address:
              </p>

              {/* Country/Region */}
              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-[#57534E] font-semibold block">
                  Country/Region
                </label>
                <div className="relative">
                  <select
                    value={billingCountry}
                    onChange={(e) => setBillingCountry(e.target.value)}
                    className="w-full bg-[#FAF8F5] text-[#111111] text-sm h-12 px-4 border border-[#D6C7B2] rounded-[4px] focus:outline-none focus:border-[#111111] appearance-none"
                  >
                    <option value="India">India</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#57534E] pointer-events-none text-[20px]">
                    keyboard_arrow_down
                  </span>
                </div>
              </div>

              {/* First name & Last name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-[#57534E] font-semibold block">
                    First name
                  </label>
                  <input
                    type="text"
                    required
                    value={billingFirstName}
                    onChange={(e) => setBillingFirstName(e.target.value)}
                    placeholder="First name"
                    className="w-full bg-[#FAF8F5] text-[#111111] text-sm h-12 px-4 border border-[#D6C7B2] rounded-[4px] focus:outline-none focus:border-[#111111]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-[#57534E] font-semibold block">
                    Last name
                  </label>
                  <input
                    type="text"
                    required
                    value={billingLastName}
                    onChange={(e) => setBillingLastName(e.target.value)}
                    placeholder="Last name"
                    className="w-full bg-[#FAF8F5] text-[#111111] text-sm h-12 px-4 border border-[#D6C7B2] rounded-[4px] focus:outline-none focus:border-[#111111]"
                  />
                </div>
              </div>

              {/* Company (optional) */}
              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-[#57534E] font-semibold block">
                  Company (optional)
                </label>
                <input
                  type="text"
                  value={billingCompany}
                  onChange={(e) => setBillingCompany(e.target.value)}
                  placeholder="Company (optional)"
                  className="w-full bg-[#FAF8F5] text-[#111111] text-sm h-12 px-4 border border-[#D6C7B2] rounded-[4px] focus:outline-none focus:border-[#111111]"
                />
              </div>

              {/* Address */}
              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-[#57534E] font-semibold block">
                  Address
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={billingAddress}
                    onChange={(e) => setBillingAddress(e.target.value)}
                    placeholder="Address"
                    className="w-full bg-[#FAF8F5] text-[#111111] text-sm h-12 px-4 pr-10 border border-[#D6C7B2] rounded-[4px] focus:outline-none focus:border-[#111111]"
                  />
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#57534E] pointer-events-none text-[20px]">
                    search
                  </span>
                </div>
              </div>

              {/* Apartment, suite, etc. (optional) */}
              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-[#57534E] font-semibold block">
                  Apartment, suite, etc. (optional)
                </label>
                <input
                  type="text"
                  value={billingApartment}
                  onChange={(e) => setBillingApartment(e.target.value)}
                  placeholder="Apartment, suite, etc. (optional)"
                  className="w-full bg-[#FAF8F5] text-[#111111] text-sm h-12 px-4 border border-[#D6C7B2] rounded-[4px] focus:outline-none focus:border-[#111111]"
                />
              </div>

              {/* City */}
              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-[#57534E] font-semibold block">
                  City
                </label>
                <input
                  type="text"
                  required
                  value={billingCity}
                  onChange={(e) => setBillingCity(e.target.value)}
                  placeholder="City"
                  className="w-full bg-[#FAF8F5] text-[#111111] text-sm h-12 px-4 border border-[#D6C7B2] rounded-[4px] focus:outline-none focus:border-[#111111]"
                />
              </div>

              {/* State */}
              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-[#57534E] font-semibold block">
                  State
                </label>
                <div className="relative">
                  <select
                    value={billingState}
                    onChange={(e) => setBillingState(e.target.value)}
                    className="w-full bg-[#FAF8F5] text-[#111111] text-sm h-12 px-4 border border-[#D6C7B2] rounded-[4px] focus:outline-none focus:border-[#111111] appearance-none"
                  >
                    {INDIAN_STATES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#57534E] pointer-events-none text-[20px]">
                    keyboard_arrow_down
                  </span>
                </div>
              </div>

              {/* PIN code */}
              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-[#57534E] font-semibold block">
                  PIN code
                </label>
                <input
                  type="text"
                  required
                  value={billingPinCode}
                  onChange={(e) => setBillingPinCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="PIN code (6 digits)"
                  maxLength={6}
                  className="w-full bg-[#FAF8F5] text-[#111111] text-sm h-12 px-4 border border-[#D6C7B2] rounded-[4px] focus:outline-none focus:border-[#111111]"
                />
              </div>

              {/* Phone */}
              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-[#57534E] font-semibold block">
                  Phone
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    value={billingPhone}
                    onChange={(e) => setBillingPhone(e.target.value)}
                    placeholder="Phone"
                    className="w-full bg-[#FAF8F5] text-[#111111] text-sm h-12 px-4 pr-10 border border-[#D6C7B2] rounded-[4px] focus:outline-none focus:border-[#111111]"
                  />
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#57534E] text-[20px]">
                    help_outline
                  </span>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* ========================================================= */}
        {/* 4. SHIPPING METHOD */}
        {/* Condition: Shows message until address & PIN verified, then shows Standard FREE */}
        {/* ========================================================= */}
        <section className="bg-white p-6 sm:p-8 border border-[#E9DFD2] shadow-xs space-y-4">
          <div className="pb-2">
            <h2 className="font-['EB_Garamond'] text-2xl sm:text-3xl font-normal uppercase tracking-[0.15em] text-[#111111]">
              Shipping method
            </h2>
          </div>

          {!isShippingReady ? (
            /* Unverified state matching image */
            <div className="w-full bg-[#FAF8F5] border border-[#E9DFD2]/60 rounded-[4px] p-5 sm:p-6 text-left">
              <p className="text-[#57534E] font-['Manrope'] text-sm sm:text-base leading-relaxed">
                Enter your shipping address to view available shipping methods.
              </p>
            </div>
          ) : (
            /* Verified state matching image */
            <div className="space-y-2">
              <div className="w-full bg-white border border-[#4A5D4E] rounded-[4px] p-4 flex items-center justify-between">
                <span className="font-['Manrope'] font-bold text-base text-[#111111]">
                  Standard
                </span>
                <span className="font-['Manrope'] font-bold text-base text-[#111111] uppercase tracking-wider">
                  FREE
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#57534E] pt-1">
                <span className="material-symbols-outlined text-[16px] text-[#D34500]">verified</span>
                <span>
                  PIN {currentDeliveryPin} Verified • Complimentary White-Glove Chauffeur Hand-Delivery & Salon Fitting
                </span>
              </div>
            </div>
          )}
        </section>

        {/* ========================================================= */}
        {/* 5. BILLING SUMMARY (Design matching attached reference) */}
        {/* ========================================================= */}
        <section className="bg-white p-6 sm:p-8 border border-[#E9DFD2] shadow-xs space-y-5">
          <div className="pb-3 border-b border-[#E9DFD2]">
            <h2 className="font-['EB_Garamond'] text-2xl sm:text-3xl font-normal uppercase tracking-[0.15em] text-[#111111]">
              BILLING SUMMARY
            </h2>
          </div>

          <div className="space-y-3 font-['EB_Garamond']">
            <div className="flex items-center justify-between text-base sm:text-lg text-[#111111]">
              <span>Items total</span>
              <span>₹ {subtotal.toLocaleString('en-IN')}</span>
            </div>

            <div className="flex items-center justify-between text-base sm:text-lg text-[#111111]">
              <span>Shipping</span>
              <span>₹ 0</span>
            </div>
            {couponApplied && (
              <div className="flex items-center justify-between text-base sm:text-lg text-[#D34500]">
                <span>Coupon Concession ({couponCode})</span>
                <span>- ₹ {couponDiscount.toLocaleString('en-IN')}</span>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-[#E9DFD2] flex items-center justify-between font-['EB_Garamond'] text-lg sm:text-xl font-bold text-[#111111]">
            <span>Total For Your Order</span>
            <span>₹ {finalTotal.toLocaleString('en-IN')}</span>
          </div>

          <p className="font-['EB_Garamond'] text-xs sm:text-sm text-[#57534E] leading-relaxed pt-1">
            The total amount you pay includes all applicable customs duties & taxes. We guarantee no additional charges on delivery.
          </p>
        </section>

        {/* ========================================================= */}
        {/* 6. COUPON CODE APPLY & CHECKOUT BUTTON (PAY & PLACE ORDER) */}
        {/* ========================================================= */}
        <section className="bg-white p-6 sm:p-8 border border-[#E9DFD2] shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#E9DFD2]">
            <span className="font-['Manrope'] text-xs uppercase tracking-widest text-[#111111] font-bold">
              Coupon Code
            </span>
            <span className="text-[10px] text-[#D34500] font-semibold uppercase tracking-wider flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">sell</span>
              Promotional Privilege
            </span>
          </div>

          {/* Coupon Input and Apply Button */}
          <div className="space-y-3">
            <div className="flex flex-row gap-2 items-center">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => {
                  setCouponCode(e.target.value.toUpperCase());
                  setCouponError('');
                }}
                disabled={couponApplied}
                placeholder="Enter coupon code (e.g. CYOF10)"
                className="flex-1 min-w-0 bg-[#FAF8F5] text-[#111111] text-xs sm:text-sm h-12 px-3 sm:px-4 border border-[#D6C7B2] rounded-[4px] uppercase tracking-wider focus:outline-none focus:border-[#111111] disabled:opacity-60"
              />
              {couponApplied ? (
                <button
                  type="button"
                  onClick={handleRemoveCoupon}
                  className="h-12 px-4 sm:px-6 bg-[#111111] hover:bg-[#333333] text-white font-['Manrope'] text-xs uppercase tracking-widest font-semibold transition-colors cursor-pointer shrink-0 flex items-center justify-center"
                >
                  Remove
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => handleApplyCoupon()}
                  style={{ backgroundColor: '#D34500' }}
                  className="h-12 px-4 sm:px-6 bg-[#D34500] hover:bg-[#b93c00] text-white font-['Manrope'] text-xs uppercase tracking-widest font-semibold transition-colors cursor-pointer shrink-0 active:scale-[0.99] flex items-center justify-center"
                >
                  Apply
                </button>
              )}
            </div>

            {couponError && (
              <p className="text-xs text-[#ba1a1a] font-['Manrope']">
                {couponError}
              </p>
            )}

            {couponApplied && (
              <div className="p-3 bg-[#FAF8F5] border border-[#E9DFD2] flex items-center justify-between text-xs font-['Manrope']">
                <span className="flex items-center gap-1.5 text-[#4A5D4E] font-medium">
                  <span className="material-symbols-outlined text-[16px]">verified</span>
                  Coupon "{couponCode}" applied successfully (-₹{couponDiscount.toLocaleString('en-IN')})
                </span>
                <span className="text-[#D34500] font-bold">Discount Applied</span>
              </div>
            )}
          </div>

          {/* 6. The Checkout Button: PAY & PLACE ORDER */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handlePlaceOrder}
              style={{ backgroundColor: '#D34500' }}
              className="w-full h-14 bg-[#D34500] hover:bg-[#b93c00] text-white font-['Manrope'] text-sm uppercase tracking-[0.25em] font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
            >
              <span>PAY & PLACE ORDER — ₹ {finalTotal.toLocaleString('en-IN')}</span>
            </button>
            <p className="text-center font-['Manrope'] text-[10px] text-[#57534E] uppercase tracking-wider mt-3">
              Official CYOF Direct Atelier Provenance • Hand-Crafted Luxury <span className="text-[#D34500] normal-case">#CraftedYourOwnFashion</span>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};
