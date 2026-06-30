import React from 'react';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';
import { Heart, Share2, ShoppingCart, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface WishlistProps {
  wishlist: string[];
  products: Product[];
  compareList: string[];
  onWishlistToggle: (productId: string) => void;
  onCompareToggle: (productId: string) => void;
  onAddToCart: (productId: string, size?: string, color?: string) => Promise<void>;
  onQuickView: (product: Product) => void;
  onNavigate: (path: string) => void;
  onAddToast: (msg: string, type: 'success' | 'error' | 'info') => void;
}

export const Wishlist: React.FC<WishlistProps> = ({
  wishlist,
  products,
  compareList,
  onWishlistToggle,
  onCompareToggle,
  onAddToCart,
  onQuickView,
  onNavigate,
  onAddToast
}) => {
  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  // Handle sharing of wishlist items
  const handleShare = () => {
    try {
      const shareUrl = `${window.location.origin}/#shop?wishlist=${wishlist.join(',')}`;
      navigator.clipboard.writeText(shareUrl).then(() => {
        onAddToast('Wishlist sharing URL copied to clipboard!', 'success');
      }).catch(() => {
        onAddToast('Unable to copy share link automatically.', 'error');
      });
    } catch (_) {
      onAddToast('Clipboard permissions denied in this frame.', 'error');
    }
  };

  return (
    <div className="bg-[#FAFAFA] dark:bg-[#0D0D0D] transition-colors min-h-screen pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header Title block */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-901 dark:text-white">
              My Wishlist Saved Items
            </h1>
            <p className="text-xs text-gray-400 mt-1 dark:text-gray-500 font-normal">
              Keep track of items you love. They will be saved securely across browser sessions.
            </p>
          </div>

          {/* Share Wishlist button */}
          {wishlistedProducts.length > 0 && (
            <button
              onClick={handleShare}
              className="inline-flex gap-2 items-center justify-center rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] hover:bg-gray-50 dark:hover:bg-[#242424] text-xs font-semibold px-4 py-2.5 shadow-3xs cursor-pointer text-gray-700 dark:text-gray-300"
            >
              <Share2 className="h-4 w-4" />
              Share Wishlist Link
            </button>
          )}
        </div>

        {/* Display Grid of Wishlisted Items */}
        {wishlistedProducts.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            role="list"
          >
            <AnimatePresence mode="popLayout">
              {wishlistedProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, y: 30 }}
                  transition={{ duration: 0.3 }}
                  role="listitem"
                >
                  <ProductCard
                    product={product}
                    isWishlisted={true}
                    isInCompare={compareList.includes(product.id)}
                    onWishlistToggle={onWishlistToggle}
                    onCompareToggle={onCompareToggle}
                    onAddToCart={onAddToCart}
                    onQuickView={onQuickView}
                    onNavigate={onNavigate}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          /* Empty State */
          <div className="mt-12 flex flex-col items-center justify-center p-8 border border-dashed border-gray-200 dark:border-gray-800 rounded-3xl py-16 text-center bg-white dark:bg-[#1a1a1a]">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-50 dark:bg-rose-950/20 text-rose-500 mb-4 animate-pulse">
              <Heart className="h-7 w-7 fill-current" />
            </div>
            <h2 className="text-md font-bold text-gray-900 dark:text-white">Your wishlist is currently empty</h2>
            <p className="max-w-xs text-xs text-gray-400 dark:text-gray-500 leading-normal mt-1.5 font-normal">
              Browse our high-performance catalogs and save products you adore by clicking the heart button on cards.
            </p>
            <button
              onClick={() => onNavigate('/shop')}
              className="mt-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 text-xs font-semibold shadow-md active:scale-97 transition-all cursor-pointer"
            >
              Start Shopping Catalog
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
