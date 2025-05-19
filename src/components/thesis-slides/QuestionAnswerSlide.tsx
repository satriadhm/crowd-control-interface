"use client";

import React from "react";
import { motion } from "framer-motion";

const QuestionAnswerSlide = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <motion.h2 
        className="text-4xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        Q&A Session
      </motion.h2>

      <motion.div 
        className="bg-white/10 p-8 rounded-xl backdrop-blur-sm mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h3 className="text-2xl font-semibold mb-6 text-center text-tertiary-light">Thank You for Your Attention</h3>
        
        <p className="text-gray-200 text-center mb-6">
          I welcome any questions, feedback, or discussion points about the research presented today.
        </p>
        
        <div className="flex justify-center">
          <div className="max-w-2xl w-full bg-white/5 p-6 rounded-lg">
            <h4 className="text-lg font-medium mb-4 text-center">Discussion Topics</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="bg-tertiary/20 p-2 rounded-full mt-1 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tertiary-light">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                    <path d="M12 17h.01" />
                  </svg>
                </div>
                <div>
                  <span className="font-medium">Algorithm Implementation</span>
                  <p className="text-sm text-gray-300 mt-1">Questions about the technical aspects of the M-X algorithm and its implementation details.</p>
                </div>
              </li>
              
              <li className="flex items-start gap-3">
                <div className="bg-tertiary/20 p-2 rounded-full mt-1 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tertiary-light">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                    <path d="M12 17h.01" />
                  </svg>
                </div>
                <div>
                  <span className="font-medium">Research Methodology</span>
                  <p className="text-sm text-gray-300 mt-1">Inquiries about the simulation setup, participant selection, and evaluation metrics.</p>
                </div>
              </li>
              
              <li className="flex items-start gap-3">
                <div className="bg-tertiary/20 p-2 rounded-full mt-1 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tertiary-light">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                    <path d="M12 17h.01" />
                  </svg>
                </div>
                <div>
                  <span className="font-medium">Results Interpretation</span>
                  <p className="text-sm text-gray-300 mt-1">Discussion about the significance and implications of the findings.</p>
                </div>
              </li>
              
              <li className="flex items-start gap-3">
                <div className="bg-tertiary/20 p-2 rounded-full mt-1 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tertiary-light">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                    <path d="M12 17h.01" />
                  </svg>
                </div>
                <div>
                  <span className="font-medium">Practical Applications</span>
                  <p className="text-sm text-gray-300 mt-1">Questions about real-world implementation and industry adoption possibilities.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        <motion.div 
          className="bg-white/10 p-6 rounded-xl backdrop-blur-sm"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-semibold mb-4 text-tertiary-light">Anticipated Questions</h3>
          
          <div className="space-y-4">
            <div className="bg-white/5 p-4 rounded-lg">
              <h4 className="font-medium mb-2">How does the algorithm handle biased responses?</h4>
              <p className="text-sm text-gray-300">
                The M-X algorithm is designed to identify consistent patterns rather than specific answers, which helps mitigate the impact of individual biases. However, if a significant portion of testers exhibit the same bias, it could affect the classification. Future work includes adding bias detection mechanisms.
              </p>
            </div>
            
            <div className="bg-white/5 p-4 rounded-lg">
              <h4 className="font-medium mb-2">What&apos;s the minimum number of testers needed?</h4>
              <p className="text-sm text-gray-300">
                The algorithm requires a minimum of three testers per task to establish meaningful agreement patterns. However, performance improves significantly with 5+ testers, and optimal results are achieved with 10-15 testers per task.
              </p>
            </div>
            
            <div className="bg-white/5 p-4 rounded-lg">
              <h4 className="font-medium mb-2">How does this compare to other quality control approaches?</h4>
              <p className="text-sm text-gray-300">
                Unlike gold standard or majority voting approaches, the M-X algorithm doesn&apos;t require predefined correct answers, making it uniquely suited for subjective UAT scenarios. It focuses on consistency rather than correctness, which addresses the fundamental challenge of exploratory testing.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="bg-white/10 p-6 rounded-xl backdrop-blur-sm"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-semibold mb-4 text-tertiary-light">Additional Research Insights</h3>
          
          <div className="space-y-4">
            <div className="bg-white/5 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Algorithm Sensitivity Analysis</h4>
              <p className="text-sm text-gray-300">
                During development, we conducted sensitivity analysis by varying the threshold values from 0.5 to 0.9 in increments of 0.05. The optimal balance between precision and recall was achieved in the 0.65-0.75 range for most testing scenarios.
              </p>
            </div>
            
            <div className="bg-white/5 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Demographic Observations</h4>
              <p className="text-sm text-gray-300">
                While not a primary focus of this research, we observed that testers with prior software testing experience (regardless of formal training) tended to exhibit higher consistency scores. However, this correlation was not strong enough to replace algorithmic assessment.
              </p>
            </div>
            
            <div className="bg-white/5 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Computational Efficiency</h4>
              <p className="text-sm text-gray-300">
                The current implementation processes worker classifications in under 250ms for groups of up to 25 testers. For larger worker pools, we implemented a MapReduce variant that maintains sub-second processing times for up to 100 testers per task.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div 
        className="mt-8 bg-white/10 p-6 rounded-xl backdrop-blur-sm"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center justify-center space-x-8">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tertiary-light">
                <path d="M17 18a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V6l3.95 4.95a2 2 0 0 0 3.1 0L19 6v12a2 2 0 0 1-2 2Z" />
                <path d="m6 6 6 6 6-6" />
              </svg>
            </div>
            <p className="text-sm text-gray-300">glorioussatria@gmail.com</p>
          </div>
          
          <div className="text-center">
            <div className="w-24 h-24 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tertiary-light">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </div>
            <p className="text-sm text-gray-300">linkedin.com/in/satriadhm</p>
          </div>
          
          <div className="text-center">
            <div className="w-24 h-24 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tertiary-light">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </div>
            <p className="text-sm text-gray-300">github.com/satriadhm</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default QuestionAnswerSlide;