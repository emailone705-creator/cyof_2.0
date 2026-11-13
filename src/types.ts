export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  price: number;
  image: string;
  images: string[];
  badges?: string[];
  description: string;
  shades: { name: string; color: string }[];
  sizes: { label: string; dimensions: string }[];
  inStockCount?: number;
  flagshipLocation?: string;
  specs?: { label: string; value: string }[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedShade: string;
  selectedSize: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  author: string;
  photographer?: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  issue: string;
  excerpt: string;
  featuredProducts?: Product[];
}

export type ViewRoute = 
  | 'home'
  | 'shop'
  | 'product'
  | 'cart'
  | 'checkout'
  | 'journal'
  | 'article'
  | 'wishlist'
  | 'account'
  | 'account-orders'
  | 'account-invoices'
  | 'account-profile'
  | 'account-addresses'
  | 'account-returns'
  | 'account-loyalty'
  | 'account-support'
  | 'terms-conditions'
  | 'privacy-policy'
  | 'returns-exchanges-policy'
  | 'returns-exchanges'
  | 'shipping-handover-policy'
  | 'about-us'
  | 'faq'
  | 'order-confirmed';
