import React from 'react';
import { ViewRoute } from '../types';

interface ReturnsExchangesPolicyViewProps {
  onNavigate: (route: ViewRoute) => void;
}

export const ReturnsExchangesPolicyView: React.FC<ReturnsExchangesPolicyViewProps> = ({ onNavigate }) => {
  return (
    <div className="w-full flex flex-col bg-[#fcf9f4] min-h-screen text-[#1c1c19] pb-24">
      {/* Breadcrumb Bar */}
      <div className="w-full bg-[#f6f3ee] px-4 md:px-8 lg:px-16 pt-6 pb-3 sm:py-3 border-b border-[#E9DFD2]">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between font-['Manrope'] text-xs">
          <div className="flex items-center gap-2 text-[#57534E]">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-[#B94700] transition-colors uppercase tracking-wider cursor-pointer"
            >
              Flagship
            </button>
            <span className="text-[#E9DFD2]">/</span>
            <span className="text-[#57534E] uppercase tracking-wider">Legal</span>
            <span className="text-[#E9DFD2]">/</span>
            <span className="text-[#111111] font-semibold uppercase tracking-wider">Returns & Exchanges Policy</span>
          </div>
          <button
            onClick={() => onNavigate('home')}
            className="hidden sm:flex items-center gap-1 uppercase tracking-widest text-[#57534E] hover:text-[#B94700] transition-colors font-semibold cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>Return to Flagship</span>
          </button>
        </div>
      </div>

      {/* Main Editorial Header Lockup */}
      <header className="w-full max-w-[1000px] mx-auto px-4 md:px-8 pt-12 md:pt-16 pb-8 border-b border-[#E9DFD2]">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-[#B94700]" />
            <span className="font-['Manrope'] text-[10px] tracking-[0.28em] text-[#57534E] uppercase font-bold">
              CYOF LEGAL ARCHIVE • DOCUMENT N° 03 • #CraftedYourOwnFashion
            </span>
          </div>

          <h1 className="font-['EB_Garamond'] text-3xl sm:text-4xl md:text-5xl text-[#111111] tracking-tight font-normal">
            Returns & Exchanges Policy
          </h1>

          <p className="font-['Manrope'] text-xs text-[#57534E] tracking-wide">
            Effective Date: November 2026 • Legal Entity: CYOF BISWAJAL PRIVATE LIMITED • Website: www.cyof.co.in
          </p>
        </div>
      </header>

      {/* Legal Content Body */}
      <main className="w-full max-w-[1000px] mx-auto px-4 md:px-8 py-10 md:py-14 space-y-12">

        {/* DETAILED POLICY SECTIONS */}
        <div className="space-y-10 font-['Manrope'] text-xs sm:text-sm text-[#44423f] leading-relaxed">

          {/* CORE POLICY — NO RETURNS */}
          <section className="space-y-4 pt-2">
            <div className="border-b border-[#E9DFD2] pb-4">
              <span className="font-['Manrope'] text-[10px] uppercase tracking-[0.25em] text-[#B94700] font-bold block mb-1">
                POLICY NOTICE
              </span>
              <h3 className="font-['EB_Garamond'] text-2xl sm:text-2xl text-[#111111] font-medium tracking-wide">
                No Return Policy
              </h3>
            </div>
            <p>
              At CYOF, we do not accept returns, as each item is a bespoke hand-painted piece, crafted with care and attention specifically for you. These custom creations are unique and made with love, which is why we cannot accommodate returns. <span className="font-bold text-[#D34500]">But don't warry we have Exchange Policy, Please read below.</span>
            </p>
          </section>

          {/* SECTION 1 — EXCHANGE POLICY */}
          <section className="space-y-4 pt-2">
            <div className="border-b border-[#E9DFD2] pb-3">
              <span className="text-[10px] uppercase tracking-widest text-[#B94700] font-bold block mb-1">
                SECTION 1
              </span>
              <h2 className="font-['EB_Garamond'] text-3xl sm:text-3xl text-[#111111] uppercase tracking-wide font-normal">
                Exchange Policy
              </h2>
            </div>
            <div className="font-['Manrope'] text-sm sm:text-base text-[#2c2b29] leading-relaxed">
              <p>
                We offer exchanges only in cases where a <span className="text-[#D34500]">damaged or incorrect product has been received.</span>
              </p>
            </div>
          </section>

          {/* SECTION 2 — ELIGIBILITY */}
          <section className="space-y-4 pt-2">
            <div className="border-b border-[#E9DFD2] pb-3">
              <span className="text-[10px] uppercase tracking-widest text-[#B94700] font-bold block mb-1">
                SECTION 2
              </span>
              <h3 className="font-['EB_Garamond'] text-xl sm:text-2xl text-[#111111] font-medium tracking-wide">
                Eligibility for Exchange
              </h3>
            </div>

            <p>
              You are eligible for an exchange if you received a damaged item or an incorrect product. To initiate an exchange, you must fill out a feedback form within 2 days of receiving the product. The form can be accessed by scanning the QR code available on the bill. This QR code also includes a FAQ section, user guide with detailed instructions on filling out the form, and the feedback form itself. If the form is not submitted within 2 days, we will consider the product correct, and you will not be eligible for an exchange.
            </p>
          </section>

          {/* SECTION 3 — EXCHANGE PROCESS */}
          <section className="space-y-4 pt-2">
            <div className="border-b border-[#E9DFD2] pb-3">
              <span className="text-[10px] uppercase tracking-widest text-[#B94700] font-bold block mb-1">
                SECTION 3
              </span>
              <h3 className="font-['EB_Garamond'] text-xl sm:text-2xl text-[#111111] font-medium tracking-wide">
                Exchange Process
              </h3>
            </div>

            <p>
              Once you have submitted the feedback form, our CYOF team will review it to determine your eligibility. If eligible, you will need to return the product to us at our studio address. Upon receiving the product, we will dispatch a replacement item. Please note that the exchange process may take 7-10 working days. Please note that this timeframe may extend slightly depending on circumstances. We appreciate your patience and understanding.
            </p>
          </section>

          {/* SECTION 4 — IMPORTANT NOTES */}
          <section className="space-y-4 pt-2">
            <div className="border-b border-[#E9DFD2] pb-3">
              <span className="text-[10px] uppercase tracking-widest text-[#B94700] font-bold block mb-1">
                SECTION 4
              </span>
              <h3 className="font-['EB_Garamond'] text-xl sm:text-2xl text-[#111111] font-medium tracking-wide">
                Important Notes
              </h3>
            </div>

            <ul className="list-disc pl-5 space-y-4 marker:text-[#B94700]">
              <li>
                <strong className="text-[#111111]">Product Condition:</strong>
                {" "}Products must be unused, unworn, unwashed, and undamaged, with all labels and tags intact and in their original packaging. Items that do not meet these criteria will not be eligible for exchange.
              </li>
              <li>
                <strong className="text-[#111111]">Tag Removal:</strong>
                {" "}If the product tag is removed, the item will not be eligible for exchange.
              </li>
              <li>
                <strong className="text-[#111111]">Tear The Envelope:</strong>
                {" "}The envelope must be in a real state. Do not tear the envelope. If CYOF provides the envelope and it is torn, CYOF will not exchange your product.
              </li>
              <li>
                <strong className="text-[#111111]">Instructions for Exchange:</strong>
                {" "}Detailed instructions on how to proceed with an eligible exchange can be found by scanning the QR code provided on your packaging.
              </li>
            </ul>
          </section>

          {/* SECTION 5 — DISCLAIMER */}
          <section className="space-y-4 pt-2">
            <div className="border-b border-[#E9DFD2] pb-3">
              <span className="text-[10px] uppercase tracking-widest text-[#B94700] font-bold block mb-1">
                SECTION 5
              </span>
              <h3 className="font-['EB_Garamond'] text-xl sm:text-2xl text-[#111111] font-medium tracking-wide">
                Disclaimer
              </h3>
            </div>

            <div className="space-y-4">
              <p>
                If the product is in your possession for more than 2 days, it will be considered used, and no exchange or credit will be provided. All returned items must be in their original condition and packaging, with no alterations or damage.
              </p>
              <p>
                Please ensure that all product details, including sizing, are thoroughly checked before making your purchase. We are happy to assist with any questions or concerns.
              </p>
              <p>
                While we maintain high standards of quality control, please note that variations in color and print placement may occur due to the nature of the fabric and our commitment to reducing chemical treatments and fabric wastage.
              </p>
            </div>
          </section>

          {/* SECTION 6 — NON-ELIGIBLE ITEMS */}
          <section className="space-y-4 pt-2">
            <div className="border-b border-[#E9DFD2] pb-3">
              <span className="text-[10px] uppercase tracking-widest text-[#B94700] font-bold block mb-1">
                SECTION 6
              </span>
              <h3 className="font-['EB_Garamond'] text-xl sm:text-2xl text-[#111111] font-medium tracking-wide">
                Non-Eligible Items
              </h3>
            </div>

            <div className="space-y-4">
              <p>
                Certain items, such as made-to-order products, are not eligible for return or exchange. Products purchased during a stock clearance sale are also not eligible for exchange.
              </p>
              <ul className="list-disc pl-5 space-y-2 marker:text-[#B94700]">
                <li>
                  <strong className="text-[#111111]">All the sale, discounted, brought with a coupon and gift voucher purchases are non returnable, non refundable &amp; non exchangeable.</strong>
                </li>
              </ul>
            </div>
          </section>

          {/* SECTION 7 — RETURN ADDRESS */}
          <section className="space-y-4 pt-2">
            <div className="border-b border-[#E9DFD2] pb-3">
              <span className="text-[10px] uppercase tracking-widest text-[#B94700] font-bold block mb-1">
                SECTION 7
              </span>
              <h3 className="font-['EB_Garamond'] text-xl sm:text-2xl text-[#111111] font-medium tracking-wide">
                Address for Returns
              </h3>
            </div>

            <div className="bg-white border border-[#E9DFD2] p-5 sm:p-6 space-y-3">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#B94700] font-bold block mb-1">
                  CYOF
                </span>
                <p className="text-[#111111]">
                  Bongaon, North 24 Parganas
                  <br />
                  West Bengal, INDIA - 743235
                </p>
              </div>

              <div className="pt-2 border-t border-[#E9DFD2]">
                <span className="text-[10px] uppercase tracking-widest text-[#57534E] block mb-1">
                  Email
                </span>
                <a
                  href="mailto:info@cyof.co.in"
                  className="text-[#111111] font-semibold hover:text-[#B94700] transition-colors"
                >
                  info@cyof.co.in
                </a>
              </div>
            </div>
          </section>

        </div>

        {/* Policy Update Information */}
        <div className="border-t border-[#E9DFD2] pt-6 space-y-3 text-center">
          <p className="font-['Manrope'] text-[10px] uppercase tracking-[0.2em] text-[#57534E]">
            Returns & Exchanges Policy
          </p>

          <p className="font-['Manrope'] text-xs text-[#57534E]">
            Last Updated: November 2026
          </p>

          <p className="font-['EB_Garamond'] text-xl sm:text-2xl text-[#111111] italic">
            Thank you for choosing CYOF.
          </p>

          <p className="font-['Manrope'] text-[10px] uppercase tracking-[0.25em] text-[#B94700]">
            #CraftedYourOwnFashion
          </p>
        </div>

        {/* Bottom Navigation CTA */}
        <div className="pt-8 border-t border-[#D34500] flex flex-col sm:flex-row items-center justify-between gap-4 font-['Manrope']">
          <button
            onClick={() => onNavigate('home')}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#D34500] hover:bg-[#B94700] text-white text-xs uppercase tracking-widest font-semibold transition-colors shadow-xs cursor-pointer"
          >
            Return to Flagship Boutique
          </button>

          <button
            onClick={() => onNavigate('account-support')}
            className="text-xs text-[#57534E] hover:text-[#B94700] transition-colors uppercase tracking-wider font-semibold cursor-pointer"
          >
            Contact Client Service Desk →
          </button>
        </div>

        {/* POLICY CLOSING */}
        <div className="border-t border-[#E9DFD2] pt-6 space-y-3 text-center">
          <p className="font-['EB_Garamond'] text-xl sm:text-2xl text-[#111111] italic">
            Thank you for your understanding and cooperation.
          </p>
          <p className="font-['Manrope'] text-[10px] uppercase tracking-[0.25em] text-[#B94700]">
            #CraftedYourOwnFashion
          </p>
        </div>

      </main>
    </div>
  );
};
