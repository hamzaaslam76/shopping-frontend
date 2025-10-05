// API Configuration for Customer App
export const API_CONFIG = {
  BASE_URL: 'https://shopping-backend-ten-pi.vercel.app',
  ENDPOINTS: {
    PRODUCTS: '/api/v1/customer/products',
    PRODUCT_BY_ID: '/api/v1/customer/products',
    FEATURED_PRODUCTS: '/api/v1/customer/products/featured',
    NEW_ARRIVALS: '/api/v1/customer/products/new-arrivals',
    SEARCH_PRODUCTS: '/api/v1/customer/products/search',
    CATEGORIES: '/api/v1/customer/categories',
    FEATURED_CATEGORIES: '/api/v1/customer/categories/featured',
    ORDERS: '/api/v1/customer/orders',
    GUEST_ORDER: '/api/v1/customer/orders/guest',
    TRACK_ORDER: '/api/v1/customer/orders/track'
  }
};

// Utility function to get full image URL
export const getImageUrl = (imagePath) => {
  if (!imagePath) return '';
  if (imagePath.startsWith('http')) return imagePath;
  return `${API_CONFIG.BASE_URL}${imagePath}`;
};

// Utility function to get full API URL
export const getApiUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};
