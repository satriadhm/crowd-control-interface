"use client";

import React from "react";
import { motion } from "framer-motion";

const ResultsSlide = () => {
  // Sample data based on the thesis results
  const metricsData = [
    { name: "Accuracy", value: 0.79 },
    { name: "Precision", value: 0.82 },
    { name: "Recall", value: 0.75 },
    { name: "TNR", value: 0.83 },
    { name: "F1 Score", value: 0.78 },
  ];

  const confusionMatrixData = {
    truePositive: 9,
    trueNegative: 10,
    falsePositive: 2,
    falseNegative: 3,
  };

  return (
    <div className="max-w-6xl mx-auto">
      <motion.h2 
        className="text-4xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        Results
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-8">
        <motion.div 
          className="bg-white/10 p-6 rounded-xl backdrop-blur-sm"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold mb-4 text-tertiary-light">Performance Metrics</h3>
          
          <div className="space-y-6">
            {metricsData.map((metric, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{metric.name}</span>
                  <span className="font-bold text-tertiary-light">{(metric.value * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-tertiary"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${metric.value * 100}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  ></motion.div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="bg-white/10 p-6 rounded-xl backdrop-blur-sm"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold mb-4 text-tertiary-light">Confusion Matrix</h3>
          
          <div className="grid grid-cols-2 gap-4 p-4 bg-white/5 rounded-lg">
            <motion.div 
              className="bg-green-500/20 p-4 rounded-lg text-center"
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <span className="block text-sm mb-2">True Positive</span>
              <span className="text-3xl font-bold text-green-400">{confusionMatrixData.truePositive}</span>
            </motion.div>
            
            <motion.div 
              className="bg-red-500/20 p-4 rounded-lg text-center"
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <span className="block text-sm mb-2">False Positive</span>
              <span className="text-3xl font-bold text-red-400">{confusionMatrixData.falsePositive}</span>
            </motion.div>
            
            <motion.div 
              className="bg-red-500/20 p-4 rounded-lg text-center"
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <span className="block text-sm mb-2">False Negative</span>
              <span className="text-3xl font-bold text-red-400">{confusionMatrixData.falseNegative}</span>
            </motion.div>
            
            <motion.div 
              className="bg-green-500/20 p-4 rounded-lg text-center"
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <span className="block text-sm mb-2">True Negative</span>
              <span className="text-3xl font-bold text-green-400">{confusionMatrixData.trueNegative}</span>
            </motion.div>
          </div>
          
          <div className="mt-4 text-sm text-gray-300">
            <p><strong>Total Samples:</strong> {confusionMatrixData.truePositive + confusionMatrixData.trueNegative + confusionMatrixData.falsePositive + confusionMatrixData.falseNegative}</p>
            <p><strong>Correct Classifications:</strong> {confusionMatrixData.truePositive + confusionMatrixData.trueNegative}</p>
            <p><strong>Misclassifications:</strong> {confusionMatrixData.falsePositive + confusionMatrixData.falseNegative}</p>
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
        <h3 className="text-xl font-semibold mb-4 text-center">Key Findings</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/5 p-4 rounded-lg">
            <h4 className="font-medium text-tertiary-light mb-2">RQ1: Classification Accuracy</h4>
            <p className="text-sm text-gray-200">
              The M-X algorithm achieved 79% overall accuracy in classifying testers in the UAT-based crowdsourcing environment, with 82% precision and 75% recall, demonstrating strong performance in identifying eligible testers.
            </p>
          </div>
          
          <div className="bg-white/5 p-4 rounded-lg">
            <h4 className="font-medium text-tertiary-light mb-2">RQ2: Variability Reduction</h4>
            <p className="text-sm text-gray-200">
              With a True Negative Rate of 83%, the algorithm effectively filtered out inconsistent testers, demonstrating its capability to reduce tester variability and improve testing quality consistency.
            </p>
          </div>
        </div>
        
        <div className="mt-4 bg-tertiary/10 p-4 rounded-lg">
          <p className="text-center text-gray-200">
            The algorithm successfully classified 19 out of 24 testers correctly, indicating its effectiveness as a quality control mechanism for crowdsourcing-based UAT.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ResultsSlide;