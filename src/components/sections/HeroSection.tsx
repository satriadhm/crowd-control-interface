import React from "react";

const HeroSection = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center text-center">
      <div className="mb-6 flex justify-center">
        <div className="bg-gradient-to-r from-tertiary to-tertiary-light p-4 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        </div>
      </div>
      <h1 className="text-5xl md:text-7xl font-bold mb-4">TrustCrowd</h1>
      <p className="text-xl md:text-2xl text-gray-300 mb-8">
        The Future for Crowdsourced User Acceptance Testing
      </p>
      <div className="flex flex-col md:flex-row justify-center gap-4">
        <a
          className="px-8 py-3 bg-gradient-to-r from-tertiary to-tertiary-light text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-center"
        >
          Learn More
        </a>
        <a
          href="#contact"
          className="px-8 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-200 rounded-lg text-center"
        >
          Contact Us
        </a>
      </div>
    </div>
  );
};

export default HeroSection;
