"use client";

import { Section } from "./ui/Section";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Mariana Costa",
    role: "CEO · Luma Studio",
    text: "Resultado muito acima da expectativa. O site ficou rápido, lindo e nossas conversões dobraram nas primeiras semanas.",
  },
  {
    name: "Rafael Andrade",
    role: "Diretor · Evolve Fit",
    text: "Profissional extremamente atento aos detalhes. Entregou a landing antes do prazo e com performance impecável.",
  },
  {
    name: "Camila Vieira",
    role: "COO · Atlas Group",
    text: "O sistema que o Erick desenvolveu transformou a operação. Hoje temos visibilidade total e processos automatizados.",
  },
  {
    name: "Lucas Pereira",
    role: "Founder · Spark Launch",
    text: "Da estratégia ao código, um nível de cuidado raro. Recomendo de olhos fechados.",
  },
  {
    name: "Beatriz Lima",
    role: "Head of Marketing · Nova",
    text: "A experiência do usuário ficou simplesmente premium. Recebemos elogios de clientes todos os dias.",
  },
  {
    name: "Diego Ferreira",
    role: "CTO · Nimbus",
    text: "Código limpo, arquitetura escalável e comunicação ótima. Parceria de longo prazo confirmada.",
  },
];

export function Testimonials() {
  // duplicate for seamless marquee
  const row = [...testimonials, ...testimonials];

  return (
    <Section
      id="depoimentos"
      eyebrow="Depoimentos"
      title={<>O que dizem quem já trabalhou comigo.</>}
      description="Confiança construída em cada projeto entregue."
    >
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-black to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-black to-transparent" />

        <motion.div
          className="flex gap-5"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 50,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {row.map((t, i) => (
            <figure
              key={`${t.name}-${i}`}
              className="glass relative w-[340px] shrink-0 rounded-3xl p-6"
            >
              <Quote className="size-5 text-violet-300" />
              <blockquote className="mt-3 text-sm leading-relaxed text-neutral-300">
                “{t.text}”
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <div className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 text-xs font-semibold text-black">
                  {t.name
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")}
                </div>
                <div>
                  <div className="text-sm font-medium text-zinc-100">
                    {t.name}
                  </div>
                  <div className="text-[11px] text-zinc-500">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}
