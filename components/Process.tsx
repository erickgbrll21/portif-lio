"use client";

import { Section } from "./ui/Section";
import { Reveal } from "./ui/Reveal";
import {
  Compass,
  ClipboardList,
  PenTool,
  Code2,
  Rocket,
  LifeBuoy,
} from "lucide-react";

const steps = [
  {
    icon: Compass,
    title: "Descoberta",
    text: "Imersão no negócio, objetivos e desafios para alinhar visão e escopo.",
  },
  {
    icon: ClipboardList,
    title: "Planejamento",
    text: "Definição de arquitetura, prazos, entregas e indicadores de sucesso.",
  },
  {
    icon: PenTool,
    title: "Design",
    text: "Wireframes, identidade visual e protótipos navegáveis em alta fidelidade.",
  },
  {
    icon: Code2,
    title: "Desenvolvimento",
    text: "Implementação com código limpo, performance e atualizações constantes.",
  },
  {
    icon: Rocket,
    title: "Entrega",
    text: "Deploy, testes finais e treinamento — pronto para gerar resultado.",
  },
  {
    icon: LifeBuoy,
    title: "Suporte",
    text: "Acompanhamento, melhorias contínuas e evolução estratégica do produto.",
  },
];

export function Process() {
  return (
    <Section
      id="processo"
      eyebrow="Processo"
      title={<>Um método claro do briefing ao deploy.</>}
      description="Seis etapas que tornam o projeto previsível, transparente e bem entregue."
    >
      <ol className="relative grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <div
          className="pointer-events-none absolute left-0 right-0 top-1/2 hidden h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-white/15 to-transparent lg:block"
          aria-hidden="true"
        />
        {steps.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.05}>
            <li className="group glass relative h-full overflow-hidden rounded-3xl p-6 transition hover:-translate-y-1 hover:border-white/20">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-500">
                  Etapa {String(i + 1).padStart(2, "0")}
                </span>
                <div className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-violet-500/25 to-cyan-400/25 ring-1 ring-white/10">
                  <s.icon className="size-4 text-violet-100" />
                </div>
              </div>
              <h3 className="mt-5 text-xl font-semibold tracking-tight text-white">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                {s.text}
              </p>
              <div
                className="pointer-events-none absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-violet-400/40 to-transparent opacity-0 transition group-hover:opacity-100"
                aria-hidden="true"
              />
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
