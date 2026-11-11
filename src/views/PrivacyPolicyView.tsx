import React from 'react';
import { ViewRoute } from '../types';

interface PrivacyPolicyViewProps {
  onNavigate: (route: ViewRoute) => void;
}

export const PrivacyPolicyView: React.FC<PrivacyPolicyViewProps> = ({ onNavigate }) => {
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
            <span className="text-[#111111] font-semibold uppercase tracking-wider">Privacy Policy</span>
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
              CYOF LEGAL ARCHIVE • DOCUMENT N° 02 • #CraftedYourOwnFashion
            </span>
          </div>

          <h1 className="font-['EB_Garamond'] text-3xl sm:text-4xl md:text-5xl text-[#111111] tracking-tight font-normal">
            Privacy Policy
          </h1>

          <p className="font-['Manrope'] text-xs text-[#57534E] tracking-wide">
            Effective Date: November 2026 • Legal Entity: CYOF BISWAJAL PRIVATE LIMITED • Website: www.cyof.co.in
          </p>
        </div>
      </header>











      {/* Legal Content Body */}
      <main className="w-full max-w-[1000px] mx-auto px-4 md:px-8 py-10 md:py-14 space-y-12">

        {/* SECTION 1 — OVERVIEW */}
        <section className="bg-white border border-[#E9DFD2] p-6 sm:p-10 shadow-sm space-y-6">
          <div className="border-b border-[#E9DFD2] pb-4">
            <span className="font-['Manrope'] text-[10px] uppercase tracking-[0.25em] text-[#B94700] font-bold block mb-1">
              SECTION 1
            </span>
            <h2 className="font-['EB_Garamond'] text-2xl sm:text-3xl text-[#111111] uppercase tracking-wide font-normal">
              PRIVACY POLICY
            </h2>
          </div>

          <div className="font-['Manrope'] text-sm sm:text-base text-[#2c2b29] leading-relaxed space-y-5">
            <p>
              This Privacy Policy governs the manner in which CYOF collects,
              uses, maintains and discloses information collected from users
              (each, a "User") of the <strong>www.cyof.co.in</strong> website
              ("Site"). This Privacy Policy applies to the Site and all
              products and services offered by CYOF.
            </p>

            <p>
              At CYOF, we respect your privacy and are committed to handling
              your personal information responsibly. This policy explains
              what information we may collect, why we collect it, how it may
              be used, when it may be shared, and the choices and rights
              available to you.
            </p>

            <p>
              By accessing or using our Site, you acknowledge that you have
              read this Privacy Policy. Where applicable law requires your
              consent for a particular use of personal information, we will
              seek that consent separately and explain the relevant purpose.
              Simply browsing our Site does not, by itself, constitute
              consent to optional marketing or non-essential tracking.
            </p>
          </div>
        </section>

        {/* DETAILED PRIVACY POLICY SECTIONS */}
        <div className="space-y-10 font-['Manrope'] text-xs sm:text-sm text-[#44423f] leading-relaxed">

          {/* SECTION 2 */}
          <section className="space-y-4 pt-2">
            <div className="border-b border-[#E9DFD2] pb-3">
              <span className="text-[10px] uppercase tracking-widest text-[#B94700] font-bold block mb-1">
                SECTION 2
              </span>
              <h3 className="font-['EB_Garamond'] text-xl sm:text-2xl text-[#111111] font-medium tracking-wide">
                Personal Identification Information
              </h3>
            </div>

            <div className="space-y-4">
              <p>
                We may collect personal identification information from Users
                in a variety of ways, including when Users visit our Site,
                create an account, place an order, subscribe to our newsletter,
                contact customer support, participate in promotions, or use
                other activities, services, features or resources made
                available on our Site.
              </p>

              <p>Depending on how you interact with CYOF, the information may include:</p>

              <ul className="list-disc pl-5 space-y-2 marker:text-[#B94700]">
                <li>Your name and contact details, including email address and mobile number.</li>
                <li>Billing, shipping and delivery addresses.</li>
                <li>Account information and login-related details.</li>
                <li>Order history, purchased products, sizes, preferences and transaction references.</li>
                <li>Information you provide when contacting customer support or requesting a return or exchange.</li>
                <li>Newsletter and marketing communication preferences.</li>
                <li>Information you voluntarily submit through forms, surveys or other Site features.</li>
              </ul>

              <p>
                Payment information may be collected and processed by the
                payment service provider selected during checkout. Where
                payment details are handled by an external payment provider,
                their own privacy policy and security practices may also apply.
                CYOF does not intend to collect your UPI PIN, card CVV,
                banking password or other payment authentication secrets.
              </p>

              <p>
                We collect personal information when you voluntarily provide
                it or when it is otherwise lawfully made available to us.
                You may choose not to provide certain information; however,
                this may prevent us from providing particular services,
                processing an order or delivering products to you.
              </p>
            </div>
          </section>

          {/* SECTION 3 */}
          <section className="space-y-4 pt-2">
            <div className="border-b border-[#E9DFD2] pb-3">
              <span className="text-[10px] uppercase tracking-widest text-[#B94700] font-bold block mb-1">
                SECTION 3
              </span>
              <h3 className="font-['EB_Garamond'] text-xl sm:text-2xl text-[#111111] font-medium tracking-wide">
                Anonymous Visits and Voluntary Information
              </h3>
            </div>

            <div className="space-y-4">
              <p>
                Users may visit and browse our Site without creating an
                account or directly submitting personal identification
                information.
              </p>

              <p>
                We collect personal identification information when Users
                voluntarily submit it or when it is otherwise lawfully
                collected in connection with their use of our services.
              </p>

              <p>
                Users may refuse to provide personal information. However,
                certain activities, including placing orders, creating an
                account, arranging delivery or receiving customer support,
                may require specific information to be provided.
              </p>
            </div>
          </section>

          {/* SECTION 4 */}
          <section className="space-y-4 pt-2">
            <div className="border-b border-[#E9DFD2] pb-3">
              <span className="text-[10px] uppercase tracking-widest text-[#B94700] font-bold block mb-1">
                SECTION 4
              </span>
              <h3 className="font-['EB_Garamond'] text-xl sm:text-2xl text-[#111111] font-medium tracking-wide">
                Non-Personal Identification Information
              </h3>
            </div>

            <div className="space-y-4">
              <p>
                We may collect non-personal or technical information about
                Users whenever they interact with our Site. This information
                may include:
              </p>

              <ul className="list-disc pl-5 space-y-2 marker:text-[#B94700]">
                <li>Browser name and browser version.</li>
                <li>Device type, computer or mobile operating system.</li>
                <li>Internet service provider and connection information.</li>
                <li>IP address and general technical identifiers.</li>
                <li>Pages visited, referring pages and browsing interactions.</li>
                <li>Approximate usage information, such as visit duration and navigation patterns.</li>
              </ul>

              <p>
                We may use this information for website administration,
                security, troubleshooting, analytics and improving the
                performance and usability of our Site.
              </p>

              <p>
                Technical information may sometimes be associated with
                personal information where necessary for security,
                service delivery or another disclosed purpose.
              </p>
            </div>
          </section>

          {/* SECTION 5 */}
          <section className="space-y-4 pt-2">
            <div className="border-b border-[#E9DFD2] pb-3">
              <span className="text-[10px] uppercase tracking-widest text-[#B94700] font-bold block mb-1">
                SECTION 5
              </span>
              <h3 className="font-['EB_Garamond'] text-xl sm:text-2xl text-[#111111] font-medium tracking-wide">
                Cookies and Similar Technologies
              </h3>
            </div>

            <div className="space-y-4">
              <p>
                Our Site may use cookies and similar technologies to improve
                your browsing experience, remember preferences, support
                essential website functions and understand how visitors
                interact with our Site.
              </p>

              <p>These technologies may be used for purposes such as:</p>

              <ul className="list-disc pl-5 space-y-2 marker:text-[#B94700]">
                <li>Maintaining shopping cart and session functionality.</li>
                <li>Remembering language, display and browsing preferences.</li>
                <li>Supporting account security and fraud prevention.</li>
                <li>Understanding website traffic and performance.</li>
                <li>Measuring the effectiveness of marketing activities, where applicable.</li>
              </ul>

              <p>
                You may manage or disable cookies through your browser
                settings. You may also be offered cookie preferences through
                our Site where such controls are implemented. Blocking
                certain cookies may affect the operation of some website
                features, including account access and shopping cart
                functionality.
              </p>

              <p>
                Where applicable law requires consent for non-essential
                cookies or similar technologies, we will seek that consent
                before using them.
              </p>
            </div>
          </section>

          {/* SECTION 6 */}
          <section className="space-y-4 pt-2">
            <div className="border-b border-[#E9DFD2] pb-3">
              <span className="text-[10px] uppercase tracking-widest text-[#B94700] font-bold block mb-1">
                SECTION 6
              </span>
              <h3 className="font-['EB_Garamond'] text-xl sm:text-2xl text-[#111111] font-medium tracking-wide">
                How We Use Collected Information
              </h3>
            </div>

            <div className="space-y-4">
              <p>
                CYOF may collect and use Users' personal information for
                the following purposes:
              </p>

              <ul className="list-disc pl-5 space-y-4 marker:text-[#B94700]">
                <li>
                  <strong className="text-[#111111]">To provide customer service:</strong>
                  {" "}Your information helps us respond to customer service
                  requests, product enquiries, sizing questions, complaints
                  and support needs.
                </li>

                <li>
                  <strong className="text-[#111111]">To personalize user experience:</strong>
                  {" "}We may use relevant information to understand customer
                  preferences and improve the browsing and shopping
                  experience on our Site.
                </li>

                <li>
                  <strong className="text-[#111111]">To improve our Site:</strong>
                  {" "}We may use feedback, technical information and
                  aggregated usage data to improve our website, products,
                  services and customer experience.
                </li>

                <li>
                  <strong className="text-[#111111]">To process transactions:</strong>
                  {" "}We use relevant information to process purchases,
                  confirm orders, arrange payments, coordinate delivery,
                  manage returns and provide after-sales support.
                </li>

                <li>
                  <strong className="text-[#111111]">To manage customer accounts:</strong>
                  {" "}We may use your information to create and maintain
                  accounts, authenticate access and manage account-related
                  services.
                </li>

                <li>
                  <strong className="text-[#111111]">To communicate order updates:</strong>
                  {" "}We may send order confirmations, payment updates,
                  dispatch notifications, delivery updates and important
                  service-related communications.
                </li>

                <li>
                  <strong className="text-[#111111]">To send marketing communications:</strong>
                  {" "}Where you have opted in or otherwise permitted such
                  communication under applicable law, we may send
                  newsletters, collection announcements, product updates
                  and promotional information.
                </li>

                <li>
                  <strong className="text-[#111111]">To protect our business and Users:</strong>
                  {" "}We may use relevant information to detect suspicious
                  activity, prevent fraud, protect website security and
                  address misuse of our services.
                </li>

                <li>
                  <strong className="text-[#111111]">To comply with legal obligations:</strong>
                  {" "}We may process or retain information where necessary
                  to meet applicable legal, regulatory, accounting or
                  tax requirements.
                </li>
              </ul>
            </div>
          </section>

          {/* SECTION 7 */}
          <section className="space-y-4 pt-2">
            <div className="border-b border-[#E9DFD2] pb-3">
              <span className="text-[10px] uppercase tracking-widest text-[#B94700] font-bold block mb-1">
                SECTION 7
              </span>
              <h3 className="font-['EB_Garamond'] text-xl sm:text-2xl text-[#111111] font-medium tracking-wide">
                Payment Processing and Order Fulfilment
              </h3>
            </div>

            <div className="space-y-4">
              <p>
                When you place an order through CYOF, certain information
                is required to complete the transaction and fulfil your
                purchase. This may include your name, contact details,
                billing information, shipping address, order details
                and payment status.
              </p>

              <p>
                Payment transactions may be handled by third-party payment
                service providers, including Cashfree, if and when integrated
                into our checkout system. Such providers may process
                transaction information under their own terms, privacy
                policies and security practices.
              </p>

              <p>
                We may receive payment confirmations, transaction references,
                payment status and related information necessary to
                reconcile orders and provide customer support.
              </p>

              <p>
                For delivery and fulfilment, relevant customer and order
                information may be shared with logistics and shipping
                service providers, including Shiprocket, if and when
                integrated into our shipping process. This information
                may include your name, mobile number, delivery address
                and shipment details.
              </p>

              <p>
                We do not intend to store sensitive payment authentication
                credentials such as card CVV, UPI PIN or banking passwords.
                Please do not share these credentials with CYOF through
                email, telephone or website forms.
              </p>
            </div>
          </section>

          {/* SECTION 8 */}
          <section className="space-y-4 pt-2">
            <div className="border-b border-[#E9DFD2] pb-3">
              <span className="text-[10px] uppercase tracking-widest text-[#B94700] font-bold block mb-1">
                SECTION 8
              </span>
              <h3 className="font-['EB_Garamond'] text-xl sm:text-2xl text-[#111111] font-medium tracking-wide">
                Sharing Your Personal Information
              </h3>
            </div>

            <div className="space-y-4">
              <p>
                CYOF does not sell or rent Users' personal identification
                information to third parties.
              </p>

              <p>
                We may share relevant information with trusted third parties
                where necessary to operate our business, provide services
                requested by you, fulfil orders or meet legal obligations.
                These may include:
              </p>

              <ul className="list-disc pl-5 space-y-2 marker:text-[#B94700]">
                <li>Payment gateways and transaction processing providers.</li>
                <li>Courier, logistics and delivery service providers.</li>
                <li>Website hosting, infrastructure and technical support providers.</li>
                <li>Customer communication and email service providers.</li>
                <li>Analytics and website performance service providers, where used.</li>
                <li>Professional advisers, auditors and legal service providers where necessary.</li>
                <li>Government authorities or law enforcement agencies where disclosure is required or legally permitted.</li>
              </ul>

              <p>
                We may also share aggregated or anonymised information
                that does not identify an individual User for analytical,
                operational or business purposes.
              </p>

              <p>
                Where third-party service providers process personal
                information on our behalf, we will seek to use appropriate
                contractual, organisational and security safeguards,
                as required by applicable law.
              </p>

              <p>
                Third-party websites and services may have their own
                privacy policies. We encourage Users to review those
                policies before providing information directly to
                those providers.
              </p>
            </div>
          </section>

          {/* SECTION 9 */}
          <section className="space-y-4 pt-2">
            <div className="border-b border-[#E9DFD2] pb-3">
              <span className="text-[10px] uppercase tracking-widest text-[#B94700] font-bold block mb-1">
                SECTION 9
              </span>
              <h3 className="font-['EB_Garamond'] text-xl sm:text-2xl text-[#111111] font-medium tracking-wide">
                How We Protect Your Information
              </h3>
            </div>

            <div className="space-y-4">
              <p>
                CYOF seeks to protect personal information through
                appropriate technical, organisational and administrative
                safeguards designed to reduce the risk of unauthorised
                access, alteration, disclosure, loss or destruction.
              </p>

              <p>
                Depending on the services and systems in use, these
                safeguards may include access restrictions, secure
                communication channels, encryption where appropriate,
                authentication controls, monitoring and secure handling
                of information.
              </p>

              <p>
                We seek to limit access to personal information to
                authorised personnel and service providers who need
                that information for legitimate business or service
                purposes.
              </p>

              <p>
                However, no website, electronic transmission or storage
                system can be guaranteed to be completely secure.
                Accordingly, we cannot promise absolute security.
              </p>

              <p>
                If a personal data breach occurs, CYOF will take appropriate
                steps to investigate, contain and address the incident
                and provide notifications to affected individuals and
                authorities where required by applicable law.
              </p>
            </div>
          </section>

          {/* SECTION 10 */}
          <section className="space-y-4 pt-2">
            <div className="border-b border-[#E9DFD2] pb-3">
              <span className="text-[10px] uppercase tracking-widest text-[#B94700] font-bold block mb-1">
                SECTION 10
              </span>
              <h3 className="font-['EB_Garamond'] text-xl sm:text-2xl text-[#111111] font-medium tracking-wide">
                Data Retention and Deletion
              </h3>
            </div>

            <div className="space-y-4">
              <p>
                CYOF retains personal information only for as long as
                reasonably necessary to fulfil the purposes for which
                it was collected, provide requested services, maintain
                relevant business records and meet applicable legal,
                regulatory, accounting and tax requirements.
              </p>

              <p>
                The retention period may depend on the nature of the
                information, the purpose of processing, the status of
                an order or account, applicable limitation periods
                and legal record-keeping obligations.
              </p>

              <p>
                When personal information is no longer required for
                its intended purpose and there is no applicable legal
                reason to retain it, we will take reasonable steps
                to delete or anonymise it, subject to applicable law.
              </p>

              <p>
                You may contact us to request information about your
                personal data or to request deletion where such a
                request is available under applicable law. Certain
                information may need to be retained where required
                for legal compliance, dispute resolution, fraud
                prevention or the establishment or defence of legal claims.
              </p>
            </div>
          </section>

          {/* SECTION 11 */}
          <section className="space-y-4 pt-2">
            <div className="border-b border-[#E9DFD2] pb-3">
              <span className="text-[10px] uppercase tracking-widest text-[#B94700] font-bold block mb-1">
                SECTION 11
              </span>
              <h3 className="font-['EB_Garamond'] text-xl sm:text-2xl text-[#111111] font-medium tracking-wide">
                Your Privacy Rights and Choices
              </h3>
            </div>

            <div className="space-y-4">
              <p>
                Subject to applicable law and its commencement, you may
                have rights and choices in relation to your personal
                information, including:
              </p>

              <ul className="list-disc pl-5 space-y-3 marker:text-[#B94700]">
                <li>
                  <strong className="text-[#111111]">Access to information:</strong>
                  {" "}Request information about personal data processed
                  by CYOF, where such access is available under applicable law.
                </li>

                <li>
                  <strong className="text-[#111111]">Correction:</strong>
                  {" "}Request correction or updating of inaccurate or
                  incomplete personal information.
                </li>

                <li>
                  <strong className="text-[#111111]">Erasure:</strong>
                  {" "}Request deletion of personal information where
                  applicable law permits, subject to legitimate retention
                  requirements.
                </li>

                <li>
                  <strong className="text-[#111111]">Withdrawal of consent:</strong>
                  {" "}Where processing is based on your consent, you may
                  withdraw that consent through an available method.
                  Withdrawal does not affect the lawfulness of processing
                  carried out before withdrawal.
                </li>

                <li>
                  <strong className="text-[#111111]">Marketing preferences:</strong>
                  {" "}Opt out of promotional emails using the unsubscribe
                  link or another available preference control. Essential
                  service and transaction communications may still be sent.
                </li>

                <li>
                  <strong className="text-[#111111]">Grievance redressal:</strong>
                  {" "}Raise a privacy-related complaint or concern through
                  the contact details provided in this policy.
                </li>

                <li>
                  <strong className="text-[#111111]">Nomination:</strong>
                  {" "}Exercise nomination rights where and to the extent
                  provided under applicable data-protection law.
                </li>
              </ul>

              <p>
                We may need to verify your identity before responding
                to a request. We will handle requests in accordance
                with applicable legal requirements and timelines.
              </p>

              <p>
                You may also have the right to raise a complaint with
                the relevant data-protection authority or other
                competent body, where available under applicable law.
              </p>
            </div>
          </section>

          {/* SECTION 12 */}
          <section className="space-y-4 pt-2">
            <div className="border-b border-[#E9DFD2] pb-3">
              <span className="text-[10px] uppercase tracking-widest text-[#B94700] font-bold block mb-1">
                SECTION 12
              </span>
              <h3 className="font-['EB_Garamond'] text-xl sm:text-2xl text-[#111111] font-medium tracking-wide">
                Email and Marketing Communications
              </h3>
            </div>

            <div className="space-y-4">
              <p>
                The email address and mobile number you provide when
                placing an order may be used to send information
                relating to that order, including confirmation,
                payment, shipping, delivery and customer support updates.
              </p>

              <p>
                Where you choose to subscribe to CYOF marketing
                communications, we may send newsletters, collection
                announcements, offers, product information and
                other promotional updates.
              </p>

              <p>
                You may unsubscribe from marketing emails at any
                time by using the unsubscribe link included in
                the communication or by contacting us.
              </p>

              <p>
                Opting out of marketing communications will not
                prevent us from sending essential service messages
                relating to purchases, accounts, security or other
                matters necessary to provide our services.
              </p>
            </div>
          </section>

          {/* SECTION 13 */}
          <section className="space-y-4 pt-2">
            <div className="border-b border-[#E9DFD2] pb-3">
              <span className="text-[10px] uppercase tracking-widest text-[#B94700] font-bold block mb-1">
                SECTION 13
              </span>
              <h3 className="font-['EB_Garamond'] text-xl sm:text-2xl text-[#111111] font-medium tracking-wide">
                Children's Privacy
              </h3>
            </div>

            <div className="space-y-4">
              <p>
                CYOF's Site and services are intended for individuals
                who are legally capable of entering into transactions
                under applicable law.
              </p>

              <p>
                We do not knowingly seek to collect personal information
                from children in circumstances where parental or
                guardian consent is required and has not been obtained.
                Where applicable law requires verifiable parental
                consent, we will follow the relevant requirements.
              </p>

              <p>
                If you believe that a child has provided personal
                information to us in circumstances that are not
                permitted by applicable law, please contact us so
                that we can review the matter and take appropriate action.
              </p>
            </div>
          </section>

          {/* SECTION 14 */}
          <section className="space-y-4 pt-2">
            <div className="border-b border-[#E9DFD2] pb-3">
              <span className="text-[10px] uppercase tracking-widest text-[#B94700] font-bold block mb-1">
                SECTION 14
              </span>
              <h3 className="font-['EB_Garamond'] text-xl sm:text-2xl text-[#111111] font-medium tracking-wide">
                Third-Party Websites and Services
              </h3>
            </div>

            <div className="space-y-4">
              <p>
                Our Site may contain links to third-party websites,
                platforms or services. These external services may
                have privacy policies and practices that are
                independent of CYOF.
              </p>

              <p>
                We do not control third-party websites and are not
                responsible for their content, privacy practices
                or security measures. Your interaction with those
                websites is subject to their own terms and policies.
              </p>

              <p>
                We encourage you to review the privacy policies
                of third-party services before providing personal
                information to them.
              </p>
            </div>
          </section>

          {/* SECTION 15 */}
          <section className="space-y-4 pt-2">
            <div className="border-b border-[#E9DFD2] pb-3">
              <span className="text-[10px] uppercase tracking-widest text-[#B94700] font-bold block mb-1">
                SECTION 15
              </span>
              <h3 className="font-['EB_Garamond'] text-xl sm:text-2xl text-[#111111] font-medium tracking-wide">
                Changes to This Privacy Policy
              </h3>
            </div>

            <div className="space-y-4">
              <p>
                CYOF reserves the right to update or modify this
                Privacy Policy from time to time to reflect changes
                in our business practices, website features,
                services, technology or applicable laws.
              </p>

              <p>
                When changes are made, we will update the
                "Last Updated" date displayed on this page.
                Where required by applicable law, we will provide
                additional notice or seek fresh consent for
                material changes to the purposes of processing.
              </p>

              <p>
                We encourage Users to review this page periodically
                to remain informed about how CYOF handles personal
                information.
              </p>
            </div>
          </section>

          {/* SECTION 16 */}
          <section className="space-y-4 pt-2">
            <div className="border-b border-[#E9DFD2] pb-3">
              <span className="text-[10px] uppercase tracking-widest text-[#B94700] font-bold block mb-1">
                SECTION 16
              </span>
              <h3 className="font-['EB_Garamond'] text-xl sm:text-2xl text-[#111111] font-medium tracking-wide">
                Your Acceptance of This Privacy Policy
              </h3>
            </div>

            <div className="space-y-4">
              <p>
                By using our Site, you acknowledge that you have
                read this Privacy Policy and understand how CYOF
                may handle personal information as described herein.
              </p>

              <p>
                Where applicable law requires consent for the
                collection or processing of personal information,
                such consent will be obtained through an appropriate
                affirmative action and will not be assumed merely
                from browsing or continuing to use the Site.
              </p>

              <p>
                If you do not agree with the practices described
                in this policy, you should discontinue using the
                relevant services and contact us if you have
                questions about information already provided.
              </p>
            </div>
          </section>

          {/* SECTION 17 */}
          <section className="space-y-4 pt-2">
            <div className="border-b border-[#E9DFD2] pb-3">
              <span className="text-[10px] uppercase tracking-widest text-[#B94700] font-bold block mb-1">
                SECTION 17
              </span>
              <h3 className="font-['EB_Garamond'] text-xl sm:text-2xl text-[#111111] font-medium tracking-wide">
                Applicable Law and Jurisdiction
              </h3>
            </div>

            <p>
              This Privacy Policy shall be interpreted in accordance
              with the applicable laws of India, including applicable
              data-protection and information-technology laws, as
              amended or brought into force from time to time.
              Any dispute relating to this Privacy Policy shall
              be handled by the competent authorities or courts
              in accordance with applicable Indian law.
            </p>
          </section>

          {/* SECTION 18 — CONTACTING US */}
          <section className="space-y-4 pt-2">
            <div className="border-b border-[#E9DFD2] pb-3">
              <span className="text-[10px] uppercase tracking-widest text-[#B94700] font-bold block mb-1">
                SECTION 18
              </span>
              <h3 className="font-['EB_Garamond'] text-xl sm:text-2xl text-[#111111] font-medium tracking-wide">
                Contacting Us
              </h3>
            </div>

            <p>
              If you have any questions about this Privacy Policy, the
              practices of this site, or your dealings with this site,
              please contact us at:
            </p>

            <div className="bg-white border border-[#E9DFD2] p-5 sm:p-6 space-y-3">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#B94700] font-bold block mb-1">
                  CYOF BISWAJAL PRIVATE LIMITED
                </span>
                <p className="text-[#111111]">
                  Bongaon, North 24 Parganas, West Bengal - 743235, India
                </p>
              </div>

              <div className="pt-2 border-t border-[#E9DFD2] flex flex-col sm:flex-row gap-4 sm:gap-8">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#57534E] block">
                    Website
                  </span>
                  <a
                    href="https://www.cyof.co.in"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#111111] font-semibold hover:text-[#B94700] transition-colors"
                  >
                    www.cyof.co.in
                  </a>
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#57534E] block">
                    Client Care Email
                  </span>
                  <a
                    href="mailto:info@cyof.co.in"
                    className="text-[#111111] font-semibold hover:text-[#B94700] transition-colors"
                  >
                    info@cyof.co.in
                  </a>
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#57534E] block">
                    Toll-Free Phone
                  </span>
                  <span className="text-[#111111] font-semibold">
                    +91 1800 209 2963
                  </span>
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* POLICY UPDATE INFORMATION */}
        <div className="border-t border-[#E9DFD2] pt-6 space-y-3 text-center">
          <p className="font-['Manrope'] text-[10px] uppercase tracking-[0.2em] text-[#57534E]">
            Privacy Policy
          </p>

          <p className="font-['Manrope'] text-xs text-[#57534E]">
            Last Updated: 11 November 2026
          </p>

          <p className="font-['EB_Garamond'] text-xl sm:text-2xl text-[#111111] italic">
            Your trust is part of our craft.
          </p>

          <p className="font-['Manrope'] text-[10px] uppercase tracking-[0.25em] text-[#B94700]">
            #CraftedYourOwnFashion
          </p>
        </div>

        {/* Closing Note */}
        <div className="border-t border-[#E9DFD2] pt-6 text-center">
          <p className="font-['EB_Garamond'] text-xl sm:text-2xl text-[#111111] italic">
            Integrity, Discretion & Bespoke Excellence.
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
            onClick={() => onNavigate('terms-conditions')}
            className="font-['Manrope'] text-xs text-[#57534E] hover:text-[#B94700] transition-colors uppercase tracking-wider font-semibold cursor-pointer"
          >
            View Terms & Conditions →
          </button>
        </div>

      </main>
    </div>
  );
};
