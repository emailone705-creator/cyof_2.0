import React, { useState } from 'react';
import { Product, ViewRoute } from '../types';
import { PRODUCTS } from '../data/mockData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onNavigate: (route: ViewRoute) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onNavigate,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filtered = query.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase())
      )
    : PRODUCTS.slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 bg-[#111111]/70 backdrop-blur-md flex flex-col justify-start items-center p-4 pt-16 sm:pt-24 animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-[#F8F5F0] shadow-2xl p-6 sm:p-8 relative border border-[#E9DFD2]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header & Input */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E9DFD2]">
          <div className="flex items-center gap-3 w-full">
            <span className="material-symbols-outlined text-[24px] text-[#57534E]">search</span>
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="SEARCH SILHOUETTES, CASHMERE, LEATHER GOODS..."
              className="w-full bg-transparent font-['Manrope'] text-sm sm:text-base text-[#111111] placeholder-[#57534E] focus:outline-none uppercase tracking-wider"
            />
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center text-[#111111] hover:text-[#B94700] transition-colors"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        {/* Quick Links / Suggested Searches */}
        <div className="py-4 flex flex-wrap items-center gap-2 text-xs font-['Manrope'] text-[#57534E]">
          <span className="uppercase tracking-widest text-[10px] text-[#9e3d00] font-bold">Suggested:</span>
          {['Trench', 'Calfskin Tote', 'Cashmere', 'Silk Gown', 'Florence Atelier'].map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="px-2.5 py-1 bg-[#f0ede9] hover:bg-[#111111] hover:text-white uppercase tracking-wider transition-colors text-[10px]"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-[50vh] overflow-y-auto space-y-3 pt-2">
          <span className="font-['Manrope'] text-[10px] uppercase tracking-widest text-[#57534E] block">
            {query.trim() ? `Found ${filtered.length} Creations` : 'Featured In Archive'}
          </span>

          {filtered.length === 0 ? (
            <div className="py-8 text-center text-[#57534E] font-['EB_Garamond'] text-lg italic">
              No creations matching your inquiry. Please consult our private concierge.
            </div>
          ) : (
            filtered.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  onSelectProduct(product);
                  onClose();
                }}
                className="flex items-center gap-4 p-2 bg-[#fcf9f4] hover:bg-[#f0ede9] transition-colors cursor-pointer group"
              >
                <div className="w-14 h-18 bg-[#ebe8e3] overflow-hidden flex-shrink-0">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="font-['Manrope'] text-[9px] uppercase tracking-widest text-[#57534E]">
                    {product.category}
                  </span>
                  <h4 className="font-['EB_Garamond'] text-lg text-[#111111] group-hover:text-[#B94700] transition-colors truncate">
                    {product.name}
                  </h4>
                  <span className="font-['Manrope'] text-xs font-semibold text-[#111111]">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                </div>
                <span className="material-symbols-outlined text-[18px] text-[#57534E] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </div>
            ))
          )}
        </div>

        {/* Footer Jump to Catalog */}
        <div className="pt-4 mt-4 border-t border-[#E9DFD2] flex justify-between items-center text-xs font-['Manrope']">
          <button
            onClick={() => {
              onClose();
              onNavigate('shop');
            }}
            className="text-[#111111] hover:text-[#B94700] uppercase tracking-widest font-semibold flex items-center gap-1"
          >
            Explore Complete Autumn / Winter Catalog
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};
