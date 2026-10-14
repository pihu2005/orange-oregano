import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Sparkles, Tag, Check } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onCheckout: (appliedDiscount: number) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState('');

  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 2500;

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const discountAmount = appliedPromo === 'OREGANO10' ? Math.round(subtotal * 0.1) : 0;
  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD || items.length === 0 ? 0 : 250;
  const total = subtotal - discountAmount + shippingFee;

  const freeShippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    if (promoCode.trim().toUpperCase() === 'OREGANO10') {
      setAppliedPromo('OREGANO10');
      setPromoCode('');
    } else {
      setPromoError('Invalid coupon. Try OREGANO10 for 10% off.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        
        {/* Drawer Panel */}
        <div className="w-screen max-w-md bg-[#FFFDF9] border-l-2 border-[#763c00] flex flex-col justify-between shadow-2xl animate-slideLeft">
          
          {/* Header */}
          <div className="p-6 bg-[#f9f7dc] border-b border-[#ef8535]/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag size={22} className="text-[#ef8535]" />
              <h2 className="font-display text-xl text-[#763c00] font-bold">
                Your Shopping Bag ({items.reduce((acc, i) => acc + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-[#ef8535]/20 text-[#763c00] transition-colors"
              aria-label="Close cart"
            >
              <X size={20} />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="p-4 bg-[#f4ede2] border-b border-[#ef8535]/15 text-xs text-[#763c00]">
            <div className="flex items-center justify-between mb-1.5 font-semibold">
              <span className="flex items-center gap-1.5">
                <Sparkles size={13} className="text-[#ef8535]" />
                {amountNeededForFreeShipping === 0 ? (
                  <span className="text-[#ef8535] font-bold">You unlocked Complimentary Shipping!</span>
                ) : (
                  <span>Add ₹{amountNeededForFreeShipping.toLocaleString('en-IN')} more for Complimentary Delivery</span>
                )}
              </span>
              <span>{Math.round(freeShippingProgress)}%</span>
            </div>
            <div className="w-full h-2 bg-[#763c00]/15 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#ef8535] transition-all duration-500 rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 text-[#763c00]">
                <div className="w-16 h-16 rounded-full bg-[#f4ede2] flex items-center justify-center mx-auto mb-4 text-[#ef8535]">
                  <ShoppingBag size={32} />
                </div>
                <h3 className="font-display text-xl">Your bag is empty</h3>
                <p className="text-xs text-[#554030] mt-1 max-w-xs mx-auto">
                  Explore our handcrafted Goa resort linens, Chanderi silks, and botanical brass pieces.
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 px-6 py-2.5 bg-[#ef8535] text-[#f9f7dc] font-bold text-xs uppercase tracking-wider rounded-full canva-box-shadow"
                >
                  Discover Collection
                </button>
              </div>
            ) : (
              items.map((item, index) => (
                <div
                  key={`${item.product.id}-${item.selectedSize}-${item.selectedColor.name}-${index}`}
                  className="p-3 bg-white rounded-2xl border border-[#ef8535]/20 flex gap-3 shadow-xs"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-24 object-cover rounded-xl bg-[#f4ede2]"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-display text-sm text-[#763c00] font-bold line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(index)}
                          className="text-gray-400 hover:text-red-500 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 mt-1 text-[11px] text-[#554030]">
                        <span className="font-medium bg-[#f4ede2] px-2 py-0.5 rounded">
                          Size: {item.selectedSize}
                        </span>
                        <span className="flex items-center gap-1">
                          <span
                            className="w-2.5 h-2.5 rounded-full inline-block border border-gray-300"
                            style={{ backgroundColor: item.selectedColor.hex }}
                          />
                          {item.selectedColor.name}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                      <div className="flex items-center border border-[#ef8535]/30 rounded-md bg-[#f4ede2]/30 text-xs font-bold text-[#763c00]">
                        <button
                          onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                          className="px-2 py-0.5 hover:bg-[#ef8535]/20"
                        >
                          -
                        </button>
                        <span className="px-2 py-0.5">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                          className="px-2 py-0.5 hover:bg-[#ef8535]/20"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-bold text-sm text-[#763c00]">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {items.length > 0 && (
            <div className="p-6 bg-[#f9f7dc] border-t-2 border-[#763c00]/20 space-y-4">
              
              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag size={14} className="absolute left-3 top-3 text-[#763c00]/50" />
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Coupon code (OREGANO10)"
                    className="w-full pl-8 pr-3 py-2 bg-white border border-[#ef8535]/30 rounded-xl text-xs font-semibold text-[#763c00] uppercase placeholder:normal-case focus:outline-none focus:border-[#ef8535]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#763c00] text-[#f9f7dc] text-xs font-bold uppercase rounded-xl hover:bg-[#ef8535] transition-colors"
                >
                  Apply
                </button>
              </form>

              {appliedPromo && (
                <div className="flex items-center justify-between text-xs text-green-700 bg-green-50 p-2 rounded-lg border border-green-200">
                  <span className="flex items-center gap-1 font-semibold">
                    <Check size={12} /> Code <strong>{appliedPromo}</strong> applied (10% OFF)
                  </span>
                  <button
                    onClick={() => setAppliedPromo(null)}
                    className="underline text-[10px]"
                  >
                    Remove
                  </button>
                </div>
              )}

              {promoError && (
                <p className="text-[11px] text-red-600 font-medium">{promoError}</p>
              )}

              {/* Price Calculation Breakdown */}
              <div className="space-y-1.5 text-xs text-[#554030]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#ef8535] font-semibold">
                    <span>Discount (10%)</span>
                    <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shippingFee === 0 ? <strong className="text-[#ef8535]">FREE</strong> : `₹${shippingFee}`}</span>
                </div>

                <div className="flex justify-between text-base font-display font-bold text-[#763c00] pt-2 border-t border-[#763c00]/15">
                  <span>Total</span>
                  <span>₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Checkout Action */}
              <button
                onClick={() => onCheckout(discountAmount)}
                className="w-full py-4 bg-[#ef8535] text-[#f9f7dc] border-2 border-[#763c00] font-bold text-sm uppercase tracking-wider rounded-xl canva-box-shadow canva-box-shadow-hover flex items-center justify-center gap-2 transition-all"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={18} />
              </button>

              <p className="text-[10px] text-center text-[#763c00]/70">
                🔒 Secure SSL Checkout • Razorpay / UPI / Cash on Delivery Supported
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
