import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { Project } from '../data/portfolioData';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-surface border border-stroke rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl text-text-primary no-scrollbar"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-project-title"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-stroke/40 hover:bg-stroke text-muted hover:text-text-primary flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Media */}
            <div className="relative aspect-video rounded-2xl overflow-hidden mb-6 border border-stroke">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent" />
            </div>

            {/* Metadata Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-xs uppercase font-mono tracking-wider px-3 py-1 rounded-full bg-stroke/40 text-text-primary">
                {project.tag}
              </span>
              <span className="text-xs text-muted font-mono px-2">
                {project.year} • {project.client}
              </span>
            </div>

            {/* Title & Subtitle */}
            <h2 id="modal-project-title" className="text-3xl sm:text-4xl font-display italic text-text-primary mb-2">
              {project.title}
            </h2>
            <p className="text-sm text-muted mb-6">
              {project.subtitle}
            </p>

            {/* Description */}
            <div className="space-y-4 text-sm sm:text-base text-text-primary/90 leading-relaxed mb-8">
              <p>{project.description}</p>
            </div>

            {/* Metrics highlight */}
            <div className="p-4 rounded-2xl bg-bg border border-stroke mb-8">
              <span className="text-xs text-muted uppercase tracking-wider block mb-1">
                Impact & Performance
              </span>
              <p className="text-sm sm:text-base font-medium text-text-primary">
                {project.metrics}
              </p>
            </div>

            {/* Tech Stack */}
            <div className="mb-8">
              <span className="text-xs text-muted uppercase tracking-wider block mb-3">
                Technologies & Tools
              </span>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-3 py-1 rounded-lg bg-bg/80 border border-stroke text-text-primary/80"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer action */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-stroke">
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-full text-xs uppercase tracking-wider text-muted hover:text-text-primary transition-colors cursor-pointer"
              >
                Close
              </button>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 rounded-full text-xs font-medium uppercase tracking-wider bg-text-primary text-bg hover:opacity-90 transition-opacity inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Launch Preview</span>
                  <span>↗</span>
                </a>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
