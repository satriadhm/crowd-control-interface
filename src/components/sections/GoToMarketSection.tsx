import React from 'react';

const GoToMarketSection = ({ sectionClasses }) => {
  return (
    <section className={sectionClasses}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center">Go-to-Market Strategy</h2>
        
        <div className="grid md:grid-cols-2 gap-10">
          <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
            <h3 className="text-2xl font-semibold mb-6 text-tertiary-light">Phase 1: Launch</h3>
            
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="bg-white/10 p-2 rounded-full mt-1 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tertiary-light">
                    <path d="M12 22V8" />
                    <path d="m17 13-5-5-5 5" />
                    <path d="M8 2h8" />
                  </svg>
                </div>
                <div>
                  <span className="font-medium block mb-1">Recruit Initial Testers</span>
                  <p className="text-sm text-gray-300">Focus on tech-savvy early adopters through targeted social media campaigns and university partnerships.</p>
                </div>
              </li>
              
              <li className="flex items-start gap-3">
                <div className="bg-white/10 p-2 rounded-full mt-1 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tertiary-light">
                    <path d="M12 22V8" />
                    <path d="m17 13-5-5-5 5" />
                    <path d="M8 2h8" />
                  </svg>
                </div>
                <div>
                  <span className="font-medium block mb-1">Pilot Programs</span>
                  <p className="text-sm text-gray-300">Partner with 5-10 local software startups for initial testing projects at discounted rates.</p>
                </div>
              </li>
              
              <li className="flex items-start gap-3">
                <div className="bg-white/10 p-2 rounded-full mt-1 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tertiary-light">
                    <path d="M12 22V8" />
                    <path d="m17 13-5-5-5 5" />
                    <path d="M8 2h8" />
                  </svg>
                </div>
                <div>
                  <span className="font-medium block mb-1">Case Study Development</span>
                  <p className="text-sm text-gray-300">Document success stories and ROI metrics from pilot programs for marketing materials.</p>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
            <h3 className="text-2xl font-semibold mb-6 text-tertiary-light">Phase 2: Growth</h3>
            
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="bg-white/10 p-2 rounded-full mt-1 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tertiary-light">
                    <path d="M12 22V8" />
                    <path d="m17 13-5-5-5 5" />
                    <path d="M8 2h8" />
                  </svg>
                </div>
                <div>
                  <span className="font-medium block mb-1">Targeted B2B Outreach</span>
                  <p className="text-sm text-gray-300">Direct sales to software companies through industry events, LinkedIn campaigns, and strategic partnerships.</p>
                </div>
              </li>
              
              <li className="flex items-start gap-3">
                <div className="bg-white/10 p-2 rounded-full mt-1 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tertiary-light">
                    <path d="M12 22V8" />
                    <path d="m17 13-5-5-5 5" />
                    <path d="M8 2h8" />
                  </svg>
                </div>
                <div>
                  <span className="font-medium block mb-1">Tester Referral Program</span>
                  <p className="text-sm text-gray-300">Incentivize existing testers to recruit others through tiered bonuses and gamification.</p>
                </div>
              </li>
              
              <li className="flex items-start gap-3">
                <div className="bg-white/10 p-2 rounded-full mt-1 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tertiary-light">
                    <path d="M12 22V8" />
                    <path d="m17 13-5-5-5 5" />
                    <path d="M8 2h8" />
                  </svg>
                </div>
                <div>
                  <span className="font-medium block mb-1">Content Marketing</span>
                  <p className="text-sm text-gray-300">Publish thought leadership on software quality, UAT best practices, and the future of crowdsourced testing.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-10 bg-white/10 rounded-xl p-6 backdrop-blur-sm">
          <h3 className="text-2xl font-semibold mb-6 text-tertiary-light">Phase 3: Expansion</h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/5 p-5 rounded-lg">
              <h4 className="font-medium mb-3">Geographic Expansion</h4>
              <p className="text-sm text-gray-300">Expand tester network to cover multiple time zones and languages for global software testing.</p>
            </div>
            
            <div className="bg-white/5 p-5 rounded-lg">
              <h4 className="font-medium mb-3">Product Diversification</h4>
              <p className="text-sm text-gray-300">Launch specialized testing services for mobile apps, AI products, and enterprise software.</p>
            </div>
            
            <div className="bg-white/5 p-5 rounded-lg">
              <h4 className="font-medium mb-3">Strategic Partnerships</h4>
              <p className="text-sm text-gray-300">Integrate with CI/CD platforms, app stores, and software development tools.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoToMarketSection;