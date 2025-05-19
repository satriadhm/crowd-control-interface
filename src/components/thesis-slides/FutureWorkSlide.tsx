"use client";

import React from "react";
import { motion } from "framer-motion";

const FutureWorkSlide = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <motion.h2 
        className="text-4xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        Future Work
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-8">
        <motion.div 
          className="bg-white/10 p-6 rounded-xl backdrop-blur-sm"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold mb-4 text-tertiary-light">Algorithm Enhancements</h3>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-tertiary/20 p-1 rounded-full mt-1 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tertiary-light">
                  <path d="M12 22V8" />
                  <path d="m5 12 7-4 7 4" />
                  <path d="M5 16l7-4 7 4" />
                  <path d="M5 20l7-4 7 4" />
                </svg>
              </div>
              <div>
                <span className="font-medium">Advanced Threshold Determination</span>
                <p className="text-sm text-gray-300 mt-1">Develop adaptive thresholding mechanisms that adjust based on task complexity and domain context.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-tertiary/20 p-1 rounded-full mt-1 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tertiary-light">
                  <path d="M12 22V8" />
                  <path d="m5 12 7-4 7 4" />
                  <path d="M5 16l7-4 7 4" />
                  <path d="M5 20l7-4 7 4" />
                </svg>
              </div>
              <div>
                <span className="font-medium">Variant Algorithm Development</span>
                <p className="text-sm text-gray-300 mt-1">Explore specialized versions of the M-X algorithm optimized for different test types and question formats.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-tertiary/20 p-1 rounded-full mt-1 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tertiary-light">
                  <path d="M12 22V8" />
                  <path d="m5 12 7-4 7 4" />
                  <path d="M5 16l7-4 7 4" />
                  <path d="M5 20l7-4 7 4" />
                </svg>
              </div>
              <div>
                <span className="font-medium">Machine Learning Integration</span>
                <p className="text-sm text-gray-300 mt-1">Incorporate machine learning techniques to enhance classification precision and adaptability over time.</p>
              </div>
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
          <h3 className="text-2xl font-semibold mb-4 text-tertiary-light">System Scale & Implementation</h3>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-tertiary/20 p-1 rounded-full mt-1 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tertiary-light">
                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                  <line x1="3" x2="21" y1="9" y2="9" />
                  <line x1="9" x2="9" y1="21" y2="9" />
                </svg>
              </div>
              <div>
                <span className="font-medium">Large-Scale Production Testing</span>
                <p className="text-sm text-gray-300 mt-1">Validate algorithm performance in production environments with diverse testers and complex real-world applications.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-tertiary/20 p-1 rounded-full mt-1 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tertiary-light">
                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                  <line x1="3" x2="21" y1="9" y2="9" />
                  <line x1="9" x2="9" y1="21" y2="9" />
                </svg>
              </div>
              <div>
                <span className="font-medium">Performance Optimization</span>
                <p className="text-sm text-gray-300 mt-1">Enhance computational efficiency to support larger worker pools and more complex testing scenarios.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-tertiary/20 p-1 rounded-full mt-1 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tertiary-light">
                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                  <line x1="3" x2="21" y1="9" y2="9" />
                  <line x1="9" x2="9" y1="21" y2="9" />
                </svg>
              </div>
              <div>
                <span className="font-medium">API & Integration Framework</span>
                <p className="text-sm text-gray-300 mt-1">Develop standardized interfaces for integration with existing testing platforms and CI/CD pipelines.</p>
              </div>
            </div>
          </div>
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
          <h3 className="text-xl font-semibold mb-4 text-tertiary-light">Research Extensions</h3>
          <p className="text-sm text-gray-200 mb-3">
            Expanding the theoretical foundations and applications of the work.
          </p>
          <ul className="text-sm text-gray-300 space-y-2 list-disc pl-5">
            <li>Comparative studies with other quality control approaches</li>
            <li>Cross-domain applicability assessment beyond software testing</li>
            <li>Longitudinal studies on algorithm accuracy over extended periods</li>
          </ul>
        </div>

        <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
          <h3 className="text-xl font-semibold mb-4 text-tertiary-light">Business Implementation</h3>
          <p className="text-sm text-gray-200 mb-3">
            Transitioning research findings to practical business applications.
          </p>
          <ul className="text-sm text-gray-300 space-y-2 list-disc pl-5">
            <li>Develop SaaS model for crowdsourced testing platforms</li>
            <li>Create industry partnerships for real-world validation</li>
            <li>Establish quality certification framework for software products</li>
          </ul>
        </div>

        <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
          <h3 className="text-xl font-semibold mb-4 text-tertiary-light">Demographic Studies</h3>
          <p className="text-sm text-gray-200 mb-3">
            Understanding tester characteristics and improving recruitment.
          </p>
          <ul className="text-sm text-gray-300 space-y-2 list-disc pl-5">
            <li>Analysis of demographic factors influencing test quality</li>
            <li>Development of targeted tester recruitment strategies</li>
            <li>Investigation of motivational factors for sustained participation</li>
          </ul>
        </div>
      </motion.div>

      <motion.div 
        className="mt-8 bg-gradient-to-r from-tertiary/20 to-tertiary-light/20 p-6 rounded-xl text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        viewport={{ once: true }}
      >
        <h3 className="text-xl font-semibold mb-4">Long-Term Vision</h3>
        
        <p className="text-gray-200">
          The ultimate goal is to develop a comprehensive, adaptive quality control ecosystem that revolutionizes crowdsourced testing by minimizing variability while maximizing the value of diverse perspectives, eventually becoming an industry standard for software quality assurance.
        </p>
      </motion.div>
    </div>
  );
};

export default FutureWorkSlide;