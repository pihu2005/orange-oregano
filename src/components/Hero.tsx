import React from 'react';
import { ArrowRight, Sparkles, Compass, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onShopNow: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopNow }) => {
  return (
    <section className="relative overflow-hidden bg-[#ef8535] text-[#f9f7dc] pt-12 pb-20 lg:pt-20 lg:pb-28">
      {/* Decorative background sun & arch motifs */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#f59e5b]/25 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-[#763c00]/15 blur-2xl pointer-events-none" />

      {/* Subtle handcrafted pattern texture overlay */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f9f7dc_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Canva-style Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f9f7dc]/15 backdrop-blur-sm border border-[#f9f7dc]/30 text-xs sm:text-sm font-medium tracking-wide uppercase">
            <Sparkles size={14} className="text-[#f9f7dc]" />
            <span>Candolim, Goa • Indigenous Craft Collective</span>
          </div>
        </div>

        {/* Central Canva Big Bold Brand Title */}
        <div className="text-center max-w-4xl mx-auto mb-8">
          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-[#f9f7dc] canva-shadow-lg leading-none select-none">
            Orange Oregano
          </h1>

          <p className="mt-6 text-lg sm:text-2xl md:text-3xl font-light text-[#f9f7dc]/95 max-w-2xl mx-auto leading-relaxed">
            More Than Fashion
          </p>

          <p className="mt-2 text-sm sm:text-base md:text-lg font-medium text-[#f9f7dc]/80 max-w-xl mx-auto tracking-wide">
            Affordable Luxury • Handcrafted in India • Inspired by Indigenous Craft & Textile
          </p>

          {/* Canva Primary Action Button: "shop now" */}
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onShopNow}
              className="px-8 sm:px-10 py-4 bg-[#f9f7dc] text-[#763c00] text-base sm:text-lg font-bold rounded-full canva-box-shadow canva-box-shadow-hover inline-flex items-center gap-3 tracking-wide uppercase transition-all"
            >
              <span>Shop Now</span>
              <ArrowRight size={20} className="text-[#ef8535]" />
            </button>

            <a
              href="#philosophy"
              className="px-6 sm:px-8 py-4 bg-transparent hover:bg-[#f9f7dc]/10 text-[#f9f7dc] text-sm sm:text-base font-semibold rounded-full border-2 border-[#f9f7dc]/70 transition-colors"
            >
              Discover Our Craft
            </a>
          </div>
        </div>

        {/* Hero Visual Collage & Editorial Cards */}
        <div className="mt-12 lg:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-end">
          
          {/* Card 1: Women / Wear */}
          <div className="group relative rounded-2xl overflow-hidden canva-box-shadow bg-[#f9f7dc] border-2 border-[#763c00] transform transition duration-300 hover:-translate-y-2">
            <div className="aspect-[4/5] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80" 
                alt="Orange Oregano Women Collection" 
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                loading="eager"
              />
            </div>
            <div className="p-4 bg-[#f9f7dc] flex items-center justify-between">
              <div>
                <span className="text-xs uppercase font-bold text-[#ef8535] tracking-wider">Wear</span>
                <h3 className="font-display text-xl text-[#763c00]">Women’s Line</h3>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#ef8535]/15 text-[#763c00]">
                Khadi & Silk
              </span>
            </div>
          </div>

          {/* Center Card 2: Featured Hero Showcase */}
          <div className="group relative rounded-2xl overflow-hidden canva-box-shadow-hover canva-box-shadow bg-[#f9f7dc] border-2 border-[#763c00] md:-mt-8 transform transition duration-300 hover:-translate-y-2">
            <div className="relative aspect-[3/4] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80" 
                alt="Orange Oregano Artisanal Indian Fashion" 
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#763c00]/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-[#f9f7dc]">
                <span className="inline-block px-3 py-1 bg-[#ef8535] text-[11px] font-bold uppercase tracking-widest rounded-md mb-2">
                  New Monsoon & Resort 2026
                </span>
                <p className="font-display text-2xl text-[#f9f7dc] canva-shadow leading-tight">
                  Candolim Slow Living
                </p>
                <p className="text-xs text-[#f9f7dc]/90 mt-1">
                  Breathable silhouettes handcrafted for barefoot coastal luxury.
                </p>
              </div>
            </div>
          </div>

          {/* Card 3: Men / Style */}
          <div className="group relative rounded-2xl overflow-hidden canva-box-shadow bg-[#f9f7dc] border-2 border-[#763c00] transform transition duration-300 hover:-translate-y-2">
            <div className="aspect-[4/5] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80" 
                alt="Orange Oregano Men Linen Collection" 
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                loading="eager"
              />
            </div>
            <div className="p-4 bg-[#f9f7dc] flex items-center justify-between">
              <div>
                <span className="text-xs uppercase font-bold text-[#ef8535] tracking-wider">Style</span>
                <h3 className="font-display text-xl text-[#763c00]">Men’s Linen</h3>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#ef8535]/15 text-[#763c00]">
                Pre-Washed Flax
              </span>
            </div>
          </div>

        </div>

        {/* 3 Value Badges Bar */}
        <div className="mt-14 pt-8 border-t border-[#f9f7dc]/20 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center text-[#f9f7dc]">
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#f9f7dc]/20 flex items-center justify-center">
              <Compass size={20} />
            </div>
            <div className="text-left">
              <h4 className="font-bold text-sm">Candolim, Goa Born</h4>
              <p className="text-xs text-[#f9f7dc]/80">Designed in Goa, woven across India</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#f9f7dc]/20 flex items-center justify-center">
              <Sparkles size={20} />
            </div>
            <div className="text-left">
              <h4 className="font-bold text-sm">Indigenous Textiles</h4>
              <p className="text-xs text-[#f9f7dc]/80">Khadi, Chanderi & Ajrakh natural craft</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#f9f7dc]/20 flex items-center justify-center">
              <ShieldCheck size={20} />
            </div>
            <div className="text-left">
              <h4 className="font-bold text-sm">Affordable Luxury</h4>
              <p className="text-xs text-[#f9f7dc]/80">Direct from artisan hands to you</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
