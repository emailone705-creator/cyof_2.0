import React from 'react';
import { ViewRoute } from '../types';

interface ReturnsExchangesViewProps {
  onNavigate: (route: ViewRoute) => void;
}

export const ReturnsExchangesView: React.FC<ReturnsExchangesViewProps> = ({ onNavigate }) => {
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
            <span className="text-[#57534E] uppercase tracking-wider">Client Service</span>
            <span className="text-[#E9DFD2]">/</span>
            <span className="text-[#111111] font-semibold uppercase tracking-wider">Returns & Exchanges?</span>
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
              CYOF CLIENT SERVICE • #CraftedYourOwnFashion
            </span>
          </div>

          <h1 className="font-['EB_Garamond'] text-3xl sm:text-4xl md:text-5xl text-[#111111] tracking-tight font-normal">
            Returns & Exchanges?
          </h1>

          <p className="font-['Manrope'] text-xs text-[#57534E] tracking-wide">
            CYOF BISWAJAL PRIVATE LIMITED • Website: www.cyof.co.in
          </p>
        </div>
      </header>

      {/* Main Content Body */}
      <main className="w-full max-w-[1000px] mx-auto px-4 md:px-8 py-10 md:py-14 space-y-12">

        {/* Requested Content Section */}
        <section className="bg-white border border-[#E9DFD2] p-6 sm:p-10 shadow-sm space-y-8">

          {/* Section Heading */}
          <div className="border-b border-[#E9DFD2] pb-4">
            <span className="font-['Manrope'] text-[10px] uppercase tracking-[0.25em] text-[#B94700] font-bold block mb-1">
              CLIENT SERVICE GUIDE
            </span>

            <h2 className="font-['EB_Garamond'] text-2xl sm:text-3xl text-[#111111] tracking-wide font-normal">
              Exchange Policy for Damaged or Incorrect Products
            </h2>
          </div>

          <div className="font-['Manrope'] text-sm sm:text-base text-[#2c2b29] leading-relaxed space-y-8">

            {/* No Return Policy */}
            <div className="space-y-3">
              <h3 className="font-['EB_Garamond'] text-xl sm:text-2xl text-[#111111]">
                No Return Policy
              </h3>

              <p>
                At CYOF, we do not accept returns due to the bespoke nature of our hand-painted products, each uniquely crafted with meticulous care and customization for you. Additionally, we operate under a strict no refund policy.
              </p>
            </div>

            {/* Exchange Policy */}
            <div className="space-y-3">
              <h3 className="font-['EB_Garamond'] text-xl sm:text-2xl text-[#111111]">
                Exchange Policy for Damaged or Incorrect Products
              </h3>

              <p>
                We strive to make your shopping experience as seamless and enjoyable as possible. Please read the following terms and conditions before making a purchase. By purchasing from CYOF, you acknowledge and agree to these terms.
              </p>

              <p className="font-bold text-[#B94700]">
                If you receive a damaged or incorrect product, please follow these steps:
              </p>
            </div>

            {/* Step 1 */}
            <div className="space-y-3">
              <h4 className="font-semibold text-[#111111]">
                1. Unboxing Video and Photographs
              </h4>

              <ul className="list-disc pl-5 space-y-2">
                <li>
                  Please record an unboxing video of the delivered product without any editing, cutting, or cropping. This video is crucial for verifying the condition of the product upon arrival.
                </li>

                <li>
                  In the event of a damaged or incorrect product, take three clear photographs in addition to the unboxing video. All tags and labels (bar code and QR code) must be visible in the photos and videos. This documentation helps us ensure a smooth exchange process.
                </li>
              </ul>
            </div>

            {/* Step 2 */}
            <div className="space-y-3">
              <h4 className="font-semibold text-[#111111]">
                2. Feedback Form Submission
              </h4>

              <ul className="list-disc pl-5 space-y-2">
                <li>
                  If you wish to exchange a damaged or incorrect product, please raise a return enquiry from your customer account profile.
                </li>

                <li>
                  Then fill out our feedback form within 2 days of receiving your product. The form can be accessed via the QR code provided, which is printed on the box or package backside.
                  <a
                    href="#"
                    className="font-semibold text-[#B94700] underline underline-offset-4 hover:text-[#D34500]"
                  >
                    here
                  </a>.
                </li>
              </ul>
            </div>

            {/* Acknowledgment and Exchange Process */}
            <div className="space-y-4">
              <h3 className="font-['EB_Garamond'] text-xl sm:text-2xl text-[#111111] border-b border-[#E9DFD2] pb-2">
                Acknowledgment and Exchange Process
              </h3>

              {/* Step 3 */}
              <div className="space-y-3">
                <h4 className="font-semibold text-[#111111]">
                  3. Acknowledgment from CYOF
                </h4>

                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Once we receive your feedback form, our team will review and acknowledge it. If approved, you will receive an{" "}
                    <strong className="text-[#B94700]">“APPROVED”</strong> email from the CYOF team.
                  </li>
                </ul>
              </div>

              {/* Step 4 */}
              <div className="space-y-3">
                <h4 className="font-semibold text-[#111111]">
                  4. Returning the Product (Offline Process)
                </h4>

                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    After you get the approved confirmation message from the CYOF Team, you will receive a return request.
                  </li>

                  <li>
                    Then a delivery person can visit the customer's doorstep to collect the product.
                  </li>
                </ul>
              </div>
            </div>

            {/* Dispatch of Replacement Product */}
            <div className="space-y-4">
              <h3 className="font-['EB_Garamond'] text-xl sm:text-2xl text-[#111111] border-b border-[#E9DFD2] pb-2">
                Dispatch of the Replacement Product
              </h3>

              {/* Step 5 */}
              <div className="space-y-3">
                <h4 className="font-semibold text-[#111111]">
                  5. Replacement Process
                </h4>

                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Once we receive the returned product at our warehouse, we will dispatch a fresh product to you. This process typically takes 7–10 working days. In some circumstances, it may take longer, so we appreciate your patience.
                  </li>
                </ul>
              </div>
            </div>

            {/* Non-Eligible Items */}
            <div className="space-y-3">
              <h3 className="font-['EB_Garamond'] text-xl sm:text-2xl text-[#111111]">
                Non-Eligible Items
              </h3>

              <p>
                Certain items, such as made-to-order products, are not eligible for return or exchange. Products purchased during a stock clearance sale are also not eligible for exchange.
              </p>

              <ul className="list-disc pl-5 space-y-2">
                <li className="font-semibold text-[#B94700]">
                  All sale, discounted, coupon-purchased and gift voucher purchases are non-returnable, non-refundable and non-exchangeable.
                </li>
              </ul>
            </div>

            {/* Closing Message */}
            <div className="border-t border-[#E9DFD2] pt-5">
              <p className="font-medium text-[#111111]">
                Thank you for understanding our policies and for being a valued customer at CYOF.
              </p>
            </div>

          </div>
        </section>

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

        {/* Closing Note */}
        <div className="border-t border-[#E9DFD2] pt-6 space-y-3 text-center">
          <p className="font-['EB_Garamond'] text-xl sm:text-2xl text-[#111111] italic">
            Thank you for choosing CYOF.
          </p>
          <p className="font-['Manrope'] text-[10px] uppercase tracking-[0.25em] text-[#B94700]">
            #CraftedYourOwnFashion
          </p>
        </div>

      </main>
    </div>
  );
};
