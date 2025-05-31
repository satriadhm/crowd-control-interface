import React from 'react';

const BusinessModelSection = ({ sectionClasses }) => {
  return (
    <section className={sectionClasses}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center">Business Model</h2>
        
        <div className="bg-white/10 rounded-xl p-8 backdrop-blur-sm">
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-tertiary-light">Revenue Streams</h3>
              
              <div className="space-y-6">
                <div className="bg-white/10 p-5 rounded-lg">
                  <h4 className="text-lg font-medium mb-2">Testing Service Fees</h4>
                  <p className="text-gray-300">Companies pay for access to our testing network based on project size and complexity.</p>
                </div>
                
                <div className="bg-white/10 p-5 rounded-lg">
                  <h4 className="text-lg font-medium mb-2">Referral Commissions</h4>
                  <p className="text-gray-300">We take a percentage of successful referral conversions when testers bring in new software users.</p>
                </div>
                
                <div className="bg-white/10 p-5 rounded-lg">
                  <h4 className="text-lg font-medium mb-2">Quality Certification</h4>
                  <p className="text-gray-300">Premium subscription for companies to display a TrustCrowd certification badge on their products.</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-tertiary-light">Cost Structure</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 py-3">
                  <span className="text-lg">Platform Development & Maintenance</span>
                  <span className="text-gray-300">35%</span>
                </div>
                
                <div className="flex items-center justify-between border-b border-white/10 py-3">
                  <span className="text-lg">Tester Payments</span>
                  <span className="text-gray-300">30%</span>
                </div>
                
                <div className="flex items-center justify-between border-b border-white/10 py-3">
                  <span className="text-lg">Marketing & Sales</span>
                  <span className="text-gray-300">20%</span>
                </div>
                
                <div className="flex items-center justify-between border-b border-white/10 py-3">
                  <span className="text-lg">Operations & Customer Support</span>
                  <span className="text-gray-300">10%</span>
                </div>
                
                <div className="flex items-center justify-between py-3">
                  <span className="text-lg">Legal & Administrative</span>
                  <span className="text-gray-300">5%</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-10 bg-gradient-to-r from-tertiary/20 to-tertiary-light/20 p-6 rounded-lg text-center">
            <p className="text-xl">
              <span className="font-semibold">Unit Economics:</span> At scale, each active tester generates <span className="text-tertiary-light font-bold">Rp5.000.000</span> in monthly platform revenue
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessModelSection;