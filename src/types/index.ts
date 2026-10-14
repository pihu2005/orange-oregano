export type Category = 'all' | 'women' | 'men' | 'accessories';

export interface Product {
  id: string;
  name: string;
  category: 'women' | 'men' | 'accessories';
  subtitle: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  tag?: string;
  craftPillar: string; // e.g. "Hand-spun Khadi", "Chanderi Weave", "Goa Raw Linen"
  description: string;
  details: string[];
  fabric: string;
  origin: string; // e.g. "Candolim Studio, Goa"
  images: string[];
  sizes: string[];
  colors: { name: string; hex: string }[];
  inStock: boolean;
  featured?: boolean;
  createdAt?: string;
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  selectedColor: { name: string; hex: string };
  quantity: number;
}

export type UserRole = 'guest' | 'buyer' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: UserRole;
  shippingAddress?: {
    street: string;
    city: string;
    pincode: string;
    state?: string;
  };
  wishlist?: string[]; // Product IDs
}

export type OrderStatus = 'placed' | 'crafting' | 'dispatched' | 'delivered';

export interface Order {
  id: string;
  userId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: {
    street: string;
    city: string;
    pincode: string;
  };
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  paymentMethod: 'upi' | 'card' | 'cod';
  status: OrderStatus;
  trackingNumber: string;
  createdAt: string;
  estimatedDelivery: string;
}
