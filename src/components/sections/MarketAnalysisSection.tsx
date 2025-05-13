import React from 'react';

const MarketAnalysisSection = ({ sectionClasses }) => {
  return (
    <section className={`${sectionClasses} bg-white/5`}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center">Market Analysis</h2>
        
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/10 p-6 rounded-xl text-center">
            <div className="text-5xl font-bold text-tertiary-light mb-2">$40B+</div>
            <p className="text-lg">Global Software Testing Market</p>
          </div>
          
          <div className="bg-white/10 p-6 rounded-xl text-center">
            <div className="text-5xl font-bold text-tertiary-light mb-2">18.7%</div>
            <p className="text-lg">Annual Growth Rate</p>
          </div>
          
          <div className="bg-white/10 p-6 rounded-xl text-center">
            <div className="text-5xl font-bold text-tertiary-light mb-2">74%</div>
            <p className="text-lg">Companies Outsource Testing</p>
          </div>
        </div>
        
        <div className="bg-white/10 p-8 rounded-xl backdrop-blur-sm">
          <h3 className="text-2xl font-semibold mb-6">Target Market Segments</h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-medium mb-4 text-tertiary-light">For Software Companies</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="bg-white/10 p-1 rounded-full mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tertiary-light">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </div>
                  <span>Startups and SMEs with limited QA resources</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-white/10 p-1 rounded-full mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tertiary-light">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </div>
                  <span>SaaS providers seeking user feedback</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-white/10 p-1 rounded-full mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tertiary-light">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </div>
                  <span>Companies entering new markets</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-xl font-medium mb-4 text-tertiary-light">For Testers</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="bg-white/10 p-1 rounded-full mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tertiary-light">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </div>
                  <span>Tech-savvy individuals seeking flexible income</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-white/10 p-1 rounded-full mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tertiary-light">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </div>
                  <span>Students and freelancers</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-white/10 p-1 rounded-full mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tertiary-light">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </div>
                  <span>Early adopters and tech enthusiasts</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketAnalysisSection;