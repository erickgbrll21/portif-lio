"use client";

import { type MotionValue } from "framer-motion";
import { useEffect, useRef } from "react";

const VIDEO_SRC = "/intro-background.mp4";
const SEEK_THRESHOLD = 0.028;

type IntroVideoBackgroundProps = {
  progress: MotionValue<number>;
};

export function IntroVideoBackground({ progress }: IntroVideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef(progress);
  const durationRef = useRef(0);
  const readyRef = useRef(false);
  const targetTimeRef = useRef(0);
  const rafScheduledRef = useRef(false);

  progressRef.current = progress;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.pause();
    video.playsInline = true;
    video.preload = "auto";

    const applySeek = () => {
      const currentVideo = videoRef.current;
      if (!currentVideo || !readyRef.current || currentVideo.seeking) return;

      const target = targetTimeRef.current;
      if (Math.abs(currentVideo.currentTime - target) < SEEK_THRESHOLD) return;

      currentVideo.currentTime = target;
    };

    const queueSeek = () => {
      if (rafScheduledRef.current) return;
      rafScheduledRef.current = true;
      requestAnimationFrame(() => {
        rafScheduledRef.current = false;
        applySeek();
      });
    };

    const syncFromProgress = (value: number) => {
      if (!readyRef.current) return;
      const clamped = Math.min(Math.max(value, 0), 1);
      targetTimeRef.current = clamped * durationRef.current;
      queueSeek();
    };

    const onMetadata = () => {
      if (!Number.isFinite(video.duration) || video.duration <= 0) return;
      durationRef.current = video.duration;
      readyRef.current = true;
      syncFromProgress(progressRef.current.get());
    };

    const onSeeked = () => {
      applySeek();
    };

    video.addEventListener("loadedmetadata", onMetadata);
    video.addEventListener("seeked", onSeeked);
    if (video.readyState >= 1) onMetadata();

    const unsubscribe = progress.on("change", syncFromProgress);

    return () => {
      unsubscribe();
      video.removeEventListener("loadedmetadata", onMetadata);
      video.removeEventListener("seeked", onSeeked);
    };
  }, [progress]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-black" aria-hidden="true">
      <video
        ref={videoRef}
        src={VIDEO_SRC}
        muted
        playsInline
        preload="auto"
        className="absolute left-1/2 top-1/2 h-full min-h-full w-full min-w-full -translate-x-1/2 -translate-y-1/2 object-cover object-center"
      />
    </div>
  );
}
