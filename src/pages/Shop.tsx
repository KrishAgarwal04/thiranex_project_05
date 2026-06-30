import React, { useState, useEffect, useMemo } from 'react';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';
import { SlidersHorizontal, Grid, List, Search, Star, Trash2, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { formatCurrency } from '../utils';

interface ShopProps {
  products: Product[];
  wishlist: string[];
  compareList: string[];
  onWishlistToggle: (productId: string) => void;
  onCompareToggle: (productId: string) => void;
  onAddToCart: (productId: string, size?: string, color?: string) => Promise<void>;
  onQuickView: (product: Product) => void;
  onNavigate: (path: string) => void;
  initialSearchQuery?: string;
  initialCategory?: string;
}

export const Shop: React.FC<ShopProps> = ({
  products,
  wishlist,
  compareList,
  onWishlistToggle,
  onCompareToggle,
  onAddToCart,
  onQuickView,
  onNavigate,
  initialSearchQuery = '',
  initialCategory = ''
}) => {
  // Filters state variables
  const [search, setSearch] = useState(initialSearchQuery);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialCategory ? [initialCategory] : []
  );
  const [maxPrice, setMaxPrice] = useState(25000);
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const [onlySale, setOnlySale] = useState(false);
  
  // Layout views state
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'rating' | 'priceAsc' | 'priceDesc' | 'alpha'>('rating');
  const [currentPage, setCurrentPage] = useState(1);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Sync state with incoming url query props
  useEffect(() => {
    setSearch(initialSearchQuery);
  }, [initialSearchQuery]);

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategories([initialCategory]);
    }
  }, [initialCategory]);

  // Unique categories list
  const allCategories = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.category)));
  }, [products]);

  // Max price limit from database
  const absoluteMaxPrice = useMemo(() => {
    if (products.length === 0) return 30000;
    return Math.max(...products.map((p) => p.price));
  }, [products]);

  useEffect(() => {
    setMaxPrice(absoluteMaxPrice);
  }, [absoluteMaxPrice]);

  // Clear All Filters Function
  const handleClearAllFilters = () => {
    setSearch('');
    setSelectedCategories([]);
    setMaxPrice(absoluteMaxPrice);
    setRatingFilter(null);
    setOnlySale(false);
    setCurrentPage(1);
    // Remove query search params
    onNavigate('/shop');
  };

  // Toggle categories selector helper
  const handleCategoryToggle = (cat: string) => {
    if (selectedCategories.includes(cat)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== cat));
    } else {
      setSelectedCategories([...selectedCategories, cat]);
    }
    setCurrentPage(1);
  };

  // RUN FILTERS PIPELINE
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Search text matching
        if (search.trim()) {
          const q = search.trim().toLowerCase();
          const matchesName = p.name.toLowerCase().includes(q);
          const matchesBrand = p.brand.toLowerCase().includes(q);
          const matchesSub = p.subcategory.toLowerCase().includes(q);
          if (!matchesName && !matchesBrand && !matchesSub) return false;
        }

        // Category matching
        if (selectedCategories.length > 0) {
          if (!selectedCategories.includes(p.category)) return false;
        }

        // Price limit matching
        if (p.price > maxPrice) return false;

        // Rating score minimum stars
        if (ratingFilter !== null) {
          if (p.rating < ratingFilter) return false;
        }

        // Only discounted promo sale items
        if (onlySale) {
          if (!p.isPromoDeal) return false;
        }

        return true;
      })
      .sort((a, b) => {
        // Sort switch cases
        if (sortBy === 'rating') {
          return b.rating - a.rating;
        }
        if (sortBy === 'priceAsc') {
          return a.price - b.price;
        }
        if (sortBy === 'priceDesc') {
          return b.price - a.price;
        }
        if (sortBy === 'alpha') {
          return a.name.localeCompare(b.name);
        }
        return 0;
      });
  }, [products, search, selectedCategories, maxPrice, ratingFilter, onlySale, sortBy]);

  // PAGINATION SUBDIVISIONS (12 items per page)
  const itemsPerPage = 12;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const paginatedProducts = useMemo(() => {
    const startIdx = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIdx, startIdx + itemsPerPage);
  }, [filteredProducts, currentPage]);

  // Fallback pagination limit boundary
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  return (
    <div className="bg-[#FAFAFA] dark:bg-[#0D0D0D] transition-colors min-h-screen pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Banner header title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              E-Commerce Product Catalog
            </h1>
            <p className="text-xs text-gray-400 mt-1">
              Explore high-contrast design specifications cards. ({filteredProducts.length} results matching)
            </p>
          </div>

          {/* Quick controls sorting and views settings */}
          <div className="flex items-center gap-3">
            {/* View selectors */}
            <div className="hidden sm:flex border border-gray-150 dark:border-gray-800 rounded-xl p-0.5 bg-white dark:bg-[#1a1a1a]">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg cursor-pointer ${
                  viewMode === 'grid' 
                    ? 'bg-gray-100 dark:bg-gray-800 text-indigo-600 dark:text-indigo-400' 
                    : 'text-gray-400 hover:text-gray-600'
                }`}
                title="Grid visual view"
                aria-label="Set grid view"
              >
                <Grid className="h-4.5 w-4.5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg cursor-pointer ${
                  viewMode === 'list' 
                    ? 'bg-gray-100 dark:bg-gray-800 text-indigo-600 dark:text-indigo-400' 
                    : 'text-gray-400 hover:text-gray-600'
                }`}
                title="Detailed row list view"
                aria-label="Set list view"
              >
                <List className="h-4.5 w-4.5" />
              </button>
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="rounded-xl border border-gray-155 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] text-xs font-semibold py-2 px-3 focus:outline-hidden text-gray-700 dark:text-gray-300"
            >
              <option value="rating">Sort: Top Rated ★</option>
              <option value="priceAsc">Sort: Price Low to High</option>
              <option value="priceDesc">Sort: Price High to Low</option>
              <option value="alpha">Sort: Alphabetical A-Z</option>
            </select>

            {/* Mobile filters toggler */}
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="lg:hidden flex items-center justify-center gap-1.5 border border-gray-150 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] rounded-xl px-4 py-2 text-xs font-semibold text-gray-750 dark:text-gray-350 cursor-pointer"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </button>
          </div>
        </div>

        {/* Catalog Splitted Layout Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* LEFT COLUMN: FILTERS ENGINE PANEL SIDEBAR (25%) */}
          <div className={`${showMobileFilters ? 'fixed inset-0 z-40 bg-black/60 backdrop-blur-xs flex items-end' : 'hidden lg:flex lg:flex-col'} lg:sticky lg:top-24 flex-col gap-6`}>
            
            <div 
              className={`w-full bg-white dark:bg-[#1a1a1a] border border-gray-150 dark:border-gray-800 rounded-t-3xl sm:rounded-2xl shadow-xl lg:shadow-3xs p-5 max-h-[85vh] overflow-y-auto lg:max-h-none flex flex-col gap-5 animate-slideUp lg:animate-none`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b pb-3 dark:border-gray-800">
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#111827] dark:text-[#F9FAFB] flex items-center gap-1.5">
                  <SlidersHorizontal className="h-4 w-4 text-indigo-500" /> Advanced Filters
                </span>
                {/* Clear triggers */}
                <button
                  onClick={handleClearAllFilters}
                  className="text-3xs font-extrabold text-rose-500 hover:text-rose-600 flex items-center gap-0.5 cursor-pointer"
                >
                  <Trash2 className="h-3 w-3" /> Clear All
                </button>
              </div>

              {/* Text Search keywords box */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="shopFilterSearch" className="text-3xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Search Keywords</label>
                <div className="relative rounded-xl border border-gray-155 dark:border-gray-800 bg-gray-50 dark:bg-[#242424] overflow-hidden">
                  <input
                    id="shopFilterSearch"
                    type="text"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setCurrentPage(1);
                    }}
                    placeholder="Search name, brand, etc..."
                    className="w-full bg-transparent py-2 pl-9 pr-3 text-xs focus:outline-hidden text-[#111827] dark:text-[#F9FAFB]"
                  />
                  <Search className="absolute left-3 top-3 h-3.5 w-3.5 text-gray-400" />
                </div>
              </div>

              {/* Dual price slider */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-3xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                  <span>Price Limit Cap</span>
                  <span className="font-extrabold text-indigo-600 dark:text-indigo-400 font-mono">{formatCurrency(maxPrice)}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={absoluteMaxPrice}
                  step={50}
                  value={maxPrice}
                  onChange={(e) => {
                    setMaxPrice(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="w-full accent-indigo-605 h-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg cursor-pointer appearance-none"
                />
                <div className="flex justify-between text-4xs font-bold text-gray-400">
                  <span>₹0</span>
                  <span>{formatCurrency(absoluteMaxPrice)}</span>
                </div>
              </div>

              {/* Multi selective categories */}
              <div className="flex flex-col gap-2">
                <span className="text-3xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest block">Product Category</span>
                <div className="flex flex-col gap-1.5 max-h-40 overflow-y-auto pr-1">
                  {allCategories.map((cat) => {
                    const isSelected = selectedCategories.includes(cat);
                    return (
                      <label
                        key={cat}
                        className="flex items-center gap-2.5 text-xs font-semibold text-gray-700 dark:text-gray-300 capitalize cursor-pointer select-none"
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleCategoryToggle(cat)}
                          className="rounded border-gray-320 text-indigo-600 focus:ring-indigo-500 h-4.5 w-4.5 cursor-pointer"
                        />
                        {cat}
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Click Star Ratings filtering */}
              <div className="flex flex-col gap-2">
                <span className="text-3xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest block">Minimum Stars rating</span>
                <div className="flex flex-col gap-1.5">
                  {[4.5, 4.0, 3.5].map((stars) => {
                    const isActive = ratingFilter === stars;
                    return (
                      <button
                        key={stars}
                        onClick={() => {
                          setRatingFilter(isActive ? null : stars);
                          setCurrentPage(1);
                        }}
                        className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-xl text-left border transition-all cursor-pointer ${
                          isActive
                            ? 'border-indigo-500 bg-indigo-50/40 dark:bg-indigo-950/20 text-indigo-700 dark:text-indigo-400 font-extrabold'
                            : 'border-transparent text-gray-600 dark:text-gray-450 hover:bg-gray-50 dark:hover:bg-[#242424]/40'
                        }`}
                      >
                        <span className="text-amber-400">★</span>
                        <span>{stars}+ Stars & Above</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* On Sale Deal Toggle checkbox */}
              <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-800 pt-3">
                <span className="text-xs font-bold text-gray-700 dark:text-gray-300">Promo Offers Only</span>
                <button
                  type="button"
                  onClick={() => {
                    setOnlySale(!onlySale);
                    setCurrentPage(1);
                  }}
                  className={`w-11 h-6 rounded-full transition-colors relative flex items-center cursor-pointer ${
                    onlySale ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-800'
                  }`}
                  role="switch"
                  aria-checked={onlySale}
                >
                  <span className={`h-4 w-4 rounded-full bg-white transition-all shadow-sm absolute ${
                    onlySale ? 'left-6' : 'left-1'
                  }`} />
                </button>
              </div>

              {/* Close Mobile sheet */}
              {showMobileFilters && (
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="rounded-xl bg-gray-950 text-white font-bold text-xs py-3 mt-2 text-center lg:hidden cursor-pointer"
                >
                  Close filter sheet
                </button>
              )}

            </div>
          </div>

          {/* RIGHT COLUMN: INTERACTIVE CATALOG PRODUCTS LIST GRID (75%) */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            
            {/* Display Products Lists */}
            {filteredProducts.length > 0 ? (
              <>
                <motion.div
                  layout
                  className={
                    viewMode === 'grid'
                      ? 'grid grid-cols-2 md:grid-cols-3 gap-6'
                      : 'flex flex-col gap-5'
                  }
                >
                  <AnimatePresence mode="popLayout">
                    {paginatedProducts.map((p) => {
                      if (viewMode === 'grid') {
                        return (
                          <motion.div
                            key={p.id}
                            layout
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ProductCard
                              product={p}
                              isWishlisted={wishlist.includes(p.id)}
                              isInCompare={compareList.includes(p.id)}
                              onWishlistToggle={onWishlistToggle}
                              onCompareToggle={onCompareToggle}
                              onAddToCart={onAddToCart}
                              onQuickView={onQuickView}
                              onNavigate={onNavigate}
                            />
                          </motion.div>
                        );
                      }

                      // Detailed row list mode
                      return (
                        <motion.div
                          key={p.id}
                          layout
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -15 }}
                          transition={{ duration: 0.3 }}
                          className="rounded-2xl border border-gray-150 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] shadow-3xs p-4 flex flex-col sm:flex-row items-center gap-5 group"
                        >
                          {/* Image box */}
                          <div className="relative h-28 w-28 rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-805/50 flex-shrink-0">
                            <img src={p.images[0]} alt="" className="h-full w-full object-cover transition-transform group-hover:scale-104 duration-300" />
                          </div>

                          {/* Content elements */}
                          <div className="flex-1 flex flex-col gap-1 text-center sm:text-left">
                            <span className="text-4xs uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-extrabold">{p.brand}</span>
                            <h3 className="font-extrabold text-[#111827] dark:text-[#F9FAFB] text-sm group-hover:text-indigo-600 cursor-pointer" onClick={() => onNavigate(`/product/${p.id}`)}>{p.name}</h3>
                            <p className="text-3xs text-gray-400 dark:text-gray-500 line-clamp-2 leading-relaxed max-w-md">{p.description}</p>
                            
                            {/* Stars rating */}
                            <div className="flex items-center justify-center sm:justify-start gap-1 font-mono text-3xs text-gray-500 mt-1">
                              <span className="text-amber-400 text-xs leading-none">★</span>
                              <span className="font-semibold text-gray-700 dark:text-gray-300">{p.rating}</span>
                              <span>({p.reviewCount} customer reviews)</span>
                            </div>
                          </div>

                          {/* Right column triggers add to cart */}
                          <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-4 w-full sm:w-auto border-t sm:border-t-0 sm:border-l border-gray-100 dark:border-gray-850 pt-4 sm:pt-0 sm:pl-5 min-w-36">
                            <div className="text-right">
                              <span className="text-md font-black text-gray-901 dark:text-white font-mono">{formatCurrency(p.price)}</span>
                              {p.isPromoDeal && (
                                <span className="line-through text-4xs text-gray-400 block font-mono">{formatCurrency(p.price * 1.25)}</span>
                              )}
                            </div>

                            <button
                              onClick={() => onAddToCart(p.id)}
                              disabled={!p.inStock}
                              className="rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-100 text-white font-semibold text-3xs px-4 py-2 w-full sm:w-auto transition-colors cursor-pointer"
                            >
                              {p.inStock ? 'Add to Cart' : 'Sold Out'}
                            </button>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </motion.div>

                {/* PAGINATION PANEL FOOTER SELECTORS */}
                {totalPages > 1 && (
                  <div className="mt-12 flex justify-center items-center gap-3 border-t border-gray-100 dark:border-gray-800 pt-6">
                    <button
                      onClick={() => setCurrentPage((c) => Math.max(1, c - 1))}
                      disabled={currentPage === 1}
                      className="rounded-xl border border-gray-220 dark:border-gray-800 hover:bg-gray-50 text-gray-500 dark:text-gray-400 p-2 disabled:bg-gray-50 disabled:text-gray-300 cursor-pointer"
                      aria-label="Previous Catalog Page"
                    >
                      <ChevronLeft className="h-4.5 w-4.5" />
                    </button>

                    {/* Numeric buttons wrapper */}
                    <div className="flex items-center gap-1.5">
                      {Array.from({ length: totalPages }, (_, idx) => {
                        const pNum = idx + 1;
                        const isCurrent = currentPage === pNum;
                        return (
                          <button
                            key={pNum}
                            onClick={() => setCurrentPage(pNum)}
                            className={`h-9 w-9 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
                              isCurrent
                                ? 'bg-indigo-600 text-white shadow-3xs'
                                : 'border border-transparent hover:border-gray-200 dark:hover:border-gray-800 text-gray-600 dark:text-gray-400'
                            }`}
                          >
                            {pNum}
                          </button>
                        );
                      })}
                    </div>

                    <button
                      onClick={() => setCurrentPage((c) => Math.min(totalPages, c + 1))}
                      disabled={currentPage === totalPages}
                      className="rounded-xl border border-gray-220 dark:border-gray-800 hover:bg-gray-50 text-gray-500 dark:text-gray-400 p-2 disabled:bg-gray-50 disabled:text-gray-300 cursor-pointer"
                      aria-label="Next Catalog Page"
                    >
                      <ChevronRight className="h-4.5 w-4.5" />
                    </button>
                  </div>
                )}
              </>
            ) : (
              /* Empty matches results panel */
              <div className="mt-6 flex flex-col items-center justify-center p-8 border border-dashed border-gray-200 dark:border-gray-800 rounded-3xl py-16 text-center bg-white dark:bg-[#1a1a1a]">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50 dark:bg-indigo-950/20 text-indigo-600 mb-4 animate-pulse">
                  <Star className="h-7 w-7" />
                </div>
                <h2 className="text-md font-bold text-gray-900 dark:text-white">No products found matching</h2>
                <p className="max-w-xs text-xs text-gray-400 dark:text-gray-500 leading-normal mt-1.5 font-normal">
                  Your search filters did not match any inventory records. Reset keywords or adjust sliders.
                </p>
                <button
                  onClick={handleClearAllFilters}
                  className="mt-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 text-xs font-semibold shadow-md active:scale-97 transition-all cursor-pointer"
                >
                  Reset Active Filters
                </button>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
