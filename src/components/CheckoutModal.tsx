import React, { useState, useEffect } from 'react';
import { X, Check, ShieldCheck, ArrowRight, Sparkles, Truck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem } from '../types';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  appliedDiscount: number;
  onOrderComplete: () => void;
  onTrackOrderDirectly?: (orderId: string) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  appliedDiscount,
  onOrderComplete,
  onTrackOrderDirectly,
}) => {
  const { currentUser } = useAuth();
  const { createOrder } = useOrders();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod'>('upi');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState('');

  // Pre-fill from logged-in buyer if available
  useEffect(() => {
    if (currentUser) {
      if (currentUser.name) setFullName(currentUser.name);
      if (currentUser.email) setEmail(currentUser.email);
      if (currentUser.phone) setPhone(currentUser.phone);
      if (currentUser.shippingAddress) {
        setAddress(currentUser.shippingAddress.street || '');
        setCity(currentUser.shippingAddress.city || '');
        setPincode(currentUser.shippingAddress.pincode || '');
      }
    }
  }, [currentUser, isOpen]);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal >= 2500 || items.length === 0 ? 0 : 250;
  const grandTotal = subtotal - appliedDiscount + shipping;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    // Create real order in OrderContext
    const newOrder = createOrder({
      userId: currentUser?.id,
      customerName: fullName,
      customerEmail: email,
      customerPhone: phone,
      shippingAddress: {
        street: address,
        city,
        pincode,
      },
      items,
      subtotal,
      discount: appliedDiscount,
      shipping,
      total: grandTotal,
      paymentMethod,
    });

    setConfirmedOrderId(newOrder.id);
    setIsSubmitted(true);

    // Fire celebration confetti!
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#ef8535', '#f9f7dc', '#763c00']
    });

    onOrderComplete();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div 
        className="relative bg-[#FFFDF9] rounded-3xl max-w-2xl w-full p-6 sm:p-10 border-2 border-[#763c00] canva-box-shadow shadow-2xl max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#f9f7dc] text-[#763c00] hover:bg-[#ef8535] hover:text-[#f9f7dc] transition-colors border border-[#763c00]/20"
        >
          <X size={20} />
        </button>

        {isSubmitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-20 h-20 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto border-2 border-green-600 animate-bounce">
              <Check size={40} />
            </div>

            <span className="text-xs uppercase font-extrabold tracking-widest text-[#ef8535]">
              Order Placed Successfully
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-[#763c00]">
              Thank You for Supporting Handcrafted Indian Craft!
            </h2>
            <p className="text-xs sm:text-sm text-[#554030] max-w-md mx-auto">
              Your order confirmation and tracking details are recorded. Our Candolim atelier has begun tailoring your pieces.
            </p>

            <div className="p-4 bg-[#f9f7dc] rounded-2xl border border-[#ef8535]/30 max-w-md mx-auto text-left text-xs space-y-1.5 text-[#763c00]">
              <div className="flex justify-between font-bold">
                <span>Order Reference:</span>
                <span className="text-[#ef8535] text-sm">{confirmedOrderId}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping Destination:</span>
                <span>{city}, {pincode}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Arrival:</span>
                <span>3-5 Working Days</span>
              </div>
              <div className="flex justify-between border-t border-[#763c00]/15 pt-1.5 font-bold">
                <span>Total Amount:</span>
                <span>₹{grandTotal.toLocaleString('en-IN')} ({paymentMethod.toUpperCase()})</span>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
              <button
                onClick={() => {
                  onClose();
                  onTrackOrderDirectly?.(confirmedOrderId);
                }}
                className="px-6 py-3 bg-[#763c00] text-[#f9f7dc] font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-[#5a2e00] flex items-center justify-center gap-2"
              >
                <Truck size={14} />
                <span>Track This Order Now</span>
              </button>

              <button
                onClick={onClose}
                className="px-6 py-3 bg-[#ef8535] text-[#f9f7dc] font-bold text-xs uppercase tracking-wider rounded-xl canva-box-shadow canva-box-shadow-hover flex items-center justify-center gap-2"
              >
                <span>Continue Shopping</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-2 text-xs font-bold uppercase text-[#ef8535] tracking-widest">
                <ShieldCheck size={16} />
                <span>{currentUser ? `Checkout as ${currentUser.name}` : 'Guest Checkout'}</span>
              </div>
              <h2 className="font-display text-3xl text-[#763c00] mt-1">
                Complete Your Order
              </h2>
            </div>

            <form onSubmit={handlePlaceOrder} className="space-y-6">
              
              {/* Customer Contact Details */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#763c00] border-b border-[#ef8535]/20 pb-1">
                  1. Contact Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-[#763c00] uppercase mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Rohini Sharma"
                      className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#ef8535]/30 text-[#763c00] focus:outline-none focus:border-[#ef8535]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#763c00] uppercase mb-1">
                      Phone Number (Courier & WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 09823610024"
                      className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#ef8535]/30 text-[#763c00] focus:outline-none focus:border-[#ef8535]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#763c00] uppercase mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. rohini@example.com"
                    className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#ef8535]/30 text-[#763c00] focus:outline-none focus:border-[#ef8535]"
                  />
                </div>
              </div>

              {/* Delivery Address */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#763c00] border-b border-[#ef8535]/20 pb-1">
                  2. Delivery Address (India)
                </h3>
                <div>
                  <label className="block text-[11px] font-bold text-[#763c00] uppercase mb-1">
                    Street Address, House / Villa No. *
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="House no, Street name, Landmark"
                    className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#ef8535]/30 text-[#763c00] focus:outline-none focus:border-[#ef8535]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-[#763c00] uppercase mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Candolim / Mumbai"
                      className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#ef8535]/30 text-[#763c00] focus:outline-none focus:border-[#ef8535]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#763c00] uppercase mb-1">
                      Pincode *
                    </label>
                    <input
                      type="text"
                      required
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      placeholder="e.g. 403515"
                      className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#ef8535]/30 text-[#763c00] focus:outline-none focus:border-[#ef8535]"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#763c00] border-b border-[#ef8535]/20 pb-1">
                  3. Payment Method
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      paymentMethod === 'upi'
                        ? 'border-[#763c00] bg-[#ef8535] text-[#f9f7dc] canva-box-shadow'
                        : 'border-[#ef8535]/30 bg-[#f4ede2]/50 text-[#763c00]'
                    }`}
                  >
                    <div className="text-xs font-bold">UPI / QR</div>
                    <div className="text-[10px] opacity-80 mt-0.5">GPay / PhonePe</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      paymentMethod === 'card'
                        ? 'border-[#763c00] bg-[#ef8535] text-[#f9f7dc] canva-box-shadow'
                        : 'border-[#ef8535]/30 bg-[#f4ede2]/50 text-[#763c00]'
                    }`}
                  >
                    <div className="text-xs font-bold">Cards</div>
                    <div className="text-[10px] opacity-80 mt-0.5">Visa / Mastercard</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-[#763c00] bg-[#ef8535] text-[#f9f7dc] canva-box-shadow'
                        : 'border-[#ef8535]/30 bg-[#f4ede2]/50 text-[#763c00]'
                    }`}
                  >
                    <div className="text-xs font-bold">Cash on Delivery</div>
                    <div className="text-[10px] opacity-80 mt-0.5">Pay at Doorstep</div>
                  </button>
                </div>
              </div>

              {/* Order Summary Box */}
              <div className="p-4 bg-[#f9f7dc] rounded-2xl border border-[#ef8535]/30 text-xs text-[#763c00] space-y-1.5">
                <div className="flex justify-between">
                  <span>Items Subtotal ({items.length} items):</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-[#ef8535] font-semibold">
                    <span>Discount:</span>
                    <span>-₹{appliedDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>{shipping === 0 ? <strong className="text-[#ef8535]">FREE</strong> : `₹${shipping}`}</span>
                </div>
                <div className="flex justify-between text-sm font-display font-bold border-t border-[#763c00]/15 pt-2 text-[#763c00]">
                  <span>Total Payable:</span>
                  <span>₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 bg-[#ef8535] text-[#f9f7dc] border-2 border-[#763c00] font-bold text-sm uppercase tracking-wider rounded-xl canva-box-shadow canva-box-shadow-hover flex items-center justify-center gap-2"
              >
                <span>Confirm & Place Order (₹{grandTotal.toLocaleString('en-IN')})</span>
                <Sparkles size={18} />
              </button>

            </form>
          </div>
        )}

      </div>
    </div>
  );
};
