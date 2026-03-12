"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Background3D from "@/components/Background3D";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Projects from "@/sections/Projects";
import Skills from "@/sections/Skills";
import Experience from "@/sections/Experience";
import Contact from "@/sections/Contact";
import ClientSetup from "@/components/ClientSetup";
import Loader from "@/components/Loader";
import DepthScrollContainer, { DepthSection } from "@/components/DepthScroll";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <main className="relative min-h-screen bg-black text-white selection:bg-white selection:text-black overflow-x-hidden">
      {!isLoaded && <Loader onComplete={() => setIsLoaded(true)} />}
      <Background3D />
      <ClientSetup />
      <Header />
      
      <DepthScrollContainer>
        <DepthSection id="hero">
          <Hero isLoaded={isLoaded} />
        </DepthSection>
        
        <DepthSection id="about">
          <About />
        </DepthSection>
        
        <DepthSection id="skills">
          <Skills />
        </DepthSection>
        
        <DepthSection id="experience">
          <Experience />
        </DepthSection>
      </DepthScrollContainer>
      
      {/* Projects section with normal horizontal scroll - excluded from depth effect */}
      <Projects />
      
      <Contact />
    </main>
  );
}
