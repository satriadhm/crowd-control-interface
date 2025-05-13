import React from "react";
import { motion } from "framer-motion";

const TeamSection = ({ sectionClasses }) => {
  const teamMembers = [
    {
      name: "Alex Chen",
      role: "CEO & Co-Founder",
      background:
        "Former Product Manager at Google, 8+ years experience in software testing",
      image: "/icons/team-member-1.svg", // Placeholder image path
    },
    {
      name: "Sarah Johnson",
      role: "CTO & Co-Founder",
      background:
        "Former Tech Lead at Microsoft, expert in building scalable testing infrastructure",
      image: "/icons/team-member-2.svg",
    },
    {
      name: "Rahul Patel",
      role: "Head of Business Development",
      background: "10+ years in SaaS sales, previously at Salesforce",
      image: "/icons/team-member-3.svg",
    },
    {
      name: "Maria Garcia",
      role: "Head of Operations",
      background:
        "Former Operations Director at TopTal, managed 200+ remote testers",
      image: "/icons/team-member-4.svg",
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
            <h4 className="font-semibold mb-2">Dr. Leslie Thompson</h4>
            <p className="text-gray-300">
              Former QA Director at Adobe, PhD in Computer Science
            </p>
          </div>
          <div className="text-center p-4">
            <h4 className="font-semibold mb-2">Marcus Johnson</h4>
            <p className="text-gray-300">
              Angel Investor, Founder of TestPro (acquired by IBM)
            </p>
          </div>
          <div className="text-center p-4">
            <h4 className="font-semibold mb-2">Priya Sharma</h4>
            <p className="text-gray-300">
              Crowdsourcing Innovation Expert, Former VP at Upwork
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamSection;
