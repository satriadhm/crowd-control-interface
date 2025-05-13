"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import HeroSection from "@/components/sections/HeroSection";
import ExecutiveSummary from "@/components/sections/ExecutiveSummary";
import ProblemSection from "@/components/sections/ProblemSection";
import SolutionSection from "@/components/sections/SolutionSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import MarketAnalysisSection from "@/components/sections/MarketAnalysisSection";
import CompetitiveAdvantageSection from "@/components/sections/CompetitiveAdvantageSection";
import BusinessModelSection from "@/components/sections/BusinessModelSection";
import GoToMarketSection from "@/components/sections/GoToMarketSection";
import TractionRoadmapSection from "@/components/sections/TractionRoadmapSection";
import FinancialSection from "@/components/sections/FinancialSection";
import InvestmentSection from "@/components/sections/InvestmentSection";
import TeamSection from "@/components/sections/TeamSection";
import ContactSection from "@/components/sections/ContactSection";

export default function PitchDeckPage() {
  const [activeSection, setActiveSection] = useState("hero");

  // Common section styling
  const sectionClasses = "min-h-screen py-16 px-4 flex items-center";

  // Navigation handler
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Handle scroll to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "hero",
        "about",
        "problem",
        "solution",
        "how-it-works",
        "market",
        "competitive",
        "business-model",
        "go-to-market",
        "traction",
        "team",
        "financial",
        "investment",
        "contact",
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

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#0a1e5e] to-[#001333] text-white">
      {/* Navigation Sidebar */}
      <div className="fixed left-0 top-0 h-full w-16 md:w-20 bg-[#001333] shadow-lg z-10 flex flex-col items-center py-6">
        <Link href="/" className="mb-8">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
            <span className="text-[#001333] font-bold text-lg">TC</span>
          </div>
        </Link>

        <div className="flex flex-col items-center space-y-6 mt-8">
          <NavButton
            section="hero"
            active={activeSection === "hero"}
            onClick={() => scrollToSection("hero")}
            label="Hero"
          />
          <NavButton
            section="about"
            active={activeSection === "about"}
            onClick={() => scrollToSection("about")}
            label="About"
          />
          <NavButton
            section="problem"
            active={activeSection === "problem"}
            onClick={() => scrollToSection("problem")}
            label="Problem"
          />
          <NavButton
            section="solution"
            active={activeSection === "solution"}
            onClick={() => scrollToSection("solution")}
            label="Solution"
          />
          <NavButton
            section="how-it-works"
            active={activeSection === "how-it-works"}
            onClick={() => scrollToSection("how-it-works")}
            label="How It Works"
          />
          <NavButton
            section="market"
            active={activeSection === "market"}
            onClick={() => scrollToSection("market")}
            label="Market"
          />
          <NavButton
            section="competitive"
            active={activeSection === "competitive"}
            onClick={() => scrollToSection("competitive")}
            label="Advantage"
          />
          <NavButton
            section="business-model"
            active={activeSection === "business-model"}
            onClick={() => scrollToSection("business-model")}
            label="Business Model"
          />
          <NavButton
            section="go-to-market"
            active={activeSection === "go-to-market"}
            onClick={() => scrollToSection("go-to-market")}
            label="GTM"
          />
          <NavButton
            section="traction"
            active={activeSection === "traction"}
            onClick={() => scrollToSection("traction")}
            label="Traction"
          />
          <NavButton
            section="team"
            active={activeSection === "team"}
            onClick={() => scrollToSection("team")}
            label="Team"
          />
          <NavButton
            section="financial"
            active={activeSection === "financial"}
            onClick={() => scrollToSection("financial")}
            label="Financial"
          />
          <NavButton
            section="investment"
            active={activeSection === "investment"}
            onClick={() => scrollToSection("investment")}
            label="Investment"
          />
          <NavButton
            section="contact"
            active={activeSection === "contact"}
            onClick={() => scrollToSection("contact")}
            label="Contact"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-16 md:ml-20">
        {/* Hero Section */}
        <section id="hero" className={sectionClasses}>
          <HeroSection sectionClasses={sectionClasses} />
        </section>

        {/* Executive Summary Section */}
        <section id="about" className={`${sectionClasses} bg-white/5`}>
          <ExecutiveSummary sectionClasses={sectionClasses} />
        </section>

        {/* Problem Section */}
        <section id="problem" className={sectionClasses}>
          <ProblemSection sectionClasses={sectionClasses} />
        </section>

        {/* Solution Section */}
        <section id="solution" className={`${sectionClasses} bg-white/5`}>
          <SolutionSection sectionClasses={sectionClasses} />
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className={sectionClasses}>
          <HowItWorksSection sectionClasses={sectionClasses} />
        </section>

        {/* Market Analysis Section */}
        <section id="market" className={`${sectionClasses} bg-white/5`}>
          <MarketAnalysisSection sectionClasses={sectionClasses} />
        </section>

        {/* Competitive Advantage Section */}
        <section id="competitive" className={`${sectionClasses} bg-white/5`}>
          <CompetitiveAdvantageSection sectionClasses={sectionClasses} />
        </section>

        {/* Business Model Section */}
        <section id="business-model" className={sectionClasses}>
          <BusinessModelSection sectionClasses={sectionClasses} />
        </section>

        {/* Go To Market Section */}
        <section id="go-to-market" className={sectionClasses}>
          <GoToMarketSection sectionClasses={sectionClasses} />
        </section>

        {/* Traction & Roadmap Section */}
        <section id="traction" className={`${sectionClasses} bg-white/5`}>
          <TractionRoadmapSection sectionClasses={sectionClasses} />
        </section>

        {/* Team Section */}
        <section id="team" className={sectionClasses}>
          <TeamSection sectionClasses={sectionClasses} />
        </section>

        {/* Financial Section */}
        <section id="financial" className={`${sectionClasses} bg-white/5`}>
          <FinancialSection sectionClasses={sectionClasses} />
        </section>

        {/* Investment Section */}
        <section id="investment" className={sectionClasses}>
          <InvestmentSection sectionClasses={sectionClasses} />
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className={`${sectionClasses} bg-gradient-to-r from-[#0a1e5e] to-[#001333]`}
        >
          <ContactSection sectionClasses={sectionClasses} />
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
