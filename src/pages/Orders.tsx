import React, { useState } from 'react';
import { Order, Product } from '../types';
import { formatCurrency } from '../utils';
import { ChevronDown, ChevronUp, Package, Calendar, Clock, MapPin, CheckCircle, RefreshCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface OrdersProps {
  orders: Order[];
  onReorder: (order: Order) => void;
  onNavigate: (path: string) => void;
}

const OrderRowItem: React.FC<{ order: Order; onReorder: () => void; onNavigate: (path: string) => void }> = ({
  order,
  onReorder,
  onNavigate
}) => {
  const [expanded, setExpanded] = useState(false);

  // Helper to resolve steps classes on status steppers
  const getStatusStep = () => {
    switch (order.status) {
      case 'Confirmed': return 1;
      case 'Processing': return 2;
      case 'Shipped': return 3;
      case 'Delivered': return 4;
      default: return 1;
    }
  };

  const currentStepNum = getStatusStep();

  const steps = [
    { label: 'Confirmed', desc: 'Order received' },
    { label: 'Processing', desc: 'Assembling items' },
    { label: 'Shipped', desc: 'In transit' },
    { label: 'Delivered', desc: 'Arrived at destination' }
  ];

  return (
    <div className="rounded-2xl border border-gray-150 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] shadow-xs hover:shadow-md transition-shadow divide-y divide-gray-100 dark:divide-gray-800">
      {/* Header Summary Row */}
      <div 
        className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          {/* Order Icon */}
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400">
            <Package className="h-5 w-5" />
          </div>
          <div>
            <span className="text-3xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest block">Transaction ID</span>
            <span className="text-sm font-bold text-gray-900 dark:text-white">#{order.id}</span>
          </div>
          <div className="border-l border-gray-200 dark:border-gray-800 h-8 hidden sm:block" />
          <div>
            <span className="text-3xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest block">Order Placed</span>
            <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1 mt-0.5">
              <Calendar className="h-3.5 w-3.5 text-gray-400" />
              {new Date(order.date).toLocaleDateString('en-IN', { dateStyle: 'medium' })}
            </span>
          </div>
          <div className="border-l border-gray-200 dark:border-gray-800 h-8 hidden sm:block" />
          <div>
            <span className="text-3xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest block">Full Total</span>
            <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{formatCurrency(order.total)}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto">
          {/* Status Capsule */}
          <span className={`rounded-full px-3 py-1 text-3xs font-semibold uppercase tracking-wider ${
            order.status === 'Delivered' 
              ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400' 
              : order.status === 'Shipped' 
                ? 'bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400'
                : 'bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400'
          }`}>
            {order.status}
          </span>

          <button
            onClick={() => setExpanded(!expanded)}
            className="rounded-lg p-1 hover:bg-gray-100 dark:hover:bg-[#242424] text-gray-400"
            aria-label="Expand order details"
          >
            {expanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Expanded block section details */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-gray-50/50 dark:bg-[#1f1f1f]/20"
          >
            <div className="p-5 flex flex-col gap-6">
              
              {/* Timeline Stepper (Sections 4) */}
              <div>
                <span className="text-3xs uppercase tracking-widest text-[#9CA3AF] font-bold block mb-4">Shipment Progress Live Track</span>
                <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-2">
                  {steps.map((step, index) => {
                    const stepNum = index + 1;
                    const isCompleted = stepNum < currentStepNum;
                    const isActive = stepNum === currentStepNum;
                    
                    return (
                      <div key={index} className="flex-1 flex gap-2.5 md:flex-col items-start md:items-center relative">
                        {/* Connecting horizontal rod on desktop */}
                        {index < steps.length - 1 && (
                          <div className={`hidden md:block absolute left-1/2 right-[-50%] top-3 h-0.5 z-1 ${
                            isCompleted ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-800'
                          }`} />
                        )}

                        {/* Node circle */}
                        <div className={`h-6.5 w-6.5 rounded-full flex items-center justify-center text-3xs font-extrabold z-2 ${
                          isCompleted
                            ? 'bg-emerald-500 text-white shadow-3xs'
                            : isActive
                              ? 'bg-indigo-600 text-white animate-pulse'
                              : 'bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                        }`}>
                          {isCompleted ? '✓' : stepNum}
                        </div>

                        <div className="text-left md:text-center">
                          <h4 className={`text-2xs font-bold leading-normal ${
                            isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-[#111827] dark:text-[#F9FAFB]'
                          }`}>{step.label}</h4>
                          <p className="text-3xs text-gray-400">{step.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-5 border-t border-gray-100 dark:border-gray-800">
                {/* Delivery details left */}
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center gap-1.5 text-2xs font-bold tracking-widest text-[#9CA3AF] uppercase">
                    <MapPin className="h-3.5 w-3.5" /> Direct Delivery Address
                  </div>
                  <div className="text-xs bg-white dark:bg-[#1a1a1a] border border-gray-100 dark:border-gray-800/60 rounded-xl p-4 leading-relaxed text-[#6B7280] dark:text-[#9CA3AF]">
                    <span className="font-bold text-gray-950 dark:text-white block">{order.address.fullName}</span>
                    <p className="mt-1">{order.address.addressLine1}</p>
                    {order.address.addressLine2 && <p>{order.address.addressLine2}</p>}
                    <p>{order.address.city}, {order.address.state} - {order.address.pincode}</p>
                    <p className="mt-2 text-3xs font-medium">Contact: {order.address.phone} | {order.address.email}</p>
                  </div>
                </div>

                {/* Pricing Summary right */}
                <div className="flex flex-col gap-2.5">
                  <span className="text-2xs font-bold tracking-widest text-[#9CA3AF] uppercase block pl-1">Financial Summary</span>
                  <div className="bg-white dark:bg-[#1a1a1a] border border-gray-100 dark:border-gray-800/60 rounded-xl p-4 flex flex-col gap-2.5 text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex justify-between items-center text-xs font-semibold text-gray-700 dark:text-gray-300">
                      <span>Item Subtotal</span>
                      <span>{formatCurrency(order.subtotal)}</span>
                    </div>
                    {order.discount > 0 && (
                      <div className="flex justify-between items-center text-xs font-semibold text-rose-500">
                        <span>Coupon Discount Applied</span>
                        <span>-{formatCurrency(order.discount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center text-xs text-gray-400 dark:text-gray-500">
                      <span>Shipping Fees</span>
                      <span>{order.shipping === 0 ? 'FREE' : formatCurrency(order.shipping)}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs text-gray-400 dark:text-gray-500">
                      <span>Total tax (18% GST)</span>
                      <span>{formatCurrency(order.tax)}</span>
                    </div>
                    <div className="border-t border-dashed border-gray-150 dark:border-gray-800 my-1" />
                    <div className="flex justify-between items-center text-sm font-extrabold text-indigo-600 dark:text-indigo-400">
                      <span>Grand Total Bill</span>
                      <span>{formatCurrency(order.total)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Items List detail */}
              <div className="pt-5 border-t border-gray-150 dark:border-gray-800">
                <span className="text-2xs font-bold tracking-widest text-[#9CA3AF] uppercase block mb-3">Purchased Items Bundle</span>
                <div className="flex flex-col gap-3">
                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between gap-4 bg-white dark:bg-[#1a1a1a] rounded-xl p-3 border border-gray-100 dark:border-gray-850 cursor-pointer hover:border-indigo-100/50"
                      onClick={() => onNavigate(`/product/${item.id}`)}
                    >
                      <div className="flex items-center gap-3">
                        <img src={item.image} alt="" className="h-10 w-10 rounded-lg object-cover" />
                        <div>
                          <h4 className="text-xs font-bold text-gray-900 dark:text-white truncate max-w-sm sm:max-w-md">{item.name}</h4>
                          <span className="text-3xs text-gray-400 dark:text-gray-500 mt-0.5 block capitalize">
                            {item.color && `Color: ${item.color} | `}{item.size && `Size: ${item.size} | `}Quantity: {item.qty}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-gray-901 dark:text-white">{formatCurrency(item.price * item.qty)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reorder and CTA button */}
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-150 dark:border-gray-850">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onReorder();
                  }}
                  className="rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center gap-1 text-2xs font-semibold py-2 px-4 shadow-3xs cursor-pointer active:scale-97 transition-all"
                >
                  <RefreshCcw className="h-3.5 w-3.5" />
                  Reorder Entire Bundle
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const Orders: React.FC<OrdersProps> = ({ orders, onReorder, onNavigate }) => {
  return (
    <div className="bg-[#FAFAFA] dark:bg-[#0D0D0D] transition-colors min-h-screen pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header Title block */}
        <div className="mb-8">
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Order Status & History
          </h1>
          <p className="text-xs text-gray-400 mt-1 dark:text-gray-500 font-normal">
            Track your in-transit shipments and review past orders here.
          </p>
        </div>

        {/* Display List of Orders */}
        {orders.length > 0 ? (
          <div className="flex flex-col gap-5">
            {orders.map((order) => (
              <OrderRowItem
                key={order.id}
                order={order}
                onReorder={() => onReorder(order)}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        ) : (
          /* Empty orders */
          <div className="mt-12 flex flex-col items-center justify-center p-8 border border-dashed border-gray-200 dark:border-gray-800 rounded-3xl py-16 text-center bg-white dark:bg-[#1a1a1a]">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50 dark:bg-indigo-950/20 text-indigo-600 mb-4 animate-pulse">
              <Package className="h-7 w-7" />
            </div>
            <h2 className="text-md font-bold text-gray-900 dark:text-white">No past orders discovered</h2>
            <p className="max-w-xs text-xs text-gray-400 dark:text-gray-500 leading-normal mt-1.5 font-normal">
              You haven't placed any products orders yet. Complete a checkout transaction to generate records!
            </p>
            <button
              onClick={() => onNavigate('/shop')}
              className="mt-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 text-xs font-semibold shadow-md active:scale-97 transition-all cursor-pointer"
            >
              Start Curation Shop
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
