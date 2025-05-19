"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";


import ResultsSlide from "@/components/thesis-slides/ResultsSlide";
import AnalysisSlide from "@/components/thesis-slides/AnalysisSlide";
import ConclusionSlide from "@/components/thesis-slides/ConclusionSlide";
import FutureWorkSlide from "@/components/thesis-slides/FutureWorkSlide";
import QuestionAnswerSlide from "@/components/thesis-slides/QuestionAnswerSlide";
import ThankYouSlide from "@/components/thesis-slides/ThankYouSlide";
import IntroductionSlide from "@/components/thesis-slides/IntroductionSlide";
import ResearchProblemsSlide from "@/components/thesis-slides/ResearchProblemsSlide";
import TheoreticalBackgroundSlide from "@/components/thesis-slides/TheoreticalBackgroundSlide";
import TitleSlide from "@/components/thesis-slides/TitleSlide";
import MethodologySlide from "@/components/thesis-slides/MethodologySlide";
import MXAlgorithmSlide from "@/components/thesis-slides/MXAlgorithmSlide";
import SimulationDesignSlide from "@/components/thesis-slides/SimulationDesignSlide";
import SystemArchitectureSlide from "@/components/thesis-slides/SystemArchitectureSlide";

export default function ThesisDefensePage() {
  const [activeSection, setActiveSection] = useState("title");
  
  // Handle scroll to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "title",
        "introduction",
        "problems",
        "background",
        "mx-algorithm",
        "methodology",
        "architecture",
        "simulation",
        "results",
        "analysis",
        "conclusion",
        "future",
        "qa",
        "thankyou"
      ];

      const currentPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offset = element.offsetTop;

          if (
            currentPosition >= offset &&
            currentPosition < offset + element.offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Function to scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#0a1e5e] to-[#001333] text-white relative">
      {/* Fixed Navigation Sidebar */}
      <div className="fixed left-0 top-0 h-full w-16 md:w-20 bg-[#001333] shadow-lg z-10 flex flex-col items-center py-6">
        <Link href="/" className="mb-8">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
            <span className="text-[#001333] font-bold text-lg">TC</span>
          </div>
        </Link>

        <div className="flex flex-col items-center space-y-5 mt-8 overflow-y-auto h-[75vh] justify-between">
          <NavButton
            section="title"
            active={activeSection === "title"}
            onClick={() => scrollToSection("title")}
            label="Title"
          />
          <NavButton
            section="introduction"
            active={activeSection === "introduction"}
            onClick={() => scrollToSection("introduction")}
            label="Introduction"
          />
          <NavButton
            section="problems"
            active={activeSection === "problems"}
            onClick={() => scrollToSection("problems")}
            label="Problems"
          />
          <NavButton
            section="background"
            active={activeSection === "background"}
            onClick={() => scrollToSection("background")}
            label="Background"
          />
          <NavButton
            section="mx-algorithm"
            active={activeSection === "mx-algorithm"}
            onClick={() => scrollToSection("mx-algorithm")}
            label="M-X Algorithm"
          />
          <NavButton
            section="methodology"
            active={activeSection === "methodology"}
            onClick={() => scrollToSection("methodology")}
            label="Methodology"
          />
          <NavButton
            section="architecture"
            active={activeSection === "architecture"}
            onClick={() => scrollToSection("architecture")}
            label="Architecture"
          />
          <NavButton
            section="simulation"
            active={activeSection === "simulation"}
            onClick={() => scrollToSection("simulation")}
            label="Simulation"
          />
          <NavButton
            section="results"
            active={activeSection === "results"}
            onClick={() => scrollToSection("results")}
            label="Results"
          />
          <NavButton
            section="analysis"
            active={activeSection === "analysis"}
            onClick={() => scrollToSection("analysis")}
            label="Analysis"
          />
          <NavButton
            section="conclusion"
            active={activeSection === "conclusion"}
            onClick={() => scrollToSection("conclusion")}
            label="Conclusion"
          />
          <NavButton
            section="future"
            active={activeSection === "future"}
            onClick={() => scrollToSection("future")}
            label="Future Work"
          />
          <NavButton
            section="qa"
            active={activeSection === "qa"}
            onClick={() => scrollToSection("qa")}
            label="Q&A"
          />
          <NavButton
            section="thankyou"
            active={activeSection === "thankyou"}
            onClick={() => scrollToSection("thankyou")}
            label="Thank You"
          />
        </div>
      </div>

      {/* Main Content with fixed left margin to accommodate sidebar */}
      <div className="ml-16 md:ml-20">
        {/* Title Slide */}
        <section id="title" className="min-h-screen w-full flex items-center justify-center">
          <TitleSlide />
        </section>

        {/* Introduction Slide */}
        <section id="introduction" className="min-h-screen w-full py-16 px-4 flex flex-col justify-center bg-white/5">
          <IntroductionSlide />
        </section>

        {/* Research Problems Slide */}
        <section id="problems" className="min-h-screen w-full py-16 px-4 flex flex-col justify-center">
          <ResearchProblemsSlide />
        </section>

        {/* Theoretical Background Slide */}
        <section id="background" className="min-h-screen w-full py-16 px-4 flex flex-col justify-center bg-white/5">
          <TheoreticalBackgroundSlide />
        </section>

        {/* M-X Algorithm Slide */}
        <section id="mx-algorithm" className="min-h-screen w-full py-16 px-4 flex flex-col justify-center">
          <MXAlgorithmSlide />
        </section>

        {/* Methodology Slide */}
        <section id="methodology" className="min-h-screen w-full py-16 px-4 flex flex-col justify-center bg-white/5">
          <MethodologySlide />
        </section>

        {/* System Architecture Slide */}
        <section id="architecture" className="min-h-screen w-full py-16 px-4 flex flex-col justify-center">
          <SystemArchitectureSlide />
        </section>

        {/* Simulation Design Slide */}
        <section id="simulation" className="min-h-screen w-full py-16 px-4 flex flex-col justify-center bg-white/5">
          <SimulationDesignSlide />
        </section>

        {/* Results Slide */}
        <section id="results" className="min-h-screen w-full py-16 px-4 flex flex-col justify-center">
          <ResultsSlide />
        </section>

        {/* Analysis Slide */}
        <section id="analysis" className="min-h-screen w-full py-16 px-4 flex flex-col justify-center bg-white/5">
          <AnalysisSlide />
        </section>

        {/* Conclusion Slide */}
        <section id="conclusion" className="min-h-screen w-full py-16 px-4 flex flex-col justify-center">
          <ConclusionSlide />
        </section>

        {/* Future Work Slide */}
        <section id="future" className="min-h-screen w-full py-16 px-4 flex flex-col justify-center bg-white/5">
          <FutureWorkSlide />
        </section>

        {/* Q&A Slide */}
        <section id="qa" className="min-h-screen w-full py-16 px-4 flex flex-col justify-center">
          <QuestionAnswerSlide />
        </section>

        {/* Thank You Slide */}
        <section id="thankyou" className="min-h-screen w-full py-16 px-4 flex flex-col justify-center bg-white/5">
          <ThankYouSlide />
        </section>
      </div>
    </div>
  );
}

interface NavButtonProps {
  section: string;
  active: boolean;
  onClick: () => void;
  label: string;
}

const NavButton = ({ section, active, onClick, label }: NavButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="relative flex flex-col items-center group"
      aria-label={label}
    >
      <div
        className={`w-2 h-2 rounded-full mb-1 transition-all duration-300 ${
          active ? "bg-tertiary w-3 h-3" : "bg-gray-400"
        }`}
      />
      <div className="absolute left-full ml-2 bg-[#001333] p-2 rounded whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
        {label}
      </div>
    </button>
  );
};