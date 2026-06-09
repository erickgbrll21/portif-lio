"use client";

import { Section } from "./ui/Section";
import { Reveal } from "./ui/Reveal";
import { PixelLogoGrid } from "./ui/pixel-logo-grid";

export function Stack() {
  return (
    <Section
      id="stack"
      index="05"
      label="Stack"
      title="Stack"
      description="As ferramentas que utilizo para entregar produtos rápidos, escaláveis e bonitos."
      tone="light"
    >
      <Reveal>
        <PixelLogoGrid
          badge="Stack Tecnológica"
          heading="Ferramentas que uso para construir experiências digitais premium"
        />
      </Reveal>
    </Section>
  );
}
