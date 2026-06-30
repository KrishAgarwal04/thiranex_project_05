import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PRODUCTS } from './data/products';
import { Product, CartItem, Order, Toast } from './types';
import { storage } from './utils';

const productsData = PRODUCTS;

const getStorageItem = <T,>(key: string, fallback: T): T => {
  const v = storage.get<T>(key);
  return v !== null ? v : fallback;
};

const setStorageItem = <T,>(key: string, value: T) => {
  storage.set<T>(key, value);
};

// Pages
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Wishlist } from './pages/Wishlist';
import { Orders } from './pages/Orders';
import { About } from './pages/About';

// Components
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CompareDrawer } from './components/CompareDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { ToastContainer } from './components/ToastContainer';

export default function App() {
  // ROUTING PATH STATES (With backward hash matching)
  const [currentPath, setCurrentPath] = useState('/');
  const [activeProductId, setActiveProductId] = useState('');
  const [searchParam, setSearchParam] = useState('');
  const [categoryParam, setCategoryParam] = useState('');

  // GLOBAL CART & PERSISTENCE STATES
  const [cart, setCart] = useState<CartItem[]>(() => getStorageItem('shopwave_cart', []));
  const [wishlist, setWishlist] = useState<string[]>(() => getStorageItem('shopwave_wishlist', []));
  const [compareList, setCompareList] = useState<string[]>(() => getStorageItem('shopwave_compare', []));
  const [orders, setOrders] = useState<Order[]>(() => getStorageItem('shopwave_orders', []));

  // COUPON & DISCOUNT ENGINE
  const [couponDiscount, setCouponDiscount] = useState<number>(() => getStorageItem('shopwave_coupon_discount', 0));

  // TRANSIENT OVERLAYS
  const [selectedQuickViewProduct, setSelectedQuickViewProduct] = useState<Product | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const stored = localStorage.getItem('shopwave_theme');
    if (stored === 'dark') return 'dark';
    return 'light';
  });

  // PARSER AND SYNC ROUTER HASH CHANGE
  useEffect(() => {
    const parseUrlHash = () => {
      const hash = window.location.hash || '#'; // e.g. "#/shop" or "#/product/PROD001" or "#/shop?search=wear"
      const cleanHash = hash.replace(/^#\/?/, ''); // e.g. "shop" or "product/PROD001" or "shop?search=shoes"
      const [routePart, queryPart] = cleanHash.split('?');
      const params = new URLSearchParams(queryPart || '');

      setSearchParam(params.get('search') || '');
      setCategoryParam(params.get('cat') || '');

      if (routePart.startsWith('product/')) {
        const id = routePart.split('/')[1];
        setActiveProductId(id || '');
        setCurrentPath('/product');
      } else {
        setActiveProductId('');
        setCurrentPath(routePart ? `/${routePart}` : '/');
      }
    };

    parseUrlHash();
    window.addEventListener('hashchange', parseUrlHash);
    return () => window.removeEventListener('hashchange', parseUrlHash);
  }, []);

  // Safe router navigation function
  const handleNavigate = (path: string) => {
    // Standard path formats like '/shop', '/cart', '/product/PROD01'
    if (path.startsWith('/')) {
      const formatted = path.substring(1); // e.g. "shop"
      window.location.hash = `#/${formatted}`;
    } else {
      window.location.hash = `#/${path}`;
    }
    // Scroll window up
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // BROADCAST TOAST ALERTS (Section 8 visual feedback messages)
  const handleAddToast = (message: string, type: 'success' | 'error' | 'info') => {
    const id = Date.now().toString() + Math.random().toString();
    const duration = 4000;
    setToasts((prev) => [...prev, { id, message, type, duration }]);
  };

  const handleRemoveToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // SYNC PERSISTENT RECORD WRAPPERS
  useEffect(() => {
    setStorageItem('shopwave_cart', cart);
  }, [cart]);

  useEffect(() => {
    setStorageItem('shopwave_wishlist', wishlist);
  }, [wishlist]);

  useEffect(() => {
    setStorageItem('shopwave_compare', compareList);
  }, [compareList]);

  useEffect(() => {
    setStorageItem('shopwave_orders', orders);
  }, [orders]);

  useEffect(() => {
    setStorageItem('shopwave_coupon_discount', couponDiscount);
  }, [couponDiscount]);

  // SYSTEM WEB THEME SUN/MOON NODES
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('shopwave_theme', theme);
  }, [theme]);

  const handleThemeToggle = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    handleAddToast(`Theme switched to ${theme === 'light' ? 'Dark' : 'Light'} Mode`, 'info');
  };

  // CART ADDITION OPERATIONS
  const handleAddToCart = async (productId: string, size?: string, color?: string) => {
    const product = productsData.find((p) => p.id === productId);
    if (!product) return;

    if (!product.inStock) {
      handleAddToast(`"${product.name}" is currently sold out and unavailable.`, 'error');
      return;
    }

    setCart((prevCart) => {
      // Check if product variant exists in cart
      const existingIdx = prevCart.findIndex(
        (item) => item.id === productId && item.size === size && item.color === color
      );

      if (existingIdx > -1) {
        const updated = [...prevCart];
        const newQty = Math.min(product.stockCount, updated[existingIdx].qty + 1);
        updated[existingIdx] = { ...updated[existingIdx], qty: newQty };
        return updated;
      }

      // Add as a new row
      return [...prevCart, { id: productId, qty: 1, size, color }];
    });
  };

  const handleUpdateQty = (productId: string, size: string | undefined, color: string | undefined, newQty: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId && item.size === size && item.color === color
          ? { ...item, qty: Math.max(1, newQty) }
          : item
      )
    );
  };

  const handleRemoveCartItem = (productId: string, size: string | undefined, color: string | undefined) => {
    setCart((prev) =>
      prev.filter((item) => !(item.id === productId && item.size === size && item.color === color))
    );
  };

  const handleClearCart = () => {
    setCart([]);
    setCouponDiscount(0);
  };

  // WISHLIST ROW TRIGGERS
  const handleWishlistToggle = (productId: string) => {
    const product = productsData.find((p) => p.id === productId);
    if (!product) return;

    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        handleAddToast(`Removed "${product.name}" from saved items list.`, 'info');
        return prev.filter((id) => id !== productId);
      } else {
        handleAddToast(`Saved "${product.name}" to your wishlist.`, 'success');
        return [...prev, productId];
      }
    });
  };

  // TRANSFER CART TO WISHLIST
  const handleTransferCartToWishlist = (productId: string) => {
    setWishlist((prev) => {
      if (!prev.includes(productId)) {
        return [...prev, productId];
      }
      return prev;
    });
  };

  // SPEC Matrix Comparison list additions (Section 7 specs state max 3 items, alert on excess!)
  const handleCompareToggle = (productId: string) => {
    const product = productsData.find((p) => p.id === productId);
    if (!product) return;

    setCompareList((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        handleAddToast(`Removed "${product.name}" from specs comparison.`, 'info');
        return prev.filter((id) => id !== productId);
      } else {
        if (prev.length >= 3) {
          handleAddToast('Matrix Limit Exceeded! You can compare max 3 products side-by-side.', 'error');
          return prev;
        }
        handleAddToast(`Added "${product.name}" to comparisons.`, 'success');
        return [...prev, productId];
      }
    });
  };

  // REORDER BUNDLES TRIGGER
  const handleReorderBundle = (order: Order) => {
    order.items.forEach((item) => {
      handleAddToCart(item.id, item.size, item.color);
    });
    handleAddToast(`Replaced checkout bundle ORD#${order.id} back into shopping cart!`, 'success');
    handleNavigate('/cart');
  };

  // DISCOUNT CODE CARD APPLY
  const handleApplyCoupon = (code: string): boolean => {
    if (code === 'SAVE10') {
      setCouponDiscount(0.1); // 10% coupon
      return true;
    }
    return false;
  };

  // ADD NEW ORDERS
  const handleAddOrder = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
  };

  // RENDERING ROUTER FLOW FOR LAYOUT
  const renderLayoutContent = () => {
    switch (currentPath) {
      case '/':
      case '':
        return (
          <Home
            products={productsData}
            wishlist={wishlist}
            compareList={compareList}
            onWishlistToggle={handleWishlistToggle}
            onCompareToggle={handleCompareToggle}
            onAddToCart={handleAddToCart}
            onQuickView={setSelectedQuickViewProduct}
            onNavigate={handleNavigate}
          />
        );
      case '/shop':
        return (
          <Shop
            products={productsData}
            wishlist={wishlist}
            compareList={compareList}
            onWishlistToggle={handleWishlistToggle}
            onCompareToggle={handleCompareToggle}
            onAddToCart={handleAddToCart}
            onQuickView={setSelectedQuickViewProduct}
            onNavigate={handleNavigate}
            initialSearchQuery={searchParam}
            initialCategory={categoryParam}
          />
        );
      case '/product':
        return (
          <ProductDetail
            productId={activeProductId}
            products={productsData}
            wishlist={wishlist}
            compareList={compareList}
            onWishlistToggle={handleWishlistToggle}
            onCompareToggle={handleCompareToggle}
            onAddToCart={handleAddToCart}
            onNavigate={handleNavigate}
            onAddToast={handleAddToast}
          />
        );
      case '/cart':
        return (
          <Cart
            cart={cart}
            products={productsData}
            onUpdateQty={handleUpdateQty}
            onRemoveItem={handleRemoveCartItem}
            onSaveForLater={handleTransferCartToWishlist}
            onNavigate={handleNavigate}
            couponDiscount={couponDiscount}
            onApplyCoupon={handleApplyCoupon}
            onAddToast={handleAddToast}
            freeShippingThreshold={999}
            shippingCost={99}
            taxRate={0.18}
          />
        );
      case '/checkout':
        return (
          <Checkout
            cart={cart}
            products={productsData}
            couponDiscount={couponDiscount}
            shippingCost={99}
            taxRate={0.18}
            freeShippingThreshold={999}
            onClearCart={handleClearCart}
            onAddOrder={handleAddOrder}
            onNavigate={handleNavigate}
            onAddToast={handleAddToast}
          />
        );
      case '/wishlist':
        return (
          <Wishlist
            wishlist={wishlist}
            products={productsData}
            compareList={compareList}
            onWishlistToggle={handleWishlistToggle}
            onCompareToggle={handleCompareToggle}
            onAddToCart={handleAddToCart}
            onQuickView={setSelectedQuickViewProduct}
            onNavigate={handleNavigate}
            onAddToast={handleAddToast}
          />
        );
      case '/orders':
        return (
          <Orders
            orders={orders}
            onReorder={handleReorderBundle}
            onNavigate={handleNavigate}
          />
        );
      case '/about':
        return <About />;
      default:
        return (
          <div className="mx-auto max-w-7xl px-4 py-20 text-center">
            <h1 className="text-3xl font-black text-gray-900 dark:text-white">404 Content Out of Range</h1>
            <p className="text-xs text-gray-500 mt-2">The specified path destination could not be resolved cleanly.</p>
            <button onClick={() => handleNavigate('/')} className="mt-8 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-5 py-2.5 shadow-md">
              Return Home
            </button>
          </div>
        );
    }
  };

  const getWishlistCount = () => wishlist.length;
  const getCartCount = () => cart.reduce((count, item) => count + item.qty, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] dark:bg-[#0D0D0D] text-[#111827] dark:text-[#F9FAFB] font-sans overflow-x-hidden selection:bg-indigo-500/20 antialiased selection:text-indigo-900 transition-colors">
      
      {/* Sticky Glass navigation header */}
      <Header
        currentPath={currentPath}
        cartCount={getCartCount()}
        wishlistCount={getWishlistCount()}
        theme={theme}
        onThemeToggle={handleThemeToggle}
        onNavigate={handleNavigate}
        products={productsData}
      />

      {/* Main Pages transitional wrapper */}
      <main id="main-content-canvas-root" className="flex-1 w-full relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPath + activeProductId}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            {renderLayoutContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Page footings block */}
      <Footer onNavigate={handleNavigate} />

      {/* Floating Bottom Compare Specifications Drawer Drawer */}
      <CompareDrawer
        compareList={compareList}
        products={productsData}
        onRemove={handleCompareToggle}
        onClear={() => setCompareList([])}
        onNavigate={handleNavigate}
      />

      {/* Quick Preview modal overlay triggers */}
      <QuickViewModal
        product={selectedQuickViewProduct}
        onClose={() => setSelectedQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onAddToast={handleAddToast}
      />

      {/* Broadcast System Toasts notifications (Floating top right overlay) */}
      <ToastContainer toasts={toasts} onRemoveToast={handleRemoveToast} />

    </div>
  );
}
