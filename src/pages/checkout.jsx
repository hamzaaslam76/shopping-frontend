import React, { useState, useEffect } from "react";
import Topbar from "../components/topbar";
import Header from "../components/header";
import Mastercard from "../assets/mastercard.png";
import Footer from "../components/footer";
import Regalleather from "../assets/regalleather.jpg";
import { orderAPI, utils } from "../services/api";
import { useNavigate } from "react-router-dom";
import cartService from "../services/cartService";

const Checkout = () => {
  const [checkoutItems, setCheckoutItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState({
    customerInfo: {
      email: '',
      phone: '',
      firstName: '',
      lastName: ''
    },
    shippingAddress: {
      country: '',
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      phone: ''
    },
    paymentMethod: 'cod',
    notes: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    // First check if there are items in the cart
    const cartItems = cartService.getCartItems();
    
    if (cartItems && cartItems.length > 0) {
      // Convert cart items to checkout format
      const formattedCartItems = cartItems.map(item => ({
        productId: item.productId,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        size: item.size,
        color: 'Default',
        image: item.image || Regalleather
      }));
      setCheckoutItems(formattedCartItems);
    } else {
      // Check for single "Buy It Now" item in localStorage
      const buyNowItems = localStorage.getItem('checkoutItems');
      if (buyNowItems) {
        setCheckoutItems(JSON.parse(buyNowItems));
      } else {
        // Fallback to default items if no items found
        setCheckoutItems([
          { productId: 1, title: "Regal Leather Starlet", price: 5499, quantity: 1, size: "39", image: Regalleather, color: 'Default' },
          { productId: 2, title: "Regal Classic Loafers", price: 6999, quantity: 1, size: "42", image: Regalleather, color: 'Default' },
          { productId: 3, title: "Regal Modern Sneakers", price: 4499, quantity: 1, size: "40", image: Regalleather, color: 'Default' },
        ]);
      }
    }
  }, []);

  const handleInputChange = (section, field, value) => {
    setOrderData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const calculateTotal = () => {
    return checkoutItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const removeItem = (productId, size) => {
    const updatedItems = checkoutItems.filter(
      item => !(item.productId === productId && item.size === size)
    );
    setCheckoutItems(updatedItems);
    
    // Also remove from cart if it exists there
    cartService.removeFromCart(productId, size);
    
    // Update localStorage if it's a "Buy It Now" item
    if (updatedItems.length === 0) {
      localStorage.removeItem('checkoutItems');
    } else {
      localStorage.setItem('checkoutItems', JSON.stringify(updatedItems));
    }
  };

  const clearAllItems = () => {
    setCheckoutItems([]);
    cartService.clearCart();
    localStorage.removeItem('checkoutItems');
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    
    if (checkoutItems.length === 0) {
      alert('Your cart is empty. Please add some items before placing an order.');
      return;
    }
    
    if (!orderData.customerInfo.email || !orderData.shippingAddress.firstName || !orderData.shippingAddress.address || !orderData.shippingAddress.city) {
      alert('Please fill in all required fields (Email, First Name, Address, City)');
      return;
    }

    setLoading(true);
    
    try {
      const orderPayload = {
        customerInfo: {
          email: orderData.customerInfo.email,
          phone: orderData.customerInfo.phone,
          firstName: orderData.shippingAddress.firstName,
          lastName: orderData.shippingAddress.lastName
        },
        shippingAddress: orderData.shippingAddress,
        paymentMethod: orderData.paymentMethod,
        totalAmount: calculateTotal(),
        notes: orderData.notes,
        items: checkoutItems.map(item => ({
          product: item.productId,
          title: item.title,
          quantity: item.quantity,
          price: item.price,
          size: item.size,
          color: item.color || 'Default'
        }))
      };

      const response = await orderAPI.createGuestOrder(orderPayload);
      
      // Clear both cart and checkout items after successful order
      cartService.clearCart();
      localStorage.removeItem('checkoutItems');
      
      // Redirect to success page or show success message
      alert(`Order placed successfully! Order Number: ${response.data.order.orderNumber}`);
      navigate('/');
      
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Topbar />
      <Header />

      {/* Main container with flex */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start max-w-6xl mx-auto mt-10 px-4 sm:px-8 gap-10">
        
        {/* ---------------- LEFT SIDE (your code unchanged) ---------------- */}
        <div className="max-w-2xl space-y-8 ">
          {/* Contact Section */}
          <div>
            <h2 className="text-lg font-bold mb-4">Contact</h2>
            <input
              type="email"
              placeholder="Email"
              value={orderData.customerInfo.email}
              onChange={(e) => handleInputChange('customerInfo', 'email', e.target.value)}
              className="w-full border border-gray-300 rounded-md p-3 mb-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={orderData.customerInfo.phone}
              onChange={(e) => handleInputChange('customerInfo', 'phone', e.target.value)}
              className="w-full border border-gray-300 rounded-md p-3 mb-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="newsletter" className="w-4 h-4" />
              <label htmlFor="newsletter" className="text-sm">
                Email Me With News And Offers
              </label>
            </div>
          </div>

          {/* Delivery Section */}
          <div>
            <h2 className="text-lg font-bold mb-4">Delivery</h2>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Country / Region"
                value={orderData.shippingAddress.country}
                onChange={(e) => handleInputChange('shippingAddress', 'country', e.target.value)}
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <input
                type="text"
                placeholder="First Name"
                value={orderData.shippingAddress.firstName}
                onChange={(e) => handleInputChange('shippingAddress', 'firstName', e.target.value)}
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                value={orderData.shippingAddress.lastName}
                onChange={(e) => handleInputChange('shippingAddress', 'lastName', e.target.value)}
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <input
                type="text"
                placeholder="Address"
                value={orderData.shippingAddress.address}
                onChange={(e) => handleInputChange('shippingAddress', 'address', e.target.value)}
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
              <input
                type="text"
                placeholder="City"
                value={orderData.shippingAddress.city}
                onChange={(e) => handleInputChange('shippingAddress', 'city', e.target.value)}
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
              <input
                type="tel"
                placeholder="Phone"
                value={orderData.shippingAddress.phone}
                onChange={(e) => handleInputChange('shippingAddress', 'phone', e.target.value)}
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <div className="flex items-center space-x-2 mt-3">
              <input type="checkbox" id="saveInfo" className="w-4 h-4" />
              <label htmlFor="saveInfo" className="text-sm">
                Save This Information For Next Time
              </label>
            </div>
          </div>

          {/* Payment Section */}
          <div>
            <h2 className="text-lg font-bold mb-4">Payment</h2>
            <p className="text-sm text-gray-600 mb-2">
              All the transactions are secure and encrypted
            </p>

            <div className="space-y-3">
              <label className="flex items-center border rounded-md p-3 cursor-pointer hover:border-pink-500">
                <input type="radio" name="payment" className="mr-2" />
                Cash On Delivery (COD)
              </label>

              <label className="flex items-center justify-between border rounded-md p-3 cursor-pointer bg-pink-100 border-pink-300">
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="payment"
                    className="mr-2"
                    defaultChecked
                  />
                  PAYFAST (Pay Via Debit/Credit/Wallet/Bank Account)
                </div>
                <div className="flex space-x-1">
                
                  <img src={Mastercard} alt="Mastercard" className="h-5" />
                </div>
              </label>
            </div>
          </div>

          {/* Shipping Method Section */}
          <div>
            <h2 className="text-lg font-bold mb-4">Shipping Method</h2>
            <label className="flex items-center justify-between border border-pink-300 bg-pink-100 p-3 rounded-md cursor-pointer">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="shipping"
                  className="accent-pink-500"
                  defaultChecked
                />
                <span>Free</span>
              </div>
              <span className="font-semibold">Free</span>
            </label>
          </div>

          {/* Billing Address Section */}
          <div className="space-y-2 mb-2">
            <h2 className="text-lg font-bold">Billing Address</h2>
            <label className="flex items-center justify-between border border-pink-300 bg-pink-100 p-3 rounded-md cursor-pointer">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="billing"
                  className="accent-pink-500"
                  defaultChecked
                />
                <span>Same As Shipping Address</span>
              </div>
              <span className="font-semibold">Free</span>
            </label>
          </div>

          {/* Pay Now Button */}
          <div className="mt-2 ">
            <button 
              onClick={handleSubmitOrder}
              disabled={loading}
              className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : 'Pay Now'}
            </button>
          </div>

          {/* Footer Links */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-6 text-sm text-black mb-10 mt-3">
            <a href="#" className="hover:underline">
              Refund Policy
            </a>
            <a href="#" className="hover:underline">
              Terms & Condition
            </a>
            <a href="#" className="hover:underline">
              Contact
            </a>
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
          </div>
        </div>

  {/* ---------------- RIGHT SIDE (Order Summary Card) ---------------- */}
{/* ---------------- RIGHT SIDE (Order Summary Card) ---------------- */}
<div className="w-full max-w-lg mx-auto bg-gray-100 border border-gray-300 shadow-lg rounded-xl p-6 sm:p-8 mt-4 mb-10 sm:mt-8 sm:mb-12 lg:mt-16 lg:mb-16">

  <div className="flex items-center justify-between mb-4">
    <h2 className="text-lg font-bold">Order Summary</h2>
    {checkoutItems.length > 0 && (
      <button
        onClick={clearAllItems}
        className="text-sm text-red-500 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded transition-colors"
        title="Clear all items"
      >
        Clear All
      </button>
    )}
  </div>

  {checkoutItems.length === 0 ? (
    <div className="text-center py-8">
      <div className="text-gray-500 mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mx-auto mb-2"
        >
          <path d="M2.048 18.566A2 2 0 0 0 4 21h16a2 2 0 0 0 1.952-2.434l-2-9A2 2 0 0 0 18 8H6a2 2 0 0 0-1.952 1.566z" />
          <path d="M8 11V6a4 4 0 0 1 8 0v5" />
        </svg>
        <p className="text-lg font-medium">Your cart is empty</p>
        <p className="text-sm">Add some items to continue shopping</p>
      </div>
      <button
        onClick={() => navigate('/')}
        className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-md font-medium transition-colors"
      >
        Continue Shopping
      </button>
    </div>
  ) : (
    <>

  {/* ✅ Mobile Table View */}
  <table className="w-full border-collapse mb-6 sm:hidden">
    <thead>
      <tr className="bg-gray-200 text-left text-sm">
        <th className="p-2">Image</th>
        <th className="p-2">Product</th>
        <th className="p-2">Size</th>
        <th className="p-2 text-right">Price</th>
        <th className="p-2 text-center">Action</th>
      </tr>
    </thead>
    <tbody>
      {checkoutItems.map((product) => (
        <tr key={`${product.productId}-${product.size}`} className="border-b last:border-0">
          <td className="p-2">
            <img
              src={product.image || Regalleather}
              alt={product.title}
              className="w-14 h-14 rounded-md object-contain bg-white"
            />
          </td>
          <td className="p-2">{product.title}</td>
          <td className="p-2">{product.size}</td>
          <td className="p-2 text-right font-semibold">
            {utils.formatPrice(product.price * product.quantity)}
          </td>
          <td className="p-2 text-center">
            <button
              onClick={() => removeItem(product.productId, product.size)}
              className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full p-1 transition-colors"
              title="Remove item"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>

  {/* ✅ Desktop / Tablet Flex View */}
  <div className="hidden sm:block">
    {checkoutItems.map((product) => (
      <div
        key={`${product.productId}-${product.size}`}
        className="flex items-center justify-between mb-6 border-b pb-4 last:border-b-0"
      >
        <div className="flex items-center space-x-3">
          <img
            src={product.image || Regalleather}
            alt={product.title}
            className="w-20 h-20 rounded-md object-contain bg-white"
          />
          <div>
            <h3 className="font-semibold">{product.title}</h3>
            <p className="text-sm text-gray-600">Size {product.size}</p>
            <p className="text-sm text-gray-600">Qty: {product.quantity}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <span className="font-semibold text-lg">{utils.formatPrice(product.price * product.quantity)}</span>
          <button
            onClick={() => removeItem(product.productId, product.size)}
            className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full p-2 transition-colors"
            title="Remove item"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    ))}
  </div>

  {/* Discount Code */}
  <div className="flex flex-col sm:flex-row mb-6">
    <input
      type="text"
      placeholder="Discount Code"
      className="flex-grow border border-gray-300 bg-gray-200 rounded-md sm:rounded-l-md sm:rounded-r-none p-3 focus:outline-none mb-3 sm:mb-0"
    />
    <button className="bg-gray-300 text-black px-6 py-3 rounded-md sm:rounded-l-none sm:rounded-r-md font-medium">
      Apply
    </button>
  </div>

  {/* Price Details */}
  <div className="space-y-3 text-base sm:text-lg">
    <div className="flex justify-between">
      <span>Subtotal</span>
      <span>
        {utils.formatPrice(calculateTotal())}
      </span>
    </div>
    <div className="flex justify-between">
      <span>Shipping</span>
      <span>Free</span>
    </div>
    <div className="flex justify-between text-lg sm:text-xl pt-3">
      <span>Total</span>
      <span>
        {utils.formatPrice(calculateTotal())}
      </span>
    </div>
  </div>
    </>
  )}
</div>

      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
