"use client";

import React from "react";
import { motion } from "framer-motion";

const ResearchProblemsSlide = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <motion.h2 
        className="text-4xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        Research Problems
      </motion.h2>

      <div className="grid lg:grid-cols-2 gap-8">
        <motion.div 
          className="bg-gradient-to-br from-[#0a1e5e] to-[#001333] border border-white/10 rounded-xl p-8 shadow-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-6">
            <span className="bg-tertiary/20 text-tertiary-light text-lg font-bold px-4 py-2 rounded-full">RQ1</span>
          </div>
          <h3 className="text-2xl font-semibold mb-4 text-center">
            How accurately does the M-X algorithm classify testers in UAT-based crowdsourcing environments?
          </h3>
          <div className="mt-6 bg-white/10 p-4 rounded-lg">
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <div className="bg-tertiary/20 p-1 rounded-full mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tertiary-light">
                    <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
                  </svg>
                </div>
                <span className="text-sm">Evaluation based on classification performance metrics</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="bg-tertiary/20 p-1 rounded-full mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tertiary-light">
                    <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
                  </svg>
                </div>
                <span className="text-sm">Assessment of algorithm&apos;s effectiveness in detecting consistent testers</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="bg-tertiary/20 p-1 rounded-full mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tertiary-light">
                    <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
                  </svg>
                </div>
                <span className="text-sm">Comparison against prior-experience based validation</span>
              </li>
            </ul>
          </div>
        </motion.div>

        <motion.div 
          className="bg-gradient-to-br from-[#0a1e5e] to-[#001333] border border-white/10 rounded-xl p-8 shadow-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-6">
            <span className="bg-tertiary/20 text-tertiary-light text-lg font-bold px-4 py-2 rounded-full">RQ2</span>
          </div>
          <h3 className="text-2xl font-semibold mb-4 text-center">
            To what extent can the M-X algorithm reduce tester variability and ensure consistent testing quality?
          </h3>
          <div className="mt-6 bg-white/10 p-4 rounded-lg">
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <div className="bg-tertiary/20 p-1 rounded-full mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tertiary-light">
                    <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
                  </svg>
                </div>
                <span className="text-sm">Analysis of algorithm&apos;s ability to filter out inconsistent testers</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="bg-tertiary/20 p-1 rounded-full mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tertiary-light">
                    <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
                  </svg>
                </div>
                <span className="text-sm">Measurement of homogeneity in tester response patterns</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="bg-tertiary/20 p-1 rounded-full mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tertiary-light">
                    <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
                  </svg>
                </div>
                <span className="text-sm">Impact on overall testing quality and reliability</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>

      <motion.div 
        className="mt-8 bg-white/10 p-6 rounded-xl backdrop-blur-sm"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <h3 className="text-xl font-semibold mb-4 text-center">Research Objectives</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/5 p-4 rounded-lg">
            <h4 className="font-medium text-tertiary-light mb-2">Primary Objective</h4>
            <p className="text-sm text-gray-200">
              To evaluate the effectiveness of the M-X algorithm as a quality control mechanism for tester classification in crowdsourced UAT environments
            </p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg">
            <h4 className="font-medium text-tertiary-light mb-2">Specific Objectives</h4>
            <ul className="text-sm text-gray-200 space-y-2">
              <li>• Implement M-X algorithm in a simulated UAT environment</li>
              <li>• Evaluate classification accuracy using confusion matrix metrics</li>
              <li>• Analyze algorithm&apos;s impact on reducing tester variability</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ResearchProblemsSlide;