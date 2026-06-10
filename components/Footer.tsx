import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/#portfolio", label: "Portfólio" },
  { href: "/#sobre", label: "Sobre" },
  { href: "/#servicos", label: "Soluções" },
];

const socialLinks = [
  { href: "https://instagram.com/", label: "Instagram" },
  { href: "https://linkedin.com/", label: "LinkedIn" },
  { href: "https://github.com/erickgbrll21", label: "GitHub" },
];

const contactLinks = [
  {
    href: "https://wa.me/5531997238789",
    label: "+55 (31) 99723-8789",
  },
  {
    href: "mailto:contato@erickgabriel.dev",
    label: "contato@erickgabriel.dev",
  },
];

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <p className="text-sm text-neutral-500">{title}</p>
      <div className="mt-5">{children}</div>
    </div>
  );
}

function FooterList({
  items,
  numbered = false,
  withArrow = false,
}: {
  items: { href: string; label: string }[];
  numbered?: boolean;
  withArrow?: boolean;
}) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={item.href} className="border-b border-white/10 last:border-b-0">
          <a
            href={item.href}
            target={item.href.startsWith("http") ? "_blank" : undefined}
            rel={item.href.startsWith("http") ? "noreferrer" : undefined}
            className="group flex items-center justify-between gap-4 py-4 text-sm text-neutral-400 transition hover:text-white"
          >
            {numbered ? (
              <span>
                <span className="font-medium text-violet-400">
                  / {String(index + 1).padStart(2, "0")}
                </span>{" "}
                {item.label}
              </span>
            ) : (
              <span>{item.label}</span>
            )}
            {withArrow ? (
              <ArrowUpRight className="size-3.5 shrink-0 text-neutral-500 transition group-hover:text-violet-300" />
            ) : null}
          </a>
        </li>
      ))}
    </ul>
  );
}

export function Footer() {
  return (
    <footer className="bg-black px-4 py-14 sm:px-6 sm:py-16 md:px-10 lg:px-14">
      <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[1.35fr_1fr_1fr_1fr] lg:gap-10">
        <div>
          <Link
            href="/"
            className="text-sm font-bold tracking-[0.14em] text-white uppercase"
          >
            Erick Gabriel
          </Link>

          <p className="mt-8 max-w-sm text-lg leading-snug text-white">
            Buscando algo{" "}
            <span className="font-bold">fora do padrão?</span> Vamos conversar.
          </p>

          <Link
            href="/contato"
            className="group mt-6 inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-violet-500 to-violet-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:from-violet-400 hover:to-violet-500"
          >
            Faça um orçamento
            <ArrowUpRight
              className="size-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              strokeWidth={2.2}
            />
          </Link>
        </div>

        <FooterColumn title="Navegação">
          <FooterList items={navLinks} numbered />
        </FooterColumn>

        <FooterColumn title="Redes">
          <FooterList items={socialLinks} withArrow />
        </FooterColumn>

        <FooterColumn title="Contato">
          <FooterList items={contactLinks} />
        </FooterColumn>
      </div>

      <p className="mx-auto mt-14 max-w-[1400px] text-center text-sm text-neutral-500">
        Erick Gabriel © {new Date().getFullYear()}. Todos os direitos reservados.
      </p>
    </footer>
  );
}
