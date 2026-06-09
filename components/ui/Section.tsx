import clsx from "clsx";
import { type ReactNode } from "react";
import { SectionHeader } from "./SectionHeader";

export type SectionTone = "black" | "light";

type Props = {
  id?: string;
  index: string;
  label: string;
  title: string;
  description?: string;
  tone?: SectionTone;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
};

export function Section({
  id,
  index,
  label,
  title,
  description,
  tone = "black",
  children,
  className,
  contentClassName,
}: Props) {
  return (
    <section
      id={id}
      className={clsx(
        "relative w-full scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20 md:px-10 md:py-28 lg:px-14 lg:py-36",
        tone === "light" ? "bg-black-light" : "bg-black",
        className
      )}
    >
      <div className="mx-auto w-full max-w-[1400px]">
        <SectionHeader
          index={index}
          label={label}
          title={title}
          description={description}
        />
        <div className={clsx("mt-12 md:mt-16", contentClassName)}>
          {children}
        </div>
      </div>
    </section>
  );
}
