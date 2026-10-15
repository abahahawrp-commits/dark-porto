import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setName('');
      setEmail('');
      setMessage('');
      onClose();
    }, 2000);
  };

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
            className="relative z-10 w-full max-w-lg bg-surface border border-stroke rounded-3xl p-6 sm:p-8 shadow-2xl text-text-primary"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
          >
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-stroke/40 hover:bg-stroke text-muted hover:text-text-primary flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-4 h-4" />
            </button>

            <span className="text-xs uppercase font-mono tracking-widest text-muted block mb-2">
              Get In Touch
            </span>
            <h2 id="contact-modal-title" className="text-3xl font-display italic text-text-primary mb-2">
              Say Hello
            </h2>
            <p className="text-xs sm:text-sm text-muted mb-6">
              Have a project, collaboration proposal, or technical question? Send a note directly to Michael.
            </p>

            {sent ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-full accent-gradient mx-auto flex items-center justify-center text-white text-xl">
                  ✓
                </div>
                <h3 className="text-lg font-medium text-text-primary">Message Dispatched</h3>
                <p className="text-xs text-muted">
                  Thank you! I will get back to your inquiry within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="contact-name" className="text-xs uppercase tracking-wider text-muted block mb-1.5 font-medium">
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Chen"
                    className="w-full px-4 py-2.5 rounded-xl bg-bg border border-stroke text-text-primary text-sm focus:outline-none focus:border-white/40 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="text-xs uppercase tracking-wider text-muted block mb-1.5 font-medium">
                    Your Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@example.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-bg border border-stroke text-text-primary text-sm focus:outline-none focus:border-white/40 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="text-xs uppercase tracking-wider text-muted block mb-1.5 font-medium">
                    Message / Project Brief
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell me about your concept, timeline, and vision..."
                    className="w-full px-4 py-2.5 rounded-xl bg-bg border border-stroke text-text-primary text-sm focus:outline-none focus:border-white/40 transition-colors resize-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <a
                    href="mailto:hello@michaelsmith.com"
                    className="text-xs text-muted hover:text-text-primary transition-colors underline"
                  >
                    Or open direct email client ↗
                  </a>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full text-xs font-medium uppercase tracking-wider bg-text-primary text-bg hover:opacity-90 transition-opacity cursor-pointer"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
