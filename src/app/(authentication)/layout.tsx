import React from "react";

export default function LayoutAuth({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="bg-[#001333]">
      <div className="container mx-auto flex items-center justify-center no-scrollbar h-screen w-full">
        {children}
      </div>
    </main>
  );
}
