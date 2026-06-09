"use client";

import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { useState } from "react";
import { Reveal } from "./ui/Reveal";

type Service = {
  title: string;
  description: string;
  tags: string[];
  preview: "web" | "brand" | "social";
};

const services: Service[] = [
  {
    title: "Sites e Landing Pages",
    description:
      "Sites com design forte, interações modernas e performance real, pensados para transmitir valor e gerar resultados.",
    tags: ["Landing Page", "Institucional", "Portfólio", "SaaS"],
    preview: "web",
  },
  {
    title: "Logo e Branding",
    description:
      "Identidades visuais com personalidade, consistência e aplicação pensada para todos os pontos de contato da marca.",
    tags: ["Logo", "Identidade", "Brandbook", "Guidelines"],
    preview: "brand",
  },
  {
    title: "Criativos para rede social",
    description:
      "Peças visuais para redes sociais com estética alinhada à marca, ritmo de publicação e foco em atenção e conversão.",
    tags: ["Posts", "Stories", "Reels", "Campanhas"],
    preview: "social",
  },
];

function LinesIcon({ open }: { open?: boolean }) {
  if (open) return null;

  return (
    <span
      className="flex w-5 shrink-0 flex-col gap-1 text-neutral-500 transition-colors duration-200 group-hover:text-white"
      aria-hidden="true"
    >
      <span className="h-px w-full bg-current" />
      <span className="h-px w-4 bg-current" />
      <span className="h-px w-full bg-current" />
    </span>
  );
}

function WebPreview() {
  return (
    <div className="relative mx-auto w-full max-w-[320px] rounded-xl border border-white/10 bg-[#111] p-3 shadow-2xl">
      <div className="mb-2 flex gap-1">
        <span className="size-1.5 rounded-full bg-violet-500" />
        <span className="size-1.5 rounded-full bg-white/20" />
        <span className="size-1.5 rounded-full bg-white/20" />
      </div>
      <div className="space-y-2 rounded-lg bg-[#0a0a0a] p-3">
        <div className="h-2 w-2/3 rounded bg-white/10" />
        <div className="h-16 rounded-lg bg-gradient-to-br from-violet-500/80 to-[#1a1a1a]" />
        <div className="grid grid-cols-2 gap-2">
          <div className="h-10 rounded bg-white/[0.06]" />
          <div className="h-10 rounded bg-violet-500/30" />
        </div>
      </div>
    </div>
  );
}

function BrandPreview() {
  return (
    <div className="mx-auto grid w-full max-w-[280px] grid-cols-2 gap-3">
      <div className="flex aspect-square items-center justify-center rounded-xl border border-white/10 bg-[#141414] text-2xl font-bold text-white">
        EG
      </div>
      <div className="flex aspect-square items-center justify-center rounded-xl border border-violet-500/40 bg-violet-500/10 text-xs uppercase tracking-[0.2em] text-violet-400">
        Mark
      </div>
      <div className="col-span-2 h-20 rounded-xl border border-white/10 bg-gradient-to-r from-[#141414] to-[#0a0a0a]" />
    </div>
  );
}

function SocialPreview() {
  return (
    <div className="mx-auto grid w-full max-w-[300px] grid-cols-3 gap-2">
      {[1, 2, 3, 4, 5, 6].map((n) => (
        <div
          key={n}
          className={clsx(
            "aspect-square rounded-md",
            n % 3 === 0 ? "bg-violet-500/25" : "bg-white/[0.06]"
          )}
        />
      ))}
    </div>
  );
}

function ServicePreview({ type }: { type: Service["preview"] }) {
  if (type === "brand") return <BrandPreview />;
  if (type === "social") return <SocialPreview />;
  return <WebPreview />;
}

export function Services() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section
      id="servicos"
      className="relative w-full scroll-mt-24 bg-black px-6 py-20 md:px-10 md:py-28 lg:px-14 lg:py-36"
    >
      <div className="mx-auto w-full max-w-[1400px]">
        <Reveal>
          <p className="text-sm tracking-wide text-neutral-500">
            <span className="font-medium text-violet-400">/03</span>{" "}
            <span className="text-neutral-400">Serviços</span>
          </p>
        </Reveal>

        <div className="mt-8 flex flex-col gap-6 lg:mt-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <Reveal delay={0.05}>
            <h2 className="text-[clamp(2.75rem,9vw,5.5rem)] font-bold uppercase leading-[0.92] tracking-[-0.04em] text-white">
              Soluções
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-md text-sm leading-relaxed text-neutral-400 md:text-[0.95rem] md:leading-7 lg:pb-2 lg:text-right">
              Não é sobre volume, é sobre nível. Marcas, sites e criativos
              desenvolvidos com critério, estética e intenção.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <ul className="mt-12 border-t border-white/10 md:mt-16">
            {services.map((service, index) => {
              const isOpen = openIndex === index;

              return (
                <li key={service.title} className="border-b border-white/10">
                  <button
                    type="button"
                    onClick={() => toggle(index)}
                    aria-expanded={isOpen}
                    className={clsx(
                      "group flex w-full items-center gap-5 py-6 text-left transition-colors duration-200 md:gap-8 md:py-7",
                      !isOpen && "hover:bg-white/[0.02]"
                    )}
                  >
                    <span
                      className={clsx(
                        "grid size-9 shrink-0 place-items-center rounded-md border text-xs transition-colors duration-200 md:size-10",
                        isOpen
                          ? "border-white/15 bg-[#141414] text-neutral-300"
                          : "border-white/[0.08] bg-[#141414] text-neutral-500 group-hover:border-white/15 group-hover:text-neutral-300"
                      )}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span
                      className={clsx(
                        "flex-1 text-base transition-colors duration-200 md:text-lg",
                        isOpen
                          ? "font-medium text-white"
                          : "text-neutral-400 group-hover:text-white"
                      )}
                    >
                      {service.title}
                    </span>

                    <LinesIcon open={isOpen} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="mb-6 rounded-xl border border-white/10 bg-[#0a0a0a] p-5 md:mb-7 md:p-6 lg:p-8">
                          <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-10">
                            <div>
                              <p className="max-w-md text-sm leading-relaxed text-neutral-400 md:text-[0.95rem] md:leading-7">
                                {service.description}
                              </p>
                              <div className="mt-5 flex flex-wrap gap-2">
                                {service.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="rounded-full border border-white/10 bg-[#141414] px-3 py-1 text-[11px] text-neutral-300"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div className="relative flex min-h-[220px] items-center justify-center rounded-lg border border-white/[0.06] bg-[#050505] p-6 md:min-h-[260px]">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setOpenIndex(null);
                                }}
                                aria-label="Fechar"
                                className="absolute right-4 top-4 grid size-8 place-items-center text-violet-400 transition hover:opacity-70"
                              >
                                <span className="relative block size-4">
                                  <span className="absolute left-0 top-1/2 h-px w-4 -translate-y-1/2 rotate-45 bg-current" />
                                  <span className="absolute left-0 top-1/2 h-px w-4 -translate-y-1/2 -rotate-45 bg-current" />
                                </span>
                              </button>
                              <ServicePreview type={service.preview} />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
