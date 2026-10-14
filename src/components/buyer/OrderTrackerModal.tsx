import React, { useState } from 'react';
import { X, Search, Package, CheckCircle2, Clock, Truck, Home, Phone } from 'lucide-react';
import { useOrders } from '../../context/OrderContext';
import { OrderStatus } from '../../types';

interface OrderTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialOrderId?: string;
}

export const OrderTrackerModal: React.FC<OrderTrackerModalProps> = ({
  isOpen,
  onClose,
  initialOrderId = '',
}) => {
  const { getOrderById } = useOrders();
  const [searchId, setSearchId] = useState(initialOrderId || 'OO-GOA-782910');
  const [searchedOrder, setSearchedOrder] = useState(() => getOrderById(searchId));

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const found = getOrderById(searchId);
    setSearchedOrder(found);
  };

  const getStepStatus = (currentStatus: OrderStatus, step: OrderStatus) => {
    const orderProgression: OrderStatus[] = ['placed', 'crafting', 'dispatched', 'delivered'];
    const currentIndex = orderProgression.indexOf(currentStatus);
    const stepIndex = orderProgression.indexOf(step);

    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'current';
    return 'upcoming';
  };

  const steps: { key: OrderStatus; label: string; desc: string; icon: any }[] = [
    {
      key: 'placed',
      label: 'Order Confirmed',
      desc: 'Received at Candolim Atelier',
      icon: Package,
    },
    {
      key: 'crafting',
      label: 'Handcrafting & Finishing',
      desc: 'Artisanal tailoring & sea-rinse wash',
      icon: Clock,
    },
    {
      key: 'dispatched',
      label: 'Dispatched via Courier',
      desc: 'Air courier dispatched from Goa',
      icon: Truck,
    },
    {
      key: 'delivered',
      label: 'Delivered',
      desc: 'Arrived at your doorstep',
      icon: Home,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div 
        className="relative bg-[#FFFDF9] rounded-3xl max-w-2xl w-full p-6 sm:p-8 border-2 border-[#763c00] canva-box-shadow shadow-2xl max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#f9f7dc] text-[#763c00] hover:bg-[#ef8535] hover:text-[#f9f7dc] transition-colors border border-[#763c00]/20"
        >
          <X size={18} />
        </button>

        <div className="mb-6">
          <span className="text-[10px] uppercase font-extrabold tracking-[0.25em] text-[#ef8535]">
            Candolim Atelier Logistics
          </span>
          <h2 className="font-display text-2xl sm:text-3xl text-[#763c00]">
            Track Your Handcrafted Piece
          </h2>
          <p className="text-xs text-[#554030] mt-1">
            Follow the journey from artisan looms in India and our Goa studio straight to you.
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex gap-2 mb-6">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3.5 top-3 text-[#763c00]/50" />
            <input
              type="text"
              required
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder="Enter Order ID (e.g. OO-GOA-782910)"
              className="w-full pl-9 pr-3 py-2.5 text-xs font-semibold rounded-xl bg-white border border-[#ef8535]/30 text-[#763c00] focus:outline-none focus:border-[#ef8535]"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 bg-[#ef8535] text-[#f9f7dc] font-bold text-xs uppercase tracking-wider rounded-xl canva-box-shadow hover:bg-[#d97123] transition-colors"
          >
            Track
          </button>
        </form>

        {searchedOrder ? (
          <div className="space-y-6">
            
            {/* Order Summary Pill */}
            <div className="p-4 bg-[#f9f7dc] rounded-2xl border border-[#ef8535]/30 flex flex-wrap items-center justify-between gap-3 text-xs text-[#763c00]">
              <div>
                <span className="text-[10px] font-bold uppercase text-gray-500 block">Order ID</span>
                <span className="font-bold text-sm text-[#ef8535]">{searchedOrder.id}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase text-gray-500 block">Recipient</span>
                <span className="font-bold">{searchedOrder.customerName}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase text-gray-500 block">Estimated Arrival</span>
                <span className="font-semibold text-green-800">{searchedOrder.estimatedDelivery}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase text-gray-500 block">Tracking #</span>
                <span className="font-mono text-gray-700">{searchedOrder.trackingNumber}</span>
              </div>
            </div>

            {/* Stepper Timeline */}
            <div className="py-2">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative">
                {steps.map((st) => {
                  const state = getStepStatus(searchedOrder.status, st.key);
                  const Icon = st.icon;

                  let circleStyle = 'bg-gray-100 text-gray-400 border-gray-300';
                  if (state === 'completed') {
                    circleStyle = 'bg-green-600 text-white border-green-600';
                  } else if (state === 'current') {
                    circleStyle = 'bg-[#ef8535] text-[#f9f7dc] border-[#763c00] canva-box-shadow animate-pulse';
                  }

                  return (
                    <div key={st.key} className="flex flex-col items-center text-center p-3 rounded-2xl bg-white border border-[#ef8535]/15">
                      <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center mb-2.5 ${circleStyle}`}>
                        {state === 'completed' ? <CheckCircle2 size={24} /> : <Icon size={20} />}
                      </div>
                      <h4 className="text-xs font-bold text-[#763c00] leading-snug">{st.label}</h4>
                      <p className="text-[10px] text-[#554030] mt-1">{st.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Items in order */}
            <div className="border-t border-[#ef8535]/20 pt-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#763c00] mb-3">
                Items In This Package ({searchedOrder.items.length})
              </h4>
              <div className="space-y-2">
                {searchedOrder.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-2.5 rounded-xl bg-[#f4ede2]/50 border border-[#ef8535]/15 text-xs">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-12 h-14 object-cover rounded-lg bg-white"
                    />
                    <div className="flex-1">
                      <h5 className="font-bold text-[#763c00]">{item.product.name}</h5>
                      <span className="text-[11px] text-[#554030]">
                        Size: {item.selectedSize} • Color: {item.selectedColor.name} • Qty: {item.quantity}
                      </span>
                    </div>
                    <span className="font-bold text-[#763c00]">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Candolim Concierge Help */}
            <div className="p-3 bg-[#FFFDF9] rounded-xl border border-dashed border-[#ef8535]/40 flex items-center justify-between text-xs text-[#763c00]">
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-[#ef8535]" />
                <span>Need delivery updates or alterations?</span>
              </div>
              <a
                href="tel:09823610024"
                className="font-bold text-[#ef8535] hover:underline"
              >
                Call Concierge: 09823610024
              </a>
            </div>

          </div>
        ) : (
          <div className="text-center py-10 bg-[#f9f7dc]/50 rounded-2xl border border-dashed border-[#ef8535]/40">
            <Package size={32} className="mx-auto text-[#ef8535] mb-2" />
            <h4 className="font-display text-lg text-[#763c00]">Order Not Found</h4>
            <p className="text-xs text-[#554030] mt-1 max-w-xs mx-auto">
              Please double check the ID from your confirmation screen or message. Try demo ID:
            </p>
            <button
              onClick={() => {
                setSearchId('OO-GOA-782910');
                setSearchedOrder(getOrderById('OO-GOA-782910'));
              }}
              className="mt-3 px-3 py-1 bg-white border border-[#ef8535] text-[#ef8535] text-xs font-bold rounded-lg hover:bg-[#ef8535] hover:text-[#f9f7dc] transition-colors"
            >
              Load Demo Order (OO-GOA-782910)
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
