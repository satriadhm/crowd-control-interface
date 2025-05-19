"use client";

import React from "react";
import { motion } from "framer-motion";

const TheoreticalBackgroundSlide = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <motion.h2 
        className="text-4xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        Theoretical Background
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-8">
        <motion.div 
          className="bg-white/10 p-6 rounded-xl backdrop-blur-sm"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold mb-4 text-tertiary-light">User Acceptance Testing (UAT)</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <div className="bg-tertiary/20 p-1 rounded-full mt-1 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tertiary-light">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <div>
                <span className="font-medium">Definition:</span>
                <p className="text-sm text-gray-300 mt-1">The final phase in software testing lifecycle where users verify if the system meets requirements and is ready for real-world use</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="bg-tertiary/20 p-1 rounded-full mt-1 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tertiary-light">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <div>
                <span className="font-medium">Purpose:</span>
                <p className="text-sm text-gray-300 mt-1">Confirms that software satisfies business requirements, is user-friendly, and functionally appropriate</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="bg-tertiary/20 p-1 rounded-full mt-1 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tertiary-light">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <div>
                <span className="font-medium">Modern Evolution:</span>
                <p className="text-sm text-gray-300 mt-1">Integration with agile methodologies, emphasizing continuous user collaboration through structured formats like AgileUAT</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="bg-tertiary/20 p-1 rounded-full mt-1 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tertiary-light">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <div>
                <span className="font-medium">Key Challenge:</span>
                <p className="text-sm text-gray-300 mt-1">Often lacks predetermined correct answers, requiring evaluation mechanisms that adapt to subjective feedback</p>
              </div>
            </li>
          </ul>
        </motion.div>

        <motion.div 
          className="bg-white/10 p-6 rounded-xl backdrop-blur-sm"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold mb-4 text-tertiary-light">Crowdsourcing Software Testing (CST)</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <div className="bg-tertiary/20 p-1 rounded-full mt-1 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tertiary-light">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <div>
                <span className="font-medium">Core Concept:</span>
                <p className="text-sm text-gray-300 mt-1">Distribution of testing tasks to a diverse group of independent individuals, offering cost-efficiency and diverse perspectives</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="bg-tertiary/20 p-1 rounded-full mt-1 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tertiary-light">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <div>
                <span className="font-medium">Components:</span>
                <p className="text-sm text-gray-300 mt-1">Requesters (companies/developers), testers (crowd workers), and platforms that connect them</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="bg-tertiary/20 p-1 rounded-full mt-1 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tertiary-light">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <div>
                <span className="font-medium">Tester Quality Factors:</span>
                <p className="text-sm text-gray-300 mt-1">Personality, capability (historical performance), and profile attributes (domain knowledge, availability, technical specs)</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="bg-tertiary/20 p-1 rounded-full mt-1 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tertiary-light">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <div>
                <span className="font-medium">Primary Challenge:</span>
                <p className="text-sm text-gray-300 mt-1">Variability in tester characteristics affecting consistency and reliability of test outcomes</p>
              </div>
            </li>
          </ul>
        </motion.div>
      </div>

      <motion.div 
        className="mt-8 grid md:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
          <h3 className="text-xl font-semibold mb-4 text-tertiary-light">Prior-Experience Based Validation</h3>
          <p className="text-sm text-gray-200 mb-3">
            Approach using historical performance and domain expertise to assess tester suitability.
          </p>
          <ul className="text-sm text-gray-300 space-y-2 list-disc pl-5">
            <li>Documented bug-detection history as skill indicator</li>
            <li>Domain knowledge correlation with detection efficiency</li>
            <li>Contextual awareness improving test relevance</li>
          </ul>
        </div>

        <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
          <h3 className="text-xl font-semibold mb-4 text-tertiary-light">Confusion Matrix</h3>
          <p className="text-sm text-gray-200 mb-3">
            Evaluation framework for classification performance assessment.
          </p>
          <ul className="text-sm text-gray-300 space-y-2 list-disc pl-5">
            <li>True Positive/Negative: Correct classifications</li>
            <li>False Positive/Negative: Incorrect classifications</li>
            <li>Key metrics: Accuracy, Precision, Recall, F1 Score, TNR</li>
          </ul>
        </div>

        <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
          <h3 className="text-xl font-semibold mb-4 text-tertiary-light">Gherkin Syntax</h3>
          <p className="text-sm text-gray-200 mb-3">
            Domain-specific language for writing behavior specifications.
          </p>
          <ul className="text-sm text-gray-300 space-y-2">
            <li><span className="font-medium">Format:</span> Given-When-Then structure</li>
            <li><span className="font-medium">Purpose:</span> Clear, structured test scenarios</li>
            <li><span className="font-medium">Relevance:</span> Ideal for UAT with consistent structure</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default TheoreticalBackgroundSlide;