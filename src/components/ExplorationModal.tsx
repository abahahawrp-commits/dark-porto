import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { ExplorationItem } from '../data/portfolioData';

interface ExplorationModalProps {
  item: ExplorationItem | null;
  onClose: () => void;
}

export function ExplorationModal({ item, onClose }: ExplorationModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (item) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [item, onClose]);

  return (
    <AnimatePresence>
      {item && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
          />

          {/* Lightbox container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-2xl bg-surface border border-stroke rounded-3xl p-4 sm:p-6 shadow-2xl overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-labelledby="lightbox-title"
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-muted hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close lightbox"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Image */}
            <div className="relative aspect-square sm:aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-black">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info */}
            <div className="px-2 pb-2">
              <span className="text-[11px] font-mono uppercase tracking-widest text-muted block mb-1">
                {item.category}
              </span>
              <h3 id="lightbox-title" className="text-xl sm:text-2xl font-display italic text-text-primary mb-2">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-muted leading-relaxed">
                {item.description}
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
