import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, AlertTriangle, Info, XCircle, X } from 'lucide-react';
import { Toast } from '../types';

interface ToastProps {
  toast: Toast;
  onClose: (id: string) => void;
}

const ToastItem: React.FC<ToastProps> = ({ toast, onClose }) => {
  const [progress, setProgress] = useState(100);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    
    const interval = 30; // ms
    const duration = 3000; // ms
    const step = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          onClose(toast.id);
          return 0;
        }
        return prev - step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isHovered, toast.id, onClose]);

  const getStyle = () => {
    switch (toast.type) {
      case 'success':
        return {
          bg: 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/60',
          text: 'text-emerald-800 dark:text-emerald-200',
          icon: <CheckCircle className="w-5 h-5 text-emerald-500" />,
          progressBg: 'bg-emerald-500'
        };
      case 'error':
        return {
          bg: 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800/60',
          text: 'text-rose-800 dark:text-rose-200',
          icon: <XCircle className="w-5 h-5 text-rose-500" />,
          progressBg: 'bg-rose-500'
        };
      case 'warning':
        return {
          bg: 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800/60',
          text: 'text-amber-800 dark:text-amber-200',
          icon: <AlertTriangle className="w-5 h-5 text-amber-500" />,
          progressBg: 'bg-amber-500'
        };
      case 'info':
      default:
        return {
          bg: 'bg-sky-50 dark:bg-sky-950/40 border-sky-200 dark:border-sky-800/60',
          text: 'text-sky-800 dark:text-sky-200',
          icon: <Info className="w-5 h-5 text-sky-500" />,
          progressBg: 'bg-sky-500'
        };
    }
  };

  const style = getStyle();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100, scale: 0.9 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className={`relative w-80 max-w-full overflow-hidden rounded-xl border p-4 shadow-lg backdrop-blur-md ${style.bg} ${style.text}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">{style.icon}</div>
        <div className="flex-1 text-sm font-medium pr-4 leading-relaxed">{toast.message}</div>
        <button
          onClick={() => onClose(toast.id)}
          className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg transition-colors cursor-pointer"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      {/* Depleting Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200/20">
        <div
          className={`h-full transition-all ease-linear ${style.progressBg}`}
          style={{ width: `${progress}%`, transitionDuration: '30ms' }}
        />
      </div>
    </motion.div>
  );
};

interface ToastContainerProps {
  toasts: Toast[];
  onRemove: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onRemove }) => {
  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-3 pointer-events-none">
      <div className="pointer-events-auto flex flex-col gap-3">
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => (
            <ToastItem key={toast.id} toast={toast} onClose={onRemove} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
