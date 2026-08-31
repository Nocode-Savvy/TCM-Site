'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button after scrolling down 400px
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-24 lg:bottom-8 right-4 sm:right-6 z-40"
        >
          {/* Continuous subtle floating / bouncy animation */}
          <motion.button
            onClick={scrollToTop}
            id="scroll-to-top-btn"
            aria-label="Scroll back to top"
            className="w-12 h-12 rounded-full bg-forest border-2 border-gold text-gold hover:bg-gold hover:text-white shadow-lg hover:shadow-gold flex items-center justify-center transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gold/50 cursor-pointer group"
            animate={{
              y: [0, -6, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            whileHover={{
              scale: 1.1,
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.92 }}
          >
            <ArrowUp
              size={20}
              strokeWidth={2.5}
              className="group-hover:-translate-y-0.5 transition-transform duration-200"
            />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
