import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, Heart, GitCompare, ArrowRight, Minus, Plus, ShoppingBag } from 'lucide-react';
import { Product } from '../types';
import { formatCurrency } from '../utils';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  isWishlisted: boolean;
  isInCompare: boolean;
  onClose: () => void;
  onWishlistToggle: (productId: string) => void;
  onCompareToggle: (productId: string) => void;
  onAddToCart: (productId: string, size?: string, color?: string, qty?: number) => Promise<void>;
  onNavigate: (path: string) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  isOpen,
  isWishlisted,
  isInCompare,
  onClose,
  onWishlistToggle,
  onCompareToggle,
  onAddToCart,
  onNavigate
}) => {
  const [activeImage, setActiveImage] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    if (product) {
      setActiveImage(product.images[0]);
      setSelectedColor(product.colors[0] || '');
      setSelectedSize(product.sizes && product.sizes.length > 0 ? product.sizes[0] : '');
      setQuantity(1);
    }
  }, [product]);

  // Handle escape press to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!product) return null;

  const handleAddToCart = async () => {
    setIsAdding(true);
    await onAddToCart(product.id, selectedSize || undefined, selectedColor || undefined, quantity);
    setIsAdding(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 40 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative z-10 flex w-full max-w-4xl flex-col md:flex-row overflow-hidden rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] shadow-xl max-h-[90vh] overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-black/40 text-[#111827] dark:text-[#F9FAFB] backdrop-blur-xs hover:bg-gray-100 dark:hover:bg-[#242424] transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="h-4.5 w-4.5" />
            </button>

            {/* Left Column: Image Area */}
            <div className="w-full md:w-1/2 p-6 flex flex-col justify-center border-b md:border-b-0 md:border-r border-gray-150 dark:border-gray-800 bg-gray-50 dark:bg-[#242424]/45">
              <div className="relative aspect-square overflow-hidden rounded-xl bg-white dark:bg-[#1a1a1a] border border-gray-100 dark:border-gray-800/40">
                <img
                  src={activeImage}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Thumbnails strip */}
              {product.images.length > 1 && (
                <div className="mt-4 flex gap-2.5 overflow-x-auto pb-1 justify-center">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(img)}
                      className={`relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg border bg-white dark:bg-[#1a1a1a] cursor-pointer ${
                        activeImage === img 
                          ? 'border-indigo-500 ring-2 ring-indigo-500/20' 
                          : 'border-gray-200 dark:border-gray-800 hover:border-gray-300'
                      }`}
                    >
                      <img src={img} alt={`Thumb ${i+1}`} className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Information Panel */}
            <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
              <div>
                {/* Brand */}
                <span className="text-3xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                  {product.brand}
                </span>

                {/* Name */}
                <h2 id="modal-title" className="mt-1.5 text-xl font-bold leading-snug text-[#111827] dark:text-[#F9FAFB]">
                  {product.name}
                </h2>

                {/* Rating */}
                <div className="mt-2.5 flex items-center gap-1.5">
                  <div className="flex items-center text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-amber-400' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-[#111827] dark:text-[#F9FAFB]">{product.rating.toFixed(1)}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">({product.reviewCount} reviews)</span>
                </div>

                {/* Price tags */}
                <div className="mt-4 flex items-baseline gap-3">
                  <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                    {formatCurrency(product.price)}
                  </span>
                  {product.originalPrice && (
                    <>
                      <span className="text-sm text-gray-400 dark:text-gray-500 line-through">
                        {formatCurrency(product.originalPrice)}
                      </span>
                      <span className="rounded-md bg-rose-50 dark:bg-rose-950/20 px-2 py-0.5 text-xs font-semibold text-rose-500">
                        {product.discount}% OFF
                      </span>
                    </>
                  )}
                </div>

                {/* Short desc */}
                <p className="mt-4 text-xs leading-relaxed text-[#6B7280] dark:text-[#9CA3AF]">
                  {product.description}
                </p>

                {/* Color swatches */}
                {product.colors.length > 0 && (
                  <div className="mt-5">
                    <span className="text-3xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                      Color Variant:
                    </span>
                    <div className="mt-2 flex gap-2">
                      {product.colors.map((hex) => (
                        <button
                          key={hex}
                          onClick={() => setSelectedColor(hex)}
                          className={`relative h-7 w-7 rounded-full border border-black/10 dark:border-white/10 shadow-3xs cursor-pointer ${
                            selectedColor === hex 
                              ? 'ring-2 ring-indigo-500 ring-offset-2 dark:ring-offset-[#1a1a1a]' 
                              : ''
                          }`}
                          style={{ backgroundColor: hex }}
                          title={hex}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Sizes selector */}
                {product.sizes && product.sizes.length > 0 && (
                  <div className="mt-4">
                    <span className="text-3xs font-semibold uppercase tracking-widest text-[#9CA3AF]">
                      Select Size:
                    </span>
                    <div className="mt-2 flex gap-1.5">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`h-8 min-w-10 rounded-lg border text-xs font-semibold uppercase transition-all cursor-pointer ${
                            selectedSize === size
                              ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400'
                              : 'border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-500'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Qty and Warnings */}
                {product.inStock && (
                  <div className="mt-5 flex items-center gap-4">
                    <span className="text-3xs font-semibold uppercase tracking-widest text-[#9CA3AF]">
                      Quantity:
                    </span>
                    <div className="flex items-center border border-gray-200 dark:border-gray-800 rounded-xl bg-gray-50 dark:bg-[#242424] h-9">
                      <button
                        onClick={() => setQuantity(q => Math.max(1, q - 1))}
                        className="h-full px-3 text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#111827] dark:hover:text-[#F9FAFB] focus:outline-hidden disabled:opacity-30 cursor-pointer"
                        disabled={quantity <= 1}
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-8 text-center text-xs font-semibold text-gray-800 dark:text-gray-200">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(q => Math.min(product.stockCount, q + 1))}
                        className="h-full px-3 text-gray-400 hover:text-[#111827] dark:hover:text-[#F9FAFB] focus:outline-hidden disabled:opacity-30 cursor-pointer"
                        disabled={quantity >= product.stockCount}
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Action and bottom triggers */}
              <div className="mt-6 pt-4 border-t border-gray-150 dark:border-gray-800 flex flex-col gap-3">
                <div className="flex gap-2">
                  <button
                    onClick={handleAddToCart}
                    disabled={!product.inStock || isAdding}
                    className="flex-1 flex gap-2 items-center justify-center rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-200 text-white py-3 px-4 text-xs font-semibold shadow-md hover:scale-101 active:scale-99 transition-all cursor-pointer"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    {product.inStock ? 'Add to Shopping Cart' : 'Out of Stock'}
                  </button>

                  <button
                    onClick={() => onWishlistToggle(product.id)}
                    className={`flex h-11 w-11 items-center justify-center rounded-xl border transition-colors cursor-pointer ${
                      isWishlisted
                        ? 'border-rose-200 bg-rose-50 dark:bg-rose-950/20 text-rose-500'
                        : 'border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-[#242424] text-gray-400'
                    }`}
                    aria-label="Add to wishlist"
                    title="Add to Wishlist"
                  >
                    <Heart className="h-4.5 w-4.5 fill-current" />
                  </button>

                  <button
                    onClick={() => onCompareToggle(product.id)}
                    className={`flex h-11 w-11 items-center justify-center rounded-xl border transition-colors cursor-pointer ${
                      isInCompare
                        ? 'border-indigo-200 bg-indigo-50 dark:bg-indigo-950/20 text-indigo-500'
                        : 'border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-[#242424] text-gray-400'
                    }`}
                    aria-label="Add to compare"
                    title="Add to Compare"
                  >
                    <GitCompare className="h-4.5 w-4.5" />
                  </button>
                </div>

                <button
                  onClick={() => {
                    onClose();
                    onNavigate(`/product/${product.id}`);
                  }}
                  className="flex items-center justify-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors py-1 cursor-pointer"
                >
                  View Full Product Details
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
