import React from 'react';
import { Product } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Product[];
  onRemoveFromWishlist: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlist,
  onRemoveFromWishlist,
  onAddToCart,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#111111]/50 backdrop-blur-sm flex justify-end animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-[#F8F5F0] h-full shadow-2xl flex flex-col justify-between overflow-y-auto p-6 sm:p-8 animate-in slide-in-from-right duration-300 border-l border-[#E9DFD2]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#E9DFD2]">
            <div>
              <span className="font-['Manrope'] text-[10px] uppercase tracking-widest text-[#57534E] block">
                Private Curation
              </span>
              <h3 className="font-['EB_Garamond'] text-2xl text-[#111111]">
                Your Archival Wishlist ({wishlist.length})
              </h3>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center text-[#111111] hover:text-[#B94700]"
            >
              <span className="material-symbols-outlined text-[24px]">close</span>
            </button>
          </div>

          {wishlist.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <span className="material-symbols-outlined text-4xl text-[#E9DFD2]">favorite</span>
              <p className="font-['EB_Garamond'] text-xl text-[#111111] italic">
                Your private vault is currently empty.
              </p>
              <p className="font-['Manrope'] text-xs text-[#57534E] max-w-xs mx-auto">
                Discover our hand-crafted silhouettes and tap the heart icon on any piece to preserve it.
              </p>
            </div>
          ) : (
            <div className="space-y-4 max-h-[70vh] overflow-y-auto">
              {wishlist.map((product) => (
                <div
                  key={product.id}
                  className="bg-[#FFFFFF] p-3.5 shadow-sm border border-[#E9DFD2]/60 flex gap-4 relative group"
                >
                  <div
                    onClick={() => {
                      onSelectProduct(product);
                      onClose();
                    }}
                    className="w-20 aspect-[4/5] bg-[#f0ede9] overflow-hidden flex-shrink-0 cursor-pointer"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <span className="font-['Manrope'] text-[9px] uppercase tracking-widest text-[#57534E]">
                          {product.category}
                        </span>
                        <button
                          onClick={() => onRemoveFromWishlist(product.id)}
                          className="text-[#57534E] hover:text-[#ba1a1a] transition-colors"
                          title="Remove from wishlist"
                        >
                          <span className="material-symbols-outlined text-[16px]">close</span>
                        </button>
                      </div>
                      <h4
                        onClick={() => {
                          onSelectProduct(product);
                          onClose();
                        }}
                        className="font-['EB_Garamond'] text-base text-[#111111] hover:text-[#B94700] transition-colors line-clamp-1 cursor-pointer"
                      >
                        {product.name}
                      </h4>
                      <p className="font-['Manrope'] text-xs font-semibold text-[#111111] mt-0.5">
                        ₹{product.price.toLocaleString('en-IN')}
                      </p>
                    </div>

                    <button
                      onClick={() => onAddToCart(product)}
                      className="mt-2 w-full py-2 bg-[#111111] hover:bg-[#B94700] text-white font-['Manrope'] text-[10px] uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-[14px]">shopping_bag</span>
                      Allocate to Bag
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="pt-6 border-t border-[#E9DFD2]">
          <button
            onClick={onClose}
            className="w-full py-3 bg-[#f0ede9] hover:bg-[#E9DFD2] text-[#111111] font-['Manrope'] text-xs uppercase tracking-widest transition-colors font-semibold"
          >
            Continue Exploring
          </button>
        </div>
      </div>
    </div>
  );
};
