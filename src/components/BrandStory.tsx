import React from 'react';
import { Feather, HeartHandshake, Sparkles, Sun } from 'lucide-react';

export const BrandStory: React.FC = () => {
  return (
    <section id="philosophy" className="py-20 lg:py-28 bg-[#FFFDF9] relative overflow-hidden">
      
      {/* Decorative background shapes */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[800px] h-48 bg-[#f4ede2]/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-extrabold tracking-[0.25em] text-[#ef8535] bg-[#ef8535]/10 px-4 py-1.5 rounded-full">
            Our Manifesto
          </span>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl text-[#763c00] tracking-tight">
            More Than Fashion
          </h2>
          <div className="w-16 h-1 bg-[#ef8535] mx-auto mt-4 rounded-full" />
          <p className="mt-4 text-base sm:text-lg text-[#554030] leading-relaxed">
            Orange Oregano was conceived in Candolim, Goa with a singular belief: Luxury should not be prohibitive, and fashion must never forget the hands that spun its threads.
          </p>
        </div>

        {/* 3 Canva Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          
          {/* Pillar 1: Affordable Luxury */}
          <div className="bg-[#f9f7dc]/60 rounded-2xl p-8 border-2 border-[#763c00]/20 canva-box-shadow flex flex-col justify-between group hover:border-[#ef8535] transition-all">
            <div>
              <div className="w-14 h-14 rounded-xl bg-[#ef8535] text-[#f9f7dc] flex items-center justify-center mb-6 canva-box-shadow group-hover:scale-105 transition-transform">
                <HeartHandshake size={28} />
              </div>
              <h3 className="font-display text-2xl text-[#763c00] mb-3">
                Affordable Luxury
              </h3>
              <p className="text-sm text-[#554030] leading-relaxed">
                By designing in-house at our Goa atelier and partnering directly with artisan weavers across rural India, we bypass traditional fashion markups. You receive couture-level handloom fabrics at transparent, honest prices.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#763c00]/15 flex items-center gap-2 text-xs font-bold text-[#ef8535]">
              <span>NO MIDDLEMEN • HONEST PRICING</span>
            </div>
          </div>

          {/* Pillar 2: Handcrafted in India */}
          <div className="bg-[#ef8535] text-[#f9f7dc] rounded-2xl p-8 border-2 border-[#763c00] canva-box-shadow flex flex-col justify-between group transform md:-translate-y-3 transition-all">
            <div>
              <div className="w-14 h-14 rounded-xl bg-[#f9f7dc] text-[#763c00] flex items-center justify-center mb-6 canva-box-shadow group-hover:scale-105 transition-transform">
                <Feather size={28} />
              </div>
              <h3 className="font-display text-2xl text-[#f9f7dc] canva-shadow mb-3">
                Handcrafted in India
              </h3>
              <p className="text-sm text-[#f9f7dc]/90 leading-relaxed">
                Every Orange Oregano garment carries the signature of human warmth. From hand-spun Khadi from Bengal to 16-stage hand-block Ajrakh prints from Kutch, every meter preserves centuries of indigenous artisanal heritage.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#f9f7dc]/25 flex items-center gap-2 text-xs font-bold text-[#f9f7dc]">
              <span>AUTHENTIC WEAVERS • ZERO FAST-FASHION</span>
            </div>
          </div>

          {/* Pillar 3: Inspired by Indigenous Craft & Textile */}
          <div className="bg-[#f9f7dc]/60 rounded-2xl p-8 border-2 border-[#763c00]/20 canva-box-shadow flex flex-col justify-between group hover:border-[#ef8535] transition-all">
            <div>
              <div className="w-14 h-14 rounded-xl bg-[#ef8535] text-[#f9f7dc] flex items-center justify-center mb-6 canva-box-shadow group-hover:scale-105 transition-transform">
                <Sparkles size={28} />
              </div>
              <h3 className="font-display text-2xl text-[#763c00] mb-3">
                Indigenous Craft & Textile
              </h3>
              <p className="text-sm text-[#554030] leading-relaxed">
                We celebrate nature’s original textiles: pure European flax linen, GOTS-certified unbleached cotton, wild silks, and natural dyes sourced from madder root, pomegranate rinds, and coastal sea salt rinses.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#763c00]/15 flex items-center gap-2 text-xs font-bold text-[#ef8535]">
              <span>NATURAL DYES • 100% BREATHABLE FIBERS</span>
            </div>
          </div>

        </div>

        {/* Candolim Goa Origin Quote Banner */}
        <div className="rounded-2xl bg-[#f4ede2] border border-[#ef8535]/30 p-8 sm:p-12 flex flex-col lg:flex-row items-center gap-8">
          <div className="lg:w-1/3">
            <div className="relative rounded-xl overflow-hidden canva-box-shadow border border-[#763c00]">
              <img 
                src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80" 
                alt="Artisan weaving Indian textiles for Orange Oregano"
                className="w-full h-64 object-cover" 
              />
              <div className="absolute bottom-2 left-2 px-2.5 py-1 bg-[#ef8535] text-[#f9f7dc] text-[10px] uppercase font-bold rounded">
                Handloom Loom • India
              </div>
            </div>
          </div>

          <div className="lg:w-2/3">
            <div className="flex items-center gap-2 text-[#ef8535] text-xs font-bold uppercase tracking-widest mb-2">
              <Sun size={16} />
              <span>The Candolim Story</span>
            </div>
            <blockquote className="font-display text-2xl sm:text-3xl text-[#763c00] leading-snug">
              “We don’t create trends. We weave heirlooms meant to be worn barefoot on Goa’s sand and cherished for decades to come.”
            </blockquote>
            <p className="mt-4 text-sm text-[#554030]">
              Founded at Marquis Vaddo in Candolim, Orange Oregano brings the relaxed, soulful rhythm of coastal Goa into thoughtfully tailored contemporary garments.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
