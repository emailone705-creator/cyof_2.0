import React, { useState } from 'react';
import { Article, Product, ViewRoute } from '../types';
import { ARTICLES, PRODUCTS } from '../data/mockData';

interface JournalViewProps {
  onNavigate: (route: ViewRoute, param?: string) => void;
  onSelectArticle: (article: Article) => void;
  onAddToCart: (product: Product) => void;
}

export const JournalView: React.FC<JournalViewProps> = ({
  onNavigate,
  onSelectArticle,
  onAddToCart,
}) => {
  const [filter, setFilter] = useState('All Editions');
  const [gazetteEmail, setGazetteEmail] = useState('');
  const [gazetteSubscribed, setGazetteSubscribed] = useState(false);
  const [filmPlaying, setFilmPlaying] = useState(false);

  const filterCategories = [
    'All Editions',
    'Atelier Craft',
    'Runway Dispatches',
    'Materiality & Textiles',
    'Artisan Dialogues',
    'Living Heritage',
  ];

  const handleGazetteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (gazetteEmail.trim()) {
      setGazetteSubscribed(true);
      setGazetteEmail('');
      setTimeout(() => setGazetteSubscribed(false), 5000);
    }
  };

  const leadArticle = ARTICLES[0];
  const stories = ARTICLES.slice(1, 4);

  return (
    <div className="w-full flex flex-col bg-[#F8F5F0] min-h-screen text-[#1c1c19]">
      {/* 1. MASTHEAD SECTION */}
      <section className="w-full max-w-[1600px] mx-auto px-4 md:px-8 lg:px-16 pt-8 pb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#E9DFD2]">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-[#9e3d00]" />
              <span className="font-['Manrope'] text-[10px] tracking-[0.28em] text-[#57534E] uppercase font-semibold">
                Atelier Editions & Monographs • #CraftedYourOwnFashion
              </span>
            </div>
            <h1 className="font-['EB_Garamond'] text-5xl sm:text-6xl lg:text-7xl text-[#111111] tracking-tight font-normal">
              LE JOURNAL
            </h1>
          </div>
          <div className="flex flex-col md:items-end text-left md:text-right space-y-1 font-['Manrope']">
            <span className="text-[10px] text-[#B94700] uppercase tracking-[0.2em] font-bold">
              Tome XIV • Issue 88
            </span>
            <p className="text-xs text-[#57534E] tracking-widest uppercase">
              Dispatches & Savoir-Faire from Mumbai & New Delhi Ateliers
            </p>
          </div>
        </div>

        {/* Category Filter Bar */}
        <div className="w-full bg-[#f6f3ee] px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-4 mt-6 border border-[#E9DFD2]">
          <div className="flex flex-wrap items-center gap-2">
            {filterCategories.map((cat) => {
              const active = filter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2 font-['Manrope'] text-[10px] tracking-[0.16em] uppercase transition-all cursor-pointer font-semibold ${
                    active
                      ? 'bg-[#111111] text-white shadow-xs'
                      : 'bg-transparent text-[#57534E] hover:text-[#111111]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
          <div className="hidden lg:flex items-center gap-2 text-[#57534E] font-['Manrope'] text-[10px] tracking-widest uppercase">
            <span className="material-symbols-outlined text-[16px]">auto_stories</span>
            <span>Archive Volume No. 1928–2026</span>
          </div>
        </div>
      </section>

      {/* 2. HERO EDITORIAL FEATURE (Asymmetric Spread) */}
      <section className="w-full max-w-[1600px] mx-auto px-4 md:px-8 lg:px-16 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch bg-[#f6f3ee] border border-[#E9DFD2]">
          {/* Portrait Cinematic Column */}
          <div
            onClick={() => onSelectArticle(leadArticle)}
            className="lg:col-span-7 relative min-h-[460px] lg:min-h-[640px] overflow-hidden group cursor-pointer"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-105"
              style={{
                backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDwc6xzMEtMkiG9At1kOzH4gK7PpObwCMUF6M9-16tHVClv_Y7wvd5mDEFBGCuTpJXGsKDzp1d6dXpZ_1bC_oODCHYpVEtufYG0id74adkXQcKDp8MmyV1OY2e-4q9hFKFCCs3bWj2Et8G3TVYXEbIuC3gn86U62Lp1CIPMX3Wh-maz85T9SjtOufpTIhdNC6oU1IFmtx7dYL3GLSe6K50p9annEE8g3Po16gigppPg')`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/70 via-transparent to-transparent" />
            <div className="absolute top-6 left-6 bg-white/95 px-3 py-1.5 text-[#111111] font-['Manrope'] text-[9px] tracking-[0.2em] uppercase shadow-xs font-semibold">
              Autumn / Winter Monograph
            </div>
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white font-['Manrope']">
              <span className="text-[10px] tracking-[0.2em] uppercase">Plate No. 04 — Biella Woolens</span>
              <span className="text-xs opacity-80">Photo: Atelier Archives Florence</span>
            </div>
          </div>

          {/* Narrative Text Column */}
          <div className="lg:col-span-5 p-6 sm:p-10 lg:p-12 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3 font-['Manrope']">
                <span className="px-2.5 py-1 bg-[#B94700] text-white text-[9px] tracking-[0.18em] uppercase font-bold">
                  Special Report
                </span>
                <span className="text-[10px] text-[#57534E] tracking-widest uppercase">
                  {leadArticle.readTime}
                </span>
              </div>
              <h2
                onClick={() => onSelectArticle(leadArticle)}
                className="font-['EB_Garamond'] text-3xl sm:text-4xl lg:text-5xl text-[#111111] font-normal leading-[1.1] hover:text-[#B94700] transition-colors cursor-pointer"
              >
                {leadArticle.title}
              </h2>
              <p className="font-['Manrope'] text-xs sm:text-sm text-[#594238] leading-relaxed">
                {leadArticle.subtitle}
              </p>
              <p className="font-['Manrope'] text-xs text-[#57534E] leading-relaxed hidden sm:block">
                In this monograph, we document the three-month journey of rare vicuña and superfine Merino, woven on vintage projectile looms that whisper with the cadence of 19th-century Piedmont.
              </p>
            </div>

            <div className="pt-8 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full overflow-hidden bg-[#ebe8e3] flex-shrink-0">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWoSGX2G831l250YmG_IBKe9FF9Px2LrPrUTSH-5RJuw3jqZ1I8gaG9tDqqeoxdOan77u5F4JBsymbeJxQd14ef-U-3NhSp541rbxAHemJEnRmm6X9M4Jqwe0zbofCGERMVgAu7Ou36oUwtqHPDGtylcN4hsEYhpLfZnNb3q6-3sJmbcBY4Kg8w-JK7hRU5ZnLP7Q2lz8Fy06dPoxBqZUQkz-dMMGj4sBiFzGz98vU"
                    alt="Hélène Delacroix"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="font-['Manrope']">
                  <p className="text-xs text-[#111111] font-semibold">{leadArticle.author}</p>
                  <p className="text-[9px] text-[#57534E] tracking-widest uppercase">Directrice du Patrimoine & Archive</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => onSelectArticle(leadArticle)}
                  className="inline-flex items-center justify-center px-8 py-3.5 bg-[#B94700] hover:bg-[#111111] text-white font-['Manrope'] text-xs tracking-[0.16em] uppercase font-semibold transition-colors cursor-pointer shadow-md"
                >
                  Read Complete Monograph
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 3-COLUMN EDITORIAL STORY GRID */}
      <section className="w-full max-w-[1600px] mx-auto px-4 md:px-8 lg:px-16 mb-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-[#E9DFD2]">
          <div>
            <span className="font-['Manrope'] text-[10px] text-[#B94700] uppercase tracking-[0.25em] block mb-1 font-bold">
              Curated Dispatches
            </span>
            <h3 className="font-['EB_Garamond'] text-3xl md:text-4xl text-[#111111]">
              The Artisan Monograph Series
            </h3>
          </div>
          <span className="font-['Manrope'] text-[10px] text-[#57534E] uppercase tracking-widest mt-2 md:mt-0">
            Dispatches 01 — 03 of 12
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story) => (
            <article
              key={story.id}
              onClick={() => onSelectArticle(story)}
              className="flex flex-col group bg-[#f6f3ee] p-6 border border-[#E9DFD2] shadow-xs hover:shadow-md transition-all cursor-pointer"
            >
              <div className="relative w-full aspect-[4/5] overflow-hidden mb-5 bg-[#ebe8e3]">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 bg-[#111111]/90 text-white font-['Manrope'] text-[9px] px-2.5 py-0.5 uppercase tracking-widest font-semibold">
                  {story.issue}
                </span>
                <div className="absolute bottom-3 right-3 bg-white/95 px-2.5 py-1 font-['Manrope'] text-[9px] text-[#111111] tracking-widest uppercase font-semibold">
                  {story.readTime}
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="font-['Manrope'] text-[9px] text-[#9e3d00] uppercase tracking-[0.2em] font-bold">
                    {story.category}
                  </span>
                  <h4 className="font-['EB_Garamond'] text-xl text-[#111111] group-hover:text-[#B94700] transition-colors leading-snug font-medium">
                    {story.title}
                  </h4>
                  <p className="font-['Manrope'] text-xs text-[#594238] line-clamp-3 leading-relaxed">
                    {story.subtitle}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E9DFD2] flex items-center justify-between text-[#57534E] group-hover:text-[#111111] font-['Manrope'] text-[10px] uppercase tracking-widest">
                  <span>By {story.author}</span>
                  <span className="material-symbols-outlined text-[16px] transform group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 4. FULL-BLEED MONOGRAPH 4K FILM DISPATCH */}
      <section className="w-full mb-24 bg-[#111111] text-white overflow-hidden relative">
        <div className="w-full min-h-[580px] relative">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-60"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCrrPuQyWcV29Pffc3bW8rPHATQJw9p4syhCP5ZEQGL26DKO4WFThbTLC3ROXHYIrd0ACkUH4ePr4yJj-cTywWvW14yvUkjBBwV4mw0QWz50QWNSRLtZxJ5An6K2ALRtzgx6D_ce7DSACBTnowYCIqlY3j5eWt4a4iS50ytHVhySniHzVCh5uUnnSOz7yYq0Kp5Nkxs40KYbxhwHYMPAvRr1gltdGzHbvOziIRt1iXF')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-[#111111]/70 to-transparent" />

          <div className="relative z-10 max-w-[1600px] h-full mx-auto px-4 md:px-8 lg:px-16 flex flex-col justify-between py-16">
            <div className="flex items-center justify-between font-['Manrope']">
              <div className="flex items-center gap-2">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#B94700] animate-pulse" />
                <span className="text-[10px] tracking-[0.25em] uppercase text-[#E9DFD2] font-semibold">
                  Atelier Film • 4K Monograph
                </span>
              </div>
              <span className="text-[10px] tracking-widest uppercase opacity-70">
                Duration: 14 min 32 sec
              </span>
            </div>

            <div className="max-w-2xl space-y-4 py-8">
              <h2 className="font-['EB_Garamond'] text-3xl sm:text-5xl text-white font-normal leading-tight">
                Savoir-Faire Monograph: The Art of Invisible Seams
              </h2>
              <p className="font-['Manrope'] text-xs sm:text-sm text-[#E9DFD2]/90 leading-relaxed font-light">
                An intimate visual study capturing the exact millimeter precision demanded by the 'Couture Floue' technique—where raw silk chiffon yields entirely to the artisan’s fingers.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setFilmPlaying(!filmPlaying)}
                  className="flex items-center gap-2 px-8 py-3.5 bg-[#B94700] hover:bg-white hover:text-[#111111] text-white font-['Manrope'] text-xs tracking-[0.18em] uppercase font-semibold transition-all cursor-pointer shadow-md"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {filmPlaying ? 'pause' : 'play_arrow'}
                  </span>
                  <span>{filmPlaying ? 'Playing Monograph Film' : 'Watch Monograph Film'}</span>
                </button>
              </div>
            </div>

            {/* Chapter Markers */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 bg-black/40 backdrop-blur-md px-6 py-4 border border-white/10 font-['Manrope']">
              <div>
                <span className="text-[10px] text-[#ffb595] font-bold uppercase block">01 / 04:12</span>
                <p className="text-xs text-white/90 truncate">Preparation of Silk Gauze</p>
              </div>
              <div>
                <span className="text-[10px] text-[#ffb595] font-bold uppercase block">02 / 07:45</span>
                <p className="text-xs text-white/90 truncate">The Blind Blindstitch Method</p>
              </div>
              <div>
                <span className="text-[10px] text-[#ffb595] font-bold uppercase block">03 / 11:20</span>
                <p className="text-xs text-white/90 truncate">Steam Tension & Silhouette</p>
              </div>
              <div>
                <span className="text-[10px] text-[#ffb595] font-bold uppercase block">04 / 14:32</span>
                <p className="text-xs text-white/90 truncate">Final Haute Fitting Review</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. MONUMENTAL MANIFESTO QUOTE */}
      <section className="w-full bg-[#E9DFD2]/30 py-20 mb-20 border-t border-b border-[#E9DFD2]">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 text-center space-y-6">
          <span className="font-['Manrope'] text-[10px] text-[#B94700] uppercase tracking-[0.3em] font-bold block">
            The CYOF Manifesto • #CraftedYourOwnFashion
          </span>
          <blockquote className="font-['EB_Garamond'] text-2xl sm:text-4xl text-[#111111] font-normal italic max-w-4xl mx-auto leading-relaxed">
            “True luxury does not clamor for attention; it exists in the quiet certitude of the stitch, the cadence of the loom, and the reverence for time unhurried.”
          </blockquote>
          <div className="pt-2 flex flex-col items-center justify-center space-y-0.5 font-['Manrope']">
            <span className="text-xs tracking-[0.2em] text-[#111111] uppercase font-bold">Jean-Paul de Valois</span>
            <span className="text-[10px] text-[#57534E] uppercase tracking-widest">Master Couturier & Creative Patriarch (1934–2002)</span>
          </div>
        </div>
      </section>

      {/* 6. SHOPPABLE EDITORIAL CURATION ROW */}
      <section className="w-full max-w-[1600px] mx-auto px-4 md:px-8 lg:px-16 mb-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#E9DFD2]">
          <div>
            <span className="font-['Manrope'] text-[10px] text-[#9e3d00] uppercase tracking-[0.25em] block mb-1 font-bold">
              Editorial Selection
            </span>
            <h3 className="font-['EB_Garamond'] text-3xl md:text-4xl text-[#111111]">
              Pieces Featured in This Tome
            </h3>
          </div>
          <span className="font-['Manrope'] text-xs text-[#57534E]">
            Bespoke commission available upon private salon consultation
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.slice(0, 4).map((p) => (
            <div key={p.id} className="group flex flex-col bg-[#f6f3ee] p-4 border border-[#E9DFD2] shadow-xs">
              <div className="aspect-[3/4] overflow-hidden bg-[#ebe8e3] mb-4 relative">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-[#111111] text-white font-['Manrope'] text-[8px] px-2 py-0.5 tracking-widest uppercase font-semibold">
                  Atelier Look
                </div>
              </div>
              <span className="font-['Manrope'] text-[9px] text-[#57534E] uppercase tracking-widest mb-1">{p.category}</span>
              <h5 className="font-['EB_Garamond'] text-lg text-[#111111] font-medium mb-1 line-clamp-1">{p.name}</h5>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#E9DFD2] font-['Manrope']">
                <span className="text-xs font-semibold text-[#111111]">₹{p.price.toLocaleString('en-IN')}</span>
                <button
                  onClick={() => onAddToCart(p)}
                  className="text-[10px] font-bold text-[#B94700] hover:text-[#111111] uppercase tracking-wider cursor-pointer"
                >
                  Allocate
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. THE CYOF GAZETTE DISPATCH REGISTRATION */}
      <section className="w-full max-w-[1600px] mx-auto px-4 md:px-8 lg:px-16 mb-28">
        <div className="bg-[#111111] text-white p-8 md:p-14 lg:p-16 border border-[#E9DFD2] relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-6 space-y-3">
              <div className="flex items-center gap-2 text-[#ffb595] font-['Manrope']">
                <span className="material-symbols-outlined text-[18px]">mark_email_read</span>
                <span className="text-[10px] tracking-[0.25em] uppercase font-bold">Privileged Correspondence</span>
              </div>
              <h3 className="font-['EB_Garamond'] text-3xl sm:text-4xl text-white font-normal">
                Receive The Bi-Monthly Printed Monograph
              </h3>
              <p className="font-['Manrope'] text-xs sm:text-sm text-[#E9DFD2]/80 max-w-lg leading-relaxed font-light">
                Printed in limited editions of 1,200 copies on 160gsm Fedrigoni archival paper. Registered patrons receive seasonal physical dispatches, salon previews, and monograph reprints delivered globally.
              </p>
            </div>

            <div className="lg:col-span-6">
              <form onSubmit={handleGazetteSubmit} className="space-y-3 font-['Manrope']">
                <div className="flex flex-col sm:flex-row gap-0">
                  <input
                    type="email"
                    required
                    value={gazetteEmail}
                    onChange={(e) => setGazetteEmail(e.target.value)}
                    placeholder="YOUR PREFERRED MAILING ADDRESS"
                    className="w-full bg-[#f6f3ee] text-[#111111] text-xs px-5 py-3.5 placeholder-[#57534E] focus:outline-none uppercase tracking-wider"
                  />
                  <button
                    type="submit"
                    className="px-8 py-3.5 bg-[#B94700] hover:bg-white hover:text-[#111111] text-white text-xs tracking-[0.2em] uppercase font-semibold transition-colors flex-shrink-0 cursor-pointer shadow-md"
                  >
                    Enroll
                  </button>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-[#E9DFD2]/60 uppercase tracking-widest">
                  <span className="material-symbols-outlined text-[14px] text-[#ffb595]">verified</span>
                  <span>Complimentary for patrons of CYOF. Strict confidentiality assured.</span>
                </div>
                {gazetteSubscribed && (
                  <p className="text-xs text-[#ffb595] tracking-widest uppercase pt-2">
                    ✓ Thank you. Your dossier invitation has been prepared for dispatch.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
