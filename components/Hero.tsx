"use client";

import clsx from "clsx";
import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight";

const SPLINE_SCENE =
  "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode";

type HeroProps = {
  embedded?: boolean;
};

export function Hero({ embedded = false }: HeroProps) {
  return (
    <section
      id={embedded ? undefined : "hero"}
      className={clsx(
        "relative w-full bg-black",
        embedded ? "h-full" : "scroll-mt-24"
      )}
    >
      <div
        className={clsx(
          "relative mx-auto w-full max-w-[1400px] overflow-hidden bg-black px-4 sm:px-5 md:px-6 lg:px-10",
          embedded
            ? "flex h-full flex-col"
            : "min-h-[100svh] supports-[height:100dvh]:min-h-[100dvh] md:h-[100svh] md:supports-[height:100dvh]:h-[100dvh]"
        )}
      >
        <Spotlight
          className="-top-40 left-0 md:-top-20 md:left-60"
          fill="white"
        />

        <div
          className={clsx(
            "relative z-10 flex flex-1 flex-col lg:flex-row",
            !embedded &&
              "min-h-[100svh] supports-[height:100dvh]:min-h-[100dvh] md:min-h-0 md:h-full"
          )}
        >
          <div
            className={clsx(
              "flex flex-1 flex-col justify-center",
              embedded
                ? "px-3 py-4 pt-16 sm:px-4 sm:pt-18 md:pt-20 lg:p-12"
                : "px-2 py-8 pt-20 sm:px-4 sm:py-10 md:p-10 md:pt-24 lg:p-12"
            )}
          >
            <h1 className="max-w-xl text-[1.75rem] font-bold leading-[1.12] tracking-tight text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text sm:text-4xl md:text-5xl lg:text-[3.25rem] lg:leading-[1.08]">
              Olá, seja bem-vindo.
            </h1>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-neutral-300 sm:mt-4 sm:text-base md:text-[1.05rem] md:leading-7">
              Transformo ideias em sites, landing pages e sistemas
              personalizados que unem design, performance e estratégia para
              criar experiências digitais memoráveis.
            </p>
          </div>

          <div
            className={clsx(
              "relative flex-1",
              embedded
                ? "min-h-[32svh] sm:min-h-[36svh] md:min-h-[38svh] lg:min-h-0"
                : "h-[38svh] min-h-[220px] max-h-[360px] sm:h-[42svh] sm:min-h-[260px] md:max-h-none lg:min-h-0 lg:h-auto"
            )}
          >
            <SplineScene scene={SPLINE_SCENE} className="size-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
