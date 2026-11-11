import React, { useEffect } from 'react';
import { CartItem, ViewRoute } from '../types';

interface CartSheetDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onRemoveItem: (productId: string) => void;
  onNavigate: (route: ViewRoute) => void;
}

export const CartSheetDrawer: React.FC<CartSheetDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onRemoveItem,
  onNavigate,
}) => {
  // Lock body scroll when cart sheet is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const totalSubtotal = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div
      className="fixed inset-0 z-50 bg-[#111111]/50 backdrop-blur-xs flex flex-col justify-end animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl mx-auto bg-white shadow-2xl border-t border-[#E9DFD2] p-5 sm:p-7 flex flex-col animate-in slide-in-from-bottom duration-300 max-h-[90vh] relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Drag Pill Handle */}
        <div className="w-14 h-1 bg-[#D6C7B2] rounded-full mx-auto mb-3 shrink-0" />

        {/* Header Row: Close Button top right, Centered SHOPPING BAG title */}
        <div className="relative pb-3 border-b border-[#111111] mb-4">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#F3F3F0] hover:bg-[#E5E5E5] flex items-center justify-center text-[#111111] transition-colors cursor-pointer"
            aria-label="Close Shopping Bag Drawer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>

          <h3 className="font-['Manrope'] text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-[#111111] text-center pr-8 pl-8">
            SHOPPING BAG ({totalCount})
          </h3>
        </div>

        {/* Cart Items List */}
        {cart.length === 0 ? (
          <div className="py-12 text-center font-['Manrope'] space-y-4">
            <p className="font-['EB_Garamond'] text-xl text-[#111111] italic">
              Your shopping bag is currently empty.
            </p>
            <button
              type="button"
              onClick={() => {
                onClose();
                onNavigate('shop');
              }}
              className="px-6 py-2.5 bg-[#111111] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#B94700] transition-colors cursor-pointer"
            >
              EXPLORE CREATIONS
            </button>
          </div>
        ) : (
          <div className="overflow-y-auto max-h-[48vh] sm:max-h-[52vh] divide-y divide-[#E9DFD2]/70 mb-4 pr-1">
            {cart.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedShade}-${item.selectedSize}`}
                className="flex gap-4 py-4 items-start font-['Manrope'] group"
              >
                {/* Product Thumbnail */}
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-20 h-24 sm:w-24 sm:h-28 object-cover bg-[#F4F2EE] shrink-0 border border-[#E9DFD2]/60"
                />

                {/* Middle Info */}
                <div className="flex-1 min-w-0 space-y-1.5 pt-0.5">
                  <h4 className="font-['EB_Garamond'] text-lg sm:text-xl text-[#111111] font-normal leading-snug truncate">
                    {item.product.name}
                  </h4>

                  <p className="font-['EB_Garamond'] italic text-xs text-[#57534E]">
                    Only 1 available
                  </p>

                  <div className="text-xs text-[#57534E] space-y-0.5 pt-1">
                    <p>Color: {item.selectedShade}</p>
                    <p>Size: {item.selectedSize}</p>
                  </div>
                </div>

                {/* Right Trash Bin & Price */}
                <div className="flex flex-col justify-between items-end h-full self-stretch pl-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => onRemoveItem(item.product.id)}
                    className="text-[#111111] hover:text-[#B94700] p-1 transition-colors cursor-pointer"
                    aria-label={`Remove ${item.product.name} from bag`}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      delete
                    </span>
                  </button>

                  <p className="font-['EB_Garamond'] text-base sm:text-lg text-[#111111] font-medium pt-3">
                    ₹ {item.product.price.toLocaleString('en-IN')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Subtotal & Terms Section */}
        {cart.length > 0 && (
          <div className="border-t border-[#E9DFD2] pt-4 space-y-3 font-['Manrope']">
            <div className="flex items-center justify-between">
              <span className="font-['EB_Garamond'] text-lg sm:text-xl text-[#111111] font-normal">
                Subtotal:
              </span>
              <span className="font-['EB_Garamond'] text-lg sm:text-xl text-[#111111] font-semibold">
                ₹ {totalSubtotal.toLocaleString('en-IN')}
              </span>
            </div>

            <p className="font-['EB_Garamond'] italic text-xs text-[#57534E] text-left leading-relaxed">
              By proceeding, you confirm you have read and accepted the{' '}
              <button
                type="button"
                onClick={() =>
                  alert('Terms and Conditions: CYOF luxury sales terms apply.')
                }
                className="underline text-[#111111] hover:text-[#B94700] font-medium cursor-pointer"
              >
                Terms and Conditions
              </button>
            </p>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onNavigate('checkout');
                }}
                style={{ backgroundColor: '#D34500' }}
                className="w-full py-3.5 bg-[#D34500] hover:bg-[#b93c00] text-white font-['Manrope'] text-xs font-bold uppercase tracking-[0.25em] transition-colors cursor-pointer shadow-sm active:scale-[0.99]"
              >
                CHECKOUT
              </button>

              <div className="text-center pb-1">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onNavigate('cart');
                  }}
                  className="font-['Manrope'] text-[11px] font-bold uppercase tracking-[0.2em] text-[#111111] border-b border-[#111111] pb-0.5 hover:text-[#B94700] hover:border-[#B94700] transition-colors cursor-pointer"
                >
                  VIEW SHOPPING BAG
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
