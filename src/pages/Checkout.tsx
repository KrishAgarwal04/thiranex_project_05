import React, { useState, useEffect, useRef } from 'react';
import { Product, CartItem, Order, OrderItem } from '../types';
import { formatCurrency } from '../utils';
import { Check, Loader2, CreditCard, Landmark, CheckCircle, Smartphone, Clock, ArrowRight, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CheckoutProps {
  cart: CartItem[];
  products: Product[];
  couponDiscount: number;
  shippingCost: number;
  taxRate: number;
  freeShippingThreshold: number;
  onClearCart: () => void;
  onAddOrder: (order: Order) => void;
  onNavigate: (path: string) => void;
  onAddToast: (msg: string, type: 'success' | 'error' | 'info') => void;
}

interface FormField<T> {
  value: T;
  error: string;
  touched: boolean;
}

export const Checkout: React.FC<CheckoutProps> = ({
  cart,
  products,
  couponDiscount,
  shippingCost,
  taxRate,
  freeShippingThreshold,
  onClearCart,
  onAddOrder,
  onNavigate,
  onAddToast
}) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSummaryId, setOrderSummaryId] = useState('');
  const [isCvvFocused, setIsCvvFocused] = useState(false);

  // Canvas Ref for Confetti
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Subtotal calculations
  const cartDetails = cart.map((item) => {
    const p = products.find((prod) => prod.id === item.id);
    return { item, p };
  }).filter((d): d is { item: CartItem; p: Product } => !!d.p);

  const subtotal = cartDetails.reduce((sum, d) => sum + d.p.price * d.item.qty, 0);
  const discountAmount = subtotal * couponDiscount;
  const isFree = subtotal >= freeShippingThreshold || subtotal === 0;
  const shippingCharge = isFree ? 0 : shippingCost;
  const taxable = subtotal - discountAmount;
  const taxAmount = taxable * taxRate;
  const grandTotal = taxable + shippingCharge + taxAmount;

  // STEP 1 FORM STATE: Delivery Details
  const [delivery, setDelivery] = useState({
    fullName: { value: '', error: '', touched: false },
    email: { value: '', error: '', touched: false },
    phone: { value: '', error: '', touched: false },
    addressLine1: { value: '', error: '', touched: false },
    addressLine2: { value: '', error: '', touched: false },
    city: { value: '', error: '', touched: false },
    state: { value: '', error: '', touched: false },
    pincode: { value: '', error: '', touched: false }
  });

  // STEP 2 PAYMENT METHOD STATE
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'netbank' | 'cod'>('card');
  const [cardDetails, setCardDetails] = useState({
    number: { value: '', error: '', touched: false },
    name: { value: '', error: '', touched: false },
    expiry: { value: '', error: '', touched: false },
    cvv: { value: '', error: '', touched: false }
  });

  const [upiId, setUpiId] = useState({ value: '', error: '', touched: false });
  const [netbank, setNetbank] = useState({ value: '', error: '', touched: false });

  // REAL-TIME STEP 1 VALIDATORS
  const validateDeliveryField = (field: keyof typeof delivery, val: string): string => {
    switch (field) {
      case 'fullName':
        return val.trim().length >= 3 ? '' : 'Name must be at least 3 characters.';
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim()) ? '' : 'Please enter a valid email format.';
      case 'phone':
        return /^[6-9]\d{9}$/.test(val.trim()) ? '' : 'Phone must be a valid 10-digit mobile phone number.';
      case 'addressLine1':
        return val.trim().length >= 8 ? '' : 'Please enter a complete address (min 8 chars).';
      case 'city':
        return val.trim().length >= 2 ? '' : 'City is required (min 2 chars).';
      case 'state':
        return val ? '' : 'Please select a Delivery State.';
      case 'pincode':
        return /^\d{6}$/.test(val.trim()) ? '' : 'Pincode must be a 6-digit pin code.';
      default:
        return '';
    }
  };

  // REAL-TIME STEP 2 VALIDATORS
  const validateCardField = (field: keyof typeof cardDetails, val: string): string => {
    switch (field) {
      case 'number':
        return val.replace(/\s+/g, '').length === 16 ? '' : 'Card number must contain 16 digits.';
      case 'name':
        return val.trim().length >= 3 ? '' : 'Name on Card must be at least 3 characters.';
      case 'expiry':
        return /^(0[1-9]|1[0-2])\/\d{2}$/.test(val.trim()) ? '' : 'Expiry must be in MM/YY format.';
      case 'cvv':
        return /^\d{3}$/.test(val.trim()) ? '' : 'CVV must contain exactly 3 digits.';
      default:
        return '';
    }
  };

  // Safe checks for step 1 progress button
  const isDeliveryValid = () => {
    return (
      validateDeliveryField('fullName', delivery.fullName.value) === '' &&
      validateDeliveryField('email', delivery.email.value) === '' &&
      validateDeliveryField('phone', delivery.phone.value) === '' &&
      validateDeliveryField('addressLine1', delivery.addressLine1.value) === '' &&
      validateDeliveryField('city', delivery.city.value) === '' &&
      validateDeliveryField('state', delivery.state.value) === '' &&
      validateDeliveryField('pincode', delivery.pincode.value) === ''
    );
  };

  // Safe checks for step 2 progress button
  const isPaymentValid = () => {
    if (paymentMethod === 'cod') return true;
    if (paymentMethod === 'upi') {
      return upiId.value.includes('@') && upiId.value.length > 3;
    }
    if (paymentMethod === 'netbank') {
      return netbank.value !== '';
    }
    // Credit card validations
    return (
      validateCardField('number', cardDetails.number.value) === '' &&
      validateCardField('name', cardDetails.name.value) === '' &&
      validateCardField('expiry', cardDetails.expiry.value) === '' &&
      validateCardField('cvv', cardDetails.cvv.value) === ''
    );
  };

  // Format Card Number (adds space every 4 digits)
  const handleCardNumberChange = (val: string) => {
    const raw = val.replace(/\D/g, '').substring(0, 16);
    const spaced = raw.match(/.{1,4}/g)?.join(' ') || raw;
    setCardDetails(prev => ({
      ...prev,
      number: { ...prev.number, value: spaced, error: validateCardField('number', spaced) }
    }));
  };

  // Format Expiry (auto inserts / slash)
  const handleExpiryChange = (val: string) => {
    const clean = val.replace(/\D/g, '').substring(0, 4);
    let output = clean;
    if (clean.length > 2) {
      output = `${clean.substring(0, 2)}/${clean.substring(2)}`;
    }
    setCardDetails(prev => ({
      ...prev,
      expiry: { ...prev.expiry, value: output, error: validateCardField('expiry', output) }
    }));
  };

  const handleDeliveryBlur = (field: keyof typeof delivery) => {
    const fData = delivery[field];
    setDelivery(prev => ({
      ...prev,
      [field]: { ...fData, touched: true, error: validateDeliveryField(field, fData.value) }
    }));
  };

  const handleDeliveryChange = (field: keyof typeof delivery, value: string) => {
    setDelivery(prev => ({
      ...prev,
      [field]: { ...prev[field], value, error: prev[field].touched ? validateDeliveryField(field, value) : '' }
    }));
  };

  const handleCardFieldBlur = (field: keyof typeof cardDetails) => {
    const fData = cardDetails[field];
    setCardDetails(prev => ({
      ...prev,
      [field]: { ...fData, touched: true, error: validateCardField(field, fData.value) }
    }));
  };

  const handleCardFieldChange = (field: keyof typeof cardDetails, value: string) => {
    if (field === 'number') {
      handleCardNumberChange(value);
    } else if (field === 'expiry') {
      handleExpiryChange(value);
    } else if (field === 'cvv') {
      const numeric = value.replace(/\D/g, '').substring(0, 3);
      setCardDetails(prev => ({
        ...prev,
        cvv: { ...prev.cvv, value: numeric, error: prev.cvv.touched ? validateCardField('cvv', numeric) : '' }
      }));
    } else {
      setCardDetails(prev => ({
        ...prev,
        [field]: { ...prev[field], value, error: prev[field].touched ? validateCardField(field, value) : '' }
      }));
    }
  };

  // CANVASES physics-based confetti engine (Section 4 Confetti)
  const runConfettiExplosion = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    interface Particle {
      x: number;
      y: number;
      w: number;
      h: number;
      color: string;
      vx: number;
      vy: number;
      shape: 'rect' | 'circle';
      rot: number;
      rotSpeed: number;
      opacity: number;
    }

    const particles: Particle[] = [];
    const colors = ['#6366F1', '#10B981', '#F59E0B', '#EF4444', '#3B82F6', '#EC4899'];

    // Fill up 80 particles
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: canvas.width / 2 + (Math.random() - 0.5) * 50,
        y: -10,
        w: Math.random() * 6 + 6,
        h: Math.random() * 10 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 10,
        vy: Math.random() * 4 + 4,
        shape: Math.random() > 0.5 ? 'rect' : 'circle',
        rot: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 5,
        opacity: 1
      });
    }

    let start: number | null = null;
    const run = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        // Apply Physics
        p.vy += 0.15; // Gravity
        p.vx *= 0.99; // Drag
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.rotSpeed;

        if (elapsed > 3000) {
          p.opacity = Math.max(0, p.opacity - 0.05); // Fade
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rot * Math.PI) / 180);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;

        if (p.shape === 'rect') {
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.w / 2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });

      if (elapsed < 3500) {
        requestAnimationFrame(run);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    requestAnimationFrame(run);
  };

  // Submit and create order database object
  const handlePlaceOrder = () => {
    setIsSubmitting(true);
    const ordId = `ORD${Math.floor(10000000 + Math.random() * 90000000)}`;

    const items: OrderItem[] = cartDetails.map((cd) => ({
      id: cd.item.id,
      name: cd.p.name,
      price: cd.p.price,
      qty: cd.item.qty,
      size: cd.item.size,
      color: cd.item.color,
      image: cd.p.images[0]
    }));

    const orderObj: Order = {
      id: ordId,
      date: new Date().toISOString(),
      items,
      subtotal,
      shipping: shippingCharge,
      tax: taxAmount,
      discount: discountAmount,
      total: grandTotal,
      address: {
        fullName: delivery.fullName.value,
        email: delivery.email.value,
        phone: delivery.phone.value,
        addressLine1: delivery.addressLine1.value,
        addressLine2: delivery.addressLine2.value || undefined,
        city: delivery.city.value,
        state: delivery.state.value,
        pincode: delivery.pincode.value
      },
      paymentMethod: paymentMethod === 'card' ? 'Credit Card' : paymentMethod === 'upi' ? `UPI (${upiId.value})` : paymentMethod === 'netbank' ? `NetBanking (${netbank.value})` : 'Cash on Delivery',
      status: 'Confirmed'
    };

    setTimeout(() => {
      onAddOrder(orderObj);
      setOrderSummaryId(ordId);
      setIsSubmitting(false);
      onClearCart();
      setStep(3);
      onAddToast('Order place success! We loaded order summary details.', 'success');
      // Fire Confetti explosion of particles
      setTimeout(() => {
        runConfettiExplosion();
      }, 500);
    }, 2000);
  };

  // Window resizing adjustments on Confetti Canvas
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current && step === 3) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [step]);

  return (
    <div className="bg-[#FAFAFA] dark:bg-[#0D0D0D] transition-colors min-h-screen pb-16 relative">
      {/* Absolute Confetti canvas element */}
      {step === 3 && (
        <canvas
          ref={canvasRef}
          className="fixed inset-0 pointer-events-none z-50 w-full h-full"
        />
      )}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Step progression indicators */}
        <div className="mx-auto max-w-3xl mb-10">
          <div className="flex items-center justify-between text-xs text-gray-400 font-bold uppercase tracking-widest relative">
            {/* Horizontal progress background */}
            <div className="absolute left-0 right-0 top-3 h-0.5 bg-gray-200 dark:bg-gray-800 z-1" />
            
            {/* Dynamic visual slider */}
            <div 
              className="absolute left-0 top-3 h-0.5 bg-indigo-600 z-2 transition-all duration-300" 
              style={{ width: `${(step - 1) * 50}%` }}
            />

            {[
              { num: 1, label: 'Delivery Details' },
              { num: 2, label: 'Payment Method' },
              { num: 3, label: 'Order Confirmed' }
            ].map((s) => (
              <div key={s.num} className="flex flex-col items-center gap-1.5 z-3 relative">
                <div className={`h-7 w-7 rounded-full flex items-center justify-center text-3xs font-extrabold ${
                  step > s.num 
                    ? 'bg-emerald-500 text-white shadow-3xs' 
                    : step === s.num 
                      ? 'bg-indigo-600 text-white animate-pulse'
                      : 'bg-gray-200 dark:bg-gray-808 text-gray-400'
                }`}>
                  {step > s.num ? '✓' : s.num}
                </div>
                <span className={`text-4xs sm:text-3xs ${step === s.num ? 'text-indigo-600 dark:text-indigo-400 font-extrabold' : ''}`}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* STEP 1: DELIVERY FORM */}
        {step === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Inputs Col (2/3 width) */}
            <div className="lg:col-span-2 rounded-2xl border border-gray-150 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] shadow-md p-6 flex flex-col gap-5">
              <h2 className="text-[#111827] dark:text-[#F9FAFB] text-md font-bold uppercase tracking-wider border-b pb-3 dark:border-gray-800">
                1. Delivery Destination Details
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full name */}
                <div className="flex flex-col gap-1.5 text-xs">
                  <label htmlFor="fullName" className="font-bold text-gray-700 dark:text-gray-350">Recipient Full Name *</label>
                  <input
                    id="fullName"
                    type="text"
                    value={delivery.fullName.value}
                    onBlur={() => handleDeliveryBlur('fullName')}
                    onChange={(e) => handleDeliveryChange('fullName', e.target.value)}
                    placeholder="Rahul Sharma"
                    className={`rounded-xl border bg-gray-50 dark:bg-[#242424] py-2.5 px-3 focus:outline-hidden ${
                      delivery.fullName.touched && delivery.fullName.error 
                        ? 'border-rose-500 ring-2 ring-rose-500/10' 
                        : 'border-gray-200 dark:border-gray-800 focus:border-indigo-500 focus:bg-white'
                    }`}
                  />
                  {delivery.fullName.touched && delivery.fullName.error && (
                    <span className="text-rose-500 text-2xs font-semibold px-1 mt-0.5">{delivery.fullName.error}</span>
                  )}
                </div>

                {/* Email Address */}
                <div className="flex flex-col gap-1.5 text-xs">
                  <label htmlFor="email" className="font-bold text-gray-700 dark:text-gray-350">Email Address *</label>
                  <input
                    id="email"
                    type="email"
                    value={delivery.email.value}
                    onBlur={() => handleDeliveryBlur('email')}
                    onChange={(e) => handleDeliveryChange('email', e.target.value)}
                    placeholder="name@address.com"
                    className={`rounded-xl border bg-gray-50 dark:bg-[#242424] py-2.5 px-3 focus:outline-hidden ${
                      delivery.email.touched && delivery.email.error 
                        ? 'border-rose-500 ring-2 ring-rose-500/10' 
                        : 'border-gray-200 dark:border-gray-800 focus:border-indigo-500 focus:bg-white'
                    }`}
                  />
                  {delivery.email.touched && delivery.email.error && (
                    <span className="text-rose-500 text-2xs font-semibold px-1 mt-0.5">{delivery.email.error}</span>
                  )}
                </div>

                {/* Mobile Phone */}
                <div className="flex flex-col gap-1.5 text-xs">
                  <label htmlFor="phone" className="font-bold text-gray-700 dark:text-gray-350">Mobile Contact Number *</label>
                  <input
                    id="phone"
                    type="tel"
                    value={delivery.phone.value}
                    onBlur={() => handleDeliveryBlur('phone')}
                    onChange={(e) => handleDeliveryChange('phone', e.target.value)}
                    placeholder="9876543210"
                    className={`rounded-xl border bg-gray-50 dark:bg-[#242424] py-2.5 px-3 focus:outline-hidden ${
                      delivery.phone.touched && delivery.phone.error 
                        ? 'border-rose-500 ring-2 ring-rose-500/10' 
                        : 'border-gray-200 dark:border-gray-800 focus:border-indigo-500 focus:bg-white'
                    }`}
                  />
                  {delivery.phone.touched && delivery.phone.error && (
                    <span className="text-rose-500 text-2xs font-semibold px-1 mt-0.5">{delivery.phone.error}</span>
                  )}
                </div>

                {/* Pin Code */}
                <div className="flex flex-col gap-1.5 text-xs">
                  <label htmlFor="pincode" className="font-bold text-gray-700 dark:text-gray-350">Postal Pincode (6 digits) *</label>
                  <input
                    id="pincode"
                    type="text"
                    maxLength={6}
                    value={delivery.pincode.value}
                    onBlur={() => handleDeliveryBlur('pincode')}
                    onChange={(e) => handleDeliveryChange('pincode', e.target.value.replace(/\D/g, ''))}
                    placeholder="400001"
                    className={`rounded-xl border bg-gray-50 dark:bg-[#242424] py-2.5 px-3 focus:outline-hidden ${
                      delivery.pincode.touched && delivery.pincode.error 
                        ? 'border-rose-500 ring-2 ring-rose-500/10' 
                        : 'border-gray-200 dark:border-gray-800 focus:border-indigo-500 focus:bg-white'
                    }`}
                  />
                  {delivery.pincode.touched && delivery.pincode.error && (
                    <span className="text-rose-500 text-2xs font-semibold px-1 mt-0.5">{delivery.pincode.error}</span>
                  )}
                </div>
              </div>

              {/* Address rows full widths */}
              <div className="flex flex-col gap-1.5 text-xs">
                <label htmlFor="addressLine1" className="font-bold text-gray-700 dark:text-gray-350">Street Address Line 1 *</label>
                <input
                  id="addressLine1"
                  type="text"
                  value={delivery.addressLine1.value}
                  onBlur={() => handleDeliveryBlur('addressLine1')}
                  onChange={(e) => handleDeliveryChange('addressLine1', e.target.value)}
                  placeholder="Flat No, Building Name, Street Road Details"
                  className={`rounded-xl border bg-gray-50 dark:bg-[#242424] py-2.5 px-3 focus:outline-hidden ${
                    delivery.addressLine1.touched && delivery.addressLine1.error 
                      ? 'border-rose-500 ring-2 ring-rose-500/10' 
                      : 'border-gray-200 dark:border-gray-800 focus:border-indigo-500 focus:bg-white'
                  }`}
                />
                {delivery.addressLine1.touched && delivery.addressLine1.error && (
                  <span className="text-rose-500 text-2xs font-semibold px-1 mt-0.5">{delivery.addressLine1.error}</span>
                )}
              </div>

              <div className="flex flex-col gap-1.5 text-xs">
                <label htmlFor="addressLine2" className="font-bold text-gray-700 dark:text-gray-350">Address Line 2 (Optional landmark, etc.)</label>
                <input
                  id="addressLine2"
                  type="text"
                  value={delivery.addressLine2.value}
                  onChange={(e) => setDelivery(p => ({ ...p, addressLine2: { ...p.addressLine2, value: e.target.value } }))}
                  placeholder="Near Post Office, Sector 4..."
                  className="rounded-xl border border-gray-200 dark:border-gray-805 bg-gray-50 dark:bg-[#242424] py-2.5 px-3 focus:outline-hidden focus:border-indigo-500 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* City */}
                <div className="flex flex-col gap-1.5 text-xs">
                  <label htmlFor="city" className="font-bold text-gray-700 dark:text-gray-350">Delivery City *</label>
                  <input
                    id="city"
                    type="text"
                    value={delivery.city.value}
                    onBlur={() => handleDeliveryBlur('city')}
                    onChange={(e) => handleDeliveryChange('city', e.target.value)}
                    placeholder="Mumbai"
                    className={`rounded-xl border bg-gray-50 dark:bg-[#242424] py-2.5 px-3 focus:outline-hidden ${
                      delivery.city.touched && delivery.city.error 
                        ? 'border-rose-500 ring-2 ring-rose-500/10' 
                        : 'border-gray-200 dark:border-gray-800 focus:border-indigo-500 focus:bg-white'
                    }`}
                  />
                  {delivery.city.touched && delivery.city.error && (
                    <span className="text-rose-500 text-2xs font-semibold px-1 mt-0.5">{delivery.city.error}</span>
                  )}
                </div>

                {/* State Dropdown */}
                <div className="flex flex-col gap-1.5 text-xs">
                  <label htmlFor="state" className="font-bold text-gray-700 dark:text-gray-350">Delivery State *</label>
                  <select
                    id="state"
                    value={delivery.state.value}
                    onBlur={() => handleDeliveryBlur('state')}
                    onChange={(e) => handleDeliveryChange('state', e.target.value)}
                    className={`rounded-xl border bg-gray-50 dark:bg-[#242424] py-2.5 px-3 focus:outline-hidden ${
                      delivery.state.touched && delivery.state.error 
                        ? 'border-rose-500 ring-2 ring-rose-500/10' 
                        : 'border-gray-200 dark:border-gray-808 focus:border-indigo-500 focus:bg-white'
                    }`}
                  >
                    <option value="">-- Choose State --</option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                  </select>
                  {delivery.state.touched && delivery.state.error && (
                    <span className="text-rose-500 text-2xs font-semibold px-1 mt-0.5">{delivery.state.error}</span>
                  )}
                </div>
              </div>

              {/* Action buttons footer */}
              <div className="mt-4 flex justify-between border-t border-gray-100 dark:border-gray-800 pt-5">
                <button
                  onClick={() => onNavigate('/cart')}
                  className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white hover:bg-gray-50 px-5 py-2.5 text-xs font-semibold text-gray-600 dark:text-gray-400 cursor-pointer"
                >
                  Back to shopping bag
                </button>
                <button
                  onClick={() => isDeliveryValid() && setStep(2)}
                  disabled={!isDeliveryValid()}
                  className="rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-150 disabled:text-gray-400 flex items-center justify-center gap-1.5 text-xs font-bold text-white px-6 py-2.5 shadow-sm hover:scale-101 active:scale-99 transition-all cursor-pointer"
                >
                  Continue to Delivery Payment
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Bill Summary Right column (1/3 width) */}
            <div className="rounded-2xl border border-gray-150 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] shadow-xs p-5 flex flex-col gap-4">
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#111827] dark:text-[#F9FAFB] border-b pb-2.5 dark:border-gray-800">
                Order Financial breakdown
              </h3>
              <div className="flex flex-col gap-2 text-xs text-gray-500">
                <div className="flex justify-between"><span>Subtotal:</span><span className="font-semibold text-gray-800 dark:text-gray-300 font-mono">{formatCurrency(subtotal)}</span></div>
                {discountAmount > 0 && <div className="flex justify-between text-rose-500 font-semibold"><span>Voucher 10%:</span><span className="font-mono">-{formatCurrency(discountAmount)}</span></div>}
                <div className="flex justify-between"><span>Shipping:</span><span className="font-semibold text-gray-800 dark:text-gray-300 font-mono">{shippingCharge === 0 ? 'FREE' : formatCurrency(shippingCharge)}</span></div>
                <div className="flex justify-between"><span>Taxes GST (18%):</span><span className="font-semibold text-gray-800 dark:text-gray-300 font-mono">{formatCurrency(taxAmount)}</span></div>
                <div className="border-t border-dashed border-gray-150 dark:border-gray-800 my-2" />
                <div className="flex justify-between text-sm font-extrabold text-indigo-600 dark:text-indigo-400"><span>Grand Total:</span><span className="font-mono text-md">{formatCurrency(grandTotal)}</span></div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: PAYMENT METHOD */}
        {step === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start animate-fadeUp">
            
            {/* Payment selections leftmost panel */}
            <div className="lg:col-span-2 rounded-2xl border border-gray-150 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] shadow-md p-6 flex flex-col gap-5">
              <h2 className="text-[#111827] dark:text-[#F9FAFB] text-md font-bold uppercase tracking-wider border-b pb-3 dark:border-gray-800">
                2. Select Secure Payment Gateway
              </h2>

              {/* Radio Group Panels */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'card', label: 'Credit Card', icon: <CreditCard className="h-4.5 w-4.5" /> },
                  { id: 'upi', label: 'UPI / GPay ID', icon: <Smartphone className="h-4.5 w-4.5" /> },
                  { id: 'netbank', label: 'Net Banking', icon: <Landmark className="h-4.5 w-4.5" /> },
                  { id: 'cod', label: 'Cash on Delivery', icon: <Clock className="h-4.5 w-4.5" /> }
                ].map((pay) => (
                  <div
                    key={pay.id}
                    onClick={() => setPaymentMethod(pay.id as any)}
                    className={`rounded-2xl border p-4 flex items-center gap-3 cursor-pointer shadow-3xs transition-all ${
                      paymentMethod === pay.id
                        ? 'border-indigo-500 bg-indigo-50/40 dark:bg-indigo-950/20 ring-2 ring-indigo-500/20 text-indigo-700 dark:text-indigo-300 font-bold'
                        : 'border-gray-150 dark:border-gray-800 hover:border-gray-300 bg-white dark:bg-[#1a1a1a]'
                    }`}
                  >
                    <div className="flex-shrink-0 text-gray-400 dark:text-gray-300">{pay.icon}</div>
                    <span className="text-xs leading-none">{pay.label}</span>
                  </div>
                ))}
              </div>

              {/* CARD DETAILS FORM FLI CARD AREA */}
              {paymentMethod === 'card' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center pt-4 border-t border-gray-100 dark:border-gray-850">
                  {/* Card input forms */}
                  <div className="flex flex-col gap-4">
                    {/* Holder name */}
                    <div className="flex flex-col gap-1.5 text-xs">
                      <label htmlFor="cardName" className="font-bold text-gray-700 dark:text-gray-350">Name on Credit Card *</label>
                      <input
                        id="cardName"
                        type="text"
                        value={cardDetails.name.value}
                        onBlur={() => handleCardFieldBlur('name')}
                        onChange={(e) => handleCardFieldChange('name', e.target.value)}
                        placeholder="Rahul Sharma"
                        className={`rounded-xl border bg-gray-50 dark:bg-[#242424] py-2 px-3 focus:outline-hidden ${
                          cardDetails.name.touched && cardDetails.name.error 
                            ? 'border-rose-500 ring-2 ring-rose-500/10' 
                            : 'border-gray-200 dark:border-gray-800 focus:border-indigo-500 focus:bg-white'
                        }`}
                      />
                      {cardDetails.name.touched && cardDetails.name.error && (
                        <span className="text-rose-500 text-2xs font-semibold px-1 mt-0.5">{cardDetails.name.error}</span>
                      )}
                    </div>

                    {/* Card number */}
                    <div className="flex flex-col gap-1.5 text-xs">
                      <label htmlFor="cardNumber" className="font-bold text-gray-700 dark:text-gray-350">Card Numbers (16 digits) *</label>
                      <input
                        id="cardNumber"
                        type="text"
                        value={cardDetails.number.value}
                        onBlur={() => handleCardFieldBlur('number')}
                        onChange={(e) => handleCardFieldChange('number', e.target.value)}
                        placeholder="4532 9845 2311 9042"
                        className={`rounded-xl border bg-gray-50 dark:bg-[#242424] py-2 px-3 focus:outline-hidden ${
                          cardDetails.number.touched && cardDetails.number.error 
                            ? 'border-rose-500 ring-2 ring-rose-500/10' 
                            : 'border-gray-200 dark:border-gray-800 focus:border-indigo-500 focus:bg-white'
                        }`}
                      />
                      {cardDetails.number.touched && cardDetails.number.error && (
                        <span className="text-rose-500 text-2xs font-semibold px-1 mt-0.5">{cardDetails.number.error}</span>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {/* Expiry */}
                      <div className="flex flex-col gap-1.5 text-xs">
                        <label htmlFor="cardExpiry" className="font-bold text-gray-700 dark:text-gray-350">Expiry Date (MM/YY) *</label>
                        <input
                          id="cardExpiry"
                          type="text"
                          value={cardDetails.expiry.value}
                          onBlur={() => handleCardFieldBlur('expiry')}
                          onChange={(e) => handleCardFieldChange('expiry', e.target.value)}
                          placeholder="12/28"
                          className={`rounded-xl border bg-gray-50 dark:bg-[#242424] py-2 px-3 focus:outline-hidden ${
                            cardDetails.expiry.touched && cardDetails.expiry.error 
                              ? 'border-rose-500 ring-2 ring-rose-500/10' 
                              : 'border-gray-200 dark:border-gray-800 focus:border-indigo-500 focus:bg-white'
                          }`}
                        />
                        {cardDetails.expiry.touched && cardDetails.expiry.error && (
                          <span className="text-rose-500 text-2xs font-semibold px-1 mt-0.5">{cardDetails.expiry.error}</span>
                        )}
                      </div>

                      {/* CVV */}
                      <div className="flex flex-col gap-1.5 text-xs">
                        <label htmlFor="cardCvv" className="font-bold text-gray-700 dark:text-gray-350">CVV Pin (3 digits) *</label>
                        <input
                          id="cardCvv"
                          type="password"
                          maxLength={3}
                          value={cardDetails.cvv.value}
                          onFocus={() => setIsCvvFocused(true)}
                          onBlur={() => {
                            setIsCvvFocused(false);
                            handleCardFieldBlur('cvv');
                          }}
                          onChange={(e) => handleCardFieldChange('cvv', e.target.value)}
                          placeholder="•••"
                          className={`rounded-xl border bg-gray-50 dark:bg-[#242424] py-2 px-3 focus:outline-hidden ${
                            cardDetails.cvv.touched && cardDetails.cvv.error 
                              ? 'border-rose-500 ring-2 ring-rose-500/10' 
                              : 'border-gray-200 dark:border-gray-800 focus:border-indigo-500 focus:bg-white'
                          }`}
                        />
                        {cardDetails.cvv.touched && cardDetails.cvv.error && (
                          <span className="text-rose-500 text-2xs font-semibold px-1 mt-0.5">{cardDetails.cvv.error}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* MINI CREDIT CARD FLIPPER DESKTOP PREVIEW */}
                  <div className="hidden md:flex justify-center flex-col items-center">
                    <div 
                      className="w-72 h-44 rounded-2xl relative shadow-lg text-white font-mono p-5 overflow-hidden border border-white/10 transition-transform duration-500"
                      style={{
                        transformStyle: 'preserve-3d',
                        background: 'linear-gradient(135deg, #4f46e5 0%, #1e1b4b 100%)',
                        transform: isCvvFocused ? 'rotateY(180deg)' : 'rotateY(0deg)'
                      }}
                    >
                      {/* Front card details */}
                      <div 
                        className="absolute inset-0 p-5 flex flex-col justify-between"
                        style={{ backfaceVisibility: 'hidden' }}
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-extrabold tracking-widest uppercase">SafeGate Pay</span>
                          {/* VISA Chip */}
                          <div className="h-7 w-10 bg-amber-300/80 rounded-md ring-1 ring-white/10" />
                        </div>
                        <div className="text-sm font-bold tracking-widest text-center mt-4">
                          {cardDetails.number.value || '•••• •••• •••• ••••'}
                        </div>
                        <div className="flex justify-between items-center text-3xs uppercase tracking-wider mt-4">
                          <div>
                            <span className="block text-[#C7D2FE] text-4xs">Card Holder</span>
                            <span className="font-semibold block truncate max-w-40">{cardDetails.name.value || 'YOUR NAME'}</span>
                          </div>
                          <div>
                            <span className="block text-[#C7D2FE] text-4xs">Expires</span>
                            <span className="font-semibold block">{cardDetails.expiry.value || 'MM/YY'}</span>
                          </div>
                        </div>
                      </div>

                      {/* Back card details (Reveals CVV) */}
                      <div 
                        className="absolute inset-0 flex flex-col justify-between py-5 text-white"
                        style={{
                          backfaceVisibility: 'hidden',
                          transform: 'rotateY(180deg)',
                          background: 'linear-gradient(135deg, #1e1b4b 0%, #0d0d0d 100%)'
                        }}
                      >
                        {/* Black strip magnet */}
                        <div className="bg-black/90 w-full h-8 mt-2" />
                        <div className="px-5">
                          <span className="text-4xs uppercase block text-gray-400 text-right">Security Code</span>
                          <div className="bg-white/90 text-gray-900 rounded-md font-bold px-3 py-1 font-mono text-xs text-right mt-1 font-mono">
                            {cardDetails.cvv.value || '•••'}
                          </div>
                        </div>
                        <p className="text-4xs text-gray-500 text-center uppercase tracking-widest mb-1">GateLock verified systems</p>
                      </div>
                    </div>
                  </div>

                </div>
              )}

              {/* UPI Form */}
              {paymentMethod === 'upi' && (
                <div className="pt-4 border-t border-gray-100 dark:border-gray-850 flex flex-col gap-3">
                  <div className="flex flex-col gap-1.5 text-xs max-w-md">
                    <label htmlFor="upiId" className="font-bold text-gray-700 dark:text-gray-350">Enter Virtual Private UPI Address *</label>
                    <input
                      id="upiId"
                      type="text"
                      value={upiId.value}
                      onChange={(e) => setUpiId({ ...upiId, value: e.target.value })}
                      placeholder="e.g. user@okhdfcbank"
                      className="rounded-xl border border-gray-200 dark:border-gray-808 bg-gray-50 dark:bg-[#242424] py-2.5 px-3 focus:outline-hidden focus:border-indigo-500 focus:bg-white"
                    />
                  </div>
                  <p className="text-3xs text-gray-400 dark:text-gray-500 leading-normal">
                    Enter your unified payment ID. We will ping a payment notification checkout slip to your mobile payment app instantly during confirmation events.
                  </p>
                </div>
              )}

              {/* Net Bank Dropdown */}
              {paymentMethod === 'netbank' && (
                <div className="pt-4 border-t border-gray-100 dark:border-gray-850 flex flex-col gap-3">
                  <div className="flex flex-col gap-1.5 text-xs max-w-md">
                    <label htmlFor="netBankSelection" className="font-bold text-gray-700 dark:text-gray-350">Choose Authorized Banking Portal *</label>
                    <select
                      id="netBankSelection"
                      value={netbank.value}
                      onChange={(e) => setNetbank({ ...netbank, value: e.target.value })}
                      className="rounded-xl border border-gray-200 dark:border-gray-808 bg-gray-50 dark:bg-[#242424] py-2.5 px-3 focus:outline-hidden focus:border-indigo-500 focus:bg-white"
                    >
                      <option value="">-- Choose Authorized Bank --</option>
                      <option value="HDFC Bank">HDFC Private Bank</option>
                      <option value="State Bank of India">State Bank of India</option>
                      <option value="ICICI Bank">ICICI Bank</option>
                      <option value="Axis Bank">Axis Bank</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Cash On Delivery */}
              {paymentMethod === 'cod' && (
                <div className="pt-4 border-t border-gray-100 dark:border-gray-850">
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed font-normal">
                    An additional ₹49 COD handling service fee charges may apply at doorsteps. Pay via physical money, cash envelopes, or any mobile QR scanner during final handshakes events with couriers.
                  </p>
                </div>
              )}

              {/* Form trigger footers */}
              <div className="mt-4 flex justify-between border-t border-gray-105 dark:border-gray-800 pt-5">
                <button
                  onClick={() => setStep(1)}
                  className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white hover:bg-gray-50 px-5 py-2.5 text-xs font-semibold text-gray-600 dark:text-gray-400 flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="h-4 w-4" /> Go back
                </button>
                <button
                  onClick={handlePlaceOrder}
                  disabled={!isPaymentValid() || isSubmitting}
                  className="rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-150 disabled:text-gray-400 flex items-center justify-center gap-1.5 text-xs font-bold text-white px-6 py-2.5 shadow-sm hover:scale-101 active:scale-99 transition-all cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin text-white" />
                      Validating secure card codes...
                    </>
                  ) : (
                    <>
                      Confirm & Securely Pay {formatCurrency(grandTotal)}
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>

            </div>

            {/* Financial break lists */}
            <div className="rounded-2xl border border-gray-150 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] shadow-xs p-5 flex flex-col gap-4">
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#111827] dark:text-[#F9FAFB] border-b pb-2.5 dark:border-gray-800">
                Summary Breakout
              </h3>
              <div className="flex flex-col gap-2 text-xs text-gray-500">
                <div className="flex justify-between"><span>Subtotal:</span><span className="font-semibold text-gray-800 dark:text-gray-300 font-mono">{formatCurrency(subtotal)}</span></div>
                {discountAmount > 0 && <div className="flex justify-between text-rose-500 font-semibold"><span>Coupon discount:</span><span className="font-mono">-{formatCurrency(discountAmount)}</span></div>}
                <div className="flex justify-between"><span>Shipping:</span><span className="font-semibold text-gray-800 dark:text-gray-300 font-mono">{shippingCharge === 0 ? 'FREE' : formatCurrency(shippingCharge)}</span></div>
                <div className="flex justify-between"><span>Tax GST (18%):</span><span className="font-semibold text-gray-800 dark:text-gray-300 font-mono">{formatCurrency(taxAmount)}</span></div>
                <div className="border-t border-dashed border-gray-150 dark:border-gray-800 my-2" />
                <div className="flex justify-between text-sm font-extrabold text-indigo-600 dark:text-indigo-400"><span>Grand Total:</span><span className="font-mono text-md">{formatCurrency(grandTotal)}</span></div>
              </div>
            </div>

          </div>
        )}

        {/* STEP 3: TRANSACTION SUCCESS & CONFIRMATION */}
        {step === 3 && (
          <div className="mx-auto max-w-2xl bg-white dark:bg-[#1a1a1a] border border-gray-150 dark:border-gray-800 shadow-xl rounded-3xl p-8 sm:p-12 text-center animate-fadeUp">
            
            {/* Draw checkmark circular icon */}
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-950/20 text-emerald-500 mb-6">
              <CheckCircle className="h-10 w-10 stroke-2 animate-scaleIn" />
            </div>

            <span className="text-3xs uppercase tracking-widest font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 px-3 py-1.5 rounded-full block mx-auto w-fit mb-2">
              Transaction Authorized Successfully
            </span>

            <h1 className="text-xl sm:text-2xl font-black text-gray-950 dark:text-white leading-snug">
              Thank you for shopping on ShopWave!
            </h1>

            <p className="text-xs text-gray-500 dark:text-gray-400 max-w-sm mx-auto mt-2 leading-relaxed font-normal">
              Your order payment was verified successfully. A confirmation email and tracking slips are shipping to your inbox.
            </p>

            {/* Receipt Summary Box */}
            <div className="bg-gray-50 dark:bg-[#242424]/45 rounded-2xl p-5 border border-gray-150 dark:border-gray-800/80 my-8 text-left flex flex-col gap-3 text-xs leading-normal">
              <div className="flex justify-between flex-wrap items-center">
                <span className="text-[#9CA3AF] font-bold uppercase tracking-wider text-2xs">Order Transaction ID</span>
                <span className="font-bold text-gray-950 dark:text-white font-mono">#{orderSummaryId}</span>
              </div>
              <div className="flex justify-between flex-wrap items-center">
                <span className="text-[#9CA3AF] font-bold uppercase tracking-wider text-2xs">Estimated Ground Delivery</span>
                <span className="font-bold text-indigo-600 dark:text-indigo-400">
                  {new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short' })}
                </span>
              </div>
              <div className="flex justify-between flex-wrap items-center">
                <span className="text-[#9CA3AF] font-bold uppercase tracking-wider text-2xs">Selected Gateway</span>
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  {paymentMethod === 'card' ? 'Unified Credit Card' : paymentMethod === 'upi' ? 'UPI Mobile App' : paymentMethod === 'netbank' ? 'Net Banking Portal' : 'Cash on Delivery'}
                </span>
              </div>
              <div className="border-t border-dashed border-gray-200 dark:border-gray-800/60 my-1" />
              <div className="flex justify-between flex-wrap items-center text-[#111827] dark:text-[#F9FAFB] font-extrabold text-sm">
                <span>Grand Paid Total</span>
                <span className="font-mono text-md">{formatCurrency(grandTotal)}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <button
                onClick={() => onNavigate('/shop')}
                className="w-full sm:w-auto rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 font-semibold text-xs shadow-md shadow-indigo-100 dark:shadow-none active:scale-97 transition-all cursor-pointer"
              >
                Continue Discovering Catalog
              </button>
              <button
                onClick={() => onNavigate('/orders')}
                className="w-full sm:w-auto rounded-xl border border-gray-250 dark:border-gray-800 font-semibold hover:bg-gray-50 text-gray-700 dark:text-gray-300 px-6 py-3 text-xs transition-colors cursor-pointer"
              >
                Track Past Shipments
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
