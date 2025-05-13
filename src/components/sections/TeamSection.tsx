// src/components/sections/TeamSection.tsx
import React from "react";
import { motion } from "framer-motion";

interface TeamSectionProps {
  sectionClasses: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const TeamSection = ({ sectionClasses }: TeamSectionProps) => {
  const teamMembers = [
    {
      name: "Glorious Satria Dhamang Aji",
      role: "Founder",
      background:
        "Research and Development Software Engineer at Formulatrix©",
    },
    {
      name: "Looking For 2nd Founder",
      role: "CTO & Co-Founder",
      background:
        "Software Engineer Enthusiast with a knack of Design Thinking",
    },
    {
      name: "Looking For 3rd Founder",
      role: "Head of Business Development",
      background: "Business Mastermind and Interest in Startup Ecosystem",
    },
    {
      name: "Looking For 4th Founder",
      role: "Head of Operations",
      background:
        "Active and Hard Working, Marketing Wizard",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold mb-8 text-center">Our Team</h2>

      <div className="mb-8 text-center">
        <p className="text-xl max-w-3xl mx-auto">
          Our diverse team brings together expertise in software development,
          quality assurance, crowdsourcing, and business scaling to deliver a
          revolutionary testing platform.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {teamMembers.map((member, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-white/10 p-6 rounded-xl backdrop-blur-sm"
          >
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 bg-tertiary/20 rounded-full flex items-center justify-center mr-4">
                <span className="text-2xl font-bold text-tertiary">
                  {member.name.charAt(0)}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-tertiary-light">{member.role}</p>
              </div>
            </div>
            <p className="text-gray-300">{member.background}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 bg-white/10 p-6 rounded-xl">
        <h3 className="text-2xl font-semibold mb-4 text-center">
          Advisory Board
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-4">
            <h4 className="font-semibold mb-2">Dana Sulistiyo Kusumo, PhD</h4>
            <p className="text-gray-300">
              PhD in Software Engineering, Former Head of Software Engineering
              Department at Telkom University
            </p>
          </div>
          <div className="text-center p-4">
            <h4 className="font-semibold mb-2">Looking for 2nd Advisor</h4>
            <p className="text-gray-300">
              Angel Investor
            </p>
          </div>
          <div className="text-center p-4">
            <h4 className="font-semibold mb-2">Looking for 3rd Advisor</h4>
            <p className="text-gray-300">
              Crowdsourcing Innovation Expert
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamSection;
