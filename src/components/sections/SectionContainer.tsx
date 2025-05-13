import React, { ReactNode } from "react";

interface SectionContainerProps {
  children: ReactNode;
  title: string;
  backgroundClass?: string;
}

/**
 * A standardized container for pitch deck sections
 * Ensures consistent spacing, heading styles, and content layout
 */
const SectionContainer: React.FC<SectionContainerProps> = ({
  children,
  title,
  backgroundClass = "",
}) => {
  return (
    <div className="w-full">
      <h2 className="text-4xl font-bold mb-8 text-center">{title}</h2>
      <div className={`${backgroundClass} rounded-xl p-6 md:p-8`}>
        {children}
      </div>
    </div>
  );
};

export default SectionContainer;
