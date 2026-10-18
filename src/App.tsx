import { NavBar } from "@/components/layout/NavBar";
import { ScrollToTopButton } from "@/components/layout/ScrollToTopButton";
import { About } from "@/sections/about/About";
import { Contact } from "@/sections/contact/Contact";
import { Experience } from "@/sections/experience/Experience";
import { Hero } from "@/sections/hero/Hero";
import { Projects } from "@/sections/projects/Projects";

export const App = () => {
  return (
    <>
      <NavBar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Contact />
      <ScrollToTopButton />
    </>
  );
};
