import React, { useState } from 'react';
import { Instagram, ArrowUpRight, Sparkles, Check } from 'lucide-react';

export const Lookbook: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const lookbookItems = [
    {
      img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=700&q=80',
      caption: 'Golden hour in Candolim with our Terracotta Co-ord Set',
      tag: '#OrangeOreganoGoa'
    },
    {
      img: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=700&q=80',
      caption: 'The European Flax Resort Shirt catching the Mandovi breeze',
      tag: '#SlowLivingGoa'
    },
    {
      img: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=700&q=80',
      caption: 'Chanderi gossamer overlay over vintage brass accessories',
      tag: '#IndigenousCraft'
    },
    {
      img: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=700&q=80',
      caption: '16-stage natural resist Ajrakh hand-block in Dhamadka',
      tag: '#KutchTextiles'
    },
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section id="lookbook" className="py-20 lg:py-28 bg-[#FFFDF9] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs uppercase font-extrabold tracking-widest text-[#ef8535] mb-2">
              <Instagram size={14} />
              <span>@orange.oregano On Instagram</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl text-[#763c00] tracking-tight">
              Wear. Live. Breathe.
            </h2>
            <p className="text-sm text-[#554030] mt-1 max-w-xl">
              Moments captured by our community living slowly in Goa, Rajasthan, and beyond. Tag <strong>@orange.oregano</strong> to be featured.
            </p>
          </div>

          <a
            href="https://instagram.com/orange.oregano"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#f9f7dc] text-[#763c00] border-2 border-[#763c00] rounded-full font-bold text-xs uppercase tracking-wider canva-box-shadow canva-box-shadow-hover hover:text-[#ef8535] transition-all self-start md:self-auto"
          >
            <Instagram size={16} />
            <span>Follow @orange.oregano</span>
            <ArrowUpRight size={14} />
          </a>
        </div>

        {/* Lookbook Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {lookbookItems.map((item, idx) => (
            <div
              key={idx}
              className="group relative rounded-2xl overflow-hidden aspect-[3/4] bg-[#f4ede2] border border-[#ef8535]/30 canva-box-shadow canva-box-shadow-hover"
            >
              <img
                src={item.img}
                alt={item.caption}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#763c00]/90 via-[#763c00]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end text-[#f9f7dc]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#ef8535]">
                  {item.tag}
                </span>
                <p className="text-xs font-medium mt-1 leading-snug">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter / Circle Banner */}
        <div className="mt-16 rounded-3xl bg-[#ef8535] text-[#f9f7dc] p-8 sm:p-12 border-2 border-[#763c00] canva-box-shadow relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <span className="inline-flex items-center gap-1.5 text-xs uppercase font-extrabold tracking-widest text-[#f9f7dc] bg-[#763c00]/30 px-3 py-1 rounded-full mb-3">
              <Sparkles size={13} />
              <span>Join The Circle</span>
            </span>
            <h3 className="font-display text-3xl sm:text-4xl text-[#f9f7dc] canva-shadow">
              Receive 10% Off Your First Handcrafted Piece
            </h3>
            <p className="text-xs sm:text-sm text-[#f9f7dc]/90 mt-2 max-w-lg mx-auto">
              Subscribe for invitations to secret courtyard sales at Candolim, new limited weaver drops, and stories of Indian craft traditions.
            </p>

            {subscribed ? (
              <div className="mt-6 p-4 bg-[#f9f7dc] text-[#763c00] rounded-2xl border border-[#763c00] max-w-md mx-auto flex items-center justify-center gap-2 font-bold text-xs uppercase">
                <Check size={16} className="text-green-600" />
                <span>Welcome to Orange Oregano! Use code <strong>OREGANO10</strong> at checkout.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 rounded-xl bg-[#FFFDF9] text-[#763c00] text-xs font-medium placeholder:text-gray-400 focus:outline-none border-2 border-transparent focus:border-[#763c00]"
                />
                <button
                  type="submit"
                  className="py-3 px-6 bg-[#763c00] text-[#f9f7dc] text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#5a2e00] transition-colors"
                >
                  Join Circle
                </button>
              </form>
            )}

            <span className="block text-[10px] text-[#f9f7dc]/70 mt-3">
              We respect your peace. No spam, only conscious stories.
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
