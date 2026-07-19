import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X } from 'lucide-react';

export const ExpandableImage = ({ src, alt, title, ...props }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div 
        className="relative group cursor-zoom-in my-8 inline-block max-w-full"
        onClick={() => setIsOpen(true)}
      >
        <img src={src} alt={alt || title} title={title} className="max-w-full h-auto rounded" {...props} />
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-white/95 backdrop-blur-sm cursor-zoom-out"
              onClick={() => setIsOpen(false)}
            />
            
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 z-[210] p-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              src={src}
              alt={alt}
              className="relative z-[205] max-w-full max-h-full object-contain cursor-zoom-out shadow-2xl"
              onClick={() => setIsOpen(false)}
            />
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
