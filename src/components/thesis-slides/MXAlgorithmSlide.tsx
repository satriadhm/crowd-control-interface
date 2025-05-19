"use client";

import React from "react";
import { motion } from "framer-motion";

const MXAlgorithmSlide = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <motion.h2 
        className="text-4xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        M-X Algorithm
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-8">
        <motion.div 
          className="bg-white/10 p-6 rounded-xl backdrop-blur-sm"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold mb-4 text-tertiary-light">Algorithmic Foundation</h3>
          
          <div className="mb-6">
            <h4 className="font-medium mb-2">M-1 Algorithm (Base)</h4>
            <p className="text-sm text-gray-300 mb-4">
              Designed for binary or single-choice problems, evaluating worker quality without predefined correct answers
            </p>
            <div className="bg-white/10 p-4 rounded-lg text-center">
              <span className="font-mono text-gray-200">Q<sub>ij</sub> = A<sub>i</sub> · A<sub>j</sub> + ((1 - A<sub>i</sub>)(1 - A<sub>j</sub>)) / (M - 1)</span>
            </div>
            <div className="mt-3 text-xs text-gray-400">
              <p>Where:</p>
              <ul className="space-y-1 ml-4 mt-1">
                <li>• Q<sub>ij</sub>: Probability of agreement between workers i and j</li>
                <li>• A<sub>i</sub>, A<sub>j</sub>: Accuracy rates of workers i and j</li>
                <li>• M: Number of options in the question</li>
              </ul>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">M-X Algorithm (Extended)</h4>
            <p className="text-sm text-gray-300 mb-4">
              Extension of M-1 for multiple-choice problems by decomposing them into binary sub-questions
            </p>
            <div className="bg-white/10 p-4 rounded-lg text-center">
              <span className="font-mono text-gray-200">A<sub>i</sub> = ∏<sub>j=1</sub><sup>M</sup> A<sub>ij</sub></span>
            </div>
            <div className="mt-3 text-xs text-gray-400">
              <p>Where:</p>
              <ul className="space-y-1 ml-4 mt-1">
                <li>• A<sub>i</sub>: Overall accuracy of worker i</li>
                <li>• A<sub>ij</sub>: Accuracy of worker i on sub-question j</li>
                <li>• M: Number of options/sub-questions</li>
              </ul>
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
          <h3 className="text-2xl font-semibold mb-4 text-tertiary-light">Key Features and Process</h3>
          
          <div className="space-y-4">
            <div className="bg-white/5 p-4 rounded-lg">
              <h4 className="font-medium text-tertiary-light mb-2">Independence from Ground Truth</h4>
              <p className="text-sm text-gray-300">
                Evaluates worker quality based solely on inter-worker response consistency, without requiring predefined correct answers
              </p>
            </div>
            
            <div className="bg-white/5 p-4 rounded-lg">
              <h4 className="font-medium text-tertiary-light mb-2">Process Flow</h4>
              <ol className="text-sm text-gray-300 space-y-3 ml-4 list-decimal">
                <li>
                  <span className="font-medium">Task Decomposition:</span>
                  <p className="text-xs mt-1">Multiple-choice questions decomposed into binary sub-questions</p>
                </li>
                <li>
                  <span className="font-medium">Agreement Calculation:</span>
                  <p className="text-xs mt-1">Computes agreement rate between each worker pair for each sub-question</p>
                </li>
                <li>
                  <span className="font-medium">Equation System Construction:</span>
                  <p className="text-xs mt-1">Builds system of equations using the agreement probabilities</p>
                </li>
                <li>
                  <span className="font-medium">Accuracy Calculation:</span>
                  <p className="text-xs mt-1">Solves equations to determine individual worker accuracy rates</p>
                </li>
                <li>
                  <span className="font-medium">Eligibility Classification:</span>
                  <p className="text-xs mt-1">Compares accuracy scores against threshold to determine worker eligibility</p>
                </li>
              </ol>
            </div>
            
            <div className="bg-white/5 p-4 rounded-lg">
              <h4 className="font-medium text-tertiary-light mb-2">Constraints & Requirements</h4>
              <ul className="text-sm text-gray-300 space-y-1 ml-4 list-disc">
                <li>Minimum of three workers required per task</li>
                <li>Independent and non-exclusive answer options</li>
                <li>Assumes random distribution for incorrect answers</li>
                <li>Designed for consistency detection, not specific answer validation</li>
              </ul>
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
        <h3 className="text-xl font-semibold mb-4 text-center">Relevance to UAT-Based Crowdsourcing</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white/5 p-4 rounded-lg">
            <h4 className="font-medium text-tertiary-light mb-2">Subjective Evaluation</h4>
            <p className="text-sm text-gray-300">
              Particularly suitable for UAT scenarios with subjective or exploratory testing where predefined correct answers don&apos;t exist
            </p>
          </div>
          
          <div className="bg-white/5 p-4 rounded-lg">
            <h4 className="font-medium text-tertiary-light mb-2">Worker Variability Reduction</h4>
            <p className="text-sm text-gray-300">
              Helps identify consistent testers regardless of specific answers, focusing on agreement patterns as indicators of quality
            </p>
          </div>
          
          <div className="bg-white/5 p-4 rounded-lg">
            <h4 className="font-medium text-tertiary-light mb-2">Scalability</h4>
            <p className="text-sm text-gray-300">
              Designed to accommodate large worker pools with MapReduce implementation, making it suitable for crowdsourced environments
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MXAlgorithmSlide;