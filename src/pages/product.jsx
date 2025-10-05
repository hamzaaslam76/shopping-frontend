import { useState, useEffect } from "react";
import {Star,Truck,RotateCcw,CreditCard,HelpCircle,Share,Package,ChevronDown,ChevronUp} from "lucide-react";
import Topbar from "../components/topbar";
import Header from "../components/header";
import Breadcrumb from "../components/breadcrumb";
import regalleather from "../assets/regalleather.jpg";
import shoes1 from "../assets/shoes1.png";
import shoes2 from "../assets/shoes2.png";
import shoes3 from "../assets/shoes3.png";
import payment from "../assets/payment.png";
import { createIcons, icons } from "lucide";
import Recommended from "../components/recommended";
import BottomBanner from "../components/bottombanner";
import Chooseus  from "../components/chooseus";
import Footer from "../components/footer";
import { useNavigate, useSearchParams } from "react-router-dom";
import { productAPI, utils } from "../services/api";
import { getImageUrl } from "../config/api";
import cartService from "../services/cartService"; 

export default function Product() {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get('id');
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("41");
  const [selectedColor, setSelectedColor] = useState(null);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    createIcons({ icons });
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) {
        setError('Product ID is required');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await productAPI.getProduct(productId);
        setProduct(response.data.product);
        
        // Set default size and color
        if (response.data.product.availableSizes && response.data.product.availableSizes.length > 0) {
          setSelectedSize(response.data.product.availableSizes[0]);
        }
        if (response.data.product.availableColors && response.data.product.availableColors.length > 0) {
          setSelectedColor(response.data.product.availableColors[0]);
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product');
        // Use fallback product data
        setProduct({
          _id: productId,
          title: "Regal Leather Starlet",
          description: "Step into timeless sophistication with the Regal Leather Starlet. Handcrafted from premium quality leather, these classic brown lace-up shoes are designed for the modern gentleman who values both style and comfort.",
          price: 5499,
          oldPrice: 6999,
          discountPercentage: 21,
          availableSizes: ["38", "39", "40", "41", "42", "43"],
          availableColors: [{ name: "Brown", code: "#8B4513" }],
          mainImages: [{ url: "/uploads/products/regal-leather-starlet.jpg" }],
          averageRating: 4.5,
          ratingsQuantity: 120,
          brand: "Regal",
          material: "leather",
          style: "loafers",
          occasion: ["formal", "office"],
          careInstructions: ["Polish regularly", "Store in dry place"],
          weight: 400,
          dimensions: { length: 32, width: 13, height: 8 }
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size before adding to cart');
      return;
    }

    // Add to cart using cart service
    const cartItem = {
      _id: product._id,
      title: product.title,
      price: product.price,
      oldPrice: product.oldPrice,
      mainImages: product.mainImages,
      selectedSize: selectedSize,
      quantity: quantity
    };

    cartService.addToCart(cartItem);
    
    // Show success message
    alert(`${product.title} (Size: ${selectedSize}, Qty: ${quantity}) added to cart!`);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      alert('Please select a size before buying now');
      return;
    }

    // Clear existing cart first to ensure only this product shows on checkout
    cartService.clearCart();
    
    // Store single product info in localStorage for checkout
    const cartItem = {
      productId: product._id,
      title: product.title,
      price: product.price,
      quantity: quantity,
      size: selectedSize,
      color: selectedColor?.name || 'Default',
      image: getProductImage()
    };
    
    localStorage.setItem('checkoutItems', JSON.stringify([cartItem]));
    navigate("/checkout"); 
  };

  const getProductImage = () => {
    if (product && product.mainImages && product.mainImages.length > 0) {
      return getImageUrl(product.mainImages[0].url);
    }
    return regalleather;
  };

  const getThumbnails = () => {
    if (product && product.mainImages && product.mainImages.length > 1) {
      return product.mainImages.map(img => getImageUrl(img.url));
    }
    return [shoes1, shoes2, shoes3, shoes1, shoes2, shoes3];
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading product...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-red-500">{error || 'Product not found'}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Topbar />
      <Header />
      <Breadcrumb/>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left side - Product Images */}
        <div>
          <img
            src={getProductImage()}
            alt={product.title}
            className="w-full rounded-2xl"
          />

          {/* Thumbnails */}
          <div className="grid grid-cols-3 gap-0 mt-4">
            {getThumbnails().map((img, i) => (
              <div
                key={i}
                className="w-[140px] h-[130px] border border-gray-300 cursor-pointer flex items-center justify-center"
              >
                <img
                  src={img}
                  alt="thumbnail"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right side - Product Info */}
        <div>
          {/* Title & Price */}
          <h1 className="text-2xl font-roboto font-bold mb-2">
            {product.title}
          </h1>
          <div className="flex items-center gap-3 mb-3">
            <p className="text-pink-600 text-xl font-bold">{utils.formatPrice(product.price)}</p>
            {product.oldPrice && (
              <p className="line-through text-gray-500">{utils.formatPrice(product.oldPrice)}</p>
            )}
            {product.discountPercentage && (
              <span className="bg-pink-600 text-white text-sm px-2 py-1 rounded">
                Save {product.discountPercentage}%
              </span>
            )}
          </div>

          {/* Sizes */}
          <div className="mb-4">
            <p className="font-lato font-bold">Size: {selectedSize}</p>
            <div className="flex gap-2 mt-2 flex-wrap">
              {(product.availableSizes || ["38", "39", "40", "41", "42", "43"]).map((size) => {
                const isSelected = selectedSize === size;
                const buttonClass = isSelected 
                  ? "w-10 h-10 rounded-full border flex items-center justify-center text-sm font-medium bg-pink-600 text-white border-pink-600"
                  : "w-10 h-10 rounded-full border flex items-center justify-center text-sm font-medium hover:border-pink-600";
                return (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={buttonClass}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
            <button className="mt-2 text-sm font-lato font-bold text-black flex items-center gap-2">
              <i data-lucide="ruler-dimension-line"></i> Size Chart
            </button>

            <div className="mt-4">
              <img
                src={payment}
                alt="Payment Options"
                className="h-12 object-contain"
              />
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-5">
            <p className="font-medium mb-1">Quantity</p>
            <div className="flex items-center gap-3">
              <div className="flex items-center border rounded w-28 justify-between">
                <button
                  onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                  className="px-3 py-2 hover:bg-gray-100"
                >
                  -
                </button>
                <span className="text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 hover:bg-gray-100"
                >
                  +
                </button>
              </div>

              <button 
                onClick={handleAddToCart}
                className="flex-1 border border-gray-300 py-3 rounded font-medium hover:bg-gray-100 transition-colors"
              >
                Add To Cart
              </button>
            </div>
          </div>

          {/* Buy It Now */}
          <button 
            onClick={handleBuyNow}
            className="w-full bg-pink-500 text-white py-3 rounded font-lato font-bold hover:bg-pink-600"
          >
            <span className="flex items-center justify-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-handbag"
              >
                <path d="M2.048 18.566A2 2 0 0 0 4 21h16a2 2 0 0 0 1.952-2.434l-2-9A2 2 0 0 0 18 8H6a2 2 0 0 0-1.952 1.566z" />
                <path d="M8 11V6a4 4 0 0 1 8 0v5" />
              </svg>
              Buy It Now
            </span>
          </button>

          {/* Features */}
          <div className="flex flex-wrap gap-6 mt-8 mb-6 text-black font-roboto font-bold">
            <div className="flex items-center gap-2">
              <Truck size={24} /> Free Delivery
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw size={24} /> Easy Returns
            </div>
            <div className="flex items-center gap-2">
              <CreditCard size={24} /> Secure Payments
            </div>
          </div>

          <div className="flex flex-wrap gap-6 mt-8 mb-6 text-black font-roboto">
            <div className="flex items-center gap-2">
              <HelpCircle size={24} /> Ask a question
            </div>
            <div className="flex items-center gap-2">
              <Share size={24} /> Share
            </div>
          </div>

          <div className="flex flex-wrap gap-6 mt-8 mb-6 text-black font-roboto">
            <div className="flex items-center gap-2">
              <Truck size={24} /> Estimated Delivery Time:{" "}
              <p>23 Sep - 25 Sep</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-6 mt-8 mb-6 text-black font-roboto">
            <div className="flex items-center gap-2">
              <Package size={24} /> Free Shipping: <p>On All Orders</p>
            </div>
          </div>

          {/* Description Section */}
          <div className="pt-2">
            <div
              className="flex items-center justify-between cursor-pointer mb-2"
              onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
            >
              <h2 className="text-lg font-roboto font-semibold">Description:</h2>
              {isDescriptionOpen ? (
                <ChevronDown className="w-7 h-7 text-black border border-gray-300" />
              ) : (
                <ChevronUp className="w-7 h-7 text-black border border-gray-300" />
              )}
            </div>

            {isDescriptionOpen && (
              <div className="text-black text-sm leading-relaxed space-y-3">
                <p className="text-justify">
                  {product.description}
                </p>

                {product.brand && (
                  <p>
                    <strong>Brand:</strong> {product.brand}
                  </p>
                )}
                {product.material && (
                  <p>
                    <strong>Material:</strong> {product.material}
                  </p>
                )}
                {product.style && (
                  <p>
                    <strong>Style:</strong> {product.style}
                  </p>
                )}
                {product.availableColors && product.availableColors.length > 0 && (
                  <p>
                    <strong>Available Colors:</strong> {product.availableColors.map(color => color.name).join(', ')}
                  </p>
                )}
                {product.occasion && product.occasion.length > 0 && (
                  <p>
                    <strong>Occasion:</strong> {product.occasion.join(', ')}
                  </p>
                )}
                {product.careInstructions && product.careInstructions.length > 0 && (
                  <div>
                    <strong>Care Instructions:</strong>
                    <ul className="list-disc list-inside ml-4">
                      {product.careInstructions.map((instruction, index) => (
                        <li key={index}>{instruction}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {product.weight && (
                  <p>
                    <strong>Weight:</strong> {product.weight}g
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

     
    {/* ⭐ Review Section AFTER MAIN */}
<section className="max-w-6xl mx-auto w-full px-4 py-8">
  <div className="flex items-start justify-between">
    {/* Left side: Reviews */}
    <div>
      <h2 className="text-base sm:text-lg font-bold">Reviews</h2>
      <p className="text-xs sm:text-sm text-black">
        Be The First To Give The Reviews
      </p>
    </div>

    {/* Right side: Click To Review + Stars */}
    <div className="flex flex-col items-end">
      {/* Click To Review (always right of Reviews in same row) */}
      <span className="text-xs sm:text-sm text-black font-roboto whitespace-nowrap">
        Click To Review
      </span>

      {/* Stars -> only below Click To Review on mobile, inline on desktop */}
      <div className="flex mt-1 sm:mt-0 sm:ml-2">
        {[...Array(5)].map((_, index) => {
          const starValue = index + 1;
          return (
            <button
              key={index}
              type="button"
              onClick={() => setRating(starValue)}
              onMouseEnter={() => setHover(starValue)}
              onMouseLeave={() => setHover(0)}
              className="focus:outline-none"
            >
              <Star
                size={22}
                className={"transition-colors " + (starValue <= (hover || rating) ? "fill-pink-400 text-pink-400" : "text-black")}
              />
            </button>
          );
        })}
      </div>
    </div>
  </div>
</section>
        <BottomBanner/>
        <Recommended />
        <Chooseus/>
        <Footer/>

    </div>
  );
}
