import React from 'react'
import { FaStar } from 'react-icons/fa'
import ReviewSlider from './ReviewSlider'

const Reviews = () => {
  return (
    <div className="pt-20 pb-20 items-center justify-center flex-col bg-sky-900">
        <div className="w-[80%] mx-auto grid items-center grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Text Content */}
            <div>
                <h1 className="text-3xl font-semibold text-white">What our customer are saying us?</h1>
                <p className="mt-6 text-gray-200">Our customers share their unforgettable experiences with us. Discover how our services have exceeded their expectations and made their journeys memorable. Read on to find out why we are their trusted choice!</p>
                {/* Rating */}
                <div className="mt-6 items-center space-x-6">
                    <div>
                        <p className="text-2xl font-bold text-white">4.91</p>
                        <p className="text-white mb-2">Overall Rating</p>
                        <div className="flex items-center">
                            <FaStar className="text-white" />
                            <FaStar className="text-white" />
                            <FaStar className="text-white" />
                            <FaStar className="text-white" />
                            <FaStar className="text-white" />
                        </div>
                    </div>
                </div>
            </div>
            {/* Card Slider */}
            <div className="overflow-hidden">
                <ReviewSlider/>
            </div>
        </div>
    </div>
  )
}

export default Reviews