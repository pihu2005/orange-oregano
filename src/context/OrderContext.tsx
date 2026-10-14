import React, { createContext, useContext, useState, useEffect } from 'react';
import { Order, OrderStatus, CartItem } from '../types';

interface CreateOrderInput {
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
}

interface OrderContextType {
  orders: Order[];
  createOrder: (input: CreateOrderInput) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  getOrdersByUserId: (userId: string) => Order[];
  getOrderById: (orderId: string) => Order | undefined;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

const STORAGE_KEY = 'orange_oregano_orders';

// Initial sample order for demonstration
const SAMPLE_ORDERS: Order[] = [
  {
    id: 'OO-GOA-782910',
    userId: 'user-sample',
    customerName: 'Ananya Deshmukh',
    customerEmail: 'ananya.d@example.com',
    customerPhone: '09823610024',
    shippingAddress: {
      street: 'Villa 12, Aguada Road',
      city: 'Candolim',
      pincode: '403515'
    },
    items: [
      {
        product: {
          id: 'oo-w-01',
          name: 'Candolim Sunset Terracotta Co-ord Set',
          category: 'women',
          subtitle: 'Relaxed cropped tunic with wide-leg culottes',
          price: 4850,
          rating: 4.9,
          reviewCount: 38,
          craftPillar: 'Hand-spun Khadi Linen',
          description: '',
          details: [],
          fabric: 'Hand-spun Khadi Linen',
          origin: 'Candolim Studio, Goa',
          images: [
            'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&w=800&q=80'
          ],
          sizes: ['M'],
          colors: [{ name: 'Terracotta Orange', hex: '#ef8535' }],
          inStock: true
        },
        selectedSize: 'M',
        selectedColor: { name: 'Terracotta Orange', hex: '#ef8535' },
        quantity: 1
      }
    ],
    subtotal: 4850,
    discount: 485,
    shipping: 0,
    total: 4365,
    paymentMethod: 'upi',
    status: 'crafting',
    trackingNumber: 'DELHIVERY-GOA-98214',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    estimatedDelivery: 'In 2 Days (Candolim Atelier Handcraft)'
  }
];

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return SAMPLE_ORDERS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  const createOrder = (input: CreateOrderInput): Order => {
    const orderId = `OO-GOA-${Math.floor(100000 + Math.random() * 900000)}`;
    const trackingNumber = `DELHIVERY-GOA-${Math.floor(10000 + Math.random() * 90000)}`;
    
    const newOrder: Order = {
      ...input,
      id: orderId,
      status: 'placed',
      trackingNumber,
      createdAt: new Date().toISOString(),
      estimatedDelivery: '3 to 5 business days'
    };

    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === orderId ? { ...order, status } : order))
    );
  };

  const getOrdersByUserId = (userId: string) => {
    return orders.filter((o) => o.userId === userId);
  };

  const getOrderById = (orderId: string) => {
    return orders.find(
      (o) => o.id.toLowerCase() === orderId.trim().toLowerCase()
    );
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        createOrder,
        updateOrderStatus,
        getOrdersByUserId,
        getOrderById,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error('useOrders must be used within an OrderProvider');
  return context;
};
