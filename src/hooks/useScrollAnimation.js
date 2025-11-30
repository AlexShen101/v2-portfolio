import { useEffect, useRef, useState } from 'react';

const useScrollAnimation = (options = {}) => {
  const {
    threshold = 0.15,
    rootMargin = '0px 0px -10% 0px',
    triggerOnce = false,
  } = options;

  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate progress based on element position
      // Animation starts when element enters bottom of viewport
      // Animation completes when element center reaches viewport center
      const elementTop = rect.top;
      const elementHeight = rect.height;
      const elementCenter = elementTop + elementHeight / 2;

      // Start animation when element is fully below viewport
      const start = windowHeight + 200; // Start a bit before entering viewport
      // Complete animation when element center is at viewport center
      const end = windowHeight / 2;

      let progress = 0;
      if (elementCenter <= start && elementCenter >= end) {
        progress = 1 - ((elementCenter - end) / (start - end));
      } else if (elementCenter < end) {
        progress = 1;
      }

      setScrollProgress(Math.max(0, Math.min(1, progress)));
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            handleScroll();
          } else if (!triggerOnce) {
            setIsVisible(false);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    // Add scroll listener for progress calculation
    const scrollListener = () => {
      if (isVisible || !triggerOnce) {
        handleScroll();
      }
    };

    window.addEventListener('scroll', scrollListener, { passive: true });
    handleScroll(); // Initial calculation

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', scrollListener);
    };
  }, [threshold, rootMargin, triggerOnce, isVisible]);

  return { elementRef, isVisible, scrollProgress };
};

export default useScrollAnimation;
