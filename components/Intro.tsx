"use client";

import clsx from "clsx";
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

function getViewportHeight() {
  return window.visualViewport?.height ?? window.innerHeight;
}

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
      const scrollRange = section.offsetHeight - getViewportHeight();
      if (scrollRange <= 0) {
        scrollProgress.set(0);
        videoProgress.set(0);
        return;
      }

      const progress = Math.min(Math.max(-rect.top / scrollRange, 0), 1);
      scrollProgress.set(progress);
      videoProgress.set(Math.min(progress / VIDEO_END, 1));
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    window.visualViewport?.addEventListener("resize", updateProgress);
    window.visualViewport?.addEventListener("scroll", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
      window.visualViewport?.removeEventListener("resize", updateProgress);
      window.visualViewport?.removeEventListener("scroll", updateProgress);
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
        className={clsx(
          "relative scroll-mt-24",
          reducedMotion
            ? "h-[100vh] supports-[height:100svh]:h-[100svh] supports-[height:100dvh]:h-[100dvh]"
            : "h-[320vh] supports-[height:100svh]:h-[320svh]"
        )}
        aria-label="Abertura"
      >
        <div className="sticky top-14 h-[calc(100vh-3.5rem)] overflow-hidden sm:top-16 sm:h-[calc(100vh-4rem)] supports-[height:100svh]:h-[calc(100svh-3.5rem)] sm:supports-[height:100svh]:h-[calc(100svh-4rem)] supports-[height:100dvh]:h-[calc(100dvh-3.5rem)] sm:supports-[height:100dvh]:h-[calc(100dvh-4rem)]">
          <motion.div
            className="absolute inset-0 z-0 will-change-[filter]"
            style={{ filter: videoFilter }}
          >
            <IntroVideoBackground progress={videoProgress} />
          </motion.div>

          <motion.div
            style={{ y: textY, opacity: textOpacity }}
            className="relative z-10 flex h-full items-center justify-center px-4 pt-6 text-center will-change-transform sm:px-6 md:pt-10"
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
              initial={{ y: "100%" }}
              style={{
                y: heroSlideY,
                borderRadius: heroBorderRadius,
                boxShadow: heroBoxShadow,
              }}
              className="absolute inset-x-0 top-0 z-30 h-full overflow-hidden bg-black will-change-transform"
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
