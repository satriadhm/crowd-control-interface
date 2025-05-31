// src/components/sections/InvestmentSection.tsx
import React from "react";
import { motion } from "framer-motion";

interface InvestmentSectionProps {
  sectionClasses: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const InvestmentSection = ({ sectionClasses }: InvestmentSectionProps) => {
  // Investment details
   const investmentDetails = {
    amount: 1500000000,
    equity: 15,
    valuation: 10000000000,
    timeline: 18,
  }

  // Use of funds breakdown
  const fundAllocation = [
    {
      category: "Product Development",
      percentage: 40,
      description:
        "Enhancing the UAT platform, AI-powered bug detection, and analytics dashboard",
    },
    {
      category: "Marketing & Sales",
      percentage: 30,
      description:
        "B2B outreach, tester acquisition campaigns, and brand awareness",
    },
    {
      category: "Team Expansion",
      percentage: 20,
      description: "Hiring key technical and business development roles",
    },
    {
      category: "Operations",
      percentage: 10,
      description: "Infrastructure, legal, and administrative expenses",
    },
  ];

  // Format currency
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Helper function to get color based on category
  const getColorForCategory = (category: string): string => {
    switch (category) {
      case "Product Development":
        return "#4c1d95"; // purple
      case "Marketing & Sales":
        return "#1d4ed8"; // blue
      case "Team Expansion":
        return "#047857"; // green
      case "Operations":
        return "#b45309"; // amber
      default:
        return "#6b7280"; // gray
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold mb-8 text-center">
        Investment Opportunity
      </h2>

      {/* Investment Highlights */}
      <div className="grid md:grid-cols-2 gap-10 mb-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-[#0a1e5e] to-[#001333] p-8 rounded-xl border border-white/10 shadow-xl"
        >
          <h3 className="text-2xl font-semibold mb-6 text-center">
            Funding Details
          </h3>

          <div className="space-y-6">
            <div className="flex justify-between items-center pb-3 border-b border-white/20">
              <span className="text-lg">Seeking:</span>
              <span className="text-3xl font-bold text-tertiary-light">
                {formatCurrency(investmentDetails.amount)}
              </span>
            </div>

            <div className="flex justify-between items-center pb-3 border-b border-white/20">
              <span className="text-lg">Equity Offered:</span>
              <span className="text-3xl font-bold text-tertiary-light">
                {investmentDetails.equity}%
              </span>
            </div>

            <div className="flex justify-between items-center pb-3 border-b border-white/20">
              <span className="text-lg">Pre-money Valuation:</span>
              <span className="text-3xl font-bold text-tertiary-light">
                {formatCurrency(investmentDetails.valuation)}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-lg">Runway:</span>
              <span className="text-3xl font-bold text-tertiary-light">
                {investmentDetails.timeline} months
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-white/10 p-8 rounded-xl backdrop-blur-sm"
        >
          <h3 className="text-2xl font-semibold mb-6 text-center">
            Investment Highlights
          </h3>

          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <div className="bg-tertiary/20 p-2 rounded-full mt-1 flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-tertiary-light"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <div>
                <span className="font-medium block">Dual Revenue Streams</span>
                <p className="text-sm text-gray-300">
                  B2B testing services and B2C tester referral commissions
                  create multiple growth avenues
                </p>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <div className="bg-tertiary/20 p-2 rounded-full mt-1 flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-tertiary-light"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <div>
                <span className="font-medium block">Scalable Platform</span>
                <p className="text-sm text-gray-300">
                  Technology infrastructure designed to scale globally with
                  minimal marginal costs
                </p>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <div className="bg-tertiary/20 p-2 rounded-full mt-1 flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-tertiary-light"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <div>
                <span className="font-medium block">Network Effects</span>
                <p className="text-sm text-gray-300">
                  Platform becomes more valuable as more testers and companies
                  join, creating a strong competitive moat
                </p>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <div className="bg-tertiary/20 p-2 rounded-full mt-1 flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-tertiary-light"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <div>
                <span className="font-medium block">Clear Exit Strategy</span>
                <p className="text-sm text-gray-300">
                  Strong acquisition potential from enterprise testing
                  platforms, software development tools, and tech giants
                </p>
              </div>
            </li>
          </ul>
        </motion.div>
      </div>

      {/* Use of Funds */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-white/10 p-8 rounded-xl backdrop-blur-sm"
      >
        <h3 className="text-2xl font-semibold mb-6 text-center">
          Use of Funds
        </h3>

        <div className="mb-8">
          <div className="h-12 bg-white/10 rounded-full overflow-hidden flex">
            {fundAllocation.map((item, index) => (
              <div
                key={index}
                className="h-full flex items-center justify-center text-xs md:text-sm font-medium transition-all duration-500"
                style={{
                  width: `${item.percentage}%`,
                  backgroundColor: getColorForCategory(item.category),
                }}
              >
                <span className="hidden md:inline">{item.category}</span>
                <span className="md:hidden">{item.percentage}%</span>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap justify-between mt-2 text-xs text-gray-400">
            {fundAllocation.map((item, index) => (
              <div key={index}>
                <span className="hidden md:inline">{item.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {fundAllocation.map((item, index) => (
            <div key={index} className="bg-white/5 p-4 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{
                    backgroundColor: getColorForCategory(item.category),
                  }}
                ></div>
                <h4 className="font-medium">
                  {item.category} ({item.percentage}%)
                </h4>
              </div>
              <p className="text-sm text-gray-300">{item.description}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Timeline to Results */}
      <div className="mt-12 bg-white/10 p-6 rounded-xl text-center">
        <h3 className="text-xl font-semibold mb-4">
          Expected Milestones with This Funding
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-white/5 p-4 rounded-lg">
            <div className="bg-tertiary w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3">
              6
            </div>
            <h4 className="font-medium">6 Months</h4>
            <p className="text-sm text-gray-300 mt-2">
              Complete UAT platform v2.0 with AI features and launch pilot with
              5 enterprise clients
            </p>
          </div>

          <div className="bg-white/5 p-4 rounded-lg">
            <div className="bg-tertiary w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3">
              12
            </div>
            <h4 className="font-medium">12 Months</h4>
            <p className="text-sm text-gray-300 mt-2">
              Reach 50+ B2B clients and 10,000 active testers with positive unit
              economics
            </p>
          </div>

          <div className="bg-white/5 p-4 rounded-lg">
            <div className="bg-tertiary w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3">
              18
            </div>
            <h4 className="font-medium">18 Months</h4>
            <p className="text-sm text-gray-300 mt-2">
              Achieve profitability and begin international expansion with
              Series A preparations
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentSection;
