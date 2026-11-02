import React, { useState, useEffect } from 'react';
import { Article, Product, ViewRoute } from '../types';
import { PRODUCTS } from '../data/mockData';

interface ArticleDetailViewProps {
  article: Article;
  onNavigate: (route: ViewRoute) => void;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const ArticleDetailView: React.FC<ArticleDetailViewProps> = ({
  article,
  onNavigate,
  onAddToCart,
  onSelectProduct,
}) => {
  const [readProgress, setReadProgress] = useState(0);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [lightboxPlate, setLightboxPlate] = useState<string | null>(null);
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  // Scroll reading progress listener
  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (height > 0) {
        const scrolled = (winScroll / height) * 100;
        setReadProgress(Math.min(100, Math.max(0, scrolled)));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const ensemblePieces = [
    PRODUCTS[1], // Sforza Trench
    PRODUCTS[0], // Palazzo Tote
    {
      id: 'arca-trouser',
      name: 'The Arca Raw-Silk Trouser',
      subtitle: 'Separates',
      category: 'Separates',
      price: 155000,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCd3rXvUeTfATgd8vxEqCtgM2Ul4MV3_fg1Fs8_Yvvl4OyKEvHoMv99nyBU1SW5l1pawfIb0O_s-EGzmrjL1ucfuHV4mP1DyIeXdjNTn3kr1Q0s_l2Y8R-wEK0WU2oSdO8siGa7vkahR2k3bm9NlFKdatsJMHIgr1TCQwib9QxJ7Rn3lDDV9sTYAi3N9MozGRzC-uzNgxIayRRnHPLa5GGKQDVkSNinRIQDR55x5Plz',
      images: [],
      description: 'Unlined raw silk trousers in chalk white draped on clean mannequin with sculptural wide leg silhouette.',
      shades: [{ name: 'Chalk White', color: '#F3EFEA' }],
      sizes: [{ label: 'IT 40', dimensions: 'Standard' }],
    },
    {
      id: 'cosimo-slipper',
      name: 'The Cosimo Horsehide Slipper',
      subtitle: 'Footwear',
      category: 'Footwear',
      price: 135000,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZzowpCzPcx5mHZOyld4KBfoZyHQP0qLxErt4mjFtPn8FpjeSKS5hQGEFG--hMARs4S4Wr-R3XrXjkmQCuKgBeQ8F48Ux08Y1KuHAFizAcNztiaRcicq3zxGGjaCEkGW7Zy5F4zsW2pm1S4Im8XJ7pKD1he_1PqKfqivOfaPMks1cHJHbdUTdQlv9b-jyxw0Vf-htjJVXKjg8d_pluMFj5cv9hGyKPgU82uEX5_IO4',
      images: [],
      description: 'Handmade pointed Florentine slippers in buffed horsehide leather with hand-carved stacked wooden sole.',
      shades: [{ name: 'Espresso', color: '#2B2725' }],
      sizes: [{ label: 'EU 42', dimensions: 'Standard' }],
    },
  ];

  return (
    <div className="w-full flex flex-col bg-[#F8F5F0] min-h-screen text-[#1c1c19]">
      {/* Reading Progress Bar (Fixed beneath main header) */}
      <div className="fixed top-[84px] lg:top-[124px] left-0 right-0 h-[2px] bg-[#E9DFD2]/60 z-40">
        <div
          className="h-full bg-[#B94700] transition-all duration-150 ease-out"
          style={{ width: `${readProgress}%` }}
        />
      </div>

      {/* Lightbox Modal */}
      {lightboxPlate && (
        <div
          className="fixed inset-0 z-50 bg-[#111111]/90 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setLightboxPlate(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#f6f3ee] p-6 space-y-4 border border-[#E9DFD2]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center pb-2 border-b border-[#E9DFD2]">
              <span className="font-['Manrope'] text-xs uppercase tracking-widest text-[#111111] font-semibold">
                MONOGRAPH ARCHIVE STUDY PLATE — {lightboxPlate.toUpperCase()}
              </span>
              <button
                onClick={() => setLightboxPlate(null)}
                className="text-[#111111] hover:text-[#B94700] transition-colors"
              >
                <span className="material-symbols-outlined text-[24px]">close</span>
              </button>
            </div>
            <div className="aspect-[16/10] w-full overflow-hidden bg-[#ebe8e3]">
              <img
                src={
                  lightboxPlate === 'fig-3'
                    ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuAi_DIXxJB-MUIyFNvsOqHCHy2T1FE4WdGVA7BtYjYQyn6VSRAydrzLEInOeDdd5w5QwhRPGd3XIS54BaFWbmMKCWmJzRsl3FRa4YE_t6mm0_EgR3PPYsvdkRah0ocIeBeOQ-hJIjQXAFOPGPN9NEovwXZdpG7GPQTvyD-QF3JHnk4gPNPgsYSLjblLLaiUI5SAAGcoqlPx-w2X7EZNKadX-ymtMdc1nsuleW3lw2Rg'
                    : 'https://lh3.googleusercontent.com/aida-public/AB6AXuByIIAACfRhsBPDlmBAQqwhS1jRZ2udVsphNfReUR5OAC9jHclPh05dRULI1dxged27O8M9fn3uT0-fzcemQN_zjJNVARorTw8Ou_WM020FOOI8uj8fzPxAS9v6AkOfRhOWLbsDMMIY1-NlieJ3_HV82KvsKAgJIOsqE5LRbMA2BxztOMFiup0GGbTVHaC-2M7D8P03y_nikh4Bqx6BiT2frhPJCFTQ-h52b_kpsviw'
                }
                alt="Plate study"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex justify-between items-center text-[#57534E] text-xs font-['Manrope']">
              <span className="italic">Florentine Atelier Archive, Negative Ref #4088-B</span>
              <button
                onClick={() => setLightboxPlate(null)}
                className="uppercase tracking-widest hover:text-[#111111] font-semibold"
              >
                CLOSE VIEWER
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="w-full max-w-[1600px] mx-auto px-4 md:px-8 lg:px-16 pt-8 pb-4">
        <ol className="flex flex-wrap items-center gap-2 font-['Manrope'] text-[10px] tracking-[0.2em] text-[#57534E] uppercase">
          <li>
            <button onClick={() => onNavigate('home')} className="hover:text-[#B94700] transition-colors cursor-pointer">
              HOME
            </button>
          </li>
          <li className="text-[#E9DFD2]">/</li>
          <li>
            <button onClick={() => onNavigate('journal')} className="hover:text-[#B94700] transition-colors cursor-pointer">
              LE JOURNAL
            </button>
          </li>
          <li className="text-[#E9DFD2]">/</li>
          <li className="text-[#111111] font-semibold truncate max-w-xs md:max-w-none">
            THE ARCHITECTURE OF SOLITUDE AND GRACE
          </li>
        </ol>
      </nav>

      {/* Editorial Header Section */}
      <header className="w-full max-w-[1600px] mx-auto px-4 md:px-8 lg:px-16 pt-4 pb-12">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-3">
            <span className="w-6 h-[1px] bg-[#9e3d00]" />
            <span className="font-['Manrope'] text-[10px] text-[#9e3d00] tracking-[0.25em] uppercase font-bold">
              MONOGRAPH SERIES • ISSUE XIV • #CraftedYourOwnFashion
            </span>
            <span className="w-6 h-[1px] bg-[#9e3d00]" />
          </div>

          <h1 className="font-['EB_Garamond'] text-4xl sm:text-5xl md:text-6xl lg:text-[68px] leading-[1.08] text-[#111111] font-normal tracking-[-0.025em]">
            The Architecture of Solitude and Grace
          </h1>

          <p className="font-['EB_Garamond'] text-lg sm:text-xl text-[#594238] max-w-2xl mx-auto italic leading-relaxed">
            Exploring the monastic discipline of hand-split cashmere, zero-synthetic linings, and the silent luxury of unhurried Florentine tailoring.
          </p>

          {/* Byline & Share Bar */}
          <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 bg-[#f6f3ee] px-6 py-4 border border-[#E9DFD2]">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-2 font-['Manrope'] text-[10px] text-[#57534E] uppercase tracking-widest">
              <span>WORDS <strong className="text-[#111111] ml-1">{article.author}</strong></span>
              <span className="text-[#E9DFD2]">•</span>
              <span>PHOTOGRAPHY <strong className="text-[#111111] ml-1">MARCO BELLINI</strong></span>
              <span className="text-[#E9DFD2]">•</span>
              <span>OCTOBER 2026</span>
              <span className="text-[#E9DFD2]">•</span>
              <span className="text-[#B94700] font-bold">7 MINUTE READ</span>
            </div>

            <div className="flex items-center gap-4 text-[#111111] font-['Manrope']">
              <span className="text-[9px] uppercase tracking-widest text-[#57534E]">SHARE:</span>
              <button
                type="button"
                onClick={handleCopyLink}
                className="hover:text-[#B94700] transition-colors flex items-center cursor-pointer"
                title="Copy Link"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {copiedLink ? 'check' : 'link'}
                </span>
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="hover:text-[#B94700] transition-colors flex items-center cursor-pointer"
                title="Print Edition"
              >
                <span className="material-symbols-outlined text-[18px]">print</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Dramatic Editorial Imagery Hero Spread */}
      <section className="w-full max-w-[1600px] mx-auto px-4 md:px-8 lg:px-16 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Hero Portrait */}
          <figure className="lg:col-span-7 bg-[#f0ede9] border border-[#E9DFD2] overflow-hidden group">
            <div className="aspect-[4/5] w-full overflow-hidden">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMapdCJU-698T6ME8Ik6ue9yL_1IG2UXM9vPwaUoQE_St0llIpivYT-A0KfZLnWEzbVD8pNjZtMiXOeodFoz5vJGM6e8DghFmH_cBblyMdZ6Qdl9hFCJh9YvykBFhMLKQtgz0pxsPEdoK5QCjMKZx6xbuySVTryyUeQtcu_gbAUhyDzuYAe3HyppVL2U9rl08paEC08CgUwabGOkAK0KcF5OfzYtQVmf8kv_-WoOcH"
                alt="Editorial cashmere trench portrait in Florence palazzo"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
              />
            </div>
            <figcaption className="p-4 bg-[#f6f3ee] flex justify-between items-center text-[#57534E] font-['Manrope'] text-[10px]">
              <span className="uppercase tracking-widest font-semibold">FIG. 01 — THE SCULPTURAL SILHOUETTE</span>
              <span className="italic">Villa Medici Atelier, Florence</span>
            </figcaption>
          </figure>

          {/* Right Companion Spread */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <figure className="bg-[#f0ede9] border border-[#E9DFD2] overflow-hidden flex-1 group">
              <div className="h-full min-h-[300px] w-full overflow-hidden">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAJa39i-9AF4e0zwlWsyz4gVH2CNm4Seg9fCS4lnXWgDBFm7lWs4kc3Lfkusn3BSAoYy1Pfj_sGFvQS9S4dihFH5iiszO5A7dQl48s9w5wtZts7Aa0i7y312p2Xn0_N43wN3vFiYXEIvBJ0y-N6xGRj--5AnWPuq-ShbhfRC9mlP0OpTfROTjI7WqTaQ4e9tNnQYCMUZephofKIp3wPDlBuPRcLJucp36uVSyLVzrF"
                  alt="Splitting double-faced wool"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                />
              </div>
              <figcaption className="p-4 bg-[#f6f3ee] text-[#57534E] flex justify-between items-center font-['Manrope'] text-[10px]">
                <span className="uppercase tracking-widest font-semibold">FIG. 02 — SPLIT-WEFT COUTURE SEAMING</span>
                <span className="text-[#B94700] font-bold">0.4MM TOLERANCE</span>
              </figcaption>
            </figure>

            {/* Architectural Epigraph Card */}
            <div className="p-6 bg-[#f0ede9] border border-[#E9DFD2] space-y-2">
              <span className="font-['Manrope'] text-[9px] text-[#9e3d00] tracking-[0.2em] uppercase font-bold">
                ATELIER NOTEBOOK
              </span>
              <p className="font-['EB_Garamond'] text-lg text-[#111111] italic leading-snug">
                “When every superfluous seam is eliminated, the body does not merely wear the garment; it inhabits an architecture of unforced stillness.”
              </p>
              <span className="font-['Manrope'] text-[10px] text-[#57534E] uppercase tracking-widest block pt-1">
                — GIANLUCA MORETTI, MAÎTRE TAILLEUR
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Asymmetric Reading Layout */}
      <section className="w-full max-w-[1600px] mx-auto px-4 md:px-8 lg:px-16 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Sticky Sidebar (w-1/4 = 3-4 cols) */}
          <aside className="lg:col-span-4 xl:col-span-3 space-y-8 lg:sticky lg:top-28 self-start">
            
            {/* Audio Monograph Player */}
            <div className="p-6 bg-[#f6f3ee] border border-[#E9DFD2] space-y-4 shadow-xs">
              <div className="flex items-center justify-between font-['Manrope'] text-[10px]">
                <span className="text-[#B94700] tracking-[0.2em] uppercase font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#B94700] animate-pulse" />
                  AUDIO MONOGRAPH
                </span>
                <span className="text-[#57534E]">11:20</span>
              </div>
              <p className="font-['EB_Garamond'] text-lg text-[#111111] italic leading-tight">
                Listen to essay narrated by Hélène de Saint-Germain
              </p>

              <div className="space-y-3 pt-1">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setAudioPlaying(!audioPlaying)}
                    className="w-10 h-10 bg-[#111111] hover:bg-[#B94700] text-white flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {audioPlaying ? 'pause' : 'play_arrow'}
                    </span>
                  </button>
                  <div className="flex-1 space-y-1">
                    <div className="w-full h-1 bg-[#E9DFD2] relative">
                      <div className={`h-full bg-[#B94700] ${audioPlaying ? 'w-1/2 animate-pulse' : 'w-1/3'}`} />
                    </div>
                    <div className="flex justify-between font-['Manrope'] text-[9px] text-[#57534E]">
                      <span>{audioPlaying ? '05:40' : '03:45'}</span>
                      <span>11:20</span>
                    </div>
                  </div>
                </div>

                {/* Animated Soundwave Graphic */}
                <div className="flex items-end gap-[3px] h-4 pt-1 opacity-70">
                  <span className="w-1 h-2 bg-[#111111] animate-pulse" />
                  <span className="w-1 h-3 bg-[#111111]" />
                  <span className="w-1 h-4 bg-[#B94700] animate-pulse" />
                  <span className="w-1 h-2 bg-[#111111]" />
                  <span className="w-1 h-3 bg-[#B94700]" />
                  <span className="w-1 h-4 bg-[#B94700]" />
                  <span className="w-1 h-1 bg-[#111111]" />
                  <span className="w-1 h-3 bg-[#111111] animate-pulse" />
                  <span className="w-1 h-2 bg-[#111111]" />
                  <span className="w-1 h-4 bg-[#B94700]" />
                </div>
              </div>
            </div>

            {/* Table of Contents */}
            <div className="p-6 bg-[#f6f3ee] border border-[#E9DFD2] space-y-3">
              <span className="font-['Manrope'] text-[10px] text-[#57534E] tracking-[0.2em] uppercase block font-semibold">
                INDEX OF CHAPTERS
              </span>
              <nav className="space-y-2.5 font-['Manrope'] text-xs">
                <a href="#chapter-1" className="block text-[#B94700] font-semibold hover:underline">
                  <span className="font-['EB_Garamond'] italic mr-2 text-[#57534E]">I.</span>
                  The Philosophy of Stillness
                </a>
                <a href="#chapter-2" className="block text-[#594238] hover:text-[#111111] hover:underline">
                  <span className="font-['EB_Garamond'] italic mr-2 text-[#57534E]">II.</span>
                  Biella Cashmere Provenance
                </a>
                <a href="#chapter-3" className="block text-[#594238] hover:text-[#111111] hover:underline">
                  <span className="font-['EB_Garamond'] italic mr-2 text-[#57534E]">III.</span>
                  Invisible Hand-Stitching
                </a>
                <a href="#chapter-4" className="block text-[#594238] hover:text-[#111111] hover:underline">
                  <span className="font-['EB_Garamond'] italic mr-2 text-[#57534E]">IV.</span>
                  Archival Provenance
                </a>
              </nav>
            </div>

            {/* Shoppable Featured Pieces Box */}
            <div className="p-6 bg-[#f0ede9] border border-[#E9DFD2] space-y-6">
              <div className="flex items-center justify-between font-['Manrope']">
                <span className="text-[10px] text-[#111111] tracking-[0.2em] uppercase font-bold">
                  FEATURED ATELIER PIECES
                </span>
                <span className="text-[10px] text-[#B94700] font-bold">(2)</span>
              </div>

              {/* Card 1 */}
              <div className="space-y-2">
                <div className="aspect-[4/5] bg-white overflow-hidden border border-[#E9DFD2]">
                  <img src={PRODUCTS[0].image} alt={PRODUCTS[0].name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <span className="font-['Manrope'] text-[9px] uppercase tracking-widest text-[#57534E]">LEATHER GOODS</span>
                  <h4 className="font-['EB_Garamond'] text-lg text-[#111111] leading-snug">{PRODUCTS[0].name}</h4>
                  <p className="font-['Manrope'] text-xs font-semibold text-[#111111]">₹{PRODUCTS[0].price.toLocaleString('en-IN')}</p>
                </div>
                <button
                  onClick={() => onSelectProduct(PRODUCTS[0])}
                  className="w-full py-2.5 bg-[#111111] hover:bg-[#B94700] text-white font-['Manrope'] text-[10px] uppercase tracking-widest transition-colors font-semibold cursor-pointer"
                >
                  INQUIRE & ACQUIRE
                </button>
              </div>

              {/* Card 2 */}
              <div className="space-y-2 pt-4 border-t border-[#E9DFD2]">
                <div className="aspect-[4/5] bg-white overflow-hidden border border-[#E9DFD2]">
                  <img src={PRODUCTS[1].image} alt={PRODUCTS[1].name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <span className="font-['Manrope'] text-[9px] uppercase tracking-widest text-[#57534E]">HAUTE TAILORING</span>
                  <h4 className="font-['EB_Garamond'] text-lg text-[#111111] leading-snug">{PRODUCTS[1].name}</h4>
                  <p className="font-['Manrope'] text-xs font-semibold text-[#111111]">₹{PRODUCTS[1].price.toLocaleString('en-IN')}</p>
                </div>
                <button
                  onClick={() => onSelectProduct(PRODUCTS[1])}
                  className="w-full py-2.5 bg-[#111111] hover:bg-[#B94700] text-white font-['Manrope'] text-[10px] uppercase tracking-widest transition-colors font-semibold cursor-pointer"
                >
                  INQUIRE & ACQUIRE
                </button>
              </div>
            </div>
          </aside>

          {/* Right Main Body (8-9 cols) */}
          <article className="lg:col-span-8 xl:col-span-9 max-w-3xl space-y-12">
            
            {/* Chapter I */}
            <section id="chapter-1" className="space-y-6 scroll-mt-32">
              <div className="flex items-center gap-4">
                <span className="font-['EB_Garamond'] text-2xl text-[#B94700] italic font-normal">I.</span>
                <span className="w-12 h-[1px] bg-[#E9DFD2]" />
                <span className="font-['Manrope'] text-[10px] tracking-[0.2em] text-[#57534E] uppercase font-bold">
                  The Philosophy of Stillness
                </span>
              </div>
              <div className="space-y-6 font-['Manrope'] text-sm sm:text-base text-[#1c1c19] leading-[1.8]">
                <p className="first-letter:float-left first-letter:text-[68px] first-letter:leading-[58px] first-letter:font-['EB_Garamond'] first-letter:mr-4 first-letter:text-[#B94700]">
                  There is an unmistakable quiet that descends upon the Florentine atelier at dawn. Before the pressing irons release their dry, aromatic steam, before the heavy tailor’s shears bite into raw wool, the room belongs strictly to stone, cold morning light, and patience. In an epoch defined by rapid turnover and algorithmic acceleration, CYOF has deliberately retreated to a monastic discipline: the insistence that true sartorial dignity cannot be hurried, syntheticized, or duplicated by machine.
                </p>
                <p>
                  Clothing, when reduced to its purest architectural reality, is the first threshold between the human body and the world. To strip away synthetic interlinings, chemical fusing glues, and visible ostentation is not merely an aesthetic choice; it is an ideological reclamation of quietude.
                </p>
              </div>
            </section>

            {/* Pull Quote */}
            <blockquote className="my-10 py-10 px-8 bg-[#f0ede9] border border-[#E9DFD2] relative overflow-hidden">
              <div className="max-w-2xl mx-auto text-center space-y-3 relative z-10">
                <span className="font-['EB_Garamond'] text-[#B94700] text-5xl leading-none select-none">“</span>
                <p className="font-['EB_Garamond'] text-2xl sm:text-3xl text-[#111111] italic leading-snug">
                  Form exists not to decorate life, but to give dignity to stillness.
                </p>
                <div className="pt-2">
                  <span className="w-12 h-[1px] bg-[#9e3d00] mx-auto block mb-2" />
                  <cite className="font-['Manrope'] text-[10px] text-[#57534E] uppercase tracking-[0.2em] not-italic font-semibold">
                    JEAN-PAUL LAURENT — CREATIVE DIRECTOR'S MANIFESTO, 1974
                  </cite>
                </div>
              </div>
            </blockquote>

            {/* Chapter II */}
            <section id="chapter-2" className="space-y-6 scroll-mt-32">
              <div className="flex items-center gap-4">
                <span className="font-['EB_Garamond'] text-2xl text-[#B94700] italic font-normal">II.</span>
                <span className="w-12 h-[1px] bg-[#E9DFD2]" />
                <span className="font-['Manrope'] text-[10px] tracking-[0.2em] text-[#57534E] uppercase font-bold">
                  Biella Cashmere Provenance
                </span>
              </div>
              <div className="space-y-6 font-['Manrope'] text-sm sm:text-base text-[#1c1c19] leading-[1.8]">
                <p>
                  The journey of the Double-Faced Sforza Trench begins at the base of the Piedmont Alps, in the water-rich valley of Biella. Here, the mineral composition of the alpine glacial streams possesses an extraordinary softness, free of calcium and harsh carbonates. When the raw Capra Hircus underfleece is washed in these currents, the natural lanolin remains intact, preserving a dry, sensorial resilience that chemical softeners could only imitate and ultimately destroy.
                </p>
                <p>
                  Two distinct layers of superfine 14.5-micron yarn are loomed simultaneously, interconnected by microscopic tie-threads spaced exactly four millimeters apart. The resulting fabric yields two right faces—there is no interior, no backside, and no rough seam allowance.
                </p>
              </div>

              {/* Technical Monograph Specification Box */}
              <div className="my-8 p-6 sm:p-8 bg-[#f6f3ee] border border-[#E9DFD2] shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E9DFD2]">
                  <div>
                    <span className="font-['Manrope'] text-[10px] text-[#B94700] uppercase tracking-[0.2em] font-bold">
                      ATELIER SPECIFICATION SHEET
                    </span>
                    <h4 className="font-['EB_Garamond'] text-xl text-[#111111] mt-1 font-semibold">
                      Sforza Double-Faced Construction Data
                    </h4>
                  </div>
                  <span className="font-['Manrope'] text-[9px] bg-[#E9DFD2] px-3 py-1 text-[#111111] tracking-widest uppercase font-semibold">
                    CERTIFIED NATURALIA
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 font-['EB_Garamond']">
                  <div>
                    <span className="text-[#B94700] block text-3xl font-normal">36h</span>
                    <span className="font-['Manrope'] text-[9px] text-[#57534E] uppercase tracking-widest block mt-1">
                      HAND-SEWING DEDICATED
                    </span>
                  </div>
                  <div>
                    <span className="text-[#111111] block text-3xl font-normal">14.5μ</span>
                    <span className="font-['Manrope'] text-[9px] text-[#57534E] uppercase tracking-widest block mt-1">
                      MICRON CASHMERE GRADE
                    </span>
                  </div>
                  <div>
                    <span className="text-[#B94700] block text-3xl font-normal">0%</span>
                    <span className="font-['Manrope'] text-[9px] text-[#57534E] uppercase tracking-widest block mt-1">
                      SYNTHETIC FIBERS OR GLUES
                    </span>
                  </div>
                  <div>
                    <span className="text-[#111111] block text-3xl font-normal">4</span>
                    <span className="font-['Manrope'] text-[9px] text-[#57534E] uppercase tracking-widest block mt-1">
                      MASTER TAILOR TOUCHPOINTS
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* High-Res Imagery Lightbox Feature */}
            <section className="space-y-4 my-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <figure
                  onClick={() => setLightboxPlate('fig-3')}
                  className="bg-[#f0ede9] border border-[#E9DFD2] cursor-pointer group"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAi_DIXxJB-MUIyFNvsOqHCHy2T1FE4WdGVA7BtYjYQyn6VSRAydrzLEInOeDdd5w5QwhRPGd3XIS54BaFWbmMKCWmJzRsl3FRa4YE_t6mm0_EgR3PPYsvdkRah0ocIeBeOQ-hJIjQXAFOPGPN9NEovwXZdpG7GPQTvyD-QF3JHnk4gPNPgsYSLjblLLaiUI5SAAGcoqlPx-w2X7EZNKadX-ymtMdc1nsuleW3lw2Rg"
                      alt="Leather burnishing"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-3 bg-[#f6f3ee] flex justify-between items-center text-[#57534E] font-['Manrope'] text-[10px]">
                    <span className="uppercase tracking-widest font-semibold">FIG. 03 — LEATHER BURNISHING</span>
                    <span className="material-symbols-outlined text-[16px] text-[#111111]">zoom_in</span>
                  </div>
                </figure>

                <figure
                  onClick={() => setLightboxPlate('fig-4')}
                  className="bg-[#f0ede9] border border-[#E9DFD2] cursor-pointer group"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuByIIAACfRhsBPDlmBAQqwhS1jRZ2udVsphNfReUR5OAC9jHclPh05dRULI1dxged27O8M9fn3uT0-fzcemQN_zjJNVARorTw8Ou_WM020FOOI8uj8fzPxAS9v6AkOfRhOWLbsDMMIY1-NlieJ3_HV82KvsKAgJIOsqE5LRbMA2BxztOMFiup0GGbTVHaC-2M7D8P03y_nikh4Bqx6BiT2frhPJCFTQ-h52b_kpsviw"
                      alt="Blind hemming method"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-3 bg-[#f6f3ee] flex justify-between items-center text-[#57534E] font-['Manrope'] text-[10px]">
                    <span className="uppercase tracking-widest font-semibold">FIG. 04 — BLIND HEMMING METHOD</span>
                    <span className="material-symbols-outlined text-[16px] text-[#111111]">zoom_in</span>
                  </div>
                </figure>
              </div>
              <p className="font-['Manrope'] text-xs text-[#57534E] italic text-center">
                Photographs taken inside the historic Via de' Benci atelier, Florence. Click any plate to inspect.
              </p>
            </section>

            {/* Chapter III */}
            <section id="chapter-3" className="space-y-6 scroll-mt-32">
              <div className="flex items-center gap-4">
                <span className="font-['EB_Garamond'] text-2xl text-[#B94700] italic font-normal">III.</span>
                <span className="w-12 h-[1px] bg-[#E9DFD2]" />
                <span className="font-['Manrope'] text-[10px] tracking-[0.2em] text-[#57534E] uppercase font-bold">
                  Invisible Hand-Stitching
                </span>
              </div>
              <div className="space-y-6 font-['Manrope'] text-sm sm:text-base text-[#1c1c19] leading-[1.8]">
                <p>
                  The real miracle of the garment occurs during the splitting of the edge. With a custom razor blade gripped lightly between thumb and index finger, the craftsperson manually separates the two interwoven layers to a precise depth of six millimeters.
                </p>
                <p>
                  Both raw edges are subsequently folded inward upon themselves and blind-stitched with a single strand of raw silk thread. When complete, the stitch vanishes completely into the fiber structure. No machine has ever successfully replicated this tension; human fingers calibrate the micro-friction of every centimeter, ensuring the seam moves like living skin rather than structured armor.
                </p>
              </div>
            </section>

            {/* Chapter IV */}
            <section id="chapter-4" className="space-y-6 scroll-mt-32">
              <div className="flex items-center gap-4">
                <span className="font-['EB_Garamond'] text-2xl text-[#B94700] italic font-normal">IV.</span>
                <span className="w-12 h-[1px] bg-[#E9DFD2]" />
                <span className="font-['Manrope'] text-[10px] tracking-[0.2em] text-[#57534E] uppercase font-bold">
                  Archival Provenance
                </span>
              </div>
              <div className="space-y-6 font-['Manrope'] text-sm sm:text-base text-[#1c1c19] leading-[1.8]">
                <p>
                  A coat crafted in this manner is not meant for a singular season. It enters the wearer’s wardrobe as an enduring companion—softening with humidity, acquiring an intimate memory of movement, and passing quietly into the lineage of personal heirlooms. In this radical deceleration of creation lies the highest definition of modern luxury: the preservation of human soul within the inanimate cloth.
                </p>
              </div>
            </section>

            {/* Author Signature & Colophon */}
            <div className="pt-10 border-t border-[#E9DFD2] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-[#f0ede9] rounded-full overflow-hidden border border-[#E9DFD2]">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAb6AWVYrsz7qelU5GwgGDowN_WI5nHmS6FWbktffNW_uFJU9MsHIkgeof50aRQU_tbCSg2cY3NSAdRenzZECWoPOY9jdQWF5IlvD35JMT_bxlzCnxJ-k7H3YlAFhV5tJBXZi9su7ivSmUfbTm4EN5KQKP7k21NgcA6HDSdtTUylVQKsxIsJlYT5Aw4f6xuRlvvpdsVgYGj131vRFYgBlIuuArefnvfT-sEtkQjYToM"
                    alt="Hélène de Saint-Germain"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h5 className="font-['EB_Garamond'] text-xl text-[#111111]">{article.author}</h5>
                  <p className="font-['Manrope'] text-xs text-[#57534E]">Senior Monograph Editor, Mumbai Atelier</p>
                </div>
              </div>
              <div className="text-right font-['Manrope']">
                <span className="text-[10px] text-[#B94700] tracking-[0.2em] uppercase block font-bold">
                  MUMBAI • NEW DELHI • BENGALURU
                </span>
                <span className="text-xs text-[#57534E] italic font-['EB_Garamond']">Colophon No. 892-C</span>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Shoppable Ensemble Showcase */}
      <section className="w-full bg-[#f0ede9] py-16 mb-20 border-t border-b border-[#E9DFD2]">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-16 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="font-['Manrope'] text-[10px] text-[#B94700] tracking-[0.25em] uppercase font-bold block mb-1">
                SHOP THE STORY
              </span>
              <h2 className="font-['EB_Garamond'] text-3xl md:text-4xl text-[#111111]">
                The Florentine Monograph Ensemble
              </h2>
            </div>
            <button
              onClick={() => onNavigate('shop')}
              className="font-['Manrope'] text-xs text-[#111111] hover:text-[#B94700] uppercase tracking-widest underline underline-offset-8 transition-colors cursor-pointer font-semibold"
            >
              EXPLORE THE FULL WARDROBE
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ensemblePieces.map((piece) => (
              <div key={piece.id} className="bg-[#F8F5F0] p-4 border border-[#E9DFD2] shadow-xs flex flex-col justify-between group">
                <div className="aspect-[3/4] bg-[#ebe8e3] overflow-hidden relative mb-4">
                  <img
                    src={piece.image}
                    alt={piece.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <button
                    onClick={() => onAddToCart(piece as Product)}
                    className="absolute bottom-3 right-3 w-9 h-9 bg-[#111111] hover:bg-[#B94700] text-white flex items-center justify-center transition-colors shadow-md cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
                  </button>
                </div>
                <div className="space-y-1">
                  <span className="font-['Manrope'] text-[9px] text-[#57534E] uppercase tracking-widest">{piece.category}</span>
                  <h3 className="font-['EB_Garamond'] text-lg text-[#111111] font-semibold line-clamp-1">{piece.name}</h3>
                  <p className="font-['Manrope'] text-xs text-[#111111] font-bold">₹{piece.price.toLocaleString('en-IN')}</p>
                </div>
                <button
                  onClick={() => onAddToCart(piece as Product)}
                  className="mt-4 w-full py-2.5 bg-[#111111] hover:bg-[#B94700] text-white font-['Manrope'] text-[10px] uppercase tracking-widest transition-colors font-semibold cursor-pointer"
                >
                  ADD TO BAG
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Monographs Grid ('From The CYOF Archives') */}
      <section className="w-full max-w-[1600px] mx-auto px-4 md:px-8 lg:px-16 mb-24">
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#E9DFD2]">
          <div>
            <span className="font-['Manrope'] text-[10px] text-[#B94700] uppercase tracking-[0.25em] font-bold">
              RELATED DISPATCHES
            </span>
            <h3 className="font-['EB_Garamond'] text-2xl md:text-3xl text-[#111111]">
              From The CYOF Archives
            </h3>
          </div>
          <button
            onClick={() => onNavigate('journal')}
            className="font-['Manrope'] text-xs text-[#111111] hover:text-[#B94700] uppercase tracking-widest transition-colors flex items-center gap-1 cursor-pointer font-semibold"
          >
            <span>ALL EDITIONS</span>
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Related 1 */}
          <article
            onClick={() => onNavigate('journal')}
            className="group space-y-4 cursor-pointer"
          >
            <div className="aspect-[16/10] w-full bg-[#f0ede9] overflow-hidden border border-[#E9DFD2]">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuClGVxESAJf9IGNcT0mCYYtDp3BYxvYjgzBaC2awRMf5BWbHr0SH31n2jld9pvrKds8teEy-AezwC3q5chWM0v1H_rTAtEyQiHTy7J9eb7gzaL6sVLM36iWzwz1ms4014Ta1S8zfs20q5yn0uZr3WaVifgMB8KM9Yzq7SxHjcWrbHxkmk6kVxm8QJzMsLQFhzXZlnR520hHNL1fcNZKc5e9Fa_0CmhmYmnj07R6fzOJ"
                alt="Architecture and couture"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 font-['Manrope'] text-[9px] text-[#57534E] uppercase tracking-widest">
                <span>ISSUE XIII</span>
                <span>•</span>
                <span>ARCHITECTURE</span>
              </div>
              <h4 className="font-['EB_Garamond'] text-xl text-[#111111] group-hover:text-[#B94700] transition-colors leading-snug font-medium">
                The Geometry of Silence: Brutalism and Couture
              </h4>
              <p className="font-['Manrope'] text-xs text-[#594238] line-clamp-2 leading-relaxed">
                Examining the parallel lines between post-war concrete facades and the unlined structural drape of 1950s evening mantles.
              </p>
            </div>
          </article>

          {/* Related 2 */}
          <article
            onClick={() => onNavigate('journal')}
            className="group space-y-4 cursor-pointer"
          >
            <div className="aspect-[16/10] w-full bg-[#f0ede9] overflow-hidden border border-[#E9DFD2]">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSuynA-alAGJ9HZZePob7IUiW1DfwrRKxvTd8h6ccILKPCDPRQFobDbk_3oz4p3xb4qcaXP8RGev0mLUSGI0GjPha01a0tv-YFWBmrM5IHXdURD0V2etjccUoLxU2fCmEC8oLdGU3ZCP41Rp_JnS0vUcecZ2T1vj9L9d0tR_hLIZFbd7LeaD4MLJEd0vdq64tS76Ji_jFZOUMDdNl2RnoK3T3y64YORMLU5S7Zdm1_"
                alt="Nishijin silk weaving"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 font-['Manrope'] text-[9px] text-[#57534E] uppercase tracking-widest">
                <span>ISSUE XII</span>
                <span>•</span>
                <span>PROVENANCE</span>
              </div>
              <h4 className="font-['EB_Garamond'] text-xl text-[#111111] group-hover:text-[#B94700] transition-colors leading-snug font-medium">
                The Kyoto Weft: Seven Dynasties of Nishijin Silk
              </h4>
              <p className="font-['Manrope'] text-xs text-[#594238] line-clamp-2 leading-relaxed">
                A journey inside the secluded wooden workshops of Kamigyo-ku, where metallic gold thread is spun by three remaining living masters.
              </p>
            </div>
          </article>

          {/* Related 3 */}
          <article
            onClick={() => onNavigate('journal')}
            className="group space-y-4 cursor-pointer"
          >
            <div className="aspect-[16/10] w-full bg-[#f0ede9] overflow-hidden border border-[#E9DFD2]">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBXen-VAPdFndTJJwDlk3Q1oPbpEYpkV82f71U1wbMflL-Etpqh4BnWH9RhENoVVOh9ygeLft34-IABl8eDRCF411-yyIcOA90wNqj_LQwM2rL6PK1weOmXWyIoR8Db7YrCF24lYdeIt8ATuzH0_QJv7do5sg_Z03tAJyBa6ah7ZVjjNtV_RNM_24vroiMRm2A55gOrpkOks3TaM44rZmWg15HGfIMXXWVmS1ytL3u"
                alt="Perfume flacons in Grasse"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 font-['Manrope'] text-[9px] text-[#57534E] uppercase tracking-widest">
                <span>ISSUE XI</span>
                <span>•</span>
                <span>OLFACTORY</span>
              </div>
              <h4 className="font-['EB_Garamond'] text-xl text-[#111111] group-hover:text-[#B94700] transition-colors leading-snug font-medium">
                Distilling Solitude: The Resin of Mountain Cedar
              </h4>
              <p className="font-['Manrope'] text-xs text-[#594238] line-clamp-2 leading-relaxed">
                How the scent of aged cedarwood, cold stone, and beeswax was codified into CYOF’s inaugural signature scent.
              </p>
            </div>
          </article>
        </div>
      </section>

      {/* Next Monograph Preview Banner */}
      <aside className="w-full max-w-[1600px] mx-auto px-4 md:px-8 lg:px-16 mb-16">
        <div className="bg-[#f0ede9] p-8 border border-[#E9DFD2] flex flex-col text-left">
          <span className="font-['Manrope'] text-[10px] uppercase tracking-widest text-[#57534E] mb-2 font-semibold">
            Upcoming Monograph
          </span>
          <h3 className="font-['EB_Garamond'] text-2xl md:text-3xl text-[#111111] leading-snug mb-2 font-medium">
            Florentine Leather Craft: Vegetable Tanning on the Arno
          </h3>
          <p className="font-['Manrope'] text-xs text-[#57534E] mb-4 max-w-xl leading-relaxed">
            Issue VIII releases 28 October. An investigation into 800-year-old oak-bark tannins and saddlery stitch craft.
          </p>
          <button
            onClick={() => onNavigate('journal')}
            className="inline-flex items-center gap-2 font-['Manrope'] text-xs uppercase tracking-wider text-[#9e3d00] hover:text-[#B94700] font-bold min-h-[44px] cursor-pointer"
          >
            <span>Next Monograph: Florentine Leather Craft</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </aside>

      {/* Gazette Newsletter Registration */}
      <section className="w-full bg-[#f6f3ee] py-16 mb-20 lg:mb-12 border-b border-[#E9DFD2]">
        <div className="max-w-3xl mx-auto px-4 text-center space-y-4">
          <span className="font-['Manrope'] text-[10px] text-[#B94700] uppercase tracking-[0.25em] font-bold">
            L'ÉDITION ÉLECTRONIQUE • #CraftedYourOwnFashion
          </span>
          <h3 className="font-['EB_Garamond'] text-3xl sm:text-4xl text-[#111111]">
            Receive The Gazette & Atelier Monographs
          </h3>
          <p className="font-['Manrope'] text-xs sm:text-sm text-[#594238] max-w-xl mx-auto leading-relaxed">
            Intimate essays, private collection openings, and seasonal monograph previews sent bi-weekly. We respect the quietude of your personal correspondence.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setNewsletterSubscribed(true);
              setEmail('');
              setTimeout(() => setNewsletterSubscribed(false), 5000);
            }}
            className="pt-4 max-w-md mx-auto"
          >
            <div className="flex items-center bg-[#F8F5F0] border border-[#E9DFD2] p-1 shadow-xs">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ENTER YOUR EMAIL ADDRESS"
                className="w-full bg-transparent px-4 py-3 font-['Manrope'] text-xs text-[#111111] placeholder-[#57534E] focus:outline-none uppercase tracking-widest text-[11px]"
              />
              <button
                type="submit"
                className="bg-[#111111] text-white px-6 py-3 font-['Manrope'] text-xs uppercase tracking-widest hover:bg-[#B94700] transition-colors flex-shrink-0 cursor-pointer font-semibold"
              >
                SUBSCRIBE
              </button>
            </div>
            {newsletterSubscribed && (
              <p className="font-['Manrope'] text-xs text-[#B94700] mt-3 uppercase tracking-wider font-semibold">
                ✓ Your address has been inscribed to the private Gazette registry.
              </p>
            )}
          </form>
        </div>
      </section>

      {/* Mobile Sticky Bottom Reading Utility Bar */}
      <div className="lg:hidden fixed bottom-16 left-0 right-0 z-40 bg-[#F8F5F0]/95 backdrop-blur-md pb-safe border-t border-[#E9DFD2]">
        <div className="w-full h-1 bg-[#E9DFD2]">
          <div className="h-full bg-[#B94700] transition-all duration-150" style={{ width: `${readProgress}%` }} />
        </div>
        <div className="h-14 px-4 flex items-center justify-between font-['Manrope']">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#B94700] animate-pulse" />
            <span className="text-[10px] uppercase tracking-wider text-[#111111] font-semibold">
              Reading Monograph VII ({Math.round(readProgress)}%)
            </span>
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label="Toggle Audio Playback"
              onClick={() => setAudioPlaying(!audioPlaying)}
              className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center text-[#111111] active:text-[#B94700] transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">
                {audioPlaying ? 'pause' : 'volume_up'}
              </span>
            </button>
            <button
              type="button"
              aria-label="Share Monograph"
              onClick={handleCopyLink}
              className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center text-[#111111] active:text-[#B94700] transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">
                {copiedLink ? 'check' : 'share'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
