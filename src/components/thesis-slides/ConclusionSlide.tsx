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
        className="bg-white/10 p-6 rounded-xl backdrop-blur-sm mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h3 className="text-2xl font-semibold mb-4 text-tertiary-light">Research Summary</h3>
        
        <p className="text-gray-300 mb-4">
          This research has successfully demonstrated the effectiveness of the M-X algorithm as a quality control mechanism for testers in crowdsourcing-based User Acceptance Testing. Through a simulation involving 24 volunteers, the algorithm exhibited strong classification capabilities with an accuracy of 79%, precision of 82%, recall of 75%, and an F1 score of 78%.
        </p>
        
        <p className="text-gray-300">
          These metrics confirm that the M-X algorithm can effectively distinguish between eligible and non-eligible testers based on their response consistency patterns, without relying on predefined answers. This capability is particularly valuable in UAT contexts where subjective and exploratory testing is required.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        <motion.div 
          className="bg-white/10 p-6 rounded-xl backdrop-blur-sm"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold mb-4 text-tertiary-light">Key Strengths</h3>
          
          <div className="space-y-4">
            <div className="bg-white/5 p-4 rounded-lg">
              <h4 className="font-medium text-tertiary-light mb-2">Variability Reduction</h4>
              <p className="text-sm text-gray-300">
                With a True Negative Rate of 83%, the algorithm demonstrates significant capability in reducing tester variability, ensuring more homogeneous and consistent testing pools.
              </p>
            </div>
            
            <div className="bg-white/5 p-4 rounded-lg">
              <h4 className="font-medium text-tertiary-light mb-2">Flexibility</h4>
              <p className="text-sm text-gray-300">
                The M-X algorithm&apos;s independence from predefined correct answers makes it exceptionally versatile for various testing scenarios and adaptable to different project requirements through rule-based validation.
              </p>
            </div>
            
            <div className="bg-white/5 p-4 rounded-lg">
              <h4 className="font-medium text-tertiary-light mb-2">Balanced Performance</h4>
              <p className="text-sm text-gray-300">
                The algorithm shows consistently strong performance across all evaluation metrics, indicating reliable classification capabilities for both eligible and non-eligible testers.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="bg-white/10 p-6 rounded-xl backdrop-blur-sm"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold mb-4 text-tertiary-light">Limitations & Future Work</h3>
          
          <div className="space-y-4">
            <div className="bg-white/5 p-4 rounded-lg">
              <h4 className="font-medium text-tertiary-light mb-2">Sample Limitations</h4>
              <p className="text-sm text-gray-300">
                The simulation was limited to 24 volunteers primarily from Telkom University with similar age ranges, which may not fully represent the demographic diversity in real-world crowdsourcing.
              </p>
            </div>
            
            <div className="bg-white/5 p-4 rounded-lg">
              <h4 className="font-medium text-tertiary-light mb-2">Testing Environment</h4>
              <p className="text-sm text-gray-300">
                Testing was conducted in a controlled simulation rather than a production environment, potentially limiting insights into real-world performance factors such as tester fatigue or external motivations.
              </p>
            </div>
            
            <div className="bg-white/5 p-4 rounded-lg">
              <h4 className="font-medium text-tertiary-light mb-2">Future Research Directions</h4>
              <p className="text-sm text-gray-300">
                Future work should explore algorithm variants for different test types, optimize threshold determination, evaluate performance in production environments, and investigate integration with other quality control methods.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div 
        className="mt-8 bg-gradient-to-r from-tertiary/20 to-tertiary-light/20 p-6 rounded-xl text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <h3 className="text-xl font-semibold mb-4">Final Assessment</h3>
        
        <p className="text-gray-200">
          The M-X algorithm provides a promising solution for enhancing the quality of crowdsourced User Acceptance Testing by effectively identifying consistent testers and reducing variability in testing outcomes. Its implementation can significantly improve the efficiency and reliability of the testing process through high-quality tester selection.
        </p>
      </motion.div>
    </div>
  );
};

export default ConclusionSlide;