# PROJECT_SPEC.md — CYOF Architecture Specification

## 1. Executive Summary
- **Client**: CYOF (#CraftedYourOwnFashion)
- **Application Type**: Luxury Haute Couture Digital Flagship & Editorial Journal
- **Platform**: React + TypeScript + Tailwind CSS (Vite runtime)
- **Primary Color Palette**:
  - Warm Ivory: `#F8F5F0` (Base Canvas)
  - Pure White: `#FFFFFF`
  - Champagne Beige: `#E9DFD2` (Structural Dividers)
  - Luxury Black: `#111111` (Type & Heavy Framing)
  - Muted Charcoal: `#57534E`
  - Primary Burnt Orange: `#D35400`
  - Accessible Orange: `#B94700` (WCAG AA compliant accent)
- **Typography Pairings**:
  - Headings / Editorial Serif: `EB Garamond`
  - Body / UI Controls Sans: `Manrope`

## 2. Imported Stitch UI Screens & Routes
1. **Home (`/`)**:
   - Hero campaign: "The New Expression" (Autumn / Winter 2026, Milan Atelier).
   - Category Portfolios: Women, Men, Leather Goods, Knitwear, Footwear, Horlogerie.
   - New Arrivals Rail: 4:5 image cards, color swatches, quick add, and wishlist save.
   - Editorial Banner: "The Atelier Archive" / "An Architecture of Solitude and Grace".
   - Iconic Bestsellers: The Sforza Cashmere Trench, Palazzo Calfskin Tote, Baroque Silk Shirt.
   - Brand Heritage Section: 96 years heritage, 100% traceable fibers, 38 master tailors.
   - The CYOF Gazette VIP Newsletter enrollment.
   - Luxury 5-column footer + mobile drawer & bottom navigation bar.

2. **Collections / Product Listing Page (`/shop` or `/collections`)**:
   - Editorial breadcrumbs and category lead ("Autumn / Winter", "48 Creations").
   - Scrollable filter pills (All Creations, Outerwear, Tailoring, Silk Dresses, Leather Bags, Footwear).
   - Applied filter chip tags with removal actions.
   - Desktop sticky sidebar: Sort By selector, Atelier Color swatches, Italian Sizing (IT 38-48), Price range slider, Availability toggles.
   - Mobile floating "Filter & Sort" pill button triggering slide-up drawer modal.
   - 4:5 product cards with swatch interaction, wishlist bookmarking, and quick add.
   - Mid-grid Editorial Monograph Bento Banner ("Double-Faced Cashmere Origin", Biella artisans).
   - Catalog progress bar (Viewing 6 of 48 pieces) + "Load More Creations".

3. **Product Detail Page (`/product/:id`)**:
   - Desktop 5-planche stacked editorial gallery (Planches I–V) with click-to-zoom modal.
   - Mobile 5-slide touch/swipe carousel with dot indicators and counter.
   - Sticky purchasing module: Price ($3,450 / €3,150), Customs & VAT included.
   - Real-time boutique stock banner ("Milan Flagship — Via Montenapoleone: Only 3 pieces remaining").
   - Interactive Shade Selector (Terracotta Nappa, Nero Carbon, Warm Ivory, Champagne Patina).
   - Interactive Size Scale Selector (Small, Medium Atelier, Grand Voyager) + Size Guide Drawer.
   - Dual actions: "Book Private Salon" & "Concierge Advice".
   - Primary "ADD TO SHOPPING BAG" CTA + Mobile bottom sticky purchase bar.
   - Four Luxury Accordions: Design & Craftsmanship, Materials & Care (100% Full-Grain Calfskin), Complimentary Shipping & Returns, Certificate of Authenticity & Monogram.
   - Atelier Craftsmanship Spotlight ("The Art of Florence Maroquinerie", 19 hrs assembly).
   - Curated Ensemble / Complete The Look with quick add.
   - "You May Also Admire" archive suggestions.

4. **Shopping Bag / Cart (`/cart`)**:
   - White-glove courier delivery tier progress indicator ($7,650 / $8,100, 94%).
   - Acquisition session countdown timer (28:40 reservation hold).
   - Interactive item cards with quantity stepper (+/-), wishlist preservation, and removal.
   - Complimentary signature packaging suite (Matte Black Coffret, Burnt Orange Grosgrain, Wax Sealed Note).
   - Calligraphed gift message personalization with live 240-character counter.
   - VIP Concierge passcode input (e.g. `CYOF-SALON-VVIP`).
   - Order summary breakdown (Subtotal, Packaging, Express Freight, Duty).
   - Express acquisition options (Apple Pay, Google Pay).
   - "Proceed to Secure Checkout" button + mobile sticky checkout footer.

5. **Secure Checkout (`/checkout`)**:
   - 3-step progress track (1. Contact & Delivery, 2. Payment, 3. Confirmation).
   - Express checkout options (Apple Pay, Google Pay, PayPal).
   - Contact details (email & telephone for chauffeur delivery).
   - Salon delivery address with territory selector, name, address, apartment/suite, city, state, postal code.
   - Delivery experience selection (White-Glove Private Courier vs Discreet Armored Freight).
   - Payment method tabs (Card, Wire Transfer, Klarna Split) with card formatting and validation.
   - Collapsible order review drawer showing reserved pieces and subtotal.
   - Order authorization button with confirmation modal feedback.

6. **Le Journal / Editorial Blog (`/journal`)**:
   - Editorial masthead: "LE JOURNAL • Tome XIV • Issue 88".
   - Category navigation: All Editions, Atelier Craft, Runway Dispatches, Materiality & Textiles, Artisan Dialogues, Living Heritage.
   - Asymmetric Hero Spread: "An Architecture of Solitude and Grace" (7 Min Read).
   - Curated Dispatches 3-column story grid:
     1. The 19-Hour Edge: Hand-Polished Calfskin & The Florentine Guild
     2. Lake Como Silk: The Geometry of Ancient Loom Jacquards
     3. Maestro Giuliano Vanni on Forty Years of Hand-Padded Shoulders
   - Full-bleed 4K Monograph film banner with video chapter markers.
   - Heritage Studies grid (Como Palazzo restoration, Tuscan vegetable tanning).
   - Manifesto statement: "True luxury does not clamor for attention...".
   - Shoppable editorial curation row (4 pieces featured in the tome).
   - The Gazette printed monograph subscription registration.

7. **Journal Article Detail (`/journal/architecture-of-solitude-and-grace`)**:
   - Real-time reading progress bar pinned to top.
   - Monograph Series Issue XIV header, bylines, share controls (copy link, print).
   - Hero photography figures (Fig. 01 & Fig. 02) + Atelier Notebook quote.
   - Audio dispatch player with play/pause and animated soundwave graphic.
   - Sticky Table of Contents navigation (Chapters I, II, III, IV).
   - Technical Monograph Specification Sheet (36h Hand-sewing, 14.5μ Cashmere, 0% Synthetics, 4 Master Tailors).
   - High-resolution archival study plate lightbox.
   - Shoppable featured pieces & Florentine Monograph Ensemble.
   - Author profile for Hélène de Saint-Germain and Related Dispatches.

## 3. Future Backend Integration Roadmap (Post-Phase 1)
- **Supabase Auth**: Patrons sign in to access private salon appointments, digital NFC vault certificates, and order history.
- **Supabase Database (PostgreSQL)**: Products catalog, collections, inventories, order consignment records, and custom blog articles.
- **Supabase Storage**: High-resolution campaign lookbooks, monograph plates, and atelier video dispatches.
- **Cashfree Payments**: Indian & international payment gateway for luxury checkout.
- **Shiprocket**: White-glove domestic & international logistics fulfillment and tracking.
- **Custom CYOF Blog CMS**: In-house publishing dashboard for editorial essays, photography, and SEO metadata (no external CMS).
