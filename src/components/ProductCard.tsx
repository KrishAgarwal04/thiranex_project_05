import React, { useState } from 'react';
import { Heart, Plus, GitCompare, Eye, Check, Loader2 } from 'lucide-react';
import { Product } from '../types';
import { formatCurrency } from '../utils';
import { motion, AnimatePresence } from 'motion/react';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  isInCompare: boolean;
  onWishlistToggle: (productId: string) => void;
  onCompareToggle: (productId: string) => void;
  onAddToCart: (productId: string, size?: string, color?: string) => Promise<void>;
  onQuickView: (product: Product) => void;
  onNavigate: (path: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  isInCompare,
  onWishlistToggle,
  onCompareToggle,
  onAddToCart,
  onQuickView,
  onNavigate
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!product.inStock) return;
    
    setIsAdding(true);
    // Find first available size/color if they exist to pass as default
    const color = product.colors.length > 0 ? product.colors[0] : undefined;
    const size = product.sizes && product.sizes.length > 0 ? product.sizes[0] : undefined;
    
    await onAddToCart(product.id, size, color);
    setIsAdding(false);
    setJustAdded(true);
    
    setTimeout(() => {
      setJustAdded(false);
    }, 1500);
  };

  const getBadgeColor = () => {
    switch (product.badge) {
      case 'Sale':
        return 'bg-rose-500 text-white';
      case 'New':
        return 'bg-emerald-500 text-white';
      case 'Trending':
        return 'bg-amber-500 text-white';
      case 'Best Seller':
        return 'bg-indigo-600 text-white';
      default:
        return 'hidden';
    }
  };

  return (
    <motion.div
      layoutId={`card-container-${product.id}`}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white dark:bg-[#1a1a1a] dark:border-gray-800/60 shadow-sm transition-shadow duration-300 hover:shadow-lg focus-within:ring-2 focus-within:ring-indigo-500/50 cursor-pointer"
      onClick={() => onNavigate(`/product/${product.id}`)}
      id={`prod-card-${product.id}`}
    >
      {/* Target Image Port */}
      <div className="relative aspect-square w-full overflow-hidden bg-gray-50 dark:bg-[#242424]">
        {/* Badge */}
        {product.badge && (
          <span className={`absolute top-3 left-3 z-10 rounded-full px-2.5 py-0.5 text-2xs font-semibold uppercase tracking-wider ${getBadgeColor()}`}>
            {product.badge}
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onWishlistToggle(product.id);
          }}
          className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 dark:bg-black/40 shadow-sm backdrop-blur-sm border border-gray-100 dark:border-white/10 hover:bg-white dark:hover:bg-black/60 transition-transform active:scale-110 cursor-pointer"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <motion.div
            animate={isWishlisted ? { scale: [1, 1.35, 1, 1.2, 1] } : { scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <Heart
              className={`h-4.5 w-4.5 transition-colors ${
                isWishlisted 
                  ? 'fill-rose-500 text-rose-500' 
                  : 'text-gray-400 dark:text-gray-300 hover:text-rose-500'
              }`}
            />
          </motion.div>
        </button>

        {/* Product Image */}
        <img
          loading="lazy"
          decoding="async"
          src={product.images[0]}
          alt={product.name}
          className={`h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-108 ${
            !product.inStock ? 'grayscale opacity-60' : ''
          }`}
          id={`img-flight-${product.id}`}
        />

        {/* Out of Stock Overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-3xs">
            <span className="rounded-full bg-black/80 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-white">
              Out of Stock
            </span>
          </div>
        )}

        {/* Quick View Overlay (Displays on Hover on Desktop) */}
        {product.inStock && (
          <div className="absolute inset-0 z-5 flex items-center justify-center bg-black/25 opacity-0 transition-opacity duration-300 group-hover:opacity-100 max-sm:hidden">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onQuickView(product);
              }}
              className="flex items-center gap-1.5 rounded-full bg-white px-4.5 py-2.5 text-xs font-semibold text-gray-900 border border-gray-100 hover:bg-gray-50 hover:scale-105 active:scale-95 shadow-md transition-all cursor-pointer"
            >
              <Eye className="h-3.5 w-3.5 text-gray-500" />
              Quick View
            </button>
          </div>
        )}

        {/* Stock Urgency Overlay on mobile/tablet */}
        {product.inStock && product.stockCount <= 5 && (
          <div className="absolute bottom-2 left-2 z-10 rounded bg-rose-600/90 dark:bg-rose-500/95 px-2 py-0.5 text-3xs font-semibold uppercase text-white animate-pulse">
            Only {product.stockCount} Left!
          </div>
        )}
      </div>

      {/* Card Info details */}
      <div className="flex flex-1 flex-col p-4">
        {/* Brand */}
        <span className="text-3xs font-semibold uppercase tracking-widest text-[#6B7280] dark:text-[#9CA3AF]">
          {product.brand}
        </span>

        {/* Product Title */}
        <h3 className="mt-1 line-clamp-2 text-sm font-semibold text-[#111827] dark:text-[#F9FAFB] hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
          {product.name}
        </h3>

        {/* Ratings block */}
        <div className="mt-2 flex items-center gap-1.5">
          <div className="flex items-center text-amber-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className="text-xs">
                {i < Math.floor(product.rating) ? '★' : '☆'}
              </span>
            ))}
          </div>
          <span className="text-3xs font-medium text-gray-500 dark:text-gray-400 mt-0.5">
            {product.rating.toFixed(1)} ({product.reviewCount.toLocaleString()})
          </span>
        </div>

        {/* Spacer before align pricing to button bottom */}
        <div className="mt-auto pt-4">
          {/* Price tags */}
          <div className="flex items-baseline gap-2">
            <span className="text-md font-bold text-indigo-600 dark:text-indigo-400">
              {formatCurrency(product.price)}
            </span>
            {product.originalPrice && (
              <>
                <span className="text-xs text-gray-400 dark:text-gray-500 line-through">
                  {formatCurrency(product.originalPrice)}
                </span>
                <span className="text-xs font-semibold text-rose-500">
                  {product.discount}% OFF
                </span>
              </>
            )}
          </div>

          {/* Actions button strip */}
          <div className="mt-3 flex gap-1.5">
            {/* Add to Cart button */}
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock || isAdding}
              className={`flex-1 flex items-center justify-center gap-1.5 rounded-xl py-2 px-3 text-xs font-semibold transition-all duration-200 cursor-pointer ${
                product.inStock
                  ? justAdded
                    ? 'bg-emerald-500 text-white shadow-emerald-200 dark:shadow-none'
                    : 'bg-[#111827] text-white hover:bg-indigo-600 dark:bg-[#242424] dark:hover:bg-indigo-600'
                  : 'bg-gray-100 dark:bg-[#1a1a1a] text-gray-400 dark:text-gray-500 cursor-not-allowed border dark:border-gray-800/40'
              }`}
            >
              {isAdding ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : justAdded ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  Added!
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" />
                  Add to Cart
                </>
              )}
            </button>

            {/* Compare Toggle Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onCompareToggle(product.id);
              }}
              className={`flex h-9 w-9 items-center justify-center rounded-xl border transition-all cursor-pointer ${
                isInCompare
                  ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400'
                  : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 hover:bg-gray-50 dark:hover:bg-[#242424]'
              }`}
              title="Compare Specifications"
              aria-label="Add to compare"
            >
              <GitCompare className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
