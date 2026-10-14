import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Category } from '../types';

interface CategoriesProps {
  onSelectCategory: (category: Category) => void;
}

export const Categories: React.FC<CategoriesProps> = ({ onSelectCategory }) => {
  const categories = [
    {
      id: 'women' as Category,
      title: 'Women',
      canvaTag: 'Wear',
      subtitle: 'Flowing silhouettes, handwoven Chanderi capes & organic cotton co-ords',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80',
      count: '14 Styles',
      accentColor: 'bg-[#ef8535]',
    },
    {
      id: 'men' as Category,
      title: 'Men',
      canvaTag: 'Style',
      subtitle: 'Pre-washed resort flax linen shirts, breathable kurtas & relaxed twill trousers',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80',
      count: '11 Styles',
      accentColor: 'bg-[#763c00]',
    },
    {
      id: 'accessories' as Category,
      title: 'Accessories',
      canvaTag: 'Inspire',
      subtitle: '16-stage Ajrakh silk stoles, studio canvas totes & lost-wax botanical brass earrings',
      image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=900&q=80',
      count: '9 Pieces',
      accentColor: 'bg-[#304254]',
    },
  ];

  const handleCategoryClick = (category: Category) => {
    onSelectCategory(category);
    const catalogEl = document.getElementById('catalog');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 bg-[#ef8535] text-[#f9f7dc] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching Canva Draft */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs uppercase font-extrabold tracking-[0.25em] text-[#763c00] bg-[#f9f7dc] px-4 py-1.5 rounded-full inline-block mb-3">
            Shop the Collection
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#f9f7dc] canva-shadow tracking-tight">
            Wear. Style. Inspire.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#f9f7dc]/90">
            Thoughtfully organized into three foundational chapters for effortless conscious living.
          </p>
        </div>

        {/* 3 Large Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-[#f9f7dc] border-2 border-[#763c00] canva-box-shadow canva-box-shadow-hover flex flex-col justify-between"
            >
              {/* Image with Tag badge */}
              <div className="relative aspect-[4/5] overflow-hidden bg-[#f4ede2]">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="px-3 py-1 bg-[#ef8535] text-[#f9f7dc] text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">
                    {cat.canvaTag}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="px-2.5 py-1 bg-[#763c00]/80 text-[#f9f7dc] text-[11px] font-semibold rounded-full backdrop-blur-sm">
                    {cat.count}
                  </span>
                </div>
              </div>

              {/* Text Info */}
              <div className="p-6 text-[#763c00] flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-2xl sm:text-3xl text-[#763c00] group-hover:text-[#ef8535] transition-colors">
                      {cat.title}
                    </h3>
                    <div className="w-10 h-10 rounded-full bg-[#ef8535] text-[#f9f7dc] flex items-center justify-center transform group-hover:rotate-45 transition-transform duration-300">
                      <ArrowUpRight size={20} />
                    </div>
                  </div>
                  <p className="mt-2 text-xs sm:text-sm text-[#554030] leading-relaxed">
                    {cat.subtitle}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-[#763c00]/15 flex items-center justify-between text-xs font-bold text-[#ef8535] tracking-wider uppercase">
                  <span>Explore {cat.title}</span>
                  <span className="text-[#763c00]">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
