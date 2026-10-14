import React from 'react';
import { Eye, Plus, Star, Heart, Ban } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, size: string, color: { name: string; hex: string }) => void;
  isWishlisted?: boolean;
  onToggleWishlist?: (productId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  onAddToCart,
  isWishlisted = false,
  onToggleWishlist,
}) => {
  const isOutOfStock = product.inStock === false;

  return (
    <div className={`group rounded-2xl overflow-hidden bg-[#FFFDF9] border transition-all duration-300 canva-box-shadow flex flex-col justify-between ${
      isOutOfStock 
        ? 'border-gray-300 opacity-90' 
        : 'border-[#ef8535]/25 hover:-translate-y-1 hover:border-[#ef8535]'
    }`}>
      
      {/* Image Container with Badges */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#f4ede2]">
        <img
          src={product.images[0]}
          alt={product.name}
          className={`w-full h-full object-cover object-top transition-transform duration-700 ${
            isOutOfStock ? 'grayscale-[35%] opacity-85' : 'group-hover:scale-105'
          }`}
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {isOutOfStock ? (
            <span className="px-2.5 py-1 bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-md flex items-center gap-1">
              <Ban size={10} />
              <span>Sold Out</span>
            </span>
          ) : (
            product.tag && (
              <span className="px-2.5 py-1 bg-[#ef8535] text-[#f9f7dc] text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm">
                {product.tag}
              </span>
            )
          )}

          <span className="px-2.5 py-0.5 bg-[#f9f7dc]/90 text-[#763c00] text-[10px] font-semibold rounded-full backdrop-blur-sm">
            {product.craftPillar}
          </span>
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist?.(product.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full transition-colors z-10 ${
            isWishlisted
              ? 'bg-[#ef8535] text-[#f9f7dc]'
              : 'bg-[#f9f7dc]/80 text-[#763c00] hover:bg-[#ef8535] hover:text-[#f9f7dc]'
          }`}
          aria-label="Wishlist"
        >
          <Heart size={16} fill={isWishlisted ? 'currentColor' : 'none'} />
        </button>

        {/* Hover Action Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-[#763c00]/80 via-[#763c00]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
          <button
            onClick={() => onQuickView(product)}
            className="flex-1 py-2 px-3 bg-[#f9f7dc] text-[#763c00] text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 hover:bg-white transition-colors"
          >
            <Eye size={14} />
            <span>{isOutOfStock ? 'View Details' : 'Quick View'}</span>
          </button>
          
          {!isOutOfStock ? (
            <button
              onClick={() => onAddToCart(product, product.sizes[0], product.colors[0])}
              className="p-2 bg-[#ef8535] text-[#f9f7dc] rounded-lg hover:bg-[#d97123] transition-colors"
              title="Instant Add to Bag"
            >
              <Plus size={16} />
            </button>
          ) : (
            <span className="px-2.5 py-1.5 bg-gray-700/80 text-white text-[10px] font-bold uppercase rounded-lg">
              Sold Out
            </span>
          )}
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating */}
          <div className="flex items-center gap-1 mb-1.5">
            <div className="flex text-[#ef8535]">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                  className={i < Math.floor(product.rating) ? 'text-[#ef8535]' : 'text-gray-300'}
                />
              ))}
            </div>
            <span className="text-[11px] font-semibold text-[#763c00]/70 ml-1">
              ({product.reviewCount})
            </span>
          </div>

          {/* Product Name */}
          <h3 
            onClick={() => onQuickView(product)}
            className="font-display text-lg text-[#763c00] hover:text-[#ef8535] cursor-pointer transition-colors leading-snug line-clamp-1"
          >
            {product.name}
          </h3>

          <p className="text-xs text-[#554030]/80 mt-1 line-clamp-1">
            {product.subtitle}
          </p>
        </div>

        {/* Price & Color dots */}
        <div className="mt-4 pt-3 border-t border-[#ef8535]/15 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className={`font-bold text-base ${isOutOfStock ? 'text-gray-500' : 'text-[#763c00]'}`}>
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {/* Swatches */}
          <div className="flex items-center gap-1">
            {product.colors.map((color, idx) => (
              <span
                key={idx}
                className="w-3.5 h-3.5 rounded-full border border-white shadow-xs"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
