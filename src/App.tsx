import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ProductProvider, useProducts } from './context/ProductContext';
import { OrderProvider } from './context/OrderContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BrandStory } from './components/BrandStory';
import { Categories } from './components/Categories';
import { ProductGrid } from './components/ProductGrid';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { GoaStudio } from './components/GoaStudio';
import { Lookbook } from './components/Lookbook';
import { CheckoutModal } from './components/CheckoutModal';
import { Footer } from './components/Footer';
import { AuthModal } from './components/auth/AuthModal';
import { BuyerDashboard } from './components/buyer/BuyerDashboard';
import { OrderTrackerModal } from './components/buyer/OrderTrackerModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { Product, CartItem, Category } from './types';

const AppContent: React.FC = () => {
  const { products } = useProducts();
  const { role, wishlist, toggleWishlist } = useAuth();

  // Cart state persisted to localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('orange_oregano_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  // Modals & View States
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isBuyerDashboardOpen, setIsBuyerDashboardOpen] = useState(false);
  const [isOrderTrackerOpen, setIsOrderTrackerOpen] = useState(false);
  const [trackingOrderId, setTrackingOrderId] = useState('');
  const [isAdminView, setIsAdminView] = useState(false);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('orange_oregano_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Total cart item quantity
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Add to cart handler
  const handleAddToCart = (
    product: Product,
    selectedSize: string,
    selectedColor: { name: string; hex: string },
    quantity = 1
  ) => {
    if (product.inStock === false) return; // Disallow sold out items
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === selectedSize &&
          item.selectedColor.name === selectedColor.name
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prevCart, { product, selectedSize, selectedColor, quantity }];
      }
    });
  };

  // Instant Buy Now flow
  const handleBuyNow = (
    product: Product,
    selectedSize: string,
    selectedColor: { name: string; hex: string }
  ) => {
    if (product.inStock === false) return;
    handleAddToCart(product, selectedSize, selectedColor, 1);
    setSelectedProduct(null);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  // Update item quantity
  const handleUpdateQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(index);
      return;
    }
    setCart((prev) => {
      const updated = [...prev];
      updated[index].quantity = newQty;
      return updated;
    });
  };

  // Remove item
  const handleRemoveItem = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  // Scroll to catalog from Hero
  const handleShopNow = () => {
    setActiveCategory('all');
    const catalogEl = document.getElementById('catalog');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Start checkout from cart drawer
  const handleProceedToCheckout = (discount: number) => {
    setAppliedDiscount(discount);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  // Order completed
  const handleOrderComplete = () => {
    setCart([]);
    setAppliedDiscount(0);
  };

  // Open direct tracking
  const handleOpenTrackingWithId = (id: string) => {
    setTrackingOrderId(id);
    setIsOrderTrackerOpen(true);
  };

  // If Admin View is active, render full Admin Portal
  if (isAdminView) {
    return (
      <AdminDashboard onBackToStore={() => setIsAdminView(false)} />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF9]">
      
      {/* Top Banner */}
      <AnnouncementBar />

      {/* Main Navigation */}
      <Navbar
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenBuyerDashboard={() => setIsBuyerDashboardOpen(true)}
        onOpenOrderTracker={() => {
          setTrackingOrderId('');
          setIsOrderTrackerOpen(true);
        }}
        onOpenAdmin={() => {
          if (role === 'admin') {
            setIsAdminView(true);
          } else {
            setIsAuthModalOpen(true);
          }
        }}
      />

      {/* Main Customer Storefront */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero onShopNow={handleShopNow} />

        {/* Brand Manifesto & Pillars ("More Than Fashion") */}
        <BrandStory />

        {/* Categories Section ("Shop the Collection": Women, Men, Accessories) */}
        <Categories onSelectCategory={setActiveCategory} />

        {/* Interactive Filterable Catalog (Connected to mutable ProductContext) */}
        <ProductGrid
          products={products}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          searchQuery={searchQuery}
          onClearSearch={() => setSearchQuery('')}
          onQuickView={(prod) => setSelectedProduct(prod)}
          onAddToCart={(prod, size, col) => handleAddToCart(prod, size, col, 1)}
          wishlist={wishlist}
          onToggleWishlist={toggleWishlist}
        />

        {/* Candolim, Goa Studio Experience */}
        <GoaStudio />

        {/* Editorial Lookbook & Instagram Showcase */}
        <Lookbook />
      </main>

      {/* Footer */}
      <Footer />

      {/* MODALS */}

      {/* Quick View Product Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        isWishlisted={selectedProduct ? wishlist.includes(selectedProduct.id) : false}
        onToggleWishlist={toggleWishlist}
      />

      {/* Slide-out Shopping Bag Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleProceedToCheckout}
      />

      {/* Express Checkout Modal with Confetti & Order Persistence */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        appliedDiscount={appliedDiscount}
        onOrderComplete={handleOrderComplete}
        onTrackOrderDirectly={handleOpenTrackingWithId}
      />

      {/* Auth Modal (Buyer Login/Signup & Admin Passkey) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccessRole={(targetRole) => {
          if (targetRole === 'admin') {
            setIsAdminView(true);
          } else if (targetRole === 'buyer') {
            setIsBuyerDashboardOpen(true);
          }
        }}
      />

      {/* Registered Buyer Dashboard (Orders, Liked Items, Address) */}
      <BuyerDashboard
        isOpen={isBuyerDashboardOpen}
        onClose={() => setIsBuyerDashboardOpen(false)}
        onOpenTracker={(id) => {
          setTrackingOrderId(id);
          setIsOrderTrackerOpen(true);
        }}
        onAddToCart={(prod, size, col) => handleAddToCart(prod, size, col, 1)}
      />

      {/* Order Tracker Modal (For both Guests & Registered Buyers) */}
      <OrderTrackerModal
        isOpen={isOrderTrackerOpen}
        onClose={() => setIsOrderTrackerOpen(false)}
        initialOrderId={trackingOrderId}
      />

    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <ProductProvider>
        <OrderProvider>
          <AppContent />
        </OrderProvider>
      </ProductProvider>
    </AuthProvider>
  );
};

export default App;
