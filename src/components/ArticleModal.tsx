import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { JournalEntry } from '../data/portfolioData';

interface ArticleModalProps {
  article: JournalEntry | null;
  onClose: () => void;
}

export function ArticleModal({ article, onClose }: ArticleModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (article) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [article, onClose]);

  return (
    <AnimatePresence>
      {article && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
          />

          <motion.article
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-surface border border-stroke rounded-3xl p-6 sm:p-10 shadow-2xl text-text-primary no-scrollbar"
            role="dialog"
            aria-modal="true"
            aria-labelledby="article-title"
          >
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-stroke/40 hover:bg-stroke text-muted hover:text-text-primary flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close article"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header meta */}
            <div className="flex items-center gap-3 text-xs text-muted mb-4">
              <span className="uppercase tracking-widest font-mono text-[10px] px-2.5 py-0.5 rounded-full bg-stroke/50 text-text-primary">
                {article.category}
              </span>
              <span>•</span>
              <span className="font-mono">{article.date}</span>
              <span>•</span>
              <span>{article.readTime}</span>
            </div>

            <h2 id="article-title" className="text-2xl sm:text-4xl font-display italic leading-tight text-text-primary mb-6">
              {article.title}
            </h2>

            <div className="w-full aspect-[2/1] rounded-2xl overflow-hidden mb-8 border border-stroke">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="prose prose-invert max-w-none text-muted leading-relaxed space-y-4 text-sm sm:text-base">
              <p className="text-text-primary font-medium text-base sm:text-lg italic font-display">
                "{article.excerpt}"
              </p>
              <p>{article.content}</p>
              <p>
                In production, performance budgets must never be decoupled from aesthetic ambition. Every easing curve and spring damper represents intentional emotional communication. By anchoring interaction physics into hardware-accelerated pipelines, we guarantee that the user interface feels weightless, natural, and timeless.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-stroke flex items-center justify-between">
              <div className="text-xs text-muted">
                Written by <span className="text-text-primary font-medium">Michael Smith</span>
              </div>
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-full text-xs uppercase tracking-wider bg-stroke/40 hover:bg-stroke text-text-primary transition-colors cursor-pointer"
              >
                Finished Reading
              </button>
            </div>
          </motion.article>
        </div>
      )}
    </AnimatePresence>
  );
}
