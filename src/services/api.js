import axios from 'axios';
import { API_CONFIG, getApiUrl } from '../config/api.js';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: getApiUrl('/api/v1/customer'),
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add any auth tokens or other headers here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Product API functions
export const productAPI = {
  // Get all products with filters
  getProducts: (params = {}) => {
    return api.get('/products', { params });
  },

  // Get single product by ID
  getProduct: (id) => {
    return api.get(`/products/${id}`);
  },

  // Get featured products
  getFeaturedProducts: () => {
    return api.get('/products/featured');
  },

  // Get new arrivals
  getNewArrivals: () => {
    return api.get('/products/new-arrivals');
  },

  // Get recommended products
  getRecommendedProducts: (params = {}) => {
    return api.get('/products/recommended', { params });
  },

  // Get Hac Foods products
  getHacFoodsProducts: (params = {}) => {
    return api.get('/products/hacfoods', { params });
  },

  // Search products
  searchProducts: (query, params = {}) => {
    return api.get('/products/search', { 
      params: { q: query, ...params } 
    });
  },

  // Get products by category
  getProductsByCategory: (categoryId, params = {}) => {
    return api.get(`/products/category/${categoryId}`, { params });
  },

  // Get product statistics
  getProductStats: () => {
    return api.get('/products/stats');
  }
};

// Category API functions
export const categoryAPI = {
  // Get all categories
  getCategories: () => {
    return api.get('/categories');
  },

  // Get featured categories
  getFeaturedCategories: () => {
    return api.get('/categories/featured');
  }
};

// Order API functions
export const orderAPI = {
  // Create guest order
  createGuestOrder: (orderData) => {
    return api.post('/orders/guest', orderData);
  },

  // Track order by order number
  trackOrder: (orderNumber) => {
    return api.get(`/orders/track/${orderNumber}`);
  }
};

// Utility functions
export const utils = {
  // Format price for display
  formatPrice: (price) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
    }).format(price);
  },

  // Format date for display
  formatDate: (date) => {
    return new Date(date).toLocaleDateString('en-PK', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  },

  // Generate order number (for client-side use)
  generateOrderNumber: () => {
    return 'ORD' + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase();
  },

  // Calculate discount percentage
  calculateDiscount: (originalPrice, currentPrice) => {
    if (originalPrice <= currentPrice) return 0;
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
  },

  // Validate email
  validateEmail: (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  },

  // Validate phone number (Pakistani format)
  validatePhone: (phone) => {
    const re = /^(\+92|0)?[0-9]{10}$/;
    return re.test(phone.replace(/\s/g, ''));
  },

  // Get image URL using centralized config
  getImageUrl: (imagePath) => {
    const { getImageUrl } = require('../config/api.js');
    return getImageUrl(imagePath);
  }
};

export default api;
