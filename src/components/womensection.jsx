import React, { useState, useEffect } from "react";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { productAPI, utils } from "../services/api";
import { getImageUrl } from "../config/api";
import redheels from "../assets/redheels.jpg";
import whitepumps from "../assets/whitepumps.jpg";
import pinksketchers from "../assets/pinksketchers.jpg";
import brownsandals from "../assets/brownsandals.jpg";
import flipflop from "../assets/flipflop1.png";
import whitesneakers from "../assets/whitesneakers.jpg";

// Fallback images array
const fallbackImages = [redheels, whitepumps, pinksketchers, brownsandals, flipflop, whitesneakers];

const products = [
    { id: 1, title: "Modern Red Heels", price: "Rs 15,499", oldPrice: "Rs 16,999", discount: "-20%", sizes: [38, 40, 42, 45], image: redheels },
    { id: 2, title: "White Pumps", price: "Rs 3,499", oldPrice: "Rs 4,999", discount: "-20%", sizes: [38, 40, 42, 45], image: whitepumps },
    { id: 3, title: "Pink Skechers", price: "Rs 15,499", oldPrice: "Rs 16,999", discount: "-20%", sizes: [38, 40, 42, 45], image: pinksketchers },
    { id: 4, title: "Brown Sandals", price: "Rs 5,499", oldPrice: "Rs 6,999", discount: "-20%", sizes: [38, 40, 42, 45], image: brownsandals },
    { id: 5, title: "Flipflop", price: "Rs 2,499", oldPrice: "Rs 2,699", discount: "-20%", sizes: [38, 40, 42, 45], image: flipflop },
    { id: 6, title: "White Sneakers", price: "Rs 8,499", oldPrice: "Rs 10,999", discount: "-20%", sizes: [38, 40, 42, 45], image: whitesneakers },
    { id: 7, title: "Modern Red Heels", price: "Rs 15,499", oldPrice: "Rs 16,999", discount: "-20%", sizes: [38, 40, 42, 45], image: redheels },
    { id: 8, title: "White Pumps", price: "Rs 3,499", oldPrice: "Rs 4,999", discount: "-20%", sizes: [38, 40, 42, 45], image: whitepumps },
    { id: 9, title: "Pink Skechers", price: "Rs 15,499", oldPrice: "Rs 16,999", discount: "-20%", sizes: [38, 40, 42, 45], image: pinksketchers },
    { id: 10, title: "Brown Sandals", price: "Rs 5,499", oldPrice: "Rs 6,999", discount: "-20%", sizes: [38, 40, 42, 45], image: brownsandals },
    { id: 11, title: "Flipflop", price: "Rs 2,499", oldPrice: "Rs 2,699", discount: "-20%", sizes: [38, 40, 42, 45], image: flipflop },
    { id: 12, title: "White Sneakers", price: "Rs 8,499", oldPrice: "Rs 10,999", discount: "-20%", sizes: [38, 40, 42, 45], image: whitesneakers },
    { id: 13, title: "Brown Sandals", price: "Rs 5,499", oldPrice: "Rs 6,999", discount: "-20%", sizes: [38, 40, 42, 45], image: brownsandals },
    { id: 14, title: "Flipflop", price: "Rs 2,499", oldPrice: "Rs 2,699", discount: "-20%", sizes: [38, 40, 42, 45], image: flipflop },
    { id: 15, title: "White Sneakers", price: "Rs 8,499", oldPrice: "Rs 10,999", discount: "-20%", sizes: [38, 40, 42, 45], image: whitesneakers },
];

const WomensSection = () => {
    const [selectedSizes, setSelectedSizes] = useState({});
    const [filterSize, setFilterSize] = useState(""); // state for dropdown filter
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await productAPI.getProducts({ gender: 'women', limit: 50 });
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

    const getProductImage = (product) => {
        if (product.mainImages && product.mainImages.length > 0) {
            return getImageUrl(product.mainImages[0].url);
        }
        return fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
    };

    // Filtered products based on dropdown selection
    const filteredProducts = filterSize
        ? products.filter((item) => item.availableSizes && item.availableSizes.includes(filterSize))
        : products;

    return (
        <section className="pt-1 sm:pt-8 pb-4 bg-white">
            <div className="container mx-auto px-3 sm:px-4">
                {/* Women’s Collection Title */}
                <h2 className="text-lg sm:text-2xl font-bold text-center mb-0.5 sm:mb-2">
                    Women&apos;s Collection
                </h2>

                {/* Filter dropdown (aligned left, under the heading) */}
                <div className="flex justify-start mb-6">
                    <select
                        value={filterSize}
                        onChange={(e) => setFilterSize(e.target.value)}
                        className=" px-3 py-2 text-sm sm:text-base  w-40"
                    >
                        <option value="">Filter</option>
                        <option value="38">Size 38</option>
                        <option value="40">Size 40</option>
                        <option value="42">Size 42</option>
                        <option value="45">Size 45</option>
                    </select>
                </div>

                {/* Product Grid */}
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="text-lg">Loading women's products...</div>
                    </div>
                ) : error ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="text-lg text-red-500">{error}</div>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-6">
                        {filteredProducts.map((item) => (
                            <div
                                key={item._id}
                                className="border rounded-lg p-2 sm:p-4 shadow hover:shadow-lg transition bg-white relative cursor-pointer"
                                onClick={() => handleProductClick(item._id)}
                            >
                                {/* Discount */}
                                <span className="absolute top-1 left-1 sm:top-2 sm:left-2 bg-pink-600 text-white text-[9px] sm:text-xs px-1 sm:px-2 py-0.5 sm:py-1 rounded">
                                    {item.discountPercentage ? `-${item.discountPercentage}%` : '-20%'}
                                </span>

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
                                <div className="flex flex-wrap gap-1 sm:gap-2 mt-1 text-gray-600 text-[9px] sm:text-xs">
                                    {(item.availableSizes || ['38', '40', '42', '45']).map((size) => {
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

                                {/* Buttons */}
                                <div className="flex items-center justify-between mt-2 sm:mt-4">
                                    <button className="flex items-center justify-center gap-1 sm:gap-2 flex-1 border bg-[#444444] text-white py-1 sm:py-2 rounded-md text-[10px] sm:text-xs hover:bg-pink-600 transition">
                                        <FaShoppingCart /> Add To Cart
                                    </button>
                                    <button className="ml-1 sm:ml-2 text-gray-500 hover:text-pink-600 text-xs sm:text-sm">
                                        <FaHeart />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Recently Viewed */}
                <h2 className="text-lg sm:text-2xl font-bold mt-10 mb-4 sm:mb-6">
                    Recently Viewed Products
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-6">
                    {products.slice(0, 3).map((item) => (
                        <div
                            key={item._id}
                            className="border rounded-lg p-2 sm:p-4 shadow hover:shadow-lg transition bg-white relative cursor-pointer"
                            onClick={() => handleProductClick(item._id)}
                        >
                            <span className="absolute top-1 left-1 bg-pink-600 text-white text-[9px] sm:text-xs px-1 sm:px-2 py-0.5 sm:py-1 rounded">
                                {item.discountPercentage ? `-${item.discountPercentage}%` : '-20%'}
                            </span>

                            <img
                                src={getProductImage(item)}
                                alt={item.title}
                                className="w-full h-28 sm:h-36 object-contain mb-2 sm:mb-3"
                            />

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
                            <div className="flex flex-wrap gap-1 sm:gap-2 mt-1 text-gray-600 text-[9px] sm:text-xs">
                                {(item.availableSizes || ['38', '40', '42', '45']).map((size) => {
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

                            {/* Buttons */}
                            <div className="flex items-center justify-between mt-2 sm:mt-4">
                                <button className="flex items-center justify-center gap-1 sm:gap-2 flex-1 border bg-[#444444] text-white py-1 sm:py-2 rounded-md text-[10px] sm:text-xs hover:bg-pink-600 transition">
                                    <FaShoppingCart /> Add To Cart
                                </button>
                                <button className="ml-1 sm:ml-2 text-gray-500 hover:text-pink-600 text-xs sm:text-sm">
                                    <FaHeart />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WomensSection;
