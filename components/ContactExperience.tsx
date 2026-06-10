"use client";

import { config } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, ChevronDown } from "lucide-react";
import { byPrefixAndName } from "@/lib/fontawesome-icons";
import { type FormEvent, useEffect, useRef, useState } from "react";

config.autoAddCss = false;

const WHATSAPP_NUMBER = "5531997238789";

const solutions = [
  "Site Institucional",
  "Landing page",
  "Design",
  "Tráfego Pago",
  "Micro SaaS",
];

function Field({
  label,
  name,
  placeholder,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-neutral-400">
        {label}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className={fieldClassName}
      />
    </label>
  );
}

const fieldClassName =
  "h-12 w-full rounded-lg border border-white/5 bg-white/[0.055] px-4 text-sm text-white outline-none transition placeholder:text-neutral-600 focus:border-violet-400/50 focus:bg-white/[0.08] focus:ring-2 focus:ring-violet-400/15";

function SolutionSelect({ options }: { options: string[] }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectOption = (option: string) => {
    setValue(option);
    setOpen(false);
  };

  return (
    <div ref={containerRef} className="relative">
      <input type="hidden" name="solution" value={value} required />

      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className={`${fieldClassName} flex items-center justify-between gap-3 text-left ${
          value ? "text-white" : "text-neutral-500"
        }`}
      >
        <span>{value || "Selecione..."}</span>
        <ChevronDown
          className={`size-4 shrink-0 text-neutral-500 transition-transform duration-200 ${
            open ? "rotate-180 text-violet-300" : ""
          }`}
          strokeWidth={2}
        />
      </button>

      {open ? (
        <ul
          role="listbox"
          className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-20 overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0f]/95 p-1.5 shadow-[0_20px_60px_rgba(0,0,0,0.55)] backdrop-blur-xl"
        >
          {options.map((option) => {
            const selected = value === option;

            return (
              <li key={option} role="option" aria-selected={selected}>
                <button
                  type="button"
                  onClick={() => selectOption(option)}
                  className={`flex w-full items-center justify-between gap-3 rounded-lg px-3.5 py-3 text-left text-sm transition ${
                    selected
                      ? "bg-violet-500/20 text-violet-200"
                      : "text-neutral-300 hover:bg-white/[0.06] hover:text-white"
                  }`}
                >
                  <span>{option}</span>
                  {selected ? (
                    <Check className="size-4 shrink-0 text-violet-300" />
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}

function BrainMark() {
  return (
    <motion.div
      className="relative grid size-10 shrink-0 place-items-center text-neutral-500 sm:size-11"
      aria-hidden="true"
      animate={{
        rotate: 360,
        color: ["#737373", "#a78bfa", "#22d3ee", "#737373"],
      }}
      transition={{
        rotate: { duration: 12, repeat: Infinity, ease: "linear" },
        color: { duration: 3.2, repeat: Infinity, ease: "easeInOut" },
      }}
    >
      <span
        className="absolute inset-0 rounded-full bg-cyan-400/10 blur-md"
        aria-hidden="true"
      />
      <FontAwesomeIcon
        icon={byPrefixAndName.fas["brain"]}
        width={20}
        height={20}
        className="relative drop-shadow-[0_0_12px_rgba(255,255,255,0.12)]"
      />
    </motion.div>
  );
}

export function ContactExperience() {
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const solution = String(data.get("solution") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const text = [
      "Olá! Gostaria de falar sobre um projeto.",
      "",
      `Nome: ${name}`,
      `Telefone: ${phone}`,
      `E-mail: ${email}`,
      `Solução: ${solution}`,
      "",
      "Mensagem:",
      message,
    ].join("\n");

    window.location.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section className="relative isolate min-h-[calc(100svh-3.5rem)] overflow-hidden bg-black sm:min-h-[calc(100svh-4rem)]">
      <video
        className="absolute inset-0 size-full object-cover object-center opacity-85"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/contact-background.png"
        aria-hidden="true"
      >
        <source src="/contact-hero.mp4" type="video/mp4" />
      </video>
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_62%_43%,transparent_0,rgba(0,0,0,0.1)_18%,rgba(0,0,0,0.72)_58%,#000_100%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black via-black/70 to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black via-black/70 to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-[1] mx-auto grid min-h-[calc(100svh-3.5rem)] w-full max-w-[1400px] items-center gap-10 px-4 py-10 sm:min-h-[calc(100svh-4rem)] sm:px-6 md:px-10 lg:grid-cols-[0.92fr_1.08fr] lg:px-14">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex items-start gap-5 pt-8 lg:self-start lg:pt-[9vh]"
        >
          <BrainMark />
          <div>
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.35em] text-violet-300/80">
              / iniciar projeto
            </p>
            <h1 className="max-w-[12ch] text-[clamp(2rem,5.8vw,4.75rem)] font-semibold leading-[0.92] tracking-[-0.06em] text-white">
              Vamos falar sobre o projeto?
            </h1>
          </div>
        </motion.div>

        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 28, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="relative ml-auto w-full max-w-[590px] overflow-visible rounded-[18px] border border-white/10 bg-black/62 p-5 shadow-[0_30px_100px_rgba(0,0,0,0.55)] backdrop-blur-xl sm:p-7 md:p-8"
        >
          <div
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(139,92,246,0.14),transparent_35%,rgba(34,211,238,0.08))]"
            aria-hidden="true"
          />
          <div className="relative grid gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label="Nome"
                name="name"
                placeholder="Nome Sobrenome"
                required
              />
              <Field
                label="Telefone"
                name="phone"
                placeholder="+00 99999-9999"
                type="tel"
                required
              />
            </div>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-neutral-400">
                Soluções
              </span>
              <SolutionSelect options={solutions} />
            </label>

            <Field
              label="E-mail"
              name="email"
              placeholder="seuemail@gmail.com"
              type="email"
              required
            />

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-neutral-400">
                Mensagem
              </span>
              <textarea
                name="message"
                required
                rows={5}
                placeholder="Sua mensagem"
                className={`${fieldClassName} h-auto resize-none py-3`}
              />
            </label>

            <button
              type="submit"
              className="group mt-1 inline-flex h-[52px] items-center justify-center gap-3 rounded-lg bg-white px-6 text-sm font-semibold text-black transition hover:bg-violet-300"
            >
              Enviar mensagem
              <ArrowUpRight
                className="size-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={2.4}
              />
            </button>

          </div>
        </motion.form>
      </div>

    </section>
  );
}
