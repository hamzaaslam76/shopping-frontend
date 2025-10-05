import React, { useState, useEffect } from "react";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { productAPI, utils } from "../services/api";
import cartService from "../services/cartService";
import urbandrift from "../assets/desighee.png";
import { getImageUrl } from "../config/api";

const HacSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const handleAddToCart = (product) => {
    const selectedSize = product.availableSizes && product.availableSizes.length > 0 ? product.availableSizes[0] : 'Default';
    
    const cartItem = {
      productId: product._id,
      title: product.title,
      price: product.price,
      quantity: 1,
      size: selectedSize,
      color: 'Default',
      image: getImageUrl(product.mainImages?.[0]?.url) || urbandrift
    };

    cartService.addToCart(cartItem);
    alert(`${product.title} added to cart!`);
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
                className="border rounded-lg p-4 shadow hover:shadow-lg transition bg-white relative"
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

                {/* Available Sizes */}
                {product.availableSizes && product.availableSizes.length > 0 && (
                  <div className="mt-2">
                    <p className="text-xs text-gray-600">
                      Available: {product.availableSizes.join(', ')}
                    </p>
                  </div>
                )}

                {/* Buttons */}
                <div className="flex items-center justify-between mt-4">
                  <button 
                    onClick={() => handleAddToCart(product)}
                    className="flex items-center justify-center gap-2 flex-1 border bg-[#444444] text-white py-2 rounded-md text-xs hover:bg-pink-600 transition"
                  >
                    <FaShoppingCart /> Add To Cart
                  </button>
                  <button className="ml-2 text-gray-500 hover:text-pink-600 text-sm">
                    <FaHeart />
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
