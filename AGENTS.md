# AGENTS.md — CYOF Engineering Directives

## 1. Brand Identity & Heritage
- **Official Brand Name**: CYOF
- **Official Slogan**: #CraftedYourOwnFashion
- **Industry & Domain**: Premium luxury fashion e-commerce platform specializing in distinctive, fashionable, hand-painted clothing and accessories.
- **Primary Brand Color**: `#D35400` / `#B94700` (Accessible Dark Orange for WCAG AA compliance on ivory/champagne surfaces).
- **Prohibited Placeholders**: The legacy placeholder name "MAISON" is strictly banned from public-facing copy, headers, footers, metadata, and user interfaces.
- **Tone & Aesthetic**: Minimalist, architectural, haute couture editorial, museum-grade calm, stark typography balance, zero-pill discipline.

## 2. Design System & Stitch UI Preservation
- **Authoritative Source**: The exported Google Stitch UI templates in `/public/assets/aistudio/` and `DESIGN.md`.
- **Absolute Preservation**: Page composition, header, footer, product cards, aspect ratios (4:5 and 3:4), typography (`EB Garamond` and `Manrope`), colors, icons, and micro-interactions must be preserved faithfully.
- **Zero Redesign**: Do not redesign, reinterpret, simplify, or replace the approved Stitch designs.
- **Shapes**: Sharp 0px border-radius standard per `DESIGN.md` (no rounded pills, no soft bubble badges).

## 3. Mobile-First Responsiveness
- Smartphone users (390px reference width) are highest priority.
- Verified viewport breakpoints:
  - Base: < 640px
  - sm: 640px
  - md: 768px
  - lg: 1024px
  - xl: 1280px
  - 2xl: 1536px
- Unprefixed Tailwind classes for mobile layouts; responsive modifiers (`md:`, `lg:`) for larger viewports.
- Touch target minimum: 44×44px on mobile interactive controls.
- Safe-area compatibility: `pt-safe`, `pb-safe`.

## 4. Approved Architecture & Future Stack Rules
- **Current Phase**: Pure Frontend React SPA in TypeScript with Tailwind CSS and Lucide/Material Symbols.
- **Future Backend (DO NOT IMPLEMENT YET)**:
  - Authentication: Supabase Auth
  - Database: Supabase PostgreSQL
  - Storage: Supabase Storage
  - Payments: Cashfree Payments
  - Shipping: Shiprocket
  - Blog: Custom CYOF Blog Management System (built directly in-app on Supabase).
- **Explicit Bans**:
  - NO Sanity CMS
  - NO WordPress
  - NO Shopify
  - NO Firebase (do not switch to Firebase or call Firebase setup)
  - NO premature backend tables, API proxies, or live payment/shipping transactions in Phase 1.

## 5. Testing & Verification Standards
- Zero console errors and zero broken links.
- All interactive controls have working handlers (drawer open/close, swatches, size selector, quick add, quantity stepper, filters, tabs, zoom lightbox, checkout authorization).
- Compile check with `compile_applet` before finishing turns.
