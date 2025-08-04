import React, { useState, useEffect, useCallback } from 'react'
import { assets } from '../assets/assets'

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides = [
    {
      title: "GOAT SALE IS LIVE",
      subtitle: "Biggest Deals on Top Brands",
      image: assets.hero_img,
      discount: "10% Instant Discount*",
      bgColor: "bg-purple-600"
    },
    {
      title: "NEW ARRIVALS",
      subtitle: "Premium Collection",
      image: assets.hero_img,
      discount: "15% Off on First Purchase",
      bgColor: "bg-secondary"
    },
    {
      title: "SPECIAL OFFER",
      subtitle: "Limited Time Deal",
      image: assets.hero_img,
      discount: "Free Shipping on Orders Above ₹299",
      bgColor: "bg-blue-600"
    }
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Auto-play functionality
  useEffect(() => {
    let intervalId;
    if (isAutoPlaying) {
      intervalId = setInterval(nextSlide, 2000);
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isAutoPlaying, nextSlide]);

  const handleManualNavigation = (index) => {
    setIsAutoPlaying(false);
    setCurrentSlide(index);
  };

  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  return (
    <div 
      className="relative w-full overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`relative w-full ${slides[currentSlide].bgColor} flex flex-col-reverse sm:flex-row transition-colors duration-700`}
        style={{ minHeight: '320px', height: 'auto' }}
      >
        {/* Navigation Arrows */}
        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-2 z-10"
          aria-label="Previous slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-2 z-10"
          aria-label="Next slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>

        {/* Left side content */}
        <div className="flex-1 flex items-center justify-center sm:justify-start px-4 sm:pl-16 py-6 sm:py-0">
          <div className="text-white space-y-3 max-w-xl w-full">
            <h1 className="text-3xl sm:text-6xl font-bold tracking-tight leading-tight">{slides[currentSlide].title}</h1>
            <p className="text-lg sm:text-2xl font-light">{slides[currentSlide].subtitle}</p>
            <div className="bg-white text-secondary px-4 sm:px-6 py-2 sm:py-3 rounded-lg inline-block font-semibold text-base sm:text-lg">
              {slides[currentSlide].discount}
            </div>
          </div>
        </div>

        {/* Right side image - Fixed aspect ratio */}
        <div className="w-full sm:w-[45%] h-48 sm:h-auto bg-pink-100 relative overflow-hidden flex-shrink-0">
          <img
            src={slides[currentSlide].image}
            alt="Hero"
            className="w-full h-full object-cover transition-transform duration-700"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
              position: 'absolute',
              inset: 0
            }}
          />
        </div>

        {/* Dots navigation */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => handleManualNavigation(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white w-4' : 'bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Hero
