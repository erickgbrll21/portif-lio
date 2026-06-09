"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";
import { IntroVideoBackground } from "@/components/ui/intro-video-background";

const HEADLINE = "Explore sua nova experiência digital.";
const SCROLL_RUNWAY = "250vh";

export function Intro() {
  const scrollRef = useRef<HTMLElement>(null);
  const scrollProgress = useMotionValue(0);

  useEffect(() => {
    const section = scrollRef.current;
    if (!section) return;

    let lastProgress = -1;

    const updateProgress = () => {
      const rect = section.getBoundingClientRect();
      const scrollRange = section.offsetHeight - window.innerHeight;
      if (scrollRange <= 0) return;

      const progress = Math.min(Math.max(-rect.top / scrollRange, 0), 1);
      if (Math.abs(progress - lastProgress) < 0.003) return;

      lastProgress = progress;
      scrollProgress.set(progress);
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [scrollProgress]);

  const textY = useTransform(scrollProgress, [0, 1], ["0%", "-18%"]);
  const textOpacity = useTransform(scrollProgress, [0, 0.55, 1], [1, 0.88, 0]);
  const overlayOpacity = useTransform(scrollProgress, [0, 0.75, 1], [1, 0.65, 0]);
  const exitBlur = useTransform(scrollProgress, [0.72, 1], [0, 22]);
  const exitFilter = useMotionTemplate`blur(${exitBlur}px)`;

  return (
    <section
      id="top"
      ref={scrollRef}
      className="relative scroll-mt-24"
      style={{ height: SCROLL_RUNWAY }}
      aria-label="Abertura"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <motion.div
          className="absolute inset-0 will-change-[filter]"
          style={{ filter: exitFilter }}
        >
          <IntroVideoBackground progress={scrollProgress} />
        </motion.div>

        <motion.div
          style={{ opacity: overlayOpacity }}
          className="pointer-events-none absolute inset-0 z-[1] bg-black/40"
          aria-hidden="true"
        />
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/50 via-transparent to-black/50"
          aria-hidden="true"
        />

        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="relative z-10 flex h-full items-center justify-center px-6 pt-20 text-center will-change-transform md:pt-24"
        >
          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-zinc-400">
              Erick Gabriel · Studio
            </p>
            <h1 className="text-balance text-2xl font-medium tracking-tight md:text-4xl">
              <span className="text-gradient">{HEADLINE}</span>
            </h1>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
