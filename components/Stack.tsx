"use client";

import { Section } from "./ui/Section";
import { Reveal } from "./ui/Reveal";
import { PixelLogoGrid } from "./ui/pixel-logo-grid";

const groups = [
  {
    title: "Frontend & Web",
    items: [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Next.js",
      "Tailwind CSS",
      "TypeScript",
    ],
  },
  {
    title: "Backend & Dados",
    items: ["Node.js", "Supabase"],
  },
  {
    title: "Design, IA & Ferramentas",
    items: [
      "Claude",
      "ChatGPT",
      "Gemini",
      "Figma",
      "Photoshop",
      "GitHub",
      "Remotion",
    ],
  },
];

export function Stack() {
  return (
    <Section
      id="stack"
      eyebrow="Stack"
      title={<>Tecnologia de ponta a ponta.</>}
      description="As ferramentas que utilizo para entregar produtos rápidos, escaláveis e bonitos."
    >
      <Reveal>
        <PixelLogoGrid
          badge="Stack Tecnológica"
          heading="Ferramentas que uso para construir experiências digitais premium"
        />
      </Reveal>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {groups.map((g, gi) => (
          <Reveal key={g.title} delay={gi * 0.08}>
            <div className="glass relative h-full overflow-hidden rounded-3xl p-6">
              <div
                className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-violet-500/20 blur-3xl"
                aria-hidden="true"
              />
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-500">
                {g.title}
              </p>
              <ul className="mt-5 space-y-2">
                {g.items.map((it) => (
                  <li
                    key={it}
                    className="group/item flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3 text-sm transition hover:border-white/15 hover:bg-white/[0.05]"
                  >
                    <span className="flex items-center gap-3 text-white">
                      <span className="size-1.5 rounded-full bg-gradient-to-r from-violet-400 to-cyan-300 transition group-hover/item:scale-150" />
                      {it}
                    </span>
                    <span className="font-mono text-[10px] text-neutral-500">
                      ↳
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
