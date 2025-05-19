"use client";

import React from "react";
import { motion } from "framer-motion";

const MethodologySlide = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <motion.h2 
        className="text-4xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        Methodology
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-8">
        <motion.div 
          className="bg-white/10 p-6 rounded-xl backdrop-blur-sm"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold mb-4 text-tertiary-light">Research Design</h3>
          <ul className="space-y-4 text-gray-200">
            <li className="flex items-start gap-3">
              <div className="bg-tertiary/20 p-1 rounded-full mt-1 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tertiary-light">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <span>Quantitative simulation methodology to evaluate M-X algorithm effectiveness</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="bg-tertiary/20 p-1 rounded-full mt-1 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tertiary-light">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <span>Client-server architecture with GraphQL and MongoDB for data management</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="bg-tertiary/20 p-1 rounded-full mt-1 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tertiary-light">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <span>Simulation conducted with 24 participants over 3-day period</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="bg-tertiary/20 p-1 rounded-full mt-1 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tertiary-light">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <span>Evaluation using Confusion Matrix and derived metrics</span>
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
          <h3 className="text-2xl font-semibold mb-4 text-tertiary-light">Research Flow</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-tertiary/20 p-2 rounded-full mt-1 flex-shrink-0 flex items-center justify-center h-8 w-8">
                <span className="text-tertiary-light font-bold">1</span>
              </div>
              <div>
                <span className="font-medium block">Literature Review</span>
                <p className="text-sm text-gray-300 mt-1">Studying Crowdsourced Testing, UAT, and worker quality control</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-tertiary/20 p-2 rounded-full mt-1 flex-shrink-0 flex items-center justify-center h-8 w-8">
                <span className="text-tertiary-light font-bold">2</span>
              </div>
              <div>
                <span className="font-medium block">System Development</span>
                <p className="text-sm text-gray-300 mt-1">Web-based platform implementing M-X algorithm with Next.js and GraphQL</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-tertiary/20 p-2 rounded-full mt-1 flex-shrink-0 flex items-center justify-center h-8 w-8">
                <span className="text-tertiary-light font-bold">3</span>
              </div>
              <div>
                <span className="font-medium block">Simulation</span>
                <p className="text-sm text-gray-300 mt-1">Controlled testing with 24 volunteers answering Gherkin-based tasks</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-tertiary/20 p-2 rounded-full mt-1 flex-shrink-0 flex items-center justify-center h-8 w-8">
                <span className="text-tertiary-light font-bold">4</span>
              </div>
              <div>
                <span className="font-medium block">Data Analysis</span>
                <p className="text-sm text-gray-300 mt-1">Quantitative analysis of algorithm performance using evaluation metrics</p>
              </div>
            </div>
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
        <h3 className="text-xl font-semibold mb-4 text-center">Evaluation Methodology</h3>
        <div className="grid md:grid-cols-5 gap-4">
          <div className="bg-white/5 p-4 rounded-lg">
            <h4 className="font-medium text-tertiary-light mb-2">Accuracy</h4>
            <p className="text-sm text-gray-300">Proportion of all correct predictions from total predictions</p>
            <div className="mt-3 bg-white/10 p-2 rounded text-center">
              <span className="font-mono text-sm text-gray-200">(TP + TN) / (TP + TN + FP + FN)</span>
            </div>
          </div>
          
          <div className="bg-white/5 p-4 rounded-lg">
            <h4 className="font-medium text-tertiary-light mb-2">Precision</h4>
            <p className="text-sm text-gray-300">Proportion of correct positive predictions</p>
            <div className="mt-3 bg-white/10 p-2 rounded text-center">
              <span className="font-mono text-sm text-gray-200">TP / (TP + FP)</span>
            </div>
          </div>
          
          <div className="bg-white/5 p-4 rounded-lg">
            <h4 className="font-medium text-tertiary-light mb-2">Recall</h4>
            <p className="text-sm text-gray-300">Proportion of actual positives correctly identified</p>
            <div className="mt-3 bg-white/10 p-2 rounded text-center">
              <span className="font-mono text-sm text-gray-200">TP / (TP + FN)</span>
            </div>
          </div>

          <div className="bg-white/5 p-4 rounded-lg">
            <h4 className="font-medium text-tertiary-light mb-2">TNR</h4>
            <p className="text-sm text-gray-300">Proportion of actual negatives correctly identified</p>
            <div className="mt-3 bg-white/10 p-2 rounded text-center">
              <span className="font-mono text-sm text-gray-200">TN / (TN + FP)</span>
            </div>
          </div>

          <div className="bg-white/5 p-4 rounded-lg">
            <h4 className="font-medium text-tertiary-light mb-2">F1 Score</h4>
            <p className="text-sm text-gray-300">Harmonic mean of precision and recall</p>
            <div className="mt-3 bg-white/10 p-2 rounded text-center">
              <span className="font-mono text-sm text-gray-200">2 × (P × R) / (P + R)</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MethodologySlide;