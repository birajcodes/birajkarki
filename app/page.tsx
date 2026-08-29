import Nav from "@/components/Nav";
import Hero from "@/components/sections/Hero";
import Identity from "@/components/sections/Identity";
import Experience from "@/components/sections/Experience";
import Work from "@/components/sections/Work";
import Lab from "@/components/sections/Lab";
import Building from "@/components/sections/Building";
import BeyondCode from "@/components/sections/BeyondCode";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Identity />
        <Experience />
        <Work />
        <Lab />
        <Building />
        <BeyondCode />
        <Skills />
        <Contact />
      </main>
    </>
  );
}
