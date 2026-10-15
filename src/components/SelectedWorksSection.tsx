import { motion } from 'motion/react';
import { Project, PROJECTS } from '../data/portfolioData';

interface SelectedWorksSectionProps {
  onSelectProject: (project: Project) => void;
  onViewAllWork?: () => void;
}

export function SelectedWorksSection({
  onSelectProject,
  onViewAllWork,
}: SelectedWorksSectionProps) {
  return (
    <section id="work" className="bg-bg py-16 md:py-24 relative">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header with Framer Motion whileInView */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6"
        >
          <div>
            {/* Eyebrow: w-8 h-px bg-stroke + "Selected Work" text-xs text-muted uppercase tracking-[0.3em] */}
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em] font-medium">
                Selected Work
              </span>
            </div>

            {/* Heading: "Featured projects" — italic word in font-display italic */}
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-text-primary mb-3">
              Featured <span className="font-display italic font-normal">projects</span>
            </h2>

            {/* Subtext */}
            <p className="text-sm md:text-base text-muted max-w-lg leading-relaxed">
              A selection of projects I've worked on, from concept to launch.
            </p>
          </div>

          {/* "View all work" button (desktop only, hidden md:inline-flex) — rounded-full with gradient hover border ring + right arrow */}
          <div className="hidden md:inline-flex">
            <div className="relative group rounded-full p-[2px]">
              <span
                className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-[1px]"
                aria-hidden="true"
              />
              <button
                onClick={onViewAllWork}
                className="relative z-10 rounded-full text-xs font-medium uppercase tracking-wider px-6 py-3 bg-surface text-text-primary border border-stroke group-hover:border-transparent transition-all duration-300 inline-flex items-center gap-2 cursor-pointer"
              >
                <span>View all work</span>
                <span className="text-sm transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Bento Grid: grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6. Column spans alternate: 7/5/5/7 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {PROJECTS.map((project, index) => {
            const colSpanClass =
              project.colSpan === 7 ? 'md:col-span-7' : 'md:col-span-5';

            return (
              <motion.button
                key={project.id}
                type="button"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.1,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                onClick={() => onSelectProject(project)}
                className={`${colSpanClass} relative rounded-3xl bg-surface border border-stroke overflow-hidden group min-h-[380px] md:min-h-[440px] flex flex-col justify-between cursor-pointer focus:outline-none focus:ring-1 focus:ring-white/20 text-left`}
                aria-label={`View project ${project.title}`}
              >
                {/* Background image with object-cover group-hover:scale-105 */}
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Dark gradient for base readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/30 to-black/30" />

                  {/* Halftone overlay: radial-gradient(circle, #000 1px, transparent 1px) at 4×4px, opacity-20 mix-blend-multiply */}
                  <div
                    className="absolute inset-0 halftone-overlay opacity-20 mix-blend-multiply pointer-events-none"
                    aria-hidden="true"
                  />
                </div>

                {/* Base Card Info (top badge and tags) */}
                <div className="relative z-10 p-6 sm:p-8 flex items-start justify-between">
                  <span className="text-[11px] font-medium tracking-widest uppercase px-3 py-1 rounded-full bg-bg/70 backdrop-blur-md border border-white/10 text-muted group-hover:text-text-primary transition-colors">
                    {project.tag}
                  </span>
                  <span className="text-xs text-muted/80 font-mono">
                    {project.year}
                  </span>
                </div>

                {/* Card Title & Subtitle at bottom */}
                <div className="relative z-10 p-6 sm:p-8">
                  <h3 className="text-2xl sm:text-3xl font-display text-text-primary group-hover:translate-x-1 transition-transform duration-300">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted mt-1 line-clamp-1">
                    {project.subtitle}
                  </p>
                </div>

                {/* Hover overlay: bg-bg/70 opacity-0->1 + backdrop-blur-lg */}
                <div className="absolute inset-0 z-20 bg-bg/75 opacity-0 group-hover:opacity-100 backdrop-blur-lg transition-all duration-300 flex flex-col justify-between p-6 sm:p-8">
                  <div className="flex justify-between items-start">
                    <span className="text-xs text-muted font-mono uppercase tracking-wider">
                      {project.client}
                    </span>
                    <span className="text-xs text-muted">{project.tag}</span>
                  </div>

                  {/* Center hover label: pill with animated gradient border, white bg, "View — Title" (title in font-display italic) */}
                  <div className="flex justify-center items-center my-auto">
                    <div className="relative rounded-full p-[1.5px] animated-gradient-border shadow-xl">
                      <div className="rounded-full bg-white px-5 py-2.5 flex items-center gap-2">
                        <span className="text-xs tracking-wider text-black font-medium uppercase">
                          View —
                        </span>
                        <span className="font-display italic text-base text-black font-semibold">
                          {project.title}
                        </span>
                        <span className="text-xs text-black font-bold ml-1">↗</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted border-t border-stroke/60 pt-4">
                    <span>{project.metrics}</span>
                    <span className="text-text-primary font-medium">Explore project →</span>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
