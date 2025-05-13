import React from "react";
import SectionContainer from "./SectionContainer";

const ExecutiveSummarySection = () => {
  return (
    <SectionContainer
      title="Executive Summary"
      backgroundClass="bg-white/10 backdrop-blur-sm"
    >
      <p className="text-lg mb-6">
        TrustCrowd is a revolutionary platform that bridges the gap between
        software companies and quality testers through crowdsourced User
        Acceptance Testing (UAT). We operate on a dual business model:
      </p>

      <div className="grid md:grid-cols-2 gap-8 mb-6">
        <div className="bg-white/10 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-3 text-tertiary-light">
            B2B
          </h3>
          <p>
            We partner with software companies to conduct comprehensive User
            Acceptance Testing while simultaneously marketing their products to
            potential users.
          </p>
        </div>

        <div className="bg-white/10 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-3 text-tertiary-light">
            B2C
          </h3>
          <p>
            We recruit and train testers who earn income by finding bugs through
            behavior-driven testing and by referring new users to software
            products.
          </p>
        </div>
      </div>

      <p className="text-lg">
        Our platform creates a win-win-win ecosystem: software companies get
        thorough testing and marketing, testers earn income through both testing
        and referrals, and end users receive higher quality software products.
      </p>
    </SectionContainer>
  );
};

export default ExecutiveSummarySection;
