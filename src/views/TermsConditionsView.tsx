import React from 'react';
import { ViewRoute } from '../types';

interface TermsConditionsViewProps {
  onNavigate: (route: ViewRoute) => void;
}

export const TermsConditionsView: React.FC<TermsConditionsViewProps> = ({ onNavigate }) => {
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
            <span className="text-[#111111] font-semibold uppercase tracking-wider">Terms & Conditions</span>
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
              CYOF LEGAL ARCHIVE • DOCUMENT N° 01 • #CraftedYourOwnFashion
            </span>
          </div>

          <h1 className="font-['EB_Garamond'] text-3xl sm:text-4xl md:text-5xl text-[#111111] tracking-tight font-normal">
            Terms & Conditions
          </h1>

          <p className="font-['Manrope'] text-xs text-[#57534E] tracking-wide">
            Effective Date: November 2026 • Legal Entity: CYOF BISWAJAL PRIVATE LIMITED • Registered Office: Bongaon, West Bengal - 743235, India
          </p>
        </div>
      </header>

      {/* Legal Content Body */}
      <main className="w-full max-w-[1000px] mx-auto px-4 md:px-8 py-10 md:py-14 space-y-12">

        {/* Overview */}
        <section className="bg-white border border-[#E9DFD2] p-6 sm:p-10 shadow-sm space-y-6">
          <div className="border-b border-[#E9DFD2] pb-4">
            <span className="font-['Manrope'] text-[10px] uppercase tracking-[0.25em] text-[#B94700] font-bold block mb-1">
              INTRODUCTION
            </span>
            <h2 className="font-['EB_Garamond'] text-2xl sm:text-3xl text-[#111111] uppercase tracking-wide font-normal">
              OVERVIEW
            </h2>
          </div>

          <div className="font-['Manrope'] text-sm sm:text-base text-[#2c2b29] leading-relaxed space-y-5">
            <p>
              This website is operated by Cyof. Throughout the site, the terms
              “we”, “us” and “our” refer to Cyof. Cyof offers this website,
              including all information, tools and services available from this
              site to you, the user, conditioned upon your acceptance of all
              terms, conditions, policies and notices stated here.
            </p>

            <p>
              By visiting our site and/or purchasing something from us, you
              engage in our “Service” and agree to be bound by the following
              terms and conditions (“Terms of Service”, “Terms”), including
              those additional terms and conditions and policies referenced
              herein and/or available by hyperlink. These Terms of Service
              apply to all users of the site, including without limitation
              users who are browsers, vendors, customers, merchants, and/or
              contributors of content.
            </p>

            <p>
              Please read these Terms of Service carefully before accessing
              or using our website. By accessing or using any part of the site,
              you agree to be bound by these Terms of Service. If you do not
              agree to all the terms and conditions of this agreement, then
              you may not access the website or use any services. If these
              Terms of Service are considered an offer, acceptance is
              expressly limited to these Terms of Service.
            </p>

            <p>
              Any new features or tools which are added to the current store
              shall also be subject to the Terms of Service. You can review
              the most current version of the Terms of Service at any time
              on this page. We reserve the right to update, change or replace
              any part of these Terms of Service by posting updates and/or
              changes to our website. It is your responsibility to check
              this page periodically for changes. Your continued use of or
              access to the website following the posting of any changes
              constitutes acceptance of those changes.
            </p>
          </div>
        </section>

        {/* Terms and Conditions Sections */}
        <div className="space-y-10 font-['Manrope'] text-xs sm:text-sm text-[#44423f] leading-relaxed">

          {/* Section 1 */}
          <section className="space-y-4 pt-2">
            <div className="border-b border-[#E9DFD2] pb-3">
              <span className="text-[10px] uppercase tracking-widest text-[#B94700] font-bold block mb-1">
                SECTION 1
              </span>
              <h3 className="font-['EB_Garamond'] text-xl sm:text-2xl text-[#111111] font-medium tracking-wide">
                Online Store Terms
              </h3>
            </div>

            <div className="space-y-4">
              <p>
                By agreeing to these Terms of Service, you represent that you
                are at least the age of majority in your state or province of
                residence, or that you are the age of majority in your state
                or province of residence and you have given us your consent
                to allow any of your minor dependents to use this site.
              </p>

              <p>
                You may not use our products for any illegal or unauthorized
                purpose nor may you, in the use of the Service, violate any
                laws in your jurisdiction (including but not limited to
                copyright laws).
              </p>

              <p>
                You must not transmit any worms or viruses or any code of a
                destructive nature.
              </p>

              <p>
                A breach or violation of any of the Terms will result in an
                immediate termination of your Services.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="space-y-4 pt-2">
            <div className="border-b border-[#E9DFD2] pb-3">
              <span className="text-[10px] uppercase tracking-widest text-[#B94700] font-bold block mb-1">
                SECTION 2
              </span>
              <h3 className="font-['EB_Garamond'] text-xl sm:text-2xl text-[#111111] font-medium tracking-wide">
                General Conditions
              </h3>
            </div>

            <div className="space-y-4">
              <p>
                We reserve the right to refuse service to anyone for any
                reason at any time.
              </p>

              <p>
                You understand that your content (not including credit card
                information), may be transferred unencrypted and involve
                (a) transmissions over various networks; and (b) changes
                to conform and adapt to technical requirements of connecting
                networks or devices. Credit card information is always
                encrypted during transfer over networks.
              </p>

              <p>
                You agree not to reproduce, duplicate, copy, sell, resell or
                exploit any portion of the Service, use of the Service, or
                access to the Service or any contact on the website through
                which the service is provided, without express written
                permission by us.
              </p>

              <p>
                The headings used in this agreement are included for
                convenience only and will not limit or otherwise affect
                these Terms.
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-4 pt-2">
            <div className="border-b border-[#E9DFD2] pb-3">
              <span className="text-[10px] uppercase tracking-widest text-[#B94700] font-bold block mb-1">
                SECTION 3
              </span>
              <h3 className="font-['EB_Garamond'] text-xl sm:text-2xl text-[#111111] font-medium tracking-wide">
                Accuracy, Completeness and Timeliness of Information
              </h3>
            </div>

            <div className="space-y-4">
              <p>
                We are not responsible if information made available on
                this site is not accurate, complete or current. The material
                on this site is provided for general information only and
                should not be relied upon or used as the sole basis for
                making decisions without consulting primary, more accurate,
                more complete or more timely sources of information. Any
                reliance on the material on this site is at your own risk.
              </p>

              <p>
                This site may contain certain historical information.
                Historical information, necessarily, is not current and
                is provided for your reference only. We reserve the right
                to modify the contents of this site at any time, but we
                have no obligation to update any information on our site.
                You agree that it is your responsibility to monitor
                changes to our site.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-4 pt-2">
            <div className="border-b border-[#E9DFD2] pb-3">
              <span className="text-[10px] uppercase tracking-widest text-[#B94700] font-bold block mb-1">
                SECTION 4
              </span>
              <h3 className="font-['EB_Garamond'] text-xl sm:text-2xl text-[#111111] font-medium tracking-wide">
                Modifications to the Service and Prices
              </h3>
            </div>

            <div className="space-y-4">
              <p>
                Prices for our products are subject to change without notice.
              </p>

              <p>
                We reserve the right at any time to modify or discontinue
                the Service (or any part or content thereof) without notice
                at any time.
              </p>

              <p>
                We shall not be liable to you or to any third-party for any
                modification, price change, suspension or discontinuance
                of the Service.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section className="space-y-4 pt-2">
            <div className="border-b border-[#E9DFD2] pb-3">
              <span className="text-[10px] uppercase tracking-widest text-[#B94700] font-bold block mb-1">
                SECTION 5
              </span>
              <h3 className="font-['EB_Garamond'] text-xl sm:text-2xl text-[#111111] font-medium tracking-wide">
                Products or Services (If Applicable)
              </h3>
            </div>

            <div className="space-y-4">
              <p>
                Certain products or services may be available exclusively
                online through the website. These products or services may
                have limited quantities and are subject to return or exchange
                only according to our Return Policy.
              </p>

              <p>
                We have made every effort to display as accurately as possible
                the colors and images of our products that appear at the store.
                We cannot guarantee that your computer monitor's display of
                any color will be accurate.
              </p>

              <p>
                We reserve the right, but are not obligated, to limit the
                sales of our products or Services to any person, geographic
                region or jurisdiction. We may exercise this right on a
                case-by-case basis. We reserve the right to limit the
                quantities of any products or services that we offer.
                All descriptions of products or product pricing are subject
                to change at anytime without notice, at the sole discretion
                of us. We reserve the right to discontinue any product at
                any time. Any offer for any product or service made on this
                site is void where prohibited.
              </p>

              <p>
                We do not warrant that the quality of any products, services,
                information, or other material purchased or obtained by you
                will meet your expectations, or that any errors in the
                Service will be corrected.
              </p>
            </div>
          </section>

          {/* Section 6 */}
          <section className="space-y-4 pt-2">
            <div className="border-b border-[#E9DFD2] pb-3">
              <span className="text-[10px] uppercase tracking-widest text-[#B94700] font-bold block mb-1">
                SECTION 6
              </span>
              <h3 className="font-['EB_Garamond'] text-xl sm:text-2xl text-[#111111] font-medium tracking-wide">
                Accuracy of Billing and Account Information
              </h3>
            </div>

            <div className="space-y-4">
              <p>
                We reserve the right to refuse any order you place with us.
                We may, in our sole discretion, limit or cancel quantities
                purchased per person, per household or per order. These
                restrictions may include orders placed by or under the same
                customer account, the same credit card, and/or orders that
                use the same billing and/or shipping address. In the event
                that we make a change to or cancel an order, we may attempt
                to notify you by contacting the e-mail and/or billing address/
                phone number provided at the time the order was made. We
                reserve the right to limit or prohibit orders that, in our
                sole judgment, appear to be placed by dealers, resellers
                or distributors.
              </p>

              <p>
                You agree to provide current, complete and accurate purchase
                and account information for all purchases made at our store.
                You agree to promptly update your account and other
                information, including your email address and credit card
                numbers and expiration dates, so that we can complete your
                transactions and contact you as needed.
              </p>

              <p>
                For more detail, please review our Returns Policy.
              </p>
            </div>
          </section>

          {/* Section 7 */}
          <section className="space-y-4 pt-2">
            <div className="border-b border-[#E9DFD2] pb-3">
              <span className="text-[10px] uppercase tracking-widest text-[#B94700] font-bold block mb-1">
                SECTION 7
              </span>
              <h3 className="font-['EB_Garamond'] text-xl sm:text-2xl text-[#111111] font-medium tracking-wide">
                Optional Tools
              </h3>
            </div>

            <div className="space-y-4">
              <p>
                We may provide you with access to third-party tools over
                which we neither monitor nor have any control nor input.
              </p>

              <p>
                You acknowledge and agree that we provide access to such
                tools “as is” and “as available” without any warranties,
                representations or conditions of any kind and without any
                endorsement. We shall have no liability whatsoever arising
                from or relating to your use of optional third-party tools.
              </p>

              <p>
                Any use by you of optional tools offered through the site
                is entirely at your own risk and discretion and you should
                ensure that you are familiar with and approve of the terms
                on which tools are provided by the relevant third-party
                provider(s).
              </p>

              <p>
                We may also, in the future, offer new services and/or
                features through the website (including, the release of
                new tools and resources). Such new features and/or services
                shall also be subject to these Terms of Service.
              </p>
            </div>
          </section>

          {/* Section 8 */}
          <section className="space-y-4 pt-2">
            <div className="border-b border-[#E9DFD2] pb-3">
              <span className="text-[10px] uppercase tracking-widest text-[#B94700] font-bold block mb-1">
                SECTION 8
              </span>
              <h3 className="font-['EB_Garamond'] text-xl sm:text-2xl text-[#111111] font-medium tracking-wide">
                Third-Party Links
              </h3>
            </div>

            <div className="space-y-4">
              <p>
                Certain content, products and services available via our
                Service may include materials from third-parties.
              </p>

              <p>
                Third-party links on this site may direct you to third-party
                websites that are not affiliated with us. We are not
                responsible for examining or evaluating the content or
                accuracy and we do not warrant and will not have any
                liability or responsibility for any third-party materials
                or websites, or for any other materials, products, or
                services of third-parties.
              </p>

              <p>
                We are not liable for any harm or damages related to the
                purchase or use of goods, services, resources, content,
                or any other transactions made in connection with any
                third-party websites. Please review carefully the
                third-party's policies and practices and make sure you
                understand them before you engage in any transaction.
                Complaints, claims, concerns, or questions regarding
                third-party products should be directed to the third-party.
              </p>
            </div>
          </section>

          {/* Section 9 */}
          <section className="space-y-4 pt-2">
            <div className="border-b border-[#E9DFD2] pb-3">
              <span className="text-[10px] uppercase tracking-widest text-[#B94700] font-bold block mb-1">
                SECTION 9
              </span>
              <h3 className="font-['EB_Garamond'] text-xl sm:text-2xl text-[#111111] font-medium tracking-wide">
                User Comments, Feedback and Other Submissions
              </h3>
            </div>

            <div className="space-y-4">
              <p>
                If, at our request, you send certain specific submissions
                (for example contest entries) or without a request from us
                you send creative ideas, suggestions, proposals, plans, or
                other materials, whether online, by email, by postal mail,
                or otherwise (collectively, 'comments'), you agree that we
                may, at any time, without restriction, edit, copy, publish,
                distribute, translate and otherwise use in any medium any
                comments that you forward to us. We are and shall be under
                no obligation (1) to maintain any comments in confidence;
                (2) to pay compensation for any comments; or (3) to respond
                to any comments.
              </p>

              <p>
                We may, but have no obligation to, monitor, edit or remove
                content that we determine in our sole discretion are
                unlawful, offensive, threatening, libelous, defamatory,
                pornographic, obscene or otherwise objectionable or violates
                any party’s intellectual property or these Terms of Service.
              </p>

              <p>
                You agree that your comments will not violate any right of
                any third-party, including copyright, trademark, privacy,
                personality or other personal or proprietary right. You
                further agree that your comments will not contain libelous
                or otherwise unlawful, abusive or obscene material, or
                contain any computer virus or other malware that could
                in any way affect the operation of the Service or any
                related website. You may not use a false e-mail address,
                pretend to be someone other than yourself, or otherwise
                mislead us or third-parties as to the origin of any comments.
                You are solely responsible for any comments you make and
                their accuracy. We take no responsibility and assume no
                liability for any comments posted by you or any third-party.
              </p>
            </div>
          </section>

          {/* Section 10 */}
          <section className="space-y-4 pt-2">
            <div className="border-b border-[#E9DFD2] pb-3">
              <span className="text-[10px] uppercase tracking-widest text-[#B94700] font-bold block mb-1">
                SECTION 10
              </span>
              <h3 className="font-['EB_Garamond'] text-xl sm:text-2xl text-[#111111] font-medium tracking-wide">
                Personal Information
              </h3>
            </div>

            <p>
              Your submission of personal information through the store
              is governed by our Privacy Policy. To view our Privacy Policy.
            </p>
          </section>

          {/* Section 11 */}
          <section className="space-y-4 pt-2">
            <div className="border-b border-[#E9DFD2] pb-3">
              <span className="text-[10px] uppercase tracking-widest text-[#B94700] font-bold block mb-1">
                SECTION 11
              </span>
              <h3 className="font-['EB_Garamond'] text-xl sm:text-2xl text-[#111111] font-medium tracking-wide">
                Errors, Inaccuracies and Omissions
              </h3>
            </div>

            <div className="space-y-4">
              <p>
                Occasionally there may be information on our site or in the
                Service that contains typographical errors, inaccuracies or
                omissions that may relate to product descriptions, pricing,
                promotions, offers, product shipping charges, transit times
                and availability. We reserve the right to correct any errors,
                inaccuracies or omissions, and to change or update information
                or cancel orders if any information in the Service or on any
                related website is inaccurate at any time without prior
                notice (including after you have submitted your order).
              </p>

              <p>
                We undertake no obligation to update, amend or clarify
                information in the Service or on any related website,
                including without limitation, pricing information, except
                as required by law. No specified update or refresh date
                applied in the Service or on any related website, should
                be taken to indicate that all information in the Service
                or on any related website has been modified or updated.
              </p>
            </div>
          </section>

          {/* Section 12 */}
          <section className="space-y-4 pt-2">
            <div className="border-b border-[#E9DFD2] pb-3">
              <span className="text-[10px] uppercase tracking-widest text-[#B94700] font-bold block mb-1">
                SECTION 12
              </span>
              <h3 className="font-['EB_Garamond'] text-xl sm:text-2xl text-[#111111] font-medium tracking-wide">
                Prohibited Uses
              </h3>
            </div>

            <p>
              In addition to other prohibitions as set forth in the Terms
              of Service, you are prohibited from using the site or its
              content:
            </p>

            <ul className="list-disc pl-5 space-y-3 marker:text-[#B94700]">
              <li>For any unlawful purpose.</li>
              <li>
                To solicit others to perform or participate in any unlawful acts.
              </li>
              <li>
                To violate any international, federal, provincial or state
                regulations, rules, laws, or local ordinances.
              </li>
              <li>
                To infringe upon or violate our intellectual property rights
                or the intellectual property rights of others.
              </li>
              <li>
                To harass, abuse, insult, harm, defame, slander, disparage,
                intimidate, or discriminate based on gender, sexual orientation,
                religion, ethnicity, race, age, national origin, or disability.
              </li>
              <li>To submit false or misleading information.</li>
              <li>
                To upload or transmit viruses or any other type of malicious
                code that will or may be used in any way that will affect
                the functionality or operation of the Service or of any
                related website, other websites, or the Internet.
              </li>
              <li>To collect or track the personal information of others.</li>
              <li>
                To spam, phish, pharm, pretext, spider, crawl, or scrape.
              </li>
              <li>For any obscene or immoral purpose.</li>
              <li>
                To interfere with or circumvent the security features of
                the Service or any related website, other websites, or
                the Internet.
              </li>
            </ul>

            <p>
              We reserve the right to terminate your use of the Service
              or any related website for violating any of the prohibited uses.
            </p>
          </section>

          {/* Section 13 */}
          <section className="space-y-4 pt-2">
            <div className="border-b border-[#E9DFD2] pb-3">
              <span className="text-[10px] uppercase tracking-widest text-[#B94700] font-bold block mb-1">
                SECTION 13
              </span>
              <h3 className="font-['EB_Garamond'] text-xl sm:text-2xl text-[#111111] font-medium tracking-wide">
                Disclaimer of Warranties; Limitation of Liability
              </h3>
            </div>

            <div className="space-y-4">
              <p>
                We do not guarantee, represent or warrant that your use
                of our service will be uninterrupted, timely, secure
                or error-free.
              </p>

              <p>
                We do not warrant that the results that may be obtained
                from the use of the service will be accurate or reliable.
              </p>

              <p>
                You agree that from time to time we may remove the service
                for indefinite periods of time or cancel the service at
                any time, without notice to you.
              </p>

              <p>
                You expressly agree that your use of, or inability to use,
                the service is at your sole risk. The service and all
                products and services delivered to you through the service
                are (except as expressly stated by us) provided 'as is'
                and 'as available' for your use, without any representation,
                warranties or conditions of any kind, either express or
                implied, including all implied warranties or conditions
                of merchantability, merchantable quality, fitness for
                a particular purpose, durability, title, and non-infringement.
              </p>

              <p>
                In no case shall Cyof, our directors, officers, employees,
                affiliates, agents, contractors, interns, suppliers, service
                providers or licensors be liable for any injury, loss, claim,
                or any direct, indirect, incidental, punitive, special, or
                consequential damages of any kind, including, without
                limitation lost profits, lost revenue, lost savings, loss
                of data, replacement costs, or any similar damages, whether
                based in contract, tort (including negligence), strict
                liability or otherwise, arising from your use of any of
                the service or any products procured using the service,
                or for any other claim related in any way to your use of
                the service or any product, including, but not limited to,
                any errors or omissions in any content, or any loss or
                damage of any kind incurred as a result of the use of
                the service or any content (or product) posted, transmitted,
                or otherwise made available via the service, even if advised
                of their possibility. Because some states or jurisdictions
                do not allow the exclusion or the limitation of liability
                for consequential or incidental damages, in such states
                or jurisdictions, our liability shall be limited to the
                maximum extent permitted by law.
              </p>
            </div>
          </section>

          {/* Section 14 */}
          <section className="space-y-4 pt-2">
            <div className="border-b border-[#E9DFD2] pb-3">
              <span className="text-[10px] uppercase tracking-widest text-[#B94700] font-bold block mb-1">
                SECTION 14
              </span>
              <h3 className="font-['EB_Garamond'] text-xl sm:text-2xl text-[#111111] font-medium tracking-wide">
                Indemnification
              </h3>
            </div>

            <p>
              You agree to indemnify, defend and hold harmless Cyof and
              our parent, subsidiaries, affiliates, partners, officers,
              directors, agents, contractors, licensors, service providers,
              subcontractors, suppliers, interns and employees, harmless
              from any claim or demand, including reasonable attorneys’
              fees, made by any third-party due to or arising out of your
              breach of these Terms of Service or the documents they
              incorporate by reference, or your violation of any law
              or the rights of a third-party.
            </p>
          </section>

          {/* Section 15 */}
          <section className="space-y-4 pt-2">
            <div className="border-b border-[#E9DFD2] pb-3">
              <span className="text-[10px] uppercase tracking-widest text-[#B94700] font-bold block mb-1">
                SECTION 15
              </span>
              <h3 className="font-['EB_Garamond'] text-xl sm:text-2xl text-[#111111] font-medium tracking-wide">
                Severability
              </h3>
            </div>

            <p>
              In the event that any provision of these Terms of Service
              is determined to be unlawful, void or unenforceable, such
              provision shall nonetheless be enforceable to the fullest
              extent permitted by applicable law, and the unenforceable
              portion shall be deemed to be severed from these Terms of
              Service, such determination shall not affect the validity
              and enforceability of any other remaining provisions.
            </p>
          </section>

          {/* Section 16 */}
          <section className="space-y-4 pt-2">
            <div className="border-b border-[#E9DFD2] pb-3">
              <span className="text-[10px] uppercase tracking-widest text-[#B94700] font-bold block mb-1">
                SECTION 16
              </span>
              <h3 className="font-['EB_Garamond'] text-xl sm:text-2xl text-[#111111] font-medium tracking-wide">
                Termination
              </h3>
            </div>

            <div className="space-y-4">
              <p>
                The obligations and liabilities of the parties incurred
                prior to the termination date shall survive the termination
                of this agreement for all purposes.
              </p>

              <p>
                These Terms of Service are effective unless and until
                terminated by either you or us. You may terminate these
                Terms of Service at any time by notifying us that you
                no longer wish to use our Services, or when you cease
                using our site.
              </p>

              <p>
                If in our sole judgment you fail, or we suspect that you
                have failed, to comply with any term or provision of these
                Terms of Service, we also may terminate this agreement
                at any time without notice and you will remain liable
                for all amounts due up to and including the date of
                termination; and/or accordingly may deny you access
                to our Services (or any part thereof).
              </p>
            </div>
          </section>

          {/* Section 17 */}
          <section className="space-y-4 pt-2">
            <div className="border-b border-[#E9DFD2] pb-3">
              <span className="text-[10px] uppercase tracking-widest text-[#B94700] font-bold block mb-1">
                SECTION 17
              </span>
              <h3 className="font-['EB_Garamond'] text-xl sm:text-2xl text-[#111111] font-medium tracking-wide">
                Entire Agreement
              </h3>
            </div>

            <div className="space-y-4">
              <p>
                The failure of us to exercise or enforce any right or
                provision of these Terms of Service shall not constitute
                a waiver of such right or provision.
              </p>

              <p>
                These Terms of Service and any policies or operating
                rules posted by us on this site or in respect to The
                Service constitutes the entire agreement and understanding
                between you and us and govern your use of the Service,
                superseding any prior or contemporaneous agreements,
                communications and proposals, whether oral or written,
                between you and us (including, but not limited to,
                any prior versions of the Terms of Service).
              </p>

              <p>
                Any ambiguities in the interpretation of these Terms
                of Service shall not be construed against the drafting party.
              </p>
            </div>
          </section>

          {/* Section 18 */}
          <section className="space-y-4 pt-2">
            <div className="border-b border-[#E9DFD2] pb-3">
              <span className="text-[10px] uppercase tracking-widest text-[#B94700] font-bold block mb-1">
                SECTION 18
              </span>
              <h3 className="font-['EB_Garamond'] text-xl sm:text-2xl text-[#111111] font-medium tracking-wide">
                Governing Law
              </h3>
            </div>

            <p>
              These Terms of Service and any separate agreements whereby
              we provide you Services shall be governed by and construed
              in accordance with the laws of India.
            </p>
          </section>

          {/* Section 19 */}
          <section className="space-y-4 pt-2">
            <div className="border-b border-[#E9DFD2] pb-3">
              <span className="text-[10px] uppercase tracking-widest text-[#B94700] font-bold block mb-1">
                SECTION 19
              </span>
              <h3 className="font-['EB_Garamond'] text-xl sm:text-2xl text-[#111111] font-medium tracking-wide">
                Changes to Terms of Service
              </h3>
            </div>

            <div className="space-y-4">
              <p>
                You can review the most current version of the Terms of
                Service at any time at this page.
              </p>

              <p>
                We reserve the right, at our sole discretion, to update,
                change or replace any part of these Terms of Service by
                posting updates and changes to our website. It is your
                responsibility to check our website periodically for
                changes. Your continued use of or access to our website
                or the Service following the posting of any changes to
                these Terms of Service constitutes acceptance of those changes.
              </p>
            </div>
          </section>

          {/* Section 20 */}
          <section className="space-y-4 pt-2">
            <div className="border-b border-[#E9DFD2] pb-3">
              <span className="text-[10px] uppercase tracking-widest text-[#B94700] font-bold block mb-1">
                SECTION 20
              </span>
              <h3 className="font-['EB_Garamond'] text-xl sm:text-2xl text-[#111111] font-medium tracking-wide">
                Contact Information
              </h3>
            </div>

            <div className="space-y-4">
              <p>
                Questions about the Terms of Service should be sent to us at:
              </p>

              <div className="bg-white border border-[#E9DFD2] p-5 sm:p-6 space-y-3">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#B94700] font-bold block mb-1">
                    Email
                  </span>
                  <a
                    href="mailto:info@cyofs.com"
                    className="text-[#111111] font-semibold hover:text-[#B94700] transition-colors"
                  >
                    info@cyofs.com
                  </a>
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* Closing Note */}
        <div className="border-t border-[#E9DFD2] pt-6 text-center">
          <p className="font-['EB_Garamond'] text-xl sm:text-2xl text-[#111111] italic">
            Thank you for choosing CYOF.
          </p>
          <p className="font-['Manrope'] text-[10px] uppercase tracking-[0.25em] text-[#B94700] mt-2">
            #CraftedYourOwnFashion
          </p>
        </div>

        {/* Bottom Navigation CTA */}
        <div className="pt-8 border-t border-[#D34500] flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={() => onNavigate('home')}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#111111] hover:bg-[#B94700] text-white font-['Manrope'] text-xs uppercase tracking-widest font-semibold transition-colors shadow-xs cursor-pointer"
          >
            Return to Flagship Boutique
          </button>

          <button
            onClick={() => onNavigate('account-support')}
            className="font-['Manrope'] text-xs text-[#57534E] hover:text-[#B94700] transition-colors uppercase tracking-wider font-semibold cursor-pointer"
          >
            Contact Client Service Desk →
          </button>
        </div>

      </main>
    </div>
  );
};
