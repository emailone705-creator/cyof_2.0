import React, { useState, useRef } from 'react';
import { Product, ViewRoute } from '../types';
import { PRODUCTS } from '../data/mockData';

interface ShopViewProps {
  initialCategory?: string;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: (productId: string) => boolean;
  onNavigate: (route: ViewRoute) => void;
}

interface ShopProductCardProps {
  product: Product;
  saved: boolean;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
}

const ShopProductCard: React.FC<ShopProductCardProps> = ({
  product,
  saved,
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
}) => {
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  // Determine primary & secondary images for slide thumbnail
  const productImages = product.images && product.images.length > 1
    ? product.images.slice(0, 2)
    : [product.image, product.images?.[1] || product.image];

  const badgeText = product.badges && product.badges.length > 0 ? product.badges[0] : 'NEW IN';

  // Touch swipe gesture handlers for image sliding
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const deltaX = touchStartX.current - touchEndX.current;
    if (deltaX > 30) {
      // Swiped left -> show 2nd image
      setActiveImgIndex(1);
    } else if (deltaX < -30) {
      // Swiped right -> show 1st image
      setActiveImgIndex(0);
    }
  };

  // PC Cursor drag & hover movement handlers
  const isMouseDownRef = useRef(false);
  const mouseDownXRef = useRef(0);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isMouseDownRef.current = true;
    mouseDownXRef.current = e.clientX;
  };

  const handleMouseUp = () => {
    isMouseDownRef.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;

    if (isMouseDownRef.current) {
      const dragDelta = mouseDownXRef.current - e.clientX;
      if (dragDelta > 15) {
        setActiveImgIndex(1);
      } else if (dragDelta < -15) {
        setActiveImgIndex(0);
      }
    } else {
      if (x > rect.width * 0.5) {
        setActiveImgIndex(1);
      } else {
        setActiveImgIndex(0);
      }
    }
  };

  const handleMouseLeave = () => {
    isMouseDownRef.current = false;
    // Keep 2nd image persistent when mouse leaves until user drags cursor again
  };

  return (
    <article className="flex flex-col group">
      {/* 3:4 Aspect Ratio Product Image Container */}
      <div
        className="relative w-full aspect-[3/4] bg-[#f4f2ee] overflow-hidden mb-3 select-none cursor-pointer"
        onClick={() => onSelectProduct(product)}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Top Badge (Upper Left) */}
        <span className="absolute top-3 left-3 font-['Manrope'] text-[9px] uppercase tracking-[0.2em] text-[#57534E] font-medium z-10 pointer-events-none">
          {badgeText}
        </span>

        {/* Wishlist Heart Icon (Upper Right) */}
        <button
          type="button"
          aria-label="Save to Wishlist"
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className="absolute top-2.5 right-2.5 p-1 bg-transparent text-[#111111] hover:text-[#B94700] transition-colors cursor-pointer z-10"
        >
          <span className={`material-symbols-outlined text-[20px] ${saved ? 'text-[#B94700]' : ''}`}>
            {saved ? 'favorite' : 'favorite_border'}
          </span>
        </button>

        {/* Sliding 2-Image Track */}
        <div
          className="w-full h-full flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${activeImgIndex * 100}%)` }}
        >
          <img
            src={productImages[0]}
            alt={`${product.name} view 1`}
            className="w-full h-full object-cover shrink-0"
          />
          <img
            src={productImages[1]}
            alt={`${product.name} view 2`}
            className="w-full h-full object-cover shrink-0"
          />
        </div>

        {/* Interactive Horizontal Line / Dash Indicators (Segment 1 & Segment 2) */}
        <div className="absolute bottom-3 inset-x-0 flex justify-center items-center gap-1.5 z-10">
          <button
            type="button"
            aria-label="View primary image"
            onClick={(e) => {
              e.stopPropagation();
              setActiveImgIndex(0);
            }}
            className={`h-[2.5px] transition-all duration-300 rounded-full cursor-pointer ${
              activeImgIndex === 0 ? 'w-6 bg-[#111111]' : 'w-4 bg-[#111111]/30 hover:bg-[#111111]/60'
            }`}
          />
          <button
            type="button"
            aria-label="View secondary image"
            onClick={(e) => {
              e.stopPropagation();
              setActiveImgIndex(1);
            }}
            className={`h-[2.5px] transition-all duration-300 rounded-full cursor-pointer ${
              activeImgIndex === 1 ? 'w-6 bg-[#111111]' : 'w-4 bg-[#111111]/30 hover:bg-[#111111]/60'
            }`}
          />
        </div>
      </div>

      {/* Product Title & Shopping Bag Icon Row */}
      <div className="flex items-start justify-between gap-2">
        <h2
          onClick={() => onSelectProduct(product)}
          className="font-['EB_Garamond'] text-base sm:text-lg text-[#111111] font-normal leading-tight hover:text-[#B94700] transition-colors cursor-pointer line-clamp-2"
        >
          {product.name}
        </h2>

        <button
          type="button"
          aria-label="Add to bag"
          onClick={() => onAddToCart(product)}
          className="text-[#111111] hover:text-[#B94700] transition-colors p-0.5 cursor-pointer shrink-0 mt-0.5"
        >
          <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
        </button>
      </div>

      {/* Price Display */}
      <div className="mt-1">
        <span className="font-['EB_Garamond'] text-sm sm:text-base text-[#111111] font-normal">
          ₹ {product.price.toLocaleString('en-IN')}
        </span>
      </div>

      {/* Color Swatches Below Price */}
      {product.shades && product.shades.length > 0 && (
        <div className="flex items-center gap-1.5 mt-2">
          {product.shades.map((shade) => (
            <span
              key={shade.name}
              className="w-3 h-3 rounded-full border border-black/20"
              style={{ backgroundColor: shade.color }}
              title={shade.name}
            />
          ))}
        </div>
      )}
    </article>
  );
};

export const ShopView: React.FC<ShopViewProps> = ({
  initialCategory = 'All Creations',
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onNavigate,
}) => {
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [sortBy, setSortBy] = useState('Curated');
  const [priceCeiling, setPriceCeiling] = useState(600000);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(12);

  const colors = [
    { label: 'Noir', hex: '#111111' },
    { label: 'Ecru Ivory', hex: '#F8F5F0' },
    { label: 'Tuscan Tan', hex: '#C5500C' },
    { label: 'Sienna', hex: '#B94700' },
    { label: 'Smoked Taupe', hex: '#57534E' },
    { label: 'Champagne', hex: '#E9DFD2' },
  ];

  const sizes = ['IT 36', 'IT 38', 'IT 40', 'IT 42', 'IT 44', 'IT 46'];

  // Expanded product list for multi-page grid feel matching the screenshot
  const displayProducts = [...PRODUCTS, ...PRODUCTS, ...PRODUCTS].map((p, idx) => ({
    ...p,
    id: `${p.id}-grid-${idx}`,
  }));

  // Filter products
  const filteredProducts = displayProducts.filter((p) => {
    if (activeCategory !== 'All Creations' && p.category !== activeCategory) {
      if (activeCategory === 'Women' || activeCategory === 'New Arrivals') return true;
      return false;
    }
    if (p.price > priceCeiling) return false;
    return true;
  });

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  return (
    <div className="w-full flex flex-col bg-[#ffffff] min-h-screen text-[#111111] font-['EB_Garamond']">
      
      {/* 1. Centered Editorial Category Header */}
      <section className="w-full pt-10 pb-6 px-4 md:px-8 max-w-[1400px] mx-auto text-center">
        <h1 className="font-['EB_Garamond'] text-2xl sm:text-3xl md:text-4xl text-[#111111] uppercase tracking-[0.15em] font-normal mb-3">
          WOMEN'S NEW ARRIVALS
        </h1>
        <p className="font-['EB_Garamond'] text-sm sm:text-base text-[#57534E] max-w-2xl mx-auto leading-relaxed">
          Women's new arrivals including{' '}
          <button onClick={() => setActiveCategory('Women')} className="underline underline-offset-2 hover:text-[#B94700]">
            clothing
          </button>
          ,{' '}
          <button onClick={() => setActiveCategory('Footwear')} className="underline underline-offset-2 hover:text-[#B94700]">
            shoes
          </button>
          ,{' '}
          <button onClick={() => setActiveCategory('Leather Goods')} className="underline underline-offset-2 hover:text-[#B94700]">
            bags
          </button>
          , and{' '}
          <button onClick={() => setActiveCategory('All Creations')} className="underline underline-offset-2 hover:text-[#B94700]">
            accessories
          </button>{' '}
          from the latest collection.
        </p>
      </section>

      {/* 2. Top Filter Bar (Count Left, FILTERS Button Right) */}
      <section className="w-full border-t border-b border-[#E9DFD2]/70 py-3.5 px-4 md:px-8 max-w-[1400px] mx-auto">
        <div className="flex items-center justify-between">
          <span className="font-['EB_Garamond'] text-base sm:text-lg text-[#111111] font-normal">
            {filteredProducts.length} Products
          </span>

          <button
            type="button"
            onClick={() => setFilterDrawerOpen(true)}
            className="flex items-center gap-2 font-['Manrope'] text-xs uppercase tracking-[0.2em] font-semibold text-[#111111] hover:text-[#B94700] transition-colors cursor-pointer"
          >
            <span>FILTERS</span>
            <span className="material-symbols-outlined text-[18px]">tune</span>
          </button>
        </div>
      </section>

      {/* 3. Product Article Grid with 2-Image Slide Thumbnails */}
      <section className="w-full px-2 sm:px-4 md:px-8 py-6 max-w-[1400px] mx-auto flex-1">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-3 sm:gap-x-6 gap-y-10 sm:gap-y-14">
          {visibleProducts.map((product) => {
            const saved = isWishlisted(product.id);
            return (
              <ShopProductCard
                key={product.id}
                product={product}
                saved={saved}
                onSelectProduct={onSelectProduct}
                onAddToCart={onAddToCart}
                onToggleWishlist={onToggleWishlist}
              />
            );
          })}
        </div>

        {/* 4. Bottom Load More Control & Counter */}
        <div className="pt-16 pb-12 flex flex-col items-center justify-center text-center">
          <p className="font-['EB_Garamond'] text-sm text-[#57534E] mb-4">
            {visibleProducts.length}/{filteredProducts.length}
          </p>

          {visibleCount < filteredProducts.length && (
            <button
              type="button"
              onClick={() => setVisibleCount((prev) => prev + 12)}
              className="border border-[#111111] px-10 py-3.5 font-['Manrope'] text-xs uppercase tracking-[0.2em] font-bold text-[#111111] hover:bg-[#111111] hover:text-white transition-colors cursor-pointer"
            >
              SHOW 12 MORE
            </button>
          )}

          {/* Bottom Breadcrumb Bar */}
          <nav aria-label="Breadcrumb" className="mt-16 pt-6 border-t border-[#E9DFD2]/60 w-full flex justify-center items-center gap-2 font-['Manrope'] text-[10px] uppercase tracking-widest text-[#57534E]">
            <button onClick={() => onNavigate('home')} className="hover:text-[#111111]">
              HOMEPAGE
            </button>
            <span>|</span>
            <button onClick={() => setActiveCategory('Women')} className="hover:text-[#111111]">
              WOMEN
            </button>
            <span>|</span>
            <span className="text-[#111111] font-bold">WOMEN'S NEW ARRIVALS</span>
          </nav>
        </div>
      </section>

      {/* 5. Filter & Sort Overlay Drawer */}
      {filterDrawerOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#111111]/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200"
          onClick={() => setFilterDrawerOpen(false)}
        >
          <div
            className="w-full max-w-md bg-white h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300 font-['Manrope']"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              {/* Drawer Title & Close */}
              <div className="flex items-center justify-between pb-4 border-b border-[#E9DFD2] mb-6">
                <span className="font-['EB_Garamond'] text-2xl uppercase tracking-wider text-[#111111]">
                  FILTERS
                </span>
                <button
                  type="button"
                  onClick={() => setFilterDrawerOpen(false)}
                  className="w-8 h-8 flex items-center justify-center text-[#111111] hover:text-[#B94700]"
                >
                  <span className="material-symbols-outlined text-[24px]">close</span>
                </button>
              </div>

              {/* Sort Order */}
              <div className="space-y-3 mb-6">
                <label className="text-xs uppercase tracking-widest text-[#57534E] font-bold block">
                  Sort Order
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'Curated', label: 'Curated' },
                    { id: 'Newest', label: 'Newest' },
                    { id: 'HighLow', label: 'Price High-Low' },
                    { id: 'LowHigh', label: 'Price Low-High' },
                  ].map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSortBy(s.id)}
                      className={`py-2.5 px-3 text-center uppercase tracking-wider text-[10px] font-semibold transition-colors border ${
                        sortBy === s.id
                          ? 'bg-[#111111] text-white border-[#111111]'
                          : 'bg-white text-[#111111] border-[#E9DFD2] hover:border-[#111111]'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div className="space-y-3 mb-6">
                <span className="text-xs uppercase tracking-widest text-[#57534E] font-bold block">
                  Color Tone
                </span>
                <div className="flex flex-wrap gap-2">
                  {colors.map((c) => (
                    <button
                      key={c.label}
                      type="button"
                      onClick={() => setSelectedColor(selectedColor === c.label ? null : c.label)}
                      className={`px-3 py-1.5 flex items-center gap-2 border text-[10px] uppercase font-semibold transition-colors ${
                        selectedColor === c.label
                          ? 'bg-[#111111] text-white border-[#111111]'
                          : 'bg-white text-[#111111] border-[#E9DFD2] hover:border-[#111111]'
                      }`}
                    >
                      <span className="w-2.5 h-2.5 rounded-full border border-black/20" style={{ backgroundColor: c.hex }} />
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="space-y-3 mb-6">
                <span className="text-xs uppercase tracking-widest text-[#57534E] font-bold block">
                  Italian Sizing
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {sizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSelectedSize(selectedSize === s ? null : s)}
                      className={`py-2 text-center uppercase tracking-wider text-[10px] font-semibold transition-colors border ${
                        selectedSize === s
                          ? 'bg-[#111111] text-white border-[#111111]'
                          : 'bg-white text-[#111111] border-[#E9DFD2] hover:border-[#111111]'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Ceiling */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-xs uppercase tracking-widest text-[#57534E] font-bold">
                    Price Ceiling
                  </span>
                  <span className="font-bold text-[#111111] text-xs">₹{priceCeiling.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min="50000"
                  max="800000"
                  step="25000"
                  value={priceCeiling}
                  onChange={(e) => setPriceCeiling(Number(e.target.value))}
                  className="w-full accent-[#D34500]"
                />
              </div>
            </div>

            {/* Bottom Drawer Actions */}
            <div className="pt-4 border-t border-[#E9DFD2] flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setSelectedColor(null);
                  setSelectedSize(null);
                  setPriceCeiling(800000);
                  setSortBy('Curated');
                }}
                className="w-1/3 py-3.5 text-center border border-[#111111] font-['Manrope'] text-[10px] uppercase tracking-widest text-[#111111] font-bold hover:bg-[#FAF8F5]"
              >
                CLEAR
              </button>
              <button
                type="button"
                onClick={() => setFilterDrawerOpen(false)}
                className="w-2/3 py-3.5 text-center bg-[#D34500] hover:bg-[#b93c00] font-['Manrope'] text-xs uppercase tracking-widest text-white font-bold transition-colors cursor-pointer"
              >
                APPLY ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sticky Bottom Floating Action Button: Filter & Sort */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
        <button
          type="button"
          onClick={() => setFilterDrawerOpen(true)}
          style={{ width: '215.5px', height: '44px' }}
          className="flex items-center justify-center gap-2.5 bg-[#111111] text-white rounded-full shadow-2xl hover:bg-[#D34500] active:scale-95 transition-all cursor-pointer border border-white/20"
        >
          <span className="material-symbols-outlined text-[18px]">tune</span>
          <span className="font-['Manrope'] text-xs uppercase tracking-[0.15em] font-bold">
            FILTER & SORT
          </span>
          <span className="w-4 h-4 bg-[#D34500] text-white font-['Manrope'] text-[9px] rounded-full flex items-center justify-center font-bold">
            {filteredProducts.length}
          </span>
        </button>
      </div>

    </div>
  );
};
