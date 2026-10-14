import React, { useState, useMemo } from 'react';
import { Product, Category } from '../types';
import { ProductCard } from './ProductCard';
import { SlidersHorizontal, Sparkles } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  activeCategory: Category;
  onSelectCategory: (category: Category) => void;
  searchQuery: string;
  onClearSearch: () => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, size: string, color: { name: string; hex: string }) => void;
  wishlist: string[];
  onToggleWishlist: (productId: string) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onClearSearch,
  onQuickView,
  onAddToCart,
  wishlist,
  onToggleWishlist,
}) => {
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  const categories: { id: Category; label: string; badge?: string }[] = [
    { id: 'all', label: 'All Artifacts' },
    { id: 'women', label: 'Women', badge: 'Wear' },
    { id: 'men', label: 'Men', badge: 'Style' },
    { id: 'accessories', label: 'Accessories', badge: 'Inspire' },
  ];

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (activeCategory !== 'all' && p.category !== activeCategory) {
          return false;
        }
        // Search filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          return (
            p.name.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q) ||
            p.craftPillar.toLowerCase().includes(q) ||
            p.fabric.toLowerCase().includes(q) ||
            p.origin.toLowerCase().includes(q)
          );
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        // Default: featured first
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [products, activeCategory, searchQuery, sortBy]);

  return (
    <section id="catalog" className="py-20 bg-[#FFFDF9] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-[#ef8535]/20 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs uppercase font-extrabold tracking-widest text-[#ef8535] mb-2">
              <Sparkles size={14} />
              <span>Candolim Atelier Catalog</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#763c00] tracking-tight">
              Handcrafted Collection
            </h2>
            <p className="text-sm text-[#554030] mt-1">
              Showing {filteredProducts.length} pieces woven with slow, indigenous care.
            </p>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-[#763c00]/70 flex items-center gap-1 font-medium">
              <SlidersHorizontal size={14} />
              Sort by:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs font-semibold bg-[#f4ede2]/60 border border-[#ef8535]/30 rounded-lg px-3 py-2 text-[#763c00] focus:outline-none focus:border-[#ef8535]"
            >
              <option value="featured">Featured / Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Category Pills & Search Indicator */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                    isSelected
                      ? 'bg-[#ef8535] text-[#f9f7dc] canva-box-shadow'
                      : 'bg-[#f4ede2]/80 text-[#763c00] hover:bg-[#ef8535]/20 border border-[#ef8535]/20'
                  }`}
                >
                  <span>{cat.label}</span>
                  {cat.badge && (
                    <span className={`text-[10px] uppercase px-2 py-0.5 rounded-full font-bold ${
                      isSelected ? 'bg-[#763c00] text-[#f9f7dc]' : 'bg-[#ef8535]/20 text-[#763c00]'
                    }`}>
                      {cat.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {searchQuery && (
            <div className="flex items-center gap-2 bg-[#ef8535]/15 border border-[#ef8535]/40 px-3 py-1.5 rounded-lg text-xs text-[#763c00]">
              <span>Search: <strong>"{searchQuery}"</strong></span>
              <button 
                onClick={onClearSearch}
                className="ml-2 font-bold hover:text-[#ef8535] underline"
              >
                Clear
              </button>
            </div>
          )}
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={onQuickView}
                onAddToCart={onAddToCart}
                isWishlisted={wishlist.includes(product.id)}
                onToggleWishlist={onToggleWishlist}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-[#f9f7dc]/40 rounded-3xl border border-dashed border-[#ef8535]/40">
            <h3 className="font-display text-2xl text-[#763c00]">No pieces found</h3>
            <p className="text-sm text-[#554030] mt-2">
              Try exploring a different category or clearing your search term.
            </p>
            <button
              onClick={() => {
                onSelectCategory('all');
                onClearSearch();
              }}
              className="mt-6 px-6 py-2.5 bg-[#ef8535] text-[#f9f7dc] font-bold text-xs uppercase tracking-wider rounded-full canva-box-shadow"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
