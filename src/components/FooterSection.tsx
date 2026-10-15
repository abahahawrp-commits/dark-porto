import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import gsap from 'gsap';

interface FooterSectionProps {
  onOpenMessageModal?: () => void;
}

const HLS_STREAM_URL = 'https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8';
const MARQUEE_TEXT = 'BUILDING THE FUTURE • '.repeat(10);

const SOCIAL_LINKS = [
  { name: 'Twitter / X', url: 'https://twitter.com' },
  { name: 'LinkedIn', url: 'https://linkedin.com' },
  { name: 'Dribbble', url: 'https://dribbble.com' },
  { name: 'GitHub', url: 'https://github.com' },
];

export function FooterSection({ onOpenMessageModal }: FooterSectionProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const marqueeRef = useRef<HTMLDivElement | null>(null);
  const [copied, setCopied] = useState(false);

  // Background HLS Video flipped vertically
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;

    if (Hls.isSupported()) {
      hls = new Hls({ enableWorker: true });
      hls.loadSource(HLS_STREAM_URL);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {});
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = HLS_STREAM_URL;
      video.addEventListener('loadedmetadata', () => {
        video.play().catch(() => {});
      });
    }

    return () => {
      if (hls) hls.destroy();
    };
  }, []);

  // GSAP Marquee: xPercent: -50, duration 40, ease "none", repeat -1
  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    const tween = gsap.to(marquee, {
      xPercent: -50,
      duration: 40,
      ease: 'none',
      repeat: -1,
    });

    return () => {
      tween.kill();
    };
  }, []);

  const copyEmailToClipboard = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText('hello@michaelsmith.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <footer
      id="contact"
      className="bg-bg pt-16 md:pt-20 pb-8 md:pb-12 overflow-hidden relative border-t border-stroke/40"
    >
      {/* Background Video: same HLS source as hero, flipped vertically (scale-y-[-1]), heavier overlay bg-black/60 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-auto h-auto object-cover scale-y-[-1] opacity-40"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
      </div>

      {/* GSAP Marquee: "BUILDING THE FUTURE • " repeated 10x. GSAP xPercent: -50, duration 40, ease "none", repeat -1 */}
      <div className="relative z-10 w-full overflow-hidden select-none py-6 opacity-30 hover:opacity-70 transition-opacity duration-500 mb-12 sm:mb-20">
        <div
          ref={marqueeRef}
          className="inline-block whitespace-nowrap text-4xl sm:text-6xl md:text-8xl font-display uppercase tracking-widest text-transparent stroke-text"
          style={{
            WebkitTextStroke: '1px rgba(255, 255, 255, 0.4)',
          }}
        >
          {MARQUEE_TEXT} {MARQUEE_TEXT}
        </div>
      </div>

      {/* Main CTA Section */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 text-center flex flex-col items-center">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs text-muted uppercase tracking-[0.25em] font-medium">
            Let's Collaborate
          </span>
        </div>

        <h2 className="text-4xl sm:text-6xl md:text-7xl font-display italic text-text-primary tracking-tight mb-6">
          Have an idea in mind?
        </h2>

        <p className="text-sm md:text-base text-muted max-w-lg mb-10 leading-relaxed">
          Currently taking on select client projects, advisory engagements, and design engineering architecture for 2026.
        </p>

        {/* CTA: Email button mailto:hello@michaelsmith.com with gradient hover border ring */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
          <div className="relative group rounded-full p-[2px]">
            <span
              className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-[2px]"
              aria-hidden="true"
            />
            <a
              href="mailto:hello@michaelsmith.com"
              className="relative z-10 rounded-full text-base sm:text-lg font-medium px-8 sm:px-10 py-4 bg-surface text-text-primary border border-stroke group-hover:border-transparent transition-all duration-300 inline-flex items-center gap-3 cursor-pointer shadow-xl shadow-black/40"
            >
              <span>hello@michaelsmith.com</span>
              <span className="text-sm transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1">
                ↗
              </span>
            </a>
          </div>

          <button
            onClick={copyEmailToClipboard}
            className="text-xs uppercase tracking-wider text-muted hover:text-text-primary px-4 py-2 rounded-full border border-stroke/50 hover:border-stroke transition-colors cursor-pointer"
          >
            {copied ? 'Copied to clipboard ✓' : 'Copy Email'}
          </button>
        </div>

        {/* Footer Bar: Social links + Green pulsing dot + "Available for projects" */}
        <div className="w-full border-t border-stroke/60 pt-8 sm:pt-10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-muted">
          {/* Status badge */}
          <div className="flex items-center gap-2.5 bg-surface/60 px-3.5 py-1.5 rounded-full border border-stroke/50">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-text-primary/90 font-medium tracking-wide">
              Available for projects
            </span>
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-8">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-text-primary transition-colors tracking-wide"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Copyright & Location */}
          <div className="text-muted/70 tracking-wider">
            © 2026 Michael Smith • Chicago, IL
          </div>
        </div>
      </div>
    </footer>
  );
}
