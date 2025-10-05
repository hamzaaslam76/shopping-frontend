import React, { useState, useRef, useEffect } from "react";
import { FaHeart, FaShoppingCart, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { productAPI, utils } from "../services/api";
import { getImageUrl } from "../config/api";
import cartService from "../services/cartService";
import redheels from "../assets/redheels.jpg";
import whitepumps from "../assets/whitepumps.jpg";  
import pinksketchers from "../assets/pinksketchers.jpg";
import brownsandals from "../assets/brownsandals.jpg";
import flipflop from "../assets/flipflop1.png";   
import whitesneakers from "../assets/whitesneakers.jpg";

// Fallback images array
const fallbackImages = [redheels, whitepumps, pinksketchers, brownsandals, flipflop, whitesneakers];       



const WomensProducts = () => {
  const [selectedSizes, setSelectedSizes] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await productAPI.getProducts({ gender: 'women', limit: 8 });
        setProducts(response.data.products || []);
      } catch (err) {
        console.error('Error fetching women\'s products:', err);
        setError('Failed to load women\'s products');
        // Use fallback data if API fails
        setProducts([
          { _id: 1, title: "Modern Red Heels", price: 15499, oldPrice: 16999, discountPercentage: 20, availableSizes: [38, 40, 42, 45], mainImages: [{ url: redheels }] },
          { _id: 2, title: "White Pumps", price: 3499, oldPrice: 4999, discountPercentage: 20, availableSizes: [38, 40, 42, 45], mainImages: [{ url: whitepumps }] },
          { _id: 3, title: "Pink Skechers", price: 15499, oldPrice: 16999, discountPercentage: 20, availableSizes: [38, 40, 42, 45], mainImages: [{ url: pinksketchers }] },
          { _id: 4, title: "Brown Sandals", price: 5499, oldPrice: 6999, discountPercentage: 20, availableSizes: [38, 40, 42, 45], mainImages: [{ url: brownsandals }] },
          { _id: 5, title: "Flip Flops", price: 2499, oldPrice: 2699, discountPercentage: 20, availableSizes: [38, 40, 42, 45], mainImages: [{ url: flipflop }] },
          { _id: 6, title: "White Sneakers", price: 8499, oldPrice: 10999, discountPercentage: 20, availableSizes: [38, 40, 42, 45], mainImages: [{ url: whitesneakers }] },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
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

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth;
      scrollRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-6 sm:py-6 lg:py-10 bg-white relative">
      <div className="container mx-auto px-6">
        {/* Arrows */}
        <button
          onClick={() => scroll("left")}
          className="absolute top-1/2 left-2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-pink-100 z-10"
        >
          <FaChevronLeft />
        </button>
        <button
          onClick={() => scroll("right")}
          className="absolute top-1/2 right-2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-pink-100 z-10"
        >
          <FaChevronRight />
        </button>

        {/* Products Horizontal Scroll */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-lg">Loading women's products...</div>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-lg text-red-500">{error}</div>
          </div>
        ) : (
          <div
            ref={scrollRef}
            className="flex overflow-x-auto scrollbar-hide gap-4 scroll-smooth pb-2"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {products.map((item) => (
              <div
                key={item._id}
                className="flex-shrink-0 w-48 sm:w-56 md:w-60 border rounded-xl p-3 sm:p-4 shadow hover:shadow-lg transition bg-white relative cursor-pointer"
                onClick={() => handleProductClick(item._id)}
              >
                <span className="absolute top-2 left-2 bg-pink-600 text-white text-xs sm:text-sm px-2 py-1 rounded">
                  {item.discountPercentage ? `-${item.discountPercentage}%` : '-20%'}
                </span>

                <img
                  src={getProductImage(item)}
                  alt={item.title}
                  className="w-full h-32 sm:h-40 object-contain mb-3 sm:mb-4"
                />

                <h3 className="font-semibold text-gray-800 text-sm sm:text-base">{item.title}</h3>
                <div className="flex items-center gap-1 sm:gap-2 mt-1">
                  <p className="text-pink-600 font-bold text-sm sm:text-base">{utils.formatPrice(item.price)}</p>
                  {item.oldPrice && (
                    <p className="line-through text-gray-400 text-xs sm:text-sm">{utils.formatPrice(item.oldPrice)}</p>
                  )}
                </div>

                <div className="flex flex-wrap gap-1 sm:gap-2 mt-2 text-gray-600 text-xs sm:text-sm">
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
                              ? "bg-pink-600 text-white border-pink-600"
                              : "hover:bg-pink-100 hover:border-pink-400"}`}
                      >
                        {size}
                      </span>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between mt-3 sm:mt-4">
                  <button
                    onClick={(e) => handleAddToCart(e, item)}
                    className="flex items-center justify-center gap-2 flex-1 border bg-[#444444] border-gray-300 text-white py-2 rounded-md text-xs sm:text-sm cursor-pointer transition hover:bg-pink-600 hover:border-pink-400 active:bg-pink-700"
                  >
                    <FaShoppingCart />
                    Add To Cart
                  </button>
                  <button className="ml-2 text-gray-500 hover:text-pink-600">
                    <FaHeart />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      {/* View All Button */}
<div className="flex justify-center mt-6">
  <button className="bg-pink-600 text-white px-8 py-3 rounded-lg font-lato font-bold hover:bg-pink-700 transition flex items-center gap-2">
    View All 
    <span className="bg-pink-600 text-white p-1 rounded">
      <FiArrowUpRight   className="text-lg" />
    </span>
  </button>
</div>


      </div>
    </section>
  );
};

export default WomensProducts;
