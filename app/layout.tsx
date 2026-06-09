import type { Metadata } from "next";
import { Montserrat, Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://erickgabriel.dev"),
  title: {
    default: "Erick Gabriel — Desenvolvedor & Criador de Experiências Digitais",
    template: "%s · Erick Gabriel",
  },
  description:
    "Desenvolvimento de sites, landing pages e sistemas personalizados para empresas que desejam crescer através da tecnologia.",
  keywords: [
    "Erick Gabriel",
    "Desenvolvedor",
    "Belo Horizonte",
    "Next.js",
    "React",
    "Landing Page",
    "Sistemas Web",
    "Automação",
    "UX/UI",
  ],
  authors: [{ name: "Erick Gabriel" }],
  creator: "Erick Gabriel",
  openGraph: {
    title: "Erick Gabriel — Experiências Digitais Premium",
    description:
      "Transformo ideias em experiências digitais que geram resultados.",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Erick Gabriel — Experiências Digitais Premium",
    description:
      "Transformo ideias em experiências digitais que geram resultados.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${poppins.variable} ${montserrat.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link
          rel="preload"
          href="/intro-background.mp4"
          as="fetch"
          type="video/mp4"
        />
      </head>
      <body className="min-h-full bg-black text-white selection:bg-violet-500/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
