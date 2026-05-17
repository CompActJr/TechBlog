import { useEffect, useState } from 'react';

export default function useCarousel(length) {
  const [currentIndex, setCurrentIndex] = useState(length);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const nextSlide = () => {
    setCurrentIndex((prev) => prev + 1);
    setIsTransitioning(true);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => prev - 1);
    setIsTransitioning(true);
  };

  useEffect(() => {
    if (currentIndex >= length * 2) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(length);
      }, 500);
    }

    if (currentIndex <= length - 1) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(length * 2 - 1);
      }, 500);
    }
  }, [currentIndex, length]);

  return {
    currentIndex,
    isTransitioning,
    nextSlide,
    prevSlide,
    setCurrentIndex,
    setIsTransitioning,
  };
}