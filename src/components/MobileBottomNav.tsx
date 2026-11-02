import React from 'react';
import { ViewRoute } from '../types';

interface MobileBottomNavProps {
  currentRoute: ViewRoute;
  onNavigate: (route: ViewRoute) => void;
  wishlistCount: number;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentRoute,
  onNavigate,
  wishlistCount,
}) => {
  const tabs = [
    { label: 'Home', route: 'home' as ViewRoute, icon: 'home' },
    { label: 'Shop', route: 'shop' as ViewRoute, icon: 'shopping_bag' },
    { label: 'Wishlist', route: 'wishlist' as ViewRoute, icon: 'favorite', count: wishlistCount },
    { label: 'Account', route: 'account' as ViewRoute, icon: 'person' },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 pb-safe bg-[#F8F5F0]/95 backdrop-blur-xl shadow-[0_-1px_8px_rgba(0,0,0,0.04)] border-t border-[#E9DFD2] lg:hidden">
      <div className="flex justify-around items-center h-16 px-2">
        {tabs.map((tab) => {
          const isActive = currentRoute === tab.route || (tab.route === 'journal' && currentRoute === 'article');
          return (
            <button
              key={tab.label}
              onClick={() => onNavigate(tab.route)}
              className={`flex flex-col items-center justify-center gap-0.5 min-w-[56px] min-h-[44px] transition-colors cursor-pointer relative ${
                isActive ? 'text-[#9e3d00] font-semibold' : 'text-[#57534E] hover:text-[#111111]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">
                {tab.icon}
              </span>
              <span className="font-['Manrope'] text-[9px] tracking-[0.15em] uppercase">
                {tab.label}
              </span>
              {Boolean(tab.count && tab.count > 0) && (
                <span className="absolute top-1 right-3 w-3.5 h-3.5 rounded-full bg-[#B94700] text-white text-[8px] flex items-center justify-center font-bold">
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
