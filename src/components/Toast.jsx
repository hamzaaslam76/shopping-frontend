import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimes, FaShoppingCart, FaHeart } from 'react-icons/fa';

const Toast = ({ 
  type = 'success', 
  message, 
  duration = 3000, 
  onClose, 
  show = false,
  icon = null 
}) => {
  const [isVisible, setIsVisible] = useState(show);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      setIsLeaving(false);
      
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [show, duration]);

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, 300);
  };

  const getToastStyles = () => {
    const baseStyles = "fixed top-4 right-4 z-50 max-w-sm w-full bg-white rounded-lg shadow-lg border-l-4 transform transition-all duration-300 ease-in-out";
    
    if (isLeaving) {
      return `${baseStyles} translate-x-full opacity-0`;
    }
    
    if (isVisible) {
      return `${baseStyles} translate-x-0 opacity-100`;
    }
    
    return `${baseStyles} translate-x-full opacity-0`;
  };

  const getBorderColor = () => {
    switch (type) {
      case 'success': return 'border-green-500';
      case 'error': return 'border-red-500';
      case 'warning': return 'border-yellow-500';
      case 'info': return 'border-blue-500';
      default: return 'border-green-500';
    }
  };

  const getIcon = () => {
    if (icon) return icon;
    
    switch (type) {
      case 'success': return <FaCheckCircle className="text-green-500" />;
      case 'error': return <FaExclamationCircle className="text-red-500" />;
      case 'warning': return <FaExclamationCircle className="text-yellow-500" />;
      case 'info': return <FaInfoCircle className="text-blue-500" />;
      default: return <FaCheckCircle className="text-green-500" />;
    }
  };

  const getTitleColor = () => {
    switch (type) {
      case 'success': return 'text-green-800';
      case 'error': return 'text-red-800';
      case 'warning': return 'text-yellow-800';
      case 'info': return 'text-blue-800';
      default: return 'text-green-800';
    }
  };

  if (!isVisible) return null;

  return (
    <div className={getToastStyles()}>
      <div className={`${getBorderColor()} p-4`}>
        <div className="flex items-start">
          <div className="flex-shrink-0">
            {getIcon()}
          </div>
          <div className="ml-3 w-0 flex-1">
            <p className={`text-sm font-medium ${getTitleColor()}`}>
              {message}
            </p>
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              className="inline-flex text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 transition ease-in-out duration-150"
              onClick={handleClose}
            >
              <FaTimes className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Toast Hook for easy usage
export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'success', options = {}) => {
    const id = Date.now() + Math.random();
    const toast = {
      id,
      message,
      type,
      show: true,
      ...options
    };
    
    setToasts(prev => [...prev, toast]);
    return id;
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const ToastContainer = () => (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          {...toast}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );

  return {
    showToast,
    removeToast,
    ToastContainer,
    // Convenience methods
    success: (message, options) => showToast(message, 'success', options),
    error: (message, options) => showToast(message, 'error', options),
    warning: (message, options) => showToast(message, 'warning', options),
    info: (message, options) => showToast(message, 'info', options),
  };
};

// Pre-configured toast components for common use cases
export const CartToast = ({ show, onClose, productName, quantity = 1 }) => (
  <Toast
    show={show}
    onClose={onClose}
    type="success"
    message={`${productName} added to cart! (Qty: ${quantity})`}
    icon={<FaShoppingCart className="text-green-500" />}
    duration={2000}
  />
);

export const FavoriteToast = ({ show, onClose, productName, isAdded = true }) => (
  <Toast
    show={show}
    onClose={onClose}
    type="info"
    message={`${productName} ${isAdded ? 'added to' : 'removed from'} favorites!`}
    icon={<FaHeart className="text-pink-500" />}
    duration={2000}
  />
);

export default Toast;
