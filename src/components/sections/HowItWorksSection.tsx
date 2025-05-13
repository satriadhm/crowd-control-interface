import React from "react";

const HowItWorksSection = () => {
  return (
    <div className="w-full">
      <h2 className="text-4xl font-bold mb-12 text-center">How It Works</h2>

      <div className="space-y-16 relative">
        {/* Line connecting all steps */}
        <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-tertiary-light/30 hidden md:block"></div>

        {/* Step 1 - Left */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Number on Left */}
          <div className="md:w-16 md:flex-shrink-0 flex justify-center order-1">
            <div className="rounded-full bg-tertiary w-12 h-12 flex items-center justify-center text-white font-bold z-10">
              1
            </div>
          </div>

          {/* Content */}
          <div className="md:w-5/12 order-3 md:order-2">
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm border border-white/10">
              <h3 className="text-xl font-semibold mb-3">
                Software Companies Register
              </h3>
              <p className="text-gray-300">
                Companies submit their software for testing, defining test
                scenarios and setting bounties for bug findings.
              </p>
            </div>
          </div>

          {/* Empty space for right side */}
          <div className="md:w-5/12 order-2 md:order-3"></div>
        </div>

        {/* Step 2 - Right */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Empty space for left side */}
          <div className="md:w-5/12 order-2 md:order-1"></div>

          {/* Number on Right */}
          <div className="md:w-16 md:flex-shrink-0 flex justify-center order-1 md:order-2">
            <div className="rounded-full bg-tertiary w-12 h-12 flex items-center justify-center text-white font-bold z-10">
              2
            </div>
          </div>

          {/* Content */}
          <div className="md:w-5/12 order-3">
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm border border-white/10">
              <h3 className="text-xl font-semibold mb-3">
                Testers Join the Platform
              </h3>
              <p className="text-gray-300">
                Individuals sign up as testers, complete training modules, and
                get matched with appropriate testing opportunities.
              </p>
            </div>
          </div>
        </div>

        {/* Step 3 - Left */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Number on Left */}
          <div className="md:w-16 md:flex-shrink-0 flex justify-center order-1">
            <div className="rounded-full bg-tertiary w-12 h-12 flex items-center justify-center text-white font-bold z-10">
              3
            </div>
          </div>

          {/* Content */}
          <div className="md:w-5/12 order-3 md:order-2">
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm border border-white/10">
              <h3 className="text-xl font-semibold mb-3">
                Behavior-Driven Testing
              </h3>
              <p className="text-gray-300">
                Testers follow guided scenarios, report issues, and earn rewards
                based on the severity and validity of bugs discovered.
              </p>
            </div>
          </div>

          {/* Empty space for right side */}
          <div className="md:w-5/12 order-2 md:order-3"></div>
        </div>

        {/* Step 4 - Right */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Empty space for left side */}
          <div className="md:w-5/12 order-2 md:order-1"></div>

          {/* Number on Right */}
          <div className="md:w-16 md:flex-shrink-0 flex justify-center order-1 md:order-2">
            <div className="rounded-full bg-tertiary w-12 h-12 flex items-center justify-center text-white font-bold z-10">
              4
            </div>
          </div>

          {/* Content */}
          <div className="md:w-5/12 order-3">
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm border border-white/10">
              <h3 className="text-xl font-semibold mb-3">Referral Program</h3>
              <p className="text-gray-300">
                Testers generate personal referral codes to earn commissions
                when others sign up and use the software products they&apos;ve
                tested.
              </p>
            </div>
          </div>
        </div>

        {/* Step 5 - Left */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Number on Left */}
          <div className="md:w-16 md:flex-shrink-0 flex justify-center order-1">
            <div className="rounded-full bg-tertiary w-12 h-12 flex items-center justify-center text-white font-bold z-10">
              5
            </div>
          </div>

          {/* Content */}
          <div className="md:w-5/12 order-3 md:order-2">
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm border border-white/10">
              <h3 className="text-xl font-semibold mb-3">
                Quality Certification
              </h3>
              <p className="text-gray-300">
                Software that passes rigorous testing receives a TrustCrowd
                certification, increasing user confidence and market appeal.
              </p>
            </div>
          </div>

          {/* Empty space for right side */}
          <div className="md:w-5/12 order-2 md:order-3"></div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSection;
