# IMPLEMENTATION_PLAN.md — CYOF Development Roadmap

## Phase 1: Import and Integrate Existing Stitch UI (COMPLETED & VERIFIED)
- [x] Inspect and analyze all 12 Stitch HTML templates and `DESIGN.md`.
- [x] Set official brand name to CYOF and slogan to #CraftedYourOwnFashion.
- [x] Establish design system tokens in Tailwind CSS v4 (`src/index.css`) and web fonts (`EB Garamond`, `Manrope`, Material Symbols).
- [x] Structure application architecture with shared layouts, responsive navigation, and stateful views:
  - Homepage (`HomeView`)
  - Product Listing Page (`ShopView`)
  - Product Detail Page (`ProductDetailView`)
  - Shopping Bag (`CartView`)
  - Mobile Checkout (`CheckoutView`)
  - Le Journal Blog (`JournalView`)
  - Journal Article Detail (`ArticleDetailView`)
  - Client Dossier / Account (`AccountView`)
- [x] Wire all interactive client-side functionality (steppers, swatches, modals, audio simulation, drawer toggles, filter sheets, lightbox, forms).
- [x] Create project documentation files (`AGENTS.md`, `PROJECT_SPEC.md`, `IMPLEMENTATION_PLAN.md`, `PROGRESS.md`).

## Phase 2: Verify All Frontend Screens and Responsive Quality Assurance (COMPLETED & AUDITED)
- [x] Read `AGENTS.md`, `DESIGN.md`, `PROJECT_SPEC.md`, `IMPLEMENTATION_PLAN.md`, and `PROGRESS.md`.
- [x] Conduct exhaustive screen-by-screen audit of all 12 original Stitch HTML templates against the React implementation.
- [x] Verify responsive layouts and Tailwind default breakpoints (<640px, sm:640px, md:768px, lg:1024px, xl:1280px, 2xl:1536px) with 390px reference mobile width.
- [x] Ensure strict touch target compliance ($\ge 44\times 44\text{px}$) across all mobile interactive controls (steppers, drawer toggles, navigation icons, quick add, wishlists).
- [x] Prevent mobile viewport auto-zoom by enforcing `text-[16px] sm:text-xs` on checkout and form inputs.
- [x] Eliminate header/content overlap via adjusted main padding (`pt-[84px] lg:pt-[124px]`) and safe-area compatibility (`pt-safe`, `pb-safe`).
- [x] Added missing elements: Related Monographs Archive Grid, Upcoming Monograph banner, and mobile sticky reading utility bar in `ArticleDetailView`.
- [x] Verify zero compilation errors with `compile_applet`.
- [x] Verify zero TypeScript errors with `lint_applet` (`tsc --noEmit`).
- [*] Mark headless-environment visual limitations: Full browser pixel-by-pixel rendering across physical hardware devices remains unverified in this headless CLI environment; verified via programmatic code inspection, structure matching, and CSS layout geometry.

## Phase 3: Supabase Database and Authentication (NEXT RECOMMENDED PHASE)
- [ ] Provision Supabase PostgreSQL schema for products, categories, orders, customers, and journal articles.
- [ ] Implement Supabase Auth for client sign-in, private salon appointments, and order history.
- [ ] Configure Supabase Storage buckets for lookbooks and monograph images.

## Phase 4: Product Catalog, Search, Wishlist, and Cart
- [ ] Dynamic catalog query with faceted category, color, material, and price filters.
- [ ] Real-time persistent cart and client wishlist synced with user profile.
- [ ] Global search dialog with instant auto-suggestions.

## Phase 5: Checkout and Cashfree Payments
- [ ] Integrate Cashfree Payments SDK for card, net banking, UPI, and luxury split financing.
- [ ] Order summary generation, tax/customs calculation, and discount/voucher code validation.
- [ ] Post-transaction order confirmation, SMS notification, and invoice receipt generation.

## Phase 6: Shiprocket Shipping and Tracking
- [ ] Integrate Shiprocket API for courier rate calculation and consignment dispatch.
- [ ] Real-time courier tracking page (`/order-tracking`) with live milestones and courier concierge updates.

## Phase 7: Custom CYOF Blog and Admin Publishing System
- [ ] In-house publishing dashboard (`/admin/journal`) for CYOF editors.
- [ ] Rich-text article editor, image uploader, draft saves, live previews, and publication scheduling.
- [ ] Automated SEO tags, OpenGraph cards, and schema.org structured data.

## Phase 8: Customer Account and Admin Dashboard
- [ ] Customer account hub (`/account`) with active orders, consignment status, NFC certificate vault, and address book.
- [ ] Admin management portal for orders, stock levels across flagships, and concierge inquiries.

## Phase 9: Security, Accessibility, SEO, and Performance
- [ ] Comprehensive WCAG AA audit for contrast and screen reader accessibility.
- [ ] Image optimization, WebP delivery, and lazy-loading for instantaneous first contentful paint.
- [ ] Security hardening, CSP headers, and input sanitization.

## Phase 10: Testing and Production Deployment Preparation
- [ ] End-to-end integration test suite.
- [ ] Cross-browser validation (Safari, Chrome, Firefox, Edge).
- [ ] Production build and launch checklist.
