import React, { useState } from 'react';
import { Mail, Facebook, Twitter, Instagram, Linkedin, CheckCircle, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [shake, setShake] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(trimmedEmail)) {
      setStatus('error');
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1200);
  };

  return (
    <footer className="bg-white dark:bg-[#111827] border-t border-gray-100 dark:border-gray-800/60 pt-16 pb-8 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand Col */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('/')}>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm">
                <svg className="h-5 w-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5C7.8 7.2 11.2 7.2 14.5 10.5C17.8 13.8 21.2 13.8 24.5 10.5" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M0 13.5C3.3 10.2 6.7 10.2 10 13.5C13.3 16.8 16.7 16.8 20 13.5" />
                </svg>
              </div>
              <span className="font-sans text-xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                Shop<span className="text-indigo-600 dark:text-indigo-400">Wave</span>
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed pr-4">
              ShopWave is an exquisite portfolio capstone e-commerce destination with top-tier curation, immersive layouts, and seamless transactions.
            </p>
            <div className="flex items-center gap-3 mt-2 text-gray-400 dark:text-gray-500">
              <a href="#" className="hover:text-indigo-500 transition-colors" aria-label="Facebook Page link">
                <Facebook className="h-4.5 w-4.5" />
              </a>
              <a href="#" className="hover:text-indigo-500 transition-colors" aria-label="Twitter Page link">
                <Twitter className="h-4.5 w-4.5" />
              </a>
              <a href="#" className="hover:text-indigo-500 transition-colors" aria-label="Instagram Page link">
                <Instagram className="h-4.5 w-4.5" />
              </a>
              <a href="#" className="hover:text-indigo-500 transition-colors" aria-label="Linkedin Profile link">
                <Linkedin className="h-4.5 w-4.5" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-2xs font-extrabold uppercase tracking-widest text-[#111827] dark:text-[#F9FAFB] mb-4">
              Navigation Links
            </h3>
            <ul className="flex flex-col gap-2.5 text-xs font-semibold text-gray-500 dark:text-gray-400">
              <li>
                <button onClick={() => onNavigate('/')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer">
                  Shop Homepage
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/shop')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer">
                  Product Catalog
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/about')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer">
                  Company Story
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/orders')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer">
                  Customer Orders
                </button>
              </li>
            </ul>
          </div>

          {/* Legal / Policy links */}
          <div>
            <h3 className="text-2xs font-extrabold uppercase tracking-widest text-[#111827] dark:text-[#F9FAFB] mb-4">
              Help & Policies
            </h3>
            <ul className="flex flex-col gap-2.5 text-xs text-gray-500 dark:text-gray-400 font-medium">
              <li><a href="#" className="hover:text-indigo-500 transition-colors">Shipping & Free Thresholds</a></li>
              <li><a href="#" className="hover:text-indigo-500 transition-colors">Easy 30-Day Returns</a></li>
              <li><a href="#" className="hover:text-indigo-500 transition-colors">Privacy Agreement</a></li>
              <li><a href="#" className="hover:text-indigo-500 transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Newsletter Segment */}
          <div>
            <h3 className="text-2xs font-extrabold uppercase tracking-widest text-[#111827] dark:text-[#F9FAFB] mb-4">
              Subscribe to Newsletter
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-normal mb-4 font-normal">
              Get notified of weekend price drops, new brand arrivals, and upcoming flash deals immediately.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-1.5">
              <div 
                className={`flex rounded-xl border bg-gray-50 dark:bg-[#1a1a1a]/40 focus-within:bg-white focus-within:ring-2 focus-within:ring-indigo-500/30 overflow-hidden pr-1 border-gray-200 dark:border-gray-800 h-10.5 ${
                  shake ? 'animate-shake border-rose-500 ring-2 ring-rose-500/20' : ''
                }`}
              >
                <input
                  type="text"
                  value={email}
                  disabled={status === 'success'}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === 'error') setStatus('idle');
                  }}
                  placeholder="name@address.com"
                  className="w-full bg-transparent pl-3.5 pr-2 text-xs focus:outline-hidden text-[#111827] dark:text-[#F9FAFB] placeholder-gray-400"
                />
                <button
                  type="submit"
                  disabled={status === 'loading' || status === 'success'}
                  className="rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white p-1.5 self-center font-bold text-xs h-8.5 aspect-square flex items-center justify-center shadow-xs transition-all cursor-pointer"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              {/* Status messages */}
              <AnimatePresence mode="wait">
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 text-2xs font-semibold px-1 mt-0.5"
                  >
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0" />
                    Subscription success! Check email to verify.
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-rose-500 text-2xs font-semibold px-1 mt-0.5"
                  >
                    Please provide a valid email format.
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-3xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest leading-loose">
            © {new Date().getFullYear()} ShopWave Portfolio Project. Built with premium pure styling details.
          </span>
          <span className="text-3xs font-bold text-indigo-600/70 dark:text-indigo-400/70 uppercase tracking-widest">
            Portfolio Capstone Edition
          </span>
        </div>
      </div>
    </footer>
  );
};
