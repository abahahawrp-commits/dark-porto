import { motion } from 'motion/react';
import { STATS } from '../data/portfolioData';

export function StatsSection() {
  return (
    <section className="bg-bg py-16 md:py-24 border-y border-stroke relative">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* 3-column grid with stats: 20+ Years Experience, 95+ Projects Done, 200% Satisfied Clients */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="flex flex-col p-6 sm:p-8 rounded-3xl bg-surface/40 border border-stroke/70 relative group hover:border-stroke transition-all duration-300"
            >
              {/* Subtle top indicator */}
              <div className="w-6 h-[2px] accent-gradient mb-6 group-hover:w-12 transition-all duration-300" />

              {/* Stat number */}
              <div className="text-5xl sm:text-6xl lg:text-7xl font-display text-text-primary tracking-tight mb-2">
                {stat.value}
              </div>

              {/* Stat label */}
              <div className="text-lg sm:text-xl font-medium text-text-primary mb-2">
                {stat.label}
              </div>

              {/* Subtext description */}
              <p className="text-xs sm:text-sm text-muted leading-relaxed">
                {stat.subtext}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
