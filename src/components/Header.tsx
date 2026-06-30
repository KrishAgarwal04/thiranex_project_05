import React, { useState, useEffect, useRef } from 'react';
import { Search, Heart, ShoppingCart, Sun, Moon, Sparkles, User, LogOut, Menu, X, Trash2, ChevronRight } from 'lucide-react';
import { Product } from '../types';
import { fuzzyMatch } from '../utils';

interface HeaderProps {
  currentPath: string;
  cartCount: number;
  wishlistCount: number;
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
  onNavigate: (path: string) => void;
  products: Product[];
}

export const Header: React.FC<HeaderProps> = ({
  currentPath,
  cartCount,
  wishlistCount,
  theme,
  onThemeToggle,
  onNavigate,
  products
}) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load recent searches from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('shopwave_recent_searches');
      if (stored) {
        setRecentSearches(JSON.parse(stored));
      }
    } catch (_) {}
  }, []);

  // Set sticky state on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcut '/' to focus search, Esc to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && !searchOpen && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        setSearchOpen(true);
        setTimeout(() => inputRef.current?.focus(), 100);
      } else if (e.key === 'Escape' && searchOpen) {
        setSearchOpen(false);
        setShowSuggestions(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchOpen]);

  // Handle outside clicks to close suggestions
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const saveSearchQuery = (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;
    const filtered = [trimmed, ...recentSearches.filter(s => s !== trimmed)].slice(0, 5);
    setRecentSearches(filtered);
    try {
      localStorage.setItem('shopwave_recent_searches', JSON.stringify(filtered));
    } catch (_) {}
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      saveSearchQuery(searchQuery);
      onNavigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (query: string) => {
    saveSearchQuery(query);
    setSearchQuery(query);
    onNavigate(`/shop?search=${encodeURIComponent(query)}`);
    setSearchOpen(false);
    setShowSuggestions(false);
  };

  const handleCategorySuggestionClick = (category: string) => {
    onNavigate(`/shop?cat=${category}`);
    setSearchOpen(false);
    setShowSuggestions(false);
  };

  const removeRecentSearch = (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    const updated = recentSearches.filter(item => item !== text);
    setRecentSearches(updated);
    try {
      localStorage.setItem('shopwave_recent_searches', JSON.stringify(updated));
    } catch (_) {}
  };

  // Get Suggestions
  const getSuggestions = (): { products: Product[]; categories: string[]; brands: string[] } => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return { products: [], categories: [], brands: [] };

    const matchingProducts = products
      .filter((p) => fuzzyMatch(p.name, query) || fuzzyMatch(p.brand, query))
      .slice(0, 5);

    // Matching categories
    const categoriesList: string[] = [];
    products.forEach(p => {
      if (!categoriesList.includes(p.category)) {
        categoriesList.push(p.category);
      }
    });
    const matchingCategories = categoriesList
      .filter(cat => cat.includes(query))
      .slice(0, 3);

    // Matching Brands
    const brandsList: string[] = [];
    products.forEach(p => {
      if (!brandsList.includes(p.brand)) {
        brandsList.push(p.brand);
      }
    });
    const matchingBrands = brandsList
      .filter(brand => brand.toLowerCase().includes(query))
      .slice(0, 3);

    return {
      products: matchingProducts,
      categories: matchingCategories,
      brands: matchingBrands
    };
  };

  const suggestions = getSuggestions();
  const hasSuggestions = searchQuery.trim().length > 0 && 
    (suggestions.products.length > 0 || suggestions.categories.length > 0 || suggestions.brands.length > 0);

  const isActive = (path: string) => {
    if (path === '/') return currentPath === '/' || currentPath === '';
    return currentPath.startsWith(path);
  };

  return (
    <header
      id="main-nav-header"
      className={`sticky top-0 z-40 w-full border-b transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 dark:bg-[#0d0d0d]/80 border-gray-150 dark:border-gray-800/80 backdrop-blur-md shadow-xs py-2'
          : 'bg-white dark:bg-[#0d0d0d] border-gray-100 dark:border-gray-900 py-4'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo Block */}
        <div 
          onClick={() => onNavigate('/')} 
          className="flex items-center gap-2 cursor-pointer focus-within:ring-2 focus-within:ring-indigo-500 rounded-lg p-1"
        >
          {/* Wave SVG Logo Icon */}
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-200 dark:shadow-none">
            <svg className="h-5 w-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5C7.8 7.2 11.2 7.2 14.5 10.5C17.8 13.8 21.2 13.8 24.5 10.5" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M0 13.5C3.3 10.2 6.7 10.2 10 13.5C13.3 16.8 16.7 16.8 20 13.5" />
            </svg>
          </div>
          <span className="font-sans text-xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Shop<span className="text-indigo-600 dark:text-indigo-400">Wave</span>
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold">
          <button
            onClick={() => onNavigate('/')}
            className={`transition-colors cursor-pointer ${
              isActive('/') 
                ? 'text-indigo-600 dark:text-indigo-400' 
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => onNavigate('/shop')}
            className={`transition-colors cursor-pointer ${
              isActive('/shop') 
                ? 'text-indigo-600 dark:text-indigo-400' 
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Shop Catalog
          </button>
          <button
            onClick={() => onNavigate('/about')}
            className={`transition-colors cursor-pointer ${
              isActive('/about') 
                ? 'text-indigo-600 dark:text-indigo-400' 
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Our Story
          </button>
          <button
            onClick={() => onNavigate('/orders')}
            className={`transition-colors cursor-pointer ${
              isActive('/orders') 
                ? 'text-indigo-600 dark:text-indigo-400' 
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Past Orders
          </button>
        </nav>

        {/* Right Menu: Search, Wishlist, Cart, User, Toggle */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          {/* Active Search System Container */}
          <div ref={searchContainerRef} className="relative">
            <button
              onClick={() => {
                setSearchOpen(!searchOpen);
                if (!searchOpen) {
                  setTimeout(() => inputRef.current?.focus(), 150);
                }
              }}
              className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#242424] hover:text-[#111827] dark:hover:text-[#F9FAFB] transition-colors cursor-pointer"
              aria-label="Toggle search input"
              title="Search Products (Press /)"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Expandable Top/Desktop Search Panel */}
            {searchOpen && (
              <div className="absolute right-0 top-12 z-50 w-80 sm:w-96 rounded-2xl border border-gray-150 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] shadow-xl p-3 animate-fadeUp">
                <form onSubmit={handleSearchSubmit} className="relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setShowSuggestions(true);
                    }}
                    placeholder="Search by keywords, categories, brands..."
                    className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#242424] py-2.5 pl-10 pr-4 text-sm text-[#111827] dark:text-[#F9FAFB] placeholder-gray-400 focus:border-indigo-500 focus:bg-white focus:outline-hidden"
                  />
                  <Search className="absolute left-3.5 top-3 h-4.5 w-4.5 text-gray-400" />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3.5 top-2.5 rounded-md p-1 hover:bg-gray-200 dark:hover:bg-[#242424]"
                    >
                      <X className="h-3.5 w-3.5 text-gray-500" />
                    </button>
                  )}
                </form>

                {/* Suggestions Dropdown Layer */}
                {showSuggestions && (
                  <div className="mt-3 border-t border-gray-100 dark:border-gray-800 pt-2 text-xs">
                    {/* Clear Suggestions indicator if empty query */}
                    {!searchQuery && recentSearches.length > 0 && (
                      <div>
                        <div className="flex items-center justify-between text-2xs uppercase tracking-wider text-gray-400 font-bold px-2 py-1">
                          <span>Recent Searches</span>
                          <button
                            onClick={() => {
                              setRecentSearches([]);
                              localStorage.removeItem('shopwave_recent_searches');
                            }}
                            className="text-gray-400 hover:text-rose-500 cursor-pointer"
                          >
                            Clear All
                          </button>
                        </div>
                        <ul className="mt-1 flex flex-col gap-0.5">
                          {recentSearches.map((item, id) => (
                            <li
                              key={id}
                              onClick={() => handleSuggestionClick(item)}
                              className="group flex items-center justify-between rounded-lg px-2 py-1.5 hover:bg-gray-50 dark:hover:bg-gray-800/40 cursor-pointer"
                            >
                              <span className="text-gray-700 dark:text-gray-300">{item}</span>
                              <button
                                onClick={(e) => removeRecentSearch(e, item)}
                                className="opacity-0 group-hover:opacity-100 p-0.5 hover:bg-gray-200 dark:hover:bg-[#242424] rounded text-gray-400 hover:text-gray-600"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Has Typing Matches */}
                    {searchQuery && hasSuggestions && (
                      <div className="flex flex-col gap-3">
                        {/* Categories matches */}
                        {suggestions.categories.length > 0 && (
                          <div>
                            <span className="text-2xs uppercase tracking-wider text-gray-400 font-bold px-2 block mb-1">Categories</span>
                            <div className="flex flex-wrap gap-1 px-2">
                              {suggestions.categories.map((cat) => (
                                <button
                                  key={cat}
                                  onClick={() => handleCategorySuggestionClick(cat)}
                                  className="rounded-full bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 px-2.5 py-1 text-2xs font-semibold capitalize hover:bg-indigo-100/50 cursor-pointer"
                                >
                                  {cat}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Brands matches */}
                        {suggestions.brands.length > 0 && (
                          <div>
                            <span className="text-2xs uppercase tracking-wider text-gray-400 font-bold px-2 block mb-1">Brands Matching</span>
                            <div className="flex flex-wrap gap-1 px-2">
                              {suggestions.brands.map((brand) => (
                                <button
                                  key={brand}
                                  onClick={() => handleSuggestionClick(brand)}
                                  className="rounded-full bg-gray-150 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2.5 py-1 text-2xs font-semibold hover:bg-gray-200 cursor-pointer"
                                >
                                  {brand}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Matching Product Name list */}
                        {suggestions.products.length > 0 && (
                          <div>
                            <span className="text-2xs uppercase tracking-wider text-gray-400 font-bold px-2 block mb-1">Catalog Matches</span>
                            <ul className="flex flex-col gap-0.5">
                              {suggestions.products.map((p) => (
                                <li
                                  key={p.id}
                                  onClick={() => handleSuggestionClick(p.name)}
                                  className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-gray-50 dark:hover:bg-gray-800/45 cursor-pointer text-gray-700 dark:text-gray-300"
                                >
                                  <img src={p.images[0]} alt="" className="h-6 w-6 rounded object-cover" />
                                  <span className="text-xs truncate font-medium">{p.name}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}

                    {searchQuery && !hasSuggestions && (
                      <div className="px-2 py-3 text-center text-gray-500">
                        No results for <span className="font-semibold text-gray-700 dark:text-gray-300">"{searchQuery}"</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Theme Sunrise/Moonlight Switcher */}
          <button
            onClick={onThemeToggle}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#242424] hover:text-[#111827] dark:hover:text-[#F9FAFB] transition-colors cursor-pointer"
            aria-label="Toggle visual theme"
            title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          >
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </button>

          {/* Wishlist Link with Live Badge Count */}
          <button
            onClick={() => onNavigate('/wishlist')}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#242424] hover:text-[#111827] dark:hover:text-[#F9FAFB] transition-colors cursor-pointer"
            aria-label="View saved wishlisted products"
          >
            <Heart className="h-5 w-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-white text-3xs font-extrabold shadow-sm ring-2 ring-white dark:ring-[#0d0d0d] animate-heartBeat">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Link with Live Bounce Badger */}
          <button
            onClick={() => onNavigate('/cart')}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#242424] hover:text-[#111827] dark:hover:text-[#F9FAFB] transition-colors cursor-pointer"
            aria-label="View shopping bag"
            id="header-cart-icon"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-white text-3xs font-extrabold shadow-sm ring-2 ring-white dark:ring-[#0d0d0d]">
                {cartCount}
              </span>
            )}
          </button>

          {/* Account/User Icon triggers Orders View */}
          <button
            onClick={() => onNavigate('/orders')}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#242424] hover:text-[#111827] dark:hover:text-[#F9FAFB] transition-colors cursor-pointer"
            aria-label="View transaction orders history"
            title="My Orders & Profile"
          >
            <User className="h-5 w-5" />
          </button>

          {/* Mobile hamburger menu indicator */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#242424] hover:text-[#111827] dark:hover:text-[#F9FAFB] md:hidden cursor-pointer"
            aria-label="Toggle side drawer menu"
          >
            {mobileMenuOpen ? <X className="h-5.5 w-5.5" /> : <Menu className="h-5.5 w-5.5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay Slider */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[60px] z-30 bg-black/50 backdrop-blur-xs md:hidden" onClick={() => setMobileMenuOpen(false)}>
          <div
            className="absolute left-0 right-0 top-0 bg-white dark:bg-[#0d0d0d] border-b border-gray-150 dark:border-gray-800 shadow-xl px-6 py-6 flex flex-col gap-4 animate-fadeUp"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => {
                onNavigate('/');
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-between text-left text-sm font-semibold text-gray-900 dark:text-gray-100 hover:text-indigo-600 py-2 border-b border-gray-100 dark:border-gray-900"
            >
              Home Discover
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </button>
            <button
              onClick={() => {
                onNavigate('/shop');
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-between text-left text-sm font-semibold text-gray-900 dark:text-gray-100 hover:text-indigo-600 py-2 border-b border-gray-100 dark:border-gray-900"
            >
              E-Commerce Product Catalog
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </button>
            <button
              onClick={() => {
                onNavigate('/about');
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-between text-left text-sm font-semibold text-gray-900 dark:text-gray-100 hover:text-indigo-600 py-2 border-b border-gray-100 dark:border-gray-900"
            >
              Our Story
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </button>
            <button
              onClick={() => {
                onNavigate('/orders');
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-between text-left text-sm font-semibold text-gray-900 dark:text-gray-100 hover:text-indigo-600 py-2"
            >
              Past Orders History List
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
