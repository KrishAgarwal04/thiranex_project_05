import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';
import { ChevronLeft, ChevronRight, Zap, ShoppingBag, Eye, Heart, Sparkles, TrendingUp, HelpCircle, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { formatCurrency } from '../utils';

interface HomeProps {
  products: Product[];
  wishlist: string[];
  compareList: string[];
  onWishlistToggle: (productId: string) => void;
  onCompareToggle: (productId: string) => void;
  onAddToCart: (productId: string, size?: string, color?: string) => Promise<void>;
  onQuickView: (product: Product) => void;
  onNavigate: (path: string) => void;
}

const HERO_SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1200',
    tag: 'Premium Audio Acoustics',
    title: 'Supreme Acoustic Engineering',
    desc: 'Immerse in pure sonic luxury. Wireless acoustics selected with zero noise distortion thresholds, active hybrid noise-cancellation, and 45Hr power reservoirs.',
    cta: 'Discover Audio Elements',
    cat: 'electronics'
  },
  {
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1200',
    tag: 'Elite Footwear Performance',
    title: 'Engineered Kinetic Speed',
    desc: 'Unleash peak cardiovascular responses. Multi-density carbon kinetic blades, carbon responsive meshes, and custom pressure-mapped sole plates.',
    cta: 'Shop High Performance Footwear',
    cat: 'footwear'
  },
  {
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1200',
    tag: 'Smart Connected Ecosystem',
    title: 'Durable Bio-Metric Analytics',
    desc: 'Track heart variability metrics, oxygen reserves, sleep states, and VO2-max thresholds through solid high contrast titanium alloy casings.',
    cta: 'Explore Smart Wearables',
    cat: 'electronics'
  }
];

const TESTIMONIALS = [
  { name: 'Rohan Mehta', comment: 'The premium carbon-plated runners changed my cadence. Flawless doorstep delivery!', stars: 5, avatar: 'RM' },
  { name: 'Ayesha Sen', comment: 'ShopWaves interface is an absolute masterclass. Clean, high-contrast, zero clutter.', stars: 5, avatar: 'AS' },
  { name: 'Kabir Deshmukh', comment: 'The hybrid ANC audio headphones are acoustic magic. Crisp specifications compare table.', stars: 4.8, avatar: 'KD' },
  { name: 'Dr. Priya Rao', comment: 'Meticulous attention to layout details. True luxury experience completely local.', stars: 5, avatar: 'PR' }
];

export const Home: React.FC<HomeProps> = ({
  products,
  wishlist,
  compareList,
  onWishlistToggle,
  onCompareToggle,
  onAddToCart,
  onQuickView,
  onNavigate
}) => {
  const [heroIndex, setHeroIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ hrs: 0, mins: 0, secs: 0 });
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  // AUTOMATIC HERO SLIDESHOW INTERVAL
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // TESTIMONIAL AUTO-SCROLL SLIDER
  useEffect(() => {
    const testimonialTimer = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 4500);
    return () => clearInterval(testimonialTimer);
  }, []);

  // LIVE COUNTDOWN TO NEXT MIDNIGHT (Section 5)
  useEffect(() => {
    const calculateCountdown = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0); // Next midnight
      
      const diffMs = midnight.getTime() - now.getTime();
      if (diffMs <= 0) {
        setTimeLeft({ hrs: 0, mins: 0, secs: 0 });
        return;
      }
      
      const secsTotal = Math.floor(diffMs / 1000);
      const hrs = Math.floor(secsTotal / 3600);
      const mins = Math.floor((secsTotal % 3600) / 60);
      const secs = secsTotal % 60;
      
      setTimeLeft({ hrs, mins, secs });
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Grids filtering
  const saleProducts = products.filter((p) => p.isPromoDeal).slice(0, 4);
  const hotTrendProducts = products.filter((p) => p.specifications['weight'] || p.rating >= 4.7).slice(4, 8);

  const categories = [
    { name: 'electronics', label: 'E-Wearables & Audio', count: 12, img: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=60&w=300', icon: '🎧' },
    { name: 'apparel', label: 'Curated Apparel', count: 10, img: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=60&w=300', icon: '👔' },
    { name: 'footwear', label: 'Speed Runners', count: 8, img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=60&w=300', icon: '👟' },
    { name: 'fragrances', label: 'Aromatic Perfumeries', count: 9, img: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=60&w=300', icon: '✨' },
    { name: 'grooming', label: 'Premium Facial Skincare', count: 6, img: 'https://images.unsplash.com/photo-1556228515-3b993fe4942e?auto=format&fit=crop&q=60&w=300', icon: '🧴' },
    { name: 'fitness', label: 'Strength & Fitness Gear', count: 6, img: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=60&w=300', icon: '💪' }
  ];

  return (
    <div className="bg-[#FAFAFA] dark:bg-[#0D0D0D] transition-colors pb-16">
      
      {/* SECTION 4 PAGE 1: HERO DISPLAY BANNER CAROUSEL SLIDESHOW */}
      <section className="relative overflow-hidden bg-black h-[500px] sm:h-[580px] w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={heroIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9 }}
            className="absolute inset-0 w-full h-full"
          >
            {/* Background Image with Blurs overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-black/20 z-1" />
            <img 
              src={HERO_SLIDES[heroIndex].image} 
              alt={HERO_SLIDES[heroIndex].title} 
              className="absolute inset-0 w-full h-full object-cover scale-102 hover:scale-105 duration-[6000ms] transition-transform"
            />

            {/* Inner responsive Container */}
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center gap-4 z-2 text-white">
              <span className="rounded-full bg-white/10 border border-white/20 backdrop-blur-md px-3.5 py-1.5 text-3xs font-black tracking-widest uppercase text-indigo-300 w-fit">
                {HERO_SLIDES[heroIndex].tag}
              </span>
              <h2 className="font-sans text-3xl font-extrabold sm:text-5xl tracking-tight max-w-2xl leading-none">
                {HERO_SLIDES[heroIndex].title}
              </h2>
              <p className="max-w-md text-xs sm:text-xs text-gray-300 leading-relaxed font-normal">
                {HERO_SLIDES[heroIndex].desc}
              </p>
              <div className="flex gap-3.5 mt-2">
                <button
                  onClick={() => onNavigate(`/shop?cat=${HERO_SLIDES[heroIndex].cat}`)}
                  className="rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center gap-1.5 text-2xs font-extrabold px-5.5 py-3 shadow-md shadow-indigo-600/10 cursor-pointer active:scale-98 transition-all"
                >
                  {HERO_SLIDES[heroIndex].cta}
                  <ShoppingBag className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel indicators dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setHeroIndex(idx)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                heroIndex === idx ? 'w-6 bg-indigo-500' : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* FLASHCountdown SALE TICKER ROW (Section 5) */}
      <section className="bg-indigo-900 border-y border-indigo-950 py-3 text-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2.5">
            <div className="h-7 w-7 rounded-lg bg-indigo-500/30 flex items-center justify-center text-amber-400">
              <Zap className="h-4 w-4 fill-current animate-pulse" />
            </div>
            <div>
              <span className="text-2xs font-black uppercase tracking-widest text-[#F9FAFB] block">Limited Hot Flash Offers</span>
              <p className="text-4xs text-amber-200">Midnight checkout drops up to 30% savings completely automatically.</p>
            </div>
          </div>

          {/* HH:MM:SS Countdown tickers */}
          <div className="flex items-center gap-1 font-mono text-xs font-bold bg-black/35 rounded-xl px-4 py-1.5 border border-white/10">
            <span className="text-3xs uppercase tracking-widest text-indigo-300 font-bold block pr-2">Deal Expires In:</span>
            <span className="bg-indigo-950 px-1.5 py-0.5 rounded text-indigo-400 font-extrabold">
              {String(timeLeft.hrs).padStart(2, '0')}
            </span>
            <span>:</span>
            <span className="bg-indigo-950 px-1.5 py-0.5 rounded text-indigo-400 font-extrabold">
              {String(timeLeft.mins).padStart(2, '0')}
            </span>
            <span>:</span>
            <span className="bg-indigo-950 px-1.5 py-0.5 rounded text-indigo-400 font-extrabold animate-heartBeat">
              {String(timeLeft.secs).padStart(2, '0')}
            </span>
          </div>
        </div>
      </section>

      {/* CATEGORIES GRID BANNER MOSAIC SCENE */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-16">
        <div className="mb-8">
          <span className="text-3xs font-extrabold text-indigo-500 uppercase tracking-widest">Aesthetic Collections</span>
          <h2 className="text-md sm:text-lg font-black text-gray-900 dark:text-white mt-0.5">Explore curated categories</h2>
        </div>

        {/* 6 Grid layout */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.name}
              onClick={() => onNavigate(`/shop?cat=${cat.name}`)}
              className="group rounded-2xl border border-gray-150/75 dark:border-gray-808 bg-white dark:bg-[#1a1a1a] p-4 flex flex-col items-center text-center shadow-3xs hover:border-indigo-200 hover:shadow-md cursor-pointer transition-all"
            >
              {/* Thumbnail relative aspect */}
              <div className="h-14 w-14 rounded-full bg-gray-50 dark:bg-[#242424]/40 flex items-center justify-center text-lg mb-3 shadow-3xs group-hover:scale-108 transition-transform">
                {cat.icon}
              </div>
              <h3 className="text-2xs font-extrabold capitalize text-[#111827] dark:text-[#F9FAFB] line-clamp-1">
                {cat.name}
              </h3>
              <span className="text-4xs text-[#9CA3AF] mt-0.5">{cat.count} Products</span>
            </div>
          ))}
        </div>
      </section>

      {/* PROMOTIONAL FLASH SALE PRODUCTS CARDS (Section 5) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-20">
        <div className="flex justify-between items-end mb-8 border-b pb-3 border-gray-150 dark:border-gray-800">
          <div>
            <span className="text-3xs font-extrabold text-indigo-500 uppercase tracking-widest flex items-center gap-1">
              <Zap className="h-3 w-3 fill-current text-amber-500" /> Save Big Handpicked Coupons
            </span>
            <h2 className="text-md sm:text-lg font-black text-gray-901 dark:text-white mt-0.5">Flash Sale drop deals</h2>
          </div>
          <button 
            onClick={() => onNavigate('/shop?promo=true')}
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
          >
            See All Sales
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {saleProducts.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              isWishlisted={wishlist.includes(p.id)}
              isInCompare={compareList.includes(p.id)}
              onWishlistToggle={onWishlistToggle}
              onCompareToggle={onCompareToggle}
              onAddToCart={onAddToCart}
              onQuickView={onQuickView}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      </section>

      {/* SPECIAL GRID BOARD TWO COLLAGE HERO AD BANNERS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Banner Left */}
          <div className="relative rounded-3xl overflow-hidden shadow-lg h-72 bg-gradient-to-tr from-rose-500 via-rose-600 to-amber-500 text-white p-8 flex flex-col justify-end gap-3 shrink-0">
            <div className="absolute inset-0 bg-black/10 z-1" />
            <div className="absolute right-4 top-4 uppercase tracking-widest text-4xs bg-white/20 px-2 py-0.5 rounded-full font-black z-2">Aroma series</div>
            <h4 className="text-lg font-black max-w-xs z-2">Bespoke French Fragrance Accords</h4>
            <p className="text-4xs text-[#F2F2F2] max-w-xs leading-normal z-2">Premium sandalwood and leather accords designed with durability profiles. Certified non-synthetic extracts.</p>
            <button 
              onClick={() => onNavigate('/shop?cat=fragrances')}
              className="rounded-xl bg-white text-rose-600 text-3xs font-extrabold px-4 py-2 w-fit z-2 shadow-sm hover:bg-gray-100 transition-colors cursor-pointer"
            >
              Shop Fragrances
            </button>
          </div>

          {/* Banner Right */}
          <div className="relative rounded-3xl overflow-hidden shadow-lg h-72 bg-gradient-to-br from-[#111827] via-[#101726] to-indigo-900 text-white p-8 flex flex-col justify-end gap-3 shrink-0">
            <div className="absolute inset-0 bg-black/10 z-1" />
            <div className="absolute right-4 top-4 uppercase tracking-widest text-4xs bg-indigo-500/30 px-2 py-0.5 rounded-full font-black z-2">Active wear</div>
            <h4 className="text-lg font-black max-w-xs z-2">Engineered Performance Fabric</h4>
            <p className="text-4xs text-[#E5E7EB] max-w-xs leading-normal z-2">Breathable hyper-stretch mesh jackets with sweat ventilation channels. Designed for intense heart training schedules.</p>
            <button 
              onClick={() => onNavigate('/shop?cat=apparel')}
              className="rounded-xl bg-indigo-600 text-white text-3xs font-extrabold px-4 py-2 w-fit z-2 shadow-sm hover:bg-indigo-700 transition-colors cursor-pointer"
            >
              Discover Apparel
            </button>
          </div>

        </div>
      </section>

      {/* TRENDING POPULAR ITEMS GRID */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-20">
        <div className="flex justify-between items-end mb-8 border-b pb-3 border-gray-150 dark:border-gray-800">
          <div>
            <span className="text-3xs font-extrabold text-indigo-500 uppercase tracking-widest flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-indigo-500" /> Dynamic High Demand Choices
            </span>
            <h2 className="text-md sm:text-lg font-black text-gray-901 dark:text-white mt-0.5">Hot trending arrivals</h2>
          </div>
          <button 
            onClick={() => onNavigate('/shop')}
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
          >
            Explore Catalog
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {hotTrendProducts.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              isWishlisted={wishlist.includes(p.id)}
              isInCompare={compareList.includes(p.id)}
              onWishlistToggle={onWishlistToggle}
              onCompareToggle={onCompareToggle}
              onAddToCart={onAddToCart}
              onQuickView={onQuickView}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      </section>

      {/* AUTO SCROLL CAROUSEL TESTIMONIAL PANEL (Sections 4 & 8) */}
      <section className="bg-white dark:bg-[#1a1a1a]/40 border-y border-gray-150/75 dark:border-gray-900 mt-24 py-12 overflow-hidden">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <span className="text-3xs uppercase tracking-widest text-indigo-500 font-extrabold block mb-2">Verified Customer Stories</span>
          
          <div className="relative min-h-36 flex flex-col justify-center items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonialIndex}
                initial={{ opacity: 0, scale: 0.98, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -15 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center gap-3.5 max-w-xl"
              >
                {/* Score Stars */}
                <div className="flex gap-0.5 text-amber-400 text-xs font-semibold select-none">
                  ★ ★ ★ ★ ★ <span className="text-3xs text-gray-400 pl-1">({TESTIMONIALS[testimonialIndex].stars})</span>
                </div>
                {/* Comment Text */}
                <p className="text-xs sm:text-sm text-gray-750 dark:text-gray-300 font-medium italic leading-relaxed">
                  "{TESTIMONIALS[testimonialIndex].comment}"
                </p>
                {/* Author Name and avatar circle */}
                <div className="flex items-center gap-2 mt-1">
                  <div className="h-6 w-6 rounded-full bg-indigo-150 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold font-mono text-3xs">
                    {TESTIMONIALS[testimonialIndex].avatar}
                  </div>
                  <span className="text-3xs uppercase tracking-widest text-[#111827] dark:text-[#F9FAFB] font-extrabold">
                    {TESTIMONIALS[testimonialIndex].name}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex gap-1.5 justify-center mt-3">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setTestimonialIndex(idx)}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  testimonialIndex === idx ? 'w-4 bg-indigo-500' : 'w-1.5 bg-gray-250 dark:bg-gray-808'
                }`}
                aria-label={`Go to review testimonials ${idx + 1}`}
              />
            ))}
          </div>

        </div>
      </section>

    </div>
  );
};
