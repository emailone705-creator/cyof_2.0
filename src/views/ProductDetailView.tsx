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
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [galleryZoomScale, setGalleryZoomScale] = useState(1);
  const [dragPos, setDragPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });

  // Tab state for recommendations
  const [activeRecommendationTab, setActiveRecommendationTab] = useState<'you-may-like' | 'recently-viewed'>('you-may-like');
  const [shopLookIndex, setShopLookIndex] = useState(0);
  const shopTheLookItems = PRODUCTS.slice(1, 4);

  // Carousel ref & handlers for recommendation section
  const recommendationCarouselRef = useRef<HTMLDivElement>(null);

  const scrollRecommendationsLeft = () => {
    if (recommendationCarouselRef.current) {
      recommendationCarouselRef.current.scrollBy({ left: -340, behavior: 'smooth' });
    }
  };

  const scrollRecommendationsRight = () => {
    if (recommendationCarouselRef.current) {
      recommendationCarouselRef.current.scrollBy({ left: 340, behavior: 'smooth' });
    }
  };

  const images = product.images.length > 0 ? product.images : [product.image];
  const galleryImages = images.length >= 6 ? images : [...images, ...images, ...images].slice(0, 6);
  const saved = isWishlisted(product.id);

  const openGallery = (index: number = 0) => {
    setGalleryIndex(index);
    setGalleryZoomScale(1);
    setDragPos({ x: 0, y: 0 });
    setGalleryOpen(true);
  };

  const closeGallery = () => {
    setGalleryOpen(false);
    setGalleryZoomScale(1);
    setDragPos({ x: 0, y: 0 });
    setIsDragging(false);
  };

  const nextGalleryImage = () => {
    setGalleryIndex((prev) => (prev + 1) % galleryImages.length);
    setGalleryZoomScale(1);
    setDragPos({ x: 0, y: 0 });
  };

  const prevGalleryImage = () => {
    setGalleryIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
    setGalleryZoomScale(1);
    setDragPos({ x: 0, y: 0 });
  };

  const handleZoomIn = () => {
    setGalleryZoomScale((prev) => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setGalleryZoomScale((prev) => {
      const next = Math.max(prev - 0.5, 1);
      if (next === 1) setDragPos({ x: 0, y: 0 });
      return next;
    });
  };

  const handleToggleZoom = () => {
    setGalleryZoomScale((prev) => {
      const next = prev === 1 ? 2 : 1;
      if (next === 1) setDragPos({ x: 0, y: 0 });
      return next;
    });
  };

  // Drag / Pan handlers for zoomed gallery image
  const handleMouseDown = (e: React.MouseEvent) => {
    if (galleryZoomScale <= 1) return;
    e.preventDefault();
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX - dragPos.x,
      y: e.clientY - dragPos.y,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || galleryZoomScale <= 1) return;
    e.preventDefault();
    setDragPos({
      x: e.clientX - dragStartRef.current.x,
      y: e.clientY - dragStartRef.current.y,
    });
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  const handleGalleryTouchStart = (e: React.TouchEvent) => {
    if (galleryZoomScale <= 1) return;
    if (e.touches.length === 1) {
      setIsDragging(true);
      dragStartRef.current = {
        x: e.touches[0].clientX - dragPos.x,
        y: e.touches[0].clientY - dragPos.y,
      };
    }
  };

  const handleGalleryTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || galleryZoomScale <= 1) return;
    if (e.touches.length === 1) {
      setDragPos({
        x: e.touches[0].clientX - dragStartRef.current.x,
        y: e.touches[0].clientY - dragStartRef.current.y,
      });
    }
  };

  const handleGalleryTouchEnd = () => {
    setIsDragging(false);
  };

  // Keyboard navigation & body scroll locking for gallery modal
  useEffect(() => {
    if (!galleryOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeGallery();
      } else if (e.key === 'ArrowRight') {
        nextGalleryImage();
      } else if (e.key === 'ArrowLeft') {
        prevGalleryImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [galleryOpen, galleryImages.length]);

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

  // Touch swipe gesture handlers for loop sliding & tap to open gallery
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const deltaX = touchStartX.current - touchEndX.current;
    if (deltaX > 40) {
      // Swiped left -> Loop to next image
      setSelectedSlide((prev) => (prev + 1) % images.length);
    } else if (deltaX < -40) {
      // Swiped right -> Loop to previous image
      setSelectedSlide((prev) => (prev - 1 + images.length) % images.length);
    } else if (Math.abs(deltaX) <= 10) {
      // Finger tap -> Open popup gallery
      openGallery(selectedSlide);
    }
  };

  const toggleAccordion = (key: string) => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

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

  return (
    <div className="w-full flex flex-col bg-[#fcf9f4] min-h-screen text-[#1c1c19] relative pb-24 lg:pb-0">
      
      {/* GALLERY Popup Modal (Matching screenshot UI) */}
      {galleryOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#FFFFFF] flex flex-col justify-between overflow-hidden animate-in fade-in duration-200 select-none"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeGallery();
          }}
        >
          {/* Header Bar */}
          <div className="relative flex items-center justify-center px-6 py-4 border-b border-[#E9DFD2]/50 bg-white shrink-0 z-20">
            <h2 className="font-['EB_Garamond'] text-xl sm:text-2xl font-normal uppercase tracking-[0.2em] text-[#111111]">
              GALLERY
            </h2>
            <button
              type="button"
              onClick={closeGallery}
              style={{ backgroundColor: '#D34500' }}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#D34500] hover:bg-[#B94700] text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close Gallery"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Main Image Stage */}
          <div className="flex-1 relative flex items-center justify-center p-4 sm:p-8 bg-[#fcfbf9] overflow-hidden">
            {/* Left Chevron Button */}
            <button
              type="button"
              onClick={prevGalleryImage}
              className="w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#111111] shadow-md flex items-center justify-center absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 transition-all cursor-pointer hover:scale-105 active:scale-95"
              aria-label="Previous image"
            >
              <span className="material-symbols-outlined text-[24px]">chevron_left</span>
            </button>

            {/* Image Container Window - Scales responsively with image zoom level */}
            <div
              className="relative max-h-full max-w-full flex items-center justify-center touch-none select-none"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUpOrLeave}
              onMouseLeave={handleMouseUpOrLeave}
              onTouchStart={handleGalleryTouchStart}
              onTouchMove={handleGalleryTouchMove}
              onTouchEnd={handleGalleryTouchEnd}
              style={{
                cursor: galleryZoomScale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default',
                transform: `translate(${dragPos.x}px, ${dragPos.y}px) scale(${galleryZoomScale})`,
                transformOrigin: 'center center',
                transition: isDragging ? 'none' : 'transform 150ms ease-out',
                willChange: 'transform',
              }}
            >
              <img
                src={galleryImages[galleryIndex]}
                alt={`${product.name} gallery view ${galleryIndex + 1}`}
                className="max-h-[62vh] sm:max-h-[72vh] max-w-[85vw] object-contain select-none pointer-events-none"
              />
            </div>

            {/* Right Chevron Button */}
            <button
              type="button"
              onClick={nextGalleryImage}
              className="w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#111111] shadow-md flex items-center justify-center absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 transition-all cursor-pointer hover:scale-105 active:scale-95"
              aria-label="Next image"
            >
              <span className="material-symbols-outlined text-[24px]">chevron_right</span>
            </button>

            {/* Bottom Line/Dash Slide Indicators */}
            <div className="absolute bottom-4 inset-x-0 flex items-center justify-center gap-1.5 z-20">
              {galleryImages.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setGalleryIndex(idx);
                    setGalleryZoomScale(1);
                    setDragPos({ x: 0, y: 0 });
                  }}
                  className={`h-[2px] transition-all cursor-pointer ${
                    galleryIndex === idx
                      ? 'w-5 sm:w-6 bg-[#D34500]'
                      : 'w-2.5 sm:w-3 bg-[#E5E5E5] hover:bg-[#CCCCCC]'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Bottom Zoom Control Toolbar */}
          <div className="py-4 bg-white border-t border-[#E9DFD2]/50 flex items-center justify-center gap-4 shrink-0 z-20">
            <button
              type="button"
              onClick={handleZoomOut}
              disabled={galleryZoomScale <= 1}
              className="w-10 h-10 rounded-full bg-[#F3F3F3] hover:bg-[#E5E5E5] disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-[#111111] transition-colors cursor-pointer"
              aria-label="Zoom Out"
            >
              <span className="material-symbols-outlined text-[20px]">remove</span>
            </button>
            <button
              type="button"
              onClick={handleToggleZoom}
              className="w-10 h-10 rounded-full bg-[#F3F3F3] hover:bg-[#E5E5E5] flex items-center justify-center text-[#111111] transition-colors cursor-pointer"
              aria-label="Toggle Fit or Zoom"
            >
              <span className="material-symbols-outlined text-[20px]">search</span>
            </button>
            <button
              type="button"
              onClick={handleZoomIn}
              disabled={galleryZoomScale >= 3}
              className="w-10 h-10 rounded-full bg-[#F3F3F3] hover:bg-[#E5E5E5] disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-[#111111] transition-colors cursor-pointer"
              aria-label="Zoom In"
            >
              <span className="material-symbols-outlined text-[20px]">add</span>
            </button>
          </div>
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
              onClick={() => {
                setSelectSizeSheetOpen(false);
                if (selectedSize) {
                  onAddToCart(product, selectedShade, selectedSize);
                }
              }}
              style={{ backgroundColor: '#D34500' }}
              className="w-full mt-4 py-3.5 bg-[#D34500] hover:bg-[#b93c00] text-white font-['Manrope'] text-xs uppercase tracking-[0.2em] font-bold transition-colors cursor-pointer"
            >
              {selectedSize ? `ADD TO BAG — SIZE ${selectedSize}` : 'CONFIRM SELECTION'}
            </button>
          </div>
        </div>
      )}

      {/* STICKY BOTTOM BUTTON (Appears when scrolling down until inline button is in view) */}
      {!isInlineButtonVisible && (
        <div className="fixed bottom-0 inset-x-0 z-40 bg-[#FFFFFF] text-[#111111] border-t border-[#E9DFD2] shadow-2xl animate-in slide-in-from-bottom duration-300 h-[65px] flex items-center">
          <div className="w-full max-w-[1600px] mx-auto px-4 flex items-center justify-between gap-4 h-full">
            <div className="hidden sm:flex items-center gap-3 min-w-0">
              <img src={product.image} alt={product.name} className="w-10 h-10 object-cover border border-[#E9DFD2]" />
              <div className="min-w-0 font-['Manrope'] text-left">
                <p className="text-xs text-[#111111] uppercase tracking-wider font-semibold truncate">{product.name}</p>
                <p className="text-[11px] text-[#B94700] font-bold">₹{product.price.toLocaleString('en-IN')}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleMainAction}
              style={{
                backgroundColor: '#D34500',
              }}
              className="w-full sm:w-auto sm:min-w-[280px] h-11 bg-[#D34500] hover:bg-[#b93c00] text-white font-['Manrope'] text-xs uppercase tracking-[0.2em] font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
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
            <div
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onClick={() => openGallery(selectedSlide)}
              className="lg:hidden relative w-full overflow-hidden bg-[#f0ede9] shadow-sm select-none cursor-pointer"
            >
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
                <span className="bg-[#FFFFFF] text-[#D34500] border border-[#E9DFD2] font-['Manrope'] text-[9px] uppercase px-2.5 py-[3px] tracking-widest font-bold shadow-xs">
                  NEW IN
                </span>
              </div>

              <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleWishlist(product);
                  }}
                  className="w-9 h-9 bg-transparent text-[#111111] flex items-center justify-center cursor-pointer drop-shadow-xs"
                >
                  <span className={`material-symbols-outlined text-[21px] ${saved ? 'text-[#B94700]' : ''}`}>
                    {saved ? 'favorite' : 'favorite_border'}
                  </span>
                </button>
              </div>

              {/* Slide Counter Dots (Numbering span deleted) */}
              <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-center">
                <div className="flex items-center gap-1.5 bg-[#111111]/30 backdrop-blur-xs px-3 py-1.5 rounded-full">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedSlide(i);
                      }}
                      className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                        selectedSlide === i ? 'bg-[#D34500] w-4' : 'bg-white/80'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Desktop 2-Column Grid Gallery (Matching Screenshot) */}
            <div className="hidden lg:grid lg:grid-cols-2 gap-2">
              {(images.length >= 6 ? images : [...images, ...images, ...images].slice(0, 6)).map((img, i) => (
                <div
                  key={i}
                  onClick={() => openGallery(i)}
                  className="relative w-full aspect-[3/4] bg-[#f0ede9] group overflow-hidden border border-[#E9DFD2]/60 cursor-pointer"
                >
                  <img
                    src={img}
                    alt={`${product.name} view ${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {i === 0 && (
                    <span className="absolute top-3 left-3 bg-[#FFFFFF] text-[#111111] border border-[#E9DFD2] font-['Manrope'] text-[9px] uppercase px-2.5 py-[3px] tracking-widest font-semibold shadow-xs">
                      NEW IN
                    </span>
                  )}
                  {i === 0 && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWishlist(product);
                      }}
                      className="absolute top-3 right-3 bg-transparent p-1.5 text-[#111111] hover:text-[#B94700] transition-colors cursor-pointer drop-shadow-xs"
                    >
                      <span className={`material-symbols-outlined text-[20px] ${saved ? 'text-[#B94700]' : ''}`}>
                        {saved ? 'favorite' : 'favorite_border'}
                      </span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Product Details Lockup (Screenshot 1) */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="lg:sticky lg:top-20 space-y-6 flex flex-col font-['Manrope']">
              
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

              {/* Main Inline Action Button Container */}
              <div ref={inlineButtonRef} className="pt-2">
                <button
                  type="button"
                  onClick={handleMainAction}
                  style={{ backgroundColor: '#D34500' }}
                  className="w-full h-12 bg-[#D34500] hover:bg-[#b93c00] text-white font-['Manrope'] text-xs uppercase tracking-[0.2em] font-bold transition-colors shadow-sm flex items-center justify-center cursor-pointer"
                >
                  {selectedSize ? 'ADD TO BAG' : 'SELECT SIZE'}
                </button>
              </div>

              {/* Clean Luxury Accordions */}
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

              {/* Embedded SHOP THE LOOK inside Right Sidebar on PC (Matching Screenshot) */}
              <div className="pt-6 border-t border-[#E9DFD2] mt-6">
                <div className="text-center mb-4">
                  <h2 className="font-['EB_Garamond'] text-2xl text-[#111111] font-normal uppercase tracking-[0.15em] mb-1">
                    SHOP THE LOOK
                  </h2>
                  <p className="font-['Manrope'] text-xs tracking-widest text-[#57534E]">
                    {shopLookIndex + 1} / {shopTheLookItems.length}
                  </p>
                </div>

                {(() => {
                  const currentItem = shopTheLookItems[shopLookIndex] || shopTheLookItems[0];
                  return (
                    <div className="relative max-w-sm mx-auto">
                      <div className="aspect-[3/4] bg-[#f4f2ee] relative overflow-hidden group">
                        <img
                          src={currentItem.image}
                          alt={currentItem.name}
                          className="w-full h-full object-cover cursor-pointer group-hover:scale-105 transition-transform duration-500"
                          onClick={() => onNavigate('product')}
                        />
                        <span className="absolute top-3 left-3 bg-white text-[#111111] text-[9px] uppercase tracking-widest font-semibold px-2 py-0.5 shadow-xs">
                          NEW IN
                        </span>
                        <button
                          type="button"
                          onClick={() => onToggleWishlist(currentItem)}
                          className="absolute top-3 right-3 bg-transparent p-1 text-[#111111] hover:text-[#B94700] cursor-pointer drop-shadow-xs"
                          aria-label="Wishlist"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            {isWishlisted(currentItem.id) ? 'favorite' : 'favorite_border'}
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setShopLookIndex((prev) => (prev === 0 ? shopTheLookItems.length - 1 : prev - 1))}
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-white text-[#111111] flex items-center justify-center text-sm hover:bg-[#FAF8F5] cursor-pointer shadow-xs border border-r-0 border-[#E9DFD2] z-10"
                          aria-label="Previous item"
                        >
                          ←
                        </button>
                        <button
                          type="button"
                          onClick={() => setShopLookIndex((prev) => (prev === shopTheLookItems.length - 1 ? 0 : prev + 1))}
                          className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-white text-[#111111] flex items-center justify-center text-sm hover:bg-[#FAF8F5] cursor-pointer shadow-xs border border-l-0 border-[#E9DFD2] z-10"
                          aria-label="Next item"
                        >
                          →
                        </button>
                      </div>

                      <div className="flex items-center justify-between pt-3 px-1">
                        <h3
                          onClick={() => onNavigate('product')}
                          className="font-['EB_Garamond'] text-base text-[#111111] font-normal cursor-pointer hover:text-[#B94700] transition-colors"
                        >
                          {currentItem.name}
                        </h3>
                        <button
                          type="button"
                          onClick={() => onAddToCart(currentItem, currentItem.shades[0]?.name || 'Standard', currentItem.sizes[0]?.label || 'Standard')}
                          className="text-[#111111] hover:text-[#B94700] p-1 cursor-pointer transition-colors"
                          aria-label="Add to cart"
                        >
                          <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                        </button>
                      </div>
                    </div>
                  );
                })()}
              </div>

            </div>
          </div>
        </div>
      </section>



      {/* YOU MAY ALSO LIKE / RECENTLY VIEWED Tabbed Carousel Section */}
      <section className="w-full py-12 md:py-16 px-4 md:px-8 lg:px-16 max-w-[1600px] mx-auto font-['Manrope'] relative">
        {/* Header Tabs */}
        <div className="w-full border-b border-[#E5E5E5] mb-8">
          <div className="flex items-center justify-center gap-8 md:gap-12 max-w-xl mx-auto text-center">
            <button
              type="button"
              onClick={() => setActiveRecommendationTab('you-may-like')}
              className={`pb-3 text-xs sm:text-sm md:text-base tracking-[0.2em] uppercase font-bold transition-colors relative border-b-2 ${
                activeRecommendationTab === 'you-may-like'
                  ? 'text-[#111111] border-[#111111] -mb-[1px]'
                  : 'text-[#888888] border-transparent hover:text-[#111111]'
              }`}
            >
              YOU MAY ALSO LIKE
            </button>
            <button
              type="button"
              onClick={() => setActiveRecommendationTab('recently-viewed')}
              className={`pb-3 text-xs sm:text-sm md:text-base tracking-[0.2em] uppercase font-bold transition-colors relative border-b-2 ${
                activeRecommendationTab === 'recently-viewed'
                  ? 'text-[#111111] border-[#111111] -mb-[1px]'
                  : 'text-[#888888] border-transparent hover:text-[#111111]'
              }`}
            >
              RECENTLY VIEWED
            </button>
          </div>
        </div>

        {/* Carousel Container with PC Arrow Controls */}
        <div className="relative group/rec">
          {/* PC Left Arrow Icon */}
          <button
            type="button"
            onClick={scrollRecommendationsLeft}
            className="hidden lg:flex absolute -left-3 lg:-left-5 top-[38%] -translate-y-1/2 w-8 h-8 bg-white border border-[#E9DFD2] items-center justify-center text-[#111111] shadow-xs z-10 hover:bg-[#FAF8F5] cursor-pointer"
            aria-label="Scroll left"
          >
            ←
          </button>

          {/* Horizontal Scrollable Row */}
          <div
            ref={recommendationCarouselRef}
            className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-4 sm:gap-6 no-scrollbar pb-4"
          >
            {(activeRecommendationTab === 'you-may-like' ? PRODUCTS : [...PRODUCTS].reverse()).map((item) => (
              <div
                key={item.id}
                className="w-[260px] sm:w-[300px] lg:w-[calc(25%-18px)] shrink-0 snap-start group cursor-pointer flex flex-col justify-between"
                onClick={() => onNavigate('product')}
              >
                <div className="w-full aspect-[3/4] bg-[#f4f2ee] overflow-hidden mb-3 relative shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-2.5 left-2.5 bg-white text-[#111111] text-[8px] uppercase tracking-widest font-semibold px-2 py-0.5 shadow-xs">
                    NEW IN
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(item);
                    }}
                    className="absolute top-2.5 right-2.5 bg-transparent p-1.5 text-[#111111] hover:text-[#B94700] cursor-pointer drop-shadow-xs"
                    aria-label="Wishlist"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {isWishlisted(item.id) ? 'favorite' : 'favorite_border'}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(item, item.shades[0]?.name || 'Standard', item.sizes[0]?.label || 'Standard');
                    }}
                    className="absolute bottom-2.5 right-2.5 w-7 h-7 bg-white text-[#111111] flex items-center justify-center hover:bg-[#111111] hover:text-white transition-colors cursor-pointer shadow-xs border border-[#E9DFD2]"
                    aria-label="Add to cart"
                  >
                    <span className="material-symbols-outlined text-[16px]">shopping_bag</span>
                  </button>
                </div>

                <div>
                  <h3 className="font-['EB_Garamond'] text-sm sm:text-base text-[#111111] font-normal leading-snug line-clamp-1">
                    {item.name}
                  </h3>
                  <p className="font-['EB_Garamond'] text-xs sm:text-sm text-[#111111] font-semibold mt-1">
                    ₹ {item.price.toLocaleString('en-IN')}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* PC Right Arrow Icon */}
          <button
            type="button"
            onClick={scrollRecommendationsRight}
            className="hidden lg:flex absolute -right-3 lg:-right-5 top-[38%] -translate-y-1/2 w-8 h-8 bg-white border border-[#E9DFD2] items-center justify-center text-[#111111] shadow-xs z-10 hover:bg-[#FAF8F5] cursor-pointer"
            aria-label="Scroll right"
          >
            →
          </button>
        </div>
      </section>

      {/* Breadcrumb Bar at bottom (Screenshot 1) */}
      <div className="w-full bg-[#FAF8F5] py-4 border-t border-b border-[#E9DFD2] font-['Manrope'] text-[10px] uppercase tracking-widest text-[#57534E] text-center">
        <span>CYOF</span> | <span>{product.category.toUpperCase()}</span> | <span className="text-[#111111] font-bold">{product.name.toUpperCase()}</span>
      </div>



    </div>
  );
};
