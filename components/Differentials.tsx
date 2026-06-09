"use client";

import { Section } from "./ui/Section";
import { Reveal } from "./ui/Reveal";
import {
  Palette,
  Zap,
  Search,
  Smartphone,
  Code2,
  TrendingUp,
  Sparkles,
  Network,
} from "lucide-react";

const items = [
  { icon: Palette, title: "Design Moderno", text: "Interfaces sofisticadas e atemporais." },
  { icon: Zap, title: "Alta Performance", text: "Páginas otimizadas para velocidade real." },
  { icon: Search, title: "SEO Otimizado", text: "Estrutura pronta para ranquear no Google." },
  { icon: Smartphone, title: "Responsividade Total", text: "Perfeito em qualquer dispositivo." },
  { icon: Code2, title: "Código Escalável", text: "Arquitetura limpa, manutenível e moderna." },
  { icon: TrendingUp, title: "Foco em Conversão", text: "Cada elemento orientado a resultado." },
  { icon: Sparkles, title: "Experiência do Usuário", text: "Microinterações que encantam." },
  { icon: Network, title: "Integrações Inteligentes", text: "Conectado às ferramentas que você usa." },
];

export function Differentials() {
  return (
    <Section
      id="diferenciais"
      eyebrow="Diferenciais"
      title={<>Por que trabalhar comigo é diferente.</>}
      description="O nível técnico e o cuidado visual que separam um site bom de um produto memorável."
    >
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/5 md:grid-cols-4">
        {items.map((it, i) => (
          <Reveal key={it.title} delay={i * 0.04}>
            <div className="group relative h-full bg-black p-6 transition hover:bg-[#0a0a0a]">
              <div
                className="absolute inset-0 opacity-0 transition group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(220px 120px at 50% 0%, rgba(139,92,246,0.18), transparent 70%)",
                }}
                aria-hidden="true"
              />
              <it.icon className="relative size-5 text-cyan-300" />
              <h3 className="relative mt-4 text-sm font-semibold text-white">
                {it.title}
              </h3>
              <p className="relative mt-1 text-xs leading-relaxed text-neutral-400">
                {it.text}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
