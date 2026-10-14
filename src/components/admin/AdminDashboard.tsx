import React, { useState } from 'react';
import { 
  Plus, Edit, Trash2, Package, IndianRupee, AlertCircle, 
  Check, RefreshCw, Image as ImageIcon, ArrowLeft, 
  Search, Truck 
} from 'lucide-react';
import { useProducts } from '../../context/ProductContext';
import { useOrders } from '../../context/OrderContext';
import { useAuth } from '../../context/AuthContext';
import { Product, Category, OrderStatus } from '../../types';

interface AdminDashboardProps {
  onBackToStore: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToStore }) => {
  const { products, addProduct, updateProduct, deleteProduct, toggleStock, resetCatalog } = useProducts();
  const { orders, updateOrderStatus } = useOrders();
  const { logout } = useAuth();

  const [activeTab, setActiveTab] = useState<'inventory' | 'orders'>('inventory');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');

  // Modal states for Add / Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [category, setCategory] = useState<'women' | 'men' | 'accessories'>('women');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number>(3500);
  const [originalPrice, setOriginalPrice] = useState<number | undefined>(4200);
  const [craftPillar, setCraftPillar] = useState('Handcrafted in Goa');
  const [fabric, setFabric] = useState('Pure Handloom Linen');
  const [origin, setOrigin] = useState('Candolim Studio, Goa');
  const [detailsText, setDetailsText] = useState('100% Breathable artisanal fabric\nZero-waste pattern design\nSoftened with coconut enzyme wash');
  const [imageUrl, setImageUrl] = useState('');
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>(['XS', 'S', 'M', 'L', 'XL']);
  const [colorName, setColorName] = useState('Terracotta Orange');
  const [colorHex, setColorHex] = useState('#ef8535');
  const [inStock, setInStock] = useState(true);
  const [featured, setFeatured] = useState(false);

  // Metrics calculation
  const totalProducts = products.length;
  const outOfStockCount = products.filter((p) => !p.inStock).length;
  const totalOrdersCount = orders.length;
  const totalRevenue = orders.reduce((sum, ord) => sum + ord.total, 0);

  // Filtered products for admin table
  const filteredProducts = products.filter((p) => {
    if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.craftPillar.toLowerCase().includes(q) ||
        p.origin.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Open modal for NEW product
  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setName('');
    setCategory('women');
    setSubtitle('Vacation relaxed silhouette handcrafted in Candolim');
    setDescription('Handcrafted from fine handloom cotton linen with delicate artisanal finishing. Designed for sun-drenched days in Goa.');
    setPrice(3950);
    setOriginalPrice(4800);
    setCraftPillar('Candolim Studio Handloom');
    setFabric('Pure Hand-spun Linen');
    setOrigin('Candolim Studio, Goa');
    setDetailsText('100% Pure breathable linen\nHand-cut and assembled by master craftsmen\nNaturally softened');
    setImageUrl('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80');
    setUploadedImages([]);
    setSelectedSizes(['XS', 'S', 'M', 'L', 'XL']);
    setColorName('Terracotta Orange');
    setColorHex('#ef8535');
    setInStock(true);
    setFeatured(true);
    setIsModalOpen(true);
  };

  // Open modal for EDITING product
  const handleOpenEditModal = (prod: Product) => {
    setEditingProduct(prod);
    setName(prod.name);
    setCategory(prod.category);
    setSubtitle(prod.subtitle);
    setDescription(prod.description);
    setPrice(prod.price);
    setOriginalPrice(prod.originalPrice);
    setCraftPillar(prod.craftPillar);
    setFabric(prod.fabric);
    setOrigin(prod.origin);
    setDetailsText(prod.details.join('\n'));
    setImageUrl(prod.images[0] || '');
    setUploadedImages(prod.images);
    setSelectedSizes(prod.sizes);
    setColorName(prod.colors[0]?.name || 'Terracotta Orange');
    setColorHex(prod.colors[0]?.hex || '#ef8535');
    setInStock(prod.inStock);
    setFeatured(prod.featured || false);
    setIsModalOpen(true);
  };

  // Handle local file upload (converts photo to Base64 data URL)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setUploadedImages((prev) => [base64String, ...prev]);
        setImageUrl(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit Add / Edit
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const finalImages = uploadedImages.length > 0 ? uploadedImages : [imageUrl];
    const details = detailsText.split('\n').filter((l) => l.trim().length > 0);

    const productPayload = {
      name,
      category,
      subtitle,
      description,
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : undefined,
      craftPillar,
      fabric,
      origin,
      details,
      images: finalImages,
      sizes: selectedSizes,
      colors: [{ name: colorName, hex: colorHex }],
      inStock,
      featured,
      rating: editingProduct?.rating || 5.0,
      reviewCount: editingProduct?.reviewCount || 1,
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, productPayload);
    } else {
      addProduct(productPayload);
    }

    setIsModalOpen(false);
  };

  const allAvailableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Free Size (XS-XL)', 'One Size'];

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  return (
    <div className="min-h-screen bg-[#f4ede2] text-[#2c2724]">
      
      {/* Top Admin Bar */}
      <header className="sticky top-0 z-30 bg-[#FFFDF9] border-b-2 border-[#763c00] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          <div className="flex items-center gap-4">
            <button
              onClick={onBackToStore}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#f9f7dc] text-[#763c00] border border-[#763c00]/30 font-bold text-xs uppercase hover:bg-[#ef8535] hover:text-[#f9f7dc] transition-all"
            >
              <ArrowLeft size={14} />
              <span>Customer Store</span>
            </button>

            <div>
              <h1 className="font-display text-lg sm:text-xl text-[#763c00] font-bold flex items-center gap-2">
                <span>Orange Oregano</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#ef8535] text-[#f9f7dc] uppercase font-sans tracking-widest font-extrabold">
                  Atelier Admin
                </span>
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (window.confirm('Reset catalog back to sample items?')) {
                  resetCatalog();
                }
              }}
              className="hidden sm:flex items-center gap-1 text-[11px] font-semibold text-[#763c00]/70 hover:text-red-700 p-1"
              title="Reset to default items"
            >
              <RefreshCw size={12} />
              <span>Reset Catalog</span>
            </button>

            <button
              onClick={() => {
                logout();
                onBackToStore();
              }}
              className="px-3 py-1.5 rounded-xl text-xs font-bold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 transition-colors"
            >
              Log Out
            </button>
          </div>

        </div>
      </header>

      {/* Main Admin Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Metric Cards Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#FFFDF9] p-5 rounded-2xl border border-[#ef8535]/25 canva-box-shadow">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
              Total Catalog Items
            </span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="font-display text-3xl text-[#763c00]">{totalProducts}</span>
              <Package size={20} className="text-[#ef8535]" />
            </div>
            <span className="text-[10px] text-green-700 font-semibold mt-1 block">
              Active in storefront
            </span>
          </div>

          <div className="bg-[#FFFDF9] p-5 rounded-2xl border border-[#ef8535]/25 canva-box-shadow">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
              Out of Stock Items
            </span>
            <div className="flex items-baseline justify-between mt-2">
              <span className={`font-display text-3xl ${outOfStockCount > 0 ? 'text-amber-600' : 'text-gray-700'}`}>
                {outOfStockCount}
              </span>
              <AlertCircle size={20} className={outOfStockCount > 0 ? 'text-amber-500' : 'text-gray-400'} />
            </div>
            <span className="text-[10px] text-gray-500 mt-1 block">
              Marked "Sold Out" on website
            </span>
          </div>

          <div className="bg-[#FFFDF9] p-5 rounded-2xl border border-[#ef8535]/25 canva-box-shadow">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
              Orders Received
            </span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="font-display text-3xl text-[#763c00]">{totalOrdersCount}</span>
              <Truck size={20} className="text-[#ef8535]" />
            </div>
            <span className="text-[10px] text-gray-500 mt-1 block">
              Guests & Registered Buyers
            </span>
          </div>

          <div className="bg-[#FFFDF9] p-5 rounded-2xl border border-[#ef8535]/25 canva-box-shadow">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
              Total Revenue
            </span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="font-display text-2xl sm:text-3xl text-[#763c00]">
                ₹{totalRevenue.toLocaleString('en-IN')}
              </span>
              <IndianRupee size={20} className="text-[#ef8535]" />
            </div>
            <span className="text-[10px] text-green-700 font-semibold mt-1 block">
              Gross sales in INR
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center justify-between border-b border-[#ef8535]/20 mb-6">
          <div className="flex gap-4 text-xs font-bold uppercase tracking-wider">
            <button
              onClick={() => setActiveTab('inventory')}
              className={`py-3 border-b-2 transition-colors flex items-center gap-2 ${
                activeTab === 'inventory'
                  ? 'border-[#ef8535] text-[#ef8535]'
                  : 'border-transparent text-gray-500 hover:text-[#763c00]'
              }`}
            >
              <Package size={16} />
              <span>Product Inventory ({products.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`py-3 border-b-2 transition-colors flex items-center gap-2 ${
                activeTab === 'orders'
                  ? 'border-[#ef8535] text-[#ef8535]'
                  : 'border-transparent text-gray-500 hover:text-[#763c00]'
              }`}
            >
              <Truck size={16} />
              <span>Customer Orders Fulfillment ({orders.length})</span>
            </button>
          </div>

          {activeTab === 'inventory' && (
            <button
              onClick={handleOpenAddModal}
              className="py-2.5 px-4 bg-[#ef8535] text-[#f9f7dc] rounded-xl font-bold text-xs uppercase tracking-wider canva-box-shadow canva-box-shadow-hover flex items-center gap-1.5"
            >
              <Plus size={16} />
              <span>Add Real Product</span>
            </button>
          )}
        </div>

        {/* TAB 1: PRODUCT INVENTORY */}
        {activeTab === 'inventory' && (
          <div className="space-y-6">
            
            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#FFFDF9] p-4 rounded-2xl border border-[#ef8535]/25 canva-box-shadow">
              
              {/* Category Pills */}
              <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                {(['all', 'women', 'men', 'accessories'] as Category[]).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                      selectedCategory === cat
                        ? 'bg-[#ef8535] text-[#f9f7dc]'
                        : 'bg-[#f4ede2] text-[#763c00] hover:bg-[#ef8535]/20'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search */}
              <div className="relative w-full sm:w-64">
                <Search size={14} className="absolute left-3 top-2.5 text-[#763c00]/50" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-[#f4ede2]/50 border border-[#ef8535]/30 focus:outline-none focus:border-[#ef8535]"
                />
              </div>

            </div>

            {/* Inventory Table */}
            <div className="bg-[#FFFDF9] rounded-2xl border border-[#ef8535]/25 canva-box-shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#f9f7dc] text-[#763c00] uppercase font-bold text-[11px] border-b border-[#ef8535]/20">
                    <tr>
                      <th className="py-3 px-4">Product</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Price (INR)</th>
                      <th className="py-3 px-4">Craft Details</th>
                      <th className="py-3 px-4 text-center">Stock Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#ef8535]/15">
                    {filteredProducts.map((prod) => (
                      <tr key={prod.id} className="hover:bg-[#f9f7dc]/30 transition-colors">
                        
                        {/* Product Image & Name */}
                        <td className="py-3 px-4 flex items-center gap-3">
                          <img
                            src={prod.images[0]}
                            alt={prod.name}
                            className="w-12 h-14 object-cover rounded-lg bg-[#f4ede2] border border-[#ef8535]/20 shrink-0"
                          />
                          <div>
                            <h4 className="font-display text-sm font-bold text-[#763c00]">
                              {prod.name}
                            </h4>
                            <span className="text-[11px] text-gray-500 block line-clamp-1">
                              {prod.subtitle}
                            </span>
                            {prod.featured && (
                              <span className="inline-block mt-0.5 text-[9px] uppercase font-bold text-[#ef8535] bg-[#ef8535]/15 px-1.5 py-0.2 rounded">
                                Featured
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Category */}
                        <td className="py-3 px-4 capitalize font-semibold text-[#554030]">
                          <span className="px-2 py-0.5 rounded-full bg-[#f4ede2] text-[#763c00] text-[10px] uppercase font-bold">
                            {prod.category}
                          </span>
                        </td>

                        {/* Price */}
                        <td className="py-3 px-4">
                          <span className="font-bold text-[#763c00] text-sm">
                            ₹{prod.price.toLocaleString('en-IN')}
                          </span>
                          {prod.originalPrice && (
                            <span className="text-[10px] text-gray-400 line-through block">
                              ₹{prod.originalPrice.toLocaleString('en-IN')}
                            </span>
                          )}
                        </td>

                        {/* Craft Details */}
                        <td className="py-3 px-4 text-[#554030]">
                          <span className="font-semibold block">{prod.craftPillar}</span>
                          <span className="text-[10px] text-gray-500">{prod.origin}</span>
                        </td>

                        {/* Stock Toggle Switch */}
                        <td className="py-3 px-4 text-center">
                          <button
                            onClick={() => toggleStock(prod.id)}
                            className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all border ${
                              prod.inStock
                                ? 'bg-green-100 text-green-800 border-green-300 hover:bg-green-200'
                                : 'bg-red-100 text-red-800 border-red-300 hover:bg-red-200'
                            }`}
                            title="Click to toggle In Stock / Out of Stock"
                          >
                            {prod.inStock ? '● In Stock' : '✕ Out of Stock'}
                          </button>
                        </td>

                        {/* Actions */}
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleOpenEditModal(prod)}
                              className="p-1.5 rounded-lg bg-[#f9f7dc] text-[#763c00] hover:bg-[#ef8535] hover:text-[#f9f7dc] transition-colors"
                              title="Edit Product"
                            >
                              <Edit size={14} />
                            </button>

                            <button
                              onClick={() => {
                                if (window.confirm(`Delete product "${prod.name}"?`)) {
                                  deleteProduct(prod.id);
                                }
                              }}
                              className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-colors"
                              title="Delete Product"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: CUSTOMER ORDERS FULFILLMENT */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {orders.length === 0 ? (
              <div className="text-center py-16 bg-[#FFFDF9] rounded-2xl border border-[#ef8535]/25 canva-box-shadow">
                <Truck size={36} className="mx-auto text-[#ef8535] mb-2" />
                <h3 className="font-display text-lg text-[#763c00]">No customer orders yet</h3>
              </div>
            ) : (
              orders.map((ord) => (
                <div
                  key={ord.id}
                  className="bg-[#FFFDF9] p-6 rounded-2xl border border-[#ef8535]/25 canva-box-shadow space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#ef8535]/15 gap-2">
                    <div>
                      <span className="font-bold text-base text-[#763c00]">{ord.id}</span>
                      <span className="text-xs text-gray-500 ml-2">
                        {new Date(ord.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>

                    {/* Status Changer */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#763c00] uppercase">Status:</span>
                      <select
                        value={ord.status}
                        onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                        className={`text-xs font-bold uppercase rounded-lg px-2.5 py-1.5 border focus:outline-none ${
                          ord.status === 'delivered' ? 'bg-green-100 text-green-800 border-green-300' :
                          ord.status === 'dispatched' ? 'bg-blue-100 text-blue-800 border-blue-300' :
                          ord.status === 'crafting' ? 'bg-amber-100 text-amber-800 border-amber-300' :
                          'bg-orange-100 text-orange-800 border-orange-300'
                        }`}
                      >
                        <option value="placed">Placed (Order Confirmed)</option>
                        <option value="crafting">Crafting in Atelier</option>
                        <option value="dispatched">Dispatched with Courier</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    </div>
                  </div>

                  {/* Customer Info & Destination */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-[#554030]">
                    <div>
                      <span className="font-bold text-[#763c00] block mb-0.5">Recipient Details:</span>
                      <p className="font-semibold">{ord.customerName}</p>
                      <p>{ord.customerEmail}</p>
                      <p>{ord.customerPhone}</p>
                    </div>

                    <div>
                      <span className="font-bold text-[#763c00] block mb-0.5">Delivery Address:</span>
                      <p>{ord.shippingAddress.street}</p>
                      <p>{ord.shippingAddress.city}, {ord.shippingAddress.pincode}</p>
                      <p className="text-[11px] text-[#ef8535] font-semibold mt-0.5">
                        Tracking #: {ord.trackingNumber}
                      </p>
                    </div>

                    <div>
                      <span className="font-bold text-[#763c00] block mb-0.5">Payment Summary:</span>
                      <p>Method: <strong className="uppercase">{ord.paymentMethod}</strong></p>
                      <p>Subtotal: ₹{ord.subtotal.toLocaleString('en-IN')}</p>
                      <p className="font-bold text-sm text-[#763c00] mt-1">
                        Total Paid: ₹{ord.total.toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>

                  {/* Items list */}
                  <div className="pt-2 border-t border-gray-100">
                    <span className="text-[11px] font-bold text-gray-500 uppercase block mb-1.5">
                      Items Ordered:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {ord.items.map((i, idx) => (
                        <div key={idx} className="flex items-center gap-2 p-1.5 pr-3 bg-[#f4ede2]/60 rounded-lg text-xs">
                          <img src={i.product.images[0]} alt="" className="w-8 h-10 object-cover rounded" />
                          <div>
                            <span className="font-bold text-[#763c00]">{i.product.name}</span>
                            <span className="text-[10px] text-gray-600 block">
                              Size {i.selectedSize} • Qty {i.quantity}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              ))
            )}
          </div>
        )}

      </main>

      {/* ADD / EDIT PRODUCT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div 
            className="relative bg-[#FFFDF9] rounded-3xl max-w-2xl w-full p-6 sm:p-8 border-2 border-[#763c00] canva-box-shadow shadow-2xl max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6 pb-3 border-b border-[#ef8535]/20">
              <div>
                <span className="text-[10px] uppercase font-extrabold tracking-widest text-[#ef8535]">
                  Atelier Catalog Management
                </span>
                <h3 className="font-display text-2xl text-[#763c00]">
                  {editingProduct ? 'Edit Boutique Product' : 'Add New Real Product'}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-[#ef8535]/20 text-[#763c00]"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              
              {/* Product Photo Upload / Input */}
              <div className="p-4 bg-[#f9f7dc] rounded-2xl border border-[#ef8535]/30 space-y-3">
                <label className="block text-xs font-bold text-[#763c00] uppercase tracking-wider">
                  Product Photography (From Instagram / Device)
                </label>

                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  {/* Live preview */}
                  <div className="w-24 h-32 rounded-xl overflow-hidden bg-white border-2 border-[#763c00] shrink-0 flex items-center justify-center">
                    {imageUrl ? (
                      <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon size={24} className="text-gray-400" />
                    )}
                  </div>

                  <div className="flex-1 space-y-2 w-full">
                    {/* Method 1: Local File Upload */}
                    <div>
                      <label className="text-[11px] font-bold text-[#763c00] block mb-1">
                        1. Direct Photo Upload (from Instagram, camera, or laptop):
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="w-full text-xs text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-[#ef8535] file:text-[#f9f7dc] hover:file:bg-[#d97123]"
                      />
                    </div>

                    {/* Method 2: Paste Image URL */}
                    <div>
                      <label className="text-[11px] font-bold text-[#763c00] block mb-1">
                        2. Or Paste Public Image Link (CDN or Unsplash):
                      </label>
                      <input
                        type="url"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder="https://images.unsplash.com/photo-..."
                        className="w-full px-3 py-1.5 rounded-lg bg-white border border-[#ef8535]/30 focus:outline-none focus:border-[#ef8535]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Title & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-[#763c00] uppercase mb-1">
                    Garment / Piece Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Goa Sunset Linen Overlay"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#ef8535]/30 focus:outline-none focus:border-[#ef8535]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#763c00] uppercase mb-1">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#ef8535]/30 font-semibold focus:outline-none focus:border-[#ef8535]"
                  >
                    <option value="women">Women (Wear)</option>
                    <option value="men">Men (Style)</option>
                    <option value="accessories">Accessories (Inspire)</option>
                  </select>
                </div>
              </div>

              {/* Subtitle */}
              <div>
                <label className="block text-[11px] font-bold text-[#763c00] uppercase mb-1">
                  Subtitle / One-line summary
                </label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="e.g. Relaxed camp collar shirt in pre-washed European flax"
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#ef8535]/30 focus:outline-none focus:border-[#ef8535]"
                />
              </div>

              {/* Prices */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#763c00] uppercase mb-1">
                    Selling Price (₹ INR) *
                  </label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#ef8535]/30 font-bold text-sm focus:outline-none focus:border-[#ef8535]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#763c00] uppercase mb-1">
                    Original Strike-through Price (optional)
                  </label>
                  <input
                    type="number"
                    value={originalPrice || ''}
                    onChange={(e) => setOriginalPrice(e.target.value ? Number(e.target.value) : undefined)}
                    placeholder="e.g. 4800"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#ef8535]/30 text-sm focus:outline-none focus:border-[#ef8535]"
                  />
                </div>
              </div>

              {/* Craft Pillar & Origin */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#763c00] uppercase mb-1">
                    Craft Pillar Tag
                  </label>
                  <input
                    type="text"
                    value={craftPillar}
                    onChange={(e) => setCraftPillar(e.target.value)}
                    placeholder="e.g. Hand-spun Khadi / Chanderi"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#ef8535]/30 focus:outline-none focus:border-[#ef8535]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#763c00] uppercase mb-1">
                    Origin / Atelier Location
                  </label>
                  <input
                    type="text"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    placeholder="e.g. Candolim Studio, Goa"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#ef8535]/30 focus:outline-none focus:border-[#ef8535]"
                  />
                </div>
              </div>

              {/* Sizes */}
              <div>
                <label className="block text-[11px] font-bold text-[#763c00] uppercase mb-1.5">
                  Available Sizes
                </label>
                <div className="flex flex-wrap gap-2">
                  {allAvailableSizes.map((s) => (
                    <button
                      type="button"
                      key={s}
                      onClick={() => toggleSize(s)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold border transition-colors ${
                        selectedSizes.includes(s)
                          ? 'bg-[#ef8535] text-[#f9f7dc] border-[#763c00]'
                          : 'bg-white text-gray-600 border-gray-300'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Swatch */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#763c00] uppercase mb-1">
                    Primary Color Name
                  </label>
                  <input
                    type="text"
                    value={colorName}
                    onChange={(e) => setColorName(e.target.value)}
                    placeholder="e.g. Terracotta Orange"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#ef8535]/30 focus:outline-none focus:border-[#ef8535]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#763c00] uppercase mb-1">
                    Hex Color Code
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={colorHex}
                      onChange={(e) => setColorHex(e.target.value)}
                      className="w-8 h-8 rounded border border-gray-300 p-0 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={colorHex}
                      onChange={(e) => setColorHex(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-xl bg-white border border-[#ef8535]/30 text-xs font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-[11px] font-bold text-[#763c00] uppercase mb-1">
                  Full Story & Description
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#ef8535]/30 focus:outline-none focus:border-[#ef8535]"
                />
              </div>

              {/* Checkboxes: In Stock & Featured */}
              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-[#763c00]">
                  <input
                    type="checkbox"
                    checked={inStock}
                    onChange={(e) => setInStock(e.target.checked)}
                    className="w-4 h-4 rounded text-[#ef8535] focus:ring-[#ef8535]"
                  />
                  <span>Product is Currently in Stock</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer font-bold text-[#ef8535]">
                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="w-4 h-4 rounded text-[#ef8535] focus:ring-[#ef8535]"
                  />
                  <span>Feature on Homepage</span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 border border-gray-300 rounded-xl text-xs font-bold text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-[#ef8535] text-[#f9f7dc] border-2 border-[#763c00] font-bold text-xs uppercase tracking-wider rounded-xl canva-box-shadow canva-box-shadow-hover flex items-center justify-center gap-2"
                >
                  <Check size={16} />
                  <span>{editingProduct ? 'Save Changes' : 'Publish Product to Store'}</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
