"use client";

import Image from "next/image";
import { Reveal } from "./ui/Reveal";
import { ScrollRevealText } from "./ui/ScrollRevealText";
import { Plane, MapPin } from "lucide-react";

const introText =
  "Sou formado em Análise e Desenvolvimento de Sistemas e trabalho criando soluções digitais que unem tecnologia, design e estratégia para gerar resultados reais. Hoje, meu foco é claro: sites, landing pages e sistemas personalizados, com atenção máxima à estética, experiência e performance.";

const highlights = [
  {
    icon: Plane,
    text: "Já desenvolvi sites, landing pages e sistemas para diferentes mercados, sempre com foco em identidade visual, performance e interação.",
  },
  {
    icon: MapPin,
    text: "Sou de Belo Horizonte (MG), mas trabalho de forma remota com empresas que valorizam tecnologia bem executada e presença digital no mais alto nível.",
  },
];

export function About() {
  return (
    <section
      id="sobre"
      className="relative w-full scroll-mt-24 bg-[#111111] px-6 py-20 md:px-10 md:py-28 lg:px-14 lg:py-36"
    >
      <div className="mx-auto w-full max-w-[1400px]">
        <Reveal>
          <p className="text-sm tracking-wide text-neutral-500">
            <span className="font-medium text-violet-400">/01</span>{" "}
            <span className="text-neutral-400">Sobre mim</span>
          </p>
        </Reveal>

        <div className="mt-10 pl-0 md:mt-12 md:pl-[min(18vw,220px)] lg:pl-[min(20vw,280px)]">
          <Reveal delay={0.05}>
            <div className="flex items-center gap-4 md:gap-5">
              <div className="relative size-20 shrink-0 overflow-hidden rounded-full bg-black ring-1 ring-white/10 md:size-[5.5rem]">
                <div className="absolute -inset-[9%]">
                  <Image
                    src="/erick-gabriel.png"
                    alt="Foto de Erick Gabriel"
                    fill
                    quality={100}
                    sizes="(max-width: 768px) 240px, 264px"
                    className="object-cover object-[center_12%]"
                    priority
                  />
                </div>
              </div>
              <div>
                <h2 className="text-lg font-semibold tracking-tight text-white md:text-xl">
                  Erick Gabriel
                </h2>
                <p className="text-sm text-neutral-500 md:text-[0.95rem]">
                  Desenvolvedor de Sistemas & Experiências Digitais
                </p>
              </div>
            </div>
          </Reveal>

          <ScrollRevealText
            text={introText}
            className="mt-10 max-w-[68ch] text-pretty text-[1.35rem] font-medium leading-[1.18] tracking-[-0.02em] text-white md:mt-12 md:text-[1.65rem] md:leading-[1.16] lg:mt-14 lg:text-[1.85rem] lg:leading-[1.15]"
          />

          <div className="mt-24 grid gap-12 md:mt-32 md:grid-cols-2 md:gap-x-20 md:gap-y-14 lg:mt-40 lg:max-w-5xl lg:gap-x-28">
            {highlights.map((item, i) => (
              <Reveal key={i} delay={0.15 + i * 0.08}>
                <div className="flex items-start gap-4">
                  <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-violet-500 to-cyan-400 text-white">
                    <item.icon className="size-[17px]" strokeWidth={2.2} />
                  </div>
                  <p className="max-w-sm text-pretty text-sm leading-relaxed text-neutral-500 md:text-[0.95rem] md:leading-7">
                    {item.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
