"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useMemo, useRef } from "react";
import clsx from "clsx";

type Props = {
  text: string;
  className?: string;
  as?: "p" | "h2" | "h3";
};

function RevealWord({
  word,
  progress,
  start,
  end,
}: {
  word: string;
  progress: MotionValue<number>;
  start: number;
  end: number;
}) {
  const opacity = useTransform(progress, [start, end], [0.1, 1]);
  const blur = useTransform(progress, [start, end], [12, 0]);
  const filter = useTransform(blur, (v) => `blur(${v}px)`);

  return (
    <motion.span
      style={{ opacity, filter }}
      className="mr-[0.28em] inline-block will-change-[opacity,filter]"
    >
      {word}
    </motion.span>
  );
}

export function ScrollRevealText({
  text,
  className,
  as: Tag = "p",
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const words = useMemo(
    () => text.trim().split(/\s+/).filter(Boolean),
    [text]
  );

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "end 0.4"],
  });

  if (reducedMotion) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <div ref={containerRef}>
      <Tag className={clsx(className)}>
        {words.map((word, i) => {
          const start = i / words.length;
          const end = Math.min(1, start + 0.18);

          return (
            <RevealWord
              key={`${word}-${i}`}
              word={word}
              progress={scrollYProgress}
              start={start}
              end={end}
            />
          );
        })}
      </Tag>
    </div>
  );
}
