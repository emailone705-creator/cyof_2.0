import React from 'react';
import { ViewRoute } from '../types';

interface ShippingHandoverPolicyViewProps {
  onNavigate: (route: ViewRoute) => void;
}

export const ShippingHandoverPolicyView: React.FC<ShippingHandoverPolicyViewProps> = ({ onNavigate }) => {
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
            <span className="text-[#111111] font-semibold uppercase tracking-wider">Shipping & Handover Policy</span>
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
              CYOF LEGAL ARCHIVE • DOCUMENT N° 04 • #CraftedYourOwnFashion
            </span>
          </div>

          <h1 className="font-['EB_Garamond'] text-3xl sm:text-4xl md:text-5xl text-[#111111] tracking-tight font-normal">
            Shipping & Handover Policy
          </h1>

          <p className="font-['Manrope'] text-xs text-[#57534E] tracking-wide">
            Effective Date: November 2026 • Legal Entity: CYOF BISWAJAL PRIVATE LIMITED • Website: www.cyof.co.in
          </p>
        </div>
      </header>

      {/* Legal Content Body */}
      <main className="w-full max-w-[1000px] mx-auto px-4 md:px-8 py-10 md:py-14 space-y-12">

        {/* Requested Shipping Policy Section */}
        <section className="bg-white border border-[#E9DFD2] p-6 sm:p-10 shadow-sm space-y-8">

          {/* Section Heading */}
          <div className="border-b border-[#E9DFD2] pb-4">
            <span className="font-['Manrope'] text-[10px] uppercase tracking-[0.25em] text-[#B94700] font-bold block mb-1">
              POLICY NOTICE
            </span>

            <h2 className="font-['EB_Garamond'] text-2xl sm:text-3xl text-[#111111] uppercase tracking-wide font-normal">
              SHIPPING POLICY
            </h2>
          </div>

          <div className="font-['Manrope'] text-sm sm:text-base text-[#2c2b29] leading-relaxed space-y-6">

            {/* 1. Delivery Timeline */}
            <p>
              <strong className="text-[#111111]">1. Delivery Timeline:</strong>{" "}
              At CYOF, we specialize in hand-painted clothing, each piece crafted with meticulous care. Due to the handmade nature of our products, we require a delivery window of 7-10 working days. This period ensures that every item meets our high standards before being shipped to you.
            </p>

            {/* 2. Exchange Process */}
            <p>
              <strong className="text-[#111111]">2. Exchange Process:</strong>{" "}
              If you wish to exchange a product, we will process the exchange within 7-10 working days after receiving the returned item at our warehouse. Please note that this timeframe may extend slightly depending on circumstances. We appreciate your patience and understanding.
            </p>

            {/* 3. Cancellation Policy */}
            <p>
              <strong className="text-[#111111]">3. Cancellation Policy:</strong>{" "}
              For orders that have been dispatched or are in transit, we do not accept cancellations on Cash on Delivery (COD) orders. Additionally, prepaid orders are not eligible for cancellation once placed. We advise all customers to carefully review their orders before confirming their purchase.
            </p>

            {/* 4. Shipping Charges */}
            <p>
              <strong className="text-[#111111]">4. Shipping Charges:</strong>{" "}
              Shipping charges, if applicable, will be calculated at checkout based on your location and the weight of the items. Any promotional offers or discounts on shipping will be clearly stated on the website or during checkout.
            </p>

            {/* 5. Order Tracking */}
            <p>
              <strong className="text-[#111111]">5. Order Tracking:</strong>{" "}
              Once your order has been dispatched, you will receive a tracking number via email or SMS. You can use this tracking number to monitor the status of your shipment through our tracking system.
            </p>

            {/* 6. Delivery Areas */}
            <p>
              <strong className="text-[#111111]">6. Delivery Areas:</strong>{" "}
              We deliver across India, ensuring that even the most remote areas can enjoy our unique hand-painted clothing. However, delivery times may vary slightly for locations that are further from our headquarters.
            </p>

            {/* 7. Failed Delivery Attempts */}
            <p>
              <strong className="text-[#111111]">7. Failed Delivery Attempts:</strong>{" "}
              In the event of a failed delivery attempt due to an incorrect address, unavailability, or any other reason, our shipping partner will make additional attempts to deliver the package. If the delivery fails after multiple attempts, the order will be returned to our warehouse, and you may need to contact our customer service to arrange a redelivery. Please note that additional shipping fees may apply for redelivery.
            </p>

            {/* 8. Order Modifications */}
            <p>
              <strong className="text-[#111111]">8. Order Modifications:</strong>{" "}
              Once an order is placed, modifications such as changes to the shipping address, adding or removing items, or altering the payment method are generally not allowed.
            </p>

            {/* 9. Packaging */}
            <p>
              <strong className="text-[#111111]">9. Packaging:</strong>{" "}
              We take great care in packaging your hand-painted items to ensure they arrive in perfect condition. Our packaging is designed to protect the product during transit, and we use eco-friendly materials wherever possible.
            </p>

            {/* 10. Lost or Stolen Packages */}
            <p>
              <strong className="text-[#111111]">10. Lost or Stolen Packages:</strong>{" "}
              CYOF is not responsible for lost or stolen packages that have been confirmed to be delivered to the address provided for an order. If a package is lost or stolen, please contact the shipping provider who is responsible for delivering your package.
            </p>

            {/* 11. Order Confirmation */}
            <p>
              <strong className="text-[#111111]">11. Order Confirmation:</strong>{" "}
              After placing an order, you will receive an order confirmation email containing the details of your purchase. Please review this information carefully, and if any discrepancies are found, contact our customer service team immediately.
            </p>

            {/* 12. Pre-Orders and Backorders */}
            <p>
              <strong className="text-[#111111]">12. Pre-Orders and Backorders:</strong>{" "}
              Occasionally, certain items may be available for pre-order or may be backordered due to high demand. In such cases, the estimated shipping time will be provided on the product page, and your order will be shipped as soon as the item is back in stock.
            </p>

            {/* 13. Delivery Preferences */}
            <p>
              <strong className="text-[#111111]">13. Delivery Preferences:</strong>{" "}
              If you have any specific delivery preferences, such as leaving the package with a neighbor or in a safe place, please mention these in the delivery instructions during checkout. While we will do our best to accommodate your requests, we cannot guarantee that all preferences will be met.
            </p>

            {/* 14. Delivery to Restricted Areas */}
            <p>
              <strong className="text-[#111111]">14. Delivery to Restricted Areas:</strong>{" "}
              CYOF currently does not ship to certain restricted areas such as military zones, high-security areas, or locations with specific postal restrictions. Please check with our customer service team if you are unsure whether we can deliver to your address.
            </p>

            {/* 15. Delivery Notifications */}
            <p>
              <strong className="text-[#111111]">15. Delivery Notifications:</strong>{" "}
              In addition to order tracking, we will keep you informed about your order's status through regular email or SMS notifications. This includes notifications when your order has been dispatched, is out for delivery, and has been successfully delivered.
            </p>

            {/* 16. Handling of Fragile Items */}
            <p>
              <strong className="text-[#111111]">16. Handling of Fragile Items:</strong>{" "}
              Some of our hand-painted clothing items may require special handling due to their delicate nature. We ensure that all fragile items are packed securely to avoid any damage during transit. However, please handle these items with care upon receipt.
            </p>

            {/* 17. Order Consolidation */}
            <p>
              <strong className="text-[#111111]">17. Order Consolidation:</strong>{" "}
              If you place multiple orders within a short period of time, we may consolidate them into a single shipment to reduce shipping costs and environmental impact. This will be communicated to you in advance.
            </p>

            {/* 18. Proof of Delivery */}
            <p>
              <strong className="text-[#111111]">18. Proof of Delivery:</strong>{" "}
              For high-value items, CYOF may require proof of delivery. The default flow includes two WhatsApp messages (including one reminder) and three IVR calls (including two reminder calls) for order confirmation on COD orders. WhatsApp is used only for Address Verification and COD to Prepaid conversion. This helps ensure the safe and secure delivery of your order.
            </p>

            {/* 19. Unforeseen Shipping Interruptions */}
            <p>
              <strong className="text-[#111111]">19. Unforeseen Shipping Interruptions:</strong>{" "}
              In rare cases, unforeseen events such as natural disasters, political unrest, or pandemics may cause shipping interruptions. CYOF and our shipping partner will do our best to manage these situations and keep you informed of any delays.
            </p>

            {/* 20. Customer Responsibility for Delivery */}
            <p>
              <strong className="text-[#111111]">20. Customer Responsibility for Delivery:</strong>{" "}
              Once the package is delivered to the address provided, CYOF is not responsible for its safekeeping. It is the customer's responsibility to ensure the package is received securely, especially if no one is available at the delivery address.
            </p>

            {/* 21. Local Pickup */}
            <p>
              <strong className="text-[#111111]">21. Local Pickup (if applicable in the future):</strong>{" "}
              Although not currently offered, CYOF may introduce a local pickup option for customers in or near Bongaon, West Bengal. If this becomes available, customers will be notified and can select this option during checkout.
            </p>

            {/* 22. International Shipping */}
            <p>
              <strong className="text-[#111111]">22. International Shipping (if applicable in the future):</strong>{" "}
              While CYOF currently ships only within India, we may expand to international shipping in the future. International customers should be aware of potential customs duties, import taxes, and extended delivery times.
            </p>

            {/* 23. Recycled Packaging */}
            <p>
              <strong className="text-[#111111]">23. Recycled Packaging:</strong>{" "}
              As part of our commitment to sustainability, CYOF uses recycled and eco-friendly packaging materials wherever possible. We encourage our customers to recycle the packaging materials after receiving their order.
            </p>

            {/* 24. Expedited Shipping */}
            <p>
              <strong className="text-[#111111]">24. Expedited Shipping:</strong>{" "}
              Currently, CYOF offers a standard delivery timeline of 7-10 working days. We may introduce expedited shipping options in the future, allowing customers to receive their orders more quickly for an additional fee.
            </p>

            {/* 25. Shipping Policy Updates */}
            <p>
              <strong className="text-[#111111]">25. Shipping Policy Updates:</strong>{" "}
              CYOF reserves the right to update or modify this shipping policy at any time without prior notice. Changes will be effective immediately upon posting on our website, and customers are encouraged to review the policy regularly.
            </p>

            {/* 26. Packaging Personalization */}
            <p>
              <strong className="text-[#111111]">26. Packaging Personalization:</strong>{" "}
              For special occasions, CYOF offers the option to add personalized messages or gift wrapping to your package. This service may require additional time and cost, which will be communicated at the time of purchase.
            </p>

            {/* 27. Authority to Leave or Contactless Delivery */}
            <p>
              <strong className="text-[#111111]">27. Authority to Leave or Contactless Delivery:</strong>{" "}
              If you prefer that your package be left at your doorstep or another specified location without requiring a signature, you can select the "Authority to Leave" or “contactless delivery” option during checkout. Please note that CYOF and our shipping partner are not responsible for any loss or theft of packages left unattended.
            </p>

            {/* 28. Tracking Information Delays */}
            <p>
              <strong className="text-[#111111]">28. Tracking Information Delays:</strong>{" "}
              Occasionally, tracking information may be delayed or unavailable due to issues with the shipping carrier's systems. If you encounter any problems with tracking your package, please contact our customer service team for assistance.
            </p>

            {/* 29. Product-Specific Shipping Conditions */}
            <p>
              <strong className="text-[#111111]">29. Product-Specific Shipping Conditions:</strong>{" "}
              Certain products may have specific shipping conditions or restrictions, such as items that are temperature-sensitive or require special handling. These conditions will be clearly stated on the product page, and additional shipping charges or requirements may apply.
            </p>

            {/* 30. Delivery Address Changes */}
            <p>
              <strong className="text-[#111111]">30. Delivery Address Changes:</strong>{" "}
              If you need to change your delivery address after placing an order, please contact us immediately. We will do our best to accommodate your request, but changes may not be possible if the order has already been dispatched.
            </p>

            {/* 31. Handling Delays Due to Payment Verification */}
            <p>
              <strong className="text-[#111111]">31. Handling Delays Due to Payment Verification:</strong>{" "}
              In cases where payment verification is required (e.g., for high-value orders), there may be a delay in processing your order. We will notify you promptly if this is the case and work with you to resolve any issues.
            </p>

            {/* 32. Customer Feedback on Delivery */}
            <p>
              <strong className="text-[#111111]">32. Customer Feedback on Delivery:</strong>{" "}
              CYOF values your feedback on our delivery process. After your order is delivered, you may be invited to complete a brief survey or provide a review to help us improve our shipping services.
            </p>

            {/* 33. Sustainability Initiatives */}
            <p>
              <strong className="text-[#111111]">33. Sustainability Initiatives:</strong>{" "}
              CYOF is committed to reducing our carbon footprint. We are exploring options for carbon-neutral shipping and may introduce these initiatives in the future. Customers will be informed about any sustainable shipping options available at checkout.
            </p>

            {/* 34. Shipping During Public Holidays */}
            <p>
              <strong className="text-[#111111]">34. Shipping During Public Holidays:</strong>{" "}
              Please note that shipping and delivery services may be affected during public holidays. Orders placed during these times may experience slight delays. We recommend placing orders in advance to avoid any inconvenience.
            </p>

            {/* 35. Shipping Cost Transparency */}
            <p>
              <strong className="text-[#111111]">35. Shipping Cost Transparency:</strong>{" "}
              CYOF is committed to transparency in shipping costs. All shipping fees, including any additional charges for remote areas, expedited shipping, or special handling, will be clearly displayed at checkout, with no hidden fees.
            </p>

            {/* 36. Contact Information */}
            <p>
              <strong className="text-[#111111]">36. Contact Information:</strong>{" "}
              For any inquiries or further assistance regarding shipping, please reach out to our customer service team at{" "}
              <a
                href="mailto:info@cyof.co.in"
                className="font-semibold text-[#B94700] underline underline-offset-4 hover:text-[#D34500]"
              >
                info@cyof.co.in
              </a>{" "}
              or through our website’s contact form.
            </p>

            {/* 37. Headquarter */}
            <p>
              <strong className="text-[#111111]">37. Headquarter:</strong>{" "}
              Our operations are based in Bongaon, West Bengal, India-743235. All orders are processed and dispatched from this location.
            </p>

            {/* Closing Message */}
            <div className="border-t border-[#E9DFD2] pt-5">
              <p className="font-medium text-[#111111]">
                For further assistance, please reach out to our customer service team.
              </p>
            </div>

          </div>
        </section>

        {/* Closing Note */}
        <div className="border-t border-[#E9DFD2] pt-6 space-y-3 text-center">
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

      </main>
    </div>
  );
};
