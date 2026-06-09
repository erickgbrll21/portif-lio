import { type ReactNode } from "react";
import clsx from "clsx";

type Props = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  className?: string;
  align?: "left" | "center";
};

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
  align = "center",
}: Props) {
  return (
    <section
      id={id}
      className={clsx(
        "relative w-full scroll-mt-24 bg-black px-6 py-28 md:py-36",
        className
      )}
    >
      <div className="mx-auto max-w-6xl">
        {(eyebrow || title || description) && (
          <header
            className={clsx(
              "mb-16 flex flex-col gap-4",
              align === "center" ? "items-center text-center" : "items-start"
            )}
          >
            {eyebrow && (
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium tracking-wide text-neutral-300 uppercase">
                <span className="size-1.5 rounded-full bg-violet-400 shadow-[0_0_12px_2px_rgba(167,139,250,0.7)]" />
                {eyebrow}
              </span>
            )}
            {title && (
              <h2 className="max-w-3xl text-balance text-3xl font-semibold leading-[1.1] tracking-tight text-gradient md:text-5xl">
                {title}
              </h2>
            )}
            {description && (
              <p className="max-w-2xl text-pretty text-base text-neutral-400 md:text-lg">
                {description}
              </p>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
