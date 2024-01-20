import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// AuthContext is a React Context that provides the user's authentication state.
import { AuthProvider } from './contexts/authContexts';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "clErOS",
  description: "Free (french) streaming platform for the people, by the people.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="fr">
        <body className={inter.className}>{children}</body>
      </html>
    </AuthProvider>
  );
}
