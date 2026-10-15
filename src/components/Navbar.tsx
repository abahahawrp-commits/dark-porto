import { useState, useEffect } from 'react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenResume: () => void;
  onOpenContact: () => void;
}

export function Navbar({
  activeSection,
  onNavigate,
  onOpenResume,
  onOpenContact,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [logoHovered, setLogoHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', id: 'hero' },
    { label: 'Work', id: 'work' },
    { label: 'Resume', id: 'resume' },
  ];

  const handleLinkClick = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (id === 'resume') {
      onOpenResume();
    } else {
      onNavigate(id);
    }
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4 pointer-events-none"
      aria-label="Main Navigation"
    >
      <div
        className={`pointer-events-auto inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-surface px-2 py-2 transition-all duration-300 ${
          scrolled ? 'shadow-md shadow-black/30 bg-surface/90 border-white/15' : ''
        }`}
      >
        {/* 1. Logo: 9x9 circle with accent gradient border (reverses direction on hover). Inner bg-bg circle with "JA" in font-display italic text-[13px]. Scales 110% on hover */}
        <button
          onClick={() => onNavigate('hero')}
          onMouseEnter={() => setLogoHovered(true)}
          onMouseLeave={() => setLogoHovered(false)}
          className="w-9 h-9 rounded-full p-[1.5px] transition-transform duration-300 hover:scale-110 flex items-center justify-center cursor-pointer shrink-0"
          style={{
            background: logoHovered
              ? 'linear-gradient(270deg, #89AACC 0%, #4E85BF 100%)'
              : 'linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)',
          }}
          aria-label="Home logo JA"
        >
          <div className="w-full h-full bg-bg rounded-full flex items-center justify-center">
            <span className="font-display italic text-[13px] text-text-primary leading-none select-none">
              JA
            </span>
          </div>
        </button>

        {/* 2. Divider: w-px h-5 bg-stroke mx-1 (hidden on mobile) */}
        <div className="w-px h-5 bg-stroke mx-1 hidden sm:block" />

        {/* 3. Nav links: ["Home", "Work", "Resume"] */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          {navLinks.map((link) => {
            const isActive =
              link.id === 'resume'
                ? false
                : activeSection === link.id;

            return (
              <button
                key={link.id}
                onClick={(e) => handleLinkClick(link.id, e)}
                className={`text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'text-text-primary bg-stroke/50 font-medium'
                    : 'text-muted hover:text-text-primary hover:bg-stroke/50'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </div>

        {/* 4. Divider */}
        <div className="w-px h-5 bg-stroke mx-1 hidden sm:block" />

        {/* 5. "Say hi" button: Same size as nav links. On hover shows accent gradient border behind (absolute span inset: -2px). Inner content in bg-surface rounded-full. Includes "↗" */}
        <button
          onClick={onOpenContact}
          className="relative group rounded-full text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 transition-all duration-200 cursor-pointer inline-flex items-center"
          aria-label="Say hi"
        >
          {/* Gradient halo on hover */}
          <span
            className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-[1px]"
            aria-hidden="true"
          />
          <div className="relative z-10 inline-flex items-center gap-1 text-text-primary font-medium">
            <span>Say hi</span>
            <span className="text-[13px] leading-none transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              ↗
            </span>
          </div>
        </button>
      </div>
    </nav>
  );
}
