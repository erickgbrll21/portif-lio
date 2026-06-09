"use client";

import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./ui/Reveal";

type ProjectCard = {
  title: string;
  detail: string;
};

type Project = {
  id: string;
  name: string;
  year: string;
  type: string;
  location: string;
  url: string;
  headline: string;
  highlight: string;
  description: string;
  tech: string[];
  cards: ProjectCard[];
  variant: "grid" | "gallery";
  galleryLabel?: string;
  galleryGradient?: string;
};

const projects: Project[] = [
  {
    id: "luma",
    name: "Luma Studio",
    year: "2026",
    type: "Website",
    location: "Belo Horizonte — MG",
    url: "https://erickgabriel.dev/portfolio/luma-studio",
    headline: "Built for different industries and",
    highlight: "growth stages",
    description:
      "Website institucional premium para estúdio de branding com animações fluidas, CMS e performance otimizada para conversão.",
    tech: ["Next.js", "Framer Motion", "Sanity"],
    cards: [
      {
        title: "Multi-entity and complex financial structures.",
        detail:
          "Arquitetura de conteúdo modular para marcas com múltiplas frentes de negócio.",
      },
      {
        title: "Early-stage service businesses building structure.",
        detail:
          "Landing sections dinâmicas com foco em autoridade e geração de leads.",
      },
      {
        title: "High-growth companies scaling operations.",
        detail:
          "Microinterações e transições que reforçam percepção premium da marca.",
      },
      {
        title: "International groups with local presence.",
        detail:
          "SEO técnico, acessibilidade e Lighthouse 95+ em todas as páginas.",
      },
    ],
    variant: "grid",
  },
  {
    id: "nova",
    name: "Nova Imóveis",
    year: "2025",
    type: "Website",
    location: "São Paulo — SP",
    url: "https://erickgabriel.dev/portfolio/nova-imoveis",
    headline: "Cada detalhe pensado para você",
    highlight: "morar agora",
    description:
      "Site imobiliário com busca dinâmica de imóveis, vitrine visual e painel para corretores integrado ao CRM.",
    tech: ["Next.js", "Supabase", "Maps API"],
    cards: [],
    variant: "gallery",
    galleryLabel: "Imobiliário",
    galleryGradient: "from-amber-100 via-orange-50 to-stone-200",
  },
  {
    id: "evolve",
    name: "Evolve Fit",
    year: "2025",
    type: "Landing Page",
    location: "Curitiba — PR",
    url: "https://erickgabriel.dev/portfolio/evolve-fit",
    headline: "Designed for fitness brands and",
    highlight: "member growth",
    description:
      "Landing de alta conversão para captação de leads em rede de academias com tracking e testes A/B.",
    tech: ["Next.js", "Tailwind", "GA4"],
    cards: [
      {
        title: "Local gyms expanding digital presence.",
        detail: "Hero com prova social e formulário otimizado para mobile-first.",
      },
      {
        title: "Franchises needing unified campaigns.",
        detail: "Componentes reutilizáveis para unidades com identidade centralizada.",
      },
      {
        title: "Premium studios targeting high-ticket plans.",
        detail: "Visual bold com tipografia forte e CTAs estratégicos.",
      },
      {
        title: "Wellness apps bridging online and offline.",
        detail: "Integração com WhatsApp e automação de follow-up de leads.",
      },
    ],
    variant: "grid",
  },
  {
    id: "atlas",
    name: "Atlas ERP",
    year: "2024",
    type: "Sistema",
    location: "Remoto — BR",
    url: "https://erickgabriel.dev/portfolio/atlas-erp",
    headline: "Built for operations teams and",
    highlight: "real-time data",
    description:
      "Sistema interno para gestão financeira, estoque e relatórios em tempo real com dashboards personalizados.",
    tech: ["Next.js", "Node.js", "PostgreSQL"],
    cards: [
      {
        title: "Finance teams tracking cash flow daily.",
        detail: "Painéis com filtros avançados e exportação de relatórios.",
      },
      {
        title: "Inventory-heavy businesses reducing waste.",
        detail: "Alertas automáticos e visão consolidada de estoque.",
      },
      {
        title: "Managers needing executive summaries.",
        detail: "KPIs em tempo real com permissões por perfil de usuário.",
      },
      {
        title: "Growing teams requiring scalable access.",
        detail: "Autenticação, logs de auditoria e APIs para integrações.",
      },
    ],
    variant: "grid",
  },
];

function InnerGridCard({ title, detail }: ProjectCard) {
  return (
    <div className="group/card relative flex min-h-[88px] flex-col justify-between overflow-hidden rounded-[18px] border border-white/[0.07] bg-[#1c1c1c] p-3.5 transition-all duration-300 hover:border-transparent hover:bg-violet-600 md:min-h-[108px] md:rounded-[22px] md:p-4">
      <p className="text-[13px] font-medium leading-snug text-white md:text-sm">
        {title}
      </p>
      <p className="mt-2 text-[11px] leading-relaxed text-white/90 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100 md:text-xs">
        {detail}
      </p>
      <div
        className="pointer-events-none absolute -right-3 -top-3 size-16 rounded-full border border-white/10 opacity-20 transition-opacity duration-300 group-hover/card:opacity-40"
        aria-hidden="true"
      />
    </div>
  );
}

function GridPreview({ project }: { project: Project }) {
  return (
    <div className="flex h-full flex-col bg-[#0b0b0b] p-5 md:p-6">
      <p className="max-w-[95%] pr-12 text-sm leading-snug text-neutral-400 md:text-[15px]">
        {project.headline}{" "}
        <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text font-medium text-transparent">
          {project.highlight}
        </span>
      </p>

      <div className="mt-4 grid flex-1 grid-cols-2 gap-2.5 md:mt-5 md:gap-3">
        {project.cards.map((card) => (
          <InnerGridCard key={card.title} {...card} />
        ))}
      </div>
    </div>
  );
}

function GalleryPreview({ project }: { project: Project }) {
  return (
    <div
      className={`relative flex h-full flex-col justify-end bg-gradient-to-br ${project.galleryGradient} p-5 md:p-6`}
    >
      <div className="grid grid-cols-3 gap-2">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div
            key={n}
            className="aspect-[4/3] rounded-md bg-white/50 shadow-sm"
          />
        ))}
      </div>
      <span className="absolute bottom-5 left-5 text-sm font-semibold text-neutral-800 md:text-base">
        {project.galleryLabel}
      </span>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group/project relative w-[min(88vw,640px)] shrink-0 snap-start md:w-[min(58vw,680px)]">
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a] md:rounded-3xl">
        <div className="relative aspect-[16/11] overflow-hidden">
          {project.variant === "grid" ? (
            <GridPreview project={project} />
          ) : (
            <GalleryPreview project={project} />
          )}

          <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/10 bg-black/55 px-3 py-1.5 text-[11px] text-white/90 backdrop-blur-sm">
            <span className="size-3.5 rounded-full bg-gradient-to-br from-emerald-500 via-white to-amber-500" />
            {project.location}
          </div>

          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            aria-label={`Abrir projeto ${project.name}`}
            className="absolute right-4 top-4 z-10 grid size-10 place-items-center rounded-full border border-white/15 bg-black/50 text-violet-400 backdrop-blur-sm transition hover:border-violet-400/50 hover:bg-black/70"
          >
            <ArrowUpRight className="size-4" strokeWidth={2.2} />
          </a>

          {project.variant === "grid" && (
            <div className="absolute inset-x-0 bottom-0 z-10 translate-y-full border-t border-white/10 bg-[#0a0a0a]/95 p-5 backdrop-blur-md transition-transform duration-300 group-hover/project:translate-y-0">
              <p className="text-sm leading-relaxed text-neutral-300">
                {project.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-neutral-400"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-[11px] text-neutral-500">{project.url}</p>
            </div>
          )}

          {project.variant === "gallery" && (
            <div className="absolute inset-0 z-[5] flex items-end bg-violet-600/95 p-6 opacity-0 transition-opacity duration-300 group-hover/project:opacity-100">
              <div>
                <p className="text-sm font-semibold text-white">
                  {project.name}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-white/90">
                  {project.description}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-white/10 bg-black px-5 py-4 md:px-6 md:py-5">
          <h3 className="text-base font-bold tracking-tight text-white transition-colors group-hover/project:text-violet-400 md:text-lg">
            {project.name}
          </h3>
          <div className="flex shrink-0 items-center gap-3">
            <span className="text-sm text-neutral-500">{project.year}</span>
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] text-neutral-300">
              {project.type}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

export function Portfolio() {
  return (
    <section
      id="portfolio"
      className="relative w-full scroll-mt-24 bg-black px-6 py-20 md:px-10 md:py-28 lg:px-14 lg:py-36"
    >
      <div className="mx-auto w-full max-w-[1400px]">
        <Reveal>
          <p className="text-sm tracking-wide text-neutral-500">
            <span className="font-medium text-violet-400">/02</span>{" "}
            <span className="text-neutral-400">Projetos</span>
          </p>
        </Reveal>

        <div className="mt-8 flex flex-col gap-6 lg:mt-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <Reveal delay={0.05}>
            <h2 className="text-[clamp(2.75rem,9vw,5.5rem)] font-bold uppercase leading-[0.92] tracking-[-0.04em] text-white">
              Portfólio
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-md text-sm leading-relaxed text-neutral-300 md:text-[0.95rem] md:leading-7 lg:pb-2">
              Projetos que elevam percepção. Cada detalhe, interação e escolha
              visual é pensado para posicionar no nível certo.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="portfolio-scroll mt-12 -mx-6 overflow-x-auto px-6 pb-2 md:-mx-10 md:mt-16 md:px-10 lg:-mx-14 lg:px-14">
            <div className="flex w-max gap-5 md:gap-6">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
