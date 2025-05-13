import React from 'react';

const CompetitiveAdvantageSection = ({ sectionClasses }) => {
  return (
    <section className={`${sectionClasses} bg-white/5`}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center">Competitive Advantage</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
            <div className="bg-tertiary w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.5 19H9a7 7 0 1 1 0-14h11l-4 4 4 4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-4">Two-Sided Platform</h3>
            <p className="text-gray-300">Unlike traditional testing services, we combine testing with marketing, creating a unique value proposition for both companies and testers.</p>
          </div>
          
          <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
            <div className="bg-tertiary w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
                <path d="M16 13H8" />
                <path d="M16 17H8" />
                <path d="M10 9H8" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-4">Behavior-Driven Framework</h3>
            <p className="text-gray-300">Our proprietary testing framework makes it easy for non-technical users to provide detailed, actionable feedback.</p>
          </div>
          
          <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
            <div className="bg-tertiary w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5.8 11.3a1 1 0 1 0 2 0 1 1 0 0 0-2 0Z" />
                <path d="M4 7.5a7 7 0 1 1 14 0 7 7 0 0 1-14 0Z" />
                <path d="M4 16.5a7 7 0 0 1 7-7" />
                <path d="M16.5 15a7 7 0 0 1-10.5 6" />
                <path d="M15.8 11.3a1 1 0 1 0 2 0 1 1 0 0 0-2 0Z" />
                <path d="M11 11.3a1 1 0 1 0 2 0 1 1 0 0 0-2 0Z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-4">Network Effects</h3>
            <p className="text-gray-300">The more testers and companies join, the more valuable our platform becomes, creating a strong moat against competition.</p>
          </div>
        </div>
        
        <div className="mt-12">
          <div className="bg-white/10 rounded-xl p-8 backdrop-blur-sm">
            <h3 className="text-2xl font-semibold mb-6 text-center">Market Comparison</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-3 px-4">Feature</th>
                    <th className="text-center py-3 px-4">TrustCrowd</th>
                    <th className="text-center py-3 px-4">Traditional QA Services</th>
                    <th className="text-center py-3 px-4">Bug Bounty Platforms</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/10">
                    <td className="py-3 px-4">Non-Technical Testers</td>
                    <td className="text-center py-3 px-4 text-tertiary-light">✓</td>
                    <td className="text-center py-3 px-4">✗</td>
                    <td className="text-center py-3 px-4">✗</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-3 px-4">Marketing & Referral System</td>
                    <td className="text-center py-3 px-4 text-tertiary-light">✓</td>
                    <td className="text-center py-3 px-4">✗</td>
                    <td className="text-center py-3 px-4">✗</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-3 px-4">Behavior-Driven Testing</td>
                    <td className="text-center py-3 px-4 text-tertiary-light">✓</td>
                    <td className="text-center py-3 px-4">Partial</td>
                    <td className="text-center py-3 px-4">✗</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-3 px-4">Cost-Effectiveness</td>
                    <td className="text-center py-3 px-4 text-tertiary-light">High</td>
                    <td className="text-center py-3 px-4">Low</td>
                    <td className="text-center py-3 px-4">Medium</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">End-User Feedback</td>
                    <td className="text-center py-3 px-4 text-tertiary-light">Extensive</td>
                    <td className="text-center py-3 px-4">Limited</td>
                    <td className="text-center py-3 px-4">Technical Only</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompetitiveAdvantageSection;