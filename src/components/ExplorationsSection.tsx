import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExplorationItem, EXPLORATIONS } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

interface ExplorationsSectionProps {
  onSelectExploration: (item: ExplorationItem) => void;
}

export function ExplorationsSection({ onSelectExploration }: ExplorationsSectionProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const col1Ref = useRef<HTMLDivElement | null>(null);
  const col2Ref = useRef<HTMLDivElement | null>(null);

  const col1Items = EXPLORATIONS.filter((item) => item.col === 1);
  const col2Items = EXPLORATIONS.filter((item) => item.col === 2);

  useEffect(() => {
    const section = sectionRef.current;
    const col1 = col1Ref.current;
    const col2 = col2Ref.current;

    if (!section || !col1 || !col2) return;

    const ctx = gsap.context(() => {
      // Column 1 moves upward faster
      gsap.fromTo(
        col1,
        { y: 100 },
        {
          y: -220,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        }
      );

      // Column 2 moves downward / lagging
      gsap.fromTo(
        col2,
        { y: -80 },
        {
          y: 180,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="explorations"
      ref={sectionRef}
      className="relative min-h-[220vh] md:min-h-[280vh] bg-bg py-20 overflow-hidden"
    >
      {/* Background subtle radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,rgba(78,133,191,0.06),transparent_100%)] pointer-events-none" />

      {/* Layer 1: Pinned Center (z-10) */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center text-center px-6 pointer-events-none z-10">
        <div className="max-w-xl mx-auto flex flex-col items-center pointer-events-auto">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em] font-medium">
              Explorations
            </span>
            <span className="w-8 h-px bg-stroke" />
          </div>

          {/* Heading: "Visual playground" */}
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-text-primary mb-4">
            Visual <span className="font-display italic font-normal">playground</span>
          </h2>

          {/* Subtext + Dribbble button */}
          <p className="text-sm md:text-base text-muted max-w-sm mb-8 leading-relaxed">
            Experiments in spatial rendering, hardware haptics, generative form, and kinetic motion.
          </p>

          <div className="relative group rounded-full p-[2px]">
            <span
              className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-[1px]"
              aria-hidden="true"
            />
            <a
              href="https://dribbble.com"
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 rounded-full text-xs font-medium uppercase tracking-wider px-6 py-3 bg-surface text-text-primary border border-stroke group-hover:border-transparent transition-all duration-300 inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Explore Dribbble</span>
              <span className="text-sm">↗</span>
            </a>
          </div>
        </div>
      </div>

      {/* Layer 2: Parallax Columns (z-20) */}
      <div className="relative z-20 max-w-[1300px] mx-auto px-6 sm:px-12 -mt-[85vh]">
        <div className="grid grid-cols-2 gap-8 sm:gap-16 md:gap-32 lg:gap-48 items-start">
          {/* Column 1 */}
          <div ref={col1Ref} className="flex flex-col gap-20 sm:gap-32 items-center sm:items-start">
            {col1Items.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectExploration(item)}
                className={`group cursor-pointer aspect-square w-full max-w-[260px] sm:max-w-[320px] rounded-3xl bg-surface border border-stroke p-3 sm:p-4 hover:border-white/40 transition-all duration-500 hover:scale-105 shadow-2xl shadow-black/60 text-left ${item.rotation}`}
                aria-label={`Open exploration: ${item.title}`}
              >
                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-black/40">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="text-[10px] uppercase font-mono text-muted tracking-wider block">
                      {item.category}
                    </span>
                    <h4 className="text-sm font-medium text-text-primary truncate">
                      {item.title}
                    </h4>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Column 2 */}
          <div ref={col2Ref} className="flex flex-col gap-20 sm:gap-32 items-center sm:items-end pt-28 sm:pt-40">
            {col2Items.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectExploration(item)}
                className={`group cursor-pointer aspect-square w-full max-w-[260px] sm:max-w-[320px] rounded-3xl bg-surface border border-stroke p-3 sm:p-4 hover:border-white/40 transition-all duration-500 hover:scale-105 shadow-2xl shadow-black/60 text-left ${item.rotation}`}
                aria-label={`Open exploration: ${item.title}`}
              >
                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-black/40">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="text-[10px] uppercase font-mono text-muted tracking-wider block">
                      {item.category}
                    </span>
                    <h4 className="text-sm font-medium text-text-primary truncate">
                      {item.title}
                    </h4>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
