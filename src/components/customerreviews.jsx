import React from 'react';
import AyeshaImg from '../assets/ayesha.jpg';
import HassanImg from '../assets/hassan.jpg';
import RubabImg from '../assets/rubab.jpg';
import AliImg from '../assets/ali.jpg';

const reviews = [
    {
        name: "Ayesha",
        image: AyeshaImg,
        rating: 5,
        text: "I bought the joggers last week and they're just amazing. The size guide really helped me pick the right fit. Stylish, lightweight, and perfect for daily wear."
    },
    {
        name: "Hassan",
        image: HassanImg,
        rating: 5,
        text: "The leather shoes exceeded my expectations. Comfortable to walk in and look premium. Definitely ordering again!"
    },
    {
        name: "Rubab",
        image: RubabImg,
        rating: 4,
        text: "Got my sneakers from the New Arrivals section — they look exactly like the pictures and are really sturdy. Took one star off because delivery was a day late, but product is worth it."
    },
    {
        name: "Ali",
        image: AliImg,
        rating: 5,
        text: "From casual sandals to formal shoes, everything I ordered from here has been top-notch. Customer support was very responsive too."
    }
];

const StarRating = ({ rating }) => {
    return (
        <div className="flex space-x-1 mt-2">
            {[...Array(5)].map((_, i) => (
                <svg
                    key={i}
                    className={`w-4 h-4 ${i < rating ? 'text-pink-500' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.562-.955L10 0l2.95 5.955 6.562.955-4.756 4.635 1.122 6.545z" />
                </svg>
            ))}
        </div>
    );
};

const CustomerReviews = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 text-center ">
            <h2 className="text-2xl sm:text-3xl font-roboto font-semibold text-gray-800 mb-8 sm:mb-10">
                Our Customer Reviews
            </h2>

            {/* Responsive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {reviews.map((review, index) => (
                    <div
                        key={index}
                        className="w-full max-w-xs sm:max-w-none mx-auto border-2 border-pink-200 rounded-lg p-3 sm:p-5 shadow hover:shadow-md transition duration-300 flex flex-col justify-between"
                    >
                        {/* Review Text */}
                        <p className="text-sm sm:text-base text-gray-700 font-lato mb-4">
                            {review.text}
                        </p>

                        {/* Black Footer */}
                        <div className="flex items-center bg-black text-white px-3 py-2 sm:px-5 sm:py-4 rounded rounded-b-lg">
                            <img
                                src={review.image}
                                alt={review.name}
                                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover mr-3"
                            />
                            <div>
                                <p className="text-sm sm:text-base font-semibold">{review.name}</p>
                                <div className="flex space-x-1">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            className={`w-4 h-4 ${i < review.rating ? 'text-pink-500' : 'text-gray-400'}`}
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.562-.955L10 0l2.95 5.955 6.562.955-4.756 4.635 1.122 6.545z" />
                                        </svg>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                ))}
            </div>
        </div>
    );
};

export default CustomerReviews;
