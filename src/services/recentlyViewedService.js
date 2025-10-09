class RecentlyViewedService {
  constructor() {
    this.storageKey = 'recentlyViewedProducts';
    this.maxItems = 10; // Maximum number of recently viewed products to store
  }

  /**
   * Add a product to recently viewed list
   * @param {Object} product - Product object to add
   */
  addProduct(product) {
    try {
      let recentlyViewed = this.getRecentlyViewed();
      
      // Remove product if it already exists (to move it to top)
      recentlyViewed = recentlyViewed.filter(item => item._id !== product._id);
      
      // Add product to the beginning of the array
      recentlyViewed.unshift({
        _id: product._id,
        title: product.title,
        price: product.price,
        oldPrice: product.oldPrice,
        discountPercentage: product.discountPercentage,
        mainImages: product.mainImages,
        brand: product.brand,
        category: product.category,
        viewedAt: new Date().toISOString()
      });
      
      // Keep only the most recent items
      if (recentlyViewed.length > this.maxItems) {
        recentlyViewed = recentlyViewed.slice(0, this.maxItems);
      }
      
      // Save to localStorage
      localStorage.setItem(this.storageKey, JSON.stringify(recentlyViewed));
      
      return recentlyViewed;
    } catch (error) {
      console.error('Error adding product to recently viewed:', error);
      return [];
    }
  }

  /**
   * Get all recently viewed products
   * @returns {Array} Array of recently viewed products
   */
  getRecentlyViewed() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (!stored) return [];
      
      const products = JSON.parse(stored);
      
      // Sort by viewedAt date (most recent first)
      return products.sort((a, b) => new Date(b.viewedAt) - new Date(a.viewedAt));
    } catch (error) {
      console.error('Error getting recently viewed products:', error);
      return [];
    }
  }

  /**
   * Get recently viewed products (excluding current product)
   * @param {string} currentProductId - ID of current product to exclude
   * @param {number} limit - Maximum number of products to return
   * @returns {Array} Array of recently viewed products
   */
  getRecentlyViewedExcluding(currentProductId, limit = 5) {
    try {
      const recentlyViewed = this.getRecentlyViewed();
      
      // Filter out current product and limit results
      return recentlyViewed
        .filter(product => product._id !== currentProductId)
        .slice(0, limit);
    } catch (error) {
      console.error('Error getting recently viewed products:', error);
      return [];
    }
  }

  /**
   * Remove a product from recently viewed
   * @param {string} productId - Product ID to remove
   */
  removeProduct(productId) {
    try {
      const recentlyViewed = this.getRecentlyViewed();
      const filtered = recentlyViewed.filter(product => product._id !== productId);
      localStorage.setItem(this.storageKey, JSON.stringify(filtered));
      return filtered;
    } catch (error) {
      console.error('Error removing product from recently viewed:', error);
      return [];
    }
  }

  /**
   * Clear all recently viewed products
   */
  clearAll() {
    try {
      localStorage.removeItem(this.storageKey);
      return [];
    } catch (error) {
      console.error('Error clearing recently viewed products:', error);
      return [];
    }
  }

  /**
   * Get count of recently viewed products
   * @returns {number} Number of recently viewed products
   */
  getCount() {
    try {
      return this.getRecentlyViewed().length;
    } catch (error) {
      console.error('Error getting recently viewed count:', error);
      return 0;
    }
  }

  /**
   * Check if a product is in recently viewed
   * @param {string} productId - Product ID to check
   * @returns {boolean} True if product is in recently viewed
   */
  hasProduct(productId) {
    try {
      const recentlyViewed = this.getRecentlyViewed();
      return recentlyViewed.some(product => product._id === productId);
    } catch (error) {
      console.error('Error checking if product is in recently viewed:', error);
      return false;
    }
  }

  /**
   * Get recently viewed products with additional metadata
   * @returns {Object} Object with products array and metadata
   */
  getRecentlyViewedWithMetadata() {
    try {
      const products = this.getRecentlyViewed();
      return {
        products,
        count: products.length,
        maxItems: this.maxItems,
        lastUpdated: products.length > 0 ? products[0].viewedAt : null
      };
    } catch (error) {
      console.error('Error getting recently viewed with metadata:', error);
      return {
        products: [],
        count: 0,
        maxItems: this.maxItems,
        lastUpdated: null
      };
    }
  }
}

// Export singleton instance
const recentlyViewedService = new RecentlyViewedService();
export default recentlyViewedService;
