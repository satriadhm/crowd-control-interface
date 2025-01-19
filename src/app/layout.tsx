import { ApolloProvider } from '@apollo/client';
import client from '../app/lib/apollo-client';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Pastikan ApolloProvider dibungkus dengan client */}
        <ApolloProvider client={client}>{children}</ApolloProvider>
      </body>
    </html>
  );
}
