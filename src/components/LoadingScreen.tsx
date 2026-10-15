import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { formatCounter } from '../utils/portfolio';

interface LoadingScreenProps {
  onComplete: () => void;
}

const WORDS = ['Design', 'Create', 'Inspire'] as const;
const DURATION_MS = 2700;

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [count, setCount] = useState<number>(0);
  const [wordIndex, setWordIndex] = useState<number>(0);
  const startTimeRef = useRef<number | null>(null);
  const reqIdRef = useRef<number | null>(null);
  const completedRef = useRef<boolean>(false);

  // Cycling words every 900ms
  useEffect(() => {
    const wordInterval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % WORDS.length);
    }, 900);

    return () => clearInterval(wordInterval);
  }, []);

  // requestAnimationFrame counter 000 -> 100 over 2700ms
  useEffect(() => {
    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(1, elapsed / DURATION_MS);
      const currentCount = Math.floor(progress * 100);

      setCount(currentCount);

      if (progress < 1) {
        reqIdRef.current = requestAnimationFrame(animate);
      } else {
        if (!completedRef.current) {
          completedRef.current = true;
          // 400ms delay then calls onComplete
          setTimeout(() => {
            onComplete();
          }, 400);
        }
      }
    };

    reqIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (reqIdRef.current) {
        cancelAnimationFrame(reqIdRef.current);
      }
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
      className="fixed inset-0 z-[9999] bg-bg flex flex-col justify-between p-6 sm:p-10 md:p-14 select-none cursor-default"
      data-testid="loading-screen"
    >
      {/* Top row */}
      <div className="flex items-center justify-between">
        <motion.span
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-xs text-muted uppercase tracking-[0.3em] font-medium"
        >
          Portfolio
        </motion.span>
        <button
          onClick={onComplete}
          className="text-[11px] uppercase tracking-[0.2em] text-muted/60 hover:text-text-primary px-3 py-1 rounded-full border border-stroke/40 hover:border-stroke transition-all"
        >
          Skip
        </button>
      </div>

      {/* Center rotating words */}
      <div className="flex items-center justify-center my-auto overflow-hidden h-24 sm:h-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={WORDS[wordIndex]}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-6xl lg:text-7xl font-display italic text-text-primary/80 text-center tracking-tight"
          >
            {WORDS[wordIndex]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom row */}
      <div className="flex items-end justify-between relative pb-4">
        <div className="text-xs text-muted/60 tracking-wider hidden sm:block">
          MICHAEL SMITH • COLLECTION '26
        </div>
        <div className="text-6xl md:text-8xl lg:text-9xl font-display text-text-primary tabular-nums leading-none ml-auto">
          {formatCounter(count)}
        </div>
      </div>

      {/* Bottom progress bar: h-[3px] bg-stroke/50, inner div with .accent-gradient, scaleX(count/100) */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-stroke/50 overflow-hidden">
        <div
          className="h-full accent-gradient origin-left transition-transform duration-75 ease-linear"
          style={{
            transform: `scaleX(${count / 100})`,
            boxShadow: '0 0 8px rgba(137, 170, 204, 0.35)',
          }}
        />
      </div>
    </motion.div>
  );
}
