"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Hero } from "@/components/Hero";
import { IntroVideoBackground } from "@/components/ui/intro-video-background";

const HEADLINE = "Explore sua nova experiência digital.";

// Duas fases dentro da Intro:
//   [0 .. VIDEO_END]        -> scroll controla todos os frames do vídeo
//   [HERO_START .. HERO_END] -> Hero sobe como cortina sobre o último frame
const VIDEO_END = 0.78;
const HERO_START = 0.82;
const HERO_END = 1;

export function Intro() {
  const reducedMotion = useReducedMotion();
  const scrollRef = useRef<HTMLElement>(null);
  const scrollProgress = useMotionValue(0);
  const videoProgress = useMotionValue(0);
  const [motionReady, setMotionReady] = useState(false);

  useEffect(() => {
    setMotionReady(true);
  }, []);

  useEffect(() => {
    const section = scrollRef.current;
    if (!section) return;

    const updateProgress = () => {
      const rect = section.getBoundingClientRect();
      const scrollRange = section.offsetHeight - window.innerHeight;
      if (scrollRange <= 0) return;

      const progress = Math.min(Math.max(-rect.top / scrollRange, 0), 1);
      scrollProgress.set(progress);
      videoProgress.set(Math.min(progress / VIDEO_END, 1));
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    window.visualViewport?.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
      window.visualViewport?.removeEventListener("resize", updateProgress);
    };
  }, [scrollProgress, videoProgress]);

  const textOpacity = useTransform(
    scrollProgress,
    [0, VIDEO_END * 0.5, VIDEO_END],
    [1, 0.85, 0]
  );
  const textY = useTransform(scrollProgress, [0, VIDEO_END], ["0%", "-12%"]);
  const videoBlur = useTransform(scrollProgress, [HERO_START, HERO_END], [0, 18]);
  const videoFilter = useMotionTemplate`blur(${videoBlur}px)`;

  const heroSlideY = useTransform(
    scrollProgress,
    [HERO_START, HERO_END],
    ["100%", "0%"]
  );
  const heroRadius = useTransform(
    scrollProgress,
    [HERO_START, HERO_END],
    [28, 0]
  );
  const heroShadow = useTransform(
    scrollProgress,
    [HERO_START, HERO_END],
    [0.7, 0]
  );
  const heroBorderRadius = useMotionTemplate`${heroRadius}px ${heroRadius}px 0 0`;
  const heroBoxShadow = useMotionTemplate`0 -32px 80px rgba(0,0,0,${heroShadow})`;

  const showCurtainHero = motionReady && !reducedMotion;

  return (
    <>
      <section
        id="top"
        ref={scrollRef}
        className="relative scroll-mt-24 [--intro-runway:320svh] sm:[--intro-runway:310svh] md:[--intro-runway:350svh] xl:[--intro-runway:360svh] 2xl:[--intro-runway:340svh]"
        style={{
          height: motionReady && reducedMotion ? "100svh" : "var(--intro-runway)",
        }}
        aria-label="Abertura"
      >
        <div className="sticky top-0 h-[100svh] overflow-hidden supports-[height:100dvh]:h-[100dvh]">
          <motion.div
            className="absolute inset-0 will-change-[filter]"
            style={{ filter: videoFilter }}
          >
            <IntroVideoBackground progress={videoProgress} />
          </motion.div>

          <motion.div
            style={{ y: textY, opacity: textOpacity }}
            className="relative z-10 flex h-full items-center justify-center px-4 pt-20 text-center will-change-transform sm:px-6 md:pt-24"
          >
            <div className="max-w-[18rem] sm:max-w-none">
              <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-400 sm:mb-4 sm:text-xs sm:tracking-[0.3em]">
                Erick Gabriel · Studio
              </p>
              <h1 className="text-balance text-xl font-medium tracking-tight sm:text-2xl md:text-4xl">
                <span className="text-gradient">{HEADLINE}</span>
              </h1>
            </div>
          </motion.div>

          {showCurtainHero && (
            <motion.div
              style={{
                y: heroSlideY,
                borderRadius: heroBorderRadius,
                boxShadow: heroBoxShadow,
              }}
              className="absolute inset-x-0 top-0 z-30 h-[100svh] overflow-hidden bg-black will-change-transform supports-[height:100dvh]:h-[100dvh]"
            >
              <Hero embedded />
            </motion.div>
          )}
        </div>
      </section>

      {motionReady && reducedMotion && <Hero />}
    </>
  );
}
