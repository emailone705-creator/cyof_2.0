import React, { useState, useEffect } from 'react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: string;
  productName?: string;
  onOpenSalonModal?: (productName?: string) => void;
}

type TabType = 'clothing' | 'accessories' | 'belts-shoes' | 'measuring';
type UnitType = 'cm' | 'in';

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({
  isOpen,
  onClose,
  initialCategory = '',
  productName = 'The Masterpiece',
  onOpenSalonModal,
}) => {
  // Determine default tab based on product category
  const getDefaultTab = (): TabType => {
    const cat = initialCategory.toLowerCase();
    if (cat.includes('leather') || cat.includes('bag') || cat.includes('tote')) {
      return 'accessories';
    }
    if (cat.includes('belt') || cat.includes('shoe') || cat.includes('footwear')) {
      return 'belts-shoes';
    }
    return 'clothing';
  };

  const [activeTab, setActiveTab] = useState<TabType>(getDefaultTab());
  const [unit, setUnit] = useState<UnitType>('cm');

  // Reset tab when modal opens with new category
  useEffect(() => {
    if (isOpen) {
      setActiveTab(getDefaultTab());
    }
  }, [isOpen, initialCategory]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent background scroll when modal is open
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

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="size-guide-title"
      className="fixed inset-0 z-50 bg-[#111111]/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 lg:p-10 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl bg-[#fcf9f4] border border-[#E9DFD2] shadow-2xl flex flex-col max-h-[92vh] overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-7 border-b border-[#E9DFD2] bg-[#F8F5F0] flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 bg-[#B94700]" />
              <span className="font-['Manrope'] text-[10px] sm:text-xs text-[#B94700] uppercase tracking-[0.22em] font-bold">
                CYOF Atelier Proportion Guide • #CraftedYourOwnFashion
              </span>
            </div>
            <h2 id="size-guide-title" className="font-['EB_Garamond'] text-2xl sm:text-3xl lg:text-4xl text-[#111111] font-normal">
              Size & Measurement Concordance
            </h2>
            <p className="font-['Manrope'] text-xs text-[#57534E] mt-1 max-w-xl leading-relaxed">
              Precision body measurements, international conversion charts, and volumetric dimensions calibrated for <strong className="text-[#111111]">{productName}</strong>.
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close size guide modal"
            className="w-11 h-11 border border-[#E9DFD2] bg-white text-[#111111] hover:text-[#B94700] hover:border-[#111111] flex items-center justify-center transition-colors cursor-pointer shrink-0"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        {/* Tab Navigation & Unit Switcher */}
        <div className="border-b border-[#E9DFD2] bg-[#f0ede9] px-4 sm:px-7 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-['Manrope']">
          {/* Sharp 0px Architectural Tabs */}
          <div className="flex items-center overflow-x-auto no-scrollbar gap-1 text-xs">
            <button
              onClick={() => setActiveTab('clothing')}
              className={`px-3.5 py-2 uppercase tracking-wider text-[11px] font-semibold whitespace-nowrap transition-all border cursor-pointer ${
                activeTab === 'clothing'
                  ? 'bg-[#111111] text-white border-[#111111] shadow-xs'
                  : 'bg-white text-[#57534E] border-[#E9DFD2] hover:text-[#111111]'
              }`}
            >
              Clothing & Outerwear
            </button>
            <button
              onClick={() => setActiveTab('accessories')}
              className={`px-3.5 py-2 uppercase tracking-wider text-[11px] font-semibold whitespace-nowrap transition-all border cursor-pointer ${
                activeTab === 'accessories'
                  ? 'bg-[#111111] text-white border-[#111111] shadow-xs'
                  : 'bg-white text-[#57534E] border-[#E9DFD2] hover:text-[#111111]'
              }`}
            >
              Handbags & Leather
            </button>
            <button
              onClick={() => setActiveTab('belts-shoes')}
              className={`px-3.5 py-2 uppercase tracking-wider text-[11px] font-semibold whitespace-nowrap transition-all border cursor-pointer ${
                activeTab === 'belts-shoes'
                  ? 'bg-[#111111] text-white border-[#111111] shadow-xs'
                  : 'bg-white text-[#57534E] border-[#E9DFD2] hover:text-[#111111]'
              }`}
            >
              Belts & Footwear
            </button>
            <button
              onClick={() => setActiveTab('measuring')}
              className={`px-3.5 py-2 uppercase tracking-wider text-[11px] font-semibold whitespace-nowrap transition-all border cursor-pointer ${
                activeTab === 'measuring'
                  ? 'bg-[#111111] text-white border-[#111111] shadow-xs'
                  : 'bg-white text-[#57534E] border-[#E9DFD2] hover:text-[#111111]'
              }`}
            >
              How to Measure
            </button>
          </div>

          {/* Unit Toggle (cm / in) */}
          <div className="flex items-center justify-end gap-1.5 self-end sm:self-auto text-xs">
            <span className="text-[10px] uppercase tracking-wider text-[#57534E] mr-1 font-semibold">Scale:</span>
            <div className="inline-flex border border-[#E9DFD2] bg-white p-0.5">
              <button
                onClick={() => setUnit('cm')}
                className={`px-2.5 py-1 text-[11px] uppercase tracking-wider font-semibold transition-colors cursor-pointer ${
                  unit === 'cm' ? 'bg-[#B94700] text-white' : 'text-[#57534E] hover:text-[#111111]'
                }`}
              >
                Metric (cm)
              </button>
              <button
                onClick={() => setUnit('in')}
                className={`px-2.5 py-1 text-[11px] uppercase tracking-wider font-semibold transition-colors cursor-pointer ${
                  unit === 'in' ? 'bg-[#B94700] text-white' : 'text-[#57534E] hover:text-[#111111]'
                }`}
              >
                Imperial (in)
              </button>
            </div>
          </div>
        </div>

        {/* Modal Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-7 space-y-6 font-['Manrope'] text-xs">
          {/* TAB 1: CLOTHING & OUTERWEAR */}
          {activeTab === 'clothing' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#E9DFD2]">
                <div>
                  <h3 className="font-['EB_Garamond'] text-xl sm:text-2xl text-[#111111]">
                    Haute Tailoring, Coats & Silk Conversion
                  </h3>
                  <p className="text-[#57534E] text-[11px] mt-0.5">
                    Conforms to standard international haute horlogerie and Milan / Savile Row tailoring standards.
                  </p>
                </div>
                <span className="text-[10px] uppercase tracking-widest text-[#B94700] font-bold">
                  Units in: {unit === 'cm' ? 'Centimeters (cm)' : 'Inches (in)'}
                </span>
              </div>

              {/* Conversion Table */}
              <div className="overflow-x-auto border border-[#E9DFD2] bg-white shadow-xs">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#111111] text-white text-[10px] uppercase tracking-wider font-bold">
                      <th className="p-3 border-r border-[#333333]">CYOF Alpha</th>
                      <th className="p-3 border-r border-[#333333]">India / UK</th>
                      <th className="p-3 border-r border-[#333333]">Italy / EU</th>
                      <th className="p-3 border-r border-[#333333]">US</th>
                      <th className="p-3 border-r border-[#333333]">Chest / Bust</th>
                      <th className="p-3 border-r border-[#333333]">Natural Waist</th>
                      <th className="p-3 border-r border-[#333333]">Hip Stride</th>
                      <th className="p-3">Shoulder Span</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E9DFD2] text-[#1c1c19]">
                    <tr className="hover:bg-[#fcf9f4] transition-colors">
                      <td className="p-3 font-bold border-r border-[#E9DFD2] bg-[#faf7f2]">XS</td>
                      <td className="p-3 border-r border-[#E9DFD2]">34</td>
                      <td className="p-3 border-r border-[#E9DFD2] font-semibold text-[#B94700]">IT 44</td>
                      <td className="p-3 border-r border-[#E9DFD2]">34</td>
                      <td className="p-3 border-r border-[#E9DFD2]">{unit === 'cm' ? '88 – 92 cm' : '34.6 – 36.2 in'}</td>
                      <td className="p-3 border-r border-[#E9DFD2]">{unit === 'cm' ? '72 – 76 cm' : '28.3 – 29.9 in'}</td>
                      <td className="p-3 border-r border-[#E9DFD2]">{unit === 'cm' ? '88 – 92 cm' : '34.6 – 36.2 in'}</td>
                      <td className="p-3">{unit === 'cm' ? '43 cm' : '16.9 in'}</td>
                    </tr>
                    <tr className="hover:bg-[#fcf9f4] transition-colors">
                      <td className="p-3 font-bold border-r border-[#E9DFD2] bg-[#faf7f2]">S</td>
                      <td className="p-3 border-r border-[#E9DFD2]">36</td>
                      <td className="p-3 border-r border-[#E9DFD2] font-semibold text-[#B94700]">IT 46</td>
                      <td className="p-3 border-r border-[#E9DFD2]">36</td>
                      <td className="p-3 border-r border-[#E9DFD2]">{unit === 'cm' ? '92 – 96 cm' : '36.2 – 37.8 in'}</td>
                      <td className="p-3 border-r border-[#E9DFD2]">{unit === 'cm' ? '76 – 80 cm' : '29.9 – 31.5 in'}</td>
                      <td className="p-3 border-r border-[#E9DFD2]">{unit === 'cm' ? '92 – 96 cm' : '36.2 – 37.8 in'}</td>
                      <td className="p-3">{unit === 'cm' ? '44.5 cm' : '17.5 in'}</td>
                    </tr>
                    <tr className="hover:bg-[#fcf9f4] transition-colors bg-[#fff9f4]">
                      <td className="p-3 font-bold border-r border-[#E9DFD2] bg-[#f5ede4] text-[#B94700]">M (Archetype)</td>
                      <td className="p-3 border-r border-[#E9DFD2] font-bold">38</td>
                      <td className="p-3 border-r border-[#E9DFD2] font-bold text-[#B94700]">IT 48</td>
                      <td className="p-3 border-r border-[#E9DFD2] font-bold">38</td>
                      <td className="p-3 border-r border-[#E9DFD2] font-semibold">{unit === 'cm' ? '96 – 100 cm' : '37.8 – 39.4 in'}</td>
                      <td className="p-3 border-r border-[#E9DFD2]">{unit === 'cm' ? '80 – 84 cm' : '31.5 – 33.1 in'}</td>
                      <td className="p-3 border-r border-[#E9DFD2]">{unit === 'cm' ? '96 – 100 cm' : '37.8 – 39.4 in'}</td>
                      <td className="p-3">{unit === 'cm' ? '46 cm' : '18.1 in'}</td>
                    </tr>
                    <tr className="hover:bg-[#fcf9f4] transition-colors">
                      <td className="p-3 font-bold border-r border-[#E9DFD2] bg-[#faf7f2]">L</td>
                      <td className="p-3 border-r border-[#E9DFD2]">40</td>
                      <td className="p-3 border-r border-[#E9DFD2] font-semibold text-[#B94700]">IT 50</td>
                      <td className="p-3 border-r border-[#E9DFD2]">40</td>
                      <td className="p-3 border-r border-[#E9DFD2]">{unit === 'cm' ? '100 – 104 cm' : '39.4 – 40.9 in'}</td>
                      <td className="p-3 border-r border-[#E9DFD2]">{unit === 'cm' ? '84 – 88 cm' : '33.1 – 34.6 in'}</td>
                      <td className="p-3 border-r border-[#E9DFD2]">{unit === 'cm' ? '100 – 104 cm' : '39.4 – 40.9 in'}</td>
                      <td className="p-3">{unit === 'cm' ? '47.5 cm' : '18.7 in'}</td>
                    </tr>
                    <tr className="hover:bg-[#fcf9f4] transition-colors">
                      <td className="p-3 font-bold border-r border-[#E9DFD2] bg-[#faf7f2]">XL</td>
                      <td className="p-3 border-r border-[#E9DFD2]">42</td>
                      <td className="p-3 border-r border-[#E9DFD2] font-semibold text-[#B94700]">IT 52</td>
                      <td className="p-3 border-r border-[#E9DFD2]">42</td>
                      <td className="p-3 border-r border-[#E9DFD2]">{unit === 'cm' ? '104 – 110 cm' : '40.9 – 43.3 in'}</td>
                      <td className="p-3 border-r border-[#E9DFD2]">{unit === 'cm' ? '88 – 94 cm' : '34.6 – 37.0 in'}</td>
                      <td className="p-3 border-r border-[#E9DFD2]">{unit === 'cm' ? '104 – 110 cm' : '40.9 – 43.3 in'}</td>
                      <td className="p-3">{unit === 'cm' ? '49 cm' : '19.3 in'}</td>
                    </tr>
                    <tr className="hover:bg-[#fcf9f4] transition-colors">
                      <td className="p-3 font-bold border-r border-[#E9DFD2] bg-[#faf7f2]">XXL</td>
                      <td className="p-3 border-r border-[#E9DFD2]">44</td>
                      <td className="p-3 border-r border-[#E9DFD2] font-semibold text-[#B94700]">IT 54</td>
                      <td className="p-3 border-r border-[#E9DFD2]">44</td>
                      <td className="p-3 border-r border-[#E9DFD2]">{unit === 'cm' ? '110 – 116 cm' : '43.3 – 45.7 in'}</td>
                      <td className="p-3 border-r border-[#E9DFD2]">{unit === 'cm' ? '94 – 100 cm' : '37.0 – 39.4 in'}</td>
                      <td className="p-3 border-r border-[#E9DFD2]">{unit === 'cm' ? '110 – 116 cm' : '43.3 – 45.7 in'}</td>
                      <td className="p-3">{unit === 'cm' ? '50.5 cm' : '19.9 in'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Fit Persona Recommendations */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-4 bg-white border border-[#E9DFD2] shadow-xs space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-[#B94700]">architecture</span>
                    <h4 className="font-semibold text-xs text-[#111111] uppercase tracking-wider">Tailored Archetype Fit</h4>
                  </div>
                  <p className="text-[11px] text-[#57534E] leading-relaxed">
                    Designed to sit cleanly over pure cotton poplin shirts or fine-gauge silk knitwear. Take your regular true-to-size European cut.
                  </p>
                </div>
                <div className="p-4 bg-white border border-[#E9DFD2] shadow-xs space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-[#B94700]">layers</span>
                    <h4 className="font-semibold text-xs text-[#111111] uppercase tracking-wider">Outerwear Layering</h4>
                  </div>
                  <p className="text-[11px] text-[#57534E] leading-relaxed">
                    If intending to wear our Double-Face Cashmere Trench or Structured Overcoat over tailored blazers, we advise taking one size larger.
                  </p>
                </div>
                <div className="p-4 bg-white border border-[#E9DFD2] shadow-xs space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-[#B94700]">content_cut</span>
                    <h4 className="font-semibold text-xs text-[#111111] uppercase tracking-wider">Bespoke Adjustments</h4>
                  </div>
                  <p className="text-[11px] text-[#57534E] leading-relaxed">
                    Complimentary sleeve length and hem adjustments are provided on all outerwear orders prior to white-glove dispatch.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ACCESSORIES & LEATHER GOODS */}
          {activeTab === 'accessories' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#E9DFD2]">
                <div>
                  <h3 className="font-['EB_Garamond'] text-xl sm:text-2xl text-[#111111]">
                    Handbag Archetypes & Internal Volumetric Scales
                  </h3>
                  <p className="text-[#57534E] text-[11px] mt-0.5">
                    Calibrated specifically for CYOF sculptural calfskin and suede silhouettes.
                  </p>
                </div>
                <span className="text-[10px] uppercase tracking-widest text-[#B94700] font-bold">
                  Units in: {unit === 'cm' ? 'Centimeters (cm)' : 'Inches (in)'}
                </span>
              </div>

              {/* Handbag Specs Table */}
              <div className="overflow-x-auto border border-[#E9DFD2] bg-white shadow-xs">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#111111] text-white text-[10px] uppercase tracking-wider font-bold">
                      <th className="p-3 border-r border-[#333333]">Format Archetype</th>
                      <th className="p-3 border-r border-[#333333]">Height (H)</th>
                      <th className="p-3 border-r border-[#333333]">Width (W)</th>
                      <th className="p-3 border-r border-[#333333]">Depth (D)</th>
                      <th className="p-3 border-r border-[#333333]">Handle Drop</th>
                      <th className="p-3 border-r border-[#333333]">Weight (Approx)</th>
                      <th className="p-3">Accommodated Essentials</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E9DFD2] text-[#1c1c19]">
                    <tr className="hover:bg-[#fcf9f4] transition-colors">
                      <td className="p-3 font-bold border-r border-[#E9DFD2] bg-[#faf7f2]">
                        <span className="block text-[#111111]">Mini Pochette</span>
                        <span className="text-[10px] text-[#57534E] font-normal">Evening Silhouette</span>
                      </td>
                      <td className="p-3 border-r border-[#E9DFD2]">{unit === 'cm' ? '15 cm' : '5.9 in'}</td>
                      <td className="p-3 border-r border-[#E9DFD2]">{unit === 'cm' ? '20 cm' : '7.9 in'}</td>
                      <td className="p-3 border-r border-[#E9DFD2]">{unit === 'cm' ? '7 cm' : '2.8 in'}</td>
                      <td className="p-3 border-r border-[#E9DFD2]">{unit === 'cm' ? '7 cm / Strap 52 cm' : '2.8 in / Strap 20.5 in'}</td>
                      <td className="p-3 border-r border-[#E9DFD2]">{unit === 'cm' ? '410 g' : '14.5 oz'}</td>
                      <td className="p-3 text-[11px] text-[#57534E]">iPhone Pro Max, Cardholder, Lipstick, Keys</td>
                    </tr>
                    <tr className="hover:bg-[#fcf9f4] transition-colors">
                      <td className="p-3 font-bold border-r border-[#E9DFD2] bg-[#faf7f2]">
                        <span className="block text-[#111111]">Small Archetype</span>
                        <span className="text-[10px] text-[#57534E] font-normal">Compact Day Format</span>
                      </td>
                      <td className="p-3 border-r border-[#E9DFD2]">{unit === 'cm' ? '24 cm' : '9.4 in'}</td>
                      <td className="p-3 border-r border-[#E9DFD2]">{unit === 'cm' ? '30 cm' : '11.8 in'}</td>
                      <td className="p-3 border-r border-[#E9DFD2]">{unit === 'cm' ? '12 cm' : '4.7 in'}</td>
                      <td className="p-3 border-r border-[#E9DFD2]">{unit === 'cm' ? '11 cm / Strap 48 cm' : '4.3 in / Strap 18.9 in'}</td>
                      <td className="p-3 border-r border-[#E9DFD2]">{unit === 'cm' ? '780 g' : '27.5 oz'}</td>
                      <td className="p-3 text-[11px] text-[#57534E]">iPad 11", Continental Wallet, Sunglasses, Agenda</td>
                    </tr>
                    <tr className="hover:bg-[#fcf9f4] transition-colors bg-[#fff9f4]">
                      <td className="p-3 font-bold border-r border-[#E9DFD2] bg-[#f5ede4] text-[#B94700]">
                        <span className="block">Medium Atelier</span>
                        <span className="text-[10px] text-[#B94700] font-semibold">Iconic Flagship Scale</span>
                      </td>
                      <td className="p-3 border-r border-[#E9DFD2] font-semibold">{unit === 'cm' ? '29 cm' : '11.4 in'}</td>
                      <td className="p-3 border-r border-[#E9DFD2] font-semibold">{unit === 'cm' ? '38 cm' : '15.0 in'}</td>
                      <td className="p-3 border-r border-[#E9DFD2] font-semibold">{unit === 'cm' ? '15 cm' : '5.9 in'}</td>
                      <td className="p-3 border-r border-[#E9DFD2] font-semibold">{unit === 'cm' ? '14 cm / Strap 45 cm' : '5.5 in / Strap 17.7 in'}</td>
                      <td className="p-3 border-r border-[#E9DFD2]">{unit === 'cm' ? '1,120 g' : '39.5 oz'}</td>
                      <td className="p-3 text-[11px] font-medium text-[#111111]">MacBook Pro 14", Daily Planner, Full Cosmetic Case, Charger</td>
                    </tr>
                    <tr className="hover:bg-[#fcf9f4] transition-colors">
                      <td className="p-3 font-bold border-r border-[#E9DFD2] bg-[#faf7f2]">
                        <span className="block text-[#111111]">Grand Voyager</span>
                        <span className="text-[10px] text-[#57534E] font-normal">Weekender & Cabin Tote</span>
                      </td>
                      <td className="p-3 border-r border-[#E9DFD2]">{unit === 'cm' ? '35 cm' : '13.8 in'}</td>
                      <td className="p-3 border-r border-[#E9DFD2]">{unit === 'cm' ? '45 cm' : '17.7 in'}</td>
                      <td className="p-3 border-r border-[#E9DFD2]">{unit === 'cm' ? '19 cm' : '7.5 in'}</td>
                      <td className="p-3 border-r border-[#E9DFD2]">{unit === 'cm' ? '18 cm / Strap 40 cm' : '7.1 in / Strap 15.7 in'}</td>
                      <td className="p-3 border-r border-[#E9DFD2]">{unit === 'cm' ? '1,490 g' : '52.5 oz'}</td>
                      <td className="p-3 text-[11px] text-[#57534E]">Laptop 16", Cashmere Stole, Travel Toiletries, Water Flask</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Visual Scale Callouts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-white border border-[#E9DFD2] shadow-xs flex items-start gap-3">
                  <div className="w-10 h-10 bg-[#fcf9f4] border border-[#E9DFD2] flex items-center justify-center shrink-0 text-[#B94700]">
                    <span className="material-symbols-outlined text-[20px]">laptop_mac</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-xs text-[#111111] uppercase tracking-wider">Device Compatibility Guarantee</h4>
                    <p className="text-[11px] text-[#57534E] mt-1 leading-relaxed">
                      Our signature Medium and Grand tote silhouettes feature reinforced architectural bases lined with shock-absorbent natural cork and micro-suede to secure modern laptops without sag.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-white border border-[#E9DFD2] shadow-xs flex items-start gap-3">
                  <div className="w-10 h-10 bg-[#fcf9f4] border border-[#E9DFD2] flex items-center justify-center shrink-0 text-[#B94700]">
                    <span className="material-symbols-outlined text-[20px]">straighten</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-xs text-[#111111] uppercase tracking-wider">Custom Strap Drop Calibration</h4>
                    <p className="text-[11px] text-[#57534E] mt-1 leading-relaxed">
                      All detachable shoulder straps include five micro-adjustment holes. Additional custom punching or lengthening can be requested directly with our concierge.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: BELTS & FOOTWEAR */}
          {activeTab === 'belts-shoes' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#E9DFD2]">
                <div>
                  <h3 className="font-['EB_Garamond'] text-xl sm:text-2xl text-[#111111]">
                    Atelier Belts & Handcrafted Footwear
                  </h3>
                  <p className="text-[#57534E] text-[11px] mt-0.5">
                    Precise waist sizing and European shoe scale conversions for CYOF accessories.
                  </p>
                </div>
                <span className="text-[10px] uppercase tracking-widest text-[#B94700] font-bold">
                  Units in: {unit === 'cm' ? 'Centimeters (cm)' : 'Inches (in)'}
                </span>
              </div>

              {/* Belts Table */}
              <div>
                <h4 className="font-['EB_Garamond'] text-lg text-[#111111] mb-2">
                  Atelier Calfskin Belts (Measured from buckle fold to middle hole)
                </h4>
                <div className="overflow-x-auto border border-[#E9DFD2] bg-white shadow-xs">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#111111] text-white text-[10px] uppercase tracking-wider font-bold">
                        <th className="p-3 border-r border-[#333333]">CYOF Belt Size</th>
                        <th className="p-3 border-r border-[#333333]">Natural Waist Range</th>
                        <th className="p-3 border-r border-[#333333]">Trouser Size (IN / UK)</th>
                        <th className="p-3 border-r border-[#333333]">Trouser Size (IT / EU)</th>
                        <th className="p-3">Total Strap Length</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E9DFD2] text-[#1c1c19]">
                      <tr className="hover:bg-[#fcf9f4]">
                        <td className="p-3 font-bold border-r border-[#E9DFD2] bg-[#faf7f2] text-[#B94700]">75 cm</td>
                        <td className="p-3 border-r border-[#E9DFD2]">{unit === 'cm' ? '70 – 78 cm' : '27.5 – 30.7 in'}</td>
                        <td className="p-3 border-r border-[#E9DFD2]">28 – 30</td>
                        <td className="p-3 border-r border-[#E9DFD2]">44</td>
                        <td className="p-3">{unit === 'cm' ? '90 cm' : '35.4 in'}</td>
                      </tr>
                      <tr className="hover:bg-[#fcf9f4]">
                        <td className="p-3 font-bold border-r border-[#E9DFD2] bg-[#faf7f2] text-[#B94700]">80 cm</td>
                        <td className="p-3 border-r border-[#E9DFD2]">{unit === 'cm' ? '76 – 84 cm' : '29.9 – 33.1 in'}</td>
                        <td className="p-3 border-r border-[#E9DFD2]">30 – 32</td>
                        <td className="p-3 border-r border-[#E9DFD2]">46</td>
                        <td className="p-3">{unit === 'cm' ? '95 cm' : '37.4 in'}</td>
                      </tr>
                      <tr className="hover:bg-[#fcf9f4] bg-[#fff9f4]">
                        <td className="p-3 font-bold border-r border-[#E9DFD2] bg-[#f5ede4] text-[#B94700]">85 cm (Standard)</td>
                        <td className="p-3 border-r border-[#E9DFD2] font-semibold">{unit === 'cm' ? '81 – 89 cm' : '31.9 – 35.0 in'}</td>
                        <td className="p-3 border-r border-[#E9DFD2] font-semibold">32 – 34</td>
                        <td className="p-3 border-r border-[#E9DFD2] font-semibold">48</td>
                        <td className="p-3">{unit === 'cm' ? '100 cm' : '39.4 in'}</td>
                      </tr>
                      <tr className="hover:bg-[#fcf9f4]">
                        <td className="p-3 font-bold border-r border-[#E9DFD2] bg-[#faf7f2] text-[#B94700]">90 cm</td>
                        <td className="p-3 border-r border-[#E9DFD2]">{unit === 'cm' ? '86 – 94 cm' : '33.9 – 37.0 in'}</td>
                        <td className="p-3 border-r border-[#E9DFD2]">34 – 36</td>
                        <td className="p-3 border-r border-[#E9DFD2]">50</td>
                        <td className="p-3">{unit === 'cm' ? '105 cm' : '41.3 in'}</td>
                      </tr>
                      <tr className="hover:bg-[#fcf9f4]">
                        <td className="p-3 font-bold border-r border-[#E9DFD2] bg-[#faf7f2] text-[#B94700]">95 cm</td>
                        <td className="p-3 border-r border-[#E9DFD2]">{unit === 'cm' ? '91 – 99 cm' : '35.8 – 39.0 in'}</td>
                        <td className="p-3 border-r border-[#E9DFD2]">36 – 38</td>
                        <td className="p-3 border-r border-[#E9DFD2]">52</td>
                        <td className="p-3">{unit === 'cm' ? '110 cm' : '43.3 in'}</td>
                      </tr>
                      <tr className="hover:bg-[#fcf9f4]">
                        <td className="p-3 font-bold border-r border-[#E9DFD2] bg-[#faf7f2] text-[#B94700]">100 cm</td>
                        <td className="p-3 border-r border-[#E9DFD2]">{unit === 'cm' ? '96 – 104 cm' : '37.8 – 40.9 in'}</td>
                        <td className="p-3 border-r border-[#E9DFD2]">38 – 40</td>
                        <td className="p-3 border-r border-[#E9DFD2]">54</td>
                        <td className="p-3">{unit === 'cm' ? '115 cm' : '45.3 in'}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Shoes Table */}
              <div className="pt-2">
                <h4 className="font-['EB_Garamond'] text-lg text-[#111111] mb-2">
                  Atelier Shoes & Mules Conversion
                </h4>
                <div className="overflow-x-auto border border-[#E9DFD2] bg-white shadow-xs">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#111111] text-white text-[10px] uppercase tracking-wider font-bold">
                        <th className="p-3 border-r border-[#333333]">Italy / EU</th>
                        <th className="p-3 border-r border-[#333333]">India / UK</th>
                        <th className="p-3 border-r border-[#333333]">US Men</th>
                        <th className="p-3 border-r border-[#333333]">US Women</th>
                        <th className="p-3">Foot Length (Heel to Toe)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E9DFD2] text-[#1c1c19]">
                      <tr className="hover:bg-[#fcf9f4]">
                        <td className="p-3 font-bold border-r border-[#E9DFD2] bg-[#faf7f2] text-[#B94700]">IT 39</td>
                        <td className="p-3 border-r border-[#E9DFD2]">5.5</td>
                        <td className="p-3 border-r border-[#E9DFD2]">6.5</td>
                        <td className="p-3 border-r border-[#E9DFD2]">8.5</td>
                        <td className="p-3">{unit === 'cm' ? '24.8 cm' : '9.8 in'}</td>
                      </tr>
                      <tr className="hover:bg-[#fcf9f4]">
                        <td className="p-3 font-bold border-r border-[#E9DFD2] bg-[#faf7f2] text-[#B94700]">IT 40</td>
                        <td className="p-3 border-r border-[#E9DFD2]">6.5</td>
                        <td className="p-3 border-r border-[#E9DFD2]">7.5</td>
                        <td className="p-3 border-r border-[#E9DFD2]">9.5</td>
                        <td className="p-3">{unit === 'cm' ? '25.4 cm' : '10.0 in'}</td>
                      </tr>
                      <tr className="hover:bg-[#fcf9f4]">
                        <td className="p-3 font-bold border-r border-[#E9DFD2] bg-[#faf7f2] text-[#B94700]">IT 41</td>
                        <td className="p-3 border-r border-[#E9DFD2]">7.5</td>
                        <td className="p-3 border-r border-[#E9DFD2]">8.5</td>
                        <td className="p-3 border-r border-[#E9DFD2]">10.5</td>
                        <td className="p-3">{unit === 'cm' ? '26.0 cm' : '10.2 in'}</td>
                      </tr>
                      <tr className="hover:bg-[#fcf9f4] bg-[#fff9f4]">
                        <td className="p-3 font-bold border-r border-[#E9DFD2] bg-[#f5ede4] text-[#B94700]">IT 42 (Archetype)</td>
                        <td className="p-3 border-r border-[#E9DFD2] font-semibold">8.5</td>
                        <td className="p-3 border-r border-[#E9DFD2] font-semibold">9.5</td>
                        <td className="p-3 border-r border-[#E9DFD2] font-semibold">11.5</td>
                        <td className="p-3">{unit === 'cm' ? '26.7 cm' : '10.5 in'}</td>
                      </tr>
                      <tr className="hover:bg-[#fcf9f4]">
                        <td className="p-3 font-bold border-r border-[#E9DFD2] bg-[#faf7f2] text-[#B94700]">IT 43</td>
                        <td className="p-3 border-r border-[#E9DFD2]">9.5</td>
                        <td className="p-3 border-r border-[#E9DFD2]">10.5</td>
                        <td className="p-3 border-r border-[#E9DFD2]">12.5</td>
                        <td className="p-3">{unit === 'cm' ? '27.3 cm' : '10.7 in'}</td>
                      </tr>
                      <tr className="hover:bg-[#fcf9f4]">
                        <td className="p-3 font-bold border-r border-[#E9DFD2] bg-[#faf7f2] text-[#B94700]">IT 44</td>
                        <td className="p-3 border-r border-[#E9DFD2]">10.5</td>
                        <td className="p-3 border-r border-[#E9DFD2]">11.5</td>
                        <td className="p-3 border-r border-[#E9DFD2]">13.5</td>
                        <td className="p-3">{unit === 'cm' ? '28.0 cm' : '11.0 in'}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: HOW TO MEASURE INSTRUCTIONS */}
          {activeTab === 'measuring' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="pb-2 border-b border-[#E9DFD2]">
                <h3 className="font-['EB_Garamond'] text-xl sm:text-2xl text-[#111111]">
                  Atelier Precision Measurement Protocol
                </h3>
                <p className="text-[#57534E] text-[11px] mt-0.5">
                  Follow our master tailor's measurement standards to ensure a tailored silhouette.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-white border border-[#E9DFD2] shadow-xs space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 bg-[#111111] text-white flex items-center justify-center text-[10px] font-bold">1</span>
                    <h4 className="font-semibold text-xs text-[#111111] uppercase tracking-wider">Chest / Bust Measurement</h4>
                  </div>
                  <p className="text-[11px] text-[#57534E] leading-relaxed">
                    Wrap a flexible tailor's tape around the fullest part of your chest, underneath the armpits, keeping the tape comfortably horizontal without pulling tightly.
                  </p>
                </div>

                <div className="p-4 bg-white border border-[#E9DFD2] shadow-xs space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 bg-[#111111] text-white flex items-center justify-center text-[10px] font-bold">2</span>
                    <h4 className="font-semibold text-xs text-[#111111] uppercase tracking-wider">Natural Waist Span</h4>
                  </div>
                  <p className="text-[11px] text-[#57534E] leading-relaxed">
                    Measure around your natural waistline, situated approximately 2.5 cm above the belly button. Stand in a relaxed, upright posture without holding breath.
                  </p>
                </div>

                <div className="p-4 bg-white border border-[#E9DFD2] shadow-xs space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 bg-[#111111] text-white flex items-center justify-center text-[10px] font-bold">3</span>
                    <h4 className="font-semibold text-xs text-[#111111] uppercase tracking-wider">Hip & Seat Stride</h4>
                  </div>
                  <p className="text-[11px] text-[#57534E] leading-relaxed">
                    Stand with your feet placed together. Wrap the measuring tape around the fullest circumference of your hips and seat to determine skirt or trouser ease.
                  </p>
                </div>

                <div className="p-4 bg-white border border-[#E9DFD2] shadow-xs space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 bg-[#111111] text-white flex items-center justify-center text-[10px] font-bold">4</span>
                    <h4 className="font-semibold text-xs text-[#111111] uppercase tracking-wider">Shoulder Breadth</h4>
                  </div>
                  <p className="text-[11px] text-[#57534E] leading-relaxed">
                    From the posterior view, measure straight across the back from the edge of the left acromion bone to the right acromion bone along natural shoulder contours.
                  </p>
                </div>

                <div className="p-4 bg-white border border-[#E9DFD2] shadow-xs space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 bg-[#111111] text-white flex items-center justify-center text-[10px] font-bold">5</span>
                    <h4 className="font-semibold text-xs text-[#111111] uppercase tracking-wider">Sleeve Inseam</h4>
                  </div>
                  <p className="text-[11px] text-[#57534E] leading-relaxed">
                    With arm slightly bent at a 45-degree angle, measure from the center-back of neck, across the shoulder point, down along the elbow to the wrist bone.
                  </p>
                </div>

                <div className="p-4 bg-white border border-[#E9DFD2] shadow-xs space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 bg-[#111111] text-white flex items-center justify-center text-[10px] font-bold">6</span>
                    <h4 className="font-semibold text-xs text-[#111111] uppercase tracking-wider">Handbag Drop Proportion</h4>
                  </div>
                  <p className="text-[11px] text-[#57534E] leading-relaxed">
                    Handle drop measures the vertical distance from top of handle curve to top rim of bag. 11 cm drop favors hand / forearm carry; 45 cm+ favors shoulder / crossbody.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Atelier White-Glove Support Callout Banner */}
          <div className="p-4 sm:p-5 bg-[#F8F5F0] border border-[#E9DFD2] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#B94700] text-[20px]">support_agent</span>
                <span className="font-semibold text-xs text-[#111111] uppercase tracking-wider">
                  Unsure of your silhouette size?
                </span>
              </div>
              <p className="text-[11px] text-[#57534E] leading-relaxed">
                Connect directly with our Master Tailoring Concierge in Mumbai (+91 1800 209 2963) or book a private fitting rendezvous at any CYOF salon.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {onOpenSalonModal && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenSalonModal(productName);
                  }}
                  className="px-4 py-2.5 bg-[#111111] hover:bg-[#B94700] text-white text-[11px] uppercase tracking-widest font-semibold transition-colors cursor-pointer"
                >
                  Book Salon Fitting
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 border border-[#E9DFD2] bg-white text-[#111111] hover:bg-[#111111] hover:text-white text-[11px] uppercase tracking-widest font-semibold transition-colors cursor-pointer"
              >
                Close Guide
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-[#E9DFD2] bg-[#F8F5F0] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#57534E]">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-[#B94700]">verified</span>
              14-Day Complimentary Exchange Policy
            </span>
            <span>•</span>
            <span>Bespoke Tailoring Upon Request</span>
          </div>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 bg-[#B94700] hover:bg-[#9e3d00] text-white text-[11px] uppercase tracking-widest font-semibold transition-colors cursor-pointer"
          >
            Apply & Return to Silhouette
          </button>
        </div>
      </div>
    </div>
  );
};
