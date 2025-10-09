import React, { useState, useEffect } from "react";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { productAPI, utils } from "../services/api";
import cartService from "../services/cartService";
import urbandrift from "../assets/desighee.png";
import { getImageUrl } from "../config/api";
import { useToastContext } from "../contexts/ToastContext";

const HacSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSizes, setSelectedSizes] = useState({});
  const [favorites, setFavorites] = useState(new Set());
  const navigate = useNavigate();
  const { showCartSuccess, showFavoriteSuccess, showValidationError } = useToastContext();

  useEffect(() => {
    const fetchHacFoodsProducts = async () => {
      try {
        debugger;
        setLoading(true);
        const response = await productAPI.getHacFoodsProducts({ limit: 6 });
        setProducts(response.data.products);
      } catch (err) {
        console.error('Error fetching Hac Foods products:', err);
        setError('Failed to load products');
        // Fallback to static data
        
      } finally {
        setLoading(false);
      }
    };

    fetchHacFoodsProducts();
  }, []);

  const handleSizeClick = (e, productId, size) => {
    e.stopPropagation(); // Prevent card click event
    setSelectedSizes({ ...selectedSizes, [productId]: size });
  };

  const handleFavoriteClick = (e, productId, productTitle) => {
    e.stopPropagation(); // Prevent card click event
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      const isAdded = !newFavorites.has(productId);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      showFavoriteSuccess(productTitle, isAdded);
      return newFavorites;
    });
  };

  const handleProductClick = (productId) => {
    navigate(`/product?id=${productId}`);
  };

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    
    // Check if a size is selected
    const selectedSize = selectedSizes[product._id];
    if (!selectedSize) {
      showValidationError('Please select a size before adding to cart');
      return;
    }

    // Add to cart using correct format
    const cartItem = {
      _id: product._id,
      title: product.title,
      price: product.price,
      mainImages: product.mainImages,
      selectedSize: selectedSize,
      quantity: 1
    };

    cartService.addToCart(cartItem);
    showCartSuccess(product.title, 1);
  };

  const getProductImage = (product) => {
    if (product.mainImages && product.mainImages.length > 0) {
      return getImageUrl(product.mainImages[0].url);
    }
    return urbandrift;
  };

  if (loading) {
    return (
      <section className="py-8 bg-white flex flex-col items-center">
        <div className="container mx-auto px-3 sm:px-4 text-center">
          <h2 className="text-lg sm:text-2xl font-bold text-center mb-4">
            Dairy&apos;s Items
          </h2>
          <div className="flex justify-center">
            <div className="text-gray-500">Loading products...</div>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="py-8 bg-white flex flex-col items-center">
      <div className="container mx-auto px-3 sm:px-4 text-center">
        {/* Title */}
        <h2 className="text-lg sm:text-2xl font-bold text-center mb-4">
          Dairy&apos;s Items
        </h2>

        {/* Product Grid */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl">
            {products.map((product) => (
              <div
                key={product._id}
                className="border rounded-lg p-4 shadow hover:shadow-lg transition bg-white relative cursor-pointer"
                onClick={() => handleProductClick(product._id)}
              >
                {/* Discount */}
                {product.discountPercentage && (
                  <span className="absolute top-2 left-2 bg-pink-600 text-white text-xs px-2 py-1 rounded">
                    -{product.discountPercentage}%
                  </span>
                )}

                {/* Image */}
                <img
                  src={getProductImage(product)}
                  alt={product.title}
                  className="w-full h-40 object-contain mb-3"
                />

                {/* Title + Price */}
                <h3 className="font-semibold text-gray-800 text-sm truncate">
                  {product.title}
                </h3>
                <div className="flex items-center justify-center gap-2 mt-1">
                  <p className="text-pink-600 font-bold text-sm">
                    {utils.formatPrice(product.price)}
                  </p>
                  {product.oldPrice && (
                    <p className="line-through text-gray-400 text-xs">
                      {utils.formatPrice(product.oldPrice)}
                    </p>
                  )}
                </div>

                {/* Size Selection */}
                <div className="flex flex-wrap gap-1 mt-2">
                  {(product.availableSizes || ['Default']).map((size) => {
                    const isSelected = selectedSizes[product._id] === size;
                    return (
                      <span
                        key={size}
                        onClick={(e) => handleSizeClick(e, product._id, size)}
                        className={`border px-2 py-1 rounded-md text-center min-w-[40px] cursor-pointer transition text-xs
                          ${isSelected
                            ? "bg-pink-600 text-white border-pink-600"
                            : "hover:bg-pink-100 hover:border-pink-400"}`}
                      >
                        {size}
                      </span>
                    );
                  })}
                </div>

                {/* Buttons */}
                <div className="flex items-center justify-between mt-4">
                  <button 
                    onClick={(e) => handleAddToCart(e, product)}
                    className="flex items-center justify-center gap-2 flex-1 border bg-[#444444] text-white py-2 rounded-md text-xs hover:bg-pink-600 transition"
                  >
                    <FaShoppingCart /> Add To Cart
                  </button>
                  <button 
                    onClick={(e) => handleFavoriteClick(e, product._id, product.title)}
                    className={`ml-2 transition-colors ${
                      favorites.has(product._id) 
                        ? "text-pink-600" 
                        : "text-gray-500 hover:text-pink-600"
                    }`}
                  >
                    <FaHeart className={favorites.has(product._id) ? "fill-current" : ""} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};


export default HacSection;
