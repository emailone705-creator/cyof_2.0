import React, { useState } from 'react';
import { CartItem, ViewRoute } from '../types';

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
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [deliveryMode, setDeliveryMode] = useState<'white-glove' | 'armored-freight'>('white-glove');
  const [paymentTab, setPaymentTab] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Form states - India Defaults
  const [email, setEmail] = useState('patron.client@cyof.in');
  const [phone, setPhone] = useState('+91 98200 12834');
  const [country, setCountry] = useState('IN');
  const [firstName, setFirstName] = useState('Aarav');
  const [lastName, setLastName] = useState('Singhania');
  const [address, setAddress] = useState('Altamount Road, Cumballa Hill');
  const [suite, setSuite] = useState('Apartment 1802, The Imperial');
  const [city, setCity] = useState('Mumbai');
  const [state, setState] = useState('Maharashtra');
  const [zip, setZip] = useState('400026');
  const [upiId, setUpiId] = useState('singhania@okhdfcbank');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8892');
  const [expiry, setExpiry] = useState('12 / 28');
  const [cvc, setCvc] = useState('784');
  const [cardHolder, setCardHolder] = useState('AARAV SINGHANIA');

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
                Thank you, {firstName}. Your bespoke order has been assigned to our master tailor. An encrypted dossier and white-glove chauffeur appointment confirmation have been dispatched to {email}.
              </p>
            </div>

            <div className="p-4 bg-white border border-[#E9DFD2] text-left space-y-2 font-['Manrope'] text-xs">
              <div className="flex justify-between">
                <span className="text-[#57534E]">Consignment Value:</span>
                <span className="font-semibold text-[#111111]">₹{subtotal.toLocaleString('en-IN')} (Incl. of GST)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#57534E]">Delivery Service:</span>
                <span className="text-[#B94700] font-semibold">
                  {deliveryMode === 'white-glove' ? 'White-Glove Private Courier (Pan-India)' : 'Signature Armored Freight'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#57534E]">Salon Destination:</span>
                <span className="text-[#111111]">{address}, {city}, {state} — PIN {zip}, India</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#57534E]">Provenance Passport:</span>
                <span className="text-[#B94700] font-semibold">Immutable NFC Chip Inscribed</span>
              </div>
            </div>

            <button
              onClick={() => onNavigate('home')}
              className="w-full py-4 bg-[#111111] hover:bg-[#B94700] text-white font-['Manrope'] text-xs uppercase tracking-widest font-semibold transition-colors shadow-md cursor-pointer"
            >
              Return to CYOF Flagship
            </button>
          </div>
        </div>
      )}

      {/* Trust Sub-Bar */}
      <div className="w-full bg-[#f6f3ee] px-4 md:px-8 lg:px-16 py-3 flex items-center justify-between border-b border-[#E9DFD2]">
        <div className="flex items-center gap-2 text-[#57534E] font-['Manrope'] text-xs">
          <span className="material-symbols-outlined text-[16px] text-[#B94700]">lock</span>
          <span className="uppercase tracking-wider">SSL 256-Bit Encrypted • #CraftedYourOwnFashion</span>
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
        <div className="max-w-2xl mx-auto flex items-center justify-between text-center relative font-['Manrope']">
          <div className="absolute top-1/2 left-8 right-8 -translate-y-1/2 h-0.5 bg-[#E9DFD2] -z-0" />
          <div className="absolute top-1/2 left-8 w-1/2 -translate-y-1/2 h-0.5 bg-[#B94700] -z-0" />

          {/* Step 1 */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-[#B94700] text-white flex items-center justify-center text-xs font-semibold shadow-sm">
              1
            </div>
            <span className="text-[10px] text-[#111111] font-semibold mt-1 tracking-wider uppercase">Contact & Delivery</span>
          </div>

          {/* Step 2 */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-[#111111] text-white flex items-center justify-center text-xs font-medium">
              2
            </div>
            <span className="text-[10px] text-[#111111] font-semibold mt-1 tracking-wider uppercase">Payment</span>
          </div>

          {/* Step 3 */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-[#ebe8e3] text-[#57534E] flex items-center justify-center text-xs font-medium">
              3
            </div>
            <span className="text-[10px] text-[#57534E] mt-1 tracking-wider uppercase">Confirmation</span>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-3xl mx-auto w-full px-4 pt-6 space-y-6">
        
        {/* Express Checkout Panel */}
        <div className="bg-white p-5 border border-[#E9DFD2] shadow-xs">
          <div className="flex items-center justify-between mb-3 font-['Manrope']">
            <span className="text-[10px] text-[#57534E] uppercase tracking-widest font-semibold">
              Express Atelier Checkout
            </span>
            <span className="text-[10px] text-[#B94700] font-semibold uppercase tracking-wider">
              Instant Authorization
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2 font-['Manrope']">
            <button
              type="button"
              onClick={handleSubmit}
              className="h-11 bg-[#111111] text-white flex items-center justify-center text-xs uppercase tracking-wider font-semibold hover:opacity-90 transition-opacity cursor-pointer shadow-xs"
            >
              GPay UPI
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="h-11 bg-[#f0ede9] text-[#111111] border border-[#E9DFD2] flex items-center justify-center text-xs uppercase tracking-wider font-semibold hover:bg-[#E9DFD2] transition-colors cursor-pointer shadow-xs"
            >
              PhonePe
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="h-11 bg-[#f0ede9] text-[#111111] border border-[#E9DFD2] flex items-center justify-center text-xs uppercase tracking-wider font-semibold hover:bg-[#E9DFD2] transition-colors cursor-pointer shadow-xs"
            >
              Paytm UPI
            </button>
          </div>
        </div>

        {/* Primary Checkout Form */}
        <form onSubmit={handleSubmit} className="space-y-6 font-['Manrope']">
          
          {/* Section 1: Contact Information */}
          <div className="bg-white p-5 sm:p-6 border border-[#E9DFD2] shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#E9DFD2]">
              <h2 className="font-['EB_Garamond'] text-xl uppercase tracking-wide text-[#111111] flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#B94700]/10 text-[#B94700] text-xs flex items-center justify-center font-bold font-['Manrope']">1</span>
                Contact Details
              </h2>
              <span className="text-[10px] text-[#B94700] font-semibold uppercase tracking-wider cursor-pointer">
                CYOF Private Salon Access
              </span>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-wider text-[#57534E] font-semibold">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="client.atelier@cyof.com"
                className="w-full bg-[#f6f3ee] text-[#111111] text-[16px] sm:text-xs min-h-[44px] px-4 py-3 border border-[#E9DFD2] focus:outline-none focus:border-[#111111]"
              />
              <p className="text-[10px] text-[#57534E] flex items-center gap-1 pt-0.5">
                <span className="material-symbols-outlined text-[12px] text-[#B94700]">stars</span>
                Earn 765 Salon Privé Archival Points upon completion.
              </p>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-wider text-[#57534E] font-semibold">Mobile Telephone</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 019-2834"
                className="w-full bg-[#f6f3ee] text-[#111111] text-[16px] sm:text-xs min-h-[44px] px-4 py-3 border border-[#E9DFD2] focus:outline-none focus:border-[#111111]"
              />
              <p className="text-[10px] text-[#57534E]">For white-glove chauffeur appointment confirmation & SMS consignment tracking.</p>
            </div>
          </div>

          {/* Section 2: Salon Delivery Address */}
          <div className="bg-white p-5 sm:p-6 border border-[#E9DFD2] shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#E9DFD2]">
              <h2 className="font-['EB_Garamond'] text-xl uppercase tracking-wide text-[#111111] flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#B94700]/10 text-[#B94700] text-xs flex items-center justify-center font-bold font-['Manrope']">2</span>
                Salon Delivery Address
              </h2>
              <span className="text-[10px] text-[#57534E] uppercase tracking-wider">Atelier Dispatch</span>
            </div>

            <div>
              <label className="text-[10px] uppercase tracking-wider text-[#57534E] font-semibold block mb-1">
                Country / Territory
              </label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full bg-[#f6f3ee] text-[#111111] text-[16px] sm:text-xs min-h-[44px] px-4 py-3 border border-[#E9DFD2] focus:outline-none focus:border-[#111111]"
              >
                <option value="IN">India (Pan-India Express Dispatch • All States & UTs)</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#57534E] font-semibold block mb-1">First Name</label>
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full bg-[#f6f3ee] text-[#111111] text-[16px] sm:text-xs min-h-[44px] px-4 py-3 border border-[#E9DFD2] focus:outline-none focus:border-[#111111]"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#57534E] font-semibold block mb-1">Last Name</label>
                <input
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full bg-[#f6f3ee] text-[#111111] text-[16px] sm:text-xs min-h-[44px] px-4 py-3 border border-[#E9DFD2] focus:outline-none focus:border-[#111111]"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] uppercase tracking-wider text-[#57534E] font-semibold block mb-1">Street Address</label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-[#f6f3ee] text-[#111111] text-[16px] sm:text-xs min-h-[44px] px-4 py-3 border border-[#E9DFD2] focus:outline-none focus:border-[#111111]"
              />
            </div>

            <div>
              <label className="text-[10px] uppercase tracking-wider text-[#57534E] font-semibold block mb-1">
                Apartment, Penthouse, Suite, Villa (Optional)
              </label>
              <input
                type="text"
                value={suite}
                onChange={(e) => setSuite(e.target.value)}
                className="w-full bg-[#f6f3ee] text-[#111111] text-[16px] sm:text-xs min-h-[44px] px-4 py-3 border border-[#E9DFD2] focus:outline-none focus:border-[#111111]"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#57534E] font-semibold block mb-1">City</label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-[#f6f3ee] text-[#111111] text-[16px] sm:text-xs min-h-[44px] px-3 py-3 border border-[#E9DFD2] focus:outline-none focus:border-[#111111]"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#57534E] font-semibold block mb-1">State</label>
                <input
                  type="text"
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full bg-[#f6f3ee] text-[#111111] text-[16px] sm:text-xs min-h-[44px] px-3 py-3 border border-[#E9DFD2] focus:outline-none focus:border-[#111111] uppercase"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#57534E] font-semibold block mb-1">PIN Code</label>
                <input
                  type="text"
                  required
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  placeholder="e.g. 400026"
                  maxLength={6}
                  className="w-full bg-[#f6f3ee] text-[#111111] text-[16px] sm:text-xs min-h-[44px] px-3 py-3 border border-[#E9DFD2] focus:outline-none focus:border-[#111111]"
                />
              </div>
            </div>

            {/* Delivery Mode Radios */}
            <div className="pt-2 space-y-2">
              <span className="text-[10px] uppercase tracking-wider text-[#57534E] font-semibold block">
                Select Handcrafted Delivery Experience
              </span>

              <label
                onClick={() => setDeliveryMode('white-glove')}
                className={`p-4 border block cursor-pointer transition-all ${
                  deliveryMode === 'white-glove' ? 'border-[#111111] bg-[#f6f3ee]' : 'border-[#E9DFD2] bg-white'
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="delivery"
                    checked={deliveryMode === 'white-glove'}
                    onChange={() => setDeliveryMode('white-glove')}
                    className="mt-1 accent-[#B94700]"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-xs text-[#111111]">White-Glove Private Courier</span>
                      <span className="text-[10px] text-[#B94700] uppercase font-bold">Complimentary</span>
                    </div>
                    <p className="text-[11px] text-[#57534E] mt-0.5">
                      In-room salon fitting, custom hanger presentation & archival garment bag included. Delivered tomorrow evening.
                    </p>
                  </div>
                </div>
              </label>

              <label
                onClick={() => setDeliveryMode('armored-freight')}
                className={`p-4 border block cursor-pointer transition-all ${
                  deliveryMode === 'armored-freight' ? 'border-[#111111] bg-[#f6f3ee]' : 'border-[#E9DFD2] bg-white'
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="delivery"
                    checked={deliveryMode === 'armored-freight'}
                    onChange={() => setDeliveryMode('armored-freight')}
                    className="mt-1 accent-[#B94700]"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-xs text-[#111111]">Signature Discreet Armored Freight</span>
                      <span className="text-[10px] text-[#57534E] uppercase">Complimentary</span>
                    </div>
                    <p className="text-[11px] text-[#57534E] mt-0.5">
                      Tamper-evident temperature-controlled vault transport with direct signature required.
                    </p>
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Section 3: Payment Method */}
          <div className="bg-white p-5 sm:p-6 border border-[#E9DFD2] shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#E9DFD2]">
              <h2 className="font-['EB_Garamond'] text-xl uppercase tracking-wide text-[#111111] flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#B94700]/10 text-[#B94700] text-xs flex items-center justify-center font-bold font-['Manrope']">3</span>
                Payment Method
              </h2>
              <span className="text-[10px] text-[#B94700] font-semibold uppercase tracking-wider flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">verified_user</span>
                Secured
              </span>
            </div>

            {/* Payment Tabs for India */}
            <div className="grid grid-cols-3 gap-1 bg-[#f0ede9] p-1">
              {(['upi', 'card', 'netbanking'] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setPaymentTab(tab)}
                  className={`py-2 text-center font-['Manrope'] text-[10px] uppercase tracking-wider font-semibold transition-all ${
                    paymentTab === tab ? 'bg-white text-[#111111] shadow-xs' : 'text-[#57534E]'
                  }`}
                >
                  {tab === 'upi' ? 'UPI & QR' : tab === 'card' ? 'Debit/Credit Cards' : 'Net Banking'}
                </button>
              ))}
            </div>

            {/* UPI Tab */}
            {paymentTab === 'upi' && (
              <div className="space-y-4 pt-2">
                <div className="p-4 bg-[#f6f3ee] border border-[#E9DFD2] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#111111] uppercase tracking-wider">Instant UPI Payment</span>
                    <span className="text-[10px] text-[#B94700] font-semibold">Zero Surcharge</span>
                  </div>
                  <p className="text-[11px] text-[#57534E]">
                    Pay seamlessly with Google Pay, PhonePe, Paytm, BHIM, or any UPI client.
                  </p>
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#57534E] font-semibold block mb-1">
                    Enter Virtual Payment Address (UPI ID)
                  </label>
                  <input
                    type="text"
                    required
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="e.g. mobile@upi or name@okhdfcbank"
                    className="w-full bg-[#f6f3ee] text-[#111111] text-[16px] sm:text-xs min-h-[44px] px-4 py-3 border border-[#E9DFD2] focus:outline-none focus:border-[#111111]"
                  />
                </div>
                <div className="flex items-center gap-3 text-[11px] text-[#57534E]">
                  <span className="material-symbols-outlined text-[#B94700] text-[16px]">qr_code_2</span>
                  <span>A secure dynamic payment prompt or QR request will open on authorization.</span>
                </div>
              </div>
            )}

            {/* Cards Tab */}
            {paymentTab === 'card' && (
              <div className="space-y-3 pt-2">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[10px] uppercase tracking-wider text-[#57534E] font-semibold">Card Number</label>
                    <span className="text-[10px] text-[#57534E] font-bold">RuPay | VISA | MASTERCARD</span>
                  </div>
                  <input
                    type="text"
                    required
                    value={cardNumber}
                    onChange={(e) => {
                      let val = e.target.value.replace(/\D/g, '');
                      val = val.match(/.{1,4}/g)?.join(' ') || val;
                      setCardNumber(val);
                    }}
                    maxLength={19}
                    className="w-full bg-[#f6f3ee] text-[#111111] text-[16px] sm:text-xs min-h-[44px] px-4 py-3 border border-[#E9DFD2] focus:outline-none focus:border-[#111111] tracking-wide"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#57534E] font-semibold block mb-1">Expiration</label>
                    <input
                      type="text"
                      required
                      value={expiry}
                      onChange={(e) => {
                        let val = e.target.value.replace(/\D/g, '');
                        if (val.length > 2) {
                          val = val.substring(0, 2) + ' / ' + val.substring(2, 4);
                        }
                        setExpiry(val);
                      }}
                      placeholder="MM / YY"
                      maxLength={7}
                      className="w-full bg-[#f6f3ee] text-[#111111] text-[16px] sm:text-xs min-h-[44px] px-4 py-3 border border-[#E9DFD2] focus:outline-none focus:border-[#111111] text-center"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#57534E] font-semibold block mb-1">Security Code (CVV)</label>
                    <input
                      type="password"
                      required
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value.slice(0, 4))}
                      placeholder="CVV"
                      maxLength={4}
                      className="w-full bg-[#f6f3ee] text-[#111111] text-[16px] sm:text-xs min-h-[44px] px-4 py-3 border border-[#E9DFD2] focus:outline-none focus:border-[#111111] text-center"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#57534E] font-semibold block mb-1">Cardholder Name</label>
                  <input
                    type="text"
                    required
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
                    className="w-full bg-[#f6f3ee] text-[#111111] text-[16px] sm:text-xs min-h-[44px] px-4 py-3 border border-[#E9DFD2] focus:outline-none focus:border-[#111111] uppercase tracking-wider"
                  />
                </div>

                <label className="flex items-center gap-2 pt-1 cursor-pointer">
                  <input type="checkbox" defaultChecked className="accent-[#B94700]" />
                  <span className="text-[11px] text-[#57534E]">Billing address same as salon delivery address</span>
                </label>
              </div>
            )}

            {/* NetBanking Tab */}
            {paymentTab === 'netbanking' && (
              <div className="space-y-3 pt-2">
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#57534E] font-semibold block mb-1">
                    Select Your Indian Bank
                  </label>
                  <select
                    value={selectedBank}
                    onChange={(e) => setSelectedBank(e.target.value)}
                    className="w-full bg-[#f6f3ee] text-[#111111] text-[16px] sm:text-xs min-h-[44px] px-4 py-3 border border-[#E9DFD2] focus:outline-none focus:border-[#111111]"
                  >
                    <option value="HDFC Bank">HDFC Bank</option>
                    <option value="ICICI Bank">ICICI Bank</option>
                    <option value="State Bank of India">State Bank of India</option>
                    <option value="Axis Bank">Axis Bank</option>
                    <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                    <option value="Punjab National Bank">Punjab National Bank</option>
                  </select>
                </div>
                <p className="text-[11px] text-[#57534E] bg-[#f6f3ee] p-3 border border-[#E9DFD2]">
                  You will be routed securely to your banking institution portal for two-factor OTP authorization.
                </p>
              </div>
            )}
          </div>

          {/* CYOF Haute Couture Guarantee */}
          <div className="bg-[#f0ede9] p-5 border border-[#E9DFD2] space-y-3 text-xs">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-[#B94700] text-[20px] mt-0.5">workspace_premium</span>
              <div>
                <h4 className="font-semibold uppercase tracking-wider text-[11px] text-[#111111]">
                  Official CYOF Haute Couture Guarantee
                </h4>
                <p className="text-[11px] text-[#57534E] mt-0.5">
                  Every piece is certified authentic with an immutable NFC provenance chip registered in your private vault.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-[#B94700] text-[20px] mt-0.5">straighten</span>
              <div>
                <h4 className="font-semibold uppercase tracking-wider text-[11px] text-[#111111]">
                  Direct Atelier Provenance & Fit Service
                </h4>
                <p className="text-[11px] text-[#57534E] mt-0.5">
                  Complimentary alterations available within 30 days at any global flagship salon upon presentation of your order token.
                </p>
              </div>
            </div>
          </div>

          {/* Collapsible Order Drawer */}
          <div className="bg-white border border-[#E9DFD2] overflow-hidden">
            <button
              type="button"
              onClick={() => setDrawerOpen(!drawerOpen)}
              className="w-full p-4 flex items-center justify-between text-left cursor-pointer hover:bg-[#f6f3ee]"
            >
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-widest text-[#57534E] font-semibold">
                  Review Reserved Garments ({cart.length})
                </span>
                <span className="material-symbols-outlined text-[16px] text-[#57534E]">
                  {drawerOpen ? 'expand_less' : 'expand_more'}
                </span>
              </div>
              <span className="font-['EB_Garamond'] text-lg font-semibold text-[#111111]">
                ₹{subtotal.toLocaleString('en-IN')}
              </span>
            </button>

            {drawerOpen && (
              <div className="p-4 bg-[#f6f3ee] border-t border-[#E9DFD2] space-y-3">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-3 bg-white p-2.5 border border-[#E9DFD2]">
                    <img src={item.product.image} alt={item.product.name} className="w-12 h-14 object-cover" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-['EB_Garamond'] text-base text-[#111111] truncate">{item.product.name}</h4>
                      <p className="text-[10px] text-[#57534E]">Qty: {item.quantity} • {item.selectedShade}</p>
                    </div>
                    <span className="font-['Manrope'] text-xs font-semibold text-[#111111]">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Authorization Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full h-14 bg-[#B94700] hover:bg-[#111111] text-white font-['Manrope'] text-xs uppercase tracking-widest font-semibold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
            >
              <span className="material-symbols-outlined text-[20px]">lock</span>
              <span>Authorize Transaction & Place Order — ₹{subtotal.toLocaleString('en-IN')}</span>
            </button>
            <p className="text-center font-['Manrope'] text-[10px] text-[#57534E] uppercase tracking-wider mt-2">
              Direct Atelier Fulfillment & 30-Day Complimentary Salon Returns
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
