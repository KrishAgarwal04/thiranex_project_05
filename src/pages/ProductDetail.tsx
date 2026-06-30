import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Product, CartItem } from '../types';
import { formatCurrency } from '../utils';
import { ArrowLeft, Heart, ShoppingCart, GitCompare, Check, AlertCircle, Star, Sparkles, MessageSquare, ChevronRight, RefreshCw } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';

interface ProductDetailProps {
  productId: string;
  products: Product[];
  wishlist: string[];
  compareList: string[];
  onWishlistToggle: (productId: string) => void;
  onCompareToggle: (productId: string) => void;
  onAddToCart: (productId: string, size?: string, color?: string) => Promise<void>;
  onNavigate: (path: string) => void;
  onAddToast: (msg: string, type: 'success' | 'error' | 'info') => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({
  productId,
  products,
  wishlist,
  compareList,
  onWishlistToggle,
  onCompareToggle,
  onAddToCart,
  onNavigate,
  onAddToast
}) => {
  const product = useMemo(() => {
    return products.find((p) => p.id === productId);
  }, [products, productId]);

  const [activeImage, setActiveImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  
  // Magnifier Zoom Effect States
  const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({});
  const [isZooming, setIsZooming] = useState(false);

  // Review writing states
  const [reviewScore, setReviewScore] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [reviewName, setReviewName] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);

  // Local state reviews list to simulate adding a review
  const [localReviews, setLocalReviews] = useState<{ name: string; date: string; rating: number; text: string }[]>([]);

  useEffect(() => {
    if (product) {
      setActiveImage(product.images[0]);
      setSelectedSize(product.sizes[0] || '');
      setSelectedColor(product.colors[0] || '');
      setLocalReviews([]); // reset reviews for new product
    }
    // Scroll window up
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product, productId]);

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center">
        <h2 className="text-md font-bold text-gray-901">Product not found</h2>
        <p className="text-xs text-gray-400 mt-2">The product with ID "{productId}" is not available in our catalog.</p>
        <button onClick={() => onNavigate('/shop')} className="mt-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 text-xs font-semibold">
          Return to catalog
        </button>
      </div>
    );
  }

  // Related products carousel matching category
  const relatedProducts = useMemo(() => {
    return products
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [products, product]);

  // Image Magnifier Hover Calculations
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    
    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: 'scale(1.8)'
    });
  };

  const handleMouseLeave = () => {
    setIsZooming(false);
    setZoomStyle({ transform: 'scale(1)', transformOrigin: 'center center' });
  };

  const handleAddToCartClick = () => {
    onAddToCart(product.id, selectedSize || undefined, selectedColor || undefined);
    onAddToast(`Variant "${product.name}" added to shopping bag.`, 'success');
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewText.trim() || !reviewName.trim()) {
      onAddToast('Please fill out both Name and review feedback fields.', 'error');
      return;
    }

    const newReview = {
      name: reviewName,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      rating: reviewScore,
      text: reviewText
    };

    setLocalReviews([newReview, ...localReviews]);
    setReviewName('');
    setReviewText('');
    setShowReviewForm(false);
    onAddToast('Thank you! Your verified feedback review is published.', 'success');
  };

  const isLiked = wishlist.includes(product.id);
  const isCompared = compareList.includes(product.id);

  return (
    <div className="bg-[#FAFAFA] dark:bg-[#0D0D0D] transition-colors pb-16 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Back Link breadcrumb */}
        <button
          onClick={() => onNavigate('/shop')}
          className="inline-flex gap-1.5 items-center justify-center text-xs font-semibold text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors mb-8 cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Shop Catalog
        </button>

        {/* Product Split Columns Grid Block */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          
          {/* LEFT COLUMN: ACTIVE IMAGE MAGNIFIER DISPLAY MATRIX */}
          <div className="flex flex-col gap-4">
            
            {/* Active zoom box */}
            <div 
              className="relative aspect-square rounded-3xl overflow-hidden border border-gray-150 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] cursor-zoom-in"
              onMouseEnter={() => setIsZooming(true)}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={activeImage}
                alt=""
                className="w-full h-full object-cover transition-transform duration-100"
                style={zoomStyle}
              />
              
              {/* Promo tags */}
              {product.isPromoDeal && (
                <div className="absolute top-4 left-4 bg-rose-500 text-white rounded-full font-black text-4xs uppercase tracking-widest py-1 px-3 shadow-sm select-none z-1">
                  Flash Deal Offer
                </div>
              )}
            </div>

            {/* Thumbnails grid selectors block */}
            <div className="flex gap-3 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`h-16 w-16 rounded-2xl overflow-hidden flex-shrink-0 border-2 bg-white dark:bg-[#242424] cursor-pointer transition-all ${
                    activeImage === img ? 'border-indigo-600 scale-102 ring-2 ring-indigo-505/10' : 'border-gray-150 dark:border-gray-805 hover:border-gray-300'
                  }`}
                >
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>

          </div>

          {/* RIGHT COLUMN: CORE PRODUCT DETAILS METRICS */}
          <div className="rounded-2xl border border-gray-150/70 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] p-6 shadow-sm flex flex-col gap-5">
            <div className="border-b pb-5 dark:border-gray-850">
              <span className="text-3xs uppercase tracking-widest font-black text-indigo-600 dark:text-indigo-400 mt-1 block">
                Brand: {product.brand}
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-gray-901 dark:text-white mt-1 leading-snug">
                {product.name}
              </h1>

              {/* Stars rating layout */}
              <div className="flex items-center gap-1.5 font-mono text-3xs mt-2 text-gray-400 dark:text-gray-500">
                <span className="text-amber-400 text-xs leading-none">★</span>
                <span className="font-bold text-[#111827] dark:text-[#F9FAFB]">{product.rating}</span>
                <span>({product.reviewCount} customer ratings)</span>
                {product.shipping === 'free' && (
                  <span className="rounded-full bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 font-bold px-2 py-0.5 uppercase tracking-widest text-4xs leading-none ml-2">
                    Free shipping
                  </span>
                )}
              </div>
            </div>

            {/* Inventory Stock Levels alert banner */}
            <div className="flex items-center gap-2 text-xs">
              {product.inStock ? (
                <span className="text-emerald-500 font-bold flex items-center gap-1">
                  <Check className="h-4 w-4" /> In Stock Available ({product.stockCount} units left)
                </span>
              ) : (
                <span className="text-rose-500 font-bold flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" /> Sold Out completely
                </span>
              )}
            </div>

            {/* Price Box */}
            <div className="flex items-end gap-3 font-mono">
              <span className="text-2xl font-black text-gray-950 dark:text-white leading-none">
                {formatCurrency(product.price)}
              </span>
              {product.isPromoDeal && (
                <span className="line-through text-xs font-semibold text-gray-400">
                  {formatCurrency(product.price * 1.25)} (20% Off Promo code SAVE10)
                </span>
              )}
            </div>

            {/* Option Selection Swatches Section */}
            {product.colors.length > 0 && (
              <div className="flex flex-col gap-2">
                <span className="text-3xs font-extrabold uppercase tracking-widest text-gray-400 dark:text-gray-500">Color Variant Swatch</span>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`h-7 w-7 rounded-full border-2 cursor-pointer relative transition-transform ${
                        selectedColor === color ? 'border-indigo-600 scale-108 ring-2 ring-indigo-505/20' : 'border-[#9CA3AF]'
                      }`}
                      style={{ backgroundColor: color }}
                      title={`Select Color ${color}`}
                    >
                      {selectedColor === color && (
                        <Check className="h-3.5 w-3.5 text-white absolute inset-0 m-auto filter drop-shadow-xs" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.sizes.length > 0 && (
              <div className="flex flex-col gap-2">
                <span className="text-3xs font-extrabold uppercase tracking-widest text-gray-400 dark:text-gray-500">Size Classification Option</span>
                <div className="flex gap-2.5 flex-wrap">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`rounded-xl px-4 py-2 text-xs font-bold font-mono border cursor-pointer transition-colors ${
                        selectedSize === sz
                          ? 'border-indigo-600 bg-indigo-50/40 dark:bg-indigo-950/20 text-indigo-700 dark:text-indigo-400'
                          : 'border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Actions triggers row */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t dark:border-gray-850 mt-2">
              <button
                onClick={handleAddToCartClick}
                disabled={!product.inStock}
                className="flex-1 flex gap-2 items-center justify-center rounded-xl bg-indigo-605 hover:bg-indigo-700 disabled:bg-gray-150 disabled:text-gray-400 text-white font-bold text-xs py-3.5 shadow-md shadow-indigo-100 dark:shadow-none hover:scale-101 active:scale-99 transition-all cursor-pointer"
              >
                <ShoppingCart className="h-4.5 w-4.5" />
                Add Active Variant to Cart
              </button>

              <div className="flex gap-2">
                {/* Wishlist Heart */}
                <button
                  onClick={() => onWishlistToggle(product.id)}
                  className={`p-3 border rounded-xl hover:scale-103 cursor-pointer transition-all ${
                    isLiked 
                      ? 'border-rose-100 bg-rose-50/50 text-rose-500' 
                      : 'border-gray-200 dark:border-gray-800 text-gray-400 hover:text-gray-600'
                  }`}
                  aria-label="Toggle saves item in Wishlist"
                >
                  <Heart className={`h-5.5 w-5.5 ${isLiked ? 'fill-current' : ''}`} />
                </button>

                {/* Compare Specs button */}
                <button
                  onClick={() => onCompareToggle(product.id)}
                  className={`p-3 border rounded-xl hover:scale-103 cursor-pointer transition-all ${
                    isCompared 
                      ? 'border-indigo-100 bg-indigo-50/50 text-indigo-500' 
                      : 'border-gray-200 dark:border-gray-800 text-gray-400 hover:text-gray-600'
                  }`}
                  title="Toggle compare specs grid modal"
                >
                  <GitCompare className="h-5.5 w-5.5" />
                </button>
              </div>
            </div>

            {/* Description note summary */}
            <div className="border-t pt-5 dark:border-gray-850">
              <span className="text-3xs font-extrabold uppercase tracking-widest text-gray-400 dark:text-gray-500">Product Synopsis</span>
              <p className="text-xs text-gray-500 dark:text-gray-450 leading-relaxed font-normal mt-1.5">
                {product.description}
              </p>
            </div>

            {/* Technical specs listings table */}
            <div className="border-t pt-5 dark:border-gray-850">
              <span className="text-3xs font-extrabold uppercase tracking-widest text-[#9CA3AF] block mb-2">Detailed Specifications</span>
              <div className="border border-gray-150 dark:border-gray-800 rounded-2xl overflow-hidden">
                <table className="w-full text-left text-3xs border-collapse">
                  <tbody>
                    {Object.entries(product.specifications).map(([key, val], idx) => (
                      <tr 
                        key={key} 
                        className={`hover:bg-gray-50 dark:hover:bg-[#242424]/40 ${
                          idx % 2 === 0 ? 'bg-gray-50/50 dark:bg-[#1a1a1a]' : 'bg-white dark:bg-[#1a1a1a]'
                        }`}
                      >
                        <td className="p-2.5 font-bold text-gray-400 select-none uppercase border-r border-gray-150 dark:border-gray-800 capitalize w-2/5">
                          {key}
                        </td>
                        <td className="p-2.5 font-semibold text-gray-700 dark:text-gray-300">
                          {val}
                        </td>
                      </tr>
                    ))}
                    {/* Shipping spec */}
                    <tr className="bg-gray-50/50 dark:bg-[#1a1a1a] hover:bg-gray-50">
                      <td className="p-2.5 font-bold text-gray-400 uppercase border-r border-gray-150 dark:border-gray-805 w-2/5">Shipping Class</td>
                      <td className="p-2.5 font-semibold text-gray-700 dark:text-gray-300 capitalize">{product.shipping}</td>
                    </tr>
                    {/* Return Policy */}
                    <tr className="bg-white dark:bg-[#1a1a1a] hover:bg-gray-50">
                      <td className="p-2.5 font-bold text-gray-400 uppercase border-r border-gray-150 dark:border-gray-805 w-2/5">Return Policy</td>
                      <td className="p-2.5 font-semibold text-gray-700 dark:text-gray-300">{product.returnPolicy}</td>
                    </tr>
                    {/* Warranty */}
                    <tr className="bg-gray-50/50 dark:bg-[#1a1a1a] hover:bg-gray-50">
                      <td className="p-2.5 font-bold text-gray-400 uppercase border-r border-gray-150 dark:border-gray-805 w-2/5">Warranty Limit</td>
                      <td className="p-2.5 font-semibold text-gray-700 dark:text-gray-300">{product.warranty}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>

        </div>

        {/* REVIEWS SEGMENT FEEDBACK SYSTEM MODULE */}
        <section className="bg-white dark:bg-[#1a1a1a]/50 border border-gray-150 dark:border-gray-800 rounded-3xl p-6 sm:p-8 mt-16 flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 dark:border-gray-850">
            <div>
              <span className="text-3xs font-extrabold uppercase tracking-widest text-[#9CA3AF]">Buyer Feedback Logs</span>
              <h3 className="text-sm font-bold text-[#111827] dark:text-[#F9FAFB] mt-0.5">Verified User Reviews</h3>
            </div>
            
            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="rounded-xl border border-gray-220 dark:border-gray-800 bg-white hover:bg-indigo-50 hover:text-indigo-600 px-4 py-2.5 text-xs font-semibold text-gray-700 dark:text-gray-300 cursor-pointer transition-colors"
            >
              Write verified review feedback
            </button>
          </div>

          {/* Form write fields */}
          {showReviewForm && (
            <form onSubmit={handleReviewSubmit} className="bg-gray-50 dark:bg-[#242424]/40 p-5 rounded-2xl border border-gray-150 dark:border-gray-800 flex flex-col gap-4 max-w-xl animate-fadeUp">
              <h4 className="text-xs font-bold text-[#111827] dark:text-[#F9FAFB]">Submit verified rating review</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Reviewer Name */}
                <div className="flex flex-col gap-1 text-xs">
                  <label htmlFor="reviewerName" className="font-semibold text-gray-400">Reviewer Name *</label>
                  <input
                    id="reviewerName"
                    type="text"
                    required
                    value={reviewName}
                    onChange={(e) => setReviewName(e.target.value)}
                    placeholder="e.g. Suman Sen"
                    className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white py-2 px-3 focus:outline-hidden"
                  />
                </div>

                {/* Score Rating Stars selection */}
                <div className="flex flex-col gap-1 text-xs">
                  <span className="font-semibold text-gray-400 block mb-1">Select Star rating *</span>
                  <div className="flex gap-1.5 items-center mt-1">
                    {[1, 2, 3, 4, 5].map((st) => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => setReviewScore(st)}
                        className={`text-sm cursor-pointer select-none font-semibold ${
                          reviewScore >= st ? 'text-amber-400 hover:scale-103' : 'text-gray-200 hover:scale-103'
                        }`}
                        title={`Select Rating Stars ${st}`}
                      >
                        ★
                      </button>
                    ))}
                    <span className="text-3xs font-mono text-gray-400 pl-1">({reviewScore} rating stars chosen)</span>
                  </div>
                </div>
              </div>

              {/* Review Comment feedback */}
              <div className="flex flex-col gap-1 text-xs">
                <label htmlFor="reviewMessage" className="font-semibold text-gray-400 font-normal">Review details commentary *</label>
                <textarea
                  id="reviewMessage"
                  rows={3}
                  required
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Tell us what you adore or suggest about design specs..."
                  className="rounded-xl border border-gray-220 dark:border-gray-800 bg-white py-2 px-3 focus:outline-hidden resize-none"
                />
              </div>

              <div className="flex justify-end gap-2.5 mt-2">
                <button
                  type="button"
                  onClick={() => setShowReviewForm(false)}
                  className="rounded-xl border border-gray-200 bg-white hover:bg-gray-100 text-3xs font-semibold px-4 py-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-3xs font-semibold px-4 py-2 shadow-sm cursor-pointer"
                >
                  Submit review
                </button>
              </div>
            </form>
          )}

          {/* Review List block */}
          <div className="flex flex-col gap-6">
            
            {/* Direct Local input reviews list */}
            {localReviews.map((rev, idx) => (
              <div key={`local-${idx}`} className="flex gap-4 items-start pb-5 border-b border-gray-150/70 border-dashed dark:border-gray-805 animate-fadeUp">
                <div className="h-8 w-8 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center font-mono text-2xs uppercase">
                  {rev.name.substring(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 flex flex-col gap-0.5 text-xs">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-extrabold text-[#111827] dark:text-[#F9FAFB] capitalize">{rev.name}</span>
                    <span className="text-3xs text-gray-400 font-medium">{rev.date}</span>
                  </div>
                  <div className="text-amber-400 text-3xs my-0.5">
                    {Array.from({ length: 5 }, (_, st) => (
                      <span key={st}>{rev.rating > st ? '★' : '☆'}</span>
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 leading-normal font-normal mt-1">{rev.text}</p>
                </div>
              </div>
            ))}

            {/* Standard prefilled mockup reviews */}
            {[
              { name: 'Sameer Sen', date: '12 Jan 2026', stars: 5, comment: 'Exceptional material finishing. The specifications compare panel matched perfectly and warranty protection was as stated under descriptions.' },
              { name: 'Kirti D.', date: '12 Dec 2025', stars: 4.5, comment: 'Product features elements works seamlessly. Fast shipping. Beautiful minimal layout presentation.' }
            ].map((rev, idx) => (
              <div key={idx} className="flex gap-4 items-start pb-5 border-b border-gray-150/70 border-dashed dark:border-gray-805 last:border-b-0">
                <div className="h-8 w-8 rounded-full bg-gray-100 text-gray-700 font-bold flex items-center justify-center font-mono text-2xs uppercase">
                  {rev.name.substring(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 flex flex-col gap-0.5 text-xs">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-extrabold text-[#111827] dark:text-[#F9FAFB] capitalize">{rev.name}</span>
                    <span className="text-3xs text-gray-400 font-medium">{rev.date}</span>
                  </div>
                  <div className="text-amber-400 text-3xs my-0.5">
                    {Array.from({ length: 5 }, (_, st) => (
                      <span key={st}>{rev.stars > st ? '★' : '☆'}</span>
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 leading-normal font-normal mt-1">{rev.comment}</p>
                </div>
              </div>
            ))}

          </div>
        </section>

        {/* RELATED CATEGORIZED PRODUCTS SLIDER */}
        {relatedProducts.length > 0 && (
          <section className="mt-20">
            <h3 className="text-md font-black text-gray-901 dark:text-white border-b pb-3 mb-8 dark:border-gray-800">
              Related Category Collections
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  isWishlisted={wishlist.includes(p.id)}
                  isInCompare={compareList.includes(p.id)}
                  onWishlistToggle={onWishlistToggle}
                  onCompareToggle={onCompareToggle}
                  onAddToCart={onAddToCart}
                  onQuickView={() => {}}
                  onNavigate={onNavigate}
                />
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
};
