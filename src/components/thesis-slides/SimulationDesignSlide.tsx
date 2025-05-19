"use client";

import React from "react";
import { motion } from "framer-motion";

const SimulationDesignSlide = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <motion.h2 
        className="text-4xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        Simulation Design
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-8">
        <motion.div 
          className="bg-white/10 p-6 rounded-xl backdrop-blur-sm"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold mb-4 text-tertiary-light">Gherkin Task Design</h3>
          
          <div className="mb-4 bg-white/5 p-4 rounded-lg">
            <h4 className="font-medium mb-3">Format Requirements</h4>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-3">
                <div className="bg-tertiary/20 p-1 rounded-full mt-1 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tertiary-light">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
                <span className="text-sm">Multiple-choice format with fixed M options</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-tertiary/20 p-1 rounded-full mt-1 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tertiary-light">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
                <span className="text-sm">Binary decomposition capability for M-X algorithm</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-tertiary/20 p-1 rounded-full mt-1 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tertiary-light">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
                <span className="text-sm">Independent, non-exclusive options</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-tertiary/20 p-1 rounded-full mt-1 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tertiary-light">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
                <span className="text-sm">No predetermined &quot;correct&quot; answers</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white/5 p-4 rounded-lg">
            <h4 className="font-medium mb-3">Gherkin Structure</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="bg-tertiary/20 p-1 rounded-full flex-shrink-0 flex items-center justify-center w-6 h-6">
                  <span className="text-xs font-bold text-tertiary-light">1</span>
                </div>
                <div>
                  <span className="text-sm font-medium">Feature</span>
                  <p className="text-xs text-gray-400 mt-1">Context of functionality being tested</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-tertiary/20 p-1 rounded-full flex-shrink-0 flex items-center justify-center w-6 h-6">
                  <span className="text-xs font-bold text-tertiary-light">2</span>
                </div>
                <div>
                  <span className="text-sm font-medium">Scenario</span>
                  <p className="text-xs text-gray-400 mt-1">Specific test case description</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-tertiary/20 p-1 rounded-full flex-shrink-0 flex items-center justify-center w-6 h-6">
                  <span className="text-xs font-bold text-tertiary-light">3</span>
                </div>
                <div>
                  <span className="text-sm font-medium">Given-When-Then</span>
                  <p className="text-xs text-gray-400 mt-1">Preconditions, actions, and expected results</p>
                </div>
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
          <h3 className="text-2xl font-semibold mb-4 text-tertiary-light">Eligibility Determination</h3>
          
          <div className="bg-white/5 p-4 rounded-lg mb-4">
            <h4 className="font-medium mb-3">Rule-Based Validation</h4>
            <p className="text-sm text-gray-300 mb-3">
              Manual threshold definition approach providing flexibility for context-specific eligibility criteria
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="bg-tertiary/20 p-1 rounded-full mt-1 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tertiary-light">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
                <span className="text-sm">Adjustable threshold value via interface</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-tertiary/20 p-1 rounded-full mt-1 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tertiary-light">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
                <span className="text-sm">Comparison of M-X algorithm accuracy scores against threshold</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-tertiary/20 p-1 rounded-full mt-1 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tertiary-light">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
                <span className="text-sm">Calculation of eligibility based on average task performance</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 p-4 rounded-lg">
            <h4 className="font-medium mb-3 text-center">Example Gherkin Task</h4>
            <div className="bg-white/10 p-3 rounded text-sm">
              <p className="text-tertiary-light font-medium">Feature: User Account Management</p>
              <p className="mt-2 text-white">Scenario: Password reset functionality</p>
              <div className="mt-2 text-gray-300">
                <p><span className="text-blue-300 font-medium">Given</span> a user is on the login page</p>
                <p><span className="text-blue-300 font-medium">When</span> they click on &quot;Forgot Password&quot;</p>
                <p><span className="text-blue-300 font-medium">Then</span> they should see:</p>
              </div>
              <div className="mt-2 ml-4 space-y-1 text-gray-300">
                <p>□ Email input field</p>
                <p>□ Submit button</p>
                <p>□ Return to login link</p>
                <p>□ Security question prompts</p>
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
        <h3 className="text-xl font-semibold mb-4 text-center">Simulation Protocol</h3>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white/5 p-4 rounded-lg">
            <div className="flex items-start gap-3 mb-3">
              <div className="bg-tertiary/20 p-2 rounded-full flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tertiary-light">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <h4 className="font-medium">Timeframe</h4>
            </div>
            <ul className="space-y-2 text-sm text-gray-300 pl-2">
              <li>• 3-day hybrid simulation period</li>
              <li>• Mix of synchronous and asynchronous tasks</li>
              <li>• Multiple testing sessions per day</li>
            </ul>
          </div>
          
          <div className="bg-white/5 p-4 rounded-lg">
            <div className="flex items-start gap-3 mb-3">
              <div className="bg-tertiary/20 p-2 rounded-full flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tertiary-light">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h4 className="font-medium">Participants</h4>
            </div>
            <ul className="space-y-2 text-sm text-gray-300 pl-2">
              <li>• 24 total volunteers</li>
              <li>• 12 with UAT experience</li>
              <li>• 12 without UAT experience</li>
              <li>• Majority from IT backgrounds</li>
            </ul>
          </div>
          
          <div className="bg-white/5 p-4 rounded-lg">
            <div className="flex items-start gap-3 mb-3">
              <div className="bg-tertiary/20 p-2 rounded-full flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tertiary-light">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                </svg>
              </div>
              <h4 className="font-medium">Validation</h4>
            </div>
            <ul className="space-y-2 text-sm text-gray-300 pl-2">
              <li>• Prior-experience based validation for ground truth</li>
              <li>• Confusion matrix for algorithm evaluation</li>
              <li>• 50:50 eligible/non-eligible distribution</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-6 bg-tertiary/10 p-4 rounded-lg">
          <h4 className="font-medium text-center text-tertiary-light mb-3">Data Collection Process</h4>
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-center mb-4 md:mb-0">
              <div className="bg-white/10 p-3 rounded-full inline-flex items-center justify-center w-10 h-10 mb-2">
                <span className="text-tertiary-light font-bold">1</span>
              </div>
              <p className="text-sm text-gray-300">Task Distribution</p>
            </div>
            
            <div className="hidden md:block">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tertiary-light">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>
            
            <div className="text-center mb-4 md:mb-0">
              <div className="bg-white/10 p-3 rounded-full inline-flex items-center justify-center w-10 h-10 mb-2">
                <span className="text-tertiary-light font-bold">2</span>
              </div>
              <p className="text-sm text-gray-300">Response Collection</p>
            </div>
            
            <div className="hidden md:block">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tertiary-light">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>
            
            <div className="text-center mb-4 md:mb-0">
              <div className="bg-white/10 p-3 rounded-full inline-flex items-center justify-center w-10 h-10 mb-2">
                <span className="text-tertiary-light font-bold">3</span>
              </div>
              <p className="text-sm text-gray-300">Algorithm Processing</p>
            </div>
            
            <div className="hidden md:block">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tertiary-light">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>
            
            <div className="text-center">
              <div className="bg-white/10 p-3 rounded-full inline-flex items-center justify-center w-10 h-10 mb-2">
                <span className="text-tertiary-light font-bold">4</span>
              </div>
              <p className="text-sm text-gray-300">Evaluation</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SimulationDesignSlide;