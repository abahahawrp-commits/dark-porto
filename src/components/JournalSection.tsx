import { motion } from 'motion/react';
import { JournalEntry, JOURNAL_ENTRIES } from '../data/portfolioData';

interface JournalSectionProps {
  onSelectArticle: (entry: JournalEntry) => void;
  onViewAll?: () => void;
}

export function JournalSection({ onSelectArticle, onViewAll }: JournalSectionProps) {
  return (
    <section id="journal" className="bg-bg py-16 md:py-24 relative">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Same header pattern (eyebrow + "Recent thoughts" + subtext + "View all" button) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6"
        >
          <div>
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em] font-medium">
                Journal
              </span>
            </div>

            {/* Heading: "Recent thoughts" — italic word in font-display italic */}
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-text-primary mb-3">
              Recent <span className="font-display italic font-normal">thoughts</span>
            </h2>

            {/* Subtext */}
            <p className="text-sm md:text-base text-muted max-w-lg leading-relaxed">
              Perspectives on interface design, real-time kinetic systems, and the intersection of aesthetic craft and modern engineering.
            </p>
          </div>

          {/* "View all" button */}
          <div className="hidden md:inline-flex">
            <div className="relative group rounded-full p-[2px]">
              <span
                className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-[1px]"
                aria-hidden="true"
              />
              <button
                onClick={onViewAll}
                className="relative z-10 rounded-full text-xs font-medium uppercase tracking-wider px-6 py-3 bg-surface text-text-primary border border-stroke group-hover:border-transparent transition-all duration-300 inline-flex items-center gap-2 cursor-pointer"
              >
                <span>View all thoughts</span>
                <span className="text-sm transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* 4 journal entries displayed as horizontal pills (rounded-[40px] sm:rounded-full) */}
        <div className="space-y-4 sm:space-y-5">
          {JOURNAL_ENTRIES.map((entry, index) => (
            <motion.button
              key={entry.id}
              type="button"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              onClick={() => onSelectArticle(entry)}
              aria-label={`Read ${entry.title}`}
              className="w-full text-left flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 p-4 sm:p-3 sm:pr-8 bg-surface/30 hover:bg-surface border border-stroke rounded-[32px] sm:rounded-full transition-all duration-300 group cursor-pointer hover:border-white/20 hover:shadow-lg hover:shadow-black/20"
            >
              {/* Left: Thumbnail & Title */}
              <div className="flex items-center gap-4 sm:gap-6 min-w-0">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden shrink-0 border border-stroke relative">
                  <img
                    src={entry.image}
                    alt={entry.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                </div>

                <div className="min-w-0 pr-2">
                  <span className="text-[10px] sm:text-xs text-muted uppercase tracking-wider block mb-1">
                    {entry.category}
                  </span>
                  <h3 className="text-base sm:text-lg md:text-xl font-medium text-text-primary group-hover:text-white transition-colors truncate">
                    {entry.title}
                  </h3>
                </div>
              </div>

              {/* Right: Meta & Read Indicator */}
              <div className="flex items-center justify-between sm:justify-end gap-6 sm:gap-8 shrink-0 pl-18 sm:pl-0 border-t border-stroke/30 sm:border-0 pt-3 sm:pt-0">
                <div className="flex items-center gap-4 text-xs text-muted">
                  <span className="font-mono">{entry.date}</span>
                  <span className="w-1 h-1 rounded-full bg-stroke" />
                  <span>{entry.readTime}</span>
                </div>

                <div className="w-8 h-8 rounded-full bg-stroke/30 flex items-center justify-center text-muted group-hover:text-text-primary group-hover:bg-stroke/80 transition-all duration-200">
                  <span className="text-xs transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    ↗
                  </span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
