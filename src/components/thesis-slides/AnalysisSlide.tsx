"use client";

import React from "react";
import { motion } from "framer-motion";

const AnalysisSlide = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <motion.h2 
        className="text-4xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        Analysis
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-8">
        <motion.div 
          className="bg-white/10 p-6 rounded-xl backdrop-blur-sm"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold mb-4 text-tertiary-light">Performance Analysis</h3>
          <p className="text-gray-200 mb-4">
            The M-X algorithm demonstrated strong classification performance with an accuracy of 79%, indicating its effectiveness in identifying appropriate testers for UAT crowdsourcing environments.
          </p>
          
          <div className="space-y-4 mt-6">
            <div className="bg-white/5 p-4 rounded-lg">
              <h4 className="font-medium text-tertiary-light mb-2">Precision Analysis (82%)</h4>
              <p className="text-sm text-gray-300">
                The high precision rate indicates the algorithm&apos;s reliability in identifying eligible testers, with only a small proportion of false positives. This is crucial for ensuring quality control in UAT processes.
              </p>
            </div>
            
            <div className="bg-white/5 p-4 rounded-lg">
              <h4 className="font-medium text-tertiary-light mb-2">Recall Analysis (75%)</h4>
              <p className="text-sm text-gray-300">
                The recall rate shows that the algorithm successfully identified three-quarters of all eligible testers. While this leaves room for improvement, it represents a strong foundation for a consistency-based approach.
              </p>
            </div>
            
            <div className="bg-white/5 p-4 rounded-lg">
              <h4 className="font-medium text-tertiary-light mb-2">F1 Score Implications (78%)</h4>
              <p className="text-sm text-gray-300">
                The balanced F1 score demonstrates that the algorithm maintains good equilibrium between precision and recall, providing a reliable overall classification performance.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="bg-white/10 p-6 rounded-xl backdrop-blur-sm"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold mb-4 text-tertiary-light">Quality Control Efficacy</h3>
          
          <div className="bg-white/5 p-4 rounded-lg mb-6">
            <h4 className="font-medium text-tertiary-light mb-2">True Negative Rate (83%)</h4>
            <p className="text-sm text-gray-300">
              The algorithm&apos;s high True Negative Rate demonstrates its effectiveness in identifying and filtering out non-eligible testers, which is crucial for reducing variability in testing outcomes and ensuring consistent quality.
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-tertiary/20 p-1 rounded-full mt-1 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tertiary-light">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <div>
                <span className="font-medium">Variability Reduction</span>
                <p className="text-sm text-gray-300 mt-1">Successfully reduced tester variability by filtering out 10 of 12 non-eligible testers, maintaining a more homogeneous testing group</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-tertiary/20 p-1 rounded-full mt-1 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tertiary-light">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <div>
                <span className="font-medium">Consistency Preservation</span>
                <p className="text-sm text-gray-300 mt-1">Maintained 9 of 12 eligible testers, ensuring that the majority of quality testers were retained in the selection process</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-tertiary/20 p-1 rounded-full mt-1 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tertiary-light">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <div>
                <span className="font-medium">Rule-Based Adaptability</span>
                <p className="text-sm text-gray-300 mt-1">The threshold-based approach allows for fine-tuning of eligibility criteria to suit specific project requirements</p>
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
        <h3 className="text-xl font-semibold mb-4 text-center">Error Analysis & Improvement Opportunities</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/5 p-4 rounded-lg">
            <h4 className="font-medium text-tertiary-light mb-2">False Positives (2 cases)</h4>
            <p className="text-gray-200 mb-3">
              Two non-eligible testers were incorrectly classified as eligible, representing 16.7% of the non-eligible group.
            </p>
            <p className="text-sm text-gray-300">
              Potential causes include:
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Coincidental response pattern alignment with eligible testers</li>
                <li>Limited task diversity in the simulation environment</li>
                <li>Threshold sensitivity requiring further calibration</li>
              </ul>
            </p>
          </div>
          
          <div className="bg-white/5 p-4 rounded-lg">
            <h4 className="font-medium text-tertiary-light mb-2">False Negatives (3 cases)</h4>
            <p className="text-gray-200 mb-3">
              Three eligible testers were incorrectly classified as non-eligible, representing 25% of the eligible group.
            </p>
            <p className="text-sm text-gray-300">
              Improvement opportunities include:
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Increasing task complexity and diversity to better differentiate tester capabilities</li>
                <li>Implementing adaptive thresholding based on task characteristics</li>
                <li>Incorporating iterative evaluation to reduce single-session classification errors</li>
              </ul>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AnalysisSlide;