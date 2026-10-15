import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import gsap from 'gsap';
import { getCycleItem } from '../utils/portfolio';

interface HeroSectionProps {
  onSeeWorks: () => void;
  onReachOut: () => void;
}

const ROLES = ['Creative', 'Fullstack', 'Founder', 'Scholar'] as const;
const HLS_STREAM_URL = 'https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8';

export function HeroSection({ onSeeWorks, onReachOut }: HeroSectionProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const heroContainerRef = useRef<HTMLDivElement | null>(null);
  const [roleIndex, setRoleIndex] = useState(0);

  // Cycling roles every 2 seconds
  useEffect(() => {
    const roleTimer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 2000);

    return () => clearInterval(roleTimer);
  }, []);

  // HLS Video initialization
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;

    if (Hls.isSupported()) {
      hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
      });
      hls.loadSource(HLS_STREAM_URL);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {
          // Autoplay policy fallback: muted is already set on element
        });
      });
      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              hls?.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              hls?.recoverMediaError();
              break;
            default:
              hls?.destroy();
              break;
          }
        }
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Native Safari / iOS HLS support
      video.src = HLS_STREAM_URL;
      video.addEventListener('loadedmetadata', () => {
        video.play().catch(() => {});
      });
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, []);

  // GSAP Entrance timeline
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
      });

      tl.fromTo(
        '.name-reveal',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, delay: 0.1 }
      );

      tl.fromTo(
        '.blur-in',
        { opacity: 0, filter: 'blur(10px)', y: 20 },
        { opacity: 1, filter: 'blur(0px)', y: 0, duration: 1, stagger: 0.1 },
        0.3
      );
    }, heroContainerRef);

    return () => ctx.revert();
  }, []);

  const currentRole = getCycleItem(roleIndex, ROLES);

  return (
    <section
      id="hero"
      ref={heroContainerRef}
      className="relative min-h-screen w-full flex flex-col justify-center items-center overflow-hidden pt-20 pb-16 px-6"
    >
      {/* Background Video */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-auto h-auto object-cover opacity-60"
        />
        {/* Dark overlay: bg-black/20 */}
        <div className="absolute inset-0 bg-black/20" />
        {/* Bottom fade: h-48 bg-gradient-to-t from-bg to-transparent */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg to-transparent" />
      </div>

      {/* Hero Content (centered, z-10) */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto my-auto">
        {/* Eyebrow: text-xs text-muted uppercase tracking-[0.3em] mb-8 — "COLLECTION '26". Class blur-in */}
        <p className="blur-in text-xs text-muted uppercase tracking-[0.3em] mb-8 font-medium">
          COLLECTION '26
        </p>

        {/* Name: text-6xl md:text-8xl lg:text-9xl font-display italic leading-[0.9] tracking-tight text-text-primary mb-6 — "Michael Smith". Class name-reveal */}
        <h1 className="name-reveal text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-display italic leading-[0.9] tracking-tight text-text-primary mb-6 select-none">
          Michael Smith
        </h1>

        {/* Role line: "A {role} lives in Chicago." — roles cycle every 2s through ["Creative", "Fullstack", "Founder", "Scholar"] */}
        <p className="blur-in text-lg sm:text-xl md:text-2xl text-text-primary/90 font-light mb-4">
          A{' '}
          <span
            key={roleIndex}
            className="font-display italic text-text-primary text-2xl sm:text-3xl md:text-4xl animate-role-fade-in inline-block font-normal px-1"
          >
            {currentRole}
          </span>{' '}
          lives in Chicago.
        </p>

        {/* Description: text-sm md:text-base text-muted max-w-md mb-12 */}
        <p className="blur-in text-sm md:text-base text-muted max-w-md mb-12 leading-relaxed px-4">
          Designing seamless digital interactions by focusing on the unique nuances which bring systems to life.
        </p>

        {/* CTA Buttons (inline-flex gap-4) */}
        <div className="blur-in inline-flex flex-wrap items-center justify-center gap-4">
          {/* "See Works": Solid button. Default: bg-text-primary text-bg. Hover: bg-bg text-text-primary with accent gradient border ring */}
          <div className="relative group rounded-full p-[2px] transition-transform duration-300 hover:scale-105">
            <span
              className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-[1px]"
              aria-hidden="true"
            />
            <button
              onClick={onSeeWorks}
              className="relative z-10 rounded-full text-sm font-medium px-7 py-3.5 bg-text-primary text-bg transition-colors duration-300 group-hover:bg-bg group-hover:text-text-primary cursor-pointer flex items-center gap-2"
            >
              <span>See Works</span>
              <span className="text-xs transition-transform duration-200 group-hover:translate-y-0.5">↓</span>
            </button>
          </div>

          {/* "Reach out...": Outlined button. Default: border-2 border-stroke bg-bg text-text-primary. Hover: border-transparent with accent gradient border ring */}
          <div className="relative group rounded-full p-[2px] transition-transform duration-300 hover:scale-105">
            <span
              className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-[1px]"
              aria-hidden="true"
            />
            <button
              onClick={onReachOut}
              className="relative z-10 rounded-full text-sm font-medium px-7 py-3.5 bg-bg text-text-primary border-2 border-stroke group-hover:border-transparent transition-all duration-300 cursor-pointer flex items-center gap-2"
            >
              <span>Reach out...</span>
              <span className="text-xs text-muted group-hover:text-text-primary">✉</span>
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator: Bottom-center, text-xs text-muted uppercase tracking-[0.2em] "SCROLL" label above a w-px h-10 bg-stroke line with animated highlight using .animate-scroll-down */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center pointer-events-none">
        <span className="text-[10px] sm:text-xs text-muted uppercase tracking-[0.2em] mb-3 font-medium">
          SCROLL
        </span>
        <div className="relative w-px h-10 bg-stroke overflow-hidden">
          <div className="w-full h-1/2 bg-text-primary animate-scroll-down" />
        </div>
      </div>
    </section>
  );
}
