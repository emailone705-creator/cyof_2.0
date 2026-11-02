import React, { useState } from 'react';
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

export const ShopView: React.FC<ShopViewProps> = ({
  initialCategory = 'All Creations',
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onNavigate,
}) => {
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('Curated');
  const [priceCeiling, setPriceCeiling] = useState(400000);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const categories = [
    { name: 'All Creations', count: 48 },
    { name: 'Outerwear', count: 14 },
    { name: 'Tailoring', count: 10 },
    { name: 'Silk Dresses', count: 8 },
    { name: 'Leather Goods', count: 11 },
    { name: 'Footwear', count: 5 },
  ];

  const colors = [
    { label: 'Noir', hex: '#111111' },
    { label: 'Ecru Ivory', hex: '#F8F5F0' },
    { label: 'Tuscan Tan', hex: '#C5500C' },
    { label: 'Sienna', hex: '#B94700' },
    { label: 'Smoked Taupe', hex: '#57534E' },
    { label: 'Champagne', hex: '#E9DFD2' },
  ];

  const sizes = ['IT 36', 'IT 38', 'IT 40', 'IT 42', 'IT 44', 'IT 46'];

  // Filter products
  const filteredProducts = PRODUCTS.filter((p) => {
    if (activeCategory !== 'All Creations' && p.category !== activeCategory) {
      if (activeCategory === 'Women' || activeCategory === 'New Arrivals') return true;
      return false;
    }
    if (p.price > priceCeiling) return false;
    return true;
  });

  return (
    <div className="w-full flex flex-col bg-[#fcf9f4] min-h-screen">
      {/* Category Header Section */}
      <section className="w-full px-4 md:px-8 lg:px-16 pt-8 pb-6 border-b border-[#E9DFD2]">
        <div className="max-w-[1600px] mx-auto">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" class-name="breadcrumb" className="flex items-center gap-2 text-xs text-[#57534E] mb-4 font-['Manrope']">
            <button onClick={() => onNavigate('home')} className="uppercase tracking-widest hover:text-[#111111] transition-colors cursor-pointer">
              HOME
            </button>
            <span className="text-[#E9DFD2]">/</span>
            <span className="uppercase tracking-widest hover:text-[#111111] cursor-pointer">WOMEN</span>
            <span className="text-[#E9DFD2]">/</span>
            <span className="uppercase tracking-widest text-[#111111] font-semibold">AUTUMN / WINTER 2026</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-6">
            <div>
              <h1 className="font-['EB_Garamond'] text-4xl sm:text-5xl lg:text-6xl text-[#111111] tracking-tight font-normal">
                Autumn <span className="italic font-light text-[#9e3d00]">/</span> Winter 2026
              </h1>
              <p className="font-['Manrope'] text-xs sm:text-sm text-[#57534E] mt-2 max-w-xl leading-relaxed">
                Architectural silhouettes, brushed double-faced cashmere, and sculptural calfskin bags crafted in our Florence atelier. #CraftedYourOwnFashion
              </p>
            </div>
            <div className="flex items-center gap-2 font-['Manrope'] text-xs uppercase tracking-widest text-[#57534E]">
              <span>CATALOG:</span>
              <span className="font-bold text-[#111111]">{filteredProducts.length} CREATIONS</span>
            </div>
          </div>

          {/* Horizontal Category Rail */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2 -mx-4 px-4 md:-mx-8 md:px-8 lg:mx-0 lg:px-0">
            {categories.map((cat) => {
              const active = activeCategory === cat.name;
              return (
                <button
                  key={cat.name}
                  onClick={() => setActiveCategory(cat.name)}
                  className={`whitespace-nowrap px-4 py-2 font-['Manrope'] text-[11px] uppercase tracking-wider transition-all cursor-pointer ${
                    active
                      ? 'bg-[#111111] text-white font-semibold shadow-sm'
                      : 'bg-[#ebe8e3] text-[#111111] hover:bg-[#e5e2dd]'
                  }`}
                >
                  {cat.name} ({cat.count})
                </button>
              );
            })}
          </div>

          {/* Active Filter Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-4">
            <span className="font-['Manrope'] text-[10px] uppercase tracking-widest text-[#57534E] mr-1">
              Active Filters:
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white text-[#111111] font-['Manrope'] text-[10px] uppercase tracking-wider border border-[#E9DFD2] shadow-xs">
              Category: {activeCategory}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white text-[#111111] font-['Manrope'] text-[10px] uppercase tracking-wider border border-[#E9DFD2] shadow-xs">
              Price ≤ ₹{priceCeiling.toLocaleString('en-IN')}
            </span>
            {selectedColor && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white text-[#111111] font-['Manrope'] text-[10px] uppercase tracking-wider border border-[#E9DFD2] shadow-xs">
                Color: {selectedColor}
                <button onClick={() => setSelectedColor(null)} className="text-[#57534E] hover:text-[#B94700]">×</button>
              </span>
            )}
            {selectedSize && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white text-[#111111] font-['Manrope'] text-[10px] uppercase tracking-wider border border-[#E9DFD2] shadow-xs">
                Size: {selectedSize}
                <button onClick={() => setSelectedSize(null)} className="text-[#57534E] hover:text-[#B94700]">×</button>
              </span>
            )}
            <button
              onClick={() => {
                setActiveCategory('All Creations');
                setPriceCeiling(500000);
                setSelectedColor(null);
                setSelectedSize(null);
              }}
              className="font-['Manrope'] text-[10px] text-[#B94700] uppercase underline tracking-wider ml-2 hover:text-[#111111] transition-colors cursor-pointer font-semibold"
            >
              Reset All
            </button>
          </div>
        </div>
      </section>

      {/* Main Grid & Desktop Sticky Sidebar */}
      <section className="w-full px-4 md:px-8 lg:px-16 py-8 pb-24 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Desktop Sidebar Filter (Sticky) */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-28 space-y-6 p-6 bg-[#f6f3ee] border border-[#E9DFD2] shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-[#E9DFD2]">
                <span className="font-['Manrope'] text-xs uppercase tracking-wider text-[#111111] font-bold">
                  Refine Catalog
                </span>
                <button
                  onClick={() => {
                    setSortBy('Curated');
                    setPriceCeiling(500000);
                    setSelectedColor(null);
                    setSelectedSize(null);
                  }}
                  className="font-['Manrope'] text-[10px] uppercase tracking-wider text-[#9e3d00] hover:underline cursor-pointer"
                >
                  Reset
                </button>
              </div>

              {/* Sort Selector */}
              <div className="space-y-2">
                <label className="font-['Manrope'] text-[10px] uppercase tracking-widest text-[#57534E] block font-semibold">
                  Sort Sequence
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full bg-white border border-[#E9DFD2] py-2.5 px-3 font-['Manrope'] text-xs text-[#111111] focus:outline-none focus:border-[#111111] shadow-xs cursor-pointer"
                >
                  <option value="Curated">Curated Editorial</option>
                  <option value="Newest">New Autumn Arrivals</option>
                  <option value="HighLow">Price: High to Low</option>
                  <option value="LowHigh">Price: Low to High</option>
                </select>
              </div>

              {/* Atelier Color Swatches */}
              <div className="space-y-2">
                <span className="font-['Manrope'] text-[10px] uppercase tracking-widest text-[#57534E] block font-semibold">
                  Atelier Palette
                </span>
                <div className="grid grid-cols-6 gap-2 pt-1">
                  {colors.map((c) => {
                    const active = selectedColor === c.label;
                    return (
                      <button
                        key={c.label}
                        type="button"
                        onClick={() => setSelectedColor(active ? null : c.label)}
                        className={`w-7 h-7 border transition-all cursor-pointer ${
                          active ? 'ring-2 ring-[#9e3d00] ring-offset-2' : 'border-[#E9DFD2] hover:scale-105'
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.label}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Italian Sizing */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-['Manrope'] text-[10px] uppercase tracking-widest text-[#57534E] block font-semibold">
                    Italian Sizing
                  </span>
                  <span className="font-['Manrope'] text-[9px] text-[#9e3d00] uppercase underline cursor-pointer">
                    Guide
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-1.5 pt-1">
                  {sizes.map((s) => {
                    const active = selectedSize === s;
                    return (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSelectedSize(active ? null : s)}
                        className={`py-1.5 text-center font-['Manrope'] text-[10px] uppercase tracking-wider transition-all cursor-pointer ${
                          active
                            ? 'bg-[#111111] text-white font-bold'
                            : 'bg-white hover:bg-[#E9DFD2] text-[#111111] border border-[#E9DFD2]'
                        }`}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price Scope Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-['Manrope'] text-[10px] uppercase tracking-widest text-[#57534E] font-semibold">
                    Price Ceiling
                  </span>
                  <span className="font-['Manrope'] text-xs font-semibold text-[#111111]">
                    ₹{priceCeiling.toLocaleString('en-IN')}
                  </span>
                </div>
                <input
                  type="range"
                  min="50000"
                  max="500000"
                  step="10000"
                  value={priceCeiling}
                  onChange={(e) => setPriceCeiling(Number(e.target.value))}
                  className="w-full accent-[#B94700] h-1.5 bg-[#E9DFD2] rounded-none cursor-pointer"
                />
                <div className="flex justify-between font-['Manrope'] text-[9px] text-[#57534E] uppercase">
                  <span>₹50,000</span>
                  <span>₹5,00,000+</span>
                </div>
              </div>

              {/* Availability Checkboxes */}
              <div className="space-y-2 pt-2 border-t border-[#E9DFD2] text-xs font-['Manrope']">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="accent-[#B94700]" />
                  <span className="text-[#111111]">Ready to Ship (24h)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="accent-[#B94700]" />
                  <span className="text-[#111111]">Salon Reservation Only</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="accent-[#B94700]" />
                  <span className="text-[#111111]">Made-to-Order Commission</span>
                </label>
              </div>

              <button
                onClick={() => {}}
                className="w-full py-3 bg-[#B94700] hover:bg-[#9e3d00] text-white font-['Manrope'] text-xs uppercase tracking-widest font-semibold shadow-md transition-colors cursor-pointer"
              >
                Apply Preferences
              </button>
            </div>
          </aside>

          {/* Product Listing Grid */}
          <div className="col-span-1 lg:col-span-9">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-10">
              {filteredProducts.map((product, idx) => {
                const saved = isWishlisted(product.id);
                return (
                  <React.Fragment key={product.id}>
                    {/* Mid-Grid Bento Editorial Monograph Break after 2nd product */}
                    {idx === 2 && (
                      <div className="col-span-2 md:col-span-3 bg-[#f0ede9] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-[#E9DFD2] shadow-sm my-2">
                        <div className="max-w-md space-y-2 text-left">
                          <span className="font-['Manrope'] text-[10px] uppercase tracking-widest text-[#B94700] font-bold">
                            Atelier Monograph Series
                          </span>
                          <h3 className="font-['EB_Garamond'] text-2xl md:text-3xl text-[#111111]">
                            Double-Faced Cashmere Origin
                          </h3>
                          <p className="font-['Manrope'] text-xs text-[#57534E] leading-relaxed">
                            Hand-split edges, invisibly blind-stitched by five master artisans in our Biella manufacture. Designed to withstand seasons of quiet dignity.
                          </p>
                        </div>
                        <button
                          onClick={() => onNavigate('article')}
                          className="px-6 py-3 bg-[#111111] text-white font-['Manrope'] text-xs uppercase tracking-widest hover:bg-[#B94700] transition-colors shadow-md whitespace-nowrap cursor-pointer"
                        >
                          Explore The Monograph
                        </button>
                      </div>
                    )}

                    {/* Standard 4:5 Product Card */}
                    <article className="flex flex-col group relative bg-white p-3 border border-[#E9DFD2]/60 shadow-xs hover:shadow-md transition-shadow">
                      <div className="relative w-full aspect-[4/5] bg-[#f0ede9] overflow-hidden mb-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          onClick={() => onSelectProduct(product)}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 cursor-pointer"
                        />
                        {product.badges && product.badges.length > 0 && (
                          <span className="absolute top-2 left-2 bg-[#111111]/90 text-white font-['Manrope'] text-[9px] uppercase px-2 py-0.5 tracking-widest font-semibold">
                            {product.badges[0]}
                          </span>
                        )}
                        <button
                          type="button"
                          aria-label="Save to Wishlist"
                          onClick={() => onToggleWishlist(product)}
                          className="absolute top-2 right-2 w-9 h-9 rounded-full bg-white/85 backdrop-blur-md flex items-center justify-center text-[#111111] hover:text-[#B94700] transition-colors cursor-pointer shadow-xs"
                        >
                          <span className={`material-symbols-outlined text-[18px] ${saved ? 'text-[#B94700]' : ''}`}>
                            {saved ? 'favorite' : 'favorite_border'}
                          </span>
                        </button>

                        {/* Quick View & Add on Hover */}
                        <div className="absolute inset-x-2 bottom-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hidden sm:block">
                          <button
                            type="button"
                            onClick={() => onAddToCart(product)}
                            className="w-full py-2 bg-[#111111] hover:bg-[#B94700] text-white font-['Manrope'] text-[10px] uppercase tracking-wider font-semibold transition-colors shadow-md cursor-pointer"
                          >
                            Quick Add
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-col justify-between flex-1">
                        <div>
                          <div className="flex items-center justify-between text-[#57534E] font-['Manrope'] text-[9px] uppercase tracking-wider mb-0.5">
                            <span>{product.category}</span>
                            {product.shades && (
                              <div className="flex items-center gap-1">
                                {product.shades.slice(0, 2).map((s) => (
                                  <span key={s.name} className="w-2.5 h-2.5 rounded-full border border-black/20" style={{ backgroundColor: s.color }} />
                                ))}
                              </div>
                            )}
                          </div>
                          <h2
                            onClick={() => onSelectProduct(product)}
                            className="font-['EB_Garamond'] text-lg text-[#111111] group-hover:text-[#B94700] transition-colors line-clamp-1 cursor-pointer font-medium"
                          >
                            {product.name}
                          </h2>
                        </div>
                        <div className="pt-2 mt-2 border-t border-[#E9DFD2]/60 flex items-center justify-between">
                          <span className="font-['Manrope'] text-xs font-semibold text-[#111111]">
                            ₹{product.price.toLocaleString('en-IN')}
                          </span>
                          <button
                            onClick={() => onAddToCart(product)}
                            className="text-[#9e3d00] hover:text-[#111111] font-['Manrope'] text-[10px] uppercase tracking-wider font-bold cursor-pointer sm:hidden"
                          >
                            + Add
                          </button>
                        </div>
                      </div>
                    </article>
                  </React.Fragment>
                );
              })}
            </div>

            {/* Pagination / Progress Bar Indicator */}
            <div className="pt-16 pb-8 flex flex-col items-center justify-center text-center space-y-3 max-w-sm mx-auto">
              <p className="font-['Manrope'] text-[10px] text-[#57534E] uppercase tracking-widest font-semibold">
                Viewing {filteredProducts.length} of 48 pieces
              </p>
              <div className="w-full h-1 bg-[#E9DFD2] overflow-hidden">
                <div
                  className="h-full bg-[#B94700] transition-all duration-500"
                  style={{ width: `${Math.min(100, (filteredProducts.length / 48) * 100)}%` }}
                />
              </div>
              <button
                type="button"
                className="mt-2 px-8 py-3 bg-[#111111] text-white hover:bg-[#B94700] font-['Manrope'] text-xs uppercase tracking-widest transition-colors cursor-pointer shadow-md"
              >
                Load More Creations
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Floating Action Button: Sticky Filter & Sort Pill */}
      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-30 lg:hidden">
        <button
          type="button"
          onClick={() => setMobileFilterOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-[#111111] text-white rounded-full shadow-2xl hover:bg-[#B94700] active:scale-95 transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">tune</span>
          <span className="font-['Manrope'] text-xs uppercase tracking-wider font-semibold">
            Filter & Sort
          </span>
          <span className="w-4 h-4 bg-[#B94700] text-white font-['Manrope'] text-[9px] rounded-full flex items-center justify-center font-bold">
            2
          </span>
        </button>
      </div>

      {/* Mobile Bottom Sheet Filter Modal */}
      {mobileFilterOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#111111]/60 backdrop-blur-xs flex flex-col justify-end lg:hidden animate-in fade-in duration-200"
          onClick={() => setMobileFilterOpen(false)}
        >
          <div
            className="w-full bg-[#F8F5F0] rounded-t-2xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden animate-in slide-in-from-bottom duration-300 pb-safe border-t border-[#E9DFD2]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-4 bg-[#f6f3ee] flex items-center justify-between border-b border-[#E9DFD2]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-[#111111]">tune</span>
                <h3 className="font-['EB_Garamond'] text-xl uppercase tracking-wider text-[#111111]">
                  Filter & Sort Creations
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="w-9 h-9 flex items-center justify-center text-[#111111]"
              >
                <span className="material-symbols-outlined text-[22px]">close</span>
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="p-6 overflow-y-auto space-y-6 font-['Manrope'] text-xs">
              {/* Sort */}
              <div className="space-y-2">
                <label className="uppercase tracking-widest text-[10px] text-[#57534E] font-semibold block">
                  Sort Order
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['Curated', 'Newest', 'HighLow', 'LowHigh'].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSortBy(s)}
                      className={`py-2.5 px-3 text-center uppercase tracking-wider text-[10px] font-semibold transition-colors ${
                        sortBy === s
                          ? 'bg-[#111111] text-white'
                          : 'bg-white border border-[#E9DFD2] text-[#111111]'
                      }`}
                    >
                      {s === 'Curated' ? 'Curated' : s === 'Newest' ? 'Newest' : s === 'HighLow' ? 'Price High-Low' : 'Price Low-High'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Ceiling */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="uppercase tracking-widest text-[10px] text-[#57534E] font-semibold">
                    Price Ceiling
                  </span>
                  <span className="font-bold text-[#111111]">₹{priceCeiling.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min="50000"
                  max="500000"
                  step="10000"
                  value={priceCeiling}
                  onChange={(e) => setPriceCeiling(Number(e.target.value))}
                  className="w-full accent-[#B94700]"
                />
              </div>

              {/* Colors */}
              <div className="space-y-2">
                <span className="uppercase tracking-widest text-[10px] text-[#57534E] font-semibold block">
                  Color Tone
                </span>
                <div className="flex flex-wrap gap-2">
                  {colors.map((c) => (
                    <button
                      key={c.label}
                      type="button"
                      onClick={() => setSelectedColor(selectedColor === c.label ? null : c.label)}
                      className={`px-3 py-1.5 flex items-center gap-1.5 border text-[10px] uppercase font-semibold transition-colors ${
                        selectedColor === c.label
                          ? 'bg-[#111111] text-white border-[#111111]'
                          : 'bg-white text-[#111111] border-[#E9DFD2]'
                      }`}
                    >
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.hex }} />
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div className="space-y-2">
                <span className="uppercase tracking-widest text-[10px] text-[#57534E] font-semibold block">
                  Italian Sizing
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {sizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSelectedSize(selectedSize === s ? null : s)}
                      className={`py-2 text-center uppercase tracking-wider text-[10px] font-semibold transition-colors ${
                        selectedSize === s
                          ? 'bg-[#111111] text-white'
                          : 'bg-white border border-[#E9DFD2] text-[#111111]'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-4 bg-[#f6f3ee] border-t border-[#E9DFD2] flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setSelectedColor(null);
                  setSelectedSize(null);
                  setPriceCeiling(500000);
                  setMobileFilterOpen(false);
                }}
                className="w-1/3 py-3 text-center bg-white border border-[#E9DFD2] font-['Manrope'] text-[10px] uppercase tracking-wider text-[#111111]"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="w-2/3 py-3 text-center bg-[#B94700] hover:bg-[#9e3d00] font-['Manrope'] text-xs uppercase tracking-wider text-white font-semibold shadow-md"
              >
                Apply Filters ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
