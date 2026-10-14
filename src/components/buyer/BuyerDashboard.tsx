import React, { useState } from 'react';
import { X, Package, Heart, MapPin, LogOut, ShoppingBag, Truck, Check, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useOrders } from '../../context/OrderContext';
import { useProducts } from '../../context/ProductContext';
import { Product } from '../../types';

interface BuyerDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenTracker: (orderId: string) => void;
  onAddToCart: (product: Product, size: string, color: { name: string; hex: string }) => void;
}

export const BuyerDashboard: React.FC<BuyerDashboardProps> = ({
  isOpen,
  onClose,
  onOpenTracker,
  onAddToCart,
}) => {
  const { currentUser, logout, wishlist, toggleWishlist, updateProfile } = useAuth();
  const { orders } = useOrders();
  const { products } = useProducts();

  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'profile'>('orders');

  // Profile edit states
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [street, setStreet] = useState(currentUser?.shippingAddress?.street || 'Marquis Vaddo');
  const [city, setCity] = useState(currentUser?.shippingAddress?.city || 'Candolim');
  const [pincode, setPincode] = useState(currentUser?.shippingAddress?.pincode || '403515');
  const [savedToast, setSavedToast] = useState(false);

  if (!isOpen || !currentUser) return null;

  // Filter orders for this user (or show sample orders if none)
  const userOrders = orders.filter(
    (o) => o.userId === currentUser.id || o.customerEmail === currentUser.email
  );

  // Filter wishlist products
  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      phone,
      shippingAddress: { street, city, pincode },
    });
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div 
        className="relative bg-[#FFFDF9] rounded-3xl max-w-3xl w-full p-6 sm:p-8 border-2 border-[#763c00] canva-box-shadow shadow-2xl max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#f9f7dc] text-[#763c00] hover:bg-[#ef8535] hover:text-[#f9f7dc] transition-colors border border-[#763c00]/20"
        >
          <X size={18} />
        </button>

        {/* Member Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-[#ef8535]/20 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-extrabold tracking-widest text-[#ef8535]">
                Patron Account
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#ef8535]/15 text-[#763c00] text-[10px] font-bold">
                Candolim Circle
              </span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl text-[#763c00] mt-1">
              Welcome, {currentUser.name}
            </h2>
            <p className="text-xs text-[#554030]">{currentUser.email}</p>
          </div>

          <button
            onClick={() => {
              logout();
              onClose();
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 transition-colors"
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Dashboard Tabs */}
        <div className="flex border-b border-[#ef8535]/20 my-4 text-xs font-bold uppercase tracking-wider">
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-3 px-4 border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'orders'
                ? 'border-[#ef8535] text-[#ef8535]'
                : 'border-transparent text-gray-500 hover:text-[#763c00]'
            }`}
          >
            <Package size={16} />
            <span>My Orders ({userOrders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('wishlist')}
            className={`py-3 px-4 border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'wishlist'
                ? 'border-[#ef8535] text-[#ef8535]'
                : 'border-transparent text-gray-500 hover:text-[#763c00]'
            }`}
          >
            <Heart size={16} />
            <span>Liked Pieces ({wishlistedProducts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`py-3 px-4 border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'profile'
                ? 'border-[#ef8535] text-[#ef8535]'
                : 'border-transparent text-gray-500 hover:text-[#763c00]'
            }`}
          >
            <MapPin size={16} />
            <span>Saved Address</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto pr-1">
          
          {/* TAB 1: MY ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              {userOrders.length === 0 ? (
                <div className="text-center py-12 text-[#763c00]">
                  <Package size={36} className="mx-auto text-[#ef8535] mb-2" />
                  <h3 className="font-display text-lg">No orders placed yet</h3>
                  <p className="text-xs text-[#554030] mt-1">
                    Explore our handcrafted resort linens and Chanderi silks from Goa.
                  </p>
                </div>
              ) : (
                userOrders.map((ord) => (
                  <div
                    key={ord.id}
                    className="p-4 bg-white rounded-2xl border border-[#ef8535]/25 canva-box-shadow flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#763c00]">{ord.id}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          ord.status === 'delivered' ? 'bg-green-100 text-green-800' :
                          ord.status === 'dispatched' ? 'bg-blue-100 text-blue-800' :
                          ord.status === 'crafting' ? 'bg-amber-100 text-amber-800' :
                          'bg-orange-100 text-orange-800'
                        }`}>
                          {ord.status === 'crafting' ? 'Crafting in Atelier' : ord.status}
                        </span>
                      </div>

                      <div className="text-xs text-[#554030] mt-2 space-y-0.5">
                        <p>{ord.items.map((i) => `${i.product.name} (${i.selectedSize})`).join(', ')}</p>
                        <p className="text-[11px] text-gray-500">
                          Total: <strong className="text-[#763c00]">₹{ord.total.toLocaleString('en-IN')}</strong> • Estimated: {ord.estimatedDelivery}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => onOpenTracker(ord.id)}
                      className="px-4 py-2 bg-[#f9f7dc] text-[#763c00] border border-[#763c00] rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-[#ef8535] hover:text-[#f9f7dc] transition-colors self-start sm:self-auto"
                    >
                      <Truck size={14} />
                      <span>Track Package</span>
                    </button>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 2: LIKED ITEMS */}
          {activeTab === 'wishlist' && (
            <div>
              {wishlistedProducts.length === 0 ? (
                <div className="text-center py-12 text-[#763c00]">
                  <Heart size={36} className="mx-auto text-[#ef8535] mb-2" />
                  <h3 className="font-display text-lg">No saved favorites yet</h3>
                  <p className="text-xs text-[#554030] mt-1">
                    Click the heart icon on any garment to save it for your next coastal getaway.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {wishlistedProducts.map((p) => (
                    <div
                      key={p.id}
                      className="p-3 bg-white rounded-2xl border border-[#ef8535]/20 flex gap-3 shadow-xs"
                    >
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        className="w-20 h-24 object-cover rounded-xl bg-[#f4ede2]"
                      />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h4 className="font-display text-sm text-[#763c00] font-bold line-clamp-1">
                              {p.name}
                            </h4>
                            <button
                              onClick={() => toggleWishlist(p.id)}
                              className="text-[#ef8535] hover:text-red-500 transition-colors"
                              title="Remove from favorites"
                            >
                              <Heart size={16} fill="currentColor" />
                            </button>
                          </div>
                          <p className="text-xs font-bold text-[#ef8535] mt-1">
                            ₹{p.price.toLocaleString('en-IN')}
                          </p>
                          <span className="text-[10px] text-gray-500 block">
                            {p.craftPillar}
                          </span>
                        </div>

                        <button
                          onClick={() => onAddToCart(p, p.sizes[0], p.colors[0])}
                          className="mt-2 py-1.5 px-3 bg-[#ef8535] text-[#f9f7dc] rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-[#d97123] flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <ShoppingBag size={12} />
                          <span>Move to Bag</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: SHIPPING ADDRESS */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSaveProfile} className="space-y-4 max-w-md">
              {savedToast && (
                <div className="p-2.5 bg-green-50 text-green-700 text-xs rounded-xl border border-green-200 font-medium flex items-center gap-1.5">
                  <Check size={14} />
                  <span>Profile updated successfully!</span>
                </div>
              )}

              <div>
                <label className="block text-[11px] font-bold text-[#763c00] uppercase mb-1">
                  Contact Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="09823610024"
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#ef8535]/30 focus:outline-none focus:border-[#ef8535]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#763c00] uppercase mb-1">
                  Default Street Address
                </label>
                <input
                  type="text"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  placeholder="House no, Street name"
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#ef8535]/30 focus:outline-none focus:border-[#ef8535]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#763c00] uppercase mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Candolim / Mumbai"
                    className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#ef8535]/30 focus:outline-none focus:border-[#ef8535]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#763c00] uppercase mb-1">
                    Pincode
                  </label>
                  <input
                    type="text"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="403515"
                    className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#ef8535]/30 focus:outline-none focus:border-[#ef8535]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="py-3 px-6 bg-[#ef8535] text-[#f9f7dc] font-bold text-xs uppercase tracking-wider rounded-xl canva-box-shadow canva-box-shadow-hover flex items-center gap-1.5"
              >
                <Sparkles size={14} />
                <span>Save Default Address</span>
              </button>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};
