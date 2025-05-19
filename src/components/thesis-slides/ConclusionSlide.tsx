"use client";

import React from "react";
import { motion } from "framer-motion";

const ConclusionSlide = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <motion.h2 
        className="text-4xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        Conclusion
      </motion.h2>

      <motion.div
        className="bg-white/10 p-8 rounded-xl backdrop-blur-sm"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-semibold mb-4 text-tertiary-light">Key Findings</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="bg-tertiary/20 p-1 rounded-full mt-1 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tertiary-light">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
                <div>
                  <span className="font-medium">Effectiveness of M-X Algorithm</span>
                  <p className="text-sm text-gray-300 mt-1">The M-X algorithm demonstrated strong classification performance with 79% accuracy in identifying eligible testers without relying on predefined correct answers.</p>
                </div>
              </li>
              
              <li className="flex items-start gap-3">
                <div className="bg-tertiary/20 p-1 rounded-full mt-1 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tertiary-light">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
                <div>
                  <span className="font-medium">Variability Reduction</span>
                  <p className="text-sm text-gray-300 mt-1">With a True Negative Rate of 83%, the algorithm effectively filtered out non-eligible testers, reducing potential variability in testing outcomes.</p>
                </div>
              </li>
              
              <li className="flex items-start gap-3">
                <div className="bg-tertiary/20 p-1 rounded-full mt-1 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tertiary-light">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
                <div>
                  <span className="font-medium">Balanced Performance</span>
                  <p className="text-sm text-gray-300 mt-1">The algorithm achieved a well-balanced performance with 82% precision and 75% recall, resulting in an F1 score of 78%, demonstrating its ability to simultaneously maintain high accuracy in identifying eligible testers while minimizing false positives.</p>
                </div>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-tertiary-light">Performance Metrics</h3>
            <div className="bg-white/5 p-5 rounded-lg">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">Accuracy</span>
                    <span className="text-sm font-bold">79%</span>
                  </div>
                  <div className="w-full bg-white/10 h-2 rounded-full">
                    <div className="bg-tertiary h-2 rounded-full" style={{width: "79%"}}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">Precision</span>
                    <span className="text-sm font-bold">82%</span>
                  </div>
                  <div className="w-full bg-white/10 h-2 rounded-full">
                    <div className="bg-tertiary-light h-2 rounded-full" style={{width: "82%"}}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">Recall</span>
                    <span className="text-sm font-bold">75%</span>
                  </div>
                  <div className="w-full bg-white/10 h-2 rounded-full">
                    <div className="bg-blue-500 h-2 rounded-full" style={{width: "75%"}}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">F1 Score</span>
                    <span className="text-sm font-bold">78%</span>
                  </div>
                  <div className="w-full bg-white/10 h-2 rounded-full">
                    <div className="bg-purple-500 h-2 rounded-full" style={{width: "78%"}}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">TNR</span>
                    <span className="text-sm font-bold">83%</span>
                  </div>
                  <div className="w-full bg-white/10 h-2 rounded-full">
                    <div className="bg-green-500 h-2 rounded-full" style={{width: "83%"}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div 
        className="mt-8 bg-white/10 p-6 rounded-xl backdrop-blur-sm"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        viewport={{ once: true }}
      >
        <h3 className="text-xl font-semibold mb-4 text-center">Research Implications</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/5 p-4 rounded-lg">
            <h4 className="font-medium text-tertiary-light mb-2">Practical Applications</h4>
            <p className="text-sm text-gray-300">
              The M-X algorithm provides a robust mechanism for quality control in UAT crowdsourcing environments, offering several practical benefits:
            </p>
            <ul className="list-disc pl-5 mt-3 space-y-1 text-sm text-gray-300">
              <li>Effective filtering of testers without predetermined correct answers</li>
              <li>Reduced variability in testing outcomes through consistency-based evaluation</li>
              <li>Adaptable threshold setting mechanism to accommodate different project requirements</li>
              <li>Potential integration with existing crowdsourcing platforms to enhance tester selection</li>
            </ul>
          </div>
          
          <div className="bg-white/5 p-4 rounded-lg">
            <h4 className="font-medium text-tertiary-light mb-2">Limitations & Future Research</h4>
            <p className="text-sm text-gray-300">
              While the results are promising, several areas warrant further investigation:
            </p>
            <ul className="list-disc pl-5 mt-3 space-y-1 text-sm text-gray-300">
              <li>Testing with larger and more diverse tester populations</li>
              <li>Evaluation in real-world UAT scenarios beyond controlled simulations</li>
              <li>Development of adaptive thresholding mechanisms based on task characteristics</li>
              <li>Integration with other quality control approaches for enhanced performance</li>
              <li>Longitudinal studies to assess algorithm performance over time</li>
              <li>Exploration of different task types beyond multiple-choice formats</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-6 bg-gradient-to-r from-tertiary/20 to-tertiary-light/20 p-4 rounded-lg text-center">
          <p className="text-lg">
            The M-X algorithm represents a promising approach for ensuring consistent and reliable testing quality in crowdsourced UAT environments.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ConclusionSlide;