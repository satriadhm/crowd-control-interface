import React from "react";

export default function LayoutAuth({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="container mx-auto bg-white flex items-center justify-center no-scrollbar h-screen w-full">
      {children}
    </div>
  );
}
