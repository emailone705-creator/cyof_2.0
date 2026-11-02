import React, { useState } from 'react';
import { ViewRoute, Product } from '../../types';
import { AccountNavHeader } from '../../components/AccountNavHeader';

interface WishlistViewProps {
  onNavigate: (route: ViewRoute) => void;
  onOpenSalonModal: () => void;
  wishlist: Product[];
  onRemoveFromWishlist: (id: string) => void;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const WishlistView: React.FC<WishlistViewProps> = ({
  onNavigate,
  onOpenSalonModal,
  wishlist,
  onRemoveFromWishlist,
  onAddToCart,
  onSelectProduct,
}) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCopyWishlistLink = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast('Encrypted Curated Wishlist Link copied to clipboard');
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
        currentRoute="wishlist"
        onNavigate={onNavigate}
        title="Saved Wishlist & Private Curation"
        subtitle="Archival Vault Bookmarks • #CraftedYourOwnFashion"
        onOpenSalonModal={onOpenSalonModal}
      />

      <div className="space-y-6 font-['Manrope']">
        {/* Top Header Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E9DFD2] gap-4">
          <div>
            <h3 className="font-['EB_Garamond'] text-2xl text-[#111111]">
              Private Bookmarks ({wishlist.length} Silhouettes)
            </h3>
            <p className="text-xs text-[#57534E]">
              Archived pieces saved for future commission or private salon fitting reservation.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyWishlistLink}
              className="px-4 py-2.5 border border-[#E9DFD2] hover:bg-white text-[#111111] text-xs uppercase tracking-wider font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">share</span>
              <span>Share Curation</span>
            </button>
            <button
              onClick={() => onNavigate('shop')}
              className="px-5 py-2.5 bg-[#111111] hover:bg-[#B94700] text-white text-xs uppercase tracking-widest font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <span>Explore Catalog</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Empty State */}
        {wishlist.length === 0 ? (
          <div className="py-20 text-center space-y-4 bg-white border border-[#E9DFD2] p-8 shadow-xs">
            <span className="material-symbols-outlined text-5xl text-[#E9DFD2]">favorite</span>
            <h3 className="font-['EB_Garamond'] text-3xl text-[#111111] italic font-normal">
              Your private curation is currently empty
            </h3>
            <p className="text-xs text-[#57534E] max-w-md mx-auto leading-relaxed">
              Inscribe bespoke hand-painted garments, double-face wool outerwear, and sculptural leather accessories by clicking the bookmark heart icon across our collections.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onNavigate('shop')}
                className="px-8 py-3.5 bg-[#111111] hover:bg-[#B94700] text-white text-xs uppercase tracking-widest font-semibold transition-colors cursor-pointer"
              >
                Discover The Permanent Collection
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlist.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 border border-[#E9DFD2] shadow-xs flex flex-col justify-between group transition-all"
              >
                <div>
                  <div
                    onClick={() => onSelectProduct(item)}
                    className="aspect-[4/5] bg-[#f0ede9] overflow-hidden mb-3 cursor-pointer relative"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2 bg-[#111111] text-white text-[9px] uppercase tracking-widest px-2 py-0.5 font-bold">
                      {item.category}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[9px] uppercase tracking-wider text-[#57534E] font-semibold">
                      {item.subtitle || item.category}
                    </span>
                    <h4
                      onClick={() => onSelectProduct(item)}
                      className="font-['EB_Garamond'] text-lg text-[#111111] hover:text-[#B94700] transition-colors cursor-pointer line-clamp-1"
                    >
                      {item.name}
                    </h4>
                    <p className="text-xs font-bold text-[#111111]">
                      ₹{item.price.toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-[#f0ede9] flex gap-2">
                  <button
                    onClick={() => {
                      onAddToCart(item);
                      showToast(`${item.name} allocated to your Shopping Bag`);
                    }}
                    className="flex-1 py-2.5 bg-[#111111] hover:bg-[#B94700] text-white text-[10px] uppercase tracking-widest font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[15px]">shopping_bag</span>
                    <span>Allocate to Bag</span>
                  </button>
                  <button
                    onClick={() => {
                      onRemoveFromWishlist(item.id);
                      showToast('Piece removed from private wishlist');
                    }}
                    className="px-3 py-2.5 bg-[#fcf9f4] hover:bg-[#ffece4] text-[#57534E] hover:text-[#B94700] border border-[#E9DFD2] transition-colors cursor-pointer"
                    title="Remove from wishlist"
                  >
                    <span className="material-symbols-outlined text-[16px]">close</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
