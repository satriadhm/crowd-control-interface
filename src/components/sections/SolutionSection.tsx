import React from 'react';

const SolutionSection = ({ sectionClasses }) => {
  return (
    <section className={`${sectionClasses} bg-white/5`}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center">Our Solution</h2>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
            <div className="rounded-full bg-tertiary w-12 h-12 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M7 7h.01" />
                <path d="M10.08 7H17" />
                <path d="M7 10.49h.01" />
                <path d="M10.08 10.49H17" />
                <path d="M7 14h.01" />
                <path d="M10.08 14H17" />
                <path d="M7 17.49h.01" />
                <path d="M10.08 17.49H17" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-4">Behavior-Driven Testing Platform</h3>
            <p className="text-gray-300">Our platform facilitates behavior-driven testing, making it easy for non-technical users to provide valuable feedback on software functionality.</p>
          </div>
          
          <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
            <div className="rounded-full bg-tertiary w-12 h-12 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-4">Dual Incentive Structure</h3>
            <p className="text-gray-300">Testers earn money both through finding bugs and referring new users, creating a sustainable income stream and incentivizing quality feedback.</p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
            <div className="rounded-full bg-tertiary w-12 h-12 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-4">Diverse Testing Pool</h3>
            <p className="text-gray-300">We provide access to a diverse crowd of testers with different backgrounds, devices, and perspectives to ensure comprehensive testing coverage.</p>
          </div>
          
          <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
            <div className="rounded-full bg-tertiary w-12 h-12 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 10v12" />
                <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-4">Quality Assurance & Marketing in One</h3>
            <p className="text-gray-300">Companies receive both thorough testing and product promotion, as testers naturally become advocates for products they help improve.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;