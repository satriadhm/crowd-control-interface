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
          <h3 className="text-2xl font-semibold mb-4 text-tertiary-light">Metrics Interpretation</h3>
          
          <div className="space-y-5">
            <div className="bg-white/5 p-4 rounded-lg">
              <h4 className="font-medium text-tertiary-light mb-2">Accuracy (79%)</h4>
              <p className="text-sm text-gray-300">
                The algorithm correctly classified 4 out of 5 testers, demonstrating strong overall performance across both eligible and non-eligible categories.
              </p>
            </div>
            
            <div className="bg-white/5 p-4 rounded-lg">
              <h4 className="font-medium text-tertiary-light mb-2">Precision (82%)</h4>
              <p className="text-sm text-gray-300">
                High precision indicates that when the algorithm identifies a tester as eligible, it is rarely wrong, minimizing the risk of involving unqualified testers.
              </p>
            </div>
            
            <div className="bg-white/5 p-4 rounded-lg">
              <h4 className="font-medium text-tertiary-light mb-2">Recall (75%)</h4>
              <p className="text-sm text-gray-300">
                The algorithm successfully identified three-quarters of all eligible testers, demonstrating good sensitivity in detecting quality testers.
              </p>
            </div>
            
            <div className="bg-white/5 p-4 rounded-lg">
              <h4 className="font-medium text-tertiary-light mb-2">TNR (83%)</h4>
              <p className="text-sm text-gray-300">
                The algorithm excels at identifying non-eligible testers, effectively filtering out those who would introduce variability into testing results.
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
          <h3 className="text-2xl font-semibold mb-4 text-tertiary-light">M-X Algorithm Strengths</h3>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-tertiary/20 p-1 rounded-full mt-1 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tertiary-light">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <div>
                <span className="font-medium">Ground Truth Independence</span>
                <p className="text-sm text-gray-300 mt-1">Functions effectively without predefined correct answers, making it ideal for subjective and exploratory UAT scenarios.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-tertiary/20 p-1 rounded-full mt-1 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tertiary-light">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <div>
                <span className="font-medium">Balanced Performance</span>
                <p className="text-sm text-gray-300 mt-1">Demonstrates strong capabilities in both identifying eligible testers and filtering out non-eligible ones, as reflected in the F1 Score of 78%.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-tertiary/20 p-1 rounded-full mt-1 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tertiary-light">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <div>
                <span className="font-medium">Variability Reduction</span>
                <p className="text-sm text-gray-300 mt-1">Highly effective at reducing tester variability with its strong TNR (83%), creating more homogeneous tester pools.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-tertiary/20 p-1 rounded-full mt-1 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tertiary-light">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <div>
                <span className="font-medium">Flexible Threshold Setting</span>
                <p className="text-sm text-gray-300 mt-1">Adaptable to different project requirements through rule-based validation for threshold determination.</p>
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
        <h3 className="text-xl font-semibold mb-4 text-center">Classification Analysis</h3>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white/5 p-4 rounded-lg">
            <h4 className="font-medium text-tertiary-light mb-2">False Positives (2)</h4>
            <p className="text-sm text-gray-300">
              Two non-eligible testers were incorrectly classified as eligible. This represents a relatively small proportion (17%) of all identified eligible testers, minimizing potential impact on testing quality.
            </p>
          </div>
          
          <div className="bg-white/5 p-4 rounded-lg">
            <h4 className="font-medium text-tertiary-light mb-2">False Negatives (3)</h4>
            <p className="text-sm text-gray-300">
              Three eligible testers were not identified by the algorithm, suggesting room for improvement in sensitivity. This could potentially lead to overlooking some quality testers.
            </p>
          </div>
          
          <div className="bg-white/5 p-4 rounded-lg">
            <h4 className="font-medium text-tertiary-light mb-2">Overall Effectiveness</h4>
            <p className="text-sm text-gray-300">
              With 79% accuracy and strong performance across all metrics, the M-X algorithm demonstrates significant potential as a quality control mechanism for crowdsourced UAT environments.
            </p>
          </div>
        </div>
        
        <div className="mt-6 bg-tertiary/10 p-4 rounded-lg">
          <p className="text-center text-sm text-gray-200">
            The performance metrics and analysis strongly support the effectiveness of the M-X algorithm in addressing both research questions, confirming its capability to accurately classify testers and reduce variability in crowdsourced UAT environments.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AnalysisSlide;