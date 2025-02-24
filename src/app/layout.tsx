import ApolloProviderWrapper from "../layout/apollo-provider";
import "./globals.css";

export const metadata = {
  title: "Worker Quality Control",
  description: "Next.js integrated with Apollo Client",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased from-[#001133] no-scrollbar">
        <ApolloProviderWrapper>{children}</ApolloProviderWrapper>
      </body>
    </html>
  );
}
