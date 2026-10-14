import React, { useState } from 'react';
import { X, Star, Heart, Check, Shield, Truck, RefreshCw, Sparkles, Ban } from 'lucide-react';
import { Product } from '../types';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, color: { name: string; hex: string }, quantity: number) => void;
  onBuyNow: (product: Product, size: string, color: { name: string; hex: string }) => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  isWishlisted,
  onToggleWishlist,
}) => {
  if (!product) return null;

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || { name: 'Natural', hex: '#ef8535' });
  const [quantity, setQuantity] = useState(1);
  const [addedToast, setAddedToast] = useState(false);

  const isOutOfStock = product.inStock === false;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    onAddToCart(product, selectedSize, selectedColor, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      
      {/* Modal Container */}
      <div 
        className="relative bg-[#FFFDF9] rounded-3xl max-w-4xl w-full overflow-hidden border-2 border-[#763c00] canva-box-shadow max-h-[92vh] flex flex-col md:flex-row shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[#f9f7dc] text-[#763c00] hover:bg-[#ef8535] hover:text-[#f9f7dc] transition-colors border border-[#763c00]/20"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Left Column: Image Gallery */}
        <div className="md:w-1/2 p-6 bg-[#f4ede2]/50 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#ef8535]/20">
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-white border border-[#ef8535]/20">
            <img
              src={product.images[selectedImage] || product.images[0]}
              alt={product.name}
              className={`w-full h-full object-cover object-center ${isOutOfStock ? 'grayscale-[25%]' : ''}`}
            />
            {isOutOfStock ? (
              <span className="absolute top-3 left-3 px-3 py-1 bg-red-600 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-md flex items-center gap-1">
                <Ban size={12} />
                <span>Sold Out</span>
              </span>
            ) : product.tag ? (
              <span className="absolute top-3 left-3 px-3 py-1 bg-[#ef8535] text-[#f9f7dc] text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">
                {product.tag}
              </span>
            ) : null}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === i ? 'border-[#ef8535] scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Origin Badge */}
          <div className="mt-4 pt-3 border-t border-[#ef8535]/15 flex items-center gap-2 text-xs text-[#554030]">
            <Sparkles size={14} className="text-[#ef8535]" />
            <span>Origin: <strong>{product.origin}</strong></span>
          </div>
        </div>

        {/* Right Column: Product Config & Purchase */}
        <div className="md:w-1/2 p-6 sm:p-8 overflow-y-auto flex flex-col justify-between">
          <div>
            
            {/* Craft Pillar & Rating */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase font-extrabold tracking-widest text-[#ef8535]">
                {product.craftPillar}
              </span>
              <div className="flex items-center gap-1">
                <Star size={14} fill="#ef8535" className="text-[#ef8535]" />
                <span className="text-xs font-bold text-[#763c00]">{product.rating}</span>
                <span className="text-xs text-[#763c00]/60">({product.reviewCount} reviews)</span>
              </div>
            </div>

            {/* Title & Price */}
            <h2 className="font-display text-2xl sm:text-3xl text-[#763c00] leading-snug">
              {product.name}
            </h2>
            <p className="text-xs text-[#554030] mt-1">{product.subtitle}</p>

            <div className="mt-4 flex items-baseline gap-3">
              <span className="font-display text-2xl sm:text-3xl font-bold text-[#763c00]">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-sm text-gray-400 line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs font-bold text-[#ef8535] bg-[#ef8535]/10 px-2 py-0.5 rounded">
                    Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')}
                  </span>
                </>
              )}
            </div>

            {/* Out of Stock Notice */}
            {isOutOfStock && (
              <div className="mt-4 p-3 bg-red-50 text-red-800 rounded-xl border border-red-200 text-xs flex items-center gap-2">
                <Ban size={16} className="text-red-600 shrink-0" />
                <span>
                  <strong>Currently Out of Stock.</strong> Our Candolim atelier is handcrafting the next batch. Save to your Liked Pieces to be notified.
                </span>
              </div>
            )}

            <p className="mt-4 text-xs sm:text-sm text-[#554030] leading-relaxed">
              {product.description}
            </p>

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="mt-6">
                <label className="text-xs font-bold text-[#763c00] uppercase tracking-wider block mb-2">
                  Color: <span className="font-normal text-[#554030] normal-case">{selectedColor.name}</span>
                </label>
                <div className="flex gap-2.5">
                  {product.colors.map((c, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedColor(c)}
                      className={`w-7 h-7 rounded-full border-2 transition-transform ${
                        selectedColor.name === c.name 
                          ? 'border-[#763c00] scale-110 shadow-sm' 
                          : 'border-white hover:scale-105'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mt-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-[#763c00] uppercase tracking-wider">
                    Select Size
                  </label>
                  <span className="text-[11px] text-[#ef8535] font-semibold cursor-pointer hover:underline">
                    Size Guide
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                        selectedSize === s
                          ? 'bg-[#ef8535] text-[#f9f7dc] border-[#763c00] canva-box-shadow'
                          : 'bg-[#f4ede2]/60 text-[#763c00] border-[#ef8535]/30 hover:bg-[#ef8535]/15'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            {!isOutOfStock && (
              <div className="mt-6 flex items-center gap-4">
                <label className="text-xs font-bold text-[#763c00] uppercase tracking-wider">
                  Quantity:
                </label>
                <div className="flex items-center border border-[#ef8535]/40 rounded-lg bg-[#f4ede2]/40 overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 text-sm font-bold text-[#763c00] hover:bg-[#ef8535]/20"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 text-xs font-bold text-[#763c00]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 text-sm font-bold text-[#763c00] hover:bg-[#ef8535]/20"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {/* Fabric & Craft Details */}
            {product.details && product.details.length > 0 && (
              <div className="mt-6 p-3.5 bg-[#f9f7dc]/70 rounded-xl border border-[#ef8535]/25 text-xs text-[#554030]">
                <p className="font-bold text-[#763c00] mb-1">Craftsmanship Notes:</p>
                <ul className="list-disc list-inside space-y-1">
                  {product.details.map((detail, idx) => (
                    <li key={idx}>{detail}</li>
                  ))}
                </ul>
              </div>
            )}

          </div>

          {/* Action Buttons & Feedback */}
          <div className="mt-8 pt-4 border-t border-[#ef8535]/20">
            {addedToast && (
              <div className="mb-3 p-2 bg-[#ef8535] text-[#f9f7dc] rounded-lg text-xs font-bold text-center flex items-center justify-center gap-1.5 animate-bounce">
                <Check size={14} />
                <span>Added to bag successfully!</span>
              </div>
            )}

            <div className="flex items-center gap-3">
              {!isOutOfStock ? (
                <>
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-3.5 px-4 bg-[#f9f7dc] text-[#763c00] border-2 border-[#763c00] font-bold text-sm uppercase tracking-wider rounded-xl canva-box-shadow canva-box-shadow-hover transition-all"
                  >
                    Add to Bag
                  </button>

                  <button
                    onClick={() => onBuyNow(product, selectedSize, selectedColor)}
                    className="flex-1 py-3.5 px-4 bg-[#ef8535] text-[#f9f7dc] border-2 border-[#763c00] font-bold text-sm uppercase tracking-wider rounded-xl canva-box-shadow canva-box-shadow-hover transition-all"
                  >
                    Buy Now
                  </button>
                </>
              ) : (
                <button
                  disabled
                  className="flex-1 py-3.5 px-4 bg-gray-200 text-gray-500 border border-gray-300 font-bold text-sm uppercase tracking-wider rounded-xl cursor-not-allowed"
                >
                  Sold Out
                </button>
              )}

              <button
                onClick={() => onToggleWishlist(product.id)}
                className={`p-3.5 rounded-xl border-2 border-[#763c00] canva-box-shadow transition-colors ${
                  isWishlisted ? 'bg-[#ef8535] text-[#f9f7dc]' : 'bg-[#f9f7dc] text-[#763c00]'
                }`}
                aria-label="Wishlist"
              >
                <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="mt-4 grid grid-cols-3 gap-2 text-[11px] text-[#763c00]/80 text-center">
              <div className="flex items-center justify-center gap-1">
                <Truck size={12} className="text-[#ef8535]" />
                <span>Complimentary Delivery</span>
              </div>
              <div className="flex items-center justify-center gap-1">
                <Shield size={12} className="text-[#ef8535]" />
                <span>100% Authentic Craft</span>
              </div>
              <div className="flex items-center justify-center gap-1">
                <RefreshCw size={12} className="text-[#ef8535]" />
                <span>7-Day Easy Exchange</span>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
