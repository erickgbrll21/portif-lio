import { Mail } from "lucide-react";
import type { SVGProps } from "react";

const GithubIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.24 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.39-5.26 5.68.41.36.78 1.05.78 2.13v3.16c0 .31.21.68.8.56 4.57-1.52 7.85-5.83 7.85-10.91C23.5 5.65 18.35.5 12 .5Z" />
  </svg>
);

const LinkedinIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M4.98 3.5C4.98 4.88 3.86 6 2.48 6S0 4.88 0 3.5 1.1 1 2.48 1s2.5 1.12 2.5 2.5ZM.22 8h4.52v14H.22V8Zm7.5 0h4.33v1.93h.06c.6-1.13 2.07-2.32 4.27-2.32 4.57 0 5.42 3.01 5.42 6.93V22h-4.52v-6.6c0-1.57-.03-3.6-2.19-3.6-2.2 0-2.53 1.72-2.53 3.49V22H7.72V8Z" />
  </svg>
);

const InstagramIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none" />
  </svg>
);

const quickLinks = [
  { href: "#sobre", label: "Sobre" },
  { href: "#servicos", label: "Serviços" },
  { href: "#portfolio", label: "Portfólio" },
  { href: "#stack", label: "Stack" },
  { href: "#processo", label: "Processo" },
  { href: "#contato", label: "Contato" },
];

const socials = [
  { href: "https://github.com/", icon: GithubIcon, label: "GitHub" },
  { href: "https://linkedin.com/", icon: LinkedinIcon, label: "LinkedIn" },
  { href: "https://instagram.com/", icon: InstagramIcon, label: "Instagram" },
  { href: "mailto:contato@erickgabriel.dev", icon: Mail, label: "E-mail" },
];

export function Footer() {
  return (
    <footer className="relative mt-12 border-t border-white/5 bg-black px-6 py-16">
      <div
        className="pointer-events-none absolute inset-x-0 -top-px mx-auto h-px max-w-3xl bg-gradient-to-r from-transparent via-violet-400/50 to-transparent"
        aria-hidden="true"
      />
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <a href="#top" className="flex items-center gap-2">
            <span className="grid size-9 place-items-center rounded-lg bg-gradient-to-br from-violet-500 to-cyan-400 text-sm font-bold text-black">
              EG
            </span>
            <span className="font-medium tracking-tight text-white">
              Erick Gabriel
            </span>
          </a>
          <p className="mt-4 max-w-sm text-sm text-neutral-400">
            Desenvolvimento de experiências digitais modernas, sistemas
            inteligentes e soluções tecnológicas de alto impacto.
          </p>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.3em] text-neutral-600">
            Belo Horizonte · Minas Gerais · Brasil
          </p>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-[0.3em] text-neutral-500">
            Links rápidos
          </p>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-neutral-300 transition hover:text-white"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-[0.3em] text-neutral-500">
            Redes sociais
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                target="_blank"
                rel="noreferrer"
                className="grid size-10 place-items-center rounded-2xl border border-white/10 bg-white/[0.03] text-neutral-300 transition hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.07] hover:text-white"
              >
                <s.icon className="size-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-14 flex max-w-6xl flex-col items-center justify-between gap-3 border-t border-white/5 pt-6 text-xs text-neutral-500 md:flex-row">
        <p>
          © {new Date().getFullYear()} Erick Gabriel. Todos os direitos
          reservados.
        </p>
        <p className="font-mono uppercase tracking-[0.3em]">
          Crafted with code & care
        </p>
      </div>
    </footer>
  );
}
