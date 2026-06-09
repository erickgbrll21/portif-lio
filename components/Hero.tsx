"use client";

import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight";

const SPLINE_SCENE =
  "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode";

export function Hero() {
  return (
    <section id="hero" className="relative w-full scroll-mt-24 bg-black">
      <div className="relative mx-auto h-[100svh] w-full max-w-[1400px] overflow-hidden bg-black px-4 md:px-6 lg:px-10">
        <Spotlight
          className="-top-40 left-0 md:-top-20 md:left-60"
          fill="white"
        />

        <div className="relative z-10 flex h-full flex-col lg:flex-row">
          <div className="flex flex-1 flex-col justify-center p-8 pt-20 md:p-10 md:pt-24 lg:p-12">
            <h1 className="max-w-xl text-4xl font-bold tracking-tight text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text md:text-5xl lg:text-[3.25rem] lg:leading-[1.08]">
              Olá, seja bem-vindo.
            </h1>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-neutral-300 md:text-[1.05rem] md:leading-7">
              Transformo ideias em sites, landing pages e sistemas
              personalizados que unem design, performance e estratégia para
              criar experiências digitais memoráveis.
            </p>
          </div>

          <div className="relative min-h-[340px] flex-1 sm:min-h-[400px] lg:min-h-0">
            <SplineScene scene={SPLINE_SCENE} className="size-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
