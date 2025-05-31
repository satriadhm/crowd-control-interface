import React from 'react';

const TractionRoadmapSection = ({ sectionClasses }) => {
  return (
    <section className={`${sectionClasses} bg-white/5`}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center">Traction & Roadmap</h2>
        
        <div className="grid md:grid-cols-2 gap-10">
          <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
            <h3 className="text-2xl font-semibold mb-6 text-tertiary-light">Current Progress</h3>
            
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="bg-tertiary/20 p-2 rounded-full mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tertiary-light">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
                <div>
                  <span className="font-medium block">MVP Developed</span>
                  <p className="text-sm text-gray-300">Core platform with behavior-driven testing framework complete</p>
                </div>
              </li>
              
              <li className="flex items-start gap-3">
                <div className="bg-tertiary/20 p-2 rounded-full mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tertiary-light">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
                <div>
                  <span className="font-medium block">Beta Testing</span>
                  <p className="text-sm text-gray-300">50+ test users on the platform providing feedback</p>
                </div>
              </li>
              
              <li className="flex items-start gap-3">
                <div className="bg-tertiary/20 p-2 rounded-full mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tertiary-light">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
                <div>
                  <span className="font-medium block">Pilot Partnerships</span>
                  <p className="text-sm text-gray-300">2 software companies committed to pilot program</p>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
            <h3 className="text-2xl font-semibold mb-6 text-tertiary-light">Key Metrics</h3>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">User Acquisition Cost</span>
                  <span className="text-tertiary-light">Rp30.000,00 / Tester</span>
                </div>
                <div className="w-full bg-white/10 h-3 rounded-full">
                  <div className="bg-gradient-to-r from-tertiary to-tertiary-light h-3 rounded-full w-1/3"></div>
                </div>
                <div className="flex justify-between text-xs mt-1">
                  <span className="text-gray-400">Target: Rp 100.000</span>
                  <span className="text-gray-400">Industry Avg: Rp 500.000</span>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Testing Accuracy Rate</span>
                  <span className="text-tertiary-light">92%</span>
                </div>
                <div className="w-full bg-white/10 h-3 rounded-full">
                  <div className="bg-gradient-to-r from-tertiary to-tertiary-light h-3 rounded-full w-4/5"></div>
                </div>
                <div className="flex justify-between text-xs mt-1">
                  <span className="text-gray-400">Target: 95%</span>
                  <span className="text-gray-400">Industry Avg: 85%</span>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Monthly Tester Growth</span>
                  <span className="text-tertiary-light">28%</span>
                </div>
                <div className="w-full bg-white/10 h-3 rounded-full">
                  <div className="bg-gradient-to-r from-tertiary to-tertiary-light h-3 rounded-full w-3/4"></div>
                </div>
                <div className="flex justify-between text-xs mt-1">
                  <span className="text-gray-400">Target: 30%</span>
                  <span className="text-gray-400">Current: 28%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12">
          <h3 className="text-2xl font-semibold mb-6 text-center">Development Roadmap</h3>
          
          <div className="relative">
            <div className="absolute left-0 right-0 h-1 bg-white/20 top-10"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm relative">
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-tertiary w-10 h-10 rounded-full flex items-center justify-center font-bold z-10">Q1</div>
                <div className="pt-6">
                  <h4 className="font-medium mb-3 text-lg">Launch</h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• Official platform launch</li>
                    <li>• Onboard 500+ testers</li>
                    <li>• Sign 10 company clients</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm relative">
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-tertiary w-10 h-10 rounded-full flex items-center justify-center font-bold z-10">Q2</div>
                <div className="pt-6">
                  <h4 className="font-medium mb-3 text-lg">Expand Features</h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• Mobile app support</li>
                    <li>• Advanced analytics</li>
                    <li>• API integrations</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm relative">
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-tertiary w-10 h-10 rounded-full flex items-center justify-center font-bold z-10">Q3</div>
                <div className="pt-6">
                  <h4 className="font-medium mb-3 text-lg">Scale</h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• 5,000+ testers</li>
                    <li>• Series A funding</li>
                    <li>• Enterprise client focus</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm relative">
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-tertiary w-10 h-10 rounded-full flex items-center justify-center font-bold z-10">Q4</div>
                <div className="pt-6">
                  <h4 className="font-medium mb-3 text-lg">Expand Markets</h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• International expansion</li>
                    <li>• New industry verticals</li>
                    <li>• AI-powered test suggestions</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TractionRoadmapSection;