import { Intro } from "@/components/Intro";
import { Navbar } from "@/components/Navbar";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Differentials } from "@/components/Differentials";
import { Portfolio } from "@/components/Portfolio";
import { Stack } from "@/components/Stack";
import { Process } from "@/components/Process";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/Contact";
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
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
