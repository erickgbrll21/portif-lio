import { Intro } from "@/components/Intro";
import { Navbar } from "@/components/Navbar";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Differentials } from "@/components/Differentials";
import { Portfolio } from "@/components/Portfolio";
import { Stack } from "@/components/Stack";
import { Process } from "@/components/Process";
import { ContactCta } from "@/components/ContactCta";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative">
        <Intro />
        <About />
        <Services />
        <Differentials />
        <Portfolio />
        <Stack />
        <Process />
        <ContactCta />
      </main>
      <Footer />
    </>
  );
}
