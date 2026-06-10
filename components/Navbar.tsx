"use client";

import clsx from "clsx";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";

const menuLinks = [
  { href: "/", label: "Início", muted: false },
  { href: "/contato", label: "Contato", muted: false },
  { href: "/#portfolio", label: "Projetos", muted: false },
  { href: "/#servicos", label: "Soluções", muted: false },
  { href: "/#sobre", label: "Sobre", muted: true },
];

const socialLinks = [
  { href: "https://instagram.com/", label: "Instagram" },
  { href: "https://linkedin.com/", label: "LinkedIn" },
];

const EMAIL = "contato@erickgabriel.dev";

function LogoMark() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="shrink-0"
    >
      <rect
        x="1"
        y="1"
        width="26"
        height="26"
        rx="6"
        stroke="white"
        strokeWidth="1.5"
      />
      <path
        d="M9 8.5H17M9 8.5V19.5M9 13.5H15"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="21" cy="8" r="2" fill="#22d3ee" />
    </svg>
  );
}

function MenuIndex({ index, muted }: { index: number; muted?: boolean }) {
  return (
    <span
      className={clsx(
        "text-sm font-normal tracking-wide transition-colors duration-200",
        muted
          ? "text-neutral-600 group-hover/link:text-neutral-500"
          : "text-neutral-500 group-hover/link:text-neutral-300"
      )}
    >
      <span className="text-violet-400">/</span>
      {String(index).padStart(2, "0")}
    </span>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 bg-black">
        <div className="mx-auto flex h-14 w-full max-w-[1400px] items-center justify-between px-3 sm:h-16 sm:px-4 md:px-6 lg:px-10">
          <a href="/" className="flex min-w-0 items-center gap-2 sm:gap-3">
            <LogoMark />
            <span className="truncate text-xs font-bold tracking-[0.12em] text-white uppercase sm:text-sm sm:tracking-[0.14em]">
              Erick Gabriel
            </span>
          </a>

          <div className="flex items-center gap-4 md:gap-6 lg:gap-8">
            <div className="hidden items-center gap-2.5 md:flex">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.85)]" />
              </span>
              <span className="text-sm text-neutral-400">
                Disponível para novos projetos
              </span>
            </div>

            <a
              href="/contato"
              className="hidden rounded-lg border border-white/90 px-4 py-2 text-sm text-white transition hover:bg-white/5 sm:inline-flex"
            >
              Vamos conversar?
            </a>

            <button
              type="button"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="grid size-10 shrink-0 place-items-center rounded-lg border border-white/90 text-white transition hover:bg-white/5"
            >
              <span className="relative block h-3.5 w-4">
                <span
                  className={clsx(
                    "absolute left-0 top-0 h-px w-4 bg-white transition duration-300",
                    open && "top-1.5 rotate-45"
                  )}
                />
                <span
                  className={clsx(
                    "absolute left-0 top-1.5 h-px w-4 bg-white transition duration-300",
                    open && "opacity-0"
                  )}
                />
                <span
                  className={clsx(
                    "absolute left-0 top-3 h-px w-4 bg-white transition duration-300",
                    open && "top-1.5 -rotate-45"
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        className={clsx(
          "fixed inset-0 z-[100] transition-opacity duration-300",
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        )}
        aria-hidden={!open}
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navegação"
      >
        <button
          type="button"
          aria-label="Fechar menu"
          onClick={closeMenu}
          className="absolute inset-0 bg-black/55 backdrop-blur-[1px]"
        />

        <aside
          className={clsx(
            "absolute right-0 top-0 flex h-full w-[min(92vw,400px)] flex-col border-l border-white/10 bg-[#0a0a0a] shadow-[-24px_0_80px_rgba(0,0,0,0.65)] transition-transform duration-300 ease-out sm:w-[min(38vw,420px)]",
            open ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-5">
            <span className="text-sm text-neutral-400">Menu</span>
            <button
              type="button"
              aria-label="Fechar menu"
              onClick={closeMenu}
              className="grid size-10 place-items-center rounded-lg border border-neutral-600 text-neutral-300 transition hover:border-neutral-400 hover:text-white"
            >
              <span className="relative block size-4">
                <span className="absolute left-0 top-1/2 h-px w-4 -translate-y-1/2 rotate-45 bg-current" />
                <span className="absolute left-0 top-1/2 h-px w-4 -translate-y-1/2 -rotate-45 bg-current" />
              </span>
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-5 [&:has(a:hover)_a.menu-item-muted:not(:hover)]:opacity-15 [&:has(a:hover)_a:not(:hover):not(.menu-item-muted)]:opacity-30">
            {menuLinks.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className={clsx(
                  "group/link relative -mx-5 flex items-center justify-between gap-4 border-b border-white/10 px-5 py-5 transition-all duration-200",
                  "hover:bg-white/[0.04] hover:opacity-100",
                  link.muted && "menu-item-muted opacity-35"
                )}
              >
                <span
                  className={clsx(
                    "text-lg font-bold uppercase tracking-wide transition-colors duration-200 sm:text-xl",
                    link.muted
                      ? "text-neutral-600 group-hover/link:text-neutral-500"
                      : "text-white group-hover/link:text-white"
                  )}
                >
                  {link.label}
                </span>
                <MenuIndex index={index + 1} muted={link.muted} />
                <span
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-violet-500 transition-transform duration-300 ease-out group-hover/link:scale-x-100"
                  aria-hidden="true"
                />
              </a>
            ))}
          </nav>

          <div className="border-t border-white/10 px-5 py-8">
            <p className="text-xs text-neutral-500">E-mail</p>
            <a
              href={`mailto:${EMAIL}`}
              className="mt-1 block text-sm text-white transition hover:text-neutral-300 sm:text-base"
            >
              {EMAIL}
            </a>

            <p className="mt-8 text-xs text-neutral-500">Redes</p>
            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-white transition hover:text-neutral-300"
                >
                  {social.label}
                  <ArrowUpRight className="size-3.5" strokeWidth={2} />
                </a>
              ))}
            </div>

            <div className="mt-6 h-px bg-white/10" aria-hidden="true" />
          </div>
        </aside>
      </div>
    </>
  );
}
