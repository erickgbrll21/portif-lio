import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { ContactExperience } from "@/components/ContactExperience";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Disponível para novos projetos. Conte sobre sua ideia, escopo e objetivo — respondo em até 24h úteis.",
};

export default function ContatoPage() {
  return (
    <>
      <Navbar />
      <main className="relative pt-14 sm:pt-16">
        <ContactExperience />
      </main>
    </>
  );
}
