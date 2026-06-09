"use client";

import { cn } from "@/lib/utils";
import {
  Css3Icon,
  FigmaIcon,
  NodeJsIcon,
  OpenAIIcon,
  RemotionIcon,
  siAdobephotoshop,
  SimpleBrandIcon,
} from "@/components/ui/brand-icon";
import {
  siClaude,
  siGithub,
  siGooglegemini,
  siHtml5,
  siJavascript,
  siNextdotjs,
  siReact,
  siSupabase,
  siTailwindcss,
  siTypescript,
} from "simple-icons";
import type { SimpleIcon } from "simple-icons";
import { useReducedMotion } from "framer-motion";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

type Pixel = {
  x: number;
  y: number;
  color: string;
  ctx: CanvasRenderingContext2D;
  speed: number;
  size: number;
  sizeStep: number;
  minSize: number;
  maxSizeInt: number;
  maxSize: number;
  delay: number;
  counter: number;
  counterStep: number;
  isIdle: boolean;
  isReverse: boolean;
  isShimmer: boolean;
  draw: () => void;
  appear: () => void;
  disappear: () => void;
  shimmer: () => void;
};

function createPixel(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  x: number,
  y: number,
  color: string,
  baseSpeed: number,
  delay: number
): Pixel {
  const rand = (min: number, max: number) => Math.random() * (max - min) + min;

  const p: Pixel = {
    x,
    y,
    color,
    ctx,
    speed: rand(0.1, 0.9) * baseSpeed,
    size: 0,
    sizeStep: Math.random() * 0.4,
    minSize: 0.5,
    maxSizeInt: 2,
    maxSize: rand(0.5, 2),
    delay,
    counter: 0,
    counterStep: Math.random() * 4 + (canvas.width + canvas.height) * 0.01,
    isIdle: false,
    isReverse: false,
    isShimmer: false,
    draw() {
      const offset = p.maxSizeInt * 0.5 - p.size * 0.5;
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x + offset, p.y + offset, p.size, p.size);
    },
    appear() {
      p.isIdle = false;
      if (p.counter <= p.delay) {
        p.counter += p.counterStep;
        return;
      }
      if (p.size >= p.maxSize) p.isShimmer = true;
      if (p.isShimmer) p.shimmer();
      else p.size += p.sizeStep;
      p.draw();
    },
    disappear() {
      p.isShimmer = false;
      p.counter = 0;
      if (p.size <= 0) {
        p.isIdle = true;
        return;
      }
      p.size -= 0.1;
      p.draw();
    },
    shimmer() {
      if (p.size >= p.maxSize) p.isReverse = true;
      else if (p.size <= p.minSize) p.isReverse = false;
      if (p.isReverse) p.size -= p.speed;
      else p.size += p.speed;
    },
  };

  return p;
}

function PixelCanvas({
  colors,
  gap = 5,
  speed = 30,
  active = false,
}: {
  colors: string[];
  gap?: number;
  speed?: number;
  active?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const pixelsRef = useRef<Pixel[]>([]);
  const animationRef = useRef<number>(0);
  const lastFrameRef = useRef(performance.now());
  const reducedMotionRef = useRef(false);
  const activeRef = useRef(active);
  const hoveredRef = useRef(false);

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width, height } = wrap.getBoundingClientRect();
    const w = Math.floor(width);
    const h = Math.floor(height);
    canvas.width = w;
    canvas.height = h;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    const effectiveSpeed = reducedMotionRef.current ? 0 : Math.min(speed, 100) * 0.001;
    const pixels: Pixel[] = [];

    for (let x = 0; x < w; x += gap) {
      for (let y = 0; y < h; y += gap) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        const dx = x - w / 2;
        const dy = y - h / 2;
        const delay = reducedMotionRef.current ? 0 : Math.sqrt(dx * dx + dy * dy);
        pixels.push(createPixel(ctx, canvas, x, y, color, effectiveSpeed, delay));
      }
    }

    pixelsRef.current = pixels;
  }, [colors, gap, speed]);

  const animate = useCallback((mode: "appear" | "disappear") => {
    cancelAnimationFrame(animationRef.current);
    const frameInterval = 1000 / 60;

    const loop = () => {
      animationRef.current = requestAnimationFrame(loop);

      const now = performance.now();
      const elapsed = now - lastFrameRef.current;
      if (elapsed < frameInterval) return;
      lastFrameRef.current = now - (elapsed % frameInterval);

      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const pixels = pixelsRef.current;
      for (const pixel of pixels) pixel[mode]();

      if (pixels.every((p) => p.isIdle)) {
        cancelAnimationFrame(animationRef.current);
      }
    };

    animationRef.current = requestAnimationFrame(loop);
  }, []);

  const syncAnimation = useCallback(() => {
    if (hoveredRef.current || activeRef.current) {
      animate("appear");
    } else {
      animate("disappear");
    }
  }, [animate]);

  useEffect(() => {
    activeRef.current = active;
    syncAnimation();
  }, [active, syncAnimation]);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    init();

    const resizeObserver = new ResizeObserver(() => init());
    if (wrapRef.current) resizeObserver.observe(wrapRef.current);

    const card = wrapRef.current?.parentElement;
    const handleEnter = () => {
      hoveredRef.current = true;
      syncAnimation();
    };
    const handleLeave = () => {
      hoveredRef.current = false;
      syncAnimation();
    };
    card?.addEventListener("mouseenter", handleEnter);
    card?.addEventListener("mouseleave", handleLeave);

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationRef.current);
      card?.removeEventListener("mouseenter", handleEnter);
      card?.removeEventListener("mouseleave", handleLeave);
    };
  }, [init, syncAnimation]);

  return (
    <div ref={wrapRef} className="absolute inset-0 overflow-hidden">
      <canvas ref={canvasRef} className="block" />
    </div>
  );
}

type Logo = {
  name: string;
  brandColor: string;
  height: number;
  multicolor?: boolean;
  pixelColors: string[];
  row: number;
  col: number;
  render: (className: string, style: CSSProperties) => ReactNode;
};

function fromSimpleIcon(
  icon: SimpleIcon,
  overrides?: Partial<Pick<Logo, "brandColor" | "pixelColors" | "multicolor">>
) {
  const hex = `#${icon.hex}`;
  return {
    brandColor: overrides?.brandColor ?? hex,
    pixelColors: overrides?.pixelColors ?? [hex, hex, hex],
    multicolor: overrides?.multicolor ?? false,
    render: (className: string, style: CSSProperties) => (
      <SimpleBrandIcon icon={icon} className={className} style={style} />
    ),
  };
}

const STACK_LOGOS: Logo[] = [
  {
    name: "HTML",
    height: 28,
    row: 1,
    col: 1,
    ...fromSimpleIcon(siHtml5, {
      pixelColors: ["#E34F26", "#F06529", "#FF8A65"],
    }),
  },
  {
    name: "CSS",
    height: 30,
    row: 1,
    col: 2,
    multicolor: true,
    brandColor: "#264DE4",
    pixelColors: ["#264DE4", "#2965F1", "#EBEBEB", "#FFFFFF"],
    render: (className, style) => (
      <Css3Icon className={className} style={style} />
    ),
  },
  {
    name: "JavaScript",
    height: 28,
    row: 1,
    col: 3,
    ...fromSimpleIcon(siJavascript, {
      pixelColors: ["#F7DF1E", "#F9E547", "#FFF176"],
    }),
  },
  {
    name: "React",
    height: 28,
    row: 1,
    col: 4,
    ...fromSimpleIcon(siReact, {
      pixelColors: ["#61DAFB", "#4FC3F7", "#80DEEA"],
    }),
  },
  {
    name: "Node.js",
    height: 30,
    row: 1,
    col: 5,
    multicolor: true,
    brandColor: "#539E43",
    pixelColors: ["#539E43", "#6CC04A", "#3FAE2A", "#41873F"],
    render: (className, style) => (
      <NodeJsIcon className={className} style={style} />
    ),
  },
  {
    name: "Tailwind CSS",
    height: 26,
    row: 2,
    col: 1,
    ...fromSimpleIcon(siTailwindcss, {
      pixelColors: ["#06B6D4", "#22D3EE", "#67E8F9"],
    }),
  },
  {
    name: "TypeScript",
    height: 26,
    row: 2,
    col: 5,
    ...fromSimpleIcon(siTypescript, {
      pixelColors: ["#3178C6", "#4A9FE8", "#235A97"],
    }),
  },
  {
    name: "Supabase",
    height: 28,
    row: 3,
    col: 1,
    multicolor: true,
    brandColor: "#3FCF8E",
    pixelColors: ["#3FCF8E", "#1F7A5C", "#8B5CF6"],
    render: (className, style) => (
      <SimpleBrandIcon icon={siSupabase} className={className} style={style} />
    ),
  },
  {
    name: "Claude",
    height: 26,
    row: 3,
    col: 5,
    ...fromSimpleIcon(siClaude, {
      pixelColors: ["#D97757", "#E8956F", "#C45A3A"],
    }),
  },
  {
    name: "ChatGPT",
    height: 26,
    brandColor: "#FFFFFF",
    pixelColors: ["#FFFFFF", "#A1A1AA", "#10A37F"],
    row: 4,
    col: 1,
    render: (className, style) => (
      <OpenAIIcon className={className} style={style} />
    ),
  },
  {
    name: "Gemini",
    height: 26,
    row: 4,
    col: 5,
    ...fromSimpleIcon(siGooglegemini, {
      pixelColors: ["#8E75B2", "#4285F4", "#34A853", "#FBBC05"],
    }),
    multicolor: true,
  },
  {
    name: "Figma",
    height: 28,
    row: 5,
    col: 1,
    multicolor: true,
    brandColor: "#F24E1E",
    pixelColors: ["#F24E1E", "#A259FF", "#1ABCFE", "#0ACF83", "#FF7262"],
    render: (className, style) => (
      <FigmaIcon className={className} style={style} />
    ),
  },
  {
    name: "GitHub",
    height: 26,
    row: 5,
    col: 2,
    ...fromSimpleIcon(siGithub),
    brandColor: "#FFFFFF",
    pixelColors: ["#FFFFFF", "#A1A1AA", "#52525B"],
  },
  {
    name: "Remotion",
    height: 30,
    row: 5,
    col: 3,
    multicolor: true,
    brandColor: "#0B84F3",
    pixelColors: ["#0B84F3", "#3AA0F7", "#6BB8FA"],
    render: (className, style) => (
      <RemotionIcon className={className} style={style} />
    ),
  },
  {
    name: "Next.js",
    height: 22,
    row: 5,
    col: 4,
    ...fromSimpleIcon(siNextdotjs),
    brandColor: "#FFFFFF",
    pixelColors: ["#FFFFFF", "#A1A1AA", "#71717A"],
  },
  {
    name: "Photoshop",
    height: 28,
    row: 5,
    col: 5,
    ...fromSimpleIcon(siAdobephotoshop, {
      pixelColors: ["#31A8FF", "#5BC0FF", "#0D8AE6", "#001E36"],
    }),
  },
];

/** Percorre cada célula de stack no sentido horário ao redor do centro. */
const STACK_SCANNER_PATH: { row: number; col: number }[] = [
  { row: 1, col: 1 },
  { row: 1, col: 2 },
  { row: 1, col: 3 },
  { row: 1, col: 4 },
  { row: 1, col: 5 },
  { row: 2, col: 5 },
  { row: 3, col: 5 },
  { row: 4, col: 5 },
  { row: 5, col: 5 },
  { row: 5, col: 4 },
  { row: 5, col: 3 },
  { row: 5, col: 2 },
  { row: 5, col: 1 },
  { row: 4, col: 1 },
  { row: 3, col: 1 },
  { row: 2, col: 1 },
];

const SCANNER_INTERVAL_MS = 1300;

function LogoCard({ logo, isActive = false }: { logo: Logo; isActive?: boolean }) {
  const { multicolor, brandColor, height, pixelColors, row, col, name, render } =
    logo;

  return (
    <div
      data-stack-cell
      title={name}
      className={cn(
        "group relative grid place-items-center overflow-hidden cursor-pointer select-none isolate",
        "bg-[#06070c] transition-shadow duration-300 hover:z-[2]",
        "hover:shadow-[0_8px_24px_-8px_color-mix(in_srgb,var(--brand)_30%,transparent),0_0_0_1px_color-mix(in_srgb,var(--brand)_45%,transparent)]"
      )}
      style={
        {
          "--brand": brandColor,
          gridRow: row,
          gridColumn: col,
        } as CSSProperties
      }
    >
      <PixelCanvas colors={pixelColors} gap={5} speed={30} active={isActive} />
      {render(
        cn(
          "relative z-[1] w-auto max-w-[58%] transition-all duration-300 group-hover:scale-[1.08]",
          isActive && "scale-[1.08]",
          multicolor
            ? cn("opacity-80 group-hover:opacity-100", isActive && "opacity-100")
            : cn("opacity-50 group-hover:opacity-100", isActive && "opacity-100")
        ),
        {
          height: `${height}px`,
          maxHeight: `${height}px`,
          color: brandColor,
        }
      )}
    </div>
  );
}

export type PixelLogoGridProps = {
  badge?: string;
  heading?: string;
};

export function PixelLogoGrid({
  badge = "Stack",
  heading = "Tecnologias que uso para entregar produtos de alto nível",
}: PixelLogoGridProps) {
  const [scannerIndex, setScannerIndex] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const id = window.setInterval(() => {
      setScannerIndex((current) => (current + 1) % STACK_SCANNER_PATH.length);
    }, SCANNER_INTERVAL_MS);

    return () => window.clearInterval(id);
  }, [reducedMotion]);

  const activeCell = STACK_SCANNER_PATH[scannerIndex];

  return (
    <div className="relative mx-auto w-full max-w-5xl">
      <div className="relative mx-auto grid w-full max-w-[960px] grid-cols-5 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:rounded-3xl [grid-template-rows:repeat(5,minmax(52px,1fr))] sm:[grid-template-rows:repeat(5,minmax(68px,1fr))] md:[grid-template-rows:repeat(5,84px)]">
        {STACK_LOGOS.map((logo) => (
          <LogoCard
            key={logo.name}
            logo={logo}
            isActive={
              !reducedMotion &&
              activeCell?.row === logo.row &&
              activeCell?.col === logo.col
            }
          />
        ))}

        <div
          className="flex flex-col items-center justify-center gap-2 bg-[#06070c] px-2 py-3 sm:gap-3 sm:px-4 sm:py-0"
          style={{ gridColumn: "2 / span 3", gridRow: "2 / span 3" }}
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 text-[10px] font-medium tracking-wide text-neutral-300 uppercase sm:gap-2 sm:px-3 sm:py-1 sm:text-xs">
            <span className="size-1.5 rounded-full bg-violet-400 shadow-[0_0_12px_2px_rgba(167,139,250,0.7)]" />
            {badge}
          </span>
          <h3 className="max-w-[420px] text-center text-balance text-sm font-semibold leading-snug tracking-tight text-gradient sm:text-lg sm:leading-tight md:text-2xl">
            {heading}
          </h3>
          <p className="hidden max-w-sm text-center text-sm text-zinc-500 sm:block">
            A animação percorre cada tecnologia automaticamente — passe o mouse
            para ativar de novo.
          </p>
        </div>
      </div>
    </div>
  );
}
