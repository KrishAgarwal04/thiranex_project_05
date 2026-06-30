export interface Review {
  user: string;
  rating: number;
  text: string;
  date: string;
  helpful: number;
}

export interface Specifications {
  [key: string]: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  subcategory: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviewCount: number;
  images: string[];
  colors: string[];
  sizes?: string[];
  tags: string[];
  badge: null | 'Best Seller' | 'New' | 'Sale' | 'Trending';
  inStock: boolean;
  stockCount: number;
  description: string;
  features: string[];
  specifications: Specifications;
  reviews: Review[];
  relatedIds: string[];
  isFeatured: boolean;
  isNew: boolean;
  isTrending: boolean;
  shipping: 'free' | 'standard' | 'express';
  returnPolicy: string;
  warranty: string;
}

export interface CartItem {
  id: string;
  qty: number;
  size?: string;
  color?: string;
}

export interface OrderItem extends CartItem {
  name: string;
  price: number;
  image: string;
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  address: {
    fullName: string;
    email: string;
    phone: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    pincode: string;
  };
  paymentMethod: string;
  status: 'Confirmed' | 'Processing' | 'Shipped' | 'Delivered';
}

export interface FilterState {
  priceRange: [number, number];
  brands: string[];
  ratings: number;
  inStock: boolean;
  onSale: boolean;
}

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
}
