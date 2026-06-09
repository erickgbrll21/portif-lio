"use client";

import { ArrowUpRight } from "lucide-react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";
import { Section } from "./ui/Section";
import { SectionHeader } from "./ui/SectionHeader";

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
      <p className="mt-2 text-[11px] leading-relaxed text-white/90 opacity-100 transition-opacity duration-300 md:text-xs md:opacity-0 md:group-hover/card:opacity-100">
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

function ProjectCard({
  project,
  compact = false,
}: {
  project: Project;
  compact?: boolean;
}) {
  return (
    <article
      className={
        compact
          ? "group/project relative flex h-full w-[min(84vw,520px)] shrink-0 md:w-[min(50vw,580px)]"
          : "group/project relative w-[min(88vw,640px)] shrink-0 md:w-[min(58vw,680px)]"
      }
    >
      <div
        className={
          compact
            ? "flex min-h-0 w-full flex-1 flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a] md:rounded-3xl"
            : "overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a] md:rounded-3xl"
        }
      >
        <div
          className={
            compact
              ? "relative min-h-0 flex-1 overflow-hidden"
              : "relative aspect-[16/11] overflow-hidden"
          }
        >
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

        <div
          className={
            compact
              ? "flex shrink-0 flex-col items-start gap-2 border-t border-white/10 bg-black px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-5 md:px-6"
              : "flex flex-col items-start gap-2 border-t border-white/10 bg-black px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-5 sm:py-4 md:px-6 md:py-5"
          }
        >
          <h3
            className={
              compact
                ? "text-sm font-bold leading-tight tracking-tight text-white transition-colors group-hover/project:text-violet-400 sm:text-base"
                : "text-sm font-bold tracking-tight text-white transition-colors group-hover/project:text-violet-400 sm:text-base md:text-lg"
            }
          >
            {project.name}
          </h3>
          <div className="flex shrink-0 flex-wrap items-center gap-2 sm:gap-3">
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

/** Cada projeto ocupa 1 viewport de scroll antes de liberar a próxima seção. */
const RUNWAY_VH_PER_PROJECT = 100;

function smoothstep(t: number) {
  return t * t * (3 - 2 * t);
}

function PortfolioTrack({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "flex h-full w-max items-stretch gap-5 md:gap-6" : "flex w-max gap-5 md:gap-6"}>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} compact={compact} />
      ))}
    </div>
  );
}

function ScrollDrivenPortfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardOffsetsRef = useRef<number[]>([0]);
  const scrollProgress = useMotionValue(0);

  const x = useTransform(scrollProgress, (p) => {
    const offsets = cardOffsetsRef.current;
    if (offsets.length <= 1) return 0;

    const steps = offsets.length - 1;
    const pos = p * steps;
    const index = Math.min(Math.floor(pos), steps - 1);
    const t = smoothstep(pos - index);
    const from = offsets[index] ?? 0;
    const to = offsets[Math.min(index + 1, steps)] ?? from;

    return -(from + (to - from) * t);
  });

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    const track = trackRef.current;
    if (!section || !container || !track) return;

    const measure = () => {
      const articles = track.querySelectorAll("article");
      const offsets = Array.from(articles).map(
        (el) => (el as HTMLElement).offsetLeft
      );
      cardOffsetsRef.current = offsets.length > 0 ? offsets : [0];
      scrollProgress.set(scrollProgress.get());
    };

    const updateProgress = () => {
      const rect = section.getBoundingClientRect();
      const scrollRange = section.offsetHeight - window.innerHeight;
      if (scrollRange <= 0) {
        scrollProgress.set(0);
        return;
      }

      const progress = Math.min(Math.max(-rect.top / scrollRange, 0), 1);
      scrollProgress.set(progress);
    };

    measure();
    updateProgress();

    const observer = new ResizeObserver(() => {
      measure();
      updateProgress();
    });
    observer.observe(track);
    observer.observe(container);

    const onLayoutChange = () => {
      measure();
      updateProgress();
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", onLayoutChange);
    window.visualViewport?.addEventListener("resize", onLayoutChange);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", onLayoutChange);
      window.visualViewport?.removeEventListener("resize", onLayoutChange);
    };
  }, [scrollProgress]);

  const runwayHeight = `${projects.length * RUNWAY_VH_PER_PROJECT}svh`;

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="relative scroll-mt-24 bg-black"
      style={{ height: runwayHeight }}
      aria-label="Portfólio"
    >
      <div className="sticky top-14 h-[calc(100svh-3.5rem)] sm:top-16 sm:h-[calc(100svh-4rem)] supports-[height:100dvh]:h-[calc(100dvh-3.5rem)] sm:supports-[height:100dvh]:h-[calc(100dvh-4rem)]">
        <div className="mx-auto flex h-full w-full max-w-[1400px] flex-col px-4 pt-5 pb-10 sm:px-6 sm:pb-12 md:px-10 lg:px-14">
          <div className="shrink-0">
            <SectionHeader
              index="04"
              label="Projetos"
              title="Portfólio"
              description="Projetos que elevam percepção. Cada detalhe, interação e escolha visual é pensado para posicionar no nível certo."
              compact
            />
          </div>

          <div
            ref={containerRef}
            className="mt-5 min-h-0 flex-1 overflow-x-clip md:mt-6"
          >
            <motion.div
              ref={trackRef}
              style={{ x }}
              className="flex h-full w-max will-change-transform"
            >
              <PortfolioTrack compact />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Portfolio() {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return (
      <Section
        id="portfolio"
        index="04"
        label="Projetos"
        title="Portfólio"
        description="Projetos que elevam percepção. Cada detalhe, interação e escolha visual é pensado para posicionar no nível certo."
        tone="black"
      >
        <div className="portfolio-scroll -mx-4 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 md:-mx-10 md:px-10 lg:-mx-14 lg:px-14">
          <PortfolioTrack />
        </div>
      </Section>
    );
  }

  return <ScrollDrivenPortfolio />;
}
