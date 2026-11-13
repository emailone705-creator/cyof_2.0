/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ViewRoute, Product, CartItem, Article } from './types';
import { PRODUCTS, ARTICLES } from './data/mockData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SalonModal } from './components/SalonModal';
import { HomeView } from './views/HomeView';
import { ShopView } from './views/ShopView';
import { ProductDetailView } from './views/ProductDetailView';
import { CartView } from './views/CartView';
import { CartSheetDrawer } from './components/CartSheetDrawer';
import { CheckoutView } from './views/CheckoutView';
import { JournalView } from './views/JournalView';
import { ArticleDetailView } from './views/ArticleDetailView';
import { AccountView } from './views/AccountView';
import { PatronProvider } from './context/PatronContext';
import { OrdersView } from './views/account/OrdersView';
import { InvoicesView } from './views/account/InvoicesView';
import { ProfileView } from './views/account/ProfileView';
import { AddressBookView } from './views/account/AddressBookView';
import { WishlistView } from './views/account/WishlistView';
import { ReturnsView } from './views/account/ReturnsView';
import { LoyaltyRewardsView } from './views/account/LoyaltyRewardsView';
import { SupportView } from './views/account/SupportView';
import { TermsConditionsView } from './views/TermsConditionsView';
import { PrivacyPolicyView } from './views/PrivacyPolicyView';
import { FaqView } from './views/FaqView';
import { ReturnsExchangesPolicyView } from './views/ReturnsExchangesPolicyView';
import { ReturnsExchangesView } from './views/ReturnsExchangesView';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<ViewRoute>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0]);
  const [selectedArticle, setSelectedArticle] = useState<Article>(ARTICLES[0]);
  const [initialCategory, setInitialCategory] = useState<string>('All Creations');

  // Initial cart with 2 masterpieces reserved matching the Stitch export
  const [cart, setCart] = useState<CartItem[]>([
    {
      product: PRODUCTS[0], // Palazzo Tote
      quantity: 1,
      selectedShade: 'Terracotta Toscano',
      selectedSize: 'Grand Format (38cm)',
    },
    {
      product: PRODUCTS[1], // Sforza Trench
      quantity: 1,
      selectedShade: 'Nero Profondo',
      selectedSize: 'IT 48 / Medium',
    },
  ]);

  // Wishlist state
  const [wishlist, setWishlist] = useState<Product[]>([PRODUCTS[2], PRODUCTS[3]]);

  // Modals & Drawers
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [wishlistDrawerOpen, setWishlistDrawerOpen] = useState(false);
  const [cartSheetOpen, setCartSheetOpen] = useState(false);
  const [salonModalOpen, setSalonModalOpen] = useState(false);
  const [salonProductName, setSalonProductName] = useState<string | undefined>(undefined);

  // Luxury Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleNavigate = (route: ViewRoute, param?: string) => {
    if (param && route === 'shop') {
      setInitialCategory(param);
    }
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentRoute('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectArticle = (article: Article) => {
    setSelectedArticle(article);
    setCurrentRoute('article');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (
    product: Product,
    shade: string = product.shades[0]?.name || 'Standard',
    size: string = product.sizes[0]?.label || 'Standard'
  ) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id && item.selectedShade === shade && item.selectedSize === size
      );
      if (existing) {
        return prev.map((item) =>
          item === existing ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1, selectedShade: shade, selectedSize: size }];
    });
    showToast(`Allocated "${product.name}" to your CYOF bag`);
    setCartSheetOpen(true);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Creation removed from your shopping bag');
  };

  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        showToast(`Removed "${product.name}" from wishlist`);
        return prev.filter((p) => p.id !== product.id);
      } else {
        showToast(`Preserved "${product.name}" to private wishlist`);
        return [...prev, product];
      }
    });
  };

  const isWishlisted = (productId: string) => {
    return wishlist.some((p) => p.id === productId);
  };

  const handleOpenSalonModal = (productName?: string) => {
    setSalonProductName(productName);
    setSalonModalOpen(true);
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <PatronProvider>
      <div className="min-h-screen flex flex-col bg-[#F8F5F0] text-[#1c1c19] selection:bg-[#ffdbcd] selection:text-[#351000] antialiased">
      {/* Luxury Toast Notification */}
      {toastMessage && (
        <div className="fixed top-28 right-4 sm:right-8 z-50 transform transition-all duration-300 ease-out bg-[#FFFFFF] text-[#111111] px-5 py-3.5 shadow-2xl flex items-center gap-3 border border-[#E9DFD2] animate-in slide-in-from-top-4">
          <span className="material-symbols-outlined text-[18px] text-[#B94700]">verified</span>
          <span className="font-['Manrope'] text-xs font-medium tracking-wide">{toastMessage}</span>
        </div>
      )}

      {/* Global Responsive Navigation Header */}
      <Header
        currentRoute={currentRoute}
        onNavigate={handleNavigate}
        cartCount={totalCartCount}
        wishlistCount={wishlist.length}
        onOpenSearch={() => setSearchModalOpen(true)}
        onOpenWishlist={() => setWishlistDrawerOpen(true)}
        onOpenCart={() => setCartSheetOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1 w-full pt-[84px] lg:pt-[124px] flex flex-col">
        {currentRoute === 'home' && (
          <HomeView
            onNavigate={handleNavigate}
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            isWishlisted={isWishlisted}
          />
        )}

        {currentRoute === 'shop' && (
          <ShopView
            initialCategory={initialCategory}
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            isWishlisted={isWishlisted}
            onNavigate={handleNavigate}
          />
        )}

        {currentRoute === 'product' && (
          <ProductDetailView
            product={selectedProduct}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            isWishlisted={isWishlisted}
            onNavigate={handleNavigate}
            onOpenSalonModal={handleOpenSalonModal}
          />
        )}

        {currentRoute === 'cart' && (
          <CartView
            cart={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveFromCart}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
            onNavigate={handleNavigate}
          />
        )}

        {currentRoute === 'checkout' && (
          <CheckoutView
            cart={cart}
            onNavigate={handleNavigate}
            onClearCart={() => setCart([])}
          />
        )}

        {currentRoute === 'journal' && (
          <JournalView
            onNavigate={handleNavigate}
            onSelectArticle={handleSelectArticle}
            onAddToCart={handleAddToCart}
          />
        )}

        {currentRoute === 'article' && (
          <ArticleDetailView
            article={selectedArticle}
            onNavigate={handleNavigate}
            onAddToCart={handleAddToCart}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentRoute === 'account' && (
          <AccountView
            onNavigate={handleNavigate}
            onOpenSalonModal={handleOpenSalonModal}
            wishlist={wishlist}
          />
        )}

        {currentRoute === 'account-orders' && (
          <OrdersView
            onNavigate={handleNavigate}
            onOpenSalonModal={handleOpenSalonModal}
            onAddToCart={handleAddToCart}
          />
        )}

        {currentRoute === 'account-invoices' && (
          <InvoicesView
            onNavigate={handleNavigate}
            onOpenSalonModal={handleOpenSalonModal}
          />
        )}

        {currentRoute === 'account-profile' && (
          <ProfileView
            onNavigate={handleNavigate}
            onOpenSalonModal={handleOpenSalonModal}
          />
        )}

        {currentRoute === 'account-addresses' && (
          <AddressBookView
            onNavigate={handleNavigate}
            onOpenSalonModal={handleOpenSalonModal}
          />
        )}

        {currentRoute === 'wishlist' && (
          <WishlistView
            onNavigate={handleNavigate}
            onOpenSalonModal={handleOpenSalonModal}
            wishlist={wishlist}
            onRemoveFromWishlist={(id) => {
              const item = PRODUCTS.find((p) => p.id === id);
              if (item) handleToggleWishlist(item);
            }}
            onAddToCart={handleAddToCart}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentRoute === 'account-returns' && (
          <ReturnsView
            onNavigate={handleNavigate}
            onOpenSalonModal={handleOpenSalonModal}
          />
        )}

        {currentRoute === 'account-loyalty' && (
          <LoyaltyRewardsView
            onNavigate={handleNavigate}
            onOpenSalonModal={handleOpenSalonModal}
          />
        )}

        {currentRoute === 'account-support' && (
          <SupportView
            onNavigate={handleNavigate}
            onOpenSalonModal={handleOpenSalonModal}
          />
        )}

        {currentRoute === 'terms-conditions' && (
          <TermsConditionsView onNavigate={handleNavigate} />
        )}

        {currentRoute === 'privacy-policy' && (
          <PrivacyPolicyView onNavigate={handleNavigate} />
        )}

        {currentRoute === 'returns-exchanges-policy' && (
          <ReturnsExchangesPolicyView onNavigate={handleNavigate} />
        )}

        {currentRoute === 'returns-exchanges' && (
          <ReturnsExchangesView onNavigate={handleNavigate} />
        )}

        {currentRoute === 'faq' && (
          <FaqView onNavigate={handleNavigate} />
        )}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Interactive Global Modals */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectProduct={handleSelectProduct}
        onNavigate={handleNavigate}
      />

      <WishlistDrawer
        isOpen={wishlistDrawerOpen}
        onClose={() => setWishlistDrawerOpen(false)}
        wishlist={wishlist}
        onRemoveFromWishlist={(id) => {
          const item = PRODUCTS.find((p) => p.id === id);
          if (item) handleToggleWishlist(item);
        }}
        onAddToCart={(p) => handleAddToCart(p)}
        onSelectProduct={handleSelectProduct}
      />

      <SalonModal
        isOpen={salonModalOpen}
        onClose={() => setSalonModalOpen(false)}
        productName={salonProductName}
      />

      <CartSheetDrawer
        isOpen={cartSheetOpen}
        onClose={() => setCartSheetOpen(false)}
        cart={cart}
        onRemoveItem={handleRemoveFromCart}
        onNavigate={handleNavigate}
      />
      </div>
    </PatronProvider>
  );
}
