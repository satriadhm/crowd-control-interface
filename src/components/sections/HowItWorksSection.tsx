import React from 'react';

const HowItWorksSection = ({ sectionClasses }) => {
  return (
    <section className={sectionClasses}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center">How It Works</h2>
        
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-tertiary-light/30"></div>
          
          <div className="space-y-12 relative">
            {/* Step 1 */}
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="md:w-1/2 flex justify-end order-1 md:order-1">
                <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm border border-white/10 max-w-md">
                  <h3 className="text-xl font-semibold mb-3">1. Software Companies Register</h3>
                  <p className="text-gray-300">Companies submit their software for testing, defining test scenarios and setting bounties for bug findings.</p>
                </div>
              </div>
              <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                <div className="rounded-full bg-tertiary w-10 h-10 flex items-center justify-center text-white font-bold z-10">1</div>
              </div>
              <div className="md:w-1/2 order-2 md:order-2"></div>
            </div>
            
            {/* Step 2 */}
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="md:w-1/2 order-1 md:order-2"></div>
              <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                <div className="rounded-full bg-tertiary w-10 h-10 flex items-center justify-center text-white font-bold z-10">2</div>
              </div>
              <div className="md:w-1/2 flex justify-start order-2 md:order-1">
                <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm border border-white/10 max-w-md">
                  <h3 className="text-xl font-semibold mb-3">2. Testers Join the Platform</h3>
                  <p className="text-gray-300">Individuals sign up as testers, complete training modules, and get matched with appropriate testing opportunities.</p>
                </div>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="md:w-1/2 flex justify-end order-1 md:order-1">
                <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm border border-white/10 max-w-md">
                  <h3 className="text-xl font-semibold mb-3">3. Behavior-Driven Testing</h3>
                  <p className="text-gray-300">Testers follow guided scenarios, report issues, and earn rewards based on the severity and validity of bugs discovered.</p>
                </div>
              </div>
              <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                <div className="rounded-full bg-tertiary w-10 h-10 flex items-center justify-center text-white font-bold z-10">3</div>
              </div>
              <div className="md:w-1/2 order-2 md:order-2"></div>
            </div>
            
            {/* Step 4 */}
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="md:w-1/2 order-1 md:order-2"></div>
              <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                <div className="rounded-full bg-tertiary w-10 h-10 flex items-center justify-center text-white font-bold z-10">4</div>
              </div>
              <div className="md:w-1/2 flex justify-start order-2 md:order-1">
                <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm border border-white/10 max-w-md">
                  <h3 className="text-xl font-semibold mb-3">4. Referral Program</h3>
                  <p className="text-gray-300">Testers generate personal referral codes to earn commissions when others sign up and use the software products they&apos;ve tested.</p>
                </div>
              </div>
            </div>
            
            {/* Step 5 */}
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="md:w-1/2 flex justify-end order-1 md:order-1">
                <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm border border-white/10 max-w-md">
                  <h3 className="text-xl font-semibold mb-3">5. Quality Certification</h3>
                  <p className="text-gray-300">Software that passes rigorous testing receives a TrustCrowd certification, increasing user confidence and market appeal.</p>
                </div>
              </div>
              <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                <div className="rounded-full bg-tertiary w-10 h-10 flex items-center justify-center text-white font-bold z-10">5</div>
              </div>
              <div className="md:w-1/2 order-2 md:order-2"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;