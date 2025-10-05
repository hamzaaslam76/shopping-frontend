import React, { useState, useEffect } from "react";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { productAPI, utils } from "../services/api";
import { getImageUrl } from "../config/api";
import cartService from "../services/cartService";
import urbandrift from "../assets/urbandrift.jpg";

const WomensSection = () => {
    const [selectedSizes, setSelectedSizes] = useState({});
    const [filterSize, setFilterSize] = useState(""); // state for dropdown filter
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecommendedProducts = async () => {
            try {
                setLoading(true);
                const response = await productAPI.getRecommendedProducts({ limit: 10 });
                setProducts(response.data.products || []);
            } catch (err) {
                console.error('Error fetching recommended products:', err);
                setError('Failed to load recommended products');
                // Fallback to static data
                setProducts([
                    { _id: 1, title: "Urban Drift Sneaker", price: 5499, oldPrice: 6999, discountPercentage: 20, availableSizes: [38, 40, 42, 45], mainImages: [{ url: urbandrift }] },
                    { _id: 2, title: "Urban Drift Sneaker", price: 3499, oldPrice: 4999, discountPercentage: 20, availableSizes: [38, 40, 42, 45], mainImages: [{ url: urbandrift }] },
                    { _id: 3, title: "Urban Drift Sneaker", price: 5499, oldPrice: 6999, discountPercentage: 20, availableSizes: [38, 40, 42, 45], mainImages: [{ url: urbandrift }] },
                    { _id: 4, title: "Urban Drift Sneaker", price: 4499, oldPrice: 5999, discountPercentage: 20, availableSizes: [38, 40, 42, 45], mainImages: [{ url: urbandrift }] },
                    { _id: 5, title: "Regal Leather Starlet", price: 5499, oldPrice: 6999, discountPercentage: 20, availableSizes: [38, 40, 42, 45], mainImages: [{ url: urbandrift }] },
                    { _id: 6, title: "White Starlet", price: 8499, oldPrice: 10999, discountPercentage: 20, availableSizes: [38, 40, 42, 45], mainImages: [{ url: urbandrift }] },
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

    const handleAddToCart = (product) => {
        const selectedSize = selectedSizes[product._id] || (product.availableSizes && product.availableSizes[0]) || 'Default';
        
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

    const handleProductClick = (productId) => {
        navigate(`/product?id=${productId}`);
    };

    const getProductImage = (product) => {
        if (product.mainImages && product.mainImages.length > 0) {
            return getImageUrl(product.mainImages[0].url);
        }
        return urbandrift;
    };

    // Filtered products based on dropdown selection
    const filteredProducts = filterSize
        ? products.filter((item) => item.availableSizes && item.availableSizes.includes(Number(filterSize)))
        : products;

    return (
        <section className="pt-1 sm:pt-8 pb-4 bg-white">
            <div className="container mx-auto px-3 sm:px-4">
                {/* Women’s Collection Title */}
                <h2 className="text-lg sm:text-2xl font-roboto font-bold text-center mt-10 mb-0.5 sm:mb-2">
                    Recommended for you
                </h2>

                {/* Loading State */}
                {loading && (
                    <div className="flex justify-center items-center py-8">
                        <div className="text-gray-500">Loading recommended products...</div>
                    </div>
                )}

                {/* Error State */}
                {error && !loading && (
                    <div className="flex justify-center items-center py-8">
                        <div className="text-red-500">{error}</div>
                    </div>
                )}

                {/* Product Grid */}
                {!loading && !error && (
                    <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 mt-15 sm:gap-6">
                        {filteredProducts.map((item) => (
                            <div
                                key={item._id}
                                className="border rounded-lg p-2 sm:p-4 shadow hover:shadow-lg transition bg-white relative cursor-pointer"
                                onClick={() => handleProductClick(item._id)}
                            >
                                {/* Discount */}
                                {item.discountPercentage && (
                                    <span className="absolute top-1 left-1 sm:top-2 sm:left-2 bg-pink-600 text-white text-[9px] sm:text-xs px-1 sm:px-2 py-0.5 sm:py-1 rounded">
                                        -{item.discountPercentage}%
                                    </span>
                                )}

                                {/* Image */}
                                <img
                                    src={getProductImage(item)}
                                    alt={item.title}
                                    className="w-full h-28 xs:h-32 sm:h-40 object-contain mb-1 sm:mb-3"
                                />

                                {/* Title + Price */}
                                <h3 className="font-semibold text-gray-800 text-[11px] sm:text-sm truncate">
                                    {item.title}
                                </h3>
                                <div className="flex items-center gap-1 sm:gap-2 mt-1">
                                    <p className="text-pink-600 font-bold text-[11px] sm:text-sm">
                                        {utils.formatPrice(item.price)}
                                    </p>
                                    {item.oldPrice && (
                                        <p className="line-through text-gray-400 text-[9px] sm:text-xs">
                                            {utils.formatPrice(item.oldPrice)}
                                        </p>
                                    )}
                                </div>

                                {/* Sizes */}
                                {item.availableSizes && item.availableSizes.length > 0 && (
                                    <div className="flex flex-wrap gap-1 sm:gap-2 mt-1 text-gray-600 text-[9px] sm:text-xs">
                                        {item.availableSizes.slice(0, 4).map((size) => {
                                            const isSelected = selectedSizes[item._id] === size;
                                            return (
                                                <span
                                                    key={size}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleSizeClick(item._id, size);
                                                    }}
                                                    className={`border px-1 sm:px-2 py-0.5 rounded-md cursor-pointer transition
                                        ${isSelected
                                                            ? "bg-pink-600 text-white border-pink-600"
                                                            : "hover:bg-pink-100 hover:border-pink-400"
                                                        }`}
                                                >
                                                    {size}
                                                </span>
                                            );
                                        })}
                                    </div>
                                )}

                                {/* Buttons */}
                                <div className="flex items-center justify-between mt-2 sm:mt-4">
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleAddToCart(item);
                                        }}
                                        className="flex items-center justify-center gap-1 sm:gap-2 flex-1 border bg-[#444444] text-white py-1 sm:py-2 rounded-md text-[10px] sm:text-xs hover:bg-pink-600 transition"
                                    >
                                        <FaShoppingCart /> Add To Cart
                                    </button>
                                    <button 
                                        onClick={(e) => e.stopPropagation()}
                                        className="ml-1 sm:ml-2 text-gray-500 hover:text-pink-600 text-xs sm:text-sm"
                                    >
                                        <FaHeart />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

        
            </div>
        </section>
    );
};

export default WomensSection;
