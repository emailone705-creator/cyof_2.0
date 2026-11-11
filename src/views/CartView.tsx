import React, { useState, useEffect } from 'react';
import { CartItem, Product, ViewRoute } from '../types';
import { PRODUCTS } from '../data/mockData';

interface CartViewProps {
  cart: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onNavigate: (route: ViewRoute) => void;
}

export const CartView: React.FC<CartViewProps> = ({
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onToggleWishlist,
  onAddToCart,
  onNavigate,
}) => {
  const [giftNoteOpen, setGiftNoteOpen] = useState(false);
  const [giftMessage, setGiftMessage] = useState('');

  // Reservation countdown timer simulation (28:40)
  const [secondsLeft, setSecondsLeft] = useState(28 * 60 + 40);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (totalSec: number) => {
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const whiteGloveThreshold = 500000;
  const progressPercent = Math.min(100, Math.round((subtotal / whiteGloveThreshold) * 100));

  const recommendations = [
    {
      name: 'The Architrave Cuff in Palladium',
      category: 'Haute Joaillerie',
      price: 145000,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-sePsJGFpi3NSs2adVFI_kClHDN_maykiyIUOENBvnHznvsJ_KUNWcSCbuxl5NnEErd0qKF5JXFiXLuhchqEna7Ac4G32lT33BIg3Y3bRUxh1ZwGbsEepQaDzlnu-3JVL_5afS3BjazMbPn7Me_NRU-C4Y-FnDD832SLqHnaAAnDEOZen_sFnwl9qKcLgLGqZp0uB-4DlqC0W0AEwU8_PuqlkcClnP0A8WAIV-zFZ',
    },
    {
      name: "L'Opéra Kidskin Opera Gloves",
      category: 'Leather Goods',
      price: 78000,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBNzYpi0m2O3DLayVKe875yk2863jGS2UVdmuvOn9jPllldHOC4vnuAENzU7E5hDtqYbnxTK9w2xj2VW_Ae7FPETpVPrjuAoQe9X9VSRw7_6h9a8Ast8S83V0-qATGuXdauTgnQqIRrXuaWL30lgFn4YzN2JjAhc3GRqOKUbv4r6nmohP5RiLlaCtCpWNte97dazcsIK3eobNKdIgkr5WJLNoB4l-UaN9cFgTwredPC',
    },
    {
      name: 'Palazzo Geometric Silk Foulard',
      category: 'Silk Collection',
      price: 45000,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDyErhzxk67vF3wM7pSkuy6rr1QVCC4F0TZ5UFrhIX9pKnTDJ65b7gixzBfY9nG1Ri5hSJ_LTQBvnNiQd3vK8X7aqzuX_vTVLJbaCZRbltVbS-kyXGZzrJv9GUXIMowHrtcyuAug-5dW35xv9HwaeihFwwGceiDqXKAfsHuVQLC-3DNd7GkxwtiLB3DNLCZsWWnPhtv05rszI9Py5eYR96hgvyQFQiN3r8zL36HPAHV',
    },
    {
      name: "Extrait de Parfum • Cuir d'Orient",
      category: 'Haute Parfumerie',
      price: 38000,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1-pkhNFBydD2cqvgTAwdVq76hCkY-xMeAOSzZhpOVqcd3EBHoGK2XhHTrVyqG8S6viYl2gW2MiXiu2a2m5Rfyn8adCSvBAUH73mix9zleYOjqwRByyCf2u845emsMVWnIR72ZvELwK0pSAdxuuTRdB_joBz_qtliyUPNKdiS-wzMZ8Vv5tcFCD_E6loS7eLsOjFsRFFRE6-9_h82M8T0_vTm0hbBksqC4AVei0pdG',
    },
  ];

  return (
    <div className="w-full flex flex-col bg-[#fcf9f4] min-h-screen">
      {/* Top Notification & Progress Bar for White-Glove Shipping */}
      <section className="w-full bg-[#f6f3ee] px-4 md:px-8 lg:px-16 py-4 border-b border-[#E9DFD2]">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#9e3d00] text-[22px]">local_shipping</span>
            <div>
              <span className="font-['Manrope'] text-[10px] uppercase tracking-widest text-[#111111] font-bold block sm:inline mr-2">
                Private White-Glove Courier Tier
              </span>
              <span className="text-xs font-['Manrope'] text-[#594238]">
                {subtotal >= whiteGloveThreshold ? (
                  <strong className="text-[#B94700]">✓ White-Glove Chauffeur Hand-Delivery & Salon Fitting Unlocked</strong>
                ) : (
                  <>
                    Add <strong className="text-[#111111]">₹{(whiteGloveThreshold - subtotal).toLocaleString('en-IN')}</strong> more for Private Courier White-Glove Hand-Delivery & Salon Fitting.
                  </>
                )}
              </span>
            </div>
          </div>
          <div className="w-full md:w-64 flex flex-col gap-1.5">
            <div className="flex justify-between items-center text-[#57534E] font-['Manrope']">
              <span className="text-[10px] uppercase tracking-widest">₹{subtotal.toLocaleString('en-IN')} / ₹{whiteGloveThreshold.toLocaleString('en-IN')}</span>
              <span className="text-[10px] uppercase tracking-widest text-[#B94700] font-bold">{progressPercent}%</span>
            </div>
            <div className="w-full h-1 bg-[#E9DFD2] overflow-hidden">
              <div
                className="h-full bg-[#B94700] transition-all duration-700 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Bag Content */}
      <section className="w-full px-4 md:px-8 lg:px-16 py-8 md:py-12 max-w-[1400px] mx-auto flex-1">
        
        {/* Editorial Heading Lockup */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 pb-8 border-b border-[#E9DFD2]">
          <div>
            <span className="font-['Manrope'] text-[10px] uppercase tracking-widest text-[#57534E] block mb-1 font-semibold">
              CYOF Client Bag • Edition N° 04 • #CraftedYourOwnFashion
            </span>
            <h1 className="font-['EB_Garamond'] text-3xl sm:text-4xl text-[#111111] tracking-tight">
              Your Shopping Bag
            </h1>
          </div>
          <div className="flex items-center gap-3 text-xs font-['Manrope'] text-[#57534E]">
            <span className="text-[#111111] font-semibold">{cart.length} Masterpiece Creations Reserved</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#B94700]" />
            <span className="text-[#B94700] font-mono">Cart holds for {formatTimer(secondsLeft)}</span>
          </div>
        </div>

        {cart.length === 0 ? (
          <div className="py-20 text-center space-y-4">
            <span className="material-symbols-outlined text-5xl text-[#E9DFD2]">shopping_bag</span>
            <h2 className="font-['EB_Garamond'] text-2xl text-[#111111]">Your Shopping Bag is Empty</h2>
            <p className="font-['Manrope'] text-xs text-[#57534E] max-w-sm mx-auto">
              Explore our hand-crafted collection of pure cashmere trenches, sculptural calfskin bags, and silk dresses.
            </p>
            <button
              onClick={() => onNavigate('shop')}
              className="px-8 py-3 bg-[#111111] hover:bg-[#B94700] text-white font-['Manrope'] text-xs uppercase tracking-widest transition-colors font-semibold shadow-md"
            >
              Explore Collection
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-8 items-start">
            
            {/* Left Column: Bag Items & Experiential Additions (7 Cols) */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Items List */}
              <div className="space-y-4">
                {cart.map((item) => (
                  <article
                    key={`${item.product.id}-${item.selectedShade}-${item.selectedSize}`}
                    className="bg-white p-4 sm:p-6 flex flex-col sm:flex-row gap-6 border border-[#E9DFD2] shadow-xs relative"
                  >
                    {/* 4:5 Visual */}
                    <div className="w-full sm:w-40 aspect-[4/5] bg-[#f0ede9] overflow-hidden flex-shrink-0 relative group">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <span className="absolute top-2 left-2 bg-[#111111] text-white font-['Manrope'] text-[8px] px-2 py-0.5 uppercase tracking-widest font-semibold">
                        Atelier Rare
                      </span>
                    </div>

                    {/* Details */}
                    <div className="flex flex-col justify-between flex-grow min-w-0">
                      <div className="space-y-1">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <span className="font-['Manrope'] text-[9px] uppercase tracking-wider text-[#57534E]">
                              {item.product.subtitle}
                            </span>
                            <h2 className="font-['EB_Garamond'] text-xl text-[#111111] mt-0.5 font-medium leading-snug">
                              {item.product.name}
                            </h2>
                          </div>
                          <span className="font-['Manrope'] text-base font-semibold text-[#111111] whitespace-nowrap">
                            ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-1 font-['Manrope'] text-xs text-[#594238]">
                          <span>Hue: <strong>{item.selectedShade}</strong></span>
                          <span className="text-[#E9DFD2]">•</span>
                          <span>Scale: <strong>{item.selectedSize}</strong></span>
                          <span className="text-[#E9DFD2]">•</span>
                          <span className="text-[11px] text-[#57534E]">Ref. 883-CYOF-09</span>
                        </div>

                        <p className="font-['Manrope'] text-xs text-[#57534E] pt-1 line-clamp-2 leading-relaxed">
                          {item.product.description}
                        </p>
                      </div>

                      {/* Stepper & Actions */}
                      <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-[#E9DFD2]/60 mt-4">
                        <div className="flex items-center bg-[#f6f3ee] border border-[#E9DFD2]">
                          <button
                            type="button"
                            aria-label="Decrease quantity"
                            onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                            className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center text-[#111111] hover:text-[#B94700] transition-colors font-bold text-base cursor-pointer"
                          >
                            −
                          </button>
                          <span className="w-8 text-center font-['Manrope'] text-xs font-semibold text-[#111111] tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            aria-label="Increase quantity"
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                            className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center text-[#111111] hover:text-[#B94700] transition-colors font-bold text-base cursor-pointer"
                          >
                            +
                          </button>
                        </div>

                        <div className="flex items-center gap-4 text-xs font-['Manrope']">
                          <button
                            type="button"
                            onClick={() => onToggleWishlist(item.product)}
                            className="flex items-center gap-1 uppercase tracking-wider text-[#57534E] hover:text-[#111111] transition-colors"
                          >
                            <span className="material-symbols-outlined text-[16px]">favorite</span>
                            <span className="hidden sm:inline">Save To Wishlist</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => onRemoveItem(item.product.id)}
                            className="flex items-center gap-1 uppercase tracking-wider text-[#57534E] hover:text-[#ba1a1a] transition-colors"
                          >
                            <span className="material-symbols-outlined text-[16px]">delete_outline</span>
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Signature CYOF Packaging Suite */}
              <div className="bg-[#f6f3ee] p-6 border border-[#E9DFD2]">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#B94700] text-[24px]">redeem</span>
                    <div>
                      <h3 className="font-['EB_Garamond'] text-xl text-[#111111]">Signature CYOF Packaging</h3>
                      <p className="font-['Manrope'] text-xs text-[#594238]">
                        Complimentary museum-grade gift boxing & grosgrain ribbon closure
                      </p>
                    </div>
                  </div>
                  <span className="font-['Manrope'] text-[10px] uppercase tracking-widest text-[#9e3d00] font-bold">
                    Complimentary
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4 font-['Manrope'] text-xs">
                  <div className="bg-white p-3 border border-[#E9DFD2] flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#57534E] text-[18px]">inventory_2</span>
                    <span>Matte Black Coffret</span>
                  </div>
                  <div className="bg-white p-3 border border-[#E9DFD2] flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#57534E] text-[18px]">award_star</span>
                    <span>Burnt Orange Grosgrain</span>
                  </div>
                  <div className="bg-white p-3 border border-[#E9DFD2] flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#57534E] text-[18px]">drafts</span>
                    <span>Wax Sealed Note</span>
                  </div>
                </div>

                {/* Gift Message Accordion */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setGiftNoteOpen(!giftNoteOpen)}
                    className="w-full flex items-center justify-between text-left text-[#111111] hover:text-[#B94700] transition-colors py-1 cursor-pointer font-['Manrope'] text-xs font-semibold uppercase tracking-wider"
                  >
                    <span className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px]">edit_note</span>
                      Personalize Calligraphed Gift Message
                    </span>
                    <span className="material-symbols-outlined text-[20px]">
                      {giftNoteOpen ? 'expand_less' : 'expand_more'}
                    </span>
                  </button>

                  {giftNoteOpen && (
                    <div className="pt-3 space-y-2 animate-in fade-in duration-200">
                      <textarea
                        value={giftMessage}
                        onChange={(e) => setGiftMessage(e.target.value.slice(0, 240))}
                        rows={3}
                        placeholder="Inscribe your personal dedication here. Our master calligrapher will handwrite this on heavy deckled Italian cotton vellum..."
                        className="w-full bg-white p-3 font-['Manrope'] text-xs text-[#111111] placeholder-[#57534E] border border-[#E9DFD2] focus:outline-none focus:border-[#111111] resize-none"
                      />
                      <div className="flex justify-between items-center text-[#57534E] font-['Manrope'] text-[10px]">
                        <span>Included complimentary with all orders</span>
                        <span>{giftMessage.length} / 240 Characters</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>




            </div>

            {/* Right Column: Sticky Summary Card (5 Cols) */}
            <aside className="lg:col-span-5 sticky top-28">
              <div className="bg-white p-6 sm:p-8 border border-[#E9DFD2] shadow-lg space-y-6">
                <div>
                  <span className="font-['Manrope'] text-[10px] uppercase tracking-widest text-[#57534E] block font-semibold">
                    Investment Allocation
                  </span>
                  <h2 className="font-['EB_Garamond'] text-2xl sm:text-3xl text-[#111111]">
                    Order Summary
                  </h2>
                </div>

                <div className="space-y-3 font-['Manrope'] text-xs">
                  <div className="flex justify-between items-center text-[#594238]">
                    <span>Acquisition Subtotal ({cart.length} items)</span>
                    <span className="text-[#111111] font-semibold">₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center text-[#594238]">
                    <span>Signature Packaging & Coffret</span>
                    <span className="text-[#B94700] font-semibold uppercase text-[10px] tracking-wider">Complimentary</span>
                  </div>
                  <div className="flex justify-between items-center text-[#594238]">
                    <span>All-India Express Freight</span>
                    <span className="text-[#B94700] font-semibold uppercase text-[10px] tracking-wider">Complimentary</span>
                  </div>
                  <div className="flex justify-between items-center text-[#594238]">
                    <span>Goods & Services Tax (GST 18%)</span>
                    <span className="text-[#57534E]">Included in price</span>
                  </div>
                </div>

                {/* Grand Total */}
                <div className="pt-4 border-t border-[#E9DFD2] bg-[#f6f3ee] -mx-6 -mb-6 sm:-mx-8 sm:-mb-8 p-6 sm:p-8 space-y-4">
                  <div className="flex justify-between items-baseline">
                    <div className="flex flex-col">
                      <span className="font-['Manrope'] text-[10px] uppercase tracking-widest text-[#57534E] font-semibold">
                        Estimated Total
                      </span>
                      <span className="font-['Manrope'] text-[10px] text-[#57534E]">All transactions encrypted in INR (₹)</span>
                    </div>
                    <span className="font-['EB_Garamond'] text-3xl font-medium text-[#111111]">
                      ₹{subtotal.toLocaleString('en-IN')}
                    </span>
                  </div>



                  {/* Primary CTA */}
                  <button
                    onClick={() => onNavigate('checkout')}
                    className="w-full py-4 bg-[#B94700] hover:bg-[#111111] text-white font-['Manrope'] text-xs uppercase tracking-widest font-semibold transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Proceed to Secure Checkout</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>

                  <div className="pt-2 flex items-center justify-center gap-2 text-[#57534E] font-['Manrope'] text-[10px]">
                    <span className="material-symbols-outlined text-[14px] text-[#B94700]">lock</span>
                    <span>End-to-End 256-Bit SSL Encryption</span>
                  </div>

                  {/* Concierge Hotline Box */}
                  <div className="bg-white p-3 border border-[#E9DFD2] flex items-center justify-between font-['Manrope']">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#B94700] text-[20px]">headset_mic</span>
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-[#57534E] font-semibold">India Client Services</p>
                        <p className="text-xs text-[#111111]">Bespoke Concierge Available</p>
                      </div>
                    </div>
                    <a href="tel:+9118002092963" className="text-[10px] font-bold text-[#9e3d00] hover:underline uppercase">
                      Connect
                    </a>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        )}

        {/* Complete The Ensemble Section */}
        <section className="mt-20 pt-12 border-t border-[#E9DFD2]">
          <div className="flex flex-col sm:flex-row items-baseline justify-between mb-8">
            <div>
              <span className="font-['Manrope'] text-[10px] uppercase tracking-widest text-[#57534E] block mb-1 font-semibold">
                CYOF Private Salon Curation
              </span>
              <h2 className="font-['EB_Garamond'] text-3xl text-[#111111]">Complete the Ensemble</h2>
            </div>
            <button
              onClick={() => onNavigate('shop')}
              className="font-['Manrope'] text-xs uppercase tracking-widest text-[#111111] hover:text-[#B94700] underline underline-offset-4 cursor-pointer font-semibold mt-2 sm:mt-0"
            >
              Explore All Accessories →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendations.map((rec) => (
              <div key={rec.name} className="bg-white p-4 border border-[#E9DFD2] shadow-xs flex flex-col justify-between group">
                <div className="aspect-[4/5] bg-[#f0ede9] overflow-hidden mb-3">
                  <img src={rec.image} alt={rec.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <div className="space-y-1">
                  <span className="font-['Manrope'] text-[9px] uppercase text-[#57534E]">{rec.category}</span>
                  <h3 className="font-['EB_Garamond'] text-lg text-[#111111] font-medium leading-snug line-clamp-1">{rec.name}</h3>
                  <p className="font-['Manrope'] text-xs font-semibold text-[#111111]">₹{rec.price.toLocaleString('en-IN')}</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const found = PRODUCTS.find((p) => p.name.includes(rec.name.slice(0, 10)));
                    if (found) onAddToCart(found);
                  }}
                  className="mt-4 w-full py-2 bg-[#f6f3ee] hover:bg-[#111111] hover:text-white text-[#111111] font-['Manrope'] text-[10px] uppercase tracking-wider font-semibold transition-colors cursor-pointer"
                >
                  Add To Bag
                </button>
              </div>
            ))}
          </div>
        </section>
      </section>

      {/* Mobile Sticky Bottom Checkout Bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[#F8F5F0]/95 backdrop-blur-md px-4 py-3 pb-safe border-t border-[#E9DFD2] shadow-[0_-4px_16px_rgba(0,0,0,0.08)]">
        <div className="flex items-center justify-between gap-4 max-w-md mx-auto">
          <div>
            <span className="font-['Manrope'] text-[9px] uppercase tracking-widest text-[#57534E] block">
              Total ({cart.length} Items)
            </span>
            <span className="font-['EB_Garamond'] text-xl font-bold text-[#111111]">
              ₹{subtotal.toLocaleString('en-IN')}
            </span>
          </div>
          <button
            onClick={() => onNavigate('checkout')}
            className="bg-[#B94700] hover:bg-[#111111] text-white py-3 px-6 flex items-center gap-2 font-['Manrope'] text-xs uppercase tracking-wider font-semibold transition-colors shadow-sm cursor-pointer"
          >
            <span>Checkout</span>
            <span className="material-symbols-outlined text-[16px]">lock</span>
          </button>
        </div>
      </div>
    </div>
  );
};
