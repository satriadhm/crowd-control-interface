    "use client";

import React from "react";
import { motion } from "framer-motion";

const ThankYouSlide = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Thank You!
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          For your attention and valuable feedback
        </p>
      </motion.div>

      <motion.div 
        className="mt-12 bg-white/10 p-8 rounded-xl backdrop-blur-sm"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl font-semibold mb-6 text-center text-tertiary-light">Research Acknowledgements</h2>
        
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div className="text-center">
            <div className="bg-tertiary/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tertiary-light">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <h3 className="font-medium text-lg mb-2">Participants</h3>
            <p className="text-sm text-gray-300">
              The 24 volunteers who dedicated their time to the simulation study
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-tertiary/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tertiary-light">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
              </svg>
            </div>
            <h3 className="font-medium text-lg mb-2">Academic Support</h3>
            <p className="text-sm text-gray-300">
              Faculty and staff at Telkom University for their guidance and resources
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-tertiary/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tertiary-light">
                <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
              </svg>
            </div>
            <h3 className="font-medium text-lg mb-2">Research Community</h3>
            <p className="text-sm text-gray-300">
              Peers and colleagues who provided valuable feedback and review
            </p>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-lg text-gray-200 mb-4">Special Thanks To</p>
          <p className="text-xl font-medium mb-1">Dana Sulistiyo Kusumo, S.T., M.T., Ph.D</p>
          <p className="text-gray-300">Research Supervisor</p>
        </div>
      </motion.div>

      <motion.div 
        className="mt-12 grid md:grid-cols-2 gap-8"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
          <h3 className="text-xl font-semibold mb-4 text-tertiary-light">Contact Information</h3>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-tertiary/20 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tertiary-light">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <div>
                <p className="text-gray-300">+6282241389340</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="bg-tertiary/20 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tertiary-light">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <div>
                <p className="text-gray-300">glorioussatria@gmail.com</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="bg-tertiary/20 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tertiary-light">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </div>
              <div>
                <p className="text-gray-300">linkedin.com/in/gloriousatria</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
          <h3 className="text-xl font-semibold mb-4 text-tertiary-light">Next Steps</h3>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-tertiary/20 p-1 rounded-full mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tertiary-light">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <div>
                <span className="font-medium">Publication</span>
                <p className="text-sm text-gray-300 mt-1">Submission to relevant academic journals and conferences in the fields of software testing and crowdsourced quality control</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-tertiary/20 p-1 rounded-full mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tertiary-light">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <div>
                <span className="font-medium">Open Source Implementation</span>
                <p className="text-sm text-gray-300 mt-1">Public release of the algorithm implementation and validation toolkit for broader community collaboration</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-tertiary/20 p-1 rounded-full mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tertiary-light">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <div>
                <span className="font-medium">Industry Partnerships</span>
                <p className="text-sm text-gray-300 mt-1">Exploring partnership opportunities with software testing platforms for real-world implementation</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div 
        className="mt-12 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.6 }}
        viewport={{ once: true }}
      >
        <p className="text-2xl font-medium text-tertiary-light mb-4">Questions?</p>
        <p className="text-lg text-gray-300">Feel free to reach out via email or LinkedIn</p>
      </motion.div>
    </div>
  );
};

export default ThankYouSlide;
