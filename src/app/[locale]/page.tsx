"use client";

import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import TechStack from "@/components/sections/TechStack";
import Projects from "@/components/sections/Projects";
import Life from "@/components/sections/Life";
import Contact from "@/components/sections/Contact";

export const runtime = "edge";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Projects />
      <TechStack />
      <Life />
      <Contact />
    </>
  );
}
