import React, { useState, useEffect, useRef } from 'react';
import { Product, ViewRoute } from '../types';
import { PRODUCTS } from '../data/mockData';
import { SizeGuideModal } from '../components/SizeGuideModal';

interface ProductDetailViewProps {
  product?: Product;
  onAddToCart: (product: Product, shade: string, size: string) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: (productId: string) => boolean;
  onNavigate: (route: ViewRoute) => void;
  onOpenSalonModal: (productName?: string) => void;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  product = PRODUCTS[0],
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onNavigate,
  onOpenSalonModal,
}) => {
  const [selectedSlide, setSelectedSlide] = useState(0);
  const [selectedShade, setSelectedShade] = useState(product.shades[0]?.name || 'Noir Absolu');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [selectSizeSheetOpen, setSelectSizeSheetOpen] = useState(false);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  
  // Tab state for recommendations
  const [activeRecommendationTab, setActiveRecommendationTab] = useState<'you-may-like' | 'recently-viewed'>('you-may-like');

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Accordion state
  const [openAccordions, setOpenAccordions] = useState<{ [key: string]: boolean }>({
    details: true,
    shipping: false,
    contact: false,
  });

  // Scroll observer state for sticky bottom button
  const [isInlineButtonVisible, setIsInlineButtonVisible] = useState(false);
  const inlineButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInlineButtonVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (inlineButtonRef.current) {
      observer.observe(inlineButtonRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const toggleAccordion = (key: string) => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const images = product.images.length > 0 ? product.images : [product.image];
  const saved = isWishlisted(product.id);

  interface SizeOption {
    label: string;
    dimensions?: string;
    inStock?: boolean;
    note?: string;
  }

  // Standard sizes array fallback if product.sizes is compact
  const availableSizeList: SizeOption[] = product.sizes.length >= 4
    ? product.sizes.map((s, idx) => ({
        label: s.label,
        dimensions: s.dimensions,
        inStock: idx === 0 || idx === 1,
        note: idx === 0 || idx === 1 ? 'Only 1 available' : 'NOTIFY ME',
      }))
    : [
        { label: '36', dimensions: 'IT 36 / FR 32', inStock: true, note: 'Only 1 available' },
        { label: '38', dimensions: 'IT 38 / FR 34', inStock: false, note: 'NOTIFY ME' },
        { label: '40', dimensions: 'IT 40 / FR 36', inStock: false, note: 'NOTIFY ME' },
        { label: '42', dimensions: 'IT 42 / FR 38', inStock: false, note: 'NOTIFY ME' },
        { label: '44', dimensions: 'IT 44 / FR 40', inStock: true, note: 'Only 1 available' },
        { label: '46', dimensions: 'IT 46 / FR 42', inStock: false, note: 'NOTIFY ME' },
        { label: '48', dimensions: 'IT 48 / FR 44', inStock: false, note: 'NOTIFY ME' },
        { label: '50', dimensions: 'IT 50 / FR 46', inStock: false, note: 'NOTIFY ME' },
      ];

  const handleMainAction = () => {
    if (!selectedSize) {
      setSelectSizeSheetOpen(true);
    } else {
      onAddToCart(product, selectedShade, selectedSize);
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
      setTimeout(() => setNewsletterSubscribed(false), 4000);
      setNewsletterEmail('');
    }
  };

  return (
    <div className="w-full flex flex-col bg-[#fcf9f4] min-h-screen text-[#1c1c19] relative pb-24 lg:pb-0">
      
      {/* High-Resolution Zoom Modal */}
      {zoomedImage && (
        <div
          className="fixed inset-0 z-50 bg-[#111111]/95 backdrop-blur-md flex flex-col justify-center items-center p-4 cursor-zoom-out animate-in fade-in duration-200"
          onClick={() => setZoomedImage(null)}
        >
          <button
            type="button"
            onClick={() => setZoomedImage(null)}
            className="absolute top-6 right-6 text-white p-2 hover:text-[#B94700] transition-colors"
          >
            <span className="material-symbols-outlined text-[32px]">close</span>
          </button>
          <img
            src={zoomedImage}
            alt="High-resolution atelier magnification"
            className="max-h-[85vh] max-w-[90vw] object-contain shadow-2xl"
          />
          <p className="font-['Manrope'] text-xs uppercase tracking-widest text-[#E9DFD2] mt-4">
            CYOF High-Resolution Atelier Magnification • #CraftedYourOwnFashion
          </p>
        </div>
      )}

      {/* Size Guide Modal Overlay */}
      <SizeGuideModal
        isOpen={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
        initialCategory={product.category}
        productName={product.name}
        onOpenSalonModal={onOpenSalonModal}
      />

      {/* SELECT SIZE Bottom Sheet Drawer (Screenshot 2) */}
      {selectSizeSheetOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#111111]/70 backdrop-blur-xs flex flex-col justify-end animate-in fade-in duration-200"
          onClick={() => setSelectSizeSheetOpen(false)}
        >
          <div
            className="w-full max-w-lg mx-auto bg-white border-t border-[#E9DFD2] shadow-2xl p-6 md:p-8 flex flex-col animate-in slide-in-from-bottom duration-300 max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Drag Handle */}
            <div className="w-12 h-1 bg-[#D6C7B2] rounded-full mx-auto mb-4 shrink-0" />

            {/* Title & Size Guide Row */}
            <div className="flex items-center justify-between pb-4 border-b border-[#E9DFD2] mb-2">
              <span className="font-['Manrope'] text-xs font-bold uppercase tracking-[0.2em] text-[#111111]">
                SELECT SIZE:
              </span>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setSelectSizeSheetOpen(false);
                    setSizeGuideOpen(true);
                  }}
                  className="font-['Manrope'] text-[11px] font-semibold uppercase tracking-wider text-[#111111] underline underline-offset-4 hover:text-[#B94700] transition-colors cursor-pointer"
                >
                  SIZE GUIDE
                </button>
                <button
                  type="button"
                  onClick={() => setSelectSizeSheetOpen(false)}
                  className="w-8 h-8 flex items-center justify-center text-[#111111] hover:text-[#B94700] transition-colors"
                  aria-label="Close Size Selection Sheet"
                >
                  <span className="material-symbols-outlined text-[22px]">close</span>
                </button>
              </div>
            </div>

            {/* List of Sizes */}
            <div className="overflow-y-auto divide-y divide-[#E9DFD2]/60 font-['Manrope'] my-2">
              {availableSizeList.map((s) => {
                const isSelected = selectedSize === s.label;
                const inStock = s.inStock !== false;

                return (
                  <div
                    key={s.label}
                    onClick={() => {
                      if (inStock) {
                        setSelectedSize(s.label);
                        setSelectSizeSheetOpen(false);
                      }
                    }}
                    className={`flex items-center justify-between py-4 px-2 cursor-pointer transition-colors group ${
                      isSelected ? 'bg-[#fcf9f4]' : 'hover:bg-[#FAF8F5]'
                    } ${!inStock ? 'opacity-60 cursor-not-allowed' : ''}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`font-['EB_Garamond'] text-lg font-normal ${!inStock ? 'line-through text-[#888888]' : 'text-[#111111] group-hover:text-[#B94700]'}`}>
                        {s.label}
                      </span>
                      {isSelected && (
                        <span className="material-symbols-outlined text-[#B94700] text-[18px]">check</span>
                      )}
                    </div>

                    <div>
                      {inStock ? (
                        <span className="font-['EB_Garamond'] italic text-xs text-[#57534E]">
                          {s.note || 'Only 1 available'}
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            alert(`We will notify you when size ${s.label} becomes available in salon stock.`);
                          }}
                          className="font-['Manrope'] text-[10px] uppercase font-bold tracking-widest text-[#111111] underline underline-offset-4 hover:text-[#B94700]"
                        >
                          NOTIFY ME
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Dismiss CTA */}
            <button
              type="button"
              onClick={() => setSelectSizeSheetOpen(false)}
              className="w-full mt-4 py-3.5 bg-[#111111] text-white font-['Manrope'] text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#B94700] transition-colors cursor-pointer"
            >
              CONFIRM SELECTION
            </button>
          </div>
        </div>
      )}

      {/* STICKY BOTTOM BUTTON (Appears when scrolling down until inline button is in view) */}
      {!isInlineButtonVisible && (
        <div className="fixed bottom-0 inset-x-0 z-40 bg-[#111111] text-white border-t border-[#111111] shadow-2xl animate-in slide-in-from-bottom duration-300">
          <div className="max-w-[1600px] mx-auto px-4 py-3.5 flex items-center justify-between gap-4">
            <div className="hidden sm:flex items-center gap-3 min-w-0">
              <img src={product.image} alt={product.name} className="w-10 h-10 object-cover border border-[#333333]" />
              <div className="min-w-0 font-['Manrope'] text-left">
                <p className="text-xs text-white uppercase tracking-wider font-semibold truncate">{product.name}</p>
                <p className="text-[11px] text-[#D6C7B2]">₹{product.price.toLocaleString('en-IN')}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleMainAction}
              className="w-full sm:w-auto sm:min-w-[280px] h-12 bg-[#111111] hover:bg-[#B94700] text-white font-['Manrope'] text-xs uppercase tracking-[0.2em] font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer border border-white/20 active:scale-[0.99]"
            >
              <span>{selectedSize ? `ADD TO BAG — ${selectedSize}` : 'SELECT SIZE'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Main PDP Split Container */}
      <section className="w-full px-4 md:px-8 lg:px-16 pt-6 pb-12 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16">
          
          {/* Left Column: Gallery */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            
            {/* Mobile Carousel Track */}
            <div className="lg:hidden relative w-full overflow-hidden bg-[#f0ede9] shadow-sm">
              <div
                className="flex transition-transform duration-500 ease-out will-change-transform"
                style={{ transform: `translateX(-${selectedSlide * 100}%)` }}
              >
                {images.map((img, i) => (
                  <div key={i} className="min-w-full aspect-[3/4] relative bg-[#f0ede9]">
                    <img src={img} alt={`${product.name} view ${i + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>

              {/* Mobile Badges & Actions */}
              <div className="absolute top-3 left-3 z-10">
                <span className="bg-[#111111]/90 text-white font-['Manrope'] text-[9px] uppercase px-2 py-1 tracking-widest font-semibold">
                  NEW IN
                </span>
              </div>

              <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setZoomedImage(images[selectedSlide])}
                  className="w-9 h-9 bg-white/90 text-[#111111] flex items-center justify-center shadow-xs"
                >
                  <span className="material-symbols-outlined text-[18px]">zoom_in</span>
                </button>
                <button
                  type="button"
                  onClick={() => onToggleWishlist(product)}
                  className="w-9 h-9 bg-white/90 text-[#111111] flex items-center justify-center shadow-xs"
                >
                  <span className={`material-symbols-outlined text-[18px] ${saved ? 'text-[#B94700]' : ''}`}>
                    {saved ? 'favorite' : 'favorite_border'}
                  </span>
                </button>
              </div>

              {/* Slide Counter */}
              <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between">
                <span className="bg-[#111111]/80 px-2.5 py-1 text-white font-['Manrope'] text-[10px] uppercase tracking-widest font-semibold">
                  0{selectedSlide + 1} / 0{images.length}
                </span>
                <div className="flex items-center gap-1.5">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSelectedSlide(i)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        selectedSlide === i ? 'bg-[#B94700] w-4' : 'bg-white/60'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Desktop Full-Length Vertical Gallery (Matching Screenshot 1) */}
            <div className="hidden lg:flex flex-col space-y-4">
              {images.map((img, i) => (
                <div
                  key={i}
                  className="relative w-full aspect-[3/4] bg-[#f0ede9] group overflow-hidden border border-[#E9DFD2]/60 cursor-zoom-in"
                  onClick={() => setZoomedImage(img)}
                >
                  <img
                    src={img}
                    alt={`${product.name} view ${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {i === 0 && (
                    <span className="absolute top-4 left-4 bg-[#111111] text-white font-['Manrope'] text-[9px] uppercase px-3 py-1 tracking-widest font-bold">
                      NEW IN
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(product);
                    }}
                    className="absolute top-4 right-4 bg-white/90 p-2.5 text-[#111111] hover:text-[#B94700] transition-colors shadow-xs cursor-pointer"
                  >
                    <span className={`material-symbols-outlined text-[20px] ${saved ? 'text-[#B94700]' : ''}`}>
                      {saved ? 'favorite' : 'favorite_border'}
                    </span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Product Details Lockup (Screenshot 1) */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="lg:sticky lg:top-28 space-y-6 flex flex-col font-['Manrope']">
              
              {/* Title & Price Header */}
              <div className="space-y-2 pb-2">
                <h1 className="font-['EB_Garamond'] text-3xl sm:text-4xl text-[#111111] font-normal leading-[1.15]">
                  {product.name}
                </h1>

                <p className="font-['EB_Garamond'] text-2xl text-[#111111] font-medium pt-1">
                  ₹ {product.price.toLocaleString('en-IN')}
                </p>

                <p className="font-['EB_Garamond'] italic text-xs text-[#57534E]">
                  All taxes and duties included
                </p>
              </div>

              {/* Color Selector Row */}
              <div className="py-3 border-t border-b border-[#E9DFD2] flex items-center justify-between text-xs">
                <span className="font-['Manrope'] text-xs text-[#111111]">
                  Color: <strong className="font-semibold">{selectedShade}</strong>
                </span>

                <div className="flex items-center gap-2">
                  {product.shades.map((shade) => {
                    const active = selectedShade === shade.name;
                    return (
                      <button
                        key={shade.name}
                        type="button"
                        onClick={() => setSelectedShade(shade.name)}
                        className={`w-6 h-6 rounded-full border transition-all cursor-pointer ${
                          active ? 'border-[#111111] ring-2 ring-[#111111] ring-offset-2' : 'border-[#E9DFD2]'
                        }`}
                        style={{ backgroundColor: shade.color }}
                        title={shade.name}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Select Size Row Trigger (Screenshot 1) */}
              <div
                onClick={() => setSelectSizeSheetOpen(true)}
                className="py-3.5 border-b border-[#E9DFD2] flex items-center justify-between text-xs cursor-pointer group hover:bg-[#FAF8F5] transition-colors"
              >
                <span className="font-['Manrope'] text-xs text-[#111111]">
                  Select Size: <strong className="font-semibold">{selectedSize || ''}</strong>
                </span>
                <span className="material-symbols-outlined text-[18px] text-[#111111] group-hover:translate-x-1 transition-transform">
                  chevron_right
                </span>
              </div>

              {/* Main Inline Action Button Container (Observed by IntersectionObserver) */}
              <div ref={inlineButtonRef} className="pt-2">
                <button
                  type="button"
                  onClick={handleMainAction}
                  className="w-full h-14 bg-[#d34500] hover:bg-[#b93c00] text-white font-['Manrope'] text-xs uppercase tracking-[0.2em] font-bold transition-colors shadow-sm flex items-center justify-center cursor-pointer"
                >
                  {selectedSize ? 'ADD TO BAG' : 'SELECT SIZE'}
                </button>
              </div>

              {/* Clean Luxury Accordions (Screenshot 1) */}
              <div className="space-y-0 divide-y divide-[#E9DFD2] border-t border-b border-[#E9DFD2] pt-1">
                
                {/* Product Details */}
                <div className="py-4">
                  <button
                    type="button"
                    onClick={() => toggleAccordion('details')}
                    className="w-full flex items-center justify-between text-left font-['EB_Garamond'] text-lg text-[#111111] hover:text-[#B94700] transition-colors cursor-pointer"
                  >
                    <span>Product Details</span>
                    <span className="material-symbols-outlined text-[20px] text-[#111111]">
                      {openAccordions.details ? 'remove' : 'add'}
                    </span>
                  </button>
                  {openAccordions.details && (
                    <div className="pt-3 text-xs font-['Manrope'] text-[#57534E] space-y-2 leading-relaxed">
                      <p>{product.description}</p>
                      <ul className="list-disc pl-4 space-y-1">
                        <li>100% Pure Mulberry Silk & Tuscan full-grain leather finishes</li>
                        <li>Draped cowl neckline with sculpted architectural silhouette</li>
                        <li>Concealed rear zip fastening with gold medallion zipper pull</li>
                        <li>Dry clean only in specialized luxury garments facility</li>
                      </ul>
                    </div>
                  )}
                </div>

                {/* Packaging, Shipping & Returns */}
                <div className="py-4">
                  <button
                    type="button"
                    onClick={() => toggleAccordion('shipping')}
                    className="w-full flex items-center justify-between text-left font-['EB_Garamond'] text-lg text-[#111111] hover:text-[#B94700] transition-colors cursor-pointer"
                  >
                    <span>Packaging, Shipping & Returns</span>
                    <span className="material-symbols-outlined text-[20px] text-[#111111]">
                      {openAccordions.shipping ? 'remove' : 'add'}
                    </span>
                  </button>
                  {openAccordions.shipping && (
                    <div className="pt-3 text-xs font-['Manrope'] text-[#57534E] space-y-2 leading-relaxed">
                      <p>
                        Delivered in our signature matte ebony gift coffret with wax-sealed certification and cotton dust garment bag.
                      </p>
                      <p>
                        Complimentary white-glove doorstep delivery across India. Returns and size exchanges honored within 14 days of arrival.
                      </p>
                    </div>
                  )}
                </div>

                {/* Contact Us */}
                <div className="py-4">
                  <button
                    type="button"
                    onClick={() => toggleAccordion('contact')}
                    className="w-full flex items-center justify-between text-left font-['EB_Garamond'] text-lg text-[#111111] hover:text-[#B94700] transition-colors cursor-pointer"
                  >
                    <span>Contact Us</span>
                    <span className="material-symbols-outlined text-[20px] text-[#111111]">
                      {openAccordions.contact ? 'remove' : 'add'}
                    </span>
                  </button>
                  {openAccordions.contact && (
                    <div className="pt-3 text-xs font-['Manrope'] text-[#57534E] space-y-2 leading-relaxed">
                      <p>
                        Need bespoke sizing or personal styling assistance?
                      </p>
                      <p className="font-semibold text-[#111111]">
                        CYOF India Concierge Hotline: +91 1800 209 2963
                      </p>
                      <button
                        type="button"
                        onClick={() => onOpenSalonModal(product.name)}
                        className="mt-2 text-[#B94700] uppercase font-bold text-[10px] tracking-widest underline hover:text-[#111111]"
                      >
                        Book Private Salon Appointment →
                      </button>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* SHOP THE LOOK Section (Screenshot 1) */}
      <section className="w-full bg-[#f6f3ee] py-16 border-t border-b border-[#E9DFD2]">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-['EB_Garamond'] text-2xl md:text-3xl text-[#111111] font-normal uppercase tracking-wider">
              SHOP THE LOOK
            </h2>
            <div className="flex items-center gap-3 font-['Manrope'] text-xs text-[#57534E]">
              <span>1 / 2</span>
              <div className="flex items-center gap-1">
                <button type="button" className="w-8 h-8 border border-[#E9DFD2] bg-white flex items-center justify-center text-[#111111] hover:border-[#111111]">
                  ←
                </button>
                <button type="button" className="w-8 h-8 border border-[#E9DFD2] bg-white flex items-center justify-center text-[#111111] hover:border-[#111111]">
                  →
                </button>
              </div>
            </div>
          </div>

          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 sm:pb-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-6 no-scrollbar">
            {PRODUCTS.slice(1, 5).map((item) => (
              <div key={item.id} className="min-w-[75vw] sm:min-w-0 shrink-0 sm:shrink snap-start bg-white p-4 border border-[#E9DFD2] shadow-xs flex flex-col justify-between group">
                <div className="aspect-[3/4] bg-[#f0ede9] overflow-hidden mb-3 relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-2 left-2 bg-[#111111] text-white text-[8px] uppercase tracking-widest font-bold px-2 py-0.5">
                    NEW IN
                  </span>
                  <button
                    type="button"
                    onClick={() => onToggleWishlist(item)}
                    className="absolute top-2 right-2 bg-white/90 p-1.5 text-[#111111] hover:text-[#B94700]"
                  >
                    <span className="material-symbols-outlined text-[16px]">favorite_border</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onAddToCart(item, item.shades[0]?.name || 'Standard', item.sizes[0]?.label || 'Standard')}
                    className="absolute bottom-2 right-2 w-8 h-8 bg-[#111111] text-white flex items-center justify-center hover:bg-[#B94700]"
                  >
                    <span className="material-symbols-outlined text-[16px]">shopping_bag</span>
                  </button>
                </div>
                <div>
                  <h3 className="font-['EB_Garamond'] text-base text-[#111111] font-medium line-clamp-1">{item.name}</h3>
                  <p className="font-['Manrope'] text-xs font-semibold text-[#111111] mt-1">₹{item.price.toLocaleString('en-IN')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* YOU MAY ALSO LIKE / RECENTLY VIEWED Tabbed Section (Screenshot 1) */}
      <section className="w-full py-16 px-4 md:px-8 lg:px-16 max-w-[1600px] mx-auto font-['Manrope']">
        <div className="flex items-center justify-center gap-8 mb-10 border-b border-[#E9DFD2] pb-4">
          <button
            type="button"
            onClick={() => setActiveRecommendationTab('you-may-like')}
            className={`text-xs uppercase tracking-[0.2em] font-bold pb-2 transition-colors border-b-2 ${
              activeRecommendationTab === 'you-may-like'
                ? 'text-[#111111] border-[#111111]'
                : 'text-[#888888] border-transparent hover:text-[#111111]'
            }`}
          >
            YOU MAY ALSO LIKE
          </button>
          <button
            type="button"
            onClick={() => setActiveRecommendationTab('recently-viewed')}
            className={`text-xs uppercase tracking-[0.2em] font-bold pb-2 transition-colors border-b-2 ${
              activeRecommendationTab === 'recently-viewed'
                ? 'text-[#111111] border-[#111111]'
                : 'text-[#888888] border-transparent hover:text-[#111111]'
            }`}
          >
            RECENTLY VIEWED
          </button>
        </div>

        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-4 sm:pb-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-8 no-scrollbar">
          {(activeRecommendationTab === 'you-may-like' ? PRODUCTS.slice(1, 4) : PRODUCTS.slice(2, 5)).map((item) => (
            <div key={item.id} className="min-w-[75vw] sm:min-w-0 shrink-0 sm:shrink snap-start group cursor-pointer" onClick={() => onNavigate('product')}>
              <div className="aspect-[3/4] bg-[#f0ede9] overflow-hidden mb-4 relative border border-[#E9DFD2]">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <span className="absolute top-3 left-3 bg-[#111111] text-white text-[9px] uppercase tracking-widest font-bold px-2.5 py-1">
                  NEW IN
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleWishlist(item);
                  }}
                  className="absolute top-3 right-3 bg-white/90 p-2 text-[#111111] hover:text-[#B94700]"
                >
                  <span className="material-symbols-outlined text-[18px]">favorite_border</span>
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(item, item.shades[0]?.name || 'Standard', item.sizes[0]?.label || 'Standard');
                  }}
                  className="absolute bottom-3 right-3 w-9 h-9 bg-[#111111] text-white flex items-center justify-center hover:bg-[#B94700]"
                >
                  <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
                </button>
              </div>

              <div className="space-y-1">
                <h3 className="font-['EB_Garamond'] text-lg text-[#111111] font-normal leading-snug">
                  {item.name}
                </h3>
                <p className="font-['EB_Garamond'] text-base text-[#111111] font-semibold">
                  ₹ {item.price.toLocaleString('en-IN')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Breadcrumb Bar at bottom (Screenshot 1) */}
      <div className="w-full bg-[#FAF8F5] py-4 border-t border-b border-[#E9DFD2] font-['Manrope'] text-[10px] uppercase tracking-widest text-[#57534E] text-center">
        <span>CYOF</span> | <span>{product.category.toUpperCase()}</span> | <span className="text-[#111111] font-bold">{product.name.toUpperCase()}</span>
      </div>

      {/* House Newsletter Section (Screenshot 1) */}
      <section className="w-full bg-[#fcf9f4] py-16 px-4 md:px-8 text-center border-b border-[#E9DFD2]">
        <div className="max-w-md mx-auto space-y-4">
          <span className="font-['Manrope'] text-[10px] uppercase tracking-[0.25em] text-[#B94700] font-bold block">
            JOIN THE HOUSE OF CYOF
          </span>
          <h2 className="font-['EB_Garamond'] text-2xl sm:text-3xl text-[#111111] font-normal">
            Sign up to stay up to date on events, collections, and exclusive news.
          </h2>

          <form onSubmit={handleNewsletterSubmit} className="pt-2">
            <div className="relative flex items-center border-b border-[#111111] pb-2">
              <input
                type="email"
                required
                placeholder="Enter your email address *"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="w-full bg-transparent font-['Manrope'] text-xs text-[#111111] focus:outline-none placeholder:text-[#888888]"
              />
              <button
                type="submit"
                className="text-[#111111] hover:text-[#B94700] p-1 font-bold text-lg"
              >
                →
              </button>
            </div>
            {newsletterSubscribed && (
              <p className="text-[11px] text-[#B94700] font-['Manrope'] mt-2 font-semibold animate-in fade-in">
                Thank you for subscribing to CYOF Private Dispatches.
              </p>
            )}
          </form>
        </div>
      </section>

      {/* Footer Accordions (Screenshot 1) */}
      <footer className="w-full bg-[#fcf9f4] py-8 px-4 md:px-8 max-w-[1600px] mx-auto font-['Manrope'] text-xs text-[#111111]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-8 border-b border-[#E9DFD2]">
          <div>
            <h4 className="font-bold text-[10px] uppercase tracking-widest mb-3">CLIENT SERVICE</h4>
            <ul className="space-y-2 text-[11px] text-[#57534E]">
              <li>Contact Us</li>
              <li>Shipping & Handover</li>
              <li>Returns & Exchanges</li>
              <li>Salon Appointment</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-[10px] uppercase tracking-widest mb-3">ABOUT CYOF</h4>
            <ul className="space-y-2 text-[11px] text-[#57534E]">
              <li>The Atelier Provenance</li>
              <li>Artisanal Craftsmanship</li>
              <li>Monographs & Journal</li>
              <li>Careers</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-[10px] uppercase tracking-widest mb-3">LEGAL</h4>
            <ul className="space-y-2 text-[11px] text-[#57534E]">
              <li>Terms & Conditions</li>
              <li>Privacy Policy</li>
              <li>Cookie Settings</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-[10px] uppercase tracking-widest mb-3">STORE LOCATOR</h4>
            <p className="text-[11px] text-[#57534E] leading-relaxed">
              Mumbai Flagship Salon — The Oberoi, Nariman Point
            </p>
            <p className="text-[10px] uppercase tracking-wider text-[#B94700] font-bold mt-2">
              INDIA — EN (₹ INR)
            </p>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-[#888888] uppercase tracking-widest">
          <p>© CYOF ATELIER PRIVATE LIMITED • #CraftedYourOwnFashion</p>
          <p>PROVENANCE REGISTERED</p>
        </div>
      </footer>

    </div>
  );
};
