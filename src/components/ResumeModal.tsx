import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-surface border border-stroke rounded-3xl p-6 sm:p-10 shadow-2xl text-text-primary no-scrollbar"
            role="dialog"
            aria-modal="true"
            aria-labelledby="resume-title"
          >
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-stroke/40 hover:bg-stroke text-muted hover:text-text-primary flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close resume"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="border-b border-stroke pb-6 mb-8">
              <span className="text-xs uppercase font-mono tracking-widest text-muted block mb-2">
                Curriculum Vitae
              </span>
              <h2 id="resume-title" className="text-3xl sm:text-5xl font-display italic text-text-primary mb-2">
                Michael Smith
              </h2>
              <p className="text-sm text-muted">
                Design Engineer & Creative Technologist based in Chicago, IL
              </p>
            </div>

            {/* Experience */}
            <div className="space-y-8 mb-10">
              <h3 className="text-xs font-mono uppercase tracking-widest text-muted">
                Selected Experience
              </h3>

              <div className="space-y-6">
                <div className="border-l border-stroke pl-4 sm:pl-6 relative">
                  <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full accent-gradient" />
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                    <h4 className="text-base sm:text-lg font-medium text-text-primary">
                      Principal Creative Engineer — Studio Monolith
                    </h4>
                    <span className="text-xs font-mono text-muted">2023 — Present</span>
                  </div>
                  <p className="text-xs sm:text-sm text-muted leading-relaxed">
                    Directed interactive WebGL experiences, design systems, and custom shader pipelines for global luxury brands, high-frequency software, and automotive launches.
                  </p>
                </div>

                <div className="border-l border-stroke pl-4 sm:pl-6 relative">
                  <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-stroke" />
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                    <h4 className="text-base sm:text-lg font-medium text-text-primary">
                      Staff Design Technologist — Kinetic Labs
                    </h4>
                    <span className="text-xs font-mono text-muted">2020 — 2023</span>
                  </div>
                  <p className="text-xs sm:text-sm text-muted leading-relaxed">
                    Pioneered component micro-interactions, low-latency animation runtimes, and real-time collaborative canvas applications.
                  </p>
                </div>

                <div className="border-l border-stroke pl-4 sm:pl-6 relative">
                  <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-stroke" />
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                    <h4 className="text-base sm:text-lg font-medium text-text-primary">
                      Interactive Developer — Freelance / Consultancy
                    </h4>
                    <span className="text-xs font-mono text-muted">2015 — 2020</span>
                  </div>
                  <p className="text-xs sm:text-sm text-muted leading-relaxed">
                    Partnered with early-stage YC founders, cultural museums, and architectural firms to prototype novel sensory user interfaces.
                  </p>
                </div>
              </div>
            </div>

            {/* Core Competencies */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-muted mb-3">
                  Technical Stack
                </h4>
                <div className="flex flex-wrap gap-2 text-xs text-text-primary/90">
                  {['React 19', 'TypeScript', 'Three.js / WebGL', 'GLSL', 'GSAP', 'Tailwind CSS', 'Vite', 'Next.js', 'HLS.js', 'Node.js'].map(
                    (tech) => (
                      <span key={tech} className="px-2.5 py-1 rounded bg-bg border border-stroke">
                        {tech}
                      </span>
                    )
                  )}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-muted mb-3">
                  Design Craft
                </h4>
                <div className="flex flex-wrap gap-2 text-xs text-text-primary/90">
                  {['Design Systems', 'Micro-Interactions', 'Typography', 'Creative Direction', 'Spatial Layout', 'Motion Design', 'Hardware UI'].map(
                    (craft) => (
                      <span key={craft} className="px-2.5 py-1 rounded bg-bg border border-stroke">
                        {craft}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-6 border-t border-stroke">
              <a
                href="mailto:hello@michaelsmith.com?subject=Resume%20Inquiry"
                className="text-xs uppercase tracking-wider text-text-primary font-medium hover:underline inline-flex items-center gap-1.5"
              >
                <span>Request Full Dossier / PDF</span>
                <span>↗</span>
              </a>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-full text-xs font-medium uppercase tracking-wider bg-text-primary text-bg hover:opacity-90 transition-opacity cursor-pointer"
              >
                Done
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
