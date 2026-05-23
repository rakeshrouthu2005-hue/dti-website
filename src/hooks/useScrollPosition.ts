
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

interface UseScrollPositionOptions {
  key?: string;
  delay?: number;
}

export const useScrollPosition = ({ key, delay = 100 }: UseScrollPositionOptions = {}) => {
  const location = useLocation();
  const scrollKey = key || location.pathname;
  const isRestoringRef = useRef(false);

  // Save scroll position when component unmounts or route changes
  useEffect(() => {
    const saveScrollPosition = () => {
      if (!isRestoringRef.current) {
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        sessionStorage.setItem(`scroll-${scrollKey}`, scrollPosition.toString());
      }
    };

    const handleScroll = () => {
      if (!isRestoringRef.current) {
        saveScrollPosition();
      }
    };

    // Save on scroll with throttling
    let timeoutId: NodeJS.Timeout;
    const throttledSave = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScroll, 150);
    };

    window.addEventListener('scroll', throttledSave, { passive: true });
    window.addEventListener('beforeunload', saveScrollPosition);

    return () => {
      window.removeEventListener('scroll', throttledSave);
      window.removeEventListener('beforeunload', saveScrollPosition);
      clearTimeout(timeoutId);
    };
  }, [scrollKey]);

  // Restore scroll position when component mounts
  useEffect(() => {
    const restoreScrollPosition = () => {
      const savedPosition = sessionStorage.getItem(`scroll-${scrollKey}`);
      if (savedPosition) {
        isRestoringRef.current = true;
        const position = parseInt(savedPosition, 10);
        
        // Small delay to ensure content is rendered
        setTimeout(() => {
          window.scrollTo({
            top: position,
            behavior: 'instant'
          });
          
          // Reset flag after restoration
          setTimeout(() => {
            isRestoringRef.current = false;
          }, 100);
        }, delay);
      }
    };

    restoreScrollPosition();
  }, [scrollKey, delay]);

  return {
    clearScrollPosition: () => sessionStorage.removeItem(`scroll-${scrollKey}`)
  };
};
