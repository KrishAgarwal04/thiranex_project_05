import React, { useState } from 'react';
import { Product, CartItem } from '../types';
import { formatCurrency } from '../utils';
import { Trash2, Heart, Plus, Minus, ArrowRight, ShoppingBag, Percent, Check, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CartProps {
  cart: CartItem[];
  products: Product[];
  onUpdateQty: (productId: string, size: string | undefined, color: string | undefined, newQty: number) => void;
  onRemoveItem: (productId: string, size: string | undefined, color: string | undefined) => void;
  onSaveForLater: (productId: string) => void;
  onNavigate: (path: string) => void;
  couponDiscount: number;
  onApplyCoupon: (code: string) => boolean;
  onAddToast: (msg: string, type: 'success' | 'error' | 'info') => void;
  freeShippingThreshold: number;
  shippingCost: number;
  taxRate: number;
}

export const Cart: React.FC<CartProps> = ({
  cart,
  products,
  onUpdateQty,
  onRemoveItem,
  onSaveForLater,
  onNavigate,
  couponDiscount,
  onApplyCoupon,
  onAddToast,
  freeShippingThreshold,
  shippingCost,
  taxRate
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [couponStatus, setCouponStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [couponShake, setCouponShake] = useState(false);

  // Compile cart details
  const cartDetails = cart.map((item) => {
    const product = products.find((p) => p.id === item.id);
    return {
      item,
      product
    };
  }).filter((d): d is { item: CartItem; product: Product } => !!d.product);

  // Math Calculations
  const subtotal = cartDetails.reduce((sum, d) => sum + d.product.price * d.item.qty, 0);
  const discountAmount = subtotal * couponDiscount;
  const isFreeShipping = subtotal >= freeShippingThreshold || subtotal === 0;
  const shippingCharge = isFreeShipping ? 0 : shippingCost;
  const taxableAmount = subtotal - discountAmount;
  const taxAmount = taxableAmount * taxRate;
  const grandTotal = taxableAmount + shippingCharge + taxAmount;

  const handleApplyCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (!code) return;

    setCouponStatus('loading');
    
    setTimeout(() => {
      const success = onApplyCoupon(code);
      if (success) {
        setCouponStatus('success');
        onAddToast(`Coupon "${code}" applied successfully! 10% off of subtotal.`, 'success');
      } else {
        setCouponStatus('error');
        setCouponShake(true);
        onAddToast('Invalid coupon code. Try entering "SAVE10"', 'error');
        setTimeout(() => setCouponShake(false), 500);
      }
    }, 800);
  };

  const handleRemoveClick = (productId: string, size: string | undefined, color: string | undefined, name: string) => {
    onRemoveItem(productId, size, color);
    onAddToast(`Removed "${name}" from your cart.`, 'info');
  };

  const handleMoveToWishlist = (productId: string, size: string | undefined, color: string | undefined, name: string) => {
    onRemoveItem(productId, size, color);
    onSaveForLater(productId);
    onAddToast(`Moved "${name}" to Wishlist saved items.`, 'success');
  };

  return (
    <div className="bg-[#FAFAFA] dark:bg-[#0D0D0D] transition-colors min-h-screen pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Shopping Cart Summary
          </h1>
          {cartDetails.length > 0 && (
            <p className="text-xs text-gray-400 mt-1">
              You have {cartDetails.length} unique items in your shopping bag.
            </p>
          )}
        </div>

        {cartDetails.length > 0 ? (
          /* Cart Columns Layout split */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* Left Column: Cart Rows (65%) */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              <AnimatePresence mode="popLayout">
                {cartDetails.map(({ item, product }) => {
                  const lineTotal = product.price * item.qty;
                  return (
                    <motion.div
                      key={`${item.id}-${item.size || ''}-${item.color || ''}`}
                      layout
                      initial={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 120, scale: 0.95 }}
                      transition={{ type: 'spring', damping: 20, stiffness: 200 }}
                      className="rounded-2xl border border-gray-150 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] shadow-3xs p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      {/* Product details cell */}
                      <div className="flex items-center gap-4 flex-1">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="h-16 w-16 rounded-xl object-cover border border-gray-100 dark:border-gray-800 flex-shrink-0 bg-gray-50"
                        />
                        <div>
                          <h3
                            onClick={() => onNavigate(`/product/${product.id}`)}
                            className="font-bold text-sm text-[#111827] dark:text-[#F9FAFB] line-clamp-1 hover:text-indigo-600 transition-colors cursor-pointer"
                          >
                            {product.name}
                          </h3>
                          <span className="text-3xs font-semibold uppercase tracking-widest text-[#9CA3AF] mt-0.5 block">
                            Brand: {product.brand}
                          </span>
                          
                          {/* Variants tags */}
                          <div className="flex flex-wrap gap-1.5 mt-1.5 text-3xs font-bold font-mono">
                            {item.color && (
                              <span className="flex items-center gap-1 bg-gray-50 dark:bg-gray-805 border border-gray-200 dark:border-white/10 rounded-full py-0.5 px-2">
                                Color: 
                                <span className="h-2 w-2 rounded-full border border-black/10" style={{ backgroundColor: item.color }} />
                              </span>
                            )}
                            {item.size && (
                              <span className="bg-gray-50 dark:bg-gray-805 border border-gray-200 dark:border-white/10 rounded-full py-0.5 px-2">
                                Size: {item.size}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Qty and price line */}
                      <div className="flex items-center justify-between sm:justify-end gap-x-8 gap-y-2 w-full sm:w-auto">
                        {/* Qty Selector block */}
                        <div className="flex items-center border border-gray-150 dark:border-gray-800 rounded-xl bg-gray-50 dark:bg-[#242424] h-9">
                          <button
                            onClick={() => {
                              if (item.qty === 1) {
                                if (confirm(`Do you wish to remove "${product.name}" variant from your shopping cart?`)) {
                                  handleRemoveClick(product.id, item.size, item.color, product.name);
                                }
                              } else {
                                onUpdateQty(product.id, item.size, item.color, item.qty - 1);
                              }
                            }}
                            className="px-2.5 text-gray-500 dark:text-gray-400 hover:text-gray-900 cursor-pointer"
                            aria-label="Decrement quantity"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-8 text-center text-xs font-semibold font-mono text-gray-800 dark:text-gray-200">
                            {item.qty}
                          </span>
                          <button
                            onClick={() => {
                              onUpdateQty(product.id, item.size, item.color, Math.min(product.stockCount, item.qty + 1));
                            }}
                            className="px-2.5 text-gray-500 dark:text-gray-400 hover:text-gray-900 cursor-pointer"
                            aria-label="Increment quantity"
                            disabled={item.qty >= product.stockCount}
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        {/* Cost tags */}
                        <div className="text-right flex flex-col gap-0.5 min-w-24">
                          <span className="text-sm font-bold text-gray-950 dark:text-white font-mono">
                            {formatCurrency(lineTotal)}
                          </span>
                          <span className="text-3xs text-gray-400 dark:text-gray-500">
                            {formatCurrency(product.price)} each
                          </span>
                        </div>

                        {/* Trash and Heart controllers */}
                        <div className="flex gap-1">
                          <button
                            onClick={() => handleMoveToWishlist(product.id, item.size, item.color, product.name)}
                            className="p-2 border border-gray-150 dark:border-gray-805 hover:bg-rose-50 dark:hover:bg-rose-950/20 text-gray-400 hover:text-rose-500 rounded-xl transition-colors cursor-pointer"
                            title="Save for Later to Wishlist"
                            aria-label="Save for later"
                          >
                            <Heart className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleRemoveClick(product.id, item.size, item.color, product.name)}
                            className="p-2 border border-gray-150 dark:border-gray-851 hover:bg-rose-50 dark:hover:bg-rose-950/20 text-gray-400 hover:text-rose-500 rounded-xl transition-colors cursor-pointer"
                            title="Remove completely"
                            aria-label="Remove item"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Right Column: Order Summary Card Sticky (35%) */}
            <div className="lg:sticky lg:top-24 flex flex-col gap-4">
              
              {/* Free delivery thresholds progress */}
              <div className="rounded-2xl border border-gray-150 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] shadow-3xs p-4 text-xs">
                {isFreeShipping ? (
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white text-3xs font-extrabold font-mono">✓</span>
                    Congratulations! Your order qualifies for FREE Shipping.
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-between items-center text-gray-700 dark:text-gray-350 mb-1.5 font-semibold">
                      <span>Free Shipping Threshold Target</span>
                      <span className="font-bold">{formatCurrency(subtotal)} / {formatCurrency(freeShippingThreshold)}</span>
                    </div>
                    <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                      <div 
                        className="h-full bg-indigo-600 rounded-lg transition-all" 
                        style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                      />
                    </div>
                    <p className="mt-2 text-3xs text-gray-400 dark:text-gray-500 leading-normal">
                      Add <span className="font-bold text-gray-700 dark:text-gray-300">{formatCurrency(freeShippingThreshold - subtotal)}</span> more worth of quality goods to bypass shipping courier fees.
                    </p>
                  </div>
                )}
              </div>

              {/* Bill Details Container */}
              <div className="rounded-2xl border border-gray-150 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] shadow-lg p-5 flex flex-col gap-4">
                <h3 className="text-sm font-extrabold uppercase tracking-widest text-[#111827] dark:text-[#F9FAFB] border-b pb-3 dark:border-gray-800">
                  Cart Order Summary
                </h3>

                {/* Subtotal, tax, discounts lines */}
                <div className="flex flex-col gap-2.5 text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex justify-between items-center text-gray-700 dark:text-gray-350">
                    <span>Subtotal</span>
                    <span className="font-mono">{formatCurrency(subtotal)}</span>
                  </div>

                  {couponDiscount > 0 && (
                    <div className="flex justify-between items-center text-rose-500 font-semibold">
                      <span className="flex items-center gap-1">
                        <Percent className="h-3.5 w-3.5" /> Coupon ("SAVE10") 10% Off
                      </span>
                      <span className="font-mono">-{formatCurrency(discountAmount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center text-gray-400 dark:text-gray-500">
                    <span>Shipping Charges</span>
                    <span className="font-mono">{isFreeShipping ? 'FREE' : formatCurrency(shippingCharge)}</span>
                  </div>

                  <div className="flex justify-between items-center text-gray-404">
                    <span>Estimated taxes (GD&ST 18%)</span>
                    <span className="font-mono">{formatCurrency(taxAmount)}</span>
                  </div>

                  <div className="border-t border-dashed border-gray-150 dark:border-gray-800 my-2" />

                  <div className="flex justify-between items-center text-md font-extrabold text-indigo-600 dark:text-indigo-400">
                    <span>Total Amount due</span>
                    <span className="font-mono text-lg">{formatCurrency(grandTotal)}</span>
                  </div>
                </div>

                {/* Coupon Code Applying Segment */}
                <div className="pt-2 border-t border-gray-100 dark:border-gray-800 mt-2">
                  <span className="text-3xs uppercase tracking-widest text-[#9CA3AF] font-bold block mb-2">Promotional Voucher Card</span>
                  <form onSubmit={handleApplyCouponSubmit} className="flex gap-2">
                    <div 
                      className={`flex rounded-xl border bg-gray-50 dark:bg-[#242424] overflow-hidden px-3 border-gray-150 dark:border-gray-800 h-9.5 items-center flex-1 ${
                        couponShake ? 'animate-shake border-rose-500 ring-2 ring-rose-500/10' : ''
                      }`}
                    >
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => {
                          setCouponCode(e.target.value);
                          if (couponStatus === 'error') setCouponStatus('idle');
                        }}
                        placeholder="e.g. SAVE10 (10% Off)"
                        className="w-full bg-transparent text-xs focus:outline-hidden uppercase font-semibold text-[#111827] dark:text-[#F9FAFB] placeholder-gray-400"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={couponDiscount > 0 || couponStatus === 'loading'}
                      className="rounded-xl bg-[#111827] dark:bg-[#242424] hover:bg-indigo-600 px-4 py-2 font-bold text-2xs text-white text-center cursor-pointer transition-colors"
                    >
                      {couponStatus === 'loading' ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : couponDiscount > 0 ? (
                        <Check className="h-3.5 w-3.5 text-emerald-500" />
                      ) : (
                        'Apply'
                      )}
                    </button>
                  </form>
                </div>

                {/* Proceed Checkout button */}
                <button
                  onClick={() => onNavigate('/checkout')}
                  className="w-full flex gap-2 items-center justify-center rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-3.5 shadow-md shadow-indigo-100/50 dark:shadow-none hover:scale-101 active:scale-99 transition-all mt-4 cursor-pointer"
                >
                  Proceed to Direct Checkout
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

            </div>

          </div>
        ) : (
          /* Empty cart */
          <div className="mt-12 flex flex-col items-center justify-center p-8 border border-dashed border-gray-200 dark:border-gray-800 rounded-3xl py-16 text-center bg-white dark:bg-[#1a1a1a]">
            {/* Draw in animation */}
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50 dark:bg-indigo-950/20 text-indigo-600 mb-4 animate-pulse">
              <ShoppingBag className="h-7 w-7" />
            </div>
            <h2 className="text-md font-bold text-gray-905 dark:text-white">Your Shopping Cart is empty</h2>
            <p className="max-w-xs text-xs text-gray-400 dark:text-gray-500 leading-normal mt-1.5 font-normal">
              You haven't added any quality items to your shopping cart yet. Fill it up with bespoke catalogs items!
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
