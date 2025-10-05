import React, { useState, useEffect } from "react";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { productAPI, utils } from "../services/api";
import { getImageUrl } from "../config/api";
import cartService from "../services/cartService";
import urbandrift from "../assets/urbandrift.jpg";
import redheels from "../assets/redheels.jpg";
import whitepumps from "../assets/whitepumps.jpg";
import pinksketchers from "../assets/pinksketchers.jpg";
import brownsandals from "../assets/brownsandals.jpg";
import flipflop from "../assets/flipflop1.png";
import whitesneakers from "../assets/whitesneakers.jpg";
import regalleather from "../assets/regalleather.jpg";
import whiteshoes from "../assets/whiteshoes.jpg";

// Fallback images array
const fallbackImages = [urbandrift, redheels, whitepumps, pinksketchers, brownsandals, flipflop, whitesneakers, regalleather, whiteshoes];

const RecommendedProducts = () => {
  const [selectedSizes, setSelectedSizes] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecommendedProducts = async () => {
      try {
        setLoading(true);
        const response = await productAPI.getRecommendedProducts({ limit: 8 });
        setProducts(response.data.products || []);
      } catch (err) {
        console.error('Error fetching recommended products:', err);
        setError('Failed to load recommended products');
        // Use fallback data if API fails
        setProducts([
          { _id: 1, title: "Urban Drift Sneaker", price: 5499, oldPrice: 6999, discountPercentage: 20, availableSizes: [38, 40, 42, 45], mainImages: [{ url: urbandrift }] },
          { _id: 2, title: "Modern Red Heels", price: 15499, oldPrice: 16999, discountPercentage: 20, availableSizes: [38, 40, 42, 45], mainImages: [{ url: redheels }] },
          { _id: 3, title: "White Pumps", price: 3499, oldPrice: 4999, discountPercentage: 20, availableSizes: [38, 40, 42, 45], mainImages: [{ url: whitepumps }] },
          { _id: 4, title: "Pink Skechers", price: 15499, oldPrice: 16999, discountPercentage: 20, availableSizes: [38, 40, 42, 45], mainImages: [{ url: pinksketchers }] },
          { _id: 5, title: "Brown Sandals", price: 5499, oldPrice: 6999, discountPercentage: 20, availableSizes: [38, 40, 42, 45], mainImages: [{ url: brownsandals }] },
          { _id: 6, title: "Flip Flops", price: 2499, oldPrice: 2699, discountPercentage: 20, availableSizes: [38, 40, 42, 45], mainImages: [{ url: flipflop }] },
          { _id: 7, title: "White Sneakers", price: 8499, oldPrice: 10999, discountPercentage: 20, availableSizes: [38, 40, 42, 45], mainImages: [{ url: whitesneakers }] },
          { _id: 8, title: "Regal Leather Starlet", price: 5499, oldPrice: 6999, discountPercentage: 20, availableSizes: [38, 40, 42, 45], mainImages: [{ url: regalleather }] },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendedProducts();
  }, []);

  const handleSizeClick = (productId, size) => {
    setSelectedSizes({ ...selectedSizes, [productId]: size });
  };

  const handleProductClick = (productId) => {
    navigate(`/product?id=${productId}`);
  };

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    
    // Check if a size is selected
    const selectedSize = selectedSizes[product._id];
    if (!selectedSize) {
      alert('Please select a size before adding to cart');
      return;
    }

    // Add to cart
    const cartItem = {
      _id: product._id,
      title: product.title,
      price: product.price,
      mainImages: product.mainImages,
      selectedSize: selectedSize,
      quantity: 1
    };

    cartService.addToCart(cartItem);
    
    // Show success message (you can replace this with a toast notification)
    alert(`${product.title} (Size: ${selectedSize}) added to cart!`);
  };

  const getProductImage = (product) => {
    if (product.mainImages && product.mainImages.length > 0) {
      return getImageUrl(product.mainImages[0].url);
    }
    return fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
  };

  return (
    <section className="py-6 sm:py-6 lg:py-10 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">
            Recommended for You
          </h2>
          <div className="text-sm sm:text-base text-gray-600">
            Based on your preferences
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-lg">Loading recommended products...</div>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-lg text-red-500">{error}</div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.map((item) => (
              <div
                key={item._id}
                className="border rounded-xl p-3 sm:p-4 shadow hover:shadow-lg transition bg-white relative cursor-pointer"
                onClick={() => handleProductClick(item._id)}
              >
                {/* Discount Badge */}
                <span className="absolute top-2 left-2 bg-green-600 text-white text-xs sm:text-sm px-2 py-1 rounded">
                  {item.discountPercentage ? `-${item.discountPercentage}%` : '-20%'}
                </span>

                {/* Product Image */}
                <img
                  src={getProductImage(item)}
                  alt={item.title}
                  className="w-full h-32 sm:h-40 object-contain mb-3 sm:mb-4"
                />

                {/* Product Title */}
                <h3 className="font-semibold text-gray-800 text-sm sm:text-base truncate mb-2">
                  {item.title}
                </h3>

                {/* Price */}
                <div className="flex items-center gap-1 sm:gap-2 mb-3">
                  <p className="text-green-600 font-bold text-sm sm:text-base">
                    {utils.formatPrice(item.price)}
                  </p>
                  {item.oldPrice && (
                    <p className="line-through text-gray-400 text-xs sm:text-sm">
                      {utils.formatPrice(item.oldPrice)}
                    </p>
                  )}
                </div>

                {/* Size Selection */}
                <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 text-gray-600 text-xs sm:text-sm">
                  {(item.availableSizes || ['38', '40', '42', '45']).map((size) => {
                    const isSelected = selectedSizes[item._id] === size;
                    return (
                      <span
                        key={size}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSizeClick(item._id, size);
                        }}
                        className={`border px-2 py-1 rounded-md text-center min-w-[24px] cursor-pointer transition
                            ${isSelected
                              ? "bg-green-600 text-white border-green-600"
                              : "hover:bg-green-100 hover:border-green-400"}`}
                      >
                        {size}
                      </span>
                    );
                  })}
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={(e) => handleAddToCart(e, item)}
                  className="w-full flex items-center justify-center gap-2 border bg-green-600 border-green-600 text-white py-2 rounded-md text-xs sm:text-sm cursor-pointer transition hover:bg-green-700 hover:border-green-700 active:bg-green-800"
                >
                  <FaShoppingCart />
                  Add To Cart
                </button>
              </div>
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className="flex justify-center mt-6">
          <button className="bg-green-600 text-white px-8 py-3 rounded-lg font-lato font-bold hover:bg-green-700 transition flex items-center gap-2">
            View All Recommendations
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default RecommendedProducts;
