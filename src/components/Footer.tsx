import React from 'react';
import { MapPin, Phone, Instagram, Mail, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#ef8535] text-[#f9f7dc] pt-16 pb-12 border-t-2 border-[#763c00] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Brand Banner matching Canva */}
        <div className="flex flex-col md:flex-row items-center justify-between pb-12 border-b border-[#f9f7dc]/25 gap-6">
          <div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#f9f7dc] canva-shadow tracking-tight">
              Orange Oregano
            </h2>
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-[#f9f7dc]/90 mt-1">
              Affordable Luxury • Handcrafted in India
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="p-3.5 rounded-full bg-[#f9f7dc] text-[#763c00] canva-box-shadow canva-box-shadow-hover hover:bg-white transition-all flex items-center justify-center"
            title="Back to Top"
          >
            <ArrowUp size={20} />
          </button>
        </div>

        {/* 4-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 py-12 border-b border-[#f9f7dc]/25 text-sm">
          
          {/* Column 1: Say Hello (Canva Exact Content) */}
          <div className="space-y-3">
            <h3 className="font-display text-xl text-[#f9f7dc] canva-shadow">
              Say Hello
            </h3>
            <div className="flex items-start gap-2.5 text-[#f9f7dc]/90 text-xs leading-relaxed">
              <MapPin size={16} className="text-[#f9f7dc] shrink-0 mt-0.5" />
              <span>
                House no, 406-A, Marquis Vaddo,<br />
                Vaddi, Candolim, Goa 403515
              </span>
            </div>
            <div className="flex items-center gap-2.5 text-[#f9f7dc]/90 text-xs">
              <Phone size={16} className="text-[#f9f7dc] shrink-0" />
              <a href="tel:09823610024" className="hover:underline font-bold">
                09823610024
              </a>
            </div>
            <div className="flex items-center gap-2.5 text-[#f9f7dc]/90 text-xs">
              <Mail size={16} className="text-[#f9f7dc] shrink-0" />
              <a href="mailto:hello@orangeoregano.in" className="hover:underline">
                hello@orangeoregano.in
              </a>
            </div>
          </div>

          {/* Column 2: Follow Us (Canva Exact Content) */}
          <div className="space-y-3">
            <h3 className="font-display text-xl text-[#f9f7dc] canva-shadow">
              Follow Us
            </h3>
            <p className="text-xs text-[#f9f7dc]/90">
              Join our visual journal of slow fashion, weaving clusters, and Candolim afternoons.
            </p>
            <a
              href="https://instagram.com/orange.oregano"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#f9f7dc] text-[#763c00] rounded-xl text-xs font-bold uppercase tracking-wider canva-box-shadow canva-box-shadow-hover hover:text-[#ef8535] transition-all"
            >
              <Instagram size={16} />
              <span>@orange.oregano</span>
            </a>
          </div>

          {/* Column 3: The Collection */}
          <div className="space-y-3 text-xs text-[#f9f7dc]/90">
            <h3 className="font-display text-xl text-[#f9f7dc] canva-shadow">
              The Collection
            </h3>
            <ul className="space-y-2">
              <li><a href="#catalog" className="hover:underline">Women — Wear (Khadi & Chanderi)</a></li>
              <li><a href="#catalog" className="hover:underline">Men — Style (Flax Linen & Kurtas)</a></li>
              <li><a href="#catalog" className="hover:underline">Accessories — Inspire (Ajrakh & Brass)</a></li>
              <li><a href="#philosophy" className="hover:underline">Artisanal Weaving Clusters</a></li>
              <li><a href="#studio" className="hover:underline">Candolim Studio Private Fitting</a></li>
            </ul>
          </div>

          {/* Column 4: Client Services */}
          <div className="space-y-3 text-xs text-[#f9f7dc]/90">
            <h3 className="font-display text-xl text-[#f9f7dc] canva-shadow">
              Client Care
            </h3>
            <ul className="space-y-2">
              <li><span>Complimentary Shipping Across India</span></li>
              <li><span>7-Day Return & Exchange Policy</span></li>
              <li><span>Handloom & Natural Dye Care Guide</span></li>
              <li><span>Custom Bespoke Sizing for Weddings</span></li>
              <li><span>Sustainability & Weaver Fair Trade</span></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#f9f7dc]/80 gap-4">
          <p>
            © {new Date().getFullYear()} Orange Oregano. All rights reserved. Handcrafted in India.
          </p>
          <div className="flex items-center gap-4 text-[11px]">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:underline">Terms of Service</a>
            <span>•</span>
            <a href="#" className="hover:underline">Candolim Studio</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
