"use client";

import { Reveal } from "./Reveal";

type SectionHeaderProps = {
  index: string;
  label: string;
  title: string;
  description?: string;
  compact?: boolean;
};

export function SectionHeader({
  index,
  label,
  title,
  description,
  compact = false,
}: SectionHeaderProps) {
  return (
    <>
      <Reveal>
        <p className="text-sm tracking-wide text-neutral-500">
          <span className="font-medium text-violet-400">/{index}</span>{" "}
          <span className="text-neutral-400">{label}</span>
        </p>
      </Reveal>

      <div
        className={
          compact
            ? "mt-4 flex flex-col gap-4 lg:mt-5 lg:flex-row lg:items-end lg:justify-between lg:gap-10"
            : "mt-8 flex flex-col gap-6 lg:mt-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16"
        }
      >
        <Reveal delay={0.05}>
          <h2
            className={
              compact
                ? "text-[clamp(2rem,7vw,4rem)] font-bold uppercase leading-[0.95] tracking-[-0.04em] text-white"
                : "text-[clamp(2.25rem,11vw,5.5rem)] font-bold uppercase leading-[0.95] tracking-[-0.04em] text-white"
            }
          >
            {title}
          </h2>
        </Reveal>
        {description ? (
          <Reveal delay={0.1}>
            <p
              className={
                compact
                  ? "max-w-md text-xs leading-relaxed text-neutral-400 sm:text-sm md:leading-6 lg:pb-1 lg:text-right"
                  : "max-w-md text-sm leading-relaxed text-neutral-400 md:text-[0.95rem] md:leading-7 lg:pb-2 lg:text-right"
              }
            >
              {description}
            </p>
          </Reveal>
        ) : null}
      </div>
    </>
  );
}
