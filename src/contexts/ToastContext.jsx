import React, { createContext, useContext } from 'react';
import { useToast } from '../components/Toast';

const ToastContext = createContext();

export const useToastContext = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToastContext must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const toast = useToast();

  const showSuccess = (message, options = {}) => {
    return toast.success(message, { duration: 3000, ...options });
  };

  const showError = (message, options = {}) => {
    return toast.error(message, { duration: 4000, ...options });
  };

  const showWarning = (message, options = {}) => {
    return toast.warning(message, { duration: 3500, ...options });
  };

  const showInfo = (message, options = {}) => {
    return toast.info(message, { duration: 3000, ...options });
  };

  const showCartSuccess = (productName, quantity = 1) => {
    return toast.success(`${productName} added to cart! (Qty: ${quantity})`, {
      duration: 2500,
      icon: <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
      </svg>
    });
  };

  const showFavoriteSuccess = (productName, isAdded = true) => {
    return toast.info(`${productName} ${isAdded ? 'added to' : 'removed from'} favorites!`, {
      duration: 2000,
      icon: <svg className="w-5 h-5 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
      </svg>
    });
  };

  const showOrderSuccess = (orderNumber) => {
    return toast.success(`Order placed successfully! Order Number: ${orderNumber}`, {
      duration: 4000,
    });
  };

  const showValidationError = (message) => {
    return toast.error(message, { duration: 3500 });
  };

  const contextValue = {
    ...toast,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showCartSuccess,
    showFavoriteSuccess,
    showOrderSuccess,
    showValidationError,
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <toast.ToastContainer />
    </ToastContext.Provider>
  );
};
