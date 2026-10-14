import React from 'react';
import { MapPin, Phone, Sparkles } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="bg-[#ef8535] text-[#f9f7dc] text-xs font-medium tracking-wider uppercase border-b border-[#763c00]/20">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        <div className="hidden sm:flex items-center gap-2">
          <MapPin size={13} className="text-[#f9f7dc]" />
          <span>Candolim, Goa Flagship Studio</span>
        </div>
        
        <div className="flex-1 text-center flex items-center justify-center gap-2">
          <Sparkles size={13} className="animate-spin text-[#f9f7dc] hidden md:inline" />
          <span>Complimentary shipping on orders above ₹2,500 across India • Use code <strong>OREGANO10</strong></span>
        </div>

        <div className="hidden sm:flex items-center gap-3">
          <a 
            href="tel:09823610024" 
            className="flex items-center gap-1.5 hover:underline transition-colors"
          >
            <Phone size={12} />
            <span>09823610024</span>
          </a>
          <span className="text-[#f9f7dc]/50">•</span>
          <span className="text-[#f9f7dc]/90 font-semibold">₹ INR</span>
        </div>
      </div>
    </div>
  );
};
