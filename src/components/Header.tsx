import React, { useState } from 'react';
import { ViewRoute } from '../types';

interface HeaderProps {
  currentRoute: ViewRoute;
  onNavigate: (route: ViewRoute, param?: string) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenSearch: () => void;
  onOpenWishlist: () => void;
  onOpenCart?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRoute,
  onNavigate,
  cartCount,
  wishlistCount,
  onOpenSearch,
  onOpenWishlist,
  onOpenCart,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'WOMEN', route: 'shop' as ViewRoute, category: 'Women' },
    { label: 'MEN', route: 'shop' as ViewRoute, category: 'Men' },
    { label: 'NEW ARRIVALS', route: 'shop' as ViewRoute, category: 'New Arrivals' },
    { label: 'LEATHER GOODS', route: 'shop' as ViewRoute, category: 'Leather Goods' },
    { label: 'SHOES', route: 'shop' as ViewRoute, category: 'Shoes' },
    { label: 'JEWELLERY', route: 'shop' as ViewRoute, category: 'Jewellery' },
    { label: 'ARCHIVES', route: 'shop' as ViewRoute, category: 'Archives' },
    { label: 'LE JOURNAL', route: 'journal' as ViewRoute },
    { label: 'CLIENT SERVICE', route: 'account' as ViewRoute },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#F8F5F0]/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.03)] border-b border-[#E9DFD2]/60 pt-safe">
        {/* Top Concierge & Shipping Announcement Ribbon */}
        <div className="w-full bg-[#111111] text-[#FFFFFF] py-1.5 px-4 text-center overflow-hidden">
          <p className="font-['Manrope'] text-[10px] tracking-[0.2em] uppercase font-medium">
            COMPLIMENTARY ALL-INDIA EXPRESS SHIPPING • PAN-INDIA DISPATCH • #CraftedYourOwnFashion
          </p>
        </div>

        <div className="h-14 lg:h-24 w-full max-w-[1600px] mx-auto px-4 md:px-8 lg:px-16 flex flex-col justify-between py-1 lg:py-2">
          {/* Upper Utility Row */}
          <div className="flex items-center justify-between w-full h-full lg:h-auto">
            {/* Left Concierge Phone & Currency */}
            <div className="hidden lg:flex items-center space-x-4">
              <span className="font-['Manrope'] text-[10px] text-[#57534E] uppercase tracking-widest font-medium">
                India Concierge: +91 1800 209 2963
              </span>
              <span className="text-[#E9DFD2]">•</span>
              <span className="font-['Manrope'] text-[10px] text-[#B94700] uppercase tracking-widest font-bold">
                India (INR ₹)
              </span>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                aria-label="Open navigation menu"
                onClick={() => setMobileMenuOpen(true)}
                className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center text-[#111111] hover:text-[#B94700] transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[24px]">menu</span>
              </button>
            </div>

            {/* Center Brand Wordmark */}
            <div className="text-center">
              <button
                onClick={() => onNavigate('home')}
                className="font-['EB_Garamond'] text-2xl lg:text-3xl tracking-[0.25em] text-[#111111] uppercase hover:text-[#B94700] transition-colors cursor-pointer select-none"
              >
                CYOF
              </button>
            </div>

            {/* Right Action Icons: Search, Wishlist, Bag, Account (>= 44x44px touch targets) */}
            <div className="flex items-center justify-end space-x-1 sm:space-x-2 md:space-x-4">
              <button
                type="button"
                aria-label="Search Catalog"
                onClick={onOpenSearch}
                className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center text-[#111111] hover:text-[#B94700] transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">search</span>
              </button>

              <button
                type="button"
                aria-label="Wishlist"
                onClick={onOpenWishlist}
                className="relative w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center text-[#111111] hover:text-[#B94700] transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">favorite</span>
                {wishlistCount > 0 && (
                  <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#B94700] text-white text-[9px] flex items-center justify-center font-bold">
                    {wishlistCount}
                  </span>
                )}
              </button>

              <button
                type="button"
                aria-label="Shopping Bag"
                onClick={() => {
                  if (onOpenCart) {
                    onOpenCart();
                  } else {
                    onNavigate('cart');
                  }
                }}
                className="relative h-11 min-h-[44px] px-2 flex items-center justify-center text-[#111111] hover:text-[#B94700] transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                <span className="font-['Manrope'] text-[10px] text-[#111111] font-semibold ml-0.5">
                  ({cartCount})
                </span>
              </button>

              <button
                type="button"
                aria-label="Account"
                onClick={() => onNavigate('account')}
                className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
              >
                <div className="w-7 h-7 rounded-full bg-[#9e3d00] flex items-center justify-center text-white hover:opacity-90 transition-opacity">
                  <span className="material-symbols-outlined text-[16px]">person</span>
                </div>
              </button>
            </div>
          </div>

          {/* Lower Desktop Navigation Links */}
          <div className="hidden xl:flex items-center justify-center gap-7 pb-1">
            <nav className="flex items-center gap-7">
              {navItems.map((item) => {
                const isActive = 
                  (item.route === 'journal' && (currentRoute === 'journal' || currentRoute === 'article')) ||
                  (item.route === 'shop' && currentRoute === 'shop');
                
                return (
                  <button
                    key={item.label}
                    onClick={() => onNavigate(item.route, item.category)}
                    className={`font-['Manrope'] text-[10px] tracking-[0.2em] uppercase transition-colors py-1 cursor-pointer ${
                      isActive
                        ? 'text-[#111111] font-bold border-b border-[#111111]'
                        : 'text-[#594238] hover:text-[#111111]'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-[#111111]/45 backdrop-blur-sm transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div
          className={`fixed inset-y-0 left-0 max-w-sm w-full bg-[#F8F5F0] shadow-2xl flex flex-col justify-between overflow-y-auto transform transition-transform duration-300 ease-out ${
            mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="flex items-center justify-between pb-6 border-b border-[#E9DFD2]">
              <span className="font-['EB_Garamond'] text-xl tracking-[0.15em] uppercase text-[#111111] font-normal">
                CYOF NAVIGATION
              </span>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="w-10 h-10 flex items-center justify-center text-[#111111] hover:text-[#B94700]"
              >
                <span className="material-symbols-outlined text-[24px]">close</span>
              </button>
            </div>

            <div className="space-y-4 py-6">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigate(item.route, item.category);
                  }}
                  className="w-full text-left font-['EB_Garamond'] text-2xl text-[#111111] hover:text-[#B94700] transition-colors py-1 flex items-center justify-between group"
                >
                  <span>{item.label}</span>
                  <span className="material-symbols-outlined text-[18px] text-[#57534E] group-hover:text-[#B94700] transition-colors">
                    arrow_forward
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-[#E9DFD2] space-y-4 text-xs font-['Manrope'] text-[#57534E]">
              <div className="flex items-center justify-between text-[#594238]">
                <span className="uppercase tracking-wider">Region & Currency</span>
                <span className="font-bold text-[#111111]">India (INR ₹)</span>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('account');
                }}
                className="flex items-center justify-between w-full text-left py-2 hover:text-[#B94700]"
              >
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">store</span>
                  Find a Flagship Salon
                </span>
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('account');
                }}
                className="flex items-center justify-between w-full text-left py-2 hover:text-[#B94700]"
              >
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">support_agent</span>
                  Bespoke Concierge
                </span>
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </button>
            </div>
          </div>

          <div className="p-6 bg-[#f6f3ee] border-t border-[#E9DFD2]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#9e3d00] text-white flex items-center justify-center font-bold">
                <span className="material-symbols-outlined text-[20px]">person</span>
              </div>
              <div className="flex flex-col">
                <span className="font-['Manrope'] text-xs font-medium text-[#111111]">Private Client</span>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigate('account');
                  }}
                  className="font-['Manrope'] text-[10px] text-[#B94700] uppercase tracking-wider font-semibold text-left"
                >
                  Sign In / Vault Access
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
