// Cart service for managing local storage cart functionality
const CART_KEY = 'shopping_cart';

// Cart item structure:
// {
//   productId: string,
//   title: string,
//   price: number,
//   image: string,
//   size: string,
//   quantity: number,
//   addedAt: timestamp
// }

export const cartService = {
  // Get all cart items
  getCartItems: () => {
    try {
      const cartData = localStorage.getItem(CART_KEY);
      return cartData ? JSON.parse(cartData) : [];
    } catch (error) {
      console.error('Error getting cart items:', error);
      return [];
    }
  },

  // Add item to cart
  addToCart: (product) => {
    try {
      const cartItems = cartService.getCartItems();
      const existingItemIndex = cartItems.findIndex(
        item => item.productId === product._id && item.size === product.selectedSize
      );

      if (existingItemIndex > -1) {
        // Update quantity if item already exists
        cartItems[existingItemIndex].quantity += product.quantity || 1;
      } else {
        // Add new item
        const cartItem = {
          productId: product._id,
          title: product.title,
          price: product.price,
          image: product.mainImages?.[0]?.url || '',
          size: product.selectedSize || '',
          quantity: product.quantity || 1,
          addedAt: new Date().toISOString()
        };
        cartItems.push(cartItem);
      }

      localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
      return cartItems;
    } catch (error) {
      console.error('Error adding to cart:', error);
      return cartService.getCartItems();
    }
  },

  // Remove item from cart
  removeFromCart: (productId, size) => {
    try {
      const cartItems = cartService.getCartItems();
      const filteredItems = cartItems.filter(
        item => !(item.productId === productId && item.size === size)
      );
      localStorage.setItem(CART_KEY, JSON.stringify(filteredItems));
      return filteredItems;
    } catch (error) {
      console.error('Error removing from cart:', error);
      return cartService.getCartItems();
    }
  },

  // Update item quantity
  updateQuantity: (productId, size, quantity) => {
    try {
      const cartItems = cartService.getCartItems();
      const itemIndex = cartItems.findIndex(
        item => item.productId === productId && item.size === size
      );

      if (itemIndex > -1) {
        if (quantity <= 0) {
          cartItems.splice(itemIndex, 1);
        } else {
          cartItems[itemIndex].quantity = quantity;
        }
        localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
      }
      return cartItems;
    } catch (error) {
      console.error('Error updating quantity:', error);
      return cartService.getCartItems();
    }
  },

  // Clear entire cart
  clearCart: () => {
    try {
      localStorage.removeItem(CART_KEY);
      return [];
    } catch (error) {
      console.error('Error clearing cart:', error);
      return cartService.getCartItems();
    }
  },

  // Get cart count
  getCartCount: () => {
    const cartItems = cartService.getCartItems();
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  },

  // Get cart total
  getCartTotal: () => {
    const cartItems = cartService.getCartItems();
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  },

  // Check if item is in cart
  isInCart: (productId, size) => {
    const cartItems = cartService.getCartItems();
    return cartItems.some(item => item.productId === productId && item.size === size);
  }
};

export default cartService;
