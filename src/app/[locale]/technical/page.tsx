"use client";

import Hero from "@/components/technical/Hero";
import Services from "@/components/technical/Services";
import TechStack from "@/components/technical/TechStack";
import Projects from "@/components/technical/Projects";
import Life from "@/components/technical/Life";
import Contact from "@/components/technical/Contact";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Projects />
      <TechStack />
      <Life />
      <Contact />
      <Footer />
    </>
  );
}
