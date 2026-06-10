"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./ui/Reveal";

export function ContactCta() {
  return (
    <section
      id="contato-cta"
      className="relative isolate min-h-[72svh] overflow-hidden bg-black"
      aria-label="Chamada para contato"
    >
      <video
        className="absolute inset-0 size-full object-cover object-center opacity-90"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/contact-background.png"
        aria-hidden="true"
      >
        <source src="/contact-hero.mp4" type="video/mp4" />
      </video>

      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0,rgba(0,0,0,0.35)_45%,rgba(0,0,0,0.82)_100%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black via-black/60 to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black via-black/60 to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-[1] mx-auto flex min-h-[72svh] w-full max-w-[1400px] flex-col items-center justify-center px-4 py-20 text-center sm:px-6 md:px-10 lg:px-14">
        <Reveal>
          <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-violet-300/90 sm:text-[11px]">
            /07 — Próximo passo
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mt-5 max-w-[16ch] text-[clamp(2rem,6.5vw,4.25rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-white">
            Vamos transformar sua ideia em{" "}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              experiência digital
            </span>
            ?
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-10"
          >
            <Link
              href="/contato"
              className="group relative inline-flex overflow-hidden rounded-full p-px"
            >
              <span
                className="absolute inset-[-200%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0%,#8b5cf6_15%,#22d3ee_30%,transparent_45%)]"
                aria-hidden="true"
              />
              <span className="relative inline-flex items-center gap-3 rounded-full bg-black px-7 py-4 text-sm font-semibold text-white transition-colors group-hover:bg-[#0d0d14] sm:px-8 sm:text-base">
                Iniciar projeto
                <ArrowUpRight
                  className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={2.4}
                />
              </span>
            </Link>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
