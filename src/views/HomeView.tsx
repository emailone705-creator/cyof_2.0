import React, { useRef, useState } from 'react';
import { Product, ViewRoute } from '../types';
import { PRODUCTS } from '../data/mockData';

interface HomeViewProps {
  onNavigate: (route: ViewRoute, param?: string) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: (productId: string) => boolean;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
}) => {
  const arrivalsRailRef = useRef<HTMLDivElement>(null);
  const [vipEmail, setVipEmail] = useState('');
  const [vipSubscribed, setVipSubscribed] = useState(false);

  const scrollArrivals = (direction: 'left' | 'right') => {
    if (arrivalsRailRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      arrivalsRailRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleVipSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (vipEmail.trim()) {
      setVipSubscribed(true);
      setVipEmail('');
      setTimeout(() => setVipSubscribed(false), 5000);
    }
  };

  const categories = [
    {
      title: 'Women',
      desc: 'Ready-to-Wear & Evening',
      category: 'Women',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDL-7IvrfFfcvMNwcCRlJBI21paoTNAHYDWBoPuqM3J8Zy45FQG63N6nCH50B3jgtxvFuGMvflLLoJXL7G9I6D6leYqseTmoLIru7Hw9HMJKTUXFbz1Iai56Lpr5WCRlWZLxYCSsNFsVdpJ6QQrn7ZS59MHwjtzGSxaljXyNwPA0bHNwgm53yX_FKp9sgEhJsiubuIhCsl6UuxWVI8EeV64_IK-oRSlzGKVKTwGDd9B',
    },
    {
      title: 'Men',
      desc: 'Tailoring & Outerwear',
      category: 'Men',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvBHd9H8PypowTPy49WM41TaJDdc1LUQS0PxmlDoh9aBSYI04ULyO07uaiCOBH_mPI_vR8TmE381R3k2Q_ZvqdOYRImmySCECAXVrkLUde_BeSao1LEE9GPOw16013vsBXnnQ74d2cIEhILXl4en2T036vxF_aSOjvApg1hPtAbHoCqfXCYezmqvuS1tU-ZgD-wGxoj9eiM3rzhlNrreVXploBQ3PE4S6pWMEaIfLR',
    },
    {
      title: 'Leather Goods',
      desc: 'Totes & Minaudières',
      category: 'Leather Goods',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCD3akvnRA10xrZwgvd1a0AyLs4M4pjfB6LFtoZSaUkhs7WgawLLCgDHjKnmmXZSGlPlZXAZRHweFlj4I8tEPo8PltHQqkaVH1GM0L9OhcbTymthPvFA92J-gJEDipGJeC4WufUymXw12bwHQEnmLVcqQlLqWB9pqVfqAbOfurOryPTsAfBeQE8X7FH-aPNbwHebeumB15jCnbE4gS1k9CYFAU7Q1q66KSMHth26sOW',
    },
    {
      title: 'Knitwear',
      desc: 'Fine Gauge & Silk',
      category: 'Knitwear',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAEhB2WSuDadcNDwqVkC4HTNEucRY5IF3LgPNZMEVxX0ZubGvdHPNYRTurMmw8R66aHHiKhHkxw6XRKGUTXXBp5NNCgXn1wjLDTHxU8A_KjZw2KReOi1Ny70Q5OMjCvIPSMh5gjboQjVrzlNWiAqsyccUHkNcPvsXtEFLOyVPQt6hsyKJ5JensGphv-E8xwpP16jpCCRVyLE27VpA2M5p_fQH-mNTpaIyTRuO6En2ft',
    },
    {
      title: 'Footwear',
      desc: 'Sculpted & Loafers',
      category: 'Footwear',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBzB0v5KLaHDmOX1MaUPLsaIu0uWPJoqzJD-uVWv3L3hx1FuhkjB3NNcaE8cCZSQ-QdrOLe_bSAcXtifgnEkb66XO0W2woFpdzNa4By6JaSjl0mOlZo8oWAnUjAVOskqY1bPZATuSRfF2pzN5PFekcwcG8RpELXwto-v46BDBj371zfubrr1oFnrbq6OhmcKgYsX6rFnnptB0KvFlUKKI8_-dLAL2uM9S81VTTeEeqU',
    },
    {
      title: 'Horlogerie',
      desc: 'Timepieces & Objets',
      category: 'Horlogerie',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4zkWyfQE6HmMTRllDSyJUpLRCnSZc78XUDRDS5FMzCUturKvTe27tH8qXMr54ap9znFt1krbgQY5MReW2dt7rR2MmMnIqqkxgUBlv-8iAtwyomPPqxVuY0MvEv2UZOozBhqko7sFzoHLkjsW01Y5ohGIMkq_UdKZ4cjz4ZE-nmlKRj11KlTH1kbWbgJ_enxr0AXhNX5vB8oItNeiEe5zD0Vzeb5EyylRibBxljG0t',
    },
  ];

  return (
    <div className="w-full flex flex-col bg-[#fcf9f4]">
      {/* 1. Editorial Hero Campaign */}
      <section className="relative w-full overflow-hidden bg-[#111111] text-white">
        <div className="relative w-full min-h-[88vh] lg:min-h-[92vh] flex items-end">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out scale-105"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCKq6bwqVW_0RgIc7Tif29wSFc43uKj5KxFKTzXVo5D8WcyfHOX4VWRV9-yhDVsBkcmZQ3twoIwqXFXaKFrI7u9frLaprBs_LPKG3KVjLd_8T3YglSKDxH2W4GjBZ4joey3H_EcIgQidqGF26ILrNRTTMYpSwjXQbHhk8V7ooKRobiH0aZAdYhnxGg2zZHLdJ-qgvM7_oWJ2s7SpM8CS-l_pqkfBIYFU91qFgS6FUf3')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/90 via-[#111111]/35 to-transparent" />

          {/* Campaign Copy & Actions */}
          <div className="relative z-10 w-full px-4 md:px-8 lg:px-16 pb-14 lg:pb-20 max-w-[1600px] mx-auto">
            <div className="max-w-4xl space-y-4 lg:space-y-6">
              <div className="inline-flex items-center gap-3">
                <span className="w-8 h-[1px] bg-[#9e3d00]" />
                <span className="font-['Manrope'] text-[10px] text-[#ffb595] tracking-[0.25em] uppercase font-semibold">
                  Autumn / Winter 2026 • #CraftedYourOwnFashion
                </span>
              </div>
              <h1 className="font-['EB_Garamond'] text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-white leading-[1.05] font-normal">
                THE NEW EXPRESSION
              </h1>
              <p className="font-['Manrope'] text-base md:text-lg text-[#F8F5F0]/90 max-w-xl font-light leading-relaxed">
                Discover a new language of modern luxury. Precise silhouettes sculptured in noble Tuscan wools, structured leather, and archival cashmeres.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6">
                <button
                  onClick={() => onNavigate('shop')}
                  className="inline-flex items-center justify-center px-9 py-4 bg-[#9e3d00] hover:bg-[#B94700] text-white font-['Manrope'] text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 shadow-xl hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  EXPLORE COLLECTION
                </button>
                <button
                  onClick={() => onNavigate('journal')}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-md text-white font-['Manrope'] text-xs uppercase tracking-[0.2em] font-semibold transition-colors hover:bg-white/20 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">auto_stories</span>
                  ATELIER MONOGRAPHS
                </button>
              </div>
            </div>

            {/* Metric Ribbon */}
            <div className="mt-12 pt-8 border-t border-white/20 flex items-center justify-between text-[#F8F5F0]/60 font-['Manrope'] text-[10px] uppercase">
              <div className="flex items-center gap-6 tracking-widest">
                <span className="text-[#ffb595] font-bold">01</span>
                <span className="w-12 h-[1px] bg-white/20 relative overflow-hidden">
                  <span className="absolute inset-y-0 left-0 bg-[#9e3d00] w-2/3 animate-pulse" />
                </span>
                <span>04 — MILAN ATELIER</span>
              </div>
              <div className="hidden md:flex items-center gap-2 tracking-[0.2em]">
                <span className="material-symbols-outlined text-[16px] text-[#ffb595]">arrow_downward</span>
                <span>SCROLL TO DISCOVER</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Portfolios / Curated Realms */}
      <section className="w-full py-16 lg:py-24 bg-[#fcf9f4] border-b border-[#E9DFD2]">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 lg:mb-12">
            <div>
              <span className="font-['Manrope'] text-[10px] text-[#9e3d00] tracking-[0.25em] uppercase block mb-2 font-semibold">
                CURATED REALMS
              </span>
              <h2 className="font-['EB_Garamond'] text-3xl md:text-4xl text-[#111111] font-normal">
                The Portfolios
              </h2>
            </div>
            <p className="font-['Manrope'] text-sm text-[#57534E] mt-2 md:mt-0 max-w-md">
              Architectural forms shaped through pure materiality and traditional artisanal discipline.
            </p>
          </div>

          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 lg:pb-0 lg:grid lg:grid-cols-6 lg:gap-6 no-scrollbar">
            {categories.map((cat) => (
              <div
                key={cat.title}
                onClick={() => onNavigate('shop', cat.category)}
                className="group flex-none w-[72vw] sm:w-[45vw] lg:w-auto snap-start flex flex-col cursor-pointer"
              >
                <div className="relative aspect-[3/4] bg-[#F8F5F0] overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/60 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                    <span className="font-['EB_Garamond'] text-xl font-normal">{cat.title}</span>
                    <span className="material-symbols-outlined text-[18px] transform group-hover:translate-x-1 transition-transform text-[#ffb595]">
                      arrow_forward
                    </span>
                  </div>
                </div>
                <span className="font-['Manrope'] text-[10px] text-[#57534E] uppercase tracking-wider mt-3">
                  {cat.desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. New Arrivals (4:5 Aspect Ratio Product Grid) */}
      <section className="w-full py-16 lg:py-24 bg-[#f6f3ee] border-b border-[#E9DFD2]">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-16">
          <div className="flex items-center justify-between mb-8 lg:mb-12">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#9e3d00] inline-block" />
                <span className="font-['Manrope'] text-[10px] text-[#9e3d00] tracking-[0.2em] uppercase font-semibold">
                  DEBUT RELEASES
                </span>
              </div>
              <h2 className="font-['EB_Garamond'] text-3xl md:text-4xl text-[#111111] font-normal">
                New Arrivals
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => scrollArrivals('left')}
                aria-label="Previous Products"
                className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center bg-white text-[#111111] hover:bg-[#111111] hover:text-white transition-colors cursor-pointer border border-[#E9DFD2]"
              >
                <span className="material-symbols-outlined text-[20px]">west</span>
              </button>
              <button
                type="button"
                onClick={() => scrollArrivals('right')}
                aria-label="Next Products"
                className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center bg-white text-[#111111] hover:bg-[#111111] hover:text-white transition-colors cursor-pointer border border-[#E9DFD2]"
              >
                <span className="material-symbols-outlined text-[20px]">east</span>
              </button>
            </div>
          </div>

          <div
            ref={arrivalsRailRef}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-8"
          >
            {PRODUCTS.slice(0, 4).map((product) => {
              const saved = isWishlisted(product.id);
              return (
                <div
                  key={product.id}
                  className="group flex flex-col bg-white p-3 lg:p-4 shadow-sm hover:shadow-md transition-shadow border border-[#E9DFD2]/60"
                >
                  <div className="relative aspect-[4/5] bg-[#f0ede9] overflow-hidden mb-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      onClick={() => onSelectProduct(product)}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 cursor-pointer"
                    />
                    {product.badges && product.badges.length > 0 && (
                      <span className="absolute top-3 left-3 bg-[#111111] text-white font-['Manrope'] text-[9px] px-2 py-0.5 uppercase tracking-widest font-semibold">
                        {product.badges[0]}
                      </span>
                    )}
                    <button
                      type="button"
                      aria-label="Save to Wishlist"
                      onClick={() => onToggleWishlist(product)}
                      className="absolute top-2 right-2 w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-white/85 backdrop-blur-sm text-[#111111] hover:text-[#B94700] flex items-center justify-center transition-colors cursor-pointer shadow-xs"
                    >
                      <span className={`material-symbols-outlined text-[18px] ${saved ? 'text-[#B94700]' : ''}`}>
                        {saved ? 'favorite' : 'favorite_border'}
                      </span>
                    </button>
                    <div className="absolute inset-x-3 bottom-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      <button
                        type="button"
                        onClick={() => onAddToCart(product)}
                        className="w-full py-2.5 bg-[#111111] text-white font-['Manrope'] text-[10px] uppercase tracking-wider hover:bg-[#B94700] transition-colors cursor-pointer font-semibold shadow-md"
                      >
                        Quick Add
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1.5 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="font-['Manrope'] text-[9px] text-[#57534E] uppercase tracking-widest block">
                        {product.category}
                      </span>
                      <h3
                        onClick={() => onSelectProduct(product)}
                        className="font-['EB_Garamond'] text-lg font-medium text-[#111111] hover:text-[#B94700] transition-colors line-clamp-1 cursor-pointer pt-0.5"
                      >
                        {product.name}
                      </h3>
                    </div>
                    <div className="pt-2 flex items-center justify-between border-t border-[#E9DFD2]/60">
                      <span className="font-['Manrope'] text-xs font-semibold text-[#111111]">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                      {product.shades && (
                        <div className="flex items-center gap-1.5">
                          {product.shades.slice(0, 3).map((shade) => (
                            <span
                              key={shade.name}
                              className="w-3 h-3 rounded-full border border-black/20"
                              style={{ backgroundColor: shade.color }}
                              title={shade.name}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Editorial Collection Banner (Asymmetrical Split) */}
      <section className="w-full py-16 lg:py-28 bg-[#fcf9f4] border-b border-[#E9DFD2]">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Image & Overlay Quote */}
            <div className="lg:col-span-7 relative">
              <div className="relative aspect-[4/5] w-full max-w-lg lg:max-w-none bg-[#f0ede9] overflow-hidden">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMN-SGBkNrVPHle87-DxsYbosGaUfWJ-_xHfgyKQfeEDV4L3EYSYP_a1DcaeTaMxkmfbzuLQW0mMCuJ0hB3i6FavEBkcP3QWgpiZk1_j9gjkzVI4B7YN4fikz57gZgk0Xu0I5kXooQMXpF9xWpjI-7sUS9rsqDW8hwYQLwVpu5ltzT1B3zccgs67dZNDePEHMHzomFPsqlwWMZTfs98CeW_FClpHDHmfjzmckIPs0c"
                  alt="Editorial fashion campaign"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative -mt-16 lg:-mt-24 ml-6 lg:ml-16 w-3/4 max-w-xs bg-[#F8F5F0] p-6 shadow-xl z-10 space-y-3 border border-[#E9DFD2]">
                <span className="font-['Manrope'] text-[9px] text-[#9e3d00] tracking-[0.2em] uppercase block font-semibold">
                  VOLUME VII • REF. 408
                </span>
                <p className="font-['EB_Garamond'] text-lg text-[#111111] leading-snug italic">
                  “Form exists not to decorate life, but to give dignity to stillness.”
                </p>
                <p className="font-['Manrope'] text-[10px] text-[#57534E] uppercase tracking-wider">
                  — Maestro Giuliano Vanni
                </p>
              </div>
            </div>

            {/* Right Story & Pillars */}
            <div className="lg:col-span-5 space-y-6 lg:pl-6">
              <div className="space-y-3">
                <span className="font-['Manrope'] text-[10px] text-[#9e3d00] tracking-[0.25em] uppercase block font-semibold">
                  THE ATELIER ARCHIVE
                </span>
                <h2 className="font-['EB_Garamond'] text-3xl md:text-4xl lg:text-5xl text-[#111111] leading-tight font-normal">
                  An Architecture of Solitude and Grace
                </h2>
              </div>
              <p className="font-['Manrope'] text-sm md:text-base text-[#57534E] font-light leading-relaxed">
                Constructed inside our 18th-century Palazzo in Como, each archival piece is drawn directly onto raw canvas, pinned to the live human form, and hand-stitched over thirty-six concentrated hours.
              </p>

              <div className="space-y-4 pt-2">
                <div className="p-4 bg-[#f6f3ee] border border-[#E9DFD2]/60">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#9e3d00] text-[20px]">architecture</span>
                    <h3 className="font-['EB_Garamond'] text-lg text-[#111111] font-semibold">Zero Synthetic Linings</h3>
                  </div>
                  <p className="font-['Manrope'] text-xs text-[#57534E] mt-1 pl-8">
                    Strict adherence to 100% natural organic mulberry silks and unbleached Florentine canvas interiors.
                  </p>
                </div>
                <div className="p-4 bg-[#f6f3ee] border border-[#E9DFD2]/60">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#9e3d00] text-[20px]">verified</span>
                    <h3 className="font-['EB_Garamond'] text-lg text-[#111111] font-semibold">Single-Artisan Provenance</h3>
                  </div>
                  <p className="font-['Manrope'] text-xs text-[#57534E] mt-1 pl-8">
                    Every coat carries the hand-numbered signature label of the master tailor who cut and assembled it.
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => onNavigate('article')}
                  className="inline-flex items-center gap-3 font-['Manrope'] text-xs text-[#111111] hover:text-[#B94700] uppercase tracking-[0.2em] font-semibold group transition-colors cursor-pointer"
                >
                  <span>EXPLORE THE ARCHIVE MONOGRAPH</span>
                  <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1.5 transition-transform text-[#B94700]">
                    arrow_forward
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Permanent Collection (Bestsellers) */}
      <section className="w-full py-16 lg:py-24 bg-[#f0ede9] border-b border-[#E9DFD2]">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 lg:mb-14">
            <div>
              <span className="font-['Manrope'] text-[10px] text-[#9e3d00] tracking-[0.25em] uppercase block mb-2 font-semibold">
                ICONIC PIECES
              </span>
              <h2 className="font-['EB_Garamond'] text-3xl md:text-4xl text-[#111111] font-normal">
                The Permanent Collection
              </h2>
            </div>
            <p className="font-['Manrope'] text-sm text-[#57534E] mt-2 md:mt-0">
              Timeless silhouettes immune to seasonal fleeting trends.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Iconic Piece 1 */}
            <div className="group flex flex-col bg-white overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-[#E9DFD2]/60">
              <div className="relative aspect-[3/4] bg-[#ebe8e3] overflow-hidden">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJfW5EDN417piyZsq27so7Quwq-8-oFM3PmgwI33l7VgORs-gPHykJ9SAN7J3JJc3KNCUGFVMFKrqCbJLOxWNZnTQ_CLZyOgskTZ7yihIDlgRrDWOHLBPBxAx9FJR8cCHZx6obMuun1VzrupsNlIlXdlqko7III-iuCC-7va4ff3NVxtmh8UilqK7413nCvpTIwtPq5RJJ5j3gWHjGA7jvM5p7Lpnm9S98gNDT05Fe"
                  alt="The Sforza Cashmere Trench"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute bottom-4 left-4">
                  <span className="font-['Manrope'] text-[9px] bg-[#111111]/90 text-white px-2.5 py-1 tracking-widest uppercase font-semibold">
                    EDITION 01
                  </span>
                </div>
              </div>
              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[#57534E] font-['Manrope'] text-[10px] uppercase tracking-wider mb-1">
                    <span>Coat Atelier</span>
                    <span>Restocked</span>
                  </div>
                  <h3 className="font-['EB_Garamond'] text-xl text-[#111111] group-hover:text-[#B94700] transition-colors font-medium">
                    The Sforza Cashmere Trench
                  </h3>
                  <p className="font-['Manrope'] text-xs text-[#57534E] line-clamp-2 mt-1">
                    Hand-finished unlined double-cashmere with horned horn buttons and storm-flap detailing.
                  </p>
                </div>
                <div className="pt-4 flex items-center justify-between border-t border-[#E9DFD2]">
                  <span className="font-['Manrope'] text-sm font-semibold text-[#111111]">₹3,60,000</span>
                  <button
                    onClick={() => {
                      const p = PRODUCTS.find((x) => x.id === 'sforza-trench') || PRODUCTS[1];
                      onSelectProduct(p);
                    }}
                    className="font-['Manrope'] text-[10px] text-[#111111] uppercase tracking-wider group-hover:text-[#B94700] inline-flex items-center gap-1 transition-colors font-semibold cursor-pointer"
                  >
                    View Piece <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Iconic Piece 2 */}
            <div className="group flex flex-col bg-white overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-[#E9DFD2]/60">
              <div className="relative aspect-[3/4] bg-[#ebe8e3] overflow-hidden">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIk92KhK5XA8tRwOK6qJ4EzwAxsackogVC3pcVVxN11rIDjFxZQSN9idWoD6Rtdis7xaxYzSG-4JHLvkruhjaU_YqD6-r4QMmm93nIRhpYVtDuGJA9ZOSCmZpRqZm5rM-jI1ZbcfZ6yQUpzDgGJOsPxVY9H0qdKpyeg-266F7SmEvd-M6BxJup1Cugqadu8dmLJUpkbdTNL3qBNsuGB4r5J3L0YfekzBgyr9iz-wWR"
                  alt="Palazzo Calfskin Tote"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute bottom-4 left-4">
                  <span className="font-['Manrope'] text-[9px] bg-[#9e3d00] text-white px-2.5 py-1 tracking-widest uppercase font-semibold">
                    HERITAGE ICON
                  </span>
                </div>
              </div>
              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[#57534E] font-['Manrope'] text-[10px] uppercase tracking-wider mb-1">
                    <span>Leather Goods</span>
                    <span>Limited Batch</span>
                  </div>
                  <h3 className="font-['EB_Garamond'] text-xl text-[#111111] group-hover:text-[#B94700] transition-colors font-medium">
                    Palazzo Calfskin Tote
                  </h3>
                  <p className="font-['Manrope'] text-xs text-[#57534E] line-clamp-2 mt-1">
                    Structured architectural carryall with burnt orange contrast edge-paint and hidden brass latch.
                  </p>
                </div>
                <div className="pt-4 flex items-center justify-between border-t border-[#E9DFD2]">
                  <span className="font-['Manrope'] text-sm font-semibold text-[#111111]">₹2,85,000</span>
                  <button
                    onClick={() => {
                      const p = PRODUCTS.find((x) => x.id === 'palazzo-tote') || PRODUCTS[0];
                      onSelectProduct(p);
                    }}
                    className="font-['Manrope'] text-[10px] text-[#111111] uppercase tracking-wider group-hover:text-[#B94700] inline-flex items-center gap-1 transition-colors font-semibold cursor-pointer"
                  >
                    View Piece <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Iconic Piece 3 */}
            <div className="group flex flex-col bg-white overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-[#E9DFD2]/60">
              <div className="relative aspect-[3/4] bg-[#ebe8e3] overflow-hidden">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJpD99rREIjb6gFffSVhqBp_sc1Pwazo0UY-TbRYgXDAYhkoA2uDetlkbqAU8pwbcg7sFl1XSku2RB4-P7P5pKydylcibtJssIzKJfLlJIUwul9_w87KuH3jfySLEGX8amUhJPT2jf7qiMjy44gTnIoVy4Pv1ob86gDh-wSARoqQectOR16NzE691mkbYBO35aq4LpER8E6y2NLyCOBtqGKrwPn_gVSBS6t-7YqghC"
                  alt="Baroque Silk Foulard Shirt"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute bottom-4 left-4">
                  <span className="font-['Manrope'] text-[9px] bg-[#111111]/90 text-white px-2.5 py-1 tracking-widest uppercase font-semibold">
                    EDITION 03
                  </span>
                </div>
              </div>
              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[#57534E] font-['Manrope'] text-[10px] uppercase tracking-wider mb-1">
                    <span>Silk Habotai</span>
                    <span>Signature</span>
                  </div>
                  <h3 className="font-['EB_Garamond'] text-xl text-[#111111] group-hover:text-[#B94700] transition-colors font-medium">
                    Baroque Silk Foulard Shirt
                  </h3>
                  <p className="font-['Manrope'] text-xs text-[#57534E] line-clamp-2 mt-1">
                    Fluid twill silk adorned with archival motifs hand-printed by Lake Como artisans.
                  </p>
                </div>
                <div className="pt-4 flex items-center justify-between border-t border-[#E9DFD2]">
                  <span className="font-['Manrope'] text-sm font-semibold text-[#111111]">₹85,000</span>
                  <button
                    onClick={() => onNavigate('shop')}
                    className="font-['Manrope'] text-[10px] text-[#111111] uppercase tracking-wider group-hover:text-[#B94700] inline-flex items-center gap-1 transition-colors font-semibold cursor-pointer"
                  >
                    View Piece <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Brand Story & Heritage */}
      <section className="w-full py-20 lg:py-28 bg-[#F8F5F0] text-[#111111] border-b border-[#E9DFD2]">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Story Copy */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-3">
                <span className="w-8 h-[1px] bg-[#9e3d00]" />
                <span className="font-['Manrope'] text-[10px] text-[#9e3d00] tracking-[0.25em] uppercase font-semibold">
                  SINCE 1928 • #CraftedYourOwnFashion
                </span>
              </div>
              <h2 className="font-['EB_Garamond'] text-3xl md:text-5xl tracking-tight text-[#111111] leading-[1.1] font-normal">
                Generations of Unyielding Italian Discipline
              </h2>
              <p className="font-['Manrope'] text-sm md:text-base text-[#57534E] font-light leading-relaxed">
                Founded along the stone arcades of northern Italy, CYOF operates not as a commercial factory, but as an artisan sanctuary. Our master craftspersons train for over seven years before cutting a single master pattern.
              </p>

              {/* Stats Bento */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="p-4 bg-white shadow-sm border border-[#E9DFD2]">
                  <span className="font-['EB_Garamond'] text-3xl md:text-4xl text-[#9e3d00] block leading-none font-normal">96</span>
                  <span className="font-['Manrope'] text-[10px] text-[#57534E] uppercase tracking-wider mt-2 block font-semibold">Years Heritage</span>
                </div>
                <div className="p-4 bg-white shadow-sm border border-[#E9DFD2]">
                  <span className="font-['EB_Garamond'] text-3xl md:text-4xl text-[#111111] block leading-none font-normal">100%</span>
                  <span className="font-['Manrope'] text-[10px] text-[#57534E] uppercase tracking-wider mt-2 block font-semibold">Traceable Fibers</span>
                </div>
                <div className="p-4 bg-white shadow-sm border border-[#E9DFD2]">
                  <span className="font-['EB_Garamond'] text-3xl md:text-4xl text-[#9e3d00] block leading-none font-normal">38</span>
                  <span className="font-['Manrope'] text-[10px] text-[#57534E] uppercase tracking-wider mt-2 block font-semibold">Master Tailors</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => onNavigate('journal')}
                  className="inline-flex items-center justify-center px-8 py-4 bg-[#111111] text-white font-['Manrope'] text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#B94700] transition-colors cursor-pointer"
                >
                  DISCOVER OUR HERITAGE
                </button>
              </div>
            </div>

            {/* Heritage Imagery */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4 lg:gap-6">
              <div className="space-y-4 lg:space-y-6">
                <div className="relative aspect-[3/4] bg-[#ebe8e3] overflow-hidden shadow-md">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA42yOV4_G4CGjnV94taxbwgR8qQqDQzgGVIXpTSAVmFzC50c-nqsUXFv3htdLAXQ0yKMXudJu_JM8tZLWd5QXZKTtixZn6nq_GjEu8DQGFysVHD2o5gOnNWyz_j1AGLwcpHP74MZToKo_Wp06x-sUzdZCqcxmkjEzcNKEWVq-NoiSejK73tRFFzTeqvRYtjRWL0FWLJisAh6fDYK_x3Lx7fqmXOvwuhPoR66mQOiSY"
                    alt="Master tailor chalk lines"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 bg-white shadow-sm border border-[#E9DFD2]">
                  <span className="font-['EB_Garamond'] text-lg text-[#111111] block font-medium">Atelier Como</span>
                  <span className="font-['Manrope'] text-xs text-[#57534E]">Textile cutting workshop overlooking Lake Como.</span>
                </div>
              </div>
              <div className="space-y-4 lg:space-y-6 pt-8 lg:pt-16">
                <div className="p-4 bg-white shadow-sm border border-[#E9DFD2]">
                  <span className="font-['EB_Garamond'] text-lg text-[#111111] block font-medium">Florence Tanneries</span>
                  <span className="font-['Manrope'] text-xs text-[#57534E]">Vegetable-tanned hides aged naturally for four months.</span>
                </div>
                <div className="relative aspect-[3/4] bg-[#ebe8e3] overflow-hidden shadow-md">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCS78I9ZbAo3GHecAsBYyT6KyR9beoRuNkrL6YjxMgPhHLqtinw3vM8fpU-a8ThXXl9Ms3A0SXR-WADo2Ym-aPdtOKih_JeTM7GSkGlt3CXdO3Y9GZfdpdDwqATUoxRqyPI2gk_J2RjmYYq5Bz4Kl9RtMKetuFN4dskZK2xwyTNYVHlTDuPlqy8TatNX6C0gtKprX6q_wtWE8qhv103-da3nPVhQOaHdvHRjE5RwrW-"
                    alt="CYOF flagship atelier salon"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. VIP Gazette Enrollment */}
      <section className="w-full py-20 lg:py-28 bg-[#111111] text-white relative overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto px-4 md:px-8 text-center space-y-6">
          <div className="inline-flex items-center justify-center gap-2">
            <span className="w-6 h-[1px] bg-[#9e3d00]" />
            <span className="font-['Manrope'] text-[10px] text-[#ffb595] tracking-[0.25em] uppercase font-semibold">
              PRIVILEGED CORRESPONDENCE
            </span>
            <span className="w-6 h-[1px] bg-[#9e3d00]" />
          </div>
          <h2 className="font-['EB_Garamond'] text-3xl md:text-5xl text-white font-normal leading-tight">
            The CYOF Gazette
          </h2>
          <p className="font-['Manrope'] text-sm md:text-base text-[#F8F5F0]/80 max-w-xl mx-auto font-light leading-relaxed">
            Be accorded exclusive private salon access, bespoke invitations to seasonal debuts, and private monograph updates.
          </p>

          <form onSubmit={handleVipSubmit} className="pt-4 max-w-lg mx-auto flex flex-col sm:flex-row items-stretch gap-3">
            <div className="relative flex-1">
              <input
                type="email"
                value={vipEmail}
                onChange={(e) => setVipEmail(e.target.value)}
                placeholder="Enter your confidential email"
                required
                className="w-full h-12 px-4 bg-white/10 border-b border-white/30 text-white placeholder:text-[#F8F5F0]/50 font-['Manrope'] text-xs focus:outline-none focus:border-[#9e3d00] transition-colors"
              />
            </div>
            <button
              type="submit"
              className="h-12 px-8 bg-[#9e3d00] hover:bg-[#B94700] text-white font-['Manrope'] text-xs tracking-[0.2em] uppercase font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <span>JOIN SALON</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </form>

          {vipSubscribed && (
            <div className="text-[#ffb595] font-['Manrope'] text-xs uppercase tracking-widest pt-2">
              ✓ You are cordially registered to the CYOF Gazette salon ledger.
            </div>
          )}

          <p className="font-['Manrope'] text-[10px] text-[#F8F5F0]/50 max-w-md mx-auto pt-2">
            By subscribing, you accept our Privacy Mandate. You may withdraw access at any time through our Concierge.
          </p>
        </div>
      </section>
    </div>
  );
};
