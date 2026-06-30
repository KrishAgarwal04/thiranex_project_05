import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, GitCompare, Check, AlertCircle, Sparkles, ChevronUp, ChevronDown } from 'lucide-react';
import { Product } from '../types';
import { formatCurrency } from '../utils';

interface CompareDrawerProps {
  compareList: string[];
  products: Product[];
  onRemove: (id: string) => void;
  onClear: () => void;
  onNavigate: (path: string) => void;
}

export const CompareDrawer: React.FC<CompareDrawerProps> = ({
  compareList,
  products,
  onRemove,
  onClear,
  onNavigate
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showFullModal, setShowFullModal] = useState(false);

  if (compareList.length === 0) return null;

  const compareProducts = compareList
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is Product => !!p);

  // Specifications compiled keys
  const allSpecKeys = Array.from(
    new Set(compareProducts.flatMap((p) => Object.keys(p.specifications)))
  );

  // Find best price (the minimum price in the compare list)
  const prices = compareProducts.map((p) => p.price);
  const minPrice = Math.min(...prices);

  // Find best rating (the maximum rating in the compare list)
  const ratings = compareProducts.map((p) => p.rating);
  const maxRating = Math.max(...ratings);

  return (
    <>
      {/* Mini Bottom Sticky Drawer bar wrapper */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#1a1a1a]/95 border-t border-gray-150 dark:border-gray-800 backdrop-blur-md shadow-xl px-4 py-3 pb-safe animate-slideUp">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400">
              <GitCompare className="h-4 w-4 animate-pulse" />
            </div>
            <div>
              <span className="text-xs font-bold text-gray-900 dark:text-white">
                Compare Products ({compareList.length}/3)
              </span>
              <p className="hidden sm:block text-3xs text-gray-400 dark:text-gray-500">
                Compare prices, reviews, specifications side-by-side.
              </p>
            </div>
          </div>

          {/* Cards preview thumbnail strip */}
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {compareProducts.map((p) => (
                <div key={p.id} className="relative group">
                  <img
                    src={p.images[0]}
                    alt={p.name}
                    className="h-10 w-10 rounded-full border-2 border-white dark:border-[#1a1a1a] bg-white object-cover shadow-xs"
                  />
                  <button
                    onClick={() => onRemove(p.id)}
                    className="absolute -top-1 -right-1 hidden group-hover:flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-white shadow-3xs cursor-pointer"
                    aria-label="Remove item from compare"
                  >
                    <X className="h-2.5 w-2.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setShowFullModal(true)}
                disabled={compareList.length < 1}
                className="rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-100 disabled:text-gray-400 px-4 py-2 text-2xs font-semibold text-white shadow-sm transition-all focus:outline-hidden cursor-pointer"
              >
                Compare Specs
              </button>
              <button
                onClick={onClear}
                className="text-2xs font-semibold text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 py-2 px-1 cursor-pointer"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Comparisons Full Spec Table Modal */}
      <AnimatePresence>
        {showFullModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFullModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="relative z-10 flex w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-gray-150 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] shadow-2xl max-h-[85vh]"
            >
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 p-5 bg-gray-50 dark:bg-[#242424]/40">
                <div className="flex items-center gap-2">
                  <GitCompare className="h-5 w-5 text-indigo-500" />
                  <h2 className="text-md font-bold text-gray-900 dark:text-white">
                    Product Specification Matrix Compare
                  </h2>
                </div>
                <button
                  onClick={() => setShowFullModal(false)}
                  className="rounded-full p-1.5 text-gray-400 hover:bg-gray-200 dark:hover:bg-[#242424] cursor-pointer"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              {/* Table wrapper Container scrollable */}
              <div className="flex-1 overflow-x-auto p-5">
                <table className="w-full border-collapse text-left text-xs">
                  <thead>
                    <tr>
                      <th className="pin-l border-b border-gray-150 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] pb-4 font-bold text-gray-400 w-1/4">
                        Attributes Comparison
                      </th>
                      {compareProducts.map((p) => (
                        <th
                          key={p.id}
                          className="border-b border-gray-150 dark:border-gray-800 pb-4 font-bold text-[#111827] dark:text-[#F9FAFB] w-1/4"
                        >
                          <div className="flex flex-col gap-2 pr-4">
                            <img
                              src={p.images[0]}
                              alt=""
                              className="h-16 w-16 rounded-xl object-cover border border-gray-100 dark:border-gray-800"
                            />
                            <h3 className="line-clamp-2 text-xs font-semibold leading-tight hover:text-indigo-600 cursor-pointer" onClick={() => { setShowFullModal(false); onNavigate(`/product/${p.id}`); }}>
                              {p.name}
                            </h3>
                            <span className="text-3xs tracking-widest uppercase text-[#9CA3AF]">
                              {p.brand}
                            </span>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {/* Price Row (Highlights lowest price) */}
                    <tr className="hover:bg-gray-50/55 dark:hover:bg-gray-800/10">
                      <td className="border-b border-gray-150 dark:border-gray-800 py-3 font-semibold text-gray-500 dark:text-gray-400">
                        Price Point
                      </td>
                      {compareProducts.map((p) => {
                        const isBestValue = p.price === minPrice && compareProducts.length > 1;
                        return (
                          <td
                            key={p.id}
                            className={`border-b border-gray-150 dark:border-gray-800 py-3 font-bold ${
                              isBestValue 
                                ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 rounded-lg px-2 shadow-3xs' 
                                : 'text-[#111827] dark:text-[#F9FAFB]'
                            }`}
                          >
                            <div className="flex items-center gap-1.5">
                              {formatCurrency(p.price)}
                              {isBestValue && (
                                <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-400 px-1.5 py-0.5 text-3xs font-extrabold uppercase">
                                  <Sparkles className="h-2 w-2" /> Best Deal
                                </span>
                              )}
                            </div>
                          </td>
                        );
                      })}
                    </tr>

                    {/* Ratings Row (Highlights highest review score) */}
                    <tr className="hover:bg-gray-50/55 dark:hover:bg-gray-800/10">
                      <td className="border-b border-gray-150 dark:border-gray-800 py-3 font-semibold text-gray-500 dark:text-gray-400">
                        Ratings & Score
                      </td>
                      {compareProducts.map((p) => {
                        const isBestRating = p.rating === maxRating && compareProducts.length > 1;
                        return (
                          <td
                            key={p.id}
                            className={`border-b border-gray-150 dark:border-gray-800 py-3 font-medium ${
                              isBestRating ? 'text-[#111827] dark:text-[#F9FAFB]' : 'text-gray-800 dark:text-gray-300'
                            }`}
                          >
                            <div className="flex items-center gap-1">
                              <span className="text-amber-400 text-xs">★</span>
                              <span className="font-semibold">{p.rating}</span>
                              <span className="text-3xs text-gray-400 dark:text-gray-500 block">
                                ({p.reviewCount} reviews)
                              </span>
                            </div>
                          </td>
                        );
                      })}
                    </tr>

                    {/* Category Row */}
                    <tr className="hover:bg-gray-50/55 dark:hover:bg-gray-800/10">
                      <td className="border-b border-gray-150 dark:border-gray-800 py-3 font-semibold text-gray-500 dark:text-gray-400">
                        Category Classification
                      </td>
                      {compareProducts.map((p) => (
                        <td key={p.id} className="border-b border-gray-150 dark:border-gray-800 py-3 text-gray-800 dark:text-gray-300 font-medium capitalize">
                          {p.category} › {p.subcategory}
                        </td>
                      ))}
                    </tr>

                    {/* Stock Status */}
                    <tr className="hover:bg-gray-50/55 dark:hover:bg-gray-800/10">
                      <td className="border-b border-gray-150 dark:border-gray-800 py-3 font-semibold text-gray-500 dark:text-gray-400">
                        Inventory Availability
                      </td>
                      {compareProducts.map((p) => (
                        <td key={p.id} className="border-b border-gray-150 dark:border-gray-800 py-3 font-semibold">
                          {p.inStock ? (
                            <span className="text-emerald-500 flex items-center gap-1">
                              <Check className="h-3.5 w-3.5" /> In Stock ({p.stockCount} left)
                            </span>
                          ) : (
                            <span className="text-rose-500 flex items-center gap-1">
                              <AlertCircle className="h-3.5 w-3.5" /> Out of stock
                            </span>
                          )}
                        </td>
                      ))}
                    </tr>

                    {/* Shipping Row */}
                    <tr className="hover:bg-gray-50/55 dark:hover:bg-gray-800/10">
                      <td className="border-b border-gray-150 dark:border-gray-800 py-3 font-semibold text-gray-500 dark:text-gray-400">
                        Shipping Delivery
                      </td>
                      {compareProducts.map((p) => (
                        <td key={p.id} className="border-b border-gray-150 dark:border-gray-800 py-3 text-gray-800 dark:text-gray-300 font-medium capitalize">
                          {p.shipping === 'free' ? '🚚 Free Delivery' : '📦 Standard shipping'}
                        </td>
                      ))}
                    </tr>

                    {/* Return Policy */}
                    <tr className="hover:bg-gray-50/55 dark:hover:bg-gray-800/10">
                      <td className="border-b border-gray-150 dark:border-gray-800 py-3 font-semibold text-gray-500 dark:text-gray-400">
                        Return Policy
                      </td>
                      {compareProducts.map((p) => (
                        <td key={p.id} className="border-b border-gray-150 dark:border-gray-800 py-3 text-gray-800 dark:text-gray-300 font-medium">
                          {p.returnPolicy}
                        </td>
                      ))}
                    </tr>

                    {/* Warranty Policy */}
                    <tr className="hover:bg-gray-50/55 dark:hover:bg-gray-800/10">
                      <td className="border-b border-gray-150 dark:border-gray-800 py-3 font-semibold text-gray-500 dark:text-gray-400">
                        Warranty Protection
                      </td>
                      {compareProducts.map((p) => (
                        <td key={p.id} className="border-b border-gray-150 dark:border-gray-800 py-3 text-gray-800 dark:text-gray-300 font-medium">
                          {p.warranty}
                        </td>
                      ))}
                    </tr>

                    {/* Specifications compiled list */}
                    {allSpecKeys.map((key) => (
                      <tr key={key} className="hover:bg-gray-50/55 dark:hover:bg-gray-800/10">
                        <td className="border-b border-gray-150 dark:border-gray-800 py-3 font-semibold text-gray-500 dark:text-gray-400 capitalize">
                          {key}
                        </td>
                        {compareProducts.map((p) => (
                          <td key={p.id} className="border-b border-gray-150 dark:border-gray-800 py-3 text-gray-800 dark:text-gray-300 font-medium">
                            {p.specifications[key as string] || <span className="text-gray-400 dark:text-gray-600">—</span>}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Action Buttons to Shop/Detail */}
              <div className="flex justify-end gap-3 border-t border-gray-100 dark:border-gray-800 p-4 bg-gray-50 dark:bg-[#242424]/40">
                <button
                  onClick={() => setShowFullModal(false)}
                  className="rounded-xl border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-[#242424] px-5 py-2.5 text-xs font-semibold text-gray-700 dark:text-gray-300 transition-colors cursor-pointer"
                >
                  Dismiss Comparison
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
