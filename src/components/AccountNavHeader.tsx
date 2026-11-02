import React from 'react';
import { ViewRoute } from '../types';
import { usePatron } from '../context/PatronContext';

interface AccountNavHeaderProps {
  currentRoute: ViewRoute;
  onNavigate: (route: ViewRoute) => void;
  title: string;
  subtitle: string;
  onOpenSalonModal: () => void;
}

export const AccountNavHeader: React.FC<AccountNavHeaderProps> = ({
  currentRoute,
  onNavigate,
  title,
  subtitle,
  onOpenSalonModal,
}) => {
  const { profile, signOut } = usePatron();

  const navLinks: { route: ViewRoute; label: string; icon: string }[] = [
    { route: 'account', label: 'Dossier Hub', icon: 'dashboard' },
    { route: 'account-orders', label: 'My Orders', icon: 'package_2' },
    { route: 'account-invoices', label: 'Invoices', icon: 'receipt_long' },
    { route: 'account-profile', label: 'Profile', icon: 'person' },
    { route: 'account-addresses', label: 'Address Book', icon: 'location_on' },
    { route: 'wishlist', label: 'Wishlist', icon: 'favorite' },
    { route: 'account-returns', label: 'Returns & Exchanges', icon: 'assignment_return' },
    { route: 'account-loyalty', label: 'Loyalty Rewards', icon: 'stars' },
    { route: 'account-support', label: 'Help & Support', icon: 'support_agent' },
  ];

  return (
    <div className="w-full pb-8 mb-8 border-b border-[#E9DFD2]">
      {/* Top Breadcrumb & Return Link */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4 font-['Manrope'] text-xs">
        <div className="flex items-center gap-2 text-[#57534E]">
          <button
            onClick={() => onNavigate('home')}
            className="hover:text-[#111111] transition-colors"
          >
            CYOF
          </button>
          <span>/</span>
          <button
            onClick={() => onNavigate('account')}
            className="hover:text-[#111111] transition-colors"
          >
            Client Dossier
          </button>
          <span>/</span>
          <span className="text-[#111111] font-semibold">{title}</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('account')}
            className="text-xs uppercase tracking-wider text-[#B94700] hover:text-[#111111] font-bold flex items-center gap-1 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>Return to Client Dossier Hub</span>
          </button>
        </div>
      </div>

      {/* Main Title Banner */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-[#B94700] animate-pulse" />
            <span className="font-['Manrope'] text-[10px] uppercase tracking-[0.25em] text-[#B94700] font-bold">
              {subtitle}
            </span>
          </div>
          <h1 className="font-['EB_Garamond'] text-3xl sm:text-5xl text-[#111111] font-normal tracking-tight">
            {title}
          </h1>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 font-['Manrope'] text-xs text-[#57534E]">
            <span>Patron: <strong className="text-[#111111]">{profile.fullName}</strong></span>
            <span>•</span>
            <span>ID: <strong className="text-[#111111]">{profile.patronId}</strong></span>
            <span>•</span>
            <span className="bg-[#111111] text-white text-[9px] uppercase tracking-widest px-2 py-0.5 font-bold">
              {profile.tier}
            </span>
            <span>•</span>
            <span className="text-[#111111]">Mumbai, India</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onOpenSalonModal}
            className="px-5 py-3 bg-[#111111] hover:bg-[#B94700] text-white font-['Manrope'] text-xs uppercase tracking-widest font-semibold transition-colors flex items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">calendar_month</span>
            <span>Book Salon Rendezvous</span>
          </button>
          <button
            onClick={() => {
              signOut();
              onNavigate('account');
            }}
            className="px-4 py-3 border border-[#E9DFD2] bg-white hover:bg-[#ffece4] text-[#B94700] font-['Manrope'] text-xs uppercase tracking-wider font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Sign out of Dossier"
          >
            <span className="material-symbols-outlined text-[16px]">logout</span>
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Quick Switch Navigation Strip */}
      <div className="overflow-x-auto pb-1 scrollbar-none">
        <div className="flex items-center gap-1 border-t border-[#E9DFD2] pt-3 min-w-max font-['Manrope'] text-xs">
          {navLinks.map((link) => {
            const isActive = currentRoute === link.route;
            return (
              <button
                key={link.route}
                onClick={() => onNavigate(link.route)}
                className={`flex items-center gap-1.5 px-3 py-2 transition-colors cursor-pointer text-[11px] uppercase tracking-wider ${
                  isActive
                    ? 'bg-[#111111] text-white font-bold'
                    : 'text-[#57534E] hover:text-[#111111] hover:bg-white'
                }`}
              >
                <span className="material-symbols-outlined text-[15px]">{link.icon}</span>
                <span>{link.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
