"use client";

import React from "react";
import { motion } from "framer-motion";

const SystemArchitectureSlide = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <motion.h2 
        className="text-4xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        System Architecture
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-8">
        <motion.div 
          className="bg-white/10 p-6 rounded-xl backdrop-blur-sm"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold mb-4 text-tertiary-light">Architecture Overview</h3>
          
          <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 p-4 rounded-lg mb-6">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-white/10 p-3 rounded-lg text-tertiary-light">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
              </div>
            </div>
            <p className="text-center text-gray-300 mb-3">Client-Server Architecture with GraphQL and MongoDB</p>
            <div className="flex items-center justify-between">
              <div className="text-center">
                <span className="text-sm text-tertiary-light">Client</span>
                <div className="mt-1 text-xs text-gray-400">Next.js, React</div>
              </div>
              <div className="flex-grow mx-3">
                <div className="border-t border-dashed border-gray-500 relative">
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-tertiary/20 text-xs text-tertiary-light px-1 rounded">
                    GraphQL
                  </div>
                </div>
              </div>
              <div className="text-center">
                <span className="text-sm text-tertiary-light">Server</span>
                <div className="mt-1 text-xs text-gray-400">Nest.js, MongoDB</div>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="bg-tertiary/20 p-1 rounded-full mt-1 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tertiary-light">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <div>
                <span className="font-medium">Single GraphQL Gateway</span>
                <p className="text-sm text-gray-300 mt-1">Centralized entry point for all data requests, improving efficiency</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-tertiary/20 p-1 rounded-full mt-1 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tertiary-light">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <div>
                <span className="font-medium">Apollo GraphQL Implementation</span>
                <p className="text-sm text-gray-300 mt-1">Complete ecosystem for data management including state, caching, and error handling</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-tertiary/20 p-1 rounded-full mt-1 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tertiary-light">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <div>
                <span className="font-medium">M-X Algorithm Placement</span>
                <p className="text-sm text-gray-300 mt-1">Implemented in the Quality Control Service for efficient server-side processing</p>
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
          <h3 className="text-2xl font-semibold mb-4 text-tertiary-light">System Components</h3>
          
          <div className="space-y-4">
            <div className="bg-white/5 p-4 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-tertiary/20 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tertiary-light">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <h4 className="font-medium">Worker Management Service</h4>
              </div>
              <p className="text-sm text-gray-300">Manages volunteer registration, profile management, and qualification tracking</p>
            </div>
            
            <div className="bg-white/5 p-4 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-tertiary/20 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tertiary-light">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </div>
                <h4 className="font-medium">Authentication Service</h4>
              </div>
              <p className="text-sm text-gray-300">Handles user authentication and authorization processes</p>
            </div>
            
            <div className="bg-white/5 p-4 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-tertiary/20 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tertiary-light">
                    <path d="M9 11l3 3L22 4"></path>
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                  </svg>
                </div>
                <h4 className="font-medium">Task Management Service</h4>
              </div>
              <p className="text-sm text-gray-300">Controls task assignment, submission, and validation processes</p>
            </div>
            
            <div className="bg-white/5 p-4 rounded-lg border-2 border-tertiary/30">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-tertiary/20 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tertiary-light">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                </div>
                <h4 className="font-medium">Quality Control Service</h4>
              </div>
              <p className="text-sm text-gray-300">Implements the M-X algorithm for worker assessment and classification</p>
              <div className="mt-2 bg-tertiary/10 p-2 rounded">
                <p className="text-xs text-tertiary-light">Core implementation of M-X algorithm</p>
              </div>
            </div>
            
            <div className="bg-white/5 p-4 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-tertiary/20 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tertiary-light">
                    <circle cx="18" cy="18" r="3"></circle>
                    <circle cx="6" cy="6" r="3"></circle>
                    <path d="M13 6h3a2 2 0 0 1 2 2v7"></path>
                    <line x1="6" y1="9" x2="6" y2="21"></line>
                  </svg>
                </div>
                <h4 className="font-medium">MongoDB Database</h4>
              </div>
              <p className="text-sm text-gray-300">Stores volunteer data, responses, and classification results</p>
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
        <h3 className="text-xl font-semibold mb-4 text-center">Data Flow Process</h3>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="bg-white/5 p-4 rounded-lg md:w-1/4 mb-4 md:mb-0">
            <h4 className="font-medium text-tertiary-light mb-2 text-center">Input</h4>
            <div className="text-sm text-gray-300">
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <div className="bg-tertiary/20 rounded-full p-1 w-5 h-5 flex items-center justify-center">
                    <span className="text-xs text-tertiary-light">1</span>
                  </div>
                  <span>Task identification</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="bg-tertiary/20 rounded-full p-1 w-5 h-5 flex items-center justify-center">
                    <span className="text-xs text-tertiary-light">2</span>
                  </div>
                  <span>Worker identification</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="bg-tertiary/20 rounded-full p-1 w-5 h-5 flex items-center justify-center">
                    <span className="text-xs text-tertiary-light">3</span>
                  </div>
                  <span>Answer selection with ID</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mx-4 my-2 md:my-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tertiary-light">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </div>
          
          <div className="bg-white/5 p-4 rounded-lg md:w-1/3 mb-4 md:mb-0">
            <h4 className="font-medium text-tertiary-light mb-2 text-center">Processing</h4>
            <div className="text-sm text-gray-300">
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <div className="bg-tertiary/20 rounded-full p-1 w-5 h-5 flex items-center justify-center">
                    <span className="text-xs text-tertiary-light">1</span>
                  </div>
                  <span>M-X algorithm decomposes tasks</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="bg-tertiary/20 rounded-full p-1 w-5 h-5 flex items-center justify-center">
                    <span className="text-xs text-tertiary-light">2</span>
                  </div>
                  <span>Calculates inter-worker consistency</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="bg-tertiary/20 rounded-full p-1 w-5 h-5 flex items-center justify-center">
                    <span className="text-xs text-tertiary-light">3</span>
                  </div>
                  <span>Solves system of equations</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="bg-tertiary/20 rounded-full p-1 w-5 h-5 flex items-center justify-center">
                    <span className="text-xs text-tertiary-light">4</span>
                  </div>
                  <span>Computes accuracy scores</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mx-4 my-2 md:my-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tertiary-light">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </div>
          
          <div className="bg-white/5 p-4 rounded-lg md:w-1/4">
            <h4 className="font-medium text-tertiary-light mb-2 text-center">Output</h4>
            <div className="text-sm text-gray-300">
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <div className="bg-tertiary/20 rounded-full p-1 w-5 h-5 flex items-center justify-center">
                    <span className="text-xs text-tertiary-light">1</span>
                  </div>
                  <span>Worker accuracy scores</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="bg-tertiary/20 rounded-full p-1 w-5 h-5 flex items-center justify-center">
                    <span className="text-xs text-tertiary-light">2</span>
                  </div>
                  <span>Eligibility classification</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="bg-tertiary/20 rounded-full p-1 w-5 h-5 flex items-center justify-center">
                    <span className="text-xs text-tertiary-light">3</span>
                  </div>
                  <span>Performance analytics</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SystemArchitectureSlide;