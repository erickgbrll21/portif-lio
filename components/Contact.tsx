"use client";

import { Section } from "./ui/Section";
import { Reveal } from "./ui/Reveal";
import { Mail, MapPin, Send, Check } from "lucide-react";
import { useState, type FormEvent } from "react";

export function Contact() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 900);
  };

  return (
    <Section
      id="contato"
      eyebrow="Contato"
      title={<>Vamos conversar sobre o seu próximo projeto.</>}
      description="Responda em até 24h úteis. Conte-me sobre sua ideia, escopo e objetivo."
    >
      <div className="grid gap-8 md:grid-cols-[1fr_1.2fr]">
        <Reveal>
          <div className="glass relative h-full overflow-hidden rounded-3xl p-8">
            <div
              className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-violet-500/30 blur-3xl"
              aria-hidden="true"
            />
            <h3 className="text-2xl font-semibold tracking-tight text-white">
              Pronto para começar?
            </h3>
            <p className="mt-3 text-sm text-neutral-400">
              Cada projeto começa com uma conversa. Conte sua ideia e desenhamos
              juntos o melhor caminho.
            </p>

            <div className="mt-8 space-y-4 text-sm">
              <a
                href="mailto:contato@erickgabriel.dev"
                className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-white/25 hover:bg-white/[0.06]"
              >
                <div className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-violet-500/30 to-cyan-400/30 ring-1 ring-white/10">
                  <Mail className="size-4 text-violet-200" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.25em] text-neutral-500">
                    E-mail
                  </div>
                  <div className="text-white">contato@erickgabriel.dev</div>
                </div>
              </a>

              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-violet-500/30 to-cyan-400/30 ring-1 ring-white/10">
                  <MapPin className="size-4 text-violet-200" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.25em] text-neutral-500">
                    Localização
                  </div>
                  <div className="text-white">Belo Horizonte · MG · BR</div>
                </div>
              </div>
            </div>

            <div className="mt-10 flex items-center gap-2 text-xs text-neutral-500">
              <span className="size-2 rounded-full bg-emerald-400 shadow-[0_0_12px_2px_rgba(52,211,153,0.6)]" />
              Disponível para novos projetos
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form
            onSubmit={onSubmit}
            className="glass relative grid gap-4 rounded-3xl p-8"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Nome" name="name" placeholder="Seu nome" required />
              <Field
                label="E-mail"
                name="email"
                type="email"
                placeholder="voce@empresa.com"
                required
              />
            </div>
            <Field label="Empresa" name="company" placeholder="(opcional)" />
            <div>
              <label className="mb-1.5 block text-[11px] uppercase tracking-[0.25em] text-neutral-500">
                Mensagem
              </label>
              <textarea
                name="message"
                required
                rows={5}
                placeholder="Conte sobre seu projeto, objetivo e prazo..."
                className="w-full resize-none rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition placeholder:text-neutral-600 focus:border-violet-400/40 focus:bg-white/[0.05] focus:ring-2 focus:ring-violet-400/20"
              />
            </div>

            <button
              type="submit"
              disabled={loading || sent}
              className="group relative mt-2 inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-6 py-3.5 text-sm font-medium text-black transition hover:scale-[1.01] disabled:opacity-70"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-300 transition group-hover:translate-x-0" />
              <span className="relative inline-flex items-center gap-2">
                {sent ? (
                  <>
                    <Check className="size-4" />
                    Mensagem enviada
                  </>
                ) : loading ? (
                  <>Enviando…</>
                ) : (
                  <>
                    Vamos Conversar
                    <Send className="size-4 transition group-hover:translate-x-0.5" />
                  </>
                )}
              </span>
            </button>
            <p className="text-center text-[11px] text-neutral-500">
              Seus dados são tratados com confidencialidade.
            </p>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[11px] uppercase tracking-[0.25em] text-neutral-500">
        {label}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition placeholder:text-neutral-600 focus:border-violet-400/40 focus:bg-white/[0.05] focus:ring-2 focus:ring-violet-400/20"
      />
    </div>
  );
}
