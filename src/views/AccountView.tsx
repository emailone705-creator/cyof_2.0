import React, { useState } from 'react';
import { ViewRoute, Product } from '../types';
import { usePatron } from '../context/PatronContext';

interface AccountViewProps {
  onNavigate: (route: ViewRoute) => void;
  onOpenSalonModal: () => void;
  wishlist?: Product[];
}

export const AccountView: React.FC<AccountViewProps> = ({
  onNavigate,
  onOpenSalonModal,
  wishlist = [],
}) => {
  const {
    isAuthenticated,
    signOut,
    signIn,
    profile,
    orders,
    addresses,
    returns,
  } = usePatron();

  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);
  const [signInIdentifier, setSignInIdentifier] = useState('aarav.singhania@private.in');
  const [signInOtp, setSignInOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSignOut = () => {
    signOut();
    setShowSignOutConfirm(false);
    showToast('Signed out of Client Dossier');
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    signIn(signInIdentifier);
    setOtpSent(false);
    setSignInOtp('');
    showToast(`Welcome back, ${profile.fullName}`);
  };

  // If Not Authenticated: Show Patron Sign In / Registration Form
  if (!isAuthenticated) {
    return (
      <div className="w-full flex flex-col bg-[#fcf9f4] min-h-screen text-[#1c1c19] py-16 px-4 md:px-8 max-w-[1200px] mx-auto">
        {toastMessage && (
          <div className="fixed top-24 right-4 z-50 bg-[#111111] text-white text-xs font-['Manrope'] px-4 py-3 shadow-xl border-l-2 border-[#B94700] animate-in slide-in-from-top-2">
            {toastMessage}
          </div>
        )}

        <div className="max-w-md mx-auto w-full bg-white border border-[#E9DFD2] p-8 md:p-10 shadow-sm text-center">
          <div className="w-12 h-12 bg-[#111111] text-white flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-[24px]">key</span>
          </div>

          <span className="font-['Manrope'] text-[10px] text-[#B94700] uppercase tracking-[0.25em] font-bold block mb-2">
            CYOF Private Patron Portal • #CraftedYourOwnFashion
          </span>
          <h1 className="font-['EB_Garamond'] text-3xl sm:text-4xl text-[#111111] font-normal mb-3">
            Client Dossier Sign In
          </h1>
          <p className="font-['Manrope'] text-xs text-[#57534E] leading-relaxed mb-8">
            Access your active commissions, white-glove shipments, GST invoices, and Atelier Privé rewards.
          </p>

          <form onSubmit={handleSignIn} className="space-y-4 text-left font-['Manrope']">
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-[#57534E] mb-1 font-semibold">
                Patron Mobile Number or Confidential Email
              </label>
              <input
                type="text"
                required
                value={signInIdentifier}
                onChange={(e) => setSignInIdentifier(e.target.value)}
                placeholder="+91 98200 12834 or patron@domain.in"
                className="w-full bg-[#fcf9f4] border border-[#E9DFD2] p-3.5 text-xs text-[#111111] focus:outline-none focus:border-[#111111]"
              />
            </div>

            {otpSent && (
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#57534E] mb-1 font-semibold">
                  Enter 6-Digit Secure OTP
                </label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={signInOtp}
                  onChange={(e) => setSignInOtp(e.target.value)}
                  placeholder="e.g. 882940"
                  className="w-full bg-[#fcf9f4] border border-[#E9DFD2] p-3.5 text-xs text-[#111111] tracking-widest text-center focus:outline-none focus:border-[#111111]"
                />
                <span className="text-[10px] text-[#57534E] mt-1 block">
                  Dispatched via encrypted SMS to your registered Indian mobile number.
                </span>
              </div>
            )}

            {!otpSent ? (
              <button
                type="button"
                onClick={() => {
                  setOtpSent(true);
                  showToast('Single-Use Authentication Code dispatched via SMS');
                }}
                className="w-full py-3.5 bg-[#111111] hover:bg-[#B94700] text-white text-xs uppercase tracking-widest font-semibold transition-colors mt-2 cursor-pointer"
              >
                Request Encrypted Sign-In OTP
              </button>
            ) : (
              <button
                type="submit"
                className="w-full py-3.5 bg-[#B94700] hover:bg-[#111111] text-white text-xs uppercase tracking-widest font-semibold transition-colors mt-2 cursor-pointer"
              >
                Verify & Enter Dossier
              </button>
            )}

            <div className="pt-4 border-t border-[#E9DFD2] text-center">
              <button
                type="button"
                onClick={() => {
                  setSignInIdentifier('aarav.singhania@private.in');
                  signIn('aarav.singhania@private.in');
                  showToast('Authenticated as Aarav Singhania (Demo Patron)');
                }}
                className="text-[11px] text-[#B94700] hover:underline uppercase tracking-wider font-semibold cursor-pointer"
              >
                Instant Demo Access (Aarav Singhania)
              </button>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-[#E9DFD2] flex justify-between items-center text-[10px] text-[#57534E] font-['Manrope']">
            <span>India Concierge: +91 1800 209 2963</span>
            <button
              onClick={() => onNavigate('shop')}
              className="text-[#111111] hover:text-[#B94700] uppercase tracking-wider font-semibold"
            >
              Return to Catalog →
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Account Hub Cards Definition
  const accountCards: {
    route: ViewRoute;
    title: string;
    subtitle: string;
    description: string;
    icon: string;
    badge?: string;
    badgeColor?: string;
    cta: string;
  }[] = [
    {
      route: 'account-orders',
      title: 'My Orders',
      subtitle: 'Commissions & Shipments',
      description: 'View past purchases, track active shipments with live chauffeur waybills, or repeat previous orders.',
      icon: 'package_2',
      badge: '1 Active Dispatch',
      badgeColor: 'bg-[#B94700] text-white',
      cta: 'View Orders & Shipments →',
    },
    {
      route: 'account-invoices',
      title: 'Invoices & GST',
      subtitle: 'Official Tax Records',
      description: 'Check detailed item breakdowns (HSN codes, 18% GST), download digital receipts, or print official invoices.',
      icon: 'receipt_long',
      badge: '3 Tax Invoices',
      badgeColor: 'bg-[#111111] text-white',
      cta: 'Access Tax Invoices →',
    },
    {
      route: 'account-profile',
      title: 'Profile & Particulars',
      subtitle: 'Personal Identity Ledger',
      description: 'Edit name, email address, phone number, gender, date of birth, and encrypted concierge dispatches.',
      icon: 'person',
      badge: 'Verified Patron',
      badgeColor: 'bg-emerald-700 text-white',
      cta: 'Edit Patron Profile →',
    },
    {
      route: 'account-addresses',
      title: 'Address Book',
      subtitle: 'Pan-India Destinations',
      description: 'Add, edit, or delete shipping and billing addresses across Indian states with 6-digit PIN code precision.',
      icon: 'location_on',
      badge: `${addresses.length} Destinations`,
      badgeColor: 'bg-[#f0ede9] text-[#111111]',
      cta: 'Manage Address Book →',
    },
    {
      route: 'wishlist',
      title: 'Saved Wishlist',
      subtitle: 'Private Curation Vault',
      description: 'View or manage silhouettes saved for later acquisition, allocate pieces directly to bag, or share curation.',
      icon: 'favorite',
      badge: `${wishlist.length} Silhouettes`,
      badgeColor: 'bg-[#B94700] text-white',
      cta: 'Open Saved Wishlist →',
    },
    {
      route: 'account-returns',
      title: 'Returns & Exchanges',
      subtitle: 'White-Glove Reverse Care',
      description: 'Initiate or track product returns, size alterations, or bespoke tailoring adjustments under our 14-day policy.',
      icon: 'assignment_return',
      badge: `${returns.length} In Progress`,
      badgeColor: 'bg-[#B94700] text-white',
      cta: 'Manage Returns →',
    },
    {
      route: 'account-loyalty',
      title: 'Loyalty / Rewards Program',
      subtitle: 'CYOF Atelier Privé',
      description: 'Check points (1,42,500 Pts), redeemable store credit (₹1,42,500), tier status (Haute Patron), and privileges.',
      icon: 'stars',
      badge: '1,42,500 Pts',
      badgeColor: 'bg-[#B94700] text-white',
      cta: 'Explore Privé Rewards →',
    },
    {
      route: 'account-support',
      title: 'Help / Contact Support',
      subtitle: 'Concierge Desk & FAQs',
      description: 'Access customer service via toll-free phone (+91 1800 209 2963), WhatsApp care, or explore knowledge base FAQs.',
      icon: 'support_agent',
      badge: '10:00 - 20:00 IST',
      badgeColor: 'bg-[#f0ede9] text-[#111111]',
      cta: 'Connect With Concierge →',
    },
  ];

  const defaultAddr = addresses.find((a) => a.isDefaultShipping) || addresses[0];
  const activeOrder = orders.find((o) => o.status === 'In Transit');

  return (
    <div className="w-full flex flex-col bg-[#fcf9f4] min-h-screen text-[#1c1c19] py-8 sm:py-12 px-4 md:px-8 lg:px-12 max-w-[1500px] mx-auto">
      {toastMessage && (
        <div className="fixed top-24 right-4 z-50 bg-[#111111] text-white text-xs font-['Manrope'] px-5 py-3.5 shadow-2xl border-l-4 border-[#B94700] animate-in slide-in-from-top-2 flex items-center gap-3">
          <span className="material-symbols-outlined text-[18px] text-[#B94700]">verified</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Dossier Header */}
      <header className="pb-8 border-b border-[#E9DFD2] mb-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#B94700] animate-pulse" />
              <span className="font-['Manrope'] text-[10px] sm:text-xs text-[#B94700] uppercase tracking-[0.25em] font-bold">
                CYOF Private Client Services • #CraftedYourOwnFashion
              </span>
            </div>
            <h1 className="font-['EB_Garamond'] text-3xl sm:text-5xl text-[#111111] font-normal tracking-tight">
              Client Dossier & Provenance Vault
            </h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 font-['Manrope'] text-xs text-[#57534E]">
              <span>Patron: <strong className="text-[#111111]">{profile.fullName}</strong></span>
              <span>•</span>
              <span>Patron ID: <strong className="text-[#111111]">{profile.patronId}</strong></span>
              <span>•</span>
              <span className="bg-[#111111] text-white text-[9px] uppercase tracking-widest px-2.5 py-0.5 font-bold">
                {profile.tier}
              </span>
              <span>•</span>
              <span className="text-[#111111]">Mumbai Flagship Salon</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenSalonModal}
              className="px-5 py-3 bg-[#111111] hover:bg-[#B94700] text-white font-['Manrope'] text-xs uppercase tracking-widest font-semibold transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <span className="material-symbols-outlined text-[18px]">calendar_month</span>
              <span>Book Salon Rendezvous</span>
            </button>
            <button
              onClick={() => onNavigate('shop')}
              className="px-4 py-3 border border-[#E9DFD2] bg-white hover:bg-[#f0ede9] text-[#111111] font-['Manrope'] text-xs uppercase tracking-widest font-semibold transition-colors cursor-pointer"
            >
              Explore Collection
            </button>
            <button
              onClick={() => setShowSignOutConfirm(true)}
              className="px-4 py-3 border border-[#E9DFD2] bg-white hover:bg-[#ffece4] text-[#B94700] font-['Manrope'] text-xs uppercase tracking-wider font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Sign Out"
            >
              <span className="material-symbols-outlined text-[16px]">logout</span>
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Sign Out Confirmation Modal */}
      {showSignOutConfirm && (
        <div
          className="fixed inset-0 z-50 bg-[#111111]/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setShowSignOutConfirm(false)}
        >
          <div
            className="w-full max-w-sm bg-white border border-[#E9DFD2] p-6 text-center font-['Manrope'] shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 bg-[#ffece4] text-[#B94700] flex items-center justify-center rounded-full mx-auto">
              <span className="material-symbols-outlined text-[24px]">logout</span>
            </div>
            <h3 className="font-['EB_Garamond'] text-2xl text-[#111111]">
              Sign Out of Client Dossier?
            </h3>
            <p className="text-xs text-[#57534E] leading-relaxed">
              You will be signed out of Aarav Singhania's private records. You can sign back in anytime via your registered Indian mobile or email.
            </p>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowSignOutConfirm(false)}
                className="flex-1 py-2.5 border border-[#E9DFD2] text-xs uppercase tracking-wider font-semibold hover:bg-[#fcf9f4]"
              >
                Cancel
              </button>
              <button
                onClick={handleSignOut}
                className="flex-1 py-2.5 bg-[#B94700] hover:bg-[#111111] text-white text-xs uppercase tracking-wider font-bold transition-colors"
              >
                Confirm Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Executive Quick-Glance Dashboard Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 font-['Manrope']">
        {/* Active Dispatch Snapshot */}
        <div
          onClick={() => onNavigate('account-orders')}
          className="p-6 bg-white border border-[#E9DFD2] shadow-xs cursor-pointer hover:border-[#111111] transition-all group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase tracking-widest text-[#B94700] font-bold">
              Active White-Glove Dispatch
            </span>
            <span className="material-symbols-outlined text-[18px] text-[#57534E] group-hover:text-[#B94700] group-hover:translate-x-0.5 transition-all">
              arrow_forward
            </span>
          </div>
          <h4 className="font-['EB_Garamond'] text-2xl text-[#111111] font-semibold">
            {activeOrder ? activeOrder.items[0]?.name : 'No Active Shipments'}
          </h4>
          <p className="text-xs text-[#57534E] mt-1">
            Expected: <strong className="text-[#111111]">{activeOrder?.estimatedHandover || 'All Delivered'}</strong> • Chauffeur Tracking: <span className="text-[#B94700] font-semibold">{activeOrder?.trackingNumber}</span>
          </p>
        </div>

        {/* Atelier Privé Store Credit */}
        <div
          onClick={() => onNavigate('account-loyalty')}
          className="p-6 bg-white border border-[#E9DFD2] shadow-xs cursor-pointer hover:border-[#111111] transition-all group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase tracking-widest text-[#B94700] font-bold">
              Atelier Privé Store Credit
            </span>
            <span className="material-symbols-outlined text-[18px] text-[#57534E] group-hover:text-[#B94700] group-hover:translate-x-0.5 transition-all">
              arrow_forward
            </span>
          </div>
          <h4 className="font-['EB_Garamond'] text-2xl text-[#111111] font-semibold">
            ₹1,42,500 <span className="text-xs font-['Manrope'] font-normal text-[#57534E]">(1,42,500 Points)</span>
          </h4>
          <p className="text-xs text-[#57534E] mt-1">
            Tier: <strong className="text-[#111111]">Haute Patron (Tier III)</strong> • Next: Sovereign in ₹57,500
          </p>
        </div>

        {/* Primary Destination & Method */}
        <div
          onClick={() => onNavigate('account-addresses')}
          className="p-6 bg-white border border-[#E9DFD2] shadow-xs cursor-pointer hover:border-[#111111] transition-all group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase tracking-widest text-[#B94700] font-bold">
              Primary Handover Destination
            </span>
            <span className="material-symbols-outlined text-[18px] text-[#57534E] group-hover:text-[#B94700] group-hover:translate-x-0.5 transition-all">
              arrow_forward
            </span>
          </div>
          <h4 className="font-['EB_Garamond'] text-2xl text-[#111111] font-semibold truncate">
            {defaultAddr?.label || 'Flagship Residence'}
          </h4>
          <p className="text-xs text-[#57534E] mt-1 truncate">
            {defaultAddr?.city}, {defaultAddr?.state} {defaultAddr?.pinCode} • Default Chauffeur Delivery
          </p>
        </div>
      </div>

      {/* 3. The 8 Dedicated Single Individual Pages Directory Grid */}
      <div className="space-y-6 font-['Manrope']">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#E9DFD2] gap-2">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#B94700] font-bold block">
              Dossier Architecture
            </span>
            <h2 className="font-['EB_Garamond'] text-2xl sm:text-3xl text-[#111111]">
              Dedicated Account Portals & Management
            </h2>
          </div>
          <span className="text-xs text-[#57534E]">
            Tap any section to enter its dedicated full-page view
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accountCards.map((card) => (
            <div
              key={card.route}
              onClick={() => onNavigate(card.route)}
              className="bg-white border border-[#E9DFD2] p-6 shadow-xs hover:border-[#111111] hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-[#fcf9f4] border border-[#E9DFD2] flex items-center justify-center group-hover:bg-[#111111] group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-[24px]">
                      {card.icon}
                    </span>
                  </div>
                  {card.badge && (
                    <span className={`text-[9px] uppercase tracking-widest px-2.5 py-0.5 font-bold ${card.badgeColor}`}>
                      {card.badge}
                    </span>
                  )}
                </div>

                <span className="text-[10px] uppercase tracking-widest text-[#57534E] font-semibold block">
                  {card.subtitle}
                </span>
                <h3 className="font-['EB_Garamond'] text-2xl text-[#111111] font-semibold mt-0.5 group-hover:text-[#B94700] transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs text-[#57534E] mt-2 leading-relaxed">
                  {card.description}
                </p>
              </div>

              <div className="pt-5 mt-5 border-t border-[#f0ede9] flex items-center justify-between text-xs font-semibold text-[#111111] group-hover:text-[#B94700] transition-colors">
                <span>{card.cta}</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
